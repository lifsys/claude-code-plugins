/**
 * Leonardo Accessibility Tests
 * Validates WCAG 2.1 AA compliance using Playwright and axe-core
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have no critical accessibility violations on home page', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const criticalViolations = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(criticalViolations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const headings = await page.evaluate(() => {
      const h = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(h).map(el => ({
        level: parseInt(el.tagName[1]),
        text: el.textContent?.trim()
      }));
    });

    // Check h1 exists
    const h1Count = headings.filter(h => h.level === 1).length;
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // Check heading order (no skipping levels)
    for (let i = 1; i < headings.length; i++) {
      const current = headings[i].level;
      const previous = headings[i - 1].level;
      expect(current - previous).toBeLessThanOrEqual(1);
    }
  });

  test('all images should have alt text', async ({ page }) => {
    const imagesWithoutAlt = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      return Array.from(images)
        .filter(img => !img.hasAttribute('alt') || img.alt === '')
        .map(img => img.src);
    });

    expect(imagesWithoutAlt).toEqual([]);
  });

  test('all interactive elements should be keyboard accessible', async ({ page }) => {
    const interactiveElements = await page.locator(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ).all();

    for (const element of interactiveElements) {
      // Check element can receive focus
      await element.focus();
      const isFocused = await element.evaluate(
        el => document.activeElement === el
      );
      expect(isFocused).toBe(true);
    }
  });

  test('focus indicators should be visible', async ({ page }) => {
    const button = page.locator('button').first();
    await button.focus();

    const styles = await button.evaluate(el => {
      const computed = getComputedStyle(el);
      return {
        outline: computed.outline,
        outlineWidth: computed.outlineWidth,
        boxShadow: computed.boxShadow,
        border: computed.border
      };
    });

    // Should have visible focus indicator
    const hasVisibleFocus =
      styles.outline !== 'none' ||
      styles.outlineWidth !== '0px' ||
      styles.boxShadow !== 'none' ||
      styles.border.includes('2px');

    expect(hasVisibleFocus).toBe(true);
  });

  test('color contrast should meet WCAG AA standards', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .withRules(['color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('forms should have proper labels', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withRules(['label', 'label-title-only'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab through page and verify focus moves
    const focusOrder: string[] = [];

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const activeElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.tagName + (el.id ? `#${el.id}` : '') : null;
      });
      if (activeElement) {
        focusOrder.push(activeElement);
      }
    }

    // Should have navigated through multiple elements
    expect(focusOrder.length).toBeGreaterThan(0);

    // Focus should not get stuck on same element
    const uniqueElements = new Set(focusOrder);
    expect(uniqueElements.size).toBeGreaterThan(1);
  });

  test('modal dialogs should trap focus', async ({ page }) => {
    // Find and open a modal if present
    const modalTrigger = page.locator('[data-testid="open-modal"], .open-modal').first();

    if (await modalTrigger.isVisible()) {
      await modalTrigger.click();

      const modal = page.locator('[role="dialog"], .modal');
      await expect(modal).toBeVisible();

      // Tab through modal and verify focus stays within
      const focusableInModal = await modal.locator(
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ).all();

      if (focusableInModal.length > 0) {
        // Tab through all focusable elements
        for (let i = 0; i < focusableInModal.length + 2; i++) {
          await page.keyboard.press('Tab');
          const isFocusInModal = await modal.evaluate(
            (el) => el.contains(document.activeElement)
          );
          expect(isFocusInModal).toBe(true);
        }
      }
    }
  });

  test('should have proper ARIA landmarks', async ({ page }) => {
    const landmarks = await page.evaluate(() => {
      return {
        main: document.querySelectorAll('main, [role="main"]').length,
        navigation: document.querySelectorAll('nav, [role="navigation"]').length,
        banner: document.querySelectorAll('header, [role="banner"]').length,
        contentinfo: document.querySelectorAll('footer, [role="contentinfo"]').length
      };
    });

    // Should have at least main content area
    expect(landmarks.main).toBeGreaterThanOrEqual(1);
  });

  test('skip link should be present for keyboard users', async ({ page }) => {
    // Focus on first element
    await page.keyboard.press('Tab');

    // Check if skip link appears
    const skipLink = page.locator('a[href="#main"], a[href="#content"], .skip-link');

    if (await skipLink.count() > 0) {
      await expect(skipLink.first()).toBeFocused();

      // Verify it links to main content
      const href = await skipLink.first().getAttribute('href');
      expect(href).toMatch(/#(main|content|maincontent)/i);
    }
  });

  test('should announce dynamic content changes', async ({ page }) => {
    // Check for ARIA live regions
    const liveRegions = await page.locator('[aria-live], [role="alert"], [role="status"]').all();

    // If page has dynamic content, should have live regions
    const hasDynamicContent = await page.evaluate(() => {
      return document.querySelectorAll('button, form').length > 0;
    });

    if (hasDynamicContent) {
      expect(liveRegions.length).toBeGreaterThan(0);
    }
  });

  test('touch targets should be at least 44x44 pixels', async ({ page }) => {
    const buttons = await page.locator('button, a, [role="button"]').all();

    for (const button of buttons.slice(0, 10)) { // Check first 10
      const box = await button.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});

test.describe('Animation Accessibility', () => {
  test('animations should respect prefers-reduced-motion', async ({ page }) => {
    // Enable reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const animatedElements = await page.locator(
      '[class*="animate"], [class*="transition"], [class*="motion"]'
    ).all();

    for (const element of animatedElements.slice(0, 5)) {
      const styles = await element.evaluate(el => {
        const computed = getComputedStyle(el);
        return {
          animation: computed.animation,
          animationDuration: computed.animationDuration,
          transition: computed.transition,
          transitionDuration: computed.transitionDuration
        };
      });

      // Animations should be disabled or very short
      if (styles.animationDuration !== 'none') {
        expect(parseFloat(styles.animationDuration)).toBeLessThanOrEqual(0.01);
      }
      if (styles.transitionDuration !== '0s') {
        expect(parseFloat(styles.transitionDuration)).toBeLessThanOrEqual(0.01);
      }
    }
  });

  test('auto-playing content should have pause controls', async ({ page }) => {
    const autoPlayElements = await page.locator('video[autoplay], [class*="carousel"], [class*="slider"]').all();

    for (const element of autoPlayElements) {
      // Should have a pause/stop button nearby
      const parent = element.locator('..');
      const pauseButton = parent.locator('button[aria-label*="pause"], button[aria-label*="stop"], .pause-button');

      if (await element.isVisible()) {
        expect(await pauseButton.count()).toBeGreaterThan(0);
      }
    }
  });
});
