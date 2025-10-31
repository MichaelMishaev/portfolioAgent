import { EnhancedStylePreview } from "@/components/style-preview/enhanced-style-preview";
import { getTemplateById } from "@/lib/template-registry";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = await params;
  const template = getTemplateById(templateId);

  if (!template) {
    return {
      title: "Template Not Found",
    };
  }

  return {
    title: `${template.name} - Interactive Style Preview`,
    description: `Explore and customize ${template.name} template with interactive color picker, font switcher, and live preview`,
  };
}

export default async function StylePreviewPage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = await params;
  const template = getTemplateById(templateId);

  if (!template) {
    notFound();
  }

  return <EnhancedStylePreview template={template} />;
}
