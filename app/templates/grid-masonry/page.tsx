import { GridMasonryTemplate } from "@/components/templates/grid-masonry/grid-masonry-template";
import { TemplateLayout } from "@/components/shared/template-layout";

export const metadata = {
  title: "Grid & Masonry - Portfolio Template",
  description: "A stunning grid and masonry layout portfolio perfect for showcasing visual work.",
};

export default function GridMasonryPage() {
  return (
    <TemplateLayout>
      <GridMasonryTemplate />
    </TemplateLayout>
  );
}
