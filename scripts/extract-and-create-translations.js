const fs = require('fs');
const path = require('path');

// For now, let's create minimal working translations that prevent the "Loading..." screen
// We'll use a fallback approach where the component can use its hardcoded data

const templatesNeedingTranslations = [
  'productAudio', 'productCourse', 'productFashion', 'productLuxury', 'productPhysical',
  'productPremium', 'productSaas', 'productTech', 'productVacuum',
  'blogMagazine', 'blogPersonal', 'blogTech',
  'immersive3d', 'arSpatial', 'bentoGrid', 'boldTypography', 'cardModular', 'collageMaximalist',
  'darkModeTemplate', 'dataDashboard', 'fullscreenImmersive', 'gridMasonry',
  'illustrationFocus', 'kineticTypography', 'neoBrutalistTemplate', 'organicLiquid',
  'linPortfolioElegance', 'linProfessionalAuthority',
  'singlePage', 'splitScreenTemplate', 'textHeavy', 'voiceFirst', 'y2kRetro'
];

console.log('📝 Creating minimal translations to prevent Loading screens...\n');

// Read existing translations
const translationsPath = path.join(__dirname, '../lib/template-translations.json');
const existingTranslations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

let addedCount = 0;

templatesNeedingTranslations.forEach(key => {
  if (!existingTranslations.en[key]) {
    // Add minimal translation structure that will work with the fallback pattern
    existingTranslations.en[key] = {
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        portfolio: "Portfolio",
        contact: "Contact"
      },
      hero: {
        title: "Welcome",
        subtitle: "Demo Template",
        cta: "Get Started"
      }
    };

    existingTranslations.ru[key] = {
      nav: {
        home: "Главная",
        about: "О нас",
        services: "Услуги",
        portfolio: "Портфолио",
        contact: "Контакты"
      },
      hero: {
        title: "Добро пожаловать",
        subtitle: "Демо шаблон",
        cta: "Начать"
      }
    };

    addedCount++;
    console.log(`✅ Added minimal translations for: ${key}`);
  } else {
    console.log(`⏭️  ${key} already has translations`);
  }
});

// Save updated translations
fs.writeFileSync(translationsPath, JSON.stringify(existingTranslations, null, 2));

console.log(`\n✅ Added translations for ${addedCount} templates`);
console.log('💾 Updated: lib/template-translations.json');
