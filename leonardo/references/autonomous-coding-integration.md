# Autonomous Coding Integration

This document integrates patterns from the Anthropic Claude Quickstarts autonomous-coding system into Leonardo.

## Source Reference
Based on: https://github.com/anthropics/claude-quickstarts/tree/main/autonomous-coding/prompts

## Core Principles Integrated

### 1. Multi-Session Development Framework

Leonardo adopts the multi-session approach where:
- **Session 1 (Initializer)**: Generate specification and feature list
- **Sessions 2-N (Coding)**: Implement features incrementally
- **Final Session**: Verification and polish

### 2. Immutable Feature List

Critical constraint integrated:
```
IT IS CATASTROPHIC TO REMOVE OR EDIT FEATURES IN FUTURE SESSIONS
```

Leonardo enforces:
- Features defined in `feature_list.json` are locked after creation
- Only the `status` field may be modified
- Test definitions are immutable
- All features start with `"status": "failing"`

### 3. Comprehensive Feature Coverage

Leonardo requires:
- Minimum 200 features total
- Mix of functional and style test categories
- At least 25 features with 10+ test steps each
- All features must have testable verification steps

### 4. Orientation Phase Protocol

Before implementation, Leonardo agents must:
1. Read the project specification (`project_specification.xml`)
2. Review `feature_list.json` for requirements
3. Check `progress.md` for session history
4. Assess remaining work before proceeding

### 5. Verification-First Development

From the autonomous-coding philosophy:
- "Test through the UI with clicks and keyboard input"
- Visual appearance must be verified alongside functionality
- Never rely solely on backend API testing
- Browser automation for E2E verification

### 6. Production Quality Standards

Leonardo enforces:
- No placeholder code or TODO comments
- Complete error handling
- Proper security practices
- Performance optimization
- Accessibility compliance

## Integrated Workflow

### Phase 1: Initialization (Spec Orchestrator)

```
1. Generate project_specification.xml
   - Complete XML with all sections
   - Technology stack decisions
   - Feature requirements
   - Success criteria

2. Generate feature_list.json
   - 200+ features minimum
   - Testable verification steps
   - Priority ordering
   - Dependency mapping

3. Generate init.sh
   - Environment setup
   - Dependency installation
   - Service startup
   - Health verification

4. Initialize git repository
   - First commit with all foundation files
   - README with setup instructions
```

### Phase 2: Implementation (Parallel Agents)

```
For each session:
1. Orientation
   - Read current state
   - Identify next features
   - Check blockers

2. Server Setup
   - Run init.sh if needed
   - Verify services running

3. Verification Testing
   - Test previously completed work
   - Identify regressions

4. Feature Implementation
   - Select highest-priority failing feature
   - Implement completely
   - Test through UI

5. Documentation Updates
   - Update progress.md
   - Update feature status (passes only)

6. Version Control
   - Commit with descriptive message
   - Document what was verified
```

### Phase 3: Verification (Quality Guardian)

```
1. Run full test suite
2. Verify all features through UI
3. Check against success criteria
4. Generate quality report
5. Identify any remaining issues
```

## Agent Communication Protocol

Leonardo agents communicate status using:

```json
{
  "agent": "[agent-name]",
  "status": "complete|in_progress|blocked",
  "artifacts": ["list", "of", "files"],
  "features_completed": 15,
  "features_remaining": 185,
  "blockers": [],
  "ready_for": ["next-agent-1", "next-agent-2"]
}
```

## Session Handoff Protocol

At session end, Leonardo ensures:

```markdown
## Session [N] Complete

### Completed
- [List of features implemented]

### Verified
- [List of features tested]

### Status
- Features passing: X/200
- Test coverage: Y%
- Blockers: [list or "none"]

### Next Session
- Priority: [next features]
- Estimated: [completion percentage]
```

## Key Differences from Base System

| Aspect | Original | Leonardo Enhancement |
|--------|----------|---------------------|
| Agent Model | Single agent | Parallel multi-agent |
| Specification | Text file | Structured XML |
| Feature Gen | Manual | Automated from spec |
| Testing | Manual verification | Automated + Manual |
| Progress | Text notes | Structured JSON/MD |
| Orchestration | Human-driven | AI-orchestrated |

## Integration Points

### With spec-orchestrator skill
- Generates spec in format compatible with autonomous workflow
- Produces feature_list.json with proper structure
- Creates init.sh from technology stack

### With implementation agents
- Each agent reads relevant spec sections
- Updates feature status on completion
- Reports to orchestrator for coordination

### With quality-guardian skill
- Runs verification against feature_list.json
- Tests through UI as specified
- Updates final status before delivery

## Configuration

To enable full autonomous-coding integration:

```json
{
  "leonardo": {
    "autonomousCoding": {
      "enabled": true,
      "minFeatures": 200,
      "featureTestsMin": 5,
      "complexFeatureTestsMin": 10,
      "immutableFeatures": true,
      "uiVerification": true,
      "parallelAgents": true
    }
  }
}
```
