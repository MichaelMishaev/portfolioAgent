import { TextHeavyTemplate } from "@/components/templates/text-heavy/text-heavy-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Text-Heavy SEO - Portfolio Template",
  description: "A typography-focused template optimized for SEO and content-heavy portfolios.",
};

export default function TextHeavyPage() {
  return (
    <TemplateLayout>
      <TextHeavyTemplate />
    </TemplateLayout>
  );}
