"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiMail , FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "MOTION",
  subtitle: "STUDIO",
  tagline: "WE CREATE KINETIC EXPERIENCES",
  description: "Where typography moves, morphs, and tells stories through motion.",
  stats: [
    { number: 250, label: "PROJECTS", suffix: "+" },
    { number: 98, label: "SATISFACTION", suffix: "%" },
    { number: 15, label: "AWARDS", suffix: "" },
  ],
  projects: [
    { title: "NIKE KINETIC CAMPAIGN", year: "2024", type: "BRANDING" },
    { title: "SPOTIFY MOTION GRAPHICS", year: "2024", type: "ANIMATION" },
    { title: "APPLE EVENT TYPOGRAPHY", year: "2023", type: "MOTION DESIGN" },
    { title: "NETFLIX TITLE SEQUENCE", year: "2023", type: "UI/UX" },
  ],
  capabilities: ["TYPOGRAPHY", "MOTION", "3D DESIGN", "INTERACTIVE", "BRANDING", "STORYTELLING"],
  testimonials: [
    { quote: "TRANSFORMED OUR BRAND WITH STUNNING MOTION", client: "NIKE" },
    { quote: "INCREDIBLE ATTENTION TO DETAIL", client: "SPOTIFY" },
  ],
};

export function KineticTypographyTemplate() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const scaleTitle = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const opacityTitle = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const yTitle = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen overflow-x-hidden max-w-full bg-black text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="container mx-auto px-3 sm:px-3 py-6 flex items-center justify-between">
          <Link href="/" className="text-sm text-white hover:text-gray-300 transition-colors">
            ← BACK
          </Link>
          <a href="#contact" className="text-sm text-white hover:text-gray-300 transition-colors">
            CONTACT
          </a>
        </div>
      </nav>

      {/* Hero Section - Kinetic Typography */}
      <motion.section
        style={{ scale: scaleTitle, opacity: opacityTitle, y: yTitle }}
        className="h-screen flex items-center justify-center relative"
      >
        <div className="text-center">
          <motion.h1
            className="text-[clamp(4rem,20vw,20rem)] font-black leading-none tracking-tighter"
            animate={{
              scaleX: [1, 1.1, 1],
              scaleY: [1, 0.9, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {portfolioData.name}
          </motion.h1>

          <motion.div
            className="text-[clamp(2rem,10vw,10rem)] font-black tracking-wider mt-4"
            animate={{
              letterSpacing: ["0.1em", "0.3em", "0.1em"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {portfolioData.subtitle}
          </motion.div>
        </div>

        {/* Cursor follower */}
        <motion.div
          className="fixed w-32 h-32 pointer-events-none mix-blend-difference rounded-full border-2 border-white opacity-50"
          animate={{
            x: cursorPosition.x - 64,
            y: cursorPosition.y - 64,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </motion.section>

      {/* Kinetic Tagline */}
      <section className="min-h-screen overflow-x-hidden max-w-full flex items-center justify-center px-3">
        <div className="max-w-full">
          {portfolioData.tagline.split(" ").map((word, i) => (
            <motion.div
              key={i}
              className="inline-block text-[clamp(3rem,8vw,8rem)] font-black mr-6 mb-4"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.3 },
              }}
            >
              {word}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Description with morphing effect */}
      <section className="min-h-screen overflow-x-hidden max-w-full flex items-center justify-center px-3">
        <motion.div
          className="max-w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-3xl sm:text-4xl md:text-6xl font-light leading-tight"
            animate={{
              fontWeight: [300, 700, 300],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {portfolioData.description}
          </motion.p>
        </motion.div>
      </section>

      {/* Services with text morphing */}
      <section className="min-h-screen overflow-x-hidden max-w-full flex items-center justify-center px-3">
        <div className="space-y-12 max-w-full w-full">
          {["BRANDING", "MOTION DESIGN", "WEB EXPERIENCES"].map((service, i) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="border-b border-white/20 pb-8 cursor-pointer"
            >
              <motion.h3
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 20px rgba(255,255,255,0.5)",
                    "0 0 0px rgba(255,255,255,0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                {service}
              </motion.h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats with counting animation */}
      <section className="min-h-screen overflow-x-hidden max-w-full flex items-center justify-center px-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-full w-full">
          {portfolioData.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                className="text-[clamp(4rem,10vw,10rem)] font-black leading-none mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {stat.number}{stat.suffix}
              </motion.div>
              <motion.div
                className="text-2xl tracking-widest"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects with kinetic reveals */}
      <section className="min-h-screen overflow-x-hidden max-w-full flex items-center justify-center px-3">
        <div className="space-y-16 max-w-full w-full">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            SELECTED WORK
          </motion.h2>

          {portfolioData.projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -200 : 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="border-t border-white/20 pt-8 group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <motion.h3
                  className="text-3xl sm:text-4xl md:text-6xl font-black"
                  whileHover={{
                    scaleX: 1.05,
                    letterSpacing: "0.05em",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title}
                </motion.h3>
                <div className="flex gap-8 text-xl font-mono">
                  <span className="text-gray-500">{project.year}</span>
                  <span className="text-gray-400">{project.type}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Capabilities with split animation */}
      <section className="min-h-screen overflow-x-hidden max-w-full flex items-center justify-center px-3">
        <div className="max-w-full w-full">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            CAPABILITIES
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.capabilities.map((capability, i) => (
              <motion.div
                key={capability}
                initial={{ opacity: 0, rotateX: -90 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                className="border border-white/20 p-8 text-center transition-colors"
              >
                <motion.h3
                  className="text-3xl font-black"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 10px rgba(255,255,255,0.3)",
                      "0 0 0px rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  {capability}
                </motion.h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with glitch effect */}
      <section className="min-h-screen overflow-x-hidden max-w-full flex items-center justify-center px-3">
        <div className="space-y-20 max-w-full w-full">
          {portfolioData.testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.client}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="border border-white/20 p-12"
            >
              <motion.p
                className="text-4xl md:text-5xl font-light mb-8 leading-tight"
                animate={{
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                }}
              >
                "{testimonial.quote}"
              </motion.p>
              <motion.div
                className="text-2xl font-black tracking-widest"
                animate={{
                  letterSpacing: ["0.2em", "0.3em", "0.2em"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                — {testimonial.client}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact with pulsing text */}
      <section id="contact" className="min-h-screen overflow-x-hidden max-w-full flex items-center justify-center px-3">
        <div className="text-center">
          <motion.h2
            className="text-[clamp(3rem,12vw,12rem)] font-black leading-none mb-12"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            LET'S
            <br />
            TALK
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 text-xl px-12 py-8 h-auto font-bold"
            >
              <FiMail className="mr-3 w-6 h-6" />
              START PROJECT
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-3 sm:px-3">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} MOTION STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
