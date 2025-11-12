"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";
import { FiX, FiShoppingCart } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { getTemplateById } from "@/lib/template-registry";
import { useState, useEffect } from "react";
import { TELEGRAM_CONTACT_LINK } from "@/components/shared/contact-us-floating-button";

interface TemplateLayoutProps {
  children: React.ReactNode;
}

export function TemplateLayout({ children }: TemplateLayoutProps) {
  const pathname = usePathname();
  const { language } = useI18n();
  const [templateData, setTemplateData] = useState<{ price: number; name: string } | null>(null);

  // Extract templateId from pathname (e.g., /templates/fullscreen-immersive/demo -> fullscreen-immersive)
  const templateId = pathname?.split('/templates/')[1]?.split('/')[0] || '';

  // Get template data
  useEffect(() => {
    if (templateId) {
      const template = getTemplateById(templateId, language);
      if (template) {
        setTemplateData({
          price: template.price,
          name: template.name
        });
      }
    }
  }, [templateId, language]);

  return (
    <>
      {/* Top Bar - Improved ThemeForest Style */}
      {templateId && templateData && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-background/95 backdrop-blur-md border-b border-border shadow-lg supports-[backdrop-filter]:bg-background/80">
          <div className="max-w-full mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-3.5">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              {/* Left: Close Button + Template Name */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <Link
                  href={`/templates/${templateId}`}
                  className="flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg hover:bg-muted transition-colors touch-manipulation group"
                  title={language === 'ru' ? 'Закрыть' : 'Close'}
                  aria-label={language === 'ru' ? 'Закрыть' : 'Close'}
                >
                  <FiX className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-destructive transition-colors" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="text-sm sm:text-base font-semibold text-foreground truncate" title={templateData.name}>
                    {templateData.name}
                  </div>
                </div>
              </div>

              {/* Right: Contact + Buy Buttons */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                {/* Contact Button */}
                <a
                  href={TELEGRAM_CONTACT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#229ED9] hover:bg-[#1c8cbf] active:bg-[#1a7ba8] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 touch-manipulation min-h-[40px] sm:min-h-[44px]"
                  aria-label={language === 'ru' ? 'Связаться в Telegram' : 'Contact us on Telegram'}
                >
                  <FaTelegramPlane className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap">
                    {language === 'ru' ? 'Связаться' : 'Contact'}
                  </span>
                </a>
                
                {/* Buy Button */}
                <Link
                  href={`/checkout/${templateId}`}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-[#82b541] hover:bg-[#6fa32d] active:bg-[#5d8f25] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 touch-manipulation min-h-[40px] sm:min-h-[44px]"
                  aria-label={language === 'ru' ? `Купить за $${templateData.price}` : `Buy for $${templateData.price}`}
                >
                  <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {language === 'ru'
                      ? `Купить - $${templateData.price}`
                      : `Buy - $${templateData.price}`}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add top padding to content when bar is present */}
      <div className={templateId && templateData ? 'pt-[60px] sm:pt-[64px]' : ''}>
        {children}
      </div>
    </>
  );
}
