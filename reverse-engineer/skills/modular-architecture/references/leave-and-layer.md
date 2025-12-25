# Leave and Layer Pattern Deep Dive

## Overview

Leave and Layer is a legacy modernization pattern that **augments** existing systems without replacing them. Unlike Strangler Fig (which aims to replace), Leave and Layer preserves the legacy system and builds a new layer around it.

## Core Philosophy

> "Leave the legacy alone. Layer new capability on top."

### Why Leave and Layer for Forks?

**Strangler Fig Problems:**
- Deleting upstream code guarantees merge conflicts
- Replacing modules breaks compatibility
- Gradual replacement means maintaining two systems

**Leave and Layer Benefits:**
- Minimal upstream modifications
- Clear separation of concerns
- Easy sync with upstream
- Rollback is trivial (remove layer)

## Architecture

```
┌────────────────────────────────────────────────────┐
│                ORCHESTRATION LAYER                  │
│  • Routes requests to appropriate handler           │
│  • Manages feature flags                            │
│  • Aggregates responses                             │
└────────────────────────────────────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   EVENT     │  │  EXTENSION  │  │   WRAPPER   │
│  LISTENERS  │  │  SERVICES   │  │  ADAPTERS   │
└─────────────┘  └─────────────┘  └─────────────┘
          │              │              │
          └──────────────┼──────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────┐
│                   HOOK LAYER                        │
│  • Minimal code: emit('EVENT', data)               │
│  • Inserted at strategic points in upstream        │
│  • Only upstream modifications allowed here        │
└────────────────────────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────┐
│               UPSTREAM LEGACY SYSTEM                │
│  • Completely preserved                             │
│  • Original behavior unchanged                      │
│  • Upstream team can continue development          │
└────────────────────────────────────────────────────┘
```

## Implementation Steps

### Step 1: Identify Integration Points

Find places in upstream where you need to add behavior:

```typescript
// Upstream: UserService.createUser()
async createUser(data: UserData): Promise<User> {
  const user = await this.repository.save(data);
  return user;
}

// Integration points needed:
// - Before save: custom validation
// - After save: notify external systems
// - On error: custom error handling
```

### Step 2: Create Event Bus

```typescript
// seams/EventBus.ts
export class EventBus {
  private handlers: Map<string, Set<Function>> = new Map();

  emit(event: string, payload: any): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(payload);
        } catch (error) {
          console.error(`Handler error for ${event}:`, error);
        }
      });
    }
  }

  on(event: string, handler: Function): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);

    // Return unsubscribe function
    return () => this.handlers.get(event)?.delete(handler);
  }
}

export const eventBus = new EventBus();
```

### Step 3: Inject Hooks (Minimal Upstream Changes)

```typescript
// upstream/services/UserService.ts
import { eventBus } from '../../seams/EventBus';

async createUser(data: UserData): Promise<User> {
  // HOOK: Pre-create
  eventBus.emit('USER_PRE_CREATE', { data });

  try {
    const user = await this.repository.save(data);

    // HOOK: Post-create
    eventBus.emit('USER_POST_CREATE', { user });

    return user;
  } catch (error) {
    // HOOK: Error
    eventBus.emit('USER_CREATE_ERROR', { data, error });
    throw error;
  }
}
```

**This is the ONLY upstream modification.**

### Step 4: Build Extension Layer

```typescript
// extensions/listeners/UserListeners.ts
import { eventBus } from '../../seams/EventBus';
import { customValidator } from '../services/CustomValidator';
import { notificationService } from '../services/NotificationService';
import { analyticsService } from '../services/AnalyticsService';

// Custom validation before create
eventBus.on('USER_PRE_CREATE', async ({ data }) => {
  await customValidator.validateUser(data);
});

// Notify external systems after create
eventBus.on('USER_POST_CREATE', async ({ user }) => {
  await notificationService.notifyNewUser(user);
  await analyticsService.trackUserCreation(user);
});

// Custom error handling
eventBus.on('USER_CREATE_ERROR', async ({ data, error }) => {
  await notificationService.alertTeam('User creation failed', { data, error });
});
```

