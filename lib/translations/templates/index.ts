/**
 * Template Translations Index
 * Auto-generated utilities for loading template translations
 *
 * This file provides utilities to dynamically load template translations
 * using Next.js dynamic imports for optimal code splitting.
 */

export type Language = 'en' | 'ru' | 'he';

export interface TemplateTranslations {
  en: Record<string, any>;
  ru: Record<string, any>;
  he: Record<string, any>;
}

/**
 * Load translations for a specific template
 * Uses dynamic imports for automatic code splitting
 *
 * @param templateId - The template ID (e.g., 'minimalist', 'bold-typography')
 * @param language - Optional language to return only that language's translations
 * @returns Promise resolving to template translations
 *
 * @example
 * ```typescript
 * // Load all languages for a template
 * const translations = await getTemplateTranslations('minimalist');
 * console.log(translations.en, translations.ru, translations.he);
 *
 * // Load specific language only
 * const enTranslations = await getTemplateTranslations('minimalist', 'en');
 * ```
 */
export async function getTemplateTranslations(
  templateId: string,
  language?: Language
): Promise<any> {
  try {
    // Dynamic import for code splitting - each template is a separate chunk
    const translations = await import(`./${templateId}.json`);
    const data: TemplateTranslations = translations.default || translations;

    // If language specified, return only that language
    if (language) {
      return data[language] || data.en || {};
    }

    // Otherwise return all languages
    return data;
  } catch (error) {
    console.error(`[i18n] Failed to load translations for template: ${templateId}`, error);
    // Fallback to empty object to prevent crashes
    return language ? {} : { en: {}, ru: {}, he: {} };
  }
}

/**
 * Load common translations (used across all templates)
 * These are shared UI elements like buttons, labels, etc.
 *
 * @param language - Optional language to return only that language's translations
 * @returns Promise resolving to common translations
 *
 * @example
 * ```typescript
 * const commonEn = await getCommonTranslations('en');
 * console.log(commonEn.backToGallery); // "← Back to Gallery"
 * ```
 */
export async function getCommonTranslations(language?: Language): Promise<any> {
  try {
    const translations = await import('./common.json');
    const data: TemplateTranslations = translations.default || translations;

    return language ? data[language] : data;
  } catch (error) {
    console.error('[i18n] Failed to load common translations', error);
    return language ? {} : { en: {}, ru: {}, he: {} };
  }
}

/**
 * Preload template translations (useful for prefetching)
 * This can be used to warm up the cache before navigation
 *
 * @param templateId - The template ID to preload
 *
 * @example
 * ```typescript
 * // Preload on hover for faster navigation
 * <Link
 *   href="/templates/minimalist"
 *   onMouseEnter={() => preloadTemplateTranslations('minimalist')}
 * >
 *   View Template
 * </Link>
 * ```
 */
export function preloadTemplateTranslations(templateId: string): void {
  // Webpack/Next.js will handle this as a prefetch
  import(`./${templateId}.json`).catch(() => {
    // Silently fail - it's just a preload
  });
}

/**
 * Check if a template translation file exists
 * Useful for validation before attempting to load
 *
 * @param templateId - The template ID to check
 * @returns Promise resolving to boolean indicating if translations exist
 */
export async function hasTemplateTranslations(templateId: string): Promise<boolean> {
  try {
    await import(`./${templateId}.json`);
    return true;
  } catch {
    return false;
  }
}
