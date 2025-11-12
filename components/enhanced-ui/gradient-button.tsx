"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function GradientButton({
  children,
  onClick,
  className = "",
  size = "default",
  variant = "default",
}: GradientButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Button
      onClick={onClick}
      size={size}
      variant={variant}
      className={`relative overflow-hidden group ${className}`}
      asChild
    >
      <motion.button
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Blue overlay that slides in on hover */}
        <motion.div
          className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100"
          initial={prefersReducedMotion ? {} : { x: "-100%" }}
          whileHover={prefersReducedMotion ? {} : { x: "0%" }}
          transition={prefersReducedMotion ? {} : { duration: 0.3 }}
        />

        {/* Content */}
        <span className="relative z-10">{children}</span>
      </motion.button>
    </Button>
  );
}
