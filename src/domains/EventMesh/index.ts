/**
 * src/domains/EventMesh/index.ts
 *
 * Event Mesh Domain Module for SAP Integration Suite MCP Server.
 *
 * Implements semantic MCP tools, resources, and prompts for:
 *   - Queue Management (List, inspect metrics, create, update, purge, delete)
 *   - Queue Subscriptions to Topics (Subscribe queues to topic patterns, unsubscribe)
 *   - Messaging (Synchronous publishing to queues/topics, consumption, auto-ack)
 *   - CloudEvents (Publish CloudEvents structured messages)
 *   - Webhook Subscriptions (Push config, endpoint verification handshakes, state management)
 *   - Webhook Credentials (Inspect credentials and reference statuses)
 *
 * Uses build-time extracted metadata from specs/EventMesh.
 */

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SAPDomainModule } from "../../core/registry.js";
import {
  SapApiClient,
  createDomainApiClient,
  createMcpSuccessResult,
  createMcpErrorResult,
  type McpToolResult,
} from "../../core/apiClient.js";
import { loadEnvConfig } from "../../config/env.js";

// ---------------------------------------------------------------------------
// Client Resolution (Lazy + Dependency Injection for testing)
// ---------------------------------------------------------------------------

let activeClient: SapApiClient | undefined;

export function setEventMeshClient(client: SapApiClient): void {
  activeClient = client;
}

function getClient(): SapApiClient {
  if (!activeClient) {
    const env = loadEnvConfig();
    activeClient = createDomainApiClient("event-mesh", env);
  }
  return activeClient;
}

// ---------------------------------------------------------------------------
// Base Paths & Path Resolution
// ---------------------------------------------------------------------------

export const EM_PATHS = {
  MGMT: "/sap-event-mesh/rest/api/v1",
  MESSAGING: "/messagingrest/v1",
  EVENTS: "/sap-event-mesh/sap/ems/v1",
} as const;

function resolveEmPath(endpoint: string, defaultBase: string = EM_PATHS.MGMT): string {
  if (
    endpoint.startsWith("http://") ||
    endpoint.startsWith("https://") ||
    endpoint.startsWith("/sap-event-mesh/") ||
    endpoint.startsWith("/messagingrest/")
  ) {
    return endpoint;
  }
  return `${defaultBase}/${endpoint.replace(/^\/+/, "")}`;
}

// ---------------------------------------------------------------------------
// Tool Registration
// ---------------------------------------------------------------------------

