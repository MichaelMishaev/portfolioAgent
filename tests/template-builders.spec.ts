import { test, expect } from '@playwright/test';

const testTemplates = [
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'dark-mode', name: 'Dark Mode' },
  { id: 'bold-typography', name: 'Bold Typography' },
  { id: 'neo-brutalist', name: 'Neo Brutalist' },
];

test.describe('Template Builders', () => {
  test.setTimeout(60000); // 60 seconds for each test

  for (const template of testTemplates) {
    test(`${template.name}: should load builder page`, async ({ page }) => {
      await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
      await page.waitForLoadState('networkidle');

      // Check that builder loaded (look for template info banner)
      await expect(page.getByText(`Building with: ${template.name}`)).toBeVisible({ timeout: 10000 });
    });

    test(`${template.name}: should have Puck editor interface`, async ({ page }) => {
      await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000); // Wait for Puck to fully initialize

      // Check for Puck's component panel (left side)
      const componentPanel = page.locator('[class*="ComponentList"]').first();
      await expect(componentPanel).toBeVisible({ timeout: 10000 });
    });

    test(`${template.name}: should have initial Hero section`, async ({ page }) => {
      await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);

      // Look for Hero section text
      await expect(page.getByText('Your Name')).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('Your Professional Title')).toBeVisible({ timeout: 10000 });
    });

    test(`${template.name}: should apply template styling`, async ({ page }) => {
      await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);

      // Check that content is visible (template styling applied)
      const heroSection = page.locator('text=Your Name').first();
      await expect(heroSection).toBeVisible({ timeout: 10000 });

      // Verify the section is styled (has background color)
      const heroContainer = heroSection.locator('..').locator('..'); // Parent elements
      const bgColor = await heroContainer.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return computed.backgroundColor;
      });

      // Should have a background color (not transparent)
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(bgColor).not.toBe('transparent');
    });

    test(`${template.name}: should show drag handles on hover`, async ({ page }) => {
      await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);

      // Find a section card
      const section = page.locator('text=Your Name').first().locator('..').locator('..');

      // Hover over the section
      await section.hover();
      await page.waitForTimeout(500);

      // Check for drag handle (GripVertical icon)
      const dragHandle = section.locator('svg[class*="lucide-grip-vertical"]').first();
      await expect(dragHandle).toBeVisible();
    });
  }

  test('Home page: should have Build Layout button for all templates', async ({ page }) => {
    await page.goto('http://localhost:3500');
    await page.waitForLoadState('networkidle');

    // Check that Build Layout buttons exist
    const buildButtons = page.getByRole('link', { name: /Build Layout/i });
    const count = await buildButtons.count();

    // Should have multiple Build Layout buttons (one per template)
    expect(count).toBeGreaterThan(0);
  });

  test('Template card: should have proper button hierarchy', async ({ page }) => {
    await page.goto('http://localhost:3500');
    await page.waitForLoadState('networkidle');

    // Get first template card
    const firstCard = page.locator('[class*="group"]').filter({ hasText: 'Build Layout' }).first();

    // Primary button should be "Build Layout"
    const primaryButton = firstCard.getByRole('link', { name: /Build Layout/i });
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toHaveClass(/bg-gradient-to-r/);

    // Secondary buttons should be visible
    await expect(firstCard.getByRole('link', { name: /Style Preview/i })).toBeVisible();
    await expect(firstCard.getByRole('link', { name: /View Demo/i })).toBeVisible();
  });
});
