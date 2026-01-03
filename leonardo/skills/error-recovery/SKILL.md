# Error Recovery Skill

## Purpose

Standardized error handling, retry logic, and rollback workflows for Leonardo's multi-agent orchestration. Ensures graceful degradation and reliable recovery from agent failures.

---

## Activation Triggers

This skill activates when:
- Agent heartbeat timeout (30 seconds without response)
- Agent reports FAILED status
- Quality gate failure occurs
- User requests abort/rollback
- Orchestration coordinator detects anomaly

---

## Failure Detection

### Failure Types

| Type | Detection Method | Severity |
|------|------------------|----------|
| `HEARTBEAT_TIMEOUT` | No heartbeat for 30s | HIGH |
| `ERROR_RESPONSE` | Agent returns error | MEDIUM-HIGH |
| `QUALITY_GATE_FAIL` | Test/lint failure | MEDIUM |
| `PROGRESS_STALL` | No progress for 5min | MEDIUM |
| `RESOURCE_EXHAUSTION` | Context/memory limit | HIGH |
| `DEPENDENCY_FAILURE` | Required input missing | HIGH |
| `USER_ABORT` | User cancellation | IMMEDIATE |

### Detection Protocol

```python
def detect_failure(agent, event):
    failure = {
        "agent_id": agent.id,
        "failure_type": classify_failure(event),
        "severity": calculate_severity(event),
        "timestamp": now(),
        "context": {
            "last_task": agent.current_task,
            "progress": agent.progress,
            "files_affected": agent.modified_files,
            "error_message": event.error if hasattr(event, 'error') else None
        }
    }

    log_failure(failure)
    return failure
```

### Severity Classification

```yaml
severity_levels:
  CRITICAL:
    - Data corruption detected
    - Security vulnerability introduced
    - Unrecoverable state
    action: IMMEDIATE_HALT

  HIGH:
    - Agent crash/timeout
    - Dependency chain broken
    - Resource exhaustion
    action: RETRY_WITH_RESET

  MEDIUM:
    - Quality gate failure
    - Progress stall
    - Transient error
    action: RETRY_IMMEDIATE

  LOW:
    - Warning threshold
    - Non-blocking issue
    action: LOG_AND_CONTINUE
```

---

## Retry Strategy

### Exponential Backoff Protocol

```python
RETRY_CONFIG = {
    "max_attempts": 4,
    "delays": [0, 5, 15, 30],  # seconds
    "context_refresh": [False, False, True, True],
    "escalate_after": 4
}

def retry_agent(agent, failure):
    attempt = agent.retry_count + 1

    if attempt > RETRY_CONFIG["max_attempts"]:
        return escalate_to_user(agent, failure)

    delay = RETRY_CONFIG["delays"][attempt - 1]
    refresh_context = RETRY_CONFIG["context_refresh"][attempt - 1]

    if delay > 0:
        wait(delay)

    if refresh_context:
        agent.reload_context()
        agent.checkpoint_state()

    return restart_agent(agent, from_checkpoint=True)
```

### Retry Behavior by Failure Type

| Failure Type | Retry Strategy | Max Attempts |
|--------------|----------------|--------------|
| `HEARTBEAT_TIMEOUT` | Immediate restart | 3 |
| `ERROR_RESPONSE` | Wait 5s, retry with context | 4 |
| `QUALITY_GATE_FAIL` | Fix and retry | 2 |
| `PROGRESS_STALL` | Context refresh, retry | 2 |
| `RESOURCE_EXHAUSTION` | Split task, retry parts | 3 |
| `DEPENDENCY_FAILURE` | Wait for dependency | 5 |
| `USER_ABORT` | No retry | 0 |

### Retry State Machine

