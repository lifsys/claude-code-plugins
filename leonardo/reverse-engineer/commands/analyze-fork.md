---
name: analyze-fork
description: Analyze fork health, divergence debt, and upstream synchronization metrics
argument-hint: "[path-to-fork] [--upstream=url]"
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
---

# Fork Health Analysis

Perform comprehensive analysis of a divergent fork following the Divergence Debt Trajectory model.

## Execution Process

### Phase 1: Repository Setup Verification

1. **Check Git Configuration**
   ```bash
   git remote -v
   ```
   - Verify `origin` (fork) and `upstream` remotes are configured
   - If upstream missing, prompt user to add: `git remote add upstream <url>`

2. **Branch Analysis**
   ```bash
   git branch -a
   git log --oneline origin/main..HEAD | wc -l
   ```
   - Count commits ahead of upstream
   - Identify local-only branches

### Phase 2: Divergence Debt Assessment

Classify fork into lifecycle phase:

| Phase | Indicator | Action |
|-------|-----------|--------|
| Early Fork | <50 divergent commits, <10 modified core files | Maintain with rebase |
| Middle Fork | 50-200 commits, 10-50 modified files | Consider patch stack |
| Late Fork | 200+ commits, 50+ modified files | Needs architectural intervention |
| Hard Fork | Merge conflicts in >50% of files | Evaluate rewrite |

**Analysis Commands:**

```bash
# Count divergent commits
git rev-list --count upstream/main..HEAD

# Find modified upstream files
git diff --name-only upstream/main...HEAD | wc -l

# Identify high-conflict files
git diff --stat upstream/main...HEAD | sort -t'|' -k2 -rn | head -20
```

### Phase 3: Coupling Metrics

Calculate Afferent and Efferent Coupling:

1. **Afferent Coupling (Ca)** - Who depends on this module?
   - Use Grep to find import statements referencing each module
   - High Ca = Changes here break many dependents

2. **Efferent Coupling (Ce)** - What does this module depend on?
   - Parse import statements in each file
   - High Ce = Module is fragile, many ways to break

3. **Instability Index**
   - I = Ce / (Ca + Ce)
   - I close to 1 = Unstable (many outgoing dependencies)
   - I close to 0 = Stable (many incoming dependencies)

### Phase 4: Churn Analysis

Identify "hotspots" - high-churn files that are also in the divergence set:

```bash
# Get files changed most frequently in last 6 months
git log --format=format: --name-only --since="6 months ago" | \
  sort | uniq -c | sort -rn | head -30
```

**Risk Matrix:**
- High Churn + High Divergence = 🔴 Critical (likely merge conflicts)
- High Churn + Low Divergence = 🟡 Watch (upstream changing rapidly)
- Low Churn + High Divergence = 🟢 Safe (stable local customization)

### Phase 5: Upstream Sync Cost Estimate

Calculate effort to sync with upstream:

```bash
# Simulate rebase to count conflicts
git fetch upstream
git rebase --dry-run upstream/main 2>&1 | grep -c "CONFLICT"
```

Estimate sync cost:
- 0 conflicts: Trivial (<1 hour)
- 1-10 conflicts: Manageable (1-4 hours)
- 11-50 conflicts: Significant (1-2 days)
- 50+ conflicts: Major effort (week+)

### Output Format

```markdown
## Fork Health Report

### Summary
| Metric | Value | Status |
|--------|-------|--------|
| Fork Phase | [Early/Middle/Late/Hard] | [🟢/🟡/🔴] |
| Divergent Commits | [N] | |
| Modified Core Files | [N] | |
| Estimated Sync Cost | [hours/days] | |

### Divergence Debt Trajectory
[ASCII visualization of debt accumulation]

### High-Risk Files (Hotspots)
| File | Local Changes | Upstream Churn | Risk |
|------|---------------|----------------|------|
| [file] | [lines] | [commits/6mo] | [🔴/🟡/🟢] |

### Coupling Analysis
| Module | Ca | Ce | Instability |
|--------|----|----|-------------|
| [module] | [N] | [N] | [0.0-1.0] |

### Recommendations

#### Immediate Actions
1. [Action based on fork phase]

#### Architectural Changes
- [Suggestion for reducing divergence surface]

#### Sync Strategy
- [Rebase vs Patch Stack recommendation]

### Related Commands
- `/map-seams` - Find injection points for decoupling
- `/refactor-or-rewrite` - Full decision matrix if major changes needed
```

## Tips

- Run this command regularly (weekly for active forks) to track trajectory
- If sync cost is rising, consider architectural intervention before it becomes prohibitive
- Use output to prioritize which customizations to convert to plugins first
