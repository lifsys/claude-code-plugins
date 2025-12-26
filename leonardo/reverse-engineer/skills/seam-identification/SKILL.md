---
name: Seam Identification
description: This skill should be used when finding injection points for dependency injection, identifying places to alter behavior without modifying source code, understanding Michael Feathers' seam concepts, applying Sprout and Wrap refactoring techniques, or implementing monkey patching safely in dynamic languages.
version: 0.1.0
---

# Seam Identification

A "seam" is a place where you can alter behavior in your program without editing the source code in that place (Michael Feathers, "Working Effectively with Legacy Code"). Seams are the foundation of safe refactoring and extensible architecture.

## Seam Types

### Object Seams (Dependency Injection)

The most robust and preferred seam type. Behavior is altered by providing different objects at runtime.

**Anti-pattern (no seam):**
```typescript
class OrderProcessor {
  private paymentService = new PaymentService();

  processOrder(order: Order) {
    this.paymentService.charge(order.total);
  }
}
```

**With seam (dependency injection):**
```typescript
interface IPaymentService {
  charge(amount: number): Promise<Result>;
}

class OrderProcessor {
  constructor(private paymentService: IPaymentService) {}

  processOrder(order: Order) {
    this.paymentService.charge(order.total);
  }
}
```

**Enabling point:** Constructor, setter, or method parameter where the dependency is provided.

**Fork benefit:** Inject custom implementation without modifying upstream OrderProcessor.

### Link Seams (Build-time Substitution)

Behavior altered by changing what gets linked/imported at build time.

**Mechanisms:**
- TypeScript/Webpack: `tsconfig.json` paths, module aliases
- Python: `PYTHONPATH` manipulation, import hooks
- Go: Build tags, interface-based linking
- Java: Classpath ordering, ServiceLoader

**Example (TypeScript paths):**
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@services/*": ["./extensions/services/*"]
    }
  }
}
```

Now `import { Auth } from '@services/auth'` resolves to your extension, not upstream.

### Preprocessing Seams

Compile-time or runtime conditionals that select behavior.

**C/C++:**
```c
#ifdef CUSTOM_AUTH
  custom_authenticate(user);
#else
  standard_authenticate(user);
#endif
```

**Feature Flags (Runtime):**
```typescript
if (config.features.customPayment) {
  return new CustomPaymentProcessor();
} else {
  return new StandardPaymentProcessor();
}
```

### Hook Points (Event Emission)

Not strictly seams in Feathers' definition, but serve similar purpose. Places where events can be emitted for external handlers.

**Candidates:**
- State mutation functions
- I/O operations
- Lifecycle transitions
- Critical business logic

**Implementation:**
```typescript
class UserService {
  async createUser(data: UserData): Promise<User> {
    this.events.emit('PRE_USER_CREATE', data);  // Hook point

    const user = await this.repository.save(data);

    this.events.emit('POST_USER_CREATE', user);  // Hook point
    return user;
  }
}
```

## Refactoring Techniques

### Sprout Method

Add new behavior by "sprouting" a new method rather than modifying existing code.

**Before:**
```typescript
saveUser(user: User) {
  this.validate(user);
  this.repository.save(user);
}
```

**After (sprouted method):**
```typescript
saveUser(user: User) {
  this.validate(user);
  this.customValidation(user);  // Sprouted - new separate method
  this.repository.save(user);
}

private customValidation(user: User) {
  // Custom logic in isolated method
}
```

**Benefit:** Original logic untouched; custom logic isolated and testable.

### Wrap Method

Enclose existing method to add behavior before/after without modifying internals.

**Before:**
```typescript
processPayment(order: Order) {
  // Complex payment logic (30 lines)
}
```

**After:**
```typescript
processPayment(order: Order) {
  this.preProcess(order);           // NEW: Pre-processing
  this.processPaymentOriginal(order);  // Renamed original
  this.postProcess(order);          // NEW: Post-processing
}

private processPaymentOriginal(order: Order) {
  // Original 30 lines unchanged
}
```

**Benefit:** Original logic preserved exactly; extensions wrapped around it.

### Subclass and Override

Create subclass that overrides specific methods.

```typescript
// Upstream
class AuthService {
  authenticate(credentials: Credentials): User {
    // Standard auth logic
  }
}

// Extension
class CustomAuthService extends AuthService {
  authenticate(credentials: Credentials): User {
    // Custom pre-processing
    const user = super.authenticate(credentials);
    // Custom post-processing
    return user;
  }
}
```

**Limitation:** Only works if upstream class is designed for extension (not final/sealed).

## Monkey Patching (Dynamic Languages)

For Python, Ruby, JavaScript - runtime modification of existing code.

**Python Example:**
```python
# Original module
original_func = upstream_module.process_data

def custom_process_data(*args, **kwargs):
    # Pre-processing
    result = original_func(*args, **kwargs)
    # Post-processing
    return result

upstream_module.process_data = custom_process_data
```

**Safety Rules:**
1. **ALWAYS preserve original:** Store reference before patching
2. **ALWAYS call original:** Don't replace behavior entirely
3. **Document extensively:** Patches are invisible in source
4. **Test thoroughly:** Upstream changes may break patches silently

**Risk Level:** 🔴 High - Use only when structural refactoring is impossible.

## Seam Identification Process

### Step 1: Find Hardcoded Dependencies

Search patterns by language:

**TypeScript/JavaScript:**
```bash
grep -rn "new [A-Z][a-zA-Z]+\(" --include="*.ts"
grep -rn "require\(['\"]\./" --include="*.js"
```

**Python:**
```bash
grep -rn "= [A-Z][a-zA-Z]+\(\)" --include="*.py"
```

**Go:**
```bash
grep -rn "&[A-Z][a-zA-Z]+{" --include="*.go"
```

### Step 2: Score Each Candidate

| Factor | Weight | Description |
|--------|--------|-------------|
| Coupling Impact | 0.4 | How much decoupling does this enable? |
| Change Frequency | 0.3 | How often does this area change? |
| Effort | 0.3 | How hard to implement the seam? |

### Step 3: Prioritize

**High Priority (Implement first):**
- High coupling impact + Low effort
- Critical business logic + High change frequency

**Medium Priority:**
- Moderate impact across factors

**Low Priority (Document for future):**
- Low impact or very high effort

## Multi-Language Patterns

See examples directory for language-specific patterns:
- `examples/typescript-seams.md`
- `examples/python-seams.md`
- `examples/multi-lang-patterns.md`

## Related Resources

- Sprout and Wrap patterns: `references/sprout-wrap-patterns.md`
- Seam type deep dive: `references/seam-types.md`

## Related Commands

- `/map-seams` - Find seam opportunities in codebase
- `/gen-char-tests` - Generate safety tests before seam implementation
