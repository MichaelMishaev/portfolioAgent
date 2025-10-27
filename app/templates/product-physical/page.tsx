import { PhysicalProductTemplate } from "@/components/templates/product-pages/physical-product-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Physical Product Landing Page | Portfolio Templates",
  description: "Minimalist physical product showcase template with specifications and reviews",
};

export default function PhysicalProductPage() {
  return (
    <TemplateLayout>
      <PhysicalProductTemplate />
    </TemplateLayout>
  );}
