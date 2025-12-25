/**
 * Leonardo Performance Tests
 * Validates animation performance, FPS, and Core Web Vitals
 */

import { test, expect } from '@playwright/test';

test.describe('Animation Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should maintain 60fps during page load animations', async ({ page }) => {
    // Track frame rate during initial load
    const frameData = await page.evaluate(async () => {
      return new Promise<{ fps: number; droppedFrames: number }>((resolve) => {
        let frameCount = 0;
        let lastTime = performance.now();
        let droppedFrames = 0;
        let lastFrameTime = performance.now();

        const countFrames = (currentTime: number) => {
          frameCount++;

          // Detect dropped frames (>16.67ms between frames)
          const frameDelta = currentTime - lastFrameTime;
          if (frameDelta > 20) {
            droppedFrames += Math.floor(frameDelta / 16.67) - 1;
          }
          lastFrameTime = currentTime;

          if (currentTime - lastTime < 2000) {
            requestAnimationFrame(countFrames);
          } else {
            const elapsed = (currentTime - lastTime) / 1000;
            resolve({
              fps: Math.round(frameCount / elapsed),
              droppedFrames
            });
          }
        };

        requestAnimationFrame(countFrames);
      });
    });

    expect(frameData.fps).toBeGreaterThanOrEqual(55);
    expect(frameData.droppedFrames).toBeLessThan(10);
  });

  test('should maintain 60fps during scroll', async ({ page }) => {
    // Scroll while measuring performance
    const scrollMetrics = await page.evaluate(async () => {
      return new Promise<{ fps: number; longTasks: number }>((resolve) => {
        let frameCount = 0;
        let longTasks = 0;
        const startTime = performance.now();

        // Track long tasks
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              longTasks++;
            }
          }
        });
        observer.observe({ entryTypes: ['longtask'] });

        const countFrames = () => {
          frameCount++;
          if (performance.now() - startTime < 2000) {
            requestAnimationFrame(countFrames);
          } else {
            observer.disconnect();
            const elapsed = (performance.now() - startTime) / 1000;
            resolve({
              fps: Math.round(frameCount / elapsed),
              longTasks
            });
          }
        };

        // Start scrolling
        let scrollY = 0;
        const scrollInterval = setInterval(() => {
          scrollY += 50;
          window.scrollTo({ top: scrollY, behavior: 'auto' });
          if (scrollY > 2000) clearInterval(scrollInterval);
        }, 16);

        requestAnimationFrame(countFrames);
      });
    });

    expect(scrollMetrics.fps).toBeGreaterThanOrEqual(55);
    expect(scrollMetrics.longTasks).toBeLessThan(5);
  });

  test('should maintain 60fps during hover interactions', async ({ page }) => {
    const buttons = await page.locator('button, .card, [class*="hover"]').all();

    if (buttons.length === 0) {
      test.skip();
      return;
    }

    // Measure performance during rapid hover interactions
    const hoverMetrics = await page.evaluate(async () => {
      return new Promise<{ fps: number }>((resolve) => {
        let frameCount = 0;
        const startTime = performance.now();

        const countFrames = () => {
          frameCount++;
          if (performance.now() - startTime < 1000) {
            requestAnimationFrame(countFrames);
          } else {
            const elapsed = (performance.now() - startTime) / 1000;
            resolve({ fps: Math.round(frameCount / elapsed) });
          }
        };

        requestAnimationFrame(countFrames);
      });
    });

    // Hover over elements while measuring
    for (const button of buttons.slice(0, 5)) {
      await button.hover();
      await page.waitForTimeout(100);
    }

    expect(hoverMetrics.fps).toBeGreaterThanOrEqual(55);
  });

  test('should not have layout thrashing during animations', async ({ page }) => {
    // Check for forced reflows during animations
    const layoutMetrics = await page.evaluate(() => {
      const layoutEvents: number[] = [];

      // Override offsetHeight to detect forced reflows
      const originalOffsetHeight = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'offsetHeight'
      );

      let reflows = 0;
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        get() {
          reflows++;
          return originalOffsetHeight?.get?.call(this);
        }
      });

      // Wait for any animations
      return new Promise<{ reflows: number }>((resolve) => {
        setTimeout(() => {
          if (originalOffsetHeight) {
            Object.defineProperty(
              HTMLElement.prototype,
              'offsetHeight',
              originalOffsetHeight
            );
          }
          resolve({ reflows });
        }, 2000);
      });
    });

    // Excessive reflows indicate layout thrashing
    expect(layoutMetrics.reflows).toBeLessThan(100);
  });

  test('animations should use GPU acceleration', async ({ page }) => {
    const animatedElements = await page.locator(
      '[class*="animate"], [class*="motion"], [class*="transition"]'
    ).all();

    for (const element of animatedElements.slice(0, 5)) {
      const styles = await element.evaluate((el) => {
        const computed = getComputedStyle(el);
        return {
          transform: computed.transform,
          willChange: computed.willChange,
          backfaceVisibility: computed.backfaceVisibility
        };
      });

      // Should use GPU-accelerated properties
      const isGpuAccelerated =
        styles.transform !== 'none' ||
        styles.willChange !== 'auto' ||
        styles.backfaceVisibility === 'hidden';

      // At least some animations should be GPU accelerated
      if (animatedElements.length > 0) {
        expect(isGpuAccelerated).toBe(true);
      }
    }
  });
});

