"use client";

import { Suspense, useState, useEffect } from "react";
import { TemplateGallery } from "@/components/template-gallery";
import { ErrorBoundary } from "@/components/error-boundary";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { MobileBottomNav } from "@/components/shared/mobile-bottom-nav";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FiGrid, FiZap, FiLayers, FiCode, FiTrendingUp, FiCheck, FiMail, FiGithub, FiLinkedin, FiTwitter, FiChevronDown, FiChevronUp, FiFolder } from "react-icons/fi";
import Link from "next/link";
import { HowItWorksModal } from "@/components/how-it-works-modal";

function HowItWorksModalWrapper() {
  const { language } = useI18n();
  return <HowItWorksModal language={language} />;
}

export default function Home() {
  const { t, language } = useI18n();
  const [isHowItWorksExpanded, setIsHowItWorksExpanded] = useState(true);

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('howItWorksExpanded');
    if (saved !== null) {
      setIsHowItWorksExpanded(saved === 'true');
    }
  }, []);

  // Save state to localStorage
  const toggleHowItWorks = () => {
    const newState = !isHowItWorksExpanded;
    setIsHowItWorksExpanded(newState);
    localStorage.setItem('howItWorksExpanded', String(newState));
  };

  const stats = [
    { value: "39+", label: t.homepage.stats.templates, icon: <FiLayers className="w-6 h-6 sm:w-8 sm:h-8" /> },
    { value: "9", label: t.homepage.stats.categories, icon: <FiFolder className="w-6 h-6 sm:w-8 sm:h-8" /> },
    { value: "100%", label: t.homepage.stats.responsive, icon: <FiCheck className="w-6 h-6 sm:w-8 sm:h-8" /> },
    { value: "Free", label: t.homepage.stats.openSource, icon: <FiZap className="w-6 h-6 sm:w-8 sm:h-8" /> }
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

      {/* Hero Section - Ultra Minimal */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,transparent,black)]" />

        <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              <span className="text-blue-600 dark:text-blue-400">
                {language === 'en' ? 'Professional' : 'Профессиональные'}
              </span>
              <br />
              <span className="text-slate-900 dark:text-slate-100">
                {language === 'en' ? 'Portfolio Templates' : 'Шаблоны Портфолио'}
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'Even in the era of AI, we believe a human must review every detail.'
                : 'Даже в эпоху ИИ мы верим, что человек должен проверить каждую деталь.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Visual Flow Section */}
      <section id="how-it-works" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-2">
                {language === 'en' ? 'How It ' : 'Как это '}
                <span className="text-blue-600 dark:text-blue-400">
                  {language === 'en' ? 'Works' : 'работает'}
                </span>
              </h2>
              <button
                onClick={toggleHowItWorks}
                className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                aria-label={isHowItWorksExpanded ? (language === 'en' ? 'Minimize section' : 'Свернуть раздел') : (language === 'en' ? 'Expand section' : 'Развернуть раздел')}
              >
                {isHowItWorksExpanded ? (
                  <FiChevronUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                ) : (
                  <FiChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-2">
              {language === 'en'
                ? 'Get your professional portfolio website in 5 simple steps'
                : 'Получите свой профессиональный сайт-портфолио за 5 простых шагов'}
            </p>
          </motion.div>

          {/* Visual Workflow - Collapsible */}
          <AnimatePresence>
            {isHowItWorksExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto overflow-visible px-4"
              >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-4">
              {/* Step 1: Browse Templates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-blue-200 dark:border-blue-800 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    1
                  </div>
                  {/* Icon */}
                  <div className="text-5xl mb-3 text-center">🎨</div>
                  {/* Title */}
                  <h3 className="text-base font-bold mb-2 text-center">
                    {language === 'en' ? 'Browse Templates' : 'Выберите шаблон'}
                  </h3>
                  {/* Description */}
                  <p className="text-xs text-foreground/70 text-center leading-relaxed">
                    {language === 'en'
                      ? 'Explore 39+ templates for various industries'
                      : 'Изучите 39+ шаблонов для разных отраслей'}
                  </p>
                </div>
                {/* Arrow (Desktop only) */}
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-blue-400 text-2xl z-10">
                  →
                </div>
              </motion.div>

              {/* Step 2: View Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-purple-200 dark:border-purple-800 h-full">
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    2
                  </div>
                  <div className="text-5xl mb-3 text-center">👁️</div>
                  <h3 className="text-base font-bold mb-2 text-center">
                    {language === 'en' ? 'View Details' : 'Просмотрите детали'}
                  </h3>
                  <p className="text-xs text-foreground/70 text-center leading-relaxed">
                    {language === 'en'
                      ? 'See features, screenshots, and pricing'
                      : 'Посмотрите функции, скриншоты и цены'}
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-purple-400 text-2xl z-10">
                  →
                </div>
              </motion.div>

              {/* Step 3: Checkout & Pay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-pink-200 dark:border-pink-800 h-full">
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    3
                  </div>
                  <div className="text-5xl mb-3 text-center">💳</div>
                  <h3 className="text-base font-bold mb-2 text-center">
                    {language === 'en' ? 'Checkout & Pay' : 'Оформите и оплатите'}
                  </h3>
                  <p className="text-xs text-foreground/70 text-center leading-relaxed">
                    {language === 'en'
                      ? 'Buy template + add Content Maker (optional)'
                      : 'Купите шаблон + добавьте Content Maker (опция)'}
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-pink-400 text-2xl z-10">
                  →
                </div>
              </motion.div>

              {/* Step 4: Download */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-orange-200 dark:border-orange-800 h-full">
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    4
                  </div>
                  <div className="text-5xl mb-3 text-center">📥</div>
                  <h3 className="text-base font-bold mb-2 text-center">
                    {language === 'en' ? 'Download Files' : 'Скачайте файлы'}
                  </h3>
                  <p className="text-xs text-foreground/70 text-center leading-relaxed">
                    {language === 'en'
                      ? 'Get template files instantly after payment'
                      : 'Получите файлы шаблона сразу после оплаты'}
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-orange-400 text-2xl z-10">
                  →
                </div>
              </motion.div>

              {/* Step 5: Get Site Live */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-green-200 dark:border-green-800 h-full">
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    5
                  </div>
                  <div className="text-5xl mb-3 text-center">🚀</div>
                  <h3 className="text-base font-bold mb-2 text-center">
                    {language === 'en' ? 'Get Site Live' : 'Запустите сайт'}
                  </h3>
                  <p className="text-xs text-foreground/70 text-center leading-relaxed">
                    {language === 'en'
                      ? 'Add hosting, domain, installation services'
                      : 'Добавьте хостинг, домен, услуги установки'}
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
              className="mt-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border-2 border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'en' ? 'Fast & Complete Solution' : 'Быстрое и полное решение'}
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    {language === 'en'
                      ? 'Get your professional website live in minutes with our marketplace approach:'
                      : 'Запустите свой профессиональный сайт за минуты с нашим маркетплейс подходом:'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">⚡</span>
                      <div>
                        <strong>{language === 'en' ? 'Instant Download:' : 'Мгновенная загрузка:'}</strong>
                        <p className="text-foreground/60">
                          {language === 'en'
                            ? 'Get template files immediately after purchase'
                            : 'Получите файлы шаблона сразу после покупки'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🛠️</span>
                      <div>
                        <strong>{language === 'en' ? 'Optional Services:' : 'Дополнительные услуги:'}</strong>
                        <p className="text-foreground/60">
                          {language === 'en'
                            ? 'Add hosting, domain, installation, or branding'
                            : 'Добавьте хостинг, домен, установку или брендинг'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🎨</span>
                      <div>
                        <strong>{language === 'en' ? 'Advanced Builder:' : 'Расширенный конструктор:'}</strong>
                        <p className="text-foreground/60">
                          {language === 'en'
                            ? 'Optional tool for advanced users to customize layout'
                            : 'Опциональный инструмент для продвинутых пользователей'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">✅</span>
                      <div>
                        <strong>{language === 'en' ? 'Ready to Use:' : 'Готово к использованию:'}</strong>
                        <p className="text-foreground/60">
                          {language === 'en'
                            ? 'All templates are production-ready and optimized'
                            : 'Все шаблоны готовы к работе и оптимизированы'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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
              {language === 'en' ? 'Browse ' : 'Просмотрите '}
              <span className="text-blue-600 dark:text-blue-400">
                {language === 'en' ? 'All Templates' : 'все шаблоны'}
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-2">
              {language === 'en'
                ? 'Filter by category, style, and features to find the perfect template for your needs'
                : 'Фильтруйте по категории, стилю и функциям, чтобы найти идеальный шаблон'}
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

    </main>
  );
}
