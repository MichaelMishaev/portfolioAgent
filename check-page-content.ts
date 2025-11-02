import { chromium } from 'playwright';

async function checkPageContent() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3500/templates/service-marketplace', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    await page.waitForTimeout(2000);

    const bodyText = await page.textContent('body');

    // Find all instances of "undefined"
    const undefinedMatches = bodyText?.match(/undefined/gi) || [];
    console.log(`\nFound ${undefinedMatches.length} instances of "undefined"`);

    // Find all instances of "tt."
    const ttMatches = bodyText?.match(/tt\.\w+/gi) || [];
    console.log(`Found ${ttMatches.length} instances of "tt."`);
    if (ttMatches.length > 0) {
      console.log('Examples:', ttMatches.slice(0, 5));
    }

    // Get the first 2000 characters to see what's rendering
    console.log('\n--- First 2000 chars of body text ---');
    console.log(bodyText?.slice(0, 2000));

    // Check navigation text
    const nav = await page.locator('nav').first().textContent();
    console.log('\n--- Navigation text ---');
    console.log(nav);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

checkPageContent().catch(console.error);
