import { chromium } from 'playwright';

async function debugMinimalist() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 346, height: 878 },
  });

  await page.goto('http://localhost:3500/templates/minimalist', {
    waitUntil: 'networkidle',
  });

  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({ path: 'debug-minimalist.png', fullPage: false });

  // Check for errors
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Get page HTML
  const html = await page.content();
  const hasHamburger = html.includes('Toggle menu');
  const hasNav = html.includes('About');

  console.log('Has "Toggle menu":', hasHamburger);
  console.log('Has "About":', hasNav);
  console.log('Errors:', errors.length);

  // Count buttons
  const buttonCount = await page.locator('button').count();
  console.log('Total buttons on page:', buttonCount);

  if (buttonCount > 0) {
    console.log('\nFirst 5 buttons:');
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = page.locator('button').nth(i);
      const isVisible = await button.isVisible();
      const text = await button.textContent();
      const aria = await button.getAttribute('aria-label');
      console.log(`  ${i}: visible=${isVisible}, text="${text?.slice(0, 30)}", aria="${aria}"`);
    }
  }

  await browser.close();
}

debugMinimalist().catch(console.error);
