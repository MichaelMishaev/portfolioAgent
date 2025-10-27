import { B2BServiceTemplate } from "@/components/templates/product-pages/b2b-service-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "B2B Service Landing Page | Portfolio Templates",
  description: "Professional B2B consulting service showcase with case studies and ROI metrics",
};

export default function B2BServicePage() {
  return (
    <TemplateLayout>
      <B2BServiceTemplate />
    </TemplateLayout>
  );
}
