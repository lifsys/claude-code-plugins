#!/bin/bash
# validate-spec.sh - Validate Leonardo project specification
#
# Usage: ./validate-spec.sh [path/to/specification.xml]

set -e

SPEC_FILE="${1:-project_specification.xml}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "========================================"
echo "  Leonardo Specification Validator"
echo "========================================"
echo ""

if [ ! -f "$SPEC_FILE" ]; then
    echo -e "${RED}Error: Specification file not found: $SPEC_FILE${NC}"
    exit 1
fi

echo "Validating: $SPEC_FILE"
echo ""

ERRORS=0
WARNINGS=0

# Check for required sections
check_section() {
    local section="$1"
    local description="$2"
    if grep -q "<$section>" "$SPEC_FILE"; then
        echo -e "${GREEN}✓${NC} $description"
    else
        echo -e "${RED}✗${NC} Missing: $description"
        ((ERRORS++))
    fi
}

echo "Checking required sections..."
echo "-----------------------------"

check_section "project_specification" "Root element"
check_section "project_name" "Project name"
check_section "overview" "Overview"
check_section "technology_stack" "Technology stack"
check_section "prerequisites" "Prerequisites"
check_section "core_features" "Core features"
check_section "database_schema" "Database schema"
check_section "api_endpoints_summary" "API endpoints"
check_section "ui_layout" "UI layout"
check_section "design_system" "Design system"
check_section "key_interactions" "Key interactions"
check_section "implementation_steps" "Implementation steps"
check_section "success_criteria" "Success criteria"

echo ""
echo "Checking technology stack subsections..."
echo "----------------------------------------"

check_section "frontend" "Frontend configuration"
check_section "backend" "Backend configuration"
check_section "communication" "Communication layer"

echo ""
echo "Checking core features categories..."
echo "------------------------------------"

# Count feature categories (should be ~14)
FEATURE_COUNT=$(grep -c "<[a-z_]*>" "$SPEC_FILE" 2>/dev/null | head -1 || echo "0")
echo "Feature sections found: $FEATURE_COUNT"

echo ""
echo "Checking implementation steps..."
echo "--------------------------------"

STEP_COUNT=$(grep -c '<step number=' "$SPEC_FILE" 2>/dev/null || echo "0")
echo "Implementation steps: $STEP_COUNT (minimum: 9)"
if [ "$STEP_COUNT" -lt 9 ]; then
    echo -e "${YELLOW}⚠${NC} Warning: Less than 9 implementation steps"
    ((WARNINGS++))
fi

echo ""
echo "Checking for placeholder text..."
echo "--------------------------------"

if grep -q "\[TODO\]\|\.\.\.\|TBD\|PLACEHOLDER" "$SPEC_FILE"; then
    echo -e "${YELLOW}⚠${NC} Warning: Placeholder text found"
    grep -n "\[TODO\]\|\.\.\.\|TBD\|PLACEHOLDER" "$SPEC_FILE" | head -5
    ((WARNINGS++))
else
    echo -e "${GREEN}✓${NC} No placeholder text found"
fi

echo ""
echo "========================================"
echo "  Validation Results"
echo "========================================"
echo ""
echo "Errors:   $ERRORS"
echo "Warnings: $WARNINGS"
echo ""

if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}Specification is INVALID. Fix errors before proceeding.${NC}"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}Specification has warnings. Review before proceeding.${NC}"
    exit 0
else
    echo -e "${GREEN}Specification is VALID and complete.${NC}"
    exit 0
fi
