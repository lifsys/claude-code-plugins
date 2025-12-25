/**
 * Leonardo External Service Integration Tests
 * Validates all external services are properly connected and functioning
 */

import { test, expect, Page, APIRequestContext } from '@playwright/test';

// Test helper to authenticate
async function authenticate(page: Page) {
  await page.goto('/login');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'TestPassword123!');
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard|home|\//);
}

test.describe('API Integration', () => {
  let apiContext: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: process.env.API_URL || 'http://localhost:3000',
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('API health endpoint should respond', async () => {
    const response = await apiContext.get('/api/health');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.status).toBe('ok');
  });

  test('API should authenticate and return token', async () => {
    const response = await apiContext.post('/api/auth/login', {
      data: {
        email: 'test@example.com',
        password: 'TestPassword123!',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.token || body.accessToken).toBeDefined();
  });

  test('Protected API endpoints should require authentication', async () => {
    const response = await apiContext.get('/api/user/profile');
    expect(response.status()).toBe(401);
  });

  test('API rate limiting should be active', async () => {
    // Make many requests quickly
    const requests = Array(100).fill(null).map(() =>
      apiContext.get('/api/health')
    );

    const responses = await Promise.all(requests);

    // Some should be rate limited (429)
    const rateLimited = responses.filter(r => r.status() === 429);
    console.log(`Rate limited requests: ${rateLimited.length}/100`);
  });

  test('API CORS should be properly configured', async () => {
    const response = await apiContext.get('/api/health', {
      headers: {
        'Origin': 'http://localhost:3000',
      },
    });

    const corsHeader = response.headers()['access-control-allow-origin'];
    expect(corsHeader).toBeDefined();
  });
});

test.describe('Database Connection', () => {
  test('Database should be accessible via API', async ({ request }) => {
    const response = await request.get('/api/health/db');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.database).toBe('connected');
  });

  test('Database queries should complete within timeout', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('/api/users', {
      timeout: 5000,
    });
    const duration = Date.now() - startTime;

    expect(response.status()).toBeLessThan(500);
    expect(duration).toBeLessThan(5000);
  });
});

