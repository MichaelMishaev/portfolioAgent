import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';

const BASE_URL = 'http://localhost:3500';
const TIMEOUT = 15000; // 15 seconds per template

interface TranslationTestResult {
  templateId: string;
  status: 'PASS' | 'FAIL';
  hasRussianContent: boolean;
  error?: string;
  screenshot?: string;
  sampleText?: string;
}

// All templates from the registry
const TEMPLATES = [
  'minimalist',
  'service-marketplace',
  'dark-mode',
  'bold-typography',
  'grid-masonry',
  'fullscreen-immersive',
  'split-screen',
  'illustration-focus',
  'single-page',
  'text-heavy',
  'card-modular',
  'kinetic-typography',
  'bento-grid',
  '3d-immersive',
  'neo-brutalist',
  'organic-liquid',
  'data-dashboard',
  'y2k-retro',
  'ar-spatial',
  'collage-maximalist',
  'voice-first',
  'professional-b2b',
  'creative-agency-bold',
  'minimal-portfolio-clean',
  'glassmorphism-modern',
  'split-screen-editorial',
  'saas-feature-rich',
  'personal-brand',
  'experimental-3d',
  'interactive-agency',
  'luxury-minimal',
  'startup-pitch',
  'photography-immersive',
  'motion-designer',
];

async function testTemplateRussian(page: Page, templateId: string): Promise<TranslationTestResult> {
  const url = `${BASE_URL}/templates/${templateId}`;
  const startTime = Date.now();

  console.log(`\n[${TEMPLATES.indexOf(templateId) + 1}/${TEMPLATES.length}] Testing: ${templateId}`);
  console.log(`  URL: ${url}`);

  try {
    // Set localStorage to Russian before navigating
    await page.goto(BASE_URL);
    await page.evaluate(() => {
      localStorage.setItem('language', 'ru');
    });

    // Navigate to template
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUT
    });

    // Wait for content to load
    await page.waitForTimeout(2000);

    // Wait for main content
    await page.waitForSelector('nav, header, main, section', { timeout: 5000 });

    // Check if page contains Cyrillic characters (Russian)
    const pageText = await page.evaluate(() => document.body.textContent || '');
    const hasCyrillic = /[\u0400-\u04FF]/.test(pageText);

    // Get a sample of text for logging
    const sampleText = pageText.substring(0, 200).trim();

    // Check for specific Russian words that should appear
    const hasRussianWords = /проект|контакт|навыки|услуги|портфолио|опыт|клиент|функции|цены|награды|о нас|работы|связаться/i.test(pageText);

    const hasRussianContent = hasCyrillic || hasRussianWords;

    if (!hasRussianContent) {
      console.log(`  ❌ FAIL: No Russian content detected`);
      console.log(`  Sample text: ${sampleText.substring(0, 100)}...`);

      // Take screenshot
      const screenshotPath = `screenshots/ru-${templateId}-no-russian.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });

      return {
        templateId,
        status: 'FAIL',
        hasRussianContent: false,
        error: 'No Russian content detected',
        screenshot: screenshotPath,
        sampleText: sampleText.substring(0, 100),
      };
    }

    console.log(`  ✅ PASS - Russian content detected`);
    console.log(`  Sample: ${sampleText.substring(0, 100)}...`);

    // Take screenshot for documentation
    const screenshotPath = `screenshots/ru-${templateId}-success.png`;
    await page.screenshot({ path: screenshotPath, fullPage: false });

    return {
      templateId,
      status: 'PASS',
      hasRussianContent: true,
      screenshot: screenshotPath,
      sampleText: sampleText.substring(0, 100),
    };

  } catch (error: any) {
    console.log(`  ❌ FAIL: ${error.message}`);

    // Take screenshot
    const screenshotPath = `screenshots/ru-${templateId}-error.png`;
    try {
      await page.screenshot({ path: screenshotPath, fullPage: true });
    } catch (e) {
      console.log('  Could not capture screenshot');
    }

    return {
      templateId,
      status: 'FAIL',
      hasRussianContent: false,
      error: error.message,
      screenshot: screenshotPath,
    };
  }
}

async function runTests() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  RUSSIAN TRANSLATION TEST');
  console.log('  Testing all templates for Russian translations');
  console.log('═══════════════════════════════════════════════════════\n');

  // Create screenshots directory
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  const browser = await chromium.launch({
    headless: false, // Set to false so you can see the browser
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const page = await context.newPage();

  const results: TranslationTestResult[] = [];

  // Test each template
  for (const templateId of TEMPLATES) {
    const result = await testTemplateRussian(page, templateId);
    results.push(result);

    // Small delay between tests
    await page.waitForTimeout(1000);
  }

  await browser.close();

  // Generate report
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  TEST RESULTS SUMMARY');
  console.log('═══════════════════════════════════════════════════════\n');

  const passed = results.filter(r => r.status === 'PASS');
  const failed = results.filter(r => r.status === 'FAIL');

  console.log(`📊 Total Templates: ${results.length}`);
  console.log(`✅ Passed (has Russian): ${passed.length}`);
  console.log(`❌ Failed (no Russian): ${failed.length}\n`);

  if (failed.length > 0) {
    console.log('❌ TEMPLATES WITHOUT RUSSIAN TRANSLATIONS:');
    failed.forEach(r => {
      console.log(`  - ${r.templateId}`);
      console.log(`    Error: ${r.error}`);
      if (r.sampleText) {
        console.log(`    Sample: ${r.sampleText}...`);
      }
      console.log(`    Screenshot: ${r.screenshot}\n`);
    });
  } else {
    console.log('🎉 All templates have Russian translations!\n');
  }

  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalTests: results.length,
    passed: passed.length,
    failed: failed.length,
    results: results,
  };

  fs.writeFileSync('russian-translation-test-results.json', JSON.stringify(report, null, 2));
  console.log('📄 Detailed report saved: russian-translation-test-results.json');
  console.log('📸 Screenshots saved in: screenshots/\n');

  // Exit with error if any tests failed
  if (failed.length > 0) {
    process.exit(1);
  }
}

runTests().catch(console.error);
