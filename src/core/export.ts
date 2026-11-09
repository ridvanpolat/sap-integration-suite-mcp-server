/**
 * src/core/export.ts
 *
 * Read-only export tool (`sap_export_get`) for automated, 
 * non-interactive clients.
 *
 * Unlike the semantic domain tools, this tool:
 *   - returns untruncated response bodies (no `maxResults` slicing) together
 *     with an absolute, validated `nextLink` for OData pagination;
 *   - can return binary bodies (e.g. iFlow / script collection ZIPs via
 *     `$value`) as base64 MCP resource blobs;
 *   - is strictly GET-only and confined to the configured base URL of each
 *     domain (no traversal, no foreign hosts, no embedded query strings).
 *
 * It is registered only when `MCP_ENABLE_EXPORT_TOOL=true`, so interactive LLM
 * clients keep the curated semantic tool surface by default.
 */

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { DEFAULT_EXPORT_MAX_BYTES, type EnvConfig } from "../config/env.js";
import {
  SapApiError,
  createDomainApiClient,
  createMcpErrorResult,
  type BinaryPayload,
  type Logger,
  type SapApiClient,
} from "./apiClient.js";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const EXPORT_TOOL_NAME = "sap_export_get";

export const EXPORT_DOMAINS = [
  "cloud-integration",
  "api-management",
  "event-mesh",
  "integration-assessment",
  "open-connectors",
  "edge-integration-cell",
] as const;

export type ExportDomain = (typeof EXPORT_DOMAINS)[number];

/** Stable marker prefixes so automated clients can branch on error classes. */
export const EXPORT_ERROR_MARKERS = {
  domainNotConfigured: "[DOMAIN_NOT_CONFIGURED]",
  invalidRequest: "[INVALID_REQUEST]",
  payloadTooLarge: "[PAYLOAD_TOO_LARGE]",
} as const;

const MAX_PATH_LENGTH = 2048;

// ---------------------------------------------------------------------------
// Validation helpers (exported for unit testing)
// ---------------------------------------------------------------------------

/** Returns the configured base URL for a domain, if any. */
export function getDomainBaseUrl(domain: ExportDomain, config: EnvConfig): string | undefined {
  switch (domain) {
    case "cloud-integration":
      return config.cpi.url;
    case "api-management":
      return config.apim.url;
    case "event-mesh":
      return config.em.url;
    case "integration-assessment":
      return config.ia.url;
    case "open-connectors":
      return config.oc.url;
    case "edge-integration-cell":
      return config.eic.url;
  }
}

/**
 * Validates a path relative to a domain base URL.
 *
 * @returns an error message, or `null` when the path is acceptable.
 */