export function registerTools(server: McpServer, clientOverride?: SapApiClient): void {
  if (clientOverride) {
    activeClient = clientOverride;
  }

  // 1. Queue Management
  server.tool(
    "sap_em_manage_queue",
    "Manage Event Mesh message queues: list all queues, inspect queue capacity & unacknowledged message counts, create, update, purge, or delete queues.",
    {
      action: z
        .enum(["list", "get", "create", "update", "purge", "delete"])
        .describe("Queue management action to execute"),
      queueName: z
        .string()
        .optional()
        .describe("Technical name of the queue (required for get, create, update, purge, delete)"),
      maxQueueSizeInBytes: z
        .number()
        .int()
        .optional()
        .describe("Maximum queue capacity in bytes (e.g. 104857600 for 100MB)"),
      maxMessageSizeInBytes: z
        .number()
        .int()
        .optional()
        .describe("Maximum message size in bytes (e.g. 1048576 for 1MB)"),
      maxRedeliveryCount: z
        .number()
        .int()
        .optional()
        .describe("Maximum redelivery attempts before dead-lettering"),
      deadMsgQueue: z
        .string()
        .optional()
        .describe("Optional dead-letter queue name for failed messages"),
      respectTtl: z
        .boolean()
        .optional()
        .describe("Whether the queue respects message time-to-live"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.action === "list") {
          const path = resolveEmPath("queues", EM_PATHS.MGMT);
          const res = await client.get(path);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (!args.queueName) {
          return createMcpErrorResult(new Error("queueName is required for action: " + args.action));
        }

        const encodedQueue = encodeURIComponent(args.queueName);

        switch (args.action) {
          case "get": {
            const path = resolveEmPath(`queues/${encodedQueue}`, EM_PATHS.MGMT);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data);
          }
          case "create":
          case "update": {
            const payload: Record<string, unknown> = {
              accessType: "EXCLUSIVE",
            };
            if (args.maxQueueSizeInBytes !== undefined) payload["maxQueueSizeInBytes"] = args.maxQueueSizeInBytes;
            if (args.maxMessageSizeInBytes !== undefined) payload["maxMessageSizeInBytes"] = args.maxMessageSizeInBytes;
            if (args.maxRedeliveryCount !== undefined) payload["maxRedeliveryCount"] = args.maxRedeliveryCount;
            if (args.deadMsgQueue !== undefined) payload["deadMsgQueue"] = args.deadMsgQueue;
            if (args.respectTtl !== undefined) payload["respectTtl"] = args.respectTtl;

            const path = resolveEmPath(`queues/${encodedQueue}`, EM_PATHS.MGMT);
            const res = await client.put(path, payload);
            return createMcpSuccessResult(res.data || { success: true, queue: args.queueName });
          }
          case "purge": {
            const path = resolveEmPath(`queues/${encodedQueue}/purge`, EM_PATHS.MGMT);
            await client.delete(path);
            return createMcpSuccessResult({ success: true, purgedQueue: args.queueName });
          }
          case "delete": {
            const path = resolveEmPath(`queues/${encodedQueue}`, EM_PATHS.MGMT);
            await client.delete(path);
            return createMcpSuccessResult({ success: true, deletedQueue: args.queueName });
          }
          default:
            return createMcpErrorResult(new Error("Unsupported queue action: " + args.action));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 2. Queue Topic Subscriptions
  server.tool(
    "sap_em_manage_queue_subscription",
    "Manage topic subscriptions on a queue: bind a queue to topic patterns (supporting wildcards like 'sales/orders/*'), list existing subscriptions, or unsubscribe.",
    {
      action: z
        .enum(["list", "subscribe", "unsubscribe"])
        .describe("Subscription operation to perform"),
      queueName: z
        .string()
        .describe("Name of the target queue"),
      topicPattern: z
        .string()
        .optional()
        .describe("Topic pattern to bind or unbind (e.g. 'sap/s4/ce/sales/orders/*' or 'notifications/alerts')"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const encodedQueue = encodeURIComponent(args.queueName);

        if (args.action === "list") {
          const path = resolveEmPath(`queues/${encodedQueue}/subscriptions`, EM_PATHS.MGMT);
          const res = await client.get(path);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (!args.topicPattern) {
          return createMcpErrorResult(new Error("topicPattern is required for action: " + args.action));
        }

        // FIX: encodeURIComponent ignores '*', which Event Mesh requires to be '%2A' for wildcards.
        const encodedTopic = encodeURIComponent(args.topicPattern).replace(/\*/g, "%2A");
        const subPath = resolveEmPath(
          `queues/${encodedQueue}/subscriptions/${encodedTopic}`,
          EM_PATHS.MGMT,
        );

        if (args.action === "subscribe") {
          const res = await client.put(subPath);
          return createMcpSuccessResult(res.data || {
            success: true,
            queue: args.queueName,
            subscribedTopic: args.topicPattern,
          });
        }

        if (args.action === "unsubscribe") {
          await client.delete(subPath);
          return createMcpSuccessResult({
            success: true,
            queue: args.queueName,
            unsubscribedTopic: args.topicPattern,
          });
        }

        return createMcpErrorResult(new Error("Invalid subscription action: " + args.action));
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 3. Publish Message
  server.tool(
    "sap_em_publish_message",
    "Publish messages synchronously to an Event Mesh queue, topic, or CloudEvents endpoint.",
    {
      destinationType: z
        .enum(["queue", "topic", "cloudevent"])
        .describe("Type of destination: queue, topic, or cloudevent"),
      destination: z
        .string()
        .describe("Queue name or topic path (e.g. 'orders/created' or 'sales.events')"),
      payload: z
        .unknown()
        .describe("Message payload body (JSON object, string, or binary data)"),
      contentType: z
        .string()
        .optional()
        .default("application/json")
        .describe("Payload MIME type (defaults to 'application/json')"),
      cloudEventOptions: z
        .object({
          source: z.string().optional().describe("CloudEvents source URI (e.g. '/sap/s4/order')"),
          type: z.string().optional().describe("CloudEvents type (e.g. 'sap.s4.beh.order.Created.v1')"),
          id: z.string().optional().describe("CloudEvents unique event ID"),
          subject: z.string().optional().describe("CloudEvents subject filter"),
        })
        .optional()
        .describe("CloudEvents metadata attributes (used when destinationType is 'cloudevent')"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.destinationType === "queue") {
          const encodedQueue = encodeURIComponent(args.destination);
          const path = resolveEmPath(`queues/${encodedQueue}/messages`, EM_PATHS.MESSAGING);
          const res = await client.post(path, args.payload, undefined, {
            "Content-Type": args.contentType || "application/json",
          });
          return createMcpSuccessResult(res.data || {
            success: true,
            destinationType: "queue",
            destination: args.destination,
          });
        }

        if (args.destinationType === "topic") {
          const encodedTopic = encodeURIComponent(args.destination);
          const path = resolveEmPath(`topics/${encodedTopic}/messages`, EM_PATHS.MESSAGING);
          const res = await client.post(path, args.payload, undefined, {
            "Content-Type": args.contentType || "application/json",
          });
          return createMcpSuccessResult(res.data || {
            success: true,
            destinationType: "topic",
            destination: args.destination,
          });
        }

        if (args.destinationType === "cloudevent") {
          const ceId =
            args.cloudEventOptions?.id ||
            `ce_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

          const structuredEvent = {
            specversion: "1.0",
            id: ceId,
            source: args.cloudEventOptions?.source || "/sap/mcp/event-mesh",
            type: args.cloudEventOptions?.type || (args.destination || "sap.event.generic"),
            subject: args.cloudEventOptions?.subject,
            time: new Date().toISOString(),
            datacontenttype: "application/json",
            data: args.payload,
          };

          const path = resolveEmPath("events", EM_PATHS.EVENTS);
          const res = await client.post(path, structuredEvent, undefined, {
            "Content-Type": "application/cloudevents+json",
          });
          const serverResponse =
            res.data && typeof res.data === "object" ? res.data : { response: res.data };
          return createMcpSuccessResult({
            ...serverResponse,
            success: true,
            destinationType: "cloudevent",
            eventId: ceId,
            eventType: structuredEvent.type,
          });
        }

        return createMcpErrorResult(new Error("Unsupported destinationType: " + args.destinationType));
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 4. Consume Message
  server.tool(
    "sap_em_consume_message",
    "Consume messages from a specified Event Mesh queue, with optional automatic acknowledgement.",
    {
      queueName: z
        .string()
        .describe("The name of the queue to consume messages from"),
      autoAcknowledge: z
        .boolean()
        .optional()
        .default(true)
        .describe("Automatically acknowledge the consumed message upon retrieval (defaults to true)"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const encodedQueue = encodeURIComponent(args.queueName);
        const path = resolveEmPath(`queues/${encodedQueue}/messages/consumption`, EM_PATHS.MESSAGING);

        const res = await client.post(path);
        const messageId = res.headers["x-message-id"];

        let ackStatus = "not_acknowledged";
        if (args.autoAcknowledge && messageId) {
          const ackPath = resolveEmPath(
            `queues/${encodedQueue}/messages/${encodeURIComponent(messageId)}/acknowledgement`,
            EM_PATHS.MESSAGING,
          );
          await client.post(ackPath);
          ackStatus = "acknowledged";
        }

        return createMcpSuccessResult({
          queue: args.queueName,
          messageId: messageId || "unknown",
          acknowledgement: ackStatus,
          payload: res.data,
        });
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 5. Webhook Push Subscriptions
  server.tool(
    "sap_em_manage_webhook_subscription",
    "Manage webhook push subscriptions: list subscriptions, get details, create push endpoints, trigger verification handshakes, update state (pause/resume), or delete.",
    {
      action: z
        .enum(["list", "get", "create", "update_state", "handshake", "delete"])
        .describe("Webhook subscription action to execute"),
      subscriptionName: z
        .string()
        .optional()
        .describe("Name of the webhook subscription (required for get, update_state, handshake, delete)"),
      queueName: z
        .string()
        .optional()
        .describe("Source queue name to pull messages from (for create or list filter)"),
      webhookUrl: z
        .string()
        .url()
        .optional()
        .describe("Destination HTTP/HTTPS webhook callback URL (required for create)"),
      qos: z
        .number()
        .int()
        .min(0)
        .max(1)
        .optional()
        .default(1)
        .describe("Quality of Service (0 = At-most-once, 1 = At-least-once)"),
      state: z
        .enum(["pause", "resume"])
        .optional()
        .describe("New state when action is update_state"),
      exemptHandshake: z
        .boolean()
        .optional()
        .default(false)
        .describe("Exempt webhook endpoint from handshake validation"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.action === "list") {
          const query: Record<string, string | undefined> = {};
          if (args.queueName) query["queue-name"] = args.queueName;
          const path = resolveEmPath("subscriptions", EM_PATHS.MGMT);
          const res = await client.get(path, query);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (args.action === "create") {
          if (!args.subscriptionName || !args.queueName || !args.webhookUrl) {
            return createMcpErrorResult(
              new Error("subscriptionName, queueName, and webhookUrl are required for create"),
            );
          }
          const payload = {
            name: args.subscriptionName,
            address: args.queueName,
            qos: args.qos ?? 1,
            pushConfig: {
              type: "HTTP",
              endpoint: args.webhookUrl,
              exemptHandshake: Boolean(args.exemptHandshake),
            },
          };
          const path = resolveEmPath("subscriptions", EM_PATHS.MGMT);
          const res = await client.post(path, payload);
          return createMcpSuccessResult(res.data);
        }

        if (!args.subscriptionName) {
          return createMcpErrorResult(
            new Error("subscriptionName is required for action: " + args.action),
          );
        }

        const encodedSub = encodeURIComponent(args.subscriptionName);

        switch (args.action) {
          case "get": {
            const path = resolveEmPath(`subscriptions/${encodedSub}`, EM_PATHS.MGMT);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data);
          }
          case "update_state": {
            if (!args.state) {
              return createMcpErrorResult(new Error("state ('pause' or 'resume') is required for update_state"));
            }
            const path = resolveEmPath(`subscriptions/${encodedSub}/state`, EM_PATHS.MGMT);
            const res = await client.put(path, { action: args.state });
            return createMcpSuccessResult(res.data || { success: true, subscription: args.subscriptionName, state: args.state });
          }
          case "handshake": {
            const path = resolveEmPath(`subscriptions/${encodedSub}/handshake`, EM_PATHS.MGMT);
            const res = await client.post(path);
            return createMcpSuccessResult(res.data || { success: true, handshakeTriggered: args.subscriptionName });
          }
          case "delete": {
            const path = resolveEmPath(`subscriptions/${encodedSub}`, EM_PATHS.MGMT);
            await client.delete(path);
            return createMcpSuccessResult({ success: true, deletedSubscription: args.subscriptionName });
          }
          default:
            return createMcpErrorResult(new Error("Unsupported webhook action: " + args.action));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 6. Webhook Credentials Management
  server.tool(
    "sap_em_manage_webhook_credentials",
    "Inspect, review status, or delete webhook credentials stored in Event Mesh.",
    {
      action: z
        .enum(["list", "get", "get_status", "delete"])
        .describe("Credential management action to perform"),
      credentialName: z
        .string()
        .optional()
        .describe("Name of the credential reference (required for get, get_status, delete)"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.action === "list") {
          const path = resolveEmPath("webhook-credentials", EM_PATHS.MGMT);
          const res = await client.get(path);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (!args.credentialName) {
          return createMcpErrorResult(
            new Error("credentialName is required for action: " + args.action),
          );
        }

        const encodedCred = encodeURIComponent(args.credentialName);

        switch (args.action) {
          case "get": {
            const path = resolveEmPath(`webhook-credentials/${encodedCred}`, EM_PATHS.MGMT);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data);
          }
          case "get_status": {
            const path = resolveEmPath(`webhook-credentials/${encodedCred}/status`, EM_PATHS.MGMT);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data);
          }
          case "delete": {
            const path = resolveEmPath(`webhook-credentials/${encodedCred}`, EM_PATHS.MGMT);
            await client.delete(path);
            return createMcpSuccessResult({ success: true, deletedCredential: args.credentialName });
          }
          default:
            return createMcpErrorResult(new Error("Unsupported credential action: " + args.action));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );
}

// ---------------------------------------------------------------------------
// Resource Registration
// ---------------------------------------------------------------------------

export function registerResources(server: McpServer): void {
  // 1. Queues and Metric Overview
  server.resource(
    "em-queues",
    "sap://em/queues",
    async (uri) => {
      try {
        const client = getClient();
        const path = resolveEmPath("queues", EM_PATHS.MGMT);
        const res = await client.get(path);
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "application/json",
              text: JSON.stringify(res.data, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "text/plain",
              text: `Error loading Event Mesh queues: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 2. Webhook Push Subscriptions
  server.resource(
    "em-subscriptions",
    "sap://em/subscriptions",
    async (uri) => {
      try {
        const client = getClient();
        const path = resolveEmPath("subscriptions", EM_PATHS.MGMT);
        const res = await client.get(path);
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "application/json",
              text: JSON.stringify(res.data, null, 2),
            },
          ],
        };
      } catch (err) {
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "text/plain",
              text: `Error loading Event Mesh subscriptions: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );
}

// ---------------------------------------------------------------------------
// Prompt Registration
// ---------------------------------------------------------------------------

export function registerPrompts(server: McpServer): void {
  // 1. Troubleshoot Queue Backlog Prompt
  server.prompt(
    "em-troubleshoot-queue",
    "Diagnoses queue backlog, message congestion, unacknowledged message spikes, and dead-letter queues in SAP Event Mesh.",
    {
      queueName: z
        .string()
        .describe("The name of the Event Mesh queue to troubleshoot"),
    },
    (args) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please diagnose message delivery and queue performance for Event Mesh queue "${args.queueName}":\n1. Use 'sap_em_manage_queue' (action: 'get') to check current 'messageCount', 'queueSizeInBytes', and 'unacknowledgedMessageCount'.\n2. Use 'sap_em_manage_queue_subscription' (action: 'list') to verify topic bindings.\n3. Check attached webhook subscriptions using 'sap_em_manage_webhook_subscription' (action: 'list', queueName: '${args.queueName}') to identify handshake failures or paused states.`,
          },
        },
      ],
    }),
  );

  // 2. Audit Webhook Subscriptions Prompt
  server.prompt(
    "em-audit-webhook-subscriptions",
    "Audits all Event Mesh webhook push subscriptions, handshake statuses, and delivery health.",
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: "Perform an audit of all SAP Event Mesh webhook subscriptions using 'sap_em_manage_webhook_subscription' (action: 'list') or resource 'sap://em/subscriptions'. Check for subscriptions with failed delivery statuses or unverified handshakes.",
          },
        },
      ],
    }),
  );
}

// ---------------------------------------------------------------------------
// Domain Module Export
// ---------------------------------------------------------------------------

const EventMeshDomain: SAPDomainModule = {
  name: "Event Mesh",
  domainKey: "event-mesh",
  registerTools,
  registerResources,
  registerPrompts,
};

export default EventMeshDomain;
