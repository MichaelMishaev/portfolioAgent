import translations from "./translations.json";

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  features: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  thumbnail: string;
  demoPath: string;
  tags: string[];
  bestFor: string[];
}

const staticTemplateData = {
  minimalist: {
    colors: { primary: "#000000", secondary: "#FFFFFF", accent: "#3B82F6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "dark-mode": {
    colors: { primary: "#0A0A0A", secondary: "#1A1A1A", accent: "#00D9FF" },
    fonts: { heading: "Poppins", body: "Montserrat" },
  },
  "bold-typography": {
    colors: { primary: "#000000", secondary: "#FFFFFF", accent: "#FF006E" },
    fonts: { heading: "Bebas Neue", body: "Inter" },
  },
  "grid-masonry": {
    colors: { primary: "#F5F5F5", secondary: "#FFFFFF", accent: "#8B5CF6" },
    fonts: { heading: "Poppins", body: "Inter" },
  },
  "fullscreen-immersive": {
    colors: { primary: "#000000", secondary: "#FFFFFF", accent: "#F59E0B" },
    fonts: { heading: "Space Grotesk", body: "Inter" },
  },
  "split-screen": {
    colors: { primary: "#1E293B", secondary: "#F8FAFC", accent: "#06B6D4" },
    fonts: { heading: "Manrope", body: "Inter" },
  },
  "illustration-focus": {
    colors: { primary: "#FF6B9D", secondary: "#C0FFEE", accent: "#FFA500" },
    fonts: { heading: "Poppins", body: "Inter" },
  },
  "single-page": {
    colors: { primary: "#1F2937", secondary: "#F3F4F6", accent: "#3B82F6" },
    fonts: { heading: "Poppins", body: "Inter" },
  },
  "text-heavy": {
    colors: { primary: "#111827", secondary: "#F9FAFB", accent: "#EF4444" },
    fonts: { heading: "Playfair Display", body: "Lora" },
  },
  "card-modular": {
    colors: { primary: "#1F2937", secondary: "#F3F4F6", accent: "#10B981" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "kinetic-typography": {
    colors: { primary: "#000000", secondary: "#FFFFFF", accent: "#FF0080" },
    fonts: { heading: "Space Grotesk", body: "Inter" },
  },
  "bento-grid": {
    colors: { primary: "#1F2937", secondary: "#F3F4F6", accent: "#6366F1" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "3d-immersive": {
    colors: { primary: "#000000", secondary: "#1A1A2E", accent: "#06B6D4" },
    fonts: { heading: "Space Grotesk", body: "Inter" },
  },
  "neo-brutalist": {
    colors: { primary: "#FFFFFF", secondary: "#000000", accent: "#FFFF00" },
    fonts: { heading: "Space Grotesk", body: "Inter" },
  },
  "organic-liquid": {
    colors: { primary: "#FBBF24", secondary: "#F472B6", accent: "#14B8A6" },
    fonts: { heading: "Poppins", body: "Inter" },
  },
  "data-dashboard": {
    colors: { primary: "#0F172A", secondary: "#1E293B", accent: "#3B82F6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "y2k-retro": {
    colors: { primary: "#EC4899", secondary: "#A855F7", accent: "#22D3EE" },
    fonts: { heading: "Comic Sans MS", body: "Inter" },
  },
  "ar-spatial": {
    colors: { primary: "#020617", secondary: "#1E3A8A", accent: "#06B6D4" },
    fonts: { heading: "Space Grotesk", body: "Inter" },
  },
  "collage-maximalist": {
    colors: { primary: "#F5F3EF", secondary: "#000000", accent: "#FF6B6B" },
    fonts: { heading: "Space Grotesk", body: "Inter" },
  },
  "voice-first": {
    colors: { primary: "#030712", secondary: "#1E3A8A", accent: "#3B82F6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "product-saas": {
    colors: { primary: "#2B6CFF", secondary: "#6B4CE6", accent: "#8B5CF6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "product-course": {
    colors: { primary: "#2563EB", secondary: "#F59E0B", accent: "#FCD34D" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "product-tech": {
    colors: { primary: "#000000", secondary: "#FFDD00", accent: "#FF8800" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "product-physical": {
    colors: { primary: "#000000", secondary: "#FFFFFF", accent: "#3B82F6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "product-premium": {
    colors: { primary: "#000000", secondary: "#D4AF37", accent: "#F59E0B" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "product-fashion": {
    colors: { primary: "#FAFAF9", secondary: "#F5F5F4", accent: "#D4A574" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "product-luxury": {
    colors: { primary: "#0A0A0A", secondary: "#D4AF37", accent: "#000000" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "product-audio": {
    colors: { primary: "#3B82F6", secondary: "#8B5CF6", accent: "#06B6D4" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "product-vacuum": {
    colors: { primary: "#2563EB", secondary: "#1E3A8A", accent: "#60A5FA" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "service-b2b": {
    colors: { primary: "#0A1F44", secondary: "#232326", accent: "#C8102E" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "service-community": {
    colors: { primary: "#00D0AD", secondary: "#FA4D50", accent: "#9B51E0" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "service-dfyou": {
    colors: { primary: "#0099F6", secondary: "#FF3366", accent: "#FFFFFF" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "service-agency": {
    colors: { primary: "#2563EB", secondary: "#1E40AF", accent: "#3B82F6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "service-enterprise": {
    colors: { primary: "#0F172A", secondary: "#2563EB", accent: "#3B82F6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "service-consulting": {
    colors: { primary: "#059669", secondary: "#047857", accent: "#10B981" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "blog-personal": {
    colors: { primary: "#3B82F6", secondary: "#8B5CF6", accent: "#EC4899" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "blog-magazine": {
    colors: { primary: "#111827", secondary: "#3B82F6", accent: "#8B5CF6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "blog-tech": {
    colors: { primary: "#0F172A", secondary: "#3B82F6", accent: "#8B5CF6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "online-business-coach": {
    colors: { primary: "#D97706", secondary: "#3B82F6", accent: "#EC4899" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "online-business-course": {
    colors: { primary: "#9333EA", secondary: "#EC4899", accent: "#8B5CF6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "online-business-agency": {
    colors: { primary: "#0F172A", secondary: "#3B82F6", accent: "#06B6D4" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "online-business-saas": {
    colors: { primary: "#6366F1", secondary: "#8B5CF6", accent: "#3B82F6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "blog-archetypes-minimal": {
    colors: { primary: "#14B8A6", secondary: "#A855F7", accent: "#EC4899" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "blog-archetypes-editorial": {
    colors: { primary: "#0F172A", secondary: "#FFFFFF", accent: "#3B82F6" },
    fonts: { heading: "Playfair Display", body: "Inter" },
  },
  "lin-portfolio-elegance": {
    colors: { primary: "#C9A87C", secondary: "#FFFFFF", accent: "#2C2C2C" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "lin-professional-authority": {
    colors: { primary: "#1A1A2E", secondary: "#D4AF37", accent: "#F5F5F5" },
    fonts: { heading: "Playfair Display", body: "Montserrat" },
  },
  "lin-tech-pioneer": {
    colors: { primary: "#3B82F6", secondary: "#1E293B", accent: "#06B6D4" },
    fonts: { heading: "Inter", body: "Inter" },
  },
};

export function getTemplates(language: "en" | "ru" = "en"): TemplateConfig[] {
  const t = translations[language];

  return t.templates.map((template) => ({
    ...template,
    difficulty: template.difficulty as "beginner" | "intermediate" | "advanced",
    colors: staticTemplateData[template.id as keyof typeof staticTemplateData].colors,
    fonts: staticTemplateData[template.id as keyof typeof staticTemplateData].fonts,
    thumbnail: `/previews/${template.id}.png`,
    demoPath: `/templates/${template.id}`,
  }));
}

export const templates = getTemplates("en");

export function getTemplateById(id: string, language: "en" | "ru" = "en"): TemplateConfig | undefined {
  const templates = getTemplates(language);
  return templates.find((template) => template.id === id);
}

export function getTemplatesByCategory(category: string, language: "en" | "ru" = "en"): TemplateConfig[] {
  const templates = getTemplates(language);
  return templates.filter((template) => template.category === category);
}

export function getTemplatesByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced",
  language: "en" | "ru" = "en"
): TemplateConfig[] {
  const templates = getTemplates(language);
  return templates.filter((template) => template.difficulty === difficulty);
}
