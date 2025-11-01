"use client";

import { Suspense } from "react";
import { TemplateGallery } from "@/components/template-gallery";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { MobileBottomNav } from "@/components/shared/mobile-bottom-nav";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FiGrid, FiZap, FiLayers, FiCode, FiTrendingUp, FiCheck, FiMail, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import Link from "next/link";

export default function Home() {
  const { t } = useI18n();

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
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

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
              className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4"
            >
              <FiZap className="w-3.5 h-3.5" />
              {t.homepage.hero.badge}
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
              {t.homepage.hero.title}{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {t.homepage.hero.titleGradient}
              </span>
              {" "}{t.homepage.hero.titleEnd}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
              {t.homepage.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 sm:mb-10 px-4">
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

            {/* Stats - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto px-4"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-0.5 sm:mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-foreground/60 font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
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

          <Suspense fallback={<div className="text-center py-8">Loading templates...</div>}>
            <TemplateGallery />
          </Suspense>
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
              <Button size="lg" variant="outline" className="text-base px-6 py-6 h-auto min-h-[48px] touch-manipulation" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <FiGithub className="mr-2 w-4 h-4" />
                  View GitHub
                </a>
              </Button>
            </div>

            <div className="flex justify-center gap-3 sm:gap-4">
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-card border flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors touch-manipulation"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-card border flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors touch-manipulation"
                aria-label="Twitter"
              >
                <FiTwitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-card border flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors touch-manipulation"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </motion.a>
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
