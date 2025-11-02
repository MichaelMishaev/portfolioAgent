import { chromium, Browser, Page } from 'playwright';
import { templates } from './lib/template-registry';
import * as fs from 'fs';
import * as path from 'path';

const VIEWPORT_WIDTH = 346;
const VIEWPORT_HEIGHT = 878;
const BASE_URL = 'http://localhost:3500';
const SCREENSHOT_DIR = 'mobile-deep-check-screenshots';
const REPORT_FILE = 'mobile-deep-check-report.json';

interface DeepCheckResult {
  template: string;
  url: string;
  passed: boolean;
  issues: string[];
  details: {
    hamburgerVisible: boolean;
    hasHorizontalScroll: boolean;
    navVisibleOnMobile: boolean;
    actualViewportWidth: number;
    scrollWidth: number;
    overflowingElements: Array<{
      selector: string;
      width: number;
      text?: string;
    }>;
    buttonGroups: Array<{
      selector: string;
      isStacking: boolean;
      buttonCount: number;
    }>;
    translationIssues: string[];
    largeTextElements: Array<{
      selector: string;
      hasBreakWords: boolean;
      width: number;
    }>;
  };
  screenshotPath: string;
}

async function deepCheckTemplate(
  page: Page,
  template: { id: string; demoPath: string }
): Promise<DeepCheckResult> {
  const url = `${BASE_URL}${template.demoPath}`;
  console.log(`\n🔍 Deep checking: ${template.demoPath}`);

  const result: DeepCheckResult = {
    template: template.id,
    url: template.demoPath,
    passed: true,
    issues: [],
    details: {
      hamburgerVisible: false,
      hasHorizontalScroll: false,
      navVisibleOnMobile: false,
      actualViewportWidth: VIEWPORT_WIDTH,
      scrollWidth: 0,
      overflowingElements: [],
      buttonGroups: [],
      translationIssues: [],
      largeTextElements: [],
    },
    screenshotPath: '',
  };

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Check hamburger menu visibility
    const hamburgerSelectors = [
      'button[aria-label*="menu" i]',
      'button[aria-label*="toggle" i]',
      '.md\\:hidden button',
      '[class*="hamburger"]',
    ];

    for (const selector of hamburgerSelectors) {
      const hamburger = page.locator(selector).first();
      if (await hamburger.isVisible()) {
        result.details.hamburgerVisible = true;
        break;
      }
    }

    if (!result.details.hamburgerVisible) {
      result.issues.push('❌ No hamburger menu found on mobile');
      result.passed = false;
    }

    // Check desktop navigation visibility
    const desktopNav = page.locator('.hidden.md\\:flex, .hidden.md\\:block').first();
    if (await desktopNav.isVisible()) {
      result.details.navVisibleOnMobile = true;
      result.issues.push('❌ Desktop navigation visible on mobile');
      result.passed = false;
    }

    // Check horizontal scroll
    const scrollMetrics = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    result.details.scrollWidth = scrollMetrics.scrollWidth;
    result.details.hasHorizontalScroll = scrollMetrics.hasHorizontalScroll;

    if (scrollMetrics.hasHorizontalScroll) {
      result.issues.push(`❌ HORIZONTAL SCROLL DETECTED: ${scrollMetrics.scrollWidth}px > ${scrollMetrics.clientWidth}px`);
      result.passed = false;
    }

    // Find all overflowing elements
    const overflowingElements = await page.evaluate((viewportWidth) => {
      const elements: Array<{ selector: string; width: number; text?: string }> = [];
      const allElements = document.querySelectorAll('*');

      allElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);

        // Skip if element is hidden or has overflow hidden/scroll
        if (computedStyle.display === 'none' ||
            computedStyle.visibility === 'hidden' ||
            computedStyle.overflow === 'hidden' ||
            computedStyle.overflow === 'scroll' ||
            computedStyle.overflowX === 'hidden' ||
            computedStyle.overflowX === 'scroll') {
          return;
        }

        if (rect.width > viewportWidth + 1) { // +1 for rounding
          const tagName = el.tagName.toLowerCase();
          const className = el.className || '';
          const id = el.id || '';

          let selector = tagName;
          if (id) selector += `#${id}`;
          if (className && typeof className === 'string') {
            const classes = className.split(' ').slice(0, 2).join('.');
            if (classes) selector += `.${classes}`;
          }

          elements.push({
            selector: selector + ` [${index}]`,
            width: Math.round(rect.width),
            text: el.textContent?.slice(0, 50),
          });
        }
      });

      return elements;
    }, VIEWPORT_WIDTH);

    result.details.overflowingElements = overflowingElements;

    if (overflowingElements.length > 0) {
      result.issues.push(`⚠️  ${overflowingElements.length} elements wider than viewport`);
      overflowingElements.slice(0, 3).forEach(el => {
        result.issues.push(`   → ${el.selector}: ${el.width}px`);
      });
    }

    // Check button groups for stacking
    const buttonGroups = await page.evaluate(() => {
      const groups: Array<{ selector: string; isStacking: boolean; buttonCount: number }> = [];
      const containers = document.querySelectorAll('div[class*="flex"]');

      containers.forEach((container, index) => {
        const buttons = container.querySelectorAll('button, a[role="button"]');
        if (buttons.length >= 2) {
          const rects = Array.from(buttons).map(btn => btn.getBoundingClientRect());

          // Check if buttons are vertically stacked (y positions differ significantly)
          const isStacking = rects.length > 1 && Math.abs(rects[0].top - rects[1].top) > 10;

          const className = (container as HTMLElement).className || '';
          groups.push({
            selector: `div.${className.split(' ').slice(0, 2).join('.')} [${index}]`,
            isStacking,
            buttonCount: buttons.length,
          });
        }
      });

      return groups;
    });

    result.details.buttonGroups = buttonGroups;

    const nonStackingGroups = buttonGroups.filter(g => !g.isStacking && g.buttonCount >= 2);
    if (nonStackingGroups.length > 0) {
      result.issues.push(`⚠️  ${nonStackingGroups.length} button groups not stacking on mobile`);
    }

    // Check large text elements for break-words
    const largeTextElements = await page.evaluate(() => {
      const elements: Array<{ selector: string; hasBreakWords: boolean; width: number }> = [];
      const largeText = document.querySelectorAll('h1, h2, h3, p');

      largeText.forEach((el, index) => {
        const computedStyle = window.getComputedStyle(el);
        const fontSize = parseFloat(computedStyle.fontSize);

        // Check for large text (> 24px)
        if (fontSize > 24) {
          const rect = el.getBoundingClientRect();
          const hasBreakWords = computedStyle.wordBreak === 'break-word' ||
                               computedStyle.overflowWrap === 'break-word';

          const tagName = el.tagName.toLowerCase();
          const className = el.className || '';

          elements.push({
            selector: `${tagName}${className ? '.' + (className as string).split(' ').slice(0, 2).join('.') : ''} [${index}]`,
            hasBreakWords,
            width: Math.round(rect.width),
          });
        }
      });

      return elements;
    });

    result.details.largeTextElements = largeTextElements;

    const noBreakWords = largeTextElements.filter(el => !el.hasBreakWords && el.width > VIEWPORT_WIDTH - 24);
    if (noBreakWords.length > 0) {
      result.issues.push(`⚠️  ${noBreakWords.length} large text elements missing break-words`);
    }

    // Check for translation issues (missing text, broken i18n)
    const translationIssues = await page.evaluate(() => {
      const issues: string[] = [];
      const body = document.body.textContent || '';

      // Check for common translation placeholders or errors
      if (body.includes('undefined')) {
        issues.push('Found "undefined" in page text');
      }
      if (body.includes('[object Object]')) {
        issues.push('Found "[object Object]" in page text');
      }
      if (body.includes('{{') || body.includes('}}')) {
        issues.push('Found unprocessed template syntax');
      }
      if (body.includes('t.') || body.includes('tt.')) {
        issues.push('Found unprocessed translation keys');
      }

      // Check for empty navigation or buttons
      const buttons = document.querySelectorAll('button, a[role="button"]');
      buttons.forEach((btn, i) => {
        const text = btn.textContent?.trim();
        if (!text || text.length === 0) {
          issues.push(`Empty button found [${i}]`);
        }
      });

      return issues;
    });

    result.details.translationIssues = translationIssues;

    if (translationIssues.length > 0) {
      result.issues.push(`⚠️  Translation issues: ${translationIssues.join(', ')}`);
    }

    // Take screenshot
    const screenshotPath = path.join(SCREENSHOT_DIR, `${template.id}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    result.screenshotPath = path.resolve(screenshotPath);

    // Summary
    if (result.issues.length === 0) {
      console.log(`✅ PASS: ${template.id}`);
    } else {
      console.log(`⚠️  ISSUES FOUND: ${template.id}`);
      result.issues.forEach(issue => console.log(`   ${issue}`));
    }

  } catch (error) {
    console.error(`❌ ERROR: ${template.id}`, error);
    result.passed = false;
    result.issues.push(`Error: ${error}`);
  }

  return result;
}

async function main() {
  console.log('🚀 Starting Deep Mobile Responsiveness Check');
  console.log(`📱 Viewport: ${VIEWPORT_WIDTH}x${VIEWPORT_HEIGHT}`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log(`📋 Templates to check: ${templates.length}\n`);

  // Create screenshot directory
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser: Browser = await chromium.launch({
    headless: true,
  });

  const page: Page = await browser.newPage({
    viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
    deviceScaleFactor: 2,
  });

  const results: DeepCheckResult[] = [];

  for (const template of templates) {
    const result = await deepCheckTemplate(page, template);
    results.push(result);
  }

  await browser.close();

  // Generate report
  fs.writeFileSync(REPORT_FILE, JSON.stringify(results, null, 2));

  // Summary
  console.log('\n\n================================================================================');
  console.log('📊 DEEP CHECK SUMMARY');
  console.log('================================================================================');

  const passed = results.filter(r => r.issues.length === 0).length;
  const withIssues = results.filter(r => r.issues.length > 0).length;
  const failed = results.filter(r => !r.passed).length;

  console.log(`✅ Perfect: ${passed}/${templates.length}`);
  console.log(`⚠️  With warnings: ${withIssues}/${templates.length}`);
  console.log(`❌ Failed: ${failed}/${templates.length}`);

  console.log('\n📸 Screenshots saved to:', SCREENSHOT_DIR);
  console.log('📄 Full report saved to:', path.resolve(REPORT_FILE));

  // List templates with issues
  if (withIssues > 0) {
    console.log('\n⚠️  Templates with issues:');
    results.filter(r => r.issues.length > 0).forEach(r => {
      console.log(`\n${r.template}:`);
      r.issues.forEach(issue => console.log(`  ${issue}`));
    });
  }
}

main().catch(console.error);
