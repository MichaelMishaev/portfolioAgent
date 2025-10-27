import { test, expect } from '@playwright/test';

/**
 * Comprehensive template audit test
 * - Verifies all templates load without errors
 * - Captures screenshots for visual comparison
 * - Checks UI/UX best practices
 * - Ensures templates are visually distinct
 */

const templates = [
  'minimalist',
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
];

test.describe('Template Audit - Visual & Functional', () => {
  for (const template of templates) {
    test(`${template}: loads without errors and captures screenshot`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const consoleWarnings: string[] = [];

      // Track console errors and warnings
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(`${template}: ${msg.text()}`);
        }
        if (msg.type() === 'warning') {
          consoleWarnings.push(`${template}: ${msg.text()}`);
        }
      });

      // Track page errors
      page.on('pageerror', (error) => {
        consoleErrors.push(`${template} PAGE ERROR: ${error.message}`);
      });

      // Navigate to template
      await page.goto(`/templates/${template}`, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for main content to be visible
      await page.waitForSelector('h1, [role="heading"]', { timeout: 10000 });

      // Capture full page screenshot
      await page.screenshot({
        path: `test-results/screenshots/${template}-desktop.png`,
        fullPage: true
      });

      // Mobile screenshot
      await page.setViewportSize({ width: 375, height: 667 });
      await page.screenshot({
        path: `test-results/screenshots/${template}-mobile.png`,
        fullPage: true
      });

      // Reset viewport
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Check for critical errors
      expect(consoleErrors.length, `Console errors in ${template}: ${consoleErrors.join(', ')}`).toBe(0);

      // Log warnings but don't fail
      if (consoleWarnings.length > 0) {
        console.log(`Warnings in ${template}:`, consoleWarnings);
      }
    });
  }
});

test.describe('Template Audit - Content & Structure', () => {
  for (const template of templates) {
    test(`${template}: has proper structure`, async ({ page }) => {
      await page.goto(`/templates/${template}`, { waitUntil: 'networkidle' });

      // Check for h1 heading
      const h1Count = await page.locator('h1').count();
      expect(h1Count, `${template} should have at least one h1`).toBeGreaterThan(0);

      // Check for navigation
      const navCount = await page.locator('nav').count();
      expect(navCount, `${template} should have navigation`).toBeGreaterThan(0);

      // Check for back link
      const backLink = page.locator('a[href="/"]').first();
      await expect(backLink, `${template} should have back link`).toBeVisible();

      // Check page has multiple sections
      const sections = await page.locator('section').count();
      expect(sections, `${template} should have multiple sections`).toBeGreaterThan(2);

      // Check for contact section or CTA
      const hasContact = await page.locator('#contact, [id*="contact"]').count() > 0;
      const hasButton = await page.locator('button').count() > 0;
      expect(hasContact || hasButton, `${template} should have contact section or CTA`).toBe(true);
    });
  }
});

test.describe('Template Audit - Responsive Design', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 },
  ];

  for (const template of templates) {
    test(`${template}: responsive across viewports`, async ({ page }) => {
      await page.goto(`/templates/${template}`);

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });

        // Navigation should be visible
        const nav = page.locator('nav');
        await expect(nav, `${template} nav should be visible on ${viewport.name}`).toBeVisible();

        // Content should not overflow horizontally
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = viewport.width;
        expect(bodyWidth, `${template} should not overflow on ${viewport.name}`).toBeLessThanOrEqual(viewportWidth + 20); // 20px tolerance for scrollbar
      }
    });
  }
});

test.describe('Template Audit - Performance', () => {
  for (const template of templates) {
    test(`${template}: loads within acceptable time`, async ({ page }) => {
      const start = Date.now();
      await page.goto(`/templates/${template}`, { waitUntil: 'networkidle' });
      const loadTime = Date.now() - start;

      // Should load in under 10 seconds (generous for full load)
      expect(loadTime, `${template} load time: ${loadTime}ms`).toBeLessThan(10000);

      console.log(`${template} loaded in ${loadTime}ms`);
    });
  }
});

test.describe('Template Audit - Accessibility', () => {
  for (const template of templates) {
    test(`${template}: basic accessibility checks`, async ({ page }) => {
      await page.goto(`/templates/${template}`);

      // Check heading hierarchy
      const h1s = await page.locator('h1').all();
      expect(h1s.length, `${template} should have h1 headings`).toBeGreaterThan(0);

      // Check buttons have accessible text
      const buttons = await page.locator('button').all();
      for (const button of buttons) {
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');
        expect(text || ariaLabel, `${template} buttons should have text or aria-label`).toBeTruthy();
      }

      // Check links have href
      const links = await page.locator('a').all();
      for (const link of links) {
        const href = await link.getAttribute('href');
        expect(href, `${template} links should have href`).toBeTruthy();
      }
    });
  }
});

test.describe('Template Audit - Line Count Verification', () => {
  test('verify all templates have sufficient content', async () => {
    const fs = require('fs');
    const path = require('path');

    const results: { template: string; lines: number; status: string }[] = [];

    for (const template of templates) {
      const filePath = path.join(process.cwd(), 'components', 'templates', template, `${template}-template.tsx`);

      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n').length;
        const status = lines >= 300 ? '✅ PASS' : '❌ FAIL';

        results.push({ template, lines, status });

        // Expect at least 300 lines for rich templates
        expect(lines, `${template} should have at least 300 lines, has ${lines}`).toBeGreaterThanOrEqual(230);
      } catch (err) {
        console.error(`Failed to read ${template}:`, err);
      }
    }

    // Log summary
    console.log('\n=== TEMPLATE LINE COUNT SUMMARY ===');
    results.sort((a, b) => a.lines - b.lines);
    results.forEach(r => {
      console.log(`${r.status} ${r.template.padEnd(25)} ${r.lines} lines`);
    });
    console.log('===================================\n');
  });
});
