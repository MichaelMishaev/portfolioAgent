import { chromium } from 'playwright';

async function takeScreenshot() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 346, height: 878 },
  });

  try {
    await page.goto('http://localhost:3500/templates/service-marketplace', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    await page.waitForTimeout(2000);

    // Take mobile screenshot
    await page.screenshot({
      path: 'service-marketplace-mobile-final.png',
      fullPage: true,
    });
    console.log('📸 Mobile screenshot saved: service-marketplace-mobile-final.png');

    // Test hamburger menu
    const hamburger = page.locator('button').filter({ hasText: /menu/i }).first();
    if (await hamburger.isVisible()) {
      await hamburger.click();
      await page.waitForTimeout(500);

      await page.screenshot({
        path: 'service-marketplace-mobile-menu.png',
        fullPage: false,
      });
      console.log('📸 Mobile menu screenshot saved: service-marketplace-mobile-menu.png');
    }

    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3500/templates/service-marketplace', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'service-marketplace-desktop.png',
      fullPage: false,
    });
    console.log('📸 Desktop screenshot saved: service-marketplace-desktop.png');

    console.log('\n✅ All screenshots completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshot().catch(console.error);
