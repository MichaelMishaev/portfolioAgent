import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';

const templates = [
  // Portfolio Templates (Classic)
  'minimalist',
  'dark-mode',
  'grid-masonry',
  'bold-typography',
  'fullscreen-immersive',
  'split-screen',
  'illustration-focus',
  'single-page',
  'text-heavy',
  'card-modular',
  'kinetic-typography',

  // Portfolio Templates (Trending 2025)
  'bento-grid',
  'neo-brutalist',
  'organic-liquid',
  'y2k-retro',
  'collage-maximalist',
  '3d-immersive',
  'data-dashboard',
  'ar-spatial',
  'voice-first',

  // Product Templates
  'product-saas',
  'product-course',
  'product-physical',
  'product-premium',
  'product-tech',
  'product-fashion',
  'product-luxury',

  // Service Templates
  'service-b2b',
  'service-community',
  'service-dfyou',
];

async function generatePreviews() {
  console.log('🚀 Starting preview generation for 30 templates...\n');

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: 2, // Retina display for high quality
  });

  const previewsDir = path.join(process.cwd(), 'public', 'previews');

  // Ensure previews directory exists
  await fs.mkdir(previewsDir, { recursive: true });

  let successCount = 0;
  let failCount = 0;

  for (const template of templates) {
    const page = await context.newPage();

    try {
      console.log(`📸 Capturing: ${template}...`);

      const url = `http://localhost:3500/templates/${template}`;

      // Navigate to the template
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for animations to settle
      await page.waitForTimeout(2000);

      // Scroll down a bit to capture more content
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(500);

      // Scroll back to top for the hero section
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const screenshotPath = path.join(previewsDir, `${template}.png`);

      // Take screenshot
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
  console.log(`✨ Preview generation complete!`);
  console.log(`   Success: ${successCount}/${templates.length}`);
  console.log(`   Failed: ${failCount}/${templates.length}`);
  console.log(`   Location: ${previewsDir}`);
  console.log('='.repeat(50) + '\n');
}

// Run the script
generatePreviews().catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});
