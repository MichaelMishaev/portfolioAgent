import { chromium } from '@playwright/test';
import path from 'path';

async function generatePreviews() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2, // High DPI for better quality
  });

  const page = await context.newPage();

  // Generate Minimalist preview
  console.log('Generating minimalist preview...');
  await page.goto(`file://${path.resolve('./preview-minimal.html')}`);
  await page.waitForTimeout(500); // Wait for rendering
  await page.screenshot({
    path: './public/previews/blog-archetypes-minimal.png',
    type: 'png',
  });
  console.log('✓ Minimalist preview saved');

  // Generate Editorial preview
  console.log('Generating editorial preview...');
  await page.goto(`file://${path.resolve('./preview-editorial.html')}`);
  await page.waitForTimeout(500); // Wait for rendering
  await page.screenshot({
    path: './public/previews/blog-archetypes-editorial.png',
    type: 'png',
  });
  console.log('✓ Editorial preview saved');

  await browser.close();
  console.log('\n✓ All preview images generated successfully!');
}

generatePreviews().catch(console.error);
