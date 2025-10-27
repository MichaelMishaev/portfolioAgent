"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { language, setLanguage } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PortfolioHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Templates
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
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

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={toggleMobileMenu}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-16 bottom-0 w-64 bg-background border-l z-40 md:hidden"
            >
              <div className="flex flex-col h-full p-6 space-y-6">
                <Link
                  href="/"
                  className="text-base font-medium hover:text-primary transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Templates
                </Link>
                <Link
                  href="/about"
                  className="text-base font-medium hover:text-primary transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">Language</p>
                  <div className="flex gap-2">
                    <Button
                      variant={language === "en" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage("en")}
                      className="flex-1"
                    >
                      EN
                    </Button>
                    <Button
                      variant={language === "ru" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage("ru")}
                      className="flex-1"
                    >
                      RU
                    </Button>
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
