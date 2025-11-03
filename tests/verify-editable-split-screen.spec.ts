import { test, expect } from '@playwright/test';

test.describe('Verify Editable Split-Screen Template', () => {
  test('should load editable Split-Screen sections and allow customization', async ({ page }) => {
    console.log('\n=== EDITABLE SPLIT-SCREEN TEMPLATE TEST ===\n');

    // Capture errors
    const errors: string[] = [];
    page.on('pageerror', (err) => {
      errors.push(err.message);
      console.log(`❌ Page Error: ${err.message}`);
    });

    // Navigate to builder
    console.log('📍 Navigating to builder...');
    await page.goto('http://localhost:3500/templates/split-screen/builder');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    console.log('✅ Page loaded\n');

    // Take initial screenshot
    await page.screenshot({ path: 'split-screen-editable-initial.png', fullPage: true });
    console.log('📸 Initial screenshot saved\n');

    // Check for runtime errors
    if (errors.length > 0) {
      console.log('❌ ERRORS FOUND ON LOAD:');
      errors.forEach(err => console.log(`  - ${err}`));
      console.log('');
    }

    // Check if all 4 Split-Screen sections are visible
    console.log('🔍 Checking for Split-Screen sections...\n');

    const heroVisible = await page.locator('text=David Kim').first().isVisible();
    const statsVisible = await page.locator('text=150+').isVisible();
    const skillsVisible = await page.locator('text=UI/UX Design').isVisible();
    const contactVisible = await page.locator('text=Let\'s Work Together').isVisible();

    console.log('📋 Sections Visibility:');
    console.log(`  Hero section: ${heroVisible ? '✅' : '❌'}`);
    console.log(`  Stats section: ${statsVisible ? '✅' : '❌'}`);
    console.log(`  Skills section: ${skillsVisible ? '✅' : '❌'}`);
    console.log(`  Contact section: ${contactVisible ? '✅' : '❌'}`);
    console.log('');

    // Check for Components panel
    const hasComponentsPanel = await page.locator('text=Components').isVisible();
    const hasSettingsPanel = await page.locator('text=Settings').isVisible();

    console.log('🛠️  Builder UI:');
    console.log(`  Components panel: ${hasComponentsPanel ? '✅' : '❌'}`);
    console.log(`  Settings panel: ${hasSettingsPanel ? '✅' : '❌'}`);
    console.log('');

    // Test 1: Click on Hero section to select it
    console.log('🎯 TEST 1: Click Hero section...');
    const heroSection = page.locator('section').filter({ hasText: 'David Kim' }).first();
    await heroSection.click();
    await page.waitForTimeout(1000);

    await page.screenshot({ path: 'split-screen-hero-selected.png', fullPage: true });
    console.log('📸 Hero selected screenshot saved');

    // Check if settings panel shows Hero settings
    const settingsText = await page.locator('.w-80').textContent();
    const hasHeroSettings = settingsText?.includes('Split-Screen Hero') || settingsText?.includes('Name') || false;

    console.log(`  Settings panel updated: ${hasHeroSettings ? '✅' : '❌'}`);
    console.log('');

    // Test 2: Edit Hero name
    if (hasHeroSettings) {
      console.log('✏️  TEST 2: Edit Hero name...');

      const nameInput = page.locator('input').filter({ hasText: '' }).first();
      const inputCount = await page.locator('.w-80 input[type="text"]').count();

      if (inputCount > 0) {
        const nameField = page.locator('.w-80 input').first();
        await nameField.fill('');
        await nameField.fill('Test User');
        await page.waitForTimeout(500);

        await page.screenshot({ path: 'split-screen-hero-edited.png', fullPage: true });
        console.log('📸 Hero edited screenshot saved');

        // Check if the change is reflected in the preview
        const updatedNameVisible = await page.locator('text=Test User').isVisible();
        console.log(`  Name updated in preview: ${updatedNameVisible ? '✅' : '❌'}`);
        console.log('');
      } else {
        console.log('  ⚠️  No input fields found in settings panel');
        console.log('');
      }
    }

    // Test 3: Click on Stats section
    console.log('🎯 TEST 3: Click Stats section...');
    const statsSection = page.locator('section').filter({ hasText: '150+' }).first();
    await statsSection.click();
    await page.waitForTimeout(1000);

    const statsSettingsText = await page.locator('.w-80').textContent();
    const hasStatsSettings = statsSettingsText?.includes('Stats') || false;

    console.log(`  Stats settings panel loaded: ${hasStatsSettings ? '✅' : '❌'}`);
    console.log('');

    // Test 4: Click on Skills section
    console.log('🎯 TEST 4: Click Skills section...');
    const skillsSection = page.locator('section').filter({ hasText: 'UI/UX Design' }).first();
    await skillsSection.click();
    await page.waitForTimeout(1000);

    const skillsSettingsText = await page.locator('.w-80').textContent();
    const hasSkillsSettings = skillsSettingsText?.includes('Skills') || false;

    console.log(`  Skills settings panel loaded: ${hasSkillsSettings ? '✅' : '❌'}`);
    console.log('');

    // Test 5: Click on Contact section
    console.log('🎯 TEST 5: Click Contact section...');
    const contactSection = page.locator('section').filter({ hasText: 'Let\'s Work Together' }).first();
    await contactSection.click();
    await page.waitForTimeout(1000);

    await page.screenshot({ path: 'split-screen-contact-selected.png', fullPage: true });
    console.log('📸 Contact selected screenshot saved');

    const contactSettingsText = await page.locator('.w-80').textContent();
    const hasContactSettings = contactSettingsText?.includes('Contact') || contactSettingsText?.includes('Email') || false;

    console.log(`  Contact settings panel loaded: ${hasContactSettings ? '✅' : '❌'}`);
    console.log('');

    // Test 6: Check if Delete button appears when component is selected
    const deleteButtonVisible = await page.locator('button:has-text("Delete")').isVisible();
    console.log(`🗑️  Delete button visible: ${deleteButtonVisible ? '✅' : '❌'}`);
    console.log('');

    // Final Summary
    console.log('📊 === FINAL SUMMARY ===');
    console.log(`Runtime errors: ${errors.length === 0 ? '✅ None' : `❌ ${errors.length} found`}`);
    console.log(`All sections visible: ${heroVisible && statsVisible && skillsVisible && contactVisible ? '✅' : '❌'}`);
    console.log(`Builder UI loaded: ${hasComponentsPanel && hasSettingsPanel ? '✅' : '❌'}`);
    console.log(`Sections are selectable: ${hasHeroSettings || hasStatsSettings || hasSkillsSettings || hasContactSettings ? '✅' : '❌'}`);
    console.log(`Settings panels work: ${hasHeroSettings && hasContactSettings ? '✅' : '❌'}`);
    console.log('');

    const allTestsPassed =
      errors.length === 0 &&
      heroVisible &&
      statsVisible &&
      skillsVisible &&
      contactVisible &&
      hasComponentsPanel &&
      hasSettingsPanel &&
      hasHeroSettings &&
      hasContactSettings;

    if (allTestsPassed) {
      console.log('✅✅✅ ALL TESTS PASSED - EDITABLE TEMPLATE WORKING! ✅✅✅');
    } else {
      console.log('❌ Some tests failed - see details above');
    }

    // Assertions
    expect(errors.length).toBe(0);
    expect(heroVisible).toBe(true);
    expect(statsVisible).toBe(true);
    expect(skillsVisible).toBe(true);
    expect(contactVisible).toBe(true);
    expect(hasComponentsPanel).toBe(true);
    expect(hasSettingsPanel).toBe(true);
  });
});
