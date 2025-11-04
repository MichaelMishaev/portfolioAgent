"use client";

import { getTemplateById } from "@/lib/template-registry";
import { CheckoutView } from "@/components/checkout/checkout-view";
import { notFound, useParams } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";

export default function CheckoutPage() {
  const params = useParams();
  const { language } = useI18n();
  const templateId = params.templateId as string;
  const template = getTemplateById(templateId, language);

  if (!template) {
    notFound();
  }

  return <CheckoutView template={template} />;
}
