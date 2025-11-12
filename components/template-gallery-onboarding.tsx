"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiEye, FiEdit3, FiShoppingCart, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";

export function TemplateGalleryOnboarding() {
  const { t } = useI18n();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const dismissed = localStorage.getItem('onboarding-dismissed');
    const minimized = localStorage.getItem('onboarding-minimized');

    if (dismissed === 'true') {
      setIsDismissed(true);
    }
    if (minimized === 'true') {
      setIsMinimized(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('onboarding-dismissed', 'true');
  };

  const handleToggle = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    localStorage.setItem('onboarding-minimized', String(newState));
  };

  if (isDismissed) return null;

  const steps = [
    {
      icon: <FiSearch className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: t.onboarding?.step1?.title || "Browse & Search",
      description: t.onboarding?.step1?.description || "Explore templates",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-200 dark:border-blue-800",
      number: "1"
    },
    {
      icon: <FiEye className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: t.onboarding?.step2?.title || "Preview Template",
      description: t.onboarding?.step2?.description || "View details",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-200 dark:border-purple-800",
      number: "2"
    },
    {
      icon: <FiEdit3 className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: t.onboarding?.step3?.title || "Customize Design",
      description: t.onboarding?.step3?.description || "Make it yours",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-950/30",
      borderColor: "border-pink-200 dark:border-pink-800",
      number: "3"
    },
    {
      icon: <FiShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: t.onboarding?.step4?.title || "Purchase & Download",
      description: t.onboarding?.step4?.description || "Get started",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      borderColor: "border-green-200 dark:border-green-800",
      number: "4"
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="mb-8 sm:mb-12"
      >
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="relative px-4 sm:px-6 py-4 border-b border-blue-200/50 dark:border-blue-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Attention Badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  <span className="animate-pulse">👋</span>
                  <span className="hidden sm:inline">New Here?</span>
                  <span className="sm:hidden">Start</span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                    {t.onboarding?.title || "How to Get Your Perfect Website"}
                  </h3>
                  {!isMinimized && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                      {t.onboarding?.subtitle || "Find and customize in 4 easy steps"}
                    </p>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggle}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? (
                    <FiChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <FiChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
                <button
                  onClick={handleDismiss}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Dismiss"
                >
                  <FiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Steps Content - Collapsible */}
          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 sm:p-6">
                  {/* Steps Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative group"
                      >
                        {/* Step Card */}
                        <div className={`relative ${step.bgColor} ${step.borderColor} border-2 rounded-xl p-4 h-full hover:shadow-lg transition-all hover:-translate-y-1`}>
                          {/* Step Number Badge */}
                          <div className={`absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                            {step.number}
                          </div>

                          {/* Icon */}
                          <div className={`mb-3 text-gray-900 dark:text-gray-100 flex justify-center`}>
                            {step.icon}
                          </div>

                          {/* Title */}
                          <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
                            {step.title}
                          </h4>

                          {/* Description */}
                          <p className="text-xs text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                            {step.description}
                          </p>
                        </div>

                        {/* Arrow (Desktop only, not on last item) */}
                        {index < steps.length - 1 && (
                          <div className="hidden lg:block absolute top-1/2 -right-5 transform -translate-y-1/2 text-gray-400 text-2xl z-10">
                            →
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom CTA */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="mt-6 text-center"
                  >
                    <Button
                      onClick={handleDismiss}
                      variant="outline"
                      size="sm"
                      className="text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/30"
                    >
                      {t.onboarding?.dismissButton || "Got it!"}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
