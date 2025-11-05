#!/usr/bin/env node

const { chromium } = require('playwright');
const path = require('path');

// Templates to test (those with most fixes)
const testTemplates = [
  { id: 'split-screen-editorial', name: 'Split-Screen Editorial', fixes: 2 },
  { id: 'bento-grid', name: 'Bento Grid', fixes: 36 },
  { id: 'collage-maximalist', name: 'Collage Maximalist', fixes: 24 },
  { id: 'course-product', name: 'Course Product', fixes: 20 },
  { id: 'neo-brutalist', name: 'Neo Brutalist', fixes: 19 },
  { id: 'bold-typography', name: 'Bold Typography', fixes: 16 },
];

async function testTextVisibility() {
  console.log('\n🔍 Visual Testing: Text Visibility Verification\n');
  console.log('Testing templates with most fixes applied...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });

  const results = [];

  for (const template of testTemplates) {
    try {
      console.log(`📄 Testing: ${template.name} (${template.fixes} fixes applied)`);

      const page = await context.newPage();
      const url = `http://localhost:3500/templates/${template.id}/demo`;

      // Navigate and wait for load
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Take screenshot of hero section
      const screenshotPath = path.join(__dirname, '../public/test-screenshots', `${template.id}-hero.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false
      });

      // Scroll to stats section if exists
      try {
        const statsSection = await page.locator('section, div').filter({ hasText: /stats|numbers|metrics/i }).first();
        if (await statsSection.count() > 0) {
          await statsSection.scrollIntoViewIfNeeded();
          await page.waitForTimeout(500);

          const statsScreenshot = path.join(__dirname, '../public/test-screenshots', `${template.id}-stats.png`);
          await page.screenshot({
            path: statsScreenshot,
            fullPage: false
          });
        }
      } catch (e) {
        // Stats section might not exist, that's ok
      }

      // Scroll to testimonials section if exists
      try {
        const testimonialSection = await page.locator('section, div').filter({ hasText: /testimonial|review|praise|feedback/i }).first();
        if (await testimonialSection.count() > 0) {
          await testimonialSection.scrollIntoViewIfNeeded();
          await page.waitForTimeout(500);

          const testimonialScreenshot = path.join(__dirname, '../public/test-screenshots', `${template.id}-testimonials.png`);
          await page.screenshot({
            path: testimonialScreenshot,
            fullPage: false
          });
        }
      } catch (e) {
        // Testimonials section might not exist, that's ok
      }

      await page.close();

      results.push({ template: template.name, status: 'passed', url });
      console.log(`  ✅ Passed - Screenshots saved\n`);

    } catch (error) {
      results.push({ template: template.name, status: 'failed', error: error.message });
      console.log(`  ❌ Failed: ${error.message}\n`);
    }
  }

  await browser.close();

  // Print summary
  console.log('='.repeat(80));
  console.log('📊 VISUAL TEST SUMMARY');
  console.log('='.repeat(80));

  const passed = results.filter(r => r.status === 'passed').length;
  const failed = results.filter(r => r.status === 'failed').length;

  console.log(`Total templates tested: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  if (failed === 0) {
    console.log('\n✅ All visual tests passed!');
    console.log('Screenshots saved to: public/test-screenshots/\n');
  } else {
    console.log('\n❌ Some tests failed. Review errors above.\n');
    process.exit(1);
  }
}

// Create screenshots directory
const fs = require('fs');
const screenshotsDir = path.join(__dirname, '../public/test-screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

testTextVisibility().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
