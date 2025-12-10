import { ThreeDImmersiveTemplate } from "@/components/templates/3d-immersive/3d-immersive-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "3D Immersive WebGL - Portfolio Template",
  description: "Interactive 3D scene with Three.js, particle systems, and scroll-linked animations.",
};

export default function ThreeDImmersivePage() {
  return (
    <TemplateLayout>
      <ThreeDImmersiveTemplate />
    </TemplateLayout>
  );}
