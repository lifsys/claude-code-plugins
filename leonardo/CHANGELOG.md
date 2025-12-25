# Changelog

All notable changes to the Leonardo plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-15

### Added

#### Commands
- `/leonardo` - Main orchestration entry point with multiple modes:
  - `build` - Full development cycle
  - `spec` - Specification only
  - `implement` - Implementation from existing spec
  - Interactive discovery mode

#### Skills
- `spec-orchestrator` - Comprehensive XML specification generator
- `code-architect` - Database and API architecture designer
- `implementation-engine` - Production code generator
- `quality-guardian` - Success criteria validator

#### Agents
- `architecture-agent` - Database schema and API implementation
- `frontend-agent` - UI component development
- `backend-agent` - Business logic and integrations
- `test-agent` - Test suite generation
- `review-agent` - Code quality and security audit
- `docs-agent` - Documentation generation

#### Hooks
- `PostToolUse` - File validation after writes
- `UserPromptSubmit` - Leonardo activation
- `SubagentStop` - Agent coordination
- `Stop` - Session state preservation

#### Output Styles
- `specification` - XML specification formatting
- `progress-report` - Session progress updates
- `feature-list` - Feature JSON structure

#### References
- `spec_template.md` - Complete XML template
- `question_bank.md` - Guided questioning library
- `feature_patterns.md` - Feature implementation patterns
- `autonomous-coding-integration.md` - Anthropic integration docs

#### Scripts
- `validate-spec.sh` - Specification validation utility

### Features
- Parallel agent deployment for maximum efficiency
- Comprehensive XML specification format
- 200+ feature requirement with testable steps
- Multi-session development workflow
- Immutable feature list enforcement
- Browser-based UI verification
- Progress tracking and reporting

### Technical
- Full Claude Code plugin specification compliance
- Integration with Anthropic autonomous-coding patterns
- Support for all major web frameworks
- SQLite/PostgreSQL database support
- Claude API streaming integration

## [1.1.0] - 2025-12-25

### Added

#### Skills
- `devops-architect` - Infrastructure and deployment architecture designer with:
  - Deep platform research using WebSearch
  - First-principles thinking framework
  - Contrarian analysis framework
  - User-centric design framework
  - Systems thinking framework
  - Economic analysis framework

#### Agents (devops-architect sub-agents)
- `platform-researcher` - Deep platform analysis with live research
- `cicd-designer` - CI/CD pipeline design and generation
- `security-architect` - Security architecture and configuration
- `observability-designer` - Monitoring, logging, and alerting design
- `cost-optimizer` - TCO modeling and cost analysis

#### Thinking Frameworks
- `first-principles.md` - Decompose to fundamentals, challenge assumptions
- `contrarian.md` - Argue against obvious choices, find boundaries
- `user-centric.md` - Shortest path to user value
- `systems.md` - Model interactions, find failure cascades
- `economic.md` - True TCO, opportunity costs, break-even analysis

#### Research Protocols
- `platform-comparison.md` - Structured platform evaluation methodology
- `capability-matrix.md` - Feature comparison and scoring framework

#### Output Templates
- `infrastructure-spec.xml` - Complete infrastructure specification schema
- `terraform/main.tf.template` - IaC template for multiple cloud providers
- `docker/Dockerfile.template` - Multi-stage container build
- `docker/docker-compose.yml.template` - Local development environment
- `ci-cd/github-actions.yml.template` - Complete CI/CD pipeline

### Features
- Research-driven infrastructure decisions
- Parallel platform research with multiple agents
- Structured thinking framework application
- Complete IaC output generation
- Cost projection and break-even analysis
- Security posture design
- Observability stack design
- Integration with Leonardo specification workflow

### Technical
- WebSearch integration for current platform data
- Parallel sub-agent orchestration
- Extended infrastructure_specification.xml schema
- Multi-cloud IaC template support

## [Unreleased]

### Planned
- Additional framework templates (Vue, Svelte, Next.js)
- Custom agent creation wizard
- Team collaboration features
- Visual specification builder
