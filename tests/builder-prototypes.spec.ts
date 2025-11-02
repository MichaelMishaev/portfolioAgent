import { test, expect } from '@playwright/test';

test.describe('Builder Prototypes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3500/builder-test');
    await page.waitForLoadState('networkidle');
  });

  test('should load builder test page', async ({ page }) => {
    await expect(page.locator('header h1')).toContainText('Prototype Comparison');
  });

  test('should show both tabs (Craft.js and Puck)', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Craft.js/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Puck/i })).toBeVisible();
  });

  test('Craft.js: should have available sections in sidebar', async ({ page }) => {
    // Click Craft.js tab
    await page.getByRole('tab', { name: /Craft.js/i }).click();
    await page.waitForTimeout(1000);

    // Check for section buttons
    await expect(page.getByRole('button', { name: 'Hero Section' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'About Section' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Projects' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skills' })).toBeVisible();
  });

  test('Craft.js: should have initial sections in canvas', async ({ page }) => {
    // Click Craft.js tab
    await page.getByRole('tab', { name: /Craft.js/i }).click();
    await page.waitForTimeout(1000);

    // Check for default sections
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Full Stack Developer')).toBeVisible();
  });

  test('Craft.js: should show download config button', async ({ page }) => {
    await page.getByRole('tab', { name: /Craft.js/i }).click();
    await page.waitForTimeout(1000);

    await expect(page.getByRole('button', { name: /Download Config/i })).toBeVisible();
  });

  test('Puck: should load Puck editor', async ({ page }) => {
    await page.getByRole('tab', { name: /Puck/i }).click();
    await page.waitForTimeout(2000); // Puck takes a bit longer to load

    // Check if Puck editor loaded (look for template selection banner)
    await expect(page.getByText('Building Your Layout Template')).toBeVisible();
    await expect(page.getByText('Choose Your Design Template:')).toBeVisible();
  });

  test('should have comparison table', async ({ page }) => {
    await expect(page.getByText('Feature Comparison')).toBeVisible();
    await expect(page.getByText('Ease of Setup')).toBeVisible();
    await expect(page.getByText('Customization')).toBeVisible();
  });

  test('should have back to home link', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /Back to Home/i });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute('href', '/');
  });

  test('Craft.js: should toggle editing mode', async ({ page }) => {
    await page.getByRole('tab', { name: /Craft.js/i }).click();
    await page.waitForTimeout(1000);

    const toggleButton = page.getByRole('button', { name: /Editing Enabled/i });
    await expect(toggleButton).toBeVisible();

    // Click to disable
    await toggleButton.click();
    await expect(page.getByRole('button', { name: /Editing Disabled/i })).toBeVisible();
  });
});
