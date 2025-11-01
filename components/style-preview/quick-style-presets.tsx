"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Palette, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  StylePreset,
  stylePresets,
  getPresetsByCategory,
  styleCategoryMetadata,
  getRandomStylePreset,
} from "@/lib/style-presets";

interface QuickStylePresetsProps {
  currentColors: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  onApplyPreset: (colors: StylePreset["colors"]) => void;
}

export function QuickStylePresets({
  currentColors,
  onApplyPreset,
}: QuickStylePresetsProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    StylePreset["category"] | "all"
  >("all");
  const [appliedPresetId, setAppliedPresetId] = useState<string | null>(null);

  // Filter presets based on category
  const filteredPresets =
    selectedCategory === "all"
      ? stylePresets
      : getPresetsByCategory(selectedCategory);

  const handleApplyPreset = (preset: StylePreset) => {
    onApplyPreset(preset.colors);
    setAppliedPresetId(preset.id);
    setTimeout(() => {
      setIsOpen(false);
      setAppliedPresetId(null);
    }, 500);
  };

  const handleRandomPreset = () => {
    const randomPreset = getRandomStylePreset();
    handleApplyPreset(randomPreset);
  };

  const categories = [
    { key: "all" as const, label: "All Styles", icon: "🎨" },
    ...Object.entries(styleCategoryMetadata).map(([key, meta]) => ({
      key: key as StylePreset["category"],
      label: meta.label,
      icon: meta.icon,
    })),
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Palette className="w-4 h-4 mr-2" />
          Quick Styles
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Quick Style Presets
          </DialogTitle>
          <DialogDescription>
            Apply pre-designed color schemes instantly
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Category Tabs + Random */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.key}
                size="sm"
                variant={selectedCategory === category.key ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.key)}
                className="shrink-0"
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.label}
              </Button>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={handleRandomPreset}
              className="ml-auto shrink-0"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Random
            </Button>
          </div>

          {/* Presets Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pb-4">
              {filteredPresets.map((preset, index) => (
                <motion.div
                  key={preset.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-lg group ${
                      appliedPresetId === preset.id
                        ? "ring-2 ring-primary"
                        : "hover:border-primary"
                    }`}
                    onClick={() => handleApplyPreset(preset)}
                  >
                    <CardContent className="p-4">
                      {/* Color Swatches */}
                      <div className="flex gap-2 mb-3">
                        {preset.colors.primary && (
                          <div
                            className="w-12 h-12 rounded-lg shadow-sm border"
                            style={{ backgroundColor: preset.colors.primary }}
                            title={`Primary: ${preset.colors.primary}`}
                          />
                        )}
                        {preset.colors.secondary && (
                          <div
                            className="w-12 h-12 rounded-lg shadow-sm border"
                            style={{ backgroundColor: preset.colors.secondary }}
                            title={`Secondary: ${preset.colors.secondary}`}
                          />
                        )}
                        {preset.colors.accent && (
                          <div
                            className="w-12 h-12 rounded-lg shadow-sm border"
                            style={{ backgroundColor: preset.colors.accent }}
                            title={`Accent: ${preset.colors.accent}`}
                          />
                        )}
                      </div>

                      {/* Preset Info */}
                      <div className="space-y-1">
                        <div className="flex items-start justify-between">
                          <p className="font-semibold text-sm">
                            {preset.name}
                          </p>
                          <AnimatePresence>
                            {appliedPresetId === preset.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Check className="w-4 h-4 text-green-500" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {preset.description}
                        </p>
                        <Badge variant="secondary" className="text-xs mt-2">
                          {styleCategoryMetadata[preset.category].icon}{" "}
                          {styleCategoryMetadata[preset.category].label}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="border-t pt-3 text-xs text-muted-foreground text-center">
            Click any style to apply it instantly
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
