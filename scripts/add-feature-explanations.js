#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the analysis results
const analysisPath = path.join(__dirname, 'feature-explanations-analysis.json');
const analysis = JSON.parse(fs.readFileSync(analysisPath, 'utf8'));

// Comprehensive feature explanations in English and Russian
const newExplanations = {
  en: {
    // Design & Layout
    "Minimal Design System": "A carefully crafted design system emphasizing simplicity and clarity. Includes consistent spacing, typography, and color usage for a clean, professional look.",
    "Dark Mode Toggle": "User-controllable dark theme switch that persists across sessions. Provides comfortable viewing in low-light environments.",
    "Premium Dark Theme": "Professional dark color palette with carefully balanced contrast ratios and premium feel for sophisticated brand presentation.",
    "Typography Hierarchy": "Structured text sizing and styling system that guides readers naturally through content with clear visual relationships.",
    "Mobile-First Layout": "Designed primarily for mobile devices, then enhanced for larger screens. Ensures optimal experience on smartphones where most users browse.",
    "Responsive Grid": "Flexible grid system that automatically adjusts columns and spacing based on screen size for perfect layouts everywhere.",
    "Bento Grid System": "Modern card-based layout inspired by Japanese bento boxes. Creates visually interesting, organized content presentations.",
    "Asymmetric Layouts": "Dynamic, uneven layouts that break traditional grid patterns for more engaging and memorable visual experiences.",
    "Magazine Layout": "Editorial-style design mimicking print magazines with multi-column grids, featured images, and sophisticated typography.",
    "Multi-column Grid": "Flexible multi-column system for organizing large amounts of content in readable, scannable formats.",
    "Enterprise Layout": "Professional B2B-focused design emphasizing trust, credibility, and clear information hierarchy for business audiences.",
    "Reading-Optimized Layout": "Text-focused design with optimal line lengths, spacing, and typography specifically for comfortable long-form reading.",

    // Visual Effects & Animations
    "Smooth Page Transitions": "Fluid animations between page changes that create a seamless, app-like browsing experience without jarring jumps.",
    "Smooth Transitions": "Polished animations for UI element changes that enhance usability and provide visual feedback to user actions.",
    "Smooth 60fps Animations": "Performance-optimized animations running at 60 frames per second for silky-smooth visual effects without lag.",
    "Hover Animations": "Interactive visual responses when users hover over elements, providing clear feedback and enhanced interactivity.",
    "Text Animations": "Dynamic typography effects that bring text to life through motion, adding personality and drawing attention to key messages.",
    "Animated Gradients": "Flowing, animated color transitions that create dynamic, eye-catching backgrounds and visual interest.",
    "Parallax Scrolling": "Depth-creating effect where background elements move slower than foreground, adding dimension and visual engagement.",
    "Glassmorphism Effects": "Frosted-glass appearance with backdrop blur, transparency, and subtle shadows for a modern, premium aesthetic.",
    "Backdrop Blur Effects": "Background blurring effect creating depth and focus while maintaining visual context of underlying content.",
    "Transparency Layers": "Layered semi-transparent elements that create depth, hierarchy, and sophisticated visual composition.",

    // 3D & Advanced Graphics
    "Three.js Integration": "Powerful 3D graphics library integration enabling interactive 3D models, animations, and immersive visual experiences.",
    "3D Model Viewer": "Interactive 3D object display allowing users to rotate, zoom, and explore products or designs from all angles.",
    "WebGL Effects": "Hardware-accelerated graphics for stunning visual effects, smooth animations, and high-performance interactive elements.",
    "Interactive 3D Elements": "User-controllable 3D objects that respond to mouse movements, scrolling, or touch for engaging experiences.",
    "Mobile Optimized 3D": "Efficiently rendered 3D graphics optimized for mobile devices, balancing visual quality with performance and battery life.",

    // UI Components & Features
    "Card Components": "Flexible, self-contained content containers for organizing information in scannable, attractive formats.",
    "Gallery Lightbox": "Full-screen image viewer with zoom, navigation, and smooth transitions for showcasing visual work professionally.",
    "Contact Form Integration": "Pre-built, styled contact form ready to connect with your email or backend service for lead collection.",
    "Contact Form": "Professionally designed form for visitor inquiries, complete with validation and user-friendly error messages.",
    "FAQ Section": "Collapsible question-and-answer section helping visitors find information quickly without cluttering the page.",
    "Newsletter Signup": "Email collection form encouraging visitors to subscribe for updates, optimized for conversion.",
    "Comment Integration": "Built-in comment system structure ready to integrate with services like Disqus or custom solutions.",
    "Social Sharing": "One-click sharing buttons for popular social platforms, making it easy for visitors to spread your content.",

    // Technical & Performance
    "Fast Loading": "Optimized asset delivery and code splitting ensuring pages load quickly even on slow connections.",
    "Code Syntax Highlighting": "Professionally styled code blocks with language-specific coloring for technical content and documentation.",
    "Analytics Integration": "Ready-to-use structure for Google Analytics, Plausible, or other analytics platforms to track visitor behavior.",
    "Payment Integration Ready": "Pre-structured payment flow and checkout pages ready to connect with Stripe, PayPal, or other processors.",

    // Styling & Design Systems
    "Bold Border System": "Thick, prominent borders creating strong visual separation and modern, brutalist-inspired aesthetic.",
    "High Contrast Colors": "Purposefully stark color combinations ensuring maximum readability and bold visual impact.",
    "Neon Accent Colors": "Bright, vibrant highlight colors creating energy, modernity, and drawing attention to key elements.",
    "Brutalist Typography": "Raw, bold typefaces with intentional imperfections for authentic, anti-establishment design aesthetic.",
    "Intentional Imperfection": "Deliberately rough edges and asymmetry creating authentic, human feel contrasting sterile perfection.",
    "Raw Aesthetic": "Unpolished, honest design approach showing structure and process rather than hiding technical details.",
    "Anti-Design Elements": "Purposeful breaking of traditional design rules creating memorable, provocative visual experiences.",
    "Giant Typography System": "Dramatically oversized text creating strong hierarchy, visual impact, and memorable first impressions.",
    "Custom Font Pairing": "Carefully selected complementary typefaces creating sophisticated, professional typography systems.",
    "Bold Visual Hierarchy": "Strong size and weight variations guiding attention and creating clear information prioritization.",
    "Minimal Graphics": "Restrained use of imagery and decoration focusing attention on content and maintaining fast performance.",
    "Depth Shadows": "Layered shadow effects creating floating appearances and clear visual hierarchy through simulated depth.",
    "iOS-inspired Design": "Apple-style aesthetics with rounded corners, subtle shadows, and premium feel familiar to mobile users.",
    "Premium Feel": "High-end visual polish through refined details, smooth interactions, and sophisticated design choices.",
    "Glassmorphism UI Kit": "Complete set of frosted-glass style components for cohesive modern interface design.",

    // Content Sections
    "Fullscreen Sections": "Full viewport-height sections creating immersive experiences and clear content separation.",
    "Hero CTA Section": "Prominent above-the-fold area combining headline, description, and call-to-action for maximum conversion.",
    "Product Features Grid": "Organized display of product capabilities and benefits in scannable, visually appealing format.",
    "Feature Comparison Table": "Side-by-side feature breakdown across tiers or products helping visitors make informed decisions.",
    "Portfolio Grid": "Gallery-style project showcase with filters and hover previews for presenting creative work professionally.",
    "Project Grid": "Organized case study or work display with consistent formatting and easy navigation.",
    "Case Study Layouts": "Detailed project presentation templates for showcasing work process, results, and learnings.",
    "Case Study Templates": "Pre-designed formats for in-depth project documentation with before/after, testimonials, and metrics.",
    "Case Study Pages": "Complete page layouts dedicated to individual project deep-dives with rich media and storytelling.",
    "Image Galleries": "Photo collection displays with various layout options and lightbox functionality for visual portfolios.",
    "Article Grid": "Blog post listing with featured images, excerpts, and metadata in magazine-style layout.",
    "Featured Articles": "Highlighted blog posts or content pieces given prominent visual treatment to drive engagement.",
    "Author Bio Section": "Writer profile area with photo, description, and social links building credibility and connection.",
    "Author Pages": "Dedicated pages for content creators showing their work, background, and contact information.",
    "Category Pages": "Content organized by topic with filtering and navigation for large content libraries.",
    "About Section": "Company or personal introduction area telling your story and building trust with visitors.",
    "Team Section": "Staff showcase with photos, roles, and bios presenting the people behind your business.",
    "Team Showcase": "Visual team directory highlighting expertise and personalities of your organization.",
    "Client Testimonials": "Social proof section displaying customer reviews and success stories for credibility.",
    "Client Logo Showcase": "Brand recognition grid displaying logos of companies you've worked with.",
    "Social Proof Display": "Metrics, reviews, and trust indicators that validate your credibility and quality.",
    "Service Pages": "Dedicated pages for each offering with details, pricing, and calls-to-action.",
    "Service Listings Grid": "Organized display of available services with descriptions and pricing for service businesses.",

    // E-commerce & Business
    "Pricing Tiers": "Clear pricing plan comparison helping visitors choose the right option for their needs.",
    "Product Screenshots": "High-quality product images and interface previews showing what customers will receive.",
    "Integration Showcases": "Display of compatible tools and services your product works with for ecosystem clarity.",
    "Trial Signup Flow": "Streamlined multi-step registration process optimized for converting visitors into trial users.",
    "Demo Request Form": "Lead capture form for scheduling product demonstrations with qualifying questions.",
    "ROI Calculator": "Interactive tool letting prospects estimate value and returns from using your product.",
    "Trust Badges": "Security certifications, awards, and guarantees displayed to build confidence and reduce purchase friction.",
    "Booking Calendar": "Date and time selection interface for scheduling appointments or reservations.",
    "User Review System": "Star ratings and written reviews from customers with filtering and sorting capabilities.",
    "Advanced Search & Filters": "Powerful filtering system letting visitors narrow down large inventories by multiple criteria.",
    "Vendor Dashboard": "Admin interface for service providers to manage listings, bookings, and customer interactions.",

    // Interactive Elements
    "Video Background Support": "Full-screen video backgrounds for high-impact visual storytelling and brand personality.",
    "Touch Gestures": "Mobile-optimized swipe, pinch, and tap interactions for intuitive smartphone and tablet navigation.",
    "Flexible Sections": "Modular content blocks easily reorderable and customizable without code changes.",
    "Contact CTA": "Strategically placed call-to-action prompts encouraging visitors to reach out at conversion-ready moments.",
    "Investor Deck Layout": "Presentation-style pages optimized for fundraising with metrics, traction, and vision slides.",
    "Resume/CV Page": "Professional work history and skills presentation formatted for career-focused portfolios.",
    "Ad Placement Zones": "Designated areas for advertising content without disrupting user experience or design flow.",
    "Reduced Eye Strain Design": "Carefully chosen colors and contrast ratios reducing fatigue during extended viewing sessions."
  },

  ru: {
    // Design & Layout
    "Minimal Design System": "Тщательно продуманная дизайн-система с акцентом на простоту и ясность. Включает согласованные отступы, типографику и использование цветов для чистого, профессионального вида.",
    "Dark Mode Toggle": "Переключатель темной темы с сохранением настроек между сессиями. Обеспечивает комфортный просмотр при слабом освещении.",
    "Premium Dark Theme": "Профессиональная темная цветовая палитра с тщательно сбалансированными контрастами и премиум-ощущением для изысканного представления бренда.",
    "Typography Hierarchy": "Структурированная система размеров и стилей текста, естественно направляющая читателей через контент с четкими визуальными связями.",
    "Mobile-First Layout": "Разработано в первую очередь для мобильных устройств, затем улучшено для больших экранов. Обеспечивает оптимальный опыт на смартфонах, где большинство пользователей просматривают сайты.",
    "Responsive Grid": "Гибкая система сетки, автоматически регулирующая колонки и отступы в зависимости от размера экрана для идеальных макетов везде.",
    "Bento Grid System": "Современный макет на основе карточек, вдохновленный японскими коробками бенто. Создает визуально интересные, организованные презентации контента.",
    "Asymmetric Layouts": "Динамичные, неравномерные макеты, нарушающие традиционные сетки для более увлекательного и запоминающегося визуального опыта.",
    "Magazine Layout": "Редакционный стиль дизайна, имитирующий печатные журналы с многоколоночными сетками, избранными изображениями и изысканной типографикой.",
    "Multi-column Grid": "Гибкая многоколоночная система для организации большого количества контента в читабельных, сканируемых форматах.",
    "Enterprise Layout": "Профессиональный B2B-дизайн, акцентирующий доверие, надежность и четкую информационную иерархию для бизнес-аудитории.",
    "Reading-Optimized Layout": "Текстовый дизайн с оптимальной длиной строк, отступами и типографикой специально для комфортного чтения длинных текстов.",

    // Visual Effects & Animations
    "Smooth Page Transitions": "Плавная анимация между сменой страниц, создающая бесшовный опыт просмотра без резких переходов.",
    "Smooth Transitions": "Отполированные анимации изменений UI-элементов, улучшающие юзабилити и обеспечивающие визуальную обратную связь на действия пользователя.",
    "Smooth 60fps Animations": "Оптимизированные по производительности анимации, работающие на 60 кадрах в секунду для шелковисто-плавных визуальных эффектов без задержек.",
    "Hover Animations": "Интерактивные визуальные отклики при наведении курсора на элементы, обеспечивающие четкую обратную связь и улучшенную интерактивность.",
    "Text Animations": "Динамические эффекты типографики, оживляющие текст через движение, добавляющие индивидуальность и привлекающие внимание к ключевым сообщениям.",
    "Animated Gradients": "Плавные, анимированные цветовые переходы, создающие динамичные, привлекающие внимание фоны и визуальный интерес.",
    "Parallax Scrolling": "Эффект создания глубины, где фоновые элементы двигаются медленнее переднего плана, добавляя размерность и визуальную вовлеченность.",
    "Glassmorphism Effects": "Внешний вид матового стекла с размытием фона, прозрачностью и тонкими тенями для современной, премиальной эстетики.",
    "Backdrop Blur Effects": "Эффект размытия фона, создающий глубину и фокус, сохраняя визуальный контекст нижележащего контента.",
    "Transparency Layers": "Многослойные полупрозрачные элементы, создающие глубину, иерархию и изысканную визуальную композицию.",

    // 3D & Advanced Graphics
    "Three.js Integration": "Интеграция мощной библиотеки 3D-графики, позволяющая создавать интерактивные 3D-модели, анимации и иммерсивные визуальные впечатления.",
    "3D Model Viewer": "Интерактивное отображение 3D-объектов, позволяющее пользователям вращать, увеличивать и исследовать продукты или дизайны со всех сторон.",
    "WebGL Effects": "Аппаратно-ускоренная графика для потрясающих визуальных эффектов, плавных анимаций и высокопроизводительных интерактивных элементов.",
    "Interactive 3D Elements": "Контролируемые пользователем 3D-объекты, реагирующие на движения мыши, прокрутку или касания для увлекательных впечатлений.",
    "Mobile Optimized 3D": "Эффективно отрисованная 3D-графика, оптимизированная для мобильных устройств, балансирующая визуальное качество с производительностью и временем работы от батареи.",

    // UI Components & Features
    "Card Components": "Гибкие, автономные контейнеры контента для организации информации в сканируемых, привлекательных форматах.",
    "Gallery Lightbox": "Полноэкранный просмотрщик изображений с увеличением, навигацией и плавными переходами для профессионального showcasing визуальных работ.",
    "Contact Form Integration": "Готовая, стилизованная контактная форма для подключения к вашей электронной почте или бэкенд-сервису для сбора лидов.",
    "Contact Form": "Профессионально оформленная форма для запросов посетителей с валидацией и удобными сообщениями об ошибках.",
    "FAQ Section": "Раздел вопросов-ответов со сворачиванием, помогающий посетителям быстро находить информацию без захламления страницы.",
    "Newsletter Signup": "Форма сбора электронной почты, поощряющая посетителей подписаться на обновления, оптимизированная для конверсии.",
    "Comment Integration": "Встроенная структура системы комментариев, готовая к интеграции с сервисами типа Disqus или пользовательскими решениями.",
    "Social Sharing": "Кнопки обмена для популярных социальных платформ, упрощающие посетителям распространение вашего контента.",

    // Technical & Performance
    "Fast Loading": "Оптимизированная доставка ресурсов и разделение кода, обеспечивающие быструю загрузку страниц даже на медленных соединениях.",
    "Code Syntax Highlighting": "Профессионально стилизованные блоки кода с цветовым выделением синтаксиса для технического контента и документации.",
    "Analytics Integration": "Готовая к использованию структура для Google Analytics, Plausible или других аналитических платформ для отслеживания поведения посетителей.",
    "Payment Integration Ready": "Предварительно структурированный платежный поток и страницы оформления заказа, готовые к подключению Stripe, PayPal или других процессоров.",

    // Styling & Design Systems
    "Bold Border System": "Толстые, заметные границы, создающие сильное визуальное разделение и современную, брутали��т-вдохновленную эстетику.",
    "High Contrast Colors": "Нарочито контрастные цветовые комбинации, обеспечивающие максимальную читабельность и смелый визуальный эффект.",
    "Neon Accent Colors": "Яркие, живые акцентные цвета, создающие энергию, современность и привлекающие внимание к ключевым элементам.",
    "Brutalist Typography": "Грубые, смелые шрифты с намеренными несовершенствами для аутентичной, антиистеблишментской дизайнерской эстетики.",
    "Intentional Imperfection": "Намеренно грубые края и асимметрия, создающие аутентичное, человеческое ощущение, контрастирующее со стерильным совершенством.",
    "Raw Aesthetic": "Неотполированный, честный подход к дизайну, показывающий структуру и процесс, а не скрывающий технические детали.",
    "Anti-Design Elements": "Намеренное нарушение традиционных правил дизайна, создающее запоминающиеся, провокационные визуальные впечатления.",
    "Giant Typography System": "Драматически увеличенный текст, создающий сильную иерархию, визуальный эффект и запоминающиеся первые впечатления.",
    "Custom Font Pairing": "Тщательно подобранные дополняющие друг друга шрифты, создающие изысканные, профессиональные типографские системы.",
    "Bold Visual Hierarchy": "Сильные вариации размеров и веса, направляющие внимание и создающие четкую приоритизацию информации.",
    "Minimal Graphics": "Сдержанное использование изображений и декора, фокусирующее внимание на контенте и поддерживающее быструю производительность.",
    "Depth Shadows": "Многослойные эффекты теней, создающие плавающий вид и четкую визуальную иерархию через имитацию глубины.",
    "iOS-inspired Design": "Эстетика в стиле Apple с закругленными углами, тонкими тенями и премиум-ощущением, знакомым мобильным пользователям.",
    "Premium Feel": "Высококлассная визуальная полировка через изысканные детали, плавные взаимодействия и изысканные дизайнерские решения.",
    "Glassmorphism UI Kit": "Полный набор компонентов в стиле матового стекла для единообразного современного дизайна интерфейса.",

    // Content Sections
    "Fullscreen Sections": "Секции на всю высоту viewport, создающие иммерсивные впечатления и четкое разделение контента.",
    "Hero CTA Section": "Заметная область над сгибом, сочетающая заголовок, описание и призыв к действию для максимальной конверсии.",
    "Product Features Grid": "Организованное отображение возможностей и преимуществ продукта в сканируемом, визуально привлекательном формате.",
    "Feature Comparison Table": "Сравнение функций между тарифами или продуктами, помогающее посетителям принимать обоснованные решения.",
    "Portfolio Grid": "Галерейная витрина проектов с фильтрами и превью при наведении для профессионального представления творческих работ.",
    "Project Grid": "Организованное отображение кейс-стади или работ с единообразным форматированием и легкой навигацией.",
    "Case Study Layouts": "Шаблоны детального представления проектов для демонстрации процесса работы, результатов и выводов.",
    "Case Study Templates": "Предварительно разработанные форматы для углубленной документации проектов с до/после, отзывами и метриками.",
    "Case Study Pages": "Полные макеты страниц, посвященные глубокому погружению в отдельные проекты с богатым медиа и сторителлингом.",
    "Image Galleries": "Отображение коллекций фотографий с различными вариантами макетов и функциональностью lightbox для визуальных портфолио.",
    "Article Grid": "Список постов блога с избранными изображениями, выдержками и метаданными в журнальном стиле.",
    "Featured Articles": "Выделенные посты блога или контент, получающие заметную визуальную обработку для повышения вовлеченности.",
    "Author Bio Section": "Область профиля автора с фотографией, описанием и ссылками на соцсети, строящая доверие и связь.",
    "Author Pages": "Специальные страницы для создателей контента, показывающие их работу, бэкграунд и контактную информацию.",
    "Category Pages": "Контент, организованный по темам с фильтрацией и навигацией для больших библиотек контента.",
    "About Section": "Область представления компании или личности, рассказывающая вашу историю и строящая доверие с посетителями.",
    "Team Section": "Витрина команды с фотографиями, ролями и биографиями, представляющая людей за вашим бизнесом.",
    "Team Showcase": "Визуальный каталог команды, подчеркивающий экспертизу и личности вашей организации.",
    "Client Testimonials": "Раздел социального доказательства, отображающий отзывы клиентов и истории успеха для доверия.",
    "Client Logo Showcase": "Сетка узнавания бренда, отображающая логотипы компаний, с которыми вы работали.",
    "Social Proof Display": "Метрики, отзывы и индикаторы доверия, подтверждающие вашу надежность и качество.",
    "Service Pages": "Специальные страницы для каждого предложения с деталями, ценами и призывами к действию.",
    "Service Listings Grid": "Организованное отображение доступных услуг с описаниями и ценами для сервисных бизнесов.",

    // E-commerce & Business
    "Pricing Tiers": "Четкое сравнение тарифных планов, помогающее посетителям выбрать правильный вариант для своих нужд.",
    "Product Screenshots": "Высококачественные изображения продукта и превью интерфейса, показывающие, что получат клиенты.",
    "Integration Showcases": "Отображение совместимых инструментов и сервисов, с которыми работает ваш продукт, для ясности экосистемы.",
    "Trial Signup Flow": "Упрощенный многоэтапный процесс регистрации, оптимизированный для конвертации посетителей в пробных пользователей.",
    "Demo Request Form": "Форма захвата лидов для планирования демонстраций продукта с квалифицирующими вопросами.",
    "ROI Calculator": "Интерактивный инструмент, позволяющий потенциальным клиентам оценить ценность и отдачу от использования вашего продукта.",
    "Trust Badges": "Сертификаты безопасности, награды и гарантии, отображаемые для построения уверенности и снижения трений при покупке.",
    "Booking Calendar": "Интерфейс выбора даты и времени для планирования встреч или бронирований.",
    "User Review System": "Звездные рейтинги и письменные отзывы от клиентов с возможностями фильтрации и сортировки.",
    "Advanced Search & Filters": "Мощная система фильтрации, позволяющая посетителям сужать большие инвентари по множественным критериям.",
    "Vendor Dashboard": "Административный интерфейс для поставщиков услуг для управления листингами, бронированиями и взаимодействием с клиентами.",

    // Interactive Elements
    "Video Background Support": "Полноэкранные видео-фоны для визуального сторителлинга с сильным эффектом и индивидуальности бренда.",
    "Touch Gestures": "Оптимизированные для мобильных устройств свайпы, пинчи и тапы для интуитивной навигации на смартфонах и планшетах.",
    "Flexible Sections": "Модульные контентные блоки, легко переупорядочиваемые и настраиваемые без изменений кода.",
    "Contact CTA": "Стратегически размещенные призывы к действию, поощряющие посетителей обратиться в моменты готовности к конверсии.",
    "Investor Deck Layout": "Страницы в презентационном стиле, оптимизированные для фандрайзинга с метриками, тракцией и слайдами видения.",
    "Resume/CV Page": "Профессиональное представление рабочей истории и навыков, отформатированное для портфолио с карьерным фокусом.",
    "Ad Placement Zones": "Выделенные области для рекламного контента без нарушения пользовательского опыта или потока дизайна.",
    "Reduced Eye Strain Design": "Тщательно подобранные цвета и коэффициенты контраста, снижающие усталость при продолжительном просмотре."
  }
};

