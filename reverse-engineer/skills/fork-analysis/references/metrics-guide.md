# Fork Health Metrics Guide

## Quick Reference Commands

### Divergence Metrics

```bash
# Count commits ahead of upstream
git rev-list --count upstream/main..HEAD

# List divergent files
git diff --name-only upstream/main..HEAD

# Show stats for divergent files
git diff --stat upstream/main..HEAD
```

### Coupling Analysis

```bash
# Find files with most imports (high Ce)
grep -rh "^import\|^from .* import" --include="*.py" | sort | uniq -c | sort -rn

# TypeScript equivalent
grep -rh "^import" --include="*.ts" --include="*.tsx" | sort | uniq -c | sort -rn
```

### Churn Analysis

```bash
# Files changed most frequently (6 months)
git log --format=format: --name-only --since="6 months ago" | \
  sort | uniq -c | sort -rn | head -30

# Changes per author (identify knowledge silos)
git shortlog -sn --since="6 months ago"

# Files with most different authors (shared ownership)
git log --format='%an' --name-only --since="6 months ago" | \
  awk '/^$/{author=""} /^[a-zA-Z]/{author=$0} /^[^a-zA-Z]/{print author, $0}' | \
  sort | uniq | cut -d' ' -f2- | sort | uniq -c | sort -rn | head -20
```

### Sync Simulation

```bash
# Preview rebase conflicts (dry run)
git fetch upstream
git checkout -b test-rebase HEAD
git rebase upstream/main 2>&1 | tee rebase-preview.log
git rebase --abort
git checkout -
git branch -D test-rebase

# Count conflict markers
grep -c "CONFLICT" rebase-preview.log
```

## Metric Calculations

### Instability Index

For each module/file:

```python
def calculate_instability(module_path):
    # Ce: count outgoing imports
    ce = count_imports(module_path)

    # Ca: count files importing this module
    ca = count_importers(module_path)

    if ca + ce == 0:
        return 0  # Isolated module

    return ce / (ca + ce)
```

**Interpretation:**
- 0.0-0.3: Stable (many depend on it)
- 0.3-0.7: Moderate
- 0.7-1.0: Unstable (depends on many)

### Divergence Risk Score

```python
def divergence_risk(file_path):
    local_changes = count_local_changes(file_path)
    upstream_churn = count_upstream_commits(file_path, months=6)
    complexity = cyclomatic_complexity(file_path)

    risk = (local_changes * 0.4) + (upstream_churn * 0.4) + (complexity * 0.2)
    return min(risk / 100, 1.0)  # Normalize to 0-1
```

## Visualization Templates

### Fork Health Dashboard

```
╔══════════════════════════════════════════════════════════╗
║                    FORK HEALTH STATUS                     ║
╠══════════════════════════════════════════════════════════╣
║ Phase: [EARLY/MIDDLE/LATE/HARD]          Status: [🟢/🟡/🔴] ║
╠══════════════════════════════════════════════════════════╣
║ Divergent Commits:    ███████░░░░░░░░░░░░░  42/200       ║
║ Modified Core Files:  ████░░░░░░░░░░░░░░░░  8/50         ║
║ Sync Effort (est):    ██░░░░░░░░░░░░░░░░░░  4 hours      ║
║ Last Sync:            ████████████░░░░░░░░  14 days ago  ║
╠══════════════════════════════════════════════════════════╣
║ RECOMMENDATION: Maintain weekly sync schedule             ║
╚══════════════════════════════════════════════════════════╝
```

### Hotspot Matrix

```
             Low Churn    High Churn
           ┌───────────┬───────────┐
High       │    🟢      │    🔴      │
Divergence │  SAFE      │  CRITICAL │
           ├───────────┼───────────┤
Low        │    ⚪      │    🟡      │
Divergence │  IGNORE    │  WATCH    │
           └───────────┴───────────┘
```

## Automated Monitoring

### GitHub Actions Workflow

```yaml
name: Fork Health Check

on:
  schedule:
    - cron: '0 9 * * 1'  # Weekly Monday 9am
  workflow_dispatch:

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Add upstream
        run: git remote add upstream ${{ vars.UPSTREAM_URL }}

      - name: Fetch upstream
        run: git fetch upstream

      - name: Calculate metrics
        id: metrics
        run: |
          DIVERGENT=$(git rev-list --count upstream/main..HEAD)
          MODIFIED=$(git diff --name-only upstream/main..HEAD | wc -l)
          echo "divergent=$DIVERGENT" >> $GITHUB_OUTPUT
          echo "modified=$MODIFIED" >> $GITHUB_OUTPUT

      - name: Alert if critical
        if: steps.metrics.outputs.divergent > 200 || steps.metrics.outputs.modified > 50
        run: |
          echo "::warning::Fork health critical! Divergent: ${{ steps.metrics.outputs.divergent }}, Modified: ${{ steps.metrics.outputs.modified }}"
```

## Threshold Configuration

Customize thresholds based on project scale:

| Project Size | Early/Middle | Middle/Late | Late/Hard |
|--------------|--------------|-------------|-----------|
| Small (<10k LOC) | 25 commits | 100 commits | 250 commits |
| Medium (10-100k) | 50 commits | 200 commits | 500 commits |
| Large (>100k) | 100 commits | 400 commits | 1000 commits |
