# SOP Enforcer Plugin

**Comprehensive SOP governance enforcement with realtime monitoring, violation tracking, and interactive SOP development**

---

## Overview

The **sop-enforcer** plugin provides complete governance enforcement for Standard Operating Procedures (SOPs) through a multi-layer system:

1. **Realtime Blocking** (cc-auditor rules) - Block violations before execution
2. **Post-Execution Monitoring** (hooks) - Detect violations after tool use
3. **Interactive SOP Development** (skill + agent) - Guide complete SOP creation
4. **Violation Tracking** (integration) - Automatic tracking with session cards
5. **Log Analysis** (Python monitoring) - Detect hidden violations in logs/responses

---

## Components

### Skills
- **governance-qa** - Interactive SOP development through Q&A

### Agents
- **sop-architect** - Guides sessions through SOP development (Socratic method)
- **sop-enforcer** - Monitors sessions realtime, blocks violations, tracks offenders

### Hooks
- **PreToolUse/sop-blocker.sh** - Blocks unauthorized writes before execution
- **PostToolUse/sop-monitor.sh** - Analyzes every tool use for violations

### cc-auditor Rules (Python)
- **sop_authority.py** - Enforces 208-SOP authority matrix
- **summary_proliferation.py** - Blocks summary files outside .claude-notes.md
- **rogue_documentation.py** - Blocks unauthorized documentation creation
- **session_compliance.py** - Session-level compliance tracking

### Python Modules
- **monitor.py** - Realtime log monitoring for documentation attempts
- **tracker.py** - Violation tracking integration (session cards + tracker.json)
- **qa_engine.py** - SOP Q&A conversation engine

---

## Installation

### Prerequisites
- cc-auditor >= 1.0.0
- Python >= 3.8
- Claude Code with plugin support
- ~/.claude/SOP repository (SOP system)

### Install Plugin

```bash
# Plugin is already in ~/.claude/plugins/sop-enforcer/

# Register cc-auditor rules
cd ~/.claude/plugins/sop-enforcer/rules
for rule in *.py; do
    cc-auditor rules add "$rule"
done

# Verify installation
cc-auditor rules list | grep sop
```

### Enable in Claude Code

**Project .claude/config.json:**
```json
{
  "plugins": [
    "sop-enforcer"
  ],
  "hooks": {
    "pre_tool_use": "plugins/sop-enforcer/hooks/PreToolUse/sop-blocker.sh",
    "post_tool_use": "plugins/sop-enforcer/hooks/PostToolUse/sop-monitor.sh"
  }
}
```

---

## Usage

### 1. Interactive SOP Development

**Start Q&A session:**
```
User: "I need to create an SOP for code review process"

Use skill: governance-qa

Skill will invoke sop-architect agent and guide you through:
- Discovery questions (purpose, scope, audience)
- Structure proposal
- Section-by-section development
- Validation & quality check
- Finalization
```

**Result:** Complete, high-quality SOP saved in content/drafts/

### 2. Authority Checking

**Check if you can modify a file:**
```
User: "Can I modify ARCHITECTURE.md?"

Use skill: governance-qa --check-authority ARCHITECTURE.md

Response:
  Session Type: feature-dev
  Authority: DRAFT (can draft, not modify directly)
  Action: Draft in content/drafts/, request review
```

### 3. Realtime Violation Blocking

**Automatic (no user action required):**

When you try to write unauthorized documentation:
```
User: Write to specs/core/999-SOP-NEW.md

❌ BLOCKED: Rogue Documentation Creation (A-008)
Session: feature-dev
Authority: NONE (feature-dev cannot modify specs/core/)

Remediation:
1. Move draft to proposals/PROPOSAL-999.md
2. Request strategos-session review
3. After approval, strategos will deploy

Reference: 208-SOP-SESSION-DOCUMENTATION-AUTHORITY
```

### 4. Violation Tracking

**Automatic tracking:**
- Every violation → Entry in ~/.claude/violations/tracker.json
- Session agent card updated with violation count
- Compliance score calculated

**Manual review:**
```bash
# Check violations for current session
bash ~/.claude/SOP/src/tools/get-agent-stats.sh \
    --name "sessions/$(date +%Y-%m-%d)*" \
    --format summary

# Detect historical violations
bash ~/.claude/SOP/src/tools/detect-rogue-sessions.sh \
    --since "7 days ago"
```

