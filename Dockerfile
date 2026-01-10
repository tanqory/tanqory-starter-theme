# Tanqory Starter Theme - Optimized Docker Image
# Multi-stage build for smaller image size
# Dependencies pre-installed for instant VM startup

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts 2>/dev/null || npm install

# Stage 2: Development
FROM node:20-alpine AS dev
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Health check for Fly.io
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173/ || exit 1

# Start Vite dev server with HMR enabled
CMD ["npm", "run", "dev"]
