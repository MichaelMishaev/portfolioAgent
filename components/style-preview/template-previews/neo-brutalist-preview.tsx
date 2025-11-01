"use client";

import { motion } from "framer-motion";
import { TemplateConfig } from "@/lib/template-registry";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Zap, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface NeoBrutalistPreviewProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
  accentColor: string;
  avatarImage?: string | null;
}

export function NeoBrutalistPreview({
  template,
  firstName,
  lastName,
  title,
  accentColor,
  avatarImage,
}: NeoBrutalistPreviewProps) {
  const { t } = useI18n();
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || t.stylePreview.playground.defaultName;
  const displayTitle = title || t.stylePreview.playground.defaultTitle;

  // Generate initials
  const getInitials = () => {
    if (!firstName && !lastName) return "YN";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  // Neo-brutalist color palette
  const colors = {
    bg: "#FFFFFF",
    black: "#000000",
    accent: accentColor || "#FF3366",
    yellow: "#FFFF00",
    cyan: "#00FFFF",
    green: "#00FF00",
  };

  return (
    <Card className="overflow-hidden border-0 shadow-none">
      <div
        className="relative p-8 md:p-12"
        style={{
          backgroundColor: colors.bg,
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 10px, ${colors.black} 10px, ${colors.black} 11px),
            repeating-linear-gradient(90deg, transparent, transparent 10px, ${colors.black} 10px, ${colors.black} 11px)
          `,
          backgroundSize: "100px 100px",
        }}
      >
        {/* Heavy black border frame */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: "8px solid #000000",
            boxShadow: "inset 0 0 0 4px #FFFFFF",
          }}
        />

        {/* Content Container with stark background */}
        <div className="relative z-10 bg-white border-8 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          {/* Avatar - Brutalist style */}
          <motion.div
            className="mb-6"
            initial={{ x: -50, opacity: 0, rotate: -5 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          >
            {avatarImage ? (
              <div className="inline-block border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-2">
                <img
                  src={avatarImage}
                  alt={displayName}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover"
                />
              </div>
            ) : (
              <div
                className="inline-flex w-20 h-20 md:w-24 md:h-24 items-center justify-center text-white text-3xl md:text-4xl font-black border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-2"
                style={{
                  backgroundColor: colors.accent,
                  fontFamily: template.fonts.heading,
                }}
              >
                {getInitials()}
              </div>
            )}
          </motion.div>

          {/* Name - HUGE, BOLD, CONFRONTATIONAL */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 leading-none uppercase tracking-tighter"
            style={{
              fontFamily: template.fonts.heading,
              color: colors.black,
              textShadow: `4px 4px 0px ${colors.accent}`,
              WebkitTextStroke: "2px black",
              paintOrder: "stroke fill",
            }}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            key={displayName}
          >
            {displayName.split(" ").map((word, index) => (
              <motion.span
                key={word + index}
                className="inline-block mr-4"
                animate={{
                  rotate: [0, -2, 2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Title - Bold and in-your-face */}
          <motion.div
            className="inline-block mb-6 p-3 border-4 border-black"
            style={{
              backgroundColor: colors.yellow,
              boxShadow: "6px 6px 0px rgba(0, 0, 0, 1)",
              transform: "rotate(-1deg)",
            }}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            key={displayTitle}
          >
            <p
              className="text-lg md:text-xl font-black uppercase"
              style={{
                fontFamily: template.fonts.body,
                color: colors.black,
              }}
            >
              {displayTitle}
            </p>
          </motion.div>

          {/* Chaotic Skill Tags */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {template.features.slice(0, 4).map((feature, index) => (
              <motion.div
                key={feature}
                animate={{
                  rotate: [0, index % 2 === 0 ? 2 : -2, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              >
                <Badge
                  className="text-xs font-black uppercase px-4 py-2 border-4 border-black"
                  style={{
                    backgroundColor: [colors.cyan, colors.green, colors.accent, colors.yellow][index % 4],
                    color: colors.black,
                    boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
                    transform: `rotate(${index % 2 === 0 ? "1deg" : "-1deg"})`,
                  }}
                >
                  {feature}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Aggressive Stats */}
          <motion.div
            className="grid grid-cols-2 gap-4 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="p-4 border-6 border-black"
              style={{
                backgroundColor: colors.accent,
                boxShadow: "6px 6px 0px rgba(0, 0, 0, 1)",
              }}
            >
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6" style={{ color: colors.black }} />
                <span className="text-sm font-black uppercase" style={{ color: colors.black }}>
                  {t.stylePreview.playground.available}
                </span>
              </div>
            </div>

            <div
              className="p-4 border-6 border-black"
              style={{
                backgroundColor: colors.cyan,
                boxShadow: "6px 6px 0px rgba(0, 0, 0, 1)",
              }}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6" style={{ color: colors.black }} />
                <span className="text-sm font-black uppercase" style={{ color: colors.black }}>
                  {t.stylePreview.playground.projects}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Confrontational CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              whileHover={{ x: 10, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="font-black uppercase border-6 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.black,
                }}
              >
                {t.stylePreview.playground.contactMe}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ x: -10, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="font-black uppercase border-6 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                style={{
                  backgroundColor: colors.yellow,
                  borderColor: colors.black,
                  color: colors.black,
                }}
              >
                {t.stylePreview.playground.portfolio}
                <AlertCircle className="w-5 h-5 ml-2 inline" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Chaotic decorative elements */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 border-4 border-black"
          style={{ backgroundColor: colors.green }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-4 left-4 w-16 h-16 border-4 border-black"
          style={{ backgroundColor: colors.cyan }}
          animate={{
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute top-1/2 right-8 text-6xl font-black"
          style={{
            color: colors.accent,
            WebkitTextStroke: "2px black",
            opacity: 0.3,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          *
        </motion.div>
      </div>
    </Card>
  );
}
