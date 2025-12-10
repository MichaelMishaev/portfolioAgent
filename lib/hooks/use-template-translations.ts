/**
 * Client-Side Template Translation Hook
 *
 * This hook provides backwards compatibility for existing template components
 * that use client-side translation loading. It dynamically imports template
 * translations only when needed, providing code splitting benefits.
 *
 * For NEW templates, prefer using server-side loading with getServerTemplateTranslations
 * in Server Components for better performance.
 */

"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n-context";
import type { Language } from "@/lib/translations/templates";

interface UseTemplateTranslationsOptions {
  /** The template ID to load translations for */
  templateId: string;
  /** Whether to load immediately or wait for manual trigger */
  lazy?: boolean;
}

interface UseTemplateTranslationsResult {
  /** Translations for the current language */
  t: Record<string, any>;
  /** All translations (all languages) */
  translations: { en: any; ru: any; he: any } | null;
  /** Loading state */
  loading: boolean;
  /** Error if loading failed */
  error: Error | null;
  /** Manually trigger loading (useful with lazy: true) */
  load: () => Promise<void>;
}

/**
 * Hook to dynamically load template translations on the client side
 *
 * This provides automatic code splitting - each template's translations
 * are loaded as a separate chunk only when the template is rendered.
 *
 * @example
 * ```typescript
 * // In a client component
 * function MyTemplate() {
 *   const { t, loading } = useTemplateTranslations({ templateId: 'minimalist' });
 *
 *   if (loading) return <div>Loading...</div>;
 *
 *   return (
 *     <div>
 *       <h1>{t.hero?.title}</h1>
 *       <p>{t.hero?.description}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Lazy loading (load on demand)
 * function MyTemplate() {
 *   const { t, loading, load } = useTemplateTranslations({
 *     templateId: 'minimalist',
 *     lazy: true
 *   });
 *
 *   return (
 *     <div>
 *       <button onClick={load}>Load Content</button>
 *       {!loading && t.hero && <h1>{t.hero.title}</h1>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useTemplateTranslations({
  templateId,
  lazy = false,
}: UseTemplateTranslationsOptions): UseTemplateTranslationsResult {
  const { language } = useI18n();
  const [translations, setTranslations] = useState<{ en: any; ru: any; he: any } | null>(null);
  const [loading, setLoading] = useState(!lazy);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    if (loading || translations) return;

    setLoading(true);
    setError(null);

    try {
      // Dynamic import for code splitting
      const module = await import(`@/lib/translations/templates/${templateId}.json`);
      const data = module.default || module;

      setTranslations(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(`Failed to load translations for ${templateId}`);
      setError(error);
      console.error(`[useTemplateTranslations] Error loading ${templateId}:`, error);
      // Set empty translations as fallback
      setTranslations({ en: {}, ru: {}, he: {} });
    } finally {
      setLoading(false);
    }
  };

  // Load translations on mount (unless lazy)
  useEffect(() => {
    if (!lazy) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId, lazy]);

  // Get translations for current language with fallback chain
  // Priority: requested language -> English -> empty object
  const t = translations?.[language as Language] || translations?.en || {};

  return {
    t,
    translations,
    loading,
    error,
    load,
  };
}

/**
 * Hook to load common translations (shared across all templates)
 *
 * This is rarely needed since common translations are available via useI18n(),
 * but it can be useful for accessing common translations in all languages.
 *
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { t } = useCommonTranslations();
 *   return <button>{t.backToGallery}</button>;
 * }
 * ```
 */
export function useCommonTranslations() {
  const { language } = useI18n();
  const [translations, setTranslations] = useState<{ en: any; ru: any; he: any } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCommon = async () => {
      try {
        const module = await import(`@/lib/translations/templates/common.json`);
        const data = module.default || module;
        setTranslations(data);
      } catch (error) {
        console.error('[useCommonTranslations] Failed to load common translations:', error);
        setTranslations({ en: {}, ru: {}, he: {} });
      } finally {
        setLoading(false);
      }
    };

    loadCommon();
  }, []);

  const t = translations?.[language as Language] || {};

  return { t, translations, loading };
}

/**
 * Preload template translations (useful for hover prefetching)
 *
 * @example
 * ```typescript
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
  import(`@/lib/translations/templates/${templateId}.json`).catch(() => {
    // Silently fail - it's just a preload
  });
}
