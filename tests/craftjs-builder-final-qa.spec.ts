import { test, expect } from '@playwright/test';

test.describe('Craft.js Builder - Final QA Test', () => {
  test('should have all 6 components available', async ({ page }) => {
    console.log('\n=== CRAFT.JS BUILDER - FINAL QA ===\n');

    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (error) => {
      pageErrors.push(error);
      console.log('❌ PAGE ERROR:', error.message);
    });

    // Navigate to builder
    await page.goto('http://localhost:3500/templates/split-screen/builder');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('✅ Page loaded');

    // Take screenshot
    await page.screenshot({ path: 'craftjs-builder-qa.png', fullPage: true });
    console.log('📸 Screenshot: craftjs-builder-qa.png');

    // Check all 6 components in toolbox
    console.log('\n📋 Checking Components Panel:');

    const components = [
      { name: 'Hero', description: 'Header section' },
      { name: 'About', description: 'About section' },
      { name: 'Projects', description: 'Project showcase' },
      { name: 'Skills', description: 'Skills showcase' },
      { name: 'Contact', description: 'Contact information' },
      { name: 'Pricing', description: 'Pricing plans' },
    ];

    const results: Record<string, boolean> = {};

    for (const component of components) {
      const exists = await page.locator(`text=${component.name}`).first().isVisible();
      results[component.name] = exists;
      console.log(`  ${component.name}: ${exists ? '✅' : '❌'}`);
    }

    // Check for canvas area
    const canvasExists = await page.locator('.bg-gray-100').first().isVisible();
    console.log(`\n📐 Canvas Area: ${canvasExists ? '✅' : '❌'}`);

    // Check for settings panel
    const settingsExists = await page.locator('text=Settings').first().isVisible();
    console.log(`⚙️  Settings Panel: ${settingsExists ? '✅' : '❌'}`);

    // Final summary
    console.log('\n📊 === FINAL SUMMARY ===');
    console.log(`Page errors: ${pageErrors.length}`);

    const allComponentsPresent = Object.values(results).every(v => v === true);

    if (allComponentsPresent && pageErrors.length === 0 && canvasExists && settingsExists) {
      console.log('\n✅ ✅ ✅ CRAFT.JS BUILDER - ALL TESTS PASSED!');
      console.log('\n📝 **Manual Testing Checklist**:');
      console.log('   1. Open: http://localhost:3500/templates/split-screen/builder');
      console.log('   2. Drag components from left panel to canvas');
      console.log('   3. Click on a component to select it (should show blue border)');
      console.log('   4. Click delete button (trash icon) to remove component');
      console.log('   5. Check Settings panel shows component properties');
      console.log('   6. Verify all 6 components can be added and deleted');
    } else {
      console.log('\n❌ SOME TESTS FAILED');
      if (!allComponentsPresent) {
        console.log('   Missing components:', Object.entries(results).filter(([_, v]) => !v).map(([k]) => k));
      }
      if (pageErrors.length > 0) {
        console.log('   Page errors detected:', pageErrors.length);
      }
      if (!canvasExists) console.log('   Canvas area not found');
      if (!settingsExists) console.log('   Settings panel not found');
    }

    // Assertions
    expect(allComponentsPresent).toBe(true);
    expect(pageErrors.length).toBe(0);
    expect(canvasExists).toBe(true);
    expect(settingsExists).toBe(true);
  });
});
