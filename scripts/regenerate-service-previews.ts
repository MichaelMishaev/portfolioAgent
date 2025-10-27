import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';

const serviceTemplates = [
  'service-b2b',
  'service-community',
  'service-dfyou',
];

async function regenerateServicePreviews() {
  console.log('🔧 Regenerating service template screenshots...\n');

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: 2,
  });

  const previewsDir = path.join(process.cwd(), 'public', 'previews');

  let successCount = 0;
  let failCount = 0;

  for (const template of serviceTemplates) {
    const page = await context.newPage();

    try {
      console.log(`📸 Capturing: ${template}...`);

      const url = `http://localhost:3500/templates/${template}`;

      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      await page.waitForTimeout(2000);
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(500);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const screenshotPath = path.join(previewsDir, `${template}.png`);

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

      console.log(`✅ Saved: ${template}.png`);
      successCount++;

    } catch (error) {
      console.error(`❌ Failed: ${template}`);
      console.error(`   Error: ${error.message}`);
      failCount++;
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log('\n' + '='.repeat(50));
  console.log(`✨ Service templates regenerated!`);
  console.log(`   Success: ${successCount}/${serviceTemplates.length}`);
  console.log(`   Failed: ${failCount}/${serviceTemplates.length}`);
  console.log('='.repeat(50) + '\n');
}

regenerateServicePreviews().catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});
