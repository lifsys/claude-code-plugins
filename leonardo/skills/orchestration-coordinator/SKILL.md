# Orchestration Coordinator Skill

## Purpose

Master coordinator for Leonardo's parallel agent orchestration. Manages agent lifecycle, detects conflicts, arbitrates resource contention, and ensures reliable completion of multi-agent workflows.

---

## Activation Triggers

This skill activates when:
- `/leonardo` command initiates orchestration
- Multiple agents are deployed in parallel
- Agent failure is detected
- Progress reporting is requested
- Conflict between agents is detected

---

## Agent Registry Protocol

### Registration

When an agent starts, it registers with the coordinator:

```json
{
  "agent_id": "frontend-agent-001",
  "agent_type": "frontend-agent",
  "group": "A",
  "status": "INITIALIZING",
  "started_at": "2026-01-02T10:00:00Z",
  "spec_sections": ["ui_layout", "design_system"],
  "expected_outputs": ["components/", "styles/", "hooks/"]
}
```

### Heartbeat Protocol

Agents send heartbeats every 10 seconds:

```json
{
  "agent_id": "frontend-agent-001",
  "status": "RUNNING",
  "progress": 0.45,
  "files_created": 12,
  "files_modified": 3,
  "current_task": "Implementing Dashboard component",
  "last_heartbeat": "2026-01-02T10:05:30Z"
}
```

### Status Values

| Status | Description | Action |
|--------|-------------|--------|
| `INITIALIZING` | Agent starting up | Wait for RUNNING |
| `RUNNING` | Normal operation | Monitor heartbeats |
| `BLOCKED` | Waiting on dependency | Check dependency chain |
| `FAILED` | Error encountered | Trigger error recovery |
| `COMPLETED` | Work finished | Validate outputs, release |

---

## Conflict Detection Rules

### File Conflict Detection

Detect when multiple agents attempt to modify the same file:

```yaml
conflict_rules:
  file_write:
    detection: "Multiple agents targeting same file path"
    resolution: "Queue writes, first-registered-wins"

  schema_modification:
    detection: "Backend and Architecture both modifying schema"
    resolution: "Architecture has priority, Backend queues"

  api_endpoint:
    detection: "Multiple agents defining same route"
    resolution: "Merge if compatible, escalate if conflict"
```

### Dependency Conflicts

```yaml
dependency_conflicts:
  circular:
    detection: "A waits for B, B waits for A"
    resolution: "Break cycle, escalate to user"

  missing:
    detection: "Agent requires output that won't be produced"
    resolution: "Spawn missing agent or notify user"

  version:
    detection: "Agents expecting different spec versions"
    resolution: "Align to latest spec, re-sync agents"
```

---

## Arbitration Decision Tree

When conflicts are detected, follow this resolution order:

```
1. AUTO-RESOLVE (No user intervention)
   ├── File queue (different sections of same file)
   ├── Dependency ordering (adjust execution order)
   └── Retry transient failures (network, timeout)

2. AGENT NEGOTIATION (Agents resolve themselves)
   ├── Schema adjustments (Architecture proposes, others accept)
   ├── API contract alignment (Backend proposes, Frontend accepts)
   └── Shared resource scheduling (first-come-first-served)

3. USER ESCALATION (Requires human decision)
   ├── Fundamental spec conflicts
   ├── Breaking changes to existing code
   └── Resource constraints (cost, time, scope)
```

### Arbitration Protocol

```python
def arbitrate_conflict(conflict):
    # Level 1: Auto-resolve
    if conflict.type in AUTO_RESOLVABLE:
        return apply_auto_resolution(conflict)

    # Level 2: Agent negotiation
    if conflict.agents_can_negotiate():
        proposal = conflict.initiator.propose_resolution()
        if conflict.affected.accepts(proposal):
            return apply_negotiated_resolution(proposal)

    # Level 3: User escalation
    return escalate_to_user(conflict, options=[
        "Accept A's version",
        "Accept B's version",
        "Merge manually",
        "Abort and re-spec"
    ])
```

---

## Dependency Graph Management

