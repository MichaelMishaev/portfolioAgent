export interface ServiceOffer {
  id: number;
  priority: string;
  title: string;
  title_ru: string;
  type: 'subscription' | 'onetime';
  priceMin: number;
  priceMax?: number;
  description: string;
  description_ru: string;
  icon: string;
  featured?: boolean;
  category: 'hosting' | 'domain' | 'launch' | 'admin' | 'branding' | 'images' | 'security' | 'maintenance';
}

export const ALL_SERVICES: ServiceOffer[] = [
  {
    id: 1,
    priority: "1️⃣",
    title: "Hosting Service",
    title_ru: "Хостинг",
    type: "subscription",
    priceMin: 5,
    priceMax: 19,
    description: "We'll host your website on secure servers so it's always live — no setup needed.",
    description_ru: "Мы разместим ваш сайт на защищенных серверах, чтобы он всегда был онлайн — без настройки.",
    icon: "☁️",
    category: "hosting"
  },
  {
    id: 2,
    priority: "2️⃣",
    title: "Domain Assistance",
    title_ru: "Помощь с доменом",
    type: "onetime",
    priceMin: 10,
    description: "We'll help you choose, register, and connect a domain like yourbrand.com.",
    description_ru: "Мы поможем выбрать, зарегистрировать и подключить домен типа yourbrand.com.",
    icon: "🌍",
    category: "domain"
  },
  {
    id: 3,
    priority: "3️⃣",
    title: "Installation & Launch",
    title_ru: "Установка и запуск",
    type: "onetime",
    priceMin: 29,
    priceMax: 49,
    description: "We'll install your template, connect hosting + domain, and launch your site within 24 hours.",
    description_ru: "Мы установим ваш шаблон, подключим хостинг + домен, и запустим сайт за 24 часа.",
    icon: "🚀",
    featured: true,
    category: "launch"
  },
  {
    id: 4,
    priority: "4️⃣",
    title: "Admin Panel Service",
    title_ru: "Админ-панель",
    type: "onetime",
    priceMin: 99,
    description: "Get a private dashboard to edit texts & images without touching code.",
    description_ru: "Получите приватную панель для редактирования текстов и изображений без кода.",
    icon: "💼",
    category: "admin"
  },
  {
    id: 5,
    priority: "5️⃣",
    title: "Branding Pack",
    title_ru: "Пакет брендинга",
    type: "onetime",
    priceMin: 19,
    priceMax: 39,
    description: "We'll design a simple logo + color palette that matches your new site.",
    description_ru: "Мы разработаем простой логотип + цветовую палитру, подходящую вашему сайту.",
    icon: "🎨",
    category: "branding"
  },
  {
    id: 6,
    priority: "6️⃣",
    title: "Stock Image Pack",
    title_ru: "Пакет изображений",
    type: "onetime",
    priceMin: 15,
    priceMax: 25,
    description: "We'll fill your pages with professional, license-free images that fit your business.",
    description_ru: "Мы заполним ваши страницы профессиональными изображениями, подходящими вашему бизнесу.",
    icon: "📸",
    category: "images"
  },
  {
    id: 7,
    priority: "7️⃣",
    title: "Security & Backup Plan",
    title_ru: "Безопасность",
    type: "subscription",
    priceMin: 5,
    priceMax: 9,
    description: "Daily backups + malware protection to keep your site safe.",
    description_ru: "Ежедневные резервные копии + защита от вредоносного ПО для безопасности сайта.",
    icon: "🔒",
    category: "security"
  },
  {
    id: 8,
    priority: "8️⃣",
    title: "Maintenance Plan",
    title_ru: "План обслуживания",
    type: "subscription",
    priceMin: 9,
    priceMax: 19,
    description: "We'll update plugins, monitor performance, and keep everything running smoothly.",
    description_ru: "Мы будем обновлять плагины, следить за производительностью и поддерживать всё в рабочем состоянии.",
    icon: "🔧",
    category: "maintenance"
  }
];

export function getServiceById(id: number): ServiceOffer | undefined {
  return ALL_SERVICES.find(s => s.id === id);
}

export function getServicesByIds(ids: number[]): ServiceOffer[] {
  return ids.map(id => getServiceById(id)).filter(Boolean) as ServiceOffer[];
}

export function formatServicePrice(service: ServiceOffer): string {
  if (service.priceMax) {
    return `$${service.priceMin}-${service.priceMax}`;
  }
  return `$${service.priceMin}`;
}
