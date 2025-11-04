const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });

  // Local HTML file
  const page1 = await context.newPage();
  await page1.goto('file:///Users/michaelmishayev/Downloads/us.sitesucker.mac.sitesucker/agntix-next.vercel.appx/about-me-light.html');
  await page1.waitForTimeout(3000);

  // My replica
  const page2 = await context.newPage();
  await page2.goto('http://localhost:3500/about-me');
  await page2.waitForTimeout(3000);

  console.log('\n=== VISUAL COMPARISON ===\n');

  // Check if hands are visible on both
  const origVisible = await page1.evaluate(() => {
    const leftHand = document.querySelector('.pp-about-me-shape .shape-left');
    const rightHand = document.querySelector('.pp-about-me-shape .shape-right');
    const brandArea = document.querySelector('.pp-brand-area');

    const leftRect = leftHand?.getBoundingClientRect();
    const rightRect = rightHand?.getBoundingClientRect();
    const brandRect = brandArea?.getBoundingClientRect();

    return {
      leftHandVisible: leftHand && leftRect && leftRect.width > 0 && leftRect.height > 0,
      rightHandVisible: rightHand && rightRect && rightRect.width > 0 && rightRect.height > 0,
      leftHandRect: leftRect,
      rightHandRect: rightRect,
      brandRect: brandRect,
      leftHandOffsetTop: leftHand?.offsetTop,
      rightHandOffsetTop: rightHand?.offsetTop
    };
  });

  const myVisible = await page2.evaluate(() => {
    const leftHand = document.querySelector('.pp-about-me-shape .shape-left');
    const rightHand = document.querySelector('.pp-about-me-shape .shape-right');
    const brandArea = document.querySelector('.pp-brand-area');

    const leftRect = leftHand?.getBoundingClientRect();
    const rightRect = rightHand?.getBoundingClientRect();
    const brandRect = brandArea?.getBoundingClientRect();

    return {
      leftHandVisible: leftHand && leftRect && leftRect.width > 0 && leftRect.height > 0,
      rightHandVisible: rightHand && rightRect && rightRect.width > 0 && rightRect.height > 0,
      leftHandRect: leftRect,
      rightHandRect: rightRect,
      brandRect: brandRect,
      leftHandOffsetTop: leftHand?.offsetTop,
      rightHandOffsetTop: rightHand?.offsetTop
    };
  });

  console.log('ORIGINAL (Local File):');
  console.log(JSON.stringify(origVisible, null, 2));
  console.log('\nMY REPLICA:');
  console.log(JSON.stringify(myVisible, null, 2));

  // Scroll to hands section
  await page1.evaluate(() => {
    document.querySelector('.pp-brand-area')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page2.evaluate(() => {
    document.querySelector('.pp-brand-area')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });

  await page1.waitForTimeout(1000);
  await page2.waitForTimeout(1000);

  // Take screenshots at same scroll position
  await page1.screenshot({
    path: '/Users/michaelmishayev/Desktop/Projects/portfolioWeb/original-hands-section.png',
    fullPage: false
  });
  await page2.screenshot({
    path: '/Users/michaelmishayev/Desktop/Projects/portfolioWeb/replica-hands-section.png',
    fullPage: false
  });

  console.log('\n=== Screenshots saved ===');
  console.log('Compare the hands visually in the screenshots');
  console.log('Keeping browsers open for 60 seconds...\n');

  await page1.waitForTimeout(60000);
  await browser.close();
})();
