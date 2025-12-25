# Contrarian Thinking Framework

Deliberately argue against the obvious choice. Find scenarios where the unconventional wins. Document the decision boundaries that make one approach better than another.

## Core Protocol

```
1. IDENTIFY the "obvious" or default choice
2. ARGUE against it forcefully and honestly
3. FIND scenarios where the opposite wins
4. DOCUMENT the decision boundary
5. MAKE an informed choice (may still be the obvious one)
```

---

## Purpose

Contrarian thinking prevents:
- Groupthink and cargo culting
- Vendor lock-in through inertia
- Over-engineering through assumed requirements
- Cost overruns from "safe" but expensive choices

It ensures:
- Decisions are actively chosen, not defaulted to
- Trade-offs are explicit and understood
- Alternatives are considered fairly
- The team knows when to switch approaches

---

## Application Process

### Step 1: Identify the Obvious Choice

What would most people choose without deep analysis?

```yaml
common_obvious_choices:
  cloud_provider: "AWS - it's the market leader"
  container_orchestration: "Kubernetes - it's the standard"
  database: "PostgreSQL - it's reliable"
  frontend_hosting: "Vercel - it's popular for React"
  ci_cd: "GitHub Actions - it's integrated"
  monitoring: "Datadog - it's comprehensive"
```

### Step 2: Argue Against It

Build the strongest possible case AGAINST the obvious choice:

```yaml
against_aws:
  complexity:
    - "200+ services create decision paralysis"
    - "Console UX is notoriously confusing"
    - "IAM policies require a PhD to understand"

  cost:
    - "Expensive compared to alternatives"
    - "Egress bandwidth costs are predatory"
    - "Easy to accidentally leave resources running"

  lock_in:
    - "Proprietary services don't port well"
    - "Skills don't transfer to other clouds"
    - "Migration cost increases over time"

  for_your_use_case:
    - "You're not Netflix. You don't need this."
    - "Your team of 3 can't operate this"
    - "Your $100/mo budget doesn't justify this"

against_kubernetes:
  complexity:
    - "Massive operational overhead"
    - "Requires dedicated expertise"
    - "YAML configuration is verbose and error-prone"

  overkill:
    - "You have 1 service, not 100"
    - "You don't need rolling updates for 10 users"
    - "Auto-scaling is pointless below 1000 RPS"

  cost:
    - "Control plane costs $75/mo minimum"
    - "Learning curve costs months of productivity"
    - "Debugging costs are hidden but real"

against_postgresql:
  operational:
    - "Backups, replication, failover are your problem"
    - "Connection pooling needs PgBouncer"
    - "Schema migrations require care"

  alternatives:
    - "SQLite handles more than you think"
    - "Managed databases remove operational burden"
    - "Document databases might fit better"
```

### Step 3: Find Where Opposite Wins

Identify conditions where the contrarian choice is correct:

```yaml
when_simple_beats_aws:
  team_size: "< 5 engineers"
  budget: "< $500/month"
  scale: "< 10,000 daily active users"
  compliance: "No specific requirements"
  timeline: "Need to ship in weeks, not months"

when_no_kubernetes:
  services: "< 5 distinct services"
  team: "No Kubernetes expertise"
  scale: "< 100 requests per second"
  deployment: "Can tolerate 30s downtime for deploys"

when_sqlite:
  data_volume: "< 10GB total"
  write_rate: "< 100 writes per second"
  architecture: "Single server deployment"
  reads: "Mostly by single user at a time"
```

### Step 4: Document Decision Boundaries

Create explicit boundaries for when to switch:

```yaml
decision_boundaries:
  simple_hosting_to_aws:
    trigger: "Need 3+ of: VPC, IAM, Lambda, RDS, S3"
    scale: "> 50,000 DAU"
    compliance: "SOC2/HIPAA/PCI required"
    team: "Dedicated DevOps hire justified"

  single_service_to_kubernetes:
    trigger: "> 10 distinct services"
    team: "Kubernetes expertise available"
    scale: "> 10,000 RPS"
    requirements: "Complex networking, service mesh needs"

  sqlite_to_postgres:
    trigger: "Write contention issues"
    scale: "> 100 concurrent writers"
    features: "Need full-text search, JSON queries"
    distribution: "Need multiple server access"
```

---

## Contrarian Arguments Library

### Against Every Popular Choice

```yaml
against_vercel:
  - "Expensive at scale (function invocations)"
  - "Limited backend customization"
  - "Vendor lock-in with edge functions"
  - "No long-running processes"
  → When to avoid: Heavy backend, WebSockets, budget-constrained at scale

against_react:
  - "Massive bundle size"
  - "Hooks complexity for simple apps"
  - "Ecosystem churn and fatigue"
  → When to avoid: Simple CRUD, SEO-critical, small team

against_typescript:
  - "Build step overhead"
  - "Type gymnastics for complex types"
  - "False sense of safety"
  → When to avoid: Rapid prototyping, solo developer

against_microservices:
  - "Network latency and failures"
  - "Distributed debugging nightmare"
  - "Operational overhead multiplied"
  → When to avoid: < 20 person team, < $1M revenue

against_graphql:
  - "Complexity for simple CRUD"
  - "Caching is harder than REST"
  - "N+1 query problems"
  → When to avoid: Simple API, no complex data graphs

against_docker:
  - "Additional abstraction layer"
  - "Image size and build time"
  - "Debugging is harder"
  → When to avoid: Platform deploys directly, simple apps

against_terraform:
  - "State file management headaches"
  - "Provider version conflicts"
  - "Learning curve for simple infra"
  → When to avoid: Single cloud, simple resources, ClickOps is faster
```

---

## Decision Documentation Template

After contrarian analysis, document your decision:

```markdown
# Decision: [Technology/Approach Chosen]

## The Obvious Choice
[What most people would pick]

## Contrarian Arguments
[Why NOT to pick the obvious choice]

## Our Situation
[Our specific constraints and requirements]

## Decision Boundary
[When we would reconsider this decision]

## Final Choice
[What we're going with and why]

## Revisit Triggers
[Specific conditions that should prompt reconsideration]
```

---

## Example Application

### Scenario: Database for a new SaaS

**Obvious Choice**: PostgreSQL on AWS RDS

**Contrarian Arguments**:
- RDS costs $50+/month even for tiny instances
- We're not using any Postgres-specific features
- Our data model is simple key-value
- We have < 1GB of data projected

**Where Opposite Wins**:
- SQLite: $0, zero ops, good for single-server
- DynamoDB: Pay-per-request, scales infinitely
- PlanetScale: Free tier, managed, branches for dev

**Decision Boundary**:
- Switch to Postgres when: Write contention, complex queries, > 10GB

**Final Choice**: PlanetScale
- Free tier covers MVP
- Managed = zero ops
- Can migrate to self-hosted MySQL later if needed

**Revisit Triggers**:
- Hitting free tier limits
- Need Postgres-specific features
- Cost exceeds self-managed option

---

## Quick Reference

### Contrarian Questions

1. **"Why NOT [obvious choice]?"**
2. **"Who has succeeded without this?"**
3. **"What's the simplest alternative?"**
4. **"At what scale does this make sense?"**
5. **"What would a 2-person startup do?"**

### Red Flags for Obvious Choices

- "Everyone uses it" (popularity ≠ fit)
- "It's enterprise-grade" (maybe overkill)
- "It'll scale when we need it" (premature)
- "It's what I know" (comfort ≠ optimal)
- "It's the safe choice" (safe for whom?)
