import { PremiumProductTemplate } from "@/components/templates/product-pages/premium-product-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Premium/High-Ticket Product Landing Page | Portfolio Templates",
  description: "Luxury premium product landing page template for high-ticket offers",
};

export default function PremiumProductPage() {
  return (
    <TemplateLayout>
      <PremiumProductTemplate />
    </TemplateLayout>
  );
}
