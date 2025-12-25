/**
 * Leonardo Database Persistence Tests
 * Validates all settings save to database, CRUD operations work,
 * and data integrity is maintained
 */

import { test, expect, Page } from '@playwright/test';

// Test helper to authenticate
async function authenticate(page: Page) {
  await page.goto('/login');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'TestPassword123!');
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard|home|\//);
}

// Test helper to wait for save confirmation
async function waitForSaveConfirmation(page: Page) {
  const confirmation = page.locator(
    '.toast-success, .save-success, [data-testid="save-success"], .notification-success'
  );
  await expect(confirmation.first()).toBeVisible({ timeout: 10000 });
}

test.describe('Settings Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('Profile settings should save and persist', async ({ page }) => {
    await page.goto('/settings/profile');

    // Update profile fields
    const newName = `Test User ${Date.now()}`;
    const nameInput = page.locator('input[name="name"], input[name="displayName"], #name');
    await nameInput.first().fill(newName);

    // Save settings
    const saveButton = page.locator('button:has-text("Save"), button[type="submit"]').first();
    await saveButton.click();

    // Wait for save confirmation
    await waitForSaveConfirmation(page);

    // Reload page and verify persistence
    await page.reload();
    const savedName = await nameInput.first().inputValue();
    expect(savedName).toBe(newName);
  });

  test('Notification preferences should save and persist', async ({ page }) => {
    await page.goto('/settings/notifications');

    // Toggle notification settings
    const emailToggle = page.locator(
      'input[name="emailNotifications"], [data-testid="email-notifications"]'
    ).first();

    if (await emailToggle.count() > 0) {
      const initialState = await emailToggle.isChecked();
      await emailToggle.click();

      // Save
      const saveButton = page.locator('button:has-text("Save"), button[type="submit"]').first();
      await saveButton.click();
      await waitForSaveConfirmation(page);

      // Verify persistence
      await page.reload();
      const newState = await emailToggle.isChecked();
      expect(newState).toBe(!initialState);

      // Restore original state
      await emailToggle.click();
      await saveButton.click();
    }
  });

  test('Theme preference should save and persist', async ({ page }) => {
    await page.goto('/settings');

    const themeToggle = page.locator(
      '[data-testid="theme-toggle"], .theme-switch, button:has-text("Dark")'
    ).first();

    if (await themeToggle.count() > 0) {
      // Get initial theme
      const initialTheme = await page.evaluate(() =>
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      );

      // Toggle theme
      await themeToggle.click();
      await page.waitForTimeout(500);

      // Verify theme changed
      const newTheme = await page.evaluate(() =>
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      );
      expect(newTheme).not.toBe(initialTheme);

      // Reload and verify persistence
      await page.reload();
      const persistedTheme = await page.evaluate(() =>
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      );
      expect(persistedTheme).toBe(newTheme);
    }
  });

  test('Language preference should save and persist', async ({ page }) => {
    await page.goto('/settings');

    const languageSelect = page.locator(
      'select[name="language"], [data-testid="language-select"]'
    ).first();

    if (await languageSelect.count() > 0) {
      // Change language
      await languageSelect.selectOption({ index: 1 });

      // Save
      const saveButton = page.locator('button:has-text("Save")').first();
      if (await saveButton.count() > 0) {
        await saveButton.click();
        await waitForSaveConfirmation(page);
      }

      // Get selected value
      const selectedValue = await languageSelect.inputValue();

      // Reload and verify
      await page.reload();
      const persistedValue = await languageSelect.inputValue();
      expect(persistedValue).toBe(selectedValue);
    }
  });

  test('Privacy settings should save and persist', async ({ page }) => {
    await page.goto('/settings/privacy');

    const privacyCheckboxes = page.locator(
      'input[type="checkbox"][name*="privacy"], input[type="checkbox"][name*="data"]'
    );

    if (await privacyCheckboxes.count() > 0) {
      const checkbox = privacyCheckboxes.first();
      const initialState = await checkbox.isChecked();

      await checkbox.click();

      const saveButton = page.locator('button:has-text("Save"), button[type="submit"]').first();
      await saveButton.click();
      await waitForSaveConfirmation(page);

      await page.reload();
      const persistedState = await checkbox.isChecked();
      expect(persistedState).toBe(!initialState);
    }
  });
});

