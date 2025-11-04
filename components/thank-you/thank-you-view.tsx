"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TemplateConfig } from "@/lib/template-registry";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiCheck, FiDownload, FiCheckCircle, FiClock, FiZap, FiShield, FiTrendingUp } from "react-icons/fi";
import { useI18n } from "@/lib/i18n-context";

interface ThankYouViewProps {
  template: TemplateConfig;
  contentMaker: boolean;
}

export function ThankYouView({ template, contentMaker }: ThankYouViewProps) {
  const { language } = useI18n();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes countdown
  const [showUpsell, setShowUpsell] = useState(true);

  // Countdown timer for urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalPrice = template.price + (contentMaker ? 39 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20 py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4 sm:mb-6">
            <FiCheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 text-green-900 dark:text-green-100">
            {language === 'en' ? 'Purchase Successful!' : 'Покупка успешна!'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Your template is ready to download. Check your email for the receipt and next steps.'
              : 'Ваш шаблон готов к загрузке. Проверьте email для получения чека и дальнейших инструкций.'}
          </p>

          <Button
            asChild
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
          >
            <a href={`#download`} className="flex items-center gap-2">
              <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
              {language === 'en' ? 'Download Template' : 'Скачать шаблон'}
            </a>
          </Button>
        </motion.div>

        {/* Order Summary - Clean & Simple */}
        <Card className="p-4 sm:p-6 mb-8 max-w-2xl mx-auto">
          <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5 text-green-600" />
            {language === 'en' ? 'Order Confirmation' : 'Подтверждение заказа'}
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <div>
                <div className="font-semibold">{template.name}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Portfolio Template' : 'Шаблон портфолио'}</div>
              </div>
              <span className="font-bold text-lg">${template.price}</span>
            </div>
            {contentMaker && (
              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    <span>✍️</span> Content Maker
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Professional copywriting' : 'Профессиональный копирайтинг'}</div>
                </div>
                <span className="font-bold text-lg text-purple-600 dark:text-purple-400">+$39</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-lg">{language === 'en' ? 'Total' : 'Итого'}:</span>
              <span className="font-black text-2xl text-green-600 dark:text-green-400">${totalPrice}</span>
            </div>
          </div>

          {/* What's Next - Clear Steps */}
          <div className="mt-6 pt-6 border-t space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {language === 'en' ? "What's Next?" : 'Что дальше?'}
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 text-sm">
                <FiCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{language === 'en' ? 'Download files are ready in your account' : 'Файлы для загрузки доступны в вашем аккаунте'}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <FiCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{language === 'en' ? 'Receipt sent to your email' : 'Чек отправлен на ваш email'}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <FiCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{language === 'en' ? 'Installation guide included in download' : 'Руководство по установке включено в загрузку'}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* ONE EXCLUSIVE TIME-LIMITED OFFER - Most Popular Service */}
        {showUpsell && timeLeft > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            {/* Urgency Timer */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-t-xl flex items-center justify-center gap-2 text-sm sm:text-base font-bold">
              <FiClock className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              {language === 'en' ? 'EXCLUSIVE OFFER EXPIRES IN' : 'ЭКСКЛЮЗИВНОЕ ПРЕДЛОЖЕНИЕ ИСТЕКАЕТ ЧЕРЕЗ'}: {formatTime(timeLeft)}
            </div>

            <Card className="border-2 border-orange-200 dark:border-orange-800 rounded-t-none shadow-2xl">
              <div className="p-6 sm:p-8">
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-orange-500 text-white text-xs sm:text-sm px-3 py-1">
                    <FiZap className="w-3 h-3 mr-1" />
                    {language === 'en' ? 'ONE-TIME OFFER' : 'ОДНОРАЗОВОЕ ПРЕДЛОЖЕНИЕ'}
                  </Badge>
                  <div className="text-right">
                    <div className="text-xs sm:text-sm text-slate-500 line-through">$99</div>
                    <div className="text-2xl sm:text-3xl font-black text-orange-600">$49</div>
                    <div className="text-xs text-green-600 font-bold">{language === 'en' ? 'Save 50%!' : 'Скидка 50%!'}</div>
                  </div>
                </div>

                {/* Main Offer */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-3">
                  {language === 'en'
                    ? '🚀 Get Your Site Live in 24 Hours!'
                    : '🚀 Запустите сайт за 24 часа!'}
                </h3>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-6">
                  {language === 'en'
                    ? "We'll install your template, connect hosting & domain, and launch your site - all in one day. No technical skills needed!"
                    : 'Мы установим ваш шаблон, подключим хостинг и домен, и запустим сайт - всё за один день. Технических навыков не требуется!'}
                </p>

                {/* What's Included */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 sm:p-6 mb-6">
                  <h4 className="font-bold mb-3 text-sm uppercase tracking-wide text-slate-500">
                    {language === 'en' ? "What's Included:" : 'Что входит:'}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{language === 'en' ? 'Complete installation' : 'Полная установка'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{language === 'en' ? 'Hosting setup (3 months free)' : 'Настройка хостинга (3 месяца бесплатно)'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{language === 'en' ? 'Domain connection' : 'Подключение домена'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{language === 'en' ? 'SSL certificate' : 'SSL сертификат'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{language === 'en' ? '24-hour launch guarantee' : 'Гарантия запуска за 24 часа'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{language === 'en' ? '1-month support' : '1 месяц поддержки'}</span>
                    </div>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-2 mb-6 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-slate-900"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white dark:border-slate-900"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white dark:border-slate-900"></div>
                  </div>
                  <span><strong>127 customers</strong> {language === 'en' ? 'used this service today' : 'воспользовались этой услугой сегодня'}</span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl text-base sm:text-lg py-6 font-bold"
                  >
                    <FiZap className="w-5 h-5 mr-2" />
                    {language === 'en' ? 'Yes! Launch My Site' : 'Да! Запустить мой сайт'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setShowUpsell(false)}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                  >
                    {language === 'en' ? 'No thanks' : 'Нет, спасибо'}
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <FiShield className="w-4 h-4" />
                    {language === 'en' ? 'Money-back guarantee' : 'Гарантия возврата'}
                  </div>
                  <div className="flex items-center gap-1">
                    <FiTrendingUp className="w-4 h-4" />
                    {language === 'en' ? '4.9/5 rating' : 'Рейтинг 4.9/5'}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Footer Link */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/"
            className="text-sm sm:text-base text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
          >
            {language === 'en' ? '← Browse More Templates' : '← Просмотреть другие шаблоны'}
          </Link>
        </div>
      </div>
    </div>
  );
}
