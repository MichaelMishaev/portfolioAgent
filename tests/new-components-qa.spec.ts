import { test, expect } from '@playwright/test';

test.describe('Builder New Components QA - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log(`Browser [${msg.type()}]:`, msg.text()));

    await page.goto('http://localhost:3500/templates/product-fashion/builder');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('should display all new component categories', async ({ page }) => {
    // Check if CONTENT category is visible
    await expect(page.getByText('CONTENT', { exact: true })).toBeVisible();

    // Check if all new components are listed
    await expect(page.getByText('Pricing')).toBeVisible();
    await expect(page.getByText('Testimonials')).toBeVisible();
    await expect(page.getByText('Gallery')).toBeVisible();
    await expect(page.getByText('Call to Action')).toBeVisible();
    await expect(page.getByText('Timeline')).toBeVisible();
    await expect(page.getByText('FAQ')).toBeVisible();
    await expect(page.getByText('Video')).toBeVisible();
    await expect(page.getByText('Social Links')).toBeVisible();
  });

  test('should add Pricing component to canvas', async ({ page }) => {
    const pricingButton = page.locator('button', { hasText: 'Pricing' }).first();

    // Drag to canvas
    const canvas = page.locator('iframe, div[class*="Frame"]').first();
    await pricingButton.hover();
    await page.mouse.down();
    await canvas.hover();
    await page.mouse.up();
    await page.waitForTimeout(1000);

    // Verify component was added
    await expect(page.getByText('Pricing Plans')).toBeVisible();
    await expect(page.getByText('Basic')).toBeVisible();
    await expect(page.getByText('$99/mo')).toBeVisible();
  });

  test('should add Testimonials component', async ({ page }) => {
    const button = page.locator('button', { hasText: 'Testimonials' }).first();
    const canvas = page.locator('iframe, div[class*="Frame"]').first();

    await button.hover();
    await page.mouse.down();
    await canvas.hover();
    await page.mouse.up();
    await page.waitForTimeout(1000);

    await expect(page.getByText('What Clients Say')).toBeVisible();
    await expect(page.getByText('Sarah Johnson')).toBeVisible();
    await expect(page.getByText('CEO, TechCorp')).toBeVisible();
  });

  test('should add Gallery component', async ({ page }) => {
    const button = page.locator('button', { hasText: 'Gallery' }).first();
    const canvas = page.locator('iframe, div[class*="Frame"]').first();

    await button.hover();
    await page.mouse.down();
    await canvas.hover();
    await page.mouse.up();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Gallery', { exact: true })).toBeVisible();
    await expect(page.getByText('Project 1')).toBeVisible();
  });

  test('should add CTA component', async ({ page }) => {
    const button = page.locator('button', { hasText: 'Call to Action' }).first();
    const canvas = page.locator('iframe, div[class*="Frame"]').first();

    await button.hover();
    await page.mouse.down();
    await canvas.hover();
    await page.mouse.up();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Ready to Get Started?')).toBeVisible();
    await expect(page.getByText('Get Started Now')).toBeVisible();
  });

  test('should add Timeline component', async ({ page }) => {
    const button = page.locator('button', { hasText: 'Timeline' }).first();
    const canvas = page.locator('iframe, div[class*="Frame"]').first();

    await button.hover();
    await page.mouse.down();
    await canvas.hover();
    await page.mouse.up();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Our Journey')).toBeVisible();
    await expect(page.getByText('Company Founded')).toBeVisible();
  });

  test('should add FAQ component', async ({ page }) => {
    const button = page.locator('button', { hasText: 'FAQ' }).first();
    const canvas = page.locator('iframe, div[class*="Frame"]').first();

    await button.hover();
    await page.mouse.down();
    await canvas.hover();
    await page.mouse.up();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Frequently Asked Questions')).toBeVisible();
    await expect(page.getByText('How does it work?')).toBeVisible();
  });

  test('should add Video component', async ({ page }) => {
    const button = page.locator('button', { hasText: 'Video' }).first();
    const canvas = page.locator('iframe, div[class*="Frame"]').first();

    await button.hover();
    await page.mouse.down();
    await canvas.hover();
    await page.mouse.up();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Watch Our Story')).toBeVisible();
    await expect(page.getByText('Video Player Placeholder')).toBeVisible();
  });

  test('should add Social Links component', async ({ page }) => {
    const button = page.locator('button', { hasText: 'Social Links' }).first();
    const canvas = page.locator('iframe, div[class*="Frame"]').first();

    await button.hover();
    await page.mouse.down();
    await canvas.hover();
    await page.mouse.up();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Connect With Us')).toBeVisible();
  });

  test('should delete component when Delete button is clicked', async ({ page }) => {
    const button = page.locator('button', { hasText: 'Pricing' }).first();
    const canvas = page.locator('iframe, div[class*="Frame"]').first();

    await button.hover();
    await page.mouse.down();
    await canvas.hover();
    await page.mouse.up();
    await page.waitForTimeout(1000);

    // Click on the component
    await page.getByText('Pricing Plans').click();
    await page.waitForTimeout(500);

    // Click delete button
    const deleteButton = page.getByRole('button', { name: /delete/i }).first();
    if (await deleteButton.isVisible()) {
      await deleteButton.click();
      await page.waitForTimeout(500);

      // Component should be gone
      await expect(page.getByText('Pricing Plans')).not.toBeVisible();
    }
  });
});

