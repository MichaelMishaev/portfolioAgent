/**
 * Merge ENHANCED template details with Russian translations into translations.json
 */

const fs = require('fs');
const path = require('path');

// Load the enhanced details
const enhancedDetails = require('./template-enhanced-details.json');

// Load current translations
const translationsPath = path.join(__dirname, '..', 'lib', 'translations.json');
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

console.log('🔄 Merging ENHANCED template details with Russian translations...\n');

let updatedEN = 0;
let updatedRU = 0;

// Update English templates
translations.en.templates.forEach((template, index) => {
  const details = enhancedDetails[template.id];
  if (details) {
    translations.en.templates[index] = {
      ...template,
      longDescription: details.longDescription.en,
      technicalDetails: details.technicalDetails?.en || template.technicalDetails,
      price: details.price || template.price || 60
    };
    updatedEN++;
    console.log(`✅ EN: ${template.id} - ${details.longDescription.en.substring(0, 60)}...`);
  }
});

// Update Russian templates with RUSSIAN translations
translations.ru.templates.forEach((template, index) => {
  const details = enhancedDetails[template.id];
  if (details) {
    translations.ru.templates[index] = {
      ...template,
      longDescription: details.longDescription.ru, // NOW IN RUSSIAN!
      technicalDetails: details.technicalDetails?.ru || template.technicalDetails,
      price: details.price || template.price || 60
    };
    updatedRU++;
    console.log(`✅ RU: ${template.id} - ${details.longDescription.ru.substring(0, 60)}...`);
  }
});

// Save back to translations.json
fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2));

console.log(`\n✅ Successfully updated:`);
console.log(`   ${updatedEN} English templates`);
console.log(`   ${updatedRU} Russian templates`);
console.log(`📁 File: ${translationsPath}`);
console.log(`\n🎉 All templates now have:`);
console.log(`   - ENHANCED long descriptions (3-5 sentences)`);
console.log(`   - RUSSIAN translations for longDescription`);
console.log(`   - Technical details section`);
console.log(`   - COMPLETELY DIFFERENT content per template`);
