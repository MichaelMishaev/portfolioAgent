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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n-context";

interface SendToWhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateData: any;
  language?: "en" | "ru" | "he";
}

export function SendToWhatsAppModal({
  isOpen,
  onClose,
  templateData,
  language = "en",
}: SendToWhatsAppModalProps) {
  const { toast } = useToast();
  const { isRTL } = useI18n();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const WHATSAPP_NUMBER = "972544345287"; // +972 54 434 5287

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format the message with user info and template JSON
      const message = language === 'ru' ? `
📋 *Новый запрос шаблона*

👤 *Информация о пользователе:*
Имя: ${formData.name}
Email: ${formData.email}
Телефон: ${formData.phone}

🎨 *Данные шаблона:*
\`\`\`json
${JSON.stringify(templateData, null, 2)}
\`\`\`
      `.trim() : language === 'he' ? `
📋 *בקשה חדשה לתבנית*

👤 *פרטי משתמש:*
שם: ${formData.name}
אימייל: ${formData.email}
טלפון: ${formData.phone}

🎨 *נתוני תבנית:*
\`\`\`json
${JSON.stringify(templateData, null, 2)}
\`\`\`
      `.trim() : `
📋 *New Template Request*

👤 *User Information:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

🎨 *Template Data:*
\`\`\`json
${JSON.stringify(templateData, null, 2)}
\`\`\`
      `.trim();

      // Encode message for WhatsApp URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank");

      toast({
        title: language === "ru" ? "Успешно!" : language === "he" ? "הצלחה!" : "Success!",
        description:
          language === "ru"
            ? "WhatsApp открыт. Отправьте сообщение для завершения."
            : language === "he"
            ? "WhatsApp נפתח. שלח את ההודעה כדי להשלים."
            : "WhatsApp opened. Send the message to complete.",
      });

      setFormData({ name: "", email: "", phone: "" });
      onClose();
    } catch (error) {
      toast({
        title: language === "ru" ? "Ошибка" : language === "he" ? "שגיאה" : "Error",
        description:
          language === "ru"
            ? "Не удалось открыть WhatsApp. Попробуйте снова."
            : language === "he"
            ? "לא הצלחנו לפתוח את WhatsApp. נסה שוב."
            : "Failed to open WhatsApp. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={isRTL ? 'text-right' : ''}>
            {language === "ru"
              ? "Отправить в WhatsApp"
              : language === "he"
              ? "שלח ב-WhatsApp"
              : "Send to WhatsApp"}
          </DialogTitle>
          <DialogDescription className={isRTL ? 'text-right' : ''}>
            {language === "ru"
              ? "Пожалуйста, укажите ваши контактные данные."
              : language === "he"
              ? "אנא ספק את פרטי הקשר שלך."
              : "Please provide your contact details."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={isRTL ? 'text-right w-full block' : ''}>
              {language === "ru" ? "Имя" : language === "he" ? "שם" : "Name"}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder={language === "ru" ? "Иван Иванов" : language === "he" ? "ישראל ישראלי" : "John Doe"}
              className={isRTL ? 'text-right' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className={isRTL ? 'text-right w-full block' : ''}>
              {language === "ru" ? "Эл. почта" : language === "he" ? "אימייל" : "Email"}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder={language === "ru" ? "ivan@example.com" : language === "he" ? "israel@example.com" : "john@example.com"}
              className={isRTL ? 'text-right' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className={isRTL ? 'text-right w-full block' : ''}>
              {language === "ru" ? "Телефон" : language === "he" ? "טלפון" : "Phone"}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+972 54 434 5287"
              className={isRTL ? 'text-right' : ''}
            />
          </div>
          <div className={`flex gap-2 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              {language === "ru" ? "Отмена" : language === "he" ? "ביטול" : "Cancel"}
            </Button>
            <Button type="submit" className={`flex-1 bg-[#25D366] hover:bg-[#20BA5A] ${isRTL ? 'flex-row-reverse' : ''}`} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className={`h-4 w-4 animate-spin ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {language === "ru" ? "Отправка..." : language === "he" ? "שולח..." : "Sending..."}
                </>
              ) : (
                <>
                  <FaWhatsapp className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {language === "ru" ? "Отправить" : language === "he" ? "שלח" : "Send"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
