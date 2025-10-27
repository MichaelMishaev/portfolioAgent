import { DFYouServiceTemplate } from "@/components/templates/product-pages/dfyou-service-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Done-For-You Service Landing Page | Portfolio Templates",
  description: "Unlimited productized service showcase with portfolio filtering and FAQ section",
};

export default function DFYouServicePage() {
  return (
    <TemplateLayout>
      <DFYouServiceTemplate />
    </TemplateLayout>
  );
}
