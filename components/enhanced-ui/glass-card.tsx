"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  blurAmount?: "sm" | "md" | "lg" | "xl";
}

export function GlassCard({ children, className = "", blurAmount = "lg" }: GlassCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  };

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -5 }}
      className={`
        bg-white/10
        ${blurClasses[blurAmount]}
        border border-white/20
        rounded-2xl
        shadow-[0_8px_32px_rgba(0,0,0,0.1)]
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]
        hover:bg-white/20
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