### Step 5: Register Extensions

```typescript
// config/extensions.ts
// Import to register listeners
import '../extensions/listeners/UserListeners';
import '../extensions/listeners/OrderListeners';
import '../extensions/listeners/PaymentListeners';

// Import to register plugins
import { ssoPlugin } from '../extensions/plugins/SSOPlugin';
import { auditPlugin } from '../extensions/plugins/AuditPlugin';

authManager.registerPlugin(ssoPlugin);
authManager.registerPlugin(auditPlugin);
```

## Event Naming Conventions

```
[ENTITY]_[TIMING]_[ACTION]

Examples:
- USER_PRE_CREATE
- USER_POST_CREATE
- ORDER_PRE_PROCESS
- ORDER_POST_PROCESS
- PAYMENT_PRE_CHARGE
- PAYMENT_POST_CHARGE
- AUTH_PRE_LOGIN
- AUTH_POST_LOGIN
- AUTH_LOGIN_FAILED
```

## Handling Synchronous vs Asynchronous

### Synchronous (Blocking)

```typescript
// When extensions must complete before continuing
emitSync(event: string, payload: any): void {
  const handlers = this.handlers.get(event);
  if (handlers) {
    for (const handler of handlers) {
      handler(payload);  // Blocks until complete
    }
  }
}
```

### Asynchronous (Fire-and-Forget)

```typescript
// When extensions shouldn't block
emitAsync(event: string, payload: any): void {
  const handlers = this.handlers.get(event);
  if (handlers) {
    Promise.all(
      Array.from(handlers).map(handler =>
        Promise.resolve(handler(payload)).catch(console.error)
      )
    );
  }
}
```

### Async with Await

```typescript
// When you need to wait for extensions
async emitAwait(event: string, payload: any): Promise<void> {
  const handlers = this.handlers.get(event);
  if (handlers) {
    await Promise.all(
      Array.from(handlers).map(handler =>
        handler(payload)
      )
    );
  }
}
```

## Upstream Sync Protocol

When upstream updates:

1. **Fetch changes:**
   ```bash
   git fetch upstream
   ```

2. **Review hook files:**
   ```bash
   git diff upstream/main -- '**/UserService.ts'
   # Only look for conflicts around emit() lines
   ```

3. **Rebase:**
   ```bash
   git rebase upstream/main
   ```

4. **Verify hooks:**
   ```bash
   grep -r "eventBus.emit" upstream/
   # Ensure all hooks still present
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

## Migration from Direct Modifications

If you have existing direct modifications:

### Before (Invasive)

```typescript
// Upstream file modified extensively
async createUser(data: UserData): Promise<User> {
  // Custom validation (20 lines)
  if (!data.email.includes('@company.com')) {
    throw new Error('Must use company email');
  }

  const user = await this.repository.save(data);

  // Custom notification (15 lines)
  await fetch('https://api.company.com/notify', {
    method: 'POST',
    body: JSON.stringify(user)
  });

  // Custom analytics (10 lines)
  analytics.track('user_created', user);

  return user;
}
```

### After (Leave and Layer)

```typescript
// Upstream file (minimal changes)
async createUser(data: UserData): Promise<User> {
  eventBus.emit('USER_PRE_CREATE', { data });
  const user = await this.repository.save(data);
  eventBus.emit('USER_POST_CREATE', { user });
  return user;
}

// extensions/listeners/UserListeners.ts
// All custom logic moved here
```

## Benefits Summary

| Aspect | Before (Invasive) | After (Leave and Layer) |
|--------|-------------------|-------------------------|
| Merge conflicts | Every sync | Rare (hooks only) |
| Sync effort | Hours/days | Minutes |
| Custom code location | Scattered in upstream | Centralized in extensions |
| Rollback | Complex | Remove listener |
| Testing | Modified upstream | Isolated extension tests |
| Team independence | Blocked by upstream | Parallel development |
