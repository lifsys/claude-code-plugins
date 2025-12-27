#!/usr/bin/env bash
# check-best-practices.sh
# Post-tool hook to check prompts for curriculum best practices

set -euo pipefail

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

SCORE=0
MAX_SCORE=0

echo -e "${BLUE}📋 Checking prompt against Anthropic curriculum best practices...${NC}\n"

# Function to check and score
check_practice() {
    local practice="$1"
    local file="$2"
    local pattern="$3"
    local points="$4"
    local chapter="$5"
    local advice="$6"

    ((MAX_SCORE += points))

    if grep -qiE "$pattern" "$file"; then
        echo -e "${GREEN}✅ [$points pts] $practice (Chapter $chapter)${NC}"
        ((SCORE += points))
    else
        echo -e "${YELLOW}⭕ [0 pts] $practice (Chapter $chapter)${NC}"
        if [ -n "$advice" ]; then
            echo -e "   ${YELLOW}💡 $advice${NC}"
        fi
    fi
}

# Main check function
check_best_practices() {
    local file="$1"

    if [ ! -f "$file" ]; then
        echo -e "${RED}❌ File not found: $file${NC}"
        return 1
    fi

    echo "Analyzing: $file"
    echo "════════════════════════════════════════════════════"
    echo ""

    # Chapter 1: Basic Structure (10 points)
    echo -e "${BLUE}📖 Chapter 1: Basic Prompt Structure${NC}"
    check_practice "Structured format" "$file" "(user|assistant|<|>)" 5 "1" "Use clear message structure"
    check_practice "Clear delimiters" "$file" "(<[a-z_]+>|''')" 5 "1" "Use XML tags or code blocks"
    echo ""

    # Chapter 2: Clarity & Directness (20 points)
    echo -e "${BLUE}📖 Chapter 2: Being Clear and Direct${NC}"
    check_practice "Specific instructions" "$file" "(must|should|need to|required)" 10 "2" "Use direct, unambiguous language"
    check_practice "Success criteria defined" "$file" "(correct|successful|expected|should)" 5 "2" "Define what good output looks like"
    check_practice "No vague terms" "$file" "^((?!appropriately|properly|handle|process).)*$" 5 "2" "Avoid: appropriately, properly, handle, process"
    echo ""

    # Chapter 3: Role Prompting (10 points)
    echo -e "${BLUE}📖 Chapter 3: Assigning Roles${NC}"
    check_practice "Role assignment" "$file" "(you are|your role|as an?)" 5 "3" "Assign expert role if beneficial"
    check_practice "Context provided" "$file" "(expert|specialist|assistant|professional)" 5 "3" "Provide expertise context"
    echo ""

    # Chapter 4: XML Separation (15 points - CRITICAL)
    echo -e "${BLUE}📖 Chapter 4: Separating Data and Instructions${NC}"
    check_practice "XML tags for data" "$file" "<[a-z_]+>.*</[a-z_]+>" 10 "4" "CRITICAL: Wrap user data in XML tags"
    check_practice "Semantic tag names" "$file" "<(document|email|text|code|data|input)" 5 "4" "Use meaningful tag names"
    echo ""

    # Chapter 5: Output Formatting (15 points)
    echo -e "${BLUE}📖 Chapter 5: Formatting Output${NC}"
    check_practice "Output format specified" "$file" "(format|output|provide|respond with)" 5 "5" "Specify exact output structure"
    check_practice "Output XML tags" "$file" "<(result|output|summary|classification|analysis)" 5 "5" "Use XML tags for output structure"
    check_practice "Prefilling hint" "$file" "(start with|begin|respond with:|provide:)" 5 "5" "Consider using prefilling technique"
    echo ""

    # Chapter 6: Step-by-Step Thinking (10 points)
    echo -e "${BLUE}📖 Chapter 6: Precognition (Thinking Step-by-Step)${NC}"
    check_practice "Thinking requested" "$file" "(step.by.step|think through|reason|analyze)" 5 "6" "Request step-by-step for complex tasks"
    check_practice "Thinking tags" "$file" "(<thinking>|<analysis>|<reasoning>)" 5 "6" "Provide tags for thinking process"
    echo ""

    # Chapter 7: Few-Shot Examples (20 points - HIGH VALUE)
    echo -e "${BLUE}📖 Chapter 7: Using Examples${NC}"
    check_practice "Examples present" "$file" "<example" 10 "7" "Add 2-3 examples for complex tasks"
    check_practice "Example tags" "$file" "(<example>|<examples>)" 5 "7" "Wrap examples in XML tags"
    check_practice "Multiple examples" "$file" "(<example[^>]*>.*){2,}" 5 "7" "Include at least 2-3 examples"
    echo ""

    # Chapter 8: Hallucination Prevention (25 points - MOST CRITICAL)
    echo -e "${BLUE}📖 Chapter 8: Avoiding Hallucinations${NC}"
    check_practice "Give Claude an 'out'" "$file" "(if.*uncertain|if.*don.*t know|if.*cannot|not sure)" 10 "8" "CRITICAL: Add 'If you don't know, say...'"
    check_practice "Evidence first" "$file" "(evidence|quote|cite|source|based on)" 5 "8" "Request evidence before claims"
    check_practice "Uncertainty handling" "$file" "(uncertain|unsure|cannot determine|insufficient)" 5 "8" "Allow uncertain responses"
    check_practice "Conservative language" "$file" "(only|explicitly|stated|provided in)" 5 "8" "Request evidence-based answers only"
    echo ""

    # Chapter 9: Complex Prompts (10 points)
    echo -e "${BLUE}📖 Chapter 9: Complex Prompts from Scratch${NC}"
    local complex_score=0
    grep -qi "you are" "$file" && ((complex_score++))
    grep -q "<example" "$file" && ((complex_score++))
    grep -qiE "(step.by.step|think)" "$file" && ((complex_score++))
    grep -q "<[a-z_]+>" "$file" && ((complex_score++))

    if [ $complex_score -ge 3 ]; then
        echo -e "${GREEN}✅ [10 pts] Complex prompt structure (Chapter 9)${NC}"
        ((SCORE += 10))
    else
        echo -e "${YELLOW}⭕ [0 pts] Complex prompt structure (Chapter 9)${NC}"
        echo -e "   ${YELLOW}💡 For complex tasks, use 10-element structure${NC}"
    fi
    ((MAX_SCORE += 10))
    echo ""

    # Appendices (Bonus - 15 points)
    echo -e "${BLUE}📖 Appendices: Advanced Techniques${NC}"
    check_practice "Chaining consideration" "$file" "(first|then|next|finally|step [0-9])" 5 "10.1" "Consider prompt chaining for complex workflows"
    check_practice "Tool use hint" "$file" "(tool|function|call|api)" 5 "10.2" "Consider tool use for external data"
    check_practice "RAG hint" "$file" "(search|retrieve|lookup|database|knowledge)" 5 "10.3" "Consider RAG for information retrieval"
    echo ""

    # Calculate final score
    local percentage=$((SCORE * 100 / MAX_SCORE))

    echo "════════════════════════════════════════════════════"
    echo -e "\n📊 Best Practices Compliance Score: ${BLUE}$SCORE/$MAX_SCORE${NC} ($percentage%)"

    # Provide rating
    if [ $percentage -ge 90 ]; then
        echo -e "${GREEN}🏆 Excellent! Outstanding compliance with curriculum${NC}"
    elif [ $percentage -ge 75 ]; then
        echo -e "${GREEN}✅ Good! Strong compliance with most practices${NC}"
    elif [ $percentage -ge 60 ]; then
        echo -e "${YELLOW}⚠️  Fair. Several improvements recommended${NC}"
    elif [ $percentage -ge 40 ]; then
        echo -e "${YELLOW}⚠️  Needs Improvement. Missing key practices${NC}"
    else
        echo -e "${RED}❌ Poor. Significant curriculum violations${NC}"
    fi

    echo ""

    # Critical checks
    local critical_missing=()

    ! grep -q '<[a-z_]+>' "$file" && critical_missing+=("XML tags for data separation (Ch 4)")
    ! grep -qiE '(if.*uncertain|if.*don.*t know)' "$file" && critical_missing+=("Hallucination safeguards (Ch 8)")

    if [ ${#critical_missing[@]} -gt 0 ]; then
        echo -e "${RED}🚨 CRITICAL ISSUES:${NC}"
        for issue in "${critical_missing[@]}"; do
            echo -e "   ${RED}• $issue${NC}"
        done
        echo ""
        return 1
    fi

    return 0
}

# Usage
if [ $# -eq 0 ]; then
    echo "Usage: $0 <prompt-file>"
    echo "Example: $0 my-prompt.md"
    exit 0
fi

check_best_practices "$1"
exit_code=$?

if [ $exit_code -eq 0 ]; then
    exit 0
else
    exit 1
fi
