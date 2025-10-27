import { FullscreenImmersiveTemplate } from "@/components/templates/fullscreen-immersive/fullscreen-immersive-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Full-Screen Immersive - Portfolio Template",
  description: "An immersive full-screen portfolio template with stunning visuals and parallax effects.",
};

export default function FullscreenImmersivePage() {
  return (
    <TemplateLayout>
      <FullscreenImmersiveTemplate />
    </TemplateLayout>
  );}
