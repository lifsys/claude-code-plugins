---
name: explore
description: |
  Launch interactive browser exploration session using Claude Code Chrome extension.
  Use for exploratory testing, debugging, visual verification, and demo recording.
---

# Browser Explorer

Launch an interactive browser exploration session.

## Quick Start

```
/leonardo:explore [url]
/leonardo:explore http://localhost:3000
/leonardo:explore https://example.com
```

## What This Does

1. **Initializes browser context** - Gets or creates a tab in the MCP group
2. **Navigates to target** - Opens the specified URL (defaults to localhost:3000)
3. **Begins exploration** - Ready for interactive testing

## Session Protocol

When invoked, execute these steps:

### Step 1: Initialize Browser

```
# Get tab context
Use: mcp__claude-in-chrome__tabs_context_mcp
  createIfEmpty: true

# Create fresh tab for testing
Use: mcp__claude-in-chrome__tabs_create_mcp
```

### Step 2: Navigate to Target

```
# Navigate to the URL
Use: mcp__claude-in-chrome__navigate
  url: [provided URL or "http://localhost:3000"]
  tabId: [from step 1]

# Wait for page load
Use: mcp__claude-in-chrome__computer
  action: "wait"
  duration: 2
  tabId: [tabId]
```

### Step 3: Initial Assessment

```
# Take screenshot
Use: mcp__claude-in-chrome__computer
  action: "screenshot"
  tabId: [tabId]

# Get page structure
Use: mcp__claude-in-chrome__read_page
  tabId: [tabId]
  filter: "interactive"

# Check for errors
Use: mcp__claude-in-chrome__read_console_messages
  tabId: [tabId]
  onlyErrors: true
```

### Step 4: Report Status

Present to user:
- Screenshot of current state
- Interactive elements found
- Any console errors detected
- Ready for exploration commands

---

## Exploration Commands

After initialization, the following actions are available:

### Navigation
- `go to [page]` - Navigate to a different page
- `back` / `forward` - Browser history navigation
- `refresh` - Reload current page

### Interaction
- `click [element]` - Click on described element
- `type [text] in [field]` - Enter text in form field
- `scroll down/up` - Scroll the page
- `press [key]` - Send keyboard input

### Verification
- `screenshot` - Capture current state
- `check console` - View console logs/errors
- `check network` - View network requests
- `read page` - Get page content

### Recording
- `start recording` - Begin GIF capture
- `stop recording` - End GIF capture
- `save recording as [name]` - Export GIF

### Testing
- `test login with [email] [password]` - Test auth flow
- `test form validation` - Submit empty/invalid forms
- `test responsive` - Check mobile/tablet views

---

## Example Sessions

### Debug Session
```
/leonardo:explore http://localhost:3000
> click login button
> type test@example.com in email
> type password123 in password
> click submit
> check console
> screenshot
```

### Recording Session
```
/leonardo:explore http://localhost:3000
> start recording
> [perform actions]
> stop recording
> save recording as feature-demo
```

### Responsive Testing
```
/leonardo:explore http://localhost:3000
> screenshot
> resize to mobile
> screenshot
> resize to tablet
> screenshot
```

---

## Integration

This command uses the `browser-explorer` skill.
For automated testing, use `/leonardo:test` with Playwright.
