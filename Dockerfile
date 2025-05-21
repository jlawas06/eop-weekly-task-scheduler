# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.npmrc ./

# Install production dependencies only
RUN npm ci --production

# Expose the port the app runs on
EXPOSE 3001

# Start the application with host and port configuration
ENV HOST=0.0.0.0
ENV PORT=3001
CMD ["node", "build"] 