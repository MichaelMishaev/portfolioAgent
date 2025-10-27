import { AgencyServiceTemplate } from "@/components/templates/product-pages/agency-service-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Creative Agency Landing Page | Portfolio Templates",
  description: "Award-winning digital agency showcase with portfolio, team, and process workflow",
};

export default function AgencyServicePage() {
  return (
    <TemplateLayout>
      <AgencyServiceTemplate />
    </TemplateLayout>
  );
}
