import { test, expect } from '@playwright/test';

const testTemplates = [
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'dark-mode', name: 'Dark Mode' },
];

test.describe('Comprehensive Builder Tests', () => {
  test.setTimeout(90000); // 90 seconds for comprehensive tests

  for (const template of testTemplates) {
    test.describe(`${template.name} Template`, () => {

      test('should load builder without console errors', async ({ page }) => {
        const consoleErrors: string[] = [];

        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        // Check that builder loaded
        await expect(page.getByText(`Building with: ${template.name}`)).toBeVisible({ timeout: 10000 });

        // Verify no React key errors
        const keyErrors = consoleErrors.filter(err =>
          err.includes('unique "key" prop') || err.includes('Each child in a list')
        );
        expect(keyErrors.length).toBe(0);
      });

      test('should have all header buttons', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Check Back to Gallery button
        const backButton = page.getByRole('link', { name: /Back to Gallery/i });
        await expect(backButton).toBeVisible();
        expect(await backButton.getAttribute('href')).toBe('/');

        // Check View Demo button
        const demoButton = page.getByRole('link', { name: /View Demo/i });
        await expect(demoButton).toBeVisible();
        expect(await demoButton.getAttribute('target')).toBe('_blank');

        // Check Export button
        const exportButton = page.getByRole('button', { name: /Export/i });
        await expect(exportButton).toBeVisible();
      });

      test('should have style customization panel', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Check for Colors section
        await expect(page.getByText('Colors', { exact: true })).toBeVisible();

        // Check for color pickers (Primary, Secondary, Accent, Text, Background)
        await expect(page.locator('label').filter({ hasText: 'Primary' })).toBeVisible();
        await expect(page.locator('label').filter({ hasText: 'Secondary' })).toBeVisible();
        await expect(page.locator('label').filter({ hasText: 'Accent' })).toBeVisible();
        await expect(page.locator('label').filter({ hasText: 'Text' })).toBeVisible();
        await expect(page.locator('label').filter({ hasText: 'Background' })).toBeVisible();

        // Check color inputs
        const colorInputs = page.locator('input[type="color"]');
        expect(await colorInputs.count()).toBeGreaterThanOrEqual(5);
      });

      test('should have typography section', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Check for Typography section
        await expect(page.getByText('Typography', { exact: true })).toBeVisible();

        // Check for font selectors
        await expect(page.locator('label').filter({ hasText: 'Heading Font' })).toBeVisible();
        await expect(page.locator('label').filter({ hasText: 'Body Font' })).toBeVisible();

        // Check font dropdowns
        const fontSelects = page.locator('select').filter({ hasText: /Inter|Roboto|Playfair|Montserrat/ });
        expect(await fontSelects.count()).toBeGreaterThanOrEqual(2);
      });

      test('should change primary color', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Find primary color input
        const primaryColorInput = page.locator('input[type="color"]').first();
        const originalColor = await primaryColorInput.inputValue();

        // Change color
        await primaryColorInput.fill('#ff0000');
        await page.waitForTimeout(500);

        const newColor = await primaryColorInput.inputValue();
        expect(newColor).toBe('#ff0000');
        expect(newColor).not.toBe(originalColor);
      });

      test('should change heading font', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Find heading font selector
        const headingFontSelect = page.locator('select').first();
        const originalFont = await headingFontSelect.inputValue();

        // Change font
        await headingFontSelect.selectOption('Playfair Display');
        await page.waitForTimeout(500);

        const newFont = await headingFontSelect.inputValue();
        expect(newFont).toBe('Playfair Display');
        expect(newFont).not.toBe(originalFont);
      });

      test('should have live preview section', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Check for Live Preview section
        await expect(page.getByText('Live Preview', { exact: true })).toBeVisible();

        // Check preview has sample text
        const previewBox = page.locator('.border-2').filter({ hasText: 'Sample Heading' });
        await expect(previewBox).toBeVisible();
      });

      test('should have Puck component panel', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        // Check for Puck's component list
        const componentPanel = page.locator('[class*="ComponentList"]').first();
        await expect(componentPanel).toBeVisible({ timeout: 10000 });
      });

      test('should have initial content sections', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        // Check for Hero section
        await expect(page.getByText('John Doe')).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('Full Stack Developer & Designer')).toBeVisible();

        // Check for About section
        await expect(page.getByText(/passionate developer/i)).toBeVisible();

        // Check for Projects section
        await expect(page.getByText('E-Commerce Platform')).toBeVisible();
        await expect(page.getByText('Analytics Dashboard')).toBeVisible();

        // Check for Skills section
        await expect(page.getByText('React')).toBeVisible();
        await expect(page.getByText('TypeScript')).toBeVisible();
      });

      test('should show drag handles on hover', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        // Find a section
        const heroSection = page.locator('text=John Doe').first().locator('..').locator('..');

        // Hover over section
        await heroSection.hover();
        await page.waitForTimeout(500);

        // Check for drag handle
        const dragHandle = page.locator('svg').filter({ has: page.locator('[class*="grip"]') }).first();
        // Drag handle should be visible or exist
        const handleCount = await dragHandle.count();
        expect(handleCount).toBeGreaterThan(0);
      });

      test('should export layout data', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Click Export button
        const exportButton = page.getByRole('button', { name: /Export/i });
        await exportButton.click();
        await page.waitForTimeout(500);

        // Check for download or console log (depending on implementation)
        // This test verifies the button is clickable
        await expect(exportButton).toBeEnabled();
      });

      test('should apply template-specific styling', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        // Check that content has background color (template styling applied)
        const heroSection = page.locator('text=John Doe').first();
        await expect(heroSection).toBeVisible({ timeout: 10000 });

        const container = heroSection.locator('..').locator('..');
        const bgColor = await container.evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        });

        // Should have a background color (not transparent)
        expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
        expect(bgColor).not.toBe('transparent');
      });

      test('should have split-screen layout', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Check for style panel on left (320px width)
        const stylePanel = page.locator('.w-80').filter({ hasText: 'Colors' });
        await expect(stylePanel).toBeVisible();

        // Check for Puck editor on right
        const puckEditor = page.locator('.flex-1').filter({ has: page.locator('[class*="Puck"]') });
        const puckCount = await puckEditor.count();
        expect(puckCount).toBeGreaterThan(0);
      });

      test('should navigate back to gallery', async ({ page }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Click Back to Gallery
        const backButton = page.getByRole('link', { name: /Back to Gallery/i });
        await backButton.click();

        // Should navigate to homepage
        await expect(page).toHaveURL('http://localhost:3500/', { timeout: 5000 });
      });

      test('should open demo in new tab', async ({ page, context }) => {
        await page.goto(`http://localhost:3500/templates/${template.id}/builder`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Get View Demo button
        const demoButton = page.getByRole('link', { name: /View Demo/i });
        const demoHref = await demoButton.getAttribute('href');

        // Verify it has target="_blank"
        const target = await demoButton.getAttribute('target');
        expect(target).toBe('_blank');

        // Verify href is valid
        expect(demoHref).toBeTruthy();
        expect(demoHref).toMatch(/^\/templates\/.+/);
      });
    });
  }

  test('Gallery: should have single Customize & Build button', async ({ page }) => {
    await page.goto('http://localhost:3500');
    await page.waitForLoadState('networkidle');

    // Get first template card
    const firstCard = page.locator('.group').first();

    // Should have Customize & Build button
    const customizeButton = firstCard.getByRole('link', { name: /Customize & Build/i });
    await expect(customizeButton).toBeVisible();

    // Should have gradient styling
    const buttonClass = await customizeButton.getAttribute('class');
    expect(buttonClass).toContain('bg-gradient-to-r');

    // Should NOT have old buttons (Build Layout, Style Preview separately)
    const buildLayoutButton = firstCard.getByRole('link', { name: /^Build Layout$/i });
    expect(await buildLayoutButton.count()).toBe(0);
  });

  test('Gallery: Customize & Build navigates to builder', async ({ page }) => {
    await page.goto('http://localhost:3500');
    await page.waitForLoadState('networkidle');

    // Click first Customize & Build button
    const firstButton = page.getByRole('link', { name: /Customize & Build/i }).first();
    await firstButton.click();

    // Should navigate to builder
    await expect(page).toHaveURL(/\/templates\/.+\/builder/, { timeout: 5000 });

    // Builder should load
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/Building with:/i)).toBeVisible({ timeout: 10000 });
  });
});
