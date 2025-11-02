const fs = require('fs');
const path = require('path');

// Read translations file
const translationsPath = './lib/translations.json';
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf-8'));

// Get templates from both languages
const enTemplates = translations.en.templates;
const ruTemplates = translations.ru.templates;

console.log('📊 TEMPLATE AND TRANSLATION AUDIT REPORT');
console.log('═══════════════════════════════════════════════════\n');

// 1. Check template count
console.log('1️⃣  TEMPLATE COUNT');
console.log('─────────────────────────────────────────────────');
console.log(`English templates: ${enTemplates.length}`);
console.log(`Russian templates: ${ruTemplates.length}`);
console.log(`Match: ${enTemplates.length === ruTemplates.length ? '✅' : '❌'}\n`);

// 2. Check preview assignments
console.log('2️⃣  PREVIEW COMPONENT ASSIGNMENTS');
console.log('─────────────────────────────────────────────────');
const customPreviews = enTemplates.filter((t) =>
  t.id === 'minimalist' || t.id === 'dark-mode'
);
const defaultPreviews = enTemplates.filter((t) =>
  t.id !== 'minimalist' && t.id !== 'dark-mode'
);
console.log(`Templates with custom previews: ${customPreviews.length}`);
customPreviews.forEach((t) => console.log(`  - ${t.id} → ${t.id === 'minimalist' ? 'MinimalistPreview' : 'DarkModePreview'}`));
console.log(`Templates using DefaultPreview: ${defaultPreviews.length}`);
console.log('');

// 3. Check for missing translations (ID mismatch)
console.log('3️⃣  TRANSLATION ID MATCHING');
console.log('─────────────────────────────────────────────────');
const enIds = new Set(enTemplates.map((t) => t.id));
const ruIds = new Set(ruTemplates.map((t) => t.id));

const missingInRu = enTemplates.filter((t) => !ruIds.has(t.id));
const missingInEn = ruTemplates.filter((t) => !enIds.has(t.id));

if (missingInRu.length === 0 && missingInEn.length === 0) {
  console.log('✅ All template IDs match between EN and RU');
} else {
  if (missingInRu.length > 0) {
    console.log(`❌ Missing in Russian: ${missingInRu.length}`);
    missingInRu.forEach((t) => console.log(`   - ${t.id}: ${t.name}`));
  }
  if (missingInEn.length > 0) {
    console.log(`❌ Missing in English: ${missingInEn.length}`);
    missingInEn.forEach((t) => console.log(`   - ${t.id}: ${t.name}`));
  }
}
console.log('');

// 4. Check template component files
console.log('4️⃣  TEMPLATE COMPONENT FILES');
console.log('─────────────────────────────────────────────────');

// Map of template IDs to their component file paths
const templateFileMap = {
  // Blog templates
  'blog-archetypes-editorial': 'components/templates/blog-pages/archetypes-editorial-template.tsx',
  'blog-archetypes-minimal': 'components/templates/blog-pages/archetypes-minimal-template.tsx',
  'blog-magazine': 'components/templates/blog-pages/magazine-blog-template.tsx',
  'blog-personal': 'components/templates/blog-pages/personal-blog-template.tsx',
  'blog-tech': 'components/templates/blog-pages/tech-blog-template.tsx',

  // Product templates
  'product-audio': 'components/templates/product-pages/audio-product-template.tsx',
  'product-course': 'components/templates/product-pages/course-product-template.tsx',
  'product-fashion': 'components/templates/product-pages/fashion-product-template.tsx',
  'product-luxury': 'components/templates/product-pages/luxury-product-template.tsx',
  'product-physical': 'components/templates/product-pages/physical-product-template.tsx',
  'product-premium': 'components/templates/product-pages/premium-product-template.tsx',
  'product-saas': 'components/templates/product-pages/saas-product-template.tsx',
  'product-tech': 'components/templates/product-pages/tech-product-template.tsx',
  'product-vacuum': 'components/templates/product-pages/vacuum-product-template.tsx',

  // Service templates
  'service-agency': 'components/templates/product-pages/agency-service-template.tsx',
  'service-b2b': 'components/templates/product-pages/b2b-service-template.tsx',
  'service-community': 'components/templates/product-pages/community-service-template.tsx',
  'service-consulting': 'components/templates/product-pages/consulting-service-template.tsx',
  'service-dfyou': 'components/templates/product-pages/dfyou-service-template.tsx',
  'service-enterprise': 'components/templates/product-pages/enterprise-service-template.tsx',

  // Online business templates
  'online-business-agency': 'components/templates/online-business/online-business-agency-template.tsx',
  'online-business-coach': 'components/templates/online-business/online-business-coach-template.tsx',
  'online-business-course': 'components/templates/online-business/online-business-course-template.tsx',
  'online-business-saas': 'components/templates/online-business-saas/online-business-saas-template.tsx',

  // Service marketplace
  'service-marketplace': 'components/templates/service-marketplace/service-marketplace-template.tsx',
};

