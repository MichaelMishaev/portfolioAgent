#!/usr/bin/env node

/**
 * Script to wrap Framer Motion animations with prefersReducedMotion checks
 * This ensures animations are disabled for users who prefer reduced motion
 */

const fs = require('fs');
const path = require('path');

const templatesWithMotion = [
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
];

function wrapAnimations(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping ${filePath} (file not found)`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  let changes = 0;

  // Pattern 1: initial={{ ... }} -> initial={prefersReducedMotion ? {} : { ... }}
  const initialPattern = /initial=\{\{([^}]+)\}\}/g;
  const initialMatches = content.match(initialPattern);
  if (initialMatches) {
    initialMatches.forEach(match => {
      if (!match.includes('prefersReducedMotion')) {
        const props = match.match(/\{\{([^}]+)\}\}/)[1];
        const wrapped = `initial={prefersReducedMotion ? {} : {${props}}}`;
        content = content.replace(match, wrapped);
        changes++;
      }
    });
  }

  // Pattern 2: animate={{ ... }} -> animate={prefersReducedMotion ? {} : { ... }}
  // But skip if it's already wrapped or is just final state
  const animatePattern = /animate=\{\{([^}]+)\}\}/g;
  const animateMatches = content.match(animatePattern);
  if (animateMatches) {
    animateMatches.forEach(match => {
      const props = match.match(/\{\{([^}]+)\}\}/)[1];
      // Skip if just setting final state (no animation)
      if (!match.includes('prefersReducedMotion') && (props.includes('[') || props.includes('repeat'))) {
        const wrapped = `animate={prefersReducedMotion ? {} : {${props}}}`;
        content = content.replace(match, wrapped);
        changes++;
      }
    });
  }

  // Pattern 3: transition={{ ... }} -> transition={prefersReducedMotion ? {} : { ... }}
  const transitionPattern = /transition=\{\{([^}]+)\}\}/g;
  const transitionMatches = content.match(transitionPattern);
  if (transitionMatches) {
    transitionMatches.forEach(match => {
      if (!match.includes('prefersReducedMotion')) {
        const props = match.match(/\{\{([^}]+)\}\}/)[1];
        const wrapped = `transition={prefersReducedMotion ? {} : {${props}}}`;
        content = content.replace(match, wrapped);
        changes++;
      }
    });
  }

  // Pattern 4: whileHover={{ ... }} -> whileHover={prefersReducedMotion ? {} : { ... }}
  const hoverPattern = /whileHover=\{\{([^}]+)\}\}/g;
  const hoverMatches = content.match(hoverPattern);
  if (hoverMatches) {
    hoverMatches.forEach(match => {
      if (!match.includes('prefersReducedMotion')) {
        const props = match.match(/\{\{([^}]+)\}\}/)[1];
        const wrapped = `whileHover={prefersReducedMotion ? {} : {${props}}}`;
        content = content.replace(match, wrapped);
        changes++;
      }
    });
  }

  // Pattern 5: whileTap={{ ... }} -> whileTap={prefersReducedMotion ? {} : { ... }}
  const tapPattern = /whileTap=\{\{([^}]+)\}\}/g;
  const tapMatches = content.match(tapPattern);
  if (tapMatches) {
    tapMatches.forEach(match => {
      if (!match.includes('prefersReducedMotion')) {
        const props = match.match(/\{\{([^}]+)\}\}/)[1];
        const wrapped = `whileTap={prefersReducedMotion ? {} : {${props}}}`;
        content = content.replace(match, wrapped);
        changes++;
      }
    });
  }

  if (changes > 0) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✅ ${filePath}: wrapped ${changes} animations`);
    return 'updated';
  } else {
    console.log(`✓ ${filePath}: no unwrapped animations found`);
    return 'none';
  }
}

console.log('🚀 Starting animation wrapping...\n');

let updatedCount = 0;
let unchangedCount = 0;

templatesWithMotion.forEach(template => {
  const result = wrapAnimations(template);
  if (result === 'updated') {
    updatedCount++;
  } else if (result === 'none') {
    unchangedCount++;
  }
});

console.log('\n📊 Summary:');
console.log(`✅ Files updated: ${updatedCount}`);
console.log(`✓ Files unchanged: ${unchangedCount}`);
console.log(`\n⚠️  Note: This script handles simple motion.div props.`);
console.log(`   Complex animations (e.g., style={{ y }}) need manual review.`);
