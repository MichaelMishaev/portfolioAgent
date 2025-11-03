/**
 * Builder Content Configuration
 *
 * This file contains all the customizable content for your portfolio.
 * Edit the values below to personalize your portfolio in both English and Russian.
 *
 * Instructions:
 * - Replace placeholder text with your actual content
 * - Maintain the structure (don't remove fields)
 * - Both 'en' and 'ru' fields are required
 * - Links and emails should be the same in both languages
 */

// Bilingual text type
export interface BilingualText {
  en: string;
  ru: string;
}

// Personal Information
export interface PersonalInfo {
  firstName: BilingualText;
  lastName: BilingualText;
  email: string;
  phone: string;
  location: BilingualText;
  avatar?: string; // URL to profile image
}

// Hero Section
export interface HeroSection {
  title: BilingualText;
  subtitle: BilingualText;
  description: BilingualText;
  ctaButton: BilingualText;
  ctaLink?: string;
  backgroundImage?: string;
}

// About Section
export interface AboutSection {
  heading: BilingualText;
  bio: BilingualText;
  highlights: BilingualText[];
  image?: string;
}

// Skills Section
export interface SkillCategory {
  name: BilingualText;
  items: string[]; // Tech names are usually in English
}

export interface SkillsSection {
  heading: BilingualText;
  categories: SkillCategory[];
}

// Project/Work Item
export interface Project {
  title: BilingualText;
  description: BilingualText;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  featured?: boolean;
}

export interface WorkSection {
  heading: BilingualText;
  projects: Project[];
}

// Contact Section
export interface ContactSection {
  heading: BilingualText;
  message: BilingualText;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    telegram?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    behance?: string;
    dribbble?: string;
  };
}

// Stats/Achievements Section
export interface StatItem {
  label: BilingualText;
  value: string; // e.g., "100+", "5 years"
  icon?: string;
}

export interface StatsSection {
  heading: BilingualText;
  stats: StatItem[];
}

// Testimonials Section
export interface Testimonial {
  name: string;
  role: BilingualText;
  company: string;
  quote: BilingualText;
  avatar?: string;
}

export interface TestimonialsSection {
  heading: BilingualText;
  testimonials: Testimonial[];
}

// Main Content Structure
export interface BuilderContent {
  personal: PersonalInfo;
  hero: HeroSection;
  about: AboutSection;
  skills: SkillsSection;
  work: WorkSection;
  stats?: StatsSection;
  testimonials?: TestimonialsSection;
  contact: ContactSection;
}

