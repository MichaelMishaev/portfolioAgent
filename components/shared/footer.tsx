"use client";

import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin, FaTelegramPlane } from "react-icons/fa";
import { useI18n } from "@/lib/i18n-context";
import { TELEGRAM_CONTACT_LINK } from "@/components/shared/contact-us-floating-button";

export function Footer() {
  const { t, language, isRTL } = useI18n();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PortfolioHub
            </h3>
            <p className="text-sm text-muted-foreground">
              Professional portfolio templates for creators, bloggers, and professionals.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t.footer.templates}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.allTemplates}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.professional}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.creative}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.modern}</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t.footer.resources}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.documentation}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.guides}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t.footer.support}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t.footer.connect}</h4>
            <div className="flex flex-col gap-3">
              {/* Telegram Contact Button */}
              <a
                href={TELEGRAM_CONTACT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#229ED9] hover:bg-[#1c8cbf] text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg w-fit"
                aria-label={language === "ru" ? "Связаться в Telegram" : language === "he" ? "צור קשר בטלגרם" : "Contact us on Telegram"}
              >
                <FaTelegramPlane className="w-4 h-4" />
                <span>{language === "ru" ? "Связаться" : language === "he" ? "צור קשר" : "Contact Us"}</span>
              </a>
              
              {/* Social Icons */}
              <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                  <FaGithub className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PortfolioHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