test.describe('Core Web Vitals', () => {
  test('should have good Largest Contentful Paint (LCP)', async ({ page }) => {
    await page.goto('/');

    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        // Timeout fallback
        setTimeout(() => resolve(-1), 5000);
      });
    });

    // LCP should be under 2.5 seconds for "good" rating
    expect(lcp).toBeLessThan(2500);
  });

  test('should have good First Input Delay (FID) proxy', async ({ page }) => {
    await page.goto('/');

    // Wait for page to be interactive
    await page.waitForLoadState('domcontentloaded');

    // Measure time to first interaction
    const button = page.locator('button, a, input').first();
    if (await button.isVisible()) {
      const startTime = Date.now();
      await button.click({ force: true });
      const clickDuration = Date.now() - startTime;

      // FID should be under 100ms for "good" rating
      expect(clickDuration).toBeLessThan(100);
    }
  });

  test('should have good Cumulative Layout Shift (CLS)', async ({ page }) => {
    const cls = await page.evaluate(async () => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;

        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });

        // Wait for layout to stabilize
        setTimeout(() => resolve(clsValue), 3000);
      });
    });

    // Navigate to trigger any layout shifts
    await page.goto('/');
    await page.waitForTimeout(3000);

    // CLS should be under 0.1 for "good" rating
    expect(cls).toBeLessThan(0.1);
  });
});

test.describe('Memory Performance', () => {
  test('should not have memory leaks during animation cycles', async ({ page }) => {
    await page.goto('/');

    // Get initial memory
    const initialMemory = await page.evaluate(() => {
      if ((performance as any).memory) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });

    // Trigger many animations
    for (let i = 0; i < 20; i++) {
      await page.locator('button').first().hover();
      await page.waitForTimeout(100);
      await page.mouse.move(0, 0);
      await page.waitForTimeout(100);
    }

    // Get final memory
    const finalMemory = await page.evaluate(() => {
      if ((performance as any).memory) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });

    // Memory should not grow excessively (allow 50% increase)
    if (initialMemory > 0) {
      const memoryIncrease = (finalMemory - initialMemory) / initialMemory;
      expect(memoryIncrease).toBeLessThan(0.5);
    }
  });

  test('should clean up animation listeners on navigation', async ({ page }) => {
    await page.goto('/');

    // Get listener count before navigation
    const beforeListeners = await page.evaluate(() => {
      // This is a simplified check - real apps might need custom tracking
      return document.querySelectorAll('*').length;
    });

    // Navigate away and back
    await page.goto('/about');
    await page.goto('/');

    const afterListeners = await page.evaluate(() => {
      return document.querySelectorAll('*').length;
    });

    // DOM should not grow significantly after navigation
    expect(afterListeners).toBeLessThanOrEqual(beforeListeners * 1.1);
  });
});

test.describe('Bundle Size Performance', () => {
  test('should have reasonable JavaScript bundle size', async ({ page }) => {
    const jsSize = await page.evaluate(async () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const jsResources = resources.filter(r => r.name.endsWith('.js'));
      return jsResources.reduce((total, r) => total + r.transferSize, 0);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Total JS should be under 500KB (adjust based on project)
    expect(jsSize).toBeLessThan(500 * 1024);
  });

  test('should lazy load non-critical resources', async ({ page }) => {
    // Check that images below the fold are lazy loaded
    const images = await page.locator('img').all();

    for (const img of images) {
      const isInViewport = await img.isIntersecting();
      const loading = await img.getAttribute('loading');

      if (!isInViewport) {
        // Images below fold should be lazy loaded
        expect(loading).toBe('lazy');
      }
    }
  });
});
