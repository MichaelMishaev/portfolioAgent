const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const translations = require('../lib/translations.json');

// Get all template IDs from registry
const allTemplateIds = translations.en.templates.map(t => t.id).sort();

console.log('🔍 Scanning all template files for i18n usage...\n');

const templatesNeedingFix = [];
const templatesWithI18n = [];
const templatesNotFound = [];

allTemplateIds.forEach(templateId => {
  // Try to find the template file
  const possiblePaths = [
    `components/templates/${templateId}/${templateId}-template.tsx`,
    `components/templates/${templateId}-template.tsx`,
    // Handle special cases with different directory names
    `components/templates/blog-pages/${templateId.replace('blog-', '')}-template.tsx`,
    `components/templates/product-pages/${templateId.replace('product-', '')}-template.tsx`,
    `components/templates/online-business/${templateId}-template.tsx`,
    `components/templates/lin/${templateId}-template.tsx`,
  ];

  let filePath = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }

  if (!filePath) {
    templatesNotFound.push(templateId);
    return;
  }

  // Read file and check for useI18n
  const content = fs.readFileSync(filePath, 'utf8');
  const hasI18n = content.includes('useI18n');

  if (hasI18n) {
    templatesWithI18n.push({ id: templateId, path: filePath });
  } else {
    templatesNeedingFix.push({ id: templateId, path: filePath });
  }
});

console.log('📊 RESULTS:\n');
console.log(`✅ Templates WITH i18n: ${templatesWithI18n.length}`);
console.log(`❌ Templates NEEDING i18n: ${templatesNeedingFix.length}`);
console.log(`⚠️  Templates not found: ${templatesNotFound.length}\n`);

if (templatesNotFound.length > 0) {
  console.log('⚠️  Could not locate these template files:');
  templatesNotFound.forEach(id => console.log(`  - ${id}`));
  console.log();
}

console.log('❌ TEMPLATES NEEDING I18N IMPLEMENTATION:\n');
templatesNeedingFix.forEach((t, idx) => {
  console.log(`${idx + 1}. ${t.id}`);
  console.log(`   Path: ${t.path}`);
});

// Save to JSON for scripting
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    total: allTemplateIds.length,
    withI18n: templatesWithI18n.length,
    needingFix: templatesNeedingFix.length,
    notFound: templatesNotFound.length
  },
  templatesNeedingFix,
  templatesWithI18n,
  templatesNotFound
};

fs.writeFileSync(
  path.join(__dirname, '../templates-to-fix.json'),
  JSON.stringify(report, null, 2)
);

console.log(`\n💾 Detailed report saved to: templates-to-fix.json`);
