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

interface SendToWhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateData: any;
  language?: "en" | "ru";
}

export function SendToWhatsAppModal({
  isOpen,
  onClose,
  templateData,
  language = "en",
}: SendToWhatsAppModalProps) {
  const { toast } = useToast();
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
      const message = `
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
        title: language === "ru" ? "Успешно!" : "Success!",
        description:
          language === "ru"
            ? "WhatsApp открыт. Отправьте сообщение для завершения."
            : "WhatsApp opened. Send the message to complete.",
      });

      setFormData({ name: "", email: "", phone: "" });
      onClose();
    } catch (error) {
      toast({
        title: language === "ru" ? "Ошибка" : "Error",
        description:
          language === "ru"
            ? "Не удалось открыть WhatsApp. Попробуйте снова."
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
          <DialogTitle>
            {language === "ru"
              ? "Отправить в WhatsApp"
              : "Send to WhatsApp"}
          </DialogTitle>
          <DialogDescription>
            {language === "ru"
              ? "Пожалуйста, укажите ваши контактные данные."
              : "Please provide your contact details."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {language === "ru" ? "Имя" : "Name"}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              {language === "ru" ? "Эл. почта" : "Email"}{" "}
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
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              {language === "ru" ? "Телефон" : "Phone"}{" "}
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
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              {language === "ru" ? "Отмена" : "Cancel"}
            </Button>
            <Button type="submit" className="flex-1 bg-[#25D366] hover:bg-[#20BA5A]" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {language === "ru" ? "Отправка..." : "Sending..."}
                </>
              ) : (
                <>
                  <FaWhatsapp className="mr-2 h-4 w-4" />
                  {language === "ru" ? "Отправить" : "Send"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
