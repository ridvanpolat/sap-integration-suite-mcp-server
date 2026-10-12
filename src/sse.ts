/**
 * SAP Integration Suite MCP Server — SSE Transport Entry Point
 *
 * This file exposes the MCP server over HTTP using Server-Sent Events (SSE).
 * It enables compatibility with MCP clients that connect via SSE (e.g. Cursor,
 * Zed, VS Code extensions, or remote MCP gateways).
 *
 * Protocol endpoints:
 *   - GET  /sse      — Establishes the SSE stream for a new client session.
 *   - GET  /mcp      — Alias for /sse for compatibility.
 *   - POST /messages — Receives client JSON-RPC requests for an active session.
 *   - GET  /health   — Health check returning server status and session count.
 */

import express, { type Request, type Response } from "express";
import cors from "cors";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createServer } from "./app.js";

interface SseSession {
  transport: SSEServerTransport;
  server: Awaited<ReturnType<typeof createServer>>;
}

/**
 * Creates and configures the Express application for the SSE transport.
 */
export function createSseApp(): {
  app: express.Express;
  sessions: Map<string, SseSession>;
} {
  const app = express();
  const sessions = new Map<string, SseSession>();

  // Enable CORS for web-based clients and cross-origin tools
  app.use(cors());

  // Health check endpoint
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      transport: "sse",
      activeSessions: sessions.size,
    });
  });

  // Handler for establishing the SSE stream
  const handleSseConnection = async (_req: Request, res: Response): Promise<void> => {
    try {
      // Direct client to post messages to '/messages'
      const transport = new SSEServerTransport("/messages", res);
      const sessionId = transport.sessionId;

      // Instantiate a dedicated, domain-registered MCP server for this session
      const sessionServer = await createServer();

      sessions.set(sessionId, { transport, server: sessionServer });

      transport.onclose = async () => {
        sessions.delete(sessionId);
        try {
          await sessionServer.close();
        } catch {
          // Ignore close errors during disconnect
        }
      };

      await sessionServer.connect(transport);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      process.stderr.write(`[ERROR] Failed to establish SSE connection: ${message}\n`);
      if (!res.headersSent) {
        res.status(500).send("Failed to establish SSE connection");
      }
    }
  };

  // SSE endpoints
  app.get("/sse", handleSseConnection);
  app.get("/mcp", handleSseConnection);

  // Message handler for incoming JSON-RPC calls
  const handlePostMessage = async (req: Request, res: Response): Promise<void> => {
    const sessionId =
      (req.query.sessionId as string | undefined) ||
      (req.headers["mcp-session-id"] as string | undefined);

    if (!sessionId) {
      res.status(400).send("Missing sessionId parameter");
      return;
    }

    const session = sessions.get(sessionId);
    if (!session) {
      res.status(404).send(`Session not found: ${sessionId}`);
      return;
    }

    try {
      await session.transport.handlePostMessage(req, res, req.body);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      process.stderr.write(`[ERROR] Failed to handle SSE post message: ${message}\n`);
      if (!res.headersSent) {
        res.status(500).send("Error handling message");
      }
    }
  };

  app.post("/messages", express.json({ limit: "10mb" }), handlePostMessage);
  app.post("/message", express.json({ limit: "10mb" }), handlePostMessage);

  return { app, sessions };
}

// ---------------------------------------------------------------------------
// Server Bootstrap & Lifecycle Management
// ---------------------------------------------------------------------------
const { app, sessions } = createSseApp();

const PORT = Number(process.env.PORT || process.env.MCP_PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";

let serverInstance: ReturnType<typeof app.listen> | undefined;

if (process.env.NODE_ENV !== "test") {
  serverInstance = app.listen(PORT, HOST, () => {
    process.stderr.write(
      `[INFO] SAP Integration Suite MCP Server (SSE) listening on http://${HOST}:${PORT}/sse\n`,
    );
  });
}

// Graceful shutdown handling
const shutdown = async (): Promise<void> => {
  for (const [sessionId, session] of sessions.entries()) {
    try {
      await session.transport.close();
      await session.server.close();
    } catch {
      // Ignore individual cleanup errors
    }
    sessions.delete(sessionId);
  }

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
