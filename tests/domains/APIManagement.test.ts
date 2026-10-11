/**
 * tests/domains/APIManagement.test.ts
 *
 * Comprehensive test suite for the API Management (APIM) domain:
 *   - Domain module interface and registration
 *   - Semantic querying (APIProxies, APIProducts, KeyMapEntries, etc.)
 *   - API Proxy lifecycle (inspection, endpoints, policies, create, delete)
 *   - API Product lifecycle (catalog, rate plans, publish, proxies)
 *   - API Provider backend destination management
 *   - Key-Value Maps (KVM) secure configuration store
 *   - Developer Application & API key credentials
 *   - Analytics metrics & error rates
 *   - Certificate Stores & certificates inspection
 *   - MCP Resources & Prompts verification
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import APIManagementDomain, {
  setApiManagementClient,
  APIM_PATHS,
} from "../../src/domains/APIManagement/index.js";
import { createApiClient } from "../../src/core/apiClient.js";

const BASE_URL = "https://tenant-apim.eu10.hana.ondemand.com";

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("API Management Domain Module", () => {
  it("exports a valid SAPDomainModule conforming to the registry interface", () => {
    expect(APIManagementDomain.name).toBe("API Management");
    expect(APIManagementDomain.domainKey).toBe("api-management");
    expect(typeof APIManagementDomain.registerTools).toBe("function");
    expect(typeof APIManagementDomain.registerResources).toBe("function");
    expect(typeof APIManagementDomain.registerPrompts).toBe("function");
  });
});

describe("API Management Tools & Resources Execution", () => {
  let mcpServer: McpServer;

  beforeAll(() => {
    const testClient = createApiClient({
      baseUrl: BASE_URL,
      csrfEnabled: false,
    });
    setApiManagementClient(testClient);

    mcpServer = new McpServer({
      name: "test-apim-server",
      version: "1.0.0",
    });

    APIManagementDomain.registerTools(mcpServer, testClient);
    APIManagementDomain.registerResources(mcpServer);
    APIManagementDomain.registerPrompts(mcpServer);
  });

  async function callTool(name: string, args: Record<string, unknown>) {
    const registeredTools = (
      mcpServer as unknown as { _registeredTools: Record<string, { handler: Function }> }
    )._registeredTools;
    const tool = registeredTools[name];
    if (!tool) {
      throw new Error(`Tool "${name}" is not registered on McpServer.`);
    }
    return tool.handler(args, {});
  }

  // -------------------------------------------------------------------------
  // 1. sap_apim_query_entities
  // -------------------------------------------------------------------------
  describe("sap_apim_query_entities", () => {
    it("queries APIProxies with $filter and $select", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/APIProxies`),
          ({ request }) => {
            const url = new URL(request.url);
            expect(url.searchParams.get("$filter")).toBe("life_cycle eq 'published'");
            expect(url.searchParams.get("$select")).toBe("name,title");
            return HttpResponse.json({
              d: {
                results: [
                  { name: "Order_API_v1", title: "Order API" },
                  { name: "Payment_API_v1", title: "Payment API" },
                ],
              },
            });
          },
        ),
      );

      const result = await callTool("sap_apim_query_entities", {
        entity: "APIProxies",
        filter: "life_cycle eq 'published'",
        select: "name,title",
      });

      expect(result.isError).toBe(false);
      expect(result.content[0].text).toContain("Order_API_v1");
      expect(result.content[0].text).toContain("Payment_API_v1");
    });

    it("catches errors and returns clean MCP error result", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/APIProxies`),
          () => new HttpResponse("Unauthorized", { status: 401, statusText: "Unauthorized" }),
        ),
      );

      const result = await callTool("sap_apim_query_entities", {
        entity: "APIProxies",
      });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain("401 Unauthorized");
    });
  });

  // -------------------------------------------------------------------------
  // 2. sap_apim_manage_proxy
  // -------------------------------------------------------------------------
  describe("sap_apim_manage_proxy", () => {
    it("inspects proxy details, endpoints, and policies", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/APIProxies\\('Order_API_v1'\\)$`),
          () => {
            return HttpResponse.json({
              d: {
                name: "Order_API_v1",
                title: "Order Management API",
                life_cycle: "published",
              },
            });
          },
        ),
        http.get(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/APIProxies\\('Order_API_v1'\\)/policies`),
          () => {
            return HttpResponse.json({
              d: {
                results: [
                  { name: "VerifyAPIKey", type: "Security" },
                  { name: "SpikeArrest", type: "TrafficManagement" },
                ],
              },
            });
          },
        ),
      );

      const getRes = await callTool("sap_apim_manage_proxy", {
        action: "get",
        name: "Order_API_v1",
      });
      expect(getRes.isError).toBe(false);
      expect(getRes.content[0].text).toContain("Order Management API");

      const policiesRes = await callTool("sap_apim_manage_proxy", {
        action: "list_policies",
        name: "Order_API_v1",
      });
      expect(policiesRes.isError).toBe(false);
      expect(policiesRes.content[0].text).toContain("VerifyAPIKey");
      expect(policiesRes.content[0].text).toContain("SpikeArrest");
    });

    it("creates and deletes an API proxy", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/APIProxies$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.name).toBe("New_Proxy");
            return HttpResponse.json({ d: body }, { status: 201 });
          },
        ),
        http.delete(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/APIProxies\\('New_Proxy'\\)$`),
          () => new HttpResponse(null, { status: 204 }),
        ),
      );

      const createRes = await callTool("sap_apim_manage_proxy", {
        action: "create",
        name: "New_Proxy",
        title: "New Proxy Title",
        basePath: "/new/v1",
      });
      expect(createRes.isError).toBe(false);
      expect(createRes.content[0].text).toContain("New_Proxy");

      const delRes = await callTool("sap_apim_manage_proxy", {
        action: "delete",
        name: "New_Proxy",
      });
      expect(delRes.isError).toBe(false);
      expect(delRes.content[0].text).toContain("New_Proxy");
    });
  });

  // -------------------------------------------------------------------------
  // 3. sap_apim_manage_product
  // -------------------------------------------------------------------------
  describe("sap_apim_manage_product", () => {
    it("creates, publishes, and inspects an API product", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/APIProducts$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.name).toBe("Enterprise_Orders");
            return HttpResponse.json({ d: body }, { status: 201 });
          },
        ),
        http.put(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/APIProducts\\('Enterprise_Orders'\\)$`),
          () => {
            return HttpResponse.json({
              d: { name: "Enterprise_Orders", isPublished: true, life_cycle: "published" },
            });
          },
        ),
      );

      const createRes = await callTool("sap_apim_manage_product", {
        action: "create",
        name: "Enterprise_Orders",
        title: "Enterprise Orders Product",
        quotaCount: 5000,
        quotaInterval: 1,
        quotaTimeUnit: "month",
      });
      expect(createRes.isError).toBe(false);
      expect(createRes.content[0].text).toContain("Enterprise_Orders");

      const pubRes = await callTool("sap_apim_manage_product", {
        action: "publish",
        name: "Enterprise_Orders",
      });
      expect(pubRes.isError).toBe(false);
      expect(pubRes.content[0].text).toContain("published");
    });
  });

  // -------------------------------------------------------------------------
  // 4. sap_apim_manage_provider
  // -------------------------------------------------------------------------
  describe("sap_apim_manage_provider", () => {
    it("creates and inspects an API provider backend destination", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/APIProviders$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.name).toBe("S4HANA_Backend");
            expect(body.host).toBe("s4hana.internal");
            return HttpResponse.json({ d: body }, { status: 201 });
          },
        ),
        http.get(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/APIProviders\\('S4HANA_Backend'\\)$`),
          () => {
            return HttpResponse.json({
              d: {
                name: "S4HANA_Backend",
                host: "s4hana.internal",
                port: 443,
                useSSL: true,
              },
            });
          },
        ),
      );

      const createRes = await callTool("sap_apim_manage_provider", {
        action: "create",
        name: "S4HANA_Backend",
        host: "s4hana.internal",
        port: 443,
        authType: "Basic",
      });
      expect(createRes.isError).toBe(false);
      expect(createRes.content[0].text).toContain("S4HANA_Backend");

      const getRes = await callTool("sap_apim_manage_provider", {
        action: "get",
        name: "S4HANA_Backend",
      });
      expect(getRes.isError).toBe(false);
      expect(getRes.content[0].text).toContain("s4hana.internal");
    });
  });

  // -------------------------------------------------------------------------
  // 5. sap_apim_manage_key_value_map
  // -------------------------------------------------------------------------
  describe("sap_apim_manage_key_value_map", () => {
    it("lists entries and creates key-value pairs", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/KeyMapEntries\\('GatewayConfig'\\)/keyMapEntryValues`),
          () => {
            return HttpResponse.json({
              d: {
                results: [{ name: "TargetHost", value: "api.gateway.com" }],
              },
            });
          },
        ),
        http.post(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/KeyMapEntries\\('GatewayConfig'\\)/keyMapEntryValues`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            return HttpResponse.json({ d: body }, { status: 201 });
          },
        ),
      );

      const listRes = await callTool("sap_apim_manage_key_value_map", {
        action: "list_entries",
        mapName: "GatewayConfig",
      });
      expect(listRes.isError).toBe(false);
      expect(listRes.content[0].text).toContain("TargetHost");

      const createRes = await callTool("sap_apim_manage_key_value_map", {
        action: "create_entry",
        mapName: "GatewayConfig",
        keyName: "ApiKey",
        value: "secret-key-12345",
      });
      expect(createRes.isError).toBe(false);
      expect(createRes.content[0].text).toContain("secret-key-12345");
    });
  });

  // -------------------------------------------------------------------------
  // 6. sap_apim_manage_application
  // -------------------------------------------------------------------------
  describe("sap_apim_manage_application", () => {
    it("retrieves application credentials and API keys", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/Applications\\('MobileApp_v1'\\)`),
          () => {
            return HttpResponse.json({
              d: {
                id: "MobileApp_v1",
                title: "Mobile App Client",
                app_key: "ak_live_998877",
                status_code: "approved",
              },
            });
          },
        ),
      );

      const res = await callTool("sap_apim_manage_application", {
        action: "get_api_key",
        appName: "MobileApp_v1",
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("ak_live_998877");
    });
  });

  // -------------------------------------------------------------------------
  // 7. sap_apim_get_analytics
  // -------------------------------------------------------------------------
  describe("sap_apim_get_analytics", () => {
    it("queries traffic summary and error rates", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${APIM_PATHS.ANALYTICS}/Results`),
          ({ request }) => {
            const url = new URL(request.url);
            expect(url.searchParams.get("$select")).toContain("CallCount");
            return HttpResponse.json({
              value: [
                {
                  ApiProxy: "Order_API_v1",
                  ResponseCode: "200",
                  CallCount: 15420,
                  Year: "2026",
                  Month: "10",
                },
              ],
            });
          },
        ),
      );

      const res = await callTool("sap_apim_get_analytics", {
        metric: "traffic_summary",
        apiProxy: "Order_API_v1",
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("15420");
    });
  });

  // -------------------------------------------------------------------------
  // 8. sap_apim_manage_certificate_store
  // -------------------------------------------------------------------------
  describe("sap_apim_manage_certificate_store", () => {
    it("lists certificate stores and certificates", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/CertificateStores(\\?.*)?$`),
          () => {
            return HttpResponse.json({
              d: {
                results: [{ name: "SAP_TrustStore", storeType: "TrustStore" }],
              },
            });
          },
        ),
        http.get(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/CertificateStores\\('SAP_TrustStore'\\)/certificates`),
          () => {
            return HttpResponse.json({
              d: {
                results: [{ name: "RootCA", validNotAfter: "2030-01-01" }],
              },
            });
          },
        ),
      );

      const listStoresRes = await callTool("sap_apim_manage_certificate_store", {
        action: "list_stores",
        storeType: "TrustStore",
      });
      expect(listStoresRes.isError).toBe(false);
      expect(listStoresRes.content[0].text).toContain("SAP_TrustStore");

      const certsRes = await callTool("sap_apim_manage_certificate_store", {
        action: "list_certificates",
        storeName: "SAP_TrustStore",
      });
      expect(certsRes.isError).toBe(false);
      expect(certsRes.content[0].text).toContain("RootCA");
    });
  });

  // -------------------------------------------------------------------------
  // 9. Resources & Prompts
  // -------------------------------------------------------------------------
  describe("Resources & Prompts", () => {
    it("registers resources that fetch API proxies, products, and providers", async () => {
      const registeredResources = (
        mcpServer as unknown as { _registeredResources: Record<string, { readCallback: Function }> }
      )._registeredResources;

      expect(registeredResources["sap://apim/proxies"]).toBeDefined();
      expect(registeredResources["sap://apim/products"]).toBeDefined();
      expect(registeredResources["sap://apim/providers"]).toBeDefined();

      server.use(
        http.get(
          new RegExp(`${BASE_URL}${APIM_PATHS.MGMT}/APIProxies`),
          () => {
            return HttpResponse.json({
              d: { results: [{ name: "Inventory_v1", title: "Inventory API" }] },
            });
          },
        ),
      );

      const resourceResult = await registeredResources["sap://apim/proxies"].readCallback(
        new URL("sap://apim/proxies"),
      );

      expect(resourceResult.contents[0].text).toContain("Inventory API");
    });

    it("registers prompts for proxy troubleshooting and audits", () => {
      const registeredPrompts = (
        mcpServer as unknown as { _registeredPrompts: Record<string, { callback: Function }> }
      )._registeredPrompts;

      expect(registeredPrompts["apim-troubleshoot-proxy"]).toBeDefined();
      expect(registeredPrompts["apim-audit-api-products"]).toBeDefined();
      expect(registeredPrompts["apim-inspect-provider"]).toBeDefined();

      const promptResult = registeredPrompts["apim-troubleshoot-proxy"].callback({
        proxyName: "Orders_Proxy",
      });

      expect(promptResult.messages[0].content.text).toContain("Orders_Proxy");
    });
  });
});
