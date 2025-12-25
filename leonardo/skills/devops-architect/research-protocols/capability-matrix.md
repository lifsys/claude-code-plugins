# Capability Matrix Research Protocol

Systematic approach to evaluating platform capabilities against project requirements. Ensures objective feature comparison and fit assessment.

## Matrix Structure

### Requirement Categories

```yaml
categories:
  compute:
    - Runtime support
    - Execution limits
    - Scaling behavior
    - Background processing

  data:
    - Database options
    - Storage services
    - Caching solutions
    - Backup/restore

  networking:
    - Custom domains
    - SSL/TLS
    - CDN integration
    - Load balancing
    - VPC/private networking

  security:
    - Authentication
    - Secrets management
    - Compliance certifications
    - WAF/DDoS protection

  developer_experience:
    - Deployment process
    - Local development
    - Debugging tools
    - Documentation quality

  operations:
    - Monitoring
    - Logging
    - Alerting
    - Incident management

  integrations:
    - Git providers
    - CI/CD tools
    - Third-party services
    - API access
```

---

## Capability Assessment Scale

```yaml
assessment_levels:
  native:
    symbol: "★★★"
    meaning: "Built-in, first-class support"
    score: 3

  supported:
    symbol: "★★☆"
    meaning: "Supported via integration or configuration"
    score: 2

  possible:
    symbol: "★☆☆"
    meaning: "Possible with workarounds"
    score: 1

  not_available:
    symbol: "☆☆☆"
    meaning: "Not supported"
    score: 0
```

---

## Capability Matrix Template

```markdown
# Capability Matrix: [Project Name]

## Requirements Summary
- **Primary Stack**: [Frontend] + [Backend] + [Database]
- **Scale Target**: [DAU/requests]
- **Key Features**: [List critical features]
- **Constraints**: [Budget, compliance, team expertise]

## Compute Capabilities

| Capability | Vercel | Railway | AWS ECS | Requirement |
|------------|--------|---------|---------|-------------|
| Node.js 20 | ★★★ | ★★★ | ★★★ | Required |
| Python support | ★★☆ | ★★★ | ★★★ | Not needed |
| Auto-scaling | ★★★ | ★★☆ | ★★★ | Required |
| Scale to zero | ★★★ | ★★★ | ☆☆☆ | Nice to have |
| Long-running | ☆☆☆ | ★★★ | ★★★ | Not needed |
| WebSockets | ★☆☆ | ★★★ | ★★★ | Not needed |
| Background jobs | ★☆☆ | ★★★ | ★★★ | Nice to have |
| **Category Score** | **X/Y** | **X/Y** | **X/Y** | |

## Data Capabilities

| Capability | Vercel | Railway | AWS ECS | Requirement |
|------------|--------|---------|---------|-------------|
| PostgreSQL | ★★★ (Neon) | ★★★ | ★★★ (RDS) | Required |
| Redis cache | ★★☆ | ★★★ | ★★★ | Nice to have |
| Object storage | ★★★ (Blob) | ★★☆ | ★★★ (S3) | Required |
| Managed backups | ★★★ | ★★★ | ★★★ | Required |
| **Category Score** | **X/Y** | **X/Y** | **X/Y** | |

## Networking Capabilities

| Capability | Vercel | Railway | AWS ECS | Requirement |
|------------|--------|---------|---------|-------------|
| Custom domain | ★★★ | ★★★ | ★★★ | Required |
| Auto SSL | ★★★ | ★★★ | ★★☆ | Required |
| CDN | ★★★ | ☆☆☆ | ★★☆ | Required |
| Multi-region | ★★★ | ★☆☆ | ★★★ | Nice to have |
| Private networking | ☆☆☆ | ★★☆ | ★★★ | Not needed |
| **Category Score** | **X/Y** | **X/Y** | **X/Y** | |

## Security Capabilities

| Capability | Vercel | Railway | AWS ECS | Requirement |
|------------|--------|---------|---------|-------------|
| Secrets management | ★★★ | ★★★ | ★★★ | Required |
| SOC 2 compliance | ★★★ | ★★☆ | ★★★ | Not needed |
| SSO login | ★★★ | ★★★ | ★★★ | Nice to have |
| DDoS protection | ★★★ | ★★☆ | ★★★ | Nice to have |
| **Category Score** | **X/Y** | **X/Y** | **X/Y** | |

## Developer Experience

| Capability | Vercel | Railway | AWS ECS | Requirement |
|------------|--------|---------|---------|-------------|
| Git auto-deploy | ★★★ | ★★★ | ★☆☆ | Required |
| Preview environments | ★★★ | ★★★ | ☆☆☆ | Required |
| CLI tools | ★★★ | ★★★ | ★★★ | Nice to have |
| Local dev parity | ★★☆ | ★★★ | ★★☆ | Nice to have |
| Documentation | ★★★ | ★★☆ | ★★★ | Required |
| **Category Score** | **X/Y** | **X/Y** | **X/Y** | |

## Operations

| Capability | Vercel | Railway | AWS ECS | Requirement |
|------------|--------|---------|---------|-------------|
| Logs access | ★★★ | ★★★ | ★★★ | Required |
| Metrics dashboard | ★★☆ | ★★☆ | ★★★ | Nice to have |
| Alerting | ★☆☆ | ★★☆ | ★★★ | Nice to have |
| Uptime SLA | ★★★ | ★★☆ | ★★★ | Required |
| **Category Score** | **X/Y** | **X/Y** | **X/Y** | |

## Overall Scores

| Category | Weight | Vercel | Railway | AWS ECS |
|----------|--------|--------|---------|---------|
| Compute | 20% | X | X | X |
| Data | 20% | X | X | X |
| Networking | 15% | X | X | X |
| Security | 15% | X | X | X |
| Developer Experience | 20% | X | X | X |
| Operations | 10% | X | X | X |
| **Weighted Total** | 100% | **X** | **X** | **X** |

## Fit Assessment

### Vercel
- **Fit Score**: X/10
- **Strengths**: [List]
- **Gaps**: [List]
- **Verdict**: [Recommendation]

### Railway
- **Fit Score**: X/10
- **Strengths**: [List]
- **Gaps**: [List]
- **Verdict**: [Recommendation]

### AWS ECS
- **Fit Score**: X/10
- **Strengths**: [List]
- **Gaps**: [List]
- **Verdict**: [Recommendation]

## Recommendation
[Final recommendation with rationale]
```

---

## Scoring Guidelines

### Weighting Requirements

```yaml
requirement_weights:
  required:
    weight: "3x"
    threshold: "Must be ★★☆ or better"
    failure_mode: "Disqualify platform"

  nice_to_have:
    weight: "1x"
    threshold: "Any level acceptable"
    failure_mode: "Reduce score"

  not_needed:
    weight: "0x"
    threshold: "Ignore"
    failure_mode: "None"
```

### Category Weighting

Adjust weights based on project priorities:

```yaml
weight_profiles:
  frontend_focused:
    compute: 15%
    data: 15%
    networking: 25%
    security: 10%
    developer_experience: 25%
    operations: 10%

  backend_focused:
    compute: 25%
    data: 25%
    networking: 15%
    security: 15%
    developer_experience: 10%
    operations: 10%

  enterprise:
    compute: 20%
    data: 20%
    networking: 15%
    security: 25%
    developer_experience: 10%
    operations: 10%
```

---

## Quality Checklist

- [ ] All requirements classified (required/nice/not needed)
- [ ] All platforms assessed on same dimensions
- [ ] Scores verified against documentation
- [ ] Weights reflect actual project priorities
- [ ] Gaps explicitly documented
- [ ] Recommendation justified by data
