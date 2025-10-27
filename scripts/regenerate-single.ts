import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';

// Get template name from command line argument
const templateName = process.argv[2];

if (!templateName) {
  console.error('❌ Error: Please provide a template name');
  console.error('Usage: npm run regenerate-single <template-name>');
  console.error('Example: npm run regenerate-single product-premium');
  process.exit(1);
}

async function regenerateSinglePreview() {
  console.log(`🔧 Regenerating screenshot for: ${templateName}\n`);

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: 2,
  });

  const previewsDir = path.join(process.cwd(), 'public', 'previews');
  const page = await context.newPage();

  try {
    console.log(`📸 Capturing: ${templateName}...`);

    const url = `http://localhost:3500/templates/${templateName}`;

    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    const screenshotPath = path.join(previewsDir, `${templateName}.png`);

    await page.screenshot({
      path: screenshotPath,
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 800,
      },
    });

    console.log(`✅ Saved: ${templateName}.png`);
    console.log(`\n✨ Screenshot regenerated successfully!`);

  } catch (error) {
    console.error(`❌ Failed: ${templateName}`);
    console.error(`   Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  } finally {
    await page.close();
    await browser.close();
  }
}

regenerateSinglePreview();
