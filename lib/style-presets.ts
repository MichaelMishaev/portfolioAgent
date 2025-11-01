/**
 * Quick Style Presets
 * Pre-defined color schemes for fast customization
 */

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  category: "professional" | "creative" | "minimal" | "bold";
  colors: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
  };
}

export const stylePresets: StylePreset[] = [
  // Professional
  {
    id: "professional-navy",
    name: "Navy Professional",
    description: "Classic navy blue with gold accents",
    category: "professional",
    colors: {
      primary: "#1e3a8a",
      secondary: "#3b82f6",
      accent: "#f59e0b",
    },
  },
  {
    id: "professional-charcoal",
    name: "Charcoal Executive",
    description: "Sophisticated charcoal with teal highlights",
    category: "professional",
    colors: {
      primary: "#1f2937",
      secondary: "#4b5563",
      accent: "#14b8a6",
    },
  },
  {
    id: "professional-forest",
    name: "Forest Professional",
    description: "Deep green with warm earth tones",
    category: "professional",
    colors: {
      primary: "#065f46",
      secondary: "#10b981",
      accent: "#f97316",
    },
  },

  // Creative
  {
    id: "creative-sunset",
    name: "Sunset Vibes",
    description: "Warm coral and purple gradients",
    category: "creative",
    colors: {
      primary: "#ec4899",
      secondary: "#f97316",
      accent: "#8b5cf6",
    },
  },
  {
    id: "creative-ocean",
    name: "Ocean Breeze",
    description: "Refreshing cyan and turquoise",
    category: "creative",
    colors: {
      primary: "#06b6d4",
      secondary: "#0ea5e9",
      accent: "#10b981",
    },
  },
  {
    id: "creative-neon",
    name: "Neon Nights",
    description: "Bold magenta and electric blue",
    category: "creative",
    colors: {
      primary: "#d946ef",
      secondary: "#a855f7",
      accent: "#06b6d4",
    },
  },
  {
    id: "creative-retro",
    name: "Retro Wave",
    description: "80s-inspired pink and purple",
    category: "creative",
    colors: {
      primary: "#ec4899",
      secondary: "#8b5cf6",
      accent: "#fbbf24",
    },
  },

  // Minimal
  {
    id: "minimal-mono",
    name: "Monochrome",
    description: "Pure black and white elegance",
    category: "minimal",
    colors: {
      primary: "#000000",
      secondary: "#6b7280",
      accent: "#374151",
    },
  },
  {
    id: "minimal-slate",
    name: "Slate Minimal",
    description: "Subtle slate grays",
    category: "minimal",
    colors: {
      primary: "#334155",
      secondary: "#64748b",
      accent: "#0ea5e9",
    },
  },
  {
    id: "minimal-sand",
    name: "Sand & Stone",
    description: "Warm beige with subtle accents",
    category: "minimal",
    colors: {
      primary: "#78716c",
      secondary: "#a8a29e",
      accent: "#ea580c",
    },
  },

  // Bold
  {
    id: "bold-fire",
    name: "Fire & Energy",
    description: "Vibrant red and orange",
    category: "bold",
    colors: {
      primary: "#dc2626",
      secondary: "#f97316",
      accent: "#fbbf24",
    },
  },
  {
    id: "bold-electric",
    name: "Electric Lime",
    description: "High-energy green and yellow",
    category: "bold",
    colors: {
      primary: "#65a30d",
      secondary: "#84cc16",
      accent: "#facc15",
    },
  },
  {
    id: "bold-royal",
    name: "Royal Purple",
    description: "Deep purple with gold",
    category: "bold",
    colors: {
      primary: "#7c3aed",
      secondary: "#a855f7",
      accent: "#fbbf24",
    },
  },
  {
    id: "bold-midnight",
    name: "Midnight Blue",
    description: "Deep blue with bright cyan",
    category: "bold",
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#06b6d4",
    },
  },
];

/**
 * Get presets by category
 */
export function getPresetsByCategory(
  category: StylePreset["category"]
): StylePreset[] {
  return stylePresets.filter((preset) => preset.category === category);
}

/**
 * Get a random style preset
 */
export function getRandomStylePreset(): StylePreset {
  const randomIndex = Math.floor(Math.random() * stylePresets.length);
  return stylePresets[randomIndex];
}

/**
 * Category metadata for UI
 */
export const styleCategoryMetadata = {
  professional: {
    label: "Professional",
    description: "Refined and trustworthy",
    icon: "💼",
  },
  creative: {
    label: "Creative",
    description: "Bold and imaginative",
    icon: "🎨",
  },
  minimal: {
    label: "Minimal",
    description: "Clean and understated",
    icon: "✨",
  },
  bold: {
    label: "Bold",
    description: "Vibrant and eye-catching",
    icon: "⚡",
  },
} as const;
