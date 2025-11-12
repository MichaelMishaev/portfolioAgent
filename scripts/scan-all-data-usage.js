const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Scanning ALL 61 templates for actual data usage...\n');

// Get all template files
const output = execSync('find components/templates -name "*-template.tsx"', { encoding: 'utf8' });
const templateFiles = output.trim().split('\n').filter(Boolean);

console.log(`Found ${templateFiles.length} template files\n`);

const results = {
  usesData: [],
  hasHookButNoUsage: [],
  noHook: [],
  errors: []
};

templateFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const fileName = path.basename(file);

    // Check for useI18n hook
    const hasHook = /const\s*{\s*tt\s*}\s*=\s*useI18n\(\)/.test(content);

    // Check for data variable
    const hasDataVar = /const\s+data\s*=\s*tt\?\./.test(content);

    // Check for actual usage in JSX
    const usesDataInJSX = /{data\.|{data\?\./.test(content);
    const dataRefs = (content.match(/{data[.?][\w.]+/g) || []).length;

    if (hasHook && hasDataVar && usesDataInJSX && dataRefs > 0) {
      results.usesData.push({ file: fileName, refs: dataRefs });
    } else if (hasHook && hasDataVar && !usesDataInJSX) {
      results.hasHookButNoUsage.push(fileName);
    } else if (!hasHook) {
      results.noHook.push(fileName);
    }

  } catch (error) {
    results.errors.push({ file: path.basename(file), error: error.message });
  }
});

console.log('📊 RESULTS:\n');
console.log(`✅ Templates ACTUALLY USING data: ${results.usesData.length}`);
results.usesData.forEach(t => {
  console.log(`   ${t.file} (${t.refs} references)`);
});

console.log(`\n⚠️  Templates with hook but NOT USING data: ${results.hasHookButNoUsage.length}`);
results.hasHookButNoUsage.forEach(t => {
  console.log(`   ${t}`);
});

console.log(`\n❌ Templates without hook: ${results.noHook.length}`);
results.noHook.forEach(t => {
  console.log(`   ${t}`);
});

if (results.errors.length > 0) {
  console.log(`\n❌ Errors: ${results.errors.length}`);
  results.errors.forEach(e => {
    console.log(`   ${e.file}: ${e.error}`);
  });
}

console.log('\n' + '='.repeat(70));
console.log(`\n🎯 CRITICAL FINDING:`);
console.log(`   ${results.hasHookButNoUsage.length} templates have i18n hooks but DON'T USE THEM!`);
console.log(`   These templates will NEVER show Russian translations.`);
console.log(`\n✅ Only ${results.usesData.length} templates actually use translations correctly.`);
