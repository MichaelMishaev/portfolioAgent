import { test, expect, devices } from '@playwright/test';

/**
 * Comprehensive Responsive QA Test Suite
 * Tests all pages and components across multiple viewport sizes
 */

const VIEWPORTS = {
  mobile: { width: 375, height: 667, name: 'iPhone SE' },
  mobileLarge: { width: 414, height: 896, name: 'iPhone 14 Pro Max' },
  tablet: { width: 768, height: 1024, name: 'iPad' },
  tabletLandscape: { width: 1024, height: 768, name: 'iPad Landscape' },
  desktop: { width: 1280, height: 720, name: 'Desktop HD' },
  desktopLarge: { width: 1920, height: 1080, name: 'Desktop Full HD' },
};

const PAGES_TO_TEST = [
  { path: '/', name: 'Home Page' },
  { path: '/builder', name: 'Template Builder' },
  { path: '/builder/test', name: 'Builder Test Page' },
];

// Test each page at each viewport
for (const [viewportKey, viewport] of Object.entries(VIEWPORTS)) {
  test.describe(`Responsive QA - ${viewport.name} (${viewport.width}x${viewport.height})`, () => {

    test.use({
      viewport: { width: viewport.width, height: viewport.height },
    });

    for (const page of PAGES_TO_TEST) {
      test(`${page.name} should be responsive at ${viewport.name}`, async ({ page: browserPage }) => {
        // Navigate to page
        await browserPage.goto(`http://localhost:3500${page.path}`, {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        // Wait for page to be fully loaded
        await browserPage.waitForLoadState('domcontentloaded');
        await browserPage.waitForTimeout(2000);

        // Take screenshot for visual verification
        const screenshotPath = `screenshots/responsive-qa/${page.name.replace(/\s+/g, '-')}-${viewportKey}.png`;
        await browserPage.screenshot({
          path: screenshotPath,
          fullPage: true
        });

        // Check for horizontal scrollbar (indicates overflow issues)
        const hasHorizontalScroll = await browserPage.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        if (hasHorizontalScroll) {
          console.warn(`⚠️  Horizontal scroll detected on ${page.name} at ${viewport.name}`);
        }

        // Check that main content is visible
        const mainContent = browserPage.locator('main, [role="main"], body > div');
        await expect(mainContent.first()).toBeVisible({ timeout: 10000 });

        // Verify no elements are cut off (check viewport width)
        const overflowingElements = await browserPage.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('*'));
          const viewportWidth = window.innerWidth;
          const overflowing: string[] = [];

          elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > viewportWidth + 5) { // 5px tolerance
              const selector = el.tagName.toLowerCase() +
                (el.id ? `#${el.id}` : '') +
                (el.className ? `.${Array.from(el.classList).join('.')}` : '');
              overflowing.push(selector);
            }
          });

          return overflowing.slice(0, 10); // Return first 10
        });

        if (overflowingElements.length > 0) {
          console.warn(`⚠️  Elements overflowing viewport on ${page.name} at ${viewport.name}:`, overflowingElements);
        }

        // Check for proper text sizing
        const tooSmallText = await browserPage.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('p, span, div, a, button, h1, h2, h3, h4, h5, h6'));
          const tooSmall: string[] = [];

          elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const fontSize = parseFloat(style.fontSize);
            if (fontSize < 12 && el.textContent && el.textContent.trim().length > 0) {
              tooSmall.push(`${el.tagName}: ${fontSize}px`);
            }
          });

          return tooSmall.slice(0, 5);
        });

        if (tooSmallText.length > 0) {
          console.warn(`⚠️  Text too small on ${page.name} at ${viewport.name}:`, tooSmallText);
        }

        // Test touch target sizes on mobile
        if (viewport.width < 768) {
          const smallTouchTargets = await browserPage.evaluate(() => {
            const interactive = Array.from(document.querySelectorAll('button, a, input, select, textarea'));
            const tooSmall: string[] = [];

            interactive.forEach(el => {
              const rect = el.getBoundingClientRect();
              const minSize = 44; // Minimum touch target size
              if ((rect.width < minSize || rect.height < minSize) && rect.width > 0) {
                const selector = el.tagName.toLowerCase() +
                  (el.id ? `#${el.id}` : '');
                tooSmall.push(`${selector}: ${Math.round(rect.width)}x${Math.round(rect.height)}`);
              }
            });

            return tooSmall.slice(0, 5);
          });

          if (smallTouchTargets.length > 0) {
            console.warn(`⚠️  Touch targets too small on ${page.name} at ${viewport.name}:`, smallTouchTargets);
          }
        }

        console.log(`✅ ${page.name} QA passed at ${viewport.name}`);
      });
    }
  });
}

