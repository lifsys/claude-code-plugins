# Changelog

All notable changes to Leonardo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-12-25

### Added

- **Full-Stack Playwright Testing Infrastructure**
  - `pages.spec.ts` - Page rendering, navigation, authentication, forms
  - `database.spec.ts` - Settings persistence, CRUD operations, data integrity
  - `integration.spec.ts` - External service integration, API health, WebSocket
  - `health.spec.ts` - Health monitoring, console log review, memory tracking
  - `animations.spec.ts` - Animation timing, stagger, scroll triggers, 60fps
  - `visual.spec.ts` - Typography, CSS variables, dark mode, visual depth
  - `accessibility.spec.ts` - WCAG AA compliance, keyboard navigation, ARIA
  - `performance.spec.ts` - Core Web Vitals, memory leaks, bundle size

- **Frontend Design Skill**
  - GSAP animation guide with Timeline, ScrollTrigger, transforms
  - Motion/Framer Motion guide with gestures, springs, layout animations
  - Floating action menu patterns with fan-out animations
  - Text animation patterns and philosophy
  - Distinctive typography and color system guidelines

- **Commands**
  - `/leonardo:test` - Comprehensive test execution command
  - `/leonardo:test quick` - Essential tests only
  - `/leonardo:test [category]` - Run specific test category

- **Quality Guardian Enhancements**
  - Mandatory test execution protocol
  - Quality gates that block deployment without passing tests
  - Full-stack validation checklist
  - Automated test runner script

- **Test Agent Enhancements**
  - Full-stack validation protocol
  - Execution verification checklist
  - Enhanced handoff requirements with test proof
  - Console error and API failure tracking

- **Playwright Configuration**
  - Multi-browser support (Chromium, Firefox, WebKit)
  - Mobile device testing (Pixel 5, iPhone 12)
  - Reduced motion testing project
  - Screenshot and video on failure
  - HTML and JSON reporters

### Changed

- Updated plugin.json with comprehensive marketplace metadata
- Updated marketplace.json with proper publishing structure
- Enhanced test-agent with mandatory test execution
- Improved quality-guardian with blocking quality gates

### Fixed

- Animation tests now use React-safe patterns (no innerHTML)

## [1.0.0] - 2024-12-24

### Added

- **Core Orchestration System**
  - `/leonardo` command for launching orchestration
  - `/leonardo build` for full development cycle
  - `/leonardo spec` for specification only
  - `/leonardo implement` for implementation from spec

- **Parallel Agent Architecture**
  - Group A: architecture-agent, frontend-agent, backend-agent
  - Group B: test-agent, review-agent, docs-agent
  - Coordinated handoff protocol

- **XML Specification Generation**
  - 14+ feature categories
  - 200+ testable features
  - Database schema definition
  - API endpoint summary
  - UI layout structure
  - Design system specification
  - Success criteria

- **DevOps Architect Skill**
  - Platform research with WebSearch
  - CI/CD pipeline design
  - Security architecture
  - Observability design
  - Cost optimization
  - Thinking frameworks (first-principles, contrarian, user-centric)

- **Skills**
  - spec-orchestrator
  - devops-architect
  - code-architect
  - implementation-engine
  - quality-guardian

- **Hooks**
  - PostToolUse - File validation
  - UserPromptSubmit - Command activation
  - SubagentStop - Agent coordination
  - Stop - Session state saving

- **Output Styles**
  - specification - XML formatting
  - progress-report - Session updates
  - feature-list - Feature JSON structure

### Dependencies

- Claude Code CLI >= 1.0.0
- Playwright (for testing)
- @axe-core/playwright (for accessibility)

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| 2.0.0 | 2024-12-25 | Full-stack Playwright testing, frontend-design skill |
| 1.0.0 | 2024-12-24 | Initial release, core orchestration |

## Upgrade Guide

### From 1.0.0 to 2.0.0

1. Update plugin files
2. Install Playwright: `npx playwright install`
3. Install axe-core: `npm install @axe-core/playwright`
4. Use `/leonardo:test` to run tests
5. Review new quality gates in quality-guardian
