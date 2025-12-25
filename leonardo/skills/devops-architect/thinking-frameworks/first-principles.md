# First Principles Thinking Framework

Decompose infrastructure decisions to their fundamental truths and rebuild from there. Challenge every assumption. Find the irreducible elements.

## Core Protocol

```
1. STATE the goal explicitly
2. LIST all assumptions (visible and hidden)
3. CHALLENGE each assumption: "Why do we believe this?"
4. FIND irreducible elements (what MUST be true)
5. REBUILD from fundamentals
```

---

## Application to Infrastructure

### Step 1: State the Goal

Be precise about what you're trying to achieve:

```yaml
bad_goals:
  - "Deploy the application" (too vague)
  - "Use modern infrastructure" (undefined)
  - "Be scalable" (unmeasured)

good_goals:
  - "Serve 1000 users with <500ms response time at <$100/month"
  - "Deploy changes to production in <10 minutes with zero downtime"
  - "Recover from any failure within 5 minutes"
```

### Step 2: List All Assumptions

Explicitly surface everything you're taking for granted:

```yaml
common_assumptions:
  technology:
    - "We need containers"
    - "We need Kubernetes"
    - "We need a managed database"
    - "We need multiple availability zones"

  process:
    - "We need CI/CD"
    - "We need staging environments"
    - "We need infrastructure as code"

  team:
    - "The team can manage this complexity"
    - "We have time to set this up properly"
    - "We can hire DevOps if needed"

  scale:
    - "We'll need to scale to millions of users"
    - "Traffic will be unpredictable"
    - "We need global presence"
```

### Step 3: Challenge Each Assumption

For every assumption, ask penetrating questions:

```yaml
challenge_questions:
  "We need containers":
    - What problem do containers solve for us specifically?
    - Could we deploy directly without containers?
    - What's the cost of containerization vs the benefit?
    - Answer: Maybe not. Vercel deploys Node.js directly.

  "We need Kubernetes":
    - What orchestration problems do we actually have?
    - How many services are we running?
    - Can our team operate Kubernetes effectively?
    - Answer: Almost certainly not for < 10 services.

  "We need a managed database":
    - What's our actual data volume?
    - What's our query complexity?
    - What's the cost of managing our own?
    - Answer: Probably yes - database ops is genuinely complex.

  "We need multiple availability zones":
    - What's our actual uptime requirement?
    - What's the cost of multi-AZ?
    - What's our business cost of an hour of downtime?
    - Answer: Depends on SLA. 99.9% might only need one AZ.
```

### Step 4: Find Irreducible Elements

What MUST be true regardless of implementation?

```yaml
irreducible_elements:
  for_web_app:
    - Code must execute somewhere
    - Data must persist somewhere
    - Users must reach the application
    - Changes must be deployable

  for_production:
    - System must recover from failures
    - Secrets must be protected
    - Access must be authenticated
    - Activity must be observable

  everything_else:
    - Negotiable based on constraints
    - Should be justified with specific requirements
```

### Step 5: Rebuild from Fundamentals

Design the simplest system that satisfies irreducible requirements:

```yaml
rebuild_process:
  1_minimal_viable:
    - What's the simplest way to satisfy each irreducible element?
    - Can we use a single service that handles multiple needs?

  2_add_constraints:
    - Now layer in specific requirements (scale, budget, compliance)
    - Each addition should be justified

  3_verify:
    - Does this solution satisfy the original goal?
    - Have we reintroduced unjustified complexity?
```

---

## Example Application

### Scenario: "Design infrastructure for a new SaaS product"

**Step 1: State Goal**
```
Serve 500 beta users with reliable service at minimal cost,
with ability to scale to 10K users within 6 months.
```

**Step 2: List Assumptions**
```
- We need AWS because it's enterprise-grade
- We need Kubernetes for scaling
- We need Redis for caching
- We need multiple environments (dev, staging, prod)
- We need CI/CD pipeline
- We need Docker containers
```

**Step 3: Challenge Assumptions**

| Assumption | Challenge | Verdict |
|------------|-----------|---------|
| Need AWS | Why not simpler platforms? Scale doesn't require it yet | Rejected |
| Need Kubernetes | 500 users, one service. Overkill. | Rejected |
| Need Redis | What queries are slow? Premature optimization? | Maybe later |
| Need multiple envs | Yes, but can use PR previews instead of staging | Simplified |
| Need CI/CD | Yes, irreducible for reliable deploys | Kept |
| Need Docker | Platform deploys directly. Unnecessary abstraction. | Rejected |

**Step 4: Irreducible Elements**
```
- Code execution: Required
- Data persistence: Required
- User access: Required
- Deploy mechanism: Required
- Failure recovery: Required (at platform level)
```

**Step 5: Rebuild**
```yaml
minimal_solution:
  compute: Vercel (handles execution, no Docker needed)
  database: PlanetScale (handles persistence, backups)
  access: Vercel edge network (handles routing, TLS)
  deploy: git push (automatic via Vercel)
  recovery: Platform-managed (99.99% SLA)

total_complexity: Near zero
monthly_cost: $0-50
time_to_production: Hours, not weeks
```

---

## Anti-Patterns to Avoid

```yaml
anti_patterns:
  resume_driven_development:
    description: "Choosing technology because it looks good on resume"
    fix: "Choose technology that solves actual problems"

  cargo_culting:
    description: "Copying Netflix/Google architecture without their scale"
    fix: "Design for your actual requirements"

  premature_optimization:
    description: "Building for scale you don't have"
    fix: "Solve current problems, design for future flexibility"

  complexity_bias:
    description: "Assuming complex solutions are better"
    fix: "Measure value delivered per unit of complexity"
```

---

## Quick Reference

### Questions to Always Ask

1. **What problem are we actually solving?**
2. **Why do we believe this is necessary?**
3. **What's the simplest solution that works?**
4. **What's the cost of this complexity?**
5. **What would happen if we didn't do this?**

### Decision Framework

```
IF the assumption cannot be challenged
  → It's an irreducible requirement

IF removing the assumption still achieves the goal
  → It's unnecessary complexity

IF the assumption adds value proportional to its complexity
  → It may be justified, but document why
```
