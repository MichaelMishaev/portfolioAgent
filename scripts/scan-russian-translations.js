const { chromium } = require('playwright');

// Common English words/phrases that should be translated
const englishPatterns = [
  // UI Elements
  'Select', 'Choose', 'View', 'Edit', 'Delete', 'Add', 'Create', 'Update',
  'Save', 'Cancel', 'Submit', 'Back', 'Next', 'Previous', 'Close', 'Open',
  'Show', 'Hide', 'Loading', 'Error', 'Success', 'Warning', 'Info',

  // Navigation
  'Home', 'About', 'Contact', 'Services', 'Products', 'Portfolio', 'Gallery',
  'Blog', 'News', 'FAQ', 'Help', 'Support', 'Login', 'Logout', 'Register',
  'Search', 'Filter', 'Sort', 'Templates', 'Customize', 'Preview', 'Buy',

  // Actions
  'Click here', 'Read more', 'Learn more', 'Get started', 'Download',
  'Share', 'Subscribe', 'Follow', 'Like', 'Comment', 'Reply',

  // Common phrases
  'Welcome', 'Thank you', 'Please', 'Try again', 'Continue', 'Finish',
  'Settings', 'Profile', 'Account', 'Dashboard', 'Notifications',

  // Template specific
  'Template', 'Builder', 'Layout', 'Theme', 'Style', 'Content',
  'Section', 'Component', 'Element', 'Widget', 'Block',

  // Descriptions
  'description', 'features', 'pricing', 'testimonials', 'clients',
  'team', 'contact us', 'get in touch', 'our story', 'mission',
];

// Pages to scan
const pagesToScan = [
  '/',
  '/about-me',
  '/checkout',
  '/thank-you',
  // We'll dynamically find template pages
];

async function scanPage(page, url) {
  console.log(`\n📄 Scanning: ${url}`);

  try {
    await page.goto(`http://localhost:3000${url}`, {
      waitUntil: 'networkidle',
      timeout: 10000
    });

    // Wait for content to load
    await page.waitForTimeout(2000);

    // Get all text content
    const textContent = await page.evaluate(() => {
      return document.body.innerText;
    });

    // Find English text
    const foundEnglish = [];

    for (const pattern of englishPatterns) {
      const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
      const matches = textContent.match(regex);
      if (matches && matches.length > 0) {
        foundEnglish.push(...matches);
      }
    }

    if (foundEnglish.length > 0) {
      console.log(`  ❌ Found untranslated English text:`);
      const unique = [...new Set(foundEnglish)];
      unique.forEach(text => console.log(`     - "${text}"`));
      return unique;
    } else {
      console.log(`  ✅ All text appears to be translated`);
      return [];
    }

  } catch (error) {
    console.log(`  ⚠️  Error scanning page: ${error.message}`);
    return [];
  }
}

async function main() {
  console.log('🔍 Starting Russian Translation Scanner...\n');
  console.log('This will scan all pages with Russian language selected\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Set Russian language
  await page.goto('http://localhost:3000');
  await page.evaluate(() => {
    localStorage.setItem('language', 'ru');
  });

  console.log('✅ Language set to Russian (ru)\n');
  console.log('=' .repeat(60));

  const allUntranslated = {};

  // Scan main pages
  for (const url of pagesToScan) {
    const untranslated = await scanPage(page, url);
    if (untranslated.length > 0) {
      allUntranslated[url] = untranslated;
    }
  }

  // Get list of templates
  console.log('\n🔍 Finding all template pages...\n');
  await page.goto('http://localhost:3000');

  const templateIds = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/templates/"]'));
    return links
      .map(link => link.getAttribute('href'))
      .filter(href => href && href.includes('/templates/'))
      .map(href => href.split('/templates/')[1]?.split('/')[0])
      .filter(id => id);
  });

  const uniqueTemplateIds = [...new Set(templateIds)];
  console.log(`Found ${uniqueTemplateIds.length} template pages\n`);

  // Scan template pages (first 10 to avoid too long scan)
  for (const templateId of uniqueTemplateIds.slice(0, 10)) {
    const url = `/templates/${templateId}`;
    const untranslated = await scanPage(page, url);
    if (untranslated.length > 0) {
      allUntranslated[url] = untranslated;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 SUMMARY\n');

  const totalPages = Object.keys(allUntranslated).length;
  if (totalPages === 0) {
    console.log('✅ All scanned pages have complete Russian translations!');
  } else {
    console.log(`❌ Found untranslated content on ${totalPages} pages:\n`);

    for (const [url, words] of Object.entries(allUntranslated)) {
      console.log(`\n${url}:`);
      words.forEach(word => console.log(`  - ${word}`));
    }

    // Collect all unique untranslated words
    const allWords = new Set();
    Object.values(allUntranslated).forEach(words => {
      words.forEach(word => allWords.add(word));
    });

    console.log(`\n\n📝 Unique untranslated words/phrases (${allWords.size}):`);
    Array.from(allWords).sort().forEach(word => {
      console.log(`  - "${word}"`);
    });
  }

  await browser.close();
  console.log('\n✅ Scan complete!');
}

main().catch(console.error);
