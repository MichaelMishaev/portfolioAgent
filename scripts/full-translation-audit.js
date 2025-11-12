const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const translations = require('../lib/translations.json');
const templateTranslations = require('../lib/template-translations.json');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🔍 COMPREHENSIVE TRANSLATION AUDIT REPORT                 ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Get all template IDs from registry
const allTemplateIds = translations.en.templates.map(t => t.id).sort();

// Get templates using i18n from code
const templatesWithI18nCommand = 'grep -l "useI18n" components/templates/**/*.tsx 2>/dev/null || echo ""';
const templatesWithI18n = execSync(templatesWithI18nCommand, { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .map(file => {
    // Extract template ID from file path
    const match = file.match(/templates\/([^/]+)\//);
    if (match) return match[1];
    // Handle single-level templates
    const singleMatch = file.match(/templates\/([^/]+)-template\.tsx/);
    if (singleMatch) return singleMatch[1];
    return null;
  })
  .filter(Boolean);

// Get content translation IDs
const enContentIds = Object.keys(templateTranslations.en)
  .filter(k => k !== 'common' && k !== 'featureExplanations');
const ruContentIds = Object.keys(templateTranslations.ru)
  .filter(k => k !== 'common' && k !== 'featureExplanations');

// Normalize ID function for comparison
function normalizeId(id) {
  return id.toLowerCase().replace(/-/g, '').replace(/_/g, '');
}

// Create normalized mappings
const normalizedContentIds = {
  en: enContentIds.map(id => ({ original: id, normalized: normalizeId(id) })),
  ru: ruContentIds.map(id => ({ original: id, normalized: normalizeId(id) }))
};

// Categorize templates
const categories = {
  perfect: [], // Has i18n code + English content + Russian content
  missingRussian: [], // Has i18n code + English content but NO Russian content
  noI18n: [], // No i18n code at all (hardcoded)
  noContent: [], // Has i18n code but no content in template-translations.json
};

allTemplateIds.forEach(templateId => {
  const normalized = normalizeId(templateId);
  const hasI18n = templatesWithI18n.some(t => normalizeId(t) === normalized);
  const hasEnContent = normalizedContentIds.en.some(c => c.normalized === normalized);
  const hasRuContent = normalizedContentIds.ru.some(c => c.normalized === normalized);

  if (hasI18n && hasEnContent && hasRuContent) {
    categories.perfect.push(templateId);
  } else if (hasI18n && hasEnContent && !hasRuContent) {
    categories.missingRussian.push(templateId);
  } else if (hasI18n && !hasEnContent) {
    categories.noContent.push(templateId);
  } else if (!hasI18n) {
    categories.noI18n.push(templateId);
  }
});

// Print Results
console.log('📊 OVERVIEW');
console.log('═'.repeat(70));
console.log(`Total Templates: ${allTemplateIds.length}`);
console.log(`✅ Perfect (i18n + EN + RU): ${categories.perfect.length}`);
console.log(`⚠️  Missing Russian only: ${categories.missingRussian.length}`);
console.log(`❌ No i18n implementation: ${categories.noI18n.length}`);
console.log(`⚠️  Has i18n but no content: ${categories.noContent.length}`);
console.log();

// Critical Issues
console.log('🚨 CRITICAL ISSUES (MIXED LANGUAGE BUG)');
console.log('═'.repeat(70));
if (categories.missingRussian.length > 0) {
  console.log('These templates have English text hardcoded or missing Russian translations:');
  categories.missingRussian.forEach(id => {
    const enKey = normalizedContentIds.en.find(c => c.normalized === normalizeId(id));
    console.log(`  ❌ ${id} → (EN key: ${enKey ? enKey.original : 'NOT FOUND'})`);
  });
} else {
  console.log('✅ No templates with mixed language issues!');
}
console.log();

// No i18n implementation
console.log('❌ TEMPLATES WITHOUT i18n IMPLEMENTATION (${categories.noI18n.length} templates)');
console.log('═'.repeat(70));
console.log('These templates use hardcoded text instead of translations:');
if (categories.noI18n.length > 0) {
  categories.noI18n.forEach((id, idx) => {
    console.log(`  ${idx + 1}. ${id}`);
  });
} else {
  console.log('✅ All templates use i18n!');
}
console.log();

// Has i18n but no content
if (categories.noContent.length > 0) {
  console.log('⚠️  TEMPLATES WITH i18n CODE BUT NO CONTENT');
  console.log('═'.repeat(70));
  console.log('These templates use useI18n() but have no entries in template-translations.json:');
  categories.noContent.forEach(id => {
    console.log(`  ⚠️  ${id}`);
  });
  console.log();
}

// Perfect templates
console.log('✅ TEMPLATES WITH PERFECT TRANSLATIONS (${categories.perfect.length} templates)');
console.log('═'.repeat(70));
categories.perfect.forEach((id, idx) => {
  console.log(`  ${idx + 1}. ${id}`);
});
console.log();

// Recommendations
console.log('💡 RECOMMENDATIONS');
console.log('═'.repeat(70));
console.log('1. FIX CRITICAL: Add Russian translations for:', categories.missingRussian.join(', ') || 'none');
console.log(`2. IMPLEMENT i18n: Add useI18n() to ${categories.noI18n.length} templates`);
console.log(`3. ADD CONTENT: Create template-translations.json entries for ${categories.noContent.length} templates`);
console.log();

// Save detailed report to file
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    total: allTemplateIds.length,
    perfect: categories.perfect.length,
    missingRussian: categories.missingRussian.length,
    noI18n: categories.noI18n.length,
    noContent: categories.noContent.length
  },
  categories,
  allTemplateIds
};

fs.writeFileSync(
  path.join(__dirname, '../translation-audit-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('📄 Detailed report saved to: translation-audit-report.json\n');
