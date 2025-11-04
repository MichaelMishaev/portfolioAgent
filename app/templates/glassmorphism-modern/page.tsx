import { GlassmorphismModernTemplate } from "@/components/templates/glassmorphism-modern/glassmorphism-modern-template";
import { TemplateLayout } from "@/components/shared/template-layout";
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Glassmorphism Modern - Portfolio Template",
  description: "Modern dark theme with glass card effects and stunning visual design.",
};

export default function GlassmorphismModernPage() {
  return (
    <TemplateLayout>
      <GlassmorphismModernTemplate />
    </TemplateLayout>
  );
}