export function validateExportPath(path: string): string | null {
  if (path.length === 0 || path.length > MAX_PATH_LENGTH) {
    return `path must be between 1 and ${MAX_PATH_LENGTH} characters`;
  }
  if (!path.startsWith("/")) {
    return "path must start with '/'";
  }
  if (path.startsWith("//") || path.includes("://")) {
    return "path must not contain a host or URL scheme";
  }
  if (/[?#\\]/.test(path)) {
    return "path must not contain '?', '#' or '\\' (pass query parameters via 'query')";
  }
  // eslint-disable-next-line no-control-regex
  if (/[\u0000- \u007f]/.test(path)) {
    return "path must not contain whitespace or control characters (percent-encode key values)";
  }
  for (const segment of path.split("/")) {
    let decoded: string;
    try {
      decoded = decodeURIComponent(segment);
    } catch {
      return "path contains malformed percent-encoding";
    }
    if (decoded === "." || decoded === ".." || decoded.includes("/") || decoded.includes("\\")) {
      return "path must not contain '.', '..' or encoded separators";
    }
  }
  return null;
}

/**
 * Validates an absolute pagination link against the domain base URL: same
 * protocol and origin, no credentials or fragment, and confined to the base path.
 *
 * @returns an error message, or `null` when the link is acceptable.
 */
export function validateNextLink(nextLink: string, baseUrl: string): string | null {
  let next: URL;
  let base: URL;
  try {
    next = new URL(nextLink);
  } catch {
    return "nextLink must be an absolute URL";
  }
  try {
    base = new URL(baseUrl);
  } catch {
    return "domain base URL is not a valid URL";
  }
  if (next.protocol !== base.protocol || next.origin !== base.origin) {
    return "nextLink must point at the configured domain host";
  }
  if (next.username || next.password) {
    return "nextLink must not embed credentials";
  }
  if (next.hash) {
    return "nextLink must not contain a fragment";
  }
  const basePath = base.pathname.replace(/\/+$/, "");
  if (basePath && next.pathname !== basePath && !next.pathname.startsWith(`${basePath}/`)) {
    return "nextLink must stay under the domain base path";
  }
  return null;
}

/**
 * Extracts the OData v2 (`d.__next`) or v4 (`@odata.nextLink`) continuation
 * link from a raw body and resolves it against the request URL.
 */
export function extractNextLink(body: unknown, requestUrl: string | undefined): string | undefined {
  if (!body || typeof body !== "object") return undefined;
  const rec = body as Record<string, unknown>;

  let next: unknown;
  const d = rec["d"];
  if (d && typeof d === "object" && !Array.isArray(d)) {
    next = (d as Record<string, unknown>)["__next"];
  }
  if (typeof next !== "string") {
    next = rec["@odata.nextLink"];
  }
  if (typeof next !== "string" || next.length === 0) return undefined;

  try {
    return requestUrl ? new URL(next, requestUrl).toString() : new URL(next).toString();
  } catch {
    return undefined;
  }
}

function errorResult(text: string): CallToolResult {
  return { content: [{ type: "text", text }], isError: true };
}

function resourceUri(domain: ExportDomain, requestUrl: string | undefined, fallbackPath: string): string {
  if (requestUrl) {
    try {
      const url = new URL(requestUrl);
      return `sap-export://${domain}${url.pathname}${url.search}`;
    } catch {
      // fall through to the raw path
    }
  }
  return `sap-export://${domain}${fallbackPath}`;
}

// ---------------------------------------------------------------------------
// Tool registration
// ---------------------------------------------------------------------------

export interface ExportToolDependencies {
  /** Overrides API client creation (dependency injection for tests). */
  clientFactory?: (domain: ExportDomain) => SapApiClient;
}

/**
 * Registers the read-only `sap_export_get` tool.
 *
 * @param server        - The shared McpServer instance.
 * @param config        - Parsed environment configuration.
 * @param activeDomains - Domain keys with a configured base URL.
 * @param log           - Optional server-safe logger.
 * @param deps          - Optional dependency overrides (tests).
 */
export function registerExportTool(
  server: McpServer,
  config: EnvConfig,
  activeDomains: readonly string[],
  log?: Logger,
  deps: ExportToolDependencies = {},
): void {
  const ceiling = config.exportTool?.maxBytes ?? DEFAULT_EXPORT_MAX_BYTES;
  const clients = new Map<ExportDomain, SapApiClient>();

  const getClient = (domain: ExportDomain): SapApiClient => {
    const cached = clients.get(domain);
    if (cached) return cached;
    const client = deps.clientFactory
      ? deps.clientFactory(domain)
      : createDomainApiClient(domain, config, log);
    clients.set(domain, client);
    return client;
  };

  server.tool(
    EXPORT_TOOL_NAME,
    "Read-only raw GET export for automated pipelines. Returns untruncated JSON bodies with an absolute " +
      "'nextLink' for pagination, or binary bodies (e.g. artifact ZIPs via $value) as base64 resource blobs. " +
      "Paths are relative to the configured domain base URL.",
    {
      domain: z
        .enum(EXPORT_DOMAINS)
        .describe("SAP Integration Suite domain whose configured base URL the request targets"),
      path: z
        .string()
        .optional()
        .describe(
          "Path relative to the domain base URL, e.g. /api/v1/IntegrationDesigntimeArtifacts(Id='Flow_1',Version='active')/$value. Mutually exclusive with nextLink.",
        ),
      nextLink: z
        .string()
        .optional()
        .describe("Absolute pagination link from a previous result's 'nextLink'. Mutually exclusive with path and query."),
      query: z
        .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
        .optional()
        .describe("Query parameters such as $filter, $top, $expand or $select"),
      format: z
        .enum(["json", "binary"])
        .default("json")
        .describe("json: full body as text ({status, data, nextLink}); binary: base64 resource blob plus metadata"),
      maxBytes: z
        .number()
        .int()
        .positive()
        .optional()
        .describe("Optional response size limit in bytes (capped by SAP_EXPORT_MAX_BYTES)"),
    },
    async (args): Promise<CallToolResult> => {
      const M = EXPORT_ERROR_MARKERS;
      try {
        if (!activeDomains.includes(args.domain)) {
          return errorResult(`${M.domainNotConfigured} Domain "${args.domain}" is not configured on this MCP server.`);
        }

        const hasPath = typeof args.path === "string" && args.path.length > 0;
        const hasNext = typeof args.nextLink === "string" && args.nextLink.length > 0;
        if (hasPath === hasNext) {
          return errorResult(`${M.invalidRequest} Provide exactly one of 'path' or 'nextLink'.`);
        }

        let target: string;
        let query: Record<string, string | number | boolean> | undefined;
        if (hasNext) {
          if (args.query && Object.keys(args.query).length > 0) {
            return errorResult(`${M.invalidRequest} 'query' cannot be combined with 'nextLink'.`);
          }
          const baseUrl = getDomainBaseUrl(args.domain, config);
          const problem = baseUrl ? validateNextLink(args.nextLink as string, baseUrl) : "domain base URL is not configured";
          if (problem) {
            return errorResult(`${M.invalidRequest} ${problem}`);
          }
          target = args.nextLink as string;
        } else {
          const problem = validateExportPath(args.path as string);
          if (problem) {
            return errorResult(`${M.invalidRequest} ${problem}`);
          }
          target = args.path as string;
          query = args.query;
        }

        const limit = Math.min(args.maxBytes ?? ceiling, ceiling);
        const client = getClient(args.domain);

        if (args.format === "binary") {
          const res = await client.request<BinaryPayload>({
            method: "GET",
            path: target,
            query,
            skipUnwrap: true,
            responseType: "binary",
            maxResponseBytes: limit,
          });
          const payload = res.data;
          return {
            content: [
              {
                type: "resource",
                resource: {
                  uri: resourceUri(args.domain, res.url, target),
                  mimeType: payload.contentType,
                  blob: payload.base64,
                },
              },
              {
                type: "text",
                text: JSON.stringify({
                  status: res.status,
                  contentType: payload.contentType,
                  sizeBytes: payload.sizeBytes,
                  sha256: payload.sha256,
                }),
              },
            ],
          };
        }

        const res = await client.request({ method: "GET", path: target, query, skipUnwrap: true });
        const nextLink = extractNextLink(res.raw, res.url) ?? null;
        const text = JSON.stringify({ status: res.status, data: res.data, nextLink });
        const size = Buffer.byteLength(text, "utf8");
        if (size > limit) {
          return errorResult(
            `${M.payloadTooLarge} JSON response is ${size} bytes, above the ${limit} byte export limit. Request a smaller page (e.g. lower $top).`,
          );
        }
        return { content: [{ type: "text", text }] };
      } catch (err) {
        const result = createMcpErrorResult(err);
        if (err instanceof SapApiError && err.status === 413) {
          const first = result.content[0];
          if (first) first.text = `${M.payloadTooLarge} ${first.text}`;
        }
        return result;
      }
    },
  );
}
