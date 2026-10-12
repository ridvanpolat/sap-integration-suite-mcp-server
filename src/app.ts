/**
 * SAP Integration Suite MCP Server — Core Application Logic
 *
 * This file encapsulates environment validation, McpServer instantiation,
 * and dynamic registration of all active SAP domains (Cloud Integration,
 * API Management, Event Mesh, Integration Assessment, Open Connectors,
 * Edge Integration Cell).
 *
 * It exports the un-connected server instance as well as a factory function
 * (createServer) allowing transport adapters (stdio, sse, streamable-http)
 * to attach transports safely.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadEnvConfig, getActiveDomains, type EnvConfig } from "./config/env.js";
import { registerActiveDomains } from "./core/registry.js";

// ---------------------------------------------------------------------------
// Server-safe logging helper
// ---------------------------------------------------------------------------
export type LogLevel = "debug" | "info" | "warn" | "error";

export type Logger = (level: LogLevel, message: string) => void;

/**
 * Creates a server-safe logging function that delivers log events through
 * the MCP protocol's `sendLoggingMessage` capability.
 * Falls back to process.stderr when transport is not yet connected.
 */
export function createLogger(server: McpServer): Logger {
  return (level: LogLevel, message: string) => {
    server.server
      .sendLoggingMessage({
        level: level === "warn" ? "warning" : level,
        data: message,
      })
      .catch((err: unknown) => {
        const error = err as { message?: string } | undefined;
        if (error?.message === "Not connected") {
          process.stderr.write(`[MCP-${level.toUpperCase()}] ${message}\n`);
        }
      });
  };
}

// ---------------------------------------------------------------------------
// Server Factory
// ---------------------------------------------------------------------------
export interface CreateServerOptions {
  config?: EnvConfig;
  name?: string;
  version?: string;
}

/**
 * Instantiates and configures a new, un-connected McpServer instance:
 * 1. Validates environment configuration via Zod.
 * 2. Instantiates McpServer with logging capabilities.
 * 3. Discovers active SAP domains based on configured environment variables.
 * 4. Dynamically registers tools, resources, and prompts for active domains.
 *
 * @returns The configured, un-connected McpServer instance.
 */
export async function createServer(
  options: CreateServerOptions = {},
): Promise<McpServer> {
  // 1. Validate environment
  const config = options.config ?? loadEnvConfig();

  // 2. Instantiate MCP Server
  const server = new McpServer(
    {
      name: options.name ?? "sap-integration-suite",
      version: options.version ?? "1.0.0",
    },
    {
      capabilities: {
        logging: {},
      },
    },
  );

  const log = createLogger(server);

  // 3. Discover active domains
  const activeDomains = getActiveDomains(config);

  if (activeDomains.length === 0) {
    log(
      "warn",
      "No SAP domains are configured. Set at least one SAP_*_URL variable in your .env file.",
    );
  }

  // 4. Dynamically register active domains
  await registerActiveDomains(server, activeDomains, log);

  return server;
}

// ---------------------------------------------------------------------------
// Configured, un-connected server singleton export
// ---------------------------------------------------------------------------
export const server: McpServer = await createServer();
export default server;
