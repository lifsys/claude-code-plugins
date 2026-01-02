---
name: browser-explorer
description: |
  Interactive browser exploration and testing using Claude Code Chrome extension.
  Use for exploratory testing, debugging, UI verification, and recording demos.
  Complements Playwright for ad-hoc testing during development.
license: MIT
---

# Browser Explorer

Interactive browser exploration and testing using the Claude Code Chrome extension. This skill enables AI-powered exploratory testing, visual verification, and demo recording.

## When to Use

| Scenario | Use Browser Explorer | Use Playwright |
|----------|---------------------|----------------|
| Debugging a specific issue | ✅ | |
| Exploratory testing | ✅ | |
| Quick visual verification | ✅ | |
| Recording demo GIFs | ✅ | |
| CI/CD automated tests | | ✅ |
| Multi-browser testing | | ✅ |
| Regression test suite | | ✅ |
| Performance benchmarks | | ✅ |

## Prerequisites

1. **Claude Code Chrome Extension** installed and running
2. **Browser tab group** available (auto-created if needed)
3. **Local dev server** running (e.g., `npm run dev`)

## Core Capabilities

### 1. Page Exploration
Navigate and understand page structure:
- Read accessibility tree for element discovery
- Find elements by natural language queries
- Extract page text content
- Take screenshots for visual reference

### 2. Interactive Testing
Perform user interactions:
- Click buttons, links, and elements
- Fill forms with test data
- Scroll and navigate
- Keyboard input and shortcuts

### 3. State Verification
Verify application state:
- Read page content after actions
- Monitor console logs for errors
- Track network requests
- Validate visual appearance

### 4. Demo Recording
Create shareable recordings:
- GIF capture with action overlays
- Click indicators and labels
- Progress bar visualization

---

## Exploration Protocol

### Step 1: Initialize Browser Context

```
# Get available tabs or create new one
Use: tabs_context_mcp with createIfEmpty: true

# If needed, create a dedicated test tab
Use: tabs_create_mcp
```

### Step 2: Navigate to Target

```
# Navigate to the application
Use: navigate with url and tabId

# Wait for page load
Use: computer with action: "wait", duration: 2
```

### Step 3: Understand Page Structure

```
# Get accessibility tree (interactive elements)
Use: read_page with filter: "interactive"

# Or get full page structure
Use: read_page with filter: "all"

# Find specific elements
Use: find with query: "login button" or "search input"
```

### Step 4: Perform Actions

```
# Click using element reference
Use: computer with action: "left_click", ref: "ref_1"

# Or click using coordinates
Use: computer with action: "left_click", coordinate: [x, y]

# Fill form inputs
Use: form_input with ref, value, tabId

# Type text
Use: computer with action: "type", text: "test input"

# Keyboard shortcuts
Use: computer with action: "key", text: "Enter"
```

### Step 5: Verify Results

```
# Take screenshot
Use: computer with action: "screenshot"

# Read page content
Use: get_page_text

# Check console for errors
Use: read_console_messages with onlyErrors: true

# Monitor network requests
Use: read_network_requests with urlPattern: "/api/"
```

---

## Common Test Scenarios

### Authentication Flow Testing

```markdown
## Test: User Login

1. Navigate to login page
2. Find email and password inputs
3. Fill credentials
4. Click login button
5. Verify redirect to dashboard
6. Check for user name display
7. Monitor network for auth token
```

**Execution:**
```
1. navigate: url="/login"
2. read_page: filter="interactive" → find email input (ref_1), password (ref_2), submit (ref_3)
3. form_input: ref="ref_1", value="test@example.com"
4. form_input: ref="ref_2", value="testpassword"
5. computer: action="left_click", ref="ref_3"
6. computer: action="wait", duration=2
7. get_page_text → verify "Welcome" or username
8. read_network_requests: urlPattern="/auth"
```

### Form Validation Testing

```markdown
## Test: Form Validation

1. Navigate to form
2. Submit empty form
3. Verify validation errors appear
4. Fill with invalid data
5. Verify specific error messages
6. Fill with valid data
7. Verify submission success
```

**Execution:**
```
1. navigate: url="/contact"
2. find: query="submit button" → get ref
3. computer: action="left_click", ref=submit_ref
4. read_page → check for error messages
5. form_input: ref=email_ref, value="invalid-email"
6. computer: action="left_click", ref=submit_ref
7. find: query="error message" → verify text
8. form_input: ref=email_ref, value="valid@email.com"
9. computer: action="left_click", ref=submit_ref
10. get_page_text → verify success message
```

### Navigation Testing

```markdown
## Test: Site Navigation

1. Start at homepage
2. Click each nav link
3. Verify correct page loads
4. Test back/forward navigation
5. Test mobile menu (resize)
```

**Execution:**
```
1. navigate: url="/"
2. read_page: filter="interactive" → find nav links
3. For each nav link:
   - computer: action="left_click", ref=link_ref
   - computer: action="wait", duration=1
   - get_page_text → verify page title/content
4. navigate: url="back"
5. resize_window: width=375, height=667
6. find: query="hamburger menu" or "mobile menu"
7. computer: action="left_click", ref=menu_ref
```

### Responsive Design Testing