```
                    ┌─────────────┐
                    │   FAILED    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ CAN RETRY?  │
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
      ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
      │ ATTEMPT 1 │  │ ATTEMPT 2 │  │ ATTEMPT 3 │
      │ Immediate │  │ Wait 5s   │  │ Wait 15s  │
      └─────┬─────┘  └─────┬─────┘  └─────┬─────┘
            │              │              │
            └──────────────┼──────────────┘
                           │
                    ┌──────▼──────┐
                    │  SUCCESS?   │
                    └──────┬──────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
      ┌─────▼─────┐                 ┌─────▼─────┐
      │  RUNNING  │                 │ ESCALATE  │
      └───────────┘                 └───────────┘
```

---

## Partial Completion Handling

### Checkpoint Management

Agents create checkpoints at safe points:

```json
{
  "agent_id": "frontend-agent-001",
  "checkpoint_id": "chk-2026-01-02-10-05",
  "timestamp": "2026-01-02T10:05:00Z",
  "progress": 0.45,
  "completed_tasks": [
    "Layout component created",
    "Navigation implemented",
    "Dashboard page started"
  ],
  "pending_tasks": [
    "Dashboard widgets",
    "Settings page",
    "Profile page"
  ],
  "files_committed": [
    "src/components/Layout.tsx",
    "src/components/Navigation.tsx"
  ],
  "files_in_progress": [
    "src/pages/Dashboard.tsx"
  ]
}
```

### Recovery from Checkpoint

```python
def recover_from_checkpoint(agent, checkpoint):
    # 1. Verify committed files
    for file in checkpoint["files_committed"]:
        assert file_exists(file), f"Missing committed file: {file}"

    # 2. Clean up in-progress files
    for file in checkpoint["files_in_progress"]:
        if file_exists(file):
            if is_valid(file):
                # Keep valid partial work
                pass
            else:
                # Discard corrupted partial work
                delete_file(file)

    # 3. Reset agent state
    agent.reset_to_checkpoint(checkpoint)

    # 4. Resume from pending tasks
    agent.task_queue = checkpoint["pending_tasks"]

    # 5. Restart agent
    return restart_agent(agent)
```

### Handling Partial Outputs

```yaml
partial_output_policies:
  source_code:
    strategy: "validate_and_keep"
    validation: "file parses without syntax errors"
    fallback: "discard and regenerate"

  test_files:
    strategy: "validate_and_keep"
    validation: "tests compile and structure valid"
    fallback: "regenerate all tests for component"

  documentation:
    strategy: "keep_all"
    validation: "none required"
    fallback: "n/a"

  configuration:
    strategy: "atomic_replace"
    validation: "config validates against schema"
    fallback: "restore from last known good"
```

---

## Rollback Triggers

### Automatic Rollback Conditions

| Condition | Threshold | Action |
|-----------|-----------|--------|
| Consecutive failures | 3 | Rollback to last checkpoint |
| Critical quality gate | 1 failure | Rollback changes, re-attempt |
| Security vulnerability | Any | Immediate rollback, alert |
| Data corruption | Any | Rollback, investigate |
| User abort | Requested | Graceful rollback |

### Rollback Decision Tree

```
Failure Detected
    │
    ▼
Is it recoverable?
    │
    ├── YES → Attempt retry
    │           │
    │           ▼
    │       Retry successful?
    │           │
    │           ├── YES → Continue
    │           │
    │           └── NO → Rollback to checkpoint
    │
    └── NO → Immediate rollback
              │
              ▼
         Rollback scope?
              │
              ├── AGENT → Rollback single agent
              │
              ├── GROUP → Rollback agent group
              │
              └── SESSION → Full session rollback
```

### Rollback Procedures

