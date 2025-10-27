import { BentoGridTemplate } from "@/components/templates/bento-grid/bento-grid-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Bento Grid Modular - Portfolio Template",
  description: "Asymmetric grid layout inspired by Japanese bento boxes with modular content blocks.",
};

export default function BentoGridPage() {
  return (
    <TemplateLayout>
      <BentoGridTemplate />
    </TemplateLayout>
  );
}
