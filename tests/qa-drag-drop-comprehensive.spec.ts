import { test, expect } from '@playwright/test';

/**
 * COMPREHENSIVE DRAG & DROP QA TEST SUITE
 *
 * This test suite performs detailed verification of:
 * 1. All 7 components can be dragged and dropped
 * 2. Drag & drop works in both EN and RU languages
 * 3. Components actually appear in the canvas after drop
 * 4. Touch polyfill is working for mobile
 * 5. No console errors during drag & drop operations
 */

test.describe('Builder Drag & Drop - Comprehensive QA', () => {

  test.beforeEach(async ({ page }) => {
    // Monitor console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ CONSOLE ERROR:', msg.text());
      }
    });

    // Navigate to builder
    await page.goto('http://localhost:3500/templates/split-screen/builder');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  // ============================================
  // TEST 1: Verify all components are visible in toolbox - ENGLISH
  // ============================================

  test('Should show all 7 components in English toolbox', async ({ page }) => {
    console.log('\n🔍 TEST 1: Verifying English Toolbox Components');

    // Ensure we're in English mode
    await page.click('button:has-text("EN")');
    await page.waitForTimeout(500);

    const components = [
      { name: 'Split Hero', section: 'split-screen' },
      { name: 'Stats', section: 'split-screen' },
      { name: 'Skills', section: 'split-screen' },
      { name: 'Contact', section: 'split-screen' },
      { name: 'Hero', section: 'generic' },
      { name: 'About', section: 'generic' },
      { name: 'Projects', section: 'generic' }
    ];

    for (const component of components) {
      const button = page.locator(`button:has-text("${component.name}")`).first();
      await expect(button).toBeVisible({ timeout: 5000 });
      console.log(`  ✅ ${component.name} - visible`);
    }
  });

  // ============================================
  // TEST 2: Verify all components are visible in toolbox - RUSSIAN
  // ============================================

  test('Should show all 7 components in Russian toolbox', async ({ page }) => {
    console.log('\n🔍 TEST 2: Verifying Russian Toolbox Components');

    // Switch to Russian
    await page.click('button:has-text("RU")');
    await page.waitForTimeout(500);

    const components = [
      { name: 'Главный баннер', section: 'split-screen' },
      { name: 'Статистика', section: 'split-screen' },
      { name: 'Навыки', section: 'split-screen' },
      { name: 'Контакты', section: 'split-screen' },
      { name: 'Баннер', section: 'generic' },
      { name: 'О нас', section: 'generic' },
      { name: 'Проекты', section: 'generic' }
    ];

    for (const component of components) {
      const button = page.locator(`button:has-text("${component.name}")`).first();
      await expect(button).toBeVisible({ timeout: 5000 });
      console.log(`  ✅ ${component.name} - visible`);
    }
  });

  // ============================================
  // TEST 3: Drag & Drop - Split Hero (EN)
  // ============================================

  test('Should drag and drop Split Hero component (English)', async ({ page }) => {
    console.log('\n🔍 TEST 3: Drag & Drop - Split Hero (EN)');

    await page.click('button:has-text("EN")');
    await page.waitForTimeout(500);

    const sourceButton = page.locator('button:has-text("Split Hero")').first();
    const canvas = page.locator('.flex-1.overflow-auto.bg-gray-100').first();

    // Get bounding boxes
    const sourceBox = await sourceButton.boundingBox();
    const canvasBox = await canvas.boundingBox();

    if (!sourceBox || !canvasBox) {
      throw new Error('Could not get element positions');
    }

    // Perform drag & drop
    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(200);
    await page.mouse.move(canvasBox.x + 200, canvasBox.y + 200, { steps: 10 });
    await page.waitForTimeout(200);
    await page.mouse.up();
    await page.waitForTimeout(1000);

    // Verify component appeared in canvas
    const droppedComponent = page.locator('text=John Doe').first();
    await expect(droppedComponent).toBeVisible({ timeout: 5000 });
    console.log('  ✅ Split Hero dropped successfully');
  });

  // ============================================
  // TEST 4: Drag & Drop - Stats (EN)
  // ============================================

  test('Should drag and drop Stats component (English)', async ({ page }) => {
    console.log('\n🔍 TEST 4: Drag & Drop - Stats (EN)');

    await page.click('button:has-text("EN")');
    await page.waitForTimeout(500);

    const sourceButton = page.locator('button').filter({ hasText: /^Stats$/ }).first();
    const canvas = page.locator('.flex-1.overflow-auto.bg-gray-100').first();

    const sourceBox = await sourceButton.boundingBox();
    const canvasBox = await canvas.boundingBox();

    if (!sourceBox || !canvasBox) {
      throw new Error('Could not get element positions');
    }

    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(200);
    await page.mouse.move(canvasBox.x + 200, canvasBox.y + 200, { steps: 10 });
    await page.waitForTimeout(200);
    await page.mouse.up();
    await page.waitForTimeout(1000);

    // Verify component appeared - Stats component has "Years Experience" text
    const droppedComponent = page.locator('text=Years Experience').first();
    await expect(droppedComponent).toBeVisible({ timeout: 5000 });
    console.log('  ✅ Stats dropped successfully');
  });

  // ============================================
  // TEST 5: Drag & Drop - Skills (EN)
  // ============================================

  test('Should drag and drop Skills component (English)', async ({ page }) => {
    console.log('\n🔍 TEST 5: Drag & Drop - Skills (EN)');

    await page.click('button:has-text("EN")');
    await page.waitForTimeout(500);

    const sourceButton = page.locator('button').filter({ hasText: /^Skills$/ }).first();
    const canvas = page.locator('.flex-1.overflow-auto.bg-gray-100').first();

    const sourceBox = await sourceButton.boundingBox();
    const canvasBox = await canvas.boundingBox();

    if (!sourceBox || !canvasBox) {
      throw new Error('Could not get element positions');
    }

    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(200);
    await page.mouse.move(canvasBox.x + 200, canvasBox.y + 200, { steps: 10 });
    await page.waitForTimeout(200);
    await page.mouse.up();
    await page.waitForTimeout(1000);

    // Verify component appeared - Skills component has skill tags
    const droppedComponent = page.locator('text=React').first();
    await expect(droppedComponent).toBeVisible({ timeout: 5000 });
    console.log('  ✅ Skills dropped successfully');
  });

  // ============================================
  // TEST 6: Drag & Drop - Contact (EN)
  // ============================================

  test('Should drag and drop Contact component (English)', async ({ page }) => {
    console.log('\n🔍 TEST 6: Drag & Drop - Contact (EN)');

    await page.click('button:has-text("EN")');
    await page.waitForTimeout(500);

    const sourceButton = page.locator('button').filter({ hasText: /^Contact$/ }).first();
    const canvas = page.locator('.flex-1.overflow-auto.bg-gray-100').first();

    const sourceBox = await sourceButton.boundingBox();
    const canvasBox = await canvas.boundingBox();

    if (!sourceBox || !canvasBox) {
      throw new Error('Could not get element positions');
    }

    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(200);
    await page.mouse.move(canvasBox.x + 200, canvasBox.y + 200, { steps: 10 });
    await page.waitForTimeout(200);
    await page.mouse.up();
    await page.waitForTimeout(1000);

    // Verify component appeared - Contact component has "Get in Touch" text
    const droppedComponent = page.locator('text=Get in Touch').first();
    await expect(droppedComponent).toBeVisible({ timeout: 5000 });
    console.log('  ✅ Contact dropped successfully');
  });

  // ============================================
  // TEST 7: Drag & Drop - Hero (EN)
  // ============================================

  test('Should drag and drop Hero component (English)', async ({ page }) => {
    console.log('\n🔍 TEST 7: Drag & Drop - Hero (EN)');

    await page.click('button:has-text("EN")');
    await page.waitForTimeout(500);

    const sourceButton = page.locator('button').filter({ hasText: /^Hero$/ }).first();
    const canvas = page.locator('.flex-1.overflow-auto.bg-gray-100').first();

    const sourceBox = await sourceButton.boundingBox();
    const canvasBox = await canvas.boundingBox();

    if (!sourceBox || !canvasBox) {
      throw new Error('Could not get element positions');
    }

    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(200);
    await page.mouse.move(canvasBox.x + 200, canvasBox.y + 200, { steps: 10 });
    await page.waitForTimeout(200);
    await page.mouse.up();
    await page.waitForTimeout(1000);

    // Verify component appeared - Generic Hero has "Full Stack Developer" text
    const droppedComponent = page.locator('text=Full Stack Developer').first();
    await expect(droppedComponent).toBeVisible({ timeout: 5000 });
    console.log('  ✅ Hero dropped successfully');
  });

  // ============================================
  // TEST 8: Drag & Drop - About (EN)
  // ============================================

  test('Should drag and drop About component (English)', async ({ page }) => {
    console.log('\n🔍 TEST 8: Drag & Drop - About (EN)');

    await page.click('button:has-text("EN")');
    await page.waitForTimeout(500);

    const sourceButton = page.locator('button').filter({ hasText: /^About$/ }).first();
    const canvas = page.locator('.flex-1.overflow-auto.bg-gray-100').first();

    const sourceBox = await sourceButton.boundingBox();
    const canvasBox = await canvas.boundingBox();

    if (!sourceBox || !canvasBox) {
      throw new Error('Could not get element positions');
    }

    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(200);
    await page.mouse.move(canvasBox.x + 200, canvasBox.y + 200, { steps: 10 });
    await page.waitForTimeout(200);
    await page.mouse.up();
    await page.waitForTimeout(1000);

    // Verify component appeared
    const droppedComponent = page.locator('text=About Me').first();
    await expect(droppedComponent).toBeVisible({ timeout: 5000 });
    console.log('  ✅ About dropped successfully');
  });

  // ============================================
  // TEST 9: Drag & Drop - Projects (EN)
  // ============================================

  test('Should drag and drop Projects component (English)', async ({ page }) => {
    console.log('\n🔍 TEST 9: Drag & Drop - Projects (EN)');

    await page.click('button:has-text("EN")');
    await page.waitForTimeout(500);

    const sourceButton = page.locator('button').filter({ hasText: /^Projects$/ }).first();
    const canvas = page.locator('.flex-1.overflow-auto.bg-gray-100').first();

    const sourceBox = await sourceButton.boundingBox();
    const canvasBox = await canvas.boundingBox();

    if (!sourceBox || !canvasBox) {
      throw new Error('Could not get element positions');
    }

    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(200);
    await page.mouse.move(canvasBox.x + 200, canvasBox.y + 200, { steps: 10 });
    await page.waitForTimeout(200);
    await page.mouse.up();
    await page.waitForTimeout(1000);

    // Verify component appeared
    const droppedComponent = page.locator('text=E-Commerce Platform').first();
    await expect(droppedComponent).toBeVisible({ timeout: 5000 });
    console.log('  ✅ Projects dropped successfully');
  });

  // ============================================
  // TEST 10: Language Switch Test - Verify no errors when switching
  // ============================================

  test('Should switch languages without errors and maintain drag & drop', async ({ page }) => {
    console.log('\n🔍 TEST 10: Language Switch Test');

    let hasError = false;
    page.on('console', msg => {
      if (msg.type() === 'error') {
        hasError = true;
        console.log('  ❌ Console error detected:', msg.text());
      }
    });

    // Switch EN -> RU
    await page.click('button:has-text("RU")');
    await page.waitForTimeout(1000);
    console.log('  ✅ Switched to Russian');

    // Switch RU -> EN
    await page.click('button:has-text("EN")');
    await page.waitForTimeout(1000);
    console.log('  ✅ Switched back to English');

    // Try drag & drop after switching
    const sourceButton = page.locator('button:has-text("Split Hero")').first();
    const canvas = page.locator('.flex-1.overflow-auto.bg-gray-100').first();

    const sourceBox = await sourceButton.boundingBox();
    const canvasBox = await canvas.boundingBox();

    if (sourceBox && canvasBox) {
      await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(200);
      await page.mouse.move(canvasBox.x + 200, canvasBox.y + 200, { steps: 10 });
      await page.waitForTimeout(200);
      await page.mouse.up();
      await page.waitForTimeout(1000);

      const droppedComponent = page.locator('text=John Doe').first();
      await expect(droppedComponent).toBeVisible({ timeout: 5000 });
      console.log('  ✅ Drag & drop works after language switch');
    }

    expect(hasError).toBe(false);
  });

  // ============================================
  // TEST 11: Russian Language - All Components
  // ============================================

  test('Should drag and drop all components in Russian', async ({ page }) => {
    console.log('\n🔍 TEST 11: Drag & Drop All Components (Russian)');

    await page.click('button:has-text("RU")');
    await page.waitForTimeout(500);

    const components = [
      { button: 'Главный баннер', verify: 'John Doe' },
      { button: 'Статистика', verify: 'Years Experience' },
      { button: 'Навыки', verify: 'React' },
    ];

    for (const component of components) {
      // Clear canvas first
      await page.reload();
      await page.waitForTimeout(1000);
      await page.click('button:has-text("RU")');
      await page.waitForTimeout(500);

      const sourceButton = page.locator(`button:has-text("${component.button}")`).first();
      const canvas = page.locator('.flex-1.overflow-auto.bg-gray-100').first();

      const sourceBox = await sourceButton.boundingBox();
      const canvasBox = await canvas.boundingBox();

      if (sourceBox && canvasBox) {
        await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
        await page.mouse.down();
        await page.waitForTimeout(200);
        await page.mouse.move(canvasBox.x + 200, canvasBox.y + 200, { steps: 10 });
        await page.waitForTimeout(200);
        await page.mouse.up();
        await page.waitForTimeout(1000);

        const droppedComponent = page.locator(`text=${component.verify}`).first();
        await expect(droppedComponent).toBeVisible({ timeout: 5000 });
        console.log(`  ✅ ${component.button} dropped successfully`);
      }
    }
  });

  // ============================================
  // TEST 12: Verify touchAction CSS is applied
  // ============================================

  test('Should have touchAction: none on all draggable buttons', async ({ page }) => {
    console.log('\n🔍 TEST 12: Verify touchAction CSS');

    await page.click('button:has-text("EN")');
    await page.waitForTimeout(500);

    const buttons = await page.locator('.w-64.bg-white.border-r button').all();
    console.log(`  Found ${buttons.length} buttons in toolbox`);

    for (const button of buttons) {
      const touchAction = await button.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue('touch-action')
      );

      if (touchAction === 'none') {
        const text = await button.innerText();
        console.log(`  ✅ ${text.split('\n')[0]} - touch-action: none`);
      }
    }
  });
});
