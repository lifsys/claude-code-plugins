# Economic Thinking Framework

Apply rigorous financial analysis to infrastructure decisions. Calculate true Total Cost of Ownership (TCO), model scale economics, factor in opportunity costs, and make data-driven trade-offs.

## Core Protocol

```
1. CALCULATE all visible and hidden costs
2. ADD operational overhead (team time)
3. MODEL costs at different scales
4. COMPARE true TCO across alternatives
5. FACTOR opportunity costs
6. FIND break-even points
```

---

## Economic Principles for Infrastructure

### True Cost Components

```yaml
true_cost:
  visible:
    - Compute (servers, functions)
    - Storage (database, files)
    - Network (bandwidth, CDN)
    - Services (monitoring, logging)
    - Licenses (software, support)

  hidden:
    - Egress bandwidth
    - API call overages
    - Premium support costs
    - Reserved capacity waste
    - Multi-AZ/region costs
    - Cross-service data transfer

  operational:
    - Team time for setup
    - Team time for maintenance
    - Learning curve costs
    - Incident response time
    - On-call burden

  opportunity:
    - Features not built
    - Time to market delay
    - Technical debt accrued
    - Hiring constraints
```

### The TCO Formula

```
TCO = Visible Costs + Hidden Costs + (Team Hours × Hourly Rate) + Opportunity Cost
```

Where:
- **Team Hourly Rate** = Fully loaded cost (salary + benefits + overhead) / working hours
- **Opportunity Cost** = Value of what could have been built instead

---

## Cost Analysis Protocol

### Step 1: Inventory All Costs

Create comprehensive cost inventory:

```yaml
cost_inventory:
  infrastructure:
    compute:
      - Vercel Pro: $20/month
      - Railway: $5 base + usage
      - AWS ECS: $50-100/month minimum

    database:
      - PlanetScale free tier: $0
      - PlanetScale Scaler: $29/month
      - AWS RDS: $50-100/month minimum

    storage:
      - Vercel blob: included
      - S3: $0.023/GB/month

    cdn:
      - Vercel: included
      - CloudFront: $0.085/GB

  services:
    monitoring:
      - Vercel Analytics: included
      - Sentry: $0-26/month
      - Datadog: $15-100/month

    email:
      - SendGrid: $0-20/month
      - Resend: $0-20/month

  hidden:
    bandwidth_egress:
      - AWS: $0.09/GB
      - GCP: $0.12/GB
      - Vercel: $0.15/GB over limit

    api_calls:
      - Database queries (PlanetScale): $0.50/billion reads
      - Function invocations: varies
```

### Step 2: Calculate Operational Costs

Factor in team time:

```yaml
operational_costs:
  team_rates:
    # Fully loaded cost (salary + benefits + overhead)
    junior_engineer: $75/hour
    senior_engineer: $150/hour
    devops_specialist: $175/hour

  time_estimates:
    initial_setup:
      vercel: 2 hours (senior)
      aws_ecs: 40 hours (devops)
      kubernetes: 80 hours (devops)

    monthly_maintenance:
      vercel: 0 hours (managed)
      aws_ecs: 8 hours (senior)
      kubernetes: 20 hours (devops)

    incident_response:
      vercel: 1 hour/incident (managed platform)
      aws_ecs: 4 hours/incident
      kubernetes: 8 hours/incident

  calculated_costs:
    vercel:
      setup: 2 × $150 = $300
      monthly: 0 × $150 = $0
      annual_ops: $300 + $0 = $300

    aws_ecs:
      setup: 40 × $175 = $7,000
      monthly: 8 × $150 = $1,200
      annual_ops: $7,000 + ($1,200 × 12) = $21,400

    kubernetes:
      setup: 80 × $175 = $14,000
      monthly: 20 × $175 = $3,500
      annual_ops: $14,000 + ($3,500 × 12) = $56,000
```

### Step 3: Model Scale Costs

Project costs at different scales:

```yaml
scale_projections:
  metrics:
    mvp:
      daily_active_users: 100
      monthly_requests: 500,000
      database_size: 100 MB
      bandwidth: 10 GB

    growth:
      daily_active_users: 1,000
      monthly_requests: 5,000,000
      database_size: 1 GB
      bandwidth: 100 GB

    scale:
      daily_active_users: 10,000
      monthly_requests: 50,000,000
      database_size: 10 GB
      bandwidth: 1 TB

  cost_at_scale:
    vercel_planetscale:
      mvp: $0 (free tiers)
      growth: $49 ($20 + $29)
      scale: $100-150

    railway:
      mvp: $5
      growth: $30-50
      scale: $100-200

    aws_full:
      mvp: $100+
      growth: $200-400
      scale: $500-1000
```

