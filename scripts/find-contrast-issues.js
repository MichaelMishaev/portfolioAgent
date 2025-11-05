#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔍 Scanning all templates for text contrast issues...\n');

const templatesPattern = 'components/templates/**/*-template.tsx';
const templateFiles = glob.sync(templatesPattern);

const issues = [];

templateFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Check for white/light backgrounds with missing text colors
    const patterns = [
      // White background without dark text
      { regex: /bg-white(?!.*text-(slate|gray|zinc|neutral|stone|black))/i, issue: 'bg-white without dark text color' },
      { regex: /bg-gray-50(?!.*text-(slate|gray|zinc|neutral|stone|black)-[6-9])/i, issue: 'bg-gray-50 without dark text' },
      { regex: /bg-slate-50(?!.*text-(slate|gray|zinc|neutral|stone|black)-[6-9])/i, issue: 'bg-slate-50 without dark text' },

      // Dark background without light text
      { regex: /bg-(slate|gray|zinc|neutral|stone)-[8-9]00(?!.*text-white)(?!.*text-(slate|gray|zinc)-[1-4]00)/i, issue: 'dark background without light text' },

      // Elements that commonly inherit wrong colors
      { regex: /<(h[1-6]|p|span|div)(?!.*text-)/i, issue: 'heading/text without explicit color (may inherit wrong color)' }
    ];

    patterns.forEach(({regex, issue: issueType}) => {
      if (regex.test(line) && line.includes('className')) {
        // Additional check: if it has bg-white, make sure there's a text- color
        if (line.includes('bg-white') && !line.includes('text-')) {
          issues.push({
            file: file.replace('components/templates/', ''),
            line: lineNum,
            code: line.trim(),
            issue: '🔴 CRITICAL: bg-white without text color'
          });
        } else if ((line.includes('bg-slate-') || line.includes('bg-gray-')) && line.match(/bg-(slate|gray)-(50|100)/) && !line.match(/text-(slate|gray|black|zinc)-[6-9]/)) {
          issues.push({
            file: file.replace('components/templates/', ''),
            line: lineNum,
            code: line.trim().substring(0, 100),
            issue: '⚠️  WARNING: Light background without dark text'
          });
        }
      }
    });
  });
});

// Group by file
const byFile = {};
issues.forEach(issue => {
  if (!byFile[issue.file]) byFile[issue.file] = [];
  byFile[issue.file].push(issue);
});

console.log(`Found ${issues.length} potential contrast issues in ${Object.keys(byFile).length} files:\n`);

Object.keys(byFile).forEach(file => {
  console.log(`\n📁 ${file}`);
  byFile[file].forEach(issue => {
    console.log(`   Line ${issue.line}: ${issue.issue}`);
    console.log(`   ${issue.code.substring(0, 80)}...`);
  });
});

console.log(`\n\n✅ Total: ${issues.length} issues found`);
