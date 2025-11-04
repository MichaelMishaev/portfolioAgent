import { SaasFeatureRichTemplate } from "@/components/templates/saas-feature-rich/saas-feature-rich-template";
import { TemplateLayout } from "@/components/shared/template-layout";
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "SaaS Feature Rich - Portfolio Template",
  description: "Complete SaaS landing page with email capture, pricing tables, and feature showcase.",
};

export default function SaasFeatureRichPage() {
  return (
    <TemplateLayout>
      <SaasFeatureRichTemplate />
    </TemplateLayout>
  );
}
