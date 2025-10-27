import { AudioProductTemplate } from "@/components/templates/product-pages/audio-product-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Premium Audio Product Landing Page | Portfolio Templates",
  description: "Premium wireless headphones product page with interactive 3D viewer, technical specifications, and comparison table",
};

export default function AudioProductPage() {
  return (
    <TemplateLayout>
      <AudioProductTemplate />
    </TemplateLayout>
  );
}
