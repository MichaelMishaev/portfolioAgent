import { TechBlogTemplate } from "@/components/templates/blog-pages/tech-blog-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Interactive Tech Blog | Portfolio Templates",
  description: "Advanced tech blog with dark mode, code snippets, learning series, and interactive features for developers",
};

export default function TechBlogPage() {
  return (
    <TemplateLayout>
      <TechBlogTemplate />
    </TemplateLayout>
  );
}