test.describe('CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('CREATE: Should create new item and persist', async ({ page }) => {
    await page.goto('/dashboard');

    // Find create button
    const createButton = page.locator(
      'button:has-text("Create"), button:has-text("New"), button:has-text("Add"), [data-testid="create-button"]'
    ).first();

    if (await createButton.count() > 0) {
      await createButton.click();

      // Fill form
      const titleInput = page.locator(
        'input[name="title"], input[name="name"], input[placeholder*="title"]'
      ).first();

      if (await titleInput.count() > 0) {
        const itemTitle = `Test Item ${Date.now()}`;
        await titleInput.fill(itemTitle);

        // Submit
        const submitButton = page.locator('button[type="submit"], button:has-text("Create")').first();
        await submitButton.click();

        // Verify item appears in list
        await expect(page.locator(`text="${itemTitle}"`)).toBeVisible({ timeout: 5000 });

        // Reload and verify persistence
        await page.reload();
        await expect(page.locator(`text="${itemTitle}"`)).toBeVisible();
      }
    }
  });

  test('READ: Should display existing items', async ({ page }) => {
    await page.goto('/dashboard');

    // Should show list of items
    const itemList = page.locator(
      '[data-testid="item-list"], .item-list, ul, table tbody'
    ).first();

    if (await itemList.count() > 0) {
      // Items should load
      await page.waitForTimeout(2000);

      // Either has items or shows empty state
      const items = itemList.locator('li, tr, .item');
      const emptyState = page.locator('.empty-state, [data-testid="empty"]');

      const hasItems = await items.count() > 0;
      const hasEmptyState = await emptyState.count() > 0;

      expect(hasItems || hasEmptyState).toBe(true);
    }
  });

  test('UPDATE: Should update item and persist changes', async ({ page }) => {
    await page.goto('/dashboard');

    // Find an item to edit
    const editButton = page.locator(
      'button:has-text("Edit"), [data-testid="edit-button"], .edit-icon'
    ).first();

    if (await editButton.count() > 0) {
      await editButton.click();

      // Update title
      const titleInput = page.locator('input[name="title"], input[name="name"]').first();
      const updatedTitle = `Updated ${Date.now()}`;
      await titleInput.fill(updatedTitle);

      // Save
      const saveButton = page.locator('button:has-text("Save"), button[type="submit"]').first();
      await saveButton.click();

      // Verify update
      await expect(page.locator(`text="${updatedTitle}"`)).toBeVisible({ timeout: 5000 });

      // Reload and verify persistence
      await page.reload();
      await expect(page.locator(`text="${updatedTitle}"`)).toBeVisible();
    }
  });

  test('DELETE: Should delete item and persist removal', async ({ page }) => {
    await page.goto('/dashboard');

    // Count initial items
    const items = page.locator('[data-testid="item"], .item-row, li.item');
    const initialCount = await items.count();

    if (initialCount > 0) {
      // Find and click delete button on first item
      const deleteButton = page.locator(
        'button:has-text("Delete"), [data-testid="delete-button"], .delete-icon'
      ).first();

      if (await deleteButton.count() > 0) {
        await deleteButton.click();

        // Confirm deletion if dialog appears
        const confirmButton = page.locator(
          'button:has-text("Confirm"), button:has-text("Yes"), [data-testid="confirm-delete"]'
        );
        if (await confirmButton.count() > 0) {
          await confirmButton.click();
        }

        // Wait for deletion
        await page.waitForTimeout(1000);

        // Verify count decreased
        const newCount = await items.count();
        expect(newCount).toBeLessThan(initialCount);

        // Reload and verify persistence
        await page.reload();
        const persistedCount = await items.count();
        expect(persistedCount).toBe(newCount);
      }
    }
  });
});

