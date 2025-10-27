import { ConsultingServiceTemplate } from "@/components/templates/product-pages/consulting-service-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Strategic Consulting Services | Portfolio Templates",
  description: "Elite management consulting for CEOs and boards with corporate strategy, digital transformation, and performance improvement",
};

export default function ConsultingServicePage() {
  return (
    <TemplateLayout>
      <ConsultingServiceTemplate />
    </TemplateLayout>
  );
}
