import fs from 'fs';
import path from 'path';

// All new templates that should have cover images
const newTemplates = [
  'creative-agency-bold',
  'professional-b2b',
  'minimal-portfolio-clean',
  'glassmorphism-modern',
  'split-screen-editorial',
  'saas-feature-rich',
  'personal-brand',
  'experimental-3d',
  'interactive-agency',
  'luxury-minimal',
  'startup-pitch',
  'photography-immersive',
  'motion-designer',
];

function verifyCovers() {
  const previewsDir = path.join(process.cwd(), 'public', 'previews');

  console.log('🔍 Verifying Template Cover Images\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let missingCount = 0;
  let existingCount = 0;

  for (const templateId of newTemplates) {
    const filepath = path.join(previewsDir, `${templateId}.png`);
    const exists = fs.existsSync(filepath);

    if (exists) {
      const stats = fs.statSync(filepath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`✅ ${templateId}.png (${sizeKB} KB)`);
      existingCount++;
    } else {
      console.log(`❌ MISSING: ${templateId}.png`);
      missingCount++;
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n📊 Verification Summary:`);
  console.log(`   ✅ Found: ${existingCount}/${newTemplates.length}`);
  console.log(`   ❌ Missing: ${missingCount}/${newTemplates.length}`);

  if (missingCount === 0) {
    console.log('\n🎉 All template cover images are ready!');
    console.log('\n💡 Next steps:');
    console.log('   1. Start dev server: npm run dev');
    console.log('   2. Visit: http://localhost:3500');
    console.log('   3. Scroll to template gallery');
    console.log('   4. Verify all new templates show cover images');
  } else {
    console.log('\n⚠️  Some cover images are missing. Run generate-template-covers.ts again.');
    process.exit(1);
  }
}

verifyCovers();
