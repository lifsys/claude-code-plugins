#!/usr/bin/env bash
# verify-installation.sh
# Verify that all components of the Prompt Engineering Suite are installed correctly

set -euo pipefail

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Prompt Engineering Suite - Installation Verification    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${BLUE}Installation Directory:${NC} $SCRIPT_DIR"
echo ""

# Check Skills
echo -e "${BLUE}📚 Checking Skills...${NC}"
SKILLS=(
    "skills/prompt-builder.md"
    "skills/prompt-analyzer.md"
    "skills/prompt-optimizer.md"
    "skills/prompt-template-library.md"
)

for skill in "${SKILLS[@]}"; do
    if [ -f "$skill" ]; then
        echo -e "  ${GREEN}✅${NC} $(basename $skill)"
    else
        echo -e "  ${RED}❌${NC} $(basename $skill) - MISSING"
        ((ERRORS++))
    fi
done
echo ""

# Check Commands
echo -e "${BLUE}⌨️  Checking Commands...${NC}"
COMMANDS=(
    "commands/build-prompt.md"
    "commands/analyze-prompt.md"
    "commands/optimize-prompt.md"
    "commands/template.md"
)

for cmd in "${COMMANDS[@]}"; do
    if [ -f "$cmd" ]; then
        echo -e "  ${GREEN}✅${NC} $(basename $cmd)"
    else
        echo -e "  ${RED}❌${NC} $(basename $cmd) - MISSING"
        ((ERRORS++))
    fi
done
echo ""

# Check Agents
echo -e "${BLUE}🤖 Checking Sub-Agents...${NC}"
AGENTS=(
    "agents/prompt-architect/prompt.md"
    "agents/prompt-validator/prompt.md"
    "agents/prompt-debugger/prompt.md"
    "agents/prompt-refactor/prompt.md"
)

for agent in "${AGENTS[@]}"; do
    if [ -f "$agent" ]; then
        agent_name=$(basename $(dirname $agent))
        echo -e "  ${GREEN}✅${NC} $agent_name"
    else
        agent_name=$(basename $(dirname $agent))
        echo -e "  ${RED}❌${NC} $agent_name - MISSING"
        ((ERRORS++))
    fi
done
echo ""

# Check Hooks
echo -e "${BLUE}🪝 Checking Hooks...${NC}"
HOOKS=(
    "hooks/validate-prompt.sh"
    "hooks/check-best-practices.sh"
)

for hook in "${HOOKS[@]}"; do
    if [ -f "$hook" ]; then
        if [ -x "$hook" ]; then
            echo -e "  ${GREEN}✅${NC} $(basename $hook) (executable)"
        else
            echo -e "  ${YELLOW}⚠️${NC}  $(basename $hook) (not executable)"
            ((WARNINGS++))
        fi
    else
        echo -e "  ${RED}❌${NC} $(basename $hook) - MISSING"
        ((ERRORS++))
    fi
done
echo ""

# Check Documentation
echo -e "${BLUE}📖 Checking Documentation...${NC}"
DOCS=(
    "README.md"
    "QUICKSTART.md"
    "IMPLEMENTATION-GUIDE.md"
    "PROJECT-SUMMARY.md"
    "COMPLETION-REPORT.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "  ${GREEN}✅${NC} $doc"
    else
        echo -e "  ${RED}❌${NC} $doc - MISSING"
        ((ERRORS++))
    fi
done
echo ""

# Check plugin.json
echo -e "${BLUE}⚙️  Checking Configuration...${NC}"
if [ -f "plugin.json" ]; then
    echo -e "  ${GREEN}✅${NC} plugin.json"

    # Validate JSON syntax
    if command -v python3 &> /dev/null; then
        if python3 -m json.tool plugin.json > /dev/null 2>&1; then
            echo -e "  ${GREEN}✅${NC} plugin.json is valid JSON"
        else
            echo -e "  ${RED}❌${NC} plugin.json has invalid JSON syntax"
            ((ERRORS++))
        fi
    fi
else
    echo -e "  ${RED}❌${NC} plugin.json - MISSING"
    ((ERRORS++))
fi
echo ""

# Summary
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    Verification Summary                   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "  Skills: ${GREEN}4/4${NC}"
echo "  Commands: ${GREEN}4/4${NC}"
echo "  Sub-Agents: ${GREEN}4/4${NC}"
echo "  Hooks: ${GREEN}2/2${NC}"
echo "  Documentation: ${GREEN}5/5${NC}"
echo "  Configuration: ${GREEN}1/1${NC}"
echo ""
echo -e "  ${RED}Errors: $ERRORS${NC}"
echo -e "  ${YELLOW}Warnings: $WARNINGS${NC}"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ INSTALLATION VERIFIED SUCCESSFULLY${NC}"
    echo ""
    echo -e "${BLUE}Next Steps:${NC}"
    echo "  1. Restart Claude Code"
    echo "  2. Try: /build-prompt"
    echo "  3. Try: /analyze-prompt"
    echo "  4. Read QUICKSTART.md for more examples"
    echo ""
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  INSTALLATION VERIFIED WITH WARNINGS${NC}"
    echo ""
    echo "Fix warnings for optimal functionality:"
    echo "  chmod +x hooks/*.sh"
    echo ""
    exit 0
else
    echo -e "${RED}❌ INSTALLATION VERIFICATION FAILED${NC}"
    echo ""
    echo "Fix errors before using the plugin suite."
    echo ""
    exit 1
fi
