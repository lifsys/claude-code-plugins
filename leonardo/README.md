# Leonardo: Autonomous Development Orchestration System

A comprehensive Claude Code plugin for orchestrating autonomous software development through parallel agents and structured XML specifications.

## Overview

Leonardo transforms user requirements into production-ready applications by:
1. Generating comprehensive XML project specifications
2. Deploying parallel specialized agents for implementation
3. Validating against success criteria
4. Producing complete, tested, documented codebases

## Installation

```bash
claude plugin install leonardo
```

Or install from local path:
```bash
claude plugin install /path/to/leonardo
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

### Implementation from Existing Spec
```bash
/leonardo implement ./project_specification.xml
```

### Interactive Discovery
```bash
/leonardo
```

## Plugin Components

### Commands
- `/leonardo` - Main entry point for orchestration

### Skills
| Skill | Purpose |
|-------|---------|
| `spec-orchestrator` | Generate comprehensive XML specifications |
| `devops-architect` | Infrastructure and deployment architecture design |
| `code-architect` | Design database and API architecture |
| `frontend-design` | Distinctive UI aesthetics (typography, color, animation) |
| `implementation-engine` | Generate production code |
| `quality-guardian` | Validate against success criteria |

### DevOps-Architect Sub-Agents
| Agent | Role |
|-------|------|
| `platform-researcher` | Deep platform analysis with live WebSearch |
| `cicd-designer` | CI/CD pipeline design and generation |
| `security-architect` | Security architecture and configuration |
| `observability-designer` | Monitoring, logging, and alerting |
| `cost-optimizer` | TCO modeling and cost analysis |

### Thinking Frameworks
| Framework | Purpose |
|-----------|---------|
| `first-principles` | Decompose to fundamentals, challenge assumptions |
| `contrarian` | Argue against obvious choices, find boundaries |
| `user-centric` | Shortest path to user value |
| `systems` | Model interactions, find failure cascades |
| `economic` | True TCO, opportunity costs, break-even |

### Agents
| Agent | Role | Parallel Group |
|-------|------|----------------|
| `architecture-agent` | Database, API design | A |
| `frontend-agent` | UI components, styling | A |
| `backend-agent` | Business logic, integrations | A |
| `devops-architect` | Infrastructure, deployment | A+ |
| `test-agent` | Test generation, verification | B |
| `review-agent` | Code quality, security | B |
| `docs-agent` | Documentation, README | B |

### Hooks
- `PostToolUse` - Validates written files against spec
- `UserPromptSubmit` - Activates on `/leonardo` command
- `SubagentStop` - Coordinates agent completion
- `Stop` - Ensures session state is saved

### Output Styles
- `specification` - XML specification formatting
- `progress-report` - Session progress updates
- `feature-list` - Feature JSON structure

## Workflow

### Phase 1: Vision Capture
Leonardo analyzes requirements and asks clarifying questions.

### Phase 2: Specification Generation
Generates comprehensive XML specification with:
- Technology stack decisions
- 14+ feature categories
- Database schema
- 60+ API endpoints
- UI layout structure
- Design system
- 9 implementation steps
- Success criteria

### Phase 2.5: Infrastructure Design (NEW)
DevOps-Architect conducts:
- Parallel platform research (AWS, GCP, Vercel, self-hosted)
- Thinking framework application (first-principles, contrarian, user-centric)
- Cost/benefit analysis and TCO modeling
- Infrastructure specification generation

### Phase 3: Parallel Agent Deployment
Launches specialized agents simultaneously:
- Group A: Architecture, Frontend, Backend
- Group A+: DevOps-Architect (infrastructure)
- Group B: Tests, Review, Documentation

### Phase 4: Implementation Orchestration
Coordinates agent work:
- Monitors progress
- Resolves dependencies
- Integrates outputs
- Handles conflicts

### Phase 5: Verification Loop
Validates complete implementation:
- Runs test suite
- Browser verification
- Success criteria check
- Quality report generation

## Specification Structure

```xml
<project_specification>
  <project_name>Name - Descriptor</project_name>
  <overview>2-4 sentences...</overview>
  <technology_stack>...</technology_stack>
  <prerequisites>...</prerequisites>
  <core_features>
    <!-- 14 categories, 200+ features -->
  </core_features>
  <database_schema>...</database_schema>
  <api_endpoints_summary>...</api_endpoints_summary>
  <ui_layout>...</ui_layout>
  <design_system>...</design_system>
  <key_interactions>...</key_interactions>
  <implementation_steps>...</implementation_steps>
  <success_criteria>...</success_criteria>
</project_specification>
```

## Output Artifacts

Leonardo produces:
- `project_specification.xml` - Complete application specification
- `infrastructure_specification.xml` - Deployment architecture (NEW)
- `feature_list.json` - 200+ testable features
- `init.sh` - Environment setup script
- `progress.md` - Session progress tracker
- `terraform/` - Infrastructure as Code templates (NEW)
- `docker/` - Container configurations (NEW)
- `.github/workflows/` - CI/CD pipelines (NEW)
- `deployment-plan.md` - Rollout strategy (NEW)
- `cost-projection.md` - Financial analysis (NEW)
- Complete application source code
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
  "autoCommit": true
}
```

## Best Practices

1. **Be Specific** - Detailed requirements produce better specs
2. **Reference Apps** - Mention similar apps for design inspiration
3. **Review Spec** - Verify specification before implementation
4. **Incremental** - Use multiple sessions for large projects
5. **Verify UI** - Always test through browser automation

## Troubleshooting

### Specification Generation Issues
```bash
./scripts/validate-spec.sh project_specification.xml
```

### Agent Coordination
Check `progress.md` for agent status and blockers.

### Feature Verification
Review `feature_list.json` for test definitions.

## License

MIT

## Credits

Inspired by Anthropic's Claude Quickstarts autonomous-coding system.
Integrates patterns from the official Claude Code documentation.
