# TypeScript/Jest Characterization Test Template

## Basic Template

```typescript
/**
 * Characterization Tests for [ModuleName]
 *
 * GOLDEN MASTER - These tests capture CURRENT behavior, not intended behavior.
 * DO NOT modify expected values without understanding the impact.
 *
 * Generated: [DATE]
 * Target: [file path]
 * Coverage target: [X]%
 */

import { functionName } from '../path/to/module';

describe('[FunctionName] Characterization Tests', () => {
  // ============================================================
  // BOUNDARY VALUES
  // ============================================================
  describe('boundary values', () => {
    test.each([
      // [description, input, expectedOutput]
      ['empty string', '', undefined],
      ['null input', null, null],
      ['undefined input', undefined, undefined],
      ['zero', 0, 0],
      ['negative', -1, undefined],
      ['max safe integer', Number.MAX_SAFE_INTEGER, undefined],
    ])('%s', (_, input, expected) => {
      expect(functionName(input)).toBe(expected);
    });
  });

  // ============================================================
  // TYPICAL VALUES
  // ============================================================
  describe('typical values', () => {
    test.each([
      // [description, input, expectedOutput]
      ['simple case', 'hello', 'HELLO'],
      ['with spaces', 'hello world', 'HELLO WORLD'],
      ['with numbers', 'test123', 'TEST123'],
      ['unicode', 'héllo', 'HÉLLO'],
    ])('%s', (_, input, expected) => {
      expect(functionName(input)).toBe(expected);
    });
  });

  // ============================================================
  // EDGE CASES
  // ============================================================
  describe('edge cases', () => {
    test('very long input', () => {
      const input = 'a'.repeat(10000);
      const result = functionName(input);
      expect(result.length).toBe(10000);
    });

    test('special characters', () => {
      expect(functionName('!@#$%')).toBe('!@#$%');
    });

    test('whitespace only', () => {
      expect(functionName('   ')).toBe('   ');
    });
  });

  // ============================================================
  // ERROR CONDITIONS
  // ============================================================
  describe('error conditions', () => {
    test('throws on invalid type', () => {
      expect(() => functionName({} as any)).toThrow();
    });
  });

  // ============================================================
  // COMPLEX OUTPUTS (Snapshots)
  // ============================================================
  describe('complex outputs', () => {
    test('returns expected structure', () => {
      const input = { id: 1, name: 'test' };
      expect(functionName(input)).toMatchSnapshot();
    });
  });
});
```

## Class/Stateful Template

```typescript
describe('[ClassName] Characterization Tests', () => {
  let instance: ClassName;

  beforeEach(() => {
    instance = new ClassName();
  });

  // ============================================================
  // INITIAL STATE
  // ============================================================
  describe('initial state', () => {
    test('has expected defaults', () => {
      expect(instance.value).toBe(0);
      expect(instance.status).toBe('idle');
    });
  });

  // ============================================================
  // STATE TRANSITIONS
  // ============================================================
  describe('state transitions', () => {
    test('start changes state', () => {
      instance.start();
      expect(instance.status).toBe('running');
    });

    test('full lifecycle', () => {
      const states: string[] = [];

      states.push(instance.status);
      instance.start();
      states.push(instance.status);
      instance.pause();
      states.push(instance.status);
      instance.stop();
      states.push(instance.status);

      expect(states).toEqual(['idle', 'running', 'paused', 'stopped']);
    });
  });

  // ============================================================
  // METHOD BEHAVIORS
  // ============================================================
  describe('method: [methodName]', () => {
    test.each([
      // [description, args, expectedReturn, expectedState]
      ['basic call', [1], 1, { value: 1 }],
      ['double call', [2], 4, { value: 2 }],
    ])('%s', (_, args, expectedReturn, expectedState) => {
      const result = instance.methodName(...args);
      expect(result).toBe(expectedReturn);
      expect(instance).toMatchObject(expectedState);
    });
  });
});
```

## Async Template

```typescript
describe('[AsyncFunction] Characterization Tests', () => {
  // ============================================================
  // SUCCESSFUL ASYNC OPERATIONS
  // ============================================================
  describe('successful operations', () => {
    test('resolves with expected value', async () => {
      const result = await asyncFunction('valid-input');
      expect(result).toMatchSnapshot();
    });

    test('handles concurrent calls', async () => {
      const results = await Promise.all([
        asyncFunction('a'),
        asyncFunction('b'),
        asyncFunction('c'),
      ]);
      expect(results).toMatchSnapshot();
    });
  });

  // ============================================================
  // ERROR HANDLING
  // ============================================================
  describe('error handling', () => {
    test('rejects with expected error', async () => {
      await expect(asyncFunction('invalid')).rejects.toThrow('Expected error');
    });

    test('error includes expected properties', async () => {
      try {
        await asyncFunction('invalid');
        fail('Should have thrown');
      } catch (error) {
        expect(error).toMatchSnapshot();
      }
    });
  });

  // ============================================================
  // TIMING BEHAVIOR
  // ============================================================
  describe('timing', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('completes within expected time', async () => {
      const promise = asyncFunction('input');
      jest.advanceTimersByTime(1000);
      const result = await promise;
      expect(result).toBeDefined();
    });
  });
});
```

## With Mocked Dependencies

```typescript
jest.mock('../services/database');
jest.mock('../services/api');

import { database } from '../services/database';
import { api } from '../services/api';

describe('[FunctionWithDeps] Characterization Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Set up mocks with recorded responses
    (database.query as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Test' }
    ]);

    (api.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      data: { result: 'success' }
    });
  });

  test('interacts with dependencies correctly', async () => {
    const result = await functionWithDeps({ id: 1 });

    // Verify return value
    expect(result).toMatchSnapshot();

    // Verify dependency interactions
    expect(database.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT'),
      [1]
    );

    expect(api.fetch).toHaveBeenCalledWith(
      '/endpoint',
      expect.objectContaining({ method: 'POST' })
    );
  });
});
```

## Usage Instructions

1. Copy appropriate template
2. Replace placeholders: `[FunctionName]`, `[ClassName]`, `[DATE]`, paths
3. Run function to capture actual values
4. Fill in expected values from actual behavior
5. Commit with message: `test: add characterization tests for [target]`
