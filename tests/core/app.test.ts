/**
 * tests/core/app.test.ts
 *
 * Unit tests for the decoupled core application logic (src/app.ts).
 */

import { describe, it, expect, vi } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createServer, server, createLogger } from "../../src/app.js";
import type { EnvConfig } from "../../src/config/env.js";

describe("Core App (src/app.ts)", () => {
  it("exports a configured, un-connected McpServer instance singleton", () => {
    expect(server).toBeInstanceOf(McpServer);
    expect(server.server).toBeDefined();
  });

  it("creates a new McpServer instance via createServer factory", async () => {
    const customServer = await createServer({
      name: "custom-sap-server",
      version: "2.0.0",
    });

    expect(customServer).toBeInstanceOf(McpServer);
    expect(customServer.server).toBeDefined();
  });

  it("configures server with specific active domains from provided config", async () => {
    const mockConfig: EnvConfig = {
      cpi: {
        url: "https://tenant-tmn.hci.eu10.hana.ondemand.com",
        tokenUrl: "https://oauth.authentication.eu10.hana.ondemand.com/oauth/token",
        clientId: "test-client",
        clientSecret: "test-secret",
      },
      apim: {},
      em: {},
      ia: {},
      oc: {},
      eic: {},
      maxResults: 25,
      logLevel: "info",
    };

    const domainServer = await createServer({ config: mockConfig });
    expect(domainServer).toBeInstanceOf(McpServer);
  });

  it("createLogger falls back to process.stderr when transport is not connected", () => {
    const testServer = new McpServer(
      { name: "test-logger", version: "1.0.0" },
      { capabilities: { logging: {} } },
    );

    const stderrSpy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    const log = createLogger(testServer);

    log("info", "Test log message");

    // sendLoggingMessage rejects with 'Not connected' asynchronously, falling back to stderr
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining("[MCP-INFO] Test log message\n"));
        stderrSpy.mockRestore();
        resolve();
      }, 50);
    });
  });
});
