#!/usr/bin/env node

/**
 * Fix Dark Mode Pseudo-Class Misuse
 *
 * Bug #22: Systematic Text Visibility Crisis - Dark Mode Edition
 *
 * Problem: 212 instances across 30 templates mixing Tailwind's dark: pseudo-class
 * with JavaScript-based dark mode state (darkMode variable).
 *
 * The dark: pseudo-class only works when a parent element has the "dark" class,
 * but these templates use {darkMode ? ... : ...} state instead.
 *
 * This script converts:
 *   className="text-gray-900 dark:text-white"
 * To:
 *   className={darkMode ? 'text-white' : 'text-gray-900'}
 *
 * Or for complex cases:
 *   className="foo bar text-gray-900 dark:text-white baz"
 * To:
 *   className={`foo bar ${darkMode ? 'text-white' : 'text-gray-900'} baz`}
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');

// Files to process (excluding tech-blog which is already fixed manually)
const filesToProcess = [
  'components/templates/bold-typography/bold-typography-template.tsx',
  'components/templates/bento-grid/bento-grid-template.tsx',
  'components/templates/blog-pages/archetypes-editorial-template.tsx',
  'components/templates/blog-pages/archetypes-minimal-template.tsx',
  'components/templates/blog-pages/magazine-blog-template.tsx',
  'components/templates/blog-pages/personal-blog-template.tsx',
  'components/templates/card-modular/card-modular-template.tsx',
  'components/templates/minimalist/minimalist-template.tsx',
  'components/templates/online-business/online-business-agency-template.tsx',
  'components/templates/online-business/online-business-coach-template.tsx',
  'components/templates/online-business/online-business-course-template.tsx',
  'components/templates/online-business-saas/online-business-saas-template.tsx',
  'components/templates/organic-liquid/organic-liquid-template.tsx',
  'components/templates/product-pages/agency-service-template.tsx',
  'components/templates/product-pages/audio-product-template.tsx',
  'components/templates/product-pages/community-service-template.tsx',
  'components/templates/product-pages/dfyou-service-template.tsx',
  'components/templates/product-pages/enterprise-service-template.tsx',
  'components/templates/product-pages/fashion-product-template.tsx',
  'components/templates/product-pages/physical-product-template.tsx',
  'components/templates/product-pages/vacuum-product-template.tsx',
  'components/templates/professional-b2b/professional-b2b-template.tsx',
  'components/templates/saas-feature-rich/saas-feature-rich-template.tsx',
  'components/templates/service-marketplace/service-marketplace-template.tsx',
  'components/templates/single-page/single-page-template.tsx',
  'components/templates/split-screen/split-screen-template.tsx',
  'components/templates/text-heavy/text-heavy-template.tsx',
];

let totalFixed = 0;
const fixesByFile = {};

console.log('\n🔧 Fixing Dark Mode Pseudo-Class Misuse\n');
console.log(`Mode: ${DRY_RUN ? '🔍 DRY RUN (no changes will be saved)' : '✏️  APPLYING FIXES'}\n`);

function fixDarkModeClasses(content, filePath) {
  let modified = content;
  let fileFixCount = 0;

  // Pattern: className="..." or className='...' containing dark:text-
  // This handles simple string literals
  const simpleStringPattern = /className=(["'])([^"']*?dark:text-[^"']*?)\1/g;

  modified = modified.replace(simpleStringPattern, (match, quote, classContent) => {
    // Extract light and dark text colors
    const darkMatch = classContent.match(/dark:(text-[\w-]+)/);
    if (!darkMatch) return match;

    const darkColor = darkMatch[1];

    // Find the light color (text-X before dark:text-Y)
    const lightMatch = classContent.match(/(text-[\w-]+)(?=.*?dark:text-)/);
    if (!lightMatch) return match;

    const lightColor = lightMatch[1];

    // Get other classes (everything except text-X and dark:text-Y)
    const otherClasses = classContent
      .replace(new RegExp(`\\b${lightColor}\\b`), '')
      .replace(new RegExp(`\\bdark:${darkColor}\\b`), '')
      .trim()
      .replace(/\s+/g, ' ');

    fileFixCount++;

    // If there are other classes, use template literal
    if (otherClasses) {
      return `className={\`${otherClasses} \${darkMode ? '${darkColor}' : '${lightColor}'}\`}`;
    } else {
      // No other classes, use simple conditional
      return `className={darkMode ? '${darkColor}' : '${lightColor}'}`;
    }
  });

  // Pattern: className={`...${...}...`} or className={...} containing dark:text-
  // This handles template literals and complex expressions
  const templateLiteralPattern = /className=\{`([^`]*?dark:text-[^`]*?)`\}/g;

  modified = modified.replace(templateLiteralPattern, (match, classContent) => {
    // Skip if already has darkMode conditional for this text
    if (/darkMode\s*\?\s*['"`]text-/.test(classContent)) {
      return match;
    }

    // Extract dark:text-X pattern
    const darkMatch = classContent.match(/dark:(text-[\w-]+)/);
    if (!darkMatch) return match;

    const darkColor = darkMatch[1];

    // Find light color
    const lightMatch = classContent.match(/(text-[\w-]+)(?=.*?dark:text-)/);
    if (!lightMatch) return match;

    const lightColor = lightMatch[1];

    // Replace both colors with conditional
    let newClassContent = classContent
      .replace(new RegExp(`\\b${lightColor}\\b`), '')
      .replace(new RegExp(`\\bdark:${darkColor}\\b`), '')
      .trim()
      .replace(/\s+/g, ' ');

    fileFixCount++;

    // Add conditional at the end
    if (newClassContent) {
      return `className={\`${newClassContent} \${darkMode ? '${darkColor}' : '${lightColor}'}\`}`;
    } else {
      return `className={darkMode ? '${darkColor}' : '${lightColor}'}`;
    }
  });

  // Pattern: Handle edge cases with mixed quotes and existing template strings
  // className={" ... dark:text-... "}
  const mixedPattern = /className=\{(["'])([^"']*?dark:text-[^"']*?)\1\}/g;

  modified = modified.replace(mixedPattern, (match, quote, classContent) => {
    // Skip if already processed
    if (/darkMode\s*\?/.test(match)) return match;

    const darkMatch = classContent.match(/dark:(text-[\w-]+)/);
    if (!darkMatch) return match;

    const darkColor = darkMatch[1];

    const lightMatch = classContent.match(/(text-[\w-]+)(?=.*?dark:text-)/);
    if (!lightMatch) return match;

    const lightColor = lightMatch[1];

    const otherClasses = classContent
      .replace(new RegExp(`\\b${lightColor}\\b`), '')
      .replace(new RegExp(`\\bdark:${darkColor}\\b`), '')
      .trim()
      .replace(/\s+/g, ' ');

    fileFixCount++;

    if (otherClasses) {
      return `className={\`${otherClasses} \${darkMode ? '${darkColor}' : '${lightColor}'}\`}`;
    } else {
      return `className={darkMode ? '${darkColor}' : '${lightColor}'}`;
    }
  });

  if (fileFixCount > 0) {
    fixesByFile[filePath] = fileFixCount;
    totalFixed += fileFixCount;
  }

  return { content: modified, fixCount: fileFixCount };
}

// Process each file
for (const relativePath of filesToProcess) {
  const filePath = path.join(__dirname, '..', relativePath);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${relativePath} (file not found)`);
    continue;
  }

  const originalContent = fs.readFileSync(filePath, 'utf8');
  const { content: modifiedContent, fixCount } = fixDarkModeClasses(originalContent, relativePath);

  if (fixCount > 0) {
    console.log(`✅ ${relativePath}: ${fixCount} fixes`);

    if (!DRY_RUN) {
      // Create backup
      fs.writeFileSync(`${filePath}.bak.dark`, originalContent);

      // Write fixed content
      fs.writeFileSync(filePath, modifiedContent, 'utf8');
    }
  } else {
    console.log(`✓  ${relativePath}: No dark: text issues found`);
  }
}

// Summary
console.log('\n' + '='.repeat(80));
console.log('📊 FIX SUMMARY');
console.log('='.repeat(80));
console.log(`Total files processed: ${filesToProcess.length}`);
console.log(`Total files with fixes: ${Object.keys(fixesByFile).length}`);
console.log(`Total dark:text- instances fixed: ${totalFixed}`);

if (DRY_RUN) {
  console.log('\n🔍 DRY RUN MODE - No files were modified');
  console.log('Run without --dry-run to apply fixes\n');
} else {
  console.log('\n✅ All fixes applied!');
  console.log('Backups saved with .bak.dark extension\n');
}

if (totalFixed > 0 && !DRY_RUN) {
  console.log('📝 Next steps:');
  console.log('  1. npm run build              # Verify build passes');
  console.log('  2. Test templates in browser   # Verify text is visible');
  console.log('  3. git add .                   # Stage changes');
  console.log('  4. git commit -m "Bug #22"     # Commit fixes\n');
}

process.exit(0);
