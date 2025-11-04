#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read translations
const translationsPath = path.join(__dirname, '../lib/translations.json');
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

// Get all feature explanations that exist
const englishExplanations = translations.en.featureExplanations || {};
const russianExplanations = translations.ru.featureExplanations || {};

console.log('\n📊 Feature Explanations Analysis\n');
console.log('='.repeat(60));

// Collect all unique features from all templates
const allFeatures = new Set();

// Get all template objects from the translations
// Templates are stored in translations.en.templates array
if (translations.en.templates && Array.isArray(translations.en.templates)) {
  translations.en.templates.forEach(template => {
    if (template.whatsIncluded && Array.isArray(template.whatsIncluded)) {
      template.whatsIncluded.forEach(feature => {
        allFeatures.add(feature);
      });
    }
  });
}

console.log(`\n✅ Total unique features found: ${allFeatures.size}`);
console.log(`✅ Features with English explanations: ${Object.keys(englishExplanations).length}`);
console.log(`✅ Features with Russian explanations: ${Object.keys(russianExplanations).length}`);

// Find features without explanations
const missingEnglish = [];
const missingRussian = [];

allFeatures.forEach(feature => {
  if (!englishExplanations[feature]) {
    missingEnglish.push(feature);
  }
  if (!russianExplanations[feature]) {
    missingRussian.push(feature);
  }
});

if (missingEnglish.length > 0) {
  console.log('\n⚠️  Features missing ENGLISH explanations:');
  console.log('='.repeat(60));
  missingEnglish.forEach((feature, index) => {
    console.log(`${index + 1}. "${feature}"`);
  });
}

if (missingRussian.length > 0) {
  console.log('\n⚠️  Features missing RUSSIAN explanations:');
  console.log('='.repeat(60));
  missingRussian.forEach((feature, index) => {
    console.log(`${index + 1}. "${feature}"`);
  });
}

// Find explanations that exist but are not used in any template
const unusedEnglish = Object.keys(englishExplanations).filter(
  key => !allFeatures.has(key)
);
const unusedRussian = Object.keys(russianExplanations).filter(
  key => !allFeatures.has(key)
);

if (unusedEnglish.length > 0) {
  console.log('\n💡 English explanations that are not used in any template:');
  console.log('='.repeat(60));
  unusedEnglish.forEach((feature, index) => {
    console.log(`${index + 1}. "${feature}"`);
  });
}

if (unusedRussian.length > 0) {
  console.log('\n💡 Russian explanations that are not used in any template:');
  console.log('='.repeat(60));
  unusedRussian.forEach((feature, index) => {
    console.log(`${index + 1}. "${feature}"`);
  });
}

// Show all features in use
console.log('\n📝 All features currently used in templates:');
console.log('='.repeat(60));
const featuresArray = Array.from(allFeatures).sort();
featuresArray.forEach((feature, index) => {
  const hasEN = englishExplanations[feature] ? '✅' : '❌';
  const hasRU = russianExplanations[feature] ? '✅' : '❌';
  console.log(`${index + 1}. "${feature}" - EN: ${hasEN} RU: ${hasRU}`);
});

console.log('\n' + '='.repeat(60));
console.log('✨ Analysis complete!\n');

// Export results
const results = {
  totalFeatures: allFeatures.size,
  englishExplanations: Object.keys(englishExplanations).length,
  russianExplanations: Object.keys(russianExplanations).length,
  missingEnglish,
  missingRussian,
  unusedEnglish,
  unusedRussian,
  allFeatures: featuresArray
};

const outputPath = path.join(__dirname, 'feature-explanations-analysis.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log(`📄 Results saved to: ${outputPath}\n`);
