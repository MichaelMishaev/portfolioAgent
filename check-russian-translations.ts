import { chromium, Browser, Page } from 'playwright';
import { templates } from './lib/template-registry';
import * as fs from 'fs';

const VIEWPORT_WIDTH = 346;
const VIEWPORT_HEIGHT = 878;
const BASE_URL = 'http://localhost:3500';

interface TranslationCheckResult {
  template: string;
  url: string;
  passed: boolean;
  issues: string[];
  russianContent: {
    title: string;
    navLinks: string[];
    buttons: string[];
    hasUndefined: boolean;
    hasEnglishMixing: boolean;
  };
}

async function checkRussianTranslation(
  page: Page,
  template: { id: string; demoPath: string }
): Promise<TranslationCheckResult> {
  const url = `${BASE_URL}${template.demoPath}`;
  console.log(`\n🇷🇺 Checking Russian: ${template.demoPath}`);

  const result: TranslationCheckResult = {
    template: template.id,
    url: template.demoPath,
    passed: true,
    issues: [],
    russianContent: {
      title: '',
      navLinks: [],
      buttons: [],
      hasUndefined: false,
      hasEnglishMixing: false,
    },
  };

  try {
    // Go to page
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    // Switch to Russian by clicking language toggle (Globe icon button)
    // The LanguageToggle component renders a Globe icon from lucide-react
    const languageButton = page.locator('button:has(svg)').filter({ hasText: '' }).first();

    let languageToggleFound = false;

    // Try to find and click the globe/language button
    const allButtons = await page.locator('button').all();
    for (const button of allButtons) {
      const srText = await button.locator('.sr-only').textContent().catch(() => '');
      if (srText.includes('language')) {
        languageToggleFound = true;
        await button.click();
        await page.waitForTimeout(500);

        // Click Russian option
        const russianOption = page.locator('text="Русский"').first();
        if (await russianOption.isVisible()) {
          await russianOption.click();
          await page.waitForTimeout(1500);
          break;
        } else {
          result.issues.push('⚠️  Could not find "Русский" option in menu');
          break;
        }
      }
    }

    if (!languageToggleFound) {
      result.issues.push('⚠️  No language toggle button found');
    }

    // Extract page content
    const content = await page.evaluate(() => {
      const bodyText = document.body.textContent || '';

      // Get main heading
      const h1 = document.querySelector('h1');
      const title = h1?.textContent?.trim() || '';

      // Get navigation links
      const navLinks: string[] = [];
      document.querySelectorAll('nav a, nav button').forEach(el => {
        const text = el.textContent?.trim();
        if (text && text.length > 0) {
          navLinks.push(text);
        }
      });

      // Get buttons
      const buttons: string[] = [];
      document.querySelectorAll('button, a[role="button"]').forEach(el => {
        const text = el.textContent?.trim();
        if (text && text.length > 0 && !navLinks.includes(text)) {
          buttons.push(text);
        }
      });

      // Check for issues
      const hasUndefined = bodyText.includes('undefined') ||
                          bodyText.includes('tt.') ||
                          bodyText.includes('[object Object]');

      // Check for common English words that should be translated
      const englishWords = ['About', 'Work', 'Contact', 'Gallery', 'Get in Touch', 'Back to Gallery'];
      const hasEnglishMixing = englishWords.some(word => bodyText.includes(word));

      return {
        title,
        navLinks: navLinks.slice(0, 10),
        buttons: buttons.slice(0, 10),
        hasUndefined,
        hasEnglishMixing,
        bodyText: bodyText.slice(0, 500),
      };
    });

    result.russianContent = {
      title: content.title,
      navLinks: content.navLinks,
      buttons: content.buttons,
      hasUndefined: content.hasUndefined,
      hasEnglishMixing: content.hasEnglishMixing,
    };

    // Check for issues
    if (content.hasUndefined) {
      result.issues.push('❌ Found "undefined" or translation keys in page');
      result.passed = false;
    }

    if (content.hasEnglishMixing) {
      result.issues.push('⚠️  English words found - possible missing Russian translations');
    }

    // Check for Cyrillic characters (Russian should have them)
    const hasCyrillic = /[а-яА-ЯЁё]/.test(content.bodyText);
    if (!hasCyrillic) {
      result.issues.push('❌ NO CYRILLIC TEXT - Russian translation not working');
      result.passed = false;
    } else {
      console.log(`  ✓ Cyrillic detected: "${content.title}"`);
    }

    if (result.issues.length === 0) {
      console.log(`  ✅ PASS: ${template.id}`);
    } else {
      console.log(`  ⚠️  ISSUES: ${template.id}`);
      result.issues.forEach(issue => console.log(`     ${issue}`));
    }

  } catch (error) {
    console.error(`  ❌ ERROR: ${template.id}`, error);
    result.passed = false;
    result.issues.push(`Error: ${error}`);
  }

  return result;
}

async function main() {
  console.log('🇷🇺 Starting Russian Translation Check');
  console.log(`📱 Viewport: ${VIEWPORT_WIDTH}x${VIEWPORT_HEIGHT}`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log(`📋 Templates to check: ${templates.length}\n`);

  const browser: Browser = await chromium.launch({
    headless: true,
  });

  const page: Page = await browser.newPage({
    viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
  });

  const results: TranslationCheckResult[] = [];

  for (const template of templates) {
    const result = await checkRussianTranslation(page, template);
    results.push(result);
  }

  await browser.close();

  // Generate report
  fs.writeFileSync('russian-translation-report.json', JSON.stringify(results, null, 2));

  // Summary
  console.log('\n\n================================================================================');
  console.log('🇷🇺 RUSSIAN TRANSLATION SUMMARY');
  console.log('================================================================================');

  const perfect = results.filter(r => r.passed && r.issues.length === 0).length;
  const withWarnings = results.filter(r => r.passed && r.issues.length > 0).length;
  const failed = results.filter(r => !r.passed).length;

  console.log(`✅ Perfect: ${perfect}/${templates.length}`);
  console.log(`⚠️  With warnings: ${withWarnings}/${templates.length}`);
  console.log(`❌ Failed: ${failed}/${templates.length}`);

  // List failures
  if (failed > 0) {
    console.log('\n❌ FAILED Templates:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`\n${r.template}:`);
      r.issues.forEach(issue => console.log(`  ${issue}`));
      console.log(`  Title: "${r.russianContent.title}"`);
      console.log(`  Nav: ${r.russianContent.navLinks.join(', ')}`);
    });
  }

  // List warnings
  if (withWarnings > 0) {
    console.log('\n⚠️  Templates with warnings:');
    results.filter(r => r.passed && r.issues.length > 0).forEach(r => {
      console.log(`\n${r.template}:`);
      r.issues.forEach(issue => console.log(`  ${issue}`));
    });
  }

  console.log('\n📄 Full report saved to: russian-translation-report.json');
}

main().catch(console.error);
