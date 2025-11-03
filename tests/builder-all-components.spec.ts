import { test, expect, Page } from '@playwright/test';

/**
 * COMPREHENSIVE BUILDER TEST SUITE
 * Tests all components in the Split-Screen Builder
 *
 * Components tested:
 * 1. Split-Screen Hero (SplitScreenHero)
 * 2. Stats (SplitScreenStats)
 * 3. Skills (SplitScreenSkills)
 * 4. Contact (SplitScreenContact)
 * 5. Hero - Generic (HeroComponent)
 * 6. About (AboutComponent)
 * 7. Projects (ProjectsComponent)
 * 8. Gallery (GalleryComponent) - NEW
 */

const BUILDER_URL = 'http://localhost:3500/templates/split-screen/builder';
const TIMEOUT = 10000;

// Helper function to wait for builder to be ready
async function waitForBuilderReady(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Wait for components toolbox to be visible (use heading role to avoid mobile nav ambiguity)
  await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible({ timeout: TIMEOUT });
}

// Helper function to check if component button exists in toolbox
async function checkComponentInToolbox(page: Page, componentName: string, language: 'en' | 'ru' = 'en') {
  const button = page.locator('button').filter({ hasText: componentName });
  await expect(button.first()).toBeVisible({ timeout: TIMEOUT });
  return button.first();
}

// Helper function to add component to canvas (mobile tap method)
async function addComponentToCanvas(page: Page, componentName: string, isMobile: boolean = false) {
  const button = await checkComponentInToolbox(page, componentName);

  if (isMobile) {
    // Mobile: tap to add
    await button.tap();
  } else {
    // Desktop: click to add (builder has mobile-friendly click handlers)
    await button.click();
  }

  await page.waitForTimeout(1000);
}

// Helper function to select component on canvas
async function selectComponentOnCanvas(page: Page, textToFind: string) {
  const element = page.getByText(textToFind).first();
  await element.click();
  await page.waitForTimeout(500);
}

// Helper function to check if settings panel is open
async function checkSettingsPanelOpen(page: Page, language: 'en' | 'ru' = 'en') {
  const settingsTitle = language === 'ru' ? 'Настройки' : 'Settings';
  // Use heading role to avoid mobile nav ambiguity
  await expect(page.getByRole('heading', { name: settingsTitle })).toBeVisible();
}

// Helper function to delete selected component
async function deleteSelectedComponent(page: Page, language: 'en' | 'ru' = 'en') {
  const deleteText = language === 'ru' ? 'Удалить компонент' : 'Delete Component';
  const deleteButton = page.getByRole('button', { name: deleteText });
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();
  await page.waitForTimeout(500);
}

