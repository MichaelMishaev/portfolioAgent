"use client";

import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

interface FontOption {
  name: string;
  family: string;
  preview: string;
  category: string;
}

interface FontStyleSwitcherProps {
  currentFont: string;
  onFontChange: (fontFamily: string) => void;
}

const FONT_OPTIONS: FontOption[] = [
  {
    name: "Inter",
    family: "Inter, sans-serif",
    preview: "Modern & Clean",
    category: "Sans-serif"
  },
  {
    name: "Roboto",
    family: "Roboto, sans-serif",
    preview: "Professional & Reliable",
    category: "Sans-serif"
  },
  {
    name: "Poppins",
    family: "Poppins, sans-serif",
    preview: "Friendly & Geometric",
    category: "Sans-serif"
  },
  {
    name: "Montserrat",
    family: "Montserrat, sans-serif",
    preview: "Bold & Urban",
    category: "Sans-serif"
  },
  {
    name: "Playfair Display",
    family: "'Playfair Display', serif",
    preview: "Elegant & Classic",
    category: "Serif"
  },
  {
    name: "Merriweather",
    family: "Merriweather, serif",
    preview: "Readable & Traditional",
    category: "Serif"
  },
  {
    name: "Lora",
    family: "Lora, serif",
    preview: "Contemporary Serif",
    category: "Serif"
  },
  {
    name: "Source Code Pro",
    family: "'Source Code Pro', monospace",
    preview: "Technical & Modern",
    category: "Monospace"
  }
];

export function FontStyleSwitcher({ currentFont, onFontChange }: FontStyleSwitcherProps) {
  // Group fonts by category
  const sansSerif = FONT_OPTIONS.filter(f => f.category === "Sans-serif");
  const serif = FONT_OPTIONS.filter(f => f.category === "Serif");
  const monospace = FONT_OPTIONS.filter(f => f.category === "Monospace");

  const renderFontOption = (font: FontOption) => {
    const isActive = currentFont === font.family;

    return (
      <motion.button
        key={font.name}
        onClick={() => onFontChange(font.family)}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`
          relative flex flex-col items-start gap-2 p-4 rounded-xl border-2 transition-all
          min-h-[100px] touch-manipulation text-left
          ${isActive
            ? "border-foreground bg-muted/50 shadow-md"
            : "border-border hover:border-foreground/50 hover:bg-muted/30"
          }
        `}
        style={{ fontFamily: font.family }}
      >
        {/* Check Icon */}
        {isActive && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-2 -right-2 w-7 h-7 bg-foreground text-background rounded-full flex items-center justify-center shadow-lg"
          >
            <FiCheck className="w-4 h-4" />
          </motion.div>
        )}

        {/* Font Name */}
        <div className="font-semibold text-lg">{font.name}</div>

        {/* Preview Text */}
        <div className="text-sm text-muted-foreground">{font.preview}</div>

        {/* Sample Text */}
        <div className="text-2xl font-bold mt-2">
          Aa Bb Cc 123
        </div>
      </motion.button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Sans-serif Fonts */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          Sans-serif Fonts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sansSerif.map(renderFontOption)}
        </div>
      </div>

      {/* Serif Fonts */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          Serif Fonts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {serif.map(renderFontOption)}
        </div>
      </div>

      {/* Monospace Fonts */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          Monospace Fonts
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {monospace.map(renderFontOption)}
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> Fonts dramatically change the personality of your template.
          Sans-serif fonts feel modern, serif fonts feel traditional, and monospace fonts feel technical.
        </p>
      </div>
    </div>
  );
}
