import { Experimental3dTemplate } from "@/components/templates/experimental-3d/experimental-3d-template";
import { TemplateLayout } from "@/components/shared/template-layout";
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Experimental 3D - Portfolio Template",
  description: "Immersive 3D template with stunning animations and experimental design.",
};

export default function Experimental3dPage() {
  return (
    <TemplateLayout>
      <Experimental3dTemplate />
    </TemplateLayout>
  );
}
