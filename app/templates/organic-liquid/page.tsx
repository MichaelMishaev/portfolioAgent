import { OrganicLiquidTemplate } from "@/components/templates/organic-liquid/organic-liquid-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Organic Liquid Morphing - Portfolio Template",
  description: "Fluid, nature-inspired design with soft organic shapes and smooth color transitions.",
};

export default function OrganicLiquidPage() {
  return (
    <TemplateLayout>
      <OrganicLiquidTemplate />
    </TemplateLayout>
  );}
