#!/bin/bash
# init.sh - Environment Setup and Verification Script
#
# This script initializes the development environment and verifies
# all prerequisites are in place before beginning work.
#
# Usage: ./init.sh [--check-only]
#   --check-only: Only run verification, don't start servers

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
FRONTEND_PORT=${FRONTEND_PORT:-5173}
BACKEND_PORT=${BACKEND_PORT:-3000}
PROJECT_ROOT=$(dirname "$0")

echo "========================================"
echo "  Project Initialization Script"
echo "========================================"
echo ""

# Function: Check command exists
check_command() {
    if command -v "$1" &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is installed"
        return 0
    else
        echo -e "${RED}✗${NC} $1 is NOT installed"
        return 1
    fi
}

# Function: Check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        return 0
    else
        echo -e "${RED}✗${NC} $1 is missing"
        return 1
    fi
}

# Function: Check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/ exists"
        return 0
    else
        echo -e "${RED}✗${NC} $1/ is missing"
        return 1
    fi
}

# ========================================
# Step 1: Prerequisites Check
# ========================================
echo "Step 1: Checking prerequisites..."
echo "--------------------------------"

PREREQ_FAILED=0

# Check required commands
# Modify this list based on project requirements
check_command "node" || PREREQ_FAILED=1
check_command "npm" || PREREQ_FAILED=1
# check_command "pnpm" || PREREQ_FAILED=1
# check_command "python3" || PREREQ_FAILED=1
# check_command "docker" || PREREQ_FAILED=1

echo ""

# ========================================
# Step 2: Project Structure Verification
# ========================================
echo "Step 2: Verifying project structure..."
echo "--------------------------------------"

# Check required files
check_file "package.json" || PREREQ_FAILED=1
check_file ".env" || echo -e "${YELLOW}!${NC} .env missing - may need to create from .env.example"
check_file "features.json" || PREREQ_FAILED=1

# Check required directories
check_dir "src" || PREREQ_FAILED=1
check_dir "server" || PREREQ_FAILED=1

echo ""

# ========================================
# Step 3: Dependencies Check
# ========================================
echo "Step 3: Checking dependencies..."
echo "--------------------------------"

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules exists"
else
    echo -e "${YELLOW}!${NC} node_modules missing - installing..."
    npm install
fi

if [ -d "server/node_modules" ]; then
    echo -e "${GREEN}✓${NC} server/node_modules exists"
else
    echo -e "${YELLOW}!${NC} server/node_modules missing - installing..."
    (cd server && npm install)
fi

echo ""

# ========================================
# Step 4: Environment Variables
# ========================================
echo "Step 4: Checking environment variables..."
echo "-----------------------------------------"

if [ -f ".env" ]; then
    # Check for required env vars
    # Modify this list based on project requirements
    if grep -q "VITE_API_URL" .env 2>/dev/null; then
        echo -e "${GREEN}✓${NC} VITE_API_URL is set"
    else
        echo -e "${YELLOW}!${NC} VITE_API_URL not found in .env"
    fi

    # Add more env var checks as needed
    # if grep -q "DATABASE_URL" .env 2>/dev/null; then
    #     echo -e "${GREEN}✓${NC} DATABASE_URL is set"
    # else
    #     echo -e "${RED}✗${NC} DATABASE_URL not found in .env"
    #     PREREQ_FAILED=1
    # fi
else
    echo -e "${YELLOW}!${NC} No .env file found"
fi

echo ""

# ========================================
# Exit if check-only mode or prerequisites failed
# ========================================
if [ "$1" == "--check-only" ]; then
    echo "Check-only mode - not starting servers"
    if [ $PREREQ_FAILED -eq 1 ]; then
        echo -e "${RED}Some prerequisites are missing!${NC}"
        exit 1
    else
        echo -e "${GREEN}All prerequisites satisfied!${NC}"
        exit 0
    fi
fi

if [ $PREREQ_FAILED -eq 1 ]; then
    echo -e "${RED}Prerequisites check failed. Please fix issues above.${NC}"
    exit 1
fi

# ========================================
# Step 5: Start Development Servers
# ========================================
echo "Step 5: Starting development servers..."
echo "---------------------------------------"

# Start backend server
echo "Starting backend server on port $BACKEND_PORT..."
(cd server && npm run dev &)

# Wait for backend to be ready
echo "Waiting for backend to be ready..."
for i in {1..30}; do
    if curl -s "http://localhost:$BACKEND_PORT/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Backend is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}✗${NC} Backend failed to start"
        exit 1
    fi
    sleep 1
done

# Start frontend server
echo "Starting frontend server on port $FRONTEND_PORT..."
npm run dev &

# Wait for frontend to be ready
echo "Waiting for frontend to be ready..."
for i in {1..30}; do
    if curl -s "http://localhost:$FRONTEND_PORT" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Frontend is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}✗${NC} Frontend failed to start"
        exit 1
    fi
    sleep 1
done

echo ""

# ========================================
# Step 6: Basic E2E Verification
# ========================================
echo "Step 6: Running basic verification..."
echo "-------------------------------------"

# Test health endpoint
if curl -s "http://localhost:$BACKEND_PORT/health" | grep -q "ok"; then
    echo -e "${GREEN}✓${NC} Health check passed"
else
    echo -e "${RED}✗${NC} Health check failed"
fi

# Test frontend loads
if curl -s "http://localhost:$FRONTEND_PORT" | grep -q "<!DOCTYPE html>"; then
    echo -e "${GREEN}✓${NC} Frontend loads correctly"
else
    echo -e "${RED}✗${NC} Frontend failed to load"
fi

# Add more verification tests as needed
# Example: Test database connection
# if curl -s "http://localhost:$BACKEND_PORT/api/status" | grep -q "connected"; then
#     echo -e "${GREEN}✓${NC} Database connected"
# else
#     echo -e "${RED}✗${NC} Database connection failed"
# fi

echo ""
echo "========================================"
echo -e "  ${GREEN}Environment ready!${NC}"
echo "========================================"
echo ""
echo "  Frontend: http://localhost:$FRONTEND_PORT"
echo "  Backend:  http://localhost:$BACKEND_PORT"
echo ""
echo "  Press Ctrl+C to stop all servers"
echo ""

# Keep script running to maintain background processes
wait
