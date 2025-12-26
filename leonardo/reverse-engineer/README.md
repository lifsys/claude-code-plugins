# reverse-engineer

A comprehensive Claude Code plugin for analyzing and managing divergent software forks, implementing the methodology from "Architectural Resilience in Divergent Software Forks."

## Features

- **Decision Matrix Analysis**: Semi-automated refactor vs. rewrite evaluation
- **Fork Health Metrics**: Divergence debt, coupling analysis, churn tracking
- **Seam Identification**: Find injection points for dependency injection and extension
- **Characterization Testing**: Generate Golden Master tests for safe refactoring
- **Modular Architecture Guidance**: Leave and Layer, Microkernel, Event-Driven patterns
- **Project Scaffolding**: Generate CLAUDE.md and /docs for fork governance

## Installation

```bash
# Option 1: Use as plugin directory
claude --plugin-dir /path/to/reverse-engineer

# Option 2: Copy to project
cp -r reverse-engineer /your/project/.claude-plugin/
```

## Commands

| Command | Description |
|---------|-------------|
| `/refactor-or-rewrite` | Execute decision matrix for codebase |
| `/analyze-fork` | Analyze fork health and divergence metrics |
| `/map-seams` | Identify architectural seams for decoupling |
| `/gen-char-tests` | Generate characterization tests |
| `/init-fork` | Generate CLAUDE.md and docs structure |

## Agents

| Agent | Triggers On |
|-------|-------------|
| `fork-analyzer` | Fork health queries, divergence concerns |
| `seam-mapper` | Decoupling discussions, interface extraction |
| `refactor-executor` | Refactoring execution after decision |

## Skills

- **Fork Analysis**: Divergence debt, coupling metrics, lifecycle phases
- **Seam Identification**: Object/Link/Preprocessing seams, Sprout/Wrap patterns
- **Characterization Testing**: Golden Master approach, test generation
- **Modular Architecture**: Leave and Layer, Microkernel, Event-Driven

## Quick Start

### 1. Analyze Fork Health

```
/analyze-fork /path/to/forked-project
```

Get divergence metrics, sync cost estimates, and health status.

### 2. Make Refactor Decision

```
/refactor-or-rewrite /path/to/project
```

Interactive scoring of upstream health, capability gap, resources, and architecture quality.

### 3. Find Seams

```
/map-seams src/services/
```

Identify dependency injection opportunities and hook points.

### 4. Generate Safety Net

```
/gen-char-tests src/legacy/Calculator.ts
```

Create characterization tests before refactoring.

### 5. Set Up Fork Project

```
/init-fork my-project --upstream=https://github.com/org/upstream
```

Generate CLAUDE.md and documentation structure.

## Methodology Overview

This plugin implements the "Map, Plan, Protect, Refactor" workflow:

1. **Map**: Analyze dependencies and identify hotspots
2. **Plan**: Design refactoring approach with user approval
3. **Protect**: Generate characterization tests
4. **Refactor**: Execute changes with continuous verification

## Fork Lifecycle Phases

| Phase | Indicators | Recommended Action |
|-------|------------|-------------------|
| Early | <50 commits, <10 modified files | Standard rebase |
| Middle | 50-200 commits, 10-50 files | Patch stack (StGit) |
| Late | 200+ commits, 50+ files | Architectural intervention |
| Hard | >50% conflict rate | Evaluate rewrite |

## Architecture Patterns

### Leave and Layer (Recommended for Forks)

- Keep upstream untouched
- Inject minimal hooks (event emissions)
- Build extension layer on top
- All custom logic in extensions

### Microkernel (Plugin) Pattern

- Core = Upstream
- Plugins = Extensions
- Register plugins at startup
- No upstream modification after initial setup

## License

MIT

## Author

lifsys - lifsys@automind.foundation
