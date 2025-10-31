"use client";

import { motion } from "framer-motion";
import { TemplateConfig } from "@/lib/template-registry";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Eye, Briefcase, Star, Github, Linkedin, Twitter } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface DarkModePreviewProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
  accentColor: string;
}

export function DarkModePreview({
  template,
  firstName,
  lastName,
  title,
  accentColor,
}: DarkModePreviewProps) {
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
      <div className="relative flex items-center justify-center min-h-[500px] p-8 md:p-12 bg-black text-white">
        {/* Animated Gradient Background - matches dark-mode template exactly */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10 text-center max-w-2xl">
          {/* Avatar with Gradient Border */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
          >
            <div className="p-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500">
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-black text-white text-2xl md:text-3xl font-bold shadow-xl"
                style={{
                  fontFamily: template.fonts.heading,
                }}
              >
                {getInitials()}
              </div>
            </div>
          </motion.div>

          {/* Name with gradient - matches dark-mode template hero */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            style={{
              fontFamily: template.fonts.heading,
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
            className="text-lg md:text-xl text-gray-300 mb-6"
            style={{
              fontFamily: template.fonts.body,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            key={displayTitle}
          >
            {displayTitle}
          </motion.p>

          {/* Skill Tags with glow effect */}
          <motion.div
            className="flex flex-wrap gap-2 justify-center mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {template.features.slice(0, 3).map((feature) => (
              <Badge
                key={feature}
                className="text-xs px-3 py-1 bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
              >
                {feature}
              </Badge>
            ))}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>{t.stylePreview.playground.projects}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-cyan-400" />
              <span>{t.stylePreview.playground.available}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all shadow-lg hover:shadow-cyan-500/50"
            >
              <Mail className="w-4 h-4 mr-2" />
              {t.stylePreview.playground.contactMe}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
            >
              <Eye className="w-4 h-4 mr-2" />
              {t.stylePreview.playground.portfolio}
            </Button>
          </motion.div>

          {/* Social Icons with glow */}
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {[Github, Linkedin, Twitter].map((Icon, index) => (
              <button
                key={index}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-white/5 border border-white/10 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </Card>
  );
}
