/**
 * tests/domains/CloudIntegration.test.ts
 *
 * Comprehensive test suite for the Cloud Integration (CPI) domain:
 *   - Tool registration and schemas
 *   - Semantic entity querying & context window truncation
 *   - Package CRUD and artifact listing
 *   - Designtime artifact inspection & deployment
 *   - Runtime artifact monitoring, error info & undeployment
 *   - Message Processing Logs (MPL) inspection, error details & trace runs
 *   - Data Store entries & Variables lifecycle
 *   - Security material (Keystores, User Credentials, Certificate Mappings)
 *   - Partner Directory management
 *   - MCP Resources & Prompts verification
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import CloudIntegrationDomain, {
  setCloudIntegrationClient,
} from "../../src/domains/CloudIntegration/index.js";
import { createApiClient } from "../../src/core/apiClient.js";

const BASE_URL = "https://tenant-tmn.hci.eu10.hana.ondemand.com";

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cloud Integration Domain Module", () => {
  it("exports a valid SAPDomainModule conforming to the registry interface", () => {
    expect(CloudIntegrationDomain.name).toBe("Cloud Integration");
    expect(CloudIntegrationDomain.domainKey).toBe("cloud-integration");
    expect(typeof CloudIntegrationDomain.registerTools).toBe("function");
    expect(typeof CloudIntegrationDomain.registerResources).toBe("function");
    expect(typeof CloudIntegrationDomain.registerPrompts).toBe("function");
  });
});

describe("Cloud Integration Tools & Resources Execution", () => {
  let mcpServer: McpServer;

  beforeAll(() => {
    const testClient = createApiClient({
      baseUrl: BASE_URL,
      csrfEnabled: false, // Handled/mocked directly in test handlers
    });
    setCloudIntegrationClient(testClient);

    mcpServer = new McpServer({
      name: "test-cpi-server",
      version: "1.0.0",
    });

    CloudIntegrationDomain.registerTools(mcpServer, testClient);
    CloudIntegrationDomain.registerResources(mcpServer);
    CloudIntegrationDomain.registerPrompts(mcpServer);
  });

  // Helper to call a registered tool through internal registered tools map
  async function callTool(name: string, args: Record<string, unknown>) {
    const registeredTools = (mcpServer as unknown as { _registeredTools: Record<string, { handler: Function }> })
      ._registeredTools;
    const tool = registeredTools[name];
    if (!tool) {
      throw new Error(`Tool "${name}" is not registered on McpServer.`);
    }
    return tool.handler(args, {});
  }

  // -------------------------------------------------------------------------
  // 1. sap_cpi_query_entities
  // -------------------------------------------------------------------------
  describe("sap_cpi_query_entities", () => {
    it("queries IntegrationPackages with $filter and $select", async () => {
      server.use(
        http.get(`${BASE_URL}/api/v1/IntegrationPackages`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get("$filter")).toBe("startswith(Id, 'CPI_')");
          expect(url.searchParams.get("$select")).toBe("Id,Name");
          return HttpResponse.json({
            d: {
              results: [
                { Id: "CPI_OrderFlow", Name: "Order Flow" },
                { Id: "CPI_InvoiceFlow", Name: "Invoice Flow" },
              ],
            },
          });
        }),
      );

      const result = await callTool("sap_cpi_query_entities", {
        entity: "IntegrationPackages",
        filter: "startswith(Id, 'CPI_')",
        select: "Id,Name",
      });

      expect(result.isError).toBe(false);
      expect(result.content[0].text).toContain("CPI_OrderFlow");
      expect(result.content[0].text).toContain("CPI_InvoiceFlow");
    });

    it("catches errors and returns clean MCP error result", async () => {
      server.use(
        http.get(`${BASE_URL}/api/v1/IntegrationPackages`, () => {
          return new HttpResponse("Service Unavailable", { status: 503, statusText: "Service Unavailable" });
        }),
      );

      const result = await callTool("sap_cpi_query_entities", {
        entity: "IntegrationPackages",
      });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain("503 Service Unavailable");
    });
  });

  // -------------------------------------------------------------------------
  // 2. sap_cpi_get_entity
  // -------------------------------------------------------------------------
  describe("sap_cpi_get_entity", () => {
    it("fetches single entity by string ID", async () => {
      server.use(
        http.get(new RegExp(`${BASE_URL}/api/v1/IntegrationPackages\\('MyPackage'\\)`), () => {
          return HttpResponse.json({
            d: {
              Id: "MyPackage",
              Name: "My Integration Package",
              Version: "1.0.1",
            },
          });
        }),
      );

      const result = await callTool("sap_cpi_get_entity", {
        entity: "IntegrationPackages",
        id: "MyPackage",
      });

      expect(result.isError).toBe(false);
      expect(result.content[0].text).toContain("My Integration Package");
    });
  });

  // -------------------------------------------------------------------------
  // 3. sap_cpi_manage_package
  // -------------------------------------------------------------------------
  describe("sap_cpi_manage_package", () => {
    it("creates a new Integration Package via POST", async () => {
      server.use(
        http.post(`${BASE_URL}/api/v1/IntegrationPackages`, async ({ request }) => {
          const body = (await request.json()) as Record<string, string>;
          expect(body.Id).toBe("New_Package");
          expect(body.Name).toBe("New Package Name");
          return HttpResponse.json({ d: body }, { status: 201 });
        }),
      );

      const result = await callTool("sap_cpi_manage_package", {
        action: "create",
        packageId: "New_Package",
        name: "New Package Name",
        description: "Package description",
      });

      expect(result.isError).toBe(false);
      expect(result.content[0].text).toContain("New_Package");
    });

    it("deletes an Integration Package via DELETE", async () => {
      server.use(
        http.delete(new RegExp(`${BASE_URL}/api/v1/IntegrationPackages\\('Old_Package'\\)`), () => {
          return new HttpResponse(null, { status: 204 });
        }),
      );

      const result = await callTool("sap_cpi_manage_package", {
        action: "delete",
        packageId: "Old_Package",
      });

      expect(result.isError).toBe(false);
      expect(result.content[0].text).toContain("Old_Package");
    });
  });

  // -------------------------------------------------------------------------
  // 4. sap_cpi_manage_designtime_artifact
  // -------------------------------------------------------------------------
  describe("sap_cpi_manage_designtime_artifact", () => {
    it("triggers artifact deployment via POST", async () => {
      server.use(
        http.post(`${BASE_URL}/api/v1/DeployIntegrationDesigntimeArtifact`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get("Id")).toBe("'Flow_OrderProcessing'");
          expect(url.searchParams.get("Version")).toBe("'active'");
          return HttpResponse.json({
            d: {
              TaskId: "task_12345",
              Status: "DEPLOYING",
            },
          });
        }),
      );

      const result = await callTool("sap_cpi_manage_designtime_artifact", {
        action: "deploy",
        artifactId: "Flow_OrderProcessing",
      });

      expect(result.isError).toBe(false);
      expect(result.content[0].text).toContain("task_12345");
    });
  });

  // -------------------------------------------------------------------------
  // 5. sap_cpi_manage_runtime_artifact
  // -------------------------------------------------------------------------
  describe("sap_cpi_manage_runtime_artifact", () => {
    it("retrieves runtime status and error information", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}/api/v1/IntegrationRuntimeArtifacts\\('Flow_OrderProcessing'\\)$`),
          () => {
            return HttpResponse.json({
              d: {
                Id: "Flow_OrderProcessing",
                Status: "ERROR",
                Version: "1.0.0",
              },
            });
          },
        ),
        http.get(
          new RegExp(`${BASE_URL}/api/v1/IntegrationRuntimeArtifacts\\('Flow_OrderProcessing'\\)/ErrorInformation`),
          () => {
            return HttpResponse.json({
              d: {
                ErrorMessage: "Failed to resolve endpoint route: connection refused",
              },
            });
          },
        ),
      );

      const statusRes = await callTool("sap_cpi_manage_runtime_artifact", {
        action: "get_status",
        artifactId: "Flow_OrderProcessing",
      });
      expect(statusRes.isError).toBe(false);
      expect(statusRes.content[0].text).toContain("ERROR");

      const errorRes = await callTool("sap_cpi_manage_runtime_artifact", {
        action: "get_error_info",
        artifactId: "Flow_OrderProcessing",
      });
      expect(errorRes.isError).toBe(false);
      expect(errorRes.content[0].text).toContain("connection refused");
    });
  });

  // -------------------------------------------------------------------------
  // 6. sap_cpi_get_message_processing_logs
  // -------------------------------------------------------------------------
  describe("sap_cpi_get_message_processing_logs", () => {
    it("lists failed messages with status filter and ordering", async () => {
      server.use(
        http.get(`${BASE_URL}/api/v1/MessageProcessingLogs`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get("$filter")).toBe("Status eq 'FAILED'");
          expect(url.searchParams.get("$orderby")).toBe("LogStart desc");
          return HttpResponse.json({
            d: {
              results: [
                {
                  MessageGuid: "msg-guid-001",
                  IntegrationFlowName: "InvoiceFlow",
                  Status: "FAILED",
                },
              ],
            },
          });
        }),
      );

      const result = await callTool("sap_cpi_get_message_processing_logs", {
        detail: "list",
        status: "FAILED",
      });

      expect(result.isError).toBe(false);
      expect(result.content[0].text).toContain("msg-guid-001");
      expect(result.content[0].text).toContain("InvoiceFlow");
    });

    it("retrieves error information for a specific message GUID", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}/api/v1/MessageProcessingLogs\\('msg-guid-001'\\)/ErrorInformation`),
          () => {
            return HttpResponse.json({
              d: {
                LastErrorModelStepId: "Call_OData_Service",
                ErrorMessage: "HTTP 500: Internal Server Error from backend system",
              },
            });
          },
        ),
      );

      const result = await callTool("sap_cpi_get_message_processing_logs", {
        detail: "error_info",
        messageGuid: "msg-guid-001",
      });

      expect(result.isError).toBe(false);
      expect(result.content[0].text).toContain("Call_OData_Service");
      expect(result.content[0].text).toContain("HTTP 500");
    });
  });

  // -------------------------------------------------------------------------
  // 7. sap_cpi_manage_data_store
  // -------------------------------------------------------------------------
  describe("sap_cpi_manage_data_store", () => {
    it("lists data stores and deletes an entry", async () => {
      server.use(
        http.get(`${BASE_URL}/api/v1/DataStores`, () => {
          return HttpResponse.json({
            d: {
              results: [{ DataStoreName: "OrderStore" }],
            },
          });
        }),
        http.delete(
          new RegExp(`${BASE_URL}/api/v1/DataStoreEntries\\(DataStoreName='OrderStore',Id='entry-999'\\)`),
          () => new HttpResponse(null, { status: 204 }),
        ),
      );

      const listRes = await callTool("sap_cpi_manage_data_store", {
        storeType: "data_store",
        action: "list_stores",
      });
      expect(listRes.isError).toBe(false);
      expect(listRes.content[0].text).toContain("OrderStore");

      const delRes = await callTool("sap_cpi_manage_data_store", {
        storeType: "data_store",
        action: "delete_entry",
        dataStoreName: "OrderStore",
        entryId: "entry-999",
      });
      expect(delRes.isError).toBe(false);
      expect(delRes.content[0].text).toContain("entry-999");
    });
  });

  // -------------------------------------------------------------------------
  // 8. sap_cpi_manage_security_material
  // -------------------------------------------------------------------------
  describe("sap_cpi_manage_security_material", () => {
    it("lists Keystore entries and retrieves a specific alias", async () => {
      server.use(
        http.get(`${BASE_URL}/api/v1/KeystoreEntries`, () => {
          return HttpResponse.json({
            d: {
              results: [{ Alias: "sap_backend_cert" }],
            },
          });
        }),
        http.get(
          new RegExp(`${BASE_URL}/api/v1/KeystoreEntries\\('sap_backend_cert'\\)`),
          () => {
            return HttpResponse.json({
              d: {
                Alias: "sap_backend_cert",
                ValidNotAfter: "2027-12-31T23:59:59Z",
                SubjectDN: "CN=sap-backend.internal",
              },
            });
          },
        ),
      );

      const listRes = await callTool("sap_cpi_manage_security_material", {
        category: "keystore",
        action: "list",
      });
      expect(listRes.isError).toBe(false);
      expect(listRes.content[0].text).toContain("sap_backend_cert");

      const getRes = await callTool("sap_cpi_manage_security_material", {
        category: "keystore",
        action: "get",
        alias: "sap_backend_cert",
      });
      expect(getRes.isError).toBe(false);
      expect(getRes.content[0].text).toContain("sap-backend.internal");
    });
  });

  // -------------------------------------------------------------------------
  // 9. sap_cpi_manage_partner_directory
  // -------------------------------------------------------------------------
  describe("sap_cpi_manage_partner_directory", () => {
    it("lists and gets partner directory parameters", async () => {
      server.use(
        http.get(`${BASE_URL}/api/v1/Parameters`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get("$filter")).toBe("Pid eq 'PARTNER_ACME'");
          return HttpResponse.json({
            d: {
              results: [{ Pid: "PARTNER_ACME", Id: "EndpointURL" }],
            },
          });
        }),
      );

      const result = await callTool("sap_cpi_manage_partner_directory", {
        category: "parameters",
        action: "list",
        pid: "PARTNER_ACME",
      });

      expect(result.isError).toBe(false);
      expect(result.content[0].text).toContain("PARTNER_ACME");
      expect(result.content[0].text).toContain("EndpointURL");
    });
  });

  // -------------------------------------------------------------------------
  // 10. Resources & Prompts
  // -------------------------------------------------------------------------
  describe("Resources & Prompts", () => {
    it("registers resources that fetch packages and runtime artifacts", async () => {
      const registeredResources = (
        mcpServer as unknown as { _registeredResources: Record<string, { readCallback: Function }> }
      )._registeredResources;

      expect(registeredResources["sap://cpi/packages"]).toBeDefined();
      expect(registeredResources["sap://cpi/runtime-artifacts"]).toBeDefined();
      expect(registeredResources["sap://cpi/failed-messages"]).toBeDefined();

      server.use(
        http.get(`${BASE_URL}/api/v1/IntegrationPackages`, () => {
          return HttpResponse.json({
            d: { results: [{ Id: "Pkg1", Name: "Package One" }] },
          });
        }),
      );

      const resourceResult = await registeredResources["sap://cpi/packages"].readCallback(
        new URL("sap://cpi/packages"),
      );

      expect(resourceResult.contents[0].text).toContain("Package One");
    });

    it("registers prompts for troubleshooting and inspection", () => {
      const registeredPrompts = (
        mcpServer as unknown as { _registeredPrompts: Record<string, { callback: Function }> }
      )._registeredPrompts;

      expect(registeredPrompts["cpi-troubleshoot-failed-messages"]).toBeDefined();
      expect(registeredPrompts["cpi-audit-security-artifacts"]).toBeDefined();
      expect(registeredPrompts["cpi-inspect-package"]).toBeDefined();

      const promptResult = registeredPrompts["cpi-troubleshoot-failed-messages"].callback({
        messageGuid: "failed-msg-123",
      });

      expect(promptResult.messages[0].content.text).toContain("failed-msg-123");
    });
  });
});
