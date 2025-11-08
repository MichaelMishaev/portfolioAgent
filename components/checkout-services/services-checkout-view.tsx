"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import { getServicesByIds, formatServicePrice, type ServiceOffer } from "@/lib/services-types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FiShoppingCart,
  FiCreditCard,
  FiCheck,
  FiX,
  FiArrowLeft,
  FiZap,
  FiClock,
  FiShield
} from "react-icons/fi";
import Link from "next/link";

interface ServicesCheckoutViewProps {
  serviceIds: number[];
  templateId: string;
}

export function ServicesCheckoutView({ serviceIds, templateId }: ServicesCheckoutViewProps) {
  const { language } = useI18n();
  const services = getServicesByIds(serviceIds);

  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    name: "",
  });

  const [selectedPrices, setSelectedPrices] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    services.forEach(service => {
      initial[service.id] = service.priceMin;
    });
    return initial;
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = services.reduce((sum, service) => sum + selectedPrices[service.id], 0);

  const handlePriceChange = (serviceId: number, price: number) => {
    setSelectedPrices(prev => ({ ...prev, [serviceId]: price }));
  };

  const handleCheckout = () => {
    setShowPaymentModal(true);
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Redirect to home or a success page
      window.location.href = "/?servicesAdded=true";
    }, 2000);
  };

  const removeService = (serviceId: number) => {
    const updatedIds = serviceIds.filter(id => id !== serviceId);
    if (updatedIds.length === 0) {
      window.location.href = "/";
    } else {
      window.location.href = `/checkout-services?services=${updatedIds.join(",")}&template=${templateId}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href={templateId ? `/thank-you/${templateId}` : "/"}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            {language === "en" ? "Back" : "Назад"}
          </Link>
          <div className="flex items-center gap-2">
            <FiShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold">
              {language === "en" ? "Services Checkout" : "Оформление услуг"}
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-black mb-3">
              {language === "en" ? "Complete Your " : "Завершите "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                {language === "en" ? "Order" : "заказ"}
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {language === "en"
                ? "You're one step away from getting professional services for your website"
                : "Вы в одном шаге от получения профессиональных услуг для вашего сайта"}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Services List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <FiShoppingCart className="w-5 h-5 text-blue-600" />
                {language === "en" ? "Selected Services" : "Выбранные услуги"} ({services.length})
              </h2>

              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="text-4xl sm:text-5xl flex-shrink-0">{service.icon}</div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold">
                                {language === "en" ? service.title : service.title_ru}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {language === "en"
                                  ? (service.type === "subscription" ? "Subscription" : "One-time")
                                  : (service.type === "subscription" ? "Подписка" : "Единоразово")}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                              {language === "en" ? service.description : service.description_ru}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeService(service.id)}
                            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors group"
                            aria-label={language === "en" ? "Remove service" : "Удалить услугу"}
                          >
                            <FiX className="w-5 h-5 text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
                          </button>
                        </div>

                        {/* Price Selection */}
                        {service.priceMax ? (
                          <div className="mt-4">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                              {language === "en" ? "Select pricing tier:" : "Выберите тариф:"}
                            </label>
                            <div className="flex gap-2 flex-wrap">
                              {[service.priceMin, Math.round((service.priceMin + service.priceMax) / 2), service.priceMax].map(price => (
                                <button
                                  key={price}
                                  onClick={() => handlePriceChange(service.id, price)}
                                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                    selectedPrices[service.id] === price
                                      ? "bg-blue-600 text-white shadow-lg scale-105"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                  }`}
                                >
                                  ${price}{service.type === "subscription" ? "/mo" : ""}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 text-2xl font-black text-blue-600 dark:text-blue-400">
                            ${service.priceMin}{service.type === "subscription" ? "/mo" : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Right Column - Order Summary & Payment */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Order Summary */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold mb-4">
                    {language === "en" ? "Order Summary" : "Сводка заказа"}
                  </h2>

                  <div className="space-y-3 mb-4">
                    {services.map(service => (
                      <div key={service.id} className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          {language === "en" ? service.title : service.title_ru}
                        </span>
                        <span className="font-semibold">
                          ${selectedPrices[service.id]}{service.type === "subscription" ? "/mo" : ""}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">
                        {language === "en" ? "Total:" : "Итого:"}
                      </span>
                      <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                        ${totalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {language === "en" ? "Email" : "Email"} *
                      </label>
                      <Input
                        type="email"
                        placeholder={language === "en" ? "your@email.com" : "ваш@email.com"}
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {language === "en" ? "Full Name" : "Полное имя"} *
                      </label>
                      <Input
                        type="text"
                        placeholder={language === "en" ? "John Doe" : "Иван Иванов"}
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg text-lg py-6 font-bold"
                    onClick={handleCheckout}
                    disabled={isProcessing || !customerInfo.email || !customerInfo.name}
                  >
                    {isProcessing ? (
                      <>
                        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2" />
                        {language === "en" ? "Processing..." : "Обработка..."}
                      </>
                    ) : (
                      <>
                        <FiCreditCard className="w-5 h-5 mr-2" />
                        {language === "en" ? "Proceed to Payment" : "Перейти к оплате"}
                      </>
                    )}
                  </Button>
                </Card>

                {/* Trust Badges */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <FiShield className="w-5 h-5 text-green-600" />
                    <span>{language === "en" ? "Secure SSL encryption" : "Защищённое SSL-шифрование"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <FiCheck className="w-5 h-5 text-green-600" />
                    <span>{language === "en" ? "Money-back guarantee" : "Гарантия возврата денег"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <FiZap className="w-5 h-5 text-blue-600" />
                    <span>{language === "en" ? "Instant delivery" : "Мгновенная доставка"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mock Payment Modal */}
      {showPaymentModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => !isProcessing && setShowPaymentModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {!isProcessing ? (
              <>
                <div className="text-center mb-6">
                  <div className="text-5xl sm:text-6xl mb-4">💳</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    {language === 'en' ? 'Mock Payment' : 'Демо-оплата'}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {language === 'en'
                      ? 'This is a demo payment system. No actual payment will be processed.'
                      : 'Это демонстрационная система оплаты. Реальная оплата не будет произведена.'}
                  </p>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-6">
                  <div className="space-y-2">
                    {services.map(service => (
                      <div key={service.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {language === "en" ? service.title : service.title_ru}
                        </span>
                        <span className="font-semibold">
                          ${selectedPrices[service.id]}{service.type === "subscription" ? "/mo" : ""}
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-bold">{language === 'en' ? 'Total' : 'Итого'}:</span>
                      <span className="text-xl font-black text-green-600 dark:text-green-400">${totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1"
                  >
                    {language === 'en' ? 'Cancel' : 'Отмена'}
                  </Button>
                  <Button
                    onClick={handleCompletePayment}
                    className="flex-1 bg-[#82b541] hover:bg-[#6fa32d]"
                  >
                    {language === 'en' ? 'Complete Payment' : 'Завершить оплату'}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent mb-4" />
                <p className="text-lg font-semibold">
                  {language === 'en' ? 'Processing payment...' : 'Обработка платежа...'}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {language === 'en' ? 'Please wait...' : 'Пожалуйста, подождите...'}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
