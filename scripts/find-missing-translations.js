const fs = require('fs');
const path = require('path');

// Read translation files
const translationsPath = path.join(__dirname, '../lib/translations.json');
const templateTranslationsPath = path.join(__dirname, '../lib/template-translations.json');

const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
const templateTranslations = JSON.parse(fs.readFileSync(templateTranslationsPath, 'utf8'));

console.log('=== MISSING RUSSIAN TRANSLATIONS IN translations.json ===\n');

let missingCount = 0;
let totalCount = 0;

for (const [key, value] of Object.entries(translations)) {
  totalCount++;
  if (value.en && !value.ru) {
    missingCount++;
    console.log(`Key: ${key}`);
    console.log(`  EN: ${value.en}`);
    console.log(`  RU: MISSING\n`);
  }
}

console.log(`\n=== SUMMARY for translations.json ===`);
console.log(`Total keys: ${totalCount}`);
console.log(`Missing Russian: ${missingCount}`);
console.log(`Percentage complete: ${((totalCount - missingCount) / totalCount * 100).toFixed(1)}%\n`);

console.log('\n=== MISSING RUSSIAN TRANSLATIONS IN template-translations.json ===\n');

let templateMissingCount = 0;
let templateTotalCount = 0;

for (const [templateKey, templateData] of Object.entries(templateTranslations)) {
  for (const [field, value] of Object.entries(templateData)) {
    templateTotalCount++;
    if (value.en && !value.ru) {
      templateMissingCount++;
      console.log(`Template: ${templateKey}`);
      console.log(`Field: ${field}`);
      console.log(`  EN: ${value.en}`);
      console.log(`  RU: MISSING\n`);
    }
  }
}

console.log(`\n=== SUMMARY for template-translations.json ===`);
console.log(`Total fields: ${templateTotalCount}`);
console.log(`Missing Russian: ${templateMissingCount}`);
console.log(`Percentage complete: ${((templateTotalCount - templateMissingCount) / templateTotalCount * 100).toFixed(1)}%\n`);

console.log(`\n=== OVERALL SUMMARY ===`);
console.log(`Total translations: ${totalCount + templateTotalCount}`);
console.log(`Missing Russian: ${missingCount + templateMissingCount}`);
console.log(`Overall completion: ${((totalCount + templateTotalCount - missingCount - templateMissingCount) / (totalCount + templateTotalCount) * 100).toFixed(1)}%`);
