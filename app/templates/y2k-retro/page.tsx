import { Y2KRetroTemplate } from "@/components/templates/y2k-retro/y2k-retro-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Y2K Retro Nostalgia - Portfolio Template",
  description: "Early 2000s aesthetic with chunky typography, bright colors, and playful elements.",
};

export default function Y2KRetroPage() {
  return (
    <TemplateLayout>
      <Y2KRetroTemplate />
    </TemplateLayout>
  );}
