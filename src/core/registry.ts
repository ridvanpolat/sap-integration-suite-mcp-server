import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// ---------------------------------------------------------------------------
// Domain Module Contract
// ---------------------------------------------------------------------------
// Every domain under `src/domains/{domainName}/index.ts` MUST export a default
// object conforming to this interface.  The registry discovers and activates
// only the domains whose environment variables are present.
// ---------------------------------------------------------------------------

/**
 * Contract that each SAP domain module must implement.
 *
 * - `name`              — human-readable domain name (used in logs)
 * - `domainKey`         — machine key matching the output of `getActiveDomains()`
 * - `registerTools`     — registers MCP tools on the shared server instance
 * - `registerResources` — registers MCP resources on the shared server instance
 * - `registerPrompts`   — registers MCP prompts on the shared server instance
 */
export interface SAPDomainModule {
  readonly name: string;
  readonly domainKey: string;
  registerTools: (server: McpServer) => void;
  registerResources: (server: McpServer) => void;
  registerPrompts: (server: McpServer) => void;
}

// ---------------------------------------------------------------------------
// Domain Registry — lazy discovery
// ---------------------------------------------------------------------------

/**
 * Map of `domainKey` → dynamic import path (relative from project root).
 * New domains are added here; everything else is automatic.
 */
const DOMAIN_IMPORT_MAP: Record<string, () => Promise<{ default: SAPDomainModule }>> = {
  "cloud-integration": () =>
    import("../domains/CloudIntegration/index.js") as Promise<{ default: SAPDomainModule }>,
  "api-management": () =>
    import("../domains/APIManagement/index.js") as Promise<{ default: SAPDomainModule }>,
  "event-mesh": () =>
    import("../domains/EventMesh/index.js") as Promise<{ default: SAPDomainModule }>,
  "integration-assessment": () =>
    import("../domains/IntegrationAssessment/index.js") as Promise<{ default: SAPDomainModule }>,
  "open-connectors": () =>
    import("../domains/OpenConnectors/index.js") as Promise<{ default: SAPDomainModule }>,
  "edge-integration-cell": () =>
    import("../domains/EdgeIntegrationCell/index.js") as Promise<{ default: SAPDomainModule }>,
};

/**
 * Dynamically imports and registers **only** the domains whose base URL
 * environment variable is set.
 *
 * @param server         - The shared `McpServer` instance.
 * @param activeDomains  - Domain keys returned by `getActiveDomains()`.
 * @param log            - Server-safe logging function (no console.log).
 *
 * @returns The list of successfully registered domain names.
 */
export async function registerActiveDomains(
  server: McpServer,
  activeDomains: string[],
  log: (level: "debug" | "info" | "warn" | "error", message: string) => void,
): Promise<string[]> {
  const registered: string[] = [];

  for (const domainKey of activeDomains) {
    const loader = DOMAIN_IMPORT_MAP[domainKey];

    if (!loader) {
      log("warn", `No module mapped for domain key "${domainKey}" — skipping.`);
      continue;
    }

    try {
      const mod = await loader();
      const domain = mod.default;

      domain.registerTools(server);
      domain.registerResources(server);
      domain.registerPrompts(server);

      registered.push(domain.name);
      log("info", `Registered domain: ${domain.name}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : String(err);
      log(
        "error",
        `Failed to register domain "${domainKey}": ${message}`,
      );
      // Non-fatal — other domains can still operate.
    }
  }

  return registered;
}
