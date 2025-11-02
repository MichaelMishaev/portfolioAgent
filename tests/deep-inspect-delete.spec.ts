import { test, expect } from '@playwright/test';

test.describe('Deep Inspect Delete Functionality', () => {
  test('inspect puck UI structure and delete buttons', async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.log('CONSOLE ERROR:', msg.text());
      }
    });

    page.on('pageerror', (error) => {
      pageErrors.push(error);
      console.log('PAGE ERROR:', error.message);
    });

    // Navigate to builder
    await page.goto('http://localhost:3500/templates/split-screen/builder');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('\n=== PAGE LOADED ===\n');

    // Take screenshot
    await page.screenshot({ path: 'delete-button-inspect.png', fullPage: true });
    console.log('Screenshot saved: delete-button-inspect.png');

    // Check if Puck loaded
    const puckContainer = page.locator('[class*="Puck"]');
    const puckCount = await puckContainer.count();
    console.log(`Puck containers found: ${puckCount}`);

    // Look for component items in the editor
    const components = page.locator('[class*="Component"]');
    const componentCount = await components.count();
    console.log(`Components found: ${componentCount}`);

    // Look for any buttons
    const allButtons = page.locator('button');
    const buttonCount = await allButtons.count();
    console.log(`Total buttons found: ${buttonCount}`);

    // Try to find delete/trash buttons with various selectors
    const selectors = [
      'button[aria-label*="delete" i]',
      'button[aria-label*="remove" i]',
      'button[title*="delete" i]',
      'button[title*="remove" i]',
      'button:has(svg.lucide-trash)',
      'button:has(svg[data-icon="trash"])',
      '[class*="delete"]',
      '[class*="remove"]',
      'svg.lucide-trash',
      'svg[data-icon="trash"]',
    ];

    for (const selector of selectors) {
      const elements = page.locator(selector);
      const count = await elements.count();
      if (count > 0) {
        console.log(`✓ Found ${count} elements with selector: ${selector}`);
      }
    }

    // Click on a component to select it
    console.log('\n=== CLICKING ON HERO COMPONENT ===\n');
    const heroText = page.locator('text=John Doe').first();
    if (await heroText.count() > 0) {
      await heroText.click();
      await page.waitForTimeout(1000);

      // Take screenshot after selection
      await page.screenshot({ path: 'delete-button-after-select.png', fullPage: true });
      console.log('Screenshot after selection: delete-button-after-select.png');

      // Check for delete buttons again after selection
      for (const selector of selectors) {
        const elements = page.locator(selector);
        const count = await elements.count();
        if (count > 0) {
          console.log(`✓ After selection: Found ${count} elements with selector: ${selector}`);

          // Try to click the first delete button
          try {
            console.log(`\n=== ATTEMPTING DELETE WITH SELECTOR: ${selector} ===\n`);
            await elements.first().click();
            await page.waitForTimeout(2000);

            console.log('Console errors after delete:', consoleErrors);
            console.log('Page errors after delete:', pageErrors);

            if (pageErrors.length > 0) {
              console.log('\n🔴 CRASH DETECTED:');
              pageErrors.forEach((err, i) => {
                console.log(`Error ${i + 1}: ${err.message}`);
                console.log(`Stack: ${err.stack}`);
              });
            } else {
              console.log('✓ No page errors after delete');
            }

            // Take screenshot after delete attempt
            await page.screenshot({ path: 'delete-button-after-delete.png', fullPage: true });
            console.log('Screenshot after delete: delete-button-after-delete.png');

            break; // Only try first working selector
          } catch (error) {
            console.log(`Failed to click with selector ${selector}:`, error);
          }
        }
      }
    } else {
      console.log('❌ Could not find Hero component');
    }

    // Final error summary
    console.log('\n=== FINAL ERROR SUMMARY ===');
    console.log(`Console errors: ${consoleErrors.length}`);
    console.log(`Page errors: ${pageErrors.length}`);
  });
});
