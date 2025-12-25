# Systems Thinking Framework

Analyze infrastructure as interconnected systems. Identify feedback loops, failure cascades, and emergent behaviors. Design for resilience by understanding how parts interact.

## Core Protocol

```
1. MAP all components and their interactions
2. IDENTIFY feedback loops (positive and negative)
3. FIND single points of failure
4. MODEL cascade effects
5. DESIGN circuit breakers and fallbacks
```

---

## Systems Thinking Principles

### Key Concepts

```yaml
systems_concepts:
  emergence:
    definition: "System behavior that arises from component interactions"
    example: "Database slow → API timeouts → User retry storms → System crash"
    implication: "Can't understand system by studying parts in isolation"

  feedback_loops:
    positive:
      definition: "Change amplifies itself"
      example: "More users → more load → slower response → users retry → more load"
      danger: "Can spiral out of control"

    negative:
      definition: "Change dampens itself"
      example: "High CPU → auto-scaling → more capacity → lower CPU"
      benefit: "Self-stabilizing"

  delays:
    definition: "Time between cause and effect"
    example: "Database index missing → slow queries → detected later → fix deployed → cache warmed"
    implication: "Actions have delayed consequences"

  bottlenecks:
    definition: "Constraint limiting system throughput"
    example: "Database connection limit caps total system capacity"
    principle: "System capacity = bottleneck capacity"
```

---

## Analysis Protocol

### Step 1: Map Components and Interactions

Create a system map:

```yaml
component_map:
  actors:
    - Users (browser/mobile)
    - Developers (deploy, debug)
    - External services (payments, email)

  components:
    frontend:
      - CDN
      - Static assets
      - Client-side app

    backend:
      - Load balancer
      - API servers
      - Background workers

    data:
      - Primary database
      - Read replicas
      - Cache layer
      - Object storage

    infrastructure:
      - DNS
      - TLS termination
      - Secrets manager
      - Logging/monitoring

  interactions:
    - User → CDN → Frontend
    - Frontend → API → Database
    - API → Cache → Database (fallback)
    - API → External payment service
    - Workers → Database
```

### Step 2: Identify Feedback Loops

Find self-reinforcing and self-correcting patterns:

```yaml
feedback_loops:
  dangerous_positive_loops:
    retry_storm:
      trigger: "Slow API response"
      loop: "User retries → more load → slower → more retries"
      mitigation: "Exponential backoff, circuit breaker"

    cache_stampede:
      trigger: "Cache expiry"
      loop: "Cache miss → DB query → slow → more requests queue → more misses"
      mitigation: "Cache warming, lock on refill"

    connection_exhaustion:
      trigger: "Slow queries"
      loop: "Queries wait → connections held → pool exhausted → more waiting"
      mitigation: "Query timeouts, connection limits"

  healthy_negative_loops:
    auto_scaling:
      trigger: "High CPU"
      loop: "High load → scale up → load distributed → CPU normalizes"
      design: "Ensure scaling is faster than load increase"

    rate_limiting:
      trigger: "Request spike"
      loop: "Many requests → rate limit → requests throttled → load stabilizes"
      design: "Set limits below system capacity"
```

### Step 3: Find Single Points of Failure

Identify components whose failure cascades:

```yaml
spof_analysis:
  critical:
    database_primary:
      impact: "All writes fail, reads may fail"
      mitigation: "Read replica, auto-failover"
      recovery_time: "1-5 minutes with automated failover"

    load_balancer:
      impact: "No traffic reaches servers"
      mitigation: "Managed LB with multi-AZ"
      recovery_time: "Automatic, seconds"

    dns:
      impact: "Domain unreachable"
      mitigation: "Multiple nameservers, low TTL"
      recovery_time: "TTL-dependent, could be hours"

  moderate:
    cache:
      impact: "Increased database load"
      mitigation: "Database can handle load without cache"
      recovery_time: "Cache rebuild, minutes"

    external_payment:
      impact: "Checkout fails"
      mitigation: "Graceful degradation, retry queue"
      recovery_time: "Depends on external service"
```

### Step 4: Model Cascade Effects

Trace how failures propagate:

```yaml
cascade_scenarios:
  database_slow:
    trigger: "Missing index, bad query"
    sequence:
      - "Query time increases 10x"
      - "Connection pool fills up"
      - "New requests queue"
      - "API response times increase"
      - "Load balancer health checks fail"
      - "Servers marked unhealthy"
      - "Fewer servers = more load on remaining"
      - "Cascade failure"
    circuit_breaker: "Query timeout + database circuit breaker"

  external_service_down:
    trigger: "Payment provider outage"
    sequence:
      - "Payment API times out"
      - "Checkout requests wait"
      - "Request threads consumed"
      - "All API endpoints slow"
      - "Frontend appears broken"
    circuit_breaker: "Fast timeout + graceful degradation"
```

### Step 5: Design Circuit Breakers

Create mechanisms to prevent cascades:

