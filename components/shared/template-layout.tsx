"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";
import { FiX, FiShoppingCart } from "react-icons/fi";
import { getTemplateById } from "@/lib/template-registry";
import { useState, useEffect } from "react";

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
      {/* Top Bar - ThemeForest Style */}
      {templateId && templateData && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-sm">
          <div className="max-w-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
            {/* Left: Close Button + Template Name */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Link
                href={`/templates/${templateId}`}
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={language === 'ru' ? 'Закрыть' : 'Close'}
              >
                <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-semibold truncate">{templateData.name}</div>
              </div>
            </div>

            {/* Right: Buy Now Button - ThemeForest Green */}
            <Link
              href={`/checkout/${templateId}`}
              className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#82b541] hover:bg-[#6fa32d] text-white text-sm sm:text-base font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>
                {language === 'ru'
                  ? `Купить - $${templateData.price}`
                  : `Buy Now - $${templateData.price}`}
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Add top padding to content when bar is present */}
      <div className={templateId ? 'pt-[52px] sm:pt-[56px]' : ''}>
        {children}
      </div>
    </>
  );
}
