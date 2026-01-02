# Leonardo - Autonomous Development Orchestrator

## Purpose & Vision

Leonardo transforms user requirements into production-ready applications through parallel specialized agents. It combines comprehensive XML specification generation, frontend design skills, full-stack Playwright testing, browser exploration via Chrome extension, and DevOps infrastructure design into a unified orchestration system.

**Vision**: Enable autonomous, high-quality application development with minimal human intervention while maintaining full transparency and control.

---

## CRITICAL: CONCURRENT EXECUTION & FILE MANAGEMENT

### ABSOLUTE RULES

1. **ALL operations MUST be concurrent/parallel in a single message**
2. **NEVER save working files, text/mds and tests to the root folder**
3. **ALWAYS organize files in appropriate subdirectories**
4. **USE CLAUDE CODE'S TASK TOOL for spawning agents concurrently, not just MCP**

### GOLDEN RULE: "1 MESSAGE = ALL RELATED OPERATIONS"

**MANDATORY PATTERNS:**

| Operation | Rule |
|-----------|------|
| `TodoWrite` | ALWAYS batch ALL todos in ONE call (5-10+ todos minimum) |
| `Task` tool | ALWAYS spawn ALL agents in ONE message with full instructions |
| File operations | ALWAYS batch ALL reads/writes/edits in ONE message |
| Bash commands | ALWAYS batch ALL terminal operations in ONE message |
| Memory operations | ALWAYS batch ALL memory store/retrieve in ONE message |

### Claude Code Task Tool for Agent Execution

Claude Code's `Task` tool is the PRIMARY way to spawn agents:

```
// CORRECT: Use Claude Code's Task tool for parallel agent execution
// Launch multiple agents in a SINGLE message with multiple Task calls
```

---

## File Organization Rules

**NEVER save to root folder.** Use these directories:

| Directory | Purpose |
|-----------|---------|
| `/src` | Source code files |
| `/tests` | Test files |
| `/docs` | Documentation and markdown files |
| `/config` | Configuration files |
| `/scripts` | Utility scripts |
| `/specs` | Specifications, Architecture, Tech Stack, Requirements |
| `/examples` | Example code |
| `/skills` | Skill definitions (SKILL.md files) |
| `/commands` | Command definitions |
| `/agents` | Agent definitions |
| `/templates` | Code templates and configs |
| `/references` | Reference documentation |

---

## Code Style & Best Practices

| Practice | Rule |
|----------|------|
| **Modular Design** | Files under 500 lines |
| **Environment Safety** | Never hardcode secrets |
| **Test-First** | Write tests before implementation |
| **Clean Architecture** | Separate concerns |
| **Documentation** | Keep updated with code changes |

---

## Testing Strategy

| Tool | Use Case |
|------|----------|
| **Playwright** | Automated CI/CD, multi-browser, regression suites |
| **Chrome Extension** | Exploratory testing, debugging, demo recording |

Commands:
- `/leonardo:test` - Run Playwright test suite
- `/leonardo:explore` - Launch browser exploration session

---

## Project Structure

```
leonardo/
├── .claude-plugin/      # Plugin configuration
│   └── plugin.json
├── agents/              # Agent definitions
├── commands/            # Command definitions
├── hooks/               # Hook configurations
├── output-styles/       # Output formatting
├── references/          # Reference docs
├── skills/              # Skill definitions
├── templates/           # Code templates
│   └── testing/         # Playwright configs
└── CLAUDE.md            # This file
```

---

## Key Commands

| Command | Description |
|---------|-------------|
| `/leonardo` | Launch full orchestration |
| `/leonardo:test` | Run Playwright tests |
| `/leonardo:explore` | Interactive browser testing |

---

## References

- `skills/frontend-design/SKILL.md` - UI aesthetics with GSAP/Motion
- `skills/browser-explorer/SKILL.md` - Chrome extension exploration
- `skills/quality-guardian/SKILL.md` - Test execution protocol
- `templates/testing/playwright.config.ts` - Test configuration
