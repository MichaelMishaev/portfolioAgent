"use client";

import { motion } from "framer-motion";
import { TemplateConfig } from "@/lib/template-registry";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, Volume2, MessageCircle, Radio } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { useState, useEffect } from "react";

interface VoiceFirstPreviewProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
  accentColor: string;
  avatarImage?: string | null;
}

export function VoiceFirstPreview({
  template,
  firstName,
  lastName,
  title,
  accentColor,
  avatarImage,
}: VoiceFirstPreviewProps) {
  const { t } = useI18n();
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || t.stylePreview.playground.defaultName;
  const displayTitle = title || t.stylePreview.playground.defaultTitle;
  const [isListening, setIsListening] = useState(false);

  // Generate initials
  const getInitials = () => {
    if (!firstName && !lastName) return "YN";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  // Voice UI color palette
  const voiceColors = {
    primary: accentColor || "#6366F1",
    wave: "#818CF8",
    accent: "#C7D2FE",
    bg: "#1E1B4B",
    text: "#E0E7FF",
  };

  // Toggle listening state
  useEffect(() => {
    const interval = setInterval(() => {
      setIsListening((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate waveform bars
  const waveformBars = Array.from({ length: 40 }, (_, i) => i);

  return (
    <Card className="overflow-hidden border-0">
      <div
        className="relative min-h-[650px] p-8 md:p-12 flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${voiceColors.bg}00 0%, ${voiceColors.bg} 100%), linear-gradient(180deg, #0F0A2E 0%, ${voiceColors.bg} 50%, #0F0A2E 100%)`,
        }}
      >
        {/* Animated Circles Background */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 opacity-20"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              borderColor: voiceColors.wave,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: isListening ? [1, 1.1, 1] : [1, 1.05, 1],
              opacity: isListening ? [0.2, 0.4, 0.2] : [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-3xl">
          {/* Pulsing Microphone Icon */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="relative"
              animate={{
                scale: isListening ? [1, 1.2, 1] : [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${voiceColors.primary}60, transparent)`,
                  filter: "blur(30px)",
                }}
                animate={{
                  scale: isListening ? [1, 1.5, 1] : [1, 1.2, 1],
                  opacity: isListening ? [0.6, 1, 0.6] : [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />

              {avatarImage ? (
                <img
                  src={avatarImage}
                  alt={displayName}
                  className="relative w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4"
                  style={{
                    borderColor: voiceColors.primary,
                    boxShadow: `0 0 40px ${voiceColors.primary}`,
                  }}
                />
              ) : (
                <div
                  className="relative w-32 h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center border-4"
                  style={{
                    background: `linear-gradient(135deg, ${voiceColors.primary}, ${voiceColors.wave})`,
                    borderColor: voiceColors.accent,
                    boxShadow: `0 0 40px ${voiceColors.primary}`,
                    fontFamily: template.fonts.heading,
                  }}
                >
                  <Mic className="w-16 h-16 text-white" />
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Waveform Visualization */}
          <div className="flex items-center justify-center gap-1 mb-8 h-32">
            {waveformBars.map((bar) => (
              <motion.div
                key={bar}
                className="w-1 rounded-full"
                style={{
                  backgroundColor: voiceColors.wave,
                  boxShadow: `0 0 8px ${voiceColors.wave}`,
                }}
                animate={{
                  height: isListening
                    ? [
                        `${20 + Math.random() * 80}%`,
                        `${20 + Math.random() * 80}%`,
                        `${20 + Math.random() * 80}%`,
                      ]
                    : ["20%", "25%", "20%"],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: bar * 0.02,
                }}
              />
            ))}
          </div>

          {/* Status Indicator */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            animate={{
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <motion.div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: isListening ? "#10B981" : voiceColors.primary,
                boxShadow: `0 0 10px ${isListening ? "#10B981" : voiceColors.primary}`,
              }}
              animate={{
                scale: isListening ? [1, 1.5, 1] : [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
            <p
              className="text-sm font-medium uppercase tracking-wider"
              style={{
                color: voiceColors.text,
              }}
            >
              {isListening ? "Listening..." : "Say something"}
            </p>
          </motion.div>

          {/* Name - Conversational Style */}
          <motion.div
            className="text-center mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2"
              style={{
                fontFamily: template.fonts.heading,
                color: voiceColors.text,
                textShadow: `0 0 30px ${voiceColors.primary}40`,
              }}
              key={displayName}
            >
              {displayName}
            </motion.h1>
          </motion.div>

          {/* Conversational Bubble */}
          <motion.div
            className="relative mx-auto max-w-xl mb-8 px-6 py-4 rounded-3xl"
            style={{
              backgroundColor: `${voiceColors.primary}20`,
              border: `2px solid ${voiceColors.wave}40`,
              backdropFilter: "blur(10px)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            key={displayTitle}
          >
            {/* Speech bubble tail */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45"
              style={{
                backgroundColor: `${voiceColors.primary}20`,
                border: `2px solid ${voiceColors.wave}40`,
                borderBottom: "none",
                borderRight: "none",
              }}
            />

            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5" style={{ color: voiceColors.wave }} />
              <p
                className="text-lg font-medium flex-1 text-center"
                style={{
                  fontFamily: template.fonts.body,
                  color: voiceColors.text,
                }}
              >
                {displayTitle}
              </p>
            </div>
          </motion.div>

          {/* Voice Commands / Skills */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {template.features.slice(0, 4).map((feature, index) => (
              <motion.div
                key={feature}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  className="text-sm px-4 py-2 rounded-full cursor-pointer"
                  style={{
                    backgroundColor: `${voiceColors.wave}30`,
                    borderColor: voiceColors.wave,
                    color: voiceColors.text,
                    border: "1px solid",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Radio className="w-3 h-3 mr-1.5 inline" />
                  {feature}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Voice Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="rounded-full font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${voiceColors.primary}, ${voiceColors.wave})`,
                  color: "white",
                  boxShadow: `0 10px 30px ${voiceColors.primary}60`,
                }}
              >
                <Mic className="w-4 h-4 mr-2" />
                {t.stylePreview.playground.contactMe}
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="rounded-full font-semibold backdrop-blur-md"
                style={{
                  backgroundColor: `${voiceColors.wave}20`,
                  borderColor: voiceColors.wave,
                  color: voiceColors.text,
                }}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                {t.stylePreview.playground.portfolio}
              </Button>
            </motion.div>
          </motion.div>

          {/* Voice Command Hint */}
          <motion.p
            className="text-center mt-8 text-sm opacity-60"
            style={{
              color: voiceColors.text,
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            💡 Try saying "Hello" or "Show portfolio"
          </motion.p>
        </div>

        {/* Floating Sound Wave Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${10 + i * 8}%`,
              top: `${30 + Math.random() * 40}%`,
              backgroundColor: voiceColors.wave,
              boxShadow: `0 0 8px ${voiceColors.wave}`,
              opacity: 0.3,
            }}
            animate={{
              y: isListening ? [-20, 20, -20] : [0, 10, 0],
              opacity: isListening ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2 + i * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </Card>
  );
}
