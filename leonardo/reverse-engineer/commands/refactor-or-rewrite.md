---
name: refactor-or-rewrite
description: Execute the Decision Matrix to determine whether to refactor or rewrite a codebase
argument-hint: "[path-to-analyze]"
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
  - AskUserQuestion
---

# Refactor or Rewrite Decision Matrix

Execute a semi-automated decision analysis following the methodology from "Architectural Resilience in Divergent Software Forks."

## Execution Process

### Phase 1: Automated Codebase Analysis

Perform the following automated assessments:

1. **Repository Health Scan**
   - Check git history: `git log --oneline -100` for commit frequency
   - Analyze contributor count: `git shortlog -sn`
   - Check last update date vs current date
   - Identify open issues/PRs if GitHub remote exists

2. **Architecture Assessment**
   - Use Glob to map file structure
   - Use Grep to identify:
     - God Objects: classes with >500 lines
     - Circular dependencies: import patterns
     - Global state: singleton patterns, global variables
     - Hardcoded dependencies: `new ClassName()` patterns

3. **Coupling Metrics**
   - Count import statements per file (Afferent Coupling)
   - Identify files importing each module (Efferent Coupling)
   - Calculate Instability Index: Ce / (Ca + Ce)

4. **Code Churn Analysis**
   ```bash
   git log --format=format: --name-only --since="6 months ago" | sort | uniq -c | sort -rn | head -20
   ```

### Phase 2: User Assessment (Interactive)

After automated analysis completes, use AskUserQuestion to gather subjective assessments:

**Question 1: Upstream Health**
- "How would you rate the upstream project's health?"
- Options: Excellent (active, well-maintained) | Good (regular updates) | Fair (sporadic updates) | Poor (abandoned/dying)

**Question 2: Capability Gap**
- "What percentage of new functionality do you need beyond upstream?"
- Options: <20% (minor extensions) | 20-40% (moderate) | 40-60% (significant) | >60% (major divergence)

**Question 3: Data Gravity**
- "How much existing data/user migration is required?"
- Options: Extensive (years of data) | Moderate | Minimal | Greenfield

**Question 4: Resource Constraints**
- "What are your team resources for long-term maintenance?"
- Options: Limited (prefer upstream dependency) | Moderate | Sufficient | Full team available

### Phase 3: Score Calculation

Present the Decision Matrix as a table:

```
| Factor              | Score (1-5) | Weight | Weighted Score |
|---------------------|-------------|--------|----------------|
| Upstream Health     | [auto/user] |   0.25 |                |
| Capability Gap      | [user]      |   0.20 |                |
| Data Gravity        | [user]      |   0.15 |                |
| Resource Constraints| [user]      |   0.20 |                |
| Architecture Quality| [auto]      |   0.20 |                |
|---------------------|-------------|--------|----------------|
| TOTAL               |             |   1.00 |                |
```

**Scoring Guide:**
- Upstream Health: 5=Excellent, 4=Good, 3=Fair, 2=Poor, 1=Dead
- Capability Gap: 5=<20%, 4=20-40%, 3=40-60%, 2=60-80%, 1=>80%
- Data Gravity: 5=Extensive, 4=Moderate, 3=Minimal, 2=None, 1=Greenfield
- Resource Constraints: 5=Limited, 4=Moderate, 3=Sufficient, 2=Full, 1=Unlimited
- Architecture Quality: 5=Clean, 4=Good, 3=Fair, 2=Tangled, 1=Spaghetti

### Phase 4: Recommendation

Based on weighted score:

**Score > 3.5: REFACTOR (Soft Fork)**
- Upstream is healthy enough to maintain connection
- Use Leave and Layer pattern (skill: modular-architecture)
- Implement Event Bus for custom logic
- Suggest running `/init-fork` to set up project structure

**Score 2.5-3.5: HYBRID APPROACH**
- Selective refactoring of critical paths
- Consider Branch by Abstraction for high-churn components
- May need phased migration strategy

**Score < 2.5: REWRITE**
- Cost of maintaining fork exceeds benefits
- Upstream too unstable or divergence too great
- Document requirements from existing system before rebuilding

### Output Format

Present results as:

```markdown
## Decision Matrix Results

### Automated Analysis
[Summary of findings]

### User Assessment Scores
[Table of scores]

### Recommendation: [REFACTOR | HYBRID | REWRITE]

**Rationale:** [2-3 sentences explaining the decision]

### Next Steps
1. [Action item based on recommendation]
2. [Action item]
3. [Action item]

### Related Commands
- `/init-fork` - Set up fork project structure
- `/map-seams` - Identify refactoring injection points
- `/analyze-fork` - Deep dive into fork health metrics
```

## Tips

- If user provides a GitHub URL, fetch project metadata for upstream health assessment
- For monorepos, ask which package/module to analyze
- Cache analysis results in session for follow-up commands
