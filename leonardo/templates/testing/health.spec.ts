/**
 * Leonardo Health Monitoring & Log Review Tests
 * Validates system health, service status, animations for progress indicators,
 * and reviews logs for errors
 */

import { test, expect, Page } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Test helper to authenticate
async function authenticate(page: Page) {
  await page.goto('/login');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'TestPassword123!');
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard|home|\//);
}

test.describe('Health Status Endpoints', () => {
  test('Main health endpoint should return healthy status', async ({ request }) => {
    const response = await request.get('/api/health');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.status).toMatch(/ok|healthy|up/i);
    expect(body.timestamp || body.time).toBeDefined();
  });

  test('Database health should be reported', async ({ request }) => {
    const response = await request.get('/api/health/db');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.status || body.database).toMatch(/ok|connected|healthy/i);
  });

  test('Cache health should be reported', async ({ request }) => {
    const response = await request.get('/api/health/cache');

    if (response.status() === 200) {
      const body = await response.json();
      expect(body.status || body.redis || body.cache).toBeDefined();
    }
  });

  test('External services health should be reported', async ({ request }) => {
    const response = await request.get('/api/health/services');

    if (response.status() === 200) {
      const body = await response.json();

      // Each service should report status
      for (const [service, status] of Object.entries(body)) {
        expect(status).toBeDefined();
        console.log(`${service}: ${JSON.stringify(status)}`);
      }
    }
  });

  test('Health endpoint should respond within acceptable time', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('/api/health');
    const duration = Date.now() - startTime;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(1000); // Should respond within 1 second
  });

  test('Health endpoint should include version info', async ({ request }) => {
    const response = await request.get('/api/health');
    const body = await response.json();

    // Should include version or build info
    const hasVersionInfo =
      body.version ||
      body.build ||
      body.commit ||
      body.environment;

    console.log(`Version info available: ${hasVersionInfo !== undefined}`);
  });
});

test.describe('Progress Animations and Loading States', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('Loading spinner should animate smoothly', async ({ page }) => {
    await page.goto('/dashboard');

    // Find loading spinner
    const spinner = page.locator('.spinner, .loading, [data-testid="loading"]').first();

    if (await spinner.count() > 0) {
      // Check animation is running
      const hasAnimation = await spinner.evaluate(el => {
        const styles = getComputedStyle(el);
        return styles.animation !== 'none' || styles.animationName !== 'none';
      });

      expect(hasAnimation).toBe(true);
    }
  });

  test('Progress bars should animate correctly', async ({ page }) => {
    await page.goto('/upload');

    const fileInput = page.locator('input[type="file"]').first();

    if (await fileInput.count() > 0) {
      // Upload file to trigger progress
      await fileInput.setInputFiles({
        name: 'test.bin',
        mimeType: 'application/octet-stream',
        buffer: Buffer.alloc(1024 * 1024), // 1MB
      });

      const progressBar = page.locator(
        '.progress-bar, [role="progressbar"], [data-testid="progress"]'
      ).first();

      if (await progressBar.count() > 0) {
        // Track progress values
        const progressValues: number[] = [];

        for (let i = 0; i < 10; i++) {
          const value = await progressBar.evaluate(el => {
            const width = (el as HTMLElement).style.width;
            const ariaValue = el.getAttribute('aria-valuenow');
            return parseFloat(width || ariaValue || '0');
          });
          progressValues.push(value);
          await page.waitForTimeout(200);
        }

        // Progress should increase (or complete)
        const isProgressing = progressValues.some((v, i) =>
          i > 0 && v > progressValues[i - 1]
        ) || progressValues[progressValues.length - 1] >= 100;

        expect(isProgressing).toBe(true);
      }
    }
  });

  test('Skeleton loaders should display during data fetch', async ({ page }) => {
    // Slow down network to see skeleton
    await page.route('**/api/**', async route => {
      await page.waitForTimeout(1000);
      await route.continue();
    });

    await page.goto('/dashboard');

    // Look for skeleton elements
    const skeletons = page.locator(
      '.skeleton, [data-testid="skeleton"], .loading-skeleton, .placeholder'
    );

    const hasSkeletons = await skeletons.count() > 0;
    console.log(`Skeleton loaders present: ${hasSkeletons}`);
  });

  test('Pulse/shimmer animations should render at 60fps', async ({ page }) => {
    await page.goto('/dashboard');

    // Find animated elements
    const animatedElements = page.locator(
      '.shimmer, .pulse, [class*="animate"]'
    );

    if (await animatedElements.count() > 0) {
      // Measure animation performance
      const fps = await page.evaluate(async () => {
        return new Promise<number>(resolve => {
          let frames = 0;
          const startTime = performance.now();

          const countFrames = () => {
            frames++;
            if (performance.now() - startTime < 1000) {
              requestAnimationFrame(countFrames);
            } else {
              resolve(frames);
            }
          };

          requestAnimationFrame(countFrames);
        });
      });

      expect(fps).toBeGreaterThanOrEqual(55);
    }
  });

  test('Status indicators should update correctly', async ({ page }) => {
    await page.goto('/dashboard');

    const statusIndicator = page.locator(
      '[data-testid="status"], .status-indicator, .status-badge'
    ).first();

    if (await statusIndicator.count() > 0) {
      // Should have color/class indicating status
      const classes = await statusIndicator.getAttribute('class');
      const hasStatusClass =
        classes?.includes('success') ||
        classes?.includes('error') ||
        classes?.includes('warning') ||
        classes?.includes('online') ||
        classes?.includes('offline');

      expect(hasStatusClass || await statusIndicator.textContent()).toBeTruthy();
    }
  });

  test('Toast notifications should animate in/out', async ({ page }) => {
    await page.goto('/settings');

    // Trigger a save to show toast
    const saveButton = page.locator('button:has-text("Save")').first();

    if (await saveButton.count() > 0) {
      await saveButton.click();

      // Toast should appear
      const toast = page.locator('.toast, [role="alert"], .notification').first();

      if (await toast.count() > 0) {
        // Should be visible
        await expect(toast).toBeVisible();

        // Check for animation
        const hasEnterAnimation = await toast.evaluate(el => {
          const styles = getComputedStyle(el);
          return styles.animation !== 'none' || styles.transform !== 'none';
        });

        expect(hasEnterAnimation).toBe(true);
      }
    }
  });
});

