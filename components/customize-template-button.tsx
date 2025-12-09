"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n-context";

interface CustomizeTemplateButtonProps {
  variant?: "default" | "gradient" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
}

export function CustomizeTemplateButton({
  variant = "gradient",
  size = "md",
  className = "",
  showIcon = true
}: CustomizeTemplateButtonProps) {
  const pathname = usePathname();
  const { t, isRTL } = useI18n();

  // Extract template ID from current path
  // Path format: /templates/[templateId] or /templates/[templateId]/preview
  const templateId = pathname.split("/templates/")[1]?.split("/")[0] || "";

  if (!templateId) {
    return null;
  }

  const builderPath = `/templates/${templateId}/builder`;

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  };

  const variantClasses = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    gradient: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
  };

  return (
    <Link href={builderPath}>
      <Button
        className={`
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          rounded-full
          font-bold
          transition-all
          duration-300
          hover:scale-105
          ${isRTL ? 'flex-row-reverse' : ''}
          ${className}
        `}
      >
        {isRTL && showIcon && " ✏️"}{t.buttons.customizeTemplate}{!isRTL && showIcon && " ✏️"}
      </Button>
    </Link>
  );
}
