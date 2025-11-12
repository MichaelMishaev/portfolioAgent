"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Construction, ArrowLeft, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { getTemplatesByCategory } from "@/lib/template-registry";
import type { TemplateConfig } from "@/lib/template-registry";

interface TemplateErrorFallbackProps {
  templateId?: string;
  templateName?: string;
  templateCategory?: string;
  error?: Error | null;
}

export function TemplateErrorFallback({
  templateId,
  templateName,
  templateCategory,
  error,
}: TemplateErrorFallbackProps) {
  const { theme } = useTheme();
  const { t, language } = useI18n();
  const isDark = theme === "dark";

  // Get alternative templates from the same category
  const getSimilarTemplates = (): TemplateConfig[] => {
    if (!templateCategory) return [];

    const categoryTemplates = getTemplatesByCategory(templateCategory, language);

    // Filter out the current template and return up to 3 alternatives
    return categoryTemplates
      .filter((template) => template.id !== templateId)
      .slice(0, 3);
  };

  const alternativeTemplates = getSimilarTemplates();

  return (
    <div
      className={`min-h-[400px] w-full rounded-lg border ${
        isDark
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
      } p-8 flex flex-col items-center justify-center`}
    >
      {/* Construction Icon */}
      <div
        className={`mb-6 p-4 rounded-full ${
          isDark ? "bg-yellow-900/20" : "bg-yellow-50"
        }`}
      >
        <Construction
          className={`w-12 h-12 ${
            isDark ? "text-yellow-500" : "text-yellow-600"
          }`}
        />
      </div>

      {/* Error Message */}
      <h2
        className={`text-2xl font-bold mb-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {t.errors?.templateUnderConstruction || "Template Under Construction"}
      </h2>

      <p
        className={`text-center mb-6 max-w-md ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {templateName
          ? `${t.errors?.templateLoadError || "We're working on"} "${templateName}". ${
              t.errors?.tryAlternativeTemplates || "Try one of these alternatives"
            }:`
          : t.errors?.templateLoadError || "This template is currently unavailable. Please try another one."}
      </p>

      {/* Back to Gallery Button */}
      <Link
        href="/"
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors mb-8 ${
          isDark
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        {t.common?.backToGallery || "Back to Gallery"}
      </Link>

      {/* Alternative Templates */}
      {alternativeTemplates.length > 0 && (
        <div className="w-full max-w-4xl">
          <h3
            className={`text-lg font-semibold mb-4 text-center ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t.errors?.viewSimilarTemplates || "View Similar Templates"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {alternativeTemplates.map((template) => (
              <Link
                key={template.id}
                href={template.demoPath}
                className={`group block rounded-lg overflow-hidden border transition-all hover:shadow-lg ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:border-blue-500"
                    : "bg-white border-gray-200 hover:border-blue-500"
                }`}
              >
                {/* Template Thumbnail */}
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={template.thumbnail}
                    alt={template.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <h4
                    className={`font-semibold mb-1 flex items-center gap-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {template.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p
                    className={`text-sm line-clamp-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {template.description}
                  </p>

                  {/* Category Badge */}
                  <div className="mt-3">
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded ${
                        isDark
                          ? "bg-blue-900 text-blue-300"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {template.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === "development" && error && (
        <details
          className={`mt-8 w-full max-w-2xl ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <summary className="cursor-pointer text-sm font-mono">
            Debug Info (Development Only)
          </summary>
          <pre className="mt-2 p-4 bg-red-50 dark:bg-red-900/20 rounded text-xs overflow-auto">
            {error.message}
            {"\n\n"}
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
}
