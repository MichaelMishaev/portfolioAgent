import { TechProductTemplate } from "@/components/templates/product-pages/tech-product-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Tech/Gaming Product Page | Portfolio Templates",
  description: "Dark tech/gaming product showcase with video hero, specs, and comparison table",
};

export default function TechProductPage() {
  return (
    <TemplateLayout>
      <TechProductTemplate />
    </TemplateLayout>
  );}
