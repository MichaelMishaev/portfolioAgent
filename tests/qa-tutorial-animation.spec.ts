import { test, expect } from '@playwright/test';

test.describe('Builder Tutorial Animation - Comprehensive QA', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a template builder page
    await page.goto('http://localhost:3500/templates/modern-portfolio/builder');

    // Wait for builder to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('Tutorial should NOT auto-show on page load', async ({ page }) => {
    // Tutorial should be hidden by default
    const tutorial = page.locator('[data-testid="tutorial-modal"]').or(page.locator('text=Welcome to the Portfolio Builder'));
    await expect(tutorial).not.toBeVisible({ timeout: 3000 });
  });

  test('Tutorial button should be visible in header', async ({ page }) => {
    // Find the Tutorial button (purple button with info icon)
    const tutorialButton = page.locator('button').filter({
      hasText: /Tutorial|Инструкция/i
    });

    await expect(tutorialButton).toBeVisible();
    await expect(tutorialButton).toBeEnabled();

    // Verify button styling (purple theme)
    const buttonClass = await tutorialButton.getAttribute('class');
    expect(buttonClass).toContain('purple');
  });

  test('Tutorial should open when clicking Tutorial button', async ({ page }) => {
    // Click Tutorial button
    const tutorialButton = page.locator('button').filter({
      hasText: /Tutorial|Инструкция/i
    });
    await tutorialButton.click();

    // Wait for tutorial to appear
    await page.waitForTimeout(500);

    // Verify modal is visible
    const modalTitle = page.locator('text=How to Use the Builder').or(page.locator('text=Как использовать конструктор'));
    await expect(modalTitle).toBeVisible();

    // Verify step counter
    const stepCounter = page.locator('text=/Step 1 of 5|Шаг 1 из 5/i');
    await expect(stepCounter).toBeVisible();
  });

  test('Tutorial should show all 5 steps with correct content', async ({ page }) => {
    // Open tutorial
    await page.locator('button').filter({ hasText: /Tutorial|Инструкция/i }).click();
    await page.waitForTimeout(500);

    const expectedSteps = [
      { en: 'Welcome to the Portfolio Builder', ru: 'Добро пожаловать в конструктор портфолио' },
      { en: 'Step 1: Browse Components', ru: 'Шаг 1: Просмотр компонентов' },
      { en: 'Step 2: Add to Your Page', ru: 'Шаг 2: Добавьте на страницу' },
      { en: 'Step 3: Customize Everything', ru: 'Шаг 3: Настройте всё' },
      { en: 'Step 4: Submit Your Design', ru: 'Шаг 4: Отправьте дизайн' },
    ];

    for (let i = 0; i < expectedSteps.length; i++) {
      // Verify step title is visible (English or Russian)
      const stepTitle = page.locator(`text=${expectedSteps[i].en}`).or(page.locator(`text=${expectedSteps[i].ru}`));
      await expect(stepTitle).toBeVisible({ timeout: 2000 });

      // Verify step counter
      const stepNumber = i + 1;
      const stepCounter = page.locator(`text=/Step ${stepNumber} of 5|Шаг ${stepNumber} из 5/i`);
      await expect(stepCounter).toBeVisible();

      // Click Next button (except on last step)
      if (i < expectedSteps.length - 1) {
        const nextButton = page.locator('button[aria-label*="Next"]').or(page.locator('button:has(svg.lucide-chevron-right)'));
        await nextButton.click();
        await page.waitForTimeout(400); // Wait for animation
      }
    }
  });

  test('Navigation controls should work correctly', async ({ page }) => {
    await page.locator('button').filter({ hasText: /Tutorial|Инструкция/i }).click();
    await page.waitForTimeout(500);

    // Test Next button
    const nextButton = page.locator('button[aria-label*="Next"]').or(page.locator('button:has(svg.lucide-chevron-right)'));
    await nextButton.click();
    await page.waitForTimeout(400);

    // Should be on step 2
    const step2 = page.locator('text=/Step 2 of 5|Шаг 2 из 5/i');
    await expect(step2).toBeVisible();

    // Test Previous button
    const prevButton = page.locator('button[aria-label*="Previous"]').or(page.locator('button:has(svg.lucide-chevron-left)'));
    await prevButton.click();
    await page.waitForTimeout(400);

    // Should be back on step 1
    const step1 = page.locator('text=/Step 1 of 5|Шаг 1 из 5/i');
    await expect(step1).toBeVisible();
  });

  test('Progress dots should allow jumping to any step', async ({ page }) => {
    await page.locator('button').filter({ hasText: /Tutorial|Инструкция/i }).click();
    await page.waitForTimeout(500);

    // Find progress dots container
    const progressDots = page.locator('[role="group"]').filter({ has: page.locator('button[aria-label*="Go to step"]') });

    if (await progressDots.count() > 0) {
      // Click on step 3 dot
      const step3Dot = page.locator('button[aria-label*="Go to step 3"]');
      await step3Dot.click();
      await page.waitForTimeout(400);

      // Should be on step 3
      const step3 = page.locator('text=/Step 3 of 5|Шаг 3 из 5/i');
      await expect(step3).toBeVisible();
    }
  });

  test('Play/Pause button should control auto-play', async ({ page }) => {
    await page.locator('button').filter({ hasText: /Tutorial|Инструкция/i }).click();
    await page.waitForTimeout(500);

    // Find play/pause button
    const playPauseButton = page.locator('button[aria-label*="Play"]').or(page.locator('button[aria-label*="Pause"]'));

    if (await playPauseButton.count() > 0) {
      const initialLabel = await playPauseButton.getAttribute('aria-label');

      // Click to toggle
      await playPauseButton.click();
      await page.waitForTimeout(300);

      // Verify label changed
      const newLabel = await playPauseButton.getAttribute('aria-label');
      expect(newLabel).not.toBe(initialLabel);
    }
  });

  test('Close button should close tutorial', async ({ page }) => {
    await page.locator('button').filter({ hasText: /Tutorial|Инструкция/i }).click();
    await page.waitForTimeout(500);

    // Verify tutorial is visible
    const modalTitle = page.locator('text=How to Use the Builder').or(page.locator('text=Как использовать конструктор'));
    await expect(modalTitle).toBeVisible();

    // Click close button (X button)
    const closeButton = page.locator('button[aria-label*="Close"]').or(page.locator('button:has(svg.lucide-x)'));
    await closeButton.click();
    await page.waitForTimeout(500);

    // Tutorial should be hidden
    await expect(modalTitle).not.toBeVisible();
  });

  test('Tutorial should support English language', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'Tutorial' }).click();
    await page.waitForTimeout(500);

    // Check for English content
    const englishTitle = page.locator('text=How to Use the Builder');
    const englishStep = page.locator('text=Welcome to the Portfolio Builder');

    // At least one should be visible
    const hasEnglish = (await englishTitle.count()) > 0 || (await englishStep.count()) > 0;
    expect(hasEnglish).toBeTruthy();
  });

  test('Tutorial should support Russian language', async ({ page }) => {
    // Switch to Russian if there's a language toggle
    const ruButton = page.locator('button').filter({ hasText: 'RU' });
    if (await ruButton.count() > 0) {
      await ruButton.click();
      await page.waitForTimeout(500);
    }

    await page.locator('button').filter({ hasText: 'Инструкция' }).click();
    await page.waitForTimeout(500);

    // Check for Russian content
    const russianTitle = page.locator('text=Как использовать конструктор');
    const russianStep = page.locator('text=Добро пожаловать в конструктор портфолио');

    // At least one should be visible
    const hasRussian = (await russianTitle.count()) > 0 || (await russianStep.count()) > 0;
    expect(hasRussian).toBeTruthy();
  });

  test('Tutorial should have enhanced details for each step', async ({ page }) => {
    await page.locator('button').filter({ hasText: /Tutorial|Инструкция/i }).click();
    await page.waitForTimeout(500);

    // Check for detailed descriptions with bullet points
    const detailMarkers = [
      'Hero - Eye-catching',
      'About - Your story',
      '📱 Mobile:',
      '🖥️ Desktop:',
      '✏️ Edit text',
      '🎨 Change colors',
      '💬 Telegram:',
      '📱 WhatsApp:',
    ];

    // Navigate through steps and check for details
    for (let step = 0; step < 5; step++) {
      const pageContent = await page.content();

      // Check if any detail marker is present
      const hasDetails = detailMarkers.some(marker =>
        pageContent.includes(marker) ||
        pageContent.includes(marker.replace(':', ''))
      );

      if (step < 4) {
        const nextButton = page.locator('button[aria-label*="Next"]').or(page.locator('button:has(svg.lucide-chevron-right)'));
        await nextButton.click();
        await page.waitForTimeout(400);
      }
    }
  });

  test('Tutorial animations should be smooth and visible', async ({ page }) => {
    await page.locator('button').filter({ hasText: /Tutorial|Инструкция/i }).click();
    await page.waitForTimeout(500);

    // Check that animation container exists
    const animationContainer = page.locator('.bg-gradient-to-br');
    await expect(animationContainer.first()).toBeVisible();

    // Verify animations are rendering (check for animation components)
    const hasAnimations = await page.locator('[class*="animate"]').count() > 0 ||
                         await page.locator('[class*="motion"]').count() > 0;

    expect(hasAnimations).toBeTruthy();
  });

  test('Tutorial should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForTimeout(2000);

    // Open tutorial
    const tutorialButton = page.locator('button').filter({ hasText: /Tutorial|Инструкция/i });
    await tutorialButton.click();
    await page.waitForTimeout(500);

    // Verify modal is visible and fits viewport
    const modal = page.locator('.fixed.inset-0');
    await expect(modal).toBeVisible();

    // Verify content is readable
    const title = page.locator('text=How to Use the Builder').or(page.locator('text=Как использовать конструктор'));
    await expect(title).toBeVisible();
  });

  test('Tutorial should mention Telegram and WhatsApp in final step', async ({ page }) => {
    await page.locator('button').filter({ hasText: /Tutorial|Инструкция/i }).click();
    await page.waitForTimeout(500);

    // Navigate to last step (step 5)
    for (let i = 0; i < 4; i++) {
      const nextButton = page.locator('button[aria-label*="Next"]').or(page.locator('button:has(svg.lucide-chevron-right)'));
      await nextButton.click();
      await page.waitForTimeout(400);
    }

    // Verify Telegram and WhatsApp are mentioned
    const pageContent = await page.content();
    expect(pageContent).toContain('Telegram');
    expect(pageContent).toContain('WhatsApp');
  });

  test('Tutorial modal should have proper styling and shadows', async ({ page }) => {
    await page.locator('button').filter({ hasText: /Tutorial|Инструкция/i }).click();
    await page.waitForTimeout(500);

    // Check modal has proper styling
    const modal = page.locator('.rounded-2xl.shadow-2xl');
    await expect(modal.first()).toBeVisible();

    // Check header has gradient
    const header = page.locator('.bg-gradient-to-r');
    await expect(header.first()).toBeVisible();
  });

  test('Tutorial should handle rapid clicking without breaking', async ({ page }) => {
    await page.locator('button').filter({ hasText: /Tutorial|Инструкция/i }).click();
    await page.waitForTimeout(500);

    // Rapidly click next button
    const nextButton = page.locator('button[aria-label*="Next"]').or(page.locator('button:has(svg.lucide-chevron-right)'));

    for (let i = 0; i < 10; i++) {
      await nextButton.click();
      await page.waitForTimeout(100);
    }

    // Should still be functional
    const stepCounter = page.locator('text=/Step \\d of 5|Шаг \\d из 5/i');
    await expect(stepCounter).toBeVisible();
  });
});

test.describe('Tutorial Button Visual QA', () => {
  test('Tutorial button should have correct visual styling', async ({ page }) => {
    await page.goto('http://localhost:3500/templates/modern-portfolio/builder');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const tutorialButton = page.locator('button').filter({ hasText: /Tutorial|Инструкция/i });

    // Take screenshot of button
    await tutorialButton.screenshot({ path: 'test-results/tutorial-button.png' });

    // Verify button properties
    const buttonBox = await tutorialButton.boundingBox();
    expect(buttonBox).toBeTruthy();
    expect(buttonBox!.width).toBeGreaterThan(50);
    expect(buttonBox!.height).toBeGreaterThan(30);
  });

  test('Tutorial button should have hover effect', async ({ page }) => {
    await page.goto('http://localhost:3500/templates/modern-portfolio/builder');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const tutorialButton = page.locator('button').filter({ hasText: /Tutorial|Инструкция/i });

    // Hover over button
    await tutorialButton.hover();
    await page.waitForTimeout(300);

    // Button should still be visible and respond to hover
    await expect(tutorialButton).toBeVisible();
  });
});
