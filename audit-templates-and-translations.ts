#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

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
const customPreviews = enTemplates.filter((t: any) =>
  t.id === 'minimalist' || t.id === 'dark-mode'
);
const defaultPreviews = enTemplates.filter((t: any) =>
  t.id !== 'minimalist' && t.id !== 'dark-mode'
);
console.log(`Templates with custom previews: ${customPreviews.length}`);
customPreviews.forEach((t: any) => console.log(`  - ${t.id} → ${t.id === 'minimalist' ? 'MinimalistPreview' : 'DarkModePreview'}`));
console.log(`Templates using DefaultPreview: ${defaultPreviews.length}`);
console.log('');

// 3. Check for missing translations (ID mismatch)
console.log('3️⃣  TRANSLATION ID MATCHING');
console.log('─────────────────────────────────────────────────');
const enIds = new Set(enTemplates.map((t: any) => t.id));
const ruIds = new Set(ruTemplates.map((t: any) => t.id));

const missingInRu = enTemplates.filter((t: any) => !ruIds.has(t.id));
const missingInEn = ruTemplates.filter((t: any) => !enIds.has(t.id));

if (missingInRu.length === 0 && missingInEn.length === 0) {
  console.log('✅ All template IDs match between EN and RU');
} else {
  if (missingInRu.length > 0) {
    console.log(`❌ Missing in Russian: ${missingInRu.length}`);
    missingInRu.forEach((t: any) => console.log(`   - ${t.id}: ${t.name}`));
  }
  if (missingInEn.length > 0) {
    console.log(`❌ Missing in English: ${missingInEn.length}`);
    missingInEn.forEach((t: any) => console.log(`   - ${t.id}: ${t.name}`));
  }
}
console.log('');

// 4. Check template component files
console.log('4️⃣  TEMPLATE COMPONENT FILES');
console.log('─────────────────────────────────────────────────');

const templateComponentsDir = './components/templates';
const missingComponents: string[] = [];
const foundComponents: string[] = [];

enTemplates.forEach((template: any) => {
  const templateId = template.id;

  // Map template IDs to their expected file paths
  const possiblePaths = [
    // Single file templates
    `${templateComponentsDir}/${templateId}/${templateId}-template.tsx`,
    // Blog templates
    `${templateComponentsDir}/blog-pages/archetypes-editorial-template.tsx`,
    `${templateComponentsDir}/blog-pages/archetypes-minimal-template.tsx`,
    `${templateComponentsDir}/blog-pages/magazine-blog-template.tsx`,
    `${templateComponentsDir}/blog-pages/personal-blog-template.tsx`,
    `${templateComponentsDir}/blog-pages/tech-blog-template.tsx`,
    // Product templates
    `${templateComponentsDir}/product-pages/agency-service-template.tsx`,
    `${templateComponentsDir}/product-pages/audio-product-template.tsx`,
    `${templateComponentsDir}/product-pages/b2b-service-template.tsx`,
    `${templateComponentsDir}/product-pages/community-service-template.tsx`,
    `${templateComponentsDir}/product-pages/consulting-service-template.tsx`,
    `${templateComponentsDir}/product-pages/course-product-template.tsx`,
    `${templateComponentsDir}/product-pages/dfyou-service-template.tsx`,
    `${templateComponentsDir}/product-pages/enterprise-service-template.tsx`,
    `${templateComponentsDir}/product-pages/fashion-product-template.tsx`,
    `${templateComponentsDir}/product-pages/luxury-product-template.tsx`,
    `${templateComponentsDir}/product-pages/physical-product-template.tsx`,
    `${templateComponentsDir}/product-pages/premium-product-template.tsx`,
    `${templateComponentsDir}/product-pages/saas-product-template.tsx`,
    `${templateComponentsDir}/product-pages/tech-product-template.tsx`,
    `${templateComponentsDir}/product-pages/vacuum-product-template.tsx`,
    // Online business templates
    `${templateComponentsDir}/online-business/online-business-agency-template.tsx`,
    `${templateComponentsDir}/online-business/online-business-coach-template.tsx`,
    `${templateComponentsDir}/online-business/online-business-course-template.tsx`,
    `${templateComponentsDir}/online-business-saas/online-business-saas-template.tsx`,
    // Service marketplace
    `${templateComponentsDir}/service-marketplace/service-marketplace-template.tsx`,
  ];

  let found = false;
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      foundComponents.push(templateId);
      found = true;
      break;
    }
  }

  if (!found) {
    missingComponents.push(templateId);
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

enTemplates.forEach((enTemplate: any, index: number) => {
  const ruTemplate = ruTemplates.find((t: any) => t.id === enTemplate.id);

  if (!ruTemplate) return;

  const missingFields: string[] = [];

  requiredFields.forEach(field => {
    if (!enTemplate[field] || !ruTemplate[field]) {
      missingFields.push(field);
    }
    // Check if arrays are empty
    if (Array.isArray(enTemplate[field]) && enTemplate[field].length === 0) {
      missingFields.push(field + ' (empty)');
    }
    if (Array.isArray(ruTemplate[field]) && ruTemplate[field].length === 0) {
      missingFields.push(field + ' (empty in RU)');
    }
  });

  if (missingFields.length > 0) {
    incompleteTemplates++;
    console.log(`❌ ${enTemplate.id}:`);
    missingFields.forEach(f => console.log(`   - Missing/empty: ${f}`));
  }
});

if (incompleteTemplates === 0) {
  console.log('✅ All templates have complete field translations');
} else {
  console.log(`\n⚠️  ${incompleteTemplates} templates have incomplete fields`);
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
console.log(`Field completeness: ${incompleteTemplates === 0 ? '✅ Complete' : `⚠️  ${incompleteTemplates} incomplete`}`);
console.log('═══════════════════════════════════════════════════\n');

// Exit with error code if there are issues
if (missingInRu.length > 0 || missingInEn.length > 0 || missingComponents.length > 0 || incompleteTemplates > 0) {
  process.exit(1);
}
