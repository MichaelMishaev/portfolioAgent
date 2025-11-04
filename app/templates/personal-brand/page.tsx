import { PersonalBrandTemplate } from "@/components/templates/personal-brand/personal-brand-template";
import { TemplateLayout } from "@/components/shared/template-layout";
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Personal Brand - Portfolio Template",
  description: "Conversational template with social network feel for personal branding.",
};

export default function PersonalBrandPage() {
  return (
    <TemplateLayout>
      <PersonalBrandTemplate />
    </TemplateLayout>
  );
}
