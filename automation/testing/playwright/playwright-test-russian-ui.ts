import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';

const BASE_URL = 'http://localhost:3500';
const TIMEOUT = 20000; // 20 seconds per template

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

async function switchToRussian(page: Page): Promise<void> {
  try {
    // Look for the language toggle button (Globe icon)
    const languageButton = await page.waitForSelector('button:has(svg)', { timeout: 5000 });

    // Click to open language menu
    await languageButton.click();
    await page.waitForTimeout(500);

    // Look for "Русский" button and click it
    const russianButton = await page.waitForSelector('button:has-text("Русский")', { timeout: 2000 });
    await russianButton.click();
    await page.waitForTimeout(1000);

    console.log('  ✓ Switched to Russian language');
  } catch (error: any) {
    console.log(`  ⚠ Could not switch language via UI: ${error.message}`);
    console.log('  ℹ Falling back to localStorage method');

    // Fallback to localStorage
    await page.evaluate(() => {
      localStorage.setItem('language', 'ru');
    });
    await page.reload();
    await page.waitForTimeout(1000);
  }
}

async function testTemplateRussian(page: Page, templateId: string, index: number): Promise<TranslationTestResult> {
  const url = `${BASE_URL}/templates/${templateId}`;

  console.log(`\n[${index + 1}/${TEMPLATES.length}] Testing: ${templateId}`);
  console.log(`  URL: ${url}`);

  try {
    // Navigate to template
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: TIMEOUT
    });

    // Switch to Russian if not already
    await switchToRussian(page);

    // Wait for content to fully load
    await page.waitForTimeout(3000);

    // Try to find main content
    try {
      await page.waitForSelector('body', { timeout: 5000 });
    } catch (e) {
      console.log('  ⚠ Waiting for content...');
    }

    // Get all visible text from the page
    const pageText = await page.evaluate(() => {
      // Get text from body, excluding script tags
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            // Skip script, style, and other non-visible elements
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;

            const tagName = parent.tagName.toLowerCase();
            if (['script', 'style', 'noscript'].includes(tagName)) {
              return NodeFilter.FILTER_REJECT;
            }

            // Skip empty text
            if (!node.textContent || node.textContent.trim().length === 0) {
              return NodeFilter.FILTER_REJECT;
            }

            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      let text = '';
      let node;
      while (node = walker.nextNode()) {
        text += node.textContent + ' ';
      }
      return text.trim();
    });

    // Check if page contains Cyrillic characters (Russian)
    const hasCyrillic = /[\u0400-\u04FF]/.test(pageText);

    // Check for specific Russian words that should appear in templates
    const russianKeywords = [
      'проект', 'контакт', 'навык', 'услуг', 'портфолио', 'опыт',
      'клиент', 'функци', 'цен', 'награ', 'работ', 'связаться',
      'о нас', 'главная', 'назад', 'больше', 'все', 'год',
      'лет', 'проектов', 'клиентов', 'наград'
    ];

    const hasRussianWords = russianKeywords.some(keyword =>
      pageText.toLowerCase().includes(keyword)
    );

    const hasRussianContent = hasCyrillic || hasRussianWords;

    // Get a meaningful sample of text (skip code/scripts)
    const meaningfulText = pageText
      .replace(/\s+/g, ' ')
      .substring(0, 500)
      .trim();

    if (!hasRussianContent) {
      console.log(`  ❌ FAIL: No Russian content detected`);
      console.log(`  Sample text: ${meaningfulText.substring(0, 150)}...`);

      // Take screenshot
      const screenshotPath = `screenshots/ru-${templateId}-no-russian.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });

      return {
        templateId,
        status: 'FAIL',
        hasRussianContent: false,
        error: 'No Russian content detected',
        screenshot: screenshotPath,
        sampleText: meaningfulText.substring(0, 150),
      };
    }

    // Extract some Russian text as proof
    const russianMatch = meaningfulText.match(/[А-Яа-яЁё\s]{10,100}/);
    const russianSample = russianMatch ? russianMatch[0].trim() : 'Cyrillic detected';

    console.log(`  ✅ PASS - Russian content detected`);
    console.log(`  Sample: "${russianSample}"`);

    // Take screenshot for documentation
    const screenshotPath = `screenshots/ru-${templateId}-success.png`;
    await page.screenshot({ path: screenshotPath, fullPage: false, clip: { x: 0, y: 0, width: 1920, height: 1080 } });

    return {
      templateId,
      status: 'PASS',
      hasRussianContent: true,
      screenshot: screenshotPath,
      sampleText: russianSample,
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
  console.log('  RUSSIAN TRANSLATION TEST (UI-BASED)');
  console.log('  Testing all templates for Russian translations');
  console.log('  Method: Click language selector in UI');
  console.log('═══════════════════════════════════════════════════════\n');

  // Create screenshots directory
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  const browser = await chromium.launch({
    headless: false, // Set to false so you can see what's happening
    slowMo: 100, // Slow down actions by 100ms for visibility
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: 'ru-RU', // Set browser locale to Russian
  });

  const page = await context.newPage();

  const results: TranslationTestResult[] = [];

  // Test each template
  for (let i = 0; i < TEMPLATES.length; i++) {
    const templateId = TEMPLATES[i];
    const result = await testTemplateRussian(page, templateId, i);
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

  console.log(`📊 Total Templates: ${results.length}`);
  console.log(`✅ Passed (has Russian): ${passed.length}`);
  console.log(`❌ Failed (no Russian): ${failed.length}\n`);

  if (failed.length > 0) {
    console.log('❌ TEMPLATES WITHOUT RUSSIAN TRANSLATIONS:');
    console.log('═══════════════════════════════════════════════════════\n');
    failed.forEach((r, i) => {
      console.log(`${i + 1}. ${r.templateId}`);
      console.log(`   Error: ${r.error}`);
      if (r.sampleText) {
        console.log(`   Sample text found: "${r.sampleText.substring(0, 100)}..."`);
      }
      console.log(`   Screenshot: ${r.screenshot}\n`);
    });
  } else {
    console.log('🎉 ALL TEMPLATES HAVE RUSSIAN TRANSLATIONS!\n');
  }

  if (passed.length > 0) {
    console.log('✅ TEMPLATES WITH RUSSIAN TRANSLATIONS:');
    console.log('═══════════════════════════════════════════════════════\n');
    passed.forEach((r, i) => {
      console.log(`${i + 1}. ${r.templateId}`);
      if (r.sampleText) {
        console.log(`   Russian sample: "${r.sampleText.substring(0, 60)}..."`);
      }
    });
    console.log('');
  }

  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalTests: results.length,
    passed: passed.length,
    failed: failed.length,
    passRate: `${((passed.length / results.length) * 100).toFixed(1)}%`,
    results: results,
  };

  fs.writeFileSync('russian-translation-test-results.json', JSON.stringify(report, null, 2));
  console.log('📄 Detailed report saved: russian-translation-test-results.json');
  console.log('📸 Screenshots saved in: screenshots/\n');

  // Exit with error if any tests failed
  if (failed.length > 0) {
    console.log(`⚠️  ${failed.length} template(s) need Russian translations added\n`);
    process.exit(1);
  } else {
    console.log('✅ All tests passed!\n');
    process.exit(0);
  }
}

runTests().catch(console.error);
