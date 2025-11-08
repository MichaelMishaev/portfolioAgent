"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";
import { FaTelegramPlane } from "react-icons/fa";

export function Header() {
  const { language, setLanguage } = useI18n();

  const TELEGRAM_USERNAME = "MichaelMMM";
  const TELEGRAM_LINK = `https://t.me/${TELEGRAM_USERNAME}`;

  const handleTelegramClick = () => {
    const features = "noopener,noreferrer";
    window.open(TELEGRAM_LINK, "_blank", features);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        {/* Left spacer for category button */}
        <div className="w-[180px]" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3">
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

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          {/* Telegram Contact Button - Mobile Only */}
          <Button
            size="sm"
            onClick={handleTelegramClick}
            className="bg-[#229ED9] hover:bg-[#1c8cbf] text-white h-11 min-h-[44px] px-3 touch-manipulation"
            aria-label={language === "ru" ? "Связаться в Telegram" : "Contact us on Telegram"}
          >
            <FaTelegramPlane className="h-4 w-4" />
          </Button>
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
