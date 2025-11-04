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

  // All 8 post-purchase offers from templates.md spec
  const postPurchaseOffers = [
    {
      id: 1,
      priority: "1️⃣",
      title: language === 'en' ? "Hosting Service" : "Хостинг",
      type: language === 'en' ? "Subscription" : "Подписка",
      price: "$5-19/mo",
      description: language === 'en'
        ? "We'll host your website on secure servers so it's always live — no setup needed."
        : "Мы разместим ваш сайт на защищенных серверах, чтобы он всегда был онлайн — без настройки.",
      icon: "☁️"
    },
    {
      id: 2,
      priority: "2️⃣",
      title: language === 'en' ? "Domain Assistance" : "Помощь с доменом",
      type: language === 'en' ? "One-time" : "Единоразово",
      price: "$10",
      description: language === 'en'
        ? "We'll help you choose, register, and connect a domain like yourbrand.com."
        : "Мы поможем выбрать, зарегистрировать и подключить домен типа yourbrand.com.",
      icon: "🌍"
    },
    {
      id: 3,
      priority: "3️⃣",
      title: language === 'en' ? "Installation & Launch" : "Установка и запуск",
      type: language === 'en' ? "One-time" : "Единоразово",
      price: "$29-49",
      description: language === 'en'
        ? "We'll install your template, connect hosting + domain, and launch your site within 24 hours."
        : "Мы установим ваш шаблон, подключим хостинг + домен, и запустим сайт за 24 часа.",
      icon: "🚀",
      featured: true // This is the most popular one
    },
    {
      id: 4,
      priority: "4️⃣",
      title: language === 'en' ? "Admin Panel Service" : "Админ-панель",
      type: language === 'en' ? "One-time" : "Единоразово",
      price: "$99",
      description: language === 'en'
        ? "Get a private dashboard to edit texts & images without touching code."
        : "Получите приватную панель для редактирования текстов и изображений без кода.",
      icon: "💼"
    },
    {
      id: 5,
      priority: "5️⃣",
      title: language === 'en' ? "Branding Pack" : "Пакет брендинга",
      type: language === 'en' ? "One-time" : "Единоразово",
      price: "$19-39",
      description: language === 'en'
        ? "We'll design a simple logo + color palette that matches your new site."
        : "Мы разработаем простой логотип + цветовую палитру, подходящую вашему сайту.",
      icon: "🎨"
    },
    {
      id: 6,
      priority: "6️⃣",
      title: language === 'en' ? "Stock Image Pack" : "Пакет изображений",
      type: language === 'en' ? "One-time" : "Единоразово",
      price: "$15-25",
      description: language === 'en'
        ? "We'll fill your pages with professional, license-free images that fit your business."
        : "Мы заполним ваши страницы профессиональными изображениями, подходящими вашему бизнесу.",
      icon: "📸"
    },
    {
      id: 7,
      priority: "7️⃣",
      title: language === 'en' ? "Security & Backup Plan" : "Безопасность",
      type: language === 'en' ? "Subscription" : "Подписка",
      price: "$5-9/mo",
      description: language === 'en'
        ? "Daily backups + malware protection to keep your site safe."
        : "Ежедневные резервные копии + защита от вредоносного ПО для безопасности сайта.",
      icon: "🔒"
    },
    {
      id: 8,
      priority: "8️⃣",
      title: language === 'en' ? "Maintenance Plan" : "План обслуживания",
      type: language === 'en' ? "Subscription" : "Подписка",
      price: "$9-19/mo",
      description: language === 'en'
        ? "We'll update plugins, monitor performance, and keep everything running smoothly."
        : "Мы будем обновлять плагины, следить за производительностью и поддерживать всё в рабочем состоянии.",
      icon: "🔧"
    }
  ];

  const [selectedOffers, setSelectedOffers] = useState<number[]>([]);

  const toggleOffer = (offerId: number) => {
    setSelectedOffers(prev =>
      prev.includes(offerId)
        ? prev.filter(id => id !== offerId)
        : [...prev, offerId]
    );
  };

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

        {/* ALL 8 POST-PURCHASE OFFERS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3">
              💡 {language === 'en' ? 'Get Your Site Live Faster' : 'Запустите сайт быстрее'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
              {language === 'en'
                ? 'Add optional services below to launch your website faster and easier.'
                : 'Добавьте дополнительные услуги ниже, чтобы запустить сайт быстрее и проще.'}
            </p>
          </div>

          {/* FEATURED OFFER - Installation & Launch (Full Width, Most Important) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mb-6"
          >
            <Card
              className={`p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 ${
                selectedOffers.includes(3)
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                  : 'border-orange-400 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20'
              } relative overflow-hidden`}
              onClick={() => toggleOffer(3)}
            >
              {/* Popular Badge */}
              <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-orange-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1">
                <FiZap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 inline" />
                {language === 'en' ? 'MOST POPULAR' : 'САМОЕ ПОПУЛЯРНОЕ'}
              </Badge>

              <div className="grid md:grid-cols-[auto_1fr_auto] gap-4 items-center">
                {/* Icon */}
                <div className="text-5xl sm:text-6xl">🚀</div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs sm:text-sm text-orange-600 dark:text-orange-400 font-bold">3️⃣</span>
                    <Badge variant="outline" className="text-xs">
                      {language === 'en' ? 'One-time' : 'Единоразово'}
                    </Badge>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black mb-2">
                    {language === 'en' ? 'Installation & Launch' : 'Установка и запуск'}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {language === 'en'
                      ? "We'll install your template, connect hosting + domain, and launch your site within 24 hours."
                      : 'Мы установим ваш шаблон, подключим хостинг + домен, и запустим сайт за 24 часа.'}
                  </p>
                </div>

                {/* Price & CTA */}
                <div className="text-center md:text-right">
                  <div className="text-3xl sm:text-4xl font-black text-orange-600 dark:text-orange-400 mb-2">
                    $29-49
                  </div>
                  {selectedOffers.includes(3) ? (
                    <div className="flex items-center justify-center md:justify-end gap-2 text-green-600 font-bold">
                      <FiCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-sm sm:text-base">{language === 'en' ? 'Added' : 'Добавлено'}</span>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                      {language === 'en' ? 'Add Service' : 'Добавить'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* OTHER 7 OFFERS - Organized in Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {postPurchaseOffers.filter(o => o.id !== 3).map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
              >
                <Card
                  className={`p-3 sm:p-4 h-full flex flex-col cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                    selectedOffers.includes(offer.id)
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                  onClick={() => toggleOffer(offer.id)}
                >
                  {/* Icon & Type Badge */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="text-3xl sm:text-4xl">{offer.icon}</div>
                    <Badge variant="outline" className="text-[10px] sm:text-xs px-1 sm:px-2 py-0.5">
                      {offer.type}
                    </Badge>
                  </div>

                  {/* Priority & Title */}
                  <div className="mb-2">
                    <div className="text-[10px] sm:text-xs text-slate-500 mb-1">{offer.priority}</div>
                    <h3 className="font-bold text-sm sm:text-base leading-tight">{offer.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-4 flex-grow leading-relaxed line-clamp-3">
                    {offer.description}
                  </p>

                  {/* Price & Selection */}
                  <div className="flex items-center justify-between pt-2 sm:pt-3 border-t mt-auto">
                    <span className="text-base sm:text-lg font-black text-green-600 dark:text-green-400">
                      {offer.price}
                    </span>
                    {selectedOffers.includes(offer.id) ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    ) : (
                      <span className="text-[10px] sm:text-xs text-slate-400">
                        {language === 'en' ? 'Tap to add' : 'Нажмите'}
                      </span>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Add Selected Services Button */}
          {selectedOffers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <Card className="p-4 sm:p-6 max-w-2xl mx-auto bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <div className="font-bold text-lg">
                      {language === 'en'
                        ? `${selectedOffers.length} Service${selectedOffers.length > 1 ? 's' : ''} Selected`
                        : `Выбрано услуг: ${selectedOffers.length}`}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {language === 'en'
                        ? 'Add them to your order'
                        : 'Добавить их к вашему заказу'}
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white shadow-lg text-base sm:text-lg px-8 py-6 font-bold"
                  >
                    <FiZap className="w-5 h-5 mr-2" />
                    {language === 'en' ? 'Add to Order' : 'Добавить к заказу'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>

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
