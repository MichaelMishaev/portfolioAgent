"use client";

import { motion } from "framer-motion";
import { TemplateConfig } from "@/lib/template-registry";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Paperclip, Star, Sticker, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface CollageMaximalistPreviewProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
  accentColor: string;
  avatarImage?: string | null;
}

export function CollageMaximalistPreview({
  template,
  firstName,
  lastName,
  title,
  accentColor,
  avatarImage,
}: CollageMaximalistPreviewProps) {
  const { t } = useI18n();
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || t.stylePreview.playground.defaultName;
  const displayTitle = title || t.stylePreview.playground.defaultTitle;

  // Generate initials
  const getInitials = () => {
    if (!firstName && !lastName) return "YN";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  // Maximalist color palette - vibrant and chaotic
  const collageColors = {
    primary: accentColor || "#FF6B6B",
    pink: "#FF6B9D",
    orange: "#FFA94D",
    yellow: "#FFD93D",
    purple: "#9775FA",
    blue: "#4DABF7",
    green: "#51CF66",
  };

  return (
    <Card className="overflow-hidden border-0">
      <div
        className="relative min-h-[650px] p-8 md:p-12 overflow-hidden"
        style={{
          background: `linear-gradient(45deg, #FFF5E1 0%, #FFE5CC 25%, #FFEEDD 50%, #F0E68C 75%, #FFF5E1 100%)`,
        }}
      >
        {/* Torn Paper Texture Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Scattered Paper Pieces */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 opacity-30"
            style={{
              left: `${15 + i * 12}%`,
              top: `${10 + (i % 3) * 30}%`,
              transform: `rotate(${i * 30 - 60}deg)`,
              backgroundColor: [collageColors.pink, collageColors.orange, collageColors.yellow, collageColors.purple, collageColors.blue, collageColors.green, collageColors.primary, collageColors.pink][i],
              borderRadius: "3px",
              boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
            }}
            animate={{
              rotate: [i * 30 - 60, i * 30 - 50, i * 30 - 60],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Tape Strips */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`tape-${i}`}
            className="absolute h-8 opacity-20"
            style={{
              width: `${60 + i * 20}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 15}%`,
              transform: `rotate(${i * 20 - 40}deg)`,
              backgroundColor: "#F5E6D3",
              border: "1px solid #D4A574",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}

        {/* Main Content Container - Scrapbook Style */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Layered Avatar with Tape */}
          <motion.div
            className="relative mb-8"
            initial={{ rotate: -5, scale: 0 }}
            animate={{ rotate: 3, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {/* Background Layer */}
            <div
              className="absolute -inset-3 rounded-lg"
              style={{
                backgroundColor: collageColors.yellow,
                transform: "rotate(-6deg)",
                boxShadow: "4px 4px 12px rgba(0,0,0,0.2)",
              }}
            />

            {/* Middle Layer */}
            <div
              className="absolute -inset-2 rounded-lg"
              style={{
                backgroundColor: collageColors.pink,
                transform: "rotate(4deg)",
                boxShadow: "3px 3px 10px rgba(0,0,0,0.15)",
              }}
            />

            {/* Avatar */}
            <div className="relative">
              {avatarImage ? (
                <img
                  src={avatarImage}
                  alt={displayName}
                  className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-lg shadow-xl"
                  style={{
                    border: "4px solid white",
                    transform: "rotate(-2deg)",
                  }}
                />
              ) : (
                <div
                  className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center text-white text-3xl md:text-4xl font-black rounded-lg shadow-xl"
                  style={{
                    backgroundColor: collageColors.primary,
                    border: "4px solid white",
                    transform: "rotate(-2deg)",
                    fontFamily: template.fonts.heading,
                  }}
                >
                  {getInitials()}
                </div>
              )}

              {/* Tape on corners */}
              <div className="absolute -top-2 -left-2 w-12 h-6 bg-gradient-to-r from-yellow-100 to-yellow-200 opacity-70 transform -rotate-45" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />
              <div className="absolute -top-2 -right-2 w-12 h-6 bg-gradient-to-r from-yellow-100 to-yellow-200 opacity-70 transform rotate-45" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />
            </div>

            {/* Decorative stickers */}
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-8 h-8" style={{ color: collageColors.orange, fill: collageColors.orange }} />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4"
              animate={{ rotate: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8" style={{ color: collageColors.purple, fill: collageColors.purple }} />
            </motion.div>
          </motion.div>

          {/* Name - Cutout Magazine Style */}
          <motion.div
            className="relative mb-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center"
              style={{
                fontFamily: template.fonts.heading,
                textShadow: "4px 4px 0px rgba(0,0,0,0.1)",
              }}
            >
              {displayName.split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block px-1"
                  style={{
                    color: [collageColors.primary, collageColors.purple, collageColors.blue, collageColors.orange, collageColors.pink, collageColors.green][index % 6],
                    transform: `rotate(${Math.sin(index) * 5}deg)`,
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Title - Paper Strip Style */}
          <motion.div
            className="relative inline-block mb-8 px-8 py-3 -mx-4"
            style={{
              backgroundColor: collageColors.yellow,
              transform: "rotate(-1deg)",
              boxShadow: "3px 3px 8px rgba(0,0,0,0.2)",
              border: "2px dashed rgba(0,0,0,0.2)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            key={displayTitle}
          >
            <Paperclip className="absolute -top-3 left-4 w-6 h-6" style={{ color: "#666", transform: "rotate(45deg)" }} />
            <p
              className="text-lg md:text-xl font-bold"
              style={{
                fontFamily: template.fonts.body,
                color: "#2D3748",
              }}
            >
              {displayTitle}
            </p>
          </motion.div>

          {/* Chaotic Skill Stickers */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {template.features.slice(0, 4).map((feature, index) => (
              <motion.div
                key={feature}
                className="relative"
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: [0, 10, -10, 0][index % 4], scale: 1 }}
                transition={{
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
              >
                <Badge
                  className="text-sm font-bold px-5 py-3 border-3"
                  style={{
                    backgroundColor: [collageColors.pink, collageColors.orange, collageColors.purple, collageColors.blue][index % 4],
                    color: "white",
                    transform: `rotate(${[5, -3, 7, -5][index % 4]}deg)`,
                    boxShadow: "3px 3px 8px rgba(0,0,0,0.3)",
                    border: "2px solid rgba(255,255,255,0.5)",
                  }}
                >
                  {feature}
                </Badge>
                {/* Random stickers on badges */}
                {index % 2 === 0 && (
                  <Sticker className="absolute -top-2 -right-2 w-5 h-5" style={{ color: collageColors.yellow, fill: collageColors.yellow }} />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Layered CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05, rotate: 0 }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: "rotate(-2deg)" }}
            >
              <Button
                size="lg"
                className="font-black uppercase border-4 shadow-lg"
                style={{
                  backgroundColor: collageColors.primary,
                  borderColor: "white",
                  color: "white",
                  boxShadow: "5px 5px 0px rgba(0,0,0,0.3)",
                }}
              >
                <Scissors className="w-4 h-4 mr-2" />
                {t.stylePreview.playground.contactMe}
              </Button>
              {/* Decorative tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-gradient-to-r from-yellow-100 to-yellow-200 opacity-70" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />
            </motion.div>

            <motion.div
              className="relative"
              whileHover={{ scale: 1.05, rotate: 0 }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: "rotate(2deg)" }}
            >
              <Button
                size="lg"
                variant="outline"
                className="font-black uppercase border-4 shadow-lg"
                style={{
                  backgroundColor: "white",
                  borderColor: collageColors.purple,
                  color: collageColors.purple,
                  boxShadow: "5px 5px 0px rgba(0,0,0,0.2)",
                }}
              >
                <Star className="w-4 h-4 mr-2" />
                {t.stylePreview.playground.portfolio}
              </Button>
            </motion.div>
          </motion.div>

          {/* Scattered decorative elements */}
          <motion.div
            className="absolute top-20 left-10 text-6xl opacity-20"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ★
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-10 text-5xl opacity-20"
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            ✂
          </motion.div>

          <motion.div
            className="absolute top-40 right-20 text-4xl opacity-20"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦
          </motion.div>
        </div>
      </div>
    </Card>
  );
}
