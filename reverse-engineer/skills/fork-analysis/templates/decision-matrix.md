# Refactor vs Rewrite Decision Matrix

## Scoring Template

Fill in scores (1-5) for each factor based on assessment:

| Factor | Score (1-5) | Weight | Weighted Score | Notes |
|--------|-------------|--------|----------------|-------|
| Upstream Health | | 0.25 | | |
| Capability Gap | | 0.20 | | |
| Data Gravity | | 0.15 | | |
| Resource Constraints | | 0.20 | | |
| Architecture Quality | | 0.20 | | |
| **TOTAL** | | **1.00** | | |

## Scoring Guide

### Upstream Health (Weight: 0.25)

How healthy is the upstream project?

| Score | Description |
|-------|-------------|
| 5 | Excellent: Active development, responsive maintainers, regular releases, strong community |
| 4 | Good: Regular updates, moderate community, stable releases |
| 3 | Fair: Sporadic updates, some maintenance, declining activity |
| 2 | Poor: Infrequent updates, security concerns, minimal community |
| 1 | Dead: Abandoned, no updates, known vulnerabilities |

**Assessment questions:**
- When was the last release?
- How many active contributors?
- How quickly are security issues addressed?
- Is there a roadmap for future development?

### Capability Gap (Weight: 0.20)

How much custom functionality do you need beyond upstream?

| Score | Description |
|-------|-------------|
| 5 | Minimal (<20%): Minor extensions, mostly configuration |
| 4 | Moderate (20-40%): Some custom features, mostly additive |
| 3 | Significant (40-60%): Many custom features, some core changes |
| 2 | Major (60-80%): Substantial divergence, different use case |
| 1 | Total (>80%): Fundamentally different application |

**Assessment questions:**
- What percentage of features are custom?
- How many upstream features do you actually use?
- Could you achieve goals with a different upstream?

### Data Gravity (Weight: 0.15)

How much existing data/users are tied to current system?

| Score | Description |
|-------|-------------|
| 5 | Extensive: Years of production data, large user base, complex migrations |
| 4 | Moderate: Significant data, manageable migration path |
| 3 | Minimal: Some data, straightforward migration |
| 2 | Limited: Little data, easy to migrate |
| 1 | None: Greenfield project, no existing constraints |

**Assessment questions:**
- How much data needs migration?
- How many active users?
- What's the cost of data loss/downtime?

### Resource Constraints (Weight: 0.20)

What resources do you have for long-term maintenance?

| Score | Description |
|-------|-------------|
| 5 | Limited: Small team, prefer upstream dependency |
| 4 | Moderate: Can handle extensions, not core maintenance |
| 3 | Sufficient: Can maintain fork with reasonable effort |
| 2 | Full: Dedicated team available for fork maintenance |
| 1 | Unlimited: Can maintain entire stack independently |

**Assessment questions:**
- How many developers can work on fork?
- What's the maintenance budget?
- Is there expertise in upstream technology?

### Architecture Quality (Weight: 0.20)

How well-structured is the current codebase?

| Score | Description |
|-------|-------------|
| 5 | Clean: Modular, well-documented, test coverage >80% |
| 4 | Good: Reasonable structure, some documentation, tests exist |
| 3 | Fair: Mixed quality, some debt, partial test coverage |
| 2 | Tangled: High coupling, poor documentation, few tests |
| 1 | Spaghetti: God objects, no structure, untestable |

**Assessment questions:**
- Can you understand the code without original authors?
- How long to onboard new developers?
- What's the test coverage?
- How many "don't touch this" areas exist?

## Decision Thresholds

| Weighted Score | Recommendation |
|----------------|----------------|
| > 3.5 | **REFACTOR** (Soft Fork) |
| 2.5 - 3.5 | **HYBRID** (Selective refactoring) |
| < 2.5 | **REWRITE** (Consider new implementation) |

## Recommendation Templates

### REFACTOR Recommendation (Score > 3.5)

```markdown
## Recommendation: REFACTOR (Soft Fork)

**Score:** [X.X] / 5.0

### Rationale
Upstream is healthy enough to maintain connection. The capability gap can be
addressed through extension patterns without severing the upstream lifeline.

### Immediate Actions
1. Set up upstream remote if not configured
2. Establish weekly sync schedule
3. Run /analyze-fork to assess current state
4. Identify files for architectural isolation

### Architectural Strategy
- Implement Leave and Layer pattern
- Create extension directories
- Define seam injection points
- Generate characterization tests for modified areas

### Expected Outcomes
- Maintain access to upstream security patches
- Reduce sync effort to <4 hours/week
- Clear separation between core and custom
```

### HYBRID Recommendation (Score 2.5-3.5)

```markdown
## Recommendation: HYBRID Approach

**Score:** [X.X] / 5.0

### Rationale
Mixed signals indicate selective refactoring is appropriate. Some components
can maintain upstream connection while others may need complete replacement.

### Immediate Actions
1. Identify components for each strategy
2. Prioritize based on risk and value
3. Create phased migration plan

### Component Classification
| Component | Strategy | Priority |
|-----------|----------|----------|
| [Auth] | Refactor to extension | High |
| [Payment] | Full replacement | Medium |
| [UI] | Keep current | Low |

### Phased Approach
1. **Phase 1:** Characterization tests for all modified areas
2. **Phase 2:** Extract high-value components to extensions
3. **Phase 3:** Rewrite problematic modules
4. **Phase 4:** Establish ongoing sync for remaining areas
```

### REWRITE Recommendation (Score < 2.5)

```markdown
## Recommendation: REWRITE

**Score:** [X.X] / 5.0

### Rationale
The cost of maintaining this fork exceeds the benefits. Upstream issues,
capability requirements, or architectural debt make a fresh start more
economical.

### Before Proceeding
1. Document all current functionality
2. Export business logic and algorithms
3. Map data models and migration requirements
4. Identify reusable components

### Rewrite Strategy Options
| Option | Pros | Cons |
|--------|------|------|
| New upstream | Community support | May repeat problems |
| Custom build | Full control | Full maintenance burden |
| SaaS/managed | Low maintenance | Vendor lock-in |

### Risk Mitigation
- Characterization tests capture current behavior
- Phased migration with parallel running
- Extensive QA before cutover
- Rollback plan for critical issues
```

## Usage

1. Gather data for each factor
2. Score each factor 1-5
3. Calculate weighted score
4. Apply recommendation based on threshold
5. Document decision and rationale
