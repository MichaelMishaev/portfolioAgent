import { chromium } from 'playwright';

async function checkIcons() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 667 },
  });

  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console error: ${msg.text()}`);
    }
  });

  try {
    await page.goto('http://localhost:3500/templates/service-marketplace', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    await page.waitForTimeout(2000);

    // Find the hamburger button
    const hamburgerButton = page.locator('button[aria-label="Toggle menu"]');

    // Check if it has SVG child (icon)
    const hasSvg = await hamburgerButton.locator('svg').count();
    console.log(`Hamburger button has ${hasSvg} SVG icons`);

    // Check computed styles
    const buttonBox = await hamburgerButton.boundingBox();
    console.log('Button dimensions:', buttonBox);

    // Take screenshot of just the button area
    if (buttonBox) {
      await page.screenshot({
        path: 'hamburger-button-closeup.png',
        clip: {
          x: Math.max(0, buttonBox.x - 10),
          y: Math.max(0, buttonBox.y - 10),
          width: buttonBox.width + 20,
          height: buttonBox.height + 20,
        },
      });
      console.log('📸 Button closeup saved: hamburger-button-closeup.png');
    }

    // Check for any errors
    if (errors.length > 0) {
      console.log('\n❌ Console errors found:');
      errors.forEach(err => console.log('  ', err));
    } else {
      console.log('\n✅ No console errors');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

checkIcons().catch(console.error);
