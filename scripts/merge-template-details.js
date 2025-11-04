/**
 * Merge unique template details into translations.json
 */

const fs = require('fs');
const path = require('path');

// Load the unique details
const uniqueDetails = require('./template-unique-details.json');

// Load current translations
const translationsPath = path.join(__dirname, '..', 'lib', 'translations.json');
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

console.log('🔄 Merging unique template details into translations...\n');

let updatedCount = 0;

// Update English templates
translations.en.templates.forEach((template, index) => {
  const details = uniqueDetails[template.id];
  if (details) {
    translations.en.templates[index] = {
      ...template,
      longDescription: details.longDescription,
      whatsIncluded: details.whatsIncluded.en,
      bestFor: details.bestFor.en,
      price: details.price || template.price || 60
    };
    updatedCount++;
    console.log(`✅ Updated EN: ${template.id}`);
  }
});

// Update Russian templates
translations.ru.templates.forEach((template, index) => {
  const details = uniqueDetails[template.id];
  if (details) {
    // For Russian, use machine translation or provide Russian versions
    translations.ru.templates[index] = {
      ...template,
      longDescription: details.longDescription, // Keep English for now, can translate later
      whatsIncluded: details.whatsIncluded.ru,
      bestFor: details.bestFor.ru,
      price: details.price || template.price || 60
    };
    console.log(`✅ Updated RU: ${template.id}`);
  }
});

// Save back to translations.json
fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2));

console.log(`\n✅ Successfully updated ${updatedCount} templates in translations.json`);
console.log(`📁 File: ${translationsPath}`);
console.log(`\n🎉 All template details are now unique and specific!`);
