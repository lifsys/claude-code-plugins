---
name: Modular Architecture
description: This skill should be used when designing plugin/extension architectures, implementing the Microkernel pattern, applying Event-Driven Architecture for loose coupling, using the Leave and Layer modernization approach, or choosing between Strangler Fig and additive patterns for legacy code.
version: 0.1.0
---

# Modular Architecture for Fork Maintenance

Architectural patterns that minimize the surface area of conflict between local extensions and upstream core, enabling sustainable soft fork maintenance.

## Core Principle

**Additive over Invasive:** Extensions should add behavior without modifying upstream source code. Every modification to upstream creates a potential merge conflict on the next sync.

## Key Patterns

### 1. Microkernel (Plugin) Pattern

The gold standard for extensible software. Separates application into minimal "Core" and extended "Plugins."

**In fork context:**
- **Core** = Unmodified upstream code
- **Plugins** = Downstream capabilities

**Implementation:**

```typescript
// Upstream (minimal modification)
interface IAuthPlugin {
  authenticate(credentials: Credentials): Promise<User | null>;
}

class AuthManager {
  private plugins: IAuthPlugin[] = [];

  registerPlugin(plugin: IAuthPlugin) {
    this.plugins.push(plugin);
  }

  async authenticate(credentials: Credentials): Promise<User | null> {
    for (const plugin of this.plugins) {
      const user = await plugin.authenticate(credentials);
      if (user) return user;
    }
    return null;
  }
}

// Extension (in your fork)
class SSOAuthPlugin implements IAuthPlugin {
  async authenticate(credentials: Credentials): Promise<User | null> {
    // Custom SSO logic
  }
}

// Registration (configuration)
authManager.registerPlugin(new SSOAuthPlugin());
```

**Benefits:**
- Upstream modified once (to support plugins)
- New features = new plugin files
- No conflicts on upstream updates

### 2. Event-Driven Architecture (EDA)

Provides loosest possible coupling through pub/sub messaging.

**Concept:**
- Core emits events (signals) at key points
- Extensions subscribe to events
- Core doesn't know who's listening

**Implementation:**

```typescript
// Event Bus (could be in upstream or extension)
class EventBus {
  private subscribers = new Map<string, Function[]>();

  emit(event: string, data: any) {
    const handlers = this.subscribers.get(event) || [];
    handlers.forEach(handler => handler(data));
  }

  on(event: string, handler: Function) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event)!.push(handler);
  }
}

// Upstream (hook injection)
class OrderProcessor {
  constructor(private events: EventBus) {}

  processOrder(order: Order) {
    this.events.emit('PRE_ORDER_PROCESS', order);

    // Original processing logic
    const result = this.executeProcessing(order);

    this.events.emit('POST_ORDER_PROCESS', { order, result });
    return result;
  }
}

// Extension (subscriber)
eventBus.on('PRE_ORDER_PROCESS', (order) => {
  // Custom validation
  customValidator.validate(order);
});

eventBus.on('POST_ORDER_PROCESS', ({ order, result }) => {
  // Custom analytics
  analytics.track('order_processed', order);
});
```

**Events to Consider:**
| Lifecycle Point | Event Pattern |
|-----------------|---------------|
| Before action | `PRE_ACTION` |
| After action | `POST_ACTION` |
| On error | `ACTION_ERROR` |
| State change | `STATE_CHANGED` |

### 3. Leave and Layer Pattern

**Distinct from Strangler Fig.** Goal is to *augment* legacy, not *replace* it.

**Strangler Fig vs Leave and Layer:**

| Aspect | Strangler Fig | Leave and Layer |
|--------|---------------|-----------------|
| Goal | Replace legacy | Augment legacy |
| End state | Legacy deleted | Legacy preserved |
| Risk | Breaking changes | Minimal risk |
| Fork suitability | ❌ Poor | ✅ Excellent |

**Implementation:**

