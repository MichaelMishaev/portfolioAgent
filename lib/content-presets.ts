/**
 * Content Library - Pre-made content examples
 * Helps users quickly populate their preview with realistic data
 */

export interface ContentPreset {
  id: string;
  name: string;
  category: "tech" | "creative" | "business" | "academic" | "freelance";
  firstName: string;
  lastName: string;
  title: string;
  avatar?: string; // Optional URL to a placeholder avatar
}

export const contentPresets: ContentPreset[] = [
  // Tech Category
  {
    id: "tech-frontend-1",
    category: "tech",
    name: "Frontend Developer",
    firstName: "Alex",
    lastName: "Chen",
    title: "Senior Frontend Engineer specializing in React & TypeScript",
  },
  {
    id: "tech-fullstack-1",
    category: "tech",
    name: "Full-Stack Developer",
    firstName: "Sarah",
    lastName: "Martinez",
    title: "Full-Stack Developer building scalable web applications",
  },
  {
    id: "tech-mobile-1",
    category: "tech",
    name: "Mobile Developer",
    firstName: "Jordan",
    lastName: "Kim",
    title: "iOS & Android Developer creating seamless mobile experiences",
  },
  {
    id: "tech-devops-1",
    category: "tech",
    name: "DevOps Engineer",
    firstName: "Morgan",
    lastName: "Taylor",
    title: "DevOps Engineer optimizing cloud infrastructure at scale",
  },
  {
    id: "tech-data-1",
    category: "tech",
    name: "Data Scientist",
    firstName: "Riley",
    lastName: "Patel",
    title: "Data Scientist turning complex data into actionable insights",
  },

  // Creative Category
  {
    id: "creative-designer-1",
    category: "creative",
    name: "UI/UX Designer",
    firstName: "Casey",
    lastName: "Johnson",
    title: "UI/UX Designer crafting delightful digital experiences",
  },
  {
    id: "creative-graphic-1",
    category: "creative",
    name: "Graphic Designer",
    firstName: "Jamie",
    lastName: "Williams",
    title: "Graphic Designer specializing in brand identity & visual storytelling",
  },
  {
    id: "creative-photographer-1",
    category: "creative",
    name: "Photographer",
    firstName: "Avery",
    lastName: "Brown",
    title: "Commercial Photographer capturing authentic moments",
  },
  {
    id: "creative-illustrator-1",
    category: "creative",
    name: "Illustrator",
    firstName: "Drew",
    lastName: "Garcia",
    title: "Digital Illustrator bringing imagination to life",
  },
  {
    id: "creative-animator-1",
    category: "creative",
    name: "Motion Designer",
    firstName: "Quinn",
    lastName: "Lee",
    title: "Motion Designer creating captivating animations",
  },

  // Business Category
  {
    id: "business-consultant-1",
    category: "business",
    name: "Business Consultant",
    firstName: "Taylor",
    lastName: "Anderson",
    title: "Strategy Consultant helping businesses scale and innovate",
  },
  {
    id: "business-pm-1",
    category: "business",
    name: "Product Manager",
    firstName: "Cameron",
    lastName: "White",
    title: "Product Manager driving user-centric product development",
  },
  {
    id: "business-marketing-1",
    category: "business",
    name: "Marketing Strategist",
    firstName: "Jordan",
    lastName: "Davis",
    title: "Digital Marketing Strategist specializing in growth & analytics",
  },
  {
    id: "business-sales-1",
    category: "business",
    name: "Sales Executive",
    firstName: "Skylar",
    lastName: "Miller",
    title: "Senior Sales Executive building lasting client relationships",
  },
  {
    id: "business-entrepreneur-1",
    category: "business",
    name: "Entrepreneur",
    firstName: "Dakota",
    lastName: "Wilson",
    title: "Serial Entrepreneur & Startup Advisor",
  },

  // Academic Category
  {
    id: "academic-researcher-1",
    category: "academic",
    name: "Research Scientist",
    firstName: "Reese",
    lastName: "Thompson",
    title: "PhD Researcher in Machine Learning & Artificial Intelligence",
  },
  {
    id: "academic-professor-1",
    category: "academic",
    name: "Professor",
    firstName: "Parker",
    lastName: "Moore",
    title: "Associate Professor of Computer Science",
  },
  {
    id: "academic-student-1",
    category: "academic",
    name: "PhD Candidate",
    firstName: "Sage",
    lastName: "Jackson",
    title: "PhD Candidate researching sustainable energy solutions",
  },
  {
    id: "academic-writer-1",
    category: "academic",
    name: "Technical Writer",
    firstName: "Rowan",
    lastName: "Clark",
    title: "Technical Writer making complex topics accessible",
  },

  // Freelance Category
  {
    id: "freelance-writer-1",
    category: "freelance",
    name: "Content Writer",
    firstName: "Finley",
    lastName: "Rodriguez",
    title: "Freelance Content Writer crafting compelling stories",
  },
  {
    id: "freelance-developer-1",
    category: "freelance",
    name: "Freelance Developer",
    firstName: "Blake",
    lastName: "Martinez",
    title: "Independent Developer building custom web solutions",
  },
  {
    id: "freelance-consultant-1",
    category: "freelance",
    name: "Freelance Consultant",
    firstName: "Morgan",
    lastName: "Hernandez",
    title: "Freelance Business Consultant & Strategic Advisor",
  },
  {
    id: "freelance-designer-1",
    category: "freelance",
    name: "Freelance Designer",
    firstName: "River",
    lastName: "Lopez",
    title: "Independent Designer specializing in branding & web design",
  },
];

/**
 * Get presets by category
 */
export function getPresetsByCategory(
  category: ContentPreset["category"]
): ContentPreset[] {
  return contentPresets.filter((preset) => preset.category === category);
}

/**
 * Get a random preset
 */
export function getRandomPreset(): ContentPreset {
  const randomIndex = Math.floor(Math.random() * contentPresets.length);
  return contentPresets[randomIndex];
}

/**
 * Search presets by name or title
 */
export function searchPresets(query: string): ContentPreset[] {
  const lowerQuery = query.toLowerCase();
  return contentPresets.filter(
    (preset) =>
      preset.name.toLowerCase().includes(lowerQuery) ||
      preset.title.toLowerCase().includes(lowerQuery) ||
      preset.firstName.toLowerCase().includes(lowerQuery) ||
      preset.lastName.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Category metadata for UI
 */
export const categoryMetadata = {
  tech: {
    label: "Tech & Engineering",
    description: "Developers, engineers, and tech professionals",
    icon: "💻",
  },
  creative: {
    label: "Creative & Design",
    description: "Designers, photographers, and artists",
    icon: "🎨",
  },
  business: {
    label: "Business & Strategy",
    description: "Consultants, managers, and entrepreneurs",
    icon: "💼",
  },
  academic: {
    label: "Academic & Research",
    description: "Researchers, professors, and writers",
    icon: "📚",
  },
  freelance: {
    label: "Freelance & Independent",
    description: "Freelancers and independent professionals",
    icon: "🚀",
  },
} as const;
