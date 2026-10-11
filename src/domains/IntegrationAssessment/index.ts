/**
 * src/domains/IntegrationAssessment/index.ts
 *
 * Integration Assessment (IA) Domain Module for SAP Integration Suite MCP Server.
 *
 * Implements semantic MCP tools, resources, and prompts for:
 *   - ISA-M Architecture Entities (Applications, Instances, Vendors, Technologies, Domains, Styles, Patterns)
 *   - Key Characteristics & Evaluation Criteria (Groups, Characteristics, Values, Recommendation Degrees)
 *   - Architecture Landscape & Flows (MessageFlows, IntegrationFlows)
 *   - Integration Assessment Requests & Decisions (Requests, Line Items, Decisions, CreateInterfaceRequest)
 *   - Tenant Content Management (ExportContent, ImportContent)
 *
 * Uses build-time extracted metadata from specs/IntegrationAssessment.
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

export function setIntegrationAssessmentClient(client: SapApiClient): void {
  activeClient = client;
}

function getClient(): SapApiClient {
  if (!activeClient) {
    const env = loadEnvConfig();
    activeClient = createDomainApiClient("integration-assessment", env);
  }
  return activeClient;
}

// ---------------------------------------------------------------------------
// Base Paths & Path Resolution
// ---------------------------------------------------------------------------

export const IA_PATHS = {
  ENTITIES: "/intas/entities/v1",
  MANAGEMENT: "/intas/management/v1",
} as const;

function resolveIaPath(endpoint: string, defaultBase: string = IA_PATHS.ENTITIES): string {
  if (
    endpoint.startsWith("http://") ||
    endpoint.startsWith("https://") ||
    endpoint.startsWith("/intas/")
  ) {
    return endpoint;
  }
  return `${defaultBase}/${endpoint.replace(/^\/+/, "")}`;
}

function formatEntityKey(id: string): string {
  if (id.startsWith("(") && id.endsWith(")")) {
    return id;
  }
  return `('${encodeURIComponent(id)}')`;
}

// ---------------------------------------------------------------------------
// Queryable Entities Enum (OData v2 / OpenAPI 3.0)
// ---------------------------------------------------------------------------

export const IaQueryableEntities = [
  "Application",
  "ApplicationInstance",
  "Vendor",
  "Technology",
  "TechnologyDomain",
  "TechnologyInstance",
  "TechnologyKeyCharacteristic",
  "TechnologyStyle",
  "Domain",
  "Style",
  "IntegrationPattern",
  "DeploymentModel",
  "DomainDetermination",
  "UseCasePattern",
  "KeyCharacteristicRecommendationDegree",
  "KeyCharacteristicGroup",
  "KeyCharacteristic",
  "KeyCharacteristicValue",
  "MessageFlow",
  "IntegrationFlow",
  "IntegrationFlowMessageFlow",
  "Request",
  "RequestLineItem",
  "RequestLineItemTechnologyInstanceDecision",
] as const;

export type IaQueryableEntity = (typeof IaQueryableEntities)[number];

// ---------------------------------------------------------------------------
// Tool Registration
// ---------------------------------------------------------------------------

export function registerTools(server: McpServer, clientOverride?: SapApiClient): void {
  if (clientOverride) {
    activeClient = clientOverride;
  }

  // 1. Semantic Query Tool
  server.tool(
    "sap_ia_query_entities",
    "Query SAP Integration Assessment OData collections (Applications, Technologies, IntegrationPatterns, Requests, MessageFlows, Characteristics) with filtering, selecting, ordering, expanding, and pagination.",
    {
      entity: z
        .enum(IaQueryableEntities)
        .describe("The Integration Assessment entity collection to query"),
      filter: z
        .string()
        .optional()
        .describe("OData $filter expression (e.g. Status eq 'COMPLETED' or Name eq 'S4HANA')"),
      select: z
        .string()
        .optional()
        .describe("OData $select comma-separated property names (e.g. Id,Name,Status)"),
      orderBy: z
        .string()
        .optional()
        .describe("OData $orderby expression (e.g. ModifiedAt desc)"),
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
        .describe("OData $expand navigation property (e.g. Vendor, ApplicationInstances, RequestLineItems)"),
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

        const path = resolveIaPath(args.entity, IA_PATHS.ENTITIES);
        const res = await client.get(path, query);
        return createMcpSuccessResult(res.data, res.hasMore);
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 2. Single Entity Retrieval & Navigation
  server.tool(
    "sap_ia_get_entity",
    "Retrieve a single specific SAP Integration Assessment entity by technical ID or key predicate, with optional navigation property traversal.",
    {
      entity: z
        .enum(IaQueryableEntities)
        .describe("The entity collection type"),
      id: z
        .string()
        .describe("Technical ID or key predicate of the entity (e.g. '1001' or '(Id=...)')"),
      navigationProperty: z
        .string()
        .optional()
        .describe("Optional navigation property to traverse (e.g. 'ApplicationInstances', 'Vendor', 'RequestLineItems', 'TechnologyStyles')"),
      select: z
        .string()
        .optional()
        .describe("OData $select comma-separated property names"),
      expand: z
        .string()
        .optional()
        .describe("OData $expand navigation property names"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const key = formatEntityKey(args.id);
        let path = resolveIaPath(`${args.entity}${key}`, IA_PATHS.ENTITIES);

        if (args.navigationProperty) {
          path += `/${args.navigationProperty.replace(/^\/+/, "")}`;
        }

        const query: Record<string, string | undefined> = {};
        if (args.select) query["$select"] = args.select;
        if (args.expand) query["$expand"] = args.expand;

        const res = await client.get(path, query);
        return createMcpSuccessResult(res.data, res.hasMore);
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 3. Application, Instance & Vendor Management
  server.tool(
    "sap_ia_manage_application",
    "Manage landscape business applications, application instances, and software vendors in SAP Integration Assessment.",
    {
      entityType: z
        .enum(["application", "application_instance", "vendor"])
        .describe("Entity type to manage"),
      action: z
        .enum(["create", "update", "delete"])
        .describe("Operation to execute"),
      id: z
        .string()
        .optional()
        .describe("Technical ID of the entity (required for update and delete)"),
      name: z
        .string()
        .optional()
        .describe("Name of the application, application instance, or vendor"),
      description: z
        .string()
        .optional()
        .describe("Description (for application instances)"),
      apiHubId: z
        .string()
        .optional()
        .describe("API Business Hub ID (for applications)"),
      vendorId: z
        .string()
        .optional()
        .describe("Associated Vendor ID reference (for applications)"),
      applicationId: z
        .string()
        .optional()
        .describe("Parent Application ID reference (for application instances)"),
      deploymentModelId: z
        .string()
        .optional()
        .describe("DeploymentModel ID reference (for application instances)"),
      payload: z
        .record(z.unknown())
        .optional()
        .describe("Custom JSON payload override for advanced properties"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const endpointMap = {
          application: "Application",
          application_instance: "ApplicationInstance",
          vendor: "Vendor",
        };
        const endpoint = endpointMap[args.entityType];

        if (args.action === "create") {
          let body: Record<string, unknown> = args.payload ? { ...args.payload } : {};
          if (args.name !== undefined) body["Name"] = args.name;

          if (args.entityType === "application") {
            if (args.apiHubId !== undefined) body["ApiHubId"] = args.apiHubId;
            if (args.vendorId !== undefined) body["Vendor"] = { Id: args.vendorId };
          } else if (args.entityType === "application_instance") {
            if (args.description !== undefined) body["Description"] = args.description;
            if (args.applicationId !== undefined) body["Application"] = { Id: args.applicationId };
            if (args.deploymentModelId !== undefined) body["DeploymentModel"] = { Id: args.deploymentModelId };
          }

          const path = resolveIaPath(endpoint, IA_PATHS.ENTITIES);
          const res = await client.post(path, body);
          return createMcpSuccessResult(res.data);
        }

        if (!args.id) {
          return createMcpErrorResult(new Error(`id is required for action: ${args.action}`));
        }

        const key = formatEntityKey(args.id);
        const path = resolveIaPath(`${endpoint}${key}`, IA_PATHS.ENTITIES);

        if (args.action === "update") {
          let body: Record<string, unknown> = args.payload ? { ...args.payload } : {};
          if (args.name !== undefined) body["Name"] = args.name;
          if (args.description !== undefined) body["Description"] = args.description;
          if (args.apiHubId !== undefined) body["ApiHubId"] = args.apiHubId;

          const res = await client.patch(path, body);
          return createMcpSuccessResult(res.data || { success: true, updatedId: args.id, entityType: args.entityType });
        }

        if (args.action === "delete") {
          await client.delete(path);
          return createMcpSuccessResult({ success: true, deletedId: args.id, entityType: args.entityType });
        }

        return createMcpErrorResult(new Error(`Unsupported application action: ${args.action}`));
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 4. Technology & Landscape Instance Management
  server.tool(
    "sap_ia_manage_technology",
    "Manage integration technologies, technology instances, and architectural links (domains, styles, key characteristics) in SAP Integration Assessment.",
    {
      entityType: z
        .enum([
          "technology",
          "technology_instance",
          "technology_domain",
          "technology_style",
          "technology_key_characteristic",
        ])
        .describe("Technology entity type to manage"),
      action: z
        .enum(["create", "update", "delete"])
        .describe("Operation to execute"),
      id: z
        .string()
        .optional()
        .describe("Technical ID of the entity (required for update and delete)"),
      name: z
        .string()
        .optional()
        .describe("Name of the technology or technology instance"),
      description: z
        .string()
        .optional()
        .describe("Description (for technology key characteristics)"),
      technologyId: z
        .string()
        .optional()
        .describe("Parent Technology ID reference"),
      vendorId: z
        .string()
        .optional()
        .describe("Vendor ID reference (for technologies)"),
      domainId: z
        .string()
        .optional()
        .describe("Domain ID reference (for technology domains)"),
      styleId: z
        .string()
        .optional()
        .describe("Style ID reference (for technology styles)"),
      deploymentModelId: z
        .string()
        .optional()
        .describe("DeploymentModel ID reference (for technology instances)"),
      keyCharacteristicValueId: z
        .string()
        .optional()
        .describe("KeyCharacteristicValue ID reference (for technology key characteristics)"),
      recommendationDegreeId: z
        .string()
        .optional()
        .describe("RecommendationDegree ID reference (for technology key characteristics)"),
      payload: z
        .record(z.unknown())
        .optional()
        .describe("Custom JSON payload override for advanced properties"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const endpointMap = {
          technology: "Technology",
          technology_instance: "TechnologyInstance",
          technology_domain: "TechnologyDomain",
          technology_style: "TechnologyStyle",
          technology_key_characteristic: "TechnologyKeyCharacteristic",
        };
        const endpoint = endpointMap[args.entityType];

        if (args.action === "create") {
          let body: Record<string, unknown> = args.payload ? { ...args.payload } : {};
          if (args.name !== undefined) body["Name"] = args.name;
          if (args.description !== undefined) body["Description"] = args.description;
          if (args.technologyId !== undefined) body["Technology"] = { Id: args.technologyId };
          if (args.vendorId !== undefined) body["Vendor"] = { Id: args.vendorId };
          if (args.domainId !== undefined) body["Domain"] = { Id: args.domainId };
          if (args.styleId !== undefined) body["Style"] = { Id: args.styleId };
          if (args.deploymentModelId !== undefined) body["DeploymentModel"] = { Id: args.deploymentModelId };
          if (args.keyCharacteristicValueId !== undefined) {
            body["KeyCharacteristicValue"] = { Id: args.keyCharacteristicValueId };
          }
          if (args.recommendationDegreeId !== undefined) {
            body["RecommendationDegree"] = { Id: args.recommendationDegreeId };
          }

          const path = resolveIaPath(endpoint, IA_PATHS.ENTITIES);
          const res = await client.post(path, body);
          return createMcpSuccessResult(res.data);
        }

        if (!args.id) {
          return createMcpErrorResult(new Error(`id is required for action: ${args.action}`));
        }

        const key = formatEntityKey(args.id);
        const path = resolveIaPath(`${endpoint}${key}`, IA_PATHS.ENTITIES);

        if (args.action === "update") {
          let body: Record<string, unknown> = args.payload ? { ...args.payload } : {};
          if (args.name !== undefined) body["Name"] = args.name;
          if (args.description !== undefined) body["Description"] = args.description;

          const res = await client.patch(path, body);
          return createMcpSuccessResult(res.data || { success: true, updatedId: args.id, entityType: args.entityType });
        }

        if (args.action === "delete") {
          await client.delete(path);
          return createMcpSuccessResult({ success: true, deletedId: args.id, entityType: args.entityType });
        }

        return createMcpErrorResult(new Error(`Unsupported technology action: ${args.action}`));
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 5. Assessment Request & Interface Request Management
  server.tool(
    "sap_ia_manage_request",
    "Manage Integration Assessment requests, line items, and create structured interface requests.",
    {
      action: z
        .enum([
          "create",
          "update",
          "patch",
          "delete",
          "create_interface_request",
          "delete_line_item",
        ])
        .describe("Assessment request action to perform"),
      requestId: z
        .string()
        .optional()
        .describe("Technical ID of the Request (required for update, patch, delete, create_interface_request)"),
      name: z
        .string()
        .optional()
        .describe("Name of the request or interface request"),
      status: z
        .string()
        .optional()
        .describe("Status of the request (e.g. 'IN_PROGRESS', 'COMPLETED')"),
      lineItemId: z
        .string()
        .optional()
        .describe("Technical ID of the RequestLineItem (required for delete_line_item)"),
      styleId: z
        .string()
        .optional()
        .describe("Associated Style ID (for create_interface_request)"),
      sourceApplicationInstanceIds: z
        .array(z.string())
        .optional()
        .describe("Source ApplicationInstance IDs (for create_interface_request)"),
      targetApplicationInstanceIds: z
        .array(z.string())
        .optional()
        .describe("Target ApplicationInstance IDs (for create_interface_request)"),
      payload: z
        .record(z.unknown())
        .optional()
        .describe("Custom JSON payload override for advanced request properties"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.action === "create") {
          let body: Record<string, unknown> = args.payload ? { ...args.payload } : {};
          if (args.name !== undefined) body["Name"] = args.name;
          if (args.status !== undefined) body["Status"] = args.status;

          const path = resolveIaPath("Request", IA_PATHS.ENTITIES);
          const res = await client.post(path, body);
          return createMcpSuccessResult(res.data);
        }

        if (args.action === "create_interface_request") {
          if (!args.name || !args.requestId) {
            return createMcpErrorResult(
              new Error("name and requestId are required for action: create_interface_request"),
            );
          }

          let body: Record<string, unknown> = args.payload ? { ...args.payload } : {};
          body["Name"] = args.name;
          body["RequestId"] = args.requestId;
          if (args.styleId !== undefined) body["StyleId"] = args.styleId;
          if (args.sourceApplicationInstanceIds) {
            body["SourceApplicationInstances"] = args.sourceApplicationInstanceIds.map((id) => ({ Id: id }));
          }
          if (args.targetApplicationInstanceIds) {
            body["TargetApplicationInstances"] = args.targetApplicationInstanceIds.map((id) => ({ Id: id }));
          }

          const path = resolveIaPath("CreateInterfaceRequest", IA_PATHS.ENTITIES);
          const res = await client.post(path, body);
          return createMcpSuccessResult(res.data || { success: true, interfaceRequest: args.name });
        }

        if (args.action === "delete_line_item") {
          if (!args.lineItemId) {
            return createMcpErrorResult(new Error("lineItemId is required for delete_line_item"));
          }
          const key = formatEntityKey(args.lineItemId);
          const path = resolveIaPath(`RequestLineItem${key}`, IA_PATHS.ENTITIES);
          await client.delete(path);
          return createMcpSuccessResult({ success: true, deletedLineItemId: args.lineItemId });
        }

        if (!args.requestId) {
          return createMcpErrorResult(new Error(`requestId is required for action: ${args.action}`));
        }

        const key = formatEntityKey(args.requestId);
        const path = resolveIaPath(`Request${key}`, IA_PATHS.ENTITIES);

        if (args.action === "update" || args.action === "patch") {
          let body: Record<string, unknown> = args.payload ? { ...args.payload } : {};
          if (args.name !== undefined) body["Name"] = args.name;
          if (args.status !== undefined) body["Status"] = args.status;

          const res = await client.patch(path, body);
          return createMcpSuccessResult(res.data || { success: true, updatedRequestId: args.requestId });
        }

        if (args.action === "delete") {
          await client.delete(path);
          return createMcpSuccessResult({ success: true, deletedRequestId: args.requestId });
        }

        return createMcpErrorResult(new Error(`Unsupported request action: ${args.action}`));
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 6. Key Characteristic & Evaluation Criteria Management
  server.tool(
    "sap_ia_manage_characteristic",
    "Manage ISA-M evaluation criteria including Key Characteristic Groups, Key Characteristics, and Characteristic Values.",
    {
      entityType: z
        .enum(["group", "characteristic", "value"])
        .describe("Evaluation criteria entity type to manage"),
      action: z
        .enum(["create", "update", "delete"])
        .describe("Operation to execute"),
      id: z
        .string()
        .optional()
        .describe("Technical ID of the item (required for update and delete)"),
      name: z
        .string()
        .optional()
        .describe("Name of the characteristic group, characteristic, or value"),
      description: z
        .string()
        .optional()
        .describe("Description"),
      isSingle: z
        .boolean()
        .optional()
        .describe("Whether characteristic only allows a single value selection (for characteristics)"),
      groupId: z
        .string()
        .optional()
        .describe("Parent KeyCharacteristicGroup ID reference (for characteristics)"),
      characteristicId: z
        .string()
        .optional()
        .describe("Parent KeyCharacteristic ID reference (for characteristic values)"),
      payload: z
        .record(z.unknown())
        .optional()
        .describe("Custom JSON payload override for advanced properties"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const endpointMap = {
          group: "KeyCharacteristicGroup",
          characteristic: "KeyCharacteristic",
          value: "KeyCharacteristicValue",
        };
        const endpoint = endpointMap[args.entityType];

        if (args.action === "create") {
          let body: Record<string, unknown> = args.payload ? { ...args.payload } : {};
          if (args.name !== undefined) body["Name"] = args.name;
          if (args.description !== undefined) body["Description"] = args.description;
          if (args.isSingle !== undefined) body["IsSingle"] = args.isSingle;
          if (args.groupId !== undefined) body["KeyCharacteristicGroup"] = { Id: args.groupId };
          if (args.characteristicId !== undefined) {
            body["KeyCharacteristic"] = { Id: args.characteristicId };
          }

          const path = resolveIaPath(endpoint, IA_PATHS.ENTITIES);
          const res = await client.post(path, body);
          return createMcpSuccessResult(res.data);
        }

        if (!args.id) {
          return createMcpErrorResult(new Error(`id is required for action: ${args.action}`));
        }

        const key = formatEntityKey(args.id);
        const path = resolveIaPath(`${endpoint}${key}`, IA_PATHS.ENTITIES);

        if (args.action === "update") {
          let body: Record<string, unknown> = args.payload ? { ...args.payload } : {};
          if (args.name !== undefined) body["Name"] = args.name;
          if (args.description !== undefined) body["Description"] = args.description;
          if (args.isSingle !== undefined) body["IsSingle"] = args.isSingle;

          const res = await client.patch(path, body);
          return createMcpSuccessResult(res.data || { success: true, updatedId: args.id, entityType: args.entityType });
        }

        if (args.action === "delete") {
          await client.delete(path);
          return createMcpSuccessResult({ success: true, deletedId: args.id, entityType: args.entityType });
        }

        return createMcpErrorResult(new Error(`Unsupported characteristic action: ${args.action}`));
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 7. Tenant Content Management (Export / Import)
  server.tool(
    "sap_ia_manage_content",
    "Export complete system content (entities & configurations) or import content packages into the Integration Assessment system.",
    {
      action: z
        .enum(["export", "import"])
        .describe("Content management action: export complete content or import content package"),
      contentZipBase64: z
        .string()
        .optional()
        .describe("Base64-encoded ZIP file string (required for import)"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.action === "export") {
          const path = resolveIaPath("ExportContent", IA_PATHS.MANAGEMENT);
          const res = await client.get(path, undefined, {
            Accept: "application/zip, application/json, */*",
          });
          return createMcpSuccessResult(
            typeof res.data === "string" ? { exportedContent: res.data } : res.data,
          );
        }

        if (args.action === "import") {
          if (!args.contentZipBase64) {
            return createMcpErrorResult(new Error("contentZipBase64 is required for action: import"));
          }

          const path = resolveIaPath("ImportContent", IA_PATHS.MANAGEMENT);
          const zipBuffer = Buffer.from(args.contentZipBase64, "base64");
          const res = await client.post(path, zipBuffer, undefined, {
            "Content-Type": "application/zip",
          });
          return createMcpSuccessResult(res.data || { success: true, imported: true });
        }

        return createMcpErrorResult(new Error(`Unsupported content action: ${args.action}`));
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
  // 1. Applications Catalog Resource
  server.resource(
    "ia-applications",
    "sap://ia/applications",
    async (uri) => {
      try {
        const client = getClient();
        const path = resolveIaPath("Application", IA_PATHS.ENTITIES);
        const res = await client.get(`${path}?$top=50&$expand=Vendor`);
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
              text: `Error loading IA applications: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 2. Integration Technologies Resource
  server.resource(
    "ia-technologies",
    "sap://ia/technologies",
    async (uri) => {
      try {
        const client = getClient();
        const path = resolveIaPath("Technology", IA_PATHS.ENTITIES);
        const res = await client.get(`${path}?$top=50&$expand=TechnologyStyles,TechnologyDomains`);
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
              text: `Error loading IA technologies: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 3. Active Assessment Requests Resource
  server.resource(
    "ia-requests",
    "sap://ia/requests",
    async (uri) => {
      try {
        const client = getClient();
        const path = resolveIaPath("Request", IA_PATHS.ENTITIES);
        const res = await client.get(`${path}?$top=20&$expand=RequestLineItems`);
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
              text: `Error loading IA requests: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 4. Architecture Patterns Resource
  server.resource(
    "ia-patterns",
    "sap://ia/patterns",
    async (uri) => {
      try {
        const client = getClient();
        const path = resolveIaPath("IntegrationPattern", IA_PATHS.ENTITIES);
        const res = await client.get(`${path}?$top=50&$expand=Domain,Style`);
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
              text: `Error loading IA integration patterns: ${err instanceof Error ? err.message : String(err)}`,
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
  // 1. Assess Interface Request Prompt
  server.prompt(
    "ia-assess-interface-request",
    "Guides the architect in evaluating an interface request against ISA-M policies and identifying recommended integration technologies.",
    {
      name: z
        .string()
        .describe("Name or business title of the interface request"),
      sourceApplication: z
        .string()
        .describe("Source application name or ID"),
      targetApplication: z
        .string()
        .describe("Target application name or ID"),
      style: z
        .string()
        .optional()
        .describe("Integration style (e.g. 'Process', 'Data', 'Event', 'Analytics')"),
    },
    (args) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please assess the integration requirement for interface "${args.name}":
1. Source Application: ${args.sourceApplication}
2. Target Application: ${args.targetApplication}
3. Preferred Style: ${args.style || "To be determined"}

Steps:
1. Use 'sap_ia_query_entities' with entity 'ApplicationInstance' and 'DomainDetermination' to determine the architectural domain (e.g. Cloud2Cloud, OnPremise2Cloud).
2. Use 'sap_ia_query_entities' with entity 'IntegrationPattern' to find matching patterns for domain and style.
3. Use 'sap_ia_query_entities' with entity 'Technology' to review available integration technologies in the landscape.
4. When ready, use 'sap_ia_manage_request' (action: 'create_interface_request') to formalize the decision.`,
          },
        },
      ],
    }),
  );

  // 2. Audit Technologies Prompt
  server.prompt(
    "ia-audit-technologies",
    "Performs an architecture audit of all registered integration technologies, active instances, and mapped key characteristics.",
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Audit the integration technologies registered in SAP Integration Assessment:
1. Read resource 'sap://ia/technologies' (or tool 'sap_ia_query_entities' entity 'Technology') to inspect registered technologies.
2. Cross-reference with 'TechnologyInstance' to identify active deployment instances across cloud and on-premise.
3. Review 'TechnologyKeyCharacteristic' entries to verify recommendation scoring and degree consistency.`,
          },
        },
      ],
    }),
  );

  // 3. Review Landscape Message Flows Prompt
  server.prompt(
    "ia-review-landscape-message-flows",
    "Analyzes landscape message flows and integration flows between applications to ensure ISA-M architectural governance compliance.",
    {
      domain: z
        .string()
        .optional()
        .describe("Optional Domain name or ID filter (e.g. 'A2A', 'B2B')"),
    },
    (args) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Review the active landscape message flows in SAP Integration Assessment:
1. Use 'sap_ia_query_entities' with entity 'MessageFlow'${args.domain ? ` filtering by Domain eq '${args.domain}'` : ""} to list configured communications.
2. Inspect related 'SourceApplicationInstance' and 'TargetApplicationInstance' entities.
3. Review associated 'IntegrationFlow' groupings and verify alignment with ISA-M governance principles.`,
          },
        },
      ],
    }),
  );
}

// ---------------------------------------------------------------------------
// Domain Module Export
// ---------------------------------------------------------------------------

const IntegrationAssessmentDomain: SAPDomainModule = {
  name: "Integration Assessment",
  domainKey: "integration-assessment",
  registerTools,
  registerResources,
  registerPrompts,
};

export default IntegrationAssessmentDomain;
