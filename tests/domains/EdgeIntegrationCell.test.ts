/**
 * tests/domains/EdgeIntegrationCell.test.ts
 *
 * Comprehensive test suite for the Edge Integration Cell (EIC) domain:
 *   - Domain module interface and registration
 *   - Semantic querying across Components, Jobs, MPLs, Queues, Stores, Partner Directory
 *   - Component & Pod lifecycle (status, pods, events, metrics, restart, parameters)
 *   - Diagnostic & maintenance jobs management and schedules
 *   - Message Processing Logs (MPL) inspection, raw stack traces, attachments
 *   - Message store entries, payload downloads ($value), attachments
 *   - Solace/JMS broker capacity, messaging queues, payload, message retry/move
 *   - Edge Data Stores & Variables inspection and payloads ($value)
 *   - B2B Partner Directory CRUD (Partners, Alternative Partners, Users, Parameters)
 *   - MCP Resources & Prompts verification
 *   - Robust error handling (404/500 returns clean McpErrorResult)
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import EdgeIntegrationCellDomain, {
  setEdgeIntegrationCellClient,
  EIC_PATHS,
} from "../../src/domains/EdgeIntegrationCell/index.js";
import { createApiClient } from "../../src/core/apiClient.js";
import { registerActiveDomains } from "../../src/core/registry.js";

const BASE_URL = "https://eic-runtime.edge.internal.corp:8443";

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Edge Integration Cell Domain Module", () => {
  it("exports a valid SAPDomainModule conforming to the registry interface", () => {
    expect(EdgeIntegrationCellDomain.name).toBe("Edge Integration Cell");
    expect(EdgeIntegrationCellDomain.domainKey).toBe("edge-integration-cell");
    expect(typeof EdgeIntegrationCellDomain.registerTools).toBe("function");
    expect(typeof EdgeIntegrationCellDomain.registerResources).toBe("function");
    expect(typeof EdgeIntegrationCellDomain.registerPrompts).toBe("function");
  });

  it("registers successfully via registerActiveDomains in registry", async () => {
    const testMcp = new McpServer({ name: "test-reg", version: "1.0.0" });
    const logs: string[] = [];
    const registered = await registerActiveDomains(
      testMcp,
      ["edge-integration-cell"],
      (_level, msg) => logs.push(msg),
    );

    expect(registered).toContain("Edge Integration Cell");
    expect(logs.some((l) => l.includes("Registered domain: Edge Integration Cell"))).toBe(true);
  });
});

describe("Edge Integration Cell Tools Execution", () => {
  let mcpServer: McpServer;

  beforeAll(() => {
    const testClient = createApiClient({
      baseUrl: BASE_URL,
      csrfEnabled: false,
    });
    setEdgeIntegrationCellClient(testClient);

    mcpServer = new McpServer({
      name: "test-eic-server",
      version: "1.0.0",
    });

    EdgeIntegrationCellDomain.registerTools(mcpServer, testClient);
    EdgeIntegrationCellDomain.registerResources(mcpServer);
    EdgeIntegrationCellDomain.registerPrompts(mcpServer);
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
  // 1. sap_eic_query_entities
  // -------------------------------------------------------------------------
  describe("sap_eic_query_entities", () => {
    it("queries Components using OData v4 query parameters", async () => {
      server.use(
        http.get(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Components`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get("$filter")).toBe("OverallStatus eq 'OK'");
          expect(url.searchParams.get("$select")).toBe("ID,Name,OverallStatus");
          return HttpResponse.json({
            value: [
              { ID: "WORKER", Name: "Worker Node", OverallStatus: "OK" },
              { ID: "SOLACE", Name: "Solace Broker", OverallStatus: "OK" },
            ],
          });
        }),
      );

      const res = await callTool("sap_eic_query_entities", {
        entity: "Components",
        filter: "OverallStatus eq 'OK'",
        select: "ID,Name,OverallStatus",
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("Worker Node");
      expect(res.content[0].text).toContain("Solace Broker");
    });

    it("queries MessageProcessingLogs via OData v2 path", async () => {
      server.use(
        http.get(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/MessageProcessingLogs`, ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get("$filter")).toBe("Status eq 'FAILED'");
          return HttpResponse.json({
            d: {
              results: [
                { MessageGuid: "msg-123", Status: "FAILED", IntegrationFlowName: "OrderFlow" },
              ],
            },
          });
        }),
      );

      const res = await callTool("sap_eic_query_entities", {
        entity: "MessageProcessingLogs",
        filter: "Status eq 'FAILED'",
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("msg-123");
      expect(res.content[0].text).toContain("OrderFlow");
    });

    it("queries Partner Directory collections via /api/v1 path", async () => {
      server.use(
        http.get(`${BASE_URL}${EIC_PATHS.PARTNER_DIRECTORY}/AlternativePartners`, () => {
          return HttpResponse.json({
            d: {
              results: [{ Agency: "AG1", Scheme: "SC1", Id: "ID1", Pid: "PID1" }],
            },
          });
        }),
      );

      const res = await callTool("sap_eic_query_entities", {
        entity: "AlternativePartners",
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("PID1");
    });
  });

  // -------------------------------------------------------------------------
  // 2. sap_eic_manage_component
  // -------------------------------------------------------------------------
  describe("sap_eic_manage_component", () => {
    it("lists components and retrieves count", async () => {
      server.use(
        http.get(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Components`, () => {
          return HttpResponse.json({
            value: [{ ID: "REDIS", Name: "Redis Cache", OverallStatus: "OK" }],
          });
        }),
        http.get(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Components/$count`, () => {
          return HttpResponse.json(15);
        }),
      );

      const listRes = await callTool("sap_eic_manage_component", { action: "list" });
      expect(listRes.isError).toBe(false);
      expect(listRes.content[0].text).toContain("Redis Cache");

      const countRes = await callTool("sap_eic_manage_component", { action: "count" });
      expect(countRes.isError).toBe(false);
      expect(countRes.content[0].text).toContain("15");
    });

    it("restarts a component and inspects pod events & metrics", async () => {
      server.use(
        http.post(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Components/WORKER/com.sap.eic.api.restart`, () => {
          return HttpResponse.json({ status: "Restarting" });
        }),
        http.get(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Components/WORKER/Pods/worker-pod-0/Events`, () => {
          return HttpResponse.json({
            value: [{ Message: "Pod restarted successfully", Type: "NORMAL", OccurrenceCount: 1 }],
          });
        }),
        http.get(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Components/WORKER/Pods/worker-pod-0/Metrics/cpu_usage`, () => {
          return HttpResponse.json({ MetricKey: "cpu_usage", MetricValue: "45%" });
        }),
        http.get(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Components/WORKER/RuntimeParameters/log_level`, () => {
          return HttpResponse.json({ ID: "log_level", IsDefault: true });
        }),
      );

      const restartRes = await callTool("sap_eic_manage_component", {
        action: "restart",
        componentId: "WORKER",
      });
      expect(restartRes.isError).toBe(false);
      expect(restartRes.content[0].text).toContain("Restarting");

      const eventsRes = await callTool("sap_eic_manage_component", {
        action: "pod_events",
        componentId: "WORKER",
        podName: "worker-pod-0",
      });
      expect(eventsRes.isError).toBe(false);
      expect(eventsRes.content[0].text).toContain("Pod restarted successfully");

      const metricRes = await callTool("sap_eic_manage_component", {
        action: "pod_metrics",
        componentId: "WORKER",
        podName: "worker-pod-0",
        metricKey: "cpu_usage",
      });
      expect(metricRes.isError).toBe(false);
      expect(metricRes.content[0].text).toContain("45%");

      const paramRes = await callTool("sap_eic_manage_component", {
        action: "runtime_parameters",
        componentId: "WORKER",
        parameterName: "log_level",
      });
      expect(paramRes.isError).toBe(false);
      expect(paramRes.content[0].text).toContain("log_level");
    });
  });

  // -------------------------------------------------------------------------
  // 3. sap_eic_manage_job
  // -------------------------------------------------------------------------
  describe("sap_eic_manage_job", () => {
    it("creates, retrieves, updates, and deletes background jobs", async () => {
      server.use(
        http.post(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Jobs`, () => {
          return HttpResponse.json({
            Id: "job-cleanup-1",
            Name: "Cleanup Diagnostics Job",
            ActionId: "CleanupDiagnostics",
          });
        }),
        http.get(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Jobs/job-cleanup-1`, () => {
          return HttpResponse.json({
            Id: "job-cleanup-1",
            Name: "Cleanup Diagnostics Job",
            LastExecutionState: "COMPLETED",
          });
        }),
        http.patch(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Jobs/job-cleanup-1/Schedule`, () => {
          return HttpResponse.json({ OnHour: 2, OnMinute: 30 });
        }),
        http.delete(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Jobs/job-cleanup-1`, () => {
          return new HttpResponse(null, { status: 204 });
        }),
      );

      const createRes = await callTool("sap_eic_manage_job", {
        action: "create",
        name: "Cleanup Diagnostics Job",
        actionId: "CleanupDiagnostics",
      });
      expect(createRes.isError).toBe(false);
      expect(createRes.content[0].text).toContain("job-cleanup-1");

      const getRes = await callTool("sap_eic_manage_job", {
        action: "get",
        jobId: "job-cleanup-1",
      });
      expect(getRes.isError).toBe(false);
      expect(getRes.content[0].text).toContain("COMPLETED");

      const scheduleRes = await callTool("sap_eic_manage_job", {
        action: "patch_schedule",
        jobId: "job-cleanup-1",
        schedule: { OnHour: 2, OnMinute: 30 },
      });
      expect(scheduleRes.isError).toBe(false);
      expect(scheduleRes.content[0].text).toContain("OnHour");

      const delRes = await callTool("sap_eic_manage_job", {
        action: "delete",
        jobId: "job-cleanup-1",
      });
      expect(delRes.isError).toBe(false);
      expect(delRes.content[0].text).toContain("deletedJobId");
    });
  });

  // -------------------------------------------------------------------------
  // 4. sap_eic_get_message_processing_logs
  // -------------------------------------------------------------------------
  describe("sap_eic_get_message_processing_logs", () => {
    it("retrieves MPL details, error info, raw stack trace, and attachments", async () => {
      server.use(
        http.get(new RegExp(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/MessageProcessingLogs\\('msg-err-456'\\)$`), () => {
          return HttpResponse.json({
            d: { MessageGuid: "msg-err-456", Status: "FAILED", IntegrationFlowName: "InvoiceFlow" },
          });
        }),
        http.get(new RegExp(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/MessageProcessingLogs\\('msg-err-456'\\)/ErrorInformation$`), () => {
          return HttpResponse.json({
            d: { LastErrorModelStepId: "Call_Payment_Service", Type: "HTTP_500" },
          });
        }),
        http.get(new RegExp(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/MessageProcessingLogs\\('msg-err-456'\\)/ErrorInformation/\\$value$`), () => {
          return new HttpResponse("java.lang.RuntimeException: Payment gateway connection timed out", {
            headers: { "Content-Type": "text/plain" },
          });
        }),
        http.get(new RegExp(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/MessageProcessingLogs\\('msg-err-456'\\)/Attachments$`), () => {
          return HttpResponse.json({
            d: { results: [{ Id: "att-1", Name: "trace.txt" }] },
          });
        }),
      );

      const getRes = await callTool("sap_eic_get_message_processing_logs", {
        action: "get",
        messageGuid: "msg-err-456",
      });
      expect(getRes.isError).toBe(false);
      expect(getRes.content[0].text).toContain("InvoiceFlow");

      const errInfoRes = await callTool("sap_eic_get_message_processing_logs", {
        action: "error_information",
        messageGuid: "msg-err-456",
      });
      expect(errInfoRes.isError).toBe(false);
      expect(errInfoRes.content[0].text).toContain("Call_Payment_Service");

      const rawErrRes = await callTool("sap_eic_get_message_processing_logs", {
        action: "error_information",
        messageGuid: "msg-err-456",
        rawValue: true,
      });
      expect(rawErrRes.isError).toBe(false);
      expect(rawErrRes.content[0].text).toContain("Payment gateway connection timed out");

      const attRes = await callTool("sap_eic_get_message_processing_logs", {
        action: "attachments",
        messageGuid: "msg-err-456",
      });
      expect(attRes.isError).toBe(false);
      expect(attRes.content[0].text).toContain("trace.txt");
    });
  });

  // -------------------------------------------------------------------------
  // 5. sap_eic_manage_message_store
  // -------------------------------------------------------------------------
  describe("sap_eic_manage_message_store", () => {
    it("inspects message store entries, payloads ($value), and properties", async () => {
      server.use(
        http.get(new RegExp(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/MessageStoreEntries\\('store-ent-1'\\)$`), () => {
          return HttpResponse.json({
            d: { Id: "store-ent-1", MessageStoreId: "InboundOrderStore" },
          });
        }),
        http.get(new RegExp(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/MessageStoreEntries\\('store-ent-1'\\)/\\$value$`), () => {
          return new HttpResponse("<Order><Id>1001</Id></Order>", {
            headers: { "Content-Type": "application/xml" },
          });
        }),
        http.get(new RegExp(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/MessageStoreEntries\\('store-ent-1'\\)/Properties$`), () => {
          return HttpResponse.json({
            d: { results: [{ Name: "CamelHttpUri", Value: "https://backend/orders" }] },
          });
        }),
      );

      const entryRes = await callTool("sap_eic_manage_message_store", {
        action: "get_entry",
        entryId: "store-ent-1",
      });
      expect(entryRes.isError).toBe(false);
      expect(entryRes.content[0].text).toContain("InboundOrderStore");

      const payloadRes = await callTool("sap_eic_manage_message_store", {
        action: "get_entry_payload",
        entryId: "store-ent-1",
      });
      expect(payloadRes.isError).toBe(false);
      expect(payloadRes.content[0].text).toContain("<Order><Id>1001</Id></Order>");

      const propsRes = await callTool("sap_eic_manage_message_store", {
        action: "list_entry_properties",
        entryId: "store-ent-1",
      });
      expect(propsRes.isError).toBe(false);
      expect(propsRes.content[0].text).toContain("CamelHttpUri");
    });
  });

  // -------------------------------------------------------------------------
  // 6. sap_eic_manage_messaging_queues
  // -------------------------------------------------------------------------
  describe("sap_eic_manage_messaging_queues", () => {
    it("monitors JMS broker, queues, messages, payload, and executes move/retry", async () => {
      server.use(
        http.get(new RegExp(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/JmsBrokers\\('Broker1'\\)$`), () => {
          return HttpResponse.json({
            d: { Key: "Broker1", Capacity: 50, MaxCapacity: 100, CapacityOk: true },
          });
        }),
        http.get(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/MessagingQueues`, () => {
          return HttpResponse.json({
            d: { results: [{ queueName: "orders.in", numberOfMessages: 12 }] },
          });
        }),
        http.get(new RegExp(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/MessagingMessages\\(jmsMessageId='ID(%3A|:)msg-101',queueName='orders\\.in'\\)/\\$value$`), () => {
          return new HttpResponse(JSON.stringify({ orderId: "ORD-999" }), {
            headers: { "Content-Type": "application/json" },
          });
        }),
        http.post(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/MoveMessagingMessages`, () => {
          return HttpResponse.json({ operation: "MOVE", processedCount: 5 });
        }),
        http.post(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/RetryMessagingMessages`, () => {
          return HttpResponse.json({ operation: "RETRY", processedCount: 2 });
        }),
      );

      const brokerRes = await callTool("sap_eic_manage_messaging_queues", {
        action: "broker_status",
      });
      expect(brokerRes.isError).toBe(false);
      expect(brokerRes.content[0].text).toContain("Broker1");

      const listQueuesRes = await callTool("sap_eic_manage_messaging_queues", {
        action: "list_queues",
      });
      expect(listQueuesRes.isError).toBe(false);
      expect(listQueuesRes.content[0].text).toContain("orders.in");

      const payloadRes = await callTool("sap_eic_manage_messaging_queues", {
        action: "get_message_payload",
        queueName: "orders.in",
        jmsMessageId: "ID:msg-101",
      });
      expect(payloadRes.isError).toBe(false);
      expect(payloadRes.content[0].text).toContain("ORD-999");

      const moveRes = await callTool("sap_eic_manage_messaging_queues", {
        action: "move_messages",
        sourceQueue: "orders.err",
        targetQueue: "orders.in",
      });
      expect(moveRes.isError).toBe(false);
      expect(moveRes.content[0].text).toContain("MOVE");

      const retryRes = await callTool("sap_eic_manage_messaging_queues", {
        action: "retry_messages",
        queueName: "orders.err",
      });
      expect(retryRes.isError).toBe(false);
      expect(retryRes.content[0].text).toContain("RETRY");
    });
  });

  // -------------------------------------------------------------------------
  // 7. sap_eic_manage_data_stores
  // -------------------------------------------------------------------------
  describe("sap_eic_manage_data_stores", () => {
    it("manages edge Data Stores, entries, variables, and downloads payloads ($value)", async () => {
      server.use(
        http.get(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/DataStores`, () => {
          return HttpResponse.json({
            d: { results: [{ DataStoreName: "LocalOrderQueue", NumberOfMessages: 4 }] },
          });
        }),
        http.get(new RegExp(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/DataStoreEntries\\(Id='ent-99',DataStoreName='LocalOrderQueue',IntegrationFlow='OrderFlow',Type='default'\\)/\\$value$`), () => {
          return new HttpResponse("PayloadData-12345", {
            headers: { "Content-Type": "text/plain" },
          });
        }),
        http.get(new RegExp(`${BASE_URL}${EIC_PATHS.LOCAL_CORE}/Variables\\(VariableName='LastSyncTime',IntegrationFlow='OrderFlow'\\)/\\$value$`), () => {
          return new HttpResponse("2026-10-11T00:00:00Z", {
            headers: { "Content-Type": "text/plain" },
          });
        }),
      );

      const dsRes = await callTool("sap_eic_manage_data_stores", {
        action: "list_data_stores",
      });
      expect(dsRes.isError).toBe(false);
      expect(dsRes.content[0].text).toContain("LocalOrderQueue");

      const entryPayloadRes = await callTool("sap_eic_manage_data_stores", {
        action: "get_entry_payload",
        entryId: "ent-99",
        dataStoreName: "LocalOrderQueue",
        integrationFlow: "OrderFlow",
      });
      expect(entryPayloadRes.isError).toBe(false);
      expect(entryPayloadRes.content[0].text).toContain("PayloadData-12345");

      const varPayloadRes = await callTool("sap_eic_manage_data_stores", {
        action: "get_variable_payload",
        variableName: "LastSyncTime",
        integrationFlow: "OrderFlow",
      });
      expect(varPayloadRes.isError).toBe(false);
      expect(varPayloadRes.content[0].text).toContain("2026-10-11T00:00:00Z");
    });
  });

  // -------------------------------------------------------------------------
  // 8. sap_eic_manage_partner_directory
  // -------------------------------------------------------------------------
  describe("sap_eic_manage_partner_directory", () => {
    it("performs CRUD operations for partners, users, and parameters", async () => {
      server.use(
        http.get(`${BASE_URL}${EIC_PATHS.PARTNER_DIRECTORY}/Partners`, () => {
          return HttpResponse.json({ d: { results: [{ Pid: "PARTNER_A" }] } });
        }),
        http.delete(new RegExp(`${BASE_URL}${EIC_PATHS.PARTNER_DIRECTORY}/Partners\\('PARTNER_A'\\)$`), () => {
          return new HttpResponse(null, { status: 204 });
        }),
        http.post(`${BASE_URL}${EIC_PATHS.PARTNER_DIRECTORY}/AuthorizedUsers`, () => {
          return HttpResponse.json({ d: { User: "eic_user_1", Pid: "PARTNER_A" } });
        }),
        http.post(`${BASE_URL}${EIC_PATHS.PARTNER_DIRECTORY}/StringParameters`, () => {
          return HttpResponse.json({ d: { Pid: "PARTNER_A", Id: "TargetURL", Value: "https://partner.com" } });
        }),
        http.post(`${BASE_URL}${EIC_PATHS.PARTNER_DIRECTORY}/BinaryParameters`, () => {
          return HttpResponse.json({ d: { Pid: "PARTNER_A", Id: "ClientCert", ContentType: "application/pkix-cert" } });
        }),
      );

      const listPartnersRes = await callTool("sap_eic_manage_partner_directory", {
        action: "list_partners",
      });
      expect(listPartnersRes.isError).toBe(false);
      expect(listPartnersRes.content[0].text).toContain("PARTNER_A");

      const delPartnerRes = await callTool("sap_eic_manage_partner_directory", {
        action: "delete_partner",
        pid: "PARTNER_A",
      });
      expect(delPartnerRes.isError).toBe(false);
      expect(delPartnerRes.content[0].text).toContain("deletedPartner");

      const createUserRes = await callTool("sap_eic_manage_partner_directory", {
        action: "create_authorized_user",
        user: "eic_user_1",
        pid: "PARTNER_A",
      });
      expect(createUserRes.isError).toBe(false);
      expect(createUserRes.content[0].text).toContain("eic_user_1");

      const createStringRes = await callTool("sap_eic_manage_partner_directory", {
        action: "create_string_parameter",
        pid: "PARTNER_A",
        id: "TargetURL",
        value: "https://partner.com",
      });
      expect(createStringRes.isError).toBe(false);
      expect(createStringRes.content[0].text).toContain("https://partner.com");

      const createBinRes = await callTool("sap_eic_manage_partner_directory", {
        action: "create_binary_parameter",
        pid: "PARTNER_A",
        id: "ClientCert",
        contentType: "application/pkix-cert",
        value: "MIIBIjANBgkq...",
      });
      expect(createBinRes.isError).toBe(false);
      expect(createBinRes.content[0].text).toContain("ClientCert");
    });
  });

  // -------------------------------------------------------------------------
  // 9. Error Handling
  // -------------------------------------------------------------------------
  describe("Error Handling", () => {
    it("handles 404 cleanly and returns MCP error result without throwing", async () => {
      server.use(
        http.get(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Components/UNKNOWN`, () => {
          return new HttpResponse("Not Found", { status: 404, statusText: "Not Found" });
        }),
      );

      const res = await callTool("sap_eic_manage_component", {
        action: "get",
        componentId: "UNKNOWN",
      });

      expect(res.isError).toBe(true);
      expect(res.content[0].text).toContain("404");
    });
  });

  // -------------------------------------------------------------------------
  // 10. Resources & Prompts
  // -------------------------------------------------------------------------
  describe("Resources & Prompts", () => {
    it("registers and reads Edge Integration Cell resources correctly", async () => {
      const regResources = (
        mcpServer as unknown as { _registeredResources: Record<string, { readCallback: Function }> }
      )._registeredResources;

      expect(regResources["sap://eic/components"]).toBeDefined();
      expect(regResources["sap://eic/jobs"]).toBeDefined();
      expect(regResources["sap://eic/queues"]).toBeDefined();
      expect(regResources["sap://eic/failed-messages"]).toBeDefined();
      expect(regResources["sap://eic/data-stores"]).toBeDefined();

      server.use(
        http.get(`${BASE_URL}${EIC_PATHS.COMPONENTS_JOBS}/Components`, () => {
          return HttpResponse.json({ value: [{ ID: "WORKER", OverallStatus: "OK" }] });
        }),
      );

      const compResource = await regResources["sap://eic/components"].readCallback(
        new URL("sap://eic/components"),
      );
      expect(compResource.contents[0].text).toContain("WORKER");
    });

    it("registers prompts and generates prompt messages", () => {
      const regPrompts = (
        mcpServer as unknown as { _registeredPrompts: Record<string, { callback: Function }> }
      )._registeredPrompts;

      expect(regPrompts["eic-troubleshoot-component"]).toBeDefined();
      expect(regPrompts["eic-troubleshoot-failed-messages"]).toBeDefined();
      expect(regPrompts["eic-audit-edge-node"]).toBeDefined();

      const p1 = regPrompts["eic-troubleshoot-component"].callback({ componentId: "WORKER" });
      expect(p1.messages[0].content.text).toContain('component "WORKER"');

      const p2 = regPrompts["eic-troubleshoot-failed-messages"].callback({ messageGuid: "msg-777" });
      expect(p2.messages[0].content.text).toContain("msg-777");

      const p3 = regPrompts["eic-audit-edge-node"].callback({});
      expect(p3.messages[0].content.text).toContain("Edge Integration Cell operational audit");
    });
  });
});
