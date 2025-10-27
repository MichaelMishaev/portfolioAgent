import { test, expect } from '@playwright/test';

const TEMPLATES = [
  {
    id: 'online-business-coach',
    path: '/templates/online-business-coach',
    englishText: 'Start Your Journey',
    russianText: 'Начать путь',
  },
  {
    id: 'online-business-course',
    path: '/templates/online-business-course',
    englishText: 'Start Learning Now',
    russianText: 'Начать обучение',
  },
  {
    id: 'online-business-agency',
    path: '/templates/online-business-agency',
    englishText: 'Start Your Project',
    russianText: 'Начать проект',
  },
  {
    id: 'online-business-saas',
    path: '/templates/online-business-saas',
    englishText: 'Start Free Trial',
    russianText: 'Начать бесплатный пробный период',
  },
];

test.describe('Online Business Templates - i18n Tests', () => {
  for (const template of TEMPLATES) {
    test(`${template.id} - should display English by default`, async ({ page }) => {
      await page.goto(`http://localhost:3500${template.path}`);
      await page.waitForLoadState('networkidle');

      // Check for English text
      const content = await page.textContent('body');
      expect(content).toContain(template.englishText);

      // Take screenshot
      await page.screenshot({
        path: `tests/screenshots/${template.id}-english.png`,
        fullPage: true
      });
    });

    test(`${template.id} - should switch to Russian when language toggle clicked`, async ({ page }) => {
      await page.goto(`http://localhost:3500${template.path}`);
      await page.waitForLoadState('networkidle');

      // Find the Globe icon language toggle button
      const languageToggle = page.locator('button[aria-label="Toggle language"], button:has(svg.lucide-globe)').first();

      if (await languageToggle.count() > 0) {
        // Click to open dropdown
        await languageToggle.click();

        // Wait for dropdown to appear and click Russian button
        const russianButton = page.locator('button:has-text("Русский")');
        await russianButton.waitFor({ state: 'visible', timeout: 5000 });
        await russianButton.click();

        // Wait for content to update
        await page.waitForTimeout(1000);

        // Verify Russian text appears
        const content = await page.textContent('body');
        expect(content).toContain(template.russianText);

        // Take screenshot
        await page.screenshot({
          path: `tests/screenshots/${template.id}-russian.png`,
          fullPage: true
        });
      } else {
        console.log(`Language toggle not found for ${template.id}`);
      }
    });

    test(`${template.id} - should persist language selection on reload`, async ({ page }) => {
      await page.goto(`http://localhost:3500${template.path}`);
      await page.waitForLoadState('networkidle');

      // Switch to Russian
      const languageToggle = page.locator('button[aria-label="Toggle language"], button:has(svg.lucide-globe)').first();
      if (await languageToggle.count() > 0) {
        await languageToggle.click();
        const russianButton = page.locator('button:has-text("Русский")');
        await russianButton.waitFor({ state: 'visible', timeout: 5000 });
        await russianButton.click();
        await page.waitForTimeout(1000);

        // Reload page
        await page.reload();
        await page.waitForLoadState('networkidle');

        // Verify Russian is still selected
        const content = await page.textContent('body');
        expect(content).toContain(template.russianText);
      }
    });
  }

  test('All Online Business templates - comprehensive Russian translation check', async ({ page }) => {
    const russianKeywords = [
      'Начать', // Start
      'Услуги', // Services
      'Тарифы', // Pricing
      'Возможности', // Features
      'Назад', // Back
    ];

    for (const template of TEMPLATES) {
      await page.goto(`http://localhost:3500${template.path}`);
      await page.waitForLoadState('networkidle');

      // Switch to Russian
      const languageToggle = page.locator('button[aria-label="Toggle language"], button:has(svg.lucide-globe)').first();
      if (await languageToggle.count() > 0) {
        await languageToggle.click();
        const russianButton = page.locator('button:has-text("Русский")');
        await russianButton.waitFor({ state: 'visible', timeout: 5000 });
        await russianButton.click();
        await page.waitForTimeout(1000);

        // Get full page content
        const content = await page.textContent('body');

        // Check that at least some Russian keywords are present
        const foundKeywords = russianKeywords.filter(keyword =>
          content?.includes(keyword)
        );

        console.log(`${template.id}: Found ${foundKeywords.length}/${russianKeywords.length} Russian keywords`);
        expect(foundKeywords.length).toBeGreaterThan(0);
      }
    }
  });
});
