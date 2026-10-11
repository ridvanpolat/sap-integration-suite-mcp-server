/**
 * tests/domains/IntegrationAssessment.test.ts
 *
 * Comprehensive test suite for the Integration Assessment domain:
 *   - Domain module interface and registration
 *   - Semantic OData querying with filters, selects, and pagination
 *   - Single entity retrieval and navigation property traversal
 *   - Application, ApplicationInstance, and Vendor management
 *   - Technology, TechnologyInstance, and link management
 *   - Request lifecycle, line items, and CreateInterfaceRequest
 *   - Key Characteristics evaluation criteria management
 *   - Content export and import management
 *   - MCP Resources & Prompts verification
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import IntegrationAssessmentDomain, {
  setIntegrationAssessmentClient,
  IA_PATHS,
} from "../../src/domains/IntegrationAssessment/index.js";
import { registerActiveDomains } from "../../src/core/registry.js";
import { createApiClient } from "../../src/core/apiClient.js";

const BASE_URL = "https://tenant-ia.cfapps.eu10.hana.ondemand.com";

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Integration Assessment Domain Module", () => {
  it("exports a valid SAPDomainModule conforming to the registry interface", () => {
    expect(IntegrationAssessmentDomain.name).toBe("Integration Assessment");
    expect(IntegrationAssessmentDomain.domainKey).toBe("integration-assessment");
    expect(typeof IntegrationAssessmentDomain.registerTools).toBe("function");
    expect(typeof IntegrationAssessmentDomain.registerResources).toBe("function");
    expect(typeof IntegrationAssessmentDomain.registerPrompts).toBe("function");
  });

  it("registers successfully via registerActiveDomains in registry", async () => {
    const testMcpServer = new McpServer({ name: "reg-test", version: "1.0.0" });
    const logs: string[] = [];
    const registered = await registerActiveDomains(
      testMcpServer,
      ["integration-assessment"],
      (_lvl, msg) => logs.push(msg),
    );
    expect(registered).toContain("Integration Assessment");
  });
});

describe("Integration Assessment Tools & Resources Execution", () => {
  let mcpServer: McpServer;

  beforeAll(() => {
    const testClient = createApiClient({
      baseUrl: BASE_URL,
      csrfEnabled: false,
    });
    setIntegrationAssessmentClient(testClient);

    mcpServer = new McpServer({
      name: "test-ia-server",
      version: "1.0.0",
    });

    IntegrationAssessmentDomain.registerTools(mcpServer, testClient);
    IntegrationAssessmentDomain.registerResources(mcpServer);
    IntegrationAssessmentDomain.registerPrompts(mcpServer);
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
  // 1. sap_ia_query_entities
  // -------------------------------------------------------------------------
  describe("sap_ia_query_entities", () => {
    it("queries Applications with $filter, $select, and $expand", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Application$`),
          ({ request }) => {
            const url = new URL(request.url);
            expect(url.searchParams.get("$filter")).toBe("Name eq 'S4HANA'");
            expect(url.searchParams.get("$select")).toBe("Id,Name");
            expect(url.searchParams.get("$expand")).toBe("Vendor");
            return HttpResponse.json({
              d: {
                results: [
                  { Id: "app-1", Name: "S4HANA", Vendor: { Id: "ven-1", Name: "SAP" } },
                ],
              },
            });
          },
        ),
      );

      const res = await callTool("sap_ia_query_entities", {
        entity: "Application",
        filter: "Name eq 'S4HANA'",
        select: "Id,Name",
        expand: "Vendor",
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("S4HANA");
      expect(res.content[0].text).toContain("ven-1");
    });

    it("queries Technologies and handles empty result gracefully", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Technology$`),
          () => {
            return HttpResponse.json({ d: { results: [] } });
          },
        ),
      );

      const res = await callTool("sap_ia_query_entities", {
        entity: "Technology",
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toBe("[]");
    });
  });

  // -------------------------------------------------------------------------
  // 2. sap_ia_get_entity
  // -------------------------------------------------------------------------
  describe("sap_ia_get_entity", () => {
    it("retrieves a single Application by technical ID", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Application\\('app-101'\\)$`),
          () => {
            return HttpResponse.json({
              d: { Id: "app-101", Name: "Salesforce CRM", ApiHubId: "SFDC_01" },
            });
          },
        ),
      );

      const res = await callTool("sap_ia_get_entity", {
        entity: "Application",
        id: "app-101",
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("Salesforce CRM");
    });

    it("traverses navigation property ApplicationInstances", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Application\\('app-101'\\)/ApplicationInstances$`),
          () => {
            return HttpResponse.json({
              d: {
                results: [
                  { Id: "inst-1", Name: "SFDC Production", Description: "Primary EU instance" },
                ],
              },
            });
          },
        ),
      );

      const res = await callTool("sap_ia_get_entity", {
        entity: "Application",
        id: "app-101",
        navigationProperty: "ApplicationInstances",
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("SFDC Production");
    });
  });

  // -------------------------------------------------------------------------
  // 3. sap_ia_manage_application
  // -------------------------------------------------------------------------
  describe("sap_ia_manage_application", () => {
    it("creates an application, updates an instance, and deletes", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Application$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.Name).toBe("Workday HCM");
            expect(body.ApiHubId).toBe("WD_01");
            return HttpResponse.json({ d: { Id: "app-202", ...body } }, { status: 201 });
          },
        ),
        http.patch(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/ApplicationInstance\\('inst-202'\\)$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.Description).toBe("Updated EU instance description");
            return HttpResponse.json({ d: { Id: "inst-202", ...body } });
          },
        ),
        http.delete(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Application\\('app-202'\\)$`),
          () => new HttpResponse(null, { status: 204 }),
        ),
      );

      const createRes = await callTool("sap_ia_manage_application", {
        entityType: "application",
        action: "create",
        name: "Workday HCM",
        apiHubId: "WD_01",
      });
      expect(createRes.isError).toBe(false);
      expect(createRes.content[0].text).toContain("Workday HCM");

      const updateRes = await callTool("sap_ia_manage_application", {
        entityType: "application_instance",
        action: "update",
        id: "inst-202",
        description: "Updated EU instance description",
      });
      expect(updateRes.isError).toBe(false);
      expect(updateRes.content[0].text).toContain("inst-202");

      const deleteRes = await callTool("sap_ia_manage_application", {
        entityType: "application",
        action: "delete",
        id: "app-202",
      });
      expect(deleteRes.isError).toBe(false);
      expect(deleteRes.content[0].text).toContain("app-202");
    });

    it("returns error when id is missing on update or delete", async () => {
      const res = await callTool("sap_ia_manage_application", {
        entityType: "application",
        action: "update",
        name: "Missing ID App",
      });
      expect(res.isError).toBe(true);
      expect(res.content[0].text).toContain("id is required");
    });
  });

  // -------------------------------------------------------------------------
  // 4. sap_ia_manage_technology
  // -------------------------------------------------------------------------
  describe("sap_ia_manage_technology", () => {
    it("creates a technology, creates a technology instance, and deletes", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Technology$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.Name).toBe("SAP Event Mesh");
            return HttpResponse.json({ d: { Id: "tech-10", ...body } }, { status: 201 });
          },
        ),
        http.post(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/TechnologyInstance$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.Name).toBe("EventMesh_Default");
            return HttpResponse.json({ d: { Id: "tinst-10", ...body } }, { status: 201 });
          },
        ),
        http.delete(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Technology\\('tech-10'\\)$`),
          () => new HttpResponse(null, { status: 204 }),
        ),
      );

      const techRes = await callTool("sap_ia_manage_technology", {
        entityType: "technology",
        action: "create",
        name: "SAP Event Mesh",
      });
      expect(techRes.isError).toBe(false);
      expect(techRes.content[0].text).toContain("SAP Event Mesh");

      const instRes = await callTool("sap_ia_manage_technology", {
        entityType: "technology_instance",
        action: "create",
        name: "EventMesh_Default",
        technologyId: "tech-10",
      });
      expect(instRes.isError).toBe(false);
      expect(instRes.content[0].text).toContain("EventMesh_Default");

      const delRes = await callTool("sap_ia_manage_technology", {
        entityType: "technology",
        action: "delete",
        id: "tech-10",
      });
      expect(delRes.isError).toBe(false);
      expect(delRes.content[0].text).toContain("tech-10");
    });
  });

  // -------------------------------------------------------------------------
  // 5. sap_ia_manage_request
  // -------------------------------------------------------------------------
  describe("sap_ia_manage_request", () => {
    it("creates assessment request, updates status, and deletes request", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Request$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.Name).toBe("OrderToCash Integration");
            return HttpResponse.json({ d: { Id: "req-501", Status: "OPEN", ...body } }, { status: 201 });
          },
        ),
        http.patch(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Request\\('req-501'\\)$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.Status).toBe("COMPLETED");
            return HttpResponse.json({ d: { Id: "req-501", ...body } });
          },
        ),
        http.delete(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Request\\('req-501'\\)$`),
          () => new HttpResponse(null, { status: 204 }),
        ),
      );

      const createRes = await callTool("sap_ia_manage_request", {
        action: "create",
        name: "OrderToCash Integration",
        status: "OPEN",
      });
      expect(createRes.isError).toBe(false);
      expect(createRes.content[0].text).toContain("OrderToCash Integration");

      const patchRes = await callTool("sap_ia_manage_request", {
        action: "patch",
        requestId: "req-501",
        status: "COMPLETED",
      });
      expect(patchRes.isError).toBe(false);
      expect(patchRes.content[0].text).toContain("req-501");

      const delRes = await callTool("sap_ia_manage_request", {
        action: "delete",
        requestId: "req-501",
      });
      expect(delRes.isError).toBe(false);
      expect(delRes.content[0].text).toContain("req-501");
    });

    it("creates an interface request via CreateInterfaceRequest", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/CreateInterfaceRequest$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.Name).toBe("S4_to_SFDC_Orders");
            expect(body.RequestId).toBe("req-501");
            expect(body.StyleId).toBe("style-process");
            expect(body.SourceApplicationInstances).toEqual([{ Id: "app-inst-s4" }]);
            expect(body.TargetApplicationInstances).toEqual([{ Id: "app-inst-sfdc" }]);
            return HttpResponse.json({ d: { success: true, Name: "S4_to_SFDC_Orders" } }, { status: 201 });
          },
        ),
      );

      const res = await callTool("sap_ia_manage_request", {
        action: "create_interface_request",
        name: "S4_to_SFDC_Orders",
        requestId: "req-501",
        styleId: "style-process",
        sourceApplicationInstanceIds: ["app-inst-s4"],
        targetApplicationInstanceIds: ["app-inst-sfdc"],
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("S4_to_SFDC_Orders");
    });

    it("deletes a request line item", async () => {
      server.use(
        http.delete(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/RequestLineItem\\('line-99'\\)$`),
          () => new HttpResponse(null, { status: 204 }),
        ),
      );

      const res = await callTool("sap_ia_manage_request", {
        action: "delete_line_item",
        lineItemId: "line-99",
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("line-99");
    });
  });

  // -------------------------------------------------------------------------
  // 6. sap_ia_manage_characteristic
  // -------------------------------------------------------------------------
  describe("sap_ia_manage_characteristic", () => {
    it("manages characteristic groups and values", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/KeyCharacteristicGroup$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.Name).toBe("Security & Compliance");
            return HttpResponse.json({ d: { Id: "grp-1", ...body } }, { status: 201 });
          },
        ),
        http.patch(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/KeyCharacteristicGroup\\('grp-1'\\)$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.Description).toBe("Updated Description");
            return HttpResponse.json({ d: { Id: "grp-1", ...body } });
          },
        ),
        http.delete(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/KeyCharacteristicGroup\\('grp-1'\\)$`),
          () => new HttpResponse(null, { status: 204 }),
        ),
      );

      const createRes = await callTool("sap_ia_manage_characteristic", {
        entityType: "group",
        action: "create",
        name: "Security & Compliance",
        description: "Criteria for security evaluation",
      });
      expect(createRes.isError).toBe(false);
      expect(createRes.content[0].text).toContain("Security & Compliance");

      const updateRes = await callTool("sap_ia_manage_characteristic", {
        entityType: "group",
        action: "update",
        id: "grp-1",
        description: "Updated Description",
      });
      expect(updateRes.isError).toBe(false);
      expect(updateRes.content[0].text).toContain("grp-1");

      const deleteRes = await callTool("sap_ia_manage_characteristic", {
        entityType: "group",
        action: "delete",
        id: "grp-1",
      });
      expect(deleteRes.isError).toBe(false);
      expect(deleteRes.content[0].text).toContain("grp-1");
    });
  });

  // -------------------------------------------------------------------------
  // 7. sap_ia_manage_content
  // -------------------------------------------------------------------------
  describe("sap_ia_manage_content", () => {
    it("exports content from the ManagementAPI", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${IA_PATHS.MANAGEMENT}/ExportContent$`),
          () => {
            return new HttpResponse("PK-ZIP-MOCK-BINARY-CONTENT", {
              headers: { "Content-Type": "application/zip" },
              status: 200,
            });
          },
        ),
      );

      const res = await callTool("sap_ia_manage_content", {
        action: "export",
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("PK-ZIP-MOCK-BINARY-CONTENT");
    });

    it("imports content with base64 ZIP payload", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${IA_PATHS.MANAGEMENT}/ImportContent$`),
          async ({ request }) => {
            const buffer = await request.arrayBuffer();
            expect(buffer.byteLength).toBeGreaterThan(0);
            return new HttpResponse(null, { status: 202 });
          },
        ),
      );

      const sampleBase64 = Buffer.from("ZIP-DATA").toString("base64");
      const res = await callTool("sap_ia_manage_content", {
        action: "import",
        contentZipBase64: sampleBase64,
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("imported");
    });

    it("returns error when contentZipBase64 is missing on import", async () => {
      const res = await callTool("sap_ia_manage_content", {
        action: "import",
      });
      expect(res.isError).toBe(true);
      expect(res.content[0].text).toContain("contentZipBase64 is required");
    });
  });

  // -------------------------------------------------------------------------
  // 8. Error Handling
  // -------------------------------------------------------------------------
  describe("Error Handling", () => {
    it("handles SAP API 404 cleanly without throwing an unhandled exception", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Application\\('non-existent'\\)$`),
          () => {
            return HttpResponse.json(
              { error: { message: { value: "Resource not found" }, code: "404" } },
              { status: 404 },
            );
          },
        ),
      );

      const res = await callTool("sap_ia_get_entity", {
        entity: "Application",
        id: "non-existent",
      });

      expect(res.isError).toBe(true);
      expect(res.content[0].text).toContain("404");
    });
  });

  // -------------------------------------------------------------------------
  // 9. Resources & Prompts
  // -------------------------------------------------------------------------
  describe("Resources & Prompts", () => {
    it("registers and reads resources correctly", async () => {
      const registeredResources = (
        mcpServer as unknown as { _registeredResources: Record<string, { readCallback: Function }> }
      )._registeredResources;

      expect(registeredResources["sap://ia/applications"]).toBeDefined();
      expect(registeredResources["sap://ia/technologies"]).toBeDefined();
      expect(registeredResources["sap://ia/requests"]).toBeDefined();
      expect(registeredResources["sap://ia/patterns"]).toBeDefined();

      server.use(
        http.get(
          new RegExp(`${BASE_URL}${IA_PATHS.ENTITIES}/Application`),
          () => {
            return HttpResponse.json({
              d: { results: [{ Id: "app-res-1", Name: "ServiceNow" }] },
            });
          },
        ),
      );

      const appResource = await registeredResources["sap://ia/applications"].readCallback(
        new URL("sap://ia/applications"),
      );

      expect(appResource.contents[0].text).toContain("ServiceNow");
    });

    it("registers prompts and generates prompt messages", () => {
      const registeredPrompts = (
        mcpServer as unknown as { _registeredPrompts: Record<string, { callback: Function }> }
      )._registeredPrompts;

      expect(registeredPrompts["ia-assess-interface-request"]).toBeDefined();
      expect(registeredPrompts["ia-audit-technologies"]).toBeDefined();
      expect(registeredPrompts["ia-review-landscape-message-flows"]).toBeDefined();

      const promptRes = registeredPrompts["ia-assess-interface-request"].callback({
        name: "OrderSync",
        sourceApplication: "SAP ERP",
        targetApplication: "Salesforce",
        style: "Process",
      });

      expect(promptRes.messages[0].content.text).toContain("OrderSync");
      expect(promptRes.messages[0].content.text).toContain("SAP ERP");
      expect(promptRes.messages[0].content.text).toContain("Salesforce");
    });
  });
});