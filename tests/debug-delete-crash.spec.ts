import { test, expect } from '@playwright/test';

test.describe('Debug Delete Crash', () => {
  test('reproduce delete crash on split-screen template', async ({ page }) => {
    // Capture console errors
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (error) => {
      pageErrors.push(error);
    });

    // Navigate to split-screen builder
    await page.goto('http://localhost:3500/templates/split-screen/builder');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('Page loaded');

    // Try to find and click a delete button
    try {
      // Look for any delete button (trash icon)
      const deleteButtons = page.locator('button[aria-label*="delete"], button[title*="delete"], svg.lucide-trash, svg[data-icon="trash"]');
      const count = await deleteButtons.count();
      console.log(`Found ${count} delete buttons`);

      if (count > 0) {
        // Click the first delete button
        await deleteButtons.first().click();
        await page.waitForTimeout(1000);

        console.log('Console errors:', consoleErrors);
        console.log('Page errors:', pageErrors);

        // Check if there are errors
        if (pageErrors.length > 0) {
          console.log('CRASH DETECTED:', pageErrors[0].message);
        }
      }
    } catch (error) {
      console.log('Error during test:', error);
    }
  });
});
