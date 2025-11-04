const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });

  // Original page
  const page1 = await context.newPage();
  await page1.goto('https://agntix-next.vercel.app/about-me-light');
  await page1.waitForTimeout(3000);

  // My replica
  const page2 = await context.newPage();
  await page2.goto('http://localhost:3500/about-me');
  await page2.waitForTimeout(3000);

  // Get hand decoration info from both
  console.log('\n=== ORIGINAL AGNTIX PAGE ===');
  const origHandsInfo = await page1.evaluate(() => {
    const leftHand = document.querySelector('.pp-about-me-shape .shape-left');
    const rightHand = document.querySelector('.pp-about-me-shape .shape-right');
    const leftImg = leftHand?.querySelector('img');
    const rightImg = rightHand?.querySelector('img');

    return {
      leftHand: leftHand ? {
        position: window.getComputedStyle(leftHand).position,
        left: window.getComputedStyle(leftHand).left,
        right: window.getComputedStyle(leftHand).right,
        top: window.getComputedStyle(leftHand).top,
        bottom: window.getComputedStyle(leftHand).bottom,
        transform: window.getComputedStyle(leftHand).transform,
        zIndex: window.getComputedStyle(leftHand).zIndex,
        imgSrc: leftImg?.src || 'none',
        imgVisible: leftImg ? window.getComputedStyle(leftImg).visibility : 'none'
      } : null,
      rightHand: rightHand ? {
        position: window.getComputedStyle(rightHand).position,
        left: window.getComputedStyle(rightHand).left,
        right: window.getComputedStyle(rightHand).right,
        top: window.getComputedStyle(rightHand).top,
        bottom: window.getComputedStyle(rightHand).bottom,
        transform: window.getComputedStyle(rightHand).transform,
        zIndex: window.getComputedStyle(rightHand).zIndex,
        imgSrc: rightImg?.src || 'none',
        imgVisible: rightImg ? window.getComputedStyle(rightImg).visibility : 'none'
      } : null,
      parentSection: document.querySelector('.pp-about-me-shape')?.parentElement?.className || 'none'
    };
  });
  console.log(JSON.stringify(origHandsInfo, null, 2));

  console.log('\n=== MY REPLICA PAGE ===');
  const myHandsInfo = await page2.evaluate(() => {
    const leftHand = document.querySelector('.pp-about-me-shape .shape-left');
    const rightHand = document.querySelector('.pp-about-me-shape .shape-right');
    const leftImg = leftHand?.querySelector('img');
    const rightImg = rightHand?.querySelector('img');

    return {
      leftHand: leftHand ? {
        position: window.getComputedStyle(leftHand).position,
        left: window.getComputedStyle(leftHand).left,
        right: window.getComputedStyle(leftHand).right,
        top: window.getComputedStyle(leftHand).top,
        bottom: window.getComputedStyle(leftHand).bottom,
        transform: window.getComputedStyle(leftHand).transform,
        zIndex: window.getComputedStyle(leftHand).zIndex,
        imgSrc: leftImg?.src || 'none',
        imgVisible: leftImg ? window.getComputedStyle(leftImg).visibility : 'none'
      } : null,
      rightHand: rightHand ? {
        position: window.getComputedStyle(rightHand).position,
        left: window.getComputedStyle(rightHand).left,
        right: window.getComputedStyle(rightHand).right,
        top: window.getComputedStyle(rightHand).top,
        bottom: window.getComputedStyle(rightHand).bottom,
        transform: window.getComputedStyle(rightHand).transform,
        zIndex: window.getComputedStyle(rightHand).zIndex,
        imgSrc: rightImg?.src || 'none',
        imgVisible: rightImg ? window.getComputedStyle(rightImg).visibility : 'none'
      } : null,
      parentSection: document.querySelector('.pp-about-me-shape')?.parentElement?.className || 'none'
    };
  });
  console.log(JSON.stringify(myHandsInfo, null, 2));

  console.log('\n=== WAITING FOR MANUAL INSPECTION (30 seconds) ===');
  console.log('Compare the two browser windows side by side...\n');
  await page1.waitForTimeout(30000);

  await browser.close();
})();
