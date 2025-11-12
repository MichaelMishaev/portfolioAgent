const fs = require('fs');
const path = require('path');

// All 39 templates that need fixing
const allTemplates = [
  // Service templates (have translations already)
  { id: 'service-agency', file: 'components/templates/product-pages/agency-service-template.tsx', key: 'serviceAgency' },
  { id: 'service-b2b', file: 'components/templates/product-pages/b2b-service-template.tsx', key: 'serviceB2b' },
  { id: 'service-community', file: 'components/templates/product-pages/community-service-template.tsx', key: 'serviceCommunity' },
  { id: 'service-consulting', file: 'components/templates/product-pages/consulting-service-template.tsx', key: 'serviceConsulting' },
  { id: 'service-dfyou', file: 'components/templates/product-pages/dfyou-service-template.tsx', key: 'serviceDfyou' },
  { id: 'service-enterprise', file: 'components/templates/product-pages/enterprise-service-template.tsx', key: 'serviceEnterprise' },

  // Product templates (need translations)
  { id: 'product-audio', file: 'components/templates/product-pages/audio-product-template.tsx', key: 'productAudio' },
  { id: 'product-course', file: 'components/templates/product-pages/course-product-template.tsx', key: 'productCourse' },
  { id: 'product-fashion', file: 'components/templates/product-pages/fashion-product-template.tsx', key: 'productFashion' },
  { id: 'product-luxury', file: 'components/templates/product-pages/luxury-product-template.tsx', key: 'productLuxury' },
  { id: 'product-physical', file: 'components/templates/product-pages/physical-product-template.tsx', key: 'productPhysical' },
  { id: 'product-premium', file: 'components/templates/product-pages/premium-product-template.tsx', key: 'productPremium' },
  { id: 'product-saas', file: 'components/templates/product-pages/saas-product-template.tsx', key: 'productSaas' },
  { id: 'product-tech', file: 'components/templates/product-pages/tech-product-template.tsx', key: 'productTech' },
  { id: 'product-vacuum', file: 'components/templates/product-pages/vacuum-product-template.tsx', key: 'productVacuum' },

  // Blog templates (need translations)
  { id: 'blog-magazine', file: 'components/templates/blog-pages/magazine-blog-template.tsx', key: 'blogMagazine' },
  { id: 'blog-personal', file: 'components/templates/blog-pages/personal-blog-template.tsx', key: 'blogPersonal' },
  { id: 'blog-tech', file: 'components/templates/blog-pages/tech-blog-template.tsx', key: 'blogTech' },

  // Portfolio/Design templates (need translations)
  { id: '3d-immersive', file: 'components/templates/3d-immersive/3d-immersive-template.tsx', key: 'immersive3d' },
  { id: 'ar-spatial', file: 'components/templates/ar-spatial/ar-spatial-template.tsx', key: 'arSpatial' },
  { id: 'bento-grid', file: 'components/templates/bento-grid/bento-grid-template.tsx', key: 'bentoGrid' },
  { id: 'bold-typography', file: 'components/templates/bold-typography/bold-typography-template.tsx', key: 'boldTypography' },
  { id: 'card-modular', file: 'components/templates/card-modular/card-modular-template.tsx', key: 'cardModular' },
  { id: 'collage-maximalist', file: 'components/templates/collage-maximalist/collage-maximalist-template.tsx', key: 'collageMaximalist' },
  { id: 'dark-mode', file: 'components/templates/dark-mode/dark-mode-template.tsx', key: 'darkModeTemplate' },
  { id: 'data-dashboard', file: 'components/templates/data-dashboard/data-dashboard-template.tsx', key: 'dataDashboard' },
  { id: 'fullscreen-immersive', file: 'components/templates/fullscreen-immersive/fullscreen-immersive-template.tsx', key: 'fullscreenImmersive' },
  { id: 'grid-masonry', file: 'components/templates/grid-masonry/grid-masonry-template.tsx', key: 'gridMasonry' },
  { id: 'illustration-focus', file: 'components/templates/illustration-focus/illustration-focus-template.tsx', key: 'illustrationFocus' },
  { id: 'kinetic-typography', file: 'components/templates/kinetic-typography/kinetic-typography-template.tsx', key: 'kineticTypography' },
  { id: 'neo-brutalist', file: 'components/templates/neo-brutalist/neo-brutalist-template.tsx', key: 'neoBrutalistTemplate' },
  { id: 'organic-liquid', file: 'components/templates/organic-liquid/organic-liquid-template.tsx', key: 'organicLiquid' },

  // Lin templates (need translations)
  { id: 'lin-portfolio-elegance', file: 'components/templates/lin/lin-portfolio-elegance-template.tsx', key: 'linPortfolioElegance' },
  { id: 'lin-professional-authority', file: 'components/templates/lin/lin-professional-authority-template.tsx', key: 'linProfessionalAuthority' },

  // Other templates (need translations)
  { id: 'single-page', file: 'components/templates/single-page/single-page-template.tsx', key: 'singlePage' },
  { id: 'split-screen', file: 'components/templates/split-screen/split-screen-template.tsx', key: 'splitScreenTemplate' },
  { id: 'text-heavy', file: 'components/templates/text-heavy/text-heavy-template.tsx', key: 'textHeavy' },
  { id: 'voice-first', file: 'components/templates/voice-first/voice-first-template.tsx', key: 'voiceFirst' },
  { id: 'y2k-retro', file: 'components/templates/y2k-retro/y2k-retro-template.tsx', key: 'y2kRetro' },
];

