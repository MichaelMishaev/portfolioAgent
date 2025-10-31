"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiCheck, FiRotateCcw } from "react-icons/fi";

interface InteractiveColorPickerProps {
  colors: Record<string, string>;
  onColorChange: (colorKey: string, newColor: string) => void;
  onReset: () => void;
}

const PRESET_COLORS = [
  // Blues
  "#3B82F6", "#0EA5E9", "#06B6D4", "#1E40AF", "#0284C7",
  // Purples
  "#8B5CF6", "#A855F7", "#7C3AED", "#6366F1", "#4F46E5",
  // Pinks
  "#EC4899", "#F43F5E", "#DB2777", "#E11D48", "#BE185D",
  // Greens
  "#10B981", "#22C55E", "#14B8A6", "#059669", "#16A34A",
  // Oranges/Reds
  "#F97316", "#EF4444", "#DC2626", "#EA580C", "#B91C1C",
  // Neutrals
  "#6B7280", "#374151", "#1F2937", "#111827", "#030712",
];

const COLOR_LABELS: Record<string, string> = {
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
  background: "Background",
  text: "Text",
  muted: "Muted",
};

export function InteractiveColorPicker({
  colors,
  onColorChange,
  onReset
}: InteractiveColorPickerProps) {
  const [activeColor, setActiveColor] = useState<string | null>(null);

  const handlePresetColorClick = (colorKey: string, color: string) => {
    onColorChange(colorKey, color);

    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Colors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(colors).map(([key, color]) => (
          <motion.button
            key={key}
            onClick={() => setActiveColor(activeColor === key ? null : key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
              min-h-[100px] touch-manipulation
              ${activeColor === key
                ? "border-foreground bg-muted/50 shadow-lg"
                : "border-border hover:border-foreground/50"
              }
            `}
          >
            <div
              className="w-full h-16 rounded-lg shadow-md border-2 border-background"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs font-medium capitalize">
              {COLOR_LABELS[key] || key}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono uppercase">
              {color}
            </span>

            {activeColor === key && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center"
              >
                <FiCheck className="w-3 h-3" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Color Picker Panel */}
      <AnimatePresence>
        {activeColor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-muted/30 rounded-xl border space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">
                    Choose {COLOR_LABELS[activeColor] || activeColor} Color
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Tap any color to apply instantly
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setActiveColor(null)}
                  className="h-8"
                >
                  Done
                </Button>
              </div>

              {/* Preset Colors Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {PRESET_COLORS.map((presetColor) => (
                  <motion.button
                    key={presetColor}
                    onClick={() => handlePresetColorClick(activeColor, presetColor)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                      relative w-full aspect-square rounded-lg border-2 shadow-sm transition-all
                      min-h-[44px] touch-manipulation
                      ${colors[activeColor] === presetColor
                        ? "border-foreground ring-2 ring-foreground ring-offset-2"
                        : "border-background hover:border-foreground/50"
                      }
                    `}
                    style={{ backgroundColor: presetColor }}
                    aria-label={presetColor}
                  >
                    {colors[activeColor] === presetColor && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FiCheck className="w-4 h-4 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={onReset}
        className="w-full min-h-[44px] touch-manipulation"
      >
        <FiRotateCcw className="w-4 h-4 mr-2" />
        Reset to Original Colors
      </Button>
    </div>
  );
}
