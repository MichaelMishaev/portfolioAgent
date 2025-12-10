#!/usr/bin/env node

/**
 * VERIFY ALL TEMPLATE TRANSLATIONS (Simple Version)
 * Checks all JSON files in translations/templates directory
 */

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '../lib/translations/templates');

console.log('🔍 VERIFYING ALL TEMPLATE TRANSLATIONS\n');
console.log('='.repeat(80));

// Get all JSON files
const files = fs.readdirSync(TRANSLATIONS_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

console.log(`📊 Found ${files.length} translation files\n`);

let fullyTranslated = 0;
let partiallyTranslated = 0;
let emptyFiles = 0;

const issues = {
  emptyEn: [],
  emptyRu: [],
  emptyHe: [],
  lowRu: [],
  lowHe: []
};

for (const filename of files) {
  const templateId = filename.replace('.json', '');
  const filePath = path.join(TRANSLATIONS_DIR, filename);

  // Read and parse file
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Check each language
  const enKeys = (content.en && Object.keys(content.en).length) || 0;
  const ruKeys = (content.ru && Object.keys(content.ru).length) || 0;
  const heKeys = (content.he && Object.keys(content.he).length) || 0;

  const status = `en:${enKeys.toString().padStart(3)} ru:${ruKeys.toString().padStart(3)} he:${heKeys.toString().padStart(3)}`;

  // Classify
  if (enKeys === 0 && ruKeys === 0 && heKeys === 0) {
    console.log(`⭕ ${templateId.padEnd(40)} [${status}] - EMPTY FILE`);
    emptyFiles++;
    continue;
  }

  if (enKeys === 0) {
    console.log(`❌ ${templateId.padEnd(40)} [${status}] - NO ENGLISH`);
    issues.emptyEn.push(templateId);
    continue;
  }

  if (ruKeys === 0 || heKeys === 0) {
    console.log(`❌ ${templateId.padEnd(40)} [${status}] - MISSING LANGUAGE`);
    if (ruKeys === 0) issues.emptyRu.push(templateId);
    if (heKeys === 0) issues.emptyHe.push(templateId);
    partiallyTranslated++;
    continue;
  }

  // Check if key counts are reasonable (within 50% of English is acceptable for now)
  const ruRatio = (ruKeys / enKeys) * 100;
  const heRatio = (heKeys / enKeys) * 100;

  if (ruRatio < 50 || heRatio < 50) {
    console.log(`⚠️  ${templateId.padEnd(40)} [${status}] - INCOMPLETE (ru:${Math.round(ruRatio)}% he:${Math.round(heRatio)}%)`);
    if (ruRatio < 50) issues.lowRu.push(`${templateId} (${Math.round(ruRatio)}%)`);
    if (heRatio < 50) issues.lowHe.push(`${templateId} (${Math.round(heRatio)}%)`);
    partiallyTranslated++;
  } else {
    console.log(`✅ ${templateId.padEnd(40)} [${status}]`);
    fullyTranslated++;
  }
}

console.log('\n' + '='.repeat(80));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(80));
console.log(`Total files: ${files.length}`);
console.log(`✅ Fully translated (all 3 languages): ${fullyTranslated}`);
console.log(`⚠️  Partially translated: ${partiallyTranslated}`);
console.log(`⭕ Empty files: ${emptyFiles}`);
console.log('='.repeat(80));

// Report specific issues
if (issues.emptyEn.length > 0) {
  console.log(`\n❌ Templates with NO ENGLISH (${issues.emptyEn.length}):`);
  issues.emptyEn.slice(0, 10).forEach(id => console.log(`   - ${id}`));
  if (issues.emptyEn.length > 10) console.log(`   ... and ${issues.emptyEn.length - 10} more`);
}

if (issues.emptyRu.length > 0) {
  console.log(`\n❌ Templates with NO RUSSIAN (${issues.emptyRu.length}):`);
  issues.emptyRu.slice(0, 10).forEach(id => console.log(`   - ${id}`));
  if (issues.emptyRu.length > 10) console.log(`   ... and ${issues.emptyRu.length - 10} more`);
}

if (issues.emptyHe.length > 0) {
  console.log(`\n❌ Templates with NO HEBREW (${issues.emptyHe.length}):`);
  issues.emptyHe.slice(0, 10).forEach(id => console.log(`   - ${id}`));
  if (issues.emptyHe.length > 10) console.log(`   ... and ${issues.emptyHe.length - 10} more`);
}

if (issues.lowRu.length > 0) {
  console.log(`\n⚠️  Templates with INCOMPLETE RUSSIAN (<50%) - ${issues.lowRu.length}:`);
  issues.lowRu.slice(0, 10).forEach(id => console.log(`   - ${id}`));
  if (issues.lowRu.length > 10) console.log(`   ... and ${issues.lowRu.length - 10} more`);
}

if (issues.lowHe.length > 0) {
  console.log(`\n⚠️  Templates with INCOMPLETE HEBREW (<50%) - ${issues.lowHe.length}:`);
  issues.lowHe.slice(0, 10).forEach(id => console.log(`   - ${id}`));
  if (issues.lowHe.length > 10) console.log(`   ... and ${issues.lowHe.length - 10} more`);
}

console.log('');

// Summary recommendation
const needsWork = emptyFiles + partiallyTranslated;
if (needsWork > 0) {
  console.log('💡 RECOMMENDATION:');
  if (emptyFiles > 0) {
    console.log(`   - ${emptyFiles} empty files need content`);
  }
  if (issues.emptyRu.length > 0 || issues.emptyHe.length > 0) {
    console.log(`   - ${issues.emptyRu.length + issues.emptyHe.length} templates need language translations added`);
  }
  if (issues.lowRu.length > 0 || issues.lowHe.length > 0) {
    console.log(`   - ${issues.lowRu.length + issues.lowHe.length} templates need more complete translations`);
  }
  console.log('');
}

process.exit(fullyTranslated === files.length ? 0 : 1);