### 5. Log Monitoring (Advanced)

**Automatic:**
Plugin monitors logs in realtime for:
- Attempts to bypass enforcement
- Hidden documentation writes
- Summary content in responses

**Manual:**
```bash
python ~/.claude/plugins/sop-enforcer/src/monitor.py \
    --check-logs \
    --since "1 hour ago"
```

---

## Configuration

**plugin.json settings:**

```json
{
  "enforcement_level": "strict",
  "auto_fix_violations": true,
  "qa_mode": "interactive",
  "log_monitoring": true,
  "violation_grace_period_hours": 24
}
```

**enforcement_level:**
- `strict` - Block all violations (default)
- `permissive` - Warn only, track violations
- `audit` - Log only, no blocking

**auto_fix_violations:**
- `true` - Automatically create violation entries
- `false` - Manual violation creation

**qa_mode:**
- `interactive` - Full Q&A (default)
- `quick` - Fast checks only
- `guided` - Step-by-step with examples

**log_monitoring:**
- `true` - Monitor logs realtime (default)
- `false` - Disable log monitoring

**violation_grace_period_hours:**
- Hours before first violation becomes tracked (default: 24)

---

## Violation Codes Enforced

### Category A (Critical - Always Blocked)

**A-008: Rogue Documentation Creation**
- Session creates protected documentation without authority
- **Severity:** 9
- **Action:** BLOCK immediately
- **Example:** feature-dev creates new SOP in specs/core/

**A-009: Summary File Proliferation**
- Session creates summary file outside .claude-notes.md
- **Severity:** 8
- **Action:** BLOCK immediately
- **Example:** session-summary.md created

### Category B (Compliance - Warning + Track)

**B-008: Unauthorized Documentation Modification**
- Session modifies protected documentation without user directive
- **Severity:** 6
- **Action:** WARN, allow with tracking
- **Example:** strategos modifies SOP without user request

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER SESSION                         │
└───────────────┬─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────┐
│              TOOL USE ATTEMPT                           │
│         (Write, Edit, etc.)                             │
└───────────────┬─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────┐
│        PRE-EXECUTION LAYER (cc-auditor)                 │
│                                                          │
│  [sop_authority.py] ─────► Check authority matrix       │
│  [summary_proliferation.py] ─► Check summary patterns   │
│                                                          │
│  DECISION: ALLOW or BLOCK                               │
└───────────────┬─────────────────────────────────────────┘
                │
         BLOCKED │ ALLOWED
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼                         ▼
┌─────────┐            ┌─────────────┐
│ BLOCK   │            │  EXECUTE    │
│ MESSAGE │            │  TOOL       │
└─────────┘            └──────┬──────┘
                              │
                              ▼
                   ┌───────────────────────┐
                   │ POST-EXECUTION LAYER  │
                   │ (PostToolUse hook)    │
                   │                       │
                   │ [sop-monitor.sh]      │
                   │ - Analyze result      │
                   │ - Check response      │
                   │ - Scan for keywords   │
                   └──────┬────────────────┘
                          │
                   VIOLATION? YES
                          │
                          ▼
                   ┌──────────────────┐
                   │ VIOLATION        │
                   │ TRACKER          │
                   │                  │
                   │ 1. Create entry  │
                   │ 2. Update card   │
                   │ 3. Alert session │
                   └──────────────────┘
```

---

## Examples

### Example 1: Blocked Write

**Scenario:** feature-dev tries to create new SOP

```
$ Write to specs/core/210-SOP-NEW.md

❌ BLOCKED by sop-enforcer

Violation: A-008 (Rogue Documentation Creation)
Session: feature-dev
Authority: NONE

feature-dev cannot create SOPs in specs/core/

Remediation:
1. Draft proposal: proposals/PROPOSAL-210.md
2. Use governance-qa skill for guidance
3. Request strategos-session review

This attempt has been logged (no violation entry created due to blocking)
```

### Example 2: Summary File Blocked

**Scenario:** Any session tries to create summary file

```
$ Write to session-summary.md

❌ BLOCKED by sop-enforcer

Violation: A-009 (Summary File Proliferation)

