"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";

export function Header() {
  const { language, setLanguage } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PortfolioHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Templates
          </Link>
          <div className="flex items-center space-x-2">
            <Button
              variant={language === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("en")}
              className="h-8 px-2 text-xs"
            >
              EN
            </Button>
            <Button
              variant={language === "ru" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("ru")}
              className="h-8 px-2 text-xs"
            >
              RU
            </Button>
          </div>
          <ThemeToggle />
        </nav>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center gap-1">
            <Button
              variant={language === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("en")}
              className="h-8 px-2 text-xs"
            >
              EN
            </Button>
            <Button
              variant={language === "ru" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("ru")}
              className="h-8 px-2 text-xs"
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