const missingComponents = [];
const foundComponents = [];

enTemplates.forEach((template) => {
  const templateId = template.id;

  // Check if custom path exists
  if (templateFileMap[templateId]) {
    if (fs.existsSync(templateFileMap[templateId])) {
      foundComponents.push(templateId);
    } else {
      missingComponents.push(templateId);
    }
  } else {
    // Check default path: components/templates/{id}/{id}-template.tsx
    const defaultPath = `components/templates/${templateId}/${templateId}-template.tsx`;
    if (fs.existsSync(defaultPath)) {
      foundComponents.push(templateId);
    } else {
      missingComponents.push(templateId);
    }
  }
});

console.log(`✅ Found: ${foundComponents.length}/${enTemplates.length}`);
if (missingComponents.length > 0) {
  console.log(`❌ Missing component files: ${missingComponents.length}`);
  missingComponents.forEach(id => console.log(`   - ${id}`));
} else {
  console.log('✅ All templates have component files');
}
console.log('');

// 5. Check for complete field translations
console.log('5️⃣  FIELD COMPLETENESS CHECK');
console.log('─────────────────────────────────────────────────');

const requiredFields = ['id', 'name', 'description', 'category', 'difficulty', 'features', 'tags', 'bestFor'];
let incompleteTemplates = 0;
const incompleteDetails = [];

enTemplates.forEach((enTemplate) => {
  const ruTemplate = ruTemplates.find((t) => t.id === enTemplate.id);

  if (!ruTemplate) {
    incompleteDetails.push({
      id: enTemplate.id,
      issue: 'No Russian translation found'
    });
    incompleteTemplates++;
    return;
  }

  const missingFields = [];

  requiredFields.forEach(field => {
    // Check if field exists and is not empty
    if (!enTemplate[field]) {
      missingFields.push(`${field} (EN missing)`);
    } else if (Array.isArray(enTemplate[field]) && enTemplate[field].length === 0) {
      missingFields.push(`${field} (EN empty array)`);
    }

    if (!ruTemplate[field]) {
      missingFields.push(`${field} (RU missing)`);
    } else if (Array.isArray(ruTemplate[field]) && ruTemplate[field].length === 0) {
      missingFields.push(`${field} (RU empty array)`);
    }
  });

  if (missingFields.length > 0) {
    incompleteTemplates++;
    incompleteDetails.push({
      id: enTemplate.id,
      name: enTemplate.name,
      issues: missingFields
    });
  }
});

if (incompleteTemplates === 0) {
  console.log('✅ All templates have complete field translations');
} else {
  console.log(`❌ ${incompleteTemplates} templates have incomplete fields:\n`);
  incompleteDetails.forEach(detail => {
    console.log(`   ${detail.id} - ${detail.name || 'N/A'}`);
    if (detail.issue) {
      console.log(`      ${detail.issue}`);
    } else if (detail.issues) {
      detail.issues.forEach(issue => console.log(`      - ${issue}`));
    }
  });
}
console.log('');

// 6. Summary
console.log('═══════════════════════════════════════════════════');
console.log('📋 SUMMARY');
console.log('═══════════════════════════════════════════════════');
console.log(`Total templates: ${enTemplates.length}`);
console.log(`Preview system:`);
console.log(`  - Custom previews: 2 (minimalist, dark-mode)`);
console.log(`  - Default preview: ${defaultPreviews.length}`);
console.log(`Translation status: ${enTemplates.length === ruTemplates.length && missingInRu.length === 0 ? '✅ Complete' : '❌ Incomplete'}`);
console.log(`Component files: ${missingComponents.length === 0 ? '✅ All present' : `❌ ${missingComponents.length} missing`}`);
console.log(`Field completeness: ${incompleteTemplates === 0 ? '✅ Complete' : `❌ ${incompleteTemplates} incomplete`}`);
console.log('═══════════════════════════════════════════════════\n');

// Exit with error code if there are issues
if (missingInRu.length > 0 || missingInEn.length > 0 || missingComponents.length > 0 || incompleteTemplates > 0) {
  process.exit(1);
}
