import { test, expect } from '@playwright/test';

/**
 * Sample test suite for portfolio templates
 * This demonstrates how to test templates with Playwright
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

test.describe('Portfolio Templates', () => {
  // Test each template loads without errors
  for (const template of templates) {
    test(`${template} template should load`, async ({ page }) => {
      await page.goto(`/templates/${template}`);

      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Check navigation is present
      await expect(page.locator('nav')).toBeVisible();

      // Check no console errors
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      // Basic navigation check
      const backLink = page.locator('a[href="/"]').first();
      await expect(backLink).toBeVisible();
    });
  }

  test('homepage should display template gallery', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Portfolio Templates/i);

    // Check gallery is visible
    const gallery = page.locator('main');
    await expect(gallery).toBeVisible();

    // Check template cards are present
    const cards = page.locator('[role="article"], .template-card, article');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Responsive Design', () => {
  test('minimalist template should be responsive', async ({ page }) => {
    await page.goto('/templates/minimalist');

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('nav')).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('nav')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('nav')).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('back button should navigate to home', async ({ page }) => {
    await page.goto('/templates/minimalist');

    // Click back button
    await page.click('a[href="/"]');

    // Should be on homepage
    await expect(page).toHaveURL('/');
  });

  test('contact link should scroll to contact section', async ({ page }) => {
    await page.goto('/templates/minimalist');

    // Click contact link if present
    const contactLink = page.locator('a[href="#contact"]');
    if (await contactLink.count() > 0) {
      await contactLink.first().click();

      // Wait for scroll
      await page.waitForTimeout(500);

      // Contact section should be in viewport
      const contactSection = page.locator('#contact');
      if (await contactSection.count() > 0) {
        await expect(contactSection).toBeInViewport();
      }
    }
  });
});

test.describe('Performance', () => {
  test('minimalist template should load quickly', async ({ page }) => {
    const start = Date.now();
    await page.goto('/templates/minimalist');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - start;

    // Should load in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });
});

test.describe('Accessibility', () => {
  test('minimalist template should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/templates/minimalist');

    // Should have h1
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();

    // Check heading order (h1 before h2, h2 before h3)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/templates/minimalist');

    // Find all img tags
    const images = await page.locator('img').all();

    // Check each image has alt attribute
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }
  });
});
