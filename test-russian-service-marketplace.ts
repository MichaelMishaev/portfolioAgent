import { chromium } from 'playwright';

async function testRussian() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 346, height: 878 },
  });

  try {
    console.log('🧪 Testing Russian translation for service-marketplace\n');

    await page.goto('http://localhost:3500/templates/service-marketplace', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    await page.waitForTimeout(2000);

    // Get initial English text
    const navEN = await page.locator('nav').first().textContent();
    console.log('📝 Initial navigation (English):', navEN?.slice(0, 100));

    // Click hamburger menu
    const hamburger = page.locator('button').filter({ hasText: '' }).first();
    await hamburger.click();
    await page.waitForTimeout(500);

    console.log('✅ Hamburger menu opened');

    // Find and click language toggle
    const allButtons = await page.locator('button').all();
    let languageToggleClicked = false;

    for (const button of allButtons) {
      const ariaLabel = await button.getAttribute('aria-label').catch(() => '');
      if (ariaLabel?.toLowerCase().includes('language')) {
        console.log('✅ Found language toggle button');
        await button.click();
        await page.waitForTimeout(500);

        // Click Russian option
        const russianOption = page.locator('text="Русский"').first();
        if (await russianOption.isVisible()) {
          console.log('✅ Russian option visible');
          await russianOption.click();
          await page.waitForTimeout(1500);
          languageToggleClicked = true;

          // Check for Cyrillic text
          const bodyText = await page.textContent('body');
          const hasCyrillic = /[а-яА-ЯЁё]/.test(bodyText || '');
          console.log(hasCyrillic ? '✅ Cyrillic text detected!' : '❌ No Cyrillic text');

          // Get navigation text in Russian
          const navRU = await page.locator('nav').first().textContent();
          console.log('📝 Navigation (Russian):', navRU?.slice(0, 150));

          // Get hero text
          const h1 = await page.locator('h1').first().textContent();
          console.log('📝 H1 (Russian):', h1);

          // Take screenshot
          await page.screenshot({
            path: 'service-marketplace-russian.png',
            fullPage: true,
          });
          console.log('📸 Russian screenshot saved: service-marketplace-russian.png');
        }
        break;
      }
    }

    if (!languageToggleClicked) {
      console.log('❌ Could not find or click language toggle');
    }

    console.log('\n✅ Test completed!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

testRussian().catch(console.error);
