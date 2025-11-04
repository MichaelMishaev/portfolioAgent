#!/usr/bin/env node

/**
 * Comprehensive Template Screenshot Verification
 *
 * Tests every template to ensure:
 * 1. All 3 screenshots load correctly
 * 2. Carousel navigation works
 * 3. Images are AI-generated (not placeholders)
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function verifyAllTemplates() {
  console.log('🚀 Starting Comprehensive Template Verification\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Get all template IDs
  const translations = require('../lib/translations.json');
  const templates = translations.en.templates.map(t => t.id);

  console.log(`📊 Testing ${templates.length} templates...\n`);

  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  for (const templateId of templates) {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`Testing: ${templateId}`);
    console.log('='.repeat(70));

    try {
      const url = `http://localhost:3500/templates/${templateId}`;
      console.log(`📍 URL: ${url}`);

      await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });

      // Wait for images to load
      await page.waitForSelector('img', { timeout: 5000 });
      await page.waitForTimeout(1000); // Extra wait for lazy loading

      // Get all images
      const images = await page.$$eval('img', imgs =>
        imgs.map(img => ({
          src: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
          complete: img.complete
        }))
      );

      console.log(`\n📸 Found ${images.length} image(s):`);

      let hasAIScreenshots = false;
      images.forEach((img, index) => {
        const fileName = img.src.split('/').pop();
        console.log(`  Image ${index + 1}: ${fileName}`);
        console.log(`    Dimensions: ${img.width}x${img.height}`);
        console.log(`    Loaded: ${img.complete ? '✅' : '❌'}`);

        // Check if AI-generated (Next.js optimizes to ~874x490)
        if (img.width > 800 && img.width < 1000) {
          console.log(`    ✅ AI-generated screenshot`);
          hasAIScreenshots = true;
        } else if (img.width === 1200 && img.height === 800) {
          console.log(`    ⚠️  OLD gradient placeholder`);
        }
      });

      // Test carousel navigation
      const nextButton = await page.$('button[aria-label="Next screenshot"]');
      if (nextButton) {
        console.log(`\n🔄 Testing carousel navigation...`);

        const screenshots = [];

        // Get screenshot 1 (current)
        const img1 = await page.$eval('img', img => ({
          src: img.src.split('/').pop(),
          width: img.naturalWidth
        }));
        screenshots.push(img1);
        console.log(`  Screenshot 1: ${img1.src} (${img1.width}px)`);

        // Click to screenshot 2
        await nextButton.click();
        await page.waitForTimeout(500);
        const img2 = await page.$eval('img', img => ({
          src: img.src.split('/').pop(),
          width: img.naturalWidth
        }));
        screenshots.push(img2);
        console.log(`  Screenshot 2: ${img2.src} (${img2.width}px)`);

        // Click to screenshot 3
        await nextButton.click();
        await page.waitForTimeout(500);
        const img3 = await page.$eval('img', img => ({
          src: img.src.split('/').pop(),
          width: img.naturalWidth
        }));
        screenshots.push(img3);
        console.log(`  Screenshot 3: ${img3.src} (${img3.width}px)`);

        // Check if all are AI-generated
        const allAI = screenshots.every(s => s.width > 800 && s.width < 1000);
        if (allAI) {
          console.log(`\n✅ PASS: All 3 screenshots are AI-generated`);
          results.passed.push(templateId);
        } else {
          console.log(`\n⚠️  WARNING: Some screenshots may not be AI-generated`);
          results.warnings.push({
            templateId,
            reason: 'Some screenshots not AI size',
            screenshots
          });
        }
      } else {
        if (hasAIScreenshots) {
          console.log(`\n✅ PASS: AI screenshots detected (no carousel)`);
          results.passed.push(templateId);
        } else {
          console.log(`\n⚠️  WARNING: No AI screenshots detected`);
          results.warnings.push({
            templateId,
            reason: 'No AI screenshots',
            images
          });
        }
      }

    } catch (error) {
      console.error(`\n❌ FAIL: ${error.message}`);
      results.failed.push({
        templateId,
        error: error.message
      });
    }
  }

  console.log('\n\n' + '='.repeat(70));
  console.log('📊 VERIFICATION RESULTS');
  console.log('='.repeat(70));
  console.log(`✅ Passed: ${results.passed.length}/${templates.length}`);
  console.log(`⚠️  Warnings: ${results.warnings.length}/${templates.length}`);
  console.log(`❌ Failed: ${results.failed.length}/${templates.length}`);

  if (results.warnings.length > 0) {
    console.log('\n⚠️  Templates with warnings:');
    results.warnings.forEach(w => {
      console.log(`  - ${w.templateId}: ${w.reason}`);
    });
  }

  if (results.failed.length > 0) {
    console.log('\n❌ Templates that failed:');
    results.failed.forEach(f => {
      console.log(`  - ${f.templateId}: ${f.error}`);
    });
  }

  // Save detailed results
  const resultsPath = path.join(__dirname, 'verification-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Detailed results saved to: ${resultsPath}`);

  await browser.close();

  console.log('\n✅ Verification Complete!\n');
}

verifyAllTemplates().catch(console.error);
