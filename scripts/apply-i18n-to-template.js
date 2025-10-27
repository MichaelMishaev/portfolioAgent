#!/usr/bin/env node

/**
 * Script to automatically apply i18n to template files
 * Usage: node apply-i18n-to-template.js <template-file-path>
 */

const fs = require('fs');
const path = require('path');

const templatePath = process.argv[2];

if (!templatePath) {
  console.error('Usage: node apply-i18n-to-template.js <template-file-path>');
  process.exit(1);
}

let content = fs.readFileSync(templatePath, 'utf8');

// Check if already using i18n
if (content.includes('useI18n')) {
  console.log('✓ Template already uses i18n');
  process.exit(0);
}

// Add import at the top (after "use client" if present)
const importStatement = `import { useI18n } from "@/lib/i18n-context";\nimport { LanguageToggle } from "@/components/language-toggle";`;

if (content.includes('"use client"')) {
  content = content.replace('"use client";', '"use client";\n\n' + importStatement);
} else {
  content = importStatement + '\n\n' + content;
}

// Add useI18n hook at the start of the component function
const componentMatch = content.match(/export function (\w+)/);
if (componentMatch) {
  const componentName = componentMatch[1];
  content = content.replace(
    new RegExp(`export function ${componentName}\\(\\) {`),
    `export function ${componentName}() {\n  const { tt } = useI18n();`
  );
}

// Write back
fs.writeFileSync(templatePath, content);
console.log('✓ Applied i18n to template');