test.describe('Split-Screen Builder - All Components Test Suite', () => {
  test.setTimeout(120000); // 2 minutes for comprehensive tests

  test.describe('Desktop - Component Addition and Deletion', () => {
    test.beforeEach(async ({ page }) => {
      // Track console errors
      page.on('console', msg => {
        if (msg.type() === 'error') {
          console.log('Browser Error:', msg.text());
        }
      });

      await page.goto(BUILDER_URL);
      await waitForBuilderReady(page);
    });

    test('should load builder without errors', async ({ page }) => {
      // Check that builder UI is present (use heading role to avoid mobile nav ambiguity)
      await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

      // Take screenshot for reference
      await page.screenshot({ path: 'test-results/builder-initial-load.png', fullPage: true });
    });

    test('should display all 8 component buttons in toolbox (EN)', async ({ page }) => {
      // Split-Screen category (4 components)
      await checkComponentInToolbox(page, 'Split Hero');
      await checkComponentInToolbox(page, 'Stats');
      await checkComponentInToolbox(page, 'Skills');
      await checkComponentInToolbox(page, 'Contact');

      // Generic category (3 components)
      await checkComponentInToolbox(page, 'Hero');
      await checkComponentInToolbox(page, 'About');
      await checkComponentInToolbox(page, 'Projects');

      // Content category (includes Gallery)
      await checkComponentInToolbox(page, 'Gallery');
    });

    test('Component 1: Split Hero - add, select, settings, delete', async ({ page }) => {
      // Add Split Hero
      await addComponentToCanvas(page, 'Split Hero');

      // Verify component appears on canvas
      await expect(page.getByText('David Kim')).toBeVisible();
      await expect(page.getByText('Digital Designer')).toBeVisible();

      // Select component
      await selectComponentOnCanvas(page, 'David Kim');

      // Verify settings panel opens
      await checkSettingsPanelOpen(page);
      await expect(page.getByText('Split-Screen Hero')).toBeVisible();

      // Verify component has blue selection border
      const heroSection = page.locator('section').filter({ hasText: 'David Kim' }).first();
      await expect(heroSection).toHaveClass(/ring-2 ring-blue-500/);

      // Delete component
      await deleteSelectedComponent(page);

      // Verify component is removed
      await expect(page.getByText('David Kim')).not.toBeVisible();
    });

    test('Component 2: Stats - add, select, settings, delete', async ({ page }) => {
      // Add Stats
      await addComponentToCanvas(page, 'Stats');

      // Verify component appears
      await expect(page.getByText('150+')).toBeVisible();
      await expect(page.getByText('Projects Completed')).toBeVisible();
      await expect(page.getByText('50+')).toBeVisible();
      await expect(page.getByText('Happy Clients')).toBeVisible();

      // Select component
      await selectComponentOnCanvas(page, 'Projects Completed');

      // Verify settings panel
      await checkSettingsPanelOpen(page);
      await expect(page.getByText('Stats Section')).toBeVisible();

      // Delete component
      await deleteSelectedComponent(page);

      // Verify removal
      await expect(page.getByText('Projects Completed')).not.toBeVisible();
    });

    test('Component 3: Skills - add, select, settings, delete', async ({ page }) => {
      // Add Skills
      await addComponentToCanvas(page, 'Skills');

      // Verify component appears
      await expect(page.getByText('Skills & Expertise')).toBeVisible();
      await expect(page.getByText('UI/UX Design')).toBeVisible();
      await expect(page.getByText('Prototyping')).toBeVisible();

      // Select component
      await selectComponentOnCanvas(page, 'Skills & Expertise');

      // Verify settings panel
      await checkSettingsPanelOpen(page);
      await expect(page.getByText('Skills Section')).toBeVisible();

      // Delete component
      await deleteSelectedComponent(page);

      // Verify removal
      await expect(page.getByText('UI/UX Design')).not.toBeVisible();
    });

    test('Component 4: Contact - add, select, settings, delete', async ({ page }) => {
      // Add Contact
      await addComponentToCanvas(page, 'Contact');

      // Verify component appears
      await expect(page.getByText("Let's Work Together")).toBeVisible();
      await expect(page.getByText('hello@davidkim.com')).toBeVisible();

      // Select component
      await selectComponentOnCanvas(page, "Let's Work Together");

      // Verify settings panel
      await checkSettingsPanelOpen(page);
      await expect(page.getByText('Contact Section')).toBeVisible();

      // Delete component
      await deleteSelectedComponent(page);

      // Verify removal
      await expect(page.getByText('hello@davidkim.com')).not.toBeVisible();
    });

    test('Component 5: Hero (Generic) - add, select, settings, delete', async ({ page }) => {
      // Add Hero
      await addComponentToCanvas(page, 'Hero');

      // Verify component appears
      await expect(page.getByText('John Doe')).toBeVisible();
      await expect(page.getByText('Full Stack Developer & Designer')).toBeVisible();

      // Select component
      await selectComponentOnCanvas(page, 'John Doe');

      // Verify settings panel
      await checkSettingsPanelOpen(page);
      await expect(page.getByText('Hero', { exact: true })).toBeVisible();

      // Delete component
      await deleteSelectedComponent(page);

      // Verify removal
      await expect(page.getByText('Full Stack Developer & Designer')).not.toBeVisible();
    });

    test('Component 6: About - add, select, settings, delete', async ({ page }) => {
      // Add About
      await addComponentToCanvas(page, 'About');

      // Verify component appears
      await expect(page.getByText('About Me')).toBeVisible();
      await expect(page.getByText(/passionate developer/i)).toBeVisible();

      // Select component
      await selectComponentOnCanvas(page, 'About Me');

      // Verify settings panel
      await checkSettingsPanelOpen(page);
      await expect(page.getByText('About', { exact: true })).toBeVisible();

      // Delete component
      await deleteSelectedComponent(page);

      // Verify removal
      await expect(page.getByText(/passionate developer/i)).not.toBeVisible();
    });

    test('Component 7: Projects - add, select, settings, delete', async ({ page }) => {
      // Add Projects
      await addComponentToCanvas(page, 'Projects');

      // Verify component appears
      await expect(page.getByText('My Projects')).toBeVisible();
      await expect(page.getByText('E-Commerce Platform')).toBeVisible();

      // Select component
      await selectComponentOnCanvas(page, 'My Projects');

      // Verify settings panel
      await checkSettingsPanelOpen(page);
      await expect(page.getByText('Projects', { exact: true })).toBeVisible();

      // Delete component
      await deleteSelectedComponent(page);

      // Verify removal
      await expect(page.getByText('E-Commerce Platform')).not.toBeVisible();
    });

    test('Component 8: Gallery (NEW) - add, select, settings, delete', async ({ page }) => {
      // Add Gallery
      await addComponentToCanvas(page, 'Gallery');

      // Verify component appears
      await expect(page.getByText('Gallery', { exact: true })).toBeVisible();
      await expect(page.getByText('Project 1')).toBeVisible();
      await expect(page.getByText('Project 2')).toBeVisible();

      // Verify ImageIcon placeholders are rendered (no error)
      const imageIcons = page.locator('svg[class*="lucide-image"]');
      const iconCount = await imageIcons.count();
      expect(iconCount).toBeGreaterThan(0);

      // Select component
      await selectComponentOnCanvas(page, 'Project 1');

      // Verify settings panel opens
      await checkSettingsPanelOpen(page);

      // Take screenshot of Gallery component
      await page.screenshot({ path: 'test-results/gallery-component.png', fullPage: true });

      // Delete component
      await deleteSelectedComponent(page);

      // Verify removal
      await expect(page.getByText('Project 1')).not.toBeVisible();
    });

    test('Gallery component - verify grid layout and ImageIcon rendering', async ({ page }) => {
      // Add Gallery
      await addComponentToCanvas(page, 'Gallery');

      // Verify grid layout
      const gridContainer = page.locator('.grid').filter({ hasText: 'Project 1' });
      await expect(gridContainer).toBeVisible();

      // Verify all 6 project placeholders
      for (let i = 1; i <= 6; i++) {
        await expect(page.getByText(`Project ${i}`)).toBeVisible();
      }

      // Verify ImageIcon components render without errors
      const imagePlaceholders = page.locator('.bg-gray-200').filter({ has: page.locator('svg') });
      const count = await imagePlaceholders.count();
      expect(count).toBeGreaterThanOrEqual(6);

      // Check aspect-square class for proper sizing
      const aspectSquare = page.locator('.aspect-square').first();
      await expect(aspectSquare).toBeVisible();
    });

    test('should add multiple components and all remain on canvas', async ({ page }) => {
      // Add multiple components
      await addComponentToCanvas(page, 'Split Hero');
      await page.waitForTimeout(500);

      await addComponentToCanvas(page, 'Stats');
      await page.waitForTimeout(500);

      await addComponentToCanvas(page, 'Gallery');
      await page.waitForTimeout(500);

      await addComponentToCanvas(page, 'Contact');
      await page.waitForTimeout(500);

      // Verify all components are visible
      await expect(page.getByText('David Kim')).toBeVisible();
      await expect(page.getByText('150+')).toBeVisible();
      await expect(page.getByText('Project 1')).toBeVisible();
      await expect(page.getByText("Let's Work Together")).toBeVisible();

      // Take screenshot
      await page.screenshot({ path: 'test-results/multiple-components.png', fullPage: true });
    });
  });

  test.describe('Language Switching Tests', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BUILDER_URL);
      await waitForBuilderReady(page);
    });

    test('should switch from EN to RU and display Russian labels', async ({ page }) => {
      // Find language toggle button
      const languageButton = page.getByRole('button', { name: /🇷🇺|RU|Russian/i });

      if (await languageButton.isVisible()) {
        await languageButton.click();
        await page.waitForTimeout(1000);

        // Verify Russian labels in toolbox
        await expect(page.getByText('Компоненты')).toBeVisible();
        await expect(page.getByText('Главный баннер')).toBeVisible();
        await expect(page.getByText('Статистика')).toBeVisible();
        await expect(page.getByText('Галерея')).toBeVisible();
      } else {
        console.log('Language toggle not found - skipping language test');
      }
    });

    test('should maintain components on canvas after language switch', async ({ page }) => {
      // Add components in English
      await addComponentToCanvas(page, 'Split Hero');
      await page.waitForTimeout(500);
      await addComponentToCanvas(page, 'Gallery');
      await page.waitForTimeout(500);

      // Verify components exist
      await expect(page.getByText('David Kim')).toBeVisible();
      await expect(page.getByText('Project 1')).toBeVisible();

      // Switch language if toggle exists
      const languageButton = page.getByRole('button', { name: /🇷🇺|RU|Russian/i });

      if (await languageButton.isVisible()) {
        await languageButton.click();
        await page.waitForTimeout(1000);

        // Components should still be on canvas
        await expect(page.getByText('David Kim')).toBeVisible();
        await expect(page.getByText('Project 1')).toBeVisible();
      }
    });

    test('should not produce console errors during language switch', async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // Add a component
      await addComponentToCanvas(page, 'Gallery');
      await page.waitForTimeout(500);

      // Switch language if available
      const languageButton = page.getByRole('button', { name: /🇷🇺|RU|Russian/i });

      if (await languageButton.isVisible()) {
        await languageButton.click();
        await page.waitForTimeout(1000);

        // Check for errors
        const relevantErrors = consoleErrors.filter(err =>
          !err.includes('favicon') &&
          !err.includes('WebSocket') &&
          !err.includes('net::ERR')
        );

        expect(relevantErrors.length).toBe(0);
      }
    });
  });

  test.describe('Mobile Viewport Tests', () => {
    test.use({
      viewport: { width: 375, height: 667 },
      isMobile: true,
      hasTouch: true,
    });

    test.beforeEach(async ({ page }) => {
      await page.goto(BUILDER_URL);
      await waitForBuilderReady(page);
    });

    test('should display all components in mobile toolbox', async ({ page }) => {
      // Check if mobile tabs exist
      const componentsTab = page.getByRole('button', { name: /components|компоненты/i });

      if (await componentsTab.isVisible()) {
        await componentsTab.click();
        await page.waitForTimeout(500);
      }

      // Verify components are visible on mobile
      await checkComponentInToolbox(page, 'Split Hero');
      await checkComponentInToolbox(page, 'Stats');
      await checkComponentInToolbox(page, 'Skills');
      await checkComponentInToolbox(page, 'Gallery');
    });

    test('should add Gallery component on mobile via tap', async ({ page }) => {
      // Check for mobile tabs
      const componentsTab = page.getByRole('button', { name: /components|компоненты/i });

      if (await componentsTab.isVisible()) {
        await componentsTab.click();
        await page.waitForTimeout(500);
      }

      // Scroll to Gallery if needed
      await page.locator('div:has-text("Gallery")').scrollIntoViewIfNeeded();

      // Tap Gallery button
      const galleryButton = page.locator('button').filter({ hasText: 'Gallery' }).first();
      await galleryButton.tap();
      await page.waitForTimeout(1000);

      // Verify Gallery appears
      await expect(page.getByText('Project 1')).toBeVisible();
    });

    test('should add multiple components on mobile', async ({ page }) => {
      const componentsTab = page.getByRole('button', { name: /components|компоненты/i });

      if (await componentsTab.isVisible()) {
        // Add Split Hero
        await componentsTab.click();
        await page.waitForTimeout(300);
        const heroButton = page.locator('button').filter({ hasText: 'Split Hero' }).first();
        await heroButton.tap();
        await page.waitForTimeout(800);

        // Add Gallery
        await componentsTab.click();
        await page.waitForTimeout(300);
        const galleryButton = page.locator('button').filter({ hasText: 'Gallery' }).first();
        await galleryButton.tap();
        await page.waitForTimeout(800);

        // Switch to canvas tab
        const canvasTab = page.getByRole('button', { name: /canvas/i });
        if (await canvasTab.isVisible()) {
          await canvasTab.click();
          await page.waitForTimeout(500);
        }

        // Verify both components are present
        await expect(page.getByText('David Kim')).toBeVisible();
        await expect(page.getByText('Project 1')).toBeVisible();
      }
    });
  });

  test.describe('Gallery Component Settings Panel', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BUILDER_URL);
      await waitForBuilderReady(page);
    });

    test('should open settings panel when Gallery is selected', async ({ page }) => {
      // Add Gallery
      await addComponentToCanvas(page, 'Gallery');

      // Select Gallery component
      await selectComponentOnCanvas(page, 'Project 1');

      // Verify settings panel opens
      await checkSettingsPanelOpen(page);

      // Verify Gallery-specific settings might be present
      // (The actual settings depend on GallerySettings component implementation)
      const settingsPanel = page.locator('.bg-white.border-l');
      await expect(settingsPanel).toBeVisible();
    });

    test('should allow Gallery deletion from settings panel', async ({ page }) => {
      // Add Gallery
      await addComponentToCanvas(page, 'Gallery');

      // Select Gallery
      await selectComponentOnCanvas(page, 'Project 1');

      // Delete from settings panel
      await deleteSelectedComponent(page);

      // Verify Gallery is removed
      await expect(page.getByText('Project 1')).not.toBeVisible();
    });
  });

  test.describe('Integration and Error Handling', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BUILDER_URL);
      await waitForBuilderReady(page);
    });

    test('should not show ImageIcon errors in console when Gallery is added', async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // Add Gallery component
      await addComponentToCanvas(page, 'Gallery');
      await page.waitForTimeout(1000);

      // Filter out non-relevant errors
      const relevantErrors = consoleErrors.filter(err =>
        err.toLowerCase().includes('imageicon') ||
        err.toLowerCase().includes('gallery') ||
        err.toLowerCase().includes('undefined')
      );

      // Should have no Gallery-related errors
      expect(relevantErrors.length).toBe(0);
    });

    test('should handle rapid component additions without crashing', async ({ page }) => {
      // Rapidly add multiple components
      const components = ['Split Hero', 'Stats', 'Skills', 'Gallery', 'Contact'];

      for (const component of components) {
        await addComponentToCanvas(page, component);
        await page.waitForTimeout(300);
      }

      // Verify all components are present
      await expect(page.getByText('David Kim')).toBeVisible();
      await expect(page.getByText('150+')).toBeVisible();
      await expect(page.getByText('UI/UX Design')).toBeVisible();
      await expect(page.getByText('Project 1')).toBeVisible();
      await expect(page.getByText("Let's Work Together")).toBeVisible();
    });

    test('should maintain canvas state after multiple deletions', async ({ page }) => {
      // Add three components
      await addComponentToCanvas(page, 'Split Hero');
      await page.waitForTimeout(500);
      await addComponentToCanvas(page, 'Gallery');
      await page.waitForTimeout(500);
      await addComponentToCanvas(page, 'Stats');
      await page.waitForTimeout(500);

      // Delete middle component (Gallery)
      await selectComponentOnCanvas(page, 'Project 1');
      await deleteSelectedComponent(page);

      // Verify other components still exist
      await expect(page.getByText('David Kim')).toBeVisible();
      await expect(page.getByText('150+')).toBeVisible();
      await expect(page.getByText('Project 1')).not.toBeVisible();
    });

    test('should render Gallery grid with correct column layout', async ({ page }) => {
      // Add Gallery
      await addComponentToCanvas(page, 'Gallery');
      await page.waitForTimeout(1000);

      // Check grid class (default is 3 columns)
      const gridContainer = page.locator('.grid').filter({ hasText: 'Project 1' });
      await expect(gridContainer).toBeVisible();

      // Verify grid has responsive classes
      const hasResponsiveGrid = await gridContainer.evaluate(el => {
        const classes = el.className;
        return classes.includes('md:grid-cols') || classes.includes('lg:grid-cols');
      });

      expect(hasResponsiveGrid).toBe(true);
    });
  });

  test.describe('Comprehensive End-to-End Workflow', () => {
    test('should complete full workflow: add all 8 components, interact with each, delete all', async ({ page }) => {
      await page.goto(BUILDER_URL);
      await waitForBuilderReady(page);

      const componentsToTest = [
        { name: 'Split Hero', verifyText: 'David Kim' },
        { name: 'Stats', verifyText: '150+' },
        { name: 'Skills', verifyText: 'UI/UX Design' },
        { name: 'Contact', verifyText: "Let's Work Together" },
        { name: 'Hero', verifyText: 'John Doe' },
        { name: 'About', verifyText: 'About Me' },
        { name: 'Projects', verifyText: 'E-Commerce Platform' },
        { name: 'Gallery', verifyText: 'Project 1' },
      ];

      // Add all components
      for (const component of componentsToTest) {
        await addComponentToCanvas(page, component.name);
        await page.waitForTimeout(500);
        await expect(page.getByText(component.verifyText)).toBeVisible();
      }

      // Take full screenshot
      await page.screenshot({ path: 'test-results/all-components-added.png', fullPage: true });

      // Select and verify each component
      for (const component of componentsToTest) {
        await selectComponentOnCanvas(page, component.verifyText);
        await checkSettingsPanelOpen(page);
        await page.waitForTimeout(300);
      }

      // Delete all components in reverse order
      for (const component of componentsToTest.reverse()) {
        const element = page.getByText(component.verifyText).first();
        if (await element.isVisible()) {
          await element.click();
          await page.waitForTimeout(300);
          await deleteSelectedComponent(page);
          await page.waitForTimeout(300);
        }
      }

      // Verify canvas is empty or shows empty state
      const emptyStateText = await page.getByText(/drag.*components|add components/i).isVisible()
        .catch(() => false);

      // If empty state is not visible, that's also OK - just verify none of the components exist
      for (const component of componentsToTest) {
        await expect(page.getByText(component.verifyText)).not.toBeVisible();
      }
    });
  });
});
