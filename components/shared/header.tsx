"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";

export function Header() {
  const { language, setLanguage, isRTL } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
        {/* Left side - Logo/Brand (spacer for category button) */}
        <div className="flex items-center min-w-[180px]">
          {/* Category button is fixed positioned, so we just need space */}
        </div>

        {/* Center - Empty space */}
        <div className="flex-1"></div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-2" data-testid="language-switcher">
          {/* Desktop: Language + Theme */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Switcher Group */}
            <div className={`flex items-center gap-0.5 bg-muted/50 rounded-md p-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Button
                variant={language === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("en")}
                className="h-8 px-3 text-xs font-medium rounded-md min-w-[44px]"
                aria-label="Switch to English"
                data-testid="language-en"
              >
                EN
              </Button>
              <Button
                variant={language === "ru" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("ru")}
                className="h-8 px-3 text-xs font-medium rounded-md min-w-[44px]"
                aria-label="Switch to Russian"
                data-testid="language-ru"
              >
                RU
              </Button>
              <Button
                variant={language === "he" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("he")}
                className="h-8 px-3 text-xs font-medium rounded-md min-w-[44px]"
                aria-label="Switch to Hebrew"
                data-testid="language-he"
              >
                עב
              </Button>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile: Language + Theme */}
          <div className="flex md:hidden items-center gap-2">
            {/* Language Switcher Group */}
            <div className={`flex items-center gap-0.5 bg-muted/50 rounded-lg p-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Button
                variant={language === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("en")}
                className="h-9 px-3 text-xs font-medium rounded-md min-w-[48px] touch-manipulation"
                aria-label="Switch to English"
                data-testid="language-en-mobile"
              >
                EN
              </Button>
              <Button
                variant={language === "ru" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("ru")}
                className="h-9 px-3 text-xs font-medium rounded-md min-w-[48px] touch-manipulation"
                aria-label="Switch to Russian"
                data-testid="language-ru-mobile"
              >
                RU
              </Button>
              <Button
                variant={language === "he" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("he")}
                className="h-9 px-3 text-xs font-medium rounded-md min-w-[48px] touch-manipulation"
                aria-label="Switch to Hebrew"
                data-testid="language-he-mobile"
              >
                עב
              </Button>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
