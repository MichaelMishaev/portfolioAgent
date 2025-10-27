import { EnterpriseServiceTemplate } from "@/components/templates/product-pages/enterprise-service-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Enterprise Cloud Platform | Portfolio Templates",
  description: "Enterprise-grade cloud solutions with security, compliance, and global scale for Fortune 500 companies",
};

export default function EnterpriseServicePage() {
  return (
    <TemplateLayout>
      <EnterpriseServiceTemplate />
    </TemplateLayout>
  );
}
