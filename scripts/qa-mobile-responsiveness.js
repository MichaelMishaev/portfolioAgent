#!/usr/bin/env node

/**
 * QA Mobile Responsiveness Verification Tool
 *
 * Comprehensive verification of mobile responsiveness fixes:
 * - Checks for missing sm: breakpoints
 * - Verifies break-words on large headings
 * - Checks for proper responsive scaling
 * - Tests padding and overflow handling
 * - Validates Russian text compatibility
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// QA Test Patterns
const QA_TESTS = [
  {
    name: 'Missing sm: breakpoints on large text',
    pattern: /className="[^"]*\btext-(?:4xl|5xl|6xl)\s+(?:md|lg|xl):/g,
    severity: 'HIGH',
    description: 'Large text jumps from mobile to md/lg without sm: breakpoint'
  },
  {
    name: 'Missing break-words on very large text',
    pattern: /className="(?!.*break-words)[^"]*\btext-(?:5xl|6xl|7xl|8xl|9xl)\b[^"]*"/g,
    severity: 'HIGH',
    description: 'Very large text without break-words could overflow with Russian'
  },
  {
    name: 'Text without any responsive breakpoints',
    pattern: /className="[^"]*\btext-(?:4xl|5xl|6xl)\b(?![^"]*(?:sm|md|lg|xl):)[^"]*"/g,
    severity: 'MEDIUM',
    description: 'Large text with no responsive breakpoints (should have at least one)'
  },
  {
    name: 'Duplicate text size classes',
    pattern: /className="[^"]*\btext-\w+\b[^"]*\btext-\w+\b[^"]*"/g,
    severity: 'LOW',
    description: 'Duplicate text size classes (last one wins, could be unintentional)'
  },
  {
    name: 'Missing horizontal padding on large text containers',
    pattern: /<(?:div|section)[^>]*className="[^"]*text-(?:5xl|6xl|7xl|8xl|9xl)[^"]*"[^>]*>(?![^<]*px-)/g,
    severity: 'MEDIUM',
    description: 'Large text container without horizontal padding could touch edges'
  },
  {
    name: 'Clamp without proper mobile constraints',
    pattern: /text-\[clamp\((?:4|5|6|7|8)rem/g,
    severity: 'HIGH',
    description: 'Clamp function with large minimum size (>= 4rem) could overflow on small devices'
  },
  {
    name: 'Very large static text sizes',
    pattern: /className="[^"]*\btext-(?:8xl|9xl)\b(?![^"]*(?:sm|md|lg|xl):)[^"]*"/g,
    severity: 'CRITICAL',
    description: 'Extremely large text (8xl/9xl) without responsive breakpoints'
  },
  {
    name: 'Proper responsive progression',
    pattern: /className="[^"]*text-(?:2xl|3xl|4xl)\s+sm:text-(?:3xl|4xl|5xl)\s+md:text-(?:4xl|5xl|6xl)/g,
    severity: 'INFO',
    description: 'Good: Proper responsive text progression found',
    isPositive: true
  },
  {
    name: 'Proper break-words usage',
    pattern: /className="[^"]*text-(?:5xl|6xl|7xl|8xl|9xl)[^"]*break-words/g,
    severity: 'INFO',
    description: 'Good: Large text with break-words protection',
    isPositive: true
  }
];

// Russian text patterns that might overflow
const RUSSIAN_TEXT_CHECKS = [
  {
    pattern: /Профессиональ/g,
    description: 'Long Russian word "Профессиональные" (Professional)',
    length: 16
  },
  {
    pattern: /Портфолио/g,
    description: 'Russian "Портфолио" (Portfolio)',
    length: 9
  },
  {
    pattern: /Выберите/g,
    description: 'Russian "Выберите" (Choose)',
    length: 8
  }
];

// Results tracking
const results = {
  filesProcessed: 0,
  totalIssues: 0,
  totalGood: 0,
  issuesBySeverity: {
    CRITICAL: [],
    HIGH: [],
    MEDIUM: [],
    LOW: [],
    INFO: []
  },
  russianTextIssues: [],
  summary: {}
};

console.log('🔍 Starting Mobile Responsiveness QA Verification');
console.log('='.repeat(60));

// Find all template files
const templateFiles = glob.sync(
  'components/templates/**/*.tsx',
  { cwd: path.join(__dirname, '..') }
);

const pageFiles = glob.sync(
  'app/**/page.tsx',
  { cwd: path.join(__dirname, '..') }
);

const allFiles = [...templateFiles, ...pageFiles];

console.log(`Found ${allFiles.length} files to verify\n`);

