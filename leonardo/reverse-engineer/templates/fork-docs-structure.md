# Fork Documentation Structure Template

Use when generating `/docs` scaffolding for fork projects.

---

## Directory Structure

```
docs/
├── ARCHITECTURE.md       # Fork architecture decisions
├── SYNC-PROTOCOL.md      # Upstream sync procedures
├── SEAM-CATALOG.md       # All seams with details
├── EXTENSION-GUIDE.md    # How to add extensions
├── TROUBLESHOOTING.md    # Common issues
└── SYNC-LOG.md           # Sync history
```

---

## ARCHITECTURE.md Template

```markdown
# Fork Architecture

## Design Principles

1. **Additive Over Invasive**: Extensions add behavior; they don't modify core behavior
2. **Seam Minimization**: Fewer seams = easier syncs
3. **Test Coverage**: Every seam has characterization tests
4. **Documentation First**: Seams documented before implementation

## Architectural Layers

### Layer 1: Upstream Core
- Location: `upstream/`
- Policy: **READ-ONLY** except for seam injection
- Updates: Weekly sync with upstream

### Layer 2: Seam/Hook Layer
- Location: `seams/`
- Policy: Minimal code, event emissions only
- Pattern: `eventBus.emit('EVENT_NAME', data)`

### Layer 3: Extension Layer
- Location: `extensions/`
- Policy: All custom logic here
- Patterns: Plugins, Listeners, Wrappers, Middleware

### Layer 4: Configuration
- Location: `config/`
- Policy: Wire extensions to seams
- Content: Plugin registration, event subscriptions

## Patterns Used

### Event-Driven Architecture
[Description of event bus implementation]

### Plugin System
[Description of plugin registration]

### Dependency Injection
[Description of DI approach]

## Decision Log

| Date | Decision | Rationale | Impact |
|------|----------|-----------|--------|
| | | | |
```

---

## SYNC-PROTOCOL.md Template

```markdown
# Upstream Sync Protocol

## Schedule

- **Frequency**: Weekly (Monday morning)
- **Owner**: [Team/Person]
- **Duration**: Typically 30-60 minutes

## Pre-Sync Checklist

- [ ] All local changes committed
- [ ] Tests passing on current state
- [ ] No pending PRs against modified files

## Sync Procedure

### Step 1: Preparation

```bash
# Ensure clean working directory
git status

# Stash any work in progress
git stash
```

### Step 2: Fetch Upstream

```bash
git fetch upstream
git log --oneline HEAD..upstream/main | head -20
```

### Step 3: Review Changes

```bash
# Check if seam files affected
git diff --name-only HEAD..upstream/main | grep -E "seam-files-pattern"

# Review changes to files we've hooked
git diff HEAD..upstream/main -- path/to/hooked/files
```

### Step 4: Rebase

```bash
git rebase upstream/main

# If conflicts:
# 1. Resolve conflict (preserve hooks)
# 2. git add resolved-file
# 3. git rebase --continue
```

### Step 5: Verify

```bash
# Check hooks still present
grep -r "eventBus.emit" upstream/

# Run tests
npm test

# Run characterization tests specifically
npm test -- --testPathPattern=characterization
```

### Step 6: Document

Update SYNC-LOG.md with:
- Date
- Commits synced
- Conflicts encountered
- Resolution approach
- Any seam updates needed

## Conflict Resolution

### Priority Order

1. **Upstream Intent**: Understand what upstream was trying to achieve
2. **Preserve Hooks**: Re-inject any hooks that were lost
3. **Verify Behavior**: Characterization tests must pass
4. **Document**: Update seam registry if needed

### Common Scenarios

#### Hook Line Moved
```bash
# Find where hook was
git log -p -- file.ts | grep -A5 -B5 "emit"
# Re-apply at new location
```

#### File Renamed
```bash
# Update seam registry
# Re-apply hooks to new file name
```

#### Logic Refactored
```bash
# Identify new seam point
# May need new hook location
# Update characterization tests
```

## Emergency Rollback

```bash
# If sync caused issues
git reflog  # Find pre-sync commit
git reset --hard HEAD@{n}  # Roll back
```
```

---

## EXTENSION-GUIDE.md Template

```markdown
# Extension Development Guide

## Overview

All custom functionality MUST be implemented as extensions, never as modifications to upstream code.

## Extension Types

### 1. Event Listeners

Subscribe to events emitted by hooks:

```typescript
// extensions/listeners/MyListener.ts
import { eventBus } from '../../seams/EventBus';

eventBus.on('EVENT_NAME', async (data) => {
  // Custom logic here
});
```

### 2. Plugins

Register with plugin managers:

```typescript
// extensions/plugins/MyPlugin.ts
import { pluginManager } from '../../seams/PluginManager';

class MyPlugin implements IPlugin {
  // Implementation
}

pluginManager.register(new MyPlugin());
```

### 3. Service Wrappers

Decorate upstream services:

```typescript
// extensions/wrappers/MyWrapper.ts
class WrappedService {
  constructor(private original: OriginalService) {}

  method() {
    // Pre-processing
    const result = this.original.method();
    // Post-processing
    return result;
  }
}
```

## Creating a New Extension

### Step 1: Identify Need

- What behavior do you need?
- Does a hook exist for this?
- Can existing extension be modified?

### Step 2: Check for Hooks

```bash
grep -r "emit" seams/
```

If no hook exists, request seam injection.

### Step 3: Implement

1. Create file in appropriate `extensions/` subdirectory
2. Import necessary seam interfaces
3. Implement logic
4. Export if needed

### Step 4: Register

Add import to `config/extensions.ts`:

```typescript
import '../extensions/listeners/MyListener';
```

### Step 5: Test

```bash
npm test -- --testPathPattern=MyListener
```

### Step 6: Document

Update this guide if new pattern introduced.

## Testing Extensions

### Unit Tests

```typescript
describe('MyListener', () => {
  test('handles event correctly', async () => {
    // Arrange
    const data = { id: 1 };

    // Act
    eventBus.emit('EVENT_NAME', data);

    // Assert
    expect(/* result */).toBe(/* expected */);
  });
});
```

### Integration Tests

Test extension with real upstream code paths.

## Debugging

### Event Not Firing

1. Check hook exists in upstream
2. Verify event name matches exactly
3. Check listener is imported in config

### Listener Not Running

1. Check for errors in listener
2. Verify async/await handling
3. Check listener registration order
```

---

## SYNC-LOG.md Template

```markdown
# Upstream Sync Log

Track all upstream synchronization events.

## Log Format

```
## [DATE] - Sync #[N]

### Summary
- Commits synced: [N]
- Conflicts: [N]
- Duration: [time]
- Synced by: [name]

### Commits Included
- [hash] [message]
- [hash] [message]

### Conflicts Encountered
- [file]: [description] → [resolution]

### Seam Updates
- [seam]: [change description]

### Notes
[Any additional observations]
```

---

## Sync History

## [DATE] - Sync #1

### Summary
- Commits synced: 0
- Conflicts: 0
- Duration: Initial setup
- Synced by: [name]

### Notes
Fork initialized from upstream at commit [hash].

---
```
