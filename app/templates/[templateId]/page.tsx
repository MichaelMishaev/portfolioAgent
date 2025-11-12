"use client";

import { getTemplateById } from "@/lib/template-registry";
import { TemplateDetailView } from "@/components/template-detail/template-detail-view";
import { notFound, useParams } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";
import { TemplateErrorBoundary } from "@/components/template-error-boundary";

export default function TemplateDetailPage() {
  const params = useParams();
  const { language } = useI18n();
  const templateId = params.templateId as string;

  const template = getTemplateById(templateId, language);

  if (!template) {
    notFound();
  }

  return (
    <TemplateErrorBoundary
      templateId={template.id}
      templateName={template.name}
      templateCategory={template.category}
    >
      <TemplateDetailView template={template} />
    </TemplateErrorBoundary>
  );
}
