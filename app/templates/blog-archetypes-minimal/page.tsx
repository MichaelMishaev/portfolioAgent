import { ArchetypesMinimalTemplate } from "@/components/templates/blog-pages/archetypes-minimal-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Archetypes Explorer - Minimalist | Portfolio Templates",
  description: "Modern minimalist conversion-focused page with 5-stage funnel, glassmorphism design, and teal/purple gradients",
};

export default function ArchetypesMinimalPage() {
  return (
    <TemplateLayout>
      <ArchetypesMinimalTemplate />
    </TemplateLayout>
  );
}
