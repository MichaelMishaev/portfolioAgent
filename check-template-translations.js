const t = require('./lib/template-translations.json');

console.log('=== Template Translations Check ===');
console.log('EN has serviceMarketplace:', !!t.en.serviceMarketplace);
console.log('RU has serviceMarketplace:', !!t.ru.serviceMarketplace);

if (t.en.serviceMarketplace) {
  console.log('\nEN serviceMarketplace keys:', Object.keys(t.en.serviceMarketplace));
  console.log('Has nav?', !!t.en.serviceMarketplace.nav);
  if (t.en.serviceMarketplace.nav) {
    console.log('Nav keys:', Object.keys(t.en.serviceMarketplace.nav));
    console.log('features:', t.en.serviceMarketplace.nav.features);
  }
} else {
  console.log('\n❌ serviceMarketplace NOT FOUND in EN');
}

if (t.ru.serviceMarketplace) {
  console.log('\n✅ RU serviceMarketplace exists');
} else {
  console.log('\n❌ serviceMarketplace NOT FOUND in RU');
}