test.describe('Builder New Components QA - Mobile', () => {
  test.use({
    viewport: { width: 375, height: 667 },
    isMobile: true,
    hasTouch: true,
  });

  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log(`Mobile Browser [${msg.type()}]:`, msg.text()));

    await page.goto('http://localhost:3500/templates/product-fashion/builder');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('should display all new components on mobile', async ({ page }) => {
    // Open Components tab
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    // Check CONTENT category
    await expect(page.getByText('CONTENT', { exact: true })).toBeVisible();

    // Scroll to see all components
    await page.locator('div:has-text("Social Links")').scrollIntoViewIfNeeded();

    // Verify all new components are visible
    await expect(page.getByText('Pricing')).toBeVisible();
    await expect(page.getByText('Testimonials')).toBeVisible();
    await expect(page.getByText('Gallery')).toBeVisible();
    await expect(page.getByText('Call to Action')).toBeVisible();
    await expect(page.getByText('Timeline')).toBeVisible();
    await expect(page.getByText('FAQ')).toBeVisible();
    await expect(page.getByText('Video')).toBeVisible();
    await expect(page.getByText('Social Links')).toBeVisible();
  });

  test('should tap to add Pricing component on mobile', async ({ page }) => {
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    const pricingButton = page.locator('button', { hasText: 'Pricing' }).first();
    await pricingButton.tap();
    await page.waitForTimeout(1000);

    // Should switch to Canvas tab
    const canvasTab = page.getByRole('button', { name: /canvas/i });
    await expect(canvasTab).toHaveClass(/bg-blue-50/);

    // Component should be visible
    await expect(page.getByText('Pricing Plans')).toBeVisible();
  });

  test('should tap to add Testimonials on mobile', async ({ page }) => {
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    const button = page.locator('button', { hasText: 'Testimonials' }).first();
    await button.tap();
    await page.waitForTimeout(1000);

    await expect(page.getByText('What Clients Say')).toBeVisible();
  });

  test('should tap to add Gallery on mobile', async ({ page }) => {
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    const button = page.locator('button', { hasText: 'Gallery' }).first();
    await button.tap();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Gallery', { exact: true })).toBeVisible();
  });

  test('should tap to add CTA on mobile', async ({ page }) => {
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    const button = page.locator('button', { hasText: 'Call to Action' }).first();
    await button.tap();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Ready to Get Started?')).toBeVisible();
  });

  test('should tap to add Timeline on mobile', async ({ page }) => {
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    await page.locator('div:has-text("Timeline")').scrollIntoViewIfNeeded();
    const button = page.locator('button', { hasText: 'Timeline' }).first();
    await button.tap();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Our Journey')).toBeVisible();
  });

  test('should tap to add FAQ on mobile', async ({ page }) => {
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    await page.locator('div:has-text("FAQ")').scrollIntoViewIfNeeded();
    const button = page.locator('button', { hasText: 'FAQ' }).first();
    await button.tap();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Frequently Asked Questions')).toBeVisible();
  });

  test('should tap to add Video on mobile', async ({ page }) => {
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    await page.locator('div:has-text("Video")').scrollIntoViewIfNeeded();
    const button = page.locator('button', { hasText: 'Video' }).first();
    await button.tap();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Watch Our Story')).toBeVisible();
  });

  test('should tap to add Social Links on mobile', async ({ page }) => {
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    await page.locator('div:has-text("Social Links")').scrollIntoViewIfNeeded();
    const button = page.locator('button', { hasText: 'Social Links' }).first();
    await button.tap();
    await page.waitForTimeout(1000);

    await expect(page.getByText('Connect With Us')).toBeVisible();
  });

  test('should display components with proper mobile layout', async ({ page }) => {
    const componentsTab = page.getByRole('button', { name: /components/i });
    await componentsTab.click();
    await page.waitForTimeout(500);

    // Add a component
    const button = page.locator('button', { hasText: 'Pricing' }).first();
    await button.tap();
    await page.waitForTimeout(1000);

    // Check if Pricing is responsive on mobile
    const pricingSection = page.locator(':has-text("Pricing Plans")').first();
    const box = await pricingSection.boundingBox();

    // Should fit within mobile viewport width (375px)
    expect(box?.width).toBeLessThanOrEqual(375);
  });

  test('should add multiple components and all remain visible', async ({ page }) => {
    const componentsTab = page.getByRole('button', { name: /components/i });

    // Add Pricing
    await componentsTab.click();
    await page.locator('button', { hasText: 'Pricing' }).first().tap();
    await page.waitForTimeout(800);

    // Add Testimonials
    await componentsTab.click();
    await page.locator('button', { hasText: 'Testimonials' }).first().tap();
    await page.waitForTimeout(800);

    // Add CTA
    await componentsTab.click();
    await page.locator('button', { hasText: 'Call to Action' }).first().tap();
    await page.waitForTimeout(800);

    // Switch to Canvas and verify all are there
    const canvasTab = page.getByRole('button', { name: /canvas/i });
    await canvasTab.click();
    await page.waitForTimeout(500);

    await expect(page.getByText('Pricing Plans')).toBeVisible();
    await expect(page.getByText('What Clients Say')).toBeVisible();
    await expect(page.getByText('Ready to Get Started?')).toBeVisible();
  });
});

test.describe('Components Responsiveness Test', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test(`should render properly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3500/templates/product-fashion/builder');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Take screenshot
      await page.screenshot({
        path: `test-results/builder-${viewport.name.toLowerCase()}-new-components.png`,
        fullPage: true
      });

      // Verify builder loads without errors
      const errorMessages = await page.locator('text=/error|crash|fail/i').count();
      expect(errorMessages).toBe(0);
    });
  }
});
