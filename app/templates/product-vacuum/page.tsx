import { VacuumProductTemplate } from "@/components/templates/product-pages/vacuum-product-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Smart Vacuum Product Landing Page | Portfolio Templates",
  description: "Premium cordless vacuum cleaner product page with performance metrics, cleaning modes, and technical specifications",
};

export default function VacuumProductPage() {
  return (
    <TemplateLayout>
      <VacuumProductTemplate />
    </TemplateLayout>
  );
}
