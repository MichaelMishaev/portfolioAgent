import { FashionProductTemplate } from "@/components/templates/product-pages/fashion-product-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Fashion Product Landing Page | Portfolio Templates",
  description: "Sustainable fashion product showcase with lifestyle photography and customer reviews",
};

export default function FashionProductPage() {
  return (
    <TemplateLayout>
      <FashionProductTemplate />
    </TemplateLayout>
  );}
