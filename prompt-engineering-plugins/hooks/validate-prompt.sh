#!/usr/bin/env bash
# validate-prompt.sh
# Hook for validating prompts before submission/deployment

set -euo pipefail

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Validation results
ERRORS=0
WARNINGS=0

echo "🔍 Validating prompt..."

# Function to check for XML tags around user data
check_xml_tags() {
    local file="$1"
    if ! grep -q '<[a-zA-Z_][a-zA-Z0-9_]*>' "$file"; then
        echo -e "${RED}❌ CRITICAL: No XML tags found for data separation (Chapter 4)${NC}"
        ((ERRORS++))
    else
        echo -e "${GREEN}✅ XML tags present${NC}"
    fi
}

# Function to check for hallucination safeguards
check_hallucination_safeguards() {
    local file="$1"
    if ! grep -qiE '(if.*uncertain|if.*don.*t know|if.*cannot determine|not sure|insufficient information)' "$file"; then
        echo -e "${RED}❌ CRITICAL: No hallucination safeguards found (Chapter 8)${NC}"
        echo "   Add phrases like: 'If uncertain, say...' or 'If you don't know...'"
        ((ERRORS++))
    else
        echo -e "${GREEN}✅ Hallucination safeguards present${NC}"
    fi
}

# Function to check for examples
check_examples() {
    local file="$1"
    if ! grep -q '<example' "$file"; then
        echo -e "${YELLOW}⚠️  WARNING: No examples found (Chapter 7)${NC}"
        echo "   Complex tasks benefit from 2-3 few-shot examples"
        ((WARNINGS++))
    else
        local example_count=$(grep -c '<example' "$file")
        if [ "$example_count" -lt 2 ]; then
            echo -e "${YELLOW}⚠️  WARNING: Only $example_count example(s) found${NC}"
            echo "   Consider adding 2-3 examples for better consistency"
            ((WARNINGS++))
        else
            echo -e "${GREEN}✅ $example_count examples present${NC}"
        fi
    fi
}

# Function to check for output format specification
check_output_format() {
    local file="$1"
    if ! grep -qiE '(format|output|provide|respond with)' "$file"; then
        echo -e "${YELLOW}⚠️  WARNING: Output format not clearly specified (Chapter 5)${NC}"
        echo "   Specify expected output structure"
        ((WARNINGS++))
    else
        echo -e "${GREEN}✅ Output format specified${NC}"
    fi
}

# Function to check for vague language
check_vague_language() {
    local file="$1"
    local vague_terms=("appropriately" "properly" "correctly" "handle" "process" "deal with")
    local found_vague=false

    for term in "${vague_terms[@]}"; do
        if grep -qi "$term" "$file"; then
            if [ "$found_vague" = false ]; then
                echo -e "${YELLOW}⚠️  WARNING: Vague language detected (Chapter 2)${NC}"
                found_vague=true
            fi
            echo "   Found: '$term' - be more specific"
            ((WARNINGS++))
        fi
    done

    if [ "$found_vague" = false ]; then
        echo -e "${GREEN}✅ Instructions are specific${NC}"
    fi
}

# Function to check for step-by-step thinking (for complex tasks)
check_thinking() {
    local file="$1"
    local has_thinking=$(grep -qiE '(step.by.step|think through|analyze|reasoning)' "$file" && echo "yes" || echo "no")

    # Only warn if prompt seems complex (has role, examples, etc.)
    local is_complex=$(grep -q '<example' "$file" && grep -qi 'you are' "$file" && echo "yes" || echo "no")

    if [ "$is_complex" = "yes" ] && [ "$has_thinking" = "no" ]; then
        echo -e "${YELLOW}⚠️  WARNING: Complex task without step-by-step thinking request (Chapter 6)${NC}"
        echo "   Consider requesting reasoning in <thinking> or <analysis> tags"
        ((WARNINGS++))
    else
        echo -e "${GREEN}✅ Thinking guidance appropriate${NC}"
    fi
}

# Function to check for role prompting
check_role() {
    local file="$1"
    if ! grep -qiE '(you are|your role|as an? )' "$file"; then
        echo -e "${YELLOW}⚠️  INFO: No role prompting found (Chapter 3)${NC}"
        echo "   Consider adding expert role if task benefits from expertise context"
    else
        echo -e "${GREEN}✅ Role context present${NC}"
    fi
}

# Main validation function
validate_prompt() {
    local file="$1"

    if [ ! -f "$file" ]; then
        echo -e "${RED}❌ ERROR: File not found: $file${NC}"
        exit 1
    fi

    echo "Validating: $file"
    echo "─────────────────────────────────────"

    # Run all checks
    check_xml_tags "$file"
    check_hallucination_safeguards "$file"
    check_examples "$file"
    check_output_format "$file"
    check_vague_language "$file"
    check_thinking "$file"
    check_role "$file"

    echo "─────────────────────────────────────"
    echo "Validation complete:"
    echo -e "  ${RED}Errors: $ERRORS${NC}"
    echo -e "  ${YELLOW}Warnings: $WARNINGS${NC}"

    if [ $ERRORS -gt 0 ]; then
        echo -e "\n${RED}❌ VALIDATION FAILED${NC}"
        echo "Fix critical errors before deploying."
        exit 1
    elif [ $WARNINGS -gt 0 ]; then
        echo -e "\n${YELLOW}⚠️  VALIDATION PASSED WITH WARNINGS${NC}"
        echo "Consider addressing warnings for better quality."
        exit 0
    else
        echo -e "\n${GREEN}✅ VALIDATION PASSED${NC}"
        exit 0
    fi
}

# Usage
if [ $# -eq 0 ]; then
    echo "Usage: $0 <prompt-file>"
    echo "Example: $0 my-prompt.md"
    exit 1
fi

validate_prompt "$1"
