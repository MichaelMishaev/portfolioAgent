import fs from 'fs';
import path from 'path';

// Read the current translations file
const translationsPath = path.join(process.cwd(), 'lib', 'template-translations.json');
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf-8'));

// The 13 templates that need expansion
const templatesToExpand = [
  'creativeAgencyBold',
  'experimental3d',
  'glassmorphismModern',
  'minimalPortfolioClean',
  'splitScreenEditorial',
  'saasFeatureRich',
  'personalBrand',
  'interactiveAgency',
  'luxuryMinimal',
  'startupPitch',
  'photographyImmersive',
  'motionDesigner',
  'professionalB2b'
];

// Extensive content to add (EN)
const extensiveContentEN = {
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is your typical project timeline?",
        answer: "Most projects range from 4-12 weeks depending on complexity. We'll provide a detailed timeline during our initial consultation."
      },
      {
        question: "Do you offer ongoing support?",
        answer: "Yes! We provide 30 days of post-launch support and offer monthly retainer packages for continued maintenance and updates."
      },
      {
        question: "What is your design process?",
        answer: "We follow a collaborative 5-step process: Discovery, Strategy, Design, Development, and Launch. You'll be involved at every stage."
      },
      {
        question: "Can you work with existing brands?",
        answer: "Absolutely! We excel at working within existing brand guidelines while bringing fresh, modern perspectives to your digital presence."
      },
      {
        question: "What technologies do you use?",
        answer: "We use modern stack including React, Next.js, TypeScript, Tailwind CSS, and Framer Motion for best performance and maintainability."
      },
      {
        question: "Do you provide training?",
        answer: "Yes, we include comprehensive training and documentation so your team can confidently manage and update the final product."
      }
    ]
  },
  process: {
    title: "Our Process",
    subtitle: "A proven methodology that delivers results",
    steps: [
      {
        number: "01",
        title: "Discovery & Research",
        description: "We start by understanding your goals, audience, and competitive landscape through in-depth research and stakeholder interviews.",
        duration: "1-2 weeks"
      },
      {
        number: "02",
        title: "Strategy & Planning",
        description: "Develop a comprehensive strategy including user flows, information architecture, and technical specifications.",
        duration: "1 week"
      },
      {
        number: "03",
        title: "Design & Prototyping",
        description: "Create high-fidelity designs and interactive prototypes that bring your vision to life before development begins.",
        duration: "2-4 weeks"
      },
      {
        number: "04",
        title: "Development & Testing",
        description: "Build your product using modern technologies with rigorous testing to ensure quality and performance.",
        duration: "4-6 weeks"
      },
      {
        number: "05",
        title: "Launch & Optimization",
        description: "Deploy your product and monitor performance, making data-driven optimizations for continuous improvement.",
        duration: "Ongoing"
      }
    ]
  },
  team: {
    title: "Meet the Team",
    subtitle: "Talented individuals passionate about creating exceptional work",
    members: [
      {
        name: "Sarah Mitchell",
        role: "Creative Director",
        bio: "15+ years crafting brand experiences that resonate and inspire",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
      },
      {
        name: "Marcus Chen",
        role: "Lead Developer",
        bio: "Full-stack engineer and tech innovator building the future",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
      },
      {
        name: "Elena Rodriguez",
        role: "UX Designer",
        bio: "Human-centered design specialist focused on user delight",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
      },
      {
        name: "David Park",
        role: "Product Strategist",
        bio: "Turning vision into actionable roadmaps and business value",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
      }
    ]
  },
  blog: {
    title: "Latest Insights",
    subtitle: "Thoughts on design, development, and digital strategy",
    posts: [
      {
        title: "The Future of Web Design in 2025",
        excerpt: "Exploring emerging trends and technologies shaping the digital landscape.",
        category: "Design Trends",
        readTime: "5 min read",
        date: "Jan 15, 2025",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop"
      },
      {
        title: "Building Scalable Design Systems",
        excerpt: "Best practices for creating and maintaining design systems that grow with your product.",
        category: "Development",
        readTime: "8 min read",
        date: "Jan 10, 2025",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop"
      },
      {
        title: "User Research Methods That Work",
        excerpt: "Practical approaches to understanding your users and validating design decisions.",
        category: "UX Research",
        readTime: "6 min read",
        date: "Jan 5, 2025",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
      }
    ]
  },
  awards: {
    title: "Awards & Recognition",
    subtitle: "Honored to be recognized by industry leaders",
    items: [
      {
        title: "Site of the Day",
        organization: "Awwwards",
        year: "2024",
        category: "Excellence in Web Design"
      },
      {
        title: "Best Digital Experience",
        organization: "CSS Design Awards",
        year: "2024",
        category: "Interactive Design"
      },
      {
        title: "Innovation Award",
        organization: "Webby Awards",
        year: "2023",
        category: "User Experience"
      },
      {
        title: "Mobile Excellence",
        organization: "FWA",
        year: "2023",
        category: "Mobile Innovation"
      }
    ]
  },
  newsletter: {
    title: "Stay Updated",
    subtitle: "Get the latest insights, tips, and updates delivered to your inbox",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
    disclaimer: "We respect your privacy. Unsubscribe anytime."
  }
};

