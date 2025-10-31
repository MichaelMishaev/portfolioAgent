"use client";

import { motion } from "framer-motion";
import { TemplateConfig } from "@/lib/template-registry";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Star, Github, Linkedin, Twitter } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface MinimalistPreviewProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
  accentColor: string;
}

export function MinimalistPreview({
  template,
  firstName,
  lastName,
  title,
  accentColor,
}: MinimalistPreviewProps) {
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
      <div className="p-8 md:p-12 bg-background">
        {/* Avatar - left aligned for minimalist */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-light shadow-md"
            style={{
              backgroundColor: accentColor,
              fontFamily: template.fonts.heading,
            }}
          >
            {getInitials()}
          </div>
        </motion.div>

        {/* Name - minimalist style: left-aligned, huge, ultra-light */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tighter leading-none break-words"
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
        <motion.p
          className="text-lg md:text-xl font-light mb-8"
          style={{
            fontFamily: template.fonts.body,
            color: `${template.colors.primary}80`,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          key={displayTitle}
        >
          {displayTitle}
        </motion.p>

        {/* Skill Tags - minimalist style */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {template.features.slice(0, 3).map((feature) => (
            <Badge
              key={feature}
              variant="outline"
              className="text-xs font-light px-3 py-1"
              style={{
                borderColor: `${template.colors.primary}30`,
                color: template.colors.primary,
              }}
            >
              {feature}
            </Badge>
          ))}
        </motion.div>

        {/* Quick Stats - minimalist */}
        <motion.div
          className="flex items-center gap-8 mb-12 text-sm font-light"
          style={{
            color: template.colors.primary,
            opacity: 0.6,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>{t.stylePreview.playground.projects}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>{t.stylePreview.playground.available}</span>
          </div>
        </motion.div>

        {/* CTA Link - minimalist uppercase style */}
        <motion.div
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="#contact"
            className="text-xs uppercase tracking-widest border-b pb-1 transition-colors inline-block hover:opacity-70"
            style={{
              borderColor: template.colors.primary,
              color: template.colors.primary,
            }}
          >
            {t.stylePreview.playground.contactMe}
          </a>
        </motion.div>

        {/* Social Icons - minimal */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[Github, Linkedin, Twitter].map((Icon, index) => (
            <button
              key={index}
              className="transition-opacity hover:opacity-70"
              style={{
                color: template.colors.primary,
                opacity: 0.5,
              }}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </motion.div>
      </div>
    </Card>
  );
}
