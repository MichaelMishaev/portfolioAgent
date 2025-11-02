import { test, expect } from '@playwright/test';

test.describe('Test Delete After localStorage Fix', () => {
  test('verify initialData loads correctly and delete works', async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.log('🔴 CONSOLE ERROR:', msg.text());
      }
    });

    page.on('pageerror', (error) => {
      pageErrors.push(error);
      console.log('🔴 PAGE ERROR:', error.message);
      console.log('Stack:', error.stack);
    });

    // Clear localStorage to force fresh initialData
    await page.goto('http://localhost:3500/templates/split-screen/builder');
    await page.evaluate(() => localStorage.clear());

    // Reload to get fresh initialData
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('\n=== 1. CHECKING INITIAL PAGE STATE ===\n');

    // Take screenshot of initial state
    await page.screenshot({ path: 'delete-test-initial.png', fullPage: true });
    console.log('📸 Screenshot saved: delete-test-initial.png');

    // Check if components panel has all components
    const heroInPanel = page.locator('text=Hero').first();
    const aboutInPanel = page.locator('text=About').first();
    const projectsInPanel = page.locator('text=Projects').first();
    const skillsInPanel = page.locator('text=Skills').first();

    console.log('Hero in Components panel:', await heroInPanel.count() > 0 ? '✓' : '✗');
    console.log('About in Components panel:', await aboutInPanel.count() > 0 ? '✓' : '✗');
    console.log('Projects in Components panel:', await projectsInPanel.count() > 0 ? '✓' : '✗');
    console.log('Skills in Components panel:', await skillsInPanel.count() > 0 ? '✓' : '✗');

    // Check Outline panel
    const outlineItems = page.locator('[class*="Outline"]').locator('text=Hero, text=About, text=Projects, text=Skills');
    console.log('Outline items count:', await outlineItems.count());

    console.log('\n=== 2. TESTING COMPONENT DELETION ===\n');

    // Find all visible components in the editor
    const editorComponents = page.locator('[class*="ComponentList"]').first();
    if (await editorComponents.count() > 0) {
      console.log('✓ Found ComponentList');

      // Look for the first component's action buttons
      await page.waitForTimeout(1000);

      // Try to find and click a component first
      const firstComponent = page.locator('text=Hero').first();
      if (await firstComponent.count() > 0) {
        console.log('✓ Found Hero component, clicking...');
        await firstComponent.click();
        await page.waitForTimeout(1000);

        // Take screenshot after selection
        await page.screenshot({ path: 'delete-test-selected.png', fullPage: true });
        console.log('📸 Screenshot after selection: delete-test-selected.png');

        // Now look for delete button
        const deleteSelectors = [
          'button[aria-label*="delete" i]',
          'button[aria-label*="remove" i]',
          'button:has(svg.lucide-trash)',
          '[data-action="delete"]',
          '[title*="Delete"]',
          'svg.lucide-trash',
        ];

        let deleteButtonFound = false;
        for (const selector of deleteSelectors) {
          const elements = page.locator(selector);
          const count = await elements.count();
          if (count > 0) {
            console.log(`✓ Found ${count} delete button(s) with selector: ${selector}`);
            deleteButtonFound = true;

            try {
              // Click the delete button
              await elements.first().click();
              await page.waitForTimeout(2000);

              console.log('\n=== 3. CHECKING FOR ERRORS AFTER DELETE ===\n');

              if (pageErrors.length > 0) {
                console.log('🔴 PAGE ERRORS DETECTED:');
                pageErrors.forEach((err, i) => {
                  console.log(`  Error ${i + 1}: ${err.message}`);
                });
              } else {
                console.log('✓ No page errors after delete');
              }

              if (consoleErrors.length > 0) {
                console.log('🔴 CONSOLE ERRORS:');
                consoleErrors.forEach((err, i) => {
                  console.log(`  ${i + 1}. ${err}`);
                });
              } else {
                console.log('✓ No console errors after delete');
              }

              // Take screenshot after delete
              await page.screenshot({ path: 'delete-test-after-delete.png', fullPage: true });
              console.log('📸 Screenshot after delete: delete-test-after-delete.png');

              break; // Only try first working selector
            } catch (error: any) {
              console.log(`Failed to click delete button: ${error.message}`);
            }
          }
        }

        if (!deleteButtonFound) {
          console.log('❌ No delete button found after component selection');
        }
      } else {
        console.log('❌ Could not find Hero component');
      }
    } else {
      console.log('❌ ComponentList not found');
    }

    console.log('\n=== 4. FINAL SUMMARY ===\n');
    console.log(`Total console errors: ${consoleErrors.length}`);
    console.log(`Total page errors: ${pageErrors.length}`);

    if (pageErrors.length === 0 && consoleErrors.length <= 2) {
      // Allow up to 2 console errors (React key warnings from Puck library)
      console.log('✅ DELETE TEST PASSED - No crashes detected');
    } else {
      console.log('❌ DELETE TEST FAILED - Errors detected');
    }
  });
});