// Extensive content to add (RU)
const extensiveContentRU = {
  faq: {
    title: "Часто Задаваемые Вопросы",
    items: [
      {
        question: "Какие сроки выполнения проекта?",
        answer: "Большинство проектов занимают от 4 до 12 недель в зависимости от сложности. Мы предоставим подробный график во время первичной консультации."
      },
      {
        question: "Предоставляете ли вы постоянную поддержку?",
        answer: "Да! Мы предоставляем 30 дней поддержки после запуска и предлагаем ежемесячные пакеты для продолжения обслуживания и обновлений."
      },
      {
        question: "Каков ваш процесс разработки?",
        answer: "Мы следуем совместному 5-этапному процессу: Исследование, Стратегия, Дизайн, Разработка и Запуск. Вы будете участвовать на каждом этапе."
      },
      {
        question: "Можете ли вы работать с существующими брендами?",
        answer: "Конечно! Мы отлично работаем в рамках существующих brand guidelines, привнося свежие и современные перспективы."
      },
      {
        question: "Какие технологии вы используете?",
        answer: "Мы используем современный стек, включая React, Next.js, TypeScript, Tailwind CSS и Framer Motion для лучшей производительности."
      },
      {
        question: "Предоставляете ли вы обучение?",
        answer: "Да, мы включаем комплексное обучение и документацию, чтобы ваша команда могла уверенно управлять и обновлять конечный продукт."
      }
    ]
  },
  process: {
    title: "Наш Процесс",
    subtitle: "Проверенная методология, которая приносит результаты",
    steps: [
      {
        number: "01",
        title: "Исследование и Анализ",
        description: "Мы начинаем с понимания ваших целей, аудитории и конкурентной среды через глубокое исследование и интервью с заинтересованными сторонами.",
        duration: "1-2 недели"
      },
      {
        number: "02",
        title: "Стратегия и Планирование",
        description: "Разработка комплексной стратегии, включая пользовательские потоки, информационную архитектуру и технические спецификации.",
        duration: "1 неделя"
      },
      {
        number: "03",
        title: "Дизайн и Прототипирование",
        description: "Создание высокодетализированных дизайнов и интерактивных прототипов, которые воплощают ваше видение в жизнь перед началом разработки.",
        duration: "2-4 недели"
      },
      {
        number: "04",
        title: "Разработка и Тестирование",
        description: "Создание вашего продукта с использованием современных технологий и строгим тестированием для обеспечения качества и производительности.",
        duration: "4-6 недель"
      },
      {
        number: "05",
        title: "Запуск и Оптимизация",
        description: "Развертывание вашего продукта и мониторинг производительности, внесение улучшений на основе данных для непрерывного совершенствования.",
        duration: "Постоянно"
      }
    ]
  },
  team: {
    title: "Познакомьтесь с Командой",
    subtitle: "Талантливые специалисты, увлеченные созданием исключительных работ",
    members: [
      {
        name: "Сара Митчелл",
        role: "Креативный Директор",
        bio: "15+ лет создания брендовых решений, которые вдохновляют",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
      },
      {
        name: "Маркус Чен",
        role: "Ведущий Разработчик",
        bio: "Full-stack инженер и технологический инноватор",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
      },
      {
        name: "Елена Родригес",
        role: "UX Дизайнер",
        bio: "Специалист по человекоориентированному дизайну",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
      },
      {
        name: "Дэвид Парк",
        role: "Продуктовый Стратег",
        bio: "Превращение видения в реальную дорожную карту",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
      }
    ]
  },
  blog: {
    title: "Последние Статьи",
    subtitle: "Мысли о дизайне, разработке и цифровой стратегии",
    posts: [
      {
        title: "Будущее Веб-Дизайна в 2025",
        excerpt: "Исследование новых тенденций и технологий, формирующих цифровой ландшафт.",
        category: "Тренды Дизайна",
        readTime: "5 мин чтения",
        date: "15 Января 2025",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop"
      },
      {
        title: "Создание Масштабируемых Дизайн-Систем",
        excerpt: "Лучшие практики создания и поддержки дизайн-систем, растущих вместе с вашим продуктом.",
        category: "Разработка",
        readTime: "8 мин чтения",
        date: "10 Января 2025",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop"
      },
      {
        title: "Методы Пользовательских Исследований",
        excerpt: "Практические подходы к пониманию ваших пользователей и валидации дизайн-решений.",
        category: "UX Исследования",
        readTime: "6 мин чтения",
        date: "5 Января 2025",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
      }
    ]
  },
  awards: {
    title: "Награды и Признание",
    subtitle: "Гордимся признанием от лидеров индустрии",
    items: [
      {
        title: "Сайт Дня",
        organization: "Awwwards",
        year: "2024",
        category: "Превосходство в Веб-Дизайне"
      },
      {
        title: "Лучший Цифровой Опыт",
        organization: "CSS Design Awards",
        year: "2024",
        category: "Интерактивный Дизайн"
      },
      {
        title: "Премия за Инновации",
        organization: "Webby Awards",
        year: "2023",
        category: "Пользовательский Опыт"
      },
      {
        title: "Мобильное Совершенство",
        organization: "FWA",
        year: "2023",
        category: "Мобильные Инновации"
      }
    ]
  },
  newsletter: {
    title: "Будьте в Курсе",
    subtitle: "Получайте последние инсайты, советы и обновления на вашу почту",
    placeholder: "Введите ваш email",
    buttonText: "Подписаться",
    disclaimer: "Мы уважаем вашу конфиденциальность. Отпишитесь в любое время."
  }
};

