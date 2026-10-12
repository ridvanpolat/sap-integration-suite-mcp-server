/**
 * tests/core/sse.test.ts
 *
 * Unit tests for the SSE transport entry point (src/sse.ts).
 */

import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import type { Server } from "node:http";
import { createSseApp } from "../../src/sse.js";

describe("SSE Transport (src/sse.ts)", () => {
  let server: Server;
  let port: number;
  let baseUrl: string;

  beforeAll(async () => {
    const { app } = createSseApp();
    await new Promise<void>((resolve) => {
      server = app.listen(0, "127.0.0.1", () => {
        const addr = server.address();
        if (typeof addr === "object" && addr) {
          port = addr.port;
          baseUrl = `http://127.0.0.1:${port}`;
        }
        resolve();
      });
    });
  });

  afterAll(async () => {
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
      transport: "sse",
      activeSessions: 0,
    });
  });

  it("returns 400 when POST /messages has no sessionId", async () => {
    const res = await fetch(`${baseUrl}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
    });

    expect(res.status).toBe(400);
    const text = await res.text();
    expect(text).toContain("Missing sessionId parameter");
  });

  it("returns 404 when POST /messages has non-existent sessionId", async () => {
    const res = await fetch(`${baseUrl}/messages?sessionId=non-existent-id`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
    });

    expect(res.status).toBe(404);
    const text = await res.text();
    expect(text).toContain("Session not found");
  });
});
