---
name: init-fork
description: Generate CLAUDE.md and documentation structure for managing a soft fork project
argument-hint: "[project-name] [--upstream=url]"
allowed-tools:
  - Read
  - Glob
  - AskUserQuestion
---

# Fork Project Initialization

Generate project scaffolding optimized for soft fork maintenance, following the "Leave and Layer" architectural pattern.

## Execution Process

### Phase 1: Gather Project Information

Use AskUserQuestion to collect:

1. **Project name** (if not provided)
2. **Upstream repository URL**
3. **Primary customization goals** (multi-select):
   - Authentication extensions
   - UI/Theme customizations
   - API integrations
   - Business logic extensions
   - Performance optimizations
   - Other (specify)

4. **Target languages** (for seam patterns)

### Phase 2: Generate CLAUDE.md Content

Create comprehensive CLAUDE.md for fork management:

```markdown
# [PROJECT_NAME] - Soft Fork Management

## Purpose and Vision

[Project Name] is a soft fork of [Upstream], customized for [primary goals].

**Fork Philosophy:** Minimize divergence surface. All customizations should be additive (plugins, event listeners, wrappers) rather than invasive (direct source modifications).

## Fork Architecture

### Upstream Relationship
- **Upstream:** [upstream-url]
- **Base Branch:** `upstream/main`
- **Fork Branch:** `main`
- **Sync Schedule:** [Weekly recommended]

### Directory Structure

```
project/
├── upstream/           # Unmodified upstream code (git submodule or vendored)
├── extensions/         # All custom code lives here
│   ├── plugins/        # Plugin implementations
│   ├── listeners/      # Event listeners
│   ├── wrappers/       # Service wrappers
│   └── config/         # Custom configuration
├── seams/              # Seam injection points
│   └── hooks.ts        # Event emitters injected into upstream
└── tests/
    └── characterization/  # Golden Master tests
```

### Seam Registry

Track all injection points into upstream:

| File | Line | Seam Type | Purpose |
|------|------|-----------|---------|
| [upstream/file.ts] | [42] | Event Emit | [PRE_USER_CREATE] |

**Rule:** Every modification to upstream/ MUST be logged here.

## Sync Protocol

### Weekly Upstream Sync

```bash
# 1. Fetch upstream changes
git fetch upstream

# 2. View incoming changes
git log --oneline HEAD..upstream/main

# 3. Check for conflicts with our seams
git diff upstream/main -- [seam-files]

# 4. Rebase (or use patch stack)
git rebase upstream/main

# 5. Run characterization tests
npm test -- --testPathPattern=characterization

# 6. Verify seam integrity
npm run verify-seams
```

### Conflict Resolution Priority

1. Preserve upstream change intent
2. Re-apply seam injection
3. Verify characterization tests pass
4. Update seam registry

## Development Rules

### Adding New Features

1. **NEVER modify upstream/ directly** (except seam injection)
2. Create feature in `extensions/`
3. If upstream hook needed, add to `seams/` and update registry
4. Generate characterization tests if modifying behavior
5. Document in this file

### Seam Injection Checklist

Before injecting a new seam:

- [ ] Is there an existing hook that could work?
- [ ] Can this be done without touching upstream? (Monkey patch, proxy, etc.)
- [ ] Is the target code stable (low churn)?
- [ ] Have characterization tests been generated?
- [ ] Is the seam documented in registry?

## Divergence Metrics

Track these monthly:

| Metric | Target | Current |
|--------|--------|---------|
| Modified upstream files | <10 | |
| Seam injection points | <20 | |
| Upstream sync frequency | Weekly | |
| Sync conflict rate | <5% | |
| Characterization test coverage | >80% | |

## References

- Upstream docs: [url]
- Fork methodology: "Architectural Resilience in Divergent Software Forks"
- Seam identification: Michael Feathers, "Working Effectively with Legacy Code"

## Commands

- `/analyze-fork` - Check fork health metrics
- `/map-seams` - Find new seam opportunities
- `/gen-char-tests` - Generate safety net tests
- `/refactor-or-rewrite` - Evaluate fork viability
```

### Phase 3: Generate /docs Structure

Create documentation structure:

```
docs/
├── ARCHITECTURE.md       # Fork architecture decisions
├── SYNC-PROTOCOL.md      # Detailed upstream sync procedures
├── SEAM-CATALOG.md       # All seams with implementation details
├── EXTENSION-GUIDE.md    # How to add new extensions
└── TROUBLESHOOTING.md    # Common issues and resolutions
```

#### docs/ARCHITECTURE.md

```markdown
# Fork Architecture

## Design Principles

1. **Additive Over Invasive**: Extensions add behavior; they don't modify core behavior
2. **Seam Minimization**: Fewer seams = easier syncs
3. **Test Coverage**: Every seam has characterization tests
4. **Documentation First**: Seams documented before implementation

## Patterns Used

### Leave and Layer
[Description from methodology document]

### Event-Driven Extensions
[How event bus is implemented]

### Dependency Injection Points
[How DI enables extension]
```

### Phase 4: Present for Review

**Output all generated content for user approval before writing.**

Display:
1. Full CLAUDE.md content
2. Directory structure to create
3. Sample /docs files

Ask user:
- "Review this structure. Should I create these files?"
- Options: Create all | Create CLAUDE.md only | Modify first

## Output Format

```markdown
## Fork Project Initialization: [project-name]

### Generated CLAUDE.md

[Full content displayed]

### Documentation Structure

[Tree structure shown]

### Sample Files

[Key file contents shown]

### Ready to Create?

Use AskUserQuestion to confirm before writing any files.
```

## Tips

- If upstream URL provided, fetch metadata for richer CLAUDE.md
- Suggest git submodule for upstream if appropriate
- Recommend .gitignore entries for extension-specific files
- Include CI/CD suggestions for automated sync checks
