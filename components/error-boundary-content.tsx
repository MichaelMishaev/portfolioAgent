"use client";

import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";

interface ErrorBoundaryContentProps {
  error?: Error;
  onReset: () => void;
}

export function ErrorBoundaryContent({ error, onReset }: ErrorBoundaryContentProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <FiAlertTriangle className="w-16 h-16 text-amber-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">{t.errors.somethingWentWrong}</h2>
      <p className="text-foreground/70 mb-6 max-w-md">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button
        onClick={onReset}
        className="gap-2"
      >
        <FiRefreshCw className="w-4 h-4" />
        {t.errors.tryAgain}
      </Button>
    </div>
  );
}
