"use client";

import { Suspense } from "react";
import { TemplateGallery } from "@/components/template-gallery";
import { ErrorBoundary } from "@/components/error-boundary";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { MobileBottomNav } from "@/components/shared/mobile-bottom-nav";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FiGrid, FiZap, FiLayers, FiCode, FiTrendingUp, FiCheck, FiMail, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import Link from "next/link";
import { HowItWorksModal } from "@/components/how-it-works-modal";
import { HelpCenter } from "@/components/help-center";
import { OnboardingTour, TourStep } from "@/components/onboarding-tour";

function HowItWorksModalWrapper() {
  const { language } = useI18n();
  return <HowItWorksModal language={language} />;
}

export default function Home() {
  const { t, language } = useI18n();

  // Onboarding tour steps
  const tourSteps: TourStep[] = [
    {
      title: "Welcome to Portfolio Builder!",
      titleRu: "Добро пожаловать в Portfolio Builder!",
      content: "Create professional portfolio websites in minutes. Let's take a quick tour to show you around!",
      contentRu: "Создавайте профессиональные портфолио за минуты. Давайте быстро покажем вам основные возможности!",
      position: "center",
    },
    {
      target: "#templates",
      title: "Browse Templates",
      titleRu: "Просмотр шаблонов",
      content: "Explore our collection of 39+ professional templates. Filter by category or search for specific features.",
      contentRu: "Изучите нашу коллекцию из 39+ профессиональных шаблонов. Фильтруйте по категориям или ищите конкретные функции.",
      position: "top",
    },
    {
      target: ".category-menu-button",
      title: "Filter by Category",
      titleRu: "Фильтр по категориям",
      content: "Use categories to quickly find templates for your specific industry: Online Business, Services, Products, and more.",
      contentRu: "Используйте категории для быстрого поиска шаблонов для вашей отрасли: Онлайн-бизнес, Услуги, Продукты и другие.",
      position: "bottom",
    },
    {
      target: "input[type='text']",
      title: "Smart Search",
      titleRu: "Умный поиск",
      content: "Search templates by name, description, features, or tags. The search is instant and very powerful!",
      contentRu: "Ищите шаблоны по названию, описанию, функциям или тегам. Поиск мгновенный и очень мощный!",
      position: "bottom",
    },
    {
      title: "Start Building!",
      titleRu: "Начните создавать!",
      content: "Click on any template to customize it with our drag-and-drop builder. No coding required!",
      contentRu: "Нажмите на любой шаблон, чтобы настроить его с помощью нашего конструктора drag-and-drop. Программирование не требуется!",
      position: "center",
    },
  ];

  const stats = [
    { value: "39+", label: t.homepage.stats.templates },
    { value: "9", label: t.homepage.stats.categories },
    { value: "100%", label: t.homepage.stats.responsive },
    { value: "Free", label: t.homepage.stats.openSource }
  ];

  const features = [
    {
      icon: <FiZap className="w-6 h-6" />,
      title: t.homepage.features.fast.title,
      description: t.homepage.features.fast.description
    },
    {
      icon: <FiLayers className="w-6 h-6" />,
      title: t.homepage.features.modern.title,
      description: t.homepage.features.modern.description
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      title: t.homepage.features.production.title,
      description: t.homepage.features.production.description
    },
    {
      icon: <FiGrid className="w-6 h-6" />,
      title: t.homepage.features.responsive.title,
      description: t.homepage.features.responsive.description
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: t.homepage.features.seo.title,
      description: t.homepage.features.seo.description
    },
    {
      icon: <FiCheck className="w-6 h-6" />,
      title: t.homepage.features.customize.title,
      description: t.homepage.features.customize.description
    }
  ];

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <Header />

      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden">
        {/* Optimized Background Image - Local */}
        <picture className="absolute inset-0">
          <source srcSet="/hero-bg.webp" type="image/webp" />
          <img
            src="/hero-bg.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/70 to-pink-900/70 dark:from-blue-950/80 dark:via-purple-950/80 dark:to-pink-950/80" />

        <div className="relative container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 text-blue-100 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4"
            >
              <FiZap className="w-3.5 h-3.5" />
              {t.homepage.hero.badge}
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight text-white">
              {t.homepage.hero.title}{" "}
              <span className="text-blue-300">
                {t.homepage.hero.titleGradient}
              </span>
              {" "}{t.homepage.hero.titleEnd}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
              {t.homepage.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4 sm:mb-6 px-4">
              <Button size="lg" className="text-base px-6 py-6 h-auto min-h-[48px] touch-manipulation shadow-lg hover:shadow-xl" asChild>
                <a href="#templates">
                  {t.homepage.hero.ctaExplore}
                  <FiGrid className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-6 py-6 h-auto min-h-[48px] touch-manipulation" asChild>
                <a href="#contact">
                  {t.homepage.hero.ctaDemo}
                  <FiMail className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>

            {/* How It Works Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mb-8 sm:mb-10 px-4"
            >
              <HowItWorksModalWrapper />
            </motion.div>

            {/* Stats - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto px-4"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-300 mb-0.5 sm:mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/70 font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Visual Flow Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 px-2">
              {language === 'en' ? 'How It ' : 'Как это '}
              <span className="text-blue-600 dark:text-blue-400">
                {language === 'en' ? 'Works' : 'работает'}
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-2">
              {language === 'en'
                ? 'Create your professional portfolio website in 4 simple steps'
                : 'Создайте свой профессиональный портфолио за 4 простых шага'}
            </p>
          </motion.div>

          {/* Visual Workflow */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-blue-200 dark:border-blue-800">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    1
                  </div>
                  {/* Icon */}
                  <div className="text-6xl mb-4 text-center">🎨</div>
                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 text-center">
                    {language === 'en' ? 'Browse Templates' : 'Выберите шаблон'}
                  </h3>
                  {/* Description */}
                  <p className="text-sm text-foreground/70 text-center">
                    {language === 'en'
                      ? 'Explore 39+ professional templates for various industries'
                      : 'Изучите 39+ профессиональных шаблонов для разных отраслей'}
                  </p>
                </div>
                {/* Arrow (Desktop only) */}
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-blue-400 text-4xl z-10">
                  →
                </div>
              </motion.div>

              {/* Step 2 - REDESIGNED WITH VISUAL EXAMPLE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-purple-200 dark:border-purple-800">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    2
                  </div>

                  {/* Title (Simplified) */}
                  <h3 className="text-lg font-bold mb-3 text-center">
                    {language === 'en' ? 'Arrange Your Sections' : 'Расставьте секции'}
                  </h3>

                  {/* Visual Mini-Diagram */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      {/* BEFORE */}
                      <div className="flex flex-col gap-1.5 sm:gap-2">
                        <div className="text-[10px] font-semibold text-center text-purple-600 dark:text-purple-400 mb-1">
                          {language === 'en' ? 'Before' : 'До'}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 bg-white dark:bg-gray-700 rounded px-1.5 sm:px-2 py-1 sm:py-1.5 text-[9px] sm:text-[10px] shadow-sm">
                          <span className="text-gray-400">⋮⋮</span>
                          <span className="font-medium">Hero</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 bg-white dark:bg-gray-700 rounded px-1.5 sm:px-2 py-1 sm:py-1.5 text-[9px] sm:text-[10px] shadow-sm">
                          <span className="text-gray-400">⋮⋮</span>
                          <span className="font-medium">{language === 'en' ? 'About' : 'О нас'}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded px-1.5 sm:px-2 py-1 sm:py-1.5 text-[9px] sm:text-[10px] shadow-sm border-2 border-yellow-400">
                          <span className="text-gray-400">⋮⋮</span>
                          <span className="font-medium">{language === 'en' ? 'Pricing' : 'Цены'}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 bg-white dark:bg-gray-700 rounded px-1.5 sm:px-2 py-1 sm:py-1.5 text-[9px] sm:text-[10px] shadow-sm">
                          <span className="text-gray-400">⋮⋮</span>
                          <span className="font-medium">FAQ</span>
                        </div>
                      </div>

                      {/* ARROW */}
                      <div className="text-xl sm:text-2xl text-purple-500 font-bold">→</div>

                      {/* AFTER */}
                      <div className="flex flex-col gap-1.5 sm:gap-2">
                        <div className="text-[10px] font-semibold text-center text-purple-600 dark:text-purple-400 mb-1">
                          {language === 'en' ? 'After' : 'После'}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 bg-white dark:bg-gray-700 rounded px-1.5 sm:px-2 py-1 sm:py-1.5 text-[9px] sm:text-[10px] shadow-sm">
                          <span className="text-gray-400">⋮⋮</span>
                          <span className="font-medium">Hero</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 bg-green-100 dark:bg-green-900/30 rounded px-1.5 sm:px-2 py-1 sm:py-1.5 text-[9px] sm:text-[10px] shadow-sm border-2 border-green-400">
                          <span className="text-gray-400">⋮⋮</span>
                          <span className="font-medium">{language === 'en' ? 'Pricing' : 'Цены'}</span>
                          <span className="text-green-600 text-sm">⬆</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 bg-white dark:bg-gray-700 rounded px-1.5 sm:px-2 py-1 sm:py-1.5 text-[9px] sm:text-[10px] shadow-sm">
                          <span className="text-gray-400">⋮⋮</span>
                          <span className="font-medium">{language === 'en' ? 'About' : 'О нас'}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 bg-white dark:bg-gray-700 rounded px-1.5 sm:px-2 py-1 sm:py-1.5 text-[9px] sm:text-[10px] shadow-sm">
                          <span className="text-gray-400">⋮⋮</span>
                          <span className="font-medium">FAQ</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Simple Description */}
                  <p className="text-xs sm:text-sm text-foreground/70 text-center leading-relaxed">
                    {language === 'en'
                      ? 'Drag sections up & down. Put pricing after hero, FAQ at bottom - your choice!'
                      : 'Перетаскивайте секции вверх и вниз. Цены после hero, FAQ внизу - ваш выбор!'}
                  </p>
                </div>
                {/* Arrow (Desktop only) */}
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-purple-400 text-4xl z-10">
                  →
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-pink-200 dark:border-pink-800">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    3
                  </div>
                  {/* Icon */}
                  <div className="text-6xl mb-4 text-center">📱</div>
                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 text-center">
                    {language === 'en' ? 'Send via Telegram' : 'Отправьте в Telegram'}
                  </h3>
                  {/* Description */}
                  <p className="text-sm text-foreground/70 text-center">
                    {language === 'en'
                      ? 'Save your design and send it to us via Telegram - simple and instant'
                      : 'Сохраните дизайн и отправьте нам через Telegram - просто и мгновенно'}
                  </p>
                </div>
                {/* Arrow (Desktop only) */}
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-pink-400 text-4xl z-10">
                  →
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-green-200 dark:border-green-800">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    4
                  </div>
                  {/* Icon */}
                  <div className="text-6xl mb-4 text-center">🚀</div>
                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 text-center">
                    {language === 'en' ? 'Get Your Site ASAP' : 'Получите сайт быстро'}
                  </h3>
                  {/* Description */}
                  <p className="text-sm text-foreground/70 text-center">
                    {language === 'en'
                      ? 'We build your professional site based on your design and deliver it ready to launch'
                      : 'Мы создадим профессиональный сайт по вашему дизайну и доставим готовым к запуску'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Detailed Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border-2 border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'en' ? 'What does "Build Your Flow" mean?' : 'Что значит "Создайте структуру"?'}
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    {language === 'en'
                      ? 'In the builder, you don\'t write code - you decide the structure of your website:'
                      : 'В конструкторе вы не пишете код - вы определяете структуру вашего сайта:'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">📍</span>
                      <div>
                        <strong>{language === 'en' ? 'Reorder sections:' : 'Переставьте секции:'}</strong>
                        <p className="text-foreground/60">
                          {language === 'en'
                            ? 'Want pricing after hero? Or FAQ at the end? You decide!'
                            : 'Хотите цены после hero? Или FAQ в конце? Вы решаете!'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">➕</span>
                      <div>
                        <strong>{language === 'en' ? 'Add/Remove:' : 'Добавить/Удалить:'}</strong>
                        <p className="text-foreground/60">
                          {language === 'en'
                            ? 'Need testimonials? Gallery? Skills section? Add them!'
                            : 'Нужны отзывы? Галерея? Секция навыков? Добавьте их!'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🎯</span>
                      <div>
                        <strong>{language === 'en' ? 'Your order:' : 'Ваш порядок:'}</strong>
                        <p className="text-foreground/60">
                          {language === 'en'
                            ? 'Hero → About → Pricing → FAQ or Hero → Pricing → Gallery → Contact'
                            : 'Hero → О нас → Цены → FAQ или Hero → Цены → Галерея → Контакты'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🎨</span>
                      <div>
                        <strong>{language === 'en' ? 'We handle:' : 'Мы обработаем:'}</strong>
                        <p className="text-foreground/60">
                          {language === 'en'
                            ? 'Design, code, optimization - you just decide the flow!'
                            : 'Дизайн, код, оптимизацию - вы просто определяете структуру!'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mt-10"
            >
              <Button size="lg" className="text-base px-8 py-6 h-auto shadow-xl hover:shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                <a href="#templates">
                  {language === 'en' ? 'Start Building Now' : 'Начать создавать'}
                  <FiZap className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Templates Gallery - Moved Up */}
      <section id="templates" className="py-8 sm:py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1600px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 px-2">
              {t.homepage.gallery.title}{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {t.homepage.gallery.titleGradient}
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-2">
              {t.homepage.gallery.subtitle}
            </p>
          </motion.div>

          <ErrorBoundary>
            <Suspense fallback={
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-foreground/70">Loading templates...</p>
              </div>
            }>
              <TemplateGallery />
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>

      {/* Features Section - Moved Down */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 px-2">
              {t.homepage.features.title}{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {t.homepage.features.titleGradient}
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-2">
              {t.homepage.features.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group p-5 sm:p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{feature.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
              Let's Work{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Together
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground/70 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
              Have a project in mind? I'm always open to discussing new opportunities, creative ideas, or partnership possibilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 sm:mb-10 px-4">
              <Button size="lg" className="text-base px-6 py-6 h-auto min-h-[48px] touch-manipulation group shadow-lg hover:shadow-xl" asChild>
                <a href="mailto:345287biz@gmail.com">
                  <FiMail className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  Send Email
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-6 py-6 h-auto min-h-[48px] touch-manipulation opacity-50 cursor-not-allowed"
                disabled
              >
                <FiGithub className="mr-2 w-4 h-4" />
                GitHub (Coming Soon)
              </Button>
            </div>

            <div className="flex justify-center gap-3 sm:gap-4">
              <motion.button
                disabled
                className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-card border flex items-center justify-center opacity-50 cursor-not-allowed touch-manipulation"
                aria-label="LinkedIn (Coming Soon)"
                title="LinkedIn profile coming soon"
              >
                <FiLinkedin className="w-5 h-5" />
              </motion.button>
              <motion.button
                disabled
                className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-card border flex items-center justify-center opacity-50 cursor-not-allowed touch-manipulation"
                aria-label="Twitter (Coming Soon)"
                title="Twitter profile coming soon"
              >
                <FiTwitter className="w-5 h-5" />
              </motion.button>
              <motion.button
                disabled
                className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-card border flex items-center justify-center opacity-50 cursor-not-allowed touch-manipulation"
                aria-label="GitHub (Coming Soon)"
                title="GitHub profile coming soon"
              >
                <FiGithub className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
      <ScrollToTop />

      {/* Help Center - Floating Button */}
      <HelpCenter language={language} />

      {/* Onboarding Tour */}
      <OnboardingTour
        steps={tourSteps}
        tourKey="homepage-tour"
        language={language}
        autoStart={true}
        showProgress={true}
      />
    </main>
  );
}