console.log('🚀 Master i18n Fix Script');
console.log('='.repeat(60));
console.log(`Total templates to process: ${allTemplates.length}\n`);

let successCount = 0;
let errorCount = 0;
let skippedCount = 0;

allTemplates.forEach((template, index) => {
  console.log(`[${index + 1}/${allTemplates.length}] Processing: ${template.id}`);

  try {
    const filePath = path.join(process.cwd(), template.file);

    if (!fs.existsSync(filePath)) {
      console.log(`  ❌ File not found: ${template.file}`);
      errorCount++;
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Step 1: Add import if missing
    if (!content.includes('import { useI18n }')) {
      // Find the last import statement before the component code
      const lines = content.split('\n');
      let lastImportIndex = -1;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/^import .+ from .+;/)) {
          lastImportIndex = i;
        }
      }

      if (lastImportIndex !== -1) {
        lines.splice(lastImportIndex + 1, 0, 'import { useI18n } from "@/lib/i18n-context";');
        content = lines.join('\n');
        modified = true;
        console.log(`  ✅ Added useI18n import`);
      }
    } else {
      console.log(`  ⏭️  Import already exists`);
    }

    // Step 2: Add hook if missing
    const hookPattern = /const\s*{\s*tt\s*}\s*=\s*useI18n\(\)/;
    if (!hookPattern.test(content)) {
      // Find the component function and add the hook
      const componentMatch = content.match(/(export\s+function\s+\w+[^{]*{\s*)/);

      if (componentMatch) {
        const insertPoint = componentMatch.index + componentMatch[0].length;
        const hookCode = `const { tt } = useI18n();\n  const data = tt?.${template.key};\n\n  if (!data) {\n    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;\n  }\n\n  `;

        content = content.slice(0, insertPoint) + hookCode + content.slice(insertPoint);
        modified = true;
        console.log(`  ✅ Added useI18n hook and loading check`);
      }
    } else {
      console.log(`  ⏭️  Hook already exists`);
    }

    // Step 3: Save if modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  💾 File saved`);
      successCount++;
    } else {
      console.log(`  ⏭️  No changes needed`);
      skippedCount++;
    }

  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    errorCount++;
  }

  console.log('');
});

console.log('='.repeat(60));
console.log('📊 Summary:');
console.log(`  ✅ Successfully modified: ${successCount}`);
console.log(`  ⏭️  Skipped (no changes): ${skippedCount}`);
console.log(`  ❌ Errors: ${errorCount}`);
console.log(`  📝 Total processed: ${allTemplates.length}`);
console.log('='.repeat(60));
console.log('\n⚠️  Next step: Add translations to template-translations.json for templates without them\n');
