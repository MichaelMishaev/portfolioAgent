"use client";

import { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // Negative for upward, positive for downward
  className?: string;
}

export function ParallaxSection({ children, speed = -200, className = "" }: ParallaxSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