```yaml
circuit_breakers:
  database:
    timeout: "5 seconds query timeout"
    fallback: "Return cached data or error"
    trip_threshold: "50% failures in 30 seconds"
    reset: "Try 1 request every 10 seconds"

  external_api:
    timeout: "3 seconds"
    fallback: "Queue for retry, show 'processing' to user"
    trip_threshold: "10 failures in 1 minute"
    reset: "Exponential backoff, start at 1 minute"

  cache:
    timeout: "100ms"
    fallback: "Direct to database"
    trip_threshold: "N/A (always fallback)"
```

---

## System Diagrams

### Health State Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     HEALTHY STATE                            │
│  All components operational, latency normal, no errors       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User → CDN → Frontend → API → Cache → Database             │
│                            ↓                                 │
│                       External APIs                          │
│                                                              │
│  Response time: < 200ms                                      │
│  Error rate: < 0.1%                                          │
│  CPU: < 50%                                                  │
└─────────────────────────────────────────────────────────────┘

                    │ Trigger: High load, failure
                    ▼

┌─────────────────────────────────────────────────────────────┐
│                     DEGRADED STATE                           │
│  Some components stressed, latency elevated                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Response time: 200ms - 2s                                   │
│  Error rate: 0.1% - 5%                                       │
│  CPU: 50% - 80%                                              │
│                                                              │
│  Actions:                                                    │
│  - Auto-scaling triggered                                    │
│  - Alerts sent to team                                       │
│  - Non-critical features disabled                            │
└─────────────────────────────────────────────────────────────┘

                    │ Not resolved
                    ▼

┌─────────────────────────────────────────────────────────────┐
│                     FAILURE STATE                            │
│  Service unavailable or severely degraded                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Response time: > 2s or timeout                              │
│  Error rate: > 5%                                            │
│  Availability: Partial or none                               │
│                                                              │
│  Actions:                                                    │
│  - Incident triggered                                        │
│  - On-call paged                                             │
│  - Failover initiated if available                           │
│  - Status page updated                                       │
└─────────────────────────────────────────────────────────────┘
```

### Dependency Graph

```
                    ┌─────────┐
                    │  Users  │
                    └────┬────┘
                         │
                    ┌────▼────┐
                    │   CDN   │ ← Static assets cached
                    └────┬────┘
                         │
              ┌──────────┴──────────┐
              │                      │
         ┌────▼────┐           ┌─────▼─────┐
         │ Frontend │           │  API LB   │
         └─────────┘           └─────┬─────┘
                                     │
                          ┌──────────┼──────────┐
                          │          │          │
                     ┌────▼───┐ ┌────▼───┐ ┌────▼───┐
                     │ API 1  │ │ API 2  │ │ API 3  │
                     └────┬───┘ └────┬───┘ └────┬───┘
                          │          │          │
                          └──────────┼──────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                 │
               ┌────▼────┐     ┌─────▼─────┐    ┌─────▼─────┐
               │  Cache  │     │  Primary  │    │ External  │
               │ (Redis) │     │    DB     │    │   APIs    │
               └────┬────┘     └─────┬─────┘    └───────────┘
                    │                │
                    └───────┬────────┘
                            │
                    ┌───────▼───────┐
                    │  DB Replicas  │
                    └───────────────┘
```

---

## Resilience Patterns

### Design for Failure

```yaml
resilience_patterns:
  bulkhead:
    description: "Isolate failures to prevent spread"
    implementation:
      - Separate connection pools per dependency
      - Separate thread pools for different operations
      - Separate services for critical vs non-critical

  circuit_breaker:
    description: "Stop calling failing services"
    implementation:
      - Track failure rate
      - Open circuit when threshold exceeded
      - Periodically try to close

  retry_with_backoff:
    description: "Retry transient failures"
    implementation:
      - Exponential backoff (1s, 2s, 4s, 8s...)
      - Jitter to prevent thundering herd
      - Maximum retry limit

  timeout:
    description: "Don't wait forever"
    implementation:
      - Connection timeout: 5s
      - Read timeout: 30s
      - Total request timeout: 60s

  fallback:
    description: "Provide degraded experience"
    implementation:
      - Cached data when fresh unavailable
      - Default values when service down
      - Queued processing when immediate impossible
```

---

## Quick Reference

### Systems Thinking Questions

1. **What happens when X fails?** (Trace the cascade)
2. **What loops could amplify problems?** (Find positive feedback)
3. **Where are the bottlenecks?** (System capacity = bottleneck capacity)
4. **What delays mask problems?** (Cause and effect separation)
5. **How does the system self-correct?** (Find negative feedback)

### Resilience Checklist

- [ ] All external dependencies have timeouts
- [ ] Circuit breakers on all external calls
- [ ] Fallbacks for all non-critical features
- [ ] Health checks detect actual readiness
- [ ] Load shedding when overwhelmed
- [ ] Graceful degradation planned
- [ ] Cascade scenarios documented
- [ ] Recovery procedures tested
