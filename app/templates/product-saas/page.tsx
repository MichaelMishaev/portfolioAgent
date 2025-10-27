import { SaaSProductTemplate } from "@/components/templates/product-pages/saas-product-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "SaaS Product Landing Page | Portfolio Templates",
  description: "Modern SaaS product landing page template with features, pricing, and testimonials",
};

export default function SaaSProductPage() {
  return (
    <TemplateLayout>
      <SaaSProductTemplate />
    </TemplateLayout>
  );}