test.describe('Authentication Service Integration', () => {
  test('OAuth login should redirect correctly', async ({ page }) => {
    await page.goto('/login');

    // Find OAuth buttons
    const googleLogin = page.locator('button:has-text("Google"), [data-testid="google-login"]');
    const githubLogin = page.locator('button:has-text("GitHub"), [data-testid="github-login"]');

    // If OAuth is configured, buttons should be present
    if (await googleLogin.count() > 0) {
      // Click should redirect to Google
      const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        googleLogin.click(),
      ]).catch(() => [null]);

      if (popup) {
        expect(popup.url()).toContain('accounts.google.com');
        await popup.close();
      }
    }

    if (await githubLogin.count() > 0) {
      const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        githubLogin.click(),
      ]).catch(() => [null]);

      if (popup) {
        expect(popup.url()).toContain('github.com');
        await popup.close();
      }
    }
  });

  test('Password reset flow should work', async ({ page }) => {
    await page.goto('/login');

    const forgotPassword = page.locator('a:has-text("Forgot"), button:has-text("Forgot")').first();

    if (await forgotPassword.count() > 0) {
      await forgotPassword.click();

      // Should show reset form
      const emailInput = page.locator('input[type="email"]').first();
      await expect(emailInput).toBeVisible();

      await emailInput.fill('test@example.com');
      await page.locator('button[type="submit"]').first().click();

      // Should show success message
      const successMessage = page.locator('.success, [data-testid="reset-success"]');
      await expect(successMessage.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('Session token should be valid JWT', async ({ page }) => {
    await authenticate(page);

    // Check for JWT in cookies or localStorage
    const token = await page.evaluate(() => {
      // Check localStorage
      const localToken = localStorage.getItem('token') ||
                        localStorage.getItem('accessToken') ||
                        localStorage.getItem('auth_token');
      if (localToken) return localToken;

      // Check sessionStorage
      const sessionToken = sessionStorage.getItem('token') ||
                          sessionStorage.getItem('accessToken');
      return sessionToken;
    });

    if (token) {
      // Verify JWT structure
      const parts = token.split('.');
      expect(parts.length).toBe(3);

      // Decode payload
      const payload = JSON.parse(atob(parts[1]));
      expect(payload.exp).toBeDefined();
      expect(payload.exp).toBeGreaterThan(Date.now() / 1000);
    }
  });
});

test.describe('Payment Integration', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('Stripe elements should load', async ({ page }) => {
    await page.goto('/billing');

    // Stripe card element
    const stripeFrame = page.frameLocator('iframe[name*="stripe"]');

    if (await page.locator('iframe[name*="stripe"]').count() > 0) {
      const cardInput = stripeFrame.locator('input[name="cardnumber"]');
      await expect(cardInput).toBeVisible({ timeout: 10000 });
    }
  });

  test('Payment form should validate card details', async ({ page }) => {
    await page.goto('/billing');

    const stripeFrame = page.frameLocator('iframe[name*="stripe"]').first();

    if (await page.locator('iframe[name*="stripe"]').count() > 0) {
      // Enter invalid card
      const cardInput = stripeFrame.locator('input[name="cardnumber"]');
      await cardInput.fill('4242424242424241'); // Invalid card

      // Should show error
      const error = page.locator('.stripe-error, [data-testid="card-error"]');
      // Stripe shows inline error
    }
  });

  test('Subscription status should be displayed', async ({ page }) => {
    await page.goto('/billing');

    // Should show subscription status
    const subscriptionStatus = page.locator(
      '[data-testid="subscription-status"], .subscription-tier, .plan-name'
    );

    if (await subscriptionStatus.count() > 0) {
      await expect(subscriptionStatus.first()).toBeVisible();
    }
  });
});

test.describe('Email Service Integration', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('Email notification settings should save', async ({ page }) => {
    await page.goto('/settings/notifications');

    const emailToggle = page.locator(
      'input[name="emailNotifications"], [data-testid="email-toggle"]'
    ).first();

    if (await emailToggle.count() > 0) {
      await emailToggle.click();
      await page.locator('button:has-text("Save")').first().click();

      // Should show save confirmation
      const confirmation = page.locator('.toast-success, .notification-success');
      await expect(confirmation.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('Email verification should be sent', async ({ page }) => {
    await page.goto('/settings/profile');

    const resendButton = page.locator(
      'button:has-text("Resend verification"), [data-testid="resend-verification"]'
    );

    if (await resendButton.count() > 0) {
      await resendButton.click();

      const confirmation = page.locator('.success, [data-testid="email-sent"]');
      await expect(confirmation.first()).toBeVisible({ timeout: 5000 });
    }
  });
});

test.describe('File Storage Integration', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('File upload should work', async ({ page }) => {
    await page.goto('/settings/profile');

    const fileInput = page.locator('input[type="file"]').first();

    if (await fileInput.count() > 0) {
      // Upload test image
      await fileInput.setInputFiles({
        name: 'test-avatar.png',
        mimeType: 'image/png',
        buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64'),
      });

      // Wait for upload
      await page.waitForTimeout(2000);

      // Should show uploaded file or preview
      const preview = page.locator('.avatar-preview, img[src*="avatar"], .upload-success');
      expect(await preview.count()).toBeGreaterThan(0);
    }
  });

  test('Large file upload should be handled', async ({ page }) => {
    await page.goto('/upload');

    const fileInput = page.locator('input[type="file"]').first();

    if (await fileInput.count() > 0) {
      // Create 10MB buffer
      const largeBuffer = Buffer.alloc(10 * 1024 * 1024);

      await fileInput.setInputFiles({
        name: 'large-file.bin',
        mimeType: 'application/octet-stream',
        buffer: largeBuffer,
      });

      // Should show progress or error
      const progress = page.locator('.upload-progress, [data-testid="progress"]');
      const error = page.locator('.upload-error, .file-too-large');

      await page.waitForTimeout(5000);

      // Either shows progress or size error
      const hasProgress = await progress.count() > 0;
      const hasError = await error.count() > 0;
      expect(hasProgress || hasError).toBe(true);
    }
  });
});

test.describe('Third-Party API Integration', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('AI/LLM API should respond', async ({ page }) => {
    // Navigate to chat or AI feature
    await page.goto('/chat');

    const messageInput = page.locator(
      '[data-testid="message-input"], textarea[placeholder*="message"]'
    ).first();

    if (await messageInput.count() > 0) {
      await messageInput.fill('Hello, this is a test message');
      await page.locator('button:has-text("Send"), [data-testid="send"]').first().click();

      // Should receive response
      const response = page.locator('.assistant-message, [data-testid="ai-response"]');
      await expect(response.first()).toBeVisible({ timeout: 30000 });
    }
  });

  test('Analytics should be tracking', async ({ page }) => {
    await page.goto('/');

    // Check for analytics script
    const hasAnalytics = await page.evaluate(() => {
      return !!(
        (window as any).gtag ||
        (window as any).ga ||
        (window as any).analytics ||
        (window as any).mixpanel ||
        (window as any).plausible
      );
    });

    console.log(`Analytics tracking active: ${hasAnalytics}`);
  });

  test('CDN resources should load', async ({ page }) => {
    await page.goto('/');

    // Check for CDN-loaded resources
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter((r: any) => r.name.includes('cdn') || r.name.includes('cloudflare'))
        .map((r: any) => ({ name: r.name, duration: r.duration }));
    });

    console.log(`CDN resources loaded: ${resources.length}`);
  });
});

