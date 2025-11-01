"use client";

import { motion } from "framer-motion";
import { TemplateConfig } from "@/lib/template-registry";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Leaf, Heart, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface OrganicLiquidPreviewProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
  accentColor: string;
  avatarImage?: string | null;
}

export function OrganicLiquidPreview({
  template,
  firstName,
  lastName,
  title,
  accentColor,
  avatarImage,
}: OrganicLiquidPreviewProps) {
  const { t } = useI18n();
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || t.stylePreview.playground.defaultName;
  const displayTitle = title || t.stylePreview.playground.defaultTitle;

  // Generate initials
  const getInitials = () => {
    if (!firstName && !lastName) return "YN";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  // Organic color palette - soft, nature-inspired
  const organicColors = {
    primary: accentColor || "#10B981",
    sage: "#93C5A4",
    mint: "#B8E6CF",
    coral: "#FFB4A9",
    lavender: "#E0BBE4",
    peach: "#FFD6BA",
  };

  return (
    <Card className="overflow-hidden border-0">
      <div
        className="relative min-h-[600px] p-8 md:p-12 flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg,
            ${organicColors.mint}20 0%,
            ${organicColors.lavender}20 50%,
            ${organicColors.peach}20 100%
          )`,
        }}
      >
        {/* Animated Blob Backgrounds */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="blob1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={organicColors.sage} />
              <stop offset="100%" stopColor={organicColors.mint} />
            </linearGradient>
            <linearGradient id="blob2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={organicColors.coral} />
              <stop offset="100%" stopColor={organicColors.peach} />
            </linearGradient>
            <linearGradient id="blob3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={organicColors.lavender} />
              <stop offset="100%" stopColor={organicColors.primary} />
            </linearGradient>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
            </filter>
          </defs>

          {/* Morphing Blob 1 */}
          <motion.path
            fill="url(#blob1)"
            filter="url(#goo)"
            animate={{
              d: [
                "M450,300 Q500,200 550,300 T650,300 Q700,350 650,400 T550,400 Q500,450 450,400 T350,400 Q300,350 350,300 T450,300 Z",
                "M440,310 Q510,210 560,310 T660,310 Q710,360 660,410 T560,410 Q510,460 440,410 T340,410 Q290,360 340,310 T440,310 Z",
                "M450,300 Q500,200 550,300 T650,300 Q700,350 650,400 T550,400 Q500,450 450,400 T350,400 Q300,350 350,300 T450,300 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Morphing Blob 2 */}
          <motion.path
            fill="url(#blob2)"
            filter="url(#goo)"
            animate={{
              d: [
                "M200,600 Q250,550 300,600 T400,600 Q450,650 400,700 T300,700 Q250,750 200,700 T100,700 Q50,650 100,600 T200,600 Z",
                "M210,590 Q260,540 310,590 T410,590 Q460,640 410,690 T310,690 Q260,740 210,690 T110,690 Q60,640 110,590 T210,590 Z",
                "M200,600 Q250,550 300,600 T400,600 Q450,650 400,700 T300,700 Q250,750 200,700 T100,700 Q50,650 100,600 T200,600 Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Morphing Blob 3 */}
          <motion.path
            fill="url(#blob3)"
            filter="url(#goo)"
            animate={{
              d: [
                "M750,500 Q800,450 850,500 T950,500 Q1000,550 950,600 T850,600 Q800,650 750,600 T650,600 Q600,550 650,500 T750,500 Z",
                "M760,490 Q810,440 860,490 T960,490 Q1010,540 960,590 T860,590 Q810,640 760,590 T660,590 Q610,540 660,490 T760,490 Z",
                "M750,500 Q800,450 850,500 T950,500 Q1000,550 950,600 T850,600 Q800,650 750,600 T650,600 Q600,550 650,500 T750,500 Z",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </svg>

        {/* Content Container */}
        <div className="relative z-10 text-center max-w-3xl">
          {/* Floating Avatar with Blob Border */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              {/* Morphing blob border */}
              <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={organicColors.sage} />
                    <stop offset="50%" stopColor={organicColors.primary} />
                    <stop offset="100%" stopColor={organicColors.coral} />
                  </linearGradient>
                </defs>
                <motion.path
                  fill="url(#avatarGradient)"
                  filter="url(#goo)"
                  animate={{
                    d: [
                      "M100,20 Q140,40 150,80 Q160,120 140,150 Q120,180 80,170 Q40,160 30,120 Q20,80 40,50 Q60,20 100,20 Z",
                      "M100,25 Q135,45 145,85 Q155,125 135,155 Q115,185 75,175 Q35,165 25,125 Q15,85 35,55 Q55,25 100,25 Z",
                      "M100,20 Q140,40 150,80 Q160,120 140,150 Q120,180 80,170 Q40,160 30,120 Q20,80 40,50 Q60,20 100,20 Z",
                    ],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>

              {avatarImage ? (
                <img
                  src={avatarImage}
                  alt={displayName}
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-xl"
                  style={{
                    filter: "drop-shadow(0 10px 30px rgba(16, 185, 129, 0.3))",
                  }}
                />
              ) : (
                <div
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${organicColors.sage}, ${organicColors.primary})`,
                    filter: "drop-shadow(0 10px 30px rgba(16, 185, 129, 0.3))",
                    fontFamily: template.fonts.heading,
                  }}
                >
                  {getInitials()}
                </div>
              )}
            </div>
          </motion.div>

          {/* Name with Soft Gradient */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            style={{
              fontFamily: template.fonts.heading,
              background: `linear-gradient(135deg, ${organicColors.sage}, ${organicColors.primary}, ${organicColors.coral})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            key={displayName}
          >
            {displayName}
          </motion.h1>

          {/* Title with Soft Background */}
          <motion.div
            className="inline-block mb-8 px-6 py-3 rounded-full backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, ${organicColors.mint}40, ${organicColors.lavender}40)`,
              border: `2px solid ${organicColors.sage}60`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            key={displayTitle}
          >
            <p
              className="text-lg md:text-xl font-medium"
              style={{
                fontFamily: template.fonts.body,
                color: "#374151",
              }}
            >
              {displayTitle}
            </p>
          </motion.div>

          {/* Flowing Skill Tags */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {template.features.slice(0, 4).map((feature, index) => (
              <motion.div
                key={feature}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              >
                <Badge
                  className="text-sm px-4 py-2 rounded-full backdrop-blur-md border-2"
                  style={{
                    background: `linear-gradient(135deg, ${[organicColors.mint, organicColors.coral, organicColors.lavender, organicColors.peach][index % 4]}80, white)`,
                    borderColor: [organicColors.sage, organicColors.coral, organicColors.primary, organicColors.lavender][index % 4],
                    color: "#374151",
                    boxShadow: `0 4px 15px ${[organicColors.mint, organicColors.coral, organicColors.lavender, organicColors.peach][index % 4]}30`,
                  }}
                >
                  {[<Leaf className="w-3 h-3 mr-1 inline" />, <Heart className="w-3 h-3 mr-1 inline" />, <Droplets className="w-3 h-3 mr-1 inline" />, <Sparkles className="w-3 h-3 mr-1 inline" />][index % 4]}
                  {feature}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Soft CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="rounded-full shadow-lg border-2"
                style={{
                  background: `linear-gradient(135deg, ${organicColors.sage}, ${organicColors.primary})`,
                  borderColor: organicColors.mint,
                  color: "white",
                  boxShadow: `0 10px 30px ${organicColors.primary}40`,
                }}
              >
                <Leaf className="w-4 h-4 mr-2" />
                {t.stylePreview.playground.contactMe}
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="rounded-full backdrop-blur-md border-2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderColor: organicColors.coral,
                  color: "#374151",
                }}
              >
                <Heart className="w-4 h-4 mr-2" />
                {t.stylePreview.playground.portfolio}
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Decorative Elements */}
          <motion.div
            className="absolute top-10 left-10 opacity-40"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Droplets className="w-16 h-16" style={{ color: organicColors.sage }} />
          </motion.div>

          <motion.div
            className="absolute bottom-10 right-10 opacity-40"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Leaf className="w-20 h-20" style={{ color: organicColors.coral }} />
          </motion.div>
        </div>
      </div>
    </Card>
  );
}
