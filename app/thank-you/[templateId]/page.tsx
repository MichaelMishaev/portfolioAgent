"use client";

import { useParams, useSearchParams } from "next/navigation";
import { getTemplateById } from "@/lib/template-registry";
import { ThankYouView } from "@/components/thank-you/thank-you-view";
import { notFound } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";

export default function ThankYouPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { language } = useI18n();
  const templateId = params.templateId as string;
  const contentMaker = searchParams.get("contentMaker") === "true";

  const template = getTemplateById(templateId, language);

  if (!template) {
    notFound();
  }

  return <ThankYouView template={template} contentMaker={contentMaker} />;
}
