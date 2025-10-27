import { SinglePageTemplate } from "@/components/templates/single-page/single-page-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Single-Page Scroll - Portfolio Template",
  description: "A simple single-page portfolio with smooth scrolling navigation.",
};

export default function SinglePagePage() {
  return (
    <TemplateLayout>
      <SinglePageTemplate />
    </TemplateLayout>
  );}