// Default Content (Replace with your own!)
export const builderContent: BuilderContent = {
  personal: {
    firstName: {
      en: "John",
      ru: "Джон"
    },
    lastName: {
      en: "Doe",
      ru: "Доу"
    },
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: {
      en: "San Francisco, CA",
      ru: "Сан-Франциско, Калифорния"
    },
    avatar: "/images/avatar-placeholder.jpg"
  },

  hero: {
    title: {
      en: "Developer & Designer",
      ru: "Разработчик и Дизайнер"
    },
    subtitle: {
      en: "Creating beautiful digital experiences",
      ru: "Создаю красивые цифровые продукты"
    },
    description: {
      en: "Passionate about crafting user-centered solutions that make a difference. Let's build something amazing together.",
      ru: "Увлечён созданием пользовательских решений, которые меняют мир к лучшему. Давайте создадим что-то удивительное вместе."
    },
    ctaButton: {
      en: "View My Work",
      ru: "Посмотреть Работы"
    },
    ctaLink: "#work"
  },

  about: {
    heading: {
      en: "About Me",
      ru: "Обо Мне"
    },
    bio: {
      en: "I'm a full-stack developer with 5+ years of experience building web applications. I specialize in modern JavaScript frameworks and have a passion for creating intuitive, performant user interfaces.",
      ru: "Я full-stack разработчик с опытом более 5 лет в создании веб-приложений. Специализируюсь на современных JavaScript фреймворках и увлечён созданием интуитивных, производительных пользовательских интерфейсов."
    },
    highlights: [
      {
        en: "5+ years of professional experience",
        ru: "5+ лет профессионального опыта"
      },
      {
        en: "Worked with Fortune 500 companies",
        ru: "Работал с компаниями из списка Fortune 500"
      },
      {
        en: "Open source contributor",
        ru: "Контрибьютор open source проектов"
      },
      {
        en: "Speaker at tech conferences",
        ru: "Спикер на технических конференциях"
      }
    ],
    image: "/images/about-placeholder.jpg"
  },

  skills: {
    heading: {
      en: "Skills & Technologies",
      ru: "Навыки и Технологии"
    },
    categories: [
      {
        name: {
          en: "Frontend",
          ru: "Фронтенд"
        },
        items: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Vue.js",
          "HTML5/CSS3"
        ]
      },
      {
        name: {
          en: "Backend",
          ru: "Бэкенд"
        },
        items: [
          "Node.js",
          "Express",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "GraphQL"
        ]
      },
      {
        name: {
          en: "Tools & DevOps",
          ru: "Инструменты и DevOps"
        },
        items: [
          "Git",
          "Docker",
          "AWS",
          "CI/CD",
          "Vercel",
          "Webpack"
        ]
      },
      {
        name: {
          en: "Design",
          ru: "Дизайн"
        },
        items: [
          "Figma",
          "Adobe XD",
          "Sketch",
          "Photoshop",
          "Illustrator",
          "UI/UX Design"
        ]
      }
    ]
  },

  work: {
    heading: {
      en: "Featured Projects",
      ru: "Избранные Проекты"
    },
    projects: [
      {
        title: {
          en: "E-Commerce Platform",
          ru: "Платформа Электронной Коммерции"
        },
        description: {
          en: "Built a full-stack e-commerce platform with Next.js, Stripe payments, and real-time inventory management. Handles 10k+ daily users.",
          ru: "Создал full-stack платформу электронной коммерции с Next.js, платежами Stripe и управлением запасами в реальном времени. Обслуживает 10k+ пользователей ежедневно."
        },
        tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
        link: "https://example.com",
        github: "https://github.com/username/project",
        image: "/images/project1-placeholder.jpg",
        featured: true
      },
      {
        title: {
          en: "Task Management App",
          ru: "Приложение для Управления Задачами"
        },
        description: {
          en: "Collaborative task management tool with real-time updates, drag-and-drop interface, and team collaboration features.",
          ru: "Инструмент для совместного управления задачами с обновлениями в реальном времени, интерфейсом drag-and-drop и функциями командной работы."
        },
        tags: ["React", "Socket.io", "Node.js", "MongoDB"],
        link: "https://example.com",
        github: "https://github.com/username/project",
        image: "/images/project2-placeholder.jpg",
        featured: true
      },
      {
        title: {
          en: "Portfolio Builder",
          ru: "Конструктор Портфолио"
        },
        description: {
          en: "No-code portfolio builder with drag-and-drop interface, multiple templates, and one-click deployment to custom domains.",
          ru: "Конструктор портфолио без кода с интерфейсом drag-and-drop, множественными шаблонами и развертыванием одним кликом на собственных доменах."
        },
        tags: ["Next.js", "CraftJS", "Tailwind", "Vercel"],
        link: "https://example.com",
        image: "/images/project3-placeholder.jpg",
        featured: false
      }
    ]
  },

  stats: {
    heading: {
      en: "Achievements",
      ru: "Достижения"
    },
    stats: [
      {
        label: {
          en: "Years Experience",
          ru: "Лет Опыта"
        },
        value: "5+",
        icon: "💼"
      },
      {
        label: {
          en: "Projects Completed",
          ru: "Завершённых Проектов"
        },
        value: "50+",
        icon: "✅"
      },
      {
        label: {
          en: "Happy Clients",
          ru: "Довольных Клиентов"
        },
        value: "30+",
        icon: "😊"
      },
      {
        label: {
          en: "GitHub Stars",
          ru: "Звёзд на GitHub"
        },
        value: "1.2k",
        icon: "⭐"
      }
    ]
  },

  testimonials: {
    heading: {
      en: "What Clients Say",
      ru: "Отзывы Клиентов"
    },
    testimonials: [
      {
        name: "Sarah Johnson",
        role: {
          en: "CEO",
          ru: "Генеральный директор"
        },
        company: "TechCorp Inc.",
        quote: {
          en: "Working with John was an absolute pleasure. He delivered a high-quality product on time and exceeded our expectations.",
          ru: "Работать с Джоном было настоящим удовольствием. Он предоставил высококачественный продукт вовремя и превзошёл наши ожидания."
        },
        avatar: "/images/testimonial1-placeholder.jpg"
      },
      {
        name: "Michael Chen",
        role: {
          en: "Product Manager",
          ru: "Продакт-менеджер"
        },
        company: "StartupXYZ",
        quote: {
          en: "Incredible attention to detail and excellent communication throughout the project. Highly recommended!",
          ru: "Невероятное внимание к деталям и отличная коммуникация на протяжении всего проекта. Настоятельно рекомендую!"
        },
        avatar: "/images/testimonial2-placeholder.jpg"
      }
    ]
  },

  contact: {
    heading: {
      en: "Get In Touch",
      ru: "Свяжитесь со Мной"
    },
    message: {
      en: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!",
      ru: "Я всегда открыт для обсуждения новых проектов, творческих идей или возможностей стать частью вашего видения. Свяжитесь со мной!"
    },
    social: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      telegram: "https://t.me/johndoe",
      instagram: "https://instagram.com/johndoe"
    }
  }
};

// Helper function to get content in the current language
export function getContent(lang: 'en' | 'ru' = 'en'): BuilderContent {
  return builderContent;
}

// Helper function to get bilingual text
export function getBilingualText(text: BilingualText, lang: 'en' | 'ru' = 'en'): string {
  return text[lang] || text.en; // Fallback to English if translation missing
}

// Helper to update content (for future use with state management)
export function updateContent(updates: Partial<BuilderContent>): BuilderContent {
  return {
    ...builderContent,
    ...updates
  };
}

export default builderContent;
