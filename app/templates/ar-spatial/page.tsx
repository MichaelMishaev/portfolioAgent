import { ARSpatialTemplate } from "@/components/templates/ar-spatial/ar-spatial-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "AR/Spatial Computing - Portfolio Template",
  description: "Futuristic spatial computing interface with layered UI and gesture-inspired interactions.",
};

export default function ARSpatialPage() {
  return (
    <TemplateLayout>
      <ARSpatialTemplate />
    </TemplateLayout>
  );}
