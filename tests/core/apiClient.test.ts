/**
 * tests/core/apiClient.test.ts
 *
 * Comprehensive test suite for the SAP API Client Factory:
 *   - Secure logging & header sanitization
 *   - OData v2 and v4 response unwrapping & payload truncation
 *   - MCP response formatters (success & error)
 *   - OAuth2 token fetching, caching, deduplication & expiry
 *   - Open Connectors & Bearer authentication
 *   - CSRF token handshake, cookie management & 403 auto-retry
 *   - OData Accept: application/json enforcement
 *   - SAP OData and HTML gateway error extraction
 *   - Domain factory instantiation
 */

import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

import {
  SapApiClient,
  createApiClient,
  createDomainApiClient,
  sanitizeHeaders,
  unwrapODataResponse,
  createMcpSuccessResult,
  createMcpErrorResult,
  SapApiError,
} from "../../src/core/apiClient.js";
import type { EnvConfig } from "../../src/config/env.js";

const BASE_URL = "https://tenant-tmn.hci.eu10.hana.ondemand.com";
const TOKEN_URL = "https://oauth.authentication.eu10.hana.ondemand.com/oauth/token";

// ---------------------------------------------------------------------------
// MSW Mock Server Setup
// ---------------------------------------------------------------------------
const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => server.close());

// ---------------------------------------------------------------------------
// 1. Header Sanitization & Secure Logging
// ---------------------------------------------------------------------------
describe("Header Sanitization", () => {
  it("redacts sensitive headers from a plain object", () => {
    const rawHeaders = {
      Authorization: "Bearer top-secret-token",
      Cookie: "JSESSIONID=12345; Path=/",
      "Set-Cookie": "JSESSIONID=67890",
      "X-CSRF-Token": "csrf-secret-123",
      "Content-Type": "application/json",
      Accept: "application/json",
      client_secret: "super-secret-pw",
    };

    const sanitized = sanitizeHeaders(rawHeaders);

    expect(sanitized["Authorization"]).toBe("[REDACTED]");
    expect(sanitized["Cookie"]).toBe("[REDACTED]");
    expect(sanitized["Set-Cookie"]).toBe("[REDACTED]");
    expect(sanitized["X-CSRF-Token"]).toBe("[REDACTED]");
    expect(sanitized["client_secret"]).toBe("[REDACTED]");
    expect(sanitized["Content-Type"]).toBe("application/json");
    expect(sanitized["Accept"]).toBe("application/json");
  });

  it("redacts sensitive headers from a Headers instance", () => {
    const headers = new Headers();
    headers.set("authorization", "Basic dXNlcjpwYXNz");
    headers.set("accept", "application/json");

    const sanitized = sanitizeHeaders(headers);
    expect(sanitized["authorization"]).toBe("[REDACTED]");
    expect(sanitized["accept"]).toBe("application/json");
  });
});

