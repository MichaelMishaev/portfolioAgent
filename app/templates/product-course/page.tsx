import { CourseProductTemplate } from "@/components/templates/product-pages/course-product-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Course/Educational Landing Page | Portfolio Templates",
  description: "Educational course landing page template with curriculum, testimonials, and pricing",
};

export default function CourseProductPage() {
  return (
    <TemplateLayout>
      <CourseProductTemplate />
    </TemplateLayout>
  );}
