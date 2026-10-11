/**
 * src/core/apiClient.ts
 *
 * Enterprise API Client for the SAP Integration Suite MCP Server.
 *
 * Implements:
 *   - Automatic OAuth2 client_credentials token fetching, caching, and refresh
 *   - Open Connectors authorization header support
 *   - SAP CSRF token handshake (HEAD/GET with X-CSRF-Token: Fetch) with cookie jar
 *   - Automatic CSRF invalidation and single retry on 403 Forbidden
 *   - OData JSON enforcement (Accept: application/json)
 *   - OData v2 and v4 response unwrapping ($skiptoken, @odata.nextLink, d.results, value)
 *   - Context window protection: strict payload truncation with hasMore flag
 *   - Secure logging: header sanitization (never logs auth, tokens, or cookies)
 *   - Resilient error handling formatted for MCP tools ({ content, isError })
 *   - Zero STDIO pollution: routes all logs through MCP logging callback
 */

import type { EnvConfig } from "../config/env.js";

// ---------------------------------------------------------------------------
// Logging & Security
// ---------------------------------------------------------------------------

export type LogLevel = "debug" | "info" | "warn" | "error";
export type Logger = (level: LogLevel, message: string) => void;

/** Headers that must never be leaked into logs or error messages. */
const SENSITIVE_HEADERS = new Set([
  "authorization",
  "cookie",
  "set-cookie",
  "x-csrf-token",
  "client_secret",
  "clientsecret",
  "usersecret",
  "orgsecret",
  "password",
  "token",
]);

/**
 * Redacts sensitive header values for safe logging.
 */