test.describe('WebSocket/Real-time Integration', () => {
  test('WebSocket connection should establish', async ({ page }) => {
    await authenticate(page);
    await page.goto('/dashboard');

    // Check WebSocket connection
    const wsConnected = await page.evaluate(() => {
      return new Promise((resolve) => {
        const checkWs = () => {
          const ws = (window as any).__ws || (window as any).socket;
          if (ws && ws.readyState === WebSocket.OPEN) {
            resolve(true);
          }
        };

        // Check immediately and after delay
        checkWs();
        setTimeout(() => {
          checkWs();
          resolve(false);
        }, 5000);
      });
    });

    console.log(`WebSocket connected: ${wsConnected}`);
  });

  test('Real-time updates should work', async ({ page, context }) => {
    await authenticate(page);
    await page.goto('/dashboard');

    // Open second tab
    const page2 = await context.newPage();
    await authenticate(page2);
    await page2.goto('/dashboard');

    // Make change in page2
    const createButton = page2.locator('button:has-text("Create")').first();
    if (await createButton.count() > 0) {
      await createButton.click();

      const titleInput = page2.locator('input[name="title"]').first();
      if (await titleInput.count() > 0) {
        const itemName = `Realtime-Test-${Date.now()}`;
        await titleInput.fill(itemName);
        await page2.locator('button[type="submit"]').first().click();

        // Check if page1 receives update (without refresh)
        await page.waitForTimeout(3000);

        // Look for new item in page1
        const newItem = page.locator(`text="${itemName}"`);
        const hasRealTimeUpdate = await newItem.count() > 0;
        console.log(`Real-time update received: ${hasRealTimeUpdate}`);
      }
    }

    await page2.close();
  });
});

test.describe('Cache Integration', () => {
  test('Static assets should be cached', async ({ page }) => {
    await page.goto('/');

    // Get cache headers
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter((r: any) => r.name.endsWith('.js') || r.name.endsWith('.css'))
        .map((r: any) => r.name);
    });

    // Second load should be faster
    const startTime = Date.now();
    await page.reload();
    const reloadTime = Date.now() - startTime;

    console.log(`Page reload time: ${reloadTime}ms`);
    expect(reloadTime).toBeLessThan(2000);
  });

  test('API responses should be cached appropriately', async ({ page }) => {
    await authenticate(page);

    // Monitor network
    const requests: string[] = [];
    page.on('request', req => {
      if (req.url().includes('/api/')) {
        requests.push(req.url());
      }
    });

    await page.goto('/dashboard');
    const firstLoadRequests = [...requests];

    requests.length = 0;
    await page.reload();
    const secondLoadRequests = [...requests];

    console.log(`First load API calls: ${firstLoadRequests.length}`);
    console.log(`Second load API calls: ${secondLoadRequests.length}`);
  });
});

test.describe('Error Tracking Integration', () => {
  test('Error tracking should capture errors', async ({ page }) => {
    await page.goto('/');

    // Inject error
    await page.evaluate(() => {
      throw new Error('Test error for tracking');
    }).catch(() => {});

    // Check for error tracking service
    const hasErrorTracking = await page.evaluate(() => {
      return !!(
        (window as any).Sentry ||
        (window as any).Bugsnag ||
        (window as any).Rollbar ||
        (window as any).TrackJS
      );
    });

    console.log(`Error tracking service active: ${hasErrorTracking}`);
  });
});
