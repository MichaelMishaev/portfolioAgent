import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface TestResult {
  template: string;
  url: string;
  hamburgerVisible: boolean;
  hasHorizontalScroll: boolean;
  navVisibleOnMobile: boolean;
  screenshotPath: string;
  issues: string[];
  passed: boolean;
}

const VIEWPORT = { width: 346, height: 878 };
const BASE_URL = 'http://localhost:3500';

// All templates to test
const TEMPLATES = [
  // Portfolio templates
  '/templates/single-page',
  '/templates/minimalist',
  '/templates/dark-mode',
  '/templates/bold-typography',
  '/templates/bento-grid',
  '/templates/grid-masonry',
  '/templates/split-screen',
  '/templates/fullscreen-immersive',
  '/templates/card-modular',
  '/templates/3d-immersive',
  '/templates/ar-spatial',
  '/templates/neo-brutalist',
  '/templates/illustration-focus',
  '/templates/y2k-retro',
  '/templates/collage-maximalist',
  '/templates/organic-liquid',
  '/templates/text-heavy',
  '/templates/kinetic-typography',
  '/templates/data-dashboard',
  '/templates/voice-first',

  // Product page templates
  '/templates/product-saas',
  '/templates/product-tech',
  '/templates/product-luxury',
  '/templates/product-physical',
  '/templates/product-audio',
  '/templates/product-vacuum',
  '/templates/product-fashion',
  '/templates/product-course',
  '/templates/product-premium',
  '/templates/service-agency',
  '/templates/service-b2b',
  '/templates/service-community',
  '/templates/service-consulting',
  '/templates/service-enterprise',
  '/templates/service-dfyou',

  // Blog templates
  '/templates/blog-personal',
  '/templates/blog-tech',
  '/templates/blog-magazine',
];

async function checkTemplate(page: Page, templateUrl: string): Promise<TestResult> {
  const templateName = templateUrl.split('/').pop() || 'unknown';
  const issues: string[] = [];
  const screenshotDir = path.join(process.cwd(), 'mobile-test-screenshots');

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const screenshotPath = path.join(screenshotDir, `${templateName}.png`);

  console.log(`\nTesting: ${templateUrl}`);

  try {
    // Navigate to template
    await page.goto(`${BASE_URL}${templateUrl}`, { waitUntil: 'networkidle', timeout: 10000 });

    // Wait for page to be interactive
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Wait for animations

    // Take screenshot
    await page.screenshot({ path: screenshotPath, fullPage: false });

    // Check for hamburger menu
    const hamburgerSelectors = [
      'button[aria-label="Toggle menu"]',
      'button.md\\:hidden', // Tailwind class
      'button:has(svg):not(:has(span))', // Button with SVG, no text
    ];

    let hamburgerVisible = false;
    for (const selector of hamburgerSelectors) {
      const hamburger = await page.locator(selector).first();
      if (await hamburger.isVisible().catch(() => false)) {
        hamburgerVisible = true;

        // Check if it's the menu icon (has 3 lines or "menu" appearance)
        const svgContent = await hamburger.locator('svg').innerHTML().catch(() => '');
        if (svgContent.includes('line') || svgContent.includes('Menu')) {
          break;
        }
      }
    }

    if (!hamburgerVisible) {
      issues.push('❌ No hamburger menu button visible on mobile');
    }

    // Check for horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    if (hasHorizontalScroll) {
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      issues.push(`❌ Horizontal scroll detected (${scrollWidth}px > 346px)`);
    }

    // Check if desktop nav is visible on mobile (should be hidden)
    const desktopNavVisible = await page.evaluate(() => {
      const navs = Array.from(document.querySelectorAll('nav .hidden, nav .md\\:flex'));
      return navs.some(nav => {
        const rect = nav.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
    });

    if (desktopNavVisible) {
      issues.push('❌ Desktop navigation visible on mobile (should be hidden)');
    }

    // Check text overflow
    const hasTextOverflow = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('h1, h2, p, button'));
      return elements.some(el => {
        const rect = el.getBoundingClientRect();
        return rect.right > window.innerWidth;
      });
    });

    if (hasTextOverflow) {
      issues.push('⚠️  Some text elements overflow viewport');
    }

    // Check button stacking
    const buttonsNotStacked = await page.evaluate(() => {
      const buttonContainers = Array.from(document.querySelectorAll('div:has(> button + button)'));
      return buttonContainers.some(container => {
        const buttons = container.querySelectorAll('button');
        if (buttons.length < 2) return false;

        const rects = Array.from(buttons).map(b => b.getBoundingClientRect());
        // Check if buttons are side-by-side (same row)
        if (rects.length >= 2) {
          const sameRow = Math.abs(rects[0].top - rects[1].top) < 10;
          return sameRow; // If same row on mobile = not stacked = problem
        }
        return false;
      });
    });

    if (buttonsNotStacked) {
      issues.push('⚠️  Buttons may not be stacking vertically on mobile');
    }

    const passed = issues.filter(i => i.startsWith('❌')).length === 0;

    return {
      template: templateName,
      url: templateUrl,
      hamburgerVisible,
      hasHorizontalScroll,
      navVisibleOnMobile: desktopNavVisible,
      screenshotPath,
      issues,
      passed,
    };

  } catch (error) {
    issues.push(`❌ Error testing template: ${error}`);
    return {
      template: templateName,
      url: templateUrl,
      hamburgerVisible: false,
      hasHorizontalScroll: false,
      navVisibleOnMobile: false,
      screenshotPath,
      issues,
      passed: false,
    };
  }
}

async function main() {
  console.log('🚀 Starting Mobile Responsiveness Test');
  console.log(`📱 Viewport: ${VIEWPORT.width}x${VIEWPORT.height}`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log(`📋 Templates to test: ${TEMPLATES.length}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  const results: TestResult[] = [];

  for (const templateUrl of TEMPLATES) {
    const result = await checkTemplate(page, templateUrl);
    results.push(result);

    // Print immediate feedback
    if (result.passed) {
      console.log(`✅ PASS: ${result.template}`);
    } else {
      console.log(`❌ FAIL: ${result.template}`);
      result.issues.forEach(issue => console.log(`   ${issue}`));
    }
  }

  await browser.close();

  // Generate report
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  console.log('\n' + '='.repeat(80));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Passed: ${passed}/${TEMPLATES.length}`);
  console.log(`❌ Failed: ${failed}/${TEMPLATES.length}`);
  console.log(`📸 Screenshots saved to: mobile-test-screenshots/\n`);

  // Failed templates
  if (failed > 0) {
    console.log('\n❌ FAILED TEMPLATES:');
    console.log('-'.repeat(80));
    results.filter(r => !r.passed).forEach(result => {
      console.log(`\n${result.template} (${result.url})`);
      result.issues.forEach(issue => console.log(`  ${issue}`));
      console.log(`  Screenshot: ${path.basename(result.screenshotPath)}`);
    });
  }

  // Save JSON report
  const reportPath = path.join(process.cwd(), 'mobile-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Full report saved to: ${reportPath}`);

  // Exit with error code if tests failed
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(console.error);