export function sanitizeHeaders(
  headers: Record<string, string> | Headers,
): Record<string, string> {
  const result: Record<string, string> = {};

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      result[key] = SENSITIVE_HEADERS.has(lower) ? "[REDACTED]" : value;
    });
  } else {
    for (const [key, value] of Object.entries(headers)) {
      const lower = key.toLowerCase();
      result[key] = SENSITIVE_HEADERS.has(lower) ? "[REDACTED]" : value;
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Auth Configuration Types
// ---------------------------------------------------------------------------

export interface OAuth2AuthConfig {
  type: "oauth2";
  tokenUrl: string;
  clientId: string;
  clientSecret: string;
  scope?: string;
}

export interface OpenConnectorsAuthConfig {
  type: "open-connectors";
  userSecret: string;
  orgSecret: string;
}

export interface BearerAuthConfig {
  type: "bearer";
  token: string;
}

export type DomainAuthConfig =
  | OAuth2AuthConfig
  | OpenConnectorsAuthConfig
  | BearerAuthConfig;

// ---------------------------------------------------------------------------
// Client Configuration & Request/Response Types
// ---------------------------------------------------------------------------

export interface ApiClientOptions {
  /** Base URL for the SAP service (e.g. https://tenant-tmn.hci.eu10.hana.ondemand.com) */
  baseUrl: string;
  /** Authentication configuration */
  auth?: DomainAuthConfig;
  /** Enable automatic CSRF token handshake for mutating requests (defaults to true) */
  csrfEnabled?: boolean;
  /** Relative or absolute path to perform the CSRF handshake against (defaults to "/") */
  csrfFetchPath?: string;
  /** Maximum number of records to return before truncation (context window protection) */
  maxResults?: number;
  /** Request timeout in milliseconds (defaults to 30,000 ms) */
  timeoutMs?: number;
  /** Safe logger function (routes to MCP client or stderr) */
  logger?: Logger;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

export interface RequestOptions {
  method?: HttpMethod;
  /** Relative endpoint path (e.g. "/api/v1/IntegrationPackages") */
  path: string;
  /** Query parameters */
  query?: Record<string, string | number | boolean | undefined>;
  /** Custom request headers */
  headers?: Record<string, string>;
  /** Request body (plain object, string, or Buffer) */
  body?: unknown;
  /** Skip CSRF handshake for this specific request */
  skipCsrf?: boolean;
  /** Skip OData unwrapping and return raw response */
  skipUnwrap?: boolean;
}

export interface ApiResponse<T = unknown> {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  /** Unwrapped data (array, object, or primitive) */
  data: T;
  /** Full raw JSON body before unwrapping */
  raw: unknown;
  /** True if data was truncated due to maxResults */
  hasMore?: boolean;
  /** Total count if returned in OData inlinecount / @odata.count */
  totalCount?: number;
  /** Next page link or token ($skiptoken or @odata.nextLink) */
  nextPageToken?: string;
}

export interface McpToolResult {
  [x: string]: unknown;
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
}

// ---------------------------------------------------------------------------
// Custom Error Class
// ---------------------------------------------------------------------------

export class SapApiError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly url: string;
  public readonly method: string;
  public readonly responseBody?: unknown;
  public readonly isHtmlError: boolean;

  constructor(params: {
    message: string;
    status: number;
    statusText: string;
    url: string;
    method: string;
    responseBody?: unknown;
    isHtmlError?: boolean;
  }) {
    super(params.message);
    this.name = "SapApiError";
    this.status = params.status;
    this.statusText = params.statusText;
    this.url = params.url;
    this.method = params.method;
    this.responseBody = params.responseBody;
    this.isHtmlError = Boolean(params.isHtmlError);
  }
}

// ---------------------------------------------------------------------------
// OData Unwrapping Utility
// ---------------------------------------------------------------------------

export interface UnwrappedResult<T = unknown> {
  data: T;
  hasMore: boolean;
  totalCount?: number;
  nextPageToken?: string;
}

/**
 * Safely unwraps SAP OData v2 and v4 responses, extracting entities,
 * counts, pagination tokens, and enforcing maxResults limits.
 */
export function unwrapODataResponse<T = unknown>(
  raw: unknown,
  maxResults = 50,
): UnwrappedResult<T> {
  if (raw === null || raw === undefined || typeof raw !== "object") {
    return { data: raw as T, hasMore: false };
  }

  const rec = raw as Record<string, unknown>;
  let unwrappedData: unknown = raw;
  let totalCount: number | undefined;
  let nextPageToken: string | undefined;

  // 1. OData v2 structure: { d: { results: [...], __count: "...", __next: "..." } } or { d: { ... } }
  if ("d" in rec && rec["d"] !== null && typeof rec["d"] === "object") {
    const d = rec["d"] as Record<string, unknown>;

    if (Array.isArray(d["results"])) {
      unwrappedData = d["results"];
      if (typeof d["__count"] === "string" || typeof d["__count"] === "number") {
        totalCount = Number(d["__count"]);
      }
      if (typeof d["__next"] === "string") {
        nextPageToken = d["__next"];
      }
    } else {
      unwrappedData = d;
    }
  }
  // 2. OData v4 structure: { value: [...], "@odata.count": 123, "@odata.nextLink": "..." }
  else if (Array.isArray(rec["value"])) {
    unwrappedData = rec["value"];
    if (typeof rec["@odata.count"] === "number") {
      totalCount = rec["@odata.count"];
    }
    if (typeof rec["@odata.nextLink"] === "string") {
      nextPageToken = rec["@odata.nextLink"];
    }
  }

  // 3. Array truncation for Context Window Protection
  let hasMore = Boolean(nextPageToken);
  if (Array.isArray(unwrappedData)) {
    if (unwrappedData.length > maxResults) {
      unwrappedData = unwrappedData.slice(0, maxResults);
      hasMore = true;
    }
  }

  return {
    data: unwrappedData as T,
    hasMore,
    totalCount,
    nextPageToken,
  };
}

// ---------------------------------------------------------------------------
// MCP Result Formatting Helpers
// ---------------------------------------------------------------------------

/**
 * Formats data cleanly into an MCP Tool success response.
 */
export function createMcpSuccessResult(
  data: unknown,
  hasMore?: boolean,
  maxResults?: number,
): McpToolResult {
  const jsonText = JSON.stringify(data, null, 2);
  let text = jsonText;

  if (hasMore) {
    const limitNote = maxResults ? ` to ${maxResults} items` : "";
    text += `\n\n[Note: Results truncated${limitNote}. Use pagination parameters ($skip, $top, $skiptoken) to retrieve more records.]`;
  }

  return {
    content: [{ type: "text", text }],
    isError: false,
  };
}

/**
 * Formats any error cleanly into an MCP Tool error response without crashing.
 */
export function createMcpErrorResult(error: unknown): McpToolResult {
  if (error instanceof SapApiError) {
    let details = `SAP API Error [${error.status} ${error.statusText}]: ${error.message}\nMethod: ${error.method}\nURL: ${error.url}`;

    if (error.responseBody) {
      if (typeof error.responseBody === "string") {
        details += `\nResponse: ${error.responseBody.slice(0, 500)}`;
      } else {
        try {
          details += `\nResponse: ${JSON.stringify(error.responseBody, null, 2)}`;
        } catch {
          details += `\nResponse: ${String(error.responseBody)}`;
        }
      }
    }

    return {
      content: [{ type: "text", text: details }],
      isError: true,
    };
  }

  const message = error instanceof Error ? error.message : String(error);
  return {
    content: [{ type: "text", text: `Unexpected error: ${message}` }],
    isError: true,
  };
}

// ---------------------------------------------------------------------------
// SapApiClient Class
// ---------------------------------------------------------------------------

export class SapApiClient {
  private readonly baseUrl: string;
  private readonly auth?: DomainAuthConfig;
  private readonly csrfEnabled: boolean;
  private readonly csrfFetchPath: string;
  private readonly maxResults: number;
  private readonly timeoutMs: number;
  private readonly logger: Logger;

  // OAuth2 Token Cache
  private cachedAccessToken?: string;
  private tokenExpiresAt = 0;
  private inflightTokenPromise?: Promise<string>;

  // CSRF Token & Cookie Jar
  private cachedCsrfToken?: string;
  private cachedCsrfCookies: string[] = [];
  private inflightCsrfPromise?: Promise<{ token: string; cookies: string[] }>;

  constructor(options: ApiClientOptions) {
    // Strip trailing slash for consistency
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.auth = options.auth;
    this.csrfEnabled = options.csrfEnabled !== false;
    this.csrfFetchPath = options.csrfFetchPath ?? "/";
    this.maxResults = options.maxResults ?? 50;
    this.timeoutMs = options.timeoutMs ?? 30_000;
    this.logger = options.logger ?? (() => {});
  }

  // -------------------------------------------------------------------------
  // Safe Logging (never calls console.*)
  // -------------------------------------------------------------------------

  private log(level: LogLevel, message: string): void {
    try {
      this.logger(level, message);
    } catch {
      // Ignore logger errors
    }
  }

  // -------------------------------------------------------------------------
  // OAuth2 Token Handshake & Refresh
  // -------------------------------------------------------------------------

  /**
   * Retrieves a valid OAuth2 Bearer token, automatically refreshing
   * when expired or close to expiration (with a 60-second safety window).
   */
  public async getAccessToken(): Promise<string> {
    if (!this.auth || this.auth.type !== "oauth2") {
      throw new Error("Cannot get OAuth2 access token: client is not configured with OAuth2.");
    }

    const now = Date.now();
    // Return cached token if still valid (60-second margin)
    if (this.cachedAccessToken && this.tokenExpiresAt > now + 60_000) {
      return this.cachedAccessToken;
    }

    // Deduplicate concurrent token requests
    if (this.inflightTokenPromise) {
      return this.inflightTokenPromise;
    }

    this.inflightTokenPromise = (async () => {
      try {
        const { tokenUrl, clientId, clientSecret, scope } = this.auth as OAuth2AuthConfig;

        this.log("debug", `Fetching OAuth2 token from ${tokenUrl}`);

        const bodyParams = new URLSearchParams({
          grant_type: "client_credentials",
        });
        if (scope) {
          bodyParams.append("scope", scope);
        }

        // Standard HTTP Basic Authorization header for client credentials
        const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

        const response = await fetch(tokenUrl, {
          method: "POST",
          headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: bodyParams.toString(),
          signal: controller.signal,
        }).finally(() => clearTimeout(timeoutId));

        if (!response.ok) {
          const errorText = await response.text().catch(() => "");
          throw new SapApiError({
            message: `OAuth2 token request failed: ${response.status} ${response.statusText}`,
            status: response.status,
            statusText: response.statusText,
            url: tokenUrl,
            method: "POST",
            responseBody: errorText,
          });
        }

        const data = (await response.json()) as {
          access_token: string;
          token_type?: string;
          expires_in?: number;
        };

        if (!data.access_token) {
          throw new Error("OAuth2 token response missing 'access_token' property.");
        }

        const expiresInSeconds = typeof data.expires_in === "number" ? data.expires_in : 3600;
        this.cachedAccessToken = data.access_token;
        this.tokenExpiresAt = Date.now() + expiresInSeconds * 1000;

        this.log("debug", `OAuth2 token acquired successfully (expires in ${expiresInSeconds}s)`);
        return this.cachedAccessToken;
      } finally {
        this.inflightTokenPromise = undefined;
      }
    })();

    return this.inflightTokenPromise;
  }

  // -------------------------------------------------------------------------
  // CSRF Token Handshake
  // -------------------------------------------------------------------------

  /**
   * Performs the SAP CSRF handshake (HEAD or GET request with `X-CSRF-Token: Fetch`).
   * Caches the acquired token and Session cookies for subsequent mutating requests.
   */
  public async fetchCsrfToken(forceRefresh = false): Promise<{ token: string; cookies: string[] }> {
    if (!forceRefresh && this.cachedCsrfToken) {
      return { token: this.cachedCsrfToken, cookies: this.cachedCsrfCookies };
    }

    if (this.inflightCsrfPromise && !forceRefresh) {
      return this.inflightCsrfPromise;
    }

    this.inflightCsrfPromise = (async () => {
      try {
        const fetchUrl = this.buildUrl(this.csrfFetchPath);
        this.log("debug", `Fetching CSRF token from ${fetchUrl}`);

        const headers = await this.buildBaseHeaders();
        headers["X-CSRF-Token"] = "Fetch";

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

        // Attempt HEAD first, falling back to GET if HEAD is not allowed (HTTP 405)
        let response = await fetch(fetchUrl, {
          method: "HEAD",
          headers,
          signal: controller.signal,
        }).catch((err) => {
          this.log("debug", `CSRF HEAD probe failed: ${err instanceof Error ? err.message : String(err)}, falling back to GET`);
          return null;
        });

        if (!response || response.status === 405) {
          response = await fetch(fetchUrl, {
            method: "GET",
            headers,
            signal: controller.signal,
          }).finally(() => clearTimeout(timeoutId));
        } else {
          clearTimeout(timeoutId);
        }

        const csrfToken = response.headers.get("x-csrf-token");
        if (!csrfToken || csrfToken.toLowerCase() === "required") {
          throw new SapApiError({
            message: `SAP service did not return an X-CSRF-Token header (Status: ${response.status} ${response.statusText})`,
            status: response.status,
            statusText: response.statusText,
            url: fetchUrl,
            method: "HEAD/GET",
          });
        }

        // Extract session cookies (Node 20 getSetCookie or get("set-cookie"))
        const rawCookies: string[] =
          typeof response.headers.getSetCookie === "function"
            ? response.headers.getSetCookie()
            : response.headers.get("set-cookie")?.split(/,(?=\s*[A-Za-z0-9_-]+=)/) ?? [];

        // Parse and deduplicate cookies by name (e.g. JSESSIONID=val)
        const cookieMap = new Map<string, string>();
        for (const raw of rawCookies) {
          const cookiePart = raw.split(";")[0]?.trim();
          if (cookiePart) {
            const eqIdx = cookiePart.indexOf("=");
            if (eqIdx !== -1) {
              const name = cookiePart.slice(0, eqIdx).trim();
              cookieMap.set(name, cookiePart);
            } else {
              cookieMap.set(cookiePart, cookiePart);
            }
          }
        }
        const cookies = Array.from(cookieMap.values());

        this.cachedCsrfToken = csrfToken;
        this.cachedCsrfCookies = cookies;

        this.log("debug", `CSRF token acquired successfully with ${cookies.length} session cookie(s)`);
        return { token: csrfToken, cookies };
      } finally {
        this.inflightCsrfPromise = undefined;
      }
    })();

    return this.inflightCsrfPromise;
  }

  /**
   * Clears cached CSRF token and cookies.
   */
  public invalidateCsrfToken(): void {
    this.cachedCsrfToken = undefined;
    this.cachedCsrfCookies = [];
  }

  // -------------------------------------------------------------------------
  // Header & URL Construction
  // -------------------------------------------------------------------------

  private async buildBaseHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (this.auth) {
      if (this.auth.type === "oauth2") {
        const token = await this.getAccessToken();
        headers["Authorization"] = `Bearer ${token}`;
      } else if (this.auth.type === "open-connectors") {
        headers["Authorization"] = `User ${this.auth.userSecret}, Organization ${this.auth.orgSecret}`;
      } else if (this.auth.type === "bearer") {
        headers["Authorization"] = `Bearer ${this.auth.token}`;
      }
    }

    return headers;
  }

  private buildUrl(path: string, query?: Record<string, string | number | boolean | undefined>): string {
    // If path is absolute URL, use it directly; otherwise combine with baseUrl
    let base: string;
    if (path.startsWith("http://") || path.startsWith("https://")) {
      base = path;
    } else {
      let cleanPath = path.replace(/^\/+/, "");
      // Prevent duplicate /api/v1 if baseUrl already includes it
      if (this.baseUrl.endsWith("/api/v1") && cleanPath.startsWith("api/v1/")) {
        cleanPath = cleanPath.slice("api/v1/".length);
      }
      base = `${this.baseUrl}/${cleanPath}`;
    }

    const url = new URL(base);

    if (query) {
      for (const [key, val] of Object.entries(query)) {
        if (val !== undefined && val !== null) {
          url.searchParams.append(key, String(val));
        }
      }
    }

    return url.toString();
  }

  // -------------------------------------------------------------------------
  // Core Request Execution
  // -------------------------------------------------------------------------

  /**
   * Executes an HTTP request against the SAP service.
   * Handles authentication, CSRF handshakes, OData JSON enforcement,
   * error wrapping, and response unwrapping.
   */
  public async request<T = unknown>(options: RequestOptions): Promise<ApiResponse<T>> {
    return this.executeWithRetry<T>(options, true);
  }

  private async executeWithRetry<T>(
    options: RequestOptions,
    allowCsrfRetry: boolean,
  ): Promise<ApiResponse<T>> {
    const method = (options.method ?? "GET").toUpperCase() as HttpMethod;
    const isMutating = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
    const targetUrl = this.buildUrl(options.path, options.query);

    const headers = await this.buildBaseHeaders();

    // Merge custom headers
    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    // CSRF Handshake for mutating requests
    if (isMutating && this.csrfEnabled && !options.skipCsrf) {
      const { token, cookies } = await this.fetchCsrfToken();
      headers["X-CSRF-Token"] = token;
      if (cookies.length > 0) {
        headers["Cookie"] = cookies.join("; ");
      }
    }

    // Set JSON content-type if body is present
    let bodyContent: string | undefined;
    if (options.body !== undefined && options.body !== null) {
      if (typeof options.body === "string") {
        bodyContent = options.body;
      } else {
        bodyContent = JSON.stringify(options.body);
        if (!headers["Content-Type"]) {
          headers["Content-Type"] = "application/json";
        }
      }
    }

    this.log("debug", `HTTP ${method} ${targetUrl} [Headers: ${JSON.stringify(sanitizeHeaders(headers))}]`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    let response: Response;
    try {
      response = await fetch(targetUrl, {
        method,
        headers,
        body: bodyContent,
        signal: controller.signal,
      });
    } catch (err) {
      const isAbort = err instanceof Error && err.name === "AbortError";
      const message = isAbort
        ? `Request timed out after ${this.timeoutMs}ms`
        : `Network request failed: ${err instanceof Error ? err.message : String(err)}`;

      throw new SapApiError({
        message,
        status: isAbort ? 504 : 500,
        statusText: isAbort ? "Gateway Timeout" : "Internal Client Error",
        url: targetUrl,
        method,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    // CSRF Retry Logic: if 403 Forbidden on a mutating call, invalidate CSRF cache and retry once
    if (response.status === 403 && isMutating && allowCsrfRetry && this.csrfEnabled && !options.skipCsrf) {
      this.log("warn", `Received 403 Forbidden for ${method} ${targetUrl}. Invalidating CSRF token and retrying...`);
      this.invalidateCsrfToken();
      // Retry once with allowCsrfRetry = false to prevent infinite loops
      return this.executeWithRetry<T>(options, false);
    }

    // Parse response body
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    let responseData: unknown;
    let isHtmlError = false;

    if (isJson) {
      try {
        responseData = await response.json();
      } catch {
        responseData = null;
      }
    } else {
      const text = await response.text();
      // Check if response is HTML error page (common in SAP Cloud Foundry gateway errors)
      if (text.includes("<!DOCTYPE html>") || text.includes("<html") || text.includes("<HTML")) {
        isHtmlError = true;
        // Extract clean text from HTML error page
        const titleMatch = text.match(/<title>([^<]*)<\/title>/i);
        const bodyMatch = text.match(/<body>([\s\S]*?)<\/body>/i);
        const snippet = titleMatch?.[1] || bodyMatch?.[1]?.replace(/<[^>]+>/g, " ").trim().slice(0, 300) || "HTML Error Page";
        responseData = `[HTML Gateway Response: ${snippet}]`;
      } else {
        responseData = text;
      }
    }

    // Handle HTTP Error statuses
    if (!response.ok) {
      let errorMessage = `SAP API Request Failed with status ${response.status} ${response.statusText}`;

      // Extract specific SAP OData error message if available
      if (responseData && typeof responseData === "object") {
        const errorObj = (responseData as Record<string, unknown>)["error"];
        if (errorObj && typeof errorObj === "object") {
          const messageField = (errorObj as Record<string, unknown>)["message"];
          if (typeof messageField === "string") {
            errorMessage = messageField;
          } else if (
            messageField &&
            typeof messageField === "object" &&
            typeof (messageField as Record<string, unknown>)["value"] === "string"
          ) {
            // OData v2 error format: error.message.value
            errorMessage = (messageField as Record<string, unknown>)["value"] as string;
          }
        }
      } else if (typeof responseData === "string" && responseData.length > 0) {
        errorMessage = responseData;
      }

      throw new SapApiError({
        message: errorMessage,
        status: response.status,
        statusText: response.statusText,
        url: targetUrl,
        method,
        responseBody: responseData,
        isHtmlError,
      });
    }

    // Construct response headers dictionary
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((val, key) => {
      responseHeaders[key] = val;
    });

    // Unwrap OData response if not skipped
    if (options.skipUnwrap) {
      return {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data: responseData as T,
        raw: responseData,
      };
    }

    const unwrapped = unwrapODataResponse<T>(responseData, this.maxResults);

    return {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      data: unwrapped.data,
      raw: responseData,
      hasMore: unwrapped.hasMore,
      totalCount: unwrapped.totalCount,
      nextPageToken: unwrapped.nextPageToken,
    };
  }

  // -------------------------------------------------------------------------
  // Convenience Methods
  // -------------------------------------------------------------------------

  public async get<T = unknown>(
    path: string,
    query?: Record<string, string | number | boolean | undefined>,
    headers?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "GET", path, query, headers });
  }

  public async post<T = unknown>(
    path: string,
    body?: unknown,
    query?: Record<string, string | number | boolean | undefined>,
    headers?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "POST", path, body, query, headers });
  }

  public async put<T = unknown>(
    path: string,
    body?: unknown,
    query?: Record<string, string | number | boolean | undefined>,
    headers?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "PUT", path, body, query, headers });
  }

  public async patch<T = unknown>(
    path: string,
    body?: unknown,
    query?: Record<string, string | number | boolean | undefined>,
    headers?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "PATCH", path, body, query, headers });
  }

  public async delete<T = unknown>(
    path: string,
    query?: Record<string, string | number | boolean | undefined>,
    headers?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "DELETE", path, query, headers });
  }
}

