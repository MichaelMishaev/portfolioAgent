const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all component files
const componentFiles = glob.sync('components/**/*.{tsx,jsx}', { cwd: path.join(__dirname, '..') });
const appFiles = glob.sync('app/**/*.{tsx,jsx}', { cwd: path.join(__dirname, '..') });

const allFiles = [...componentFiles, ...appFiles];

console.log('=== SEARCHING FOR HARDCODED ENGLISH TEXT ===\n');

const hardcodedPatterns = [
  // Common UI text patterns
  /["'](?:Click|Select|Choose|View|Edit|Delete|Add|Create|Update|Save|Cancel|Submit|Back|Next|Previous|Close|Open|Show|Hide)[^"']*["']/g,
  // Button/Link text
  /button.*>([A-Z][a-z\s]+)</gi,
  // Common words
  /["'](?:Home|About|Contact|Services|Products|Portfolio|Gallery|Blog|News|FAQ|Help|Support|Login|Logout|Register|Search|Filter|Sort)[^"']*["']/g,
];

let foundCount = 0;

for (const file of allFiles.slice(0, 50)) { // Check first 50 files
  const filePath = path.join(__dirname, '..', file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Skip if file uses translation hooks
  if (content.includes('useI18n') || content.includes('translations[')) {
    continue;
  }

  // Check for hardcoded English text
  let hasHardcoded = false;

  for (const pattern of hardcodedPatterns) {
    const matches = content.match(pattern);
    if (matches && matches.length > 0) {
      if (!hasHardcoded) {
        console.log(`\n📄 File: ${file}`);
        hasHardcoded = true;
        foundCount++;
      }
      console.log(`  Found: ${matches.slice(0, 5).join(', ')}`);
    }
  }
}

console.log(`\n\n=== SUMMARY ===`);
console.log(`Files checked: ${Math.min(allFiles.length, 50)}`);
console.log(`Files with hardcoded text: ${foundCount}`);
