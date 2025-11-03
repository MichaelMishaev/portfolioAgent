import { test, expect } from '@playwright/test';

test.describe('Mobile Template Builder - Tap to Add Components', () => {
  test.use({
    viewport: { width: 375, height: 667 }, // iPhone SE size
    isMobile: true,
    hasTouch: true,
  });

  test.beforeEach(async ({ page }) => {
    // Enable console logging to debug
    page.on('console', msg => {
      console.log(`Browser Console [${msg.type()}]:`, msg.text());
    });

    // Navigate to a template builder
    await page.goto('http://localhost:3500/templates/product-fashion/builder');

    // Wait for the builder to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Give CraftJS time to initialize
  });

  test('should display mobile navigation bar with three tabs', async ({ page }) => {
    // Check if mobile navigation bar is visible
    const componentsTab = page.getByRole('button', { name: /components/i });
    const canvasTab = page.getByRole('button', { name: /canvas/i });
    const settingsTab = page.getByRole('button', { name: /settings/i });

    await expect(componentsTab).toBeVisible();
    await expect(canvasTab).toBeVisible();
    await expect(settingsTab).toBeVisible();
  });

  test('should switch to Components tab and show component list', async ({ page }) => {
    // Click on Components tab
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    // Check if component categories are visible
    await expect(page.getByText('SPLIT-SCREEN')).toBeVisible();
    await expect(page.getByText('GENERIC')).toBeVisible();

    // Check if components are visible
    await expect(page.getByText('Split Hero')).toBeVisible();
    await expect(page.getByText('Stats')).toBeVisible();
    await expect(page.getByText('Skills')).toBeVisible();
    await expect(page.getByText('Contact')).toBeVisible();
  });

  test('should tap Split Hero component and add it to canvas', async ({ page }) => {
    console.log('\n=== TEST: Tap Split Hero Component ===\n');

    // Switch to Components tab
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    // Take screenshot before tapping
    await page.screenshot({ path: 'test-results/mobile-before-tap.png' });

    // Find and tap the Split Hero component button
    const splitHeroButton = page.locator('button', { hasText: 'Split Hero' }).first();
    await expect(splitHeroButton).toBeVisible();

    console.log('Tapping Split Hero button...');
    await splitHeroButton.tap();

    // Wait for component to be added and view to switch
    await page.waitForTimeout(1000);

    // Take screenshot after tapping
    await page.screenshot({ path: 'test-results/mobile-after-tap.png' });

    // Should automatically switch to Canvas tab
    console.log('Checking if view switched to Canvas...');
    const canvasTab = page.getByRole('button', { name: /canvas/i });
    await expect(canvasTab).toHaveClass(/bg-blue-50/); // Active tab has blue background

    // Check if component was added to canvas
    console.log('Checking if component is on canvas...');
    // The empty canvas message should be gone
    await expect(page.getByText('Start Building Your Site')).not.toBeVisible();

    // Look for indicators that a component was added
    // CraftJS components should have the component rendered
    const frame = page.frameLocator('iframe').first();
    // If there's no iframe, check main page
    const hasComponent = await page.locator('[class*="border-blue-500"], [class*="selected"]').count();
    console.log('Components with selection styles found:', hasComponent);
  });

  test('should tap multiple components and all should be added', async ({ page }) => {
    console.log('\n=== TEST: Tap Multiple Components ===\n');

    // Switch to Components tab
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    // Tap Split Hero
    console.log('Tapping Split Hero...');
    await page.locator('button', { hasText: 'Split Hero' }).first().tap();
    await page.waitForTimeout(800);

    // Switch back to Components tab
    await componentsTab.click();
    await page.waitForTimeout(500);

    // Tap Stats
    console.log('Tapping Stats...');
    await page.locator('button', { hasText: 'Stats' }).first().tap();
    await page.waitForTimeout(800);

    // Switch back to Components tab
    await componentsTab.click();
    await page.waitForTimeout(500);

    // Tap Skills
    console.log('Tapping Skills...');
    await page.locator('button', { hasText: 'Skills' }).first().tap();
    await page.waitForTimeout(800);

    // Take final screenshot
    await page.screenshot({ path: 'test-results/mobile-multiple-components.png' });

    // Verify empty canvas is gone
    await expect(page.getByText('Start Building Your Site')).not.toBeVisible();
  });

  test('should show tap to add instructions on mobile', async ({ page }) => {
    // Switch to Components tab
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    // Check if mobile-specific instructions are shown
    await expect(page.getByText('👆 Tap to add').first()).toBeVisible();
  });

  test('should display components panel at full width on mobile', async ({ page }) => {
    // Switch to Components tab
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    // Get the components panel
    const componentsPanel = page.locator('div').filter({ hasText: 'Components' }).first();
    const box = await componentsPanel.boundingBox();

    // On mobile, the panel should take full width (375px viewport)
    expect(box?.width).toBeGreaterThan(300);
  });

  test('should handle canvas visibility when switching tabs', async ({ page }) => {
    // Initially should be on Canvas tab
    const canvasTab = page.getByRole('button', { name: /canvas/i });
    await expect(canvasTab).toHaveClass(/bg-blue-50/);

    // Canvas content should be visible
    await expect(page.getByText('Start Building Your Site')).toBeVisible();

    // Switch to Components tab
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    // Canvas should not be visible (components panel should be shown)
    await expect(page.getByText('SPLIT-SCREEN')).toBeVisible();

    // Switch back to Canvas
    await canvasTab.click();
    await page.waitForTimeout(500);

    // Canvas should be visible again
    await expect(page.getByText('Start Building Your Site')).toBeVisible();
  });

  test('should have language toggle working on mobile', async ({ page }) => {
    // Check if EN/RU toggle is visible
    const enButton = page.getByRole('button', { name: 'EN' });
    const ruButton = page.getByRole('button', { name: 'RU' });

    await expect(enButton).toBeVisible();
    await expect(ruButton).toBeVisible();

    // Click RU button
    await ruButton.click();
    await page.waitForTimeout(500);

    // Should show Russian text
    await expect(page.getByText('Холст')).toBeVisible(); // "Canvas" in Russian
  });
});
