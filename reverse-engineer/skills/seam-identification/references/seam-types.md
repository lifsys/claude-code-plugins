# Seam Types Deep Dive

## Object Seams

### Definition
A place where behavior can be changed by substituting one object for another at runtime.

### Enabling Point
The location where the substitution happens:
- Constructor parameter
- Setter method
- Method parameter
- Factory return value
- DI container configuration

### Implementation Patterns

#### Constructor Injection (Preferred)
```typescript
class OrderService {
  constructor(
    private readonly paymentService: IPaymentService,
    private readonly inventoryService: IInventoryService
  ) {}
}

// Production
new OrderService(new StripePaymentService(), new WarehouseInventory());

// Custom fork
new OrderService(new CustomPaymentService(), new WarehouseInventory());
```

#### Setter Injection
```typescript
class ReportGenerator {
  private formatter: IFormatter = new DefaultFormatter();

  setFormatter(formatter: IFormatter) {
    this.formatter = formatter;
  }
}
```

#### Method Injection
```typescript
class DataProcessor {
  process(data: Data, validator: IValidator = new DefaultValidator()) {
    if (validator.isValid(data)) {
      // process
    }
  }
}
```

### Fork Application

1. **Identify** direct instantiation (`new ConcreteClass()`)
2. **Extract** interface from concrete class
3. **Refactor** to accept interface in constructor
4. **Configure** DI to provide custom implementation

## Link Seams

### Definition
A place where behavior can be changed by altering what gets linked/loaded at build time.

### Enabling Point
The build configuration or module resolution system.

### TypeScript/JavaScript

**Path Aliases (tsconfig.json):**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@core/*": ["./upstream/core/*"],
      "@extensions/*": ["./extensions/*"],
      "@auth": ["./extensions/auth/index.ts"]
    }
  }
}
```

**Webpack Aliases:**
```javascript
module.exports = {
  resolve: {
    alias: {
      '@upstream': path.resolve(__dirname, 'upstream/'),
      '@custom': path.resolve(__dirname, 'extensions/')
    }
  }
};
```

**Package.json Exports (Node.js):**
```json
{
  "exports": {
    ".": "./src/index.js",
    "./auth": "./extensions/custom-auth.js"
  }
}
```

### Python

**Path Manipulation:**
```python
import sys
sys.path.insert(0, '/path/to/extensions')

# Now imports from extensions take precedence
from auth import CustomAuth  # Gets custom version
```

**Import Hooks:**
```python
import importlib.abc
import importlib.machinery

class CustomFinder(importlib.abc.MetaPathFinder):
    def find_spec(self, fullname, path, target=None):
        if fullname == 'upstream.auth':
            return importlib.machinery.ModuleSpec(
                fullname,
                CustomLoader(),
                origin='/path/to/custom/auth.py'
            )
        return None

sys.meta_path.insert(0, CustomFinder())
```

### Go

**Build Tags:**
```go
// +build custom

package auth

func Authenticate(user string) bool {
    // Custom implementation
}
```

```go
// +build !custom

package auth

func Authenticate(user string) bool {
    // Standard implementation
}
```

Build with: `go build -tags custom`

### Java

**Classpath Ordering:**
```bash
java -cp custom-auth.jar:upstream.jar:... MainClass
```

**ServiceLoader:**
```java
// META-INF/services/com.example.AuthService
com.custom.CustomAuthService

// Code
ServiceLoader<AuthService> loader = ServiceLoader.load(AuthService.class);
AuthService auth = loader.findFirst().get();
```

## Preprocessing Seams

### Definition
A place where behavior can be changed through compile-time or runtime conditionals.

### Compile-Time (C/C++)

```c
#ifdef CUSTOM_FEATURE
    #include "custom_impl.h"
    #define process_data custom_process_data
#else
    #include "standard_impl.h"
    #define process_data standard_process_data
#endif
```

### Runtime Feature Flags

**Environment Variables:**
```typescript
const getAuthProvider = () => {
  if (process.env.AUTH_PROVIDER === 'custom') {
    return new CustomAuth();
  }
  return new StandardAuth();
};
```

**Configuration Files:**
```typescript
// config.json
{
  "features": {
    "customPayment": true,
    "legacyAuth": false
  }
}

// Code
if (config.features.customPayment) {
  container.register('payment', CustomPaymentService);
} else {
  container.register('payment', StandardPaymentService);
}
```

**Feature Flag Services:**
```typescript
import { unleash } from '@unleash/client';

const handler = unleash.isEnabled('custom-checkout')
  ? new CustomCheckoutHandler()
  : new StandardCheckoutHandler();
```

## Comparison Table

| Seam Type | Enabling Point | Runtime Flexibility | Complexity | Fork Suitability |
|-----------|---------------|---------------------|------------|------------------|
| Object | DI configuration | High | Low | ⭐⭐⭐⭐⭐ |
| Link | Build config | None (compile-time) | Medium | ⭐⭐⭐⭐ |
| Preprocessing | Flags/conditions | Varies | Low | ⭐⭐⭐ |

## Selection Guide

**Use Object Seams when:**
- You need runtime substitution
- Testing with mocks is important
- Multiple implementations may be needed

**Use Link Seams when:**
- Compile-time decision is sufficient
- Performance is critical (no runtime overhead)
- Wholesale module replacement needed

**Use Preprocessing Seams when:**
- Feature gradual rollout needed
- A/B testing required
- Different configurations per environment