// ---------------------------------------------------------------------------
// Factory Functions
// ---------------------------------------------------------------------------

/**
 * Creates an instance of SapApiClient.
 */
export function createApiClient(options: ApiClientOptions): SapApiClient {
  return new SapApiClient(options);
}

/**
 * Creates a domain-configured SapApiClient from the application's EnvConfig.
 *
 * @param domainKey - One of "cloud-integration", "api-management", "event-mesh",
 *                    "integration-assessment", "open-connectors", "edge-integration-cell".
 * @param env - The parsed EnvConfig object.
 * @param logger - Optional server-safe logger function.
 */
export function createDomainApiClient(
  domainKey: string,
  env: EnvConfig,
  logger?: Logger,
): SapApiClient {
  let baseUrl: string | undefined;
  let auth: DomainAuthConfig | undefined;
  let csrfFetchPath = "/";

  switch (domainKey) {
    case "cloud-integration":
      baseUrl = env.cpi.url;
      if (env.cpi.tokenUrl && env.cpi.clientId && env.cpi.clientSecret) {
        auth = {
          type: "oauth2",
          tokenUrl: env.cpi.tokenUrl,
          clientId: env.cpi.clientId,
          clientSecret: env.cpi.clientSecret,
        };
      }
      csrfFetchPath = "/api/v1/";
      break;

    case "api-management":
      baseUrl = env.apim.url;
      if (env.apim.tokenUrl && env.apim.clientId && env.apim.clientSecret) {
        auth = {
          type: "oauth2",
          tokenUrl: env.apim.tokenUrl,
          clientId: env.apim.clientId,
          clientSecret: env.apim.clientSecret,
        };
      }
      csrfFetchPath = "/apiportal/api/1.0/Management.svc/";
      break;

    case "event-mesh":
      baseUrl = env.em.url;
      if (env.em.tokenUrl && env.em.clientId && env.em.clientSecret) {
        auth = {
          type: "oauth2",
          tokenUrl: env.em.tokenUrl,
          clientId: env.em.clientId,
          clientSecret: env.em.clientSecret,
        };
      }
      break;

    case "integration-assessment":
      baseUrl = env.ia.url;
      if (env.ia.tokenUrl && env.ia.clientId && env.ia.clientSecret) {
        auth = {
          type: "oauth2",
          tokenUrl: env.ia.tokenUrl,
          clientId: env.ia.clientId,
          clientSecret: env.ia.clientSecret,
        };
      }
      csrfFetchPath = "/intas/entities/v1/";
      break;

    case "open-connectors":
      baseUrl = env.oc.url;
      if (env.oc.userSecret && env.oc.orgSecret) {
        auth = {
          type: "open-connectors",
          userSecret: env.oc.userSecret,
          orgSecret: env.oc.orgSecret,
        };
      }
      break;

    case "edge-integration-cell":
      baseUrl = env.eic.url;
      if (env.eic.tokenUrl && env.eic.clientId && env.eic.clientSecret) {
        auth = {
          type: "oauth2",
          tokenUrl: env.eic.tokenUrl,
          clientId: env.eic.clientId,
          clientSecret: env.eic.clientSecret,
        };
      }
      csrfFetchPath = "/api/v1/";
      break;

    default:
      throw new Error(`Unknown domain key: "${domainKey}".`);
  }

  if (!baseUrl) {
    throw new Error(
      `Cannot create API client for domain "${domainKey}": base URL is not configured in environment.`,
    );
  }

  return new SapApiClient({
    baseUrl,
    auth,
    csrfEnabled: domainKey !== "event-mesh" && domainKey !== "open-connectors",
    csrfFetchPath,
    maxResults: env.maxResults,
    logger,
  });
}
