---
name: quality-guardian
description: |
  Quality assurance skill that validates implementations against specifications and success criteria.
  Performs comprehensive testing, code review, and compliance verification. Use after implementation
  to ensure production readiness.
---

# Quality Guardian

Ensure implementations meet all success criteria and production standards. This skill validates completeness, quality, and specification compliance.

## Validation Domains

### 1. Specification Compliance
Verify implementation matches specification:
- All features from `<core_features>` implemented
- Database matches `<database_schema>`
- API endpoints match `<api_endpoints_summary>`
- UI follows `<ui_layout>` structure
- Design matches `<design_system>`

### 2. Functionality Testing
Test all features through multiple approaches:
- Unit tests for individual functions
- Integration tests for API endpoints
- End-to-end tests through browser automation
- Manual verification of UI behavior

### 3. Code Quality
Analyze code for:
- Security vulnerabilities (OWASP Top 10)
- Performance issues
- Memory leaks
- Proper error handling
- Code style consistency

### 4. Production Readiness
Verify:
- Environment variable management
- Logging and monitoring hooks
- Error boundaries and fallbacks
- Graceful degradation
- Documentation completeness

## Verification Protocol

### Feature Verification Checklist
For each feature in specification:
```markdown
- [ ] Feature exists in codebase
- [ ] Feature functions as described
- [ ] Feature handles edge cases
- [ ] Feature has error handling
- [ ] Feature has tests
- [ ] Feature matches UI/UX requirements
```

### API Endpoint Verification
For each endpoint:
```bash
# Success case
curl -X [METHOD] http://localhost:[PORT]/api/[endpoint] \
  -H "Content-Type: application/json" \
  -d '[valid data]'
# Expected: 200/201 with correct response

# Validation failure
curl -X [METHOD] http://localhost:[PORT]/api/[endpoint] \
  -H "Content-Type: application/json" \
  -d '[invalid data]'
# Expected: 400 with validation errors

# Authentication required (if applicable)
curl -X [METHOD] http://localhost:[PORT]/api/[endpoint]
# Expected: 401 Unauthorized
```

### UI Verification
Using browser automation:
```javascript
// Navigate to feature
await page.goto('http://localhost:[PORT]/[route]');

// Verify element presence
await expect(page.locator('[selector]')).toBeVisible();

// Test interaction
await page.click('[button]');
await expect(page.locator('[result]')).toContainText('[expected]');

// Verify visual appearance
await expect(page.locator('[element]')).toHaveCSS('[property]', '[value]');
```

## Success Criteria Validation

Match implementation against `<success_criteria>`:

### Functionality Criteria
| Criterion | Test Method | Pass/Fail |
|-----------|-------------|-----------|
| Streaming responses | Manual + automated | |
| Artifact detection | Unit test | |
| Conversation management | E2E test | |
| CRUD operations | API test | |

### User Experience Criteria
| Criterion | Test Method | Pass/Fail |
|-----------|-------------|-----------|
| Design consistency | Visual inspection | |
| Responsive layout | Multiple viewports | |
| Animation smoothness | Performance metrics | |
| Navigation intuitive | User flow test | |

### Technical Quality Criteria
| Criterion | Test Method | Pass/Fail |
|-----------|-------------|-----------|
| Clean code structure | Lint + review | |
| Error handling | Edge case tests | |
| API key security | Security audit | |
| Query optimization | Performance profiling | |

### Design Polish Criteria
| Criterion | Test Method | Pass/Fail |
|-----------|-------------|-----------|
| Visual consistency | Style audit | |
| Typography | Design review | |
| Micro-interactions | Animation tests | |
| Accessibility | A11y audit | |
| Dark mode | Theme toggle test | |

### Frontend Design Criteria (via `frontend-design` skill)
| Criterion | Test Method | Pass/Fail |
|-----------|-------------|-----------|
| Distinctive typography | Font family check (no Inter/Roboto/Arial) | |
| CSS variable usage | Root variable inspection | |
| Page load animations | Stagger sequence timing | |
| Scroll animations | ScrollTrigger firing positions | |
| Hover state quality | Transform/shadow verification | |
| Floating menu behavior | Fan-out animation timing | |
| Spring physics feel | Stiffness/damping validation | |
| 60fps performance | Long task detection | |
| Reduced motion respect | prefers-reduced-motion test | |
| Visual depth | Shadow/backdrop-filter presence | |
| Layout intentionality | Grid asymmetry or overlap check | |

## Frontend Animation Validation Protocol

