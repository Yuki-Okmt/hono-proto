#!/bin/bash

# Development setup script
set -e

echo "Setting up TODO App development environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker compose &> /dev/null; then
    echo "Error: Docker Compose is not installed"
    exit 1
fi

# Create .env file from example if it doesn't exist
if [ ! -f packages/backend/.env ]; then
    cp packages/backend/.env.example packages/backend/.env
    echo "Created .env file from .env.example"
fi

# Build and start containers
echo "Building and starting containers..."
docker compose up -d postgres

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 10

# Install dependencies
echo "Installing dependencies..."
npm install

# Generate Prisma client
echo "Generating Prisma client..."
cd packages/backend
npx prisma generate

# Run database migrations
echo "Running database migrations..."
npx prisma migrate dev --name init

# Seed the database
echo "Seeding database..."
npx prisma db seed

echo "Development environment setup complete!"
echo "You can now start the development servers:"
echo "  Backend: cd packages/backend && npm run dev"
echo "  Frontend: cd packages/frontend && npm run dev"
echo ""
echo "PostgreSQL is running in Docker container on port 5433"
echo "Database URL: postgresql://postgres:password@localhost:5433/todo_app?schema=public"