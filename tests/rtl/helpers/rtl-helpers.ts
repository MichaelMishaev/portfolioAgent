import { Page, expect } from '@playwright/test';

/**
 * Switch page to Hebrew language
 */
export async function switchToHebrew(page: Page) {
  // Click Hebrew button directly
  const hebrewButton = page.locator('[data-testid="language-he"]');
  await hebrewButton.click();

  // Wait for dir attribute to change to rtl
  await page.waitForFunction(() => {
    return document.documentElement.dir === 'rtl';
  }, { timeout: 5000 });

  // Additional wait for any animations
  await page.waitForTimeout(300);
}

/**
 * Verify page is in RTL mode
 */
export async function verifyRTL(page: Page) {
  const dir = await page.getAttribute('html', 'dir');
  expect(dir).toBe('rtl');

  const lang = await page.getAttribute('html', 'lang');
  expect(lang).toBe('he');
}

/**
 * Compare layout positions between LTR and RTL
 */
export async function compareLayoutPositions(
  ltrPositions: Record<string, { x: number; y: number; width: number }>,
  rtlPositions: Record<string, { x: number; y: number; width: number }>,
  page: Page
) {
  const viewportWidth = page.viewportSize()?.width || 1920;

  for (const selector in ltrPositions) {
    const ltr = ltrPositions[selector];
    const rtl = rtlPositions[selector];

    // Element should be mirrored horizontally
    // LTR left side = RTL right side
    const tolerance = 50;

    // Elements on left in LTR should be on right in RTL
    if (ltr.x < viewportWidth / 2) {
      expect(rtl.x).toBeGreaterThan(viewportWidth / 2 - tolerance);
    } else {
      expect(rtl.x).toBeLessThan(viewportWidth / 2 + tolerance);
    }
  }
}

/**
 * Wait for all animations to complete
 */
export async function waitForAnimations(page: Page) {
  await page.waitForLoadState('networkidle');

  // Wait for CSS animations
  await page.evaluate(() => {
    return Promise.all(
      document.getAnimations().map(animation => animation.finished)
    );
  });

  // Additional buffer
  await page.waitForTimeout(500);
}

/**
 * Check for horizontal scrollbars (indicates overflow)
 */
export async function checkNoHorizontalScroll(page: Page) {
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });

  expect(hasHorizontalScroll).toBe(false);
}

/**
 * Verify all images loaded
 */
export async function verifyImagesLoaded(page: Page) {
  const images = await page.locator('img').all();

  for (const img of images) {
    const isComplete = await img.evaluate((el: HTMLImageElement) => el.complete);
    expect(isComplete).toBe(true);
  }
}

/**
 * Get element's computed direction
 */
export async function getElementDirection(page: Page, selector: string) {
  return await page.locator(selector).evaluate(el =>
    window.getComputedStyle(el).direction
  );
}

/**
 * Verify Hebrew font is loaded
 */
export async function verifyHebrewFont(page: Page) {
  const fontFamily = await page.evaluate(() =>
    window.getComputedStyle(document.body).fontFamily
  );

  // Should include Rubik or Hebrew-compatible font
  expect(fontFamily.toLowerCase()).toMatch(/rubik|assistant|heebo|arial/);
}

/**
 * Take comparison screenshots
 */
export async function takeComparisonScreenshots(
  page: Page,
  templateId: string,
  viewport: { width: number; height: number }
) {
  const viewportName = viewport.width <= 768 ? 'mobile' : 'desktop';

  // LTR
  await page.goto(`/templates/${templateId}`);
  await page.setViewportSize(viewport);
  await waitForAnimations(page);
  await expect(page).toHaveScreenshot(`${templateId}-${viewportName}-ltr.png`, {
    fullPage: true,
  });

  // RTL
  await switchToHebrew(page);
  await waitForAnimations(page);
  await expect(page).toHaveScreenshot(`${templateId}-${viewportName}-rtl.png`, {
    fullPage: true,
  });
}
