"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      animate={{
        y: [0, yOffset, 0],
        rotate: [0, 3, -3, 0],
      }}
      transition={{
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
