const { chromium } = require('playwright');
const fs = require('fs');

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

  console.log('\n========================================');
  console.log('DEEP COMPARISON OF HAND DECORATIONS');
  console.log('========================================\n');

  // Get comprehensive info from original
  console.log('=== ORIGINAL AGNTIX ===');
  const origInfo = await page1.evaluate(() => {
    const shapeContainer = document.querySelector('.pp-about-me-shape');
    const leftHand = document.querySelector('.pp-about-me-shape .shape-left');
    const rightHand = document.querySelector('.pp-about-me-shape .shape-right');
    const leftImg = leftHand?.querySelector('img');
    const rightImg = rightHand?.querySelector('img');
    const section = shapeContainer?.parentElement;

    return {
      shapeContainer: shapeContainer ? {
        position: window.getComputedStyle(shapeContainer).position,
        width: window.getComputedStyle(shapeContainer).width,
        height: window.getComputedStyle(shapeContainer).height,
        top: window.getComputedStyle(shapeContainer).top,
        left: window.getComputedStyle(shapeContainer).left,
        zIndex: window.getComputedStyle(shapeContainer).zIndex,
        overflow: window.getComputedStyle(shapeContainer).overflow,
        pointerEvents: window.getComputedStyle(shapeContainer).pointerEvents
      } : null,
      section: section ? {
        className: section.className,
        position: window.getComputedStyle(section).position,
        height: window.getComputedStyle(section).height,
        backgroundColor: window.getComputedStyle(section).backgroundColor,
        overflow: window.getComputedStyle(section).overflow
      } : null,
      leftHand: leftHand ? {
        boundingBox: leftHand.getBoundingClientRect(),
        computedStyle: {
          position: window.getComputedStyle(leftHand).position,
          left: window.getComputedStyle(leftHand).left,
          right: window.getComputedStyle(leftHand).right,
          top: window.getComputedStyle(leftHand).top,
          bottom: window.getComputedStyle(leftHand).bottom,
          width: window.getComputedStyle(leftHand).width,
          height: window.getComputedStyle(leftHand).height,
          transform: window.getComputedStyle(leftHand).transform,
          zIndex: window.getComputedStyle(leftHand).zIndex
        },
        visible: leftHand.offsetWidth > 0 && leftHand.offsetHeight > 0
      } : null,
      rightHand: rightHand ? {
        boundingBox: rightHand.getBoundingClientRect(),
        computedStyle: {
          position: window.getComputedStyle(rightHand).position,
          left: window.getComputedStyle(rightHand).left,
          right: window.getComputedStyle(rightHand).right,
          top: window.getComputedStyle(rightHand).top,
          bottom: window.getComputedStyle(rightHand).bottom,
          width: window.getComputedStyle(rightHand).width,
          height: window.getComputedStyle(rightHand).height,
          transform: window.getComputedStyle(rightHand).transform,
          zIndex: window.getComputedStyle(rightHand).zIndex
        },
        visible: rightHand.offsetWidth > 0 && rightHand.offsetHeight > 0
      } : null,
      leftImg: leftImg ? {
        naturalWidth: leftImg.naturalWidth,
        naturalHeight: leftImg.naturalHeight,
        displayWidth: leftImg.width,
        displayHeight: leftImg.height,
        src: leftImg.src,
        opacity: window.getComputedStyle(leftImg).opacity
      } : null,
      rightImg: rightImg ? {
        naturalWidth: rightImg.naturalWidth,
        naturalHeight: rightImg.naturalHeight,
        displayWidth: rightImg.width,
        displayHeight: rightImg.height,
        src: rightImg.src,
        opacity: window.getComputedStyle(rightImg).opacity
      } : null
    };
  });
  console.log(JSON.stringify(origInfo, null, 2));

  console.log('\n=== MY REPLICA ===');
  const myInfo = await page2.evaluate(() => {
    const shapeContainer = document.querySelector('.pp-about-me-shape');
    const leftHand = document.querySelector('.pp-about-me-shape .shape-left');
    const rightHand = document.querySelector('.pp-about-me-shape .shape-right');
    const leftImg = leftHand?.querySelector('img');
    const rightImg = rightHand?.querySelector('img');
    const section = shapeContainer?.parentElement;

    return {
      shapeContainer: shapeContainer ? {
        position: window.getComputedStyle(shapeContainer).position,
        width: window.getComputedStyle(shapeContainer).width,
        height: window.getComputedStyle(shapeContainer).height,
        top: window.getComputedStyle(shapeContainer).top,
        left: window.getComputedStyle(shapeContainer).left,
        zIndex: window.getComputedStyle(shapeContainer).zIndex,
        overflow: window.getComputedStyle(shapeContainer).overflow,
        pointerEvents: window.getComputedStyle(shapeContainer).pointerEvents
      } : null,
      section: section ? {
        className: section.className,
        position: window.getComputedStyle(section).position,
        height: window.getComputedStyle(section).height,
        backgroundColor: window.getComputedStyle(section).backgroundColor,
        overflow: window.getComputedStyle(section).overflow
      } : null,
      leftHand: leftHand ? {
        boundingBox: leftHand.getBoundingClientRect(),
        computedStyle: {
          position: window.getComputedStyle(leftHand).position,
          left: window.getComputedStyle(leftHand).left,
          right: window.getComputedStyle(leftHand).right,
          top: window.getComputedStyle(leftHand).top,
          bottom: window.getComputedStyle(leftHand).bottom,
          width: window.getComputedStyle(leftHand).width,
          height: window.getComputedStyle(leftHand).height,
          transform: window.getComputedStyle(leftHand).transform,
          zIndex: window.getComputedStyle(leftHand).zIndex
        },
        visible: leftHand.offsetWidth > 0 && leftHand.offsetHeight > 0
      } : null,
      rightHand: rightHand ? {
        boundingBox: rightHand.getBoundingClientRect(),
        computedStyle: {
          position: window.getComputedStyle(rightHand).position,
          left: window.getComputedStyle(rightHand).left,
          right: window.getComputedStyle(rightHand).right,
          top: window.getComputedStyle(rightHand).top,
          bottom: window.getComputedStyle(rightHand).bottom,
          width: window.getComputedStyle(rightHand).width,
          height: window.getComputedStyle(rightHand).height,
          transform: window.getComputedStyle(rightHand).transform,
          zIndex: window.getComputedStyle(rightHand).zIndex
        },
        visible: rightHand.offsetWidth > 0 && rightHand.offsetHeight > 0
      } : null,
      leftImg: leftImg ? {
        naturalWidth: leftImg.naturalWidth,
        naturalHeight: leftImg.naturalHeight,
        displayWidth: leftImg.width,
        displayHeight: leftImg.height,
        src: leftImg.src,
        opacity: window.getComputedStyle(leftImg).opacity
      } : null,
      rightImg: rightImg ? {
        naturalWidth: rightImg.naturalWidth,
        naturalHeight: rightImg.naturalHeight,
        displayWidth: rightImg.width,
        displayHeight: rightImg.height,
        src: rightImg.src,
        opacity: window.getComputedStyle(rightImg).opacity
      } : null
    };
  });
  console.log(JSON.stringify(myInfo, null, 2));

  // Screenshot comparison
  console.log('\n=== TAKING SCREENSHOTS ===');

  // Scroll to stats section
  await page1.evaluate(() => {
    document.querySelector('.pp-brand-area')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page1.waitForTimeout(500);
  await page1.screenshot({ path: '/Users/michaelmishayev/Desktop/Projects/portfolioWeb/original-hands.png' });

  await page2.evaluate(() => {
    document.querySelector('.stats-section')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page2.waitForTimeout(500);
  await page2.screenshot({ path: '/Users/michaelmishayev/Desktop/Projects/portfolioWeb/replica-hands.png' });

  console.log('Screenshots saved:');
  console.log('  - original-hands.png');
  console.log('  - replica-hands.png');

  console.log('\n=== DIFFERENCES FOUND ===');
  const differences = [];

  if (JSON.stringify(origInfo.shapeContainer) !== JSON.stringify(myInfo.shapeContainer)) {
    differences.push('Shape container styles differ');
  }
  if (origInfo.section?.className !== myInfo.section?.className) {
    differences.push(`Parent section class: ${origInfo.section?.className} vs ${myInfo.section?.className}`);
  }
  if (origInfo.leftHand?.visible !== myInfo.leftHand?.visible) {
    differences.push(`Left hand visibility: ${origInfo.leftHand?.visible} vs ${myInfo.leftHand?.visible}`);
  }
  if (origInfo.rightHand?.visible !== myInfo.rightHand?.visible) {
    differences.push(`Right hand visibility: ${origInfo.rightHand?.visible} vs ${myInfo.rightHand?.visible}`);
  }

  if (differences.length > 0) {
    differences.forEach(diff => console.log(`  ❌ ${diff}`));
  } else {
    console.log('  ✅ No major differences detected in structure');
  }

  console.log('\n=== KEEPING BROWSERS OPEN FOR 60s ===');
  console.log('Visually compare the two windows...\n');
  await page1.waitForTimeout(60000);

  await browser.close();
})();
