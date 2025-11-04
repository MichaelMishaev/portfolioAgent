"use client";

import { getTemplateById } from "@/lib/template-registry";
import { TemplateLayout } from "@/components/shared/template-layout";
import { notFound, useParams } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";
import dynamic from "next/dynamic";

// Map template IDs to their component imports
const templateComponents: Record<string, any> = {
  "3d-immersive": dynamic(() => import("@/components/templates/3d-immersive/3d-immersive-template").then(mod => mod.ThreeDImmersiveTemplate)),
  "ar-spatial": dynamic(() => import("@/components/templates/ar-spatial/ar-spatial-template").then(mod => mod.ArSpatialTemplate)),
  "bento-grid": dynamic(() => import("@/components/templates/bento-grid/bento-grid-template").then(mod => mod.BentoGridTemplate)),
  "blog-archetypes-editorial": dynamic(() => import("@/components/templates/blog-pages/archetypes-editorial-template").then(mod => mod.ArchetypesEditorialTemplate)),
  "blog-archetypes-minimal": dynamic(() => import("@/components/templates/blog-pages/archetypes-minimal-template").then(mod => mod.ArchetypesMinimalTemplate)),
  "blog-magazine": dynamic(() => import("@/components/templates/blog-pages/magazine-blog-template").then(mod => mod.MagazineBlogTemplate)),
  "blog-personal": dynamic(() => import("@/components/templates/blog-pages/personal-blog-template").then(mod => mod.PersonalBlogTemplate)),
  "blog-tech": dynamic(() => import("@/components/templates/blog-pages/tech-blog-template").then(mod => mod.TechBlogTemplate)),
  "bold-typography": dynamic(() => import("@/components/templates/bold-typography/bold-typography-template").then(mod => mod.BoldTypographyTemplate)),
  "card-modular": dynamic(() => import("@/components/templates/card-modular/card-modular-template").then(mod => mod.CardModularTemplate)),
  "collage-maximalist": dynamic(() => import("@/components/templates/collage-maximalist/collage-maximalist-template").then(mod => mod.CollageMaximalistTemplate)),
  "creative-agency-bold": dynamic(() => import("@/components/templates/creative-agency-bold/creative-agency-bold-template").then(mod => mod.CreativeAgencyBoldTemplate)),
  "dark-mode": dynamic(() => import("@/components/templates/dark-mode/dark-mode-template").then(mod => mod.DarkModeTemplate)),
  "data-dashboard": dynamic(() => import("@/components/templates/data-dashboard/data-dashboard-template").then(mod => mod.DataDashboardTemplate)),
  "experimental-3d": dynamic(() => import("@/components/templates/experimental-3d/experimental-3d-template").then(mod => mod.Experimental3dTemplate)),
  "fullscreen-immersive": dynamic(() => import("@/components/templates/fullscreen-immersive/fullscreen-immersive-template").then(mod => mod.FullscreenImmersiveTemplate)),
  "glassmorphism-modern": dynamic(() => import("@/components/templates/glassmorphism-modern/glassmorphism-modern-template").then(mod => mod.GlassmorphismModernTemplate)),
  "grid-masonry": dynamic(() => import("@/components/templates/grid-masonry/grid-masonry-template").then(mod => mod.GridMasonryTemplate)),
  "illustration-focus": dynamic(() => import("@/components/templates/illustration-focus/illustration-focus-template").then(mod => mod.IllustrationFocusTemplate)),
  "interactive-agency": dynamic(() => import("@/components/templates/interactive-agency/interactive-agency-template").then(mod => mod.InteractiveAgencyTemplate)),
  "kinetic-typography": dynamic(() => import("@/components/templates/kinetic-typography/kinetic-typography-template").then(mod => mod.KineticTypographyTemplate)),
  "lin-portfolio-elegance": dynamic(() => import("@/components/templates/lin/lin-portfolio-elegance-template").then(mod => mod.LinPortfolioEleganceTemplate)),
  "lin-professional-authority": dynamic(() => import("@/components/templates/lin/lin-professional-authority-template").then(mod => mod.LinProfessionalAuthorityTemplate)),
  "lin-tech-pioneer": dynamic(() => import("@/components/templates/lin/lin-tech-pioneer-template").then(mod => mod.LinTechPioneerTemplate)),
  "luxury-minimal": dynamic(() => import("@/components/templates/luxury-minimal/luxury-minimal-template").then(mod => mod.LuxuryMinimalTemplate)),
  "minimal-portfolio-clean": dynamic(() => import("@/components/templates/minimal-portfolio-clean/minimal-portfolio-clean-template").then(mod => mod.MinimalPortfolioCleanTemplate)),
  "minimalist": dynamic(() => import("@/components/templates/minimalist/minimalist-template").then(mod => mod.MinimalistTemplate)),
  "motion-designer": dynamic(() => import("@/components/templates/motion-designer/motion-designer-template").then(mod => mod.MotionDesignerTemplate)),
  "neo-brutalist": dynamic(() => import("@/components/templates/neo-brutalist/neo-brutalist-template").then(mod => mod.NeoBrutalistTemplate)),
  "online-business-agency": dynamic(() => import("@/components/templates/online-business/online-business-agency-template").then(mod => mod.OnlineBusinessAgencyTemplate)),
  "online-business-coach": dynamic(() => import("@/components/templates/online-business/online-business-coach-template").then(mod => mod.OnlineBusinessCoachTemplate)),
  "online-business-course": dynamic(() => import("@/components/templates/online-business/online-business-course-template").then(mod => mod.OnlineBusinessCourseTemplate)),
  "online-business-saas": dynamic(() => import("@/components/templates/online-business-saas/online-business-saas-template").then(mod => mod.OnlineBusinessSaasTemplate)),
  "organic-liquid": dynamic(() => import("@/components/templates/organic-liquid/organic-liquid-template").then(mod => mod.OrganicLiquidTemplate)),
  "personal-brand": dynamic(() => import("@/components/templates/personal-brand/personal-brand-template").then(mod => mod.PersonalBrandTemplate)),
  "photography-immersive": dynamic(() => import("@/components/templates/photography-immersive/photography-immersive-template").then(mod => mod.PhotographyImmersiveTemplate)),
  "product-audio": dynamic(() => import("@/components/templates/product-pages/audio-product-template").then(mod => mod.AudioProductTemplate)),
  "product-course": dynamic(() => import("@/components/templates/product-pages/course-product-template").then(mod => mod.CourseProductTemplate)),
  "product-fashion": dynamic(() => import("@/components/templates/product-pages/fashion-product-template").then(mod => mod.FashionProductTemplate)),
  "product-luxury": dynamic(() => import("@/components/templates/product-pages/luxury-product-template").then(mod => mod.LuxuryProductTemplate)),
  "product-physical": dynamic(() => import("@/components/templates/product-pages/physical-product-template").then(mod => mod.PhysicalProductTemplate)),
  "product-premium": dynamic(() => import("@/components/templates/product-pages/premium-product-template").then(mod => mod.PremiumProductTemplate)),
  "product-saas": dynamic(() => import("@/components/templates/product-pages/saas-product-template").then(mod => mod.SaasProductTemplate)),
  "product-tech": dynamic(() => import("@/components/templates/product-pages/tech-product-template").then(mod => mod.TechProductTemplate)),
  "product-vacuum": dynamic(() => import("@/components/templates/product-pages/vacuum-product-template").then(mod => mod.VacuumProductTemplate)),
  "professional-b2b": dynamic(() => import("@/components/templates/professional-b2b/professional-b2b-template").then(mod => mod.ProfessionalB2bTemplate)),
  "saas-feature-rich": dynamic(() => import("@/components/templates/saas-feature-rich/saas-feature-rich-template").then(mod => mod.SaasFeatureRichTemplate)),
  "service-agency": dynamic(() => import("@/components/templates/product-pages/agency-service-template").then(mod => mod.AgencyServiceTemplate)),
  "service-b2b": dynamic(() => import("@/components/templates/product-pages/b2b-service-template").then(mod => mod.B2bServiceTemplate)),
  "service-community": dynamic(() => import("@/components/templates/product-pages/community-service-template").then(mod => mod.CommunityServiceTemplate)),
  "service-consulting": dynamic(() => import("@/components/templates/product-pages/consulting-service-template").then(mod => mod.ConsultingServiceTemplate)),
  "service-dfyou": dynamic(() => import("@/components/templates/product-pages/dfyou-service-template").then(mod => mod.DfyouServiceTemplate)),
  "service-enterprise": dynamic(() => import("@/components/templates/product-pages/enterprise-service-template").then(mod => mod.EnterpriseServiceTemplate)),
  "service-marketplace": dynamic(() => import("@/components/templates/service-marketplace/service-marketplace-template").then(mod => mod.ServiceMarketplaceTemplate)),
  "single-page": dynamic(() => import("@/components/templates/single-page/single-page-template").then(mod => mod.SinglePageTemplate)),
  "split-screen": dynamic(() => import("@/components/templates/split-screen/split-screen-template").then(mod => mod.SplitScreenTemplate)),
  "split-screen-editorial": dynamic(() => import("@/components/templates/split-screen-editorial/split-screen-editorial-template").then(mod => mod.SplitScreenEditorialTemplate)),
  "startup-pitch": dynamic(() => import("@/components/templates/startup-pitch/startup-pitch-template").then(mod => mod.StartupPitchTemplate)),
  "text-heavy": dynamic(() => import("@/components/templates/text-heavy/text-heavy-template").then(mod => mod.TextHeavyTemplate)),
  "voice-first": dynamic(() => import("@/components/templates/voice-first/voice-first-template").then(mod => mod.VoiceFirstTemplate)),
  "y2k-retro": dynamic(() => import("@/components/templates/y2k-retro/y2k-retro-template").then(mod => mod.Y2kRetroTemplate)),
};

export default function TemplateDemoPage() {
  const params = useParams();
  const { language } = useI18n();
  const templateId = params.templateId as string;

  const template = getTemplateById(templateId, language);
  const TemplateComponent = templateComponents[templateId];

  if (!template || !TemplateComponent) {
    notFound();
  }

  return (
    <TemplateLayout>
      <TemplateComponent />
    </TemplateLayout>
  );
}
