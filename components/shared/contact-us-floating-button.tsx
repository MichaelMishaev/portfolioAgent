"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";
import { FaTelegramPlane } from "react-icons/fa";

const TELEGRAM_USERNAME = "MichaelMMM";
const TELEGRAM_LINK = `https://t.me/${TELEGRAM_USERNAME}`;

interface ContactUsFloatingButtonProps {
  className?: string;
}

export function ContactUsFloatingButton({ className }: ContactUsFloatingButtonProps) {
  const { language } = useI18n();

  const label = language === "ru" ? "Связаться" : "Contact Us";
  const ariaLabel = language === "ru" ? "Связаться в Telegram" : "Contact us on Telegram";

  const handleClick = () => {
    const features = "noopener,noreferrer";
    window.open(TELEGRAM_LINK, "_blank", features);
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[10000] flex flex-col items-end gap-2",
        "md:bottom-8 md:right-8",
        className,
      )}
    >
      <Button
        size="lg"
        onClick={handleClick}
        className="bg-[#229ED9] hover:bg-[#1c8cbf] text-white shadow-lg hover:shadow-xl transition-all duration-200 min-w-[160px] justify-center"
        aria-label={ariaLabel}
      >
        <FaTelegramPlane className="mr-2 h-5 w-5" />
        {label}
      </Button>
    </div>
  );
}

export const TELEGRAM_CONTACT_LINK = TELEGRAM_LINK;



