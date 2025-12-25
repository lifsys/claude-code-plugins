# Golden Master Testing Guide

## What is a Golden Master?

A Golden Master (also called "Approval Testing" or "Snapshot Testing") is a testing technique where you:

1. Run code to produce output
2. Manually verify output is correct
3. Save output as the "golden" reference
4. Future tests compare against this reference

## When to Use

**Ideal for:**
- Complex outputs (HTML, JSON, reports)
- Legacy code without specifications
- Refactoring without changing behavior
- Code with many edge cases

**Not ideal for:**
- Simple return values (use assertions)
- Code with intentionally varying output
- Performance-sensitive test suites

## Implementation Patterns

### Snapshot Testing (Jest)

```typescript
test('generates expected report', () => {
  const report = generateReport(sampleData);
  expect(report).toMatchSnapshot();
});
```

**First run:** Creates `__snapshots__/file.test.ts.snap`
**Subsequent runs:** Compares against snapshot

**Updating snapshots:**
```bash
jest --updateSnapshot
```

### Approval Testing (ApprovalTests.Net)

```csharp
[Test]
public void GeneratesExpectedReport()
{
    var report = GenerateReport(sampleData);
    Approvals.Verify(report);
}
```

Creates `GeneratesExpectedReport.approved.txt` for manual approval.

### Custom Golden Master

```typescript
import fs from 'fs';
import path from 'path';

function goldenMaster(name: string, actual: any) {
  const goldenPath = path.join(__dirname, '__golden__', `${name}.json`);

  if (process.env.UPDATE_GOLDEN) {
    fs.writeFileSync(goldenPath, JSON.stringify(actual, null, 2));
    return;
  }

  const expected = JSON.parse(fs.readFileSync(goldenPath, 'utf-8'));
  expect(actual).toEqual(expected);
}

test('complex transformation', () => {
  const result = transformData(input);
  goldenMaster('transform-result', result);
});
```

## Capturing Complex Behavior

### Function with Side Effects

```typescript
class OutputCapture {
  logs: string[] = [];
  dbCalls: Array<{ query: string; params: any[] }> = [];
  apiCalls: Array<{ url: string; method: string; body: any }> = [];

  captureConsole() {
    const originalLog = console.log;
    console.log = (...args) => {
      this.logs.push(args.join(' '));
      originalLog.apply(console, args);
    };
    return () => { console.log = originalLog; };
  }

  getSnapshot() {
    return {
      logs: this.logs,
      dbCalls: this.dbCalls,
      apiCalls: this.apiCalls,
    };
  }
}

test('captures all side effects', () => {
  const capture = new OutputCapture();
  const restoreConsole = capture.captureConsole();

  // Mock DB and API to capture calls
  const mockDb = createCapturingMock(capture.dbCalls);
  const mockApi = createCapturingMock(capture.apiCalls);

  // Run function
  const result = processOrder(mockDb, mockApi, orderData);

  restoreConsole();

  // Golden master includes result AND side effects
  expect({
    result,
    sideEffects: capture.getSnapshot(),
  }).toMatchSnapshot();
});
```

### Stateful Class Behavior

```typescript
describe('StateMachine characterization', () => {
  test('state transitions', () => {
    const machine = new StateMachine();
    const history: Array<{ action: string; state: string }> = [];

    const actions = ['start', 'pause', 'resume', 'stop', 'restart'];

    for (const action of actions) {
      machine[action]();
      history.push({
        action,
        state: machine.currentState,
      });
    }

    expect(history).toMatchSnapshot();
  });
});
```

## Diffing Strategies

### Structured Diff (JSON)

Use JSON diff tools for readable comparison:

```typescript
import { diff } from 'deep-object-diff';

function compare(expected: any, actual: any) {
  const differences = diff(expected, actual);
  if (Object.keys(differences).length > 0) {
    console.log('Differences found:');
    console.log(JSON.stringify(differences, null, 2));
    throw new Error('Golden master mismatch');
  }
}
```

### Text Diff (Reports, HTML)

For text outputs, use line-by-line diff:

```typescript
import { diffLines } from 'diff';

function compareText(expected: string, actual: string) {
  const changes = diffLines(expected, actual);
  const hasChanges = changes.some(part => part.added || part.removed);

  if (hasChanges) {
    console.log('Text differences:');
    changes.forEach(part => {
      const prefix = part.added ? '+' : part.removed ? '-' : ' ';
      console.log(prefix + part.value);
    });
    throw new Error('Golden master mismatch');
  }
}
```

## Maintenance Guidelines

### When to Update Golden Masters

**Legitimate reasons:**
- Intentional behavior change (approved)
- Bug fix that changes output
- New feature added

**Review process:**
1. Diff new output vs old
2. Verify every change is intentional
3. Get code review approval
4. Update with meaningful commit message

### Preventing False Positives

**Remove volatility:**
```typescript
// Normalize timestamps
const normalized = output.replace(
  /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/g,
  '{{TIMESTAMP}}'
);

// Remove random IDs
const stable = normalized.replace(
  /[a-f0-9]{8}-[a-f0-9]{4}/g,
  '{{UUID}}'
);
```

**Sort unordered collections:**
```typescript
const sortedResult = {
  ...result,
  items: [...result.items].sort((a, b) => a.id.localeCompare(b.id)),
};
```

### Organizing Golden Files

```
tests/
├── __golden__/
│   ├── reports/
│   │   ├── monthly-report.json
│   │   └── summary-report.json
│   ├── exports/
│   │   ├── csv-export.csv
│   │   └── pdf-export.txt
│   └── api/
│       └── response-format.json
```

## Anti-Patterns

### Too Broad

❌ **Bad:** Single golden master for entire system
```typescript
expect(runEntireSystem()).toMatchSnapshot();
```

✅ **Good:** Focused golden masters per component
```typescript
expect(processUser(userData)).toMatchSnapshot();
expect(generateInvoice(orderData)).toMatchSnapshot();
```

### Ignored Diffs

❌ **Bad:** Auto-updating without review
```bash
jest --updateSnapshot  # Dangerous if not reviewing
```

✅ **Good:** Review each change
```bash
jest --updateSnapshot --testPathPattern=specific-test
git diff __snapshots__/  # Review changes before commit
```

### Missing Context

❌ **Bad:** Snapshot without input context
```typescript
test('works', () => {
  expect(func()).toMatchSnapshot();
});
```

✅ **Good:** Clear input-output relationship
```typescript
test('transforms user data correctly', () => {
  const input = { name: 'John', age: 30 };
  expect(transformUser(input)).toMatchSnapshot();
});
```
