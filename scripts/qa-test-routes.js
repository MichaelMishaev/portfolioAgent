/**
 * QA Test Script for All Template Routes
 * Tests detail pages, demo pages, builder pages, and checkout pages
 */

const TEMPLATE_IDS = [
  "3d-immersive",
  "ar-spatial",
  "bento-grid",
  "blog-archetypes-editorial",
  "blog-archetypes-minimal",
  "blog-magazine",
  "blog-personal",
  "blog-tech",
  "bold-typography",
  "card-modular",
  "collage-maximalist",
  "creative-agency-bold",
  "dark-mode",
  "data-dashboard",
  "experimental-3d",
  "fullscreen-immersive",
  "glassmorphism-modern",
  "grid-masonry",
  "illustration-focus",
  "interactive-agency",
  "kinetic-typography",
  "lin-portfolio-elegance",
  "lin-professional-authority",
  "lin-tech-pioneer",
  "luxury-minimal",
  "minimal-portfolio-clean",
  "minimalist",
  "motion-designer",
  "neo-brutalist",
  "online-business-agency",
  "online-business-coach",
  "online-business-course",
  "online-business-saas",
  "organic-liquid",
  "personal-brand",
  "photography-immersive",
  "product-audio",
  "product-course",
  "product-fashion",
  "product-luxury",
  "product-physical",
  "product-premium",
  "product-saas",
  "product-tech",
  "product-vacuum",
  "professional-b2b",
  "saas-feature-rich",
  "service-agency",
  "service-b2b",
  "service-community",
  "service-consulting",
  "service-dfyou",
  "service-enterprise",
  "service-marketplace",
  "single-page",
  "split-screen",
  "split-screen-editorial",
  "startup-pitch",
  "text-heavy",
  "voice-first",
  "y2k-retro",
];

const BASE_URL = "http://localhost:3500";

async function testRoute(url) {
  try {
    const response = await fetch(url);
    return {
      url,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      ok: false,
      statusText: error.message,
    };
  }
}