Rule: 208-SOP Rule 1 - Session summaries ONLY in .claude-notes.md

Action: Write your summary to .claude-notes.md instead

Reference: 208-SOP-SESSION-DOCUMENTATION-AUTHORITY
```

### Example 3: Successful SOP Development

**Scenario:** Use governance-qa skill to create SOP

```
User: "Use governance-qa skill to create deployment SOP"

[sop-architect agent activated]

I'll help you develop a comprehensive Deployment SOP.

Let me start with discovery questions:

1. Purpose: What problems does this SOP solve?
   - Inconsistent deployments?
   - Failed deployments?
   - Unclear rollback procedures?

2. Scope: What's being deployed?
   - Backend services?
   - Frontend apps?
   - Infrastructure?

3. Audience: Who will use this SOP?
   - All developers?
   - DevOps team only?
   - Automated systems?

Let's start with purpose...

[Q&A continues, SOP developed section by section]

Final SOP saved: content/drafts/210-SOP-DEPLOYMENT-PROCESS.md

Next steps:
1. Review draft
2. Request PRB review (significant change)
3. Deploy to specs/core/ after approval
```

---

## Troubleshooting

### Issue: Rules not blocking

**Check:**
```bash
# Verify cc-auditor rules registered
cc-auditor rules list | grep sop

# Check rule status
cc-auditor rules status sop_authority
```

**Fix:**
```bash
# Re-register rules
cd ~/.claude/plugins/sop-enforcer/rules
cc-auditor rules add sop_authority.py
cc-auditor rules enable sop_authority
```

### Issue: False positives (legitimate writes blocked)

**Check session type:**
```bash
# View current session card
ls ~/.claude/agent-cards/sessions/*.json | tail -1 | xargs cat | jq '.session_metadata.parent_agent'
```

**Fix:**
- Ensure session card has correct parent_agent
- If strategos-session, should have full authority
- If false positive persists, check authority matrix in sop_authority.py

### Issue: Violations not tracked

**Check:**
```bash
# Verify violation tracker exists
ls ~/.claude/violations/tracker.json

# Check recent violations
bash ~/.claude/SOP/src/tools/get-violation-stats.sh --format summary
```

**Fix:**
```bash
# Initialize tracker if missing
mkdir -p ~/.claude/violations
# Run a validation to create tracker
bash ~/.claude/SOP/src/tools/detect-rogue-sessions.sh --auto-fix
```

---

## Development

### Adding New Rules

**Create rule file:**
```python
# ~/.claude/plugins/sop-enforcer/rules/my_rule.py

class MyRule:
    def __init__(self):
        self.name = "my_rule"
        self.severity = "CRITICAL"

    def check(self, context):
        # Your logic here
        return {"allowed": True, "message": "OK"}

def register_rule():
    return MyRule()
```

**Register:**
```bash
cc-auditor rules add ~/.claude/plugins/sop-enforcer/rules/my_rule.py
cc-auditor rules enable my_rule
```

### Testing Rules

```bash
# Test rule directly
python ~/.claude/plugins/sop-enforcer/rules/sop_authority.py

# Test via cc-auditor
cc-auditor test sop_authority \
    --context '{"tool_name": "Write", "parameters": {"file_path": "CLAUDE.md"}}'
```

---

## Success Metrics

**Plugin is successful if:**
- ✅ Violations detected in <1 second (realtime)
- ✅ False positive rate <5%
- ✅ SOPs developed are complete (no missing sections)
- ✅ Compliance score improving over time
- ✅ Sessions learn from warnings (no repeat violations)

**Plugin has failed if:**
- ❌ Violations slip through undetected
- ❌ Legitimate writes blocked frequently
- ❌ Low-quality SOPs still produced
- ❌ Enforcement ignored or bypassed
- ❌ Sessions frustrated by system

---

## Support

**Issues:** Report in ~/.claude/SOP repository
**Documentation:** 208-SOP-SESSION-DOCUMENTATION-AUTHORITY
**Author:** Strategos (AI Chief of Staff)
**Version:** 1.0.0
**Date:** 2025-11-05

---

**Remember:** This plugin enforces governance with grace. It blocks violations firmly, educates kindly, and tracks accurately. The goal is compliance through understanding, not compliance through fear.
