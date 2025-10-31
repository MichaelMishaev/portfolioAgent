"use client";

import { useState } from "react";
import { TemplateConfig } from "@/lib/template-registry";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, RefreshCw, Sparkles, Palette } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { motion, AnimatePresence } from "framer-motion";
import { MinimalistPreview } from "./template-previews/minimalist-preview";
import { DarkModePreview } from "./template-previews/dark-mode-preview";
import { DefaultPreview } from "./template-previews/default-preview";

interface EnhancedLivePreviewProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
}

export function EnhancedLivePreview({ template, firstName, lastName, title }: EnhancedLivePreviewProps) {
  const { t } = useI18n();
  const [customAccentColor, setCustomAccentColor] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const accentColor = customAccentColor || template.colors.accent;

  const handleColorChange = (color: string) => {
    setCustomAccentColor(color);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const resetColor = () => {
    setCustomAccentColor(null);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Select the appropriate preview component based on template ID
  const renderPreview = () => {
    const props = {
      template,
      firstName,
      lastName,
      title,
      accentColor,
    };

    switch (template.id) {
      case "minimalist":
        return <MinimalistPreview {...props} />;
      case "dark-mode":
        return <DarkModePreview {...props} />;
      default:
        return <DefaultPreview {...props} />;
    }
  };

  const quickColors = [
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#10B981", // Green
    "#F59E0B", // Orange
    "#8B5CF6", // Purple
    "#EC4899", // Pink
  ];

  return (
    <div className="space-y-4">
      {/* Color Customizer */}
      <Card className="p-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">{t.stylePreview.colorPicker.title}</span>
          </div>
          {customAccentColor && (
            <Button
              size="sm"
              variant="ghost"
              onClick={resetColor}
              className="text-xs"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              {t.stylePreview.colorPicker.reset}
            </Button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {quickColors.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleColorChange(color)}
              className={`w-10 h-10 rounded-lg border-2 transition-all ${
                accentColor === color ? "border-foreground shadow-lg" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </Card>

      {/* Live Preview Card - Template Specific */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isAnimating ? "animating" : "static"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {renderPreview()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
