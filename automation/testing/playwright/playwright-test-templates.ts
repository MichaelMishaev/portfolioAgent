import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';

const BASE_URL = 'http://localhost:3500';
const TIMEOUT = 15000; // 15 seconds per template

interface TestResult {
  templateId: string;
  status: 'PASS' | 'FAIL' | 'STUCK';
  loadTime: number;
  error?: string;
  screenshot?: string;
}

const TEMPLATES = [
  '3d-immersive',
  'ar-spatial',
  'bento-grid',
  'bold-typography',
  'card-modular',
  'collage-maximalist',
  'creative-agency-bold',
  'dark-mode',
  'data-dashboard',
  'experimental-3d',
  'fullscreen-immersive',
  'glassmorphism-modern',
  'grid-masonry',
  'illustration-focus',
  'interactive-agency',
  'kinetic-typography',
  'luxury-minimal',
  'minimal-portfolio-clean',
  'minimalist',
  'motion-designer',
  'neo-brutalist',
  'online-business-saas',
  'organic-liquid',
  'personal-brand',
  'photography-immersive',
  'professional-b2b',
  'saas-feature-rich',
  'service-marketplace',
  'single-page',
  'split-screen',
  'split-screen-editorial',
  'startup-pitch',
  'text-heavy',
  'voice-first',
  'y2k-retro',
];

async function testTemplate(page: Page, templateId: string): Promise<TestResult> {
  const url = `${BASE_URL}/templates/${templateId}`;
  const startTime = Date.now();

  console.log(`\n[${TEMPLATES.indexOf(templateId) + 1}/${TEMPLATES.length}] Testing: ${templateId}`);
  console.log(`  URL: ${url}`);

  try {
    // Navigate to template
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUT
    });

    // Wait a bit for initial render
    await page.waitForTimeout(1000);

    // Check for "Loading..." text (indicates stuck state)
    const loadingText = await page.textContent('body');
    if (loadingText?.includes('Loading...')) {
      console.log('  ❌ STUCK: Page shows "Loading..."');

      // Take screenshot
      const screenshotPath = `screenshots/${templateId}-stuck.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });

      return {
        templateId,
        status: 'STUCK',
        loadTime: Date.now() - startTime,
        error: 'Template stuck on "Loading..." message',
        screenshot: screenshotPath,
      };
    }

    // Wait for main content to load
    await page.waitForSelector('nav, header, main, section', { timeout: 5000 });

    // Check if page has meaningful content
    const hasContent = await page.evaluate(() => {
      const sections = document.querySelectorAll('section, main, article');
      return sections.length > 0;
    });

    if (!hasContent) {
      console.log('  ⚠️  WARNING: No main content found');
    }

    // Check for error messages
    const hasError = await page.evaluate(() => {
      return document.body.textContent?.toLowerCase().includes('error') || false;
    });

    if (hasError) {
      console.log('  ⚠️  WARNING: Page contains "error" text');
    }

    const loadTime = Date.now() - startTime;
    console.log(`  ✅ PASS (${loadTime}ms)`);

    // Take screenshot for documentation
    const screenshotPath = `screenshots/${templateId}-success.png`;
    await page.screenshot({ path: screenshotPath, fullPage: false });

    return {
      templateId,
      status: 'PASS',
      loadTime,
      screenshot: screenshotPath,
    };

  } catch (error: any) {
    const loadTime = Date.now() - startTime;
    console.log(`  ❌ FAIL: ${error.message}`);

    // Take screenshot
    const screenshotPath = `screenshots/${templateId}-error.png`;
    try {
      await page.screenshot({ path: screenshotPath, fullPage: true });
    } catch (e) {
      console.log('  Could not capture screenshot');
    }

    return {
      templateId,
      status: 'FAIL',
      loadTime,
      error: error.message,
      screenshot: screenshotPath,
    };
  }
}

async function runTests() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  PLAYWRIGHT TEMPLATE TESTING');
  console.log('  Testing all templates for loading issues');
  console.log('═══════════════════════════════════════════════════════\n');

  // Create screenshots directory
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const page = await context.newPage();

  const results: TestResult[] = [];

  // Test each template
  for (const templateId of TEMPLATES) {
    const result = await testTemplate(page, templateId);
    results.push(result);

    // Small delay between tests
    await page.waitForTimeout(500);
  }

  await browser.close();

  // Generate report
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  TEST RESULTS SUMMARY');
  console.log('═══════════════════════════════════════════════════════\n');

  const passed = results.filter(r => r.status === 'PASS');
  const failed = results.filter(r => r.status === 'FAIL');
  const stuck = results.filter(r => r.status === 'STUCK');

  console.log(`📊 Total Templates: ${results.length}`);
  console.log(`✅ Passed: ${passed.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`⏸️  Stuck (Loading): ${stuck.length}\n`);

  if (stuck.length > 0) {
    console.log('🔴 TEMPLATES STUCK ON LOADING:');
    stuck.forEach(r => {
      console.log(`  - ${r.templateId}`);
      console.log(`    Error: ${r.error}`);
      console.log(`    Screenshot: ${r.screenshot}\n`);
    });
  }

  if (failed.length > 0) {
    console.log('❌ TEMPLATES WITH ERRORS:');
    failed.forEach(r => {
      console.log(`  - ${r.templateId}`);
      console.log(`    Error: ${r.error}`);
      console.log(`    Screenshot: ${r.screenshot}\n`);
    });
  }

  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalTests: results.length,
    passed: passed.length,
    failed: failed.length,
    stuck: stuck.length,
    results: results,
  };

  fs.writeFileSync('playwright-test-results.json', JSON.stringify(report, null, 2));
  console.log('📄 Detailed report saved: playwright-test-results.json');
  console.log('📸 Screenshots saved in: screenshots/\n');

  // Exit with error if any tests failed
  if (failed.length > 0 || stuck.length > 0) {
    process.exit(1);
  }
}

runTests().catch(console.error);
