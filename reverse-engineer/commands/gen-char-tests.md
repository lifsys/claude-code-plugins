---
name: gen-char-tests
description: Generate characterization tests (Golden Master) to lock in legacy behavior before refactoring
argument-hint: "[file-or-function] [--framework=jest|pytest|go-test]"
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash
---

# Characterization Test Generation

Generate "Golden Master" tests that capture current behavior of legacy code, providing a safety net for refactoring.

## Concept

Characterization tests (per Michael Feathers) don't verify correctness - they verify consistency. They capture what the code DOES, not what it SHOULD do. This locks in behavior so refactoring can be verified as purely structural.

## Execution Process

### Phase 1: Target Analysis

1. **Read the target code**
   - Understand function/class signature
   - Identify inputs (parameters, dependencies, global state)
   - Identify outputs (return values, side effects, mutations)

2. **Categorize complexity**

| Complexity | Characteristics | Test Count |
|------------|-----------------|------------|
| Simple | Pure function, <3 params | 5-10 tests |
| Moderate | Some state, <5 params | 15-25 tests |
| Complex | Side effects, dependencies | 30-50 tests |
| Legacy Monster | Global state, I/O | 50+ tests |

### Phase 2: Input Space Exploration

Generate test inputs covering:

1. **Boundary values**
   - Empty/null/undefined
   - Zero, one, max values
   - Empty arrays/objects

2. **Equivalence classes**
   - Valid inputs (happy path)
   - Edge cases (boundaries)
   - Invalid inputs (error paths)

3. **State combinations**
   - If stateful, test state transitions
   - If dependent on external state, mock variations

### Phase 3: Test Template Generation

**Generate for user review before writing.**

#### TypeScript/Jest Template

```typescript
describe('[FunctionName] Characterization Tests', () => {
  // Golden Master: These tests capture CURRENT behavior
  // DO NOT modify expected values without understanding impact

  describe('boundary values', () => {
    test('handles empty input', () => {
      const result = functionName('');
      expect(result).toMatchSnapshot(); // or explicit value
    });

    test('handles null', () => {
      const result = functionName(null);
      expect(result).toMatchSnapshot();
    });
  });

  describe('typical inputs', () => {
    test.each([
      ['input1', 'expectedOutput1'],
      ['input2', 'expectedOutput2'],
      // ... generated cases
    ])('given %s returns %s', (input, expected) => {
      expect(functionName(input)).toBe(expected);
    });
  });

  describe('edge cases', () => {
    // ... generated edge case tests
  });
});
```

#### Python/pytest Template

```python
import pytest
from module import function_name

class TestFunctionNameCharacterization:
    """
    Golden Master tests - capture CURRENT behavior.
    DO NOT modify expected values without understanding impact.
    """

    @pytest.mark.parametrize("input_val,expected", [
        ("", "expected_for_empty"),
        (None, "expected_for_none"),
        # ... generated cases
    ])
    def test_boundary_values(self, input_val, expected):
        assert function_name(input_val) == expected

    @pytest.mark.parametrize("input_val,expected", [
        ("typical1", "output1"),
        ("typical2", "output2"),
        # ... generated cases
    ])
    def test_typical_inputs(self, input_val, expected):
        assert function_name(input_val) == expected
```

#### Go Test Template

```go
func TestFunctionName_Characterization(t *testing.T) {
    // Golden Master tests - capture CURRENT behavior
    tests := []struct {
        name     string
        input    string
        expected string
    }{
        {"empty", "", ""},
        {"typical", "input", "output"},
        // ... generated cases
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := FunctionName(tt.input)
            if got != tt.expected {
                t.Errorf("FunctionName(%q) = %q, want %q", tt.input, got, tt.expected)
            }
        })
    }
}
```

### Phase 4: Golden Master Capture

For complex outputs or when exact values are unknown:

1. **Run code with test inputs**
2. **Capture actual outputs**
3. **Store as expected values**

```bash
# For Node.js
node -e "console.log(JSON.stringify(require('./module').func('input')))"

# For Python
python -c "from module import func; print(func('input'))"
```

### Phase 5: Coverage Verification

After generating tests, verify coverage:

```bash
# Jest
npx jest --coverage --collectCoverageFrom='path/to/file.ts'

# pytest
pytest --cov=module --cov-report=term-missing

# Go
go test -cover ./...
```

## Output Format

```markdown
## Characterization Tests for [target]

### Analysis Summary
- Target: `path/to/file.ts:functionName`
- Complexity: [Simple|Moderate|Complex]
- Recommended test count: [N]

### Input Space Coverage
| Category | Inputs Generated |
|----------|-----------------|
| Boundary | [list] |
| Typical | [list] |
| Edge Cases | [list] |

### Generated Test Code

\`\`\`typescript
[Complete test file content]
\`\`\`

### Installation Instructions
1. Save to: `tests/characterization/[target].test.ts`
2. Install dependencies: [if any]
3. Run: `npm test -- --testPathPattern=characterization`

### Coverage Target
- Aim for: [N]% line coverage on target function
- Current: [Run to determine]

### Next Steps
1. Review generated tests for accuracy
2. Run tests to capture current behavior
3. Commit tests BEFORE any refactoring
4. Use as regression safety net during refactor
```

## Tips

- **ALWAYS generate for review** - don't write directly
- Tests should be committed BEFORE refactoring begins
- If tests fail after refactoring, the refactor changed behavior (intentionally or not)
- For complex dependencies, use mocks that return recorded responses
- Update tests only when behavior change is INTENTIONAL and approved
