import { CreativeAgencyBoldTemplate } from "@/components/templates/creative-agency-bold/creative-agency-bold-template";
import { TemplateLayout } from "@/components/shared/template-layout";
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Creative Agency Bold - Portfolio Template",
  description: "Electric blue bold typography template for creative agencies and bold brands.",
};

export default function CreativeAgencyBoldPage() {
  return (
    <TemplateLayout>
      <CreativeAgencyBoldTemplate />
    </TemplateLayout>
  );
}
