"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Send, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SendToTelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateData: any;
  language?: 'en' | 'ru';
}

export function SendToTelegramModal({
  isOpen,
  onClose,
  templateData,
  language = 'en',
}: SendToTelegramModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Format SHORT message (without full JSON - too long for URL)
  const formatShortMessage = () => {
    const lines = [];

    if (language === 'ru') {
      lines.push('🎨 Новая заявка на шаблон');
      lines.push('');
      lines.push('👤 Контактная информация:');
      lines.push(`Имя: ${formData.name || '[Не заполнено]'}`);
      lines.push(`Email: ${formData.email || '[Не заполнено]'}`);
      lines.push(`Телефон: ${formData.phone || '[Не заполнено]'}`);
      lines.push('');
      lines.push('📋 Данные шаблона:');
      if (templateData?.templateId) lines.push(`ID: ${templateData.templateId}`);
      if (templateData?.templateName) lines.push(`Шаблон: ${templateData.templateName}`);
      if (templateData?.language) lines.push(`Язык: ${templateData.language}`);
      if (templateData?.nodes) {
        const count = Object.keys(templateData.nodes).length;
        lines.push(`Компонентов: ${count}`);
      }
      lines.push('');
      lines.push('💾 Полный JSON скопирован в буфер обмена!');
      lines.push('(Вставьте следующим сообщением)');
    } else {
      lines.push('🎨 New Template Submission');
      lines.push('');
      lines.push('👤 Contact Information:');
      lines.push(`Name: ${formData.name || '[Not filled]'}`);
      lines.push(`Email: ${formData.email || '[Not filled]'}`);
      lines.push(`Phone: ${formData.phone || '[Not filled]'}`);
      lines.push('');
      lines.push('📋 Template Summary:');
      if (templateData?.templateId) lines.push(`ID: ${templateData.templateId}`);
      if (templateData?.templateName) lines.push(`Template: ${templateData.templateName}`);
      if (templateData?.language) lines.push(`Language: ${templateData.language}`);
      if (templateData?.nodes) {
        const count = Object.keys(templateData.nodes).length;
        lines.push(`Components: ${count}`);
      }
      lines.push('');
      lines.push('💾 Full JSON copied to clipboard!');
      lines.push('(Paste as second message)');
    }

    return lines.join('\n');
  };

  // Format FULL message with JSON (for preview and copy)
  const formatFullMessage = () => {
    const shortMsg = formatShortMessage();
    return shortMsg + '\n\n📦 Full JSON Data:\n' + JSON.stringify(templateData, null, 2);
  };

  const shortMessageText = formatShortMessage();
  const fullMessageText = formatFullMessage();

  // Telegram deep link - opens user's Telegram app to chat with you
  const telegramUsername = 'MichaelMMM'; // Your Telegram username from screenshot
  const telegramDeepLink = `https://t.me/${telegramUsername}?text=${encodeURIComponent(shortMessageText)}`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(fullMessageText);
      setCopied(true);
      toast({
        title: language === 'ru' ? 'Скопировано!' : 'Copied!',
        description: language === 'ru'
          ? 'Полное сообщение скопировано в буфер обмена'
          : 'Full message copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: language === 'ru' ? 'Ошибка' : 'Error',
        description: language === 'ru'
          ? 'Не удалось скопировать'
          : 'Failed to copy',
        variant: 'destructive',
      });
    }
  };

  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(templateData, null, 2));
      toast({
        title: language === 'ru' ? 'JSON скопирован!' : 'JSON Copied!',
        description: language === 'ru'
          ? 'JSON данные скопированы в буфер обмена'
          : 'JSON data copied to clipboard',
      });
    } catch (error) {
      toast({
        title: language === 'ru' ? 'Ошибка' : 'Error',
        description: language === 'ru'
          ? 'Не удалось скопировать JSON'
          : 'Failed to copy JSON',
        variant: 'destructive',
      });
    }
  };

  const handleOpenTelegram = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: language === 'ru' ? 'Ошибка' : 'Error',
        description: language === 'ru'
          ? 'Пожалуйста, заполните все поля'
          : 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      // 1. FIRST: Send to bot via API (backend saves to your bot)
      const response = await fetch('/api/send-to-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateData,
          userData: formData,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      // 2. SECOND: Copy JSON to clipboard for personal message
      try {
        await navigator.clipboard.writeText(JSON.stringify(templateData, null, 2));
      } catch (e) {
        console.error('Failed to copy JSON:', e);
      }

      // 3. THIRD: Open user's Telegram to chat with you personally
      window.open(telegramDeepLink, '_blank');

      // Success toast
      toast({
        title: language === 'ru' ? '✅ Отправлено в бот!' : '✅ Sent to Bot!',
        description: language === 'ru'
          ? 'Данные сохранены. Telegram откроется для личного чата (JSON в буфере)'
          : 'Data saved. Telegram opening for personal chat (JSON in clipboard)',
        duration: 6000,
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error sending to Telegram:', error);
      toast({
        title: language === 'ru' ? 'Ошибка отправки' : 'Send Failed',
        description: language === 'ru'
          ? 'Не удалось отправить в бот. Попробуйте снова.'
          : 'Failed to send to bot. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-500" />
            {language === 'ru' ? 'Отправить в Telegram' : 'Send via Telegram'}
          </DialogTitle>
          <DialogDescription>
            {language === 'ru'
              ? 'Нажмите кнопку ниже, чтобы открыть Telegram и отправить данные вашего шаблона'
              : 'Click the button below to open Telegram and send your template data'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Contact Form */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">
              {language === 'ru' ? '1️⃣ Ваши контактные данные:' : '1️⃣ Your Contact Information:'}
            </h4>
            <div className="space-y-2">
              <input
                type="text"
                placeholder={language === 'ru' ? 'Имя *' : 'Name *'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                required
              />
              <input
                type="email"
                placeholder={language === 'ru' ? 'Email *' : 'Email *'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                required
              />
              <input
                type="tel"
                placeholder={language === 'ru' ? 'Телефон *' : 'Phone *'}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                required
              />
            </div>
          </div>

          {/* Message Preview */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 max-h-[300px] overflow-y-auto">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-semibold text-sm">
                {language === 'ru' ? '2️⃣ Предпросмотр сообщения:' : '2️⃣ Message Preview:'}
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCopyMessage}
                className="h-8 px-2"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
            <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
              {fullMessageText}
            </pre>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                3️⃣
              </div>
              <div className="flex-1 text-sm">
                {language === 'ru' ? (
                  <div className="space-y-2">
                    <p className="font-semibold">Как это работает:</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Заполните контактные данные выше</li>
                      <li>Нажмите кнопку "Открыть Telegram"</li>
                      <li><strong>Автоматически:</strong> Данные отправятся в бот (для сохранения)</li>
                      <li><strong>Затем:</strong> Telegram откроется для личного чата со мной</li>
                      <li>Вставьте JSON (Ctrl+V) и отправьте мне напрямую</li>
                    </ol>
                    <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                      <p className="text-xs text-green-700 dark:text-green-300 font-semibold">
                        ✅ Два способа: Бот сохранит данные + Вы сможете написать мне лично!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="font-semibold">How it works:</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Fill in your contact info above</li>
                      <li>Click "Open Telegram" button</li>
                      <li><strong>Automatically:</strong> Data sent to bot (saved)</li>
                      <li><strong>Then:</strong> Telegram opens for personal chat with me</li>
                      <li>Paste JSON (Ctrl+V) and send to me directly</li>
                    </ol>
                    <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                      <p className="text-xs text-green-700 dark:text-green-300 font-semibold">
                        ✅ Two ways: Bot saves data + You can message me personally!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {language === 'ru' ? 'Отмена' : 'Cancel'}
            </Button>
            <Button
              type="button"
              onClick={handleOpenTelegram}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <Send className="mr-2 h-4 w-4" />
              {language === 'ru' ? 'Открыть Telegram' : 'Open Telegram'}
            </Button>
          </div>

          {/* Alternative: Copy manually */}
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            {language === 'ru'
              ? 'Или скопируйте текст выше и отправьте вручную: @MichaelMMM'
              : 'Or copy the text above and send manually to: @MichaelMMM'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