```python
def rollback_agent(agent, target_checkpoint):
    """Rollback a single agent to a previous checkpoint."""

    # 1. Pause dependent agents
    dependents = get_dependent_agents(agent)
    for dep in dependents:
        dep.pause(reason="upstream_rollback")

    # 2. Identify files to revert
    files_to_revert = get_files_since(target_checkpoint)

    # 3. Revert files
    for file in files_to_revert:
        if file in target_checkpoint.files_committed:
            restore_from_checkpoint(file, target_checkpoint)
        else:
            delete_file(file)  # Created after checkpoint

    # 4. Reset agent state
    agent.reset_to_checkpoint(target_checkpoint)

    # 5. Log rollback
    log_event("ROLLBACK", agent.id, target_checkpoint.id)

    # 6. Resume dependents from their checkpoints
    for dep in dependents:
        dep.realign_to_upstream()
        dep.resume()

    return agent

def rollback_group(group, target_phase):
    """Rollback an entire agent group to a phase checkpoint."""

    # 1. Pause all agents in group
    for agent in group.agents:
        agent.pause(reason="group_rollback")

    # 2. Identify phase checkpoint
    checkpoint = get_phase_checkpoint(group, target_phase)

    # 3. Rollback each agent
    for agent in group.agents:
        agent_checkpoint = checkpoint.agent_states[agent.id]
        rollback_agent(agent, agent_checkpoint)

    # 4. Clear group-level state
    group.reset_to_phase(target_phase)

    return group

def rollback_session(target_phase):
    """Full session rollback to a specific phase."""

    # 1. Halt all orchestration
    orchestrator.halt()

    # 2. Get session checkpoint
    checkpoint = get_session_checkpoint(target_phase)

    # 3. Revert all files
    revert_all_files_to(checkpoint)

    # 4. Reset all agents
    for agent in all_agents:
        agent.reset()

    # 5. Restore session state
    session.restore_from(checkpoint)

    # 6. Notify user
    notify_user("Session rolled back to phase: " + target_phase)

    return session
```

---

## User Escalation Thresholds

### When to Escalate

| Scenario | Threshold | Escalation Type |
|----------|-----------|-----------------|
| Retry exhaustion | 4 attempts | ASK_CONTINUE |
| Breaking change | Any | ASK_APPROVE |
| Scope deviation | >10% spec change | ASK_APPROVE |
| Cost impact | >$100/month | ASK_APPROVE |
| Security concern | Any vulnerability | ALERT_IMMEDIATE |
| Data loss risk | Any | BLOCK_AND_ALERT |

### Escalation Protocol

```python
def escalate_to_user(agent, failure, options):
    """Present escalation to user with actionable options."""

    escalation = {
        "type": "AGENT_FAILURE_ESCALATION",
        "agent": agent.id,
        "failure_summary": failure.summary,
        "attempts_made": agent.retry_count,
        "impact": assess_impact(failure),
        "options": options
    }

    # Present to user via AskUserQuestion
    response = ask_user_question(
        question=f"Agent '{agent.id}' has failed after {agent.retry_count} attempts. {failure.summary}",
        options=[
            {"label": "Retry with fresh context", "value": "RETRY_FRESH"},
            {"label": "Skip this agent", "value": "SKIP"},
            {"label": "Rollback to last checkpoint", "value": "ROLLBACK"},
            {"label": "Abort session", "value": "ABORT"}
        ]
    )

    return handle_escalation_response(response, agent, failure)
```

### Escalation Response Handling

```yaml
escalation_responses:
  RETRY_FRESH:
    action: "Clear agent context, reload spec, restart"
    rollback: false
    continue_others: true

  SKIP:
    action: "Mark agent SKIPPED, continue without"
    rollback: false
    continue_others: true
    note: "Some outputs may be incomplete"

  ROLLBACK:
    action: "Rollback to checkpoint, re-attempt"
    rollback: true
    continue_others: pause_then_resume

  ABORT:
    action: "Graceful shutdown, save partial work"
    rollback: false
    continue_others: false
    cleanup: true
```

---

## Recovery Logging and Audit Trail

### Log Format

```json
{
  "event_type": "RECOVERY",
  "timestamp": "2026-01-02T10:15:30Z",
  "session_id": "leonardo-2026-01-02-001",
  "agent_id": "frontend-agent-001",
  "failure": {
    "type": "HEARTBEAT_TIMEOUT",
    "severity": "HIGH",
    "message": "No heartbeat received for 45 seconds"
  },
  "recovery_action": {
    "type": "RETRY",
    "attempt": 2,
    "delay_ms": 5000,
    "context_refreshed": false
  },
  "outcome": {
    "status": "SUCCESS",
    "resumed_at": "2026-01-02T10:15:35Z",
    "from_checkpoint": "chk-2026-01-02-10-05"
  }
}
```

