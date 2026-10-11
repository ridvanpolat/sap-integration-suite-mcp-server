/**
 * src/domains/APIManagement/index.ts
 *
 * API Management (APIM) Domain Module for SAP Integration Suite MCP Server.
 *
 * Implements semantic MCP tools, resources, and prompts for:
 *   - API Proxies (Proxy inspection, endpoint mappings, policies, create/delete)
 *   - API Products (Catalog management, bundle proxies, quota & access scopes)
 *   - API Providers (Backend connection destinations, hosts, SSL configuration)
 *   - Key-Value Maps (KVM secure configuration store, entry values)
 *   - Developer Applications (App keys, credentials, subscriptions)
 *   - Analytics & Metrics (Traffic volumes, error rates, latency analysis)
 *   - Certificate Stores (Keystores, truststores, certificates)
 *
 * Uses build-time extracted metadata from specs/APIManagement.
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

export function setApiManagementClient(client: SapApiClient): void {
  activeClient = client;
}

function getClient(): SapApiClient {
  if (!activeClient) {
    const env = loadEnvConfig();
    activeClient = createDomainApiClient("api-management", env);
  }
  return activeClient;
}

// ---------------------------------------------------------------------------
// Base Paths & Path Resolution
// ---------------------------------------------------------------------------

export const APIM_PATHS = {
  MGMT: "/apiportal/api/1.0/Management.svc",
  DEV_PORTAL: "/odata/1.0/data.svc",
  ANALYTICS: "/apiportal/analytics/api/1.0/AnalyticsService",
} as const;

function resolvePath(endpoint: string, basePath: string = APIM_PATHS.MGMT): string {
  if (
    endpoint.startsWith("http://") ||
    endpoint.startsWith("https://") ||
    endpoint.startsWith("/apiportal/") ||
    endpoint.startsWith("/sapapimanagement/") ||
    endpoint.startsWith("/odata/")
  ) {
    return endpoint;
  }
  return `${basePath}/${endpoint.replace(/^\/+/, "")}`;
}

// ---------------------------------------------------------------------------
// Queryable Entities Enum
// ---------------------------------------------------------------------------

export const ApimQueryableEntities = [
  "APIProxies",
  "APIProducts",
  "APIProviders",
  "Applications",
  "Developers",
  "KeyMapEntries",
  "CertificateStores",
  "VirtualHosts",
  "Subscriptions",
  "RatePlans",
] as const;

export type ApimQueryableEntity = (typeof ApimQueryableEntities)[number];

// ---------------------------------------------------------------------------
// Tool Registration
// ---------------------------------------------------------------------------

export function registerTools(server: McpServer, clientOverride?: SapApiClient): void {
  if (clientOverride) {
    activeClient = clientOverride;
  }

  // 1. Semantic Query Tool
  server.tool(
    "sap_apim_query_entities",
    "Query SAP API Management OData collections (APIProxies, APIProducts, APIProviders, Applications, Developers, KeyMapEntries, CertificateStores) with filtering, selecting, ordering, and expanding.",
    {
      entity: z
        .enum(ApimQueryableEntities)
        .describe("The API Management entity collection to query"),
      filter: z
        .string()
        .optional()
        .describe("OData $filter expression (e.g. life_cycle eq 'published' or status_code eq 'active')"),
      select: z
        .string()
        .optional()
        .describe("OData $select comma-separated property names (e.g. name,title,life_cycle)"),
      orderBy: z
        .string()
        .optional()
        .describe("OData $orderby expression (e.g. name asc or published_at desc)"),
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
        .describe("OData $expand navigation property (e.g. proxyEndPoints, apiProxies, keyMapEntryValues)"),
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

        const basePath =
          args.entity === "Subscriptions" || args.entity === "RatePlans"
            ? APIM_PATHS.DEV_PORTAL
            : APIM_PATHS.MGMT;

        const path = resolvePath(args.entity, basePath);
        const res = await client.get(path, query);
        return createMcpSuccessResult(res.data, res.hasMore);
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 2. API Proxy Management
  server.tool(
    "sap_apim_manage_proxy",
    "Inspect, configure, list policies, or delete API Proxies in SAP API Management.",
    {
      action: z
        .enum(["get", "list_endpoints", "list_policies", "create", "delete"])
        .describe("Action to perform on the API Proxy"),
      name: z
        .string()
        .describe("Technical name of the API Proxy (e.g. 'Customer_API_v1')"),
      title: z
        .string()
        .optional()
        .describe("Display title for creation"),
      description: z
        .string()
        .optional()
        .describe("Detailed description of the API proxy"),
      apiProvider: z
        .string()
        .optional()
        .describe("Associated backend API Provider name"),
      basePath: z
        .string()
        .optional()
        .describe("Virtual host entry base path (e.g. '/customer/v1')"),
      targetUrl: z
        .string()
        .optional()
        .describe("Target backend URL for the proxy"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const proxyKey = `('${encodeURIComponent(args.name)}')`;

        switch (args.action) {
          case "get": {
            const path = resolvePath(`APIProxies${proxyKey}`);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data);
          }
          case "list_endpoints": {
            const path = resolvePath(`APIProxies${proxyKey}/proxyEndPoints`);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "list_policies": {
            const path = resolvePath(`APIProxies${proxyKey}/policies`);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "create": {
            const payload = {
              name: args.name,
              title: args.title || args.name,
              description: args.description || "",
              service_code: "REST",
              proxyEndPoints: args.basePath
                ? [
                    {
                      name: "default",
                      base_path: args.basePath,
                    },
                  ]
                : undefined,
              targetEndPoints: args.targetUrl
                ? [
                    {
                      name: "default",
                      url: args.targetUrl,
                    },
                  ]
                : undefined,
            };
            const path = resolvePath("APIProxies");
            const res = await client.post(path, payload);
            return createMcpSuccessResult(res.data);
          }
          case "delete": {
            const path = resolvePath(`APIProxies${proxyKey}`);
            await client.delete(path);
            return createMcpSuccessResult({ success: true, deletedProxy: args.name });
          }
          default:
            return createMcpErrorResult(new Error("Unsupported proxy action: " + args.action));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 3. API Product Management
  server.tool(
    "sap_apim_manage_product",
    "Inspect, bundle proxies, set rate limits and quotas, publish, or delete API Products in SAP API Management.",
    {
      action: z
        .enum(["get", "list_proxies", "create", "delete", "publish"])
        .describe("Action to perform on the API Product"),
      name: z
        .string()
        .describe("Technical name of the API Product (e.g. 'Orders_Enterprise_Product')"),
      title: z
        .string()
        .optional()
        .describe("Display title for the API Product"),
      description: z
        .string()
        .optional()
        .describe("Product description"),
      quotaCount: z
        .number()
        .int()
        .optional()
        .describe("Allowed requests per quota interval (e.g. 1000)"),
      quotaInterval: z
        .number()
        .int()
        .optional()
        .default(1)
        .describe("Quota interval (e.g. 1)"),
      quotaTimeUnit: z
        .enum(["minute", "hour", "day", "month"])
        .optional()
        .default("month")
        .describe("Quota time unit"),
      scope: z
        .enum(["public", "internal", "restricted"])
        .optional()
        .default("public")
        .describe("Access scope"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const prodKey = `('${encodeURIComponent(args.name)}')`;

        switch (args.action) {
          case "get": {
            const path = resolvePath(`APIProducts${prodKey}`);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data);
          }
          case "list_proxies": {
            const path = resolvePath(`APIProducts${prodKey}/apiProxies`);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "create": {
            const payload = {
              name: args.name,
              title: args.title || args.name,
              description: args.description || "",
              quotaCount: args.quotaCount || 1000,
              quotaInterval: args.quotaInterval || 1,
              quotaTimeUnit: args.quotaTimeUnit || "month",
              scope: args.scope || "public",
              isPublished: false,
            };
            const path = resolvePath("APIProducts");
            const res = await client.post(path, payload);
            return createMcpSuccessResult(res.data);
          }
          case "publish": {
            const path = resolvePath(`APIProducts${prodKey}`);
            const res = await client.put(path, { isPublished: true, life_cycle: "published" });
            return createMcpSuccessResult(res.data || { success: true, publishedProduct: args.name });
          }
          case "delete": {
            const path = resolvePath(`APIProducts${prodKey}`);
            await client.delete(path);
            return createMcpSuccessResult({ success: true, deletedProduct: args.name });
          }
          default:
            return createMcpErrorResult(new Error("Unsupported product action: " + args.action));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 4. API Provider Management
  server.tool(
    "sap_apim_manage_provider",
    "Inspect, configure, update, or delete backend API Providers (connectivity destinations) in SAP API Management.",
    {
      action: z
        .enum(["get", "create", "update", "delete"])
        .describe("Action to perform on the API Provider"),
      name: z
        .string()
        .describe("Technical name of the API Provider (e.g. 'S4HANA_Cloud_Backend')"),
      host: z
        .string()
        .optional()
        .describe("Backend host address (e.g. 'my-s4hana.s4hana.ondemand.com')"),
      port: z
        .number()
        .int()
        .optional()
        .default(443)
        .describe("Backend port (defaults to 443)"),
      pathPrefix: z
        .string()
        .optional()
        .describe("Base URL path prefix (e.g. '/sap/opu/odata/sap')"),
      authType: z
        .enum(["None", "Basic", "OAuth2", "ClientCertificate"])
        .optional()
        .default("Basic")
        .describe("Authentication type"),
      useSSL: z
        .boolean()
        .optional()
        .default(true)
        .describe("Whether to enforce SSL/TLS encryption"),
      description: z
        .string()
        .optional()
        .describe("Description of the API provider destination"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const provKey = `('${encodeURIComponent(args.name)}')`;

        switch (args.action) {
          case "get": {
            const path = resolvePath(`APIProviders${provKey}`);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data);
          }
          case "create": {
            const payload = {
              name: args.name,
              title: args.name,
              description: args.description || "",
              host: args.host || "",
              port: args.port || 443,
              pathPrefix: args.pathPrefix || "",
              authType: args.authType || "Basic",
              useSSL: args.useSSL !== false,
            };
            const path = resolvePath("APIProviders");
            const res = await client.post(path, payload);
            return createMcpSuccessResult(res.data);
          }
          case "update": {
            const payload: Record<string, unknown> = {};
            if (args.host) payload["host"] = args.host;
            if (args.port) payload["port"] = args.port;
            if (args.pathPrefix !== undefined) payload["pathPrefix"] = args.pathPrefix;
            if (args.authType) payload["authType"] = args.authType;
            if (args.description !== undefined) payload["description"] = args.description;

            const path = resolvePath(`APIProviders${provKey}`);
            const res = await client.put(path, payload);
            return createMcpSuccessResult(res.data || { success: true, updatedProvider: args.name });
          }
          case "delete": {
            const path = resolvePath(`APIProviders${provKey}`);
            await client.delete(path);
            return createMcpSuccessResult({ success: true, deletedProvider: args.name });
          }
          default:
            return createMcpErrorResult(new Error("Unsupported provider action: " + args.action));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 5. Key-Value Maps (KVM) Management
  server.tool(
    "sap_apim_manage_key_value_map",
    "Inspect, read values, or create entries in Key-Value Maps (KVM) for environment configurations and secrets in SAP API Management.",
    {
      action: z
        .enum(["list_entries", "get_entry", "create_entry", "delete_entry"])
        .describe("Action to perform on Key-Value Map"),
      mapName: z
        .string()
        .describe("Name of the Key-Value Map (e.g. 'PaymentGateway_Config')"),
      keyName: z
        .string()
        .optional()
        .describe("Specific key name within the map (required for get_entry, create_entry, delete_entry)"),
      value: z
        .string()
        .optional()
        .describe("Value to store for the key (required for create_entry)"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const mapKey = `('${encodeURIComponent(args.mapName)}')`;

        switch (args.action) {
          case "list_entries": {
            const path = resolvePath(`KeyMapEntries${mapKey}/keyMapEntryValues`);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "get_entry": {
            if (!args.keyName) {
              return createMcpErrorResult(new Error("keyName is required for get_entry"));
            }
            const valKey = `(map_name='${encodeURIComponent(args.mapName)}',name='${encodeURIComponent(args.keyName)}')`;
            const path = resolvePath(`KeyMapEntryValues${valKey}`);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data);
          }
          case "create_entry": {
            if (!args.keyName || args.value === undefined) {
              return createMcpErrorResult(new Error("keyName and value are required for create_entry"));
            }
            const payload = {
              map_name: args.mapName,
              name: args.keyName,
              value: args.value,
            };
            const path = resolvePath(`KeyMapEntries${mapKey}/keyMapEntryValues`);
            const res = await client.post(path, payload);
            return createMcpSuccessResult(res.data);
          }
          case "delete_entry": {
            if (!args.keyName) {
              return createMcpErrorResult(new Error("keyName is required for delete_entry"));
            }
            const valKey = `(map_name='${encodeURIComponent(args.mapName)}',name='${encodeURIComponent(args.keyName)}')`;
            const path = resolvePath(`KeyMapEntryValues${valKey}`);
            await client.delete(path);
            return createMcpSuccessResult({
              success: true,
              deletedKey: args.keyName,
              mapName: args.mapName,
            });
          }
          default:
            return createMcpErrorResult(new Error("Unsupported KVM action: " + args.action));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 6. Developer Application Management
  server.tool(
    "sap_apim_manage_application",
    "Inspect registered developer applications, retrieve API keys/credentials, and list subscribed products in SAP API Management.",
    {
      action: z
        .enum(["get", "list_products", "get_api_key"])
        .describe("Action to perform on the Application"),
      appName: z
        .string()
        .describe("Technical Name or ID of the Application (e.g. 'Portal_Web_App')"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const appKey = `('${encodeURIComponent(args.appName)}')`;

        switch (args.action) {
          case "get": {
            const path = resolvePath(`Applications${appKey}`);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data);
          }
          case "list_products": {
            const path = resolvePath(`Applications${appKey}/apiProducts`);
            const res = await client.get(path);
            return createMcpSuccessResult(res.data, res.hasMore);
          }
          case "get_api_key": {
            const path = resolvePath(`Applications${appKey}`);
            const res = await client.get(path, { $select: "id,title,app_key,status_code,valid_to" });
            return createMcpSuccessResult(res.data);
          }
          default:
            return createMcpErrorResult(new Error("Unsupported application action: " + args.action));
        }
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 7. Analytics & Performance
  server.tool(
    "sap_apim_get_analytics",
    "Retrieve API traffic analytics, call volume metrics, error rates, and response latency from SAP API Management.",
    {
      metric: z
        .enum(["traffic_summary", "error_rates", "latency_analysis", "proxy_performance"])
        .describe("Type of analytics metric report to retrieve"),
      apiProxy: z
        .string()
        .optional()
        .describe("Filter analytics by specific API Proxy name"),
      top: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .default(20)
        .describe("Max number of analytic records to return"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();
        const query: Record<string, string | number | undefined> = {
          $top: args.top || 20,
        };

        if (args.apiProxy) {
          query["$filter"] = `ApiProxy eq '${args.apiProxy}'`;
        }

        switch (args.metric) {
          case "traffic_summary":
            query["$select"] = "ApiProxy,ResponseCode,CallCount,Year,Month,Day,Hour";
            break;
          case "error_rates":
            query["$select"] = "ApiProxy,ResponseCode,Errors,PolicyError,TargetError,CallCount";
            query["$filter"] = (query["$filter"] ? `${query["$filter"]} and ` : "") + "ResponseCode ge 400";
            break;
          case "latency_analysis":
            query["$select"] = "ApiProxy,ResponseTime,TargetResponseTime,PolicyResponseTime,CallCount";
            break;
          case "proxy_performance":
            query["$select"] = "ApiProxy,ResponseTime,ResponseCode,CallCount,CacheHit";
            break;
        }

        const path = resolvePath("Results", APIM_PATHS.ANALYTICS);
        const res = await client.get(path, query);
        return createMcpSuccessResult(res.data, res.hasMore);
      } catch (err) {
        return createMcpErrorResult(err);
      }
    },
  );

  // 8. Certificate Stores Management
  server.tool(
    "sap_apim_manage_certificate_store",
    "Inspect Keystores, Truststores, and Certificates in SAP API Management.",
    {
      action: z
        .enum(["list_stores", "get_store", "list_certificates"])
        .describe("Action to perform on Certificate Stores"),
      storeName: z
        .string()
        .optional()
        .describe("Name of the Certificate Store (required for get_store and list_certificates)"),
      storeType: z
        .enum(["KeyStore", "TrustStore"])
        .optional()
        .describe("Filter stores by type (KeyStore or TrustStore)"),
    },
    async (args): Promise<McpToolResult> => {
      try {
        const client = getClient();

        if (args.action === "list_stores") {
          const query: Record<string, string | undefined> = {};
          if (args.storeType) {
            query["$filter"] = `storeType eq '${args.storeType}'`;
          }
          const path = resolvePath("CertificateStores");
          const res = await client.get(path, query);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        if (!args.storeName) {
          return createMcpErrorResult(new Error("storeName is required for action: " + args.action));
        }

        const storeKey = `('${encodeURIComponent(args.storeName)}')`;

        if (args.action === "get_store") {
          const path = resolvePath(`CertificateStores${storeKey}`);
          const res = await client.get(path);
          return createMcpSuccessResult(res.data);
        }

        if (args.action === "list_certificates") {
          const path = resolvePath(`CertificateStores${storeKey}/certificates`);
          const res = await client.get(path);
          return createMcpSuccessResult(res.data, res.hasMore);
        }

        return createMcpErrorResult(new Error("Unsupported store action: " + args.action));
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
  // 1. API Proxies List
  server.resource(
    "apim-proxies",
    "sap://apim/proxies",
    async (uri) => {
      try {
        const client = getClient();
        const path = resolvePath("APIProxies");
        const res = await client.get(path, { $top: 50, $select: "name,title,life_cycle,service_code" });
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
              text: `Error loading API proxies: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 2. API Products List
  server.resource(
    "apim-products",
    "sap://apim/products",
    async (uri) => {
      try {
        const client = getClient();
        const path = resolvePath("APIProducts");
        const res = await client.get(path, { $top: 50, $select: "name,title,isPublished,scope,quotaCount" });
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
              text: `Error loading API products: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
        };
      }
    },
  );

  // 3. API Providers List
  server.resource(
    "apim-providers",
    "sap://apim/providers",
    async (uri) => {
      try {
        const client = getClient();
        const path = resolvePath("APIProviders");
        const res = await client.get(path, { $top: 50, $select: "name,title,host,port,authType,useSSL" });
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
              text: `Error loading API providers: ${err instanceof Error ? err.message : String(err)}`,
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
  // 1. Troubleshoot Proxy Prompt
  server.prompt(
    "apim-troubleshoot-proxy",
    "Investigates errors, latency bottlenecks, and policy failures on an API Proxy.",
    {
      proxyName: z
        .string()
        .describe("The name of the API Proxy to troubleshoot"),
    },
    (args) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please diagnose issues with API Proxy "${args.proxyName}":\n1. Use 'sap_apim_manage_proxy' (action: 'get' and 'list_policies') to inspect configured policies and routing rules.\n2. Query 'sap_apim_get_analytics' (metric: 'error_rates', apiProxy: '${args.proxyName}') to analyze HTTP error codes and failing policy steps.`,
          },
        },
      ],
    }),
  );

  // 2. Audit API Products Prompt
  server.prompt(
    "apim-audit-api-products",
    "Audits API Products, publication status, quota limits, and associated API Proxies.",
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: "Perform an audit of SAP API Management Products. Check which products are published, verify rate limits and quotas, and inspect associated API proxies using 'sap_apim_manage_product'.",
          },
        },
      ],
    }),
  );

  // 3. Inspect Provider Connectivity Prompt
  server.prompt(
    "apim-inspect-provider",
    "Inspects backend API Provider destinations, host parameters, and SSL connection security.",
    {
      providerName: z
        .string()
        .describe("The name of the backend API Provider destination to inspect"),
    },
    (args) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Inspect the backend API Provider destination "${args.providerName}" using 'sap_apim_manage_provider'. Verify host, port, authentication type, and SSL settings.`,
          },
        },
      ],
    }),
  );
}

// ---------------------------------------------------------------------------
// Domain Module Export
// ---------------------------------------------------------------------------

const APIManagementDomain: SAPDomainModule = {
  name: "API Management",
  domainKey: "api-management",
  registerTools,
  registerResources,
  registerPrompts,
};

export default APIManagementDomain;
