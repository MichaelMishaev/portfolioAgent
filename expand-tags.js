const fs = require('fs');
const path = require('path');

// Read translations.json
const translationsPath = path.join(__dirname, 'lib', 'translations.json');
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

// Function to extract searchable keywords from text
function extractKeywords(text) {
  if (!text) return [];
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3) // Only words longer than 3 chars
    .filter(word => !['with', 'from', 'that', 'this', 'your', 'they', 'them', 'have', 'been'].includes(word));
}

// Function to expand tags for a template
function expandTags(template) {
  const newTags = new Set(template.tags || []);

  // Add feature-based tags (lowercase, hyphenated)
  template.features.forEach(feature => {
    const tag = feature.toLowerCase().replace(/\s+/g, '-');
    newTags.add(tag);
  });

  // Add bestFor as tags (lowercase, hyphenated)
  template.bestFor.forEach(audience => {
    const tag = audience.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
    newTags.add(tag);
  });

  // Add category as tag
  newTags.add(template.category.toLowerCase());

  // Extract keywords from description
  const descKeywords = extractKeywords(template.description);
  descKeywords.slice(0, 5).forEach(keyword => newTags.add(keyword)); // Add top 5 keywords

  // Extract keywords from name
  const nameKeywords = extractKeywords(template.name);
  nameKeywords.forEach(keyword => newTags.add(keyword));

  // Add layout-related tags based on name and description
  const text = (template.name + ' ' + template.description).toLowerCase();

  if (text.includes('card')) newTags.add('card-layout');
  if (text.includes('grid')) newTags.add('grid-layout');
  if (text.includes('flex')) newTags.add('flexible');
  if (text.includes('hover')) newTags.add('hover-effects');
  if (text.includes('animation')) newTags.add('animations');
  if (text.includes('responsive')) newTags.add('responsive');
  if (text.includes('mobile')) newTags.add('mobile-friendly');
  if (text.includes('dark')) newTags.add('dark-theme');
  if (text.includes('light')) newTags.add('light-theme');
  if (text.includes('minimal')) newTags.add('minimalist');
  if (text.includes('modern')) newTags.add('modern-design');
  if (text.includes('elegant')) newTags.add('elegant-design');
  if (text.includes('professional')) newTags.add('business');
  if (text.includes('creative')) newTags.add('artistic');
  if (text.includes('portfolio')) newTags.add('showcase');
  if (text.includes('landing')) newTags.add('landing-page');
  if (text.includes('product')) newTags.add('product-page');
  if (text.includes('saas')) newTags.add('software');
  if (text.includes('blog')) newTags.add('blog-design');
  if (text.includes('ecommerce') || text.includes('e-commerce')) newTags.add('online-store');
  if (text.includes('consulting')) newTags.add('consultant');
  if (text.includes('agency')) newTags.add('agency-portfolio');
  if (text.includes('service')) newTags.add('service-page');
  if (text.includes('enterprise')) newTags.add('b2b');
  if (text.includes('startup')) newTags.add('tech-startup');

  // Add difficulty-related tags
  if (template.difficulty === 'beginner') {
    newTags.add('easy');
    newTags.add('simple-setup');
  } else if (template.difficulty === 'advanced') {
    newTags.add('advanced-features');
    newTags.add('complex');
  }

  return Array.from(newTags);
}

// Expand tags for all templates in both EN and RU
if (translations.en && translations.en.templates) {
  translations.en.templates = translations.en.templates.map(template => ({
    ...template,
    tags: expandTags(template)
  }));
}

if (translations.ru && translations.ru.templates) {
  translations.ru.templates = translations.ru.templates.map(template => ({
    ...template,
    tags: expandTags(template)
  }));
}

// Write back to file
fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2), 'utf8');

console.log('✅ Tags expanded successfully!');
console.log(`Updated ${translations.en.templates.length} EN templates`);
if (translations.ru && translations.ru.templates) {
  console.log(`Updated ${translations.ru.templates.length} RU templates`);
}
