"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronRight, FiChevronLeft, FiCheck } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export interface TourStep {
  target?: string; // CSS selector for the element to highlight
  title: string;
  titleRu?: string;
  content: string;
  contentRu?: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
  action?: () => void; // Optional action to perform when this step is shown
}

export interface OnboardingTourProps {
  steps: TourStep[];
  tourKey: string; // Unique key for this tour (used for localStorage)
  language?: "en" | "ru";
  onComplete?: () => void;
  onSkip?: () => void;
  autoStart?: boolean;
  showProgress?: boolean;
}

export function OnboardingTour({
  steps,
  tourKey,
  language = "en",
  onComplete,
  onSkip,
  autoStart = false,
  showProgress = true,
}: OnboardingTourProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  // Check if user has completed this tour before
  useEffect(() => {
    if (typeof window !== "undefined") {
      const completed = localStorage.getItem(`tour-completed-${tourKey}`);
      if (!completed && autoStart) {
        // Small delay to ensure DOM is ready
        setTimeout(() => setIsActive(true), 500);
      }
    }
  }, [tourKey, autoStart]);

  // Update target element when step changes
  useEffect(() => {
    if (isActive && steps[currentStep]?.target) {
      const element = document.querySelector(steps[currentStep].target!) as HTMLElement;
      setTargetElement(element);

      // Scroll to element
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      // Execute step action if provided
      if (steps[currentStep].action) {
        steps[currentStep].action!();
      }
    } else {
      setTargetElement(null);
    }
  }, [currentStep, isActive, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsActive(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(`tour-completed-${tourKey}`, "true");
    }
    if (onComplete) {
      onComplete();
    }
  };

  const handleSkip = () => {
    setIsActive(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(`tour-completed-${tourKey}`, "true");
    }
    if (onSkip) {
      onSkip();
    }
  };

  const getTooltipPosition = () => {
    if (!targetElement) {
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    }

    const rect = targetElement.getBoundingClientRect();
    const position = steps[currentStep].position || "bottom";

    switch (position) {
      case "top":
        return {
          top: `${rect.top - 20}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: "translate(-50%, -100%)",
        };
      case "bottom":
        return {
          top: `${rect.bottom + 20}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: "translate(-50%, 0)",
        };
      case "left":
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.left - 20}px`,
          transform: "translate(-100%, -50%)",
        };
      case "right":
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + 20}px`,
          transform: "translate(0, -50%)",
        };
      default:
        return {
          top: `${rect.bottom + 20}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: "translate(-50%, 0)",
        };
    }
  };

  const currentStepData = steps[currentStep];
  const displayTitle = language === "ru" && currentStepData?.titleRu ? currentStepData.titleRu : currentStepData?.title;
  const displayContent = language === "ru" && currentStepData?.contentRu ? currentStepData.contentRu : currentStepData?.content;

  if (!isActive || !currentStepData) {
    return null;
  }

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Backdrop with highlight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            onClick={handleSkip}
          >
            {/* Highlight spotlight */}
            {targetElement && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute border-4 border-blue-500 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] pointer-events-none"
                style={{
                  top: `${targetElement.getBoundingClientRect().top - 8}px`,
                  left: `${targetElement.getBoundingClientRect().left - 8}px`,
                  width: `${targetElement.getBoundingClientRect().width + 16}px`,
                  height: `${targetElement.getBoundingClientRect().height + 16}px`,
                }}
              />
            )}
          </motion.div>

          {/* Tooltip Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed z-[9999] w-[calc(100vw-32px)] sm:w-96 max-w-md"
            style={getTooltipPosition()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-4 sm:p-6 text-white">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg sm:text-xl font-bold flex-1 pr-2">{displayTitle}</h3>
                <button
                  onClick={handleSkip}
                  className="flex-shrink-0 hover:bg-white/20 rounded-full p-1.5 transition-colors"
                  aria-label="Close tour"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <p className="text-white/90 mb-4 leading-relaxed">{displayContent}</p>

              {/* Progress Indicator */}
              {showProgress && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                    <span>
                      {language === "en"
                        ? `Step ${currentStep + 1} of ${steps.length}`
                        : `Шаг ${currentStep + 1} из ${steps.length}`}
                    </span>
                    <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-white h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="w-4 h-4 mr-1" />
                  {language === "en" ? "Back" : "Назад"}
                </Button>

                <button
                  onClick={handleSkip}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {language === "en" ? "Skip tour" : "Пропустить"}
                </button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleNext}
                  className="bg-white text-blue-600 hover:bg-white/90"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <FiCheck className="w-4 h-4 mr-1" />
                      {language === "en" ? "Finish" : "Готово"}
                    </>
                  ) : (
                    <>
                      {language === "en" ? "Next" : "Далее"}
                      <FiChevronRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Helper function to restart a tour
export function restartTour(tourKey: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(`tour-completed-${tourKey}`);
    window.location.reload();
  }
}
