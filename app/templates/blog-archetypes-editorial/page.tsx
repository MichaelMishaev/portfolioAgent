import { TemplateLayout } from "@/components/shared/template-layout";
import { ArchetypesEditorialTemplate } from "@/components/templates/blog-pages/archetypes-editorial-template";

export const metadata = {
  title: "Archetypes Journal - Editorial | Portfolio Templates",
  description: "Bold editorial magazine-style conversion page with 5-stage funnel, dramatic typography, and black/white/blue design",
};

export default function ArchetypesEditorialPage() {
  return (
    <TemplateLayout>
      <ArchetypesEditorialTemplate />
    </TemplateLayout>
  );
}