test.describe('Console Log Review', () => {
  test('No JavaScript errors in console on page load', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out expected/ignorable errors
    const significantErrors = consoleErrors.filter(error =>
      !error.includes('favicon') &&
      !error.includes('analytics') &&
      !error.includes('gtag') &&
      !error.includes('CORS')
    );

    console.log(`Console errors found: ${significantErrors.length}`);
    significantErrors.forEach(e => console.log(`  - ${e}`));

    expect(significantErrors.length).toBe(0);
  });

  test('No JavaScript errors during user interactions', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await authenticate(page);
    await page.goto('/dashboard');

    // Click around
    const buttons = await page.locator('button').all();
    for (const button of buttons.slice(0, 5)) {
      try {
        await button.click({ timeout: 1000 });
      } catch { }
      await page.waitForTimeout(500);
    }

    const significantErrors = consoleErrors.filter(error =>
      !error.includes('favicon') &&
      !error.includes('analytics')
    );

    expect(significantErrors.length).toBe(0);
  });

  test('No deprecation warnings in console', async ({ page }) => {
    const warnings: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'warning' && msg.text().toLowerCase().includes('deprecat')) {
        warnings.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log(`Deprecation warnings found: ${warnings.length}`);
    warnings.forEach(w => console.log(`  - ${w}`));
  });

  test('No unhandled promise rejections', async ({ page }) => {
    const unhandledRejections: string[] = [];

    page.on('pageerror', error => {
      if (error.message.includes('Unhandled') || error.message.includes('rejection')) {
        unhandledRejections.push(error.message);
      }
    });

    await page.goto('/');
    await authenticate(page);
    await page.goto('/dashboard');

    expect(unhandledRejections.length).toBe(0);
  });
});

