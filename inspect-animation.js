// Playwright script to analyze hand decoration animations on original site
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Navigating to original Agntix site...');
  await page.goto('https://agntix-next.vercel.app/about-me-light');

  // Wait for page to load
  await page.waitForTimeout(3000);

  // Scroll to stats section where hands are visible
  console.log('Scrolling to stats section...');
  await page.evaluate(() => {
    const statsSection = document.querySelector('.pp-about-me-shape')?.parentElement?.parentElement;
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  await page.waitForTimeout(2000);

  console.log('\n=== Analyzing Hand Decoration Animations ===\n');

  // Find the hand decoration elements
  const handAnalysis = await page.evaluate(() => {
    // Find the decorative shapes container
    const shapesContainer = document.querySelector('.pp-about-me-shape');
    if (!shapesContainer) {
      return { error: 'Hand shapes container not found' };
    }

    const leftHand = shapesContainer.querySelector('.shape-left');
    const rightHand = shapesContainer.querySelector('.shape-right');

    if (!leftHand || !rightHand) {
      return { error: 'Hand elements not found' };
    }

    // Get computed styles
    const leftStyle = window.getComputedStyle(leftHand);
    const rightStyle = window.getComputedStyle(rightHand);

    // Get animation properties
    const leftAnimation = {
      animation: leftStyle.animation,
      animationName: leftStyle.animationName,
      animationDuration: leftStyle.animationDuration,
      animationTimingFunction: leftStyle.animationTimingFunction,
      animationDelay: leftStyle.animationDelay,
      animationIterationCount: leftStyle.animationIterationCount,
      animationDirection: leftStyle.animationDirection,
      transform: leftStyle.transform,
      transition: leftStyle.transition
    };

    const rightAnimation = {
      animation: rightStyle.animation,
      animationName: rightStyle.animationName,
      animationDuration: rightStyle.animationDuration,
      animationTimingFunction: rightStyle.animationTimingFunction,
      animationDelay: rightStyle.animationDelay,
      animationIterationCount: rightStyle.animationIterationCount,
      animationDirection: rightStyle.animationDirection,
      transform: rightStyle.transform,
      transition: rightStyle.transition
    };

    // Check for data attributes
    const leftDataSpeed = leftHand.getAttribute('data-speed');
    const rightDataSpeed = rightHand.getAttribute('data-speed');

    // Get position info
    const leftRect = leftHand.getBoundingClientRect();
    const rightRect = rightHand.getBoundingClientRect();

    return {
      left: {
        animation: leftAnimation,
        dataSpeed: leftDataSpeed,
        position: { top: leftRect.top, left: leftRect.left }
      },
      right: {
        animation: rightAnimation,
        dataSpeed: rightDataSpeed,
        position: { top: rightRect.top, left: rightRect.left }
      }
    };
  });

  console.log('Hand Animation Analysis:');
  console.log(JSON.stringify(handAnalysis, null, 2));

  // Record transform changes over time
  console.log('\n=== Monitoring Transform Changes Over 10 Seconds ===\n');

  const transformData = [];
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(500);

    const transforms = await page.evaluate(() => {
      const leftHand = document.querySelector('.pp-about-me-shape .shape-left');
      const rightHand = document.querySelector('.pp-about-me-shape .shape-right');

      if (!leftHand || !rightHand) return null;

      const leftStyle = window.getComputedStyle(leftHand);
      const rightStyle = window.getComputedStyle(rightHand);

      return {
        time: Date.now(),
        left: {
          transform: leftStyle.transform,
          translateX: leftStyle.transform.match(/matrix\(([\d\-., ]+)\)/)?.[1]?.split(', ')[4] || '0',
          translateY: leftStyle.transform.match(/matrix\(([\d\-., ]+)\)/)?.[1]?.split(', ')[5] || '0'
        },
        right: {
          transform: rightStyle.transform,
          translateX: rightStyle.transform.match(/matrix\(([\d\-., ]+)\)/)?.[1]?.split(', ')[4] || '0',
          translateY: rightStyle.transform.match(/matrix\(([\d\-., ]+)\)/)?.[1]?.split(', ')[5] || '0'
        }
      };
    });

    if (transforms) {
      transformData.push(transforms);
      console.log(`[${i * 0.5}s] Left: translateY=${transforms.left.translateY}px | Right: translateY=${transforms.right.translateY}px`);
    }
  }

  // Check if GSAP is being used
  console.log('\n=== Checking for GSAP ===\n');

  const gsapInfo = await page.evaluate(() => {
    if (typeof window.gsap !== 'undefined') {
      const leftHand = document.querySelector('.pp-about-me-shape .shape-left');
      const rightHand = document.querySelector('.pp-about-me-shape .shape-right');

      // Try to get GSAP timeline info
      return {
        gsapExists: true,
        version: window.gsap.version,
        leftHasTweens: leftHand ? window.gsap.getTweensOf(leftHand).length > 0 : false,
        rightHasTweens: rightHand ? window.gsap.getTweensOf(rightHand).length > 0 : false
      };
    }
    return { gsapExists: false };
  });

  console.log('GSAP Info:');
  console.log(JSON.stringify(gsapInfo, null, 2));

  console.log('\n=== Analysis Complete ===');
  console.log('Press Ctrl+C to close browser...');

  // Keep browser open for manual inspection
  await page.waitForTimeout(30000);

  await browser.close();
})();
