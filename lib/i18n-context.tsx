"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import translations from "./translations.json";
// TEMPORARY: Keep old import for backwards compatibility during migration
import templateTranslations from "./template-translations.json";

type Language = "en" | "ru" | "he";

// Direction mapping for each language
const LANGUAGE_DIRECTIONS: Record<Language, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ru: 'ltr',
  he: 'rtl',
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  /** @deprecated Use useTemplateTranslations hook instead for better performance */
  tt: typeof templateTranslations.en;
  // RTL support
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  flipDirection: (value: number) => number; // Utility for animations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  const dir = LANGUAGE_DIRECTIONS[language];
  const isRTL = dir === 'rtl';

  // Utility to flip numeric values for animations (e.g., -100 becomes 100 in RTL)
  const flipDirection = useCallback(
    (value: number) => (isRTL ? -value : value),
    [isRTL]
  );

  // Update HTML dir and lang attributes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', language);
    }
  }, [dir, language]);

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ru" || savedLanguage === "he")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Persist to localStorage
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  }, []);

  const t = translations[language];
  // TEMPORARY: Keep for backwards compatibility
  const tt = templateTranslations[language];

  return (
    <I18nContext.Provider value={{
      language,
      setLanguage,
      t,
      tt, // Deprecated but kept for backwards compatibility
      dir,
      isRTL,
      flipDirection,
    }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
