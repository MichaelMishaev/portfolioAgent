"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TutorialStep {
  id: number;
  title: string;
  titleRu: string;
  description: string;
  descriptionRu: string;
  screenshot: string;
  highlightArea?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to the Builder!",
    titleRu: "Добро пожаловать в конструктор!",
    description: "Create your perfect website by dragging and dropping components. Let's get started!",
    descriptionRu: "Создайте идеальный сайт, перетаскивая компоненты. Давайте начнём!",
    screenshot: "/tutorial/builder-overview.png",
  },
  {
    id: 2,
    title: "Choose Components",
    titleRu: "Выберите компоненты",
    description: "Browse available components in the left panel. Click or drag to add them to your page.",
    descriptionRu: "Выберите компоненты на левой панели. Нажмите или перетащите их на страницу.",
    screenshot: "/tutorial/select-components.png",
    highlightArea: { x: 0, y: 100, width: 300, height: 400 },
  },
  {
    id: 3,
    title: "Add to Canvas",
    titleRu: "Добавьте на холст",
    description: "On mobile: Tap a component to add it. On desktop: Drag and drop components onto the canvas.",
    descriptionRu: "На мобильном: Нажмите на компонент. На компьютере: Перетащите компонент на холст.",
    screenshot: "/tutorial/add-component.png",
    highlightArea: { x: 300, y: 100, width: 600, height: 400 },
  },
  {
    id: 4,
    title: "Customize Settings",
    titleRu: "Настройте параметры",
    description: "Click any component to edit its content, colors, and styling in the settings panel.",
    descriptionRu: "Нажмите на любой компонент, чтобы изменить текст, цвета и стили на правой панели.",
    screenshot: "/tutorial/edit-component.png",
    highlightArea: { x: 900, y: 100, width: 300, height: 400 },
  },
  {
    id: 5,
    title: "Preview & Save",
    titleRu: "Предпросмотр и сохранение",
    description: "Click 'View Demo' to preview your site. When ready, click 'Save Template' to send us your design!",
    descriptionRu: "Нажмите 'Демо' для просмотра. Когда готово, нажмите 'Сохранить' чтобы отправить нам дизайн!",
    screenshot: "/tutorial/save-template.png",
    highlightArea: { x: 0, y: 0, width: 1200, height: 80 },
  },
];

interface BuilderTutorialAnimationProps {
  language?: 'en' | 'ru';
  onClose?: () => void;
  autoPlay?: boolean;
}

