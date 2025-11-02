import { test, expect } from '@playwright/test';

test.describe('Color Customization - Hero Component', () => {
  test('should show color pickers when Hero is selected', async ({ page }) => {
    console.log('\n=== TESTING COLOR CUSTOMIZATION ===\n');

    await page.goto('http://localhost:3500/templates/split-screen/builder');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    console.log('✅ Page loaded');

    // Click on the Hero component to select it
    const heroText = page.locator('text=John Doe').first();
    await heroText.click();
    await page.waitForTimeout(1000);

    console.log('✅ Hero component selected');

    // Check if Settings panel shows Hero settings
    const settingsPanel = page.locator('text=Settings').first();
    const isVisible = await settingsPanel.isVisible();
    console.log(`⚙️  Settings panel visible: ${isVisible ? '✅' : '❌'}`);

    // Check for Content section
    const contentSection = page.locator('text=CONTENT').first();
    const hasContent = await contentSection.isVisible();
    console.log(`📝 Content section: ${hasContent ? '✅' : '❌'}`);

    // Check for Colors section
    const colorsSection = page.locator('text=COLORS').first();
    const hasColors = await colorsSection.isVisible();
    console.log(`🎨 Colors section: ${hasColors ? '✅' : '❌'}`);

    // Check for Typography section
    const typographySection = page.locator('text=TYPOGRAPHY').first();
    const hasTypography = await typographySection.isVisible();
    console.log(`📐 Typography section: ${hasTypography ? '✅' : '❌'}`);

    // Check for Layout section
    const layoutSection = page.locator('text=LAYOUT').first();
    const hasLayout = await layoutSection.isVisible();
    console.log(`📏 Layout section: ${hasLayout ? '✅' : '❌'}`);

    // Check for color inputs
    const colorInputs = page.locator('input[type="color"]');
    const colorInputCount = await colorInputs.count();
    console.log(`🎨 Color pickers found: ${colorInputCount} (expected 4)`);

    // Check for range sliders
    const rangeInputs = page.locator('input[type="range"]');
    const rangeInputCount = await rangeInputs.count();
    console.log(`🎚️  Range sliders found: ${rangeInputCount} (expected 3)`);

    // Take screenshot
    await page.screenshot({ path: 'color-customization-test.png', fullPage: true });
    console.log('📸 Screenshot: color-customization-test.png');

    console.log('\n📊 === SUMMARY ===');

    if (hasContent && hasColors && hasTypography && hasLayout && colorInputCount === 4 && rangeInputCount === 3) {
      console.log('✅ ✅ ✅ COLOR CUSTOMIZATION FULLY IMPLEMENTED!');
      console.log('\n📝 Features Available:');
      console.log('   - Content editing (Name, Title, Background Image)');
      console.log('   - Color customization (4 color pickers)');
      console.log('   - Typography controls (Font size sliders)');
      console.log('   - Layout controls (Padding slider)');
    } else {
      console.log('❌ Some features missing');
    }

    // Assertions
    expect(hasContent).toBe(true);
    expect(hasColors).toBe(true);
    expect(hasTypography).toBe(true);
    expect(hasLayout).toBe(true);
    expect(colorInputCount).toBe(4);
    expect(rangeInputCount).toBe(3);
  });
});
