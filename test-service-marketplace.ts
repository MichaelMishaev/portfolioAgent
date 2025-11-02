import { chromium } from 'playwright';

async function testServiceMarketplace() {
  console.log('🧪 Testing service-marketplace template at 346px viewport\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 346, height: 878 },
  });

  try {
    await page.goto('http://localhost:3500/templates/service-marketplace', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    console.log('✅ Page loaded successfully');
    await page.waitForTimeout(2000);

    // Check for horizontal scroll
    const scrollMetrics = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    if (scrollMetrics.hasHorizontalScroll) {
      console.log(`❌ HORIZONTAL SCROLL: ${scrollMetrics.scrollWidth}px > ${scrollMetrics.clientWidth}px`);
    } else {
      console.log(`✅ No horizontal scroll: ${scrollMetrics.scrollWidth}px <= ${scrollMetrics.clientWidth}px`);
    }

    // Check hamburger menu
    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    const hamburgerVisible = await hamburger.isVisible();
    console.log(hamburgerVisible ? '✅ Hamburger menu visible' : '❌ Hamburger menu NOT visible');

    // Check if mobile menu opens
    if (hamburgerVisible) {
      await hamburger.click();
      await page.waitForTimeout(500);

      const mobileMenu = page.locator('.md\\:hidden').filter({ hasText: 'Features' });
      const mobileMenuVisible = await mobileMenu.isVisible();
      console.log(mobileMenuVisible ? '✅ Mobile menu opens correctly' : '❌ Mobile menu does NOT open');

      // Check for language toggle in mobile menu
      const buttons = await page.locator('button').all();
      let languageToggleFound = false;
      for (const button of buttons) {
        const srText = await button.locator('.sr-only').textContent().catch(() => '');
        if (srText.includes('language')) {
          languageToggleFound = true;
          break;
        }
      }
      console.log(languageToggleFound ? '✅ Language toggle in mobile menu' : '⚠️  Language toggle NOT in mobile menu');
    }

    // Check content rendering
    const h1 = await page.locator('h1').first().textContent();
    console.log(`✅ H1 text: "${h1?.slice(0, 50)}..."`);

    // Check for undefined/broken translations
    const bodyText = await page.textContent('body');
    const hasUndefined = bodyText?.includes('undefined') || bodyText?.includes('tt.');
    console.log(hasUndefined ? '❌ Found "undefined" or translation keys' : '✅ No translation issues');

    // Take screenshot
    await page.screenshot({
      path: 'service-marketplace-mobile.png',
      fullPage: false,
    });
    console.log('📸 Screenshot saved: service-marketplace-mobile.png');

    console.log('\n✅ Test completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testServiceMarketplace().catch(console.error);
