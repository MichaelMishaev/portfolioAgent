"use client";

import { motion, useAnimation } from "framer-motion";
import { TemplateConfig } from "@/lib/template-registry";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n-context";
import { useEffect, useState } from "react";

interface KineticTypographyPreviewProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
  accentColor: string;
  avatarImage?: string | null;
}

export function KineticTypographyPreview({
  template,
  firstName,
  lastName,
  title,
  accentColor,
  avatarImage,
}: KineticTypographyPreviewProps) {
  const { t } = useI18n();
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || t.stylePreview.playground.defaultName;
  const displayTitle = title || t.stylePreview.playground.defaultTitle;
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Generate initials
  const getInitials = () => {
    if (!firstName && !lastName) return "YN";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  // Morphing text animation
  useEffect(() => {
    controls.start({
      scale: [1, 1.02, 0.98, 1],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 40,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 40,
    });
  };

  return (
    <Card className="overflow-hidden border-0">
      <div
        className="relative min-h-[600px] bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-8 md:p-12"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Animated cursor follower */}
        <motion.div
          className="fixed w-8 h-8 rounded-full border-2 pointer-events-none z-50 mix-blend-difference"
          style={{
            borderColor: accentColor,
          }}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: isHovering ? 2 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
        />

        {/* Background animated text */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute text-9xl font-black"
              style={{
                fontFamily: template.fonts.heading,
                top: `${index * 30}%`,
                left: 0,
              }}
              animate={{
                x: ["0%", "100%"],
              }}
              transition={{
                duration: 20 + index * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {displayName.toUpperCase()}
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-4xl">
          {/* Avatar with morphing effect */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {avatarImage ? (
              <motion.img
                src={avatarImage}
                alt={displayName}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
                style={{
                  border: `4px solid ${accentColor}`,
                  boxShadow: `0 0 30px ${accentColor}40`,
                }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              />
            ) : (
              <motion.div
                className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-black"
                style={{
                  backgroundColor: accentColor,
                  fontFamily: template.fonts.heading,
                  boxShadow: `0 0 30px ${accentColor}40`,
                }}
                whileHover={{ scale: 1.1, rotate: -10 }}
              >
                {getInitials()}
              </motion.div>
            )}
          </motion.div>

          {/* Dynamic, morphing name with letter animation */}
          <div className="mb-6 overflow-hidden">
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
              style={{
                fontFamily: template.fonts.heading,
                color: "#000",
              }}
              animate={controls}
            >
              {displayName.split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    color: index % 2 === 0 ? "#000" : accentColor,
                  }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.5,
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    color: accentColor,
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    display: char === " " ? "inline" : "inline-block",
                    marginRight: char === " " ? "0.5rem" : "0",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Animated title with scale morphing */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.p
              className="text-xl md:text-2xl font-medium overflow-hidden"
              style={{
                fontFamily: template.fonts.body,
                color: "#666",
              }}
            >
              {displayTitle.split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  style={{
                    display: char === " " ? "inline" : "inline-block",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Kinetic skill tags with dynamic movement */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {template.features.slice(0, 4).map((feature, index) => (
              <motion.div
                key={feature}
                animate={{
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 0,
                  transition: { duration: 0.2 },
                }}
              >
                <Badge
                  className="text-sm font-bold px-4 py-2 cursor-pointer"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    borderColor: accentColor,
                    color: accentColor,
                    border: "2px solid",
                  }}
                >
                  {feature.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      className="inline-block"
                      whileHover={{
                        y: -3,
                        transition: { duration: 0.1 },
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Dynamic CTA with morphing effect */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                className="px-8 py-4 text-lg font-black rounded-full cursor-pointer border-4"
                style={{
                  backgroundColor: accentColor,
                  color: "#fff",
                  borderColor: "#000",
                  boxShadow: `8px 8px 0px #000`,
                }}
                animate={{
                  boxShadow: [
                    "8px 8px 0px #000",
                    "12px 12px 0px #000",
                    "8px 8px 0px #000",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {t.stylePreview.playground.contactMe.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    whileHover={{
                      y: -2,
                      scale: 1.2,
                      transition: { duration: 0.1 },
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.button>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                className="px-8 py-4 text-lg font-black rounded-full cursor-pointer border-4"
                style={{
                  backgroundColor: "#fff",
                  color: accentColor,
                  borderColor: accentColor,
                }}
                whileHover={{
                  backgroundColor: accentColor,
                  color: "#fff",
                }}
              >
                {t.stylePreview.playground.portfolio}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Floating animated shapes */}
          <motion.div
            className="absolute top-10 right-10 w-16 h-16 opacity-20"
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundColor: accentColor,
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          />

          <motion.div
            className="absolute bottom-10 left-10 w-20 h-20 rounded-full opacity-20"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundColor: accentColor,
            }}
          />
        </div>
      </div>
    </Card>
  );
}
