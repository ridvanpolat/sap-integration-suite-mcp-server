# ==============================================================================
# SAP Integration Suite MCP Server — Production Dockerfile
# Base Image: node:24-alpine (Target: Node.js 24)
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. Build Stage
# ------------------------------------------------------------------------------
FROM node:24-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy configuration and source files
COPY tsconfig.json ./
COPY src ./src
COPY scripts ./scripts
COPY specs ./specs

# Compile TypeScript
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# ------------------------------------------------------------------------------
# 2. Production Runtime Stage
# ------------------------------------------------------------------------------
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package manifests and production artifacts
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Use non-root node user for container security
USER node

# Expose default HTTP/SSE port
EXPOSE 3000

# Default entry point (Streamable HTTP). Can be overridden to run SSE or STDIO:
#   docker run -p 3000:3000 <image> node dist/sse.js
#   docker run -i <image> node dist/index.js
CMD ["node", "dist/streamable-http.js"]
