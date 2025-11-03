import { test } from '@playwright/test';

test('Screenshot builder with empty canvas', async ({ page }) => {
  await page.goto('http://localhost:3500/templates/split-screen/builder');
  await page.waitForTimeout(2000);

  // Take full page screenshot - English
  await page.screenshot({
    path: 'builder-empty-canvas-en.png',
    fullPage: true
  });

  // Click Russian button
  await page.click('button:has-text("RU")');
  await page.waitForTimeout(500);

  // Take Russian version screenshot
  await page.screenshot({
    path: 'builder-empty-canvas-ru.png',
    fullPage: true
  });

  console.log('✅ Screenshots saved!');
});
