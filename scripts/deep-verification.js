const fs = require('fs');
const path = require('path');

console.log('🔍 DEEP VERIFICATION - Checking if templates ACTUALLY USE translations\n');
console.log('='.repeat(70));

const templates = [
  { id: 'product-saas', file: 'components/templates/product-pages/saas-product-template.tsx', key: 'productSaas' },
  { id: 'service-b2b', file: 'components/templates/product-pages/b2b-service-template.tsx', key: 'serviceB2b' },
  { id: 'blog-personal', file: 'components/templates/blog-pages/personal-blog-template.tsx', key: 'blogPersonal' },
  { id: '3d-immersive', file: 'components/templates/3d-immersive/3d-immersive-template.tsx', key: 'immersive3d' },
  { id: 'bold-typography', file: 'components/templates/bold-typography/bold-typography-template.tsx', key: 'boldTypography' },
  { id: 'split-screen', file: 'components/templates/split-screen/split-screen-template.tsx', key: 'splitScreenTemplate' },
];

let issuesFound = 0;

templates.forEach((template, index) => {
  console.log(`\n[${index + 1}/${templates.length}] Analyzing: ${template.id}`);
  console.log('-'.repeat(70));

  try {
    const filePath = path.join(process.cwd(), template.file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Check 1: Has useI18n import
    const hasImport = content.includes('import { useI18n }');
    console.log(`  ${hasImport ? '✅' : '❌'} Has useI18n import`);
    if (!hasImport) issuesFound++;

    // Check 2: Has useI18n hook
    const hasHook = /const\s*{\s*tt\s*}\s*=\s*useI18n\(\)/.test(content);
    console.log(`  ${hasHook ? '✅' : '❌'} Has useI18n() hook`);
    if (!hasHook) issuesFound++;

    // Check 3: Has data variable from tt
    const hasDataVar = new RegExp(`const\\s+data\\s*=\\s*tt\\?\\.${template.key}`).test(content);
    console.log(`  ${hasDataVar ? '✅' : '❌'} Has data = tt?.${template.key}`);
    if (!hasDataVar) issuesFound++;

    // Check 4: CRITICAL - Does it actually USE data in JSX?
    const usesDataInJSX = /{data\.|{data\?\./.test(content);
    console.log(`  ${usesDataInJSX ? '✅' : '⚠️ '} Uses {data.} or {data?.} in JSX`);
    if (!usesDataInJSX) {
      console.log(`     ⚠️  WARNING: Hook exists but data is NOT USED in JSX!`);
      issuesFound++;
    }

    // Check 5: Count data references
    const dataRefs = (content.match(/{data\./g) || []).length;
    const dataOptionalRefs = (content.match(/{data\?\.[\w.]+/g) || []).length;
    console.log(`  📊 Data references: ${dataRefs} direct, ${dataOptionalRefs} optional`);

    // Check 6: Has translation in template-translations.json
    const translations = JSON.parse(fs.readFileSync('lib/template-translations.json', 'utf8'));
    const hasENTranslation = !!translations.en[template.key];
    const hasRUTranslation = !!translations.ru[template.key];
    console.log(`  ${hasENTranslation ? '✅' : '❌'} Has English translation`);
    console.log(`  ${hasRUTranslation ? '✅' : '❌'} Has Russian translation`);
    if (!hasENTranslation || !hasRUTranslation) issuesFound++;

    // Check 7: Translation structure
    if (hasENTranslation) {
      const enKeys = Object.keys(translations.en[template.key]);
      const ruKeys = Object.keys(translations.ru[template.key]);
      const keysMatch = enKeys.length === ruKeys.length;
      console.log(`  ${keysMatch ? '✅' : '⚠️ '} Translation keys match (EN: ${enKeys.length}, RU: ${ruKeys.length})`);
      if (!keysMatch) issuesFound++;
    }

  } catch (error) {
    console.log(`  ❌ ERROR: ${error.message}`);
    issuesFound++;
  }
});

console.log('\n' + '='.repeat(70));
console.log(`\n📊 DEEP VERIFICATION SUMMARY:`);
console.log(`  Issues found: ${issuesFound}`);
console.log(`  Status: ${issuesFound === 0 ? '✅ PASS' : '❌ ISSUES DETECTED'}`);

if (issuesFound > 0) {
  console.log(`\n⚠️  ${issuesFound} issues need attention!`);
}
