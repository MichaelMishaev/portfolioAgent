"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServicesCheckoutView } from "@/components/checkout-services/services-checkout-view";

function ServicesCheckoutContent() {
  const searchParams = useSearchParams();
  const serviceIds = searchParams.get("services")?.split(",").map(Number) || [];
  const templateId = searchParams.get("template") || "";

  if (serviceIds.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Services Selected</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Please select services from the thank you page.
          </p>
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            ← Go to Home
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
