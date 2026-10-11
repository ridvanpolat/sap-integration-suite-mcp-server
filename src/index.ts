#!/usr/bin/env node

/**
 * SAP Integration Suite MCP Server — Entry Point
 *
 * This file bootstraps the MCP server using StdioServerTransport and
 * dynamically registers only the SAP domains whose environment variables
 * are configured.
 *
 * IMPORTANT: Because we use StdioServerTransport, STDOUT is reserved for
 * the MCP protocol.  All application logging MUST go through the server's
 * built-in logging mechanism — never through console.log / console.error.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { loadEnvConfig, getActiveDomains } from "./config/env.js";
import { registerActiveDomains } from "./core/registry.js";

// ---------------------------------------------------------------------------
// Server-safe logging helper
// ---------------------------------------------------------------------------
// The MCP SDK's `Server` (lower-level) supports `server.sendLoggingMessage`.
// We wrap it here so domain modules can use a simple function signature.
// Until domains are loaded we buffer to stderr (the only safe fallback with
// StdioServerTransport).
// ---------------------------------------------------------------------------

type LogLevel = "debug" | "info" | "warn" | "error";

function createLogger(server: McpServer): (level: LogLevel, message: string) => void {
  return (level: LogLevel, message: string) => {
    // The McpServer exposes the lower-level Server via `server.server`.
    // `sendLoggingMessage` delivers log entries to the MCP client.
    server.server.sendLoggingMessage({
      level: level === "warn" ? "warning" : level,
      data: message,
    }).catch((err: any) => {
      // If the transport is not yet connected, fallback to stderr.
      if (err?.message === 'Not connected') {
        process.stderr.write(`[MCP-${level.toUpperCase()}] ${message}\n`);
      }
    });
  };
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  // 1. Validate environment
  const config = loadEnvConfig();

  // 2. Create the MCP server
  const server = new McpServer(
    {
      name: "sap-integration-suite",
      version: "1.0.0",
    },
    {
      capabilities: {
        logging: {},
      },
    },
  );

  const log = createLogger(server);

  // 3. Discover which domains are active
  const activeDomains = getActiveDomains(config);

  if (activeDomains.length === 0) {
    log(
      "warn",
      "No SAP domains are configured.  Set at least one SAP_*_URL variable in your .env file.",
    );
  }

  // 4. Dynamically register active domains
  const registered = await registerActiveDomains(server, activeDomains, log);

  // 5. Connect via STDIO transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  log(
    "info",
    `SAP Integration Suite MCP Server started — ${registered.length} domain(s) active: [${registered.join(", ")}]`,
  );
}

// ---------------------------------------------------------------------------
// Top-level error boundary — never crash the Node process with an unhandled
// rejection; log it and exit gracefully.
// ---------------------------------------------------------------------------
main().catch((err: unknown) => {
  // Last-resort logging — stderr is acceptable here because the transport
  // hasn't been established or has already failed.
  const message = err instanceof Error ? err.stack ?? err.message : String(err);
  process.stderr.write(`[FATAL] SAP MCP Server failed to start:\n${message}\n`);
  process.exit(1);
});
