#!/usr/bin/env node

/**
 * Script to add useReducedMotion support to all template files
 * This ensures accessibility for users with vestibular disorders
 */

const fs = require('fs');
const path = require('path');

// Templates that need reduced motion support (have framer-motion animations)
const templatesWithAnimations = [
  'components/templates/creative-agency-bold/creative-agency-bold-template.tsx',
  'components/templates/startup-pitch/startup-pitch-template.tsx',
  'components/templates/y2k-retro/y2k-retro-template.tsx',
  'components/templates/voice-first/voice-first-template.tsx',
  'components/templates/3d-immersive/3d-immersive-template.tsx',
  'components/templates/photography-immersive/photography-immersive-template.tsx',
  'components/templates/interactive-agency/interactive-agency-template.tsx',
  'components/templates/split-screen/split-screen-template.tsx',
  'components/templates/product-pages/vacuum-product-template.tsx',
  'components/templates/product-pages/audio-product-template.tsx',
  'components/templates/organic-liquid/organic-liquid-template.tsx',
  'components/templates/kinetic-typography/kinetic-typography-template.tsx',
  'components/templates/ar-spatial/ar-spatial-template.tsx',
  'components/templates/experimental-3d/experimental-3d-template.tsx',
  'components/templates/fullscreen-immersive/fullscreen-immersive-template.tsx',
  'components/templates/grid-masonry/grid-masonry-template.tsx',
  'components/templates/luxury-minimal/luxury-minimal-template.tsx',
  'components/templates/motion-designer/motion-designer-template.tsx',
  'components/templates/product-pages/premium-product-template.tsx',
  'components/templates/dark-mode/dark-mode-template.tsx',
  'components/templates/minimalist/minimalist-template.tsx',
  'components/templates/single-page/single-page-template.tsx',
  'components/templates/online-business-saas/online-business-saas-template.tsx',
  'components/templates/online-business/online-business-agency-template.tsx',
  'components/templates/online-business/online-business-coach-template.tsx',
  'components/templates/online-business/online-business-course-template.tsx',
  'components/templates/split-screen-editorial/split-screen-editorial-template.tsx',
  'components/templates/bold-typography/bold-typography-template.tsx',
];

function addReducedMotionSupport(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping ${filePath} (file not found)`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');

  // Check if already has useReducedMotion
  if (content.includes('useReducedMotion')) {
    console.log(`✓ ${filePath} already has reduced motion support`);
    return;
  }

  // Check if file uses framer-motion
  if (!content.includes('from "framer-motion"') && !content.includes("from 'framer-motion'")) {
    console.log(`⚠️  Skipping ${filePath} (no framer-motion import)`);
    return;
  }

  console.log(`🔧 Adding reduced motion to ${filePath}...`);

  // Step 1: Add import
  const importRegex = /(import.*from ['"]framer-motion['"];?\n)/;
  if (importRegex.test(content)) {
    content = content.replace(
      importRegex,
      '$1import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";\n'
    );
  }

  // Step 2: Add hook call in component
  // Find the component function and add the hook
  const componentRegex = /(export (?:default )?function \w+\([^)]*\)\s*\{)/;
  if (componentRegex.test(content)) {
    // Find all useState hooks to insert after them
    const stateHookRegex = /((?:const \[.*?\] = useState.*?;\n)+)/;

    if (stateHookRegex.test(content)) {
      // Add after existing hooks
      content = content.replace(
        stateHookRegex,
        '$1  const prefersReducedMotion = useReducedMotion();\n'
      );
    } else {
      // Add at start of component
      content = content.replace(
        componentRegex,
        '$1\n  const prefersReducedMotion = useReducedMotion();\n'
      );
    }
  }

  // Write the modified content back
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`✅ Updated ${filePath}`);
}

// Process all templates
console.log('🚀 Starting reduced motion support addition...\n');

let updatedCount = 0;
let skippedCount = 0;
let alreadyDoneCount = 0;

templatesWithAnimations.forEach(template => {
  const result = addReducedMotionSupport(template);
  if (result === 'updated') updatedCount++;
  else if (result === 'skipped') skippedCount++;
  else if (result === 'done') alreadyDoneCount++;
});

console.log('\n📊 Summary:');
console.log(`✅ Files processed: ${templatesWithAnimations.length}`);
console.log(`\n⚠️  IMPORTANT: Manual steps required:`);
console.log(`1. Review each file and wrap motion.div props with prefersReducedMotion checks`);
console.log(`2. Pattern: initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}`);
console.log(`3. Pattern: animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}`);
console.log(`4. Pattern: transition={prefersReducedMotion ? {} : { duration: 0.5 }}`);
console.log(`5. For cursor trails/complex animations: wrap logic with "if (prefersReducedMotion) return;"`);
console.log(`\n📝 Files that need manual animation updates (already have hook):`);
console.log('- glassmorphism-modern-template.tsx');
