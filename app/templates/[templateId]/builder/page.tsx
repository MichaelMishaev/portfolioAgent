"use client";

import { getTemplateById } from "@/lib/template-registry";
import { CraftJSTemplateBuilder } from "@/components/builder/craftjs-template-builder";
import { notFound, useParams } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";

export default function TemplateBuilderPage() {
  const params = useParams();
  const { language } = useI18n();
  const templateId = params.templateId as string;

  const template = getTemplateById(templateId, language);

  if (!template) {
    notFound();
  }

  return <CraftJSTemplateBuilder template={template} />;
}
