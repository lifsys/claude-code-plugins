---
name: feature-list
description: |
  Output style for feature_list.json generation. Ensures comprehensive feature coverage
  with testable verification steps.
---

# Feature List Output Style

Format feature lists for automated testing and progress tracking.

## JSON Structure

```json
{
  "$schema": "Leonardo Feature List Schema",
  "project": {
    "name": "[Project Name]",
    "created_at": "[ISO Timestamp]",
    "version": "1.0.0"
  },
  "instructions": {
    "locked_message": "Features and tests are immutable after creation. Only status may be updated.",
    "workflow": [
      "1. Select highest-priority failing feature",
      "2. Implement feature completely",
      "3. Run all tests for that feature",
      "4. Update status to 'passing' only when ALL tests pass",
      "5. Commit changes with descriptive message",
      "6. Repeat for next feature"
    ]
  },
  "features": [...],
  "metadata": {
    "total_features": 200,
    "passing": 0,
    "failing": 200,
    "in_progress": 0,
    "blocked": 0,
    "last_updated": "[ISO Timestamp]"
  }
}
```

## Feature Object Structure

```json
{
  "id": "feature-001",
  "name": "User Authentication",
  "description": "Complete user authentication flow including login, logout, and session management",
  "category": "authentication",
  "priority": 1,
  "status": "failing",
  "tests": [
    "User can access login page",
    "Login form displays email and password fields",
    "Submit with valid credentials redirects to dashboard",
    "Submit with invalid credentials shows error message",
    "Logout button is visible when authenticated",
    "Logout clears session and redirects to login",
    "Protected routes redirect unauthenticated users to login",
    "Session persists across page refreshes",
    "Password field masks input characters",
    "Remember me checkbox maintains session for 7 days"
  ],
  "dependencies": [],
  "implementation_notes": ""
}
```

## Feature Categories

Map to specification core_features sections:

| Category ID | Description | Min Features |
|-------------|-------------|--------------|
| `setup` | Project foundation, database, config | 10 |
| `authentication` | Login, logout, session, roles | 15 |
| `chat-interface` | Message display, input, streaming | 25 |
| `artifacts` | Code preview, rendering, editing | 20 |
| `conversations` | CRUD, search, organization | 20 |
| `projects` | Grouping, settings, templates | 15 |
| `model-selection` | Model picker, capabilities | 10 |
| `custom-instructions` | Global, project, conversation | 10 |
| `settings` | Theme, preferences, accessibility | 15 |
| `advanced` | Parameters, modes, inputs | 15 |
| `collaboration` | Sharing, export, templates | 10 |
| `search` | Full-text, filters, palette | 10 |
| `usage` | Tracking, analytics, limits | 10 |
| `onboarding` | Welcome, tour, examples | 5 |
| `accessibility` | Keyboard, screen reader, contrast | 10 |

**Total Minimum: 200 features**

## Test Writing Guidelines

### Test Characteristics
- **Observable**: Test can be verified visually or through output
- **Specific**: One behavior per test
- **Independent**: Test doesn't depend on other tests passing
- **Deterministic**: Same result every time

### Good Test Examples
```json
"tests": [
  "Sidebar displays list of conversations",
  "Clicking 'New Chat' creates empty conversation",
  "Conversation title appears in sidebar after first message",
  "Search input filters conversation list in real-time",
  "Right-click on conversation shows context menu",
  "Delete option in context menu removes conversation",
  "Deleted conversation no longer appears in list"
]
```

### Bad Test Examples (Avoid)
```json
"tests": [
  "Sidebar works correctly",           // Too vague
  "User can do things with conversations", // Not specific
  "Everything loads properly",          // Not testable
  "Feature is implemented"              // Not a behavior
]
```

## Priority Levels

| Priority | Description | Implementation Order |
|----------|-------------|---------------------|
| 1 | Foundation (setup, auth) | First |
| 2 | Core features (chat, conversations) | Second |
| 3 | Secondary features (projects, settings) | Third |
| 4 | Enhancement features (sharing, analytics) | Fourth |
| 5 | Polish features (onboarding, accessibility) | Fifth |

## Status Transitions

```
failing → in_progress → passing
    ↓
  blocked
```

- `failing`: Not yet implemented
- `in_progress`: Currently being worked on
- `passing`: All tests verified
- `blocked`: Cannot proceed (external dependency)

## Complex Feature Example

```json
{
  "id": "chat-015",
  "name": "Streaming Message Response",
  "description": "Display assistant responses as they stream from the API with proper formatting and interruptibility",
  "category": "chat-interface",
  "priority": 2,
  "status": "failing",
  "tests": [
    "Sending message shows typing indicator",
    "Response text appears incrementally as it streams",
    "Streaming text renders markdown in real-time",
    "Code blocks appear with syntax highlighting during stream",
    "Stop button appears during streaming",
    "Clicking stop button halts the response",
    "Partial response is preserved after stopping",
    "Cursor/caret indicates streaming position",
    "Long responses auto-scroll to keep latest content visible",
    "Network error during stream shows error message",
    "Retry button appears after stream error",
    "Token count updates as response streams"
  ],
  "dependencies": ["chat-001", "chat-005"],
  "implementation_notes": "Use SSE for streaming, handle reconnection gracefully"
}
```

## Validation Rules

1. **Minimum 200 features total**
2. **Each feature has 5+ tests**
3. **At least 25 features have 10+ tests**
4. **All categories represented**
5. **Dependencies reference valid feature IDs**
6. **No duplicate feature IDs**
7. **All features start with status: "failing"**
