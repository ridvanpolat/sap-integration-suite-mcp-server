/**
 * tests/core/export.test.ts
 *
 * Tests for the read-only export tool (sap_export_get):
 *   - path / nextLink validation guards
 *   - untruncated JSON export with resolved pagination links
 *   - binary ($value) export round-trip with size cap
 *   - opt-in registration through createServer
 */

import { createHash } from "node:crypto";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createApiClient } from "../../src/core/apiClient.js";
import {
  EXPORT_ERROR_MARKERS,
  EXPORT_TOOL_NAME,
  extractNextLink,
  registerExportTool,
  validateExportPath,
  validateNextLink,
} from "../../src/core/export.js";
import { createServer } from "../../src/app.js";
import type { EnvConfig } from "../../src/config/env.js";

const CPI_BASE = "https://tenant-tmn.hci.eu10.hana.ondemand.com/api/v1";

function testConfig(overrides: Partial<EnvConfig> = {}): EnvConfig {
  return {
    cpi: { url: CPI_BASE },
    apim: {},
    em: {},
    ia: {},
    oc: {},
    eic: {},
    maxResults: 50,
    logLevel: "info",
    exportTool: { enabled: true, maxBytes: 1024 * 1024 },
    ...overrides,
  };
}

type ToolResult = {
  content: Array<
    | { type: "text"; text: string }
    | { type: "resource"; resource: { uri: string; mimeType?: string; blob: string } }
  >;
  isError?: boolean;
};

/** msw path patterns treat "(...)" as groups, so OData key paths are matched literally. */
const exact = (url: string) => new RegExp(`^${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`);

function getHandler(server: McpServer, name: string) {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: Function }> })._registeredTools;
  return tools[name];
}

const mswServer = setupServer();
beforeAll(() => mswServer.listen({ onUnhandledRequest: "error" }));
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

describe("validateExportPath", () => {
  it("accepts OData key predicates and $value segments", () => {
    expect(validateExportPath("/api/v1/IntegrationDesigntimeArtifacts(Id='Flow_1',Version='active')/$value")).toBeNull();
    expect(validateExportPath("/apiportal/api/1.0/Management.svc/APIProxies('Orders%20API')")).toBeNull();
  });

  it.each([
    ["api/v1/IntegrationPackages", "start with '/'"],
    ["//evil.example.com/x", "host or URL scheme"],
    ["/redirect/https://evil.example.com", "host or URL scheme"],
    ["/api/v1/../secrets", "'..'"],
    ["/api/v1/%2e%2e/secrets", "'..'"],
    ["/api/v1/a%2Fb", "encoded separators"],
    ["/api/v1/x?$top=1", "'?'"],
    ["/api/v1/x#frag", "'#'"],
    ["/api/v1/a b", "whitespace"],
    ["/api/v1/%E0%A4%A", "malformed percent-encoding"],
  ])("rejects %s", (path, reason) => {
    expect(validateExportPath(path)).toContain(reason);
  });
});

describe("validateNextLink", () => {
  it("accepts links on the same origin under the base path", () => {
    expect(validateNextLink(`${CPI_BASE}/IntegrationPackages?$skiptoken=50`, CPI_BASE)).toBeNull();
  });

  it.each([
    ["https://evil.example.com/api/v1/IntegrationPackages", "domain host"],
    ["https://tenant-tmn.hci.eu10.hana.ondemand.com.evil.com/api/v1/x", "domain host"],
    ["http://tenant-tmn.hci.eu10.hana.ondemand.com/api/v1/x", "domain host"],
    ["https://tenant-tmn.hci.eu10.hana.ondemand.com/other/x", "base path"],
    ["https://tenant-tmn.hci.eu10.hana.ondemand.com/api/v10/x", "base path"],
    ["https://user:pw@tenant-tmn.hci.eu10.hana.ondemand.com/api/v1/x", "credentials"],
    ["/api/v1/IntegrationPackages", "absolute URL"],
  ])("rejects %s", (link, reason) => {
    expect(validateNextLink(link, CPI_BASE)).toContain(reason);
  });
});

