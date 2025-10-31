"use client";

import { TemplateConfig } from "@/lib/template-registry";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface LivePreviewProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
}

export function LivePreview({ template, firstName, lastName, title }: LivePreviewProps) {
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || "Your Name";
  const displayTitle = title || "Your Role / Title";

  // Get template-specific styles
  const getLogoStyle = () => {
    const templateId = template.id;

    // Template-specific logo styles
    const logoStyles: Record<string, React.CSSProperties> = {
      // Minimalist - Clean and simple
      minimalist: {
        color: template.colors.accent,
        fontWeight: 300,
        fontSize: "0.875rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      },
      // Dark Mode - Neon glow
      "dark-mode": {
        color: template.colors.accent,
        fontWeight: 900,
        fontSize: "1rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        textShadow: `0 0 10px ${template.colors.accent}`,
      },
      // Bold Typography - Strong presence
      "bold-typography": {
        color: template.colors.accent,
        fontWeight: 900,
        fontSize: "1.25rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      },
      // Neo-Brutalist - Raw and bold
      "neo-brutalist": {
        color: template.colors.primary,
        fontWeight: 900,
        fontSize: "1.5rem",
        letterSpacing: "0",
        textTransform: "uppercase",
        textShadow: "3px 3px 0 " + template.colors.accent,
      },
      // Y2K Retro - Playful
      "y2k-retro": {
        color: template.colors.primary,
        fontWeight: 700,
        fontSize: "1rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        fontStyle: "italic",
      },
      // Organic Liquid - Soft and flowing
      "organic-liquid": {
        color: template.colors.primary,
        fontWeight: 600,
        fontSize: "1rem",
        letterSpacing: "0.05em",
        textTransform: "lowercase",
        fontStyle: "italic",
      },
    };

    // Default style if template not specifically styled
    return (
      logoStyles[templateId] || {
        color: template.colors.accent,
        fontWeight: 600,
        fontSize: "1rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }
    );
  };

  return (
    <Card className="overflow-hidden">
      <div
        className="relative p-8 md:p-12"
        style={{
          background: `linear-gradient(135deg, ${template.colors.secondary}00 0%, ${template.colors.secondary}20 100%)`,
        }}
      >
        {/* LOGO - Static text styled per template */}
        <div className="mb-8 text-center">
          <div style={getLogoStyle()}>LOGO</div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8 mx-auto w-24"
          style={{ backgroundColor: template.colors.accent }}
        />

        {/* Name - H1 Style */}
        <h1
          className="text-center text-3xl md:text-5xl font-bold mb-4 transition-all duration-300"
          style={{
            fontFamily: template.fonts.heading,
            color: template.colors.primary,
          }}
        >
          {displayName}
        </h1>

        {/* Title - H2 Style */}
        <h2
          className="text-center text-lg md:text-2xl font-semibold mb-8 transition-all duration-300"
          style={{
            fontFamily: template.fonts.heading,
            color: template.colors.primary,
            opacity: 0.7,
          }}
        >
          {displayTitle}
        </h2>

        {/* Divider */}
        <div
          className="h-px mb-8 mx-auto w-24"
          style={{ backgroundColor: template.colors.accent }}
        />

        {/* Button */}
        <div className="flex justify-center">
          <Button
            className="shadow-lg hover:shadow-xl transition-shadow"
            style={{
              backgroundColor: template.colors.accent,
              color: "#ffffff",
            }}
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Me
          </Button>
        </div>

        {/* Background accent */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: template.colors.accent }}
        />
        <div
          className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: template.colors.primary }}
        />
      </div>
    </Card>
  );
}
