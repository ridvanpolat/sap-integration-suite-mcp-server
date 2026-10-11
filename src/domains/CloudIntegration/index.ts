/**
 * src/domains/CloudIntegration/index.ts
 *
 * Cloud Integration (CPI) Domain Module for SAP Integration Suite MCP Server.
 *
 * Implements semantic MCP tools, resources, and prompts for:
 *   - Integration Packages (Design time catalog, creation, updates)
 *   - Integration Designtime Artifacts (iFlows, value mappings, script collections)
 *   - Runtime Artifacts (Worker node deployments, status, errors, undeploy)
 *   - Message Processing Logs (MPL monitoring, error details, run steps, attachments)
 *   - Data Stores & Variables (Payload persistence, message store inspection)
 *   - Security Content (Keystores, certificates, credentials, certificate mappings)
 *   - Partner Directory (B2B Partners, authorized users, parameters, alternative partners)
 *
 * All operations use build-time extracted metadata from specs/CloudIntegration.
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

export function setCloudIntegrationClient(client: SapApiClient): void {
  activeClient = client;
}

function getClient(): SapApiClient {
  if (!activeClient) {
    const env = loadEnvConfig();
    activeClient = createDomainApiClient("cloud-integration", env);
  }
  return activeClient;
}

// ---------------------------------------------------------------------------
// Queryable Entities Enum (OData v2)
// ---------------------------------------------------------------------------

export const CpiQueryableEntities = [
  "IntegrationPackages",
  "IntegrationDesigntimeArtifacts",
  "IntegrationRuntimeArtifacts",
  "MessageProcessingLogs",
  "DataStores",
  "DataStoreEntries",
  "Variables",
  "KeystoreEntries",
  "UserCredentials",
  "CertificateUserMappings",
  "Partners",
  "AuthorizedUsers",
  "AlternativePartners",
] as const;

export type CpiQueryableEntity = (typeof CpiQueryableEntities)[number];

// ---------------------------------------------------------------------------
// Tool Registration
// ---------------------------------------------------------------------------

export function registerTools(server: McpServer, clientOverride?: SapApiClient): void {
  if (clientOverride) {
    activeClient = clientOverride;
  }

  // 1. Semantic Query Tool
  server.tool(
    "sap_cpi_query_entities",
    "Query SAP Cloud Integration OData v2 collections with filtering, selecting, ordering, expanding, and pagination. Truncates results to protect context window.",
    {
      entity: z
        .enum(CpiQueryableEntities)
        .describe("The Cloud Integration entity collection to query"),
      filter: z
        .string()
        .optional()
        .describe("OData $filter expression (e.g. Status eq 'FAILED' or startswith(Id, 'CPI_'))"),
      select: z
        .string()
        .optional()
        .describe("OData $select comma-separated property names (e.g. Id,Name,Status)"),
      orderBy: z
        .string()
        .optional()
        .describe("OData $orderby expression (e.g. LogStart desc)"),
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
        .describe("OData $expand navigation property (e.g. IntegrationDesigntimeArtifacts)"),
      inlinecount: z
        .enum(["allpages", "none"])
        .optional()
        .describe("Include total count in OData inlinecount"),
      skiptoken: z
        .string()
        .optional()
        .describe("OData $skiptoken pagination cursor"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const query: Record<string, string | number | undefined> = {};

        if (args.filter) query["$filter"] = args.filter;
        if (args.select) query["$select"] = args.select;
        if (args.orderBy) query["$orderby"] = args.orderBy;
        if (args.top !== undefined) query["$top"] = args.top;
        if (args.skip !== undefined) query["$skip"] = args.skip;
        if (args.expand) query["$expand"] = args.expand;
        if (args.inlinecount) query["$inlinecount"] = args.inlinecount;
        if (args.skiptoken) query["$skiptoken"] = args.skiptoken;

        const res = await client.get(`/api/v1/${args.entity}`, query);
        return createMcpSuccessResult(res.data, res.hasMore);
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 2. Single Entity Retrieval
  server.tool(
    "sap_cpi_get_entity",
    "Retrieve a single specific SAP Cloud Integration entity by technical ID or key predicate.",
    {
      entity: z
        .enum(CpiQueryableEntities)
        .describe("The Cloud Integration entity type"),
      id: z
        .string()
        .describe("Entity technical ID (e.g. 'MyPackage') or composite predicate (e.g. \"Id='Flow1',Version='active'\")"),
      select: z
        .string()
        .optional()
        .describe("OData $select comma-separated property names"),
      expand: z
        .string()
        .optional()
        .describe("OData $expand navigation properties"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const query: Record<string, string | undefined> = {};
        if (args.select) query["$select"] = args.select;
        if (args.expand) query["$expand"] = args.expand;

        // Format OData v2 key segment: if id already contains parenthesis or equals, keep as predicate
        const keySegment = args.id.includes("(") || args.id.includes("=")
          ? args.id.startsWith("(") ? args.id : `(${args.id})`
          : `('${encodeURIComponent(args.id)}')`;

        const res = await client.get(`/api/v1/${args.entity}${keySegment}`, query);
        return createMcpSuccessResult(res.data);
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 3. Package Management
  server.tool(
    "sap_cpi_manage_package",
    "Inspect, create, update, or delete Integration Packages in SAP Cloud Integration.",
    {
      action: z
        .enum(["get", "create", "update", "delete", "list_artifacts"])
        .describe("Action to perform on the integration package"),
      packageId: z
        .string()
        .describe("Technical ID of the integration package (e.g. 'CPI_Order_Processing')"),
      name: z
        .string()
        .optional()
        .describe("Display Name (required for create)"),
      description: z
        .string()
        .optional()
        .describe("Package detailed description"),
      shortText: z
        .string()
        .optional()
        .describe("Short text summary"),
      version: z
        .string()
        .optional()
        .describe("Package version (defaults to '1.0.0')"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const pkgKey = `('${encodeURIComponent(args.packageId)}')`;

        switch (args.action) {
          case "get": {
            const res = await client.get(`/api/v1/IntegrationPackages${pkgKey}`);
            return createMcpSuccessResult(res.data);
          }
          case "list_artifacts": {
            const res = await client.get(
              `/api/v1/IntegrationPackages${pkgKey}/IntegrationDesigntimeArtifacts`,
            );
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "create": {
            const payload = {
              Id: args.packageId,
              Name: args.name || args.packageId,
              Description: args.description || "",
              ShortText: args.shortText || args.description || "",
              Version: args.version || "1.0.0",
            };
            const res = await client.post("/api/v1/IntegrationPackages", payload);
            return createMcpSuccessResult(res.data);
          }
          case "update": {
            const payload: Record<string, string> = {};
            if (args.name) payload["Name"] = args.name;
            if (args.description !== undefined) payload["Description"] = args.description;
            if (args.shortText !== undefined) payload["ShortText"] = args.shortText;
            if (args.version) payload["Version"] = args.version;

            const res = await client.put(`/api/v1/IntegrationPackages${pkgKey}`, payload);
            return createMcpSuccessResult(res.data || { success: true, updatedPackageId: args.packageId });
          }
          case "delete": {
            await client.delete(`/api/v1/IntegrationPackages${pkgKey}`);
            return createMcpSuccessResult({ success: true, deletedPackageId: args.packageId });
          }
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 4. Designtime Artifacts Management
  server.tool(
    "sap_cpi_manage_designtime_artifact",
    "Inspect, deploy, or view configurations of designtime integration artifacts (iFlows, value mappings, script collections).",
    {
      action: z
        .enum(["list", "get", "deploy", "configurations"])
        .describe("Operation to perform on the designtime artifact"),
      packageId: z
        .string()
        .optional()
        .describe("Package ID containing the artifact (optional for global queries)"),
      artifactId: z
        .string()
        .optional()
        .describe("Technical ID of the artifact (required for get, deploy, configurations)"),
      version: z
        .string()
        .optional()
        .default("active")
        .describe("Artifact version (defaults to 'active')"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.action === "list") {
          const path = args.packageId
            ? `/api/v1/IntegrationPackages('${encodeURIComponent(args.packageId)}')/IntegrationDesigntimeArtifacts`
            : "/api/v1/IntegrationDesigntimeArtifacts";
          const res = await client.get(path);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (!args.artifactId) {
          return createMcpErrorResult(new Error("artifactId is required for action: " + args.action));
        }

        const idParam = encodeURIComponent(args.artifactId);
        const verParam = encodeURIComponent(args.version || "active");
        const keySegment = `(Id='${idParam}',Version='${verParam}')`;

        switch (args.action) {
          case "get": {
            const res = await client.get(`/api/v1/IntegrationDesigntimeArtifacts${keySegment}`);
            return createMcpSuccessResult(res.data);
          }
          case "configurations": {
            const res = await client.get(
              `/api/v1/IntegrationDesigntimeArtifacts${keySegment}/Configurations`,
            );
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "deploy": {
            const res = await client.post(
              `/api/v1/DeployIntegrationDesigntimeArtifact?Id='${idParam}'&Version='${verParam}'`,
            );
            return createMcpSuccessResult(res.data || { success: true, deployedArtifactId: args.artifactId });
          }
          default:
            return createMcpErrorResult(new Error("Unsupported action: " + args.action));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 5. Runtime Artifacts (Worker Node Deployments)
  server.tool(
    "sap_cpi_manage_runtime_artifact",
    "Monitor deployed runtime artifacts (iFlows) on worker nodes, view status, inspect runtime error details, or undeploy.",
    {
      action: z
        .enum(["list", "get_status", "get_error_info", "undeploy"])
        .describe("Runtime artifact management action"),
      artifactId: z
        .string()
        .optional()
        .describe("Technical ID of the runtime artifact (required for get_status, get_error_info, undeploy)"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.action === "list") {
          const res = await client.get("/api/v1/IntegrationRuntimeArtifacts");
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (!args.artifactId) {
          return createMcpErrorResult(new Error("artifactId is required for action: " + args.action));
        }

        const artKey = `('${encodeURIComponent(args.artifactId)}')`;

        switch (args.action) {
          case "get_status": {
            const res = await client.get(`/api/v1/IntegrationRuntimeArtifacts${artKey}`);
            return createMcpSuccessResult(res.data);
          }
          case "get_error_info": {
            const res = await client.get(`/api/v1/IntegrationRuntimeArtifacts${artKey}/ErrorInformation`);
            return createMcpSuccessResult(res.data);
          }
          case "undeploy": {
            await client.delete(`/api/v1/IntegrationRuntimeArtifacts${artKey}`);
            return createMcpSuccessResult({ success: true, undeployedArtifactId: args.artifactId });
          }
          default:
            return createMcpErrorResult(new Error("Unsupported action: " + args.action));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 6. Message Processing Logs (Monitoring & Debugging)
  server.tool(
    "sap_cpi_get_message_processing_logs",
    "Query and inspect Message Processing Logs (MPL) to monitor message runs, diagnose failed messages, view error details, trace steps, and inspect attachments.",
    {
      detail: z
        .enum(["list", "summary", "error_info", "runs", "attachments", "custom_headers"])
        .default("list")
        .describe("Detail level to retrieve"),
      messageGuid: z
        .string()
        .optional()
        .describe("Message GUID (required for summary, error_info, runs, attachments, custom_headers)"),
      status: z
        .enum(["FAILED", "COMPLETED", "PROCESSING", "ESCALATED"])
        .optional()
        .describe("Filter logs by status"),
      integrationFlowName: z
        .string()
        .optional()
        .describe("Filter logs by specific Integration Flow name"),
      top: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .default(20)
        .describe("Max number of logs to return (1-50, defaults to 20)"),
      skip: z
        .number()
        .int()
        .min(0)
        .optional()
        .describe("Skip offset for pagination"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.detail === "list") {
          const filterParts: string[] = [];
          if (args.status) filterParts.push(`Status eq '${args.status}'`);
          if (args.integrationFlowName) filterParts.push(`IntegrationFlowName eq '${args.integrationFlowName}'`);

          const query: Record<string, string | number | undefined> = {
            $top: args.top,
            $orderby: "LogStart desc",
          };
          if (filterParts.length > 0) {
            query["$filter"] = filterParts.join(" and ");
          }
          if (args.skip !== undefined) {
            query["$skip"] = args.skip;
          }

          const res = await client.get("/api/v1/MessageProcessingLogs", query);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (!args.messageGuid) {
          return createMcpErrorResult(new Error("messageGuid is required when detail is: " + args.detail));
        }

        const guidKey = `('${encodeURIComponent(args.messageGuid)}')`;

        switch (args.detail) {
          case "summary": {
            const res = await client.get(`/api/v1/MessageProcessingLogs${guidKey}`);
            return createMcpSuccessResult(res.data);
          }
          case "error_info": {
            const res = await client.get(`/api/v1/MessageProcessingLogs${guidKey}/ErrorInformation`);
            return createMcpSuccessResult(res.data);
          }
          case "runs": {
            const res = await client.get(`/api/v1/MessageProcessingLogs${guidKey}/Runs?$expand=RunSteps`);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "attachments": {
            const res = await client.get(`/api/v1/MessageProcessingLogs${guidKey}/Attachments`);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "custom_headers": {
            const res = await client.get(`/api/v1/MessageProcessingLogs${guidKey}/CustomHeaderProperties`);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          default:
            return createMcpErrorResult(new Error("Unsupported detail option: " + args.detail));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 7. Data Store & Variables Management
  server.tool(
    "sap_cpi_manage_data_store",
    "Inspect and manage Data Stores, Data Store Entries, and runtime Variables stored in Cloud Integration.",
    {
      storeType: z
        .enum(["data_store", "variable"])
        .describe("Type of storage component"),
      action: z
        .enum(["list_stores", "list_entries", "get_entry", "delete_entry"])
        .describe("Operation to execute"),
      dataStoreName: z
        .string()
        .optional()
        .describe("Name of the Data Store (required for list_entries, get_entry, delete_entry when storeType is data_store)"),
      integrationFlow: z
        .string()
        .optional()
        .describe("Name of the associated Integration Flow (optional for variables or scoped entries)"),
      entryId: z
        .string()
        .optional()
        .describe("Entry ID (required for get_entry or delete_entry)"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.storeType === "variable") {
          if (args.action === "list_stores" || args.action === "list_entries") {
            const query: Record<string, string | undefined> = {};
            if (args.integrationFlow) {
              query["$filter"] = `IntegrationFlow eq '${args.integrationFlow}'`;
            }
            const res = await client.get("/api/v1/Variables", query);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          if (!args.entryId) {
            return createMcpErrorResult(new Error("entryId is required for variable: " + args.action));
          }
          const varKey = `('${encodeURIComponent(args.entryId)}')`;
          if (args.action === "get_entry") {
            const res = await client.get(`/api/v1/Variables${varKey}`);
            return createMcpSuccessResult(res.data);
          }
          if (args.action === "delete_entry") {
            await client.delete(`/api/v1/Variables${varKey}`);
            return createMcpSuccessResult({ success: true, deletedVariable: args.entryId });
          }
        }

        // data_store handling
        if (args.action === "list_stores") {
          const res = await client.get("/api/v1/DataStores");
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (args.action === "list_entries") {
          const query: Record<string, string | undefined> = {};
          if (args.dataStoreName) {
            query["$filter"] = `DataStoreName eq '${args.dataStoreName}'`;
          }
          const res = await client.get("/api/v1/DataStoreEntries", query);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (!args.dataStoreName || !args.entryId) {
          return createMcpErrorResult(
            new Error("dataStoreName and entryId are required for get_entry / delete_entry"),
          );
        }

        const entryKey = `(DataStoreName='${encodeURIComponent(args.dataStoreName)}',Id='${encodeURIComponent(args.entryId)}')`;

        if (args.action === "get_entry") {
          const res = await client.get(`/api/v1/DataStoreEntries${entryKey}`);
          return createMcpSuccessResult(res.data);
        }

        if (args.action === "delete_entry") {
          await client.delete(`/api/v1/DataStoreEntries${entryKey}`);
          return createMcpSuccessResult({
            success: true,
            deletedEntry: args.entryId,
            dataStore: args.dataStoreName,
          });
        }

        return createMcpErrorResult(new Error("Invalid store action: " + args.action));
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 8. Security Material Management
  server.tool(
    "sap_cpi_manage_security_material",
    "Query and inspect security material including Keystore Entries, Certificates, User Credentials, and Certificate-to-User Mappings.",
    {
      category: z
        .enum(["keystore", "user_credentials", "certificate_mappings"])
        .describe("Security material category"),
      action: z
        .enum(["list", "get"])
        .describe("Action to perform"),
      alias: z
        .string()
        .optional()
        .describe("Alias or Name of the Keystore entry, Credential, or Mapping (required for get)"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const endpointMap = {
          keystore: "KeystoreEntries",
          user_credentials: "UserCredentials",
          certificate_mappings: "CertificateUserMappings",
        };
        const endpoint = endpointMap[args.category];

        if (args.action === "list") {
          const res = await client.get(`/api/v1/${endpoint}`);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (!args.alias) {
          return createMcpErrorResult(new Error("alias is required for get action"));
        }

        const res = await client.get(`/api/v1/${endpoint}('${encodeURIComponent(args.alias)}')`);
        return createMcpSuccessResult(res.data);
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 9. Partner Directory Management
  server.tool(
    "sap_cpi_manage_partner_directory",
    "Manage the B2B Partner Directory: inspect Partners, Authorized Users, Parameters, and Alternative Partner identifiers.",
    {
      category: z
        .enum(["partners", "parameters", "authorized_users", "alternative_partners"])
        .describe("Partner directory component"),
      action: z
        .enum(["list", "get"])
        .describe("Action to perform"),
      pid: z
        .string()
        .optional()
        .describe("Partner ID (PID) — required for get or filtering"),
      id: z
        .string()
        .optional()
        .describe("Parameter ID, User Name, or Scheme"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const endpointMap = {
          partners: "Partners",
          parameters: "Parameters",
          authorized_users: "AuthorizedUsers",
          alternative_partners: "AlternativePartners",
        };
        const endpoint = endpointMap[args.category];

        if (args.action === "list") {
          const query: Record<string, string | undefined> = {};
          if (args.pid) query["$filter"] = `Pid eq '${args.pid}'`;
          const res = await client.get(`/api/v1/${endpoint}`, query);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (!args.pid) {
          return createMcpErrorResult(new Error("pid is required for get action"));
        }

        let keySegment = `('${encodeURIComponent(args.pid)}')`;
        if (args.id && args.category === "parameters") {
          keySegment = `(Pid='${encodeURIComponent(args.pid)}',Id='${encodeURIComponent(args.id)}')`;
        }

        const res = await client.get(`/api/v1/${endpoint}${keySegment}`);
        return createMcpSuccessResult(res.data);
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
  // 1. Integration Packages List
  server.resource(
    "cpi-packages",
    "sap://cpi/packages",
    async (uri) => {
      try {
        const client = getClient();
        const res = await client.get("/api/v1/IntegrationPackages?$top=50&$select=Id,Name,Version,ShortText");
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
              text: `Error loading packages: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 2. Deployed Runtime Artifacts List
  server.resource(
    "cpi-runtime-artifacts",
    "sap://cpi/runtime-artifacts",
    async (uri) => {
      try {
        const client = getClient();
        const res = await client.get("/api/v1/IntegrationRuntimeArtifacts?$top=50&$select=Id,Name,Version,Status");
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
              text: `Error loading runtime artifacts: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 3. Recent Failed Messages
  server.resource(
    "cpi-failed-messages",
    "sap://cpi/failed-messages",
    async (uri) => {
      try {
        const client = getClient();
        const res = await client.get("/api/v1/MessageProcessingLogs?$filter=Status eq 'FAILED'&$top=20&$orderby=LogStart desc");
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
              text: `Error loading failed messages: ${err instanceof Error ? err.message : String(err)}`,
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
  // 1. Troubleshoot Failed Messages Prompt
  server.prompt(
    "cpi-troubleshoot-failed-messages",
    "Analyzes recent failed message executions in SAP Cloud Integration and provides root-cause diagnosis.",
    {
      messageGuid: z
        .string()
        .optional()
        .describe("Specific Message GUID to investigate (optional; if omitted, checks recent failures)"),
    },
    (args) => {
      const guidance = args.messageGuid
        ? `Investigate failed message GUID: "${args.messageGuid}". Use 'sap_cpi_get_message_processing_logs' with detail: 'error_info' and 'runs' to analyze the failure stack trace and identify the failing step.`
        : `Check recent failed messages using 'sap_cpi_get_message_processing_logs' with status: 'FAILED' (or read resource 'sap://cpi/failed-messages'). Identify recurring error patterns and report them with affected iFlows.`;

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please diagnose message execution issues on SAP Cloud Integration.\n\nTask: ${guidance}`,
            },
          },
        ],
      };
    },
  );

  // 2. Audit Security Material Prompt
  server.prompt(
    "cpi-audit-security-artifacts",
    "Audits Keystore certificates, credentials, and user mappings in SAP Cloud Integration.",
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: "Perform an audit of SAP Cloud Integration security materials. Use 'sap_cpi_manage_security_material' to list KeystoreEntries, check certificate expiration dates, and list deployed UserCredentials.",
          },
        },
      ],
    }),
  );

  // 3. Inspect Integration Package Prompt
  server.prompt(
    "cpi-inspect-package",
    "Inspects an Integration Package, its designtime artifacts, and their runtime deployment status.",
    {
      packageId: z
        .string()
        .describe("The Technical ID of the Integration Package to inspect"),
    },
    (args) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please inspect the SAP Cloud Integration package "${args.packageId}".\n1. Use 'sap_cpi_manage_package' (action: 'get' and 'list_artifacts') to examine the package metadata and its contained integration flows.\n2. Cross-reference contained iFlows with 'sap_cpi_manage_runtime_artifact' to verify which artifacts are actively deployed and running on worker nodes.`,
          },
        },
      ],
    }),
  );
}

// ---------------------------------------------------------------------------
// Domain Module Export
// ---------------------------------------------------------------------------

const CloudIntegrationDomain: SAPDomainModule = {
  name: "Cloud Integration",
  domainKey: "cloud-integration",
  registerTools,
  registerResources,
  registerPrompts,
};

export default CloudIntegrationDomain;
