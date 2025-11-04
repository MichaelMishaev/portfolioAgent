const fs = require('fs');
const path = require('path');

// Read all component and page files
function findJSXFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        findJSXFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Check if file uses translation system
function usesTranslations(content) {
  return content.includes('useI18n') ||
         content.includes('t.') ||
         content.includes('tt.') ||
         content.includes('translations[') ||
         content.includes('templateTranslations[');
}

// Find hardcoded English strings in JSX
function findHardcodedStrings(content) {
  const strings = [];

  // Match strings in JSX like >English text< or {  "English text" }
  const jsxTextPattern = />([A-Z][a-zA-Z\s,.'!?-]{3,})</g;
  const jsxStringPattern = />\s*{?\s*["']([A-Z][a-zA-Z\s,.'!?-]{3,})["']\s*}?\s*</g;

  // Match button/link text
  const buttonPattern = /<button[^>]*>([^<]+)</gi;
  const linkPattern = /<Link[^>]*>([^<]+)</gi;
  const aPattern = /<a[^>]*>([^<]+)</gi;

  let match;

  // Find JSX text content
  while ((match = jsxTextPattern.exec(content)) !== null) {
    const text = match[1].trim();
    if (text && text.length > 2 && /[A-Z]/.test(text) && !/^[0-9]+$/.test(text)) {
      strings.push(text);
    }
  }

  // Find JSX string literals
  while ((match = jsxStringPattern.exec(content)) !== null) {
    const text = match[1].trim();
    if (text && text.length > 2) {
      strings.push(text);
    }
  }

  // Find button text
  while ((match = buttonPattern.exec(content)) !== null) {
    const text = match[1].trim();
    if (text && text.length > 2 && /[A-Z]/.test(text) && !text.includes('<')) {
      strings.push(text);
    }
  }

  return [...new Set(strings)];
}

console.log('🔍 Searching for untranslated English strings...\n');

const projectDir = path.join(__dirname, '..');
const componentsDir = path.join(projectDir, 'components');
const appDir = path.join(projectDir, 'app');

const componentFiles = findJSXFiles(componentsDir);
const appFiles = findJSXFiles(appDir);

const allFiles = [...componentFiles, ...appFiles];

console.log(`Found ${allFiles.length} JSX/TSX files\n`);
console.log('='.repeat(80) + '\n');

const filesWithUntranslated = [];

allFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');

  // Skip if file uses translation system
  if (usesTranslations(content)) {
    return;
  }

  const hardcodedStrings = findHardcodedStrings(content);

  if (hardcodedStrings.length > 0) {
    const relativePath = path.relative(projectDir, filePath);
    filesWithUntranslated.push({
      path: relativePath,
      strings: hardcodedStrings
    });

    console.log(`\n📄 ${relativePath}`);
    console.log(`   ❌ Found ${hardcodedStrings.length} hardcoded English strings:`);
    hardcodedStrings.forEach(str => {
      console.log(`      - "${str}"`);
    });
  }
});

console.log('\n' + '='.repeat(80));
console.log(`\n📊 SUMMARY\n`);
console.log(`Total files scanned: ${allFiles.length}`);
console.log(`Files with untranslated strings: ${filesWithUntranslated.length}`);

if (filesWithUntranslated.length > 0) {
  const allStrings = new Set();
  filesWithUntranslated.forEach(file => {
    file.strings.forEach(str => allStrings.add(str));
  });

  console.log(`Total unique untranslated strings: ${allStrings.size}`);

  console.log(`\n\n📝 All unique untranslated strings:\n`);
  Array.from(allStrings).sort().forEach(str => {
    console.log(`  - "${str}"`);
  });
} else {
  console.log(`\n✅ All files either use translations or have no hardcoded English text!`);
}
