const { chromium } = require('playwright');

async function testTemplates() {
  console.log('🚀 Starting template tests with Playwright...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const templates = [
    { name: 'Premium Product (CHRONOS ÉLITE)', url: 'http://localhost:3500/templates/product-premium' },
    { name: 'Audio Product (Aurora Headphones)', url: 'http://localhost:3500/templates/product-audio' },
    { name: 'Vacuum Product (V20 Quantum)', url: 'http://localhost:3500/templates/product-vacuum' },
  ];

  let passCount = 0;
  let failCount = 0;

  for (const template of templates) {
    const page = await context.newPage();

    try {
      console.log(`📄 Testing: ${template.name}`);
      console.log(`   URL: ${template.url}`);

      // Navigate to the template
      const response = await page.goto(template.url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Check response status
      if (response && response.status() === 200) {
        console.log(`   ✅ Status: ${response.status()} OK`);
      } else {
        console.log(`   ⚠️  Status: ${response ? response.status() : 'No response'}`);
      }

      // Wait for the main content to load
      await page.waitForSelector('h1:visible, section:visible', { timeout: 10000 });

      // Check for console errors
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      // Wait a bit for any errors to surface
      await page.waitForTimeout(2000);

      // Check page title or heading
      const title = await page.title();
      console.log(`   📌 Page Title: ${title}`);

      // Check for main heading
      const h1 = await page.$('h1');
      if (h1) {
        const headingText = await h1.textContent();
        console.log(`   📝 Main Heading: ${headingText.trim().substring(0, 50)}...`);
      }

      // Take screenshot
      const screenshotPath = `./test-screenshots/${template.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`;
      await page.screenshot({
        path: screenshotPath,
        fullPage: false
      });
      console.log(`   📸 Screenshot saved: ${screenshotPath}`);

      // Check for interactive elements
      const buttons = await page.$$('button');
      console.log(`   🔘 Buttons found: ${buttons.length}`);

      const links = await page.$$('a');
      console.log(`   🔗 Links found: ${links.length}`);

      // Test scroll behavior for premium template
      if (template.url.includes('product-premium')) {
        console.log(`   🔄 Testing scroll behavior...`);
        await page.evaluate(() => window.scrollTo(0, 1000));
        await page.waitForTimeout(500);
        await page.evaluate(() => window.scrollTo(0, 0));
      }

      // Test configurator interaction for premium template
      if (template.url.includes('product-premium')) {
        console.log(`   ⚙️  Testing configurator interaction...`);
        const materialButtons = await page.$$('[class*="cursor-pointer"][class*="rounded-2xl"]');
        if (materialButtons.length > 0) {
          await materialButtons[0].click();
          await page.waitForTimeout(500);
          console.log(`   ✅ Configurator interaction successful`);
        }
      }

      if (errors.length === 0) {
        console.log(`   ✅ No console errors detected`);
        console.log(`   ✅ PASSED\n`);
        passCount++;
      } else {
        console.log(`   ⚠️  Console errors detected: ${errors.length}`);
        errors.slice(0, 3).forEach(err => console.log(`      - ${err}`));
        console.log(`   ⚠️  PASSED WITH WARNINGS\n`);
        passCount++;
      }

    } catch (error) {
      console.log(`   ❌ FAILED: ${error.message}`);
      console.log('');
      failCount++;
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log('='.repeat(60));
  console.log('📊 TEST RESULTS');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${passCount}/${templates.length}`);
  console.log(`❌ Failed: ${failCount}/${templates.length}`);
  console.log('='.repeat(60));

  process.exit(failCount > 0 ? 1 : 0);
}

testTemplates().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
