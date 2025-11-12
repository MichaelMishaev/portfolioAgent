"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function FloatingElement({
  children,
  duration = 6,
  yOffset = -20,
  className = "",
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={prefersReducedMotion ? {} : {
        y: [0, yOffset, 0],
        rotate: [0, 3, -3, 0],
      }}
      transition={prefersReducedMotion ? {} : {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
