"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Search, Eye, Layout, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HowItWorksModalProps {
  language?: 'en' | 'ru';
}

export function HowItWorksModal({ language = 'en' }: HowItWorksModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    en: {
      buttonText: "How It Works?",
      modalTitle: "How It Works",
      subtitle: "Your journey from idea to professional website in 3 simple steps",
      steps: [
        {
          number: "01",
          title: "Browse & Filter Templates",
          description: "Explore our curated collection of 39+ professional templates. Filter by category, style, or purpose to find the perfect match for your project.",
          icon: <Search className="w-8 h-8" />,
          action: "Filter templates by category",
        },
        {
          number: "02",
          title: "Preview & Customize",
          description: "View live demos of templates. See how they look and feel. Choose your favorite and click 'Build' to start customizing every detail.",
          icon: <Eye className="w-8 h-8" />,
          action: "View demo and start building",
        },
        {
          number: "03",
          title: "Design Your Flow",
          description: "Use our intuitive builder to customize sections, add content, and arrange your layout. Submit your design and we'll create your professional website.",
          icon: <Layout className="w-8 h-8" />,
          action: "Build and submit your design",
        },
      ],
      finalCTA: "We transform your design into a production-ready website!",
      startButton: "Start Exploring Templates",
    },
    ru: {
      buttonText: "Как это работает?",
      modalTitle: "Как это работает",
      subtitle: "Ваш путь от идеи до профессионального сайта за 3 простых шага",
      steps: [
        {
          number: "01",
          title: "Просмотр и фильтрация шаблонов",
          description: "Изучите нашу коллекцию из 39+ профессиональных шаблонов. Фильтруйте по категории, стилю или назначению, чтобы найти идеальное решение для вашего проекта.",
          icon: <Search className="w-8 h-8" />,
          action: "Фильтровать шаблоны по категории",
        },
        {
          number: "02",
          title: "Просмотр и настройка",
          description: "Просматривайте живые демо шаблонов. Оцените их внешний вид и функциональность. Выберите понравившийся и нажмите 'Build', чтобы начать настройку.",
          icon: <Eye className="w-8 h-8" />,
          action: "Посмотреть демо и начать создание",
        },
        {
          number: "03",
          title: "Создайте свой дизайн",
          description: "Используйте наш интуитивный конструктор для настройки секций, добавления контента и организации макета. Отправьте свой дизайн, и мы создадим профессиональный сайт.",
          icon: <Layout className="w-8 h-8" />,
          action: "Создать и отправить дизайн",
        },
      ],
      finalCTA: "Мы превратим ваш дизайн в готовый к запуску сайт!",
      startButton: "Начать изучение шаблонов",
    },
  };

  const t = content[language];

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <span className="relative z-10 flex items-center gap-2 font-semibold">
          <Sparkles className="w-4 h-4" />
          {t.buttonText}
        </span>
      </Button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-xs sm:max-w-lg md:max-w-5xl max-h-[95vh] h-full sm:h-auto mx-2 sm:mx-4 bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="relative bg-blue-600 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 touch-manipulation"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="pr-8 sm:pr-0"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {t.modalTitle}
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl leading-snug">
                    {t.subtitle}
                  </p>
                </motion.div>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                {/* Flow Steps */}
                <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 md:space-y-12">
                  {t.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="relative"
                    >
                      {/* Connection Line - Desktop Only */}
                      {index < t.steps.length - 1 && (
                        <div className="hidden lg:block absolute left-[60px] top-[100px] w-0.5 h-[calc(100%+3rem)] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-20" />
                      )}

                      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 items-start lg:items-start">
                        {/* Icon & Number */}
                        <div className="flex-shrink-0 mx-auto lg:mx-0">
                          <div className="relative">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                              <div className="scale-75 sm:scale-90 md:scale-100">
                                {step.icon}
                              </div>
                            </div>
                            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 border-3 sm:border-4 border-blue-500 flex items-center justify-center shadow-md">
                              <span className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                                {step.number}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center lg:text-left">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                            {step.title}
                          </h3>
                          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 md:mb-5 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            {step.description}
                          </p>
                          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg text-xs sm:text-sm md:text-base font-medium text-blue-700 dark:text-blue-300 shadow-sm">
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="whitespace-nowrap">{step.action}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Final CTA Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 sm:mt-10 md:mt-12 max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-xl sm:rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Sparkles className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                        {t.finalCTA}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="border-t bg-gray-50 dark:bg-gray-800/50 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="w-full sm:w-auto min-h-[44px] touch-manipulation"
                  >
                    {language === 'ru' ? 'Закрыть' : 'Close'}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto min-h-[44px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all touch-manipulation"
                  >
                    {t.startButton}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