```
┌─────────────────────────────────────┐
│          Extension Layer            │
│  ┌─────────────────────────────┐    │
│  │    Event Listeners          │    │
│  │    Custom Services          │    │
│  │    Business Logic           │    │
│  └─────────────────────────────┘    │
│                 ▲                   │
│                 │ Events            │
│                 │                   │
├─────────────────────────────────────┤
│          Hook Layer                 │
│  ┌─────────────────────────────┐    │
│  │    emit('EVENT')            │    │ ← Minimal upstream changes
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│          Upstream Core              │
│  ┌─────────────────────────────┐    │
│  │    Original Logic           │    │ ← Untouched
│  │    (preserved exactly)      │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Key Principle:** The only modification to upstream is insertion of "hooks" (event emissions). All custom logic lives in the extension layer.

### 4. Middleware Pattern

For languages supporting higher-order functions.

```typescript
// Express-style middleware
type Middleware = (req: Request, res: Response, next: () => void) => void;

class Pipeline {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  execute(req: Request, res: Response) {
    let index = 0;
    const next = () => {
      if (index < this.middlewares.length) {
        this.middlewares[index++](req, res, next);
      }
    };
    next();
  }
}

// Extensions
pipeline.use(customLoggingMiddleware);
pipeline.use(customAuthMiddleware);
pipeline.use(upstreamHandler);  // Original behavior
pipeline.use(customAnalyticsMiddleware);
```

### 5. Decorator Pattern

Wrap upstream functionality without modifying it.

```typescript
// Upstream
class PaymentService {
  processPayment(amount: number): Result {
    // Original logic
  }
}

// Extension (decorator)
class AuditedPaymentService {
  constructor(private wrapped: PaymentService) {}

  processPayment(amount: number): Result {
    console.log(`Processing payment: ${amount}`);
    const result = this.wrapped.processPayment(amount);
    console.log(`Payment result: ${result.status}`);
    return result;
  }
}

// Usage (DI configuration)
container.register('payment', new AuditedPaymentService(
  new PaymentService()
));
```

## Pattern Selection Guide

| Scenario | Recommended Pattern |
|----------|---------------------|
| Need runtime extension points | Microkernel (Plugin) |
| Loose coupling, many extensions | Event-Driven |
| Must preserve legacy exactly | Leave and Layer |
| Request/response pipeline | Middleware |
| Wrap specific service | Decorator |
| Replace specific component | Branch by Abstraction |

## Fork Architecture Template

```
project/
├── upstream/              # Unmodified upstream (submodule or vendor)
│   └── src/
│       └── core/         # Upstream source
│
├── extensions/            # ALL custom code here
│   ├── plugins/          # Plugin implementations
│   ├── listeners/        # Event subscribers
│   ├── middleware/       # Middleware functions
│   └── services/         # Service wrappers
│
├── seams/                 # Hook injection points
│   ├── events.ts         # Event definitions
│   └── hooks/            # Hook implementations
│
└── config/
    ├── plugins.ts        # Plugin registration
    └── events.ts         # Event subscriptions
```

## Anti-Patterns to Avoid

### ❌ Inline Modifications
```typescript
// BAD: Modifying upstream directly
function upstreamFunction() {
  // Original code...
  customLogic();  // ← Direct injection
  // More original code...
}
```

### ❌ Copy-Paste Customization
```typescript
// BAD: Copying upstream file to modify
// extensions/copied-upstream-file.ts
// Now have to maintain this copy forever
```

### ❌ Tight Extension Coupling
```typescript
// BAD: Extension depends on upstream internals
import { _privateHelper } from 'upstream/internal';
```

### ✅ Correct Approach
```typescript
// GOOD: Extension through interfaces
import { IPublicService } from 'upstream/interfaces';

class CustomService implements IPublicService {
  // Custom implementation
}
```

## Related Resources

- Microkernel details: `references/microkernel-pattern.md`
- Event-driven implementation: `references/event-driven-pattern.md`
- Leave and Layer deep dive: `references/leave-and-layer.md`

## Related Commands

- `/init-fork` - Set up architecture for new fork
- `/map-seams` - Find hook injection points
