import { MinimalistTemplate } from "@/components/templates/minimalist/minimalist-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Minimalist & Clean - Portfolio Template",
  description: "A clean and minimalist portfolio template with focus on simplicity and clarity.",
};

export default function MinimalistPage() {
  return (
    <TemplateLayout>
      <MinimalistTemplate />
    </TemplateLayout>
  );
}
