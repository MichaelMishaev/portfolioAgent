/**
 * Create placeholder screenshot images for all templates
 * This creates simple colored placeholders until real screenshots are generated
 */

const fs = require('fs');
const path = require('path');

const TEMPLATE_IDS = [
  "3d-immersive",
  "ar-spatial",
  "bento-grid",
  "blog-archetypes-editorial",
  "blog-archetypes-minimal",
  "blog-magazine",
  "blog-personal",
  "blog-tech",
  "bold-typography",
  "card-modular",
  "collage-maximalist",
  "creative-agency-bold",
  "dark-mode",
  "data-dashboard",
  "experimental-3d",
  "fullscreen-immersive",
  "glassmorphism-modern",
  "grid-masonry",
  "illustration-focus",
  "interactive-agency",
  "kinetic-typography",
  "lin-portfolio-elegance",
  "lin-professional-authority",
  "lin-tech-pioneer",
  "luxury-minimal",
  "minimal-portfolio-clean",
  "minimalist",
  "motion-designer",
  "neo-brutalist",
  "online-business-agency",
  "online-business-coach",
  "online-business-course",
  "online-business-saas",
  "organic-liquid",
  "personal-brand",
  "photography-immersive",
  "product-audio",
  "product-course",
  "product-fashion",
  "product-luxury",
  "product-physical",
  "product-premium",
  "product-saas",
  "product-tech",
  "product-vacuum",
  "professional-b2b",
  "saas-feature-rich",
  "service-agency",
  "service-b2b",
  "service-community",
  "service-consulting",
  "service-dfyou",
  "service-enterprise",
  "service-marketplace",
  "single-page",
  "split-screen",
  "split-screen-editorial",
  "startup-pitch",
  "text-heavy",
  "voice-first",
  "y2k-retro",
];

const SCREENSHOTS_DIR = path.join(process.cwd(), 'public', 'screenshots');

// Create directory if it doesn't exist
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  console.log(`✅ Created directory: ${SCREENSHOTS_DIR}`);
}

// Create SVG placeholder for each template
function createPlaceholderSVG(templateId, screenshotNumber) {
  const colors = [
    '#3B82F6', // blue
    '#8B5CF6', // purple
    '#10B981', // green
  ];

  const color = colors[screenshotNumber - 1];
  const templateName = templateId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${screenshotNumber}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#grad${screenshotNumber})"/>
  <text x="960" y="500" font-family="Arial, sans-serif" font-size="72" fill="white" text-anchor="middle" font-weight="bold">
    ${templateName}
  </text>
  <text x="960" y="600" font-family="Arial, sans-serif" font-size="36" fill="white" text-anchor="middle" opacity="0.9">
    Screenshot ${screenshotNumber}
  </text>
</svg>`;
}

// Generate placeholders for all templates
console.log('🚀 Creating placeholder screenshots...\n');

let created = 0;
let skipped = 0;

TEMPLATE_IDS.forEach(templateId => {
  for (let i = 1; i <= 3; i++) {
    const filename = `${templateId}-${i}.svg`;
    const filepath = path.join(SCREENSHOTS_DIR, filename);

    if (fs.existsSync(filepath)) {
      skipped++;
      continue;
    }

    const svg = createPlaceholderSVG(templateId, i);
    fs.writeFileSync(filepath, svg);
    created++;
  }
});

console.log(`✅ Created ${created} placeholder screenshots`);
console.log(`⏭️  Skipped ${skipped} existing files`);
console.log(`📁 Location: ${SCREENSHOTS_DIR}`);
console.log(`\n📝 Next: Update template-registry.ts to use these screenshot paths`);
