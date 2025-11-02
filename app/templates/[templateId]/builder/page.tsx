"use client";

import { useEffect, useState } from "react";
import { getTemplateById, type TemplateConfig } from "@/lib/template-registry";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const CraftJSTemplateBuilder = dynamic(
  () => import("@/components/builder/craftjs-template-builder").then(mod => ({ default: mod.CraftJSTemplateBuilder })),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-screen">Loading Builder...</div> }
);

export default function BuilderPage() {
  const params = useParams();
  const [template, setTemplate] = useState<TemplateConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const templateId = params.templateId as string;
    const templateData = getTemplateById(templateId);
    setTemplate(templateData || null);
    setLoading(false);
  }, [params]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!template) {
    return <div className="flex items-center justify-center h-screen">Template Not Found</div>;
  }

  return <CraftJSTemplateBuilder template={template} />;
}