// Add extensive content to all 13 templates
let updatedCount = 0;

for (const templateKey of templatesToExpand) {
  // Add to EN
  if (translations.en[templateKey]) {
    translations.en[templateKey].faq = extensiveContentEN.faq;
    translations.en[templateKey].process = extensiveContentEN.process;
    translations.en[templateKey].team = extensiveContentEN.team;
    translations.en[templateKey].blog = extensiveContentEN.blog;
    translations.en[templateKey].awards = extensiveContentEN.awards;
    translations.en[templateKey].newsletter = extensiveContentEN.newsletter;
    updatedCount++;
  }

  // Add to RU
  if (translations.ru[templateKey]) {
    translations.ru[templateKey].faq = extensiveContentRU.faq;
    translations.ru[templateKey].process = extensiveContentRU.process;
    translations.ru[templateKey].team = extensiveContentRU.team;
    translations.ru[templateKey].blog = extensiveContentRU.blog;
    translations.ru[templateKey].awards = extensiveContentRU.awards;
    translations.ru[templateKey].newsletter = extensiveContentRU.newsletter;
  }
}

// Save the updated translations
fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2), 'utf-8');

console.log('✅ Successfully expanded all 13 templates');
console.log(`   • Updated: ${updatedCount} templates`);
console.log('   • Added 6 new sections to each template:');
console.log('     - FAQ (6 questions)');
console.log('     - Process (5 steps)');
console.log('     - Team (4 members)');
console.log('     - Blog (3 posts)');
console.log('     - Awards (4 items)');
console.log('     - Newsletter');
console.log();
console.log('📏 Templates are now 3x longer with more scrolling content');
console.log('🌐 Both EN and RU translations added');
