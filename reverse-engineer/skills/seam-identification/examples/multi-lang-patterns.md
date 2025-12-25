# Multi-Language Seam Patterns

Quick reference for identifying and implementing seams across different languages.

## TypeScript/JavaScript

### Finding Hardcoded Dependencies

```bash
# Direct instantiation
grep -rn "new [A-Z][a-zA-Z]+\(" --include="*.ts" --include="*.tsx"

# Module-level singletons
grep -rn "export const .* = new" --include="*.ts"

# CommonJS requires with instantiation
grep -rn "require.*new\|new.*require" --include="*.js"
```

### Object Seam Implementation

```typescript
// Before
class OrderService {
  private db = new DatabaseConnection();

  async getOrder(id: string) {
    return this.db.query('SELECT * FROM orders WHERE id = ?', [id]);
  }
}

// After
interface IDatabase {
  query(sql: string, params: any[]): Promise<any>;
}

class OrderService {
  constructor(private db: IDatabase) {}

  async getOrder(id: string) {
    return this.db.query('SELECT * FROM orders WHERE id = ?', [id]);
  }
}
```

### Link Seam (tsconfig paths)

```json
{
  "compilerOptions": {
    "paths": {
      "@services/*": ["./extensions/services/*"],
      "upstream/*": ["./upstream/*"]
    }
  }
}
```

## Python

### Finding Hardcoded Dependencies

```bash
# Class instantiation
grep -rn "= [A-Z][a-zA-Z_]+\(\)" --include="*.py"

# Module-level instances
grep -rn "^[a-z_]+ = [A-Z][a-zA-Z_]+\(" --include="*.py"

# Direct imports used for instantiation
grep -rn "from .* import [A-Z]" --include="*.py"
```

### Object Seam Implementation

```python
# Before
class OrderService:
    def __init__(self):
        self.db = DatabaseConnection()

    def get_order(self, order_id: str):
        return self.db.query(f"SELECT * FROM orders WHERE id = {order_id}")

# After
from abc import ABC, abstractmethod
from typing import Protocol

class IDatabase(Protocol):
    def query(self, sql: str) -> Any: ...

class OrderService:
    def __init__(self, db: IDatabase):
        self.db = db

    def get_order(self, order_id: str):
        return self.db.query(f"SELECT * FROM orders WHERE id = {order_id}")
```

### Monkey Patch Pattern

```python
# Safe monkey patching
import upstream_module

# Store original
_original_process = upstream_module.process_data

def custom_process_data(*args, **kwargs):
    """Wrapped version with custom behavior."""
    # Pre-processing
    args = preprocess(args)

    # Call original
    result = _original_process(*args, **kwargs)

    # Post-processing
    return postprocess(result)

# Apply patch
upstream_module.process_data = custom_process_data
```

## Go

### Finding Hardcoded Dependencies

```bash
# Struct literal instantiation
grep -rn "&[A-Z][a-zA-Z]+{" --include="*.go"

# Package-level vars
grep -rn "^var .* = &\?[A-Z]" --include="*.go"

# Direct struct embedding
grep -rn "type .* struct {$" -A 5 --include="*.go" | grep -v "interface"
```

### Object Seam Implementation

```go
// Before
type OrderService struct {
    db *DatabaseConnection
}

func NewOrderService() *OrderService {
    return &OrderService{
        db: NewDatabaseConnection(),
    }
}

// After
type Database interface {
    Query(sql string, args ...interface{}) ([]Row, error)
}

type OrderService struct {
    db Database
}

func NewOrderService(db Database) *OrderService {
    return &OrderService{db: db}
}
```

### Build Tag Pattern

```go
// database_standard.go
// +build !custom

package database

func NewConnection() Database {
    return &StandardDatabase{}
}

// database_custom.go
// +build custom

package database

func NewConnection() Database {
    return &CustomDatabase{}
}
```

## Java

### Finding Hardcoded Dependencies

```bash
# Direct instantiation
grep -rn "new [A-Z][a-zA-Z]+\(" --include="*.java"

# Static factory calls
grep -rn "[A-Z][a-zA-Z]+\.(get|create|new)[A-Z]" --include="*.java"

# Singleton access
grep -rn "\.getInstance\(\)" --include="*.java"
```

### Object Seam Implementation

```java
// Before
public class OrderService {
    private DatabaseConnection db = new DatabaseConnection();

    public Order getOrder(String id) {
        return db.query("SELECT * FROM orders WHERE id = ?", id);
    }
}

// After
public interface IDatabase {
    <T> T query(String sql, Object... params);
}

public class OrderService {
    private final IDatabase db;

    public OrderService(IDatabase db) {
        this.db = db;
    }

    public Order getOrder(String id) {
        return db.query("SELECT * FROM orders WHERE id = ?", id);
    }
}
```

### ServiceLoader Pattern

```java
// META-INF/services/com.example.Database
com.custom.CustomDatabase

// Usage
ServiceLoader<Database> loader = ServiceLoader.load(Database.class);
Database db = loader.findFirst()
    .orElse(new StandardDatabase());
```

## Rust

### Finding Hardcoded Dependencies

```bash
# Struct instantiation
grep -rn "[A-Z][a-z]+::" --include="*.rs" | grep "new\|default"

# Direct construction
grep -rn "[A-Z][a-z]+ {" --include="*.rs"
```

### Object Seam (Trait-based)

```rust
// Before
struct OrderService {
    db: DatabaseConnection,
}

impl OrderService {
    fn new() -> Self {
        Self {
            db: DatabaseConnection::new(),
        }
    }
}

// After
trait Database {
    fn query(&self, sql: &str) -> Result<Vec<Row>, Error>;
}

struct OrderService<D: Database> {
    db: D,
}

impl<D: Database> OrderService<D> {
    fn new(db: D) -> Self {
        Self { db }
    }
}
```

## Pattern Summary

| Language | Primary Seam Mechanism | Link Seam | Runtime Patching |
|----------|----------------------|-----------|------------------|
| TypeScript | Constructor DI | tsconfig paths | Prototype modification |
| Python | Constructor DI | PYTHONPATH | Monkey patching |
| Go | Interface injection | Build tags | Not idiomatic |
| Java | Constructor DI | Classpath, ServiceLoader | Reflection (avoid) |
| Rust | Generic + Trait | Features | Not supported |

## Universal Checklist

For any language, check for:

- [ ] `new ClassName()` or equivalent in methods
- [ ] Module/package-level singleton instances
- [ ] Static method calls for obtaining dependencies
- [ ] Global state access
- [ ] Hardcoded configuration values
- [ ] Direct file system/network access without abstraction
