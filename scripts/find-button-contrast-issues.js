#!/usr/bin/env node

/**
 * Find Button Contrast Issues in All Templates
 *
 * Scans all template files for buttons with potential contrast problems:
 * - variant="outline" without explicit text color
 * - Buttons without explicit background/text color combinations
 * - Missing dark mode variants
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function findContrastIssues() {
  console.log('🔍 Scanning all templates for button contrast issues...\n');

  const templateFiles = await glob('/Users/michaelmishayev/Desktop/Projects/portfolioWeb/components/templates/**/*-template.tsx');

  console.log(`Found ${templateFiles.length} template files\n`);

  const issues = [];

  for (const file of templateFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    const templateName = path.basename(file, '.tsx');

    // Pattern 1: variant="outline" without explicit text color
    const outlinePattern = /variant=["']outline["']/g;
    const matches = [...content.matchAll(outlinePattern)];

    if (matches.length > 0) {
      const lineNumbers = [];
      lines.forEach((line, index) => {
        if (line.includes('variant="outline"') || line.includes("variant='outline'")) {
          // Check if this line or nearby lines have text color defined
          const hasTextColor = line.includes('text-') ||
                                (lines[index + 1] && lines[index + 1].includes('text-')) ||
                                (lines[index - 1] && lines[index - 1].includes('text-'));

          if (!hasTextColor) {
            lineNumbers.push(index + 1);
          }
        }
      });

      if (lineNumbers.length > 0) {
        issues.push({
          file: file.replace('/Users/michaelmishayev/Desktop/Projects/portfolioWeb/', ''),
          template: templateName,
          issue: 'variant="outline" buttons without explicit text color',
          lines: lineNumbers,
          severity: 'high'
        });
      }
    }

    // Pattern 2: Buttons without dark mode text color variants
    const buttonLines = [];
    lines.forEach((line, index) => {
      if (line.includes('<Button') && !line.includes('dark:text-')) {
        buttonLines.push({
          line: index + 1,
          content: line.trim()
        });
      }
    });

    if (buttonLines.length > 0) {
      // Filter out buttons that are clearly using semantic classes
      const problematic = buttonLines.filter(b =>
        !b.content.includes('bg-white') &&
        !b.content.includes('bg-slate-900') &&
        !b.content.includes('bg-gray-900')
      );

      if (problematic.length > 0) {
        issues.push({
          file: file.replace('/Users/michaelmishayev/Desktop/Projects/portfolioWeb/', ''),
          template: templateName,
          issue: 'Buttons missing dark mode text color variants',
          lines: problematic.map(p => p.line),
          severity: 'medium'
        });
      }
    }
  }

  console.log('='.repeat(80));
  console.log('📊 BUTTON CONTRAST ISSUES FOUND');
  console.log('='.repeat(80));
  console.log(`\nTotal issues found: ${issues.length}\n`);

  // Group by severity
  const high = issues.filter(i => i.severity === 'high');
  const medium = issues.filter(i => i.severity === 'medium');

  console.log(`🔴 High severity: ${high.length}`);
  console.log(`🟡 Medium severity: ${medium.length}\n`);

  // Show details
  if (high.length > 0) {
    console.log('\n🔴 HIGH SEVERITY ISSUES:\n');
    high.forEach((issue, idx) => {
      console.log(`${idx + 1}. ${issue.template}`);
      console.log(`   File: ${issue.file}`);
      console.log(`   Issue: ${issue.issue}`);
      console.log(`   Lines: ${issue.lines.join(', ')}\n`);
    });
  }

  // Save results
  const resultsPath = path.join(__dirname, 'button-contrast-issues.json');
  fs.writeFileSync(resultsPath, JSON.stringify({ high, medium, total: issues.length }, null, 2));
  console.log(`\n📄 Full results saved to: ${resultsPath}\n`);

  return issues;
}

findContrastIssues().catch(console.error);
