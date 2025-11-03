"use client";

import { BackButton } from "./back-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";
import { FiEdit3 } from "react-icons/fi";

interface TemplateLayoutProps {
  children: React.ReactNode;
}

export function TemplateLayout({ children }: TemplateLayoutProps) {
  const pathname = usePathname();
  const { language } = useI18n();

  // Extract templateId from pathname (e.g., /templates/fullscreen-immersive -> fullscreen-immersive)
  const templateId = pathname?.split('/templates/')[1]?.split('/')[0] || '';

  return (
    <>
      <BackButton floating />
      {children}

      {/* Sticky Builder Button */}
      {templateId && (
        <Link
          href={`/templates/${templateId}/builder`}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          <FiEdit3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-base">
            {language === 'ru' ? 'Настроить и построить' : 'Customize & Build'}
          </span>
        </Link>
      )}
    </>
  );
}
