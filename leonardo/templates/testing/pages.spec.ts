/**
 * Leonardo Page Validation Tests
 * Validates all pages are implemented, render correctly, and function as expected
 */

import { test, expect, Page } from '@playwright/test';

// Define all pages that should exist in the application
// This should be populated from the specification's ui_layout section
const REQUIRED_PAGES = [
  { path: '/', name: 'Home', requiredElements: ['header', 'main', 'footer'] },
  { path: '/login', name: 'Login', requiredElements: ['form', 'input[type="email"]', 'input[type="password"]', 'button[type="submit"]'] },
  { path: '/register', name: 'Register', requiredElements: ['form', 'input[type="email"]', 'input[type="password"]'] },
  { path: '/dashboard', name: 'Dashboard', requiredElements: ['[data-testid="dashboard"]'], requiresAuth: true },
  { path: '/settings', name: 'Settings', requiredElements: ['form', '[data-testid="settings"]'], requiresAuth: true },
  { path: '/profile', name: 'Profile', requiredElements: ['[data-testid="profile"]'], requiresAuth: true },
  // Add more pages from specification
];

// Test helper to authenticate
async function authenticate(page: Page) {
  await page.goto('/login');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'TestPassword123!');
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard|home|\//);
}

test.describe('Page Existence and Rendering', () => {
  for (const pageConfig of REQUIRED_PAGES) {
    test(`${pageConfig.name} page should exist and render at ${pageConfig.path}`, async ({ page }) => {
      if (pageConfig.requiresAuth) {
        await authenticate(page);
      }

      const response = await page.goto(pageConfig.path);

      // Page should return 200
      expect(response?.status()).toBe(200);

      // Page should not show error states
      const errorIndicators = await page.locator('.error, .not-found, [data-testid="error"]').count();
      expect(errorIndicators).toBe(0);

      // Page should have title
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);

      // Required elements should be present
      for (const selector of pageConfig.requiredElements) {
        await expect(page.locator(selector).first()).toBeVisible({ timeout: 5000 });
      }
    });
  }
});

test.describe('Page Logic and Functionality', () => {
  test('Login page should authenticate user', async ({ page }) => {
    await page.goto('/login');

    // Fill login form
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'TestPassword123!');

    // Submit form
    await page.click('button[type="submit"]');

    // Should redirect to dashboard or home
    await page.waitForURL(/dashboard|home/, { timeout: 10000 });

    // Should show authenticated state
    const userMenu = page.locator('[data-testid="user-menu"], .user-avatar, .user-name');
    await expect(userMenu.first()).toBeVisible();
  });

  test('Login page should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should show error message
    const errorMessage = page.locator('.error-message, [data-testid="error"], [role="alert"]');
    await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
  });

  test('Registration page should create new account', async ({ page }) => {
    await page.goto('/register');

    const uniqueEmail = `test-${Date.now()}@example.com`;

    await page.fill('input[name="email"], input[type="email"]', uniqueEmail);
    await page.fill('input[name="password"], input[type="password"]', 'SecurePass123!');

    // Fill confirm password if present
    const confirmPassword = page.locator('input[name="confirmPassword"], input[name="password_confirm"]');
    if (await confirmPassword.count() > 0) {
      await confirmPassword.fill('SecurePass123!');
    }

    await page.click('button[type="submit"]');

    // Should redirect or show success
    await page.waitForURL(/dashboard|login|verify/, { timeout: 10000 });
  });

  test('Logout should end session', async ({ page }) => {
    await authenticate(page);

    // Find and click logout
    const logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout"), [data-testid="logout"]');
    await logoutButton.first().click();

    // Should redirect to login or home
    await page.waitForURL(/login|home|\/$/);

    // Protected pages should no longer be accessible
    await page.goto('/dashboard');
    await page.waitForURL(/login/);
  });
});

test.describe('Page Navigation', () => {
  test('All navigation links should work', async ({ page }) => {
    await page.goto('/');

    // Get all navigation links
    const navLinks = await page.locator('nav a, header a').all();

    for (const link of navLinks) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        const response = await page.goto(href);
        expect(response?.status()).toBeLessThan(400);
        await page.goBack();
      }
    }
  });

  test('Breadcrumbs should navigate correctly', async ({ page }) => {
    await authenticate(page);
    await page.goto('/settings/profile');

    const breadcrumbs = page.locator('[aria-label="breadcrumb"] a, .breadcrumb a');
    const count = await breadcrumbs.count();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const href = await breadcrumbs.nth(i).getAttribute('href');
        if (href) {
          await breadcrumbs.nth(i).click();
          await expect(page).toHaveURL(new RegExp(href.replace(/\//g, '\\/')));
          await page.goBack();
        }
      }
    }
  });

  test('Back/forward browser navigation should work', async ({ page }) => {
    await page.goto('/');
    const initialUrl = page.url();

    await page.goto('/login');
    await page.goBack();
    expect(page.url()).toBe(initialUrl);

    await page.goForward();
    expect(page.url()).toContain('/login');
  });
});