console.log('📝 Reading translations.json...');
const translationsPath = path.join(__dirname, '../lib/translations.json');
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

console.log('✨ Adding new feature explanations...');

// Add new explanations to English
Object.assign(translations.en.featureExplanations, newExplanations.en);

// Add new explanations to Russian
Object.assign(translations.ru.featureExplanations, newExplanations.ru);

// Remove unused explanations
const unusedEN = ["Free Builder Access", "Professional Code", "TypeScript Support", "Tailwind CSS", "Framer Motion", "Production Ready"];
const unusedRU = ["Бесплатный доступ к билдеру", "Профессиональный код", "Поддержка TypeScript", "Tailwind CSS", "Framer Motion", "Готовность к продакшену"];

console.log('🧹 Removing unused explanations...');
unusedEN.forEach(key => delete translations.en.featureExplanations[key]);
unusedRU.forEach(key => delete translations.ru.featureExplanations[key]);

console.log('💾 Writing updated translations...');
fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2));

console.log('\n✅ Complete!');
console.log(`   Added ${Object.keys(newExplanations.en).length} English explanations`);
console.log(`   Added ${Object.keys(newExplanations.ru).length} Russian explanations`);
console.log(`   Removed ${unusedEN.length} unused English explanations`);
console.log(`   Removed ${unusedRU.length} unused Russian explanations`);
console.log('\n📊 Run the analysis script again to verify all features have explanations.\n');
