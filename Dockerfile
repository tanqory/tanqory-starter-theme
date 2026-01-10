# Tanqory Starter Theme - Pre-built Docker Image
# Dependencies are pre-installed for instant VM startup

FROM node:20-alpine

WORKDIR /app

# Install git for potential future use
RUN apk add --no-cache git

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies (cached in image - no npm install needed at runtime)
RUN npm install

# Copy all source files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server with host binding for external access
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
