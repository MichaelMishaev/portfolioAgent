"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  links: NavLink[];
  backLink?: string;
  backLabel?: string;
  className?: string;
}

export function MobileNav({ links, backLink = "/", backLabel = "← Back", className = "" }: MobileNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isRTL } = useI18n();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link href={backLink} className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${isRTL ? 'text-right' : ''}`}>
            {backLabel}
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t">
          <div className={`container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4 ${isRTL ? 'text-right' : ''}`}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
