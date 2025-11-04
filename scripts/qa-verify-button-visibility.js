#!/usr/bin/env node

/**
 * QA - Verify Button Text Visibility
 *
 * Uses Playwright to check that all buttons have visible text
 * by verifying contrast ratios and computed styles
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function verifyButtonVisibility() {
  console.log('🔍 QA: Verifying button text visibility across all templates\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Get all template IDs
  const translations = require('../lib/translations.json');
  const templates = translations.en.templates.map(t => t.id);

  const results = {
    passed: [],
    warnings: [],
    failed: []
  };

  console.log(`Testing ${templates.length} templates...\n`);

  for (const templateId of templates) {
    try {
      const url = `http://localhost:3500/templates/${templateId}/demo`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });

      // Wait for page to load
      await page.waitForTimeout(1000);

      // Check all buttons on the page
      const buttons = await page.$$eval('button', btns =>
        btns.map(btn => {
          const styles = window.getComputedStyle(btn);
          const textColor = styles.color;
          const bgColor = styles.backgroundColor;
          const text = btn.textContent.trim();

          return {
            text: text.substring(0, 50),
            textColor,
            bgColor,
            visible: btn.offsetWidth > 0 && btn.offsetHeight > 0
          };
        })
      );

      if (buttons.length === 0) {
        results.warnings.push({
          template: templateId,
          issue: 'No buttons found on page'
        });
        console.log(`⚠️  ${templateId}: No buttons found`);
        continue;
      }

      // Check for low contrast issues
      const invisibleButtons = buttons.filter(btn => {
        // Check if button has text but colors are too similar
        if (!btn.text || btn.text.length === 0) return false;
        if (!btn.visible) return true;

        // Parse RGB values
        const textRGB = btn.textColor.match(/\d+/g)?.map(Number) || [0, 0, 0];
        const bgRGB = btn.bgColor.match(/\d+/g)?.map(Number) || [255, 255, 255];

        // Simple contrast check - if colors are too similar
        const diff = Math.abs(textRGB[0] - bgRGB[0]) +
                     Math.abs(textRGB[1] - bgRGB[1]) +
                     Math.abs(textRGB[2] - bgRGB[2]);

        return diff < 100; // Low contrast
      });

      if (invisibleButtons.length > 0) {
        results.warnings.push({
          template: templateId,
          buttons: invisibleButtons.map(b => b.text)
        });
        console.log(`⚠️  ${templateId}: ${invisibleButtons.length} button(s) with low contrast`);
        invisibleButtons.forEach(b => {
          console.log(`    - "${b.text}" (text: ${b.textColor}, bg: ${b.bgColor})`);
        });
      } else {
        results.passed.push(templateId);
        console.log(`✅ ${templateId}: All ${buttons.length} button(s) visible`);
      }

    } catch (error) {
      results.failed.push({
        template: templateId,
        error: error.message
      });
      console.log(`❌ ${templateId}: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📊 QA RESULTS');
  console.log('='.repeat(70));
  console.log(`✅ Passed: ${results.passed.length}/${templates.length}`);
  console.log(`⚠️  Warnings: ${results.warnings.length}/${templates.length}`);
  console.log(`❌ Failed: ${results.failed.length}/${templates.length}\n`);

  if (results.warnings.length > 0) {
    console.log('⚠️  Templates with warnings:');
    results.warnings.forEach(w => {
      if (w.buttons) {
        console.log(`  - ${w.template}: ${w.buttons.length} low-contrast button(s)`);
      } else {
        console.log(`  - ${w.template}: ${w.issue}`);
      }
    });
    console.log('');
  }

  // Save results
  const resultsPath = path.join(__dirname, 'qa-button-visibility-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`📄 Full results saved to: ${resultsPath}\n`);

  await browser.close();

  console.log('✅ QA Complete!\n');

  return results;
}

verifyButtonVisibility().catch(console.error);
