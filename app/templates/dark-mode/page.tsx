import { DarkModeTemplate } from "@/components/templates/dark-mode/dark-mode-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Dark Mode Cinematic - Portfolio Template",
  description: "A cinematic dark mode portfolio template with elegant design and smooth animations.",
};

export default function DarkModePage() {
  return (
    <TemplateLayout>
      <DarkModeTemplate />
    </TemplateLayout>
  );
}
