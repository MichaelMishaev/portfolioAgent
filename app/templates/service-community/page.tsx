import { CommunityServiceTemplate } from "@/components/templates/product-pages/community-service-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Community Platform Landing Page | Portfolio Templates",
  description: "Membership platform showcase with dual value propositions and transparent pricing",
};

export default function CommunityServicePage() {
  return (
    <TemplateLayout>
      <CommunityServiceTemplate />
    </TemplateLayout>
  );
}
