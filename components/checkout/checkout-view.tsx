"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TemplateConfig } from "@/lib/template-registry";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiShoppingCart,
  FiInfo,
  FiTag,
  FiX
} from "react-icons/fi";
import { useI18n } from "@/lib/i18n-context";
import { useRouter } from "next/navigation";

interface CheckoutViewProps {
  template: TemplateConfig;
}

export function CheckoutView({ template }: CheckoutViewProps) {
  const { language, isRTL } = useI18n();
  const router = useRouter();
  const [includeContentMaker, setIncludeContentMaker] = useState(false);

  // Discount code state
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
  const [discountError, setDiscountError] = useState("");
  const [isValidatingCode, setIsValidatingCode] = useState(false);

  const contentMakerPrice = 39;
  const addOnsTotal = includeContentMaker ? contentMakerPrice : 0;

  // IMPORTANT: Discounts apply ONLY to template price, NOT to add-ons
  const templatePrice = template.price;

  // Calculate discount (only on template price)
  const discountAmount = appliedDiscount
    ? appliedDiscount.discountType === 'PERCENTAGE'
      ? (templatePrice * appliedDiscount.discountValue) / 100 // Only discount template
      : Math.min(appliedDiscount.discountValue, templatePrice) // Fixed discount capped at template price
    : 0;

  const templateAfterDiscount = templatePrice - discountAmount;
  const totalPrice = templateAfterDiscount + addOnsTotal; // Add non-discounted add-ons

  const t = {
    en: {
      title: "Checkout",
      orderSummary: "Order Summary",
      template: "Template",
      license: "License",
      licenseText: "Full usage rights – use freely",
      optionalAddons: "Optional Add-Ons",
      contentMakerTitle: "Content Maker Service",
      contentMakerDesc: "We'll create all your page text and SEO copy in 24 hours. Professional copywriting tailored to your business.",
      total: "Total",
      proceedToPayment: "Proceed to Payment",
      backToTemplate: "Back to Template",
      comingSoon: "Coming Soon!",
      comingSoonText: "Payment processing is coming soon. For early access or custom orders, please contact us.",
      contactUs: "Contact Us",
      close: "Close",
      whatsIncluded: "What's Included",
      secureCheckout: "Secure Checkout",
      discountCode: "Discount Code",
      discountCodePlaceholder: "Enter discount code",
      applyCode: "Apply",
      validatingCode: "Validating...",
      removeCode: "Remove",
      discountApplied: "Discount applied!",
      subtotal: "Subtotal",
      discount: "Discount",
    },
    ru: {
      title: "Оформление заказа",
      orderSummary: "Сводка заказа",
      template: "Шаблон",
      license: "Лицензия",
      licenseText: "Полные права на использование – используйте свободно",
      optionalAddons: "Дополнительные услуги",
      contentMakerTitle: "Услуга создания контента",
      contentMakerDesc: "Мы создадим весь текст для вашей страницы и SEO-копирайтинг за 24 часа. Профессиональный текст, адаптированный под ваш бизнес.",
      total: "Итого",
      proceedToPayment: "Перейти к оплате",
      backToTemplate: "Назад к шаблону",
      comingSoon: "Скоро!",
      comingSoonText: "Обработка платежей скоро будет доступна. Для раннего доступа или индивидуальных заказов, пожалуйста, свяжитесь с нами.",
      contactUs: "Связаться",
      close: "Закрыть",
      whatsIncluded: "Что включено",
      secureCheckout: "Безопасная оплата",
      discountCode: "Код скидки",
      discountCodePlaceholder: "Введите код скидки",
      applyCode: "Применить",
      validatingCode: "Проверка...",
      removeCode: "Удалить",
      discountApplied: "Скидка применена!",
      subtotal: "Подытог",
      discount: "Скидка",
    },
    he: {
      title: "תשלום",
      orderSummary: "סיכום הזמנה",
      template: "תבנית",
      license: "רישיון",
      licenseText: "זכויות שימוש מלאות - השתמש בחופשיות",
      optionalAddons: "תוספות אופציונליות",
      contentMakerTitle: "שירות יצירת תוכן",
      contentMakerDesc: "ניצור את כל תוכן העמוד ועותק SEO תוך 24 שעות. כתיבה מקצועית המותאמת לעסק שלך.",
      total: "סה\"כ",
      proceedToPayment: "המשך לתשלום",
      backToTemplate: "חזרה לתבנית",
      comingSoon: "בקרוב!",
      comingSoonText: "עיבוד תשלום בקרוב. לגישה מוקדמת או הזמנות מותאמות, צור קשר.",
      contactUs: "צור קשר",
      close: "סגור",
      whatsIncluded: "מה כלול",
      secureCheckout: "תשלום מאובטח",
      discountCode: "קוד הנחה",
      discountCodePlaceholder: "הזן קוד הנחה",
      applyCode: "החל",
      validatingCode: "מאמת...",
      removeCode: "הסר",
      discountApplied: "הנחה הופעלה!",
      subtotal: "ביניים",
      discount: "הנחה",
    }
  };

  const text = language === 'ru' ? t.ru : language === 'he' ? t.he : t.en;
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;

    setIsValidatingCode(true);
    setDiscountError("");

    try {
      const response = await fetch(`/api/discount/validate?code=${discountCode.toUpperCase()}`);
      const data = await response.json();

      if (data.valid) {
        setAppliedDiscount(data.code);
        setDiscountError("");
      } else {
        setDiscountError(data.message || "Invalid discount code");
        setAppliedDiscount(null);
      }
    } catch (error) {
      setDiscountError("Failed to validate code");
      setAppliedDiscount(null);
    } finally {
      setIsValidatingCode(false);
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode("");
    setDiscountError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/95">
        <div className="container mx-auto px-4 py-4">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link
              href={`/templates/${template.id}`}
              className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {isRTL ? <FiChevronRight className="w-4 h-4" /> : <FiChevronLeft className="w-4 h-4" />}
              {text.backToTemplate}
            </Link>
            <Badge variant="secondary" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <FiShoppingCart className="w-3 h-3" />
              {text.secureCheckout}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">
            {text.title}
          </h1>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column - Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <Card className="p-4 sm:p-6">
                <h2 className={`text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  {text.orderSummary}
                </h2>

                {/* Template Item */}
                <div className="space-y-4">
                  <div className={`flex flex-col sm:flex-row items-start gap-3 sm:gap-4 pb-4 border-b ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                    <div className="w-full sm:w-24 h-32 sm:h-16 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex-shrink-0">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                      <h3 className="font-semibold text-base sm:text-lg truncate">{template.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{template.category}</p>
                    </div>
                    <div className={`${isRTL ? 'text-left' : 'text-right'} sm:${isRTL ? 'text-right' : 'text-right'} self-start`}>
                      <div className="text-lg sm:text-xl font-bold">${template.price}</div>
                    </div>
                  </div>

                  {/* License */}
                  <div className={`flex items-start gap-3 pb-4 border-b ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium">{text.license}</div>
                      <div className="text-sm text-muted-foreground">{text.licenseText}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Discount Code Section */}
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <FiTag className="w-4 h-4 sm:w-5 sm:h-5" />
                  {text.discountCode}
                </h2>

                {!appliedDiscount ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                        placeholder={text.discountCodePlaceholder}
                        className="flex-1 uppercase"
                        disabled={isValidatingCode}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleApplyDiscount();
                          }
                        }}
                      />
                      <Button
                        onClick={handleApplyDiscount}
                        disabled={!discountCode.trim() || isValidatingCode}
                        variant="outline"
                        className="shrink-0"
                      >
                        {isValidatingCode ? text.validatingCode : text.applyCode}
                      </Button>
                    </div>

                    {discountError && (
                      <div className="text-sm text-destructive flex items-center gap-2">
                        <FiX className="w-4 h-4" />
                        {discountError}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 dark:bg-green-950 border-2 border-green-500 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="font-semibold text-green-900 dark:text-green-100">
                            {text.discountApplied}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-mono font-bold text-green-900 dark:text-green-100">
                              {appliedDiscount.code}
                            </span>
                          </div>
                          {appliedDiscount.description && (
                            <div className="text-sm text-green-700 dark:text-green-300">
                              {appliedDiscount.description}
                            </div>
                          )}
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            -{appliedDiscount.discountType === 'PERCENTAGE'
                              ? `${appliedDiscount.discountValue}%`
                              : `$${appliedDiscount.discountValue}`}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveDiscount}
                        className="text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"
                      >
                        <FiX className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>

              {/* Optional Add-Ons */}
              <Card className="p-4 sm:p-6">
                <h2 className={`text-lg sm:text-xl font-bold mb-4 ${isRTL ? 'text-right' : ''}`}>{text.optionalAddons}</h2>

                {/* Content Maker Addon */}
                <div className="border-2 border-purple-200 dark:border-purple-800 rounded-lg p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                  <div className={`flex flex-col sm:flex-row items-start gap-3 sm:gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                    <Checkbox
                      id="content-maker"
                      checked={includeContentMaker}
                      onCheckedChange={(checked) => setIncludeContentMaker(checked as boolean)}
                      className="mt-1 self-start"
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor="content-maker" className={`flex items-start gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                        <span className="text-xl sm:text-2xl flex-shrink-0">✍️</span>
                        <div className="flex-1">
                          <div className="font-bold text-base sm:text-lg">{text.contentMakerTitle}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                            {text.contentMakerDesc}
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className={`${isRTL ? 'text-left' : 'text-right'} sm:${isRTL ? 'text-left' : 'text-right'} flex-shrink-0 self-start w-full sm:w-auto`}>
                      <div className="text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400">
                        +${contentMakerPrice}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Note */}
                <div className={`mt-4 flex items-start gap-2 text-xs sm:text-sm text-muted-foreground bg-blue-50 dark:bg-blue-950 p-3 rounded-lg ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <FiInfo className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {language === 'en'
                      ? 'More services (hosting, domain, installation) will be available after purchase.'
                      : language === 'ru' ? 'Дополнительные услуги (хостинг, домен, установка) будут доступны после покупки.'
                      : 'שירותים נוספים (אירוח, דומיין, התקנה) יהיו זמינים לאחר הרכישה.'}
                  </p>
                </div>
              </Card>

              {/* What's Included */}
              <Card className="p-4 sm:p-6">
                <h2 className={`text-lg sm:text-xl font-bold mb-4 ${isRTL ? 'text-right' : ''}`}>{text.whatsIncluded}</h2>
                <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                  {template.whatsIncluded.map((feature, index) => (
                    <div key={index} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className={`text-xs sm:text-sm ${isRTL ? 'text-right' : ''}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column - Summary & Payment */}
            <div className="lg:col-span-1">
              <Card className="p-4 sm:p-6 lg:sticky lg:top-24">
                <h2 className="text-base sm:text-lg font-bold mb-4">{text.total}</h2>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">{text.template}</span>
                    <span className="font-medium">${template.price}</span>
                  </div>

                  {includeContentMaker && (
                    <div className="flex justify-between text-xs sm:text-sm text-purple-600 dark:text-purple-400">
                      <span>✍️ Content Maker</span>
                      <span className="font-medium">+${contentMakerPrice}</span>
                    </div>
                  )}

                  {appliedDiscount && (
                    <>
                      <div className="flex justify-between text-xs sm:text-sm pt-2 border-t">
                        <span className="text-muted-foreground">{text.subtotal}</span>
                        <span className="font-medium">${templatePrice + addOnsTotal}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm text-green-600 dark:text-green-400">
                        <span className="flex items-center gap-1">
                          <FiTag className="w-3 h-3" />
                          {text.discount} ({appliedDiscount.code})
                        </span>
                        <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                      </div>
                    </>
                  )}

                  <div className="border-t pt-3 flex justify-between text-lg sm:text-xl font-bold">
                    <span>{text.total}</span>
                    <span className="text-green-600 dark:text-green-400">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Button - ThemeForest Green */}
                <Button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full py-4 sm:py-6 text-base sm:text-lg bg-[#82b541] hover:bg-[#6fa32d] text-white shadow-lg hover:shadow-xl transition-all font-semibold"
                >
                  <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {text.proceedToPayment}
                </Button>

                {/* Security Badge */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>{language === 'en' ? 'Secure SSL Encrypted Payment' : language === 'he' ? 'תשלום מוצפן SSL מאובטח' : 'Безопасная SSL-шифрованная оплата'}</span>
                  </div>
                </div>
              </Card>
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
                    {language === 'en' ? 'Mock Payment' : language === 'he' ? 'תשלום דמו' : 'Демо-оплата'}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {language === 'en'
                      ? 'This is a demo payment system. No actual payment will be processed.'
                      : language === 'he'
                      ? 'זו מערכת תשלום לדוגמה. לא יעובד תשלום אמיתי.'
                      : 'Это демонстрационная система оплаты. Реальная оплата не будет произведена.'}
                  </p>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{template.name}</span>
                      <span className="font-semibold">${template.price}</span>
                    </div>
                    {includeContentMaker && (
                      <div className="flex justify-between text-sm text-purple-600 dark:text-purple-400">
                        <span>Content Maker</span>
                        <span className="font-semibold">+${contentMakerPrice}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-bold">{language === 'en' ? 'Total' : language === 'he' ? 'סה"כ' : 'Итого'}:</span>
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
                    {language === 'en' ? 'Cancel' : language === 'he' ? 'בטל' : 'Отмена'}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => {
                        router.push(`/thank-you/${template.id}?contentMaker=${includeContentMaker}`);
                      }, 2000);
                    }}
                    className="flex-1 bg-[#82b541] hover:bg-[#6fa32d]"
                  >
                    {language === 'en' ? 'Complete Payment' : language === 'he' ? 'השלם תשלום' : 'Завершить оплату'}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent mb-4" />
                <p className="text-lg font-semibold">
                  {language === 'en' ? 'Processing payment...' : language === 'he' ? 'מעבד תשלום...' : 'Обработка платежа...'}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {language === 'en' ? 'Please wait...' : language === 'he' ? 'אנא המתן...' : 'Пожалуйста, подождите...'}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
