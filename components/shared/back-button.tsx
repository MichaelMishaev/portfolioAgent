"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FiArrowLeft } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  label?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  floating?: boolean;
}

export function BackButton({
  label = "Back to Templates",
  className,
  variant = "ghost",
  floating = false
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // Use router.back() to maintain browser history and URL state (filters, etc.)
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback to home if no history
      router.push("/");
    }
  };

  if (floating) {
    return (
      <div className="fixed top-4 left-4 z-[100]">
        <Button
          variant={variant}
          size="sm"
          onClick={handleBack}
          className={cn(
            "gap-2 transition-all hover:gap-3 shadow-lg backdrop-blur-sm",
            "bg-background/80 hover:bg-background/90 border",
            className
          )}
        >
          <FiArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={handleBack}
      className={cn("gap-2 transition-all hover:gap-3", className)}
    >
      <FiArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  );
}
