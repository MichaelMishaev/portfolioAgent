#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Patterns to identify sections
const SECTION_PATTERNS = {
  stats: /Stats|statistics|metrics|numbers/i,
  testimonials: /testimonial|blockquote|quote|praise|feedback|review/i,
  timeline: /timeline|career|history|journey/i,
  pricing: /pricing|price|cost|rate|package|plan/i,
  faq: /faq|question|answer/i
};

// Pattern to find text with size but potentially missing color
const TEXT_SIZE_PATTERN = /className="[^"]*\b(text-\d*xl|text-lg|text-base|text-sm|text-xs)\b[^"]*"/g;
const TEXT_COLOR_PATTERN = /(text-gray-\d+|text-white|text-black|text-slate-\d+|text-zinc-\d+|text-neutral-\d+|text-stone-\d+|text-red-\d+|text-orange-\d+|text-amber-\d+|text-yellow-\d+|text-lime-\d+|text-green-\d+|text-emerald-\d+|text-teal-\d+|text-cyan-\d+|text-sky-\d+|text-blue-\d+|text-indigo-\d+|text-violet-\d+|text-purple-\d+|text-fuchsia-\d+|text-pink-\d+|text-rose-\d+|text-primary|text-secondary|text-muted-foreground|text-foreground|text-destructive|text-accent|text-card|text-popover|text-primary-foreground|text-secondary-foreground|text-accent-foreground|text-card-foreground|text-popover-foreground)/;

async function auditTemplates() {
  const templatesDir = path.join(__dirname, '../components/templates');
  const templateFiles = await glob('**/*-template.tsx', {
    cwd: templatesDir,
    ignore: ['**/*.bak*', '**/*.broken', '**/*.final']
  });

  console.log(`\n🔍 Auditing ${templateFiles.length} templates for text visibility issues...\n`);

  const issues = [];

  for (const file of templateFiles) {
    const filePath = path.join(templatesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    let currentSection = null;
    const fileIssues = [];

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // Detect sections
      for (const [sectionName, pattern] of Object.entries(SECTION_PATTERNS)) {
        if (pattern.test(line) && /\/\*|section|<section|<div/.test(line)) {
          currentSection = sectionName;
        }
      }

      // Check for text with size but no color
      const matches = line.matchAll(TEXT_SIZE_PATTERN);
      for (const match of matches) {
        const className = match[0];
        if (!TEXT_COLOR_PATTERN.test(className)) {
          // Skip emojis and icon variables
          if (/\{[^}]*(icon|Icon|emoji)\}|[🎀🎙️💌📬🏆📍📅🎥💭]/.test(line)) {
            continue;
          }

          // Skip decorative elements (opacity without actual text content)
          if (/opacity-\d+/.test(className) && !/>.*[A-Za-z]{3,}/.test(line) && !/"[^"]{3,}"/.test(line)) {
            continue;
          }

          // Skip line-through decorative text
          if (/line-through/.test(className)) {
            continue;
          }

          // Check if this is in a critical section
          const contextLines = lines.slice(Math.max(0, index - 3), Math.min(lines.length, index + 3)).join('\n');
          let inCriticalSection = false;
          let detectedSection = currentSection;

          if (!detectedSection) {
            for (const [sectionName, pattern] of Object.entries(SECTION_PATTERNS)) {
              if (pattern.test(contextLines)) {
                detectedSection = sectionName;
                inCriticalSection = true;
                break;
              }
            }
          } else {
            inCriticalSection = true;
          }

          if (inCriticalSection && detectedSection) {
            fileIssues.push({
              line: lineNum,
              section: detectedSection,
              className: className,
              preview: line.trim().substring(0, 80)
            });
          }
        }
      }
    });

    if (fileIssues.length > 0) {
      issues.push({
        file: file,
        issues: fileIssues
      });
    }
  }

  // Print report
  console.log('📊 AUDIT REPORT\n');
  console.log('='.repeat(80));

  if (issues.length === 0) {
    console.log('\n✅ No text visibility issues found!\n');
    return;
  }

  const sectionCounts = { stats: 0, testimonials: 0, timeline: 0, pricing: 0, faq: 0 };
  let totalIssues = 0;

  issues.forEach(({ file, issues: fileIssues }) => {
    console.log(`\n📄 ${file}`);
    console.log('-'.repeat(80));

    fileIssues.forEach(issue => {
      console.log(`  Line ${issue.line} [${issue.section.toUpperCase()}]`);
      console.log(`    ${issue.preview}${issue.preview.length >= 80 ? '...' : ''}`);
      sectionCounts[issue.section]++;
      totalIssues++;
    });
  });

  console.log('\n' + '='.repeat(80));
  console.log('📈 SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total files with issues: ${issues.length}`);
  console.log(`Total issues found: ${totalIssues}\n`);
  console.log('Issues by section:');
  Object.entries(sectionCounts).forEach(([section, count]) => {
    if (count > 0) {
      console.log(`  ${section.padEnd(15)}: ${count}`);
    }
  });
  console.log('\n');

  // CI Mode: Exit with error if issues found
  const isCiMode = process.argv.includes('--ci');
  if (isCiMode && totalIssues > 0) {
    console.error('❌ CI FAILURE: Text visibility issues detected!');
    console.error('Run `npm run audit:text-colors` locally and fix issues before committing.\n');
    process.exit(1);
  }

  if (isCiMode && totalIssues === 0) {
    console.log('✅ CI SUCCESS: No text visibility issues found!\n');
  }

  // Write detailed report to file
  const reportPath = path.join(__dirname, '../docs/text-visibility-audit.md');
  let report = '# Text Visibility Audit Report\n\n';
  report += `**Date**: ${new Date().toISOString().split('T')[0]}\n\n`;
  report += `## Summary\n\n`;
  report += `- Total files audited: ${templateFiles.length}\n`;
  report += `- Files with issues: ${issues.length}\n`;
  report += `- Total issues: ${totalIssues}\n\n`;
  report += `### Issues by Section\n\n`;
  Object.entries(sectionCounts).forEach(([section, count]) => {
    if (count > 0) {
      report += `- **${section}**: ${count} issues\n`;
    }
  });
  report += `\n## Detailed Findings\n\n`;

  issues.forEach(({ file, issues: fileIssues }) => {
    report += `### ${file}\n\n`;
    fileIssues.forEach(issue => {
      report += `- **Line ${issue.line}** [${issue.section.toUpperCase()}]\n`;
      report += `  \`\`\`tsx\n  ${issue.preview}${issue.preview.length >= 80 ? '...' : ''}\n  \`\`\`\n\n`;
    });
  });

  fs.writeFileSync(reportPath, report);
  console.log(`📝 Detailed report saved to: docs/text-visibility-audit.md\n`);
}

auditTemplates().catch(console.error);