export function BuilderTutorialAnimation({
  language = 'en',
  onClose,
  autoPlay = true,
}: BuilderTutorialAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-advance through steps when playing
  useEffect(() => {
    if (!isPlaying || currentStep >= tutorialSteps.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, tutorialSteps.length - 1));
    }, 4000); // 4 seconds per step

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying]);

  const currentStepData = tutorialSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsPlaying(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const handleDotClick = (index: number) => {
    setCurrentStep(index);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {language === 'ru' ? 'Как использовать конструктор' : 'How to Use the Builder'}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                {language === 'ru'
                  ? `Шаг ${currentStep + 1} из ${tutorialSteps.length}`
                  : `Step ${currentStep + 1} of ${tutorialSteps.length}`}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close tutorial"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content Area */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                {/* Step Title & Description */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {language === 'ru' ? currentStepData.titleRu : currentStepData.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {language === 'ru' ? currentStepData.descriptionRu : currentStepData.description}
                  </p>
                </div>

                {/* Screenshot Placeholder with Animation */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl aspect-video overflow-hidden shadow-inner">
                  {/* Animated Preview - Using CSS to create visual guide */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {currentStep === 0 && (
                      <BuilderOverviewAnimation language={language} />
                    )}
                    {currentStep === 1 && (
                      <ComponentSelectionAnimation language={language} />
                    )}
                    {currentStep === 2 && (
                      <AddComponentAnimation language={language} />
                    )}
                    {currentStep === 3 && (
                      <EditComponentAnimation language={language} />
                    )}
                    {currentStep === 4 && (
                      <SaveTemplateAnimation language={language} />
                    )}
                  </motion.div>

                  {/* Highlight Area */}
                  {currentStepData.highlightArea && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute border-4 border-yellow-400 rounded-lg shadow-lg"
                      style={{
                        left: `${(currentStepData.highlightArea.x / 1200) * 100}%`,
                        top: `${(currentStepData.highlightArea.y / 600) * 100}%`,
                        width: `${(currentStepData.highlightArea.width / 1200) * 100}%`,
                        height: `${(currentStepData.highlightArea.height / 600) * 100}%`,
                      }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-yellow-400/10"
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
            {/* Progress Dots */}
            <div className="flex items-center gap-2">
              {tutorialSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'w-8 bg-blue-600'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <Play className={`w-5 h-5 ${isPlaying ? 'text-blue-600' : 'text-gray-600'}`} />
              </button>

              {/* Previous */}
              <Button
                onClick={handlePrev}
                disabled={currentStep === 0}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                {language === 'ru' ? 'Назад' : 'Previous'}
              </Button>

              {/* Next / Finish */}
              {currentStep < tutorialSteps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  size="sm"
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  {language === 'ru' ? 'Далее' : 'Next'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleClose}
                  size="sm"
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  {language === 'ru' ? 'Начать!' : 'Get Started!'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Animated visual guides for each step
function BuilderOverviewAnimation({ language }: { language: 'en' | 'ru' }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl mb-4"
        >
          🎨
        </motion.div>
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          {language === 'ru' ? 'Конструктор сайтов' : 'Website Builder'}
        </h3>
        <p className="text-gray-600">
          {language === 'ru' ? 'Создайте сайт за минуты' : 'Build your site in minutes'}
        </p>
      </motion.div>
    </div>
  );
}

function ComponentSelectionAnimation({ language }: { language: 'en' | 'ru' }) {
  const components = ['Hero ✨', 'Stats 📊', 'Skills 💼', 'Contact 📧'];

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="grid grid-cols-2 gap-4 max-w-md">
        {components.map((comp, index) => (
          <motion.div
            key={comp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-lg shadow-md border-2 border-purple-200 cursor-pointer text-center"
          >
            <div className="text-2xl mb-2">{comp.split(' ')[1]}</div>
            <div className="font-semibold text-sm">{comp.split(' ')[0]}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AddComponentAnimation({ language }: { language: 'en' | 'ru' }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10 }}
        className="relative"
      >
        <div className="w-64 h-32 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-dashed border-purple-400 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-5xl"
          >
            ➕
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
        >
          {language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add'}
        </motion.div>
      </motion.div>
    </div>
  );
}

function EditComponentAnimation({ language }: { language: 'en' | 'ru' }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 gap-8">
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500"
      >
        <div className="text-2xl mb-2">🎨</div>
        <div className="font-semibold">Component</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl"
      >
        ⚙️
      </motion.div>

      <div className="bg-white p-4 rounded-lg shadow-md w-48">
        <div className="text-sm font-semibold mb-3">
          {language === 'ru' ? 'Настройки' : 'Settings'}
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gray-200 rounded"></div>
          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

function SaveTemplateAnimation({ language }: { language: 'en' | 'ru' }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-6xl mb-4 inline-block"
        >
          💾
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {language === 'ru' ? 'Сохранить шаблон' : 'Save Template'}
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg"
        >
          {language === 'ru' ? 'Отправить дизайн' : 'Send Design'}
        </motion.button>
      </motion.div>
    </div>
  );
}

// Compact trigger button for showing tutorial again
export function ShowTutorialButton({
  onClick,
  language = 'en'
}: {
  onClick: () => void;
  language?: 'en' | 'ru';
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
    >
      <Play className="w-5 h-5" />
      <span className="hidden sm:inline">
        {language === 'ru' ? 'Показать туториал' : 'Show Tutorial'}
      </span>
    </motion.button>
  );
}
