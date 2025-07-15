FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/
COPY packages/shared/package*.json ./packages/shared/
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY packages/frontend ./packages/frontend
COPY packages/shared ./packages/shared
COPY packages/frontend/tsconfig.json ./packages/frontend/

# Build shared package
WORKDIR /app/packages/shared
RUN npm run build

# Build the application
WORKDIR /app/packages/frontend
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "preview"]