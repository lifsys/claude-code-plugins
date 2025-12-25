---
name: map-seams
description: Identify architectural seams for dependency injection and behavior modification
argument-hint: "[path-or-file] [--language=ts|py|go|java]"
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
---

# Seam Mapping

Identify "seams" in codebase - places where behavior can be altered without editing source code in that place (per Michael Feathers, "Working Effectively with Legacy Code").

## Seam Types to Identify

### 1. Object Seams (Dependency Injection Opportunities)

**Pattern to find:**
```
# Direct instantiation (anti-pattern)
const service = new PaymentService()

# Should become:
constructor(private service: IPaymentService)
```

**Search patterns by language:**

**TypeScript/JavaScript:**
```
grep -rn "new [A-Z][a-zA-Z]+\(" --include="*.ts" --include="*.js"
grep -rn "require\(['\"]\./" --include="*.ts" --include="*.js"
```

**Python:**
```
grep -rn "= [A-Z][a-zA-Z]+\(\)" --include="*.py"
grep -rn "from \. import" --include="*.py"
```

**Go:**
```
grep -rn "&[A-Z][a-zA-Z]+{" --include="*.go"
```

**Java:**
```
grep -rn "new [A-Z][a-zA-Z]+\(" --include="*.java"
```

### 2. Link Seams (Build-time Substitution)

Identify where classpath/import path manipulation can substitute implementations:

- Module aliases in `tsconfig.json` or `webpack.config.js`
- Python path manipulation
- Go build tags
- Java ServiceLoader patterns

### 3. Preprocessing Seams

Find conditional compilation or feature flags:

```
grep -rn "#ifdef\|#if defined" --include="*.c" --include="*.h"
grep -rn "if.*process\.env\." --include="*.ts" --include="*.js"
grep -rn "if.*os\.environ\." --include="*.py"
```

### 4. Hook Points (Event Emitter Opportunities)

Identify functions that could emit events before/after execution:

- Functions with side effects (database writes, API calls)
- State mutation functions
- Lifecycle methods (init, destroy, update)

## Analysis Process

### Step 1: AST-Aware Dependency Mapping

For each file in scope:

1. **Extract imports/dependencies**
   - List all imported modules
   - Classify as: external (node_modules), internal (project), relative (same module)

2. **Find instantiation patterns**
   - Direct `new ClassName()` calls
   - Factory function calls
   - Singleton accesses

3. **Map function calls to external modules**
   - Which functions call external services?
   - Which have hardcoded configurations?

### Step 2: Coupling Score Calculation

For each identified seam candidate:

```
Seam Score = (Coupling Reduction Potential × Modification Frequency) / Implementation Effort
```

**Coupling Reduction Potential (1-5):**
- 5: Decouples entire subsystem
- 3: Decouples single class/module
- 1: Minor improvement

**Modification Frequency (1-5):**
- 5: Changes with every feature
- 3: Changes occasionally
- 1: Rarely changes

**Implementation Effort (1-5):**
- 1: Extract interface only
- 3: Refactor to DI pattern
- 5: Major structural change

### Step 3: Seam Classification

Categorize each seam by implementation technique:

| Seam Type | Technique | Risk Level |
|-----------|-----------|------------|
| Object Seam | Extract Interface + DI | Low |
| Object Seam | Factory Pattern | Low |
| Link Seam | Module Aliasing | Medium |
| Preprocessing | Feature Flags | Low |
| Monkey Patch | Runtime Override | High |
| Hook Point | Event Emitter | Medium |

## Output Format

```markdown
## Seam Map: [path/module]

### Executive Summary
- Total seam candidates found: [N]
- High-value seams (score > 3.5): [N]
- Recommended immediate actions: [N]

### Object Seams (Dependency Injection)

| Location | Current Pattern | Recommended Change | Score |
|----------|-----------------|-------------------|-------|
| `file.ts:42` | `new AuthService()` | Extract `IAuthService` interface | 4.2 |

### Hook Points (Event Emission)

| Location | Function | Suggested Events | Score |
|----------|----------|-----------------|-------|
| `user.ts:87` | `createUser()` | `PRE_USER_CREATE`, `POST_USER_CREATE` | 3.8 |

### Link Seams (Build-time)

| Configuration | Current | Suggested | Score |
|--------------|---------|-----------|-------|
| `tsconfig.json` paths | none | Add `@services/*` alias | 2.5 |

### Monkey Patch Candidates (Use with Caution)

| Location | Target | Use Case | Risk |
|----------|--------|----------|------|
| `legacy/calc.py:15` | `calculate()` | Wrap for logging | 🟡 Medium |

### Implementation Roadmap

**Phase 1: Quick Wins (< 1 day each)**
1. [Seam with highest score / lowest effort]

**Phase 2: Strategic Refactors (1-3 days each)**
1. [Seam with high value, moderate effort]

**Phase 3: Architectural Changes (week+)**
1. [Major seam requiring structural change]

### Related Commands
- `/gen-char-tests` - Generate safety net tests before refactoring
- `/analyze-fork` - Understand overall fork health
```

## Tips

- Start with high-score, low-risk seams (Object Seams with clear interfaces)
- Generate characterization tests BEFORE implementing any seam changes
- For Monkey Patches, always wrap original function (don't replace)
- Document each seam in CLAUDE.md under `# SEAMS` section
