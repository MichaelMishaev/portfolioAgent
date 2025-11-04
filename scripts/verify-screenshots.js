#!/usr/bin/env node

/**
 * Verify Screenshot Images with Playwright
 *
 * Checks if the actual images being served match what we expect
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function verifyScreenshots() {
  console.log('🚀 Starting Screenshot Verification with Playwright\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Get all template IDs from translations
  const translations = require('../lib/translations.json');
  const templates = translations.en.templates.map(t => t.id);

  console.log('📊 Checking template detail pages...\n');

  for (const templateId of templates) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Checking: ${templateId}`);
    console.log('='.repeat(60));

    try {
      // Navigate to template detail page
      const url = `http://localhost:3500/templates/${templateId}`;
      console.log(`📍 URL: ${url}`);

      await page.goto(url, { waitUntil: 'networkidle' });

      // Wait for any image to load
      await page.waitForSelector('img', { timeout: 5000 });

      // Get all images (Next.js Image might transform the URLs)
      const screenshots = await page.$$eval('img', imgs =>
        imgs.map(img => ({
          src: img.src,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete
        }))
      );

      console.log(`\n📸 Found ${screenshots.length} screenshot image(s) initially:`);

      const isAIGenerated = screenshots.length > 0 && screenshots[0].naturalWidth > 800;

      screenshots.forEach((img, index) => {
        const fileName = img.src.split('/').pop();
        console.log(`\n  Image ${index + 1}:`);
        console.log(`    File: ${fileName}`);
        console.log(`    Dimensions: ${img.naturalWidth}x${img.naturalHeight}`);
        console.log(`    Loaded: ${img.complete ? '✅' : '❌'}`);

        // Check if it's the AI-generated image (should be ~800-900px wide after Next.js optimization)
        if (img.naturalWidth > 800 && img.naturalWidth < 1000) {
          console.log(`    🎨 AI-generated screenshot (optimized by Next.js)`);
        } else if (img.naturalWidth === 1200 && img.naturalHeight === 800) {
          console.log(`    ⚠️  OLD gradient placeholder (1200x800)`);
        } else if (img.naturalWidth < 200) {
          console.log(`    ⚠️  Suspiciously small - might be placeholder`);
        }
      });

      // Test carousel navigation
      const nextButton = await page.$('button[aria-label="Next screenshot"]');
      if (nextButton) {
        console.log(`\n🔄 Testing carousel navigation...`);

        // Click next button to go to screenshot 2
        await nextButton.click();
        await page.waitForTimeout(500); // Wait for transition

        const screenshot2 = await page.$eval('img', img => ({
          src: img.src,
          naturalWidth: img.naturalWidth
        }));
        console.log(`  Screenshot 2: ${screenshot2.src.split('/').pop()} (${screenshot2.naturalWidth}px)`);

        // Click next button again to go to screenshot 3
        await nextButton.click();
        await page.waitForTimeout(500);

        const screenshot3 = await page.$eval('img', img => ({
          src: img.src,
          naturalWidth: img.naturalWidth
        }));
        console.log(`  Screenshot 3: ${screenshot3.src.split('/').pop()} (${screenshot3.naturalWidth}px)`);
      }

      // Take a screenshot to verify what's actually displayed
      const screenshotPath = path.join(__dirname, `verify-${templateId}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`\n📷 Saved verification screenshot to: ${screenshotPath}`);

    } catch (error) {
      console.error(`❌ Error checking ${templateId}:`, error.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Verification Complete!');
  console.log('='.repeat(60));

  await browser.close();
}

verifyScreenshots().catch(console.error);
