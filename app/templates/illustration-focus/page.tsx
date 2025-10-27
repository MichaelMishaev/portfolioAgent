import { IllustrationFocusTemplate } from "@/components/templates/illustration-focus/illustration-focus-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Illustration Focus - Portfolio Template",
  description: "A playful template with custom illustrations and bright colors.",
};

export default function IllustrationFocusPage() {
  return (
    <TemplateLayout>
      <IllustrationFocusTemplate />
    </TemplateLayout>
  );}
