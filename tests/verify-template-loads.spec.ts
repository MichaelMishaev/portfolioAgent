import { test, expect } from '@playwright/test';

test.describe('Verify Template Loads in Builder', () => {
  test('should load Split-Screen template without errors', async ({ page }) => {
    console.log('\n=== VERIFYING SPLIT-SCREEN TEMPLATE LOADS ===\n');

    // Capture console messages
    const consoleMessages: string[] = [];
    const errors: string[] = [];

    page.on('console', (msg) => {
      consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
    });

    page.on('pageerror', (err) => {
      errors.push(err.message);
    });

    // Navigate to builder
    await page.goto('http://localhost:3500/templates/split-screen/builder');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('✅ Page loaded\n');

    // Take screenshot
    await page.screenshot({ path: 'builder-template-loaded.png', fullPage: true });
    console.log('📸 Screenshot saved: builder-template-loaded.png\n');

    // Check for runtime errors
    if (errors.length > 0) {
      console.log('❌ ERRORS FOUND:');
      errors.forEach(err => console.log(`  - ${err}`));
      console.log('');
    } else {
      console.log('✅ No runtime errors\n');
    }

    // Check if template content is visible
    const hasTemplateContent = await page.locator('text=David Kim').isVisible();
    const hasProjectsSection = await page.locator('text=Selected Work').isVisible();

    console.log('🔍 Template Content Check:');
    console.log(`  David Kim visible: ${hasTemplateContent ? '✅' : '❌'}`);
    console.log(`  Projects section visible: ${hasProjectsSection ? '✅' : '❌'}`);
    console.log('');

    // Check for builder UI elements
    const hasToolbar = await page.locator('button:has-text("View Template")').isVisible();
    const hasBackButton = await page.locator('text=Back to Gallery').isVisible();

    console.log('🛠️  Builder UI Check:');
    console.log(`  Toolbar visible: ${hasToolbar ? '✅' : '❌'}`);
    console.log(`  Back button visible: ${hasBackButton ? '✅' : '❌'}`);
    console.log('');

    // Print relevant console messages
    const errorMessages = consoleMessages.filter(msg =>
      msg.includes('[error]') || msg.includes('Error') || msg.includes('invalid')
    );

    if (errorMessages.length > 0) {
      console.log('⚠️  Console Errors:');
      errorMessages.forEach(msg => console.log(`  ${msg}`));
      console.log('');
    }

    // Final summary
    console.log('📊 === FINAL SUMMARY ===');
    console.log(`Page errors: ${errors.length === 0 ? '✅ None' : `❌ ${errors.length} found`}`);
    console.log(`Template content loaded: ${hasTemplateContent ? '✅ Yes' : '❌ No'}`);
    console.log(`Builder UI loaded: ${hasToolbar ? '✅ Yes' : '❌ No'}`);
    console.log('');

    if (errors.length === 0 && hasTemplateContent && hasToolbar) {
      console.log('✅✅✅ TEMPLATE LOADS SUCCESSFULLY! ✅✅✅');
    } else {
      console.log('❌ Template not loading correctly');
    }

    // Assertions
    expect(errors.length).toBe(0);
    expect(hasTemplateContent).toBe(true);
  });
});
