import { BoldTypographyTemplate } from "@/components/templates/bold-typography/bold-typography-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Bold Typography Hero - Portfolio Template",
  description: "A bold typography-focused template where type is the design itself.",
};

export default function BoldTypographyPage() {
  return (
    <TemplateLayout>
      <BoldTypographyTemplate />
    </TemplateLayout>
  );}