### Animation Sequence Verification
```javascript
// Playwright test for animation timing
test('animations follow cohesive timeline', async ({ page }) => {
  await page.goto('/');

  // Track animation events
  const animationTimings = await page.evaluate(() => {
    return new Promise(resolve => {
      const timings = [];
      document.querySelectorAll('[class*="reveal"], [class*="animate"]')
        .forEach(el => {
          const observer = new MutationObserver(() => {
            timings.push({
              element: el.className,
              time: performance.now()
            });
          });
          observer.observe(el, { attributes: true, attributeFilter: ['style'] });
        });

      setTimeout(() => resolve(timings), 3000);
    });
  });

  // Verify sequential timing (not all at once)
  const times = animationTimings.map(t => t.time);
  const hasStagger = times.some((t, i) => i > 0 && t - times[i-1] > 50);
  expect(hasStagger).toBe(true);
});
```

### Performance Validation
```bash
# Run Lighthouse performance audit
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse.json

# Check animation performance with Playwright
npx playwright test tests/e2e/animations.spec.js --reporter=html

# Verify no layout thrashing
npx playwright test tests/e2e/visual.spec.js
```

### GSAP/Motion Verification
```javascript
// Check GSAP is properly initialized
test('GSAP ScrollTrigger is active', async ({ page }) => {
  await page.goto('/');

  const hasScrollTrigger = await page.evaluate(() => {
    return typeof window.gsap !== 'undefined' &&
           typeof window.ScrollTrigger !== 'undefined';
  });

  expect(hasScrollTrigger).toBe(true);
});

// Check Motion/Framer Motion components
test('Motion components render correctly', async ({ page }) => {
  await page.goto('/');

  // Motion adds data attributes for tracking
  const hasMotion = await page.evaluate(() => {
    return document.querySelector('[data-framer-appear-id]') !== null ||
           document.querySelector('[style*="transform"]') !== null;
  });

  expect(hasMotion).toBe(true);
});
```

### Visual Design Validation Commands
```bash
# Check for forbidden fonts in CSS
grep -r "font-family.*Inter\|font-family.*Roboto\|font-family.*Arial" src/ --include="*.css" --include="*.tsx" --include="*.jsx"
# Expected: No matches (or intentional body text only)

# Check CSS variables are defined
grep -r "^:root\|--[a-z]" src/ --include="*.css"
# Expected: Multiple variable definitions

# Verify no default Tailwind colors without customization
grep -r "bg-purple-\|bg-blue-500\|bg-gray-" src/ --include="*.tsx" --include="*.jsx" | head -20
# Review: Should be custom colors or design-system aligned
```

## Issue Classification

When issues are found:

### Critical (Must Fix Before Release)
- Security vulnerabilities
- Data loss possibilities
- Core feature failures
- Crashes or hangs

### Major (Should Fix)
- Non-critical feature failures
- Performance degradation
- UX friction points
- Accessibility gaps

### Minor (Nice to Fix)
- Visual inconsistencies
- Minor UX improvements
- Code style issues
- Documentation gaps

## Quality Report Format

```markdown
# Quality Guardian Report

## Summary
- **Specification Compliance**: [X]%
- **Test Coverage**: [X]%
- **Critical Issues**: [N]
- **Major Issues**: [N]
- **Minor Issues**: [N]

## Frontend Design Quality (NEW)
- **Animation Performance**: [X] fps average
- **Distinctive Typography**: [Pass/Fail]
- **CSS Variable Coverage**: [X]%
- **Scroll Animation Triggers**: [X]/[Y] working
- **Hover State Quality**: [Pass/Fail]
- **Reduced Motion Support**: [Pass/Fail]
- **Visual Depth Score**: [1-10]

## Detailed Findings

### Critical Issues
1. [Issue description]
   - Location: [file:line]
   - Impact: [description]
   - Recommended fix: [solution]

### Major Issues
[...]

### Minor Issues
[...]

## Recommendations
1. [Priority recommendation]
2. [Secondary recommendation]

## Verification Evidence
- Test run logs attached
- Screenshots of UI verification
- API response samples
```

## MANDATORY Test Execution Protocol

**CRITICAL**: All tests MUST be executed and pass before any implementation is considered complete. This is not optional.

### Test Execution Sequence (REQUIRED)

Execute these commands in order. ALL must pass:

```bash
# Step 1: Install Playwright browsers (first time only)
npx playwright install

# Step 2: Run unit tests
npm test
# GATE: Must have 0 failures

# Step 3: Run E2E tests - ALL browsers
npx playwright test --project=chromium
# GATE: Must have 0 failures

# Step 4: Run animation-specific tests
npx playwright test tests/e2e/animations.spec.ts
# GATE: Must have 0 failures

# Step 5: Run visual design tests
npx playwright test tests/e2e/visual.spec.ts
# GATE: Must have 0 failures

# Step 6: Run accessibility tests
npx playwright test tests/e2e/accessibility.spec.ts
# GATE: Must have 0 critical violations

# Step 7: Run performance tests
npx playwright test tests/e2e/performance.spec.ts
# GATE: Must maintain 55+ fps

# Step 8: Run reduced motion tests
npx playwright test --project=reduced-motion
# GATE: Must have 0 failures

# Step 9: Generate test report
npx playwright show-report
```