// Process each file
allFiles.forEach(relativeFilePath => {
  const filePath = path.join(__dirname, '..', relativeFilePath);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // Run QA tests
    QA_TESTS.forEach(test => {
      const matches = content.match(test.pattern);

      if (matches && matches.length > 0) {
        matches.forEach(match => {
          // Find line number
          let lineNumber = 0;
          let charCount = 0;
          for (let i = 0; i < lines.length; i++) {
            charCount += lines[i].length + 1; // +1 for newline
            if (content.indexOf(match) < charCount) {
              lineNumber = i + 1;
              break;
            }
          }

          const issue = {
            file: relativeFilePath,
            line: lineNumber,
            test: test.name,
            description: test.description,
            match: match.substring(0, 100) + (match.length > 100 ? '...' : ''),
            severity: test.severity
          };

          if (test.isPositive) {
            results.totalGood++;
          } else {
            results.totalIssues++;
          }

          results.issuesBySeverity[test.severity].push(issue);
        });
      }
    });

    // Check Russian text
    RUSSIAN_TEXT_CHECKS.forEach(check => {
      const matches = content.match(check.pattern);
      if (matches && matches.length > 0) {
        // Check if the Russian text is in a component with large text
        const russianContext = content.substring(
          Math.max(0, content.indexOf(matches[0]) - 200),
          Math.min(content.length, content.indexOf(matches[0]) + 200)
        );

        const hasLargeText = /text-(?:4xl|5xl|6xl|7xl|8xl|9xl)/.test(russianContext);
        const hasBreakWords = /break-words/.test(russianContext);
        const hasPadding = /px-(?:\d|full)/.test(russianContext);

        if (hasLargeText && (!hasBreakWords || !hasPadding)) {
          results.russianTextIssues.push({
            file: relativeFilePath,
            text: check.description,
            length: check.length,
            hasLargeText: true,
            hasBreakWords,
            hasPadding,
            risk: !hasBreakWords && !hasPadding ? 'HIGH' : 'MEDIUM'
          });
        }
      }
    });

    results.filesProcessed++;

  } catch (error) {
    console.error(`❌ Error processing ${relativeFilePath}:`, error.message);
  }
});

// Generate Summary
console.log('\n' + '='.repeat(60));
console.log('📊 QA Verification Results');
console.log('='.repeat(60));
console.log(`Files processed: ${results.filesProcessed}`);
console.log(`Total issues found: ${results.totalIssues}`);
console.log(`Good patterns found: ${results.totalGood}`);

console.log('\n📋 Issues by Severity:');
['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].forEach(severity => {
  const count = results.issuesBySeverity[severity].length;
  if (count > 0) {
    const emoji = severity === 'CRITICAL' ? '🔴' : severity === 'HIGH' ? '🟠' : severity === 'MEDIUM' ? '🟡' : '🔵';
    console.log(`   ${emoji} ${severity}: ${count} issues`);

    // Show first few examples
    if (count <= 5) {
      results.issuesBySeverity[severity].forEach(issue => {
        console.log(`      - ${issue.file}:${issue.line} - ${issue.test}`);
      });
    } else {
      results.issuesBySeverity[severity].slice(0, 3).forEach(issue => {
        console.log(`      - ${issue.file}:${issue.line} - ${issue.test}`);
      });
      console.log(`      ... and ${count - 3} more`);
    }
  }
});

console.log('\n✅ Good Patterns:');
const goodCount = results.issuesBySeverity.INFO.length;
console.log(`   ${goodCount} instances of proper responsive design found`);

// Russian text warnings
if (results.russianTextIssues.length > 0) {
  console.log('\n⚠️  Russian Text Compatibility:');
  console.log(`   Found ${results.russianTextIssues.length} Russian text instances in large text contexts`);

  const highRisk = results.russianTextIssues.filter(i => i.risk === 'HIGH');
  if (highRisk.length > 0) {
    console.log(`   🔴 ${highRisk.length} HIGH RISK (no break-words or padding)`);
    highRisk.slice(0, 3).forEach(issue => {
      console.log(`      - ${issue.file}: ${issue.text}`);
    });
  }

  const mediumRisk = results.russianTextIssues.filter(i => i.risk === 'MEDIUM');
  if (mediumRisk.length > 0) {
    console.log(`   🟡 ${mediumRisk.length} MEDIUM RISK (missing one protection)`);
  }
}

// Overall Grade
const totalChecks = results.filesProcessed * QA_TESTS.length;
const criticalIssues = results.issuesBySeverity.CRITICAL.length;
const highIssues = results.issuesBySeverity.HIGH.length;
const mediumIssues = results.issuesBySeverity.MEDIUM.length;

let grade = 'A+';
let gradeEmoji = '🌟';

if (criticalIssues > 0) {
  grade = 'F';
  gradeEmoji = '❌';
} else if (highIssues > 10) {
  grade = 'D';
  gradeEmoji = '⚠️';
} else if (highIssues > 5 || mediumIssues > 20) {
  grade = 'C';
  gradeEmoji = '🟡';
} else if (highIssues > 0 || mediumIssues > 10) {
  grade = 'B';
  gradeEmoji = '👍';
} else if (mediumIssues > 0) {
  grade = 'A';
  gradeEmoji = '✨';
}

console.log('\n' + '='.repeat(60));
console.log(`${gradeEmoji} Overall Grade: ${grade}`);
console.log('='.repeat(60));

if (grade === 'A+' || grade === 'A') {
  console.log('✅ Excellent mobile responsiveness! All major issues resolved.');
} else if (grade === 'B') {
  console.log('👍 Good mobile responsiveness with minor issues.');
} else if (grade === 'C') {
  console.log('🟡 Acceptable but needs improvement.');
} else {
  console.log('⚠️  Significant mobile responsiveness issues remain.');
}

// Save detailed report
const reportPath = path.join(__dirname, 'mobile-responsiveness-qa-report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`\n💾 Detailed QA report saved to: ${reportPath}`);

// Return exit code based on critical/high issues
if (criticalIssues > 0 || highIssues > 10) {
  console.log('\n❌ QA FAILED: Critical or too many high severity issues found');
  process.exit(1);
} else {
  console.log('\n✅ QA PASSED: Mobile responsiveness meets quality standards');
  process.exit(0);
}
