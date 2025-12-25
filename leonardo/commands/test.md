---
name: test
description: |
  Execute the Leonardo comprehensive test suite including unit tests, E2E Playwright tests,
  animation tests, visual design tests, and accessibility tests. Use /leonardo:test to validate
  implementation quality before deployment.
---

# Leonardo Test Runner

Execute the full Leonardo quality validation suite. This command runs all required tests and generates a comprehensive quality report.

## Invocation Modes

### Mode 1: Full Test Suite
```
/leonardo:test
```
Runs ALL test suites: unit, E2E, animation, visual, accessibility, performance.

### Mode 2: Specific Test Category
```
/leonardo:test [category]
```
Categories: `unit`, `e2e`, `animation`, `visual`, `accessibility`, `performance`

### Mode 3: Quick Smoke Test
```
/leonardo:test quick
```
Runs essential tests only (unit + critical E2E paths).

---

## Test Execution Protocol

When invoked, execute these steps in order:

### Step 1: Environment Verification
```bash
# Verify Playwright is installed
npx playwright --version || npx playwright install

# Verify dev server can start
npm run dev &
sleep 5
curl -s http://localhost:3000 > /dev/null && echo "Dev server ready"
```

### Step 2: Unit Tests
```bash
npm test -- --coverage

# Capture results
UNIT_RESULT=$?
UNIT_COVERAGE=$(grep -oP '(?<=All files \|)[^|]+' coverage/coverage-summary.json | head -1)
```
**GATE**: Must have 0 failures, >80% coverage

### Step 3: E2E Core Tests
```bash
npx playwright test --project=chromium

# Capture results
E2E_RESULT=$?
```
**GATE**: Must have 0 failures

### Step 4: Animation Tests
```bash
npx playwright test tests/e2e/animations.spec.ts --project=chromium

# Capture results
ANIMATION_RESULT=$?
```
**GATE**: Must have 0 failures

Validates:
- Page load animation sequences
- Stagger timing between elements
- ScrollTrigger firing positions
- Hover state transitions
- Floating menu fan-out behavior
- Drag interaction smoothness
- 60fps performance maintenance

### Step 5: Visual Design Tests
```bash
npx playwright test tests/e2e/visual.spec.ts --project=chromium

# Capture results
VISUAL_RESULT=$?
```
**GATE**: Must have 0 failures

Validates:
- Distinctive typography (no Inter/Roboto/Arial)
- CSS variable usage
- Dark mode cohesion
- Visual depth (shadows, gradients, blur)
- Intentional layout structure

### Step 6: Accessibility Tests
```bash
npx playwright test tests/e2e/accessibility.spec.ts --project=chromium

# Capture results
A11Y_RESULT=$?
```
**GATE**: Must have 0 critical violations

### Step 7: Reduced Motion Tests
```bash
npx playwright test --project=reduced-motion

# Capture results
REDUCED_MOTION_RESULT=$?
```
**GATE**: Must have 0 failures

### Step 8: Performance Tests
```bash
npx playwright test tests/e2e/performance.spec.ts --project=chromium

# Also run Lighthouse
npx lighthouse http://localhost:3000 \
  --output=json \
  --output-path=./lighthouse-report.json \
  --chrome-flags="--headless"

# Extract score
PERF_SCORE=$(jq '.categories.performance.score * 100' lighthouse-report.json)
```
**GATE**: Lighthouse score >90, 55+ fps maintained

### Step 9: Generate Report
```bash
# Open Playwright HTML report
npx playwright show-report

# Generate summary
echo "Test Execution Complete"
echo "======================="
echo "Unit Tests: $([ $UNIT_RESULT -eq 0 ] && echo 'PASS' || echo 'FAIL')"
echo "E2E Tests: $([ $E2E_RESULT -eq 0 ] && echo 'PASS' || echo 'FAIL')"
echo "Animation Tests: $([ $ANIMATION_RESULT -eq 0 ] && echo 'PASS' || echo 'FAIL')"
echo "Visual Tests: $([ $VISUAL_RESULT -eq 0 ] && echo 'PASS' || echo 'FAIL')"
echo "A11y Tests: $([ $A11Y_RESULT -eq 0 ] && echo 'PASS' || echo 'FAIL')"
echo "Reduced Motion: $([ $REDUCED_MOTION_RESULT -eq 0 ] && echo 'PASS' || echo 'FAIL')"
echo "Performance Score: $PERF_SCORE"
```

---

## Quality Report Format

After test execution, generate this report:

```markdown
# Leonardo Quality Report

## Test Execution Summary

| Suite | Tests | Passed | Failed | Duration |
|-------|-------|--------|--------|----------|
| Unit | [N] | [N] | [N] | [X]s |
| E2E Core | [N] | [N] | [N] | [X]s |
| Animation | [N] | [N] | [N] | [X]s |
| Visual | [N] | [N] | [N] | [X]s |
| Accessibility | [N] | [N] | [N] | [X]s |
| Reduced Motion | [N] | [N] | [N] | [X]s |
| Performance | [N] | [N] | [N] | [X]s |

## Quality Gates

| Gate | Status | Criteria | Actual |
|------|--------|----------|--------|
| Unit Tests | [PASS/FAIL] | 0 failures | [N] failures |
| Coverage | [PASS/FAIL] | >80% | [X]% |
| E2E Tests | [PASS/FAIL] | 0 failures | [N] failures |
| Animation | [PASS/FAIL] | 0 failures | [N] failures |
| Visual | [PASS/FAIL] | 0 failures | [N] failures |
| A11y | [PASS/FAIL] | 0 critical | [N] critical |
| Performance | [PASS/FAIL] | >90 score | [X] score |

## Animation Verification

- [ ] Page load stagger: [X]ms between elements
- [ ] ScrollTrigger: [N]/[N] triggers firing correctly
- [ ] Hover states: [N]/[N] transitions verified
- [ ] Fan-out menus: [PASS/FAIL]
- [ ] 60fps maintained: [YES/NO] (avg: [X] fps)
- [ ] Reduced motion respected: [YES/NO]

## Visual Design Verification

- [ ] Typography: [Font names used]
- [ ] CSS Variables: [N] variables defined
- [ ] Dark mode: [PASS/FAIL]
- [ ] Visual depth: [PASS/FAIL]

## Failures (if any)

### [Test Name]
- **File**: [path]
- **Error**: [message]
- **Screenshot**: [link to screenshot]
- **Recommended Fix**: [suggestion]

## Artifacts

- Playwright Report: `playwright-report/index.html`
- Coverage Report: `coverage/lcov-report/index.html`
- Lighthouse Report: `lighthouse-report.json`
- Screenshots: `test-results/`
```

---

## Failure Handling

If any test fails:

1. **STOP** - Do not proceed with deployment
2. **ANALYZE** - Review the failure output and screenshots
3. **FIX** - Update the failing code
4. **RE-RUN** - Execute only the failing test suite
5. **VERIFY** - Ensure all tests pass
6. **DOCUMENT** - Update the quality report

---

## CI/CD Integration

Generate GitHub Actions workflow for automated testing:

```yaml
name: Leonardo Quality Gates

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run unit tests
        run: npm test -- --coverage

      - name: Start dev server
        run: npm run dev &

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Run E2E tests
        run: npx playwright test --project=chromium

      - name: Run animation tests
        run: npx playwright test tests/e2e/animations.spec.ts

      - name: Run visual tests
        run: npx playwright test tests/e2e/visual.spec.ts

      - name: Run reduced motion tests
        run: npx playwright test --project=reduced-motion

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          directory: ./coverage
```
