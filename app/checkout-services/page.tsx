"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServicesCheckoutView } from "@/components/checkout-services/services-checkout-view";
import { useI18n } from "@/lib/i18n-context";

function ServicesCheckoutContent() {
  const searchParams = useSearchParams();
  const { language, isRTL } = useI18n();
  const serviceIds = searchParams.get("services")?.split(",").map(Number) || [];
  const templateId = searchParams.get("template") || "";

  if (serviceIds.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className={`text-center ${isRTL ? 'rtl' : ''}`}>
          <h1 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'No Services Selected' : language === 'ru' ? 'Услуги не выбраны' : 'לא נבחרו שירותים'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {language === 'en' ? 'Please select services from the thank you page.' : language === 'ru' ? 'Пожалуйста, выберите услуги на странице благодарности.' : 'אנא בחר שירותים מדף תודה.'}
          </p>
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            {isRTL ? 'עבור לדף הבית ←' : '← Go to Home'}
          </a>
        </div>
      </div>
    );
  }

  return <ServicesCheckoutView serviceIds={serviceIds} templateId={templateId} />;
}

export default function ServicesCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent" />
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
          </div>
        </div>
      }
    >
      <ServicesCheckoutContent />
    </Suspense>
  );
}
