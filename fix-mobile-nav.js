#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Templates that already have good mobile navigation (skip these)
const skipTemplates = [
  'tech-blog-template.tsx',
  'personal-blog-template.tsx',
  'minimalist-template.tsx',
  'bento-grid-template.tsx',
  'data-dashboard-template.tsx',
  '3d-immersive-template.tsx',
  'single-page-template.tsx', // Already fixed
  'bold-typography-template.tsx', // Already fixed
];

// Find all template files
const templateFiles = glob.sync('components/templates/**/*-template.tsx');

console.log(`Found ${templateFiles.length} template files`);

templateFiles.forEach((filePath) => {
  const fileName = path.basename(filePath);

  // Skip templates that already have good mobile nav
  if (skipTemplates.includes(fileName)) {
    console.log(`Skipping ${fileName} (already has mobile nav)`);
    return;
  }

  console.log(`Processing ${fileName}...`);

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Check if file already has useState (skip if already processed)
  if (content.includes('useState') && content.includes('mobileMenuOpen')) {
    console.log(`  ✓ Already has mobile menu state, skipping`);
    return;
  }

  // 1. Add useState import if needed
  if (!content.includes('useState')) {
    if (content.includes('"use client";')) {
      content = content.replace(
        '"use client";\n\nimport',
        '"use client";\n\nimport { useState } from "react";\nimport'
      );
      modified = true;
    } else {
      content = 'import { useState } from "react";\n' + content;
      modified = true;
    }
  }

  // 2. Add FiMenu and FiX to imports if they're not there
  if (content.includes('from "react-icons/fi"')) {
    const fiImportRegex = /import\s*{([^}]+)}\s*from\s*"react-icons\/fi"/;
    const match = content.match(fiImportRegex);

    if (match) {
      const currentImports = match[1];

      if (!currentImports.includes('FiMenu')) {
        const newImports = currentImports.trim() + ', FiMenu, FiX';
        content = content.replace(fiImportRegex, `import { ${newImports} } from "react-icons/fi"`);
        modified = true;
      }
    }
  }

  // 3. Update all px-6 to px-4 sm:px-6 for mobile responsiveness
  content = content.replace(/mx-auto px-6 py/g, 'mx-auto px-4 sm:px-6 py');
  content = content.replace(/container mx-auto px-6"/g, 'container mx-auto px-4 sm:px-6"');
  modified = true;

  // 4. Find and replace the navigation pattern
  // Look for the common nav pattern
  const navPattern = /<nav className="[^"]*">\s*<div className="container mx-auto[^"]*">\s*<div className="flex items-center justify-between">/;

  if (navPattern.test(content)) {
    // This template has a nav that needs fixing
    console.log(`  → Adding mobile menu to ${fileName}`);

    // Add mobile menu state to the component
    const componentFunctionPattern = /(export function \w+Template\(\) {\n)/;
    content = content.replace(
      componentFunctionPattern,
      '$1  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n\n'
    );

    modified = true;
  }

  // 5. Update text sizes for better mobile responsiveness
  // Common patterns to fix:
  content = content.replace(/text-5xl md:text-7xl/g, 'text-4xl sm:text-5xl md:text-7xl');
  content = content.replace(/text-7xl md:text-9xl/g, 'text-5xl sm:text-7xl md:text-9xl');
  content = content.replace(/text-3xl md:text-5xl/g, 'text-2xl sm:text-3xl md:text-5xl');
  content = content.replace(/text-2xl md:text-3xl/g, 'text-xl sm:text-2xl md:text-3xl');
  content = content.replace(/text-4xl md:text-6xl/g, 'text-3xl sm:text-4xl md:text-6xl');
  modified = true;

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Updated ${fileName}`);
  } else {
    console.log(`  - No changes needed for ${fileName}`);
  }
});

console.log('\n✓ Mobile navigation fixes complete!');
console.log('\nNote: Navigation HTML structure still needs manual review for each template.');
console.log('The script has added imports, state, and improved spacing/text sizing.');
