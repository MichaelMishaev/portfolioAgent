const { chromium } = require('playwright');
const path = require('path');

async function captureTemplateScreenshots(templateId, numScreenshots = 3, language = 'en') {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  try {
    const langLabel = language === 'ru' ? ' (Russian)' : ' (English)';
    console.log(`📸 Capturing screenshots for ${templateId}${langLabel}...`);

    // Navigate to template demo page
    const url = `http://localhost:3500/templates/${templateId}/demo`;

    // Set language in localStorage before loading the page
    await page.goto(url);
    await page.evaluate((lang) => {
      localStorage.setItem('language', lang);
    }, language);

    // Reload with the language set
    await page.reload({ waitUntil: 'networkidle' });

    // Wait for page to fully load
    await page.waitForTimeout(2000);

    // Capture full page screenshots at different scroll positions
    const screenshotPath = path.join(__dirname, '..', 'public', 'screenshots');
    const langSuffix = language === 'ru' ? '-ru' : '';

    // Screenshot 1: Hero/Top section (viewport height)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `${screenshotPath}/${templateId}-1${langSuffix}.png`,
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    console.log(`✅ Screenshot 1 saved`);

    if (numScreenshots >= 2) {
      // Screenshot 2: Middle section
      const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      const scrollPosition = Math.min(pageHeight * 0.4, pageHeight - 1080);
      await page.evaluate((pos) => window.scrollTo(0, pos), scrollPosition);
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `${screenshotPath}/${templateId}-2${langSuffix}.png`,
        clip: { x: 0, y: 0, width: 1920, height: 1080 }
      });
      console.log(`✅ Screenshot 2 saved`);
    }

    if (numScreenshots >= 3) {
      // Screenshot 3: Bottom/CTA section
      const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      const scrollPosition = Math.max(pageHeight - 1080, 0);
      await page.evaluate((pos) => window.scrollTo(0, pos), scrollPosition);
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `${screenshotPath}/${templateId}-3${langSuffix}.png`,
        clip: { x: 0, y: 0, width: 1920, height: 1080 }
      });
      console.log(`✅ Screenshot 3 saved`);
    }

    console.log(`✨ All screenshots captured for ${templateId}!`);
  } catch (error) {
    console.error(`❌ Error capturing screenshots for ${templateId}:`, error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Main execution
const templateId = process.argv[2] || 'freelancer-creative';
const numScreenshots = parseInt(process.argv[3]) || 3;
const language = process.argv[4] || 'en';

captureTemplateScreenshots(templateId, numScreenshots, language)
  .then(() => {
    console.log('✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed:', error);
    process.exit(1);
  });