### Step 4: Compare TCO

Create comparison matrix:

```yaml
tco_comparison:
  year_1_total:
    vercel_planetscale:
      infrastructure: $0-600
      operations: $300
      total: $300-900

    railway:
      infrastructure: $60-600
      operations: $600
      total: $660-1,200

    aws_ecs:
      infrastructure: $1,200-5,000
      operations: $21,400
      total: $22,600-26,400

    kubernetes:
      infrastructure: $900-10,000
      operations: $56,000
      total: $56,900-66,000

  key_insight: |
    "Operational costs dominate for complex infrastructure.
     A 'cheap' Kubernetes cluster costs 10x more than Vercel
     when you include engineering time."
```

### Step 5: Factor Opportunity Costs

What could the team build instead?

```yaml
opportunity_cost:
  scenario:
    devops_hours_saved: 500 hours/year
    engineer_rate: $150/hour
    value_of_time: $75,000/year

  what_could_be_built:
    features: "5-10 major features"
    technical_debt: "Significant reduction"
    user_value: "Faster iteration, more experiments"

  calculation: |
    If Kubernetes costs 500 hours/year more than Vercel,
    and each hour could produce user value,
    the opportunity cost is substantial.

    Even if Kubernetes "saves" $100/month in hosting,
    it "costs" $6,250/month in engineering time.
```

### Step 6: Find Break-Even Points

Determine when alternatives become cost-effective:

```yaml
break_even_analysis:
  vercel_vs_aws:
    question: "At what scale is AWS cheaper?"

    vercel_costs:
      base: $20/month
      bandwidth: $0.15/GB over 1TB
      functions: $0.18/GB-hour

    aws_costs:
      base: $100/month (ECS + RDS minimum)
      bandwidth: $0.09/GB
      operations: $1,200/month (engineer time)

    break_even:
      point: "Never for most companies"
      rationale: |
        Even at very high scale, the operational cost of AWS
        exceeds the hosting cost difference.

        Break-even only if:
        - Team already has AWS expertise (no learning cost)
        - Bandwidth exceeds 10TB/month
        - Need AWS-specific services

  managed_vs_self_hosted:
    question: "When to self-host?"

    managed_db:
      cost: $29-200/month
      operations: 0 hours/month

    self_hosted_db:
      cost: $10-50/month (VPS)
      operations: 8 hours/month

    break_even:
      point: "Only if ops time is free"
      calculation: |
        $200/month managed vs $50/month + 8×$150 ops
        $200 vs $1,250
        Managed wins unless team has spare capacity
```

---

## Economic Decision Template

```markdown
# Infrastructure Economic Analysis

## Cost Comparison

| Option | Monthly Infrastructure | Monthly Operations | Total Monthly |
|--------|----------------------|-------------------|---------------|
| Option A | $X | $Y | $X+Y |
| Option B | $X | $Y | $X+Y |

## 5-Year TCO

| Option | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | Total |
|--------|--------|--------|--------|--------|--------|-------|
| Option A | | | | | | |
| Option B | | | | | | |

## Break-Even Analysis

Option A becomes cheaper than Option B when:
- [Condition 1]
- [Condition 2]

## Opportunity Cost

Choosing Option B instead of A:
- Engineering hours required: X
- Alternative uses for that time: [list]
- Value of those alternatives: $Y

## Recommendation

[Option] because [financial rationale]

## Risks

- [Financial risk 1]
- [Financial risk 2]
```

---

## Quick Reference

### Economic Questions

1. **What's the fully-loaded cost?** (Include ALL costs)
2. **What does team time cost?** (Hours × loaded rate)
3. **What's the opportunity cost?** (What else could be built)
4. **Where's the break-even?** (When does alternative win)
5. **What scales how?** (Linear, step, exponential)

### Cost Estimation Rules of Thumb

```yaml
rules_of_thumb:
  team_costs:
    - "Engineer hours often exceed infrastructure costs"
    - "Managed services are cheaper than self-operated"
    - "Learning curve is a real cost"

  scaling:
    - "Serverless is cheap until it isn't (~100K DAU)"
    - "Reserved instances save 30-40% if utilized"
    - "Egress bandwidth is often forgotten"

  hidden_costs:
    - "Every service has operational overhead"
    - "Migration costs increase over time"
    - "Complexity compounds"
```

### Red Flags

- Choosing "cheaper" option without counting ops time
- Optimizing infrastructure costs when team costs dominate
- Building custom solutions to save hosting costs
- Ignoring opportunity cost of complex systems
- Not modeling costs at future scale
