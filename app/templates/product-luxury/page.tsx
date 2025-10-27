import { LuxuryProductTemplate } from "@/components/templates/product-pages/luxury-product-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Luxury Product Landing Page | Portfolio Templates",
  description: "Premium luxury product showcase with heritage storytelling and craftsmanship details",
};

export default function LuxuryProductPage() {
  return (
    <TemplateLayout>
      <LuxuryProductTemplate />
    </TemplateLayout>
  );}
