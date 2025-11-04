import { MinimalPortfolioCleanTemplate } from "@/components/templates/minimal-portfolio-clean/minimal-portfolio-clean-template";
import { TemplateLayout } from "@/components/shared/template-layout";
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Minimal Portfolio Clean - Portfolio Template",
  description: "Text-first minimalism template for designers and developers who value clarity.",
};

export default function MinimalPortfolioCleanPage() {
  return (
    <TemplateLayout>
      <MinimalPortfolioCleanTemplate />
    </TemplateLayout>
  );
}
