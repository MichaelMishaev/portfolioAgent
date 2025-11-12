const fs = require('fs');
const path = require('path');

const translations = require('../lib/translations.json');
const allTemplateIds = translations.en.templates.map(t => t.id).sort();

console.log('🔍 Finding all template files...\n');

// Get all template files
const allTemplateFiles = [];

// Scan all directories
const templatesDir = 'components/templates';
const subdirs = fs.readdirSync(templatesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

subdirs.forEach(subdir => {
  const dirPath = path.join(templatesDir, subdir);
  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('-template.tsx'));

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const fileName = file.replace('-template.tsx', '');
    allTemplateFiles.push({
      fileName,
      subdir,
      fullPath: filePath
    });
  });
});

console.log(`Found ${allTemplateFiles.length} template files\n`);

// Now match template IDs to files
const mappedTemplates = [];
const unmappedIds = [];
const unmappedFiles = [];

allTemplateIds.forEach(templateId => {
  // Try different matching strategies
  let matched = null;

  // Strategy 1: Direct match on fileName
  matched = allTemplateFiles.find(f => f.fileName === templateId);

  // Strategy 2: Match on subdir if single file in subdir
  if (!matched) {
    matched = allTemplateFiles.find(f => f.subdir === templateId && f.fileName === templateId);
  }

  // Strategy 3: Handle product-X → X-product
  if (!matched && templateId.startsWith('product-')) {
    const productType = templateId.replace('product-', '');
    matched = allTemplateFiles.find(f =>
      f.subdir === 'product-pages' && f.fileName === `${productType}-product`
    );
  }

  // Strategy 4: Handle service-X → X-service
  if (!matched && templateId.startsWith('service-')) {
    const serviceType = templateId.replace('service-', '');
    matched = allTemplateFiles.find(f =>
      f.subdir === 'product-pages' && f.fileName === `${serviceType}-service`
    );
  }

  // Strategy 5: Handle blog-X
  if (!matched && templateId.startsWith('blog-')) {
    const blogType = templateId.replace('blog-', '');
    matched = allTemplateFiles.find(f =>
      f.subdir === 'blog-pages' && f.fileName.includes(blogType)
    );
  }

  // Strategy 6: Handle archetypes
  if (!matched && templateId.includes('archetypes')) {
    matched = allTemplateFiles.find(f =>
      f.fileName.includes('archetypes') &&
      templateId.includes(f.fileName.split('-').pop())
    );
  }

  if (matched) {
    // Check if it has i18n
    const content = fs.readFileSync(matched.fullPath, 'utf8');
    const hasI18n = content.includes('useI18n');

    mappedTemplates.push({
      id: templateId,
      path: matched.fullPath,
      hasI18n
    });
  } else {
    unmappedIds.push(templateId);
  }
});

// Find unmapped files
allTemplateFiles.forEach(file => {
  const isMapped = mappedTemplates.some(t => t.path === file.fullPath);
  if (!isMapped) {
    unmappedFiles.push(file);
  }
});

// Results
const needI18n = mappedTemplates.filter(t => !t.hasI18n);
const haveI18n = mappedTemplates.filter(t => t.hasI18n);

console.log('📊 RESULTS:\n');
console.log(`✅ Templates WITH i18n: ${haveI18n.length}`);
console.log(`❌ Templates NEEDING i18n: ${needI18n.length}`);
console.log(`⚠️  Unmapped template IDs: ${unmappedIds.length}`);
console.log(`⚠️  Unmapped template files: ${unmappedFiles.length}\n`);

if (unmappedIds.length > 0) {
  console.log('⚠️  Template IDs without matched files:');
  unmappedIds.forEach(id => console.log(`  - ${id}`));
  console.log();
}

if (unmappedFiles.length > 0) {
  console.log('⚠️  Template files without matched IDs:');
  unmappedFiles.forEach(f => console.log(`  - ${f.fullPath}`));
  console.log();
}

console.log('❌ TEMPLATES NEEDING I18N IMPLEMENTATION:\n');
needI18n.forEach((t, idx) => {
  console.log(`${idx + 1}. ${t.id}`);
  console.log(`   Path: ${t.path}`);
});

// Save report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalIds: allTemplateIds.length,
    totalFiles: allTemplateFiles.length,
    mapped: mappedTemplates.length,
    withI18n: haveI18n.length,
    needingI18n: needI18n.length,
    unmappedIds: unmappedIds.length,
    unmappedFiles: unmappedFiles.length
  },
  needI18n,
  haveI18n,
  unmappedIds,
  unmappedFiles: unmappedFiles.map(f => f.fullPath)
};

fs.writeFileSync(
  path.join(__dirname, '../templates-to-fix-complete.json'),
  JSON.stringify(report, null, 2)
);

console.log(`\n💾 Complete report saved to: templates-to-fix-complete.json`);
