"use client";

import { getTemplateById } from "@/lib/template-registry";
import { CraftJSTemplateBuilder } from "@/components/builder/craftjs-template-builder";
import { notFound, useParams, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";

export default function TemplateBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useI18n();
  const templateId = params.templateId as string;

  const template = getTemplateById(templateId, language);

  if (!template) {
    notFound();
  }

  const translations = {
    en: {
      title: "Builder Under Construction",
      subtitle: "We're working hard to bring you an amazing template customization experience.",
      comingSoon: "Coming Soon...",
      description: "Our visual builder is currently being refined to provide you with the best customization tools. Stay tuned for updates!",
      backButton: "Back to Template"
    },
    ru: {
      title: "Конструктор в разработке",
      subtitle: "Мы усердно работаем над созданием потрясающего опыта настройки шаблонов.",
      comingSoon: "Скоро...",
      description: "Наш визуальный конструктор в настоящее время дорабатывается, чтобы предоставить вам лучшие инструменты настройки. Следите за обновлениями!",
      backButton: "Вернуться к шаблону"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Lightly blurred builder in background - visible but not interactive */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none blur-[2px] opacity-60">
        <CraftJSTemplateBuilder template={template} />
      </div>

      {/* Dark overlay for better contrast */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none" style={{ zIndex: 9998 }}></div>

      {/* Under construction popup/modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none" style={{ zIndex: 9999 }}>
        <div className="pointer-events-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-gray-200 max-w-2xl w-full mx-auto overflow-y-auto max-h-[90vh]">
          <div className="text-center space-y-4 sm:space-y-6">
          {/* AI-Generated Illustration */}
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
              <img
                src="https://ideogram.ai/assets/progressive-image/balanced/response/8WEcTsj6RrWO1hZXJh0jLQ"
                alt="Builder under construction"
                className="relative rounded-2xl w-full h-auto shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              {t.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium px-4 sm:px-0">
              {t.subtitle}
            </p>
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base shadow-lg">
                {t.comingSoon}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-4 sm:px-0">
            {t.description}
          </p>

          {/* Back Button */}
          <div className="pt-2">
            <Button
              onClick={() => router.push(`/templates/${templateId}`)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              ← {t.backButton}
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="pt-3 sm:pt-4">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
