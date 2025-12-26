---
name: Characterization Testing
description: This skill should be used when generating Golden Master tests to capture legacy behavior, creating safety nets before refactoring, locking in existing functionality for behavior verification, or implementing the "Protect" phase of the Map-Plan-Protect-Refactor workflow.
version: 0.1.0
---

# Characterization Testing

Characterization tests capture the *current* behavior of code, not the *intended* behavior. They provide a safety net for refactoring by detecting any behavioral changes, intentional or not.

## Core Concept

> "A characterization test is a test that characterizes the actual behavior of a piece of code. There's no 'expected' behavior - we simply discover what the code does and lock that in."
> — Michael Feathers, "Working Effectively with Legacy Code"

### Why Not Regular Unit Tests?

| Aspect | Unit Tests | Characterization Tests |
|--------|------------|----------------------|
| Purpose | Verify correctness | Verify consistency |
| Created | Before code | After code exists |
| Expected values | From requirements | From running code |
| Scope | Single unit | Often broader |
| Naming | Describes requirement | Describes behavior |

## The Golden Master Approach

### Concept

1. Run the code with many inputs
2. Capture all outputs
3. Store outputs as "expected" values
4. Future runs compare against stored outputs

### Implementation Steps

#### Step 1: Identify Inputs

For the target code, determine:
- All parameters
- Global state dependencies
- Environmental factors (time, random, I/O)

**Input categories:**
- Boundary values (empty, null, zero, max)
- Typical values (normal usage)
- Edge cases (unusual combinations)
- Error conditions (invalid inputs)

#### Step 2: Capture Outputs

Run code and capture:
- Return values
- Mutations to passed objects
- Side effects (files, DB, network)
- Exceptions thrown

#### Step 3: Store as Expectations

Save captured outputs as test expectations:
- Inline values for simple outputs
- Snapshot files for complex outputs
- JSON/YAML for structured data

#### Step 4: Assert Consistently

On every test run:
- Execute with same inputs
- Compare to stored outputs
- Any difference = potential behavior change

## Test Generation Strategy

### Complexity Assessment

| Complexity | Indicators | Test Count |
|------------|------------|------------|
| Simple | Pure function, <3 params | 5-10 |
| Moderate | Some state, <5 params | 15-25 |
| Complex | Side effects, dependencies | 30-50 |
| Legacy Monster | Global state, I/O | 50+ |

### Input Generation Techniques

**Boundary Testing:**
```
For each input parameter:
  - Minimum valid value
  - Maximum valid value
  - Just below minimum (if applicable)
  - Just above maximum (if applicable)
  - Empty/null/undefined
  - Zero (for numbers)
```

**Equivalence Partitioning:**
```
Divide input space into classes:
  - Valid inputs → sample from each class
  - Invalid inputs → sample from each class
  - Special cases → test explicitly
```

**Combinatorial:**
```
For functions with multiple params:
  - All pairs of boundary values
  - Common combinations
  - Unlikely combinations (catch assumptions)
```

## Framework Templates

### TypeScript/Jest

```typescript
describe('[FunctionName] Characterization', () => {
  // GOLDEN MASTER - DO NOT MODIFY EXPECTATIONS WITHOUT REVIEW

  describe('boundary values', () => {
    test.each([
      ['empty string', '', undefined],
      ['null', null, null],
      ['zero', 0, undefined],
    ])('%s input', (name, input, expected) => {
      expect(functionName(input)).toBe(expected);
    });
  });

  describe('typical values', () => {
    test.each([
      ['basic', 'hello', 'HELLO'],
      ['with numbers', 'test123', 'TEST123'],
    ])('%s input', (name, input, expected) => {
      expect(functionName(input)).toBe(expected);
    });
  });

  describe('complex outputs', () => {
    test('returns expected structure', () => {
      const result = complexFunction({ id: 1 });
      expect(result).toMatchSnapshot();
    });
  });
});
```

### Python/pytest

```python
import pytest

class TestFunctionNameCharacterization:
    """
    GOLDEN MASTER - DO NOT MODIFY EXPECTATIONS WITHOUT REVIEW

    These tests capture current behavior for refactoring safety.
    """

    @pytest.mark.parametrize("input_val,expected", [
        ("", None),
        (None, None),
        (0, None),
    ])
    def test_boundary_values(self, input_val, expected):
        assert function_name(input_val) == expected

    @pytest.mark.parametrize("input_val,expected", [
        ("hello", "HELLO"),
        ("test123", "TEST123"),
    ])
    def test_typical_values(self, input_val, expected):
        assert function_name(input_val) == expected

    def test_complex_output(self, snapshot):
        result = complex_function({"id": 1})
        assert result == snapshot
```

### Go

```go
func TestFunctionName_Characterization(t *testing.T) {
    // GOLDEN MASTER - DO NOT MODIFY EXPECTATIONS WITHOUT REVIEW

    tests := []struct {
        name     string
        input    string
        expected string
    }{
        {"empty", "", ""},
        {"basic", "hello", "HELLO"},
        {"with numbers", "test123", "TEST123"},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := FunctionName(tt.input)
            if got != tt.expected {
                t.Errorf("FunctionName(%q) = %q, want %q",
                    tt.input, got, tt.expected)
            }
        })
    }
}
```

## Handling Dependencies

### Mocking External Services

When code depends on databases, APIs, etc.:

1. **Record real responses** during initial capture
2. **Replay recorded responses** in tests
3. **Verify interaction patterns** haven't changed

```typescript
// Record mode
const responses = [];
const realService = new ExternalService();
const recordingProxy = new Proxy(realService, {
  get(target, prop) {
    return async (...args) => {
      const result = await target[prop](...args);
      responses.push({ method: prop, args, result });
      return result;
    };
  }
});

// Replay mode
const mockService = {
  getData: jest.fn().mockResolvedValue(recordedData),
};
```

### Time-Dependent Code

```typescript
// Freeze time for consistent outputs
beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2024-01-15T10:00:00Z'));
});

afterEach(() => {
  jest.useRealTimers();
});
```

### Random Values

```typescript
// Seed random for reproducibility
beforeEach(() => {
  jest.spyOn(Math, 'random').mockReturnValue(0.5);
});
```

## Refactoring Safety Protocol

### Before Refactoring

1. ✅ Generate characterization tests
2. ✅ Run tests - all pass
3. ✅ Commit tests with message: `test: add characterization tests for [target]`

### During Refactoring

1. Make atomic change
2. Run characterization tests
3. If pass → continue
4. If fail → investigate:
   - Intentional behavior change? → Update test (with approval)
   - Unintentional change? → Fix refactoring

### After Refactoring

1. All characterization tests pass
2. Behavior unchanged (or intentionally changed with approval)
3. Commit refactoring with reference to tests

## Coverage Guidelines

### Minimum Coverage Targets

| Code Type | Line Coverage | Branch Coverage |
|-----------|---------------|-----------------|
| Critical business logic | 90%+ | 80%+ |
| Data transformation | 80%+ | 70%+ |
| Utility functions | 70%+ | 60%+ |

### Coverage Commands

```bash
# Jest
npx jest --coverage --collectCoverageFrom='path/to/target.ts'

# pytest
pytest --cov=module --cov-report=term-missing

# Go
go test -cover ./...
```

## Related Resources

- Golden Master patterns: `references/golden-master-guide.md`
- Test templates: `templates/test-template-ts.md`, `templates/test-template-py.md`

## Related Commands

- `/gen-char-tests` - Generate characterization tests
- `/map-seams` - Find refactoring targets
