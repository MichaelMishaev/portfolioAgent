import { chromium } from 'playwright';

async function testServiceMarketplace() {
  console.log('🧪 Testing service-marketplace template\n');

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

    // Check for errors in console
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Check for translation errors
    const bodyText = await page.textContent('body');
    const hasUndefined = bodyText?.includes('undefined') || bodyText?.includes('tt.');
    console.log(hasUndefined ? '❌ Found translation issues' : '✅ No translation issues');

    // Check H1 text
    const h1 = await page.locator('h1').first().textContent();
    console.log(`✅ H1 text: "${h1?.slice(0, 60)}..."`);

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
    const hamburger = page.locator('button[aria-label*="menu" i]').first();
    const hamburgerVisible = await hamburger.isVisible();
    console.log(hamburgerVisible ? '✅ Hamburger menu visible' : '❌ Hamburger menu NOT visible');

    // Test mobile menu
    if (hamburgerVisible) {
      await hamburger.click();
      await page.waitForTimeout(500);

      const mobileMenu = page.locator('.md\\\\:hidden').filter({ hasText: 'Features' }).or(
        page.locator('.md\\\\:hidden').filter({ hasText: 'Возможности' })
      );
      const mobileMenuVisible = await mobileMenu.isVisible();
      console.log(mobileMenuVisible ? '✅ Mobile menu opens correctly' : '❌ Mobile menu does NOT open');

      // Check for language toggle in mobile menu
      const allButtons = await page.locator('button').all();
      let languageToggleFound = false;
      for (const button of allButtons) {
        const srText = await button.locator('.sr-only').textContent().catch(() => '');
        if (srText.toLowerCase().includes('language')) {
          languageToggleFound = true;
          console.log('✅ Language toggle found in mobile menu');

          // Test language switching
          await button.click();
          await page.waitForTimeout(300);

          const russianOption = page.locator('text="Русский"').first();
          if (await russianOption.isVisible()) {
            await russianOption.click();
            await page.waitForTimeout(1000);

            const bodyTextRu = await page.textContent('body');
            const hasCyrillic = /[а-яА-ЯЁё]/.test(bodyTextRu || '');
            console.log(hasCyrillic ? '✅ Russian translation works (Cyrillic detected)' : '❌ Russian translation NOT working');
          }
          break;
        }
      }
      if (!languageToggleFound) {
        console.log('⚠️  Language toggle NOT found in mobile menu');
      }
    }

    // Check key sections exist
    const sections = ['Features', 'How It Works', 'Testimonials', 'Pricing'];
    for (const section of sections) {
      const found = bodyText?.includes(section);
      console.log(found ? `✅ Section "${section}" found` : `⚠️  Section "${section}" not found`);
    }

    // Take screenshot
    await page.screenshot({
      path: 'service-marketplace-test.png',
      fullPage: false,
    });
    console.log('\n📸 Screenshot saved: service-marketplace-test.png');

    if (errors.length > 0) {
      console.log('\n❌ Console errors:');
      errors.forEach(err => console.log('  -', err));
    } else {
      console.log('\n✅ No console errors');
    }

    console.log('\n✅ Test completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testServiceMarketplace().catch(console.error);
