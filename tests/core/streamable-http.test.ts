/**
 * tests/core/streamable-http.test.ts
 *
 * Unit tests for the Streamable HTTP transport entry point (src/streamable-http.ts).
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import type { Server } from "node:http";
import { createStreamableHttpApp } from "../../src/streamable-http.js";

describe("Streamable HTTP Transport (src/streamable-http.ts)", () => {
  let server: Server;
  let baseUrl: string;
  let closeApp: () => Promise<void>;

  beforeAll(async () => {
    const { app, close } = createStreamableHttpApp();
    closeApp = close;
    await new Promise<void>((resolve) => {
      server = app.listen(0, "127.0.0.1", () => {
        const addr = server.address();
        if (typeof addr === "object" && addr) {
          baseUrl = `http://127.0.0.1:${addr.port}`;
        }
        resolve();
      });
    });
  });

  afterAll(async () => {
    await closeApp();
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  it("responds to /health endpoint with transport status", async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toEqual({
      status: "ok",
      transport: "streamable-http",
      activeSessions: 0,
    });
  });

  it("returns 400 when POST /mcp has no session ID and is not initialize request", async () => {
    const res = await fetch(`${baseUrl}/mcp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error.message).toContain("No valid session ID provided");
  });

  it("returns 404 when POST /mcp has non-existent mcp-session-id", async () => {
    const res = await fetch(`${baseUrl}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mcp-session-id": "unknown-session-id",
      },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
    });

    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.error.message).toContain("Session not found");
  });

  it("returns 400 when GET /mcp is missing mcp-session-id header", async () => {
    const res = await fetch(`${baseUrl}/mcp`);
    expect(res.status).toBe(400);
    const text = await res.text();
    expect(text).toContain("Missing mcp-session-id header");
  });

  it("returns 404 when GET /mcp has non-existent mcp-session-id header", async () => {
    const res = await fetch(`${baseUrl}/mcp`, {
      headers: { "mcp-session-id": "unknown-session-id" },
    });
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.error.message).toContain("Session not found");
  });

  it("returns 400 when DELETE /mcp is missing mcp-session-id header", async () => {
    const res = await fetch(`${baseUrl}/mcp`, { method: "DELETE" });
    expect(res.status).toBe(400);
    const text = await res.text();
    expect(text).toContain("Missing mcp-session-id header");
  });

  it("returns 404 when DELETE /mcp has non-existent mcp-session-id header", async () => {
    const res = await fetch(`${baseUrl}/mcp`, {
      method: "DELETE",
      headers: { "mcp-session-id": "unknown-session-id" },
    });
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.error.message).toContain("Session not found");
  });
});
