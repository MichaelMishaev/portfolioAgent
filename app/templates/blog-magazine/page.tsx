import { MagazineBlogTemplate } from "@/components/templates/blog-pages/magazine-blog-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Magazine Editorial Blog | Portfolio Templates",
  description: "Professional magazine-style blog with advanced grid layouts, trending articles, and editorial team showcase",
};

export default function MagazineBlogPage() {
  return (
    <TemplateLayout>
      <MagazineBlogTemplate />
    </TemplateLayout>
  );
}
