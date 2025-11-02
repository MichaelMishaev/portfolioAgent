import { chromium } from 'playwright';

async function inspectButtons() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 667 },
  });

  try {
    await page.goto('http://localhost:3500/templates/service-marketplace', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    await page.waitForTimeout(2000);

    // Find all buttons and check their text content
    const buttons = await page.locator('button').all();
    console.log(`\nFound ${buttons.length} buttons:\n`);

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const isVisible = await button.isVisible();

      console.log(`Button ${i + 1}:`);
      console.log(`  Text: "${text}"`);
      console.log(`  Aria-label: "${ariaLabel}"`);
      console.log(`  Visible: ${isVisible}`);
      console.log('');
    }

    // Take screenshot
    await page.screenshot({
      path: 'buttons-inspect.png',
      fullPage: false,
    });
    console.log('📸 Screenshot saved: buttons-inspect.png');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

inspectButtons().catch(console.error);