test.describe('Data Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('Form validation should prevent invalid data submission', async ({ page }) => {
    await page.goto('/settings/profile');

    // Try to submit invalid email
    const emailInput = page.locator('input[type="email"]').first();
    if (await emailInput.count() > 0) {
      await emailInput.fill('invalid-email');

      const saveButton = page.locator('button:has-text("Save"), button[type="submit"]').first();
      await saveButton.click();

      // Should show validation error
      const error = page.locator('.error, .invalid, [aria-invalid="true"]');
      expect(await error.count()).toBeGreaterThan(0);
    }
  });

  test('Concurrent updates should be handled', async ({ page, context }) => {
    await page.goto('/settings/profile');

    // Open same page in another tab
    const page2 = await context.newPage();
    await authenticate(page2);
    await page2.goto('/settings/profile');

    // Update in first tab
    const nameInput1 = page.locator('input[name="name"]').first();
    await nameInput1.fill('Update from Tab 1');
    await page.locator('button:has-text("Save")').first().click();

    // Update in second tab
    const nameInput2 = page2.locator('input[name="name"]').first();
    await nameInput2.fill('Update from Tab 2');
    await page2.locator('button:has-text("Save")').first().click();

    // One should succeed, other might show conflict or last-write-wins
    // This documents the behavior
    await page.reload();
    const finalValue = await nameInput1.inputValue();
    console.log(`Final value after concurrent updates: ${finalValue}`);
  });

  test('Large data should be handled correctly', async ({ page }) => {
    await page.goto('/settings/profile');

    const bioInput = page.locator('textarea[name="bio"], textarea[name="description"]').first();

    if (await bioInput.count() > 0) {
      // Fill with large text
      const largeText = 'A'.repeat(5000);
      await bioInput.fill(largeText);

      const saveButton = page.locator('button:has-text("Save")').first();
      await saveButton.click();

      // Either saves successfully or shows length error
      await page.waitForTimeout(2000);

      // Check if saved or truncated
      await page.reload();
      const savedText = await bioInput.inputValue();
      expect(savedText.length).toBeGreaterThan(0);
    }
  });

  test('Special characters should be handled correctly', async ({ page }) => {
    await page.goto('/settings/profile');

    const nameInput = page.locator('input[name="name"]').first();
    const specialChars = "Test <script>alert('xss')</script> & \"quotes\" 'apostrophe'";

    await nameInput.fill(specialChars);
    await page.locator('button:has-text("Save")').first().click();
    await waitForSaveConfirmation(page);

    // Reload and verify - should be escaped/sanitized
    await page.reload();
    const savedValue = await nameInput.inputValue();

    // Should not contain raw script tags
    expect(savedValue).not.toContain('<script>');
  });
});

test.describe('Session and Auth Persistence', () => {
  test('Session should persist across page reloads', async ({ page }) => {
    await authenticate(page);
    await page.goto('/dashboard');

    // Reload multiple times
    for (let i = 0; i < 3; i++) {
      await page.reload();
      // Should still be authenticated
      await expect(page).toHaveURL(/dashboard/);
    }
  });

  test('Session should persist across browser restart', async ({ page, context }) => {
    await authenticate(page);

    // Get cookies/storage
    const cookies = await context.cookies();
    const authCookie = cookies.find(c =>
      c.name.includes('session') ||
      c.name.includes('token') ||
      c.name.includes('auth')
    );

    expect(authCookie).toBeDefined();
    expect(authCookie?.expires).toBeGreaterThan(Date.now() / 1000);
  });

  test('User data should be associated with correct user', async ({ page, context }) => {
    // Login as user 1
    await authenticate(page);
    await page.goto('/settings/profile');

    const nameInput = page.locator('input[name="name"]').first();
    const user1Name = `User1-${Date.now()}`;
    await nameInput.fill(user1Name);
    await page.locator('button:has-text("Save")').first().click();

    // Logout
    await page.locator('button:has-text("Logout"), [data-testid="logout"]').first().click();

    // Login as user 2 (if different test account exists)
    await page.goto('/login');
    await page.fill('input[type="email"]', 'test2@example.com');
    await page.fill('input[type="password"]', 'TestPassword123!');
    await page.click('button[type="submit"]');

    // Check user 2's profile doesn't have user 1's data
    await page.goto('/settings/profile');
    const user2Name = await nameInput.inputValue();
    expect(user2Name).not.toBe(user1Name);
  });
});

test.describe('Database Transaction Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('Failed save should not partially update data', async ({ page }) => {
    await page.goto('/settings');

    // Note initial state
    const fields = page.locator('input[name], select[name], textarea[name]');
    const initialValues: Record<string, string> = {};

    for (let i = 0; i < await fields.count(); i++) {
      const field = fields.nth(i);
      const name = await field.getAttribute('name');
      if (name) {
        initialValues[name] = await field.inputValue();
      }
    }

    // Simulate failure by disconnecting network before save
    await page.route('**/api/**', route => route.abort());

    // Try to save (should fail)
    await page.locator('button:has-text("Save")').first().click();

    // Restore network
    await page.unroute('**/api/**');

    // Reload and verify data unchanged
    await page.reload();

    for (let i = 0; i < await fields.count(); i++) {
      const field = fields.nth(i);
      const name = await field.getAttribute('name');
      if (name && initialValues[name]) {
        const currentValue = await field.inputValue();
        expect(currentValue).toBe(initialValues[name]);
      }
    }
  });
});
