# Development Dockerfile for Tanqory Starter Theme
# This keeps source code available for AI code editing with hot reload

FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server (host 0.0.0.0 for external access)
CMD ["pnpm", "dev", "--host", "0.0.0.0"]
