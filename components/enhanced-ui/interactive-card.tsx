"use client";

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // 1-20, default 15
}

export function InteractiveCard({ children, className = "", intensity = 15 }: InteractiveCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * intensity;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * intensity;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      whileHover={prefersReducedMotion ? {} : { y: -10, scale: 1.02 }}
      className={`relative group cursor-pointer
        shadow-[0_8px_30px_rgba(0,0,0,0.12),0_16px_60px_rgba(0,0,0,0.15)]
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
        transition-shadow duration-500
        ${className}`}
    >
      {/* Shine effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
