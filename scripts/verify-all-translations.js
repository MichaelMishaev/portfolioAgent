#!/usr/bin/env node

/**
 * VERIFY ALL TEMPLATE TRANSLATIONS
 *
 * Checks each template translation file to ensure:
 * 1. File exists
 * 2. Has en, ru, he sections
 * 3. Each section has content (not empty)
 * 4. Reports missing or incomplete translations
 */

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '../lib/translations/templates');
const REGISTRY_FILE = path.join(__dirname, '../lib/template-registry.ts');

console.log('🔍 VERIFYING ALL TEMPLATE TRANSLATIONS\n');
console.log('='.repeat(80));

// Extract template IDs from registry
const registryContent = fs.readFileSync(REGISTRY_FILE, 'utf-8');
const idMatches = registryContent.match(/id:\s*["']([^"']+)["']/g) || [];
const templateIds = idMatches
  .map(m => m.match(/id:\s*["']([^"']+)["']/)[1])
  .filter((id, index, arr) => arr.indexOf(id) === index)
  .sort();

console.log(`📊 Found ${templateIds.length} templates in registry\n`);

let fullyTranslated = 0;
let missingEnglish = 0;
let missingRussian = 0;
let missingHebrew = 0;
let missingFile = 0;

const issues = {
  noFile: [],
  emptyEn: [],
  emptyRu: [],
  emptyHe: [],
  missingEnKeys: [],
  missingRuKeys: [],
  missingHeKeys: []
};

for (const templateId of templateIds) {
  const filePath = path.join(TRANSLATIONS_DIR, `${templateId}.json`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${templateId.padEnd(40)} - FILE MISSING`);
    issues.noFile.push(templateId);
    missingFile++;
    continue;
  }

  // Read and parse file
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Check each language
  const hasEn = content.en && Object.keys(content.en).length > 0;
  const hasRu = content.ru && Object.keys(content.ru).length > 0;
  const hasHe = content.he && Object.keys(content.he).length > 0;

  // Count keys in each section
  const enKeys = hasEn ? Object.keys(content.en).length : 0;
  const ruKeys = hasRu ? Object.keys(content.ru).length : 0;
  const heKeys = hasHe ? Object.keys(content.he).length : 0;

  // Status
  if (hasEn && hasRu && hasHe) {
    const status = `en:${enKeys} ru:${ruKeys} he:${heKeys}`;

    // Check if key counts are similar (within 20% variance is acceptable)
    const minKeys = Math.min(enKeys, ruKeys, heKeys);
    const maxKeys = Math.max(enKeys, ruKeys, heKeys);
    const variance = ((maxKeys - minKeys) / maxKeys) * 100;

    if (variance < 20) {
      console.log(`✅ ${templateId.padEnd(40)} [${status}]`);
      fullyTranslated++;
    } else {
      console.log(`⚠️  ${templateId.padEnd(40)} [${status}] - Key count mismatch`);
      if (enKeys > ruKeys * 1.2) issues.missingRuKeys.push(templateId);
      if (enKeys > heKeys * 1.2) issues.missingHeKeys.push(templateId);
    }
  } else {
    const status = `en:${hasEn ? enKeys : '✗'} ru:${hasRu ? ruKeys : '✗'} he:${hasHe ? heKeys : '✗'}`;
    console.log(`❌ ${templateId.padEnd(40)} [${status}]`);

    if (!hasEn || enKeys === 0) {
      issues.emptyEn.push(templateId);
      missingEnglish++;
    }
    if (!hasRu || ruKeys === 0) {
      issues.emptyRu.push(templateId);
      missingRussian++;
    }
    if (!hasHe || heKeys === 0) {
      issues.emptyHe.push(templateId);
      missingHebrew++;
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(80));
console.log(`✅ Fully translated (all 3 languages): ${fullyTranslated}/${templateIds.length}`);
console.log(`❌ Missing file: ${missingFile}`);
console.log(`❌ Missing/Empty English: ${missingEnglish}`);
console.log(`❌ Missing/Empty Russian: ${missingRussian}`);
console.log(`❌ Missing/Empty Hebrew: ${missingHebrew}`);
console.log('='.repeat(80));

// Report issues
if (issues.noFile.length > 0) {
  console.log('\n❌ Templates with MISSING files:');
  issues.noFile.forEach(id => console.log(`   - ${id}`));
}

if (issues.emptyEn.length > 0) {
  console.log('\n❌ Templates with EMPTY/MISSING English:');
  issues.emptyEn.forEach(id => console.log(`   - ${id}`));
}

if (issues.emptyRu.length > 0) {
  console.log('\n❌ Templates with EMPTY/MISSING Russian:');
  issues.emptyRu.forEach(id => console.log(`   - ${id}`));
}

if (issues.emptyHe.length > 0) {
  console.log('\n❌ Templates with EMPTY/MISSING Hebrew:');
  issues.emptyHe.forEach(id => console.log(`   - ${id}`));
}

if (issues.missingRuKeys.length > 0) {
  console.log('\n⚠️  Templates with INCOMPLETE Russian translations:');
  issues.missingRuKeys.forEach(id => console.log(`   - ${id}`));
}

if (issues.missingHeKeys.length > 0) {
  console.log('\n⚠️  Templates with INCOMPLETE Hebrew translations:');
  issues.missingHeKeys.forEach(id => console.log(`   - ${id}`));
}

console.log('');

// Exit code
process.exit(fullyTranslated === templateIds.length ? 0 : 1);
