import { SplitScreenEditorialTemplate } from "@/components/templates/split-screen-editorial/split-screen-editorial-template";
import { TemplateLayout } from "@/components/shared/template-layout";
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Split Screen Editorial - Portfolio Template",
  description: "Fixed sidebar with fullscreen projects for editorial and design portfolios.",
};

export default function SplitScreenEditorialPage() {
  return (
    <TemplateLayout>
      <SplitScreenEditorialTemplate />
    </TemplateLayout>
  );
}