describe("extractNextLink", () => {
  it("resolves relative OData v2 __next links against the request URL", () => {
    const body = { d: { results: [], __next: "IntegrationPackages?$skiptoken=50" } };
    expect(extractNextLink(body, `${CPI_BASE}/IntegrationPackages?$top=50`)).toBe(
      `${CPI_BASE}/IntegrationPackages?$skiptoken=50`,
    );
  });

  it("returns absolute OData v4 nextLinks unchanged and undefined when absent", () => {
    expect(extractNextLink({ value: [], "@odata.nextLink": "https://x.example.com/a?$skip=2" }, undefined)).toBe(
      "https://x.example.com/a?$skip=2",
    );
    expect(extractNextLink({ d: { results: [] } }, CPI_BASE)).toBeUndefined();
    expect(extractNextLink("plain text", CPI_BASE)).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Tool execution
// ---------------------------------------------------------------------------

describe("sap_export_get tool", () => {
  let mcpServer: McpServer;

  beforeAll(() => {
    mcpServer = new McpServer({ name: "export-test", version: "1.0.0" });
    const client = createApiClient({ baseUrl: CPI_BASE, csrfEnabled: false, maxResults: 50 });
    registerExportTool(mcpServer, testConfig(), ["cloud-integration"], undefined, {
      clientFactory: () => client,
    });
  });

  const call = (args: Record<string, unknown>) =>
    getHandler(mcpServer, EXPORT_TOOL_NAME)!.handler(args, {}) as Promise<ToolResult>;

  const textOf = (result: ToolResult) => {
    const block = result.content.find((c) => c.type === "text");
    return block && block.type === "text" ? block.text : "";
  };

  it("returns untruncated JSON pages with an absolute nextLink", async () => {
    const results = Array.from({ length: 120 }, (_, i) => ({ Id: `Pkg_${i}` }));
    mswServer.use(
      http.get(`${CPI_BASE}/IntegrationPackages`, ({ request }) => {
        expect(new URL(request.url).searchParams.get("$top")).toBe("200");
        return HttpResponse.json({ d: { results, __next: "IntegrationPackages?$skiptoken=120" } });
      }),
    );

    const result = await call({ domain: "cloud-integration", path: "/api/v1/IntegrationPackages", query: { $top: 200 } });
    expect(result.isError).toBeFalsy();
    const parsed = JSON.parse(textOf(result));
    expect(parsed.status).toBe(200);
    expect(parsed.data.d.results).toHaveLength(120);
    expect(parsed.nextLink).toBe(`${CPI_BASE}/IntegrationPackages?$skiptoken=120`);
  });

  it("follows a validated nextLink", async () => {
    mswServer.use(
      http.get(`${CPI_BASE}/IntegrationPackages`, ({ request }) => {
        expect(new URL(request.url).searchParams.get("$skiptoken")).toBe("120");
        return HttpResponse.json({ d: { results: [{ Id: "Pkg_120" }] } });
      }),
    );

    const result = await call({ domain: "cloud-integration", nextLink: `${CPI_BASE}/IntegrationPackages?$skiptoken=120` });
    const parsed = JSON.parse(textOf(result));
    expect(parsed.data.d.results).toEqual([{ Id: "Pkg_120" }]);
    expect(parsed.nextLink).toBeNull();
  });

  it("downloads binary bodies as base64 resource blobs with digest metadata", async () => {
    const bytes = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x00, 0xff, 0x10, 0x80]);
    mswServer.use(
      http.get(exact(`${CPI_BASE}/IntegrationDesigntimeArtifacts(Id='Flow_1',Version='active')/$value`), ({ request }) => {
        expect(request.headers.get("Accept")).toBe("*/*");
        return HttpResponse.arrayBuffer(bytes.buffer, { headers: { "Content-Type": "application/zip" } });
      }),
    );

    const result = await call({
      domain: "cloud-integration",
      path: "/api/v1/IntegrationDesigntimeArtifacts(Id='Flow_1',Version='active')/$value",
      format: "binary",
    });

    expect(result.isError).toBeFalsy();
    const resource = result.content.find((c) => c.type === "resource");
    expect(resource && resource.type === "resource").toBe(true);
    if (!resource || resource.type !== "resource") return;
    expect(resource.resource.mimeType).toBe("application/zip");
    expect(resource.resource.uri).toContain("sap-export://cloud-integration/api/v1/IntegrationDesigntimeArtifacts");
    expect(new Uint8Array(Buffer.from(resource.resource.blob, "base64"))).toEqual(bytes);

    const meta = JSON.parse(textOf(result));
    expect(meta.sizeBytes).toBe(bytes.byteLength);
    expect(meta.sha256).toBe(createHash("sha256").update(bytes).digest("hex"));
  });

  it("rejects binary bodies above the size limit", async () => {
    const big = new Uint8Array(4096).fill(7);
    mswServer.use(
      http.get(exact(`${CPI_BASE}/ScriptCollectionDesigntimeArtifacts(Id='Big',Version='active')/$value`), () =>
        HttpResponse.arrayBuffer(big.buffer, { headers: { "Content-Type": "application/zip" } }),
      ),
    );

    const result = await call({
      domain: "cloud-integration",
      path: "/api/v1/ScriptCollectionDesigntimeArtifacts(Id='Big',Version='active')/$value",
      format: "binary",
      maxBytes: 1024,
    });
    expect(result.isError).toBe(true);
    expect(textOf(result)).toContain(EXPORT_ERROR_MARKERS.payloadTooLarge);
  });

  it("reports unconfigured domains and invalid requests with stable markers", async () => {
    const notConfigured = await call({ domain: "api-management", path: "/apiportal/api/1.0/Management.svc/APIProxies" });
    expect(notConfigured.isError).toBe(true);
    expect(textOf(notConfigured)).toContain(EXPORT_ERROR_MARKERS.domainNotConfigured);

    const both = await call({ domain: "cloud-integration", path: "/api/v1/x", nextLink: `${CPI_BASE}/x` });
    expect(textOf(both)).toContain(EXPORT_ERROR_MARKERS.invalidRequest);

    const traversal = await call({ domain: "cloud-integration", path: "/api/v1/../../etc/passwd" });
    expect(textOf(traversal)).toContain(EXPORT_ERROR_MARKERS.invalidRequest);

    const foreign = await call({ domain: "cloud-integration", nextLink: "https://evil.example.com/api/v1/x" });
    expect(textOf(foreign)).toContain(EXPORT_ERROR_MARKERS.invalidRequest);
  });
});

// ---------------------------------------------------------------------------
// Opt-in registration
// ---------------------------------------------------------------------------

describe("createServer export tool registration", () => {
  it("registers sap_export_get only when MCP_ENABLE_EXPORT_TOOL is enabled", async () => {
    const enabled = await createServer({ config: testConfig() });
    expect(getHandler(enabled, EXPORT_TOOL_NAME)).toBeDefined();

    const disabled = await createServer({
      config: testConfig({ exportTool: { enabled: false, maxBytes: 1024 } }),
    });
    expect(getHandler(disabled, EXPORT_TOOL_NAME)).toBeUndefined();
  });
});
