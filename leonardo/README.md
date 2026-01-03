# Leonardo: Autonomous Development Orchestrator

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/lifsys/claude-code-plugins/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/claude--code-%3E%3D1.0.0-purple.svg)](https://claude.ai/code)
[![Playwright](https://img.shields.io/badge/tests-playwright-orange.svg)](https://playwright.dev)

A comprehensive Claude Code plugin for orchestrating autonomous software development through parallel agents, structured XML specifications, and full-stack Playwright testing.

## Features

- **Parallel Agent Orchestration** - Deploy multiple specialized agents simultaneously
- **XML Specification Generation** - Comprehensive project specs with 200+ features
- **Full-Stack Playwright Testing** - Pages, database, integration, health validation
- **Frontend Design System** - GSAP and Motion/Framer animation guides
- **Quality Guardian** - Mandatory test execution before handoff
- **DevOps Architecture** - Infrastructure, CI/CD, and deployment design
- **User Validation Checkpoints** - AskUserQuestion integration at 15+ decision points
- **Next.js 16 God Tier Stack** - Bleeding-edge patterns for AI/streaming applications

## Installation

### From Marketplace (Recommended)

```bash
claude plugin install leonardo
```

### From GitHub

```bash
claude plugin install https://github.com/lifsys/claude-code-plugins/tree/main/leonardo
```

### From Local Path

```bash
claude plugin install /path/to/leonardo
```

### Manual Installation

Add to `~/.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "leonardo-local": {
      "source": {
        "source": "directory",
        "path": "/path/to/leonardo"
      }
    }
  },
  "enabledPlugins": {
    "leonardo@leonardo-local": true
  }
}
```

## Quick Start

### Full Development Cycle

```bash
/leonardo build "A task management app with kanban boards and team collaboration"
```

### Specification Only

```bash
/leonardo spec "AI-powered customer support chat"
```

### Run Tests

```bash
/leonardo:test
```

### Interactive Discovery

```bash
/leonardo
```

## Commands

| Command | Description |
|---------|-------------|
| `/leonardo` | Launch orchestration system |
| `/leonardo build [desc]` | Generate spec and implement |
| `/leonardo spec [desc]` | Generate specification only |
| `/leonardo implement [path]` | Implement from existing spec |
| `/leonardo:test` | Run comprehensive test suite |
| `/leonardo:test quick` | Run essential tests only |

## Skills

| Skill | Purpose |
|-------|---------|
| `spec-orchestrator` | Generate comprehensive XML specifications |
| `orchestration-coordinator` | **NEW** Agent management, conflict resolution, progress tracking |
| `error-recovery` | **NEW** Failure handling, retry logic, rollback workflows |
| `docs-generator` | **NEW** OpenAPI, README, architecture documentation |
| `frontend-design` | Distinctive UI with GSAP/Motion animation guides |
| `quality-guardian` | Validate with mandatory test execution |
| `devops-architect` | Infrastructure and deployment design |
| `code-architect` | Database schema, API architecture, and migrations |
| `implementation-engine` | Generate production code |
| `browser-explorer` | Interactive browser exploration via Chrome extension |

## Agents

| Agent | Role | Group |
|-------|------|-------|
| `architecture-agent` | Database, API design | A |
| `frontend-agent` | UI components, styling, animations | A |
| `backend-agent` | Business logic, integrations | A |
| `devops-architect` | Infrastructure, CI/CD | A+ |
| `test-agent` | Full-stack test generation & execution | B |
| `review-agent` | Code quality, security | B |
| `docs-agent` | Documentation | B |

## Testing Infrastructure

Leonardo includes comprehensive Playwright test templates:

| Test Suite | Coverage |
|------------|----------|
| `pages.spec.ts` | Page rendering, navigation, forms |
| `database.spec.ts` | Settings persistence, CRUD, data integrity |
| `integration.spec.ts` | API health, auth, payments, WebSocket |
| `health.spec.ts` | Health endpoints, console logs, memory |
| `animations.spec.ts` | Stagger, scroll, hover, 60fps |
| `visual.spec.ts` | Typography, CSS variables, dark mode |
| `accessibility.spec.ts` | WCAG AA compliance |
| `performance.spec.ts` | Core Web Vitals, bundle size |

### Quality Gates

All tests must pass before implementation is considered complete:

- Unit tests: 0 failures, >80% coverage
- E2E tests: 0 failures
- Animation tests: 60fps maintained
- Accessibility: 0 critical violations
- Console: 0 JavaScript errors

## Workflow

### Phase 1: Vision Capture
Leonardo analyzes requirements and asks clarifying questions.

### Phase 2: Specification Generation
Generates comprehensive XML specification with 200+ features.

### Phase 3: Infrastructure Design
DevOps-Architect designs deployment architecture.

### Phase 4: Parallel Agent Deployment
Launches specialized agents simultaneously.

### Phase 5: Implementation Orchestration
Coordinates agent work and resolves dependencies.

### Phase 6: Full-Stack Testing
Executes complete Playwright test suite.

### Phase 7: Verification Loop
Validates against success criteria and generates report.

## Output Artifacts

- `project_specification.xml` - Complete specification
- `infrastructure_specification.xml` - Deployment architecture
- `feature_list.json` - 200+ testable features
- `playwright-report/` - Test execution report
- `coverage/` - Code coverage report
- Application source code
- Test suites
- Documentation

## Configuration

Create `.leonardo.json` in your project:

```json
{
  "mode": "full",
  "minFeatures": 200,
  "parallelAgents": true,
  "uiVerification": true,
  "mandatoryTests": true,
  "testSuites": ["pages", "database", "integration", "health", "animations"]
}
```

## Requirements

- Claude Code CLI >= 1.0.0
- Node.js >= 18 (for Playwright)
- Playwright browsers (installed automatically)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)

## Credits

- Inspired by Anthropic's Claude Quickstarts autonomous-coding system
- Integrates patterns from official Claude Code documentation
- Uses Playwright for browser automation
- Animation guides based on GSAP and Motion/Framer Motion

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

### v2.1.0 (2026-01-02)

**New Skills:**
- Added `orchestration-coordinator` skill for agent management and conflict resolution
- Added `error-recovery` skill with retry logic and rollback workflows
- Added `docs-generator` skill for OpenAPI, README, and architecture docs

**AskUserQuestion Integration (15+ checkpoints):**
- `spec-orchestrator`: Project type, scale, mode, tech stack, pre-delivery confirmation
- `orchestration-coordinator`: Conflict resolution, breaking change approval
- `devops-architect`: User scale, budget, expertise level
- `frontend-design`: Aesthetic direction, animation intensity
- `quality-guardian`: Validation scope selection
- `docs-generator`: Documentation scope, detail level

**Next.js 16 God Tier Stack:**
- Added `references/nextjs-16-god-tier.md` with Generative UI, R3F shaders, Lenis scroll
- Integrated detection triggers in `code-architect` and `frontend-design` skills
- Auto-applies patterns when Next.js 16 or AI/streaming detected

**Infrastructure Improvements:**
- Added database migration strategy to `code-architect` skill
- Enhanced progress reporting with phase tracking and quality gates
- Updated orchestration protocol with 6 phases
- Added heartbeat monitoring and failure detection
- Added checkpoint-based recovery for partial completions

### v2.0.0 (2024-12-25)

- Added full-stack Playwright testing infrastructure
- Added frontend-design skill with GSAP and Motion/Framer guides
- Added `/leonardo:test` command
- Added quality guardian with mandatory test execution
- Added page, database, integration, and health test templates
- Added accessibility and performance test suites
- Enhanced test-agent with full-stack validation protocol

### v1.0.0 (2024-12-24)

- Initial release
- Core orchestration system
- Parallel agent deployment
- XML specification generation
- DevOps architect skill