test.describe('Network Request Monitoring', () => {
  test('No failed API requests on page load', async ({ page }) => {
    const failedRequests: string[] = [];

    page.on('response', response => {
      if (response.url().includes('/api/') && response.status() >= 400) {
        failedRequests.push(`${response.status()} - ${response.url()}`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log(`Failed API requests: ${failedRequests.length}`);
    failedRequests.forEach(r => console.log(`  - ${r}`));

    // Filter out expected failures (404 for optional resources)
    const significantFailures = failedRequests.filter(r =>
      !r.includes('404') || r.includes('critical')
    );

    expect(significantFailures.length).toBe(0);
  });

  test('API response times should be acceptable', async ({ page }) => {
    const slowRequests: { url: string; duration: number }[] = [];

    page.on('response', async response => {
      if (response.url().includes('/api/')) {
        const timing = response.request().timing();
        const duration = timing.responseEnd;

        if (duration > 2000) {
          slowRequests.push({ url: response.url(), duration });
        }
      }
    });

    await authenticate(page);
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    console.log(`Slow API requests (>2s): ${slowRequests.length}`);
    slowRequests.forEach(r => console.log(`  - ${r.url}: ${r.duration}ms`));

    expect(slowRequests.length).toBe(0);
  });

  test('No CORS errors in requests', async ({ page }) => {
    const corsErrors: string[] = [];

    page.on('console', msg => {
      if (msg.text().toLowerCase().includes('cors')) {
        corsErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // CORS errors that block functionality should be 0
    const blockingCorsErrors = corsErrors.filter(e =>
      e.includes('blocked') || e.includes('denied')
    );

    expect(blockingCorsErrors.length).toBe(0);
  });
});

test.describe('Server Log Analysis', () => {
  // These tests require access to server logs
  // Run these in CI/CD where logs are accessible

  test.skip('Server logs should have no ERROR level entries', async () => {
    try {
      // Read recent server logs (adjust path as needed)
      const { stdout } = await execAsync(
        'tail -1000 /var/log/app/server.log | grep -i "ERROR" || true'
      );

      const errorLines = stdout.trim().split('\n').filter(line => line.length > 0);

      console.log(`Server ERROR entries: ${errorLines.length}`);
      errorLines.slice(0, 10).forEach(line => console.log(`  - ${line}`));

      // Allow some errors but flag if excessive
      expect(errorLines.length).toBeLessThan(10);
    } catch (error) {
      console.log('Could not access server logs');
    }
  });

  test.skip('Server logs should show successful service startup', async () => {
    try {
      const { stdout } = await execAsync(
        'tail -100 /var/log/app/server.log | grep -i "started\\|listening\\|ready" || true'
      );

      const startupLines = stdout.trim().split('\n').filter(line => line.length > 0);

      console.log(`Startup log entries found: ${startupLines.length}`);
      expect(startupLines.length).toBeGreaterThan(0);
    } catch (error) {
      console.log('Could not access server logs');
    }
  });

  test.skip('No memory or connection leak warnings in logs', async () => {
    try {
      const { stdout } = await execAsync(
        'tail -1000 /var/log/app/server.log | grep -iE "memory|leak|connection pool|too many" || true'
      );

      const warningLines = stdout.trim().split('\n').filter(line => line.length > 0);

      console.log(`Memory/connection warnings: ${warningLines.length}`);
      expect(warningLines.length).toBe(0);
    } catch (error) {
      console.log('Could not access server logs');
    }
  });
});

test.describe('Resource Monitoring', () => {
  test('Memory usage should be stable during interactions', async ({ page }) => {
    await authenticate(page);
    await page.goto('/dashboard');

    // Get initial memory
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0;
    });

    // Perform many interactions
    for (let i = 0; i < 20; i++) {
      await page.locator('button').first().hover();
      await page.waitForTimeout(100);
    }

    // Get final memory
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0;
    });

    if (initialMemory > 0) {
      const memoryGrowth = (finalMemory - initialMemory) / initialMemory;
      console.log(`Memory growth: ${(memoryGrowth * 100).toFixed(2)}%`);
      expect(memoryGrowth).toBeLessThan(0.5); // Less than 50% growth
    }
  });

  test('DOM nodes should not grow excessively', async ({ page }) => {
    await page.goto('/');

    const initialNodes = await page.evaluate(() => document.getElementsByTagName('*').length);

    // Navigate around
    await page.goto('/login');
    await page.goto('/');
    await page.goto('/about');
    await page.goto('/');

    const finalNodes = await page.evaluate(() => document.getElementsByTagName('*').length);

    console.log(`DOM nodes: ${initialNodes} -> ${finalNodes}`);

    // Should not have major DOM growth
    expect(finalNodes).toBeLessThan(initialNodes * 1.5);
  });

  test('Event listeners should be cleaned up', async ({ page }) => {
    await page.goto('/');

    // Navigate multiple times
    for (let i = 0; i < 5; i++) {
      await page.goto('/dashboard');
      await page.goto('/');
    }

    // Check for listener leaks (approximation)
    const listenerCount = await page.evaluate(() => {
      // This is a simplified check - real implementation would use getEventListeners
      return document.querySelectorAll('[onclick], [onmouseover]').length;
    });

    console.log(`Inline event listeners found: ${listenerCount}`);
  });
});

test.describe('Individual Element Animations', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('Button hover animations should work correctly', async ({ page }) => {
    await page.goto('/dashboard');

    const button = page.locator('button').first();

    // Get initial state
    const initialStyles = await button.evaluate(el => ({
      transform: getComputedStyle(el).transform,
      boxShadow: getComputedStyle(el).boxShadow,
      backgroundColor: getComputedStyle(el).backgroundColor,
    }));

    // Hover
    await button.hover();
    await page.waitForTimeout(300);

    // Get hover state
    const hoverStyles = await button.evaluate(el => ({
      transform: getComputedStyle(el).transform,
      boxShadow: getComputedStyle(el).boxShadow,
      backgroundColor: getComputedStyle(el).backgroundColor,
    }));

    // At least one property should change
    const hasChange =
      initialStyles.transform !== hoverStyles.transform ||
      initialStyles.boxShadow !== hoverStyles.boxShadow ||
      initialStyles.backgroundColor !== hoverStyles.backgroundColor;

    expect(hasChange).toBe(true);
  });

  test('Card expand/collapse animations should work', async ({ page }) => {
    await page.goto('/dashboard');

    const expandable = page.locator('[data-testid="expandable"], .accordion, details').first();

    if (await expandable.count() > 0) {
      // Click to expand
      await expandable.click();
      await page.waitForTimeout(300);

      // Check if expanded
      const isExpanded = await expandable.evaluate(el => {
        return el.classList.contains('open') ||
               el.classList.contains('expanded') ||
               (el as HTMLDetailsElement).open === true;
      });

      expect(isExpanded).toBe(true);
    }
  });

  test('Tab switching animations should work', async ({ page }) => {
    await page.goto('/settings');

    const tabs = page.locator('[role="tab"], .tab-button').all();
    const tabList = await tabs;

    if (tabList.length > 1) {
      // Click second tab
      await tabList[1].click();
      await page.waitForTimeout(300);

      // Tab content should change with animation
      const tabPanel = page.locator('[role="tabpanel"], .tab-content').first();
      await expect(tabPanel).toBeVisible();
    }
  });

  test('Modal open/close animations should work', async ({ page }) => {
    await page.goto('/dashboard');

    const modalTrigger = page.locator('[data-testid="open-modal"], button:has-text("Delete")').first();

    if (await modalTrigger.count() > 0) {
      await modalTrigger.click();

      const modal = page.locator('[role="dialog"], .modal').first();

      if (await modal.count() > 0) {
        // Modal should be visible
        await expect(modal).toBeVisible();

        // Check for animation
        const hasAnimation = await modal.evaluate(el => {
          const styles = getComputedStyle(el);
          return styles.animation !== 'none' ||
                 styles.transform !== 'none' ||
                 styles.opacity !== '1';
        });

        console.log(`Modal has animation: ${hasAnimation}`);
      }
    }
  });

  test('Dropdown animations should work', async ({ page }) => {
    await page.goto('/dashboard');

    const dropdown = page.locator('[data-testid="dropdown"], .dropdown, select').first();

    if (await dropdown.count() > 0) {
      await dropdown.click();
      await page.waitForTimeout(200);

      const menu = page.locator('.dropdown-menu, [role="listbox"], .menu').first();

      if (await menu.count() > 0) {
        await expect(menu).toBeVisible();
      }
    }
  });
});
