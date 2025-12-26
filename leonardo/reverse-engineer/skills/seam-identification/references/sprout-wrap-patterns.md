# Sprout and Wrap Refactoring Patterns

## The Problem

Legacy code often has methods that are:
- Too large to understand
- Tightly coupled to dependencies
- Lacking tests
- Risky to modify

**Traditional approach (dangerous):**
Modify the method directly → Risk breaking existing behavior

**Safe approach:**
Use Sprout or Wrap to add behavior without modifying internals.

## Sprout Method

### Concept
"Sprout" new code into a separate method, then call it from the original.

### When to Use
- Adding new functionality to existing method
- New code is relatively independent
- You want to test the new code in isolation

### Pattern

**Before:**
```typescript
class OrderProcessor {
  processOrder(order: Order): void {
    this.validateOrder(order);
    this.calculateTotal(order);
    this.saveOrder(order);
    this.sendConfirmation(order);
  }
}
```

**After (with sprout):**
```typescript
class OrderProcessor {
  processOrder(order: Order): void {
    this.validateOrder(order);
    this.applyCustomDiscounts(order);  // SPROUTED
    this.calculateTotal(order);
    this.performFraudCheck(order);     // SPROUTED
    this.saveOrder(order);
    this.sendConfirmation(order);
    this.notifyAnalytics(order);       // SPROUTED
  }

  // Sprouted methods - isolated, testable
  private applyCustomDiscounts(order: Order): void {
    // Custom discount logic
  }

  private performFraudCheck(order: Order): void {
    // Custom fraud detection
  }

  private notifyAnalytics(order: Order): void {
    // Custom analytics
  }
}
```

### Benefits
- Original method logic unchanged
- New code isolated and testable
- Single line change to original method
- Easy to locate custom code

### Limitations
- Still modifies original file
- Can't easily remove later
- Multiple sprouts clutter the method

## Sprout Class

### Concept
When new functionality is complex, sprout an entire class.

### Pattern

**Before:**
```typescript
class PaymentProcessor {
  process(payment: Payment): Result {
    // Complex payment logic (100 lines)
  }
}
```

**After:**
```typescript
class PaymentProcessor {
  process(payment: Payment): Result {
    // Preprocessing via sprouted class
    const preprocessor = new CustomPaymentPreprocessor();
    const enrichedPayment = preprocessor.enrich(payment);

    // Original logic
    const result = this.processInternal(enrichedPayment);

    // Postprocessing via sprouted class
    const postprocessor = new CustomPaymentPostprocessor();
    return postprocessor.finalize(result);
  }

  private processInternal(payment: Payment): Result {
    // Original 100 lines, untouched
  }
}

// Sprouted classes - fully independent
class CustomPaymentPreprocessor {
  enrich(payment: Payment): Payment {
    // Custom enrichment logic
  }
}

class CustomPaymentPostprocessor {
  finalize(result: Result): Result {
    // Custom finalization
  }
}
```

### Benefits
- Complex logic gets its own home
- Full test coverage on sprouted classes
- Clear separation of concerns

## Wrap Method

### Concept
Rename original method, create new method with original name that wraps it.

### When to Use
- Need to add before/after behavior
- Original method is complex
- Don't want to understand internals

### Pattern

**Before:**
```typescript
class NotificationService {
  sendNotification(user: User, message: string): void {
    // Complex notification logic (50 lines)
    // Email, SMS, push, etc.
  }
}
```

**After:**
```typescript
class NotificationService {
  sendNotification(user: User, message: string): void {
    // Pre-processing (custom)
    this.logNotificationAttempt(user, message);
    this.checkUserPreferences(user);

    // Original behavior - unchanged
    this.sendNotificationOriginal(user, message);

    // Post-processing (custom)
    this.updateMetrics(user);
    this.triggerWebhooks(user, message);
  }

  // Renamed original - completely untouched internals
  private sendNotificationOriginal(user: User, message: string): void {
    // Original 50 lines exactly as they were
  }

  // Custom methods
  private logNotificationAttempt(user: User, message: string): void { }
  private checkUserPreferences(user: User): void { }
  private updateMetrics(user: User): void { }
  private triggerWebhooks(user: User, message: string): void { }
}
```

### Benefits
- Original logic 100% preserved
- Clear wrapper structure
- Easy to understand execution flow

## Wrap Class (Decorator Pattern)

### Concept
Create wrapper class that contains original and adds behavior.

### Pattern

**Before:**
```typescript
class AuthService {
  authenticate(credentials: Credentials): User {
    // Standard authentication
  }

  authorize(user: User, resource: string): boolean {
    // Standard authorization
  }
}
```

**After:**
```typescript
// Original unchanged
class AuthService {
  authenticate(credentials: Credentials): User { /* original */ }
  authorize(user: User, resource: string): boolean { /* original */ }
}

// Wrapper with custom behavior
class CustomAuthService {
  constructor(private wrapped: AuthService) {}

  authenticate(credentials: Credentials): User {
    // Custom pre-processing
    this.logAttempt(credentials);
    this.checkIpBlacklist(credentials);

    // Delegate to original
    const user = this.wrapped.authenticate(credentials);

    // Custom post-processing
    this.recordSuccess(user);
    this.updateSession(user);

    return user;
  }

  authorize(user: User, resource: string): boolean {
    // Add custom authorization rules
    if (this.hasCustomPermission(user, resource)) {
      return true;
    }
    return this.wrapped.authorize(user, resource);
  }

  // Custom methods
  private logAttempt(credentials: Credentials): void { }
  private checkIpBlacklist(credentials: Credentials): void { }
  private recordSuccess(user: User): void { }
  private updateSession(user: User): void { }
  private hasCustomPermission(user: User, resource: string): boolean { }
}
```

### Benefits
- Zero modification to original class
- Wrapper can be removed without touching original
- Multiple wrappers can be composed

### Fork Application
1. Keep `AuthService` in upstream (unmodified)
2. Create `CustomAuthService` in extensions
3. Configure DI to provide wrapper instead of original

## Comparison

| Pattern | Modifies Original | Isolation Level | Complexity | Fork Suitability |
|---------|-------------------|-----------------|------------|------------------|
| Sprout Method | Yes (1 line) | Medium | Low | ⭐⭐⭐ |
| Sprout Class | Yes (few lines) | High | Medium | ⭐⭐⭐⭐ |
| Wrap Method | Yes (rename) | Medium | Low | ⭐⭐⭐ |
| Wrap Class | No | Highest | Medium | ⭐⭐⭐⭐⭐ |

## Recommendations for Forks

**Best for soft forks:**
1. **Wrap Class** - Zero upstream modification
2. **Sprout Class** - Minimal upstream modification

**Acceptable:**
3. **Sprout Method** - Single line changes
4. **Wrap Method** - Rename-only changes

**Avoid:**
- Direct modification of upstream logic
- Interleaving custom code with upstream code