### Graph Structure

```yaml
dependency_graph:
  nodes:
    - id: spec-orchestrator
      outputs: [project_specification.xml]

    - id: architecture-agent
      inputs: [project_specification.xml]
      outputs: [database/schema.sql, api/routes.ts]

    - id: frontend-agent
      inputs: [project_specification.xml, api/routes.ts]
      outputs: [components/, styles/]

    - id: backend-agent
      inputs: [project_specification.xml, database/schema.sql]
      outputs: [services/, middleware/]

    - id: test-agent
      inputs: [components/, services/, api/routes.ts]
      outputs: [tests/]
```

### Execution Order Optimization

```
Phase 1 (Sequential): spec-orchestrator
    ↓
Phase 2 (Parallel):
    ├── architecture-agent
    ├── devops-architect
    └── (frontend-agent waits for api/routes.ts)
    ↓
Phase 3 (Parallel):
    ├── frontend-agent (now unblocked)
    ├── backend-agent
    └── (test-agent waits for outputs)
    ↓
Phase 4 (Parallel):
    ├── test-agent
    ├── review-agent
    └── docs-agent
```

---

## Failure Detection & Recovery Triggering

### Failure Indicators

| Indicator | Threshold | Action |
|-----------|-----------|--------|
| Heartbeat timeout | 30 seconds | Trigger recovery |
| Error in output | Any CRITICAL error | Pause agent, assess |
| Quality gate fail | Depends on gate | Retry or escalate |
| Resource exhaustion | 90% context used | Checkpoint, split |

### Recovery Trigger Protocol

```python
def detect_failure(agent):
    # Check heartbeat
    if time_since_last_heartbeat(agent) > 30:
        trigger_recovery(agent, reason="HEARTBEAT_TIMEOUT")
        return

    # Check error rate
    if agent.error_count > 3:
        trigger_recovery(agent, reason="ERROR_THRESHOLD")
        return

    # Check progress stall
    if agent.progress_unchanged_for(minutes=5):
        trigger_recovery(agent, reason="PROGRESS_STALL")
        return
```

When triggering recovery, the coordinator:
1. Logs the failure event
2. Invokes the error-recovery skill
3. Updates dependent agents (BLOCKED status)
4. Notifies user if escalation needed

---

## Progress Aggregation

### Real-Time Progress Calculation

```python
def calculate_overall_progress():
    agent_weights = {
        "spec-orchestrator": 0.15,
        "architecture-agent": 0.15,
        "devops-architect": 0.10,
        "frontend-agent": 0.20,
        "backend-agent": 0.20,
        "test-agent": 0.10,
        "review-agent": 0.05,
        "docs-agent": 0.05
    }

    total = sum(
        agent.progress * weight
        for agent, weight in agent_weights.items()
        if agent.status != "PENDING"
    )

    return total / sum(weights for active agents)
```

### Progress Report Generation

The coordinator generates progress reports in the standardized format:

```markdown
## Current Session Progress

| Metric | Value |
|--------|-------|
| Overall Progress | 67% |
| Active Agents | 3/7 |
| Files Created | 45 |
| Tests Generated | 89 |
| Errors Encountered | 0 |
| Time Elapsed | 12m 34s |
| Estimated Remaining | 6m |
```

---

## Status Reporting Format

### Agent Status Report

```json
{
  "session_id": "leonardo-2026-01-02-001",
  "timestamp": "2026-01-02T10:15:00Z",
  "overall_progress": 0.67,
  "phase": "IMPLEMENTATION",
  "agents": [
    {
      "id": "architecture-agent",
      "status": "COMPLETED",
      "progress": 1.0,
      "duration_ms": 45000,
      "outputs": ["schema.sql", "routes.ts", "migrations/"]
    },
    {
      "id": "frontend-agent",
      "status": "RUNNING",
      "progress": 0.75,
      "current_task": "Implementing Settings page",
      "files_created": 24
    },
    {
      "id": "backend-agent",
      "status": "RUNNING",
      "progress": 0.60,
      "current_task": "API authentication middleware",
      "files_created": 18
    }
  ],
  "blockers": [],
  "next_milestone": "All Group A agents complete"
}
```

