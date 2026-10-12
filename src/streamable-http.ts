/**
 * SAP Integration Suite MCP Server — Streamable HTTP Transport Entry Point
 *
 * This file exposes the MCP server over HTTP using the Streamable HTTP transport
 * specification (MCP protocol version 2025-11-25).
 * It supports bi-directional streaming, resumability, and stateful session management.
 *
 * Protocol endpoints:
 *   - POST   /mcp    — Handles MCP initialization requests and incoming JSON-RPC calls.
 *   - GET    /mcp    — Establishes an SSE stream for server-to-client notifications.
 *   - DELETE /mcp    — Terminates an active MCP session.
 *   - GET    /health — Health check returning server status and session count.
 */

import { randomUUID } from "node:crypto";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { createServer } from "./app.js";

interface SessionEntry {
  transport: StreamableHTTPServerTransport;
  server: Awaited<ReturnType<typeof createServer>>;
  open: number;
  lastActive: number;
}

const IDLE_MS = 30 * 60 * 1000;
const MAX_SESSIONS = 1000;

function trackResponse(session: SessionEntry, res: Response): void {
  if (!res.socket || res.destroyed) return;
  session.open++;
  res.on("close", () => {
    session.open--;
    session.lastActive = Date.now();
  });
}

export function createStreamableHttpApp(): {
  app: express.Express;
  sessions: Map<string, SessionEntry>;
  close: () => Promise<void>;
} {
  const app = express();
  const sessions = new Map<string, SessionEntry>();

  app.use(cors({ exposedHeaders: ["mcp-session-id"] }));

  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      transport: "streamable-http",
      activeSessions: sessions.size,
    });
  });

  app.post("/mcp", express.json({ limit: "10mb" }), async (req: Request, res: Response): Promise<void> => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    try {
      const session = sessionId ? sessions.get(sessionId) : undefined;
      if (session) {
        trackResponse(session, res);
        await session.transport.handleRequest(req, res, req.body);
        return;
      }

      if (!sessionId && isInitializeRequest(req.body)) {
        if (sessions.size >= MAX_SESSIONS) {
          res.status(503).json({
            jsonrpc: "2.0",
            error: { code: -32000, message: "Too many open sessions" },
            id: null,
          });
          return;
        }

        const sessionServer = await createServer();
        let currentSession: SessionEntry | undefined;

        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: (sid: string) => {
            currentSession = {
              transport,
              server: sessionServer,
              open: 0,
              lastActive: Date.now(),
            };
            sessions.set(sid, currentSession);
          },
        });

        transport.onclose = () => {
          const sid = transport.sessionId;
          if (sid && sessions.has(sid)) {
            sessions.delete(sid);
          }
          sessionServer.close().catch(() => {});
        };

        await sessionServer.connect(transport);
        if (currentSession) {
          trackResponse(currentSession, res);
        }
        await transport.handleRequest(req, res, req.body);
        return;
      }

      if (sessionId) {
        res.status(404).json({
          jsonrpc: "2.0",
          error: { code: -32001, message: "Session not found" },
          id: null,
        });
        return;
      }

      res.status(400).json({
        jsonrpc: "2.0",
        error: { code: -32000, message: "Bad Request: No valid session ID provided" },
        id: null,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      process.stderr.write(`[ERROR] Streamable HTTP POST error: ${message}\n`);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: { code: -32603, message: "Internal server error" },
          id: null,
        });
      }
    }
  });

  app.get("/mcp", async (req: Request, res: Response): Promise<void> => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    if (!sessionId) {
      res.status(400).send("Missing mcp-session-id header");
      return;
    }

    const session = sessions.get(sessionId);
    if (!session) {
      res.status(404).json({
        jsonrpc: "2.0",
        error: { code: -32001, message: "Session not found" },
        id: null,
      });
      return;
    }

    try {
      trackResponse(session, res);
      await session.transport.handleRequest(req, res);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      process.stderr.write(`[ERROR] Streamable HTTP GET error: ${message}\n`);
      if (!res.headersSent) {
        res.status(500).send("Error establishing stream");
      }
    }
  });

  app.delete("/mcp", async (req: Request, res: Response): Promise<void> => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    if (!sessionId) {
      res.status(400).send("Missing mcp-session-id header");
      return;
    }

    const session = sessions.get(sessionId);
    if (!session) {
      res.status(404).json({
        jsonrpc: "2.0",
        error: { code: -32001, message: "Session not found" },
        id: null,
      });
      return;
    }

    try {
      trackResponse(session, res);
      await session.transport.handleRequest(req, res);
      await session.transport.close();
      await session.server.close();
      sessions.delete(sessionId);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      process.stderr.write(`[ERROR] Streamable HTTP DELETE error: ${message}\n`);
      if (!res.headersSent) {
        res.status(500).send("Error terminating session");
      }
    }
  });

  const cleanupTimer = setInterval(() => {
    const cutoff = Date.now() - IDLE_MS;
    for (const [sid, session] of sessions.entries()) {
      if (session.open === 0 && session.lastActive < cutoff) {
        session.transport.close().catch(() => {});
        session.server.close().catch(() => {});
        sessions.delete(sid);
      }
    }
  }, 60000).unref();

  const close = async (): Promise<void> => {
    clearInterval(cleanupTimer);
    for (const [sid, session] of sessions.entries()) {
      try {
        await session.transport.close();
        await session.server.close();
      } catch {
        // Ignore close errors
      }
      sessions.delete(sid);
    }
  };

  return { app, sessions, close };
}

// ---------------------------------------------------------------------------
// Server Bootstrap & Lifecycle Management
// ---------------------------------------------------------------------------
const { app, sessions, close } = createStreamableHttpApp();

const PORT = Number(process.env.PORT || process.env.MCP_PORT || 3001);
const HOST = process.env.HOST || "0.0.0.0";

let serverInstance: ReturnType<typeof app.listen> | undefined;

if (process.env.NODE_ENV !== "test") {
  serverInstance = app.listen(PORT, HOST, () => {
    process.stderr.write(
      `[INFO] SAP Integration Suite MCP Server (Streamable HTTP) listening on http://${HOST}:${PORT}/mcp\n`,
    );
  });
}

const shutdown = async (): Promise<void> => {
  await close();
  if (serverInstance) {
    serverInstance.close(() => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGINT", () => {
  shutdown().catch(() => process.exit(1));
});

process.on("SIGTERM", () => {
  shutdown().catch(() => process.exit(1));
});

export { app, sessions };