### Audit Trail Schema

```sql
CREATE TABLE recovery_events (
    id UUID PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    agent_id VARCHAR(100) NOT NULL,
    event_timestamp TIMESTAMP NOT NULL,
    failure_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    recovery_action VARCHAR(50) NOT NULL,
    attempt_number INTEGER,
    outcome VARCHAR(20) NOT NULL,
    checkpoint_id VARCHAR(100),
    user_escalated BOOLEAN DEFAULT FALSE,
    user_decision VARCHAR(50),
    notes TEXT
);

CREATE INDEX idx_recovery_session ON recovery_events(session_id);
CREATE INDEX idx_recovery_agent ON recovery_events(agent_id);
CREATE INDEX idx_recovery_timestamp ON recovery_events(event_timestamp);
```

### Recovery Report Generation

At session end, generate recovery summary:

```markdown
## Recovery Report

### Session: leonardo-2026-01-02-001

| Metric | Value |
|--------|-------|
| Total Failures | 3 |
| Auto-Recovered | 2 |
| User Escalations | 1 |
| Rollbacks | 0 |
| Agent Skips | 0 |

### Failure Details

| Time | Agent | Type | Action | Outcome |
|------|-------|------|--------|---------|
| 10:05 | frontend | TIMEOUT | Retry | ✅ Recovered |
| 10:12 | backend | ERROR | Retry x2 | ✅ Recovered |
| 10:18 | test | GATE_FAIL | Escalate | ✅ User: Retry |

### Recommendations
- Frontend agent had timeout; consider increasing heartbeat threshold
- Backend error was transient network issue; no action needed
- Test failure was due to flaky test; recommend test stabilization
```

---

## Integration Points

### With Orchestration Coordinator

```python
# Coordinator invokes recovery on failure detection
def on_agent_failure(agent, failure):
    recovery_result = error_recovery.handle_failure(agent, failure)

    if recovery_result.success:
        coordinator.resume_agent(agent)
    elif recovery_result.escalated:
        coordinator.pause_dependents(agent)
        coordinator.await_user_decision()
    else:
        coordinator.mark_agent_failed(agent)
        coordinator.assess_session_viability()
```

### With Quality Guardian

```python
# Quality gate failures trigger recovery
def on_quality_gate_fail(gate, agent, details):
    failure = create_failure(
        type="QUALITY_GATE_FAIL",
        severity=gate.severity,
        agent=agent,
        details=details
    )

    # Attempt automatic fix for known issues
    if can_auto_fix(gate, details):
        fix_result = apply_auto_fix(gate, details)
        if fix_result.success:
            return rerun_gate(gate, agent)

    # Otherwise escalate to recovery
    return error_recovery.handle_failure(agent, failure)
```

### With Session Logging

```python
# All recovery events logged to session
def log_recovery_event(event):
    session_log.append({
        "type": "RECOVERY",
        "timestamp": now(),
        "event": event
    })

    # Also persist to audit trail
    audit_trail.insert(event)
```

---

## Recovery Best Practices

### DO

- ✅ Create checkpoints frequently (every 5-10 files)
- ✅ Validate outputs before marking complete
- ✅ Log all recovery attempts with context
- ✅ Preserve partial work when possible
- ✅ Notify dependent agents of upstream issues
- ✅ Provide clear user escalation options

### DON'T

- ❌ Retry infinitely without backoff
- ❌ Discard partial work without validation
- ❌ Hide failures from user
- ❌ Continue with corrupted state
- ❌ Ignore dependency chain impacts
- ❌ Skip audit logging for speed

---

## Usage

This skill is automatically invoked by the orchestration coordinator when failures are detected. It is not directly invoked by users.

**Internal invocation:**
```
skill: error-recovery
action: detect | retry | rollback | escalate | log
context: {agent, failure, checkpoint}
```