### User-Facing Status

```
Leonardo Orchestration Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase: Implementation (3/6)
Progress: ████████████░░░░░░░░ 67%

Agents:
  ✅ spec-orchestrator    DONE     (spec.xml)
  ✅ architecture-agent   DONE     (12 files)
  ✅ devops-architect     DONE     (infra.xml)
  🔄 frontend-agent       75%      (Settings page)
  🔄 backend-agent        60%      (Auth middleware)
  ⏳ test-agent           PENDING
  ⏳ review-agent         PENDING
  ⏳ docs-agent           PENDING

ETA: ~6 minutes remaining
```

---

## Integration with Leonardo Command

The `/leonardo` command invokes the orchestration coordinator at startup:

```markdown
## Orchestration Startup Sequence

1. Parse user command and mode
2. Initialize orchestration-coordinator
3. Load/generate project specification
4. Build dependency graph
5. Deploy Group A agents (parallel)
6. Monitor heartbeats and progress
7. Detect and resolve conflicts
8. Trigger recovery on failures
9. Wait for Group A completion
10. Deploy Group B agents
11. Generate final progress report
12. Validate all quality gates
```

---

## Conflict Resolution Examples

### Example 1: File Write Conflict

```
Conflict Detected:
  - frontend-agent writing to src/components/Button.tsx
  - backend-agent writing to src/components/Button.tsx

Resolution:
  - Check file sections: frontend owns UI, backend owns types
  - Merge non-overlapping changes automatically
  - Result: Both changes applied sequentially
```

### Example 2: Schema Change Request

```
Conflict Detected:
  - frontend-agent requests new column 'avatar_url' in users table
  - architecture-agent has already completed schema

Resolution:
  - Queue schema change request
  - Notify architecture-agent of required change
  - Generate migration for additive change
  - Update dependent agents with new schema
```

### Example 3: Circular Dependency

```
Conflict Detected:
  - frontend-agent waiting for API types from backend-agent
  - backend-agent waiting for component interfaces from frontend-agent

Resolution:
  - Cannot auto-resolve (circular)
  - Escalate to user with options:
    A) Frontend defines types first (Backend adapts)
    B) Backend defines types first (Frontend adapts)
    C) Define shared types in separate package
```

---

## Quality Metrics

The coordinator tracks these metrics for session analysis:

```yaml
orchestration_metrics:
  session_duration_ms: 756000
  agent_utilization:
    architecture-agent: 0.95
    frontend-agent: 0.88
    backend-agent: 0.82
  conflict_count: 2
  conflicts_auto_resolved: 2
  conflicts_escalated: 0
  recovery_triggers: 0
  total_files_created: 145
  total_tests_generated: 89
  quality_gates_passed: 9/9
```

---

## Error Handling

When the coordinator itself encounters errors:

```yaml
coordinator_errors:
  agent_unreachable:
    action: "Mark agent FAILED, trigger recovery"

  dependency_cycle:
    action: "Log cycle, escalate to user"

  resource_exhausted:
    action: "Checkpoint progress, request session extension"

  spec_invalid:
    action: "Halt orchestration, report validation errors"
```

---

## Session Persistence

The coordinator maintains session state for recovery:

```json
{
  "session_id": "leonardo-2026-01-02-001",
  "checkpoint": {
    "phase": "IMPLEMENTATION",
    "completed_agents": ["spec-orchestrator", "architecture-agent"],
    "active_agents": ["frontend-agent", "backend-agent"],
    "pending_agents": ["test-agent", "review-agent", "docs-agent"],
    "files_created": ["list of paths"],
    "last_checkpoint": "2026-01-02T10:10:00Z"
  }
}
```

This enables session resumption after interruption.

---

## Usage

This skill is automatically activated by the `/leonardo` command. It runs throughout the orchestration session and is not directly invoked by users.

**Internal invocation:**
```
skill: orchestration-coordinator
action: initialize | monitor | resolve_conflict | recover | report
```