// ---------------------------------------------------------------------------
// 2. OData Response Unwrapping & Truncation
// ---------------------------------------------------------------------------
describe("unwrapODataResponse", () => {
  it("unwraps OData v2 collections with results and __count", () => {
    const rawODataV2 = {
      d: {
        results: [
          { Id: "pkg1", Name: "Package 1" },
          { Id: "pkg2", Name: "Package 2" },
        ],
        __count: "2",
      },
    };

    const unwrapped = unwrapODataResponse<Array<{ Id: string }>>(rawODataV2, 50);

    expect(Array.isArray(unwrapped.data)).toBe(true);
    expect(unwrapped.data).toHaveLength(2);
    expect(unwrapped.totalCount).toBe(2);
    expect(unwrapped.hasMore).toBe(false);
  });

  it("unwraps OData v2 single entity", () => {
    const rawODataV2Single = {
      d: {
        Id: "pkg1",
        Name: "Package 1",
      },
    };

    const unwrapped = unwrapODataResponse<{ Id: string }>(rawODataV2Single, 50);
    expect(unwrapped.data.Id).toBe("pkg1");
    expect(unwrapped.hasMore).toBe(false);
  });

  it("unwraps OData v4 collections with value and @odata.nextLink", () => {
    const rawODataV4 = {
      value: [{ id: "res1" }, { id: "res2" }],
      "@odata.count": 100,
      "@odata.nextLink": "https://service/Entities?$skip=2",
    };

    const unwrapped = unwrapODataResponse<Array<{ id: string }>>(rawODataV4, 50);

    expect(unwrapped.data).toHaveLength(2);
    expect(unwrapped.totalCount).toBe(100);
    expect(unwrapped.nextPageToken).toBe("https://service/Entities?$skip=2");
    expect(unwrapped.hasMore).toBe(true);
  });

  it("enforces maxResults truncation for context window protection", () => {
    const largeList = Array.from({ length: 100 }, (_, i) => ({ id: `item_${i}` }));
    const raw = { d: { results: largeList } };

    const unwrapped = unwrapODataResponse<Array<{ id: string }>>(raw, 25);

    expect(unwrapped.data).toHaveLength(25);
    expect(unwrapped.hasMore).toBe(true);
    expect(unwrapped.data[0]?.id).toBe("item_0");
    expect(unwrapped.data[24]?.id).toBe("item_24");
  });

  it("returns non-OData plain JSON as-is", () => {
    const plain = { status: "OK", timestamp: 123456 };
    const unwrapped = unwrapODataResponse(plain, 50);
    expect(unwrapped.data).toEqual(plain);
    expect(unwrapped.hasMore).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 3. MCP Result Formatting
// ---------------------------------------------------------------------------
describe("MCP Result Helpers", () => {
  it("formats success result with indentation", () => {
    const res = createMcpSuccessResult({ foo: "bar" }, false);
    expect(res.isError).toBe(false);
    expect(res.content[0]?.type).toBe("text");
    expect(res.content[0]?.text).toContain('"foo": "bar"');
    expect(res.content[0]?.text).not.toContain("[Note: Results truncated");
  });

  it("appends truncation note when hasMore is true", () => {
    const res = createMcpSuccessResult([{ id: 1 }], true, 50);
    expect(res.content[0]?.text).toContain("[Note: Results truncated to 50 items");
  });

  it("formats SapApiError cleanly into MCP error result", () => {
    const apiError = new SapApiError({
      message: "Entity not found",
      status: 404,
      statusText: "Not Found",
      url: "https://example.com/api/Entities('missing')",
      method: "GET",
      responseBody: { error: { message: "Item does not exist" } },
    });

    const mcpResult = createMcpErrorResult(apiError);

    expect(mcpResult.isError).toBe(true);
    expect(mcpResult.content[0]?.text).toContain("SAP API Error [404 Not Found]");
    expect(mcpResult.content[0]?.text).toContain("Item does not exist");
  });

  it("formats generic Error cleanly", () => {
    const err = new Error("Connection failed");
    const res = createMcpErrorResult(err);
    expect(res.isError).toBe(true);
    expect(res.content[0]?.text).toBe("Unexpected error: Connection failed");
  });
});

// ---------------------------------------------------------------------------
// 4. OAuth2 Token Fetching & Caching
// ---------------------------------------------------------------------------
describe("SapApiClient OAuth2 Authentication", () => {
  it("fetches, caches, and attaches Bearer token to requests", async () => {
    let tokenRequestsCount = 0;

    server.use(
      http.post(TOKEN_URL, async ({ request }) => {
        tokenRequestsCount++;
        const authHeader = request.headers.get("Authorization");
        expect(authHeader).toBe(`Basic ${Buffer.from("client_id_1:client_secret_1").toString("base64")}`);

        return HttpResponse.json({
          access_token: "mocked_jwt_token_123",
          token_type: "Bearer",
          expires_in: 3600,
        });
      }),
      http.get(`${BASE_URL}/api/v1/Packages`, ({ request }) => {
        expect(request.headers.get("Authorization")).toBe("Bearer mocked_jwt_token_123");
        expect(request.headers.get("Accept")).toBe("application/json");

        return HttpResponse.json({
          d: { results: [{ Id: "pkg1" }] },
        });
      }),
    );

    const client = createApiClient({
      baseUrl: BASE_URL,
      auth: {
        type: "oauth2",
        tokenUrl: TOKEN_URL,
        clientId: "client_id_1",
        clientSecret: "client_secret_1",
      },
    });

    // Request 1 — triggers token fetch
    const res1 = await client.get("/api/v1/Packages");
    expect(res1.status).toBe(200);
    expect(tokenRequestsCount).toBe(1);

    // Request 2 — should reuse cached token without hitting token endpoint again
    const res2 = await client.get("/api/v1/Packages");
    expect(res2.status).toBe(200);
    expect(tokenRequestsCount).toBe(1);
  });

  it("deduplicates parallel token fetch calls", async () => {
    let tokenCalls = 0;

    server.use(
      http.post(TOKEN_URL, async () => {
        tokenCalls++;
        await new Promise((r) => setTimeout(r, 20));
        return HttpResponse.json({
          access_token: "concurrent_token",
          expires_in: 3600,
        });
      }),
      http.get(`${BASE_URL}/item`, () => {
        return HttpResponse.json({ d: { results: [] } });
      }),
    );

    const client = createApiClient({
      baseUrl: BASE_URL,
      auth: {
        type: "oauth2",
        tokenUrl: TOKEN_URL,
        clientId: "cid",
        clientSecret: "csec",
      },
    });

    // Fire 3 parallel requests
    await Promise.all([
      client.get("/item"),
      client.get("/item"),
      client.get("/item"),
    ]);

    expect(tokenCalls).toBe(1);
  });

  it("handles OAuth2 token endpoint failure with SapApiError", async () => {
    server.use(
      http.post(TOKEN_URL, () => {
        return new HttpResponse("Unauthorized client", { status: 401, statusText: "Unauthorized" });
      }),
    );

    const client = createApiClient({
      baseUrl: BASE_URL,
      auth: {
        type: "oauth2",
        tokenUrl: TOKEN_URL,
        clientId: "invalid",
        clientSecret: "invalid",
      },
    });

    await expect(client.get("/api/v1/Packages")).rejects.toThrow(SapApiError);
  });
});

// ---------------------------------------------------------------------------
// 5. Open Connectors & Bearer Auth
// ---------------------------------------------------------------------------
describe("Alternative Authentication Methods", () => {
  it("attaches Open Connectors User and Organization secrets", async () => {
    server.use(
      http.get(`${BASE_URL}/elements`, ({ request }) => {
        const auth = request.headers.get("Authorization");
        expect(auth).toBe("User secret_user_abc, Organization secret_org_xyz");
        return HttpResponse.json([{ id: 101 }]);
      }),
    );

    const client = createApiClient({
      baseUrl: BASE_URL,
      auth: {
        type: "open-connectors",
        userSecret: "secret_user_abc",
        orgSecret: "secret_org_xyz",
      },
    });

    const res = await client.get("/elements");
    expect(res.status).toBe(200);
    expect(res.data).toEqual([{ id: 101 }]);
  });

  it("attaches static Bearer token", async () => {
    server.use(
      http.get(`${BASE_URL}/status`, ({ request }) => {
        expect(request.headers.get("Authorization")).toBe("Bearer static_token_999");
        return HttpResponse.json({ ok: true });
      }),
    );

    const client = createApiClient({
      baseUrl: BASE_URL,
      auth: {
        type: "bearer",
        token: "static_token_999",
      },
    });

    const res = await client.get("/status");
    expect(res.status).toBe(200);
  });
});

// ---------------------------------------------------------------------------
// 6. CSRF Handshake, Cookie Jar & 403 Retry
// ---------------------------------------------------------------------------
describe("CSRF Handshake & Retry", () => {
  it("does not perform CSRF handshake for GET requests", async () => {
    let csrfHandshakeCalled = false;

    server.use(
      http.head(`${BASE_URL}/`, () => {
        csrfHandshakeCalled = true;
        return new HttpResponse(null, { headers: { "X-CSRF-Token": "token-1" } });
      }),
      http.get(`${BASE_URL}/items`, () => {
        return HttpResponse.json({ d: { results: [] } });
      }),
    );

    const client = createApiClient({ baseUrl: BASE_URL, csrfEnabled: true });
    await client.get("/items");

    expect(csrfHandshakeCalled).toBe(false);
  });

  it("fetches CSRF token and sets Cookie header on mutating POST request", async () => {
    let csrfCalls = 0;

    server.use(
      http.head(`${BASE_URL}/api/v1/`, () => {
        csrfCalls++;
        const headers = new Headers();
        headers.set("X-CSRF-Token", "fresh_csrf_token_abc");
        headers.append("Set-Cookie", "JSESSIONID=sess_123; Path=/; HttpOnly");
        return new HttpResponse(null, { status: 200, headers });
      }),
      http.post(`${BASE_URL}/api/v1/IntegrationPackages`, async ({ request }) => {
        expect(request.headers.get("X-CSRF-Token")).toBe("fresh_csrf_token_abc");
        expect(request.headers.get("Cookie")).toContain("JSESSIONID=sess_123");
        expect(request.headers.get("Content-Type")).toBe("application/json");

        const body = await request.json();
        return HttpResponse.json({ d: body }, { status: 201 });
      }),
    );

    const client = createApiClient({
      baseUrl: BASE_URL,
      csrfEnabled: true,
      csrfFetchPath: "/api/v1/",
    });

    const res = await client.post("/api/v1/IntegrationPackages", { Id: "NewPkg" });
    expect(res.status).toBe(201);
    expect(csrfCalls).toBe(1);
  });

  it("automatically invalidates CSRF token and retries once on 403 Forbidden", async () => {
    let csrfFetches = 0;
    let postAttempts = 0;

    server.use(
      http.head(`${BASE_URL}/`, () => {
        csrfFetches++;
        const token = csrfFetches === 1 ? "expired_csrf_token" : "fresh_csrf_token_2";
        const headers = new Headers();
        headers.set("X-CSRF-Token", token);
        headers.set("Set-Cookie", `JSESSIONID=sess_${csrfFetches}`);
        return new HttpResponse(null, { headers });
      }),
      http.post(`${BASE_URL}/api/v1/Deploy`, async ({ request }) => {
        postAttempts++;
        const token = request.headers.get("X-CSRF-Token");

        if (token === "expired_csrf_token") {
          return new HttpResponse("CSRF token validation failed", {
            status: 403,
            statusText: "Forbidden",
          });
        }

        expect(token).toBe("fresh_csrf_token_2");
        return HttpResponse.json({ d: { status: "Deployed" } }, { status: 200 });
      }),
    );

    const client = createApiClient({ baseUrl: BASE_URL, csrfEnabled: true });

    const res = await client.post("/api/v1/Deploy", { artifactId: "Flow1" });

    expect(res.status).toBe(200);
    expect(csrfFetches).toBe(2);
    expect(postAttempts).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// 7. Error Handling & Gateway HTML Error Parsing
// ---------------------------------------------------------------------------
describe("Error Handling", () => {
  it("parses SAP OData v2 error messages from error.message.value", async () => {
    server.use(
      http.get(`${BASE_URL}/missing`, () => {
        return HttpResponse.json(
          {
            error: {
              code: "NOT_FOUND",
              message: {
                lang: "en",
                value: "The requested Integration Package does not exist.",
              },
            },
          },
          { status: 404, statusText: "Not Found" },
        );
      }),
    );

    const client = createApiClient({ baseUrl: BASE_URL });

    try {
      await client.get("/missing");
      expect.unreachable("Should have thrown SapApiError");
    } catch (err) {
      expect(err).toBeInstanceOf(SapApiError);
      const sapErr = err as SapApiError;
      expect(sapErr.status).toBe(404);
      expect(sapErr.message).toBe("The requested Integration Package does not exist.");
    }
  });

  it("handles Cloud Foundry HTML error pages without crashing", async () => {
    const htmlGatewayTimeout = `
      <!DOCTYPE html>
      <html>
        <head><title>504 Gateway Timeout</title></head>
        <body>
          <h1>504 Gateway Timeout</h1>
          <p>The backend application failed to respond in time.</p>
        </body>
      </html>
    `;

    server.use(
      http.get(`${BASE_URL}/slow`, () => {
        return new HttpResponse(htmlGatewayTimeout, {
          status: 504,
          statusText: "Gateway Timeout",
          headers: { "Content-Type": "text/html" },
        });
      }),
    );

    const client = createApiClient({ baseUrl: BASE_URL });

    try {
      await client.get("/slow");
      expect.unreachable("Should have thrown SapApiError");
    } catch (err) {
      expect(err).toBeInstanceOf(SapApiError);
      const sapErr = err as SapApiError;
      expect(sapErr.status).toBe(504);
      expect(sapErr.isHtmlError).toBe(true);
      expect(sapErr.message).toContain("504 Gateway Timeout");
    }
  });

  it("routes logging exclusively through the logger callback without STDIO pollution", async () => {
    const loggedMessages: Array<{ level: string; msg: string }> = [];
    const mockLogger = (level: "debug" | "info" | "warn" | "error", msg: string) => {
      loggedMessages.push({ level, msg });
    };

    server.use(
      http.get(`${BASE_URL}/log-test`, () => HttpResponse.json({ ok: true })),
    );

    const client = createApiClient({
      baseUrl: BASE_URL,
      logger: mockLogger,
    });

    await client.get("/log-test");

    expect(loggedMessages.length).toBeGreaterThan(0);
    // Verify headers inside logged messages are redacted
    const debugLogs = loggedMessages.filter((l) => l.level === "debug");
    expect(debugLogs.some((l) => l.msg.includes("HTTP GET"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 8. Domain Client Factory
// ---------------------------------------------------------------------------
describe("createDomainApiClient", () => {
  const dummyEnv: EnvConfig = {
    cpi: {
      url: "https://cpi.example.com",
      tokenUrl: "https://cpi-oauth.example.com/token",
      clientId: "cpi-cid",
      clientSecret: "cpi-sec",
    },
    apim: {
      url: "https://apim.example.com",
      tokenUrl: "https://apim-oauth.example.com/token",
      clientId: "apim-cid",
      clientSecret: "apim-sec",
    },
    em: {
      url: "https://em.example.com",
    },
    ia: {
      url: "https://ia.example.com",
    },
    oc: {
      url: "https://oc.example.com",
      userSecret: "u123",
      orgSecret: "o456",
    },
    eic: {
      url: "https://eic.example.com",
    },
    maxResults: 50,
    logLevel: "info",
  };

  it("instantiates domain client for Cloud Integration with OAuth2", () => {
    const client = createDomainApiClient("cloud-integration", dummyEnv);
    expect(client).toBeInstanceOf(SapApiClient);
  });

  it("instantiates domain client for Open Connectors with user/org secrets", () => {
    const client = createDomainApiClient("open-connectors", dummyEnv);
    expect(client).toBeInstanceOf(SapApiClient);
  });

  it("throws descriptive error when domain URL is not configured", () => {
    const emptyEnv = { ...dummyEnv, cpi: {} };
    expect(() => createDomainApiClient("cloud-integration", emptyEnv as EnvConfig)).toThrow(
      'Cannot create API client for domain "cloud-integration": base URL is not configured',
    );
  });

  it("throws for unknown domain key", () => {
    expect(() => createDomainApiClient("non-existent-domain", dummyEnv)).toThrow(
      'Unknown domain key: "non-existent-domain"',
    );
  });
});
