/**
 * tests/domains/EventMesh.test.ts
 *
 * Comprehensive test suite for the Event Mesh domain:
 *   - Domain module interface and registration
 *   - Queue lifecycle (list, inspect metrics, create, purge, delete)
 *   - Topic pattern subscriptions (bind queue to topics, unsubscribe)
 *   - Message publishing (queue, topic, structured CloudEvents)
 *   - Message consumption with auto-acknowledgement
 *   - Webhook push subscriptions (lifecycle, handshakes, pause/resume)
 *   - Webhook credentials inspection and status
 *   - MCP Resources & Prompts verification
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import EventMeshDomain, {
  setEventMeshClient,
  EM_PATHS,
} from "../../src/domains/EventMesh/index.js";
import { createApiClient } from "../../src/core/apiClient.js";

const BASE_URL = "https://tenant-eventmesh.eu10.hana.ondemand.com";

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Event Mesh Domain Module", () => {
  it("exports a valid SAPDomainModule conforming to the registry interface", () => {
    expect(EventMeshDomain.name).toBe("Event Mesh");
    expect(EventMeshDomain.domainKey).toBe("event-mesh");
    expect(typeof EventMeshDomain.registerTools).toBe("function");
    expect(typeof EventMeshDomain.registerResources).toBe("function");
    expect(typeof EventMeshDomain.registerPrompts).toBe("function");
  });
});

describe("Event Mesh Tools & Resources Execution", () => {
  let mcpServer: McpServer;

  beforeAll(() => {
    const testClient = createApiClient({
      baseUrl: BASE_URL,
      csrfEnabled: false,
    });
    setEventMeshClient(testClient);

    mcpServer = new McpServer({
      name: "test-em-server",
      version: "1.0.0",
    });

    EventMeshDomain.registerTools(mcpServer, testClient);
    EventMeshDomain.registerResources(mcpServer);
    EventMeshDomain.registerPrompts(mcpServer);
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
  // 1. sap_em_manage_queue
  // -------------------------------------------------------------------------
  describe("sap_em_manage_queue", () => {
    it("lists all queues and inspects queue metrics", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/queues$`),
          () => {
            return HttpResponse.json([
              {
                name: "orders/processing",
                messageCount: 42,
                queueSizeInBytes: 1048576,
                unacknowledgedMessageCount: 3,
              },
            ]);
          },
        ),
        http.get(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/queues/orders%2Fprocessing$`),
          () => {
            return HttpResponse.json({
              name: "orders/processing",
              messageCount: 42,
              queueSizeInBytes: 1048576,
              unacknowledgedMessageCount: 3,
              deadMsgQueue: "orders/dlq",
            });
          },
        ),
      );

      const listRes = await callTool("sap_em_manage_queue", { action: "list" });
      expect(listRes.isError).toBe(false);
      expect(listRes.content[0].text).toContain("orders/processing");
      expect(listRes.content[0].text).toContain("42");

      const getRes = await callTool("sap_em_manage_queue", {
        action: "get",
        queueName: "orders/processing",
      });
      expect(getRes.isError).toBe(false);
      expect(getRes.content[0].text).toContain("orders/dlq");
    });

    it("creates, purges, and deletes a queue", async () => {
      server.use(
        http.put(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/queues/new-queue$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.maxQueueSizeInBytes).toBe(52428800);
            return HttpResponse.json({ name: "new-queue" }, { status: 201 });
          },
        ),
        http.delete(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/queues/new-queue/purge$`),
          () => new HttpResponse(null, { status: 204 }),
        ),
        http.delete(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/queues/new-queue$`),
          () => new HttpResponse(null, { status: 204 }),
        ),
      );

      const createRes = await callTool("sap_em_manage_queue", {
        action: "create",
        queueName: "new-queue",
        maxQueueSizeInBytes: 52428800,
      });
      expect(createRes.isError).toBe(false);
      expect(createRes.content[0].text).toContain("new-queue");

      const purgeRes = await callTool("sap_em_manage_queue", {
        action: "purge",
        queueName: "new-queue",
      });
      expect(purgeRes.isError).toBe(false);
      expect(purgeRes.content[0].text).toContain("purgedQueue");

      const delRes = await callTool("sap_em_manage_queue", {
        action: "delete",
        queueName: "new-queue",
      });
      expect(delRes.isError).toBe(false);
      expect(delRes.content[0].text).toContain("deletedQueue");
    });
  });

  // -------------------------------------------------------------------------
  // 2. sap_em_manage_queue_subscription
  // -------------------------------------------------------------------------
  describe("sap_em_manage_queue_subscription", () => {
    it("subscribes and unsubscribes a queue to a topic pattern", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/queues/orders%2Fqueue/subscriptions$`),
          () => {
            return HttpResponse.json([
              { topicPattern: "sales/orders/*", queueName: "orders/queue" },
            ]);
          },
        ),
        http.put(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/queues/orders%2Fqueue/subscriptions/sales%2Forders%2F%2A$`),
          () => new HttpResponse(null, { status: 204 }),
        ),
        http.delete(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/queues/orders%2Fqueue/subscriptions/sales%2Forders%2F%2A$`),
          () => new HttpResponse(null, { status: 204 }),
        ),
      );

      const listRes = await callTool("sap_em_manage_queue_subscription", {
        action: "list",
        queueName: "orders/queue",
      });
      expect(listRes.isError).toBe(false);
      expect(listRes.content[0].text).toContain("sales/orders/*");

      const subRes = await callTool("sap_em_manage_queue_subscription", {
        action: "subscribe",
        queueName: "orders/queue",
        topicPattern: "sales/orders/*",
      });
      expect(subRes.isError).toBe(false);
      expect(subRes.content[0].text).toContain("subscribedTopic");

      const unsubRes = await callTool("sap_em_manage_queue_subscription", {
        action: "unsubscribe",
        queueName: "orders/queue",
        topicPattern: "sales/orders/*",
      });
      expect(unsubRes.isError).toBe(false);
      expect(unsubRes.content[0].text).toContain("unsubscribedTopic");
    });
  });

  // -------------------------------------------------------------------------
  // 3. sap_em_publish_message
  // -------------------------------------------------------------------------
  describe("sap_em_publish_message", () => {
    it("publishes to a queue destination", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${EM_PATHS.MESSAGING}/queues/inbox/messages$`),
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual({ orderId: "ORD-999", amount: 150 });
            return new HttpResponse(null, { status: 204 });
          },
        ),
      );

      const res = await callTool("sap_em_publish_message", {
        destinationType: "queue",
        destination: "inbox",
        payload: { orderId: "ORD-999", amount: 150 },
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("inbox");
    });

    it("publishes to a topic destination", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${EM_PATHS.MESSAGING}/topics/sales%2Forders/messages$`),
          async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual({ event: "OrderCreated" });
            return new HttpResponse(null, { status: 204 });
          },
        ),
      );

      const res = await callTool("sap_em_publish_message", {
        destinationType: "topic",
        destination: "sales/orders",
        payload: { event: "OrderCreated" },
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("sales/orders");
    });

    it("publishes a structured CloudEvent", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${EM_PATHS.EVENTS}/events$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.specversion).toBe("1.0");
            expect(body.type).toBe("sap.s4.order.Created.v1");
            expect(body.data).toEqual({ customerId: "C100" });
            return HttpResponse.json({ status: "PUBLISHED" }, { status: 200 });
          },
        ),
      );

      const res = await callTool("sap_em_publish_message", {
        destinationType: "cloudevent",
        destination: "sap.s4.order.Created.v1",
        payload: { customerId: "C100" },
        cloudEventOptions: {
          type: "sap.s4.order.Created.v1",
          source: "/s4/orders",
        },
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("cloudevent");
      expect(res.content[0].text).toContain("sap.s4.order.Created.v1");
    });
  });

  // -------------------------------------------------------------------------
  // 4. sap_em_consume_message
  // -------------------------------------------------------------------------
  describe("sap_em_consume_message", () => {
    it("consumes message from queue and auto-acknowledges", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${EM_PATHS.MESSAGING}/queues/inbox/messages/consumption$`),
          () => {
            const headers = new Headers();
            headers.set("x-message-id", "msg_uuid_12345");
            return HttpResponse.json(
              { orderId: "123", status: "PENDING" },
              { status: 200, headers },
            );
          },
        ),
        http.post(
          new RegExp(
            `${BASE_URL}${EM_PATHS.MESSAGING}/queues/inbox/messages/msg_uuid_12345/acknowledgement$`,
          ),
          () => new HttpResponse(null, { status: 200 }),
        ),
      );

      const res = await callTool("sap_em_consume_message", {
        queueName: "inbox",
        autoAcknowledge: true,
      });

      expect(res.isError).toBe(false);
      expect(res.content[0].text).toContain("msg_uuid_12345");
      expect(res.content[0].text).toContain("acknowledged");
      expect(res.content[0].text).toContain("PENDING");
    });
  });

  // -------------------------------------------------------------------------
  // 5. sap_em_manage_webhook_subscription
  // -------------------------------------------------------------------------
  describe("sap_em_manage_webhook_subscription", () => {
    it("creates, triggers handshake, pauses, and deletes webhook subscription", async () => {
      server.use(
        http.post(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/subscriptions$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.name).toBe("order-webhook");
            return HttpResponse.json(body, { status: 201 });
          },
        ),
        http.post(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/subscriptions/order-webhook/handshake$`),
          () => HttpResponse.json({ handshakeStatus: "VERIFIED" }, { status: 200 }),
        ),
        http.put(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/subscriptions/order-webhook/state$`),
          async ({ request }) => {
            const body = (await request.json()) as Record<string, unknown>;
            expect(body.action).toBe("pause");
            return HttpResponse.json({ status: "PAUSED" }, { status: 200 });
          },
        ),
        http.delete(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/subscriptions/order-webhook$`),
          () => new HttpResponse(null, { status: 204 }),
        ),
      );

      const createRes = await callTool("sap_em_manage_webhook_subscription", {
        action: "create",
        subscriptionName: "order-webhook",
        queueName: "orders/queue",
        webhookUrl: "https://consumer.app.com/webhooks/orders",
      });
      expect(createRes.isError).toBe(false);
      expect(createRes.content[0].text).toContain("order-webhook");

      const handshakeRes = await callTool("sap_em_manage_webhook_subscription", {
        action: "handshake",
        subscriptionName: "order-webhook",
      });
      expect(handshakeRes.isError).toBe(false);
      expect(handshakeRes.content[0].text).toContain("VERIFIED");

      const pauseRes = await callTool("sap_em_manage_webhook_subscription", {
        action: "update_state",
        subscriptionName: "order-webhook",
        state: "pause",
      });
      expect(pauseRes.isError).toBe(false);
      expect(pauseRes.content[0].text).toContain("PAUSED");

      const delRes = await callTool("sap_em_manage_webhook_subscription", {
        action: "delete",
        subscriptionName: "order-webhook",
      });
      expect(delRes.isError).toBe(false);
      expect(delRes.content[0].text).toContain("deletedSubscription");
    });
  });

  // -------------------------------------------------------------------------
  // 6. sap_em_manage_webhook_credentials
  // -------------------------------------------------------------------------
  describe("sap_em_manage_webhook_credentials", () => {
    it("lists and inspects webhook credentials status", async () => {
      server.use(
        http.get(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/webhook-credentials$`),
          () => {
            return HttpResponse.json({
              results: [{ name: "oauth_client_cred" }],
            });
          },
        ),
        http.get(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/webhook-credentials/oauth_client_cred/status$`),
          () => {
            return HttpResponse.json({
              subscriptions: [{ name: "sub1", status: "HEALTHY" }],
            });
          },
        ),
      );

      const listRes = await callTool("sap_em_manage_webhook_credentials", {
        action: "list",
      });
      expect(listRes.isError).toBe(false);
      expect(listRes.content[0].text).toContain("oauth_client_cred");

      const statusRes = await callTool("sap_em_manage_webhook_credentials", {
        action: "get_status",
        credentialName: "oauth_client_cred",
      });
      expect(statusRes.isError).toBe(false);
      expect(statusRes.content[0].text).toContain("HEALTHY");
    });
  });

  // -------------------------------------------------------------------------
  // 7. Resources & Prompts
  // -------------------------------------------------------------------------
  describe("Resources & Prompts", () => {
    it("registers resources that fetch queues and webhook subscriptions", async () => {
      const registeredResources = (
        mcpServer as unknown as { _registeredResources: Record<string, { readCallback: Function }> }
      )._registeredResources;

      expect(registeredResources["sap://em/queues"]).toBeDefined();
      expect(registeredResources["sap://em/subscriptions"]).toBeDefined();

      server.use(
        http.get(
          new RegExp(`${BASE_URL}${EM_PATHS.MGMT}/queues$`),
          () => HttpResponse.json([{ name: "queue1", messageCount: 5 }]),
        ),
      );

      const resourceResult = await registeredResources["sap://em/queues"].readCallback(
        new URL("sap://em/queues"),
      );

      expect(resourceResult.contents[0].text).toContain("queue1");
    });

    it("registers troubleshooting prompts", () => {
      const registeredPrompts = (
        mcpServer as unknown as { _registeredPrompts: Record<string, { callback: Function }> }
      )._registeredPrompts;

      expect(registeredPrompts["em-troubleshoot-queue"]).toBeDefined();
      expect(registeredPrompts["em-audit-webhook-subscriptions"]).toBeDefined();

      const promptResult = registeredPrompts["em-troubleshoot-queue"].callback({
        queueName: "sales/queue",
      });

      expect(promptResult.messages[0].content.text).toContain("sales/queue");
    });
  });
});
