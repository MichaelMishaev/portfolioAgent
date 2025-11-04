"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
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
  return (
    <Button
      onClick={onClick}
      size={size}
      variant={variant}
      className={`relative overflow-hidden group ${className}`}
      asChild
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Gradient overlay that slides in on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <span className="relative z-10">{children}</span>
      </motion.button>
    </Button>
  );
}
