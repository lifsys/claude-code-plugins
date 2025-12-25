# Platform Comparison Research Protocol

Structured methodology for comparing cloud platforms and infrastructure services. Ensures consistent, comprehensive evaluation across alternatives.

## Research Phases

### Phase 1: Discovery Search

Execute initial broad searches to understand the landscape:

```yaml
discovery_queries:
  general:
    - "[app type] hosting platforms 2025"
    - "best platform for [technology stack] 2025"
    - "[technology] deployment comparison 2025"

  specific:
    - "Vercel vs Railway vs Render comparison"
    - "AWS vs GCP vs Azure for startups"
    - "[platform] for [framework] deployment"

  community:
    - "[platform] review reddit"
    - "[platform] experience hackernews"
    - "[platform] migration story"
```

### Phase 2: Deep Dive Research

For each promising platform, conduct detailed research:

```yaml
per_platform_research:
  official_sources:
    - Official documentation
    - Pricing page
    - Status page (uptime history)
    - Changelog (recent updates)

  search_queries:
    features:
      - "[platform] features list"
      - "[platform] [specific feature] how to"

    limitations:
      - "[platform] limitations"
      - "[platform] gotchas problems"
      - "[platform] maximum limits"

    pricing:
      - "[platform] pricing explained"
      - "[platform] pricing calculator"
      - "[platform] hidden costs"
      - "[platform] expensive at scale"

    real_experience:
      - "[platform] production experience"
      - "[platform] case study"
      - "[platform] migration from"
```

### Phase 3: Comparative Analysis

Structure findings for comparison:

```yaml
comparison_dimensions:
  capabilities:
    - Core features (deployment, scaling, networking)
    - Unique features (edge functions, databases, etc.)
    - Integrations (Git, monitoring, CDN)
    - Limitations (timeouts, size limits, restrictions)

  developer_experience:
    - Setup complexity (time to first deploy)
    - Learning curve (documentation quality)
    - Debugging tools (logs, traces, local dev)
    - CLI/API quality

  operational:
    - Reliability (uptime SLA)
    - Support quality
    - Incident communication
    - Maintenance burden

  financial:
    - Pricing model (per-request, per-hour, fixed)
    - Free tier limits
    - Scale costs
    - Hidden costs

  strategic:
    - Vendor lock-in risk
    - Portability
    - Long-term viability
    - Community/ecosystem
```

---

## Comparison Matrix Template

```markdown
# Platform Comparison: [Category]

## Executive Summary
[2-3 sentence recommendation with key differentiator]

## Comparison Matrix

| Dimension | Platform A | Platform B | Platform C |
|-----------|------------|------------|------------|
| **Best For** | | | |
| **Avoid For** | | | |
| **Pricing Model** | | | |
| **Free Tier** | | | |
| **Learning Curve** | | | |
| **Uptime SLA** | | | |

## Detailed Comparison

### Deployment & Scaling
| Feature | Platform A | Platform B | Platform C |
|---------|------------|------------|------------|
| Deploy method | | | |
| Auto-scaling | | | |
| Preview environments | | | |
| Rollback | | | |

### Database & Storage
| Feature | Platform A | Platform B | Platform C |
|---------|------------|------------|------------|
| Built-in DB | | | |
| External DB support | | | |
| Object storage | | | |
| Backups | | | |

### Networking & Security
| Feature | Platform A | Platform B | Platform C |
|---------|------------|------------|------------|
| Custom domains | | | |
| SSL/TLS | | | |
| WAF | | | |
| DDoS protection | | | |

### Observability
| Feature | Platform A | Platform B | Platform C |
|---------|------------|------------|------------|
| Logs | | | |
| Metrics | | | |
| Tracing | | | |
| Alerting | | | |

## Pricing Analysis

### At MVP Scale (100 DAU)
| Platform | Monthly Cost | Notes |
|----------|-------------|-------|
| Platform A | $X | |
| Platform B | $X | |
| Platform C | $X | |

### At Growth Scale (1,000 DAU)
| Platform | Monthly Cost | Notes |
|----------|-------------|-------|
| Platform A | $X | |
| Platform B | $X | |
| Platform C | $X | |

### At Scale (10,000 DAU)
| Platform | Monthly Cost | Notes |
|----------|-------------|-------|
| Platform A | $X | |
| Platform B | $X | |
| Platform C | $X | |

## Decision Framework

### Choose Platform A when:
- [Condition 1]
- [Condition 2]

### Choose Platform B when:
- [Condition 1]
- [Condition 2]

### Choose Platform C when:
- [Condition 1]
- [Condition 2]

## Sources
- [Source 1]
- [Source 2]
- [Source 3]
```

---

## Platform Category Templates

### Serverless Platforms (Vercel, Netlify, Cloudflare Pages)

```yaml
research_focus:
  build:
    - Build time limits
    - Build caching
    - Monorepo support

  functions:
    - Execution time limits
    - Memory limits
    - Cold start times
    - Edge function support

  features:
    - Preview deployments
    - Serverless functions
    - Edge middleware
    - Image optimization
    - ISR/SSG support

  integrations:
    - Git providers
    - Databases
    - CMS platforms
    - Analytics
```

### Container Platforms (Cloud Run, Fly.io, Railway)

```yaml
research_focus:
  containers:
    - Supported runtimes
    - Image size limits
    - Build system

  scaling:
    - Scale to zero
    - Min/max instances
    - Scaling speed
    - Concurrent requests

  features:
    - Persistent storage
    - Background workers
    - Cron jobs
    - WebSocket support

  operations:
    - Health checks
    - Zero-downtime deploys
    - Rollback
```

### Full Cloud (AWS, GCP, Azure)

```yaml
research_focus:
  services:
    - Relevant services for use case
    - Service limits
    - Regional availability

  complexity:
    - Setup complexity
    - IAM/permissions
    - Networking (VPC)
    - Service integration

  costs:
    - Per-service pricing
    - Data transfer costs
    - Support plans
    - Reserved vs on-demand

  operations:
    - Monitoring options
    - Automation tools
    - Infrastructure as code
```

---

## Quality Checklist

Before completing comparison:

- [ ] All platforms researched with same rigor
- [ ] Pricing verified from official sources
- [ ] Limitations confirmed (not assumptions)
- [ ] Real user experiences consulted
- [ ] Comparison dimensions consistent
- [ ] Decision framework actionable
- [ ] Sources cited and dated
