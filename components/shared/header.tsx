"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";

export function Header() {
  const { language, setLanguage } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 min-h-[44px] -ml-2 pl-2">
          <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PortfolioHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3">
          <Link href="/#templates" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2">
            Templates
          </Link>
          <Link href="/#contact" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2">
            Contact
          </Link>
          <div className="flex items-center gap-2 ml-2">
            <Button
              variant={language === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("en")}
              className="h-9 min-h-[36px] px-3 text-sm min-w-[48px] font-medium"
            >
              EN
            </Button>
            <Button
              variant={language === "ru" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("ru")}
              className="h-9 min-h-[36px] px-3 text-sm min-w-[48px] font-medium"
            >
              RU
            </Button>
          </div>
          <ThemeToggle />
        </nav>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant={language === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("en")}
              className="h-11 min-h-[44px] px-4 text-sm min-w-[52px] font-medium touch-manipulation"
              aria-label="Switch to English"
            >
              EN
            </Button>
            <Button
              variant={language === "ru" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("ru")}
              className="h-11 min-h-[44px] px-4 text-sm min-w-[52px] font-medium touch-manipulation"
              aria-label="Switch to Russian"
            >
              RU
            </Button>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
