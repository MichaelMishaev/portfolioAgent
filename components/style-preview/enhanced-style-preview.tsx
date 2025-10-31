"use client";

import { useState } from "react";
import { TemplateConfig } from "@/lib/template-registry";
import { TryItPlayground } from "./try-it-playground";
import { InteractiveColorPicker } from "./interactive-color-picker";
import { FontStyleSwitcher } from "./font-style-switcher";
import { PreviewPageFAB } from "./floating-action-button";
import { ShareModal } from "./share-modal";
import { BottomSheet } from "./bottom-sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Eye, Sparkles, Droplet, Type } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { motion } from "framer-motion";

interface EnhancedStylePreviewProps {
  template: TemplateConfig;
}

export function EnhancedStylePreview({ template: initialTemplate }: EnhancedStylePreviewProps) {
  const { t, tt } = useI18n();

  // Get localized template data
  const templateData = tt[initialTemplate.id as keyof typeof tt];
  const template = templateData
    ? { ...initialTemplate, name: templateData.name, description: templateData.description, tags: templateData.tags || initialTemplate.tags, features: templateData.features || initialTemplate.features }
    : initialTemplate;

  // State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [customColors, setCustomColors] = useState(template.colors || {});
  const [customFont, setCustomFont] = useState("Inter, sans-serif");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isFontPickerOpen, setIsFontPickerOpen] = useState(false);

  // Handlers
  const handleColorChange = (colorKey: string, newColor: string) => {
    setCustomColors(prev => ({ ...prev, [colorKey]: newColor }));

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  const handleResetColors = () => {
    setCustomColors(template.colors || {});

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([30, 50, 30]);
    }
  };

  const handleShare = () => {
    setIsShareOpen(true);
  };

  const handleDownload = () => {
    // Trigger download or redirect to full demo
    window.location.href = template.demoPath;
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: customFont }}>
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t.common.backToGallery}</span>
            </Link>
            <h1 className="text-base sm:text-lg font-semibold">{template.name}</h1>
            <div className="w-20 sm:w-32" />
          </div>
        </div>
      </header>

      {/* Hero Section - Compact */}
      <section className="border-b bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {t.stylePreview.header.interactivePreview}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">{template.name}</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{template.description}</p>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsColorPickerOpen(true)}
                className="min-h-[40px] touch-manipulation"
              >
                <Droplet className="w-4 h-4 mr-2" />
                {t.stylePreview.header.colors}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFontPickerOpen(true)}
                className="min-h-[40px] touch-manipulation"
              >
                <Type className="w-4 h-4 mr-2" />
                {t.stylePreview.header.fonts}
              </Button>
            </div>

            {/* Compact Tags */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {template.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-muted rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        {/* Try It Section - Single Static Preview */}
        <TryItPlayground
          template={{ ...template, colors: customColors }}
          firstName={firstName}
          lastName={lastName}
          title={title}
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
          onTitleChange={setTitle}
        />
      </div>

      {/* CTA Footer */}
      <section className="border-t bg-muted/30 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold">{t.stylePreview.cta.ready}</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t.stylePreview.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="min-h-[48px] touch-manipulation">
                <Link href={template.demoPath}>
                  <Eye className="w-4 h-4 mr-2" />
                  {t.stylePreview.cta.viewFullDemo}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-[48px] touch-manipulation">
                <Link href="/">
                  {t.stylePreview.cta.chooseAnother}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <PreviewPageFAB
        onColorChange={() => setIsColorPickerOpen(true)}
        onFontChange={() => setIsFontPickerOpen(true)}
        onShare={handleShare}
        onDownload={handleDownload}
      />

      {/* Bottom Sheets */}
      <BottomSheet
        isOpen={isColorPickerOpen}
        onClose={() => setIsColorPickerOpen(false)}
        title={t.stylePreview.header.customizeColors}
      >
        <InteractiveColorPicker
          colors={customColors}
          onColorChange={handleColorChange}
          onReset={handleResetColors}
        />
      </BottomSheet>

      <BottomSheet
        isOpen={isFontPickerOpen}
        onClose={() => setIsFontPickerOpen(false)}
        title={t.stylePreview.header.chooseFontStyle}
      >
        <FontStyleSwitcher
          currentFont={customFont}
          onFontChange={setCustomFont}
        />
      </BottomSheet>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={template.name}
        url={currentUrl}
      />
    </div>
  );
}
