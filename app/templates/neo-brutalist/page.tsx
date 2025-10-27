import { NeoBrutalistTemplate } from "@/components/templates/neo-brutalist/neo-brutalist-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Neo-Brutalist Chaos - Portfolio Template",
  description: "Raw, confrontational design with harsh layouts and intentional roughness.",
};

export default function NeoBrutalistPage() {
  return (
    <TemplateLayout>
      <NeoBrutalistTemplate />
    </TemplateLayout>
  );}