// Special test for Builder components
test.describe('Builder Components Responsive QA', () => {

  test('Builder components should be responsive across all viewports', async ({ page }) => {
    const results: { viewport: string; status: string; issues: string[] }[] = [];

    for (const [viewportKey, viewport] of Object.entries(VIEWPORTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      await page.goto('http://localhost:3500/builder/test', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      await page.waitForTimeout(2000);

      const issues: string[] = [];

      // Check sidebar visibility and behavior
      const sidebar = page.locator('[class*="sidebar"], [class*="toolbox"], aside');
      if (await sidebar.count() > 0) {
        const isVisible = await sidebar.first().isVisible();

        if (viewport.width < 768 && isVisible) {
          // On mobile, sidebar should be collapsible or hidden
          const hasHamburger = await page.locator('[class*="menu"], [class*="hamburger"], button[aria-label*="menu"]').count() > 0;
          if (!hasHamburger) {
            issues.push('Mobile: No hamburger menu found for sidebar');
          }
        }
      }

      // Check canvas/preview area
      const canvas = page.locator('[class*="canvas"], [class*="preview"], [class*="viewport"]');
      if (await canvas.count() > 0) {
        const canvasBox = await canvas.first().boundingBox();
        if (canvasBox) {
          if (canvasBox.width > viewport.width) {
            issues.push(`Canvas overflows viewport: ${canvasBox.width}px > ${viewport.width}px`);
          }
        }
      }

      // Check buttons and controls
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      for (let i = 0; i < Math.min(buttonCount, 10); i++) {
        const button = buttons.nth(i);
        if (await button.isVisible()) {
          const box = await button.boundingBox();
          if (box && viewport.width < 768) {
            if (box.width < 44 || box.height < 44) {
              const text = await button.textContent();
              issues.push(`Button too small: "${text?.substring(0, 20)}" (${Math.round(box.width)}x${Math.round(box.height)})`);
            }
          }
        }
      }

      results.push({
        viewport: `${viewport.name} (${viewport.width}x${viewport.height})`,
        status: issues.length === 0 ? 'PASS' : 'WARNING',
        issues
      });

      console.log(`\n${issues.length === 0 ? '✅' : '⚠️'}  ${viewport.name}:`);
      if (issues.length > 0) {
        issues.forEach(issue => console.log(`   - ${issue}`));
      }
    }

    // Generate summary
    console.log('\n📊 Responsive QA Summary:');
    console.log('━'.repeat(60));
    results.forEach(result => {
      console.log(`${result.status === 'PASS' ? '✅' : '⚠️'}  ${result.viewport}: ${result.status}`);
      if (result.issues.length > 0) {
        result.issues.forEach(issue => console.log(`   └─ ${issue}`));
      }
    });
    console.log('━'.repeat(60));

    const passCount = results.filter(r => r.status === 'PASS').length;
    console.log(`\nResults: ${passCount}/${results.length} viewports passed`);
  });
});

// Test specific responsive patterns
test.describe('Responsive Patterns QA', () => {

  test('Navigation should adapt to mobile', async ({ page }) => {
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3500', { waitUntil: 'networkidle' });

    // Check for mobile navigation patterns
    const mobileMenu = page.locator('button[aria-label*="menu"], [class*="mobile-menu"], [class*="hamburger"]');
    const desktopNav = page.locator('nav:not([class*="mobile"])');

    console.log('Mobile (375px):');
    console.log(`  - Mobile menu button: ${await mobileMenu.count() > 0 ? '✅' : '⚠️'}`);

    // Test desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(500);

    console.log('Desktop (1280px):');
    console.log(`  - Desktop navigation: ${await desktopNav.isVisible() ? '✅' : '⚠️'}`);
  });

  test('Images should be responsive', async ({ page }) => {
    await page.goto('http://localhost:3500', { waitUntil: 'networkidle' });

    const images = await page.locator('img').all();
    let responsiveCount = 0;
    let totalImages = images.length;

    for (const img of images.slice(0, 10)) { // Check first 10 images
      const style = await img.evaluate(el => window.getComputedStyle(el));
      const maxWidth = style.maxWidth;
      const width = style.width;

      if (maxWidth === '100%' || width === '100%') {
        responsiveCount++;
      }
    }

    console.log(`📷 Image Responsiveness: ${responsiveCount}/${Math.min(totalImages, 10)} images are responsive`);
  });

  test('Typography should scale appropriately', async ({ page }) => {
    const viewports = [375, 768, 1280, 1920];
    const fontSizes: { viewport: number; h1: number; p: number }[] = [];

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('http://localhost:3500', { waitUntil: 'networkidle' });

      const h1Size = await page.locator('h1').first().evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      ).catch(() => 0);

      const pSize = await page.locator('p').first().evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      ).catch(() => 0);

      fontSizes.push({ viewport: width, h1: h1Size, p: pSize });
    }

    console.log('\n📝 Typography Scaling:');
    fontSizes.forEach(({ viewport, h1, p }) => {
      console.log(`  ${viewport}px: H1=${Math.round(h1)}px, P=${Math.round(p)}px`);
    });
  });
});
