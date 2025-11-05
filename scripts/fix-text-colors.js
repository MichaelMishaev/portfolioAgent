#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Patterns for text colors that are already valid
const VALID_COLOR_PATTERNS = [
  /text-gray-\d+/,
  /text-white/,
  /text-black/,
  /text-slate-\d+/,
  /text-zinc-\d+/,
  /text-neutral-\d+/,
  /text-stone-\d+/,
  /text-red-\d+/,
  /text-blue-\d+/,
  /text-green-\d+/,
  /text-yellow-\d+/,
  /text-purple-\d+/,
  /text-pink-\d+/,
  /text-indigo-\d+/,
  /text-amber-\d+/,
  /text-emerald-\d+/,
  /text-teal-\d+/,
  /text-cyan-\d+/,
  /text-sky-\d+/,
  /text-violet-\d+/,
  /text-fuchsia-\d+/,
  /text-rose-\d+/,
  /text-lime-\d+/,
  /text-orange-\d+/,
  /text-primary/,
  /text-secondary/,
  /text-muted-foreground/,
  /text-foreground/,
  /text-destructive/,
  /text-accent/,
  /text-card/,
  /text-popover/,
  /text-primary-foreground/,
  /text-secondary-foreground/,
  /text-accent-foreground/,
  /text-card-foreground/,
  /text-popover-foreground/
];

// Patterns that suggest the element is an icon/emoji and doesn't need color
const ICON_PATTERNS = [
  /\{[^}]*(emoji|icon|Icon)\}/,
  /[🎀🎙️💌📬🏆]/,
  /className="[^"]*(?:emoji|icon)[^"]*"/
];

function hasValidColor(className) {
  return VALID_COLOR_PATTERNS.some(pattern => pattern.test(className));
}

function isIconElement(line) {
  return ICON_PATTERNS.some(pattern => pattern.test(line));
}

function isTextContent(line) {
  // Check if line contains actual text content (not just icons/emojis/variables)
  // Look for quoted strings or substantial text
  const hasQuotedText = /"[^"]{5,}"/.test(line) || /'[^']{5,}'/.test(line);
  const hasTextNode = />\s*[A-Za-z]{3,}/.test(line);
  return hasQuotedText || hasTextNode;
}

function shouldFix(line, className) {
  // Only fix if:
  // 1. Has text size class
  if (!/text-(\d*xl|lg|base|sm|xs)\b/.test(className)) return false;

  // 2. Doesn't have valid color
  if (hasValidColor(className)) return false;

  // 3. Not an icon/emoji
  if (isIconElement(line)) return false;

  // 4. Not just a container (has actual text content or is a paragraph/heading)
  if (!isTextContent(line) && !/^[^<]*<(p|h\d|span|div)[^>]*className/.test(line.trim())) return false;

  // 5. Skip if it has opacity without color (likely intentional styling)
  if (/opacity-\d+/.test(className) && !/<(p|h\d|blockquote)/.test(line)) return false;

  return true;
}

function getDefaultColor(context) {
  // Determine appropriate color based on context
  if (/bg-primary|bg-blue-|bg-gradient/.test(context)) {
    return 'text-white';
  }
  if (/bg-gray-900|bg-black|bg-slate-900/.test(context)) {
    return 'text-white';
  }
  if (/bg-muted|bg-gray-|bg-slate-/.test(context)) {
    return 'text-foreground';
  }
  // Default for light backgrounds
  return 'text-gray-900';
}

function addColorToClassName(className, color) {
  // Extract the className value
  const match = className.match(/className="([^"]*)"/);
  if (!match) return className;

  const classes = match[1];
  // Add color before any responsive modifiers or at the end
  const parts = classes.split(' ');
  const colorAdded = [...parts, color].join(' ');

  return `className="${colorAdded}"`;
}

async function fixTemplateColors(dryRun = false) {
  const templatesDir = path.join(__dirname, '../components/templates');
  const templateFiles = await glob('**/*-template.tsx', {
    cwd: templatesDir,
    ignore: ['**/*.bak*', '**/*.broken', '**/*.final']
  });

  const mode = dryRun ? 'DRY RUN' : 'APPLYING FIXES';
  console.log(`\n🔧 ${mode}: Fixing text colors in ${templateFiles.length} templates...\n`);

  let totalFixed = 0;
  const fixedFiles = [];

  for (const file of templateFiles) {
    const filePath = path.join(templatesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    let modified = false;
    let fileFixCount = 0;

    const newLines = lines.map((line, index) => {
      const classNameMatch = line.match(/className="[^"]*"/g);
      if (!classNameMatch) return line;

      let modifiedLine = line;

      classNameMatch.forEach(className => {
        // Use conservative shouldFix check
        if (!shouldFix(line, className)) return;

        // Get context (surrounding lines) to determine appropriate color
        const contextStart = Math.max(0, index - 5);
        const contextEnd = Math.min(lines.length, index + 5);
        const context = lines.slice(contextStart, contextEnd).join('\n');

        const color = getDefaultColor(context);
        const newClassName = addColorToClassName(className, color);

        if (newClassName !== className) {
          modifiedLine = modifiedLine.replace(className, newClassName);
          modified = true;
          fileFixCount++;
        }
      });

      return modifiedLine;
    });

    if (modified) {
      if (!dryRun) {
        // Create backup
        fs.writeFileSync(`${filePath}.bak.auto`, content);

        // Write fixed content
        fs.writeFileSync(filePath, newLines.join('\n'));
      }

      fixedFiles.push({ file, count: fileFixCount });
      totalFixed += fileFixCount;

      console.log(`${dryRun ? '📋' : '✅'} ${file}: ${fileFixCount} fixes ${dryRun ? 'would be applied' : 'applied'}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`${dryRun ? '📋 DRY RUN COMPLETE' : '🎉 FIXES COMPLETED'}`);
  console.log('='.repeat(80));
  console.log(`Files that ${dryRun ? 'would be' : 'were'} modified: ${fixedFiles.length}`);
  console.log(`Total fixes ${dryRun ? 'identified' : 'applied'}: ${totalFixed}`);
  if (!dryRun) {
    console.log(`\nBackup files created with .bak.auto extension`);
  }
  console.log(`\n⚠️  IMPORTANT: ${dryRun ? 'Run without --dry-run to apply fixes' : 'Review changes and test before committing!'}`);
  console.log('\n');
}

// Check for --dry-run flag
const isDryRun = process.argv.includes('--dry-run');
fixTemplateColors(isDryRun).catch(console.error);
