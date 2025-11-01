"use client";

import { motion } from "framer-motion";
import { TemplateConfig } from "@/lib/template-registry";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Globe, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { useState, useEffect } from "react";

interface Y2KRetroPreviewProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
  accentColor: string;
  avatarImage?: string | null;
}

export function Y2KRetroPreview({
  template,
  firstName,
  lastName,
  title,
  accentColor,
  avatarImage,
}: Y2KRetroPreviewProps) {
  const { t } = useI18n();
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || t.stylePreview.playground.defaultName;
  const displayTitle = title || t.stylePreview.playground.defaultTitle;
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Generate initials
  const getInitials = () => {
    if (!firstName && !lastName) return "YN";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  // Y2K color palette - bright, neon, nostalgic
  const y2kColors = {
    primary: accentColor || "#FF00FF",
    cyan: "#00FFFF",
    lime: "#CCFF00",
    hotPink: "#FF1493",
    orange: "#FF6600",
    purple: "#9933FF",
    blue: "#0099FF",
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Card className="overflow-hidden border-0">
      <div
        className="relative min-h-[650px] p-8 md:p-12 overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, ${y2kColors.purple}20 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, ${y2kColors.cyan}20 0%, transparent 50%),
            linear-gradient(180deg, #000033 0%, #000066 50%, #000033 100%)
          `,
        }}
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(${y2kColors.cyan} 2px, transparent 2px),
                linear-gradient(90deg, ${y2kColors.cyan} 2px, transparent 2px)
              `,
              backgroundSize: "50px 50px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "50px 50px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Floating Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: [y2kColors.cyan, y2kColors.lime, y2kColors.hotPink, y2kColors.orange][i % 4],
              boxShadow: `0 0 10px ${[y2kColors.cyan, y2kColors.lime, y2kColors.hotPink, y2kColors.orange][i % 4]}`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Cursor Trail */}
        <motion.div
          className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen"
          style={{
            background: `radial-gradient(circle, ${y2kColors.hotPink}, transparent)`,
            filter: "blur(8px)",
          }}
          animate={{
            x: cursorPosition.x - 16,
            y: cursorPosition.y - 16,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Glowing Avatar with Chrome Effect */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          >
            {/* Glow rings */}
            <motion.div
              className="absolute -inset-6 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, ${y2kColors.cyan}, ${y2kColors.hotPink}, ${y2kColors.lime}, ${y2kColors.cyan})`,
                filter: "blur(20px)",
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {avatarImage ? (
              <img
                src={avatarImage}
                alt={displayName}
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4"
                style={{
                  borderColor: y2kColors.cyan,
                  boxShadow: `0 0 30px ${y2kColors.cyan}, inset 0 0 20px rgba(0,255,255,0.3)`,
                }}
              />
            ) : (
              <div
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center text-black text-3xl md:text-4xl font-black border-4"
                style={{
                  background: `linear-gradient(135deg, ${y2kColors.cyan}, ${y2kColors.hotPink})`,
                  borderColor: y2kColors.lime,
                  boxShadow: `0 0 30px ${y2kColors.cyan}, inset 0 0 20px rgba(255,255,255,0.3)`,
                  fontFamily: template.fonts.heading,
                }}
              >
                {getInitials()}
              </div>
            )}

            {/* Orbiting sparkles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  rotate: [i * 90, i * 90 + 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles
                  className="w-4 h-4 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    color: [y2kColors.cyan, y2kColors.hotPink, y2kColors.lime, y2kColors.orange][i],
                    filter: `drop-shadow(0 0 4px ${[y2kColors.cyan, y2kColors.hotPink, y2kColors.lime, y2kColors.orange][i]})`,
                    transform: `translate(-50%, -60px)`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Name with Chrome/Metallic Effect */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 uppercase"
            style={{
              fontFamily: template.fonts.heading,
              background: `linear-gradient(135deg, ${y2kColors.cyan} 0%, ${y2kColors.hotPink} 25%, ${y2kColors.lime} 50%, ${y2kColors.orange} 75%, ${y2kColors.cyan} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200% auto",
              textShadow: `0 0 20px ${y2kColors.cyan}, 0 0 40px ${y2kColors.hotPink}`,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              backgroundPosition: ["0% center", "200% center"],
            }}
            transition={{
              y: { type: "spring", stiffness: 200, delay: 0.2 },
              opacity: { delay: 0.2 },
              backgroundPosition: {
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            key={displayName}
          >
            {displayName}
          </motion.h1>

          {/* Title with Glowing Box */}
          <motion.div
            className="inline-block mb-8 px-8 py-4 border-4 relative"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderColor: y2kColors.hotPink,
              boxShadow: `0 0 20px ${y2kColors.hotPink}, inset 0 0 20px ${y2kColors.cyan}40`,
              backdropFilter: "blur(10px)",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            key={displayTitle}
          >
            {/* Corner decorations */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 border-2"
                style={{
                  [["top", "top", "bottom", "bottom"][i]]: "-6px",
                  [["left", "right", "left", "right"][i]]: "-6px",
                  borderColor: y2kColors.lime,
                  backgroundColor: y2kColors.cyan,
                  boxShadow: `0 0 10px ${y2kColors.lime}`,
                }}
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}

            <p
              className="text-xl md:text-2xl font-bold uppercase"
              style={{
                fontFamily: template.fonts.body,
                color: y2kColors.lime,
                textShadow: `0 0 10px ${y2kColors.lime}`,
              }}
            >
              {displayTitle}
            </p>
          </motion.div>

          {/* Glowing Skill Badges */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                  className="text-sm font-black uppercase px-5 py-3 border-3"
                  style={{
                    backgroundColor: [y2kColors.cyan, y2kColors.hotPink, y2kColors.lime, y2kColors.orange][index % 4],
                    color: "#000",
                    border: `3px solid ${[y2kColors.hotPink, y2kColors.cyan, y2kColors.orange, y2kColors.lime][index % 4]}`,
                    boxShadow: `0 0 20px ${[y2kColors.cyan, y2kColors.hotPink, y2kColors.lime, y2kColors.orange][index % 4]}`,
                    textShadow: "none",
                  }}
                >
                  {[<Zap className="w-3 h-3 mr-1 inline" />, <Heart className="w-3 h-3 mr-1 inline" />, <Globe className="w-3 h-3 mr-1 inline" />, <Sparkles className="w-3 h-3 mr-1 inline" />][index % 4]}
                  {feature}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Chunky 3D Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="font-black uppercase border-4 relative overflow-hidden"
                style={{
                  backgroundColor: y2kColors.hotPink,
                  borderColor: y2kColors.cyan,
                  color: "#000",
                  boxShadow: `0 8px 0 ${y2kColors.purple}, 0 0 30px ${y2kColors.hotPink}`,
                  textShadow: `0 0 5px ${y2kColors.lime}`,
                }}
              >
                <Globe className="w-4 h-4 mr-2" />
                {t.stylePreview.playground.contactMe}
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="font-black uppercase border-4"
                style={{
                  backgroundColor: y2kColors.lime,
                  borderColor: y2kColors.hotPink,
                  color: "#000",
                  boxShadow: `0 8px 0 ${y2kColors.orange}, 0 0 30px ${y2kColors.lime}`,
                }}
              >
                <Heart className="w-4 h-4 mr-2" />
                {t.stylePreview.playground.portfolio}
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated Text Banner */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 py-4 overflow-hidden"
            style={{
              background: `linear-gradient(90deg, ${y2kColors.cyan}, ${y2kColors.hotPink}, ${y2kColors.lime}, ${y2kColors.orange}, ${y2kColors.cyan})`,
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.p
              className="text-center text-2xl font-black uppercase"
              style={{
                color: "#000",
                textShadow: "2px 2px 0 rgba(255,255,255,0.5)",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ★ WELCOME TO MY PAGE ★ Y2K VIBES ★ RETRO NOSTALGIA ★
            </motion.p>
          </motion.div>
        </div>
      </div>
    </Card>
  );
}
