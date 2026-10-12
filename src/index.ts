#!/usr/bin/env node

/**
 * SAP Integration Suite MCP Server — STDIO Transport Entry Point
 *
 * This file bootstraps the MCP server over standard input/output (stdio).
 * It imports the configured, un-connected server instance from `app.ts`,
 * attaches a StdioServerTransport, and starts listening for JSON-RPC frames.
 *
 * CRITICAL ARCHITECTURAL RULE:
 * STDOUT is strictly reserved for JSON-RPC messages adhering to the MCP
 * specification. NEVER use `console.log`, `console.info`, or `console.error`.
 * All server logging must route through MCP protocol messages or process.stderr.
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server, createLogger } from "./app.js";

async function main(): Promise<void> {
  // 1. Instantiate the StdioServerTransport
  const transport = new StdioServerTransport();

  // 2. Connect the transport to the server instance
  await server.connect(transport);

  // 3. Log startup message safely via the MCP protocol
  const log = createLogger(server);
  log("info", "SAP Integration Suite MCP Server connected via STDIO transport");
}

// ---------------------------------------------------------------------------
// Graceful termination handling
// ---------------------------------------------------------------------------
process.on("SIGINT", async () => {
  try {
    await server.close();
  } catch {
    // Ignore error on close
  }
  process.exit(0);
});

process.on("SIGTERM", async () => {
  try {
    await server.close();
  } catch {
    // Ignore error on close
  }
  process.exit(0);
});

// ---------------------------------------------------------------------------
// Top-level error boundary — never crash the Node process with an unhandled
// rejection; log to stderr and exit gracefully.
// ---------------------------------------------------------------------------
main().catch((err: unknown) => {
  const message = err instanceof Error ? err.stack ?? err.message : String(err);
  process.stderr.write(`[FATAL] SAP MCP Server STDIO failed to start:\n${message}\n`);
  process.exit(1);
});
