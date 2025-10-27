import { PersonalBlogTemplate } from "@/components/templates/blog-pages/personal-blog-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Clean Personal Blog | Portfolio Templates",
  description: "Minimalist personal blog with clean layout, featured posts, and newsletter integration",
};

export default function PersonalBlogPage() {
  return (
    <TemplateLayout>
      <PersonalBlogTemplate />
    </TemplateLayout>
  );
}