async function runQATests() {
  console.log('🚀 Starting QA Tests for Template Routes\n');
  console.log(`📊 Total templates to test: ${TEMPLATE_IDS.length}`);
  console.log(`🌐 Base URL: ${BASE_URL}\n`);
  console.log('=' .repeat(80));

  const results = {
    detail: { passed: 0, failed: 0, errors: [] },
    demo: { passed: 0, failed: 0, errors: [] },
    builder: { passed: 0, failed: 0, errors: [] },
    checkout: { passed: 0, failed: 0, errors: [] },
  };

  // Test all routes for each template
  for (const templateId of TEMPLATE_IDS) {
    console.log(`\n📋 Testing: ${templateId}`);

    // Test detail page
    const detailUrl = `${BASE_URL}/templates/${templateId}`;
    const detailResult = await testRoute(detailUrl);
    if (detailResult.ok) {
      results.detail.passed++;
      console.log(`  ✅ Detail: ${detailResult.status}`);
    } else {
      results.detail.failed++;
      results.detail.errors.push({ templateId, url: detailUrl, error: detailResult.statusText });
      console.log(`  ❌ Detail: ${detailResult.status} - ${detailResult.statusText}`);
    }

    // Test demo page
    const demoUrl = `${BASE_URL}/templates/${templateId}/demo`;
    const demoResult = await testRoute(demoUrl);
    if (demoResult.ok) {
      results.demo.passed++;
      console.log(`  ✅ Demo: ${demoResult.status}`);
    } else {
      results.demo.failed++;
      results.demo.errors.push({ templateId, url: demoUrl, error: demoResult.statusText });
      console.log(`  ❌ Demo: ${demoResult.status} - ${demoResult.statusText}`);
    }

    // Test builder page
    const builderUrl = `${BASE_URL}/templates/${templateId}/builder`;
    const builderResult = await testRoute(builderUrl);
    if (builderResult.ok) {
      results.builder.passed++;
      console.log(`  ✅ Builder: ${builderResult.status}`);
    } else {
      results.builder.failed++;
      results.builder.errors.push({ templateId, url: builderUrl, error: builderResult.statusText });
      console.log(`  ❌ Builder: ${builderResult.status} - ${builderResult.statusText}`);
    }

    // Test checkout page
    const checkoutUrl = `${BASE_URL}/checkout/${templateId}`;
    const checkoutResult = await testRoute(checkoutUrl);
    if (checkoutResult.ok) {
      results.checkout.passed++;
      console.log(`  ✅ Checkout: ${checkoutResult.status}`);
    } else {
      results.checkout.failed++;
      results.checkout.errors.push({ templateId, url: checkoutUrl, error: checkoutResult.statusText });
      console.log(`  ❌ Checkout: ${checkoutResult.status} - ${checkoutResult.statusText}`);
    }

    // Rate limiting - wait 100ms between template tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 QA TEST SUMMARY\n');
  console.log('='.repeat(80));

  const totalTests = TEMPLATE_IDS.length * 4;
  const totalPassed = results.detail.passed + results.demo.passed + results.builder.passed + results.checkout.passed;
  const totalFailed = results.detail.failed + results.demo.failed + results.builder.failed + results.checkout.failed;
  const successRate = ((totalPassed / totalTests) * 100).toFixed(2);

  console.log(`\n🎯 Overall Results:`);
  console.log(`   Total Tests: ${totalTests}`);
  console.log(`   ✅ Passed: ${totalPassed} (${successRate}%)`);
  console.log(`   ❌ Failed: ${totalFailed}`);

  console.log(`\n📄 Detail Pages:`);
  console.log(`   ✅ Passed: ${results.detail.passed}/${TEMPLATE_IDS.length}`);
  console.log(`   ❌ Failed: ${results.detail.failed}/${TEMPLATE_IDS.length}`);

  console.log(`\n🎬 Demo Pages:`);
  console.log(`   ✅ Passed: ${results.demo.passed}/${TEMPLATE_IDS.length}`);
  console.log(`   ❌ Failed: ${results.demo.failed}/${TEMPLATE_IDS.length}`);

  console.log(`\n🛠️  Builder Pages:`);
  console.log(`   ✅ Passed: ${results.builder.passed}/${TEMPLATE_IDS.length}`);
  console.log(`   ❌ Failed: ${results.builder.failed}/${TEMPLATE_IDS.length}`);

  console.log(`\n🛒 Checkout Pages:`);
  console.log(`   ✅ Passed: ${results.checkout.passed}/${TEMPLATE_IDS.length}`);
  console.log(`   ❌ Failed: ${results.checkout.failed}/${TEMPLATE_IDS.length}`);

  // Print error details if any
  if (totalFailed > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('\n⚠️  ERRORS DETAILS\n');
    console.log('='.repeat(80));

    if (results.detail.errors.length > 0) {
      console.log('\n❌ Detail Page Errors:');
      results.detail.errors.forEach(error => {
        console.log(`   - ${error.templateId}: ${error.error}`);
        console.log(`     ${error.url}`);
      });
    }

    if (results.demo.errors.length > 0) {
      console.log('\n❌ Demo Page Errors:');
      results.demo.errors.forEach(error => {
        console.log(`   - ${error.templateId}: ${error.error}`);
        console.log(`     ${error.url}`);
      });
    }

    if (results.builder.errors.length > 0) {
      console.log('\n❌ Builder Page Errors:');
      results.builder.errors.forEach(error => {
        console.log(`   - ${error.templateId}: ${error.error}`);
        console.log(`     ${error.url}`);
      });
    }

    if (results.checkout.errors.length > 0) {
      console.log('\n❌ Checkout Page Errors:');
      results.checkout.errors.forEach(error => {
        console.log(`   - ${error.templateId}: ${error.error}`);
        console.log(`     ${error.url}`);
      });
    }
  }

  console.log('\n' + '='.repeat(80));

  if (totalFailed === 0) {
    console.log('\n✅ All tests passed! 🎉\n');
  } else {
    console.log(`\n⚠️  ${totalFailed} tests failed. Please review errors above.\n`);
  }

  console.log('='.repeat(80));

  return {
    success: totalFailed === 0,
    results,
    totalTests,
    totalPassed,
    totalFailed,
    successRate
  };
}

// Run tests
runQATests()
  .then(({ success }) => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('\n💥 Fatal error during QA tests:', error);
    process.exit(1);
  });
