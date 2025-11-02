import { chromium } from 'playwright';

async function testMinimalistRussian() {
  const browser = await chromium.launch({ headless: false }); // headless false to see what happens
  const page = await browser.newPage({
    viewport: { width: 346, height: 878 },
  });

  await page.goto('http://localhost:3500/templates/minimalist', {
    waitUntil: 'networkidle',
  });

  console.log('Page loaded');
  await page.waitForTimeout(2000);

  // Click hamburger menu - try multiple selectors
  let hamburgerClicked = false;

  // Try aria-label
  let hamburger = page.locator('button[aria-label="Toggle menu"]');
  if (await hamburger.count() > 0 && await hamburger.first().isVisible()) {
    console.log('✓ Hamburger found by aria-label, clicking...');
    await hamburger.first().click();
    hamburgerClicked = true;
  } else {
    // Try finding md:hidden button
    hamburger = page.locator('button.md\\:hidden');
    if (await hamburger.count() > 0) {
      console.log('✓ Hamburger found by class, clicking...');
      await hamburger.first().click();
      hamburgerClicked = true;
    }
  }

  if (hamburgerClicked) {
    await page.waitForTimeout(1000);

    // Find language toggle in mobile menu
    const allButtons = await page.locator('button').all();
    for (const button of allButtons) {
      const srText = await button.locator('.sr-only').textContent().catch(() => '');
      if (srText.includes('language')) {
        console.log('✓ Language toggle found in mobile menu, clicking...');
        await button.click();
        await page.waitForTimeout(500);

        // Click Russian
        const russian = page.locator('text="Русский"').first();
        if (await russian.isVisible()) {
          console.log('✓ Russian option visible, clicking...');
          await russian.click();
          await page.waitForTimeout(2000);

          // Check if Russian text appears
          const bodyText = await page.textContent('body');
          const hasCyrillic = /[а-яА-ЯЁё]/.test(bodyText || '');

          console.log(`\nRussian translation check: ${hasCyrillic ? '✅ SUCCESS' : '❌ FAILED'}`);

          const h1 = await page.textContent('h1');
          console.log(`H1 text: "${h1}"`);

          const navLink = await page.locator('a[href="/"]').first().textContent();
          console.log(`Back link: "${navLink}"`);

          break;
        } else {
          console.log('❌ Russian option not found');
        }
      }
    }
  } else {
    console.log('❌ Hamburger not found - dumping all buttons');
    const allButtonsDebug = await page.locator('button').all();
    for (let i = 0; i < Math.min(allButtonsDebug.length, 5); i++) {
      const text = await allButtonsDebug[i].textContent();
      const aria = await allButtonsDebug[i].getAttribute('aria-label');
      console.log(`  Button ${i}: text="${text?.trim()}", aria-label="${aria}"`);
    }
  }

  await page.waitForTimeout(3000);
  await browser.close();
}

testMinimalistRussian().catch(console.error);
