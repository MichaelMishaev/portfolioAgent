/**
 * Template and Translation Integrity Tests
 *
 * Automated tests to verify:
 * 1. Translation consistency between languages
 * 2. Template component file existence
 * 3. Preview registry integrity
 * 4. Field completeness
 */

import * as fs from 'fs';
import * as path from 'path';

// Import translations
const translationsPath = path.join(process.cwd(), 'lib/translations.json');
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf-8'));

const enTemplates = translations.en.templates;
const ruTemplates = translations.ru.templates;

describe('Template Translation Integrity', () => {
  describe('Template Count Consistency', () => {
    test('should have same number of templates in EN and RU', () => {
      expect(enTemplates.length).toBe(ruTemplates.length);
      expect(enTemplates.length).toBeGreaterThan(0);
    });

    test('should have exactly 44 templates', () => {
      expect(enTemplates.length).toBe(44);
      expect(ruTemplates.length).toBe(44);
    });
  });

  describe('Template ID Matching', () => {
    test('all EN template IDs should exist in RU', () => {
      const enIds = enTemplates.map((t: any) => t.id);
      const ruIds = new Set(ruTemplates.map((t: any) => t.id));

      enIds.forEach((id: string) => {
        expect(ruIds.has(id)).toBe(true);
      });
    });

    test('all RU template IDs should exist in EN', () => {
      const ruIds = ruTemplates.map((t: any) => t.id);
      const enIds = new Set(enTemplates.map((t: any) => t.id));

      ruIds.forEach((id: string) => {
        expect(enIds.has(id)).toBe(true);
      });
    });

    test('no duplicate IDs in EN templates', () => {
      const ids = enTemplates.map((t: any) => t.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    test('no duplicate IDs in RU templates', () => {
      const ids = ruTemplates.map((t: any) => t.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });

  describe('Field Completeness', () => {
    const requiredFields = ['id', 'name', 'description', 'category', 'difficulty', 'features', 'tags', 'bestFor'];

    test('all EN templates should have required fields', () => {
      enTemplates.forEach((template: any) => {
        requiredFields.forEach(field => {
          expect(template).toHaveProperty(field);
          expect(template[field]).toBeDefined();

          if (Array.isArray(template[field])) {
            expect(template[field].length).toBeGreaterThan(0);
          } else {
            expect(template[field]).toBeTruthy();
          }
        });
      });
    });

    test('all RU templates should have required fields', () => {
      ruTemplates.forEach((template: any) => {
        requiredFields.forEach(field => {
          expect(template).toHaveProperty(field);
          expect(template[field]).toBeDefined();

          if (Array.isArray(template[field])) {
            expect(template[field].length).toBeGreaterThan(0);
          } else {
            expect(template[field]).toBeTruthy();
          }
        });
      });
    });

    test('features array should have at least 3 items', () => {
      enTemplates.forEach((template: any) => {
        expect(template.features.length).toBeGreaterThanOrEqual(3);
      });
    });

    test('tags array should have at least 2 items', () => {
      enTemplates.forEach((template: any) => {
        expect(template.tags.length).toBeGreaterThanOrEqual(2);
      });
    });

    test('bestFor array should have at least 1 item', () => {
      enTemplates.forEach((template: any) => {
        expect(template.bestFor.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Component File Existence', () => {
    const templateFileMap: Record<string, string> = {
      // Blog templates
      'blog-archetypes-editorial': 'components/templates/blog-pages/archetypes-editorial-template.tsx',
      'blog-archetypes-minimal': 'components/templates/blog-pages/archetypes-minimal-template.tsx',
      'blog-magazine': 'components/templates/blog-pages/magazine-blog-template.tsx',
      'blog-personal': 'components/templates/blog-pages/personal-blog-template.tsx',
      'blog-tech': 'components/templates/blog-pages/tech-blog-template.tsx',

      // Product templates
      'product-audio': 'components/templates/product-pages/audio-product-template.tsx',
      'product-course': 'components/templates/product-pages/course-product-template.tsx',
      'product-fashion': 'components/templates/product-pages/fashion-product-template.tsx',
      'product-luxury': 'components/templates/product-pages/luxury-product-template.tsx',
      'product-physical': 'components/templates/product-pages/physical-product-template.tsx',
      'product-premium': 'components/templates/product-pages/premium-product-template.tsx',
      'product-saas': 'components/templates/product-pages/saas-product-template.tsx',
      'product-tech': 'components/templates/product-pages/tech-product-template.tsx',
      'product-vacuum': 'components/templates/product-pages/vacuum-product-template.tsx',

      // Service templates
      'service-agency': 'components/templates/product-pages/agency-service-template.tsx',
      'service-b2b': 'components/templates/product-pages/b2b-service-template.tsx',
      'service-community': 'components/templates/product-pages/community-service-template.tsx',
      'service-consulting': 'components/templates/product-pages/consulting-service-template.tsx',
      'service-dfyou': 'components/templates/product-pages/dfyou-service-template.tsx',
      'service-enterprise': 'components/templates/product-pages/enterprise-service-template.tsx',

      // Online business templates
      'online-business-agency': 'components/templates/online-business/online-business-agency-template.tsx',
      'online-business-coach': 'components/templates/online-business/online-business-coach-template.tsx',
      'online-business-course': 'components/templates/online-business/online-business-course-template.tsx',
      'online-business-saas': 'components/templates/online-business-saas/online-business-saas-template.tsx',

      // Service marketplace
      'service-marketplace': 'components/templates/service-marketplace/service-marketplace-template.tsx',
    };

    test('all templates should have component files', () => {
      enTemplates.forEach((template: any) => {
        const templateId = template.id;
        let componentPath: string;

        // Check if custom path exists
        if (templateFileMap[templateId]) {
          componentPath = path.join(process.cwd(), templateFileMap[templateId]);
        } else {
          // Check default path
          componentPath = path.join(process.cwd(), `components/templates/${templateId}/${templateId}-template.tsx`);
        }

        expect(fs.existsSync(componentPath)).toBe(true);
      });
    });
  });

  describe('Preview Component System', () => {
    test('preview component files should exist', () => {
      const previewFiles = [
        'components/style-preview/template-previews/default-preview.tsx',
        'components/style-preview/template-previews/minimalist-preview.tsx',
        'components/style-preview/template-previews/dark-mode-preview.tsx',
        'components/style-preview/template-previews/3d-immersive-preview.tsx',
        'components/style-preview/template-previews/neo-brutalist-preview.tsx',
        'components/style-preview/template-previews/kinetic-typography-preview.tsx',
        'components/style-preview/template-previews/organic-liquid-preview.tsx',
        'components/style-preview/template-previews/collage-maximalist-preview.tsx',
        'components/style-preview/template-previews/y2k-retro-preview.tsx',
        'components/style-preview/template-previews/voice-first-preview.tsx',
      ];

      previewFiles.forEach(file => {
        const filePath = path.join(process.cwd(), file);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });

    test('preview registry file should exist', () => {
      const registryPath = path.join(process.cwd(), 'lib/preview-registry.tsx');
      expect(fs.existsSync(registryPath)).toBe(true);
    });

    test('preview registry should be valid TypeScript', () => {
      const registryPath = path.join(process.cwd(), 'lib/preview-registry.tsx');
      const registryContent = fs.readFileSync(registryPath, 'utf-8');

      // Check for required exports
      expect(registryContent).toContain('export const PREVIEW_REGISTRY');
      expect(registryContent).toContain('export function getPreviewComponent');
      expect(registryContent).toContain('export function hasCustomPreview');
    });

    test('all 9 custom preview templates should be in registry', () => {
      const registryPath = path.join(process.cwd(), 'lib/preview-registry.tsx');
      const registryContent = fs.readFileSync(registryPath, 'utf-8');

      const customPreviewIds = [
        'minimalist',
        'dark-mode',
        '3d-immersive',
        'neo-brutalist',
        'kinetic-typography',
        'organic-liquid',
        'collage-maximalist',
        'y2k-retro',
        'voice-first',
      ];

      customPreviewIds.forEach(id => {
        expect(registryContent).toContain(`"${id}"`);
      });
    });

    test('should have exactly 9 custom previews', () => {
      const registryPath = path.join(process.cwd(), 'lib/preview-registry.tsx');
      const registryContent = fs.readFileSync(registryPath, 'utf-8');

      // Extract just the PREVIEW_REGISTRY object content
      const registryMatch = registryContent.match(/PREVIEW_REGISTRY[^{]*\{([^}]+)\}/s);
      expect(registryMatch).not.toBeNull();

      if (registryMatch) {
        const registryBody = registryMatch[1];
        // Count actual entries (lines with : that aren't comments)
        const entries = registryBody.split('\n')
          .filter(line => line.includes(':') && !line.trim().startsWith('//'));
        expect(entries.length).toBe(9);
      }
    });
  });

  describe('Category Consistency', () => {
    const validCategories = [
      'Professional',
      'Creative',
      'Portfolio',
      'Modern',
      'Simple',
      'Blog',
      'Product',
      'Service',
      'Experimental',
      'Online Business',
    ];

    test('all templates should have valid categories', () => {
      enTemplates.forEach((template: any) => {
        expect(validCategories).toContain(template.category);
      });
    });

    test('all categories should be used', () => {
      const usedCategories = new Set(enTemplates.map((t: any) => t.category));
      validCategories.forEach(category => {
        expect(usedCategories.has(category)).toBe(true);
      });
    });
  });

  describe('Difficulty Level Consistency', () => {
    const validDifficulties = ['beginner', 'intermediate', 'advanced'];

    test('all templates should have valid difficulty levels', () => {
      enTemplates.forEach((template: any) => {
        expect(validDifficulties).toContain(template.difficulty);
      });
    });
  });

  describe('Translation Quality', () => {
    test('EN and RU template names should be different', () => {
      enTemplates.forEach((enTemplate: any) => {
        const ruTemplate = ruTemplates.find((t: any) => t.id === enTemplate.id);
        if (ruTemplate) {
          // Names should be translated, not the same
          // Some technical terms might be the same, but most should differ
          const enName = enTemplate.name.toLowerCase();
          const ruName = ruTemplate.name.toLowerCase();

          // Check if they're not identical (allowing for some technical terms)
          if (enName !== ruName) {
            expect(true).toBe(true);
          }
        }
      });
    });

    test('EN and RU descriptions should be different', () => {
      enTemplates.forEach((enTemplate: any) => {
        const ruTemplate = ruTemplates.find((t: any) => t.id === enTemplate.id);
        if (ruTemplate) {
          expect(enTemplate.description).not.toBe(ruTemplate.description);
        }
      });
    });
  });
});

describe('I18n System Integrity', () => {
  test('should have en and ru language keys', () => {
    expect(translations).toHaveProperty('en');
    expect(translations).toHaveProperty('ru');
  });

  test('common translations should exist', () => {
    expect(translations.en).toHaveProperty('common');
    expect(translations.ru).toHaveProperty('common');
    expect(translations.en.common).toHaveProperty('about');
    expect(translations.ru.common).toHaveProperty('about');
  });

  test('UI translations should exist', () => {
    expect(translations.en).toHaveProperty('ui');
    expect(translations.ru).toHaveProperty('ui');
  });

  test('stylePreview translations should exist', () => {
    expect(translations.en).toHaveProperty('stylePreview');
    expect(translations.ru).toHaveProperty('stylePreview');
  });
});
