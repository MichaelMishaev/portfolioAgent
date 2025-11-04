import { ProfessionalB2bTemplate } from "@/components/templates/professional-b2b/professional-b2b-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Professional B2B - Portfolio Template",
  description: "Clean corporate style template for B2B lead generation and professional services.",
};

export default function ProfessionalB2bPage() {
  return (
    <TemplateLayout>
      <ProfessionalB2bTemplate />
    </TemplateLayout>
  );
}
