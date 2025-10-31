"use client";

import { motion } from "framer-motion";
import { TemplateConfig } from "@/lib/template-registry";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Eye, Briefcase, Star, Github, Linkedin, Twitter } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface DefaultPreviewProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
  accentColor: string;
}

export function DefaultPreview({
  template,
  firstName,
  lastName,
  title,
  accentColor,
}: DefaultPreviewProps) {
  const { t } = useI18n();
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || t.stylePreview.playground.defaultName;
  const displayTitle = title || t.stylePreview.playground.defaultTitle;

  // Generate initials from name
  const getInitials = () => {
    if (!firstName && !lastName) return "YN";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <Card className="overflow-hidden">
      <div
        className="relative p-8 md:p-12 text-center"
        style={{
          background: `linear-gradient(135deg, ${template.colors.secondary}00 0%, ${template.colors.secondary}20 100%)`,
        }}
      >
        {/* Avatar with Initials */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          <div
            className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg"
            style={{
              backgroundColor: accentColor,
              fontFamily: template.fonts.heading,
            }}
          >
            {getInitials()}
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-2 transition-all duration-300"
          style={{
            fontFamily: template.fonts.heading,
            color: template.colors.primary,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          key={displayName}
        >
          {displayName}
        </motion.h1>

        {/* Title */}
        <motion.h2
          className="text-lg md:text-xl font-medium mb-6 transition-all duration-300"
          style={{
            fontFamily: template.fonts.body,
            color: template.colors.primary,
            opacity: 0.7,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.7 }}
          transition={{ delay: 0.3 }}
          key={displayTitle}
        >
          {displayTitle}
        </motion.h2>

        {/* Skill Tags */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {template.features.slice(0, 3).map((feature, index) => (
            <Badge
              key={feature}
              variant="secondary"
              className="text-xs px-3 py-1"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
                borderColor: `${accentColor}40`,
              }}
            >
              {feature}
            </Badge>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-6 text-sm"
          style={{
            color: template.colors.primary,
            opacity: 0.8,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.8 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4" style={{ color: accentColor }} />
            <span>{t.stylePreview.playground.projects}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4" style={{ color: accentColor }} />
            <span>{t.stylePreview.playground.available}</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            className="shadow-lg hover:shadow-xl transition-all group"
            style={{
              backgroundColor: accentColor,
              color: "#ffffff",
            }}
          >
            <Mail className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            {t.stylePreview.playground.contactMe}
          </Button>
          <Button
            variant="outline"
            className="shadow-sm hover:shadow-md transition-all"
            style={{
              borderColor: accentColor,
              color: accentColor,
            }}
          >
            <Eye className="w-4 h-4 mr-2" />
            {t.stylePreview.playground.portfolio}
          </Button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[Github, Linkedin, Twitter].map((Icon, index) => (
            <button
              key={index}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                backgroundColor: `${template.colors.primary}10`,
                color: template.colors.primary,
              }}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </motion.div>

        {/* Animated background accents */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: accentColor }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none"
          style={{ backgroundColor: template.colors.primary }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>
    </Card>
  );
}
