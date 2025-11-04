const fs = require('fs');
const path = require('path');

const translationsPath = path.join(__dirname, '../lib/translations.json');
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

// Add missing translations
const newTranslations = {
  footer: {
    templates: { en: "Templates", ru: "Шаблоны" },
    allTemplates: { en: "All Templates", ru: "Все шаблоны" },
    professional: { en: "Professional", ru: "Профессиональные" },
    creative: { en: "Creative", ru: "Креативные" },
    modern: { en: "Modern", ru: "Современные" },
    resources: { en: "Resources", ru: "Ресурсы" },
    documentation: { en: "Documentation", ru: "Документация" },
    guides: { en: "Guides", ru: "Руководства" },
    support: { en: "Support", ru: "Поддержка" },
    connect: { en: "Connect", ru: "Связаться" }
  },
  errors: {
    somethingWentWrong: { en: "Something went wrong", ru: "Что-то пошло не так" },
    tryAgain: { en: "Try Again", ru: "Попробовать снова" }
  },
  buttons: {
    customizeTemplate: { en: "Customize Template", ru: "Настроить шаблон" }
  }
};

// Merge new translations
if (!translations.en.footer) {
  translations.en.footer = {};
  translations.ru.footer = {};
}

if (!translations.en.errors) {
  translations.en.errors = {};
  translations.ru.errors = {};
}

if (!translations.en.buttons) {
  translations.en.buttons = {};
  translations.ru.buttons = {};
}

// Add footer translations
Object.keys(newTranslations.footer).forEach(key => {
  translations.en.footer[key] = newTranslations.footer[key].en;
  translations.ru.footer[key] = newTranslations.footer[key].ru;
});

// Add error translations
Object.keys(newTranslations.errors).forEach(key => {
  translations.en.errors[key] = newTranslations.errors[key].en;
  translations.ru.errors[key] = newTranslations.errors[key].ru;
});

// Add button translations
Object.keys(newTranslations.buttons).forEach(key => {
  translations.en.buttons[key] = newTranslations.buttons[key].en;
  translations.ru.buttons[key] = newTranslations.buttons[key].ru;
});

// Write back
fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2));

console.log('✅ Added missing translations to translations.json');
console.log('\nAdded:');
console.log('  - footer: 10 keys');
console.log('  - errors: 2 keys');
console.log('  - buttons: 1 key');
