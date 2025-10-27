import { CardModularTemplate } from "@/components/templates/card-modular/card-modular-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Card-Based Modular - Portfolio Template",
  description: "A flexible card-based template with modular sections and modern design.",
};

export default function CardModularPage() {
  return (
    <TemplateLayout>
      <CardModularTemplate />
    </TemplateLayout>
  );}
