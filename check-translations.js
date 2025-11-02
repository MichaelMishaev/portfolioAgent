const translations = require('./lib/translations.json');

console.log('=== Translation Check ===');
console.log('EN has serviceMarketplace:', !!translations.en.serviceMarketplace);
console.log('RU has serviceMarketplace:', !!translations.ru.serviceMarketplace);

if (translations.en.serviceMarketplace) {
  console.log('\nEN serviceMarketplace keys:', Object.keys(translations.en.serviceMarketplace));
  console.log('Has nav?', !!translations.en.serviceMarketplace.nav);
  if (translations.en.serviceMarketplace.nav) {
    console.log('Nav keys:', Object.keys(translations.en.serviceMarketplace.nav));
  }
}

console.log('\n=== Testing template access ===');
console.log('tt.serviceMarketplace would be:', translations.en.serviceMarketplace ? 'DEFINED' : 'UNDEFINED');
