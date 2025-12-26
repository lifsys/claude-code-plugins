# Fork CLAUDE.md Template

Use this template when running `/init-fork` to generate project CLAUDE.md.

---

```markdown
# [PROJECT_NAME] - Soft Fork Management

## Purpose and Vision

[Project Name] is a soft fork of [UPSTREAM_URL], customized for [PRIMARY_GOALS].

**Fork Philosophy:** Minimize divergence surface. All customizations should be additive (plugins, event listeners, wrappers) rather than invasive (direct source modifications).

## Fork Architecture

### Upstream Relationship

| Aspect | Value |
|--------|-------|
| Upstream | [UPSTREAM_URL] |
| Base Branch | `upstream/main` |
| Fork Branch | `main` |
| Sync Schedule | Weekly |

### Directory Structure

```
[PROJECT]/
├── upstream/           # Unmodified upstream code
├── extensions/         # All custom code lives here
│   ├── plugins/        # Plugin implementations
│   ├── listeners/      # Event listeners
│   ├── wrappers/       # Service wrappers
│   └── config/         # Custom configuration
├── seams/              # Seam injection points
│   └── hooks.ts        # Event emitters
└── tests/
    └── characterization/  # Golden Master tests
```

### Seam Registry

Track all injection points into upstream:

| File | Line | Seam Type | Purpose | Added |
|------|------|-----------|---------|-------|
| | | | | |

**Rule:** Every modification to upstream/ MUST be logged here.

## Development Rules

### 🚫 NEVER

- Modify upstream/ directly (except seam injection)
- Interleave custom code with upstream logic
- Delete upstream files
- Refactor upstream code structure

### ✅ ALWAYS

- Create features in `extensions/`
- Use event listeners for behavior changes
- Document seams in registry above
- Generate characterization tests before modifying

### Adding New Features

1. Check if upstream hook exists
2. If not, add minimal hook to `seams/`
3. Implement feature in `extensions/`
4. Generate characterization tests
5. Update seam registry
6. Update this file

### Seam Injection Checklist

Before injecting a new seam:

- [ ] No existing hook can work?
- [ ] Can't use Monkey Patch/Proxy?
- [ ] Target code is stable (low churn)?
- [ ] Characterization tests generated?
- [ ] Documented in registry?

## Sync Protocol

### Weekly Sync (Every Monday)

```bash
# 1. Fetch upstream
git fetch upstream

# 2. Check for conflicts
git diff upstream/main -- [seam-files]

# 3. Rebase
git rebase upstream/main

# 4. Verify hooks intact
grep -r "emit(" upstream/

# 5. Run tests
npm test

# 6. Update metrics
# Log in SYNC-LOG.md
```

### Conflict Resolution Priority

1. Preserve upstream change intent
2. Re-apply seam injection
3. Verify characterization tests pass
4. Update seam registry if needed

## Metrics

Track monthly:

| Metric | Target | Current | Trend |
|--------|--------|---------|-------|
| Modified upstream files | <10 | | |
| Seam injection points | <20 | | |
| Sync frequency | Weekly | | |
| Sync conflict rate | <5% | | |
| Characterization coverage | >80% | | |

## Commands

| Command | Purpose |
|---------|---------|
| `/analyze-fork` | Check fork health metrics |
| `/map-seams` | Find new seam opportunities |
| `/gen-char-tests` | Generate safety net tests |
| `/refactor-or-rewrite` | Evaluate fork viability |

## References

- Upstream docs: [URL]
- Fork methodology: "Architectural Resilience in Divergent Software Forks"
- Seam identification: Michael Feathers, "Working Effectively with Legacy Code"

---

## Current Tasks

# Task Status

- [ ] [Task description]

## Session Notes

#
```

---

## Variable Placeholders

When generating, replace:

- `[PROJECT_NAME]` - Project name
- `[UPSTREAM_URL]` - Upstream repository URL
- `[PRIMARY_GOALS]` - Comma-separated customization goals
- `[PROJECT]` - Directory name
