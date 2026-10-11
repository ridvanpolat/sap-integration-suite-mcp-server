/**
 * tests/domains/OpenConnectors.test.ts
 *
 * Comprehensive test suite for the Open Connectors domain:
 *   - Domain module interface and registration
 *   - Connector catalog discovery & metadata
 *   - Connector instance lifecycle & validation
 *   - Virtual Data Resources (VDRs) & transformations
 *   - Formula templates, instances, and workflow execution
 *   - Hubs exploration
 *   - Background jobs & event polling monitoring
 *   - Usage analytics & audit logs
 *   - MCP Resources & Prompts verification
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import OpenConnectorsDomain, {
  setOpenConnectorsClient,
  OC_PATHS,
} from "../../src/domains/OpenConnectors/index.js";
import { registerActiveDomains } from "../../src/core/registry.js";
import { createApiClient } from "../../src/core/apiClient.js";

const BASE_URL = "https://api.openconnectors.eu10.hana.ondemand.com";

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Open Connectors Domain Module", () => {
  it("exports a valid SAPDomainModule conforming to the registry interface", () => {
    expect(OpenConnectorsDomain.name).toBe("Open Connectors");
    expect(OpenConnectorsDomain.domainKey).toBe("open-connectors");
    expect(typeof OpenConnectorsDomain.registerTools).toBe("function");
    expect(typeof OpenConnectorsDomain.registerResources).toBe("function");
    expect(typeof OpenConnectorsDomain.registerPrompts).toBe("function");
  });

  it("registers successfully via registerActiveDomains in registry", async () => {
    const testMcpServer = new McpServer({ name: "reg-test", version: "1.0.0" });
    const logs: string[] = [];
    const registered = await registerActiveDomains(
      testMcpServer,
      ["open-connectors"],
      (_lvl, msg) => logs.push(msg),
    );
    expect(registered).toContain("Open Connectors");
  });
});

describe("Open Connectors Tools & Resources Execution", () => {
  let mcpServer: McpServer;

  beforeAll(() => {
    const testClient = createApiClient({
      baseUrl: BASE_URL,
      csrfEnabled: false,
    });
    setOpenConnectorsClient(testClient);

    mcpServer = new McpServer({
      name: "test-oc-server",
      version: "1.0.0",
    });

    OpenConnectorsDomain.registerTools(mcpServer, testClient);
    OpenConnectorsDomain.registerResources(mcpServer);
    OpenConnectorsDomain.registerPrompts(mcpServer);
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
  // 1. sap_oc_manage_connector
  // -------------------------------------------------------------------------
  describe("sap_oc_manage_connector", () => {
    it("lists connectors and filters by hub", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/hubs/crm/elements$`),
          ({ request }) => {
            const url = new URL(request.url);
            expect(url.searchParams.get("where")).toBe("active=true");
            return HttpResponse.json([
              { key: "salesforce", name: "Salesforce CRM", hub: "crm" },
              { key: "hubspot", name: "HubSpot", hub: "crm" },
            ]);
          },
        ),
      );

      const res = await callTool("sap_oc_manage_connector", {
        action: "list",
        hub: "crm",
        where: "active=true",
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("Salesforce CRM");
      expect(res.content[0].text).toContain("hubspot");
    });

    it("retrieves connector details and metadata", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/elements/salesforce$`),
          () => HttpResponse.json({ key: "salesforce", name: "Salesforce CRM", active: true }),
        ),
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/elements/salesforce/metadata$`),
          () => HttpResponse.json({ authentication: { type: "oauth2" }, beta: false }),
        ),
      );

      const getRes = await callTool("sap_oc_manage_connector", {
        action: "get",
        keyOrId: "salesforce",
      });
      expect(getRes.isError).toBe(false);
      expect(getRes.content[0].text).toContain("Salesforce CRM");

      const metaRes = await callTool("sap_oc_manage_connector", {
        action: "get_metadata",
        keyOrId: "salesforce",
      });
      expect(metaRes.isError).toBe(false);
      expect(metaRes.content[0].text).toContain("oauth2");
    });
  });

  // -------------------------------------------------------------------------
  // 2. sap_oc_manage_instance
  // -------------------------------------------------------------------------
  describe("sap_oc_manage_instance", () => {
    it("lists instances and creates a new instance", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/instances$`),
          () => HttpResponse.json([{ id: 101, name: "SFDC Production", valid: true }]),
        ),
        http.post(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/instances$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.name).toBe("HubSpot Prod");
            return HttpResponse.json({ id: 102, ...body }, { status: 201 });
          },
        ),
      );

      const listRes = await callTool("sap_oc_manage_instance", {
        action: "list",
      });
      expect(listRes.isError).toBe(false);
      expect(listRes.content[0].text).toContain("SFDC Production");

      const createRes = await callTool("sap_oc_manage_instance", {
        action: "create",
        name: "HubSpot Prod",
        elementKey: "hubspot",
        configuration: { "oauth.api.key": "key123" },
      });
      expect(createRes.isError).toBe(false);
      expect(createRes.content[0].text).toContain("HubSpot Prod");
    });

    it("manages instance lifecycle: update, enable, validate, and delete", async () => {
      server.use(
        http.patch(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/instances/101$`),
          () => HttpResponse.json({ id: 101, tags: ["production"] }),
        ),
        http.put(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/instances/101/enabled$`),
          () => new HttpResponse(null, { status: 200 }),
        ),
        http.post(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/instances/validate$`),
          () => HttpResponse.json({ status: "success" }),
        ),
        http.delete(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/instances/101$`),
          () => new HttpResponse(null, { status: 204 }),
        ),
      );

      const updateRes = await callTool("sap_oc_manage_instance", {
        action: "update",
        instanceId: 101,
        tags: ["production"],
      });
      expect(updateRes.isError).toBe(false);

      const enableRes = await callTool("sap_oc_manage_instance", {
        action: "enable",
        instanceId: 101,
      });
      expect(enableRes.isError).toBe(false);

      const validateRes = await callTool("sap_oc_manage_instance", {
        action: "validate",
        instanceId: 101,
      });
      expect(validateRes.isError).toBe(false);

      const deleteRes = await callTool("sap_oc_manage_instance", {
        action: "delete",
        instanceId: 101,
      });
      expect(deleteRes.isError).toBe(false);
    });
  });

  // -------------------------------------------------------------------------
  // 3. sap_oc_manage_vdr
  // -------------------------------------------------------------------------
  describe("sap_oc_manage_vdr", () => {
    it("creates, retrieves, clones, and exports a VDR", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/vdrs$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.objectName).toBe("my-contacts");
            return HttpResponse.json({ id: "vdr-1", ...body }, { status: 201 });
          },
        ),
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/vdrs/vdr-1$`),
          () => HttpResponse.json({ id: "vdr-1", objectName: "my-contacts" }),
        ),
        http.post(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/vdrs/vdr-1/clone$`),
          () => HttpResponse.json({ id: "vdr-2", objectName: "my-contacts-clone" }),
        ),
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/vdrs/my-contacts/export$`),
          () => HttpResponse.json({ vdrName: "my-contacts", fields: [] }),
        ),
      );

      const createRes = await callTool("sap_oc_manage_vdr", {
        action: "create",
        vdrName: "my-contacts",
      });
      expect(createRes.isError).toBe(false);
      expect(createRes.content[0].text).toContain("my-contacts");

      const getRes = await callTool("sap_oc_manage_vdr", {
        action: "get",
        vdrId: "vdr-1",
      });
      expect(getRes.isError).toBe(false);
      expect(getRes.content[0].text).toContain("vdr-1");

      const cloneRes = await callTool("sap_oc_manage_vdr", {
        action: "clone",
        vdrId: "vdr-1",
      });
      expect(cloneRes.isError).toBe(false);
      expect(cloneRes.content[0].text).toContain("my-contacts-clone");

      const exportRes = await callTool("sap_oc_manage_vdr", {
        action: "export",
        vdrName: "my-contacts",
      });
      expect(exportRes.isError).toBe(false);
      expect(exportRes.content[0].text).toContain("my-contacts");
    });
  });

  // -------------------------------------------------------------------------
  // 4. sap_oc_manage_formula
  // -------------------------------------------------------------------------
  describe("sap_oc_manage_formula", () => {
    it("creates formula, executes instance, and retrieves execution", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/formulas$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.name).toBe("SyncOrdersFormula");
            return HttpResponse.json({ id: 50, ...body }, { status: 201 });
          },
        ),
        http.post(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/formulas/50/instances$`),
          () => HttpResponse.json({ id: 501, name: "SyncOrders_Instance" }, { status: 201 }),
        ),
        http.post(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/formulas/instances/501/executions$`),
          () => HttpResponse.json({ id: 9001, status: "queued" }),
        ),
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/formulas/instances/executions/9001$`),
          () => HttpResponse.json({ id: 9001, status: "success", stepExecutions: [] }),
        ),
      );

      const createFormRes = await callTool("sap_oc_manage_formula", {
        action: "create",
        name: "SyncOrdersFormula",
      });
      expect(createFormRes.isError).toBe(false);
      expect(createFormRes.content[0].text).toContain("SyncOrdersFormula");

      const createInstRes = await callTool("sap_oc_manage_formula", {
        action: "create_instance",
        formulaId: 50,
        name: "SyncOrders_Instance",
      });
      expect(createInstRes.isError).toBe(false);
      expect(createInstRes.content[0].text).toContain("SyncOrders_Instance");

      const execRes = await callTool("sap_oc_manage_formula", {
        action: "execute",
        instanceId: 501,
        trigger: { orderId: "ORD-123" },
      });
      expect(execRes.isError).toBe(false);
      expect(execRes.content[0].text).toContain("9001");

      const getExecRes = await callTool("sap_oc_manage_formula", {
        action: "get_execution",
        executionId: 9001,
      });
      expect(getExecRes.isError).toBe(false);
      expect(getExecRes.content[0].text).toContain("success");
    });
  });

  // -------------------------------------------------------------------------
  // 5. sap_oc_manage_hub
  // -------------------------------------------------------------------------
  describe("sap_oc_manage_hub", () => {
    it("lists hubs and retrieves elements inside a hub", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/hubs$`),
          () => HttpResponse.json([{ key: "crm", name: "CRM" }, { key: "finance", name: "Finance" }]),
        ),
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/hubs/finance/elements$`),
          () => HttpResponse.json([{ key: "quickbooks", name: "QuickBooks Online" }]),
        ),
      );

      const listHubsRes = await callTool("sap_oc_manage_hub", {
        action: "list",
      });
      expect(listHubsRes.isError).toBe(false);
      expect(listHubsRes.content[0].text).toContain("CRM");

      const elementsRes = await callTool("sap_oc_manage_hub", {
        action: "list_elements",
        hubKey: "finance",
      });
      expect(elementsRes.isError).toBe(false);
      expect(elementsRes.content[0].text).toContain("QuickBooks Online");
    });
  });

  // -------------------------------------------------------------------------
  // 6. sap_oc_manage_job
  // -------------------------------------------------------------------------
  describe("sap_oc_manage_job", () => {
    it("lists jobs, manages status, and lists disabled polling instances", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/jobs$`),
          () => HttpResponse.json([{ id: "job-1", name: "HourlySync" }]),
        ),
        http.put(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/jobs/job-1/enable$`),
          () => new HttpResponse(null, { status: 200 }),
        ),
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/instances/event-polling-disabled$`),
          () => HttpResponse.json([{ id: 88, pollingErrorDetails: { errorCount: 5 } }]),
        ),
      );

      const listJobsRes = await callTool("sap_oc_manage_job", {
        action: "list",
      });
      expect(listJobsRes.isError).toBe(false);
      expect(listJobsRes.content[0].text).toContain("HourlySync");

      const enableRes = await callTool("sap_oc_manage_job", {
        action: "enable",
        jobId: "job-1",
      });
      expect(enableRes.isError).toBe(false);

      const pollingRes = await callTool("sap_oc_manage_job", {
        action: "list_disabled_polling",
      });
      expect(pollingRes.isError).toBe(false);
      expect(pollingRes.content[0].text).toContain("88");
    });
  });

  // -------------------------------------------------------------------------
  // 7. sap_oc_get_usage_analytics
  // -------------------------------------------------------------------------
  describe("sap_oc_get_usage_analytics", () => {
    it("queries usage logs, activity analytics, and audit logs", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/usage(\\?.*)?$`),
          () => HttpResponse.json([{ id: "u-1", requestStatus: "SUCCESS", elementKey: "salesforce" }]),
        ),
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/usage/analytics/activity(\\?.*)?$`),
          () => HttpResponse.json([{ count: 120, timestamp: "2026-10-10" }]),
        ),
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/audit-logs(\\?.*)?$`),
          () => HttpResponse.json([{ id: "audit-1", method: "POST", resource_uri: "/elements" }]),
        ),
      );

      const usageRes = await callTool("sap_oc_get_usage_analytics", {
        category: "usage",
        status: "SUCCESS",
      });
      expect(usageRes.isError).toBe(false);
      expect(usageRes.content[0].text).toContain("salesforce");

      const activityRes = await callTool("sap_oc_get_usage_analytics", {
        category: "activity",
        interval: "day",
      });
      expect(activityRes.isError).toBe(false);
      expect(activityRes.content[0].text).toContain("120");

      const auditRes = await callTool("sap_oc_get_usage_analytics", {
        category: "audit_logs",
      });
      expect(auditRes.isError).toBe(false);
      expect(auditRes.content[0].text).toContain("audit-1");
    });
  });

  // -------------------------------------------------------------------------
  // 8. Error Handling
  // -------------------------------------------------------------------------
  describe("Error Handling", () => {
    it("handles 404 cleanly without throwing an unhandled exception", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/elements/non-existent$`),
          () => new HttpResponse(JSON.stringify({ message: "Element not found" }), { status: 404 }),
        ),
      );

      const res = await callTool("sap_oc_manage_connector", {
        action: "get",
        keyOrId: "non-existent",
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

      expect(registeredResources["sap://oc/elements"]).toBeDefined();
      expect(registeredResources["sap://oc/instances"]).toBeDefined();
      expect(registeredResources["sap://oc/vdrs"]).toBeDefined();
      expect(registeredResources["sap://oc/hubs"]).toBeDefined();

      server.use(
        http.get(
          new RegExp(`${BASE_URL}${OC_PATHS.BASE}/elements`),
          () => HttpResponse.json([{ key: "jira", name: "Jira Cloud" }]),
        ),
      );

      const elementsResource = await registeredResources["sap://oc/elements"].readCallback(
        new URL("sap://oc/elements"),
      );

      expect(elementsResource.contents[0].text).toContain("Jira Cloud");
    });

    it("registers prompts and generates prompt messages", () => {
      const registeredPrompts = (
        mcpServer as unknown as { _registeredPrompts: Record<string, { callback: Function }> }
      )._registeredPrompts;

      expect(registeredPrompts["oc-inspect-connector"]).toBeDefined();
      expect(registeredPrompts["oc-troubleshoot-instance"]).toBeDefined();
      expect(registeredPrompts["oc-design-vdr"]).toBeDefined();

      const promptRes = registeredPrompts["oc-inspect-connector"].callback({
        elementKey: "hubspot",
      });

      expect(promptRes.messages[0].content.text).toContain("hubspot");
    });
  });
});