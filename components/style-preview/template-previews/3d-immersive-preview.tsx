"use client";

import { motion } from "framer-motion";
import { TemplateConfig } from "@/lib/template-registry";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Box, Layers } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { useEffect, useRef, useState } from "react";

interface ThreeDImmersivePreviewProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
  accentColor: string;
  avatarImage?: string | null;
}

export function ThreeDImmersivePreview({
  template,
  firstName,
  lastName,
  title,
  accentColor,
  avatarImage,
}: ThreeDImmersivePreviewProps) {
  const { t } = useI18n();
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || t.stylePreview.playground.defaultName;
  const displayTitle = title || t.stylePreview.playground.defaultTitle;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate initials
  const getInitials = () => {
    if (!firstName && !lastName) return "YN";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  // Particle animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
        ctx.fill();

        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <Card className="overflow-hidden">
      <div
        className="relative min-h-[600px] bg-black text-white overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Animated Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.6 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />

        {/* 3D Floating Grid Effect */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `perspective(1000px) rotateX(60deg) translateZ(${mousePos.y * 50}px)`,
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] p-8 md:p-12">
          {/* Floating Avatar with 3D effect */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0, rotateY: 0 }}
            animate={{
              scale: 1,
              rotateY: [0, 10, -10, 0],
            }}
            transition={{
              scale: { delay: 0.1, type: "spring" },
              rotateY: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
            style={{
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full blur-2xl bg-purple-500 opacity-50 animate-pulse" />

              {avatarImage ? (
                <img
                  src={avatarImage}
                  alt={displayName}
                  className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-purple-500 shadow-2xl shadow-purple-500/50"
                />
              ) : (
                <div
                  className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold border-4 border-purple-500 shadow-2xl shadow-purple-500/50"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, #8B5CF6)`,
                    fontFamily: template.fonts.heading,
                  }}
                >
                  {getInitials()}
                </div>
              )}
            </div>
          </motion.div>

          {/* Name with 3D text effect */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 text-center"
            style={{
              fontFamily: template.fonts.heading,
              textShadow: `
                0 0 20px rgba(139, 92, 246, 0.5),
                0 0 40px rgba(139, 92, 246, 0.3),
                4px 4px 0px rgba(0, 0, 0, 0.8)
              `,
              transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            key={displayName}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {displayName}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-6 text-center"
            style={{
              fontFamily: template.fonts.body,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            key={displayTitle}
          >
            {displayTitle}
          </motion.p>

          {/* Floating Skill Tags with 3D effect */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {template.features.slice(0, 4).map((feature, index) => (
              <motion.div
                key={feature}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2 + index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Badge
                  className="text-xs px-4 py-2 backdrop-blur-md border-2 shadow-lg"
                  style={{
                    backgroundColor: "rgba(139, 92, 246, 0.2)",
                    borderColor: "rgba(139, 92, 246, 0.5)",
                    color: "#E9D5FF",
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                  }}
                >
                  <Layers className="w-3 h-3 mr-1 inline" />
                  {feature}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons with 3D hover effect */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05, rotateX: 5 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, #8B5CF6)`,
                  boxShadow: `0 10px 30px rgba(139, 92, 246, 0.4)`,
                }}
              >
                <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                {t.stylePreview.playground.contactMe}
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, rotateX: -5 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 backdrop-blur-md"
                style={{
                  borderColor: "#8B5CF6",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  color: "#E9D5FF",
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                }}
              >
                <Zap className="w-4 h-4 mr-2" />
                {t.stylePreview.playground.portfolio}
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating decorative elements */}
          <div className="absolute top-10 left-10 opacity-30">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Box className="w-12 h-12 text-purple-400" />
            </motion.div>
          </div>

          <div className="absolute bottom-10 right-10 opacity-30">
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Layers className="w-16 h-16 text-cyan-400" />
            </motion.div>
          </div>
        </div>
      </div>
    </Card>
  );
}
