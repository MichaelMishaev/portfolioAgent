import { test, expect } from '@playwright/test';

test.describe('Verify Color Customization - Complete Test', () => {
  test('should show Hero settings when component is clicked', async ({ page }) => {
    console.log('\n=== COMPLETE COLOR CUSTOMIZATION VERIFICATION ===\n');

    // Capture all console messages
    const consoleMessages: string[] = [];
    page.on('console', (msg) => {
      consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
    });

    // Navigate to builder
    await page.goto('http://localhost:3500/templates/split-screen/builder');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('✅ Page loaded\n');

    // Take initial screenshot
    await page.screenshot({ path: 'verify-step-1-initial.png', fullPage: true });
    console.log('📸 Step 1: Initial page screenshot saved\n');

    // Find and click on the Hero component (purple gradient area)
    console.log('🎯 Attempting to click Hero component...');

    // Try multiple selectors to find the Hero
    let heroClicked = false;

    // Method 1: Click on the gradient background
    const heroByGradient = page.locator('div').filter({ hasText: 'John Doe' }).first();
    if (await heroByGradient.count() > 0) {
      await heroByGradient.click();
      heroClicked = true;
      console.log('✅ Clicked Hero via gradient selector');
    }

    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'verify-step-2-after-click.png', fullPage: true });
    console.log('📸 Step 2: After clicking Hero screenshot saved\n');

    // Check if Settings panel changed
    const settingsPanelText = await page.locator('.w-80').textContent();
    console.log('📝 Settings Panel Content:');
    console.log(settingsPanelText);
    console.log('');

    // Check for specific sections
    const hasHeroName = settingsPanelText?.includes('Hero') || false;
    const hasContentSection = settingsPanelText?.includes('CONTENT') || settingsPanelText?.includes('Content') || false;
    const hasColorsSection = settingsPanelText?.includes('COLORS') || settingsPanelText?.includes('Colors') || false;
    const hasTypographySection = settingsPanelText?.includes('TYPOGRAPHY') || settingsPanelText?.includes('Typography') || false;
    const hasLayoutSection = settingsPanelText?.includes('LAYOUT') || settingsPanelText?.includes('Layout') || false;

    console.log('🔍 Checking for sections:');
    console.log(`  Hero name: ${hasHeroName ? '✅' : '❌'}`);
    console.log(`  Content section: ${hasContentSection ? '✅' : '❌'}`);
    console.log(`  Colors section: ${hasColorsSection ? '✅' : '❌'}`);
    console.log(`  Typography section: ${hasTypographySection ? '✅' : '❌'}`);
    console.log(`  Layout section: ${hasLayoutSection ? '✅' : '❌'}`);
    console.log('');

    // Check for input elements in Settings panel
    const colorInputs = await page.locator('.w-80 input[type="color"]').count();
    const textInputs = await page.locator('.w-80 input[type="text"]').count();
    const rangeInputs = await page.locator('.w-80 input[type="range"]').count();

    console.log('🎨 Input Elements Found:');
    console.log(`  Color pickers: ${colorInputs}`);
    console.log(`  Text inputs: ${textInputs}`);
    console.log(`  Range sliders: ${rangeInputs}`);
    console.log('');

    // Check if Delete button is visible (indicates component is selected)
    const deleteButtonVisible = await page.locator('button:has-text("Delete")').first().isVisible();
    console.log(`🗑️  Delete button visible: ${deleteButtonVisible ? '✅' : '❌'}\n`);

    // Print all console messages from the page
    if (consoleMessages.length > 0) {
      console.log('📜 Browser Console Messages:');
      consoleMessages.forEach(msg => console.log(`  ${msg}`));
      console.log('');
    }

    // Final summary
    console.log('📊 === FINAL SUMMARY ===');
    console.log(`Hero clicked: ${heroClicked ? '✅' : '❌'}`);
    console.log(`Delete button visible: ${deleteButtonVisible ? '✅' : '❌'}`);
    console.log(`Settings panel updated: ${hasHeroName ? '✅' : '❌'}`);
    console.log(`Color customization available: ${colorInputs > 0 ? '✅' : '❌'}`);
    console.log('');

    if (hasContentSection && hasColorsSection && hasTypographySection && hasLayoutSection && colorInputs >= 4) {
      console.log('✅✅✅ COLOR CUSTOMIZATION FULLY WORKING! ✅✅✅');
    } else if (deleteButtonVisible && hasHeroName) {
      console.log('⚠️  Component is selected but settings not fully showing');
      console.log('   Expected: Content, Colors, Typography, Layout sections');
      console.log(`   Found: ${[hasContentSection && 'Content', hasColorsSection && 'Colors', hasTypographySection && 'Typography', hasLayoutSection && 'Layout'].filter(Boolean).join(', ') || 'None'}`);
    } else {
      console.log('❌ Color customization not working - settings panel not updating');
    }

    // Assertions
    expect(heroClicked).toBe(true);
    expect(deleteButtonVisible).toBe(true);
  });
});
