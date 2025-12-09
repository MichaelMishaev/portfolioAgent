"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { TemplateConfig } from "@/lib/template-registry";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  FiEdit3,
  FiEye,
  FiShoppingCart,
  FiCheck,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { useI18n } from "@/lib/i18n-context";

interface TemplateDetailViewProps {
  template: TemplateConfig;
}

export function TemplateDetailView({ template }: TemplateDetailViewProps) {
  const { language, t, isRTL } = useI18n();
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [expandedFeatures, setExpandedFeatures] = useState<Set<number>>(new Set());

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % template.screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) =>
      prev === 0 ? template.screenshots.length - 1 : prev - 1
    );
  };

  const toggleFeature = (index: number) => {
    setExpandedFeatures((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {isRTL ? <FiChevronRight className="w-4 h-4" /> : <FiChevronLeft className="w-4 h-4" />}
            {language === 'en' ? 'Back to Gallery' : language === 'ru' ? 'Назад в галерею' : 'חזרה לגלריה'}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left: Screenshot Carousel */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={template.screenshots[currentScreenshot]}
                alt={`${template.name} screenshot ${currentScreenshot + 1}`}
                fill
                className="object-cover"
              />

              {/* Carousel Controls */}
              {template.screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevScreenshot}
                    className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all`}
                    aria-label="Previous screenshot"
                  >
                    {isRTL ? <FiChevronRight className="w-5 h-5" /> : <FiChevronLeft className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={nextScreenshot}
                    className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all`}
                    aria-label="Next screenshot"
                  >
                    {isRTL ? <FiChevronLeft className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
                  </button>

                  {/* Indicator Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {template.screenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentScreenshot(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentScreenshot
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to screenshot ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Right: Template Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`flex flex-col ${isRTL ? 'text-right' : ''}`}
          >
            {/* Category Badge */}
            <Badge variant="secondary" className="w-fit mb-4">
              {template.category}
            </Badge>

            {/* Template Name */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {template.name}
            </h1>

            {/* Rating Placeholder */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-500 text-lg">★</span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                (4.8)
              </span>
            </div>

            {/* Short Description */}
            <p className="text-lg text-muted-foreground mb-6">
              {template.description}
            </p>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold">${template.price}</span>
                <span className="text-muted-foreground">
                  {language === 'en' ? 'one-time payment' : language === 'he' ? 'תשלום חד-פעמי' : 'единоразовая оплата'}
                </span>
              </div>
            </div>

            {/* CTA Buttons - Hidden on mobile (lg:hidden), visible on desktop (lg:flex) */}
            <div className="hidden lg:flex flex-col gap-4 mb-8">
              {/* Demo Button - First - MOST IMPORTANT */}
              <Button
                asChild
                size="lg"
                className="h-16 text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200 rounded-xl border-2 border-blue-500"
              >
                <Link href={`/templates/${template.id}/demo`} className="flex items-center justify-center gap-2.5">
                  <FiEye className="w-6 h-6" />
                  <span>{language === 'en' ? 'View Demo' : language === 'he' ? 'צפה בהדגמה' : 'Посмотреть Демо'}</span>
                </Link>
              </Button>

              {/* Buy Now Button - Second */}
              <Button
                asChild
                size="lg"
                className="h-14 text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
              >
                <Link href={`/checkout/${template.id}`} className="flex items-center justify-center gap-2.5">
                  <FiShoppingCart className="w-5 h-5" />
                  <span>{language === 'en' ? `Buy Now - $${template.price}` : language === 'he' ? `קנה עכשיו - $${template.price}` : `Купить - $${template.price}`}</span>
                </Link>
              </Button>

              {/* Builder Button - Third (with "Soon" badge) */}
              <Button
                asChild
                size="lg"
                className="h-14 text-base font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 hover:from-purple-700 hover:via-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl relative"
              >
                <Link href={`/templates/${template.id}/builder`} className="flex items-center justify-center gap-2.5">
                  <FiEdit3 className="w-5 h-5" />
                  <span>{language === 'en' ? 'Try Builder' : language === 'he' ? 'נסה את הבונה' : 'Попробовать Билдер'}</span>
                  <Badge className={`${isRTL ? 'mr-2' : 'ml-2'} bg-yellow-500 text-black hover:bg-yellow-600`}>
                    {language === 'en' ? 'Soon' : language === 'ru' ? 'Скоро' : 'בקרוב'}
                  </Badge>
                </Link>
              </Button>

            </div>
          </motion.div>
        </div>

        {/* Best For Section */}
        {template.bestFor && template.bestFor.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-6">
              {language === 'en' ? "Perfect For" : language === 'he' ? 'מושלם עבור' : 'Идеально для'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {template.bestFor.map((use, index) => (
                <Badge key={index} variant="secondary" className="text-base px-4 py-2">
                  {use}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {/* Color Scheme Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">
            {language === 'en' ? "Color Palette" : language === 'he' ? 'פלטת צבעים' : 'Цветовая палитра'}
          </h2>
          <Card className="p-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div
                  className="w-full h-24 rounded-lg mb-3 border border-gray-200 dark:border-gray-700"
                  style={{ backgroundColor: template.colors.primary }}
                />
                <p className="text-sm font-medium text-center">
                  {language === 'en' ? 'Primary' : language === 'he' ? 'ראשי' : 'Основной'}
                </p>
                <p className="text-xs text-muted-foreground text-center font-mono mt-1">
                  {template.colors.primary}
                </p>
              </div>
              <div>
                <div
                  className="w-full h-24 rounded-lg mb-3 border border-gray-200 dark:border-gray-700"
                  style={{ backgroundColor: template.colors.secondary }}
                />
                <p className="text-sm font-medium text-center">
                  {language === 'en' ? 'Secondary' : language === 'he' ? 'משני' : 'Вторичный'}
                </p>
                <p className="text-xs text-muted-foreground text-center font-mono mt-1">
                  {template.colors.secondary}
                </p>
              </div>
              <div>
                <div
                  className="w-full h-24 rounded-lg mb-3 border border-gray-200 dark:border-gray-700"
                  style={{ backgroundColor: template.colors.accent }}
                />
                <p className="text-sm font-medium text-center">
                  {language === 'en' ? 'Accent' : language === 'he' ? 'מבטא' : 'Акцент'}
                </p>
                <p className="text-xs text-muted-foreground text-center font-mono mt-1">
                  {template.colors.accent}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* What's Included Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">
            {language === 'en' ? "What's Included" : language === 'he' ? 'מה כלול' : 'Что включено'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {template.whatsIncluded.map((feature, index) => {
              const hasExplanation = t.featureExplanations?.[feature];
              return (
                <Card
                  key={index}
                  className={`p-4 transition-all duration-300 ${hasExplanation ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' : ''}`}
                  onClick={() => hasExplanation && toggleFeature(index)}
                >
                  <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className={`flex items-center justify-between gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="font-medium">{feature}</span>
                        {hasExplanation && (
                          <FiChevronRight
                            className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                              expandedFeatures.has(index) ? 'rotate-90' : ''
                            } ${isRTL ? 'rotate-180' : ''}`}
                          />
                        )}
                      </div>
                      {hasExplanation && expandedFeatures.has(index) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                            {t.featureExplanations[feature]}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Technical Details Section */}
        {template.technicalDetails && template.technicalDetails.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-6">
              {language === 'en' ? "Technical Specifications" : language === 'he' ? 'מפרט טכני' : 'Технические характеристики'}
            </h2>
            <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <div className="grid sm:grid-cols-2 gap-3">
                {template.technicalDetails.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Builder Promo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2">
            <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <div className="text-4xl">🧩</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'en' ? 'Free Builder Tool Included' : language === 'he' ? 'כלי בונה חינם כלול' : 'Бесплатный билдер включен'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {language === 'en'
                    ? 'Reorder your layout freely with the drag-and-drop Builder. Customize sections, rearrange components, and preview changes in real-time before you buy.'
                    : language === 'he'
                    ? 'סדר מחדש את הפריסה שלך בחופשיות עם הבונה בגרירה ושחרור. התאם אישית קטעים, סדר מחדש רכיבים וצפה בשינויים בזמן אמת לפני שאתה קונה.'
                    : 'Свободно перестраивайте макет с помощью конструктора drag-and-drop. Настраивайте секции, переставляйте компоненты и просматривайте изменения в режиме реального времени перед покупкой.'}
                </p>
                <Button asChild variant="outline">
                  <Link href={`/templates/${template.id}/builder`}>
                    {language === 'en' ? 'Try Builder Now' : language === 'he' ? 'נסה את הבונה עכשיו' : 'Попробовать билдер'}
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Content Maker Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-2">
            <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <div className="text-4xl">✍️</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'en' ? 'Need Professional Content?' : language === 'he' ? 'צריך תוכן מקצועי?' : 'Нужен профессиональный контент?'}
                </h3>
                <p className="text-muted-foreground mb-2">
                  {language === 'en'
                    ? 'Add our Content Maker service at checkout for just +$39. We\'ll create all your page text and SEO copy in 24 hours.'
                    : language === 'he'
                    ? 'הוסף את שירות יוצר התוכן שלנו בקופה תמורת 39$ בלבד. ניצור את כל הטקסט של העמוד שלך ועותק SEO תוך 24 שעות.'
                    : 'Добавьте нашу услугу Content Maker при оформлении заказа всего за +$39. Мы создадим весь текст для вашей страницы и SEO-копию за 24 часа.'}
                </p>
                <Badge variant="secondary" className="text-sm">
                  {language === 'en' ? 'Available at checkout' : language === 'he' ? 'זמין בקופה' : 'Доступно при оформлении'}
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* License Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">
            {language === 'en' ? 'License' : language === 'he' ? 'רישיון' : 'Лицензия'}
          </h2>
          <Card className="p-6 bg-muted/50">
            <p className="text-muted-foreground leading-relaxed">
              {language === 'en'
                ? 'After purchase, this template is yours to use freely for your own projects. You may edit, host, and publish without restriction or attribution. Redistribution or resale of the template itself is not allowed.'
                : language === 'he'
                ? 'לאחר הרכישה, תבנית זו שלך לשימוש חופשי בפרויקטים שלך. אתה יכול לערוך, לארח ולפרסם ללא הגבלה או ייחוס. הפצה מחדש או מכירה מחדש של התבנית עצמה אינה מותרת.'
                : 'После покупки этот шаблон можно свободно использовать для ваших собственных проектов. Вы можете редактировать, размещать и публиковать без ограничений и указания авторства. Распространение или перепродажа самого шаблона не допускается.'}
            </p>
          </Card>
        </motion.div>

        {/* Long Description */}
        {template.longDescription && template.longDescription !== template.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              {language === 'en' ? 'About This Template' : language === 'he' ? 'אודות תבנית זו' : 'Об этом шаблоне'}
            </h2>
            <Card className="p-6">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {template.longDescription}
              </p>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Sticky Bottom Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-sm border-t shadow-2xl">
        <div className="p-3">
          {/* Demo Button - First - MOST IMPORTANT */}
          <Button
            asChild
            className="mb-3 w-full h-12 font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl rounded-lg border-2 border-blue-500"
          >
            <Link href={`/templates/${template.id}/demo`} className="flex items-center justify-center gap-2">
              <FiEye className="w-5 h-5" />
              <span>{language === 'en' ? 'View Demo' : language === 'he' ? 'צפה בהדגמה' : 'Посмотреть Демо'}</span>
            </Link>
          </Button>

          {/* Price and Buy Button Row - Second */}
          <div className={`flex items-center justify-between gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <div className="text-2xl font-bold">${template.price}</div>
              <div className="text-xs text-muted-foreground">
                {language === 'en' ? 'one-time' : language === 'ru' ? 'один раз' : 'פעם אחת'}
              </div>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl h-11 px-5 font-bold rounded-lg"
            >
              <Link href={`/checkout/${template.id}`} className="flex items-center gap-2">
                <FiShoppingCart className="w-4 h-4" />
                <span>{language === 'en' ? `Buy Now - $${template.price}` : language === 'he' ? `קנה עכשיו - $${template.price}` : `Купить - $${template.price}`}</span>
              </Link>
            </Button>
          </div>

          {/* Builder Button Row - Third */}
          <Button asChild variant="outline" size="sm" className="h-10 border-2 relative w-full">
            <Link href={`/templates/${template.id}/builder`} className="flex items-center justify-center gap-1.5">
              <FiEdit3 className="w-4 h-4" />
              <span className="text-xs font-semibold">{language === 'en' ? 'Builder' : language === 'he' ? 'בונה' : 'Билдер'}</span>
              <Badge className="ml-1 px-1.5 py-0.5 text-[10px] bg-yellow-500 text-black">
                {language === 'en' ? 'Soon' : language === 'he' ? 'בקרוב' : 'Скоро'}
              </Badge>
            </Link>
          </Button>
        </div>
      </div>

    </div>
  );
}
