/**
 * Server-Side i18n Utilities
 *
 * These utilities are designed for use in Server Components and API routes.
 * They handle template-specific translations which are loaded dynamically
 * for optimal code splitting and performance.
 *
 * For client-side UI translations, use the i18n-context.tsx instead.
 */

import { getTemplateTranslations, getCommonTranslations } from '@/lib/translations/templates';
import type { Language } from '@/lib/translations/templates';

/**
 * Get translations for a specific template in a Server Component
 *
 * @param templateId - The template ID
 * @param language - The language (defaults to 'en')
 * @returns Template translations object
 *
 * @example
 * ```typescript
 * // In a Server Component
 * export default async function TemplatePage({ params }) {
 *   const t = await getServerTemplateTranslations(params.templateId, 'en');
 *
 *   return (
 *     <div>
 *       <h1>{t.hero?.title}</h1>
 *       <p>{t.hero?.description}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export async function getServerTemplateTranslations(
  templateId: string,
  language: Language = 'en'
): Promise<Record<string, any>> {
  try {
    const allTranslations = await getTemplateTranslations(templateId);

    // Fallback chain: requested language -> English -> empty object
    const translations = allTranslations?.[language] || allTranslations?.en || {};

    return translations;
  } catch (error) {
    console.error(`[Server i18n] Failed to load template translations: ${templateId}`, error);
    return {};
  }
}

/**
 * Get all language translations for a template (used for language switching)
 *
 * @param templateId - The template ID
 * @returns Object with translations for all languages
 *
 * @example
 * ```typescript
 * const allTranslations = await getAllTemplateTranslations('minimalist');
 * console.log(allTranslations.en, allTranslations.ru, allTranslations.he);
 * ```
 */
export async function getAllTemplateTranslations(
  templateId: string
): Promise<{ en: any; ru: any; he: any }> {
  try {
    const translations = await getTemplateTranslations(templateId);
    return translations || { en: {}, ru: {}, he: {} };
  } catch (error) {
    console.error(`[Server i18n] Failed to load all template translations: ${templateId}`, error);
    return { en: {}, ru: {}, he: {} };
  }
}

/**
 * Get common translations for a specific language
 *
 * @param language - The language
 * @returns Common translations object
 *
 * @example
 * ```typescript
 * const common = await getServerCommonTranslations('en');
 * console.log(common.backToGallery); // "← Back to Gallery"
 * ```
 */
export async function getServerCommonTranslations(
  language: Language = 'en'
): Promise<Record<string, any>> {
  try {
    const translations = await getCommonTranslations(language);
    return translations || {};
  } catch (error) {
    console.error('[Server i18n] Failed to load common translations', error);
    return {};
  }
}

/**
 * Get the current language from cookies or headers (for server components)
 * Falls back to 'en' if not found
 *
 * @param request - Optional Request object (for API routes)
 * @returns The detected language
 *
 * @example
 * ```typescript
 * // In Server Component
 * const language = await getServerLanguage();
 *
 * // In API Route
 * export async function GET(request: Request) {
 *   const language = await getServerLanguage(request);
 *   // ...
 * }
 * ```
 */
export async function getServerLanguage(request?: Request): Promise<Language> {
  try {
    if (request) {
      // Try to get from cookie in request
      const cookieHeader = request.headers.get('cookie') || '';
      const languageMatch = cookieHeader.match(/language=(\w+)/);
      if (languageMatch && isValidLanguage(languageMatch[1])) {
        return languageMatch[1] as Language;
      }

      // Try to get from Accept-Language header
      const acceptLanguage = request.headers.get('accept-language');
      if (acceptLanguage) {
        const preferredLang = parseAcceptLanguage(acceptLanguage);
        if (preferredLang) return preferredLang;
      }
    } else {
      // Try to read from cookies module (Next.js server component)
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const language = cookieStore.get('language')?.value;
      if (language && isValidLanguage(language)) {
        return language as Language;
      }
    }
  } catch (error) {
    // Cookie reading can fail in some contexts, fall back gracefully
    console.debug('[Server i18n] Could not read language cookie:', error);
  }

  return 'en'; // Default fallback
}

/**
 * Helper to validate if a string is a valid language code
 */
function isValidLanguage(lang: string): lang is Language {
  return ['en', 'ru', 'he'].includes(lang);
}

/**
 * Parse Accept-Language header and return preferred supported language
 */
function parseAcceptLanguage(header: string): Language | null {
  const languages = header
    .split(',')
    .map(lang => {
      const [code, qStr] = lang.trim().split(';q=');
      const q = qStr ? parseFloat(qStr) : 1.0;
      return { code: code.split('-')[0].toLowerCase(), q };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of languages) {
    if (isValidLanguage(code)) {
      return code as Language;
    }
  }

  return null;
}

/**
 * Type helper for template translations
 * Use this to get better TypeScript support in your components
 *
 * @example
 * ```typescript
 * type MinimalistTranslations = TemplateTranslationType<'minimalist'>;
 * const t: MinimalistTranslations = await getServerTemplateTranslations('minimalist');
 * ```
 */
export type TemplateTranslationType<T extends string> = Record<string, any>;
