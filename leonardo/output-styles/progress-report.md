---
name: progress-report
description: |
  Output style for progress reports and status updates during Leonardo development sessions.
  Provides consistent formatting for tracking implementation progress.
---

# Progress Report Output Style

Format all progress updates using this style guide.

## Report Structure

### Session Header
```markdown
# Leonardo Progress Report

**Project**: [Project Name]
**Session**: [N] of [Total Expected]
**Date**: [YYYY-MM-DD]
**Duration**: [X hours]

---
```

### Status Summary
Use visual indicators for quick scanning:
```markdown
## Status Summary

| Metric | Value | Status |
|--------|-------|--------|
| Specification | 100% | ✅ Complete |
| Backend | 75% | 🔄 In Progress |
| Frontend | 50% | 🔄 In Progress |
| Tests | 25% | ⏳ Pending |
| Documentation | 0% | ⏳ Pending |

**Overall Progress**: ████████░░ 65%
```

### Agent Status
```markdown
## Agent Deployment

| Agent | Status | Output | Notes |
|-------|--------|--------|-------|
| architecture-agent | ✅ Complete | 12 tables, 45 endpoints | |
| frontend-agent | 🔄 Running | 30/45 components | ETA: 30min |
| backend-agent | ✅ Complete | All services | |
| test-agent | ⏳ Queued | - | Waiting on frontend |
| review-agent | ⏳ Queued | - | |
| docs-agent | ⏳ Queued | - | |
```

### Completed Tasks
```markdown
## Completed This Session

### Backend (architecture-agent + backend-agent)
- [x] Database schema implemented (12 tables)
- [x] All API routes created (45 endpoints)
- [x] Authentication middleware
- [x] Claude API integration with streaming
- [x] File upload handling

### Frontend (frontend-agent)
- [x] Main layout structure
- [x] Sidebar component
- [x] Chat interface base
- [ ] Message rendering (in progress)
- [ ] Artifact panel (pending)
```

### Issues Encountered
```markdown
## Issues & Resolutions

### Issue 1: [Brief Title]
- **Severity**: High | Medium | Low
- **Description**: [What happened]
- **Resolution**: [How it was fixed]
- **Time Lost**: [Duration]

### Blockers (Unresolved)
1. [Blocker description] - **Owner**: [Agent/Human]
```

### Next Session Plan
```markdown
## Next Session

### Priority Tasks
1. Complete frontend component implementation
2. Generate test suite
3. Run full verification

### Agent Queue
1. frontend-agent (continue)
2. test-agent (start)
3. review-agent (start after tests)

### Estimated Completion
- This session: 65% → 85%
- Next session: 85% → 100%
```

## Visual Indicators

### Status Icons
- ✅ Complete
- 🔄 In Progress
- ⏳ Pending/Queued
- ❌ Failed/Blocked
- ⚠️ Warning/Issue

### Progress Bars
```
0%   ░░░░░░░░░░
25%  ██░░░░░░░░
50%  █████░░░░░
75%  ███████░░░
100% ██████████
```

### Priority Tags
- 🔴 Critical
- 🟠 High
- 🟡 Medium
- 🟢 Low

## Example Full Report

```markdown
# Leonardo Progress Report

**Project**: ChatAssist - AI Customer Support
**Session**: 2 of 4
**Date**: 2025-01-15
**Duration**: 3.5 hours

---

## Status Summary

| Metric | Value | Status |
|--------|-------|--------|
| Specification | 100% | ✅ Complete |
| Backend | 100% | ✅ Complete |
| Frontend | 80% | 🔄 In Progress |
| Tests | 40% | 🔄 In Progress |
| Documentation | 20% | 🔄 In Progress |

**Overall Progress**: ████████░░ 72%

---

## Completed This Session

### Backend
- [x] All 45 API endpoints implemented
- [x] Authentication with JWT
- [x] Claude streaming integration
- [x] Rate limiting middleware

### Frontend
- [x] All layout components
- [x] Chat interface with streaming
- [x] Conversation sidebar
- [x] Message rendering with markdown
- [ ] Artifact panel (90% complete)
- [ ] Settings modal (pending)

### Tests
- [x] Unit tests for all services
- [x] API integration tests
- [ ] E2E browser tests (in progress)

---

## Issues & Resolutions

### Issue 1: SSE Connection Drops
- **Severity**: High
- **Description**: Streaming connections dropping after 30s
- **Resolution**: Added keep-alive ping every 15s
- **Time Lost**: 45 minutes

---

## Next Session

### Priority Tasks
1. 🔴 Complete artifact panel
2. 🔴 Finish E2E tests
3. 🟠 Settings modal implementation
4. 🟡 Documentation completion

### Estimated Completion
Next session should complete all implementation.
Final session for polish and verification.
```