### Quality Gates (BLOCKING)

Implementation CANNOT proceed past these gates without passing:

| Gate | Command | Pass Criteria |
|------|---------|---------------|
| Unit Tests | `npm test` | 0 failures, >80% coverage |
| E2E Core | `npx playwright test` | 0 failures |
| Animation | `npx playwright test tests/e2e/animations.spec.ts` | 0 failures |
| Visual | `npx playwright test tests/e2e/visual.spec.ts` | 0 failures |
| Performance | Lighthouse + Playwright | Score >90, 55+ fps |
| Accessibility | `npx playwright test tests/e2e/accessibility.spec.ts` | 0 critical |

### Execution Verification Checklist

After running tests, verify and document:

```markdown
## Test Execution Verification

### Unit Tests
- [ ] Command executed: `npm test`
- [ ] Result: [PASS/FAIL]
- [ ] Coverage: [X]%
- [ ] Failures: [N]

### E2E Tests
- [ ] Command executed: `npx playwright test`
- [ ] Result: [PASS/FAIL]
- [ ] Total tests: [N]
- [ ] Passed: [N]
- [ ] Failed: [N]
- [ ] Skipped: [N]

### Animation Tests
- [ ] Command executed: `npx playwright test tests/e2e/animations.spec.ts`
- [ ] Result: [PASS/FAIL]
- [ ] Stagger animations verified: [YES/NO]
- [ ] Scroll triggers verified: [YES/NO]
- [ ] Hover states verified: [YES/NO]
- [ ] Fan-out menus verified: [YES/NO]
- [ ] 60fps maintained: [YES/NO]

### Visual Design Tests
- [ ] Command executed: `npx playwright test tests/e2e/visual.spec.ts`
- [ ] Result: [PASS/FAIL]
- [ ] Distinctive fonts verified: [YES/NO]
- [ ] CSS variables verified: [YES/NO]
- [ ] Dark mode verified: [YES/NO]
- [ ] Visual depth verified: [YES/NO]

### Reduced Motion Tests
- [ ] Command executed: `npx playwright test --project=reduced-motion`
- [ ] Result: [PASS/FAIL]
- [ ] Animations disabled: [YES/NO]

### Test Report Generated
- [ ] Report location: `playwright-report/index.html`
- [ ] Screenshots captured: [YES/NO]
- [ ] Videos captured (on failure): [YES/NO]
```

### Failure Handling

If any test fails:

1. **DO NOT PROCEED** with deployment or marking complete
2. **ANALYZE** the failure output
3. **FIX** the underlying issue in code
4. **RE-RUN** the failing test
5. **REPEAT** until all tests pass
6. **DOCUMENT** the fix in the quality report

### Automated Test Runner Script

Generate this script in the project root:

```bash
#!/bin/bash
# leonardo-test-runner.sh
# Automated test execution for Leonardo projects

set -e  # Exit on first failure

echo "========================================"
echo "Leonardo Quality Guardian - Test Runner"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

run_test() {
    echo -e "\n>>> Running: $1"
    if eval "$2"; then
        echo -e "${GREEN}PASS${NC}: $1"
        return 0
    else
        echo -e "${RED}FAIL${NC}: $1"
        return 1
    fi
}

# Track failures
FAILURES=0

# Unit Tests
run_test "Unit Tests" "npm test" || ((FAILURES++))

# E2E Tests - Chromium
run_test "E2E Tests (Chromium)" "npx playwright test --project=chromium" || ((FAILURES++))

# Animation Tests
run_test "Animation Tests" "npx playwright test tests/e2e/animations.spec.ts" || ((FAILURES++))

# Visual Tests
run_test "Visual Design Tests" "npx playwright test tests/e2e/visual.spec.ts" || ((FAILURES++))

# Reduced Motion
run_test "Reduced Motion Tests" "npx playwright test --project=reduced-motion" || ((FAILURES++))

# Summary
echo -e "\n========================================"
echo "Test Execution Complete"
echo "========================================"

if [ $FAILURES -eq 0 ]; then
    echo -e "${GREEN}ALL TESTS PASSED${NC}"
    echo "Generating report..."
    npx playwright show-report
    exit 0
else
    echo -e "${RED}$FAILURES test suite(s) failed${NC}"
    echo "Fix failures before proceeding"
    exit 1
fi
```

## Integration with CI/CD

This skill can generate:
- GitHub Actions workflow with mandatory Playwright tests
- Pre-commit hooks that run tests
- Test automation scripts
- Quality gate definitions that block merge/deploy
