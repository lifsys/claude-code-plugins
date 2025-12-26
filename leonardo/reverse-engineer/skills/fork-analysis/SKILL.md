---
name: Fork Analysis
description: This skill should be used when analyzing divergent software forks, understanding divergence debt trajectories, evaluating upstream sync costs, calculating coupling metrics (Ca/Ce), identifying fork lifecycle phases, or assessing the viability of maintaining a soft fork versus creating a hard fork.
version: 0.1.0
---

# Fork Analysis

Comprehensive methodology for analyzing and managing divergent software forks, based on the principles of minimizing divergence surface while maintaining upstream synchronization capability.

## Core Concepts

### Divergence Debt

Divergence debt is the compounding technical liability that accumulates when fork modifications are not architecturally isolated. Like financial debt, it accrues "interest" - the cost of reconciling upstream changes grows with each modification.

**Debt accumulation factors:**
- Direct source modifications (vs. extension patterns)
- Modifications to high-churn upstream files
- Tight coupling between custom and upstream code
- Semantic conflicts (not just textual)

### Fork Lifecycle Phases

| Phase | Indicators | Sync Strategy | Risk Level |
|-------|------------|---------------|------------|
| **Early Fork** | <50 divergent commits, <10 modified files | Standard rebase | 🟢 Low |
| **Middle Fork** | 50-200 commits, 10-50 modified files | Patch stack (StGit) | 🟡 Medium |
| **Late Fork** | 200+ commits, 50+ modified files | Architectural intervention | 🔴 High |
| **Hard Fork** | >50% merge conflict rate | Rewrite evaluation | ⚫ Critical |

### Soft Fork vs Hard Fork

**Soft Fork Strategy:**
- Maintain upstream compatibility
- Customizations as additive layer
- Regular sync with upstream
- Benefit from community security/features

**Hard Fork Reality:**
- Permanent political/technical split
- Full maintenance burden assumed
- Cut off from upstream improvements
- Requires team capacity for full stack

## Metrics Framework

### Coupling Metrics

**Afferent Coupling (Ca):** Incoming dependencies
- Who depends on this module?
- High Ca = Changes here break many consumers
- Indicates module stability importance

**Efferent Coupling (Ce):** Outgoing dependencies
- What does this module depend on?
- High Ce = Module is fragile
- Many ways for external changes to break it

**Instability Index:**
```
I = Ce / (Ca + Ce)
```
- I → 1.0: Unstable (many outgoing, few incoming)
- I → 0.0: Stable (many incoming, few outgoing)

**Fork Rule:** Custom code should have high I (depend on stable upstream), upstream core should have low I (depended upon but not modified).

### Churn Analysis

High-churn files in upstream are dangerous for seam injection:

```bash
# Find high-churn files in last 6 months
git log --format=format: --name-only --since="6 months ago" | \
  sort | uniq -c | sort -rn | head -30
```

**Risk Matrix:**

| Churn | Divergence | Risk | Action |
|-------|------------|------|--------|
| High | High | 🔴 Critical | Refactor to extension |
| High | Low | 🟡 Watch | Monitor closely |
| Low | High | 🟢 Safe | Stable customization |
| Low | Low | ⚪ Ignore | Not relevant |

### Sync Cost Estimation

```bash
# Simulate rebase to count conflicts
git fetch upstream
git rebase --dry-run upstream/main 2>&1 | grep -c "CONFLICT"
```

| Conflicts | Estimated Effort | Recommendation |
|-----------|------------------|----------------|
| 0 | <1 hour | Routine sync |
| 1-10 | 1-4 hours | Manageable |
| 11-50 | 1-2 days | Schedule carefully |
| 50+ | Week+ | Consider architectural changes |

## Analysis Workflow

### Step 1: Repository Assessment

1. Verify upstream remote configured
2. Fetch latest upstream
3. Count divergent commits
4. Identify modified core files

### Step 2: Coupling Analysis

For each modified file:
1. Count imports (Ce)
2. Find consumers (Ca)
3. Calculate Instability Index
4. Flag unstable custom code depending on stable upstream

### Step 3: Churn Cross-Reference

1. Get upstream churn data
2. Cross-reference with divergence set
3. Identify critical hotspots
4. Prioritize architectural fixes

### Step 4: Recommendations

Based on analysis, recommend:
- Immediate sync actions
- Files to refactor into extensions
- Seams to inject for decoupling
- Timeline for architectural changes

## Related Resources

- **Decision Matrix Template:** `templates/decision-matrix.md`
- **Detailed Metrics Guide:** `references/metrics-guide.md`
- **Divergence Debt Deep Dive:** `references/divergence-debt.md`

## Related Commands

- `/analyze-fork` - Execute fork health analysis
- `/refactor-or-rewrite` - Full decision matrix evaluation
- `/map-seams` - Find decoupling opportunities
