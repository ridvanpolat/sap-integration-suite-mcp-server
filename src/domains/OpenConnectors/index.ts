/**
 * src/domains/OpenConnectors/index.ts
 *
 * Open Connectors (OC) Domain Module for SAP Integration Suite MCP Server.
 *
 * Implements semantic MCP tools, resources, and prompts for:
 *   - Connectors Catalog (Elements discovery, authentication, objects, swagger docs)
 *   - Connector Instances (Lifecycle, configuration, health validation, event polling)
 *   - Common Resources / VDRs (Virtual Data Resources, canonical models, transformations)
 *   - Formulas & Workflows (Orchestration templates, triggers, steps, instance execution)
 *   - Hubs (Functional categories: CRM, Finance, Helpdesk, Documents, etc.)
 *   - Background Jobs & Event Polling (Scheduled tasks, suspended polling detection)
 *   - Usage, Analytics & Audit Logs (Traffic metrics, latency percentiles, audit trails)
 *
 * Uses build-time extracted metadata from specs/OpenConnectors.
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

export function setOpenConnectorsClient(client: SapApiClient): void {
  activeClient = client;
}

function getClient(): SapApiClient {
  if (!activeClient) {
    const env = loadEnvConfig();
    activeClient = createDomainApiClient("open-connectors", env);
  }
  return activeClient;
}

// ---------------------------------------------------------------------------
// Base Paths & Path Resolution
// ---------------------------------------------------------------------------

export const OC_PATHS = {
  BASE: "/elements/api-v2",
} as const;

function resolveOcPath(endpoint: string, defaultBase: string = OC_PATHS.BASE): string {
  if (
    endpoint.startsWith("http://") ||
    endpoint.startsWith("https://") ||
    endpoint.startsWith("/elements/api-v2")
  ) {
    return endpoint;
  }
  return `${defaultBase}/${endpoint.replace(/^\/+/, "")}`;
}

// ---------------------------------------------------------------------------
// Formula Helper
// ---------------------------------------------------------------------------

interface FormulaArgs {
  action: string;
  formulaId?: number;
  instanceId?: number;
  executionId?: number;
  name?: string;
  description?: string;
  active?: boolean;
  trigger?: Record<string, unknown>;
  configuration?: Record<string, unknown>;
  steps?: Array<Record<string, unknown>>;
  triggers?: Array<Record<string, unknown>>;
  where?: string;
  pageSize?: number;
  nextPage?: string;
}

async function executeFormulaAction(client: SapApiClient, args: FormulaArgs): Promise<McpToolResult> {
  const q: Record<string, string | number | undefined> = {};
  if (args.where) q["where"] = args.where;
  if (args.pageSize !== undefined) q["pageSize"] = args.pageSize;
  if (args.nextPage) q["nextPage"] = args.nextPage;

  switch (args.action) {
    case "list": {
      const res = await client.get(resolveOcPath("formulas"), q);
      return createMcpSuccessResult(res.data, res.hasMore);
    }
    case "create": {
      if (!args.name) return createMcpErrorResult(new Error("name is required for create"));
      const res = await client.post(resolveOcPath("formulas"), {
        name: args.name,
        active: args.active ?? true,
        description: args.description ?? "",
        steps: args.steps ?? [],
        triggers: args.triggers ?? [],
      });
      return createMcpSuccessResult(res.data);
    }
    case "execute": {
      if (!args.instanceId) return createMcpErrorResult(new Error("instanceId is required for execute"));
      const res = await client.post(resolveOcPath(`formulas/instances/${args.instanceId}/executions`), args.trigger ?? {});
      return createMcpSuccessResult(res.data);
    }
    case "list_executions": {
      if (!args.instanceId) return createMcpErrorResult(new Error("instanceId is required for list_executions"));
      const res = await client.get(resolveOcPath(`formulas/instances/${args.instanceId}/executions`), q);
      return createMcpSuccessResult(res.data, res.hasMore);
    }
    case "get_execution": {
      if (!args.executionId) return createMcpErrorResult(new Error("executionId is required for get_execution"));
      const res = await client.get(resolveOcPath(`formulas/instances/executions/${args.executionId}`));
      return createMcpSuccessResult(res.data);
    }
    case "set_active": {
      if (!args.instanceId || args.active === undefined) {
        return createMcpErrorResult(new Error("instanceId and active boolean are required for set_active"));
      }
      const p = resolveOcPath(`formulas/instances/${args.instanceId}/active`);
      const res = args.active ? await client.put(p) : (await client.delete(p), null);
      return createMcpSuccessResult(res?.data || { success: true, instanceId: args.instanceId, active: args.active });
    }
    case "delete_instance": {
      if (!args.instanceId) return createMcpErrorResult(new Error("instanceId is required for delete_instance"));
      await client.delete(resolveOcPath(`formulas/instances/${args.instanceId}`));
      return createMcpSuccessResult({ success: true, deletedInstanceId: args.instanceId });
    }
    case "get": {
      if (!args.formulaId) return createMcpErrorResult(new Error("formulaId is required for get"));
      const res = await client.get(resolveOcPath(`formulas/${args.formulaId}`));
      return createMcpSuccessResult(res.data);
    }
    case "update": {
      if (!args.formulaId) return createMcpErrorResult(new Error("formulaId is required for update"));
      const body: Record<string, unknown> = {};
      if (args.name !== undefined) body["name"] = args.name;
      if (args.description !== undefined) body["description"] = args.description;
      if (args.active !== undefined) body["active"] = args.active;
      if (args.steps) body["steps"] = args.steps;
      if (args.triggers) body["triggers"] = args.triggers;
      const res = await client.put(resolveOcPath(`formulas/${args.formulaId}`), body);
      return createMcpSuccessResult(res.data || { success: true, updatedFormulaId: args.formulaId });
    }
    case "delete": {
      if (!args.formulaId) return createMcpErrorResult(new Error("formulaId is required for delete"));
      await client.delete(resolveOcPath(`formulas/${args.formulaId}`));
      return createMcpSuccessResult({ success: true, deletedFormulaId: args.formulaId });
    }
    case "list_instances": {
      if (!args.formulaId) return createMcpErrorResult(new Error("formulaId is required for list_instances"));
      const res = await client.get(resolveOcPath(`formulas/${args.formulaId}/instances`), q);
      return createMcpSuccessResult(res.data, res.hasMore);
    }
    case "create_instance": {
      if (!args.formulaId || !args.name) {
        return createMcpErrorResult(new Error("formulaId and name are required for create_instance"));
      }
      const res = await client.post(resolveOcPath(`formulas/${args.formulaId}/instances`), {
        name: args.name,
        active: args.active ?? true,
        configuration: args.configuration ?? {},
      });
      return createMcpSuccessResult(res.data);
    }
    default:
      return createMcpErrorResult(new Error(`Unsupported formula action: ${args.action}`));
  }
}

// ---------------------------------------------------------------------------
// Tool Registration
// ---------------------------------------------------------------------------

export function registerTools(server: McpServer, clientOverride?: SapApiClient): void {
  if (clientOverride) {
    activeClient = clientOverride;
  }

  // 1. Connectors Catalog & Metadata Discovery
  server.tool(
    "sap_oc_manage_connector",
    "Discover and inspect connectors (elements) in the SAP Open Connectors catalog: list connectors, inspect metadata, configuration parameters, authentication types, supported objects, or OpenAPI documentation.",
    {
      action: z
        .enum(["list", "get", "get_metadata", "get_objects", "get_object_metadata", "get_docs"])
        .describe("Action to execute"),
      keyOrId: z
        .string()
        .optional()
        .describe("Element key (e.g. 'salesforce', 'hubspot') or numeric ID (required for get, get_metadata, get_objects, get_object_metadata, get_docs)"),
      objectName: z
        .string()
        .optional()
        .describe("Object name (e.g. 'contacts', 'accounts') — required for get_object_metadata"),
      hub: z
        .string()
        .optional()
        .describe("Optional hub key to filter connectors by (e.g. 'crm', 'helpdesk', 'finance')"),
      where: z
        .string()
        .optional()
        .describe("CEQL search expression (e.g. \"name='Salesforce' or active=true\")"),
      pageSize: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .describe("Max number of records to return (1-50, defaults to 20)"),
      nextPage: z
        .string()
        .optional()
        .describe("Pagination cursor token"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.action === "list") {
          const query: Record<string, string | number | undefined> = {};
          if (args.where) query["where"] = args.where;
          if (args.pageSize !== undefined) query["pageSize"] = args.pageSize;
          if (args.nextPage) query["nextPage"] = args.nextPage;

          const endpoint = args.hub ? `hubs/${encodeURIComponent(args.hub)}/elements` : "elements";
          const res = await client.get(resolveOcPath(endpoint), query);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (!args.keyOrId) {
          return createMcpErrorResult(new Error(`keyOrId is required for action: ${args.action}`));
        }

        const encodedKey = encodeURIComponent(args.keyOrId);

        switch (args.action) {
          case "get": {
            const res = await client.get(resolveOcPath(`elements/${encodedKey}`));
            return createMcpSuccessResult(res.data);
          }
          case "get_metadata": {
            const res = await client.get(resolveOcPath(`elements/${encodedKey}/metadata`));
            return createMcpSuccessResult(res.data);
          }
          case "get_objects": {
            const res = await client.get(resolveOcPath(`elements/${encodedKey}/objects`));
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "get_object_metadata": {
            if (!args.objectName) {
              return createMcpErrorResult(new Error("objectName is required for get_object_metadata"));
            }
            const encodedObj = encodeURIComponent(args.objectName);
            const res = await client.get(
              resolveOcPath(`elements/${encodedKey}/objects/${encodedObj}/metadata`),
            );
            return createMcpSuccessResult(res.data);
          }
          case "get_docs": {
            const res = await client.get(resolveOcPath(`elements/${encodedKey}/docs`));
            return createMcpSuccessResult(res.data);
          }
          default:
            return createMcpErrorResult(new Error(`Unsupported connector action: ${args.action}`));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 2. Connector Instances Management
  server.tool(
    "sap_oc_manage_instance",
    "Manage authenticated connector instances in SAP Open Connectors: list instances, get details, create new connections, update configurations, delete instances, enable/disable, and validate connection health.",
    {
      action: z
        .enum(["list", "get", "create", "update", "delete", "get_config", "enable", "disable", "validate"])
        .describe("Instance action to perform"),
      instanceId: z
        .number()
        .int()
        .optional()
        .describe("Numeric instance ID (required for get, update, delete, get_config, enable, disable, validate)"),
      name: z
        .string()
        .optional()
        .describe("Name of the instance (required for create)"),
      elementKey: z
        .string()
        .optional()
        .describe("Connector element key (e.g. 'salesforce', 'hubspot') — required for create"),
      configuration: z
        .record(z.unknown())
        .optional()
        .describe("Configuration properties map for the connector instance (e.g. oauth.api.key, oauth.api.secret)"),
      tags: z
        .array(z.string())
        .optional()
        .describe("Tags associated with the instance"),
      where: z
        .string()
        .optional()
        .describe("CEQL search filter (e.g. \"name='SFDC Production' or valid=true\")"),
      pageSize: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .describe("Max number of instances to return"),
      nextPage: z
        .string()
        .optional()
        .describe("Pagination cursor token"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.action === "list") {
          const query: Record<string, string | number | undefined> = {};
          if (args.where) query["where"] = args.where;
          if (args.pageSize !== undefined) query["pageSize"] = args.pageSize;
          if (args.nextPage) query["nextPage"] = args.nextPage;

          const res = await client.get(resolveOcPath("instances"), query);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (args.action === "create") {
          if (!args.name || !args.elementKey) {
            return createMcpErrorResult(new Error("name and elementKey are required for create instance"));
          }
          const body: Record<string, unknown> = {
            name: args.name,
            element: { key: args.elementKey },
            configuration: args.configuration ?? {},
          };
          if (args.tags) body["tags"] = args.tags;

          const res = await client.post(resolveOcPath("instances"), body);
          return createMcpSuccessResult(res.data);
        }

        if (args.instanceId === undefined) {
          return createMcpErrorResult(new Error(`instanceId is required for action: ${args.action}`));
        }

        const id = args.instanceId;

        switch (args.action) {
          case "get": {
            const res = await client.get(resolveOcPath(`instances/${id}`));
            return createMcpSuccessResult(res.data);
          }
          case "update": {
            const body: Record<string, unknown> = {};
            if (args.name !== undefined) body["name"] = args.name;
            if (args.configuration !== undefined) body["configuration"] = args.configuration;
            if (args.tags !== undefined) body["tags"] = args.tags;

            const res = await client.patch(resolveOcPath(`instances/${id}`), body);
            return createMcpSuccessResult(res.data || { success: true, updatedInstanceId: id });
          }
          case "delete": {
            await client.delete(resolveOcPath(`instances/${id}`));
            return createMcpSuccessResult({ success: true, deletedInstanceId: id });
          }
          case "get_config": {
            const res = await client.get(resolveOcPath(`instances/${id}/configuration`));
            return createMcpSuccessResult(res.data);
          }
          case "enable": {
            const res = await client.put(resolveOcPath(`instances/${id}/enabled`));
            return createMcpSuccessResult(res.data || { success: true, enabledInstanceId: id });
          }
          case "disable": {
            await client.delete(resolveOcPath(`instances/${id}/enabled`));
            return createMcpSuccessResult({ success: true, disabledInstanceId: id });
          }
          case "validate": {
            const res = await client.post(resolveOcPath("instances/validate"), {
              instanceIds: [id],
            });
            return createMcpSuccessResult(res.data || { success: true, validatedInstanceId: id });
          }
          default:
            return createMcpErrorResult(new Error(`Unsupported instance action: ${args.action}`));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 3. Virtual Data Resources (VDR / Common Resources) Management
  server.tool(
    "sap_oc_manage_vdr",
    "Manage Common Resources (Virtual Data Resources - VDR) and field transformations in SAP Open Connectors: list canonical models, create/update VDRs, clone definitions, manage vendor transformations, and export VDR schemas.",
    {
      action: z
        .enum([
          "list",
          "get",
          "create",
          "update",
          "delete",
          "clone",
          "list_transformations",
          "create_transformation",
          "delete_transformation",
          "export",
        ])
        .describe("VDR action to perform"),
      vdrId: z
        .string()
        .optional()
        .describe("VDR technical ID (required for get, update, delete, clone, list_transformations, create_transformation)"),
      vdrName: z
        .string()
        .optional()
        .describe("Canonical object name (e.g. 'my-contacts', 'my-orders') — required for create or export"),
      transformationId: z
        .string()
        .optional()
        .describe("Transformation ID (required for delete_transformation)"),
      targetVdrName: z
        .string()
        .optional()
        .describe("Target VDR name when cloning"),
      fields: z
        .array(z.record(z.unknown()))
        .optional()
        .describe("Field definitions list for VDR creation/update"),
      transformationPayload: z
        .record(z.unknown())
        .optional()
        .describe("Transformation payload mapping vendor fields to VDR fields"),
      where: z
        .string()
        .optional()
        .describe("CEQL search filter"),
      pageSize: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .describe("Max number of records to return"),
      nextPage: z
        .string()
        .optional()
        .describe("Pagination cursor token"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.action === "list") {
          const query: Record<string, string | number | undefined> = {};
          if (args.where) query["where"] = args.where;
          if (args.pageSize !== undefined) query["pageSize"] = args.pageSize;
          if (args.nextPage) query["nextPage"] = args.nextPage;

          const res = await client.get(resolveOcPath("vdrs"), query);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (args.action === "create") {
          if (!args.vdrName) {
            return createMcpErrorResult(new Error("vdrName is required for create action"));
          }
          const body: Record<string, unknown> = {
            objectName: args.vdrName,
            fields: args.fields ?? [],
          };
          const res = await client.post(resolveOcPath("vdrs"), body);
          return createMcpSuccessResult(res.data);
        }

        if (args.action === "export") {
          if (!args.vdrName) {
            return createMcpErrorResult(new Error("vdrName is required for export action"));
          }
          const encoded = encodeURIComponent(args.vdrName);
          const res = await client.get(resolveOcPath(`vdrs/${encoded}/export`));
          return createMcpSuccessResult(res.data);
        }

        if (!args.vdrId) {
          return createMcpErrorResult(new Error(`vdrId is required for action: ${args.action}`));
        }

        const encodedId = encodeURIComponent(args.vdrId);

        switch (args.action) {
          case "get": {
            const res = await client.get(resolveOcPath(`vdrs/${encodedId}`));
            return createMcpSuccessResult(res.data);
          }
          case "update": {
            const body: Record<string, unknown> = {};
            if (args.vdrName) body["objectName"] = args.vdrName;
            if (args.fields) body["fields"] = args.fields;

            const res = await client.put(resolveOcPath(`vdrs/${encodedId}`), body);
            return createMcpSuccessResult(res.data || { success: true, updatedVdrId: args.vdrId });
          }
          case "delete": {
            await client.delete(resolveOcPath(`vdrs/${encodedId}`));
            return createMcpSuccessResult({ success: true, deletedVdrId: args.vdrId });
          }
          case "clone": {
            const body = { objectName: args.targetVdrName ?? `${args.vdrId}_clone` };
            const res = await client.post(resolveOcPath(`vdrs/${encodedId}/clone`), body);
            return createMcpSuccessResult(res.data);
          }
          case "list_transformations": {
            const res = await client.get(resolveOcPath(`vdrs/${encodedId}/transformations`));
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "create_transformation": {
            const body = args.transformationPayload ?? {};
            const res = await client.post(resolveOcPath(`vdrs/${encodedId}/transformations`), body);
            return createMcpSuccessResult(res.data);
          }
          case "delete_transformation": {
            if (!args.transformationId) {
              return createMcpErrorResult(new Error("transformationId is required for delete_transformation"));
            }
            const encodedTrans = encodeURIComponent(args.transformationId);
            await client.delete(resolveOcPath(`vdrs/${encodedId}/transformations/${encodedTrans}`));
            return createMcpSuccessResult({ success: true, deletedTransformationId: args.transformationId });
          }
          default:
            return createMcpErrorResult(new Error(`Unsupported VDR action: ${args.action}`));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 4. Formula & Workflow Orchestrations
  server.tool(
    "sap_oc_manage_formula",
    "Manage workflow formulas and automated executions in SAP Open Connectors: list formulas, inspect templates, manage instances, trigger executions, and inspect execution logs.",
    {
      action: z
        .enum([
          "list",
          "get",
          "create",
          "update",
          "delete",
          "list_instances",
          "create_instance",
          "set_active",
          "delete_instance",
          "execute",
          "list_executions",
          "get_execution",
        ])
        .describe("Formula action to perform"),
      formulaId: z.number().int().optional().describe("Numeric formula template ID"),
      instanceId: z.number().int().optional().describe("Numeric formula instance ID"),
      executionId: z.number().int().optional().describe("Numeric formula execution ID"),
      name: z.string().optional().describe("Formula or instance name"),
      description: z.string().optional().describe("Description"),
      active: z.boolean().optional().describe("Active status"),
      trigger: z.record(z.unknown()).optional().describe("Execution trigger payload"),
      configuration: z.record(z.unknown()).optional().describe("Configuration variables map"),
      steps: z.array(z.record(z.unknown())).optional().describe("Workflow steps list"),
      triggers: z.array(z.record(z.unknown())).optional().describe("Workflow triggers list"),
      where: z.string().optional().describe("CEQL filter"),
      pageSize: z.number().int().min(1).max(50).optional().describe("Max records to return"),
      nextPage: z.string().optional().describe("Pagination cursor token"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        return await executeFormulaAction(client, args);
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 5. Hubs Exploration
  server.tool(
    "sap_oc_manage_hub",
    "Explore functional connector hubs in SAP Open Connectors: list hubs (e.g. CRM, Helpdesk, Finance, Documents) or retrieve connectors within a hub.",
    {
      action: z
        .enum(["list", "get", "list_elements"])
        .describe("Hub action to perform"),
      hubKey: z
        .string()
        .optional()
        .describe("Hub key (e.g. 'crm', 'finance', 'helpdesk', 'documents') — required for get and list_elements"),
      pageSize: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .describe("Max number of records to return"),
      nextPage: z
        .string()
        .optional()
        .describe("Pagination cursor token"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const query: Record<string, string | number | undefined> = {};
        if (args.pageSize !== undefined) query["pageSize"] = args.pageSize;
        if (args.nextPage) query["nextPage"] = args.nextPage;

        if (args.action === "list") {
          const res = await client.get(resolveOcPath("hubs"), query);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (!args.hubKey) {
          return createMcpErrorResult(new Error(`hubKey is required for action: ${args.action}`));
        }

        const encodedKey = encodeURIComponent(args.hubKey);

        if (args.action === "get") {
          const res = await client.get(resolveOcPath(`hubs/${encodedKey}`));
          return createMcpSuccessResult(res.data);
        }

        if (args.action === "list_elements") {
          const res = await client.get(resolveOcPath(`hubs/${encodedKey}/elements`), query);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        return createMcpErrorResult(new Error(`Unsupported hub action: ${args.action}`));
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 6. Background Jobs & Event Polling Monitoring
  server.tool(
    "sap_oc_manage_job",
    "Manage scheduled background jobs, review execution history, or inspect connector instances where event polling was suspended.",
    {
      action: z
        .enum(["list", "get", "list_history", "list_executions", "enable", "disable", "delete", "list_disabled_polling"])
        .describe("Job action to perform"),
      jobId: z
        .string()
        .optional()
        .describe("Job ID (required for get, list_history, enable, disable, delete)"),
      pageSize: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .describe("Max number of records to return"),
      nextPage: z
        .string()
        .optional()
        .describe("Pagination cursor token"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const query: Record<string, string | number | undefined> = {};
        if (args.pageSize !== undefined) query["pageSize"] = args.pageSize;
        if (args.nextPage) query["nextPage"] = args.nextPage;

        if (args.action === "list") {
          const res = await client.get(resolveOcPath("jobs"), query);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (args.action === "list_executions") {
          const res = await client.get(resolveOcPath("jobs/executions"), query);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (args.action === "list_disabled_polling") {
          const res = await client.get(resolveOcPath("instances/event-polling-disabled"));
          return createMcpSuccessResult(res.data);
        }

        if (!args.jobId) {
          return createMcpErrorResult(new Error(`jobId is required for action: ${args.action}`));
        }

        const encodedId = encodeURIComponent(args.jobId);

        switch (args.action) {
          case "get": {
            const res = await client.get(resolveOcPath(`jobs/${encodedId}`));
            return createMcpSuccessResult(res.data);
          }
          case "list_history": {
            const res = await client.get(resolveOcPath(`jobs/${encodedId}/history`), query);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "enable": {
            const res = await client.put(resolveOcPath(`jobs/${encodedId}/enable`));
            return createMcpSuccessResult(res.data || { success: true, enabledJobId: args.jobId });
          }
          case "disable": {
            const res = await client.put(resolveOcPath(`jobs/${encodedId}/disable`));
            return createMcpSuccessResult(res.data || { success: true, disabledJobId: args.jobId });
          }
          case "delete": {
            await client.delete(resolveOcPath(`jobs/${encodedId}`));
            return createMcpSuccessResult({ success: true, deletedJobId: args.jobId });
          }
          default:
            return createMcpErrorResult(new Error(`Unsupported job action: ${args.action}`));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 7. Usage Analytics & Platform Audit Logs
  server.tool(
    "sap_oc_get_usage_analytics",
    "Query usage records, execution latency, error counts, and security audit logs in SAP Open Connectors.",
    {
      category: z
        .enum(["usage", "activity", "statuses", "times", "audit_logs"])
        .describe("Analytics category to retrieve"),
      from: z
        .string()
        .optional()
        .describe("Start date/time (ISO 8601 or YYYY-MM-DD)"),
      to: z
        .string()
        .optional()
        .describe("End date/time (ISO 8601 or YYYY-MM-DD)"),
      status: z
        .enum(["SUCCESS", "FAILED"])
        .optional()
        .describe("Filter usage logs by status (SUCCESS or FAILED)"),
      hub: z
        .string()
        .optional()
        .describe("Filter usage logs by hub key (e.g. 'crm')"),
      interval: z
        .enum(["minute", "hour", "day", "week", "month", "year"])
        .optional()
        .describe("Aggregation interval for activity, statuses, or times"),
      pageSize: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .describe("Max number of records to return"),
      nextPage: z
        .string()
        .optional()
        .describe("Pagination cursor token"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const query: Record<string, string | number | undefined> = {};
        if (args.from) query["from"] = args.from;
        if (args.to) query["to"] = args.to;
        if (args.pageSize !== undefined) query["pageSize"] = args.pageSize;
        if (args.nextPage) query["nextPage"] = args.nextPage;

        switch (args.category) {
          case "usage": {
            if (args.status) query["status"] = args.status;
            if (args.hub) query["hub"] = args.hub;
            const res = await client.get(resolveOcPath("usage"), query);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "activity": {
            if (args.interval) query["interval"] = args.interval;
            const res = await client.get(resolveOcPath("usage/analytics/activity"), query);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "statuses": {
            if (args.interval) query["interval"] = args.interval;
            const res = await client.get(resolveOcPath("usage/analytics/statuses"), query);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "times": {
            if (args.interval) query["interval"] = args.interval;
            const res = await client.get(resolveOcPath("usage/analytics/times"), query);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "audit_logs": {
            const res = await client.get(resolveOcPath("audit-logs"), query);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          default:
            return createMcpErrorResult(new Error(`Unsupported category: ${args.category}`));
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
  // 1. Available Connectors Catalog Resource
  server.resource(
    "oc-elements",
    "sap://oc/elements",
    async (uri) => {
      try {
        const client = getClient();
        const res = await client.get(resolveOcPath("elements"), { pageSize: 50 });
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
              text: `Error loading connectors: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 2. Connector Instances Resource
  server.resource(
    "oc-instances",
    "sap://oc/instances",
    async (uri) => {
      try {
        const client = getClient();
        const res = await client.get(resolveOcPath("instances"), { pageSize: 50 });
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
              text: `Error loading connector instances: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 3. Virtual Data Resources Resource
  server.resource(
    "oc-vdrs",
    "sap://oc/vdrs",
    async (uri) => {
      try {
        const client = getClient();
        const res = await client.get(resolveOcPath("vdrs"), { pageSize: 50 });
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
              text: `Error loading VDRs: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 4. Hubs Resource
  server.resource(
    "oc-hubs",
    "sap://oc/hubs",
    async (uri) => {
      try {
        const client = getClient();
        const res = await client.get(resolveOcPath("hubs"));
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
              text: `Error loading hubs: ${err instanceof Error ? err.message : String(err)}`,
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
  // 1. Inspect Connector Prompt
  server.prompt(
    "oc-inspect-connector",
    "Guided exploration of an Open Connectors connector: authentication, parameters, and supported objects.",
    {
      elementKey: z
        .string()
        .describe("The connector element key to inspect (e.g. 'salesforce', 'hubspot', 'servicenow')"),
    },
    (args) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please inspect the SAP Open Connectors element "${args.elementKey}":
1. Use 'sap_oc_manage_connector' (action: 'get') to examine the connector's configuration and authentication requirements.
2. Use 'sap_oc_manage_connector' (action: 'get_objects') to list the third-party business objects supported by this element.
3. Review any required setup parameters needed to create an active instance.`,
          },
        },
      ],
    }),
  );

  // 2. Troubleshoot Instance Prompt
  server.prompt(
    "oc-troubleshoot-instance",
    "Diagnoses health and configuration issues with an Open Connectors instance.",
    {
      instanceId: z
        .number()
        .int()
        .describe("Numeric instance ID to troubleshoot"),
    },
    (args) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please diagnose issues with connector instance ID ${args.instanceId}:
1. Use 'sap_oc_manage_instance' (action: 'get') to check if the instance is marked 'valid: true' and review consecutive failure counts.
2. Use 'sap_oc_manage_instance' (action: 'validate') to trigger a live ping test to the underlying vendor API.
3. Check 'sap_oc_manage_job' (action: 'list_disabled_polling') to verify if event polling was suspended due to errors.
4. Review recent errors with 'sap_oc_get_usage_analytics' (category: 'usage', status: 'FAILED').`,
          },
        },
      ],
    }),
  );

  // 3. Design Virtual Data Resource Prompt
  server.prompt(
    "oc-design-vdr",
    "Guides the architect in designing a canonical Virtual Data Resource (VDR) and mapping vendor field transformations.",
    {
      vdrName: z
        .string()
        .describe("The canonical resource name (e.g. 'my-contacts', 'my-invoices')"),
    },
    (args) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Design and configure the canonical Virtual Data Resource "${args.vdrName}":
1. Check existing VDRs using 'sap_oc_manage_vdr' (action: 'list') or read resource 'sap://oc/vdrs'.
2. Define the unified canonical fields schema.
3. Inspect target connectors using 'sap_oc_manage_connector' (action: 'get_object_metadata') to identify vendor field names.
4. Construct field transformations for each connector using 'sap_oc_manage_vdr' (action: 'create_transformation').`,
          },
        },
      ],
    }),
  );
}

// ---------------------------------------------------------------------------
// Domain Module Export
// ---------------------------------------------------------------------------

const OpenConnectorsDomain: SAPDomainModule = {
  name: "Open Connectors",
  domainKey: "open-connectors",
  registerTools,
  registerResources,
  registerPrompts,
};

export default OpenConnectorsDomain;
