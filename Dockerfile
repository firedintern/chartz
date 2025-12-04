# Use Bun image
FROM oven/bun:1 AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY apps/web/package.json apps/web/bun.lock ./
RUN bun install

# Build the application
FROM base AS builder
WORKDIR /app
COPY apps/web ./
COPY --from=deps /app/node_modules ./node_modules
RUN bun run build

# Production image - use Node.js for running the server
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy built application
COPY --from=builder /app/build ./build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

# Use node directly to run the server
CMD ["node", "./build/server/index.js"]