```markdown
## Test: Responsive Breakpoints

1. Test at desktop (1280x720)
2. Test at tablet (768x1024)
3. Test at mobile (375x667)
4. Verify layout changes
5. Check touch targets on mobile
```

**Execution:**
```
1. resize_window: width=1280, height=720
2. computer: action="screenshot"
3. resize_window: width=768, height=1024
4. computer: action="screenshot"
5. resize_window: width=375, height=667
6. computer: action="screenshot"
7. read_page: filter="interactive" → verify button sizes
```

---

## Error Detection

### Console Error Monitoring

```
# Check for JavaScript errors
Use: read_console_messages
  tabId: [tab]
  onlyErrors: true
  pattern: "error|exception|fail"

# Check for specific warnings
Use: read_console_messages
  tabId: [tab]
  pattern: "deprecation|warning"
```

### Network Error Detection

```
# Monitor failed requests
Use: read_network_requests
  tabId: [tab]
  urlPattern: "/api/"

# Look for:
- 4xx client errors
- 5xx server errors
- Failed/blocked requests
- CORS issues
```

### Visual Regression Checks

```
1. Take screenshot of current state
2. Perform action
3. Take screenshot of new state
4. Compare visually or describe changes
```

---

## GIF Recording Protocol

### Recording Workflow

```markdown
## Record User Flow

1. Start recording
2. Take initial screenshot (first frame)
3. Perform actions with pauses
4. Take final screenshot (last frame)
5. Stop recording
6. Export GIF
```

**Execution:**
```
1. gif_creator: action="start_recording", tabId=[tab]
2. computer: action="screenshot"
3. [Perform actions with wait between each]
4. computer: action="screenshot"
5. gif_creator: action="stop_recording", tabId=[tab]
6. gif_creator: action="export", tabId=[tab], download=true, filename="demo.gif"
```

### GIF Export Options

```
gif_creator: action="export"
  tabId: [tab]
  download: true
  filename: "feature-demo.gif"
  options:
    showClickIndicators: true   # Orange circles at clicks
    showActionLabels: true      # Action descriptions
    showProgressBar: true       # Progress indicator
    showWatermark: true         # Claude logo
    quality: 10                 # 1-30, lower = better
```

### Recording Tips

- Add `wait` actions (1-2s) between steps for readable GIFs
- Take screenshots at key moments for smoother playback
- Use descriptive filenames: `login-flow.gif`, `form-validation.gif`
- Keep recordings focused on single features

---

## Debugging Protocol

### Issue Investigation

```markdown
## Debug: [Issue Description]

1. **Reproduce**: Navigate to the problematic state
2. **Inspect**: Read page structure and console
3. **Isolate**: Identify specific element/action causing issue
4. **Verify**: Confirm the root cause
5. **Document**: Screenshot and describe findings
```

### Console Debugging

```
# Execute JavaScript to inspect state
Use: javascript_tool
  tabId: [tab]
  text: "window.appState" or "document.querySelector('.element').dataset"

# Check for specific values
Use: javascript_tool
  text: "localStorage.getItem('token')"
```

### Network Debugging

```
# Monitor API calls
Use: read_network_requests
  urlPattern: "/api/"

# Check specific endpoints
Use: read_network_requests
  urlPattern: "/api/users"

# Verify request/response data in console
Use: javascript_tool
  text: "fetch('/api/status').then(r => r.json()).then(console.log)"
```

---

## Integration with Quality Guardian

After exploratory testing, document findings for Quality Guardian:

```markdown
## Exploratory Test Report

### Session Info
- Date: [date]
- Duration: [time]
- Coverage: [pages/features tested]

### Issues Found

#### Critical
- [ ] [Issue description] - Screenshot: [link]

#### Major
- [ ] [Issue description]

#### Minor
- [ ] [Issue description]

### Verified Working
- [x] [Feature] - Functions as expected
- [x] [Feature] - No errors in console

### Recommended Playwright Tests
Based on exploration, add automated tests for:
1. [Scenario that should be automated]
2. [Edge case discovered]
```

---

## Tool Reference

### Navigation
| Tool | Purpose |
|------|---------|
| `navigate` | Go to URL or back/forward |
| `tabs_context_mcp` | Get available tabs |
| `tabs_create_mcp` | Create new tab |

### Reading
| Tool | Purpose |
|------|---------|
| `read_page` | Get accessibility tree |
| `find` | Find elements by description |
| `get_page_text` | Extract page text |
| `read_console_messages` | Get console output |
| `read_network_requests` | Get network activity |

### Actions
| Tool | Purpose |
|------|---------|
| `computer` | Click, type, scroll, screenshot |
| `form_input` | Set form field values |
| `javascript_tool` | Execute JS in page |
| `resize_window` | Change viewport size |

### Recording
| Tool | Purpose |
|------|---------|
| `gif_creator` | Start/stop/export GIF |
| `upload_image` | Upload screenshot to page |

---

## Quality Checklist

Before completing exploratory testing:

- [ ] All critical user flows tested
- [ ] Console checked for errors
- [ ] Network requests verified
- [ ] Responsive breakpoints tested
- [ ] Form validation verified
- [ ] Error states tested
- [ ] Loading states observed
- [ ] Findings documented
- [ ] GIF demos recorded (if needed)
- [ ] Playwright test recommendations listed

---

## Example Session

```
User: Test the login flow on my app at localhost:3000