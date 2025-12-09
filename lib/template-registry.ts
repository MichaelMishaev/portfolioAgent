import translations from "./translations.json";

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  status: "draft" | "published";
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
  // Detail page fields
  price: number;
  screenshots: string[];
  longDescription: string;
  whatsIncluded: string[];
  technicalDetails?: string[];
}

const staticTemplateData = {
  minimalist: {
    colors: { primary: "#000000", secondary: "#FFFFFF", accent: "#3B82F6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "service-marketplace": {
    colors: { primary: "#2563EB", secondary: "#10B981", accent: "#F59E0B" },
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
  "professional-b2b": {
    colors: { primary: "#1a73e8", secondary: "#1557b0", accent: "#10b981" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "creative-agency-bold": {
    colors: { primary: "#0033ff", secondary: "#27cc8d", accent: "#ffa1a1" },
    fonts: { heading: "Barlow Semi Condensed", body: "Source Sans Pro" },
  },
  "minimal-portfolio-clean": {
    colors: { primary: "#111827", secondary: "#f3f4f6", accent: "#3b82f6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "glassmorphism-modern": {
    colors: { primary: "#343434", secondary: "rgba(255, 255, 255, 0.1)", accent: "#4d65ff" },
    fonts: { heading: "Montserrat", body: "Open Sans" },
  },
  "split-screen-editorial": {
    colors: { primary: "#1f2937", secondary: "#f8fafc", accent: "#3b82f6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "saas-feature-rich": {
    colors: { primary: "#2563eb", secondary: "#6366f1", accent: "#3b82f6" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "personal-brand": {
    colors: { primary: "#f59e0b", secondary: "#3b82f6", accent: "#ec4899" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "experimental-3d": {
    colors: { primary: "#000000", secondary: "#1a1a2e", accent: "#06b6d4" },
    fonts: { heading: "Space Grotesk", body: "Inter" },
  },
  "interactive-agency": {
    colors: { primary: "#8B5CF6", secondary: "#06B6D4", accent: "#0A0A0A" },
    fonts: { heading: "Space Grotesk", body: "Inter" },
  },
  "luxury-minimal": {
    colors: { primary: "#D4AF37", secondary: "#000000", accent: "#F5F5DC" },
    fonts: { heading: "Playfair Display", body: "Inter" },
  },
  "startup-pitch": {
    colors: { primary: "#2563EB", secondary: "#F59E0B", accent: "#FFFFFF" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "photography-immersive": {
    colors: { primary: "#000000", secondary: "#FFFFFF", accent: "#808080" },
    fonts: { heading: "Inter", body: "Inter" },
  },
  "motion-designer": {
    colors: { primary: "#00FF00", secondary: "#FF006E", accent: "#000000" },
    fonts: { heading: "Space Grotesk", body: "Inter" },
  },
};

export function getTemplates(language: "en" | "ru" | "he" = "en"): TemplateConfig[] {
  const t = translations[language];

  // Default features translated
  const defaultWhatsIncluded = language === "en" ? [
    "Responsive Design",
    "Dark Mode Support",
    "SEO Optimized",
    "Fast Performance",
    "Free Builder Access",
    "Professional Code"
  ] : language === "he" ? [
    "עיצוב רספונסיבי",
    "תמיכה במצב כהה",
    "אופטימיזציה ל-SEO",
    "ביצועים מהירים",
    "גישה חופשית לבונה",
    "קוד מקצועי"
  ] : [
    "Адаптивный дизайн",
    "Поддержка темной темы",
    "SEO оптимизация",
    "Быстрая производительность",
    "Бесплатный доступ к билдеру",
    "Профессиональный код"
  ];

  // Language suffix for screenshots
  const langSuffix = language === 'ru' ? '-ru' : language === 'he' ? '-ru' : '';

  return t.templates.map((template) => ({
    ...template,
    difficulty: template.difficulty as "beginner" | "intermediate" | "advanced",
    status: (template.status as "draft" | "published") || "published",
    colors: staticTemplateData[template.id as keyof typeof staticTemplateData].colors,
    fonts: staticTemplateData[template.id as keyof typeof staticTemplateData].fonts,
    thumbnail: `/previews/${template.id}.png`,
    demoPath: `/templates/${template.id}`,
    // Detail page defaults (can be overridden in translations.json)
    price: template.price || 60,
    screenshots: template.screenshots || [`/screenshots/${template.id}-1${langSuffix}.png`, `/screenshots/${template.id}-2${langSuffix}.png`, `/screenshots/${template.id}-3${langSuffix}.png`],
    longDescription: template.longDescription || template.description,
    whatsIncluded: template.whatsIncluded || defaultWhatsIncluded,
    technicalDetails: template.technicalDetails || undefined,
  }));
}

export const templates = getTemplates("en");

export function getTemplateById(id: string, language: "en" | "ru" | "he" = "en"): TemplateConfig | undefined {
  const templates = getTemplates(language);
  return templates.find((template) => template.id === id);
}

export function getTemplatesByCategory(category: string, language: "en" | "ru" | "he" = "en"): TemplateConfig[] {
  const templates = getTemplates(language);
  return templates.filter((template) => template.category === category);
}

export function getTemplatesByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced",
  language: "en" | "ru" | "he" = "en"
): TemplateConfig[] {
  const templates = getTemplates(language);
  return templates.filter((template) => template.difficulty === difficulty);
}

/**
 * Get templates by status (draft or published)
 */
export function getTemplatesByStatus(
  status: "draft" | "published",
  language: "en" | "ru" | "he" = "en"
): TemplateConfig[] {
  const templates = getTemplates(language);
  return templates.filter((template) => template.status === status);
}

/**
 * Get all templates including drafts (for gateway portal)
 */
export function getAllTemplatesIncludingDrafts(language: "en" | "ru" | "he" = "en"): TemplateConfig[] {
  return getTemplates(language);
}

/**
 * Get only published templates (for public gallery)
 */
export function getPublishedTemplates(language: "en" | "ru" | "he" = "en"): TemplateConfig[] {
  return getTemplatesByStatus("published", language);
}

/**
 * Get similar templates from the same category, excluding the specified template
 * Used by error boundaries to show alternative templates when one fails to load
 */
export function getSimilarTemplates(
  templateId: string,
  category: string,
  language: "en" | "ru" | "he" = "en",
  limit: number = 3
): TemplateConfig[] {
  const categoryTemplates = getTemplatesByCategory(category, language);

  // Filter out the current template and return up to the specified limit
  return categoryTemplates
    .filter((template) => template.id !== templateId)
    .slice(0, limit);
}
