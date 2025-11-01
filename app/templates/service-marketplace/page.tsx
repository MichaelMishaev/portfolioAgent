import { ServiceMarketplaceTemplate } from "@/components/templates/service-marketplace/service-marketplace-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Service Marketplace Platform | Portfolio Templates",
  description: "Professional marketplace platform for buying and selling business services with escrow protection and verified professionals",
};

export default function ServiceMarketplacePage() {
  return (
    <TemplateLayout>
      <ServiceMarketplaceTemplate />
    </TemplateLayout>
  );
}
