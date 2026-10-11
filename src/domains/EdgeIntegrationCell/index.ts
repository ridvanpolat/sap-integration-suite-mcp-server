/**
 * src/domains/EdgeIntegrationCell/index.ts
 *
 * Edge Integration Cell (EIC) Domain Module for SAP Integration Suite MCP Server.
 *
 * Implements semantic MCP tools, resources, and prompts for:
 *   - Components & Pods (Health, status, metrics, events, runtime parameters, restart)
 *   - Background Jobs & Schedules (Diagnostics, maintenance tasks, cleanup jobs)
 *   - Message Processing Logs (Edge MPLs, error stacks, custom headers, adapter attributes)
 *   - Message Stores & Attachments (Persisted payloads, properties, attachment content)
 *   - Messaging Queues & JMS Broker (Solace/JMS broker status, queue monitoring, retry, move)
 *   - Data Stores & Variables (Local edge payload stores, variables lifecycle)
 *   - Partner Directory (B2B Partners, alternative partners, authorized users, parameters)
 *
 * Uses build-time extracted metadata from specs/EdgeIntegrationCell.
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

export function setEdgeIntegrationCellClient(client: SapApiClient): void {
  activeClient = client;
}

function getClient(): SapApiClient {
  if (!activeClient) {
    const env = loadEnvConfig();
    activeClient = createDomainApiClient("edge-integration-cell", env);
  }
  return activeClient;
}

// ---------------------------------------------------------------------------
// Base Paths & Path Resolution
// ---------------------------------------------------------------------------

export const EIC_PATHS = {
  COMPONENTS_JOBS: "/local/api/eic/v1",
  LOCAL_CORE: "/local/api/v1",
  PARTNER_DIRECTORY: "/api/v1",
} as const;

export function resolveEicPath(
  endpoint: string,
  defaultBase: string = EIC_PATHS.LOCAL_CORE,
): string {
  if (
    endpoint.startsWith("http://") ||
    endpoint.startsWith("https://") ||
    endpoint.startsWith("/local/api/") ||
    endpoint.startsWith("/api/v1")
  ) {
    return endpoint;
  }
  return `${defaultBase}/${endpoint.replace(/^\/+/, "")}`;
}

// ---------------------------------------------------------------------------
// Enums & Constants from Generated Metadata
// ---------------------------------------------------------------------------

export const EicQueryableEntities = [
  "Components",
  "Jobs",
  "MessageProcessingLogs",
  "MessagingQueues",
  "DataStores",
  "DataStoreEntries",
  "Variables",
  "AlternativePartners",
  "AuthorizedUsers",
  "BinaryParameters",
  "StringParameters",
  "Partners",
] as const;

export type EicQueryableEntity = (typeof EicQueryableEntities)[number];

export const ComponentIds = [
  "AUDITLOG_AGENT",
  "DESTSVC_DATA",
  "DESTSVC_REST",
  "EDC",
  "EDGE_API",
  "EDGE_EVENT_CONTROLLER",
  "ELA",
  "ESAC",
  "MDC",
  "POLICYENGINE",
  "POSTGRES",
  "REDIS",
  "SOLACE",
  "SOLOPS",
  "WORKER",
] as const;

export const OverallStatuses = ["OK", "WARN", "ERROR", "UNKNOWN"] as const;

export const ActionIds = [
  "CleanupDiagnostics",
  "CleanupDataStoreEntries",
  "EdgeUpdateExpiringRefreshTokens",
  "CleanupMonitoringData",
  "ConsolidateMPLAggregationData",
  "CleanupTraceEntries",
  "UpdateMplStatus",
  "CALMDataTransferCommand",
] as const;

export const JobExecutionStates = [
  "COMPLETED",
  "FAILED",
  "NOT_YET_EXECUTED",
  "SKIPPED",
  "RETRY",
] as const;

export const DateScheduleTypes = ["DAILY", "WEEKLY", "MONTHLY", "ON_DATE"] as const;
export const TimeScheduleTypes = ["ON_TIME", "REPEAT_IN_INTERVAL"] as const;
export const Weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

// ---------------------------------------------------------------------------
// Partner Directory Schema & Types
// ---------------------------------------------------------------------------

const PartnerDirectorySchema = {
  action: z
    .enum([
      "list_partners",
      "delete_partner",
      "list_alternative_partners",
      "get_alternative_partner",
      "create_alternative_partner",
      "update_alternative_partner",
      "delete_alternative_partner",
      "list_authorized_users",
      "get_authorized_user",
      "create_authorized_user",
      "update_authorized_user",
      "delete_authorized_user",
      "list_string_parameters",
      "get_string_parameter",
      "create_string_parameter",
      "update_string_parameter",
      "delete_string_parameter",
      "list_binary_parameters",
      "get_binary_parameter",
      "create_binary_parameter",
      "update_binary_parameter",
      "delete_binary_parameter",
    ])
    .describe("Action on partner directory"),
  pid: z.string().optional().describe("Partner ID (Pid)"),
  user: z.string().optional().describe("Authorized user name"),
  agency: z.string().optional().describe("Agency for alternative partner"),
  scheme: z.string().optional().describe("Scheme for alternative partner"),
  id: z.string().optional().describe("Identification / Parameter ID"),
  hexagency: z.string().optional().describe("Hexagency key"),
  hexscheme: z.string().optional().describe("Hexscheme key"),
  hexid: z.string().optional().describe("Hexid key"),
  value: z.string().optional().describe("Parameter value"),
  contentType: z.string().optional().describe("Content type for binary parameter"),
  filter: z.string().optional().describe("OData $filter expression"),
  select: z.string().optional().describe("OData $select property names"),
  orderBy: z.string().optional().describe("OData $orderby expression"),
  top: z.number().int().min(1).max(50).optional().describe("Max items to return"),
  skip: z.number().int().min(0).optional().describe("Items to skip"),
};

type PartnerDirArgs = {
  action: string;
  pid?: string;
  user?: string;
  agency?: string;
  scheme?: string;
  id?: string;
  hexagency?: string;
  hexscheme?: string;
  hexid?: string;
  value?: string;
  contentType?: string;
  filter?: string;
  select?: string;
  orderBy?: string;
  top?: number;
  skip?: number;
};

async function handlePartnerUsersAndAlt(
  client: SapApiClient,
  base: string,
  args: PartnerDirArgs,
  pid: string,
  u: string,
  q: Record<string, string | number | undefined>,
): Promise<McpToolResult> {
  switch (args.action) {
    case "list_partners":
      return createMcpSuccessResult((await client.get(`${base}/Partners`)).data);
    case "delete_partner":
      if (!pid) return createMcpErrorResult(new Error("pid is required"));
      await client.delete(`${base}/Partners('${pid}')`);
      return createMcpSuccessResult({ success: true, deletedPartner: args.pid });
    case "list_alternative_partners": {
      const res = await client.get(`${base}/AlternativePartners`, q);
      return createMcpSuccessResult(res.data, res.hasMore);
    }
    case "get_alternative_partner":
      if (!args.hexagency || !args.hexscheme || !args.hexid) return createMcpErrorResult(new Error("hexagency, hexscheme, hexid required"));
      return createMcpSuccessResult((await client.get(`${base}/AlternativePartners(Hexagency='${args.hexagency}',Hexscheme='${args.hexscheme}',Hexid='${args.hexid}')`)).data);
    case "create_alternative_partner":
      if (!args.agency || !args.scheme || !args.id || !args.pid) return createMcpErrorResult(new Error("agency, scheme, id, pid required"));
      return createMcpSuccessResult((await client.post(`${base}/AlternativePartners`, { Agency: args.agency, Scheme: args.scheme, Id: args.id, Pid: args.pid })).data);
    case "update_alternative_partner":
      if (!args.hexagency || !args.hexscheme || !args.hexid || !args.pid) return createMcpErrorResult(new Error("hexagency, hexscheme, hexid, pid required"));
      return createMcpSuccessResult((await client.put(`${base}/AlternativePartners(Hexagency='${args.hexagency}',Hexscheme='${args.hexscheme}',Hexid='${args.hexid}')`, { Pid: args.pid })).data || { success: true });
    case "delete_alternative_partner":
      if (!args.hexagency || !args.hexscheme || !args.hexid) return createMcpErrorResult(new Error("hexagency, hexscheme, hexid required"));
      await client.delete(`${base}/AlternativePartners(Hexagency='${args.hexagency}',Hexscheme='${args.hexscheme}',Hexid='${args.hexid}')`);
      return createMcpSuccessResult({ success: true, deleted: true });
    case "list_authorized_users": {
      const res = await client.get(`${base}/AuthorizedUsers`, q);
      return createMcpSuccessResult(res.data, res.hasMore);
    }
    case "get_authorized_user":
      if (!u) return createMcpErrorResult(new Error("user is required"));
      return createMcpSuccessResult((await client.get(`${base}/AuthorizedUsers('${u}')`)).data);
    case "create_authorized_user":
      if (!args.user || !args.pid) return createMcpErrorResult(new Error("user and pid required"));
      return createMcpSuccessResult((await client.post(`${base}/AuthorizedUsers`, { User: args.user, Pid: args.pid })).data);
    case "update_authorized_user":
      if (!u || !args.pid) return createMcpErrorResult(new Error("user and pid required"));
      return createMcpSuccessResult((await client.put(`${base}/AuthorizedUsers('${u}')`, { Pid: args.pid })).data || { success: true });
    case "delete_authorized_user":
      if (!u) return createMcpErrorResult(new Error("user is required"));
      await client.delete(`${base}/AuthorizedUsers('${u}')`);
      return createMcpSuccessResult({ success: true, deletedUser: args.user });
    default:
      return createMcpErrorResult(new Error(`Unknown action: ${args.action}`));
  }
}

async function handleParameters(
  client: SapApiClient,
  base: string,
  args: PartnerDirArgs,
  pid: string,
  id: string,
  q: Record<string, string | number | undefined>,
): Promise<McpToolResult> {
  switch (args.action) {
    case "list_string_parameters": {
      const res = await client.get(`${base}/StringParameters`, q);
      return createMcpSuccessResult(res.data, res.hasMore);
    }
    case "get_string_parameter":
      if (!pid || !id) return createMcpErrorResult(new Error("pid and id required"));
      return createMcpSuccessResult((await client.get(`${base}/StringParameters(Pid='${pid}',Id='${id}')`)).data);
    case "create_string_parameter":
      if (!args.pid || !args.id || args.value === undefined) return createMcpErrorResult(new Error("pid, id, value required"));
      return createMcpSuccessResult((await client.post(`${base}/StringParameters`, { Pid: args.pid, Id: args.id, Value: args.value })).data);
    case "update_string_parameter":
      if (!pid || !id || args.value === undefined) return createMcpErrorResult(new Error("pid, id, value required"));
      return createMcpSuccessResult((await client.put(`${base}/StringParameters(Pid='${pid}',Id='${id}')`, { Value: args.value })).data || { success: true });
    case "delete_string_parameter":
      if (!pid || !id) return createMcpErrorResult(new Error("pid and id required"));
      await client.delete(`${base}/StringParameters(Pid='${pid}',Id='${id}')`);
      return createMcpSuccessResult({ success: true, deletedParameter: args.id });
    case "list_binary_parameters": {
      const res = await client.get(`${base}/BinaryParameters`, q);
      return createMcpSuccessResult(res.data, res.hasMore);
    }
    case "get_binary_parameter":
      if (!pid || !id) return createMcpErrorResult(new Error("pid and id required"));
      return createMcpSuccessResult((await client.get(`${base}/BinaryParameters(Pid='${pid}',Id='${id}')`)).data);
    case "create_binary_parameter":
      if (!args.pid || !args.id || !args.contentType || args.value === undefined) {
        return createMcpErrorResult(new Error("pid, id, contentType, value required"));
      }
      return createMcpSuccessResult(
        (await client.post(`${base}/BinaryParameters`, { Pid: args.pid, Id: args.id, ContentType: args.contentType, Value: args.value })).data,
      );
    case "update_binary_parameter": {
      if (!pid || !id) return createMcpErrorResult(new Error("pid and id required"));
      const body: Record<string, string> = {};
      if (args.contentType) body["ContentType"] = args.contentType;
      if (args.value !== undefined) body["Value"] = args.value;
      return createMcpSuccessResult((await client.put(`${base}/BinaryParameters(Pid='${pid}',Id='${id}')`, body)).data || { success: true });
    }
    case "delete_binary_parameter":
      if (!pid || !id) return createMcpErrorResult(new Error("pid and id required"));
      await client.delete(`${base}/BinaryParameters(Pid='${pid}',Id='${id}')`);
      return createMcpSuccessResult({ success: true, deletedBinaryParameter: args.id });
    default:
      return createMcpErrorResult(new Error(`Unknown action: ${args.action}`));
  }
}

async function handlePartnerDirectoryAction(
  client: SapApiClient,
  args: PartnerDirArgs,
): Promise<McpToolResult> {
  const base = EIC_PATHS.PARTNER_DIRECTORY;
  const q: Record<string, string | number | undefined> = {};
  if (args.filter) q["$filter"] = args.filter;
  if (args.select) q["$select"] = args.select;
  if (args.orderBy) q["$orderby"] = args.orderBy;
  if (args.top !== undefined) q["$top"] = args.top;
  if (args.skip !== undefined) q["$skip"] = args.skip;

  const pid = args.pid ? encodeURIComponent(args.pid) : "";
  const u = args.user ? encodeURIComponent(args.user) : "";
  const id = args.id ? encodeURIComponent(args.id) : "";

  if (args.action.includes("parameter")) {
    return handleParameters(client, base, args, pid, id, q);
  }
  return handlePartnerUsersAndAlt(client, base, args, pid, u, q);
}

// ---------------------------------------------------------------------------
// Tool Registration
// ---------------------------------------------------------------------------

export function registerTools(server: McpServer, clientOverride?: SapApiClient): void {
  if (clientOverride) {
    activeClient = clientOverride;
  }

  // 1. Semantic Query Tool
  server.tool(
    "sap_eic_query_entities",
    "Query SAP Edge Integration Cell OData collections (Components, Jobs, MessageProcessingLogs, MessagingQueues, DataStores, Variables, PartnerDirectory) with filtering, selecting, ordering, and pagination.",
    {
      entity: z
        .enum(EicQueryableEntities)
        .describe("The Edge Integration Cell entity collection to query"),
      filter: z
        .string()
        .optional()
        .describe("OData $filter expression (e.g. Status eq 'FAILED' or OverallStatus eq 'ERROR')"),
      select: z
        .string()
        .optional()
        .describe("OData $select comma-separated property names (e.g. ID,Name,OverallStatus)"),
      orderBy: z
        .string()
        .optional()
        .describe("OData $orderby expression (e.g. LogEnd desc or Name asc)"),
      top: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .describe("Max number of entities to return (1-50, defaults to 20)"),
      skip: z
        .number()
        .int()
        .min(0)
        .optional()
        .describe("Number of entities to skip for pagination"),
      expand: z
        .string()
        .optional()
        .describe("OData $expand navigation property (e.g. Pods, Schedule, RuntimeParameters)"),
      inlinecount: z
        .enum(["allpages", "none"])
        .optional()
        .describe("Include total count in OData v2 inlinecount"),
      count: z
        .boolean()
        .optional()
        .describe("OData v4 $count parameter to include total record count"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const query: Record<string, string | number | boolean | undefined> = {};

        if (args.filter) query["$filter"] = args.filter;
        if (args.select) query["$select"] = args.select;
        if (args.orderBy) query["$orderby"] = args.orderBy;
        if (args.top !== undefined) query["$top"] = args.top;
        if (args.skip !== undefined) query["$skip"] = args.skip;
        if (args.expand) query["$expand"] = args.expand;
        if (args.inlinecount) query["$inlinecount"] = args.inlinecount;
        if (args.count !== undefined) query["$count"] = args.count;

        let basePath: string;
        switch (args.entity) {
          case "Components":
          case "Jobs":
            basePath = EIC_PATHS.COMPONENTS_JOBS;
            break;
          case "AlternativePartners":
          case "AuthorizedUsers":
          case "BinaryParameters":
          case "StringParameters":
          case "Partners":
            basePath = EIC_PATHS.PARTNER_DIRECTORY;
            break;
          default:
            basePath = EIC_PATHS.LOCAL_CORE;
            break;
        }

        const path = `${basePath}/${args.entity}`;
        const res = await client.get(path, query);
        return createMcpSuccessResult(res.data, res.hasMore);
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 2. Component Management Tool
  server.tool(
    "sap_eic_manage_component",
    "Monitor, inspect, and manage Edge Integration Cell components, pods, events, metrics, runtime parameters, and restart operations.",
    {
      action: z
        .enum([
          "list",
          "get",
          "count",
          "restart",
          "list_pods",
          "count_pods",
          "get_pod",
          "pod_events",
          "count_pod_events",
          "pod_metrics",
          "count_pod_metrics",
          "runtime_parameters",
          "count_runtime_parameters",
        ])
        .describe("Action on component or pod"),
      componentId: z.string().optional().describe("Component ID (e.g. 'WORKER', 'SOLACE')"),
      podName: z.string().optional().describe("Kubernetes pod name"),
      metricKey: z.string().optional().describe("Metric key name"),
      parameterName: z.string().optional().describe("Runtime parameter name"),
      filter: z.string().optional().describe("OData $filter expression"),
      select: z.string().optional().describe("OData $select property names"),
      expand: z.string().optional().describe("OData $expand navigation property"),
      orderBy: z.string().optional().describe("OData $orderby expression"),
      top: z.number().int().min(1).max(50).optional().describe("Max items"),
      skip: z.number().int().min(0).optional().describe("Items to skip"),
      count: z.boolean().optional().describe("Include count flag"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const q: Record<string, string | number | boolean | undefined> = {};
        if (args.filter) q["$filter"] = args.filter;
        if (args.select) q["$select"] = args.select;
        if (args.expand) q["$expand"] = args.expand;
        if (args.orderBy) q["$orderby"] = args.orderBy;
        if (args.top !== undefined) q["$top"] = args.top;
        if (args.skip !== undefined) q["$skip"] = args.skip;
        if (args.count !== undefined) q["$count"] = args.count;

        const base = EIC_PATHS.COMPONENTS_JOBS;
        const cId = args.componentId ? encodeURIComponent(args.componentId) : "";
        const pod = args.podName ? encodeURIComponent(args.podName) : "";

        switch (args.action) {
          case "list":
            return createMcpSuccessResult((await client.get(`${base}/Components`, q)).data);
          case "count":
            return createMcpSuccessResult((await client.get(`${base}/Components/$count`, q)).data);
          case "get":
            if (!cId) return createMcpErrorResult(new Error("componentId is required"));
            return createMcpSuccessResult((await client.get(`${base}/Components/${cId}`, q)).data);
          case "restart":
            if (!cId) return createMcpErrorResult(new Error("componentId is required"));
            return createMcpSuccessResult(
              (await client.post(`${base}/Components/${cId}/com.sap.eic.api.restart`)).data || {
                success: true,
                restartedComponent: args.componentId,
              },
            );
          case "list_pods":
            if (!cId) return createMcpErrorResult(new Error("componentId is required"));
            return createMcpSuccessResult((await client.get(`${base}/Components/${cId}/Pods`, q)).data);
          case "count_pods":
            if (!cId) return createMcpErrorResult(new Error("componentId is required"));
            return createMcpSuccessResult((await client.get(`${base}/Components/${cId}/Pods/$count`, q)).data);
          case "get_pod":
            if (!cId || !pod) return createMcpErrorResult(new Error("componentId and podName required"));
            return createMcpSuccessResult((await client.get(`${base}/Components/${cId}/Pods/${pod}`, q)).data);
          case "pod_events":
            if (!cId || !pod) return createMcpErrorResult(new Error("componentId and podName required"));
            return createMcpSuccessResult((await client.get(`${base}/Components/${cId}/Pods/${pod}/Events`, q)).data);
          case "count_pod_events":
            if (!cId || !pod) return createMcpErrorResult(new Error("componentId and podName required"));
            return createMcpSuccessResult(
              (await client.get(`${base}/Components/${cId}/Pods/${pod}/Events/$count`, q)).data,
            );
          case "pod_metrics": {
            if (!cId || !pod) return createMcpErrorResult(new Error("componentId and podName required"));
            const path = args.metricKey
              ? `${base}/Components/${cId}/Pods/${pod}/Metrics/${encodeURIComponent(args.metricKey)}`
              : `${base}/Components/${cId}/Pods/${pod}/Metrics`;
            return createMcpSuccessResult((await client.get(path, q)).data);
          }
          case "count_pod_metrics":
            if (!cId || !pod) return createMcpErrorResult(new Error("componentId and podName required"));
            return createMcpSuccessResult(
              (await client.get(`${base}/Components/${cId}/Pods/${pod}/Metrics/$count`, q)).data,
            );
          case "runtime_parameters": {
            if (!cId) return createMcpErrorResult(new Error("componentId is required"));
            const path = args.parameterName
              ? `${base}/Components/${cId}/RuntimeParameters/${encodeURIComponent(args.parameterName)}`
              : `${base}/Components/${cId}/RuntimeParameters`;
            return createMcpSuccessResult((await client.get(path, q)).data);
          }
          case "count_runtime_parameters":
            if (!cId) return createMcpErrorResult(new Error("componentId is required"));
            return createMcpSuccessResult(
              (await client.get(`${base}/Components/${cId}/RuntimeParameters/$count`, q)).data,
            );
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 3. Job Management Tool
  server.tool(
    "sap_eic_manage_job",
    "Inspect, create, update, or delete background and diagnostic jobs and schedules on Edge Integration Cell.",
    {
      action: z
        .enum([
          "list",
          "count",
          "get",
          "create",
          "update",
          "patch",
          "delete",
          "get_schedule",
          "update_schedule",
          "patch_schedule",
        ])
        .describe("Action on background job or schedule"),
      jobId: z.string().optional().describe("Job technical ID"),
      name: z.string().optional().describe("Display Name for job creation"),
      actionId: z
        .enum(ActionIds)
        .or(z.string())
        .optional()
        .describe("Action identifier (e.g. 'CleanupDiagnostics', 'CleanupDataStoreEntries')"),
      parameters: z.array(z.record(z.unknown())).optional().describe("Job parameters array"),
      schedule: z.record(z.unknown()).optional().describe("Job schedule configuration object"),
      filter: z.string().optional().describe("OData $filter expression"),
      select: z.string().optional().describe("OData $select property names"),
      expand: z.string().optional().describe("OData $expand navigation property (e.g. 'Schedule')"),
      orderBy: z.string().optional().describe("OData $orderby expression"),
      top: z.number().int().min(1).max(50).optional().describe("Max items to return"),
      skip: z.number().int().min(0).optional().describe("Items to skip"),
      count: z.boolean().optional().describe("Include count flag"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const q: Record<string, string | number | boolean | undefined> = {};
        if (args.filter) q["$filter"] = args.filter;
        if (args.select) q["$select"] = args.select;
        if (args.expand) q["$expand"] = args.expand;
        if (args.orderBy) q["$orderby"] = args.orderBy;
        if (args.top !== undefined) q["$top"] = args.top;
        if (args.skip !== undefined) q["$skip"] = args.skip;
        if (args.count !== undefined) q["$count"] = args.count;

        const base = EIC_PATHS.COMPONENTS_JOBS;
        const jId = args.jobId ? encodeURIComponent(args.jobId) : "";

        switch (args.action) {
          case "list": {
            const res = await client.get(`${base}/Jobs`, q);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "count":
            return createMcpSuccessResult((await client.get(`${base}/Jobs/$count`, q)).data);
          case "get":
            if (!jId) return createMcpErrorResult(new Error("jobId is required"));
            return createMcpSuccessResult((await client.get(`${base}/Jobs/${jId}`, q)).data);
          case "create": {
            if (!args.name || !args.actionId) {
              return createMcpErrorResult(new Error("name and actionId are required to create a job"));
            }
            const body = {
              Name: args.name,
              ActionId: args.actionId,
              Parameters: args.parameters || [],
              Schedule: args.schedule,
            };
            return createMcpSuccessResult((await client.post(`${base}/Jobs`, body)).data);
          }
          case "update": {
            if (!jId) return createMcpErrorResult(new Error("jobId is required"));
            const body = { Parameters: args.parameters || [], Schedule: args.schedule };
            return createMcpSuccessResult(
              (await client.put(`${base}/Jobs/${jId}`, body)).data || {
                success: true,
                updatedJobId: args.jobId,
              },
            );
          }
          case "patch": {
            if (!jId) return createMcpErrorResult(new Error("jobId is required"));
            const body: Record<string, unknown> = {};
            if (args.parameters) body["Parameters"] = args.parameters;
            if (args.schedule) body["Schedule"] = args.schedule;
            return createMcpSuccessResult(
              (await client.patch(`${base}/Jobs/${jId}`, body)).data || {
                success: true,
                patchedJobId: args.jobId,
              },
            );
          }
          case "delete":
            if (!jId) return createMcpErrorResult(new Error("jobId is required"));
            await client.delete(`${base}/Jobs/${jId}`);
            return createMcpSuccessResult({ success: true, deletedJobId: args.jobId });
          case "get_schedule":
            if (!jId) return createMcpErrorResult(new Error("jobId is required"));
            return createMcpSuccessResult((await client.get(`${base}/Jobs/${jId}/Schedule`)).data);
          case "update_schedule":
            if (!jId || !args.schedule) return createMcpErrorResult(new Error("jobId and schedule are required"));
            return createMcpSuccessResult(
              (await client.put(`${base}/Jobs/${jId}/Schedule`, args.schedule)).data || {
                success: true,
                updatedSchedule: args.jobId,
              },
            );
          case "patch_schedule":
            if (!jId || !args.schedule) return createMcpErrorResult(new Error("jobId and schedule are required"));
            return createMcpSuccessResult(
              (await client.patch(`${base}/Jobs/${jId}/Schedule`, args.schedule)).data || {
                success: true,
                patchedSchedule: args.jobId,
              },
            );
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 4. Message Processing Logs Tool
  server.tool(
    "sap_eic_get_message_processing_logs",
    "Query, inspect, and troubleshoot local Edge Integration Cell Message Processing Logs (MPLs), error stacks, headers, and attachments.",
    {
      action: z
        .enum([
          "list",
          "count",
          "get",
          "error_information",
          "adapter_attributes",
          "custom_header_properties",
          "attachments",
          "message_store_entries",
        ])
        .describe("Action on message processing logs"),
      messageGuid: z.string().optional().describe("Message Processing Log GUID"),
      filter: z.string().optional().describe("OData $filter expression (e.g. Status eq 'FAILED')"),
      select: z.string().optional().describe("OData $select property names"),
      orderBy: z.string().optional().describe("OData $orderby expression (e.g. LogEnd desc)"),
      top: z.number().int().min(1).max(50).optional().describe("Max items to return"),
      skip: z.number().int().min(0).optional().describe("Items to skip"),
      expand: z.string().optional().describe("OData $expand navigation property"),
      inlinecount: z.enum(["allpages", "none"]).optional().describe("Include total count in inlinecount"),
      rawValue: z.boolean().optional().describe("Retrieve raw error text via $value endpoint"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const q: Record<string, string | number | undefined> = {};
        if (args.filter) q["$filter"] = args.filter;
        if (args.select) q["$select"] = args.select;
        if (args.orderBy) q["$orderby"] = args.orderBy;
        if (args.top !== undefined) q["$top"] = args.top;
        if (args.skip !== undefined) q["$skip"] = args.skip;
        if (args.expand) q["$expand"] = args.expand;
        if (args.inlinecount) q["$inlinecount"] = args.inlinecount;

        const base = EIC_PATHS.LOCAL_CORE;
        const mId = args.messageGuid ? encodeURIComponent(args.messageGuid) : "";

        switch (args.action) {
          case "list": {
            const res = await client.get(`${base}/MessageProcessingLogs`, q);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "count":
            return createMcpSuccessResult((await client.get(`${base}/MessageProcessingLogs/$count`, q)).data);
          case "get":
            if (!mId) return createMcpErrorResult(new Error("messageGuid is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessageProcessingLogs('${mId}')`, q)).data);
          case "error_information": {
            if (!mId) return createMcpErrorResult(new Error("messageGuid is required"));
            const path = args.rawValue
              ? `${base}/MessageProcessingLogs('${mId}')/ErrorInformation/$value`
              : `${base}/MessageProcessingLogs('${mId}')/ErrorInformation`;
            return createMcpSuccessResult((await client.get(path)).data);
          }
          case "adapter_attributes":
            if (!mId) return createMcpErrorResult(new Error("messageGuid is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessageProcessingLogs('${mId}')/AdapterAttributes`, q)).data);
          case "custom_header_properties":
            if (!mId) return createMcpErrorResult(new Error("messageGuid is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessageProcessingLogs('${mId}')/CustomHeaderProperties`, q)).data);
          case "attachments":
            if (!mId) return createMcpErrorResult(new Error("messageGuid is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessageProcessingLogs('${mId}')/Attachments`)).data);
          case "message_store_entries":
            if (!mId) return createMcpErrorResult(new Error("messageGuid is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessageProcessingLogs('${mId}')/MessageStoreEntries`)).data);
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 5. Message Store Management Tool
  server.tool(
    "sap_eic_manage_message_store",
    "Inspect persisted message store entries, payloads ($value), attachments, and properties in Edge Integration Cell.",
    {
      action: z
        .enum([
          "get_entry",
          "get_entry_payload",
          "list_entry_properties",
          "get_entry_property",
          "list_attachments",
          "get_attachment",
          "get_attachment_payload",
          "list_attachment_properties",
          "get_attachment_property",
        ])
        .describe("Action on message store"),
      entryId: z.string().optional().describe("Message Store Entry ID"),
      attachmentId: z.string().optional().describe("Message Store Attachment ID"),
      propertyName: z.string().optional().describe("Property name for entry or attachment"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const base = EIC_PATHS.LOCAL_CORE;
        const eId = args.entryId ? encodeURIComponent(args.entryId) : "";
        const aId = args.attachmentId ? encodeURIComponent(args.attachmentId) : "";
        const prop = args.propertyName ? encodeURIComponent(args.propertyName) : "";

        switch (args.action) {
          case "get_entry":
            if (!eId) return createMcpErrorResult(new Error("entryId is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessageStoreEntries('${eId}')`)).data);
          case "get_entry_payload":
            if (!eId) return createMcpErrorResult(new Error("entryId is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessageStoreEntries('${eId}')/$value`)).data);
          case "list_entry_properties":
            if (!eId) return createMcpErrorResult(new Error("entryId is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessageStoreEntries('${eId}')/Properties`)).data);
          case "get_entry_property":
            if (!eId || !prop) return createMcpErrorResult(new Error("entryId and propertyName are required"));
            return createMcpSuccessResult(
              (await client.get(`${base}/MessageStoreEntryProperties(MessageId='${eId}',Name='${prop}')`)).data,
            );
          case "list_attachments":
            if (!eId) return createMcpErrorResult(new Error("entryId is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessageStoreEntries('${eId}')/Attachments`)).data);
          case "get_attachment":
            if (!aId) return createMcpErrorResult(new Error("attachmentId is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessageStoreEntryAttachments('${aId}')`)).data);
          case "get_attachment_payload":
            if (!aId) return createMcpErrorResult(new Error("attachmentId is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessageStoreEntryAttachments('${aId}')/$value`)).data);
          case "list_attachment_properties":
            if (!aId) return createMcpErrorResult(new Error("attachmentId is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessageStoreEntryAttachments('${aId}')/Properties`)).data);
          case "get_attachment_property":
            if (!aId || !prop) return createMcpErrorResult(new Error("attachmentId and propertyName are required"));
            return createMcpSuccessResult(
              (await client.get(`${base}/MessageStoreEntryAttachmentProperties(AttachmentId='${aId}',Name='${prop}')`)).data,
            );
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 6. Messaging Queues & JMS Broker Tool
  server.tool(
    "sap_eic_manage_messaging_queues",
    "Monitor JMS/Solace broker status, queues, messages, payloads, and execute message move or retry actions.",
    {
      action: z
        .enum([
          "broker_status",
          "list_queues",
          "get_queue",
          "delete_queue",
          "list_messages",
          "get_message",
          "delete_message",
          "get_message_payload",
          "move_messages",
          "retry_messages",
        ])
        .describe("Action on broker, queue, or messages"),
      queueName: z.string().optional().describe("Messaging queue name"),
      jmsMessageId: z.string().optional().describe("JMS Message ID"),
      forceDelete: z.boolean().optional().describe("Force queue deletion"),
      sourceQueue: z.string().optional().describe("Source queue name"),
      targetQueue: z.string().optional().describe("Target queue name"),
      messageIds: z.array(z.string()).optional().describe("Array of JMS message IDs"),
      correlationId: z.string().optional().describe("Correlation ID filter"),
      sender: z.string().optional().describe("Sender filter"),
      receiver: z.string().optional().describe("Receiver filter"),
      mplId: z.string().optional().describe("MPL GUID filter"),
      pageSize: z.number().int().min(1).max(50).optional().describe("Capped page size"),
      expand: z.string().optional().describe("OData expand property"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const base = EIC_PATHS.LOCAL_CORE;
        const qName = args.queueName ? encodeURIComponent(args.queueName) : "";
        const jmsId = args.jmsMessageId ? encodeURIComponent(args.jmsMessageId) : "";

        switch (args.action) {
          case "broker_status": {
            const q: Record<string, string | undefined> = {};
            if (args.expand) q["$expand"] = args.expand;
            return createMcpSuccessResult((await client.get(`${base}/JmsBrokers('Broker1')`, q)).data);
          }
          case "list_queues":
            return createMcpSuccessResult((await client.get(`${base}/MessagingQueues`)).data);
          case "get_queue":
            if (!qName) return createMcpErrorResult(new Error("queueName is required"));
            return createMcpSuccessResult((await client.get(`${base}/MessagingQueues('${qName}')`)).data);
          case "delete_queue": {
            if (!qName) return createMcpErrorResult(new Error("queueName is required"));
            const q: Record<string, string | undefined> = {};
            if (args.forceDelete !== undefined) q["forceDelete"] = String(args.forceDelete);
            await client.delete(`${base}/MessagingQueues('${qName}')`, q);
            return createMcpSuccessResult({ success: true, deletedQueue: args.queueName });
          }
          case "list_messages": {
            if (!qName) return createMcpErrorResult(new Error("queueName is required"));
            const q: Record<string, string | number | undefined> = {};
            if (args.jmsMessageId) q["jmsMessageId"] = args.jmsMessageId;
            if (args.correlationId) q["correlationId"] = args.correlationId;
            if (args.sender) q["sender"] = args.sender;
            if (args.receiver) q["receiver"] = args.receiver;
            if (args.mplId) q["mplId"] = args.mplId;
            if (args.pageSize !== undefined) q["pageSize"] = args.pageSize;
            const res = await client.get(`${base}/MessagingQueues('${qName}')/MessagingMessages`, q);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "get_message":
            if (!qName || !jmsId) return createMcpErrorResult(new Error("queueName and jmsMessageId required"));
            return createMcpSuccessResult(
              (await client.get(`${base}/MessagingMessages(jmsMessageId='${jmsId}',queueName='${qName}')`)).data,
            );
          case "delete_message":
            if (!qName || !jmsId) return createMcpErrorResult(new Error("queueName and jmsMessageId required"));
            await client.delete(`${base}/MessagingMessages(jmsMessageId='${jmsId}',queueName='${qName}')`);
            return createMcpSuccessResult({ success: true, deletedMessageId: args.jmsMessageId });
          case "get_message_payload":
            if (!qName || !jmsId) return createMcpErrorResult(new Error("queueName and jmsMessageId required"));
            return createMcpSuccessResult(
              (await client.get(`${base}/MessagingMessages(jmsMessageId='${jmsId}',queueName='${qName}')/$value`)).data,
            );
          case "move_messages": {
            if (!args.sourceQueue || !args.targetQueue) return createMcpErrorResult(new Error("sourceQueue and targetQueue required"));
            const body: Record<string, unknown> = { sourceQueue: args.sourceQueue, targetQueue: args.targetQueue };
            if (args.messageIds) body["jmsMessageIds"] = args.messageIds;
            if (args.jmsMessageId) body["jmsMessageId"] = args.jmsMessageId;
            return createMcpSuccessResult((await client.post(`${base}/MoveMessagingMessages`, body)).data);
          }
          case "retry_messages": {
            if (!args.queueName) return createMcpErrorResult(new Error("queueName is required"));
            const body: Record<string, unknown> = { queueName: args.queueName };
            if (args.messageIds) body["jmsMessageIds"] = args.messageIds;
            if (args.jmsMessageId) body["jmsMessageId"] = args.jmsMessageId;
            return createMcpSuccessResult((await client.post(`${base}/RetryMessagingMessages`, body)).data);
          }
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 7. Data Stores & Variables Tool
  server.tool(
    "sap_eic_manage_data_stores",
    "Inspect edge Data Stores, Data Store Entries, Variables, and download stored payloads ($value).",
    {
      action: z
        .enum([
          "list_data_stores",
          "get_data_store",
          "list_entries",
          "get_entry",
          "get_entry_payload",
          "list_variables",
          "get_variable",
          "get_variable_payload",
        ])
        .describe("Action on data stores or variables"),
      dataStoreName: z.string().optional().describe("Data store name"),
      integrationFlow: z.string().optional().describe("Integration Flow ID"),
      type: z.string().optional().default("default").describe("Data store type (defaults to 'default')"),
      entryId: z.string().optional().describe("Data store entry ID"),
      variableName: z.string().optional().describe("Variable name"),
      overdueOnly: z.boolean().optional().describe("Filter for overdue messages/entries only"),
      messageId: z.string().optional().describe("Filter data store entries by message ID"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const base = EIC_PATHS.LOCAL_CORE;
        const dsName = args.dataStoreName ? encodeURIComponent(args.dataStoreName) : "";
        const iflow = args.integrationFlow ? encodeURIComponent(args.integrationFlow) : "";
        const dsType = args.type ? encodeURIComponent(args.type) : "default";
        const eId = args.entryId ? encodeURIComponent(args.entryId) : "";
        const vName = args.variableName ? encodeURIComponent(args.variableName) : "";

        switch (args.action) {
          case "list_data_stores": {
            const q: Record<string, string | undefined> = {};
            if (args.overdueOnly !== undefined) q["overdueonly"] = String(args.overdueOnly);
            return createMcpSuccessResult((await client.get(`${base}/DataStores`, q)).data);
          }
          case "get_data_store": {
            if (!dsName || !iflow) return createMcpErrorResult(new Error("dataStoreName and integrationFlow required"));
            return createMcpSuccessResult(
              (await client.get(`${base}/DataStores(DataStoreName='${dsName}',IntegrationFlow='${iflow}',Type='${dsType}')`)).data,
            );
          }
          case "list_entries": {
            const q: Record<string, string | undefined> = {};
            if (args.overdueOnly !== undefined) q["overdueonly"] = String(args.overdueOnly);
            if (args.messageId) q["messageid"] = args.messageId;
            const path = dsName && iflow
              ? `${base}/DataStores(DataStoreName='${dsName}',IntegrationFlow='${iflow}',Type='${dsType}')/Entries`
              : `${base}/DataStoreEntries`;
            return createMcpSuccessResult((await client.get(path, q)).data);
          }
          case "get_entry": {
            if (!eId || !dsName || !iflow) return createMcpErrorResult(new Error("entryId, dataStoreName, and integrationFlow required"));
            return createMcpSuccessResult(
              (await client.get(`${base}/DataStoreEntries(Id='${eId}',DataStoreName='${dsName}',IntegrationFlow='${iflow}',Type='${dsType}')`)).data,
            );
          }
          case "get_entry_payload": {
            if (!eId || !dsName || !iflow) return createMcpErrorResult(new Error("entryId, dataStoreName, and integrationFlow required"));
            return createMcpSuccessResult(
              (await client.get(`${base}/DataStoreEntries(Id='${eId}',DataStoreName='${dsName}',IntegrationFlow='${iflow}',Type='${dsType}')/$value`)).data,
            );
          }
          case "list_variables":
            return createMcpSuccessResult((await client.get(`${base}/Variables`)).data);
          case "get_variable": {
            if (!vName || !iflow) return createMcpErrorResult(new Error("variableName and integrationFlow required"));
            return createMcpSuccessResult(
              (await client.get(`${base}/Variables(VariableName='${vName}',IntegrationFlow='${iflow}')`)).data,
            );
          }
          case "get_variable_payload": {
            if (!vName || !iflow) return createMcpErrorResult(new Error("variableName and integrationFlow required"));
            return createMcpSuccessResult(
              (await client.get(`${base}/Variables(VariableName='${vName}',IntegrationFlow='${iflow}')/$value`)).data,
            );
          }
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 8. Partner Directory Management Tool
  server.tool(
    "sap_eic_manage_partner_directory",
    "Manage B2B Partner Directory entities (Partners, Alternative Partners, Authorized Users, String & Binary Parameters) on Edge Integration Cell.",
    PartnerDirectorySchema,
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        return await handlePartnerDirectoryAction(client, args as PartnerDirArgs);
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
  // 1. Components & Pods Overview
  server.resource(
    "eic-components",
    "sap://eic/components",
    async (uri) => {
      try {
        const client = getClient();
        const res = await client.get(`${EIC_PATHS.COMPONENTS_JOBS}/Components?$expand=Pods`);
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
              text: `Error loading EIC components: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 2. Background Jobs Overview
  server.resource(
    "eic-jobs",
    "sap://eic/jobs",
    async (uri) => {
      try {
        const client = getClient();
        const res = await client.get(`${EIC_PATHS.COMPONENTS_JOBS}/Jobs?$expand=Schedule`);
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
              text: `Error loading EIC jobs: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 3. Messaging Queues Overview
  server.resource(
    "eic-queues",
    "sap://eic/queues",
    async (uri) => {
      try {
        const client = getClient();
        const res = await client.get(`${EIC_PATHS.LOCAL_CORE}/MessagingQueues`);
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
              text: `Error loading EIC queues: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 4. Failed Messages
  server.resource(
    "eic-failed-messages",
    "sap://eic/failed-messages",
    async (uri) => {
      try {
        const client = getClient();
        const res = await client.get(
          `${EIC_PATHS.LOCAL_CORE}/MessageProcessingLogs?$filter=Status eq 'FAILED'&$top=20&$orderby=LogEnd desc`,
        );
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
              text: `Error loading EIC failed messages: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 5. Data Stores
  server.resource(
    "eic-data-stores",
    "sap://eic/data-stores",
    async (uri) => {
      try {
        const client = getClient();
        const res = await client.get(`${EIC_PATHS.LOCAL_CORE}/DataStores`);
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
              text: `Error loading EIC data stores: ${err instanceof Error ? err.message : String(err)}`,
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
  // 1. Troubleshoot Component Prompt
  server.prompt(
    "eic-troubleshoot-component",
    "Analyze and troubleshoot unhealthy Edge Integration Cell components, pods, restart counts, events, and metrics.",
    {
      componentId: z
        .string()
        .optional()
        .describe("Target Component ID (e.g. 'WORKER', 'SOLACE', 'REDIS')"),
      podName: z.string().optional().describe("Target Kubernetes pod name"),
    },
    (args) => {
      const guidance = args.componentId
        ? `Investigate Edge Integration Cell component "${args.componentId}":
1. Check overall component status with 'sap_eic_manage_component' (action: 'get', componentId: '${args.componentId}').
2. List pods and check readiness/restart count with action 'list_pods'.
3. For failing pod ${args.podName || "[podName]"}, inspect events with action 'pod_events' and metrics with action 'pod_metrics'.
4. If pods are in CrashLoopBackOff or degraded state, consider restarting with action 'restart'.`
        : `Audit all Edge Integration Cell components using 'sap_eic_manage_component' (action: 'list'). Filter for OverallStatus 'WARN' or 'ERROR'. Examine pod restart counts and events for unhealthy components.`;

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: guidance,
            },
          },
        ],
      };
    },
  );

  // 2. Troubleshoot Failed Messages Prompt
  server.prompt(
    "eic-troubleshoot-failed-messages",
    "Guide root-cause analysis for failed message processing logs on Edge Integration Cell, inspect error stack traces, and manage error queues.",
    {
      messageGuid: z.string().optional().describe("MPL Message GUID to inspect"),
      queueName: z.string().optional().describe("JMS/messaging queue to inspect"),
    },
    (args) => {
      const guidance = args.messageGuid
        ? `Investigate failed message GUID "${args.messageGuid}" on Edge Integration Cell:
1. Retrieve error information stack trace using 'sap_eic_get_message_processing_logs' (action: 'error_information', messageGuid: '${args.messageGuid}', rawValue: true).
2. Check adapter attributes and custom headers using actions 'adapter_attributes' and 'custom_header_properties'.
3. Check persisted message store entries using action 'message_store_entries'.
4. If stored in a messaging queue, inspect or retry the message using 'sap_eic_manage_messaging_queues'.`
        : `Check recent failed messages using 'sap_eic_get_message_processing_logs' (action: 'list', filter: "Status eq 'FAILED'") or resource 'sap://eic/failed-messages'. Identify recurring errors, failing adapters, and evaluate queues using 'sap_eic_manage_messaging_queues'.`;

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: guidance,
            },
          },
        ],
      };
    },
  );

  // 3. Audit Edge Node Prompt
  server.prompt(
    "eic-audit-edge-node",
    "Perform a comprehensive operational health audit of an Edge Integration Cell node across components, broker queues, background jobs, and data stores.",
    {},
    () => {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Perform a complete Edge Integration Cell operational audit:
1. Components & Pods: Read resource 'sap://eic/components' or tool 'sap_eic_manage_component' (action: 'list'). Verify all components report OverallStatus 'OK'.
2. Messaging Broker & Queues: Read resource 'sap://eic/queues' and tool 'sap_eic_manage_messaging_queues' (action: 'broker_status', expand: 'QueueStates'). Verify broker capacity and check for queue backlogs.
3. Background Maintenance Jobs: Read resource 'sap://eic/jobs' or tool 'sap_eic_manage_job' (action: 'list'). Check LastExecutionState is 'COMPLETED' and verify next run times.
4. Data Stores: Read resource 'sap://eic/data-stores' and check for overdue messages using 'sap_eic_manage_data_stores' (action: 'list_data_stores', overdueOnly: true).`,
            },
          },
        ],
      };
    },
  );
}

const EdgeIntegrationCellDomain: SAPDomainModule = {
  name: "Edge Integration Cell",
  domainKey: "edge-integration-cell",
  registerTools,
  registerResources,
  registerPrompts,
};

export default EdgeIntegrationCellDomain;

