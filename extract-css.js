const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://agntix-next.vercel.app/about-me-light');
  await page.waitForTimeout(2000);

  const css = await page.evaluate(() => {
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && (
            rule.selectorText.includes('.pp-about-me-shape') ||
            rule.selectorText.includes('.shape-left') ||
            rule.selectorText.includes('.shape-right')
          )) {
            rules.push(`${rule.selectorText} { ${rule.style.cssText} }`);
          }
        }
      } catch (e) {
        // CORS errors for external stylesheets
      }
    }
    return rules;
  });

  console.log('=== EXTRACTED CSS RULES ===\n');
  css.forEach(rule => console.log(rule + '\n'));

  await browser.close();
})();