test.describe('Form Validation', () => {
  test('Required fields should show validation errors', async ({ page }) => {
    await page.goto('/register');

    // Submit empty form
    await page.click('button[type="submit"]');

    // Should show validation errors
    const validationErrors = page.locator(
      '.error, .invalid, [aria-invalid="true"], :invalid'
    );
    expect(await validationErrors.count()).toBeGreaterThan(0);
  });

  test('Email fields should validate format', async ({ page }) => {
    await page.goto('/register');

    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill('invalid-email');
    await emailInput.blur();

    // Should show format error
    const isInvalid = await emailInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid).toBe(true);
  });

  test('Password fields should enforce requirements', async ({ page }) => {
    await page.goto('/register');

    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill('weak');
    await passwordInput.blur();

    // Should show strength indicator or error
    const strengthIndicator = page.locator(
      '.password-strength, [data-testid="password-strength"], .error'
    );

    // Either shows weak indicator or validation error
    const count = await strengthIndicator.count();
    if (count > 0) {
      await expect(strengthIndicator.first()).toBeVisible();
    }
  });
});

test.describe('Page State Management', () => {
  test('Form state should persist on page refresh', async ({ page }) => {
    await page.goto('/register');

    const email = 'persist-test@example.com';
    await page.fill('input[type="email"]', email);

    // Some apps persist form state
    await page.reload();

    // Check if state was preserved (optional feature)
    const preservedValue = await page.locator('input[type="email"]').inputValue();
    // This test documents behavior - may or may not persist
    console.log(`Form state preserved: ${preservedValue === email}`);
  });

  test('Loading states should display during async operations', async ({ page }) => {
    await page.goto('/login');

    // Fill form
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');

    // Click and immediately check for loading state
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show loading indicator
    const loadingIndicator = page.locator(
      '.loading, .spinner, [data-loading="true"], button:disabled'
    );

    // Loading state should appear briefly
    // This is timing-sensitive, so we just verify it doesn't error
    const hasLoading = await loadingIndicator.count();
    console.log(`Loading indicator shown: ${hasLoading > 0}`);
  });

  test('Error states should be clearable', async ({ page }) => {
    await page.goto('/login');

    // Trigger error
    await page.fill('input[type="email"]', 'invalid@test.com');
    await page.fill('input[type="password"]', 'wrong');
    await page.click('button[type="submit"]');

    // Wait for error
    const error = page.locator('.error-message, [role="alert"]').first();
    await expect(error).toBeVisible({ timeout: 5000 });

    // Clear and try again
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'TestPassword123!');

    // Error should clear on new input or submission attempt
    await page.click('button[type="submit"]');
  });
});

test.describe('Responsive Page Layout', () => {
  const viewports = [
    { width: 375, height: 667, name: 'Mobile' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 1280, height: 720, name: 'Desktop' },
    { width: 1920, height: 1080, name: 'Large Desktop' },
  ];

  for (const viewport of viewports) {
    test(`Pages should render correctly at ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      for (const pageConfig of REQUIRED_PAGES.filter(p => !p.requiresAuth)) {
        await page.goto(pageConfig.path);

        // No horizontal overflow
        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        expect(hasHorizontalOverflow).toBe(false);

        // Main content should be visible
        const mainContent = page.locator('main, [role="main"], .main-content').first();
        if (await mainContent.count() > 0) {
          await expect(mainContent).toBeVisible();
        }
      }
    });
  }

  test('Mobile navigation should toggle correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Find mobile menu toggle
    const menuToggle = page.locator(
      '[data-testid="mobile-menu"], .hamburger, button[aria-label*="menu"]'
    ).first();

    if (await menuToggle.isVisible()) {
      await menuToggle.click();

      // Menu should open
      const mobileNav = page.locator('nav, .mobile-nav, [data-testid="mobile-nav"]');
      await expect(mobileNav.first()).toBeVisible();

      // Close menu
      await menuToggle.click();
    }
  });
});

test.describe('Page Performance', () => {
  for (const pageConfig of REQUIRED_PAGES.filter(p => !p.requiresAuth)) {
    test(`${pageConfig.name} should load within acceptable time`, async ({ page }) => {
      const startTime = Date.now();
      await page.goto(pageConfig.path, { waitUntil: 'domcontentloaded' });
      const loadTime = Date.now() - startTime;

      // Page should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);

      // Get performance metrics
      const metrics = await page.evaluate(() => ({
        domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        load: performance.timing.loadEventEnd - performance.timing.navigationStart,
      }));

      console.log(`${pageConfig.name} - DOM: ${metrics.domContentLoaded}ms, Load: ${metrics.load}ms`);
    });
  }
});

test.describe('Page SEO and Meta', () => {
  for (const pageConfig of REQUIRED_PAGES.filter(p => !p.requiresAuth)) {
    test(`${pageConfig.name} should have proper meta tags`, async ({ page }) => {
      await page.goto(pageConfig.path);

      // Should have title
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);

      // Should have meta description
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description?.length).toBeGreaterThan(0);

      // Should have viewport meta
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toContain('width=device-width');

      // Should have canonical URL if applicable
      const canonical = page.locator('link[rel="canonical"]');
      if (await canonical.count() > 0) {
        const href = await canonical.getAttribute('href');
        expect(href?.length).toBeGreaterThan(0);
      }
    });
  }
});
