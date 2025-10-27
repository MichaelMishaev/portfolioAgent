"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { ParallaxSection } from "@/components/animations/parallax-section";
import { Button } from "@/components/ui/button";
import { FiMail, FiArrowDown , FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { useRef } from "react";

const portfolioData = {
  name: "Elena Rodriguez",
  title: "Visual Storyteller",
  bio: "Photographer & director based in California. 12 years capturing stories that matter. Featured in National Geographic, TIME, and The New York Times. My lens finds beauty in the unexpected.",
  sections: [
    {
      id: 1,
      title: "Nature",
      subtitle: "Wild & Free",
      description: "Capturing the raw beauty of untamed landscapes.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
      color: "#10B981",
      details: "6 months across 12 national parks. Sunrise to sunset. Weather extremes. Worth every moment.",
    },
    {
      id: 2,
      title: "Urban",
      subtitle: "City Lights",
      description: "The pulse and energy of metropolitan life.",
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&h=1080&fit=crop",
      color: "#F59E0B",
      details: "Documenting 8 major cities. The stories between buildings. Life in motion.",
    },
    {
      id: 3,
      title: "Portrait",
      subtitle: "Human Connection",
      description: "Intimate moments that reveal authentic emotion.",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1920&h=1080&fit=crop",
      color: "#EC4899",
      details: "150+ subjects. Each with their own story. Vulnerability captured with respect.",
    },
    {
      id: 4,
      title: "Abstract",
      subtitle: "Beyond Reality",
      description: "Experimental perspectives on everyday objects.",
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&h=1080&fit=crop",
      color: "#8B5CF6",
      details: "Pushing boundaries. Breaking rules. Finding art in the mundane.",
    },
  ],
  process: [
    { step: "01", title: "Vision", desc: "Understanding your story and goals" },
    { step: "02", title: "Planning", desc: "Location scouting and preparation" },
    { step: "03", title: "Capture", desc: "The magic happens behind the lens" },
    { step: "04", title: "Post", desc: "Editing to perfection" },
  ],
  gear: [
    "Canon EOS R5",
    "Sony A7R IV",
    "24-70mm f/2.8",
    "70-200mm f/2.8",
    "DJI Mavic 3 Pro",
    "Profoto B10",
  ],
  clients: ["National Geographic", "TIME Magazine", "Adobe", "Patagonia", "Apple", "Nike"],
  services: [
    { name: "Commercial", desc: "Brand storytelling that converts", price: "From $5K" },
    { name: "Editorial", desc: "Magazine-quality narratives", price: "From $3K" },
    { name: "Portrait", desc: "Personal & professional portraits", price: "From $1K" },
    { name: "Events", desc: "Weddings, conferences, launches", price: "From $2K" },
  ],
};

export function FullscreenImmersiveTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden max-w-full">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="container mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <Link href="/" className="text-sm text-white hover:text-gray-300 transition-colors">
            ← Back
          </Link>
          <a href="#contact" className="text-sm text-white hover:text-gray-300 transition-colors">
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section - Full Screen */}
      <motion.section
        style={{ opacity, scale }}
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />

        <div className="relative z-10 text-center px-6">
          <FadeIn>
            <h1 className="text-7xl md:text-9xl font-bold mb-6">
              {portfolioData.name}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-2xl md:text-3xl text-gray-300 mb-12">
              {portfolioData.title}
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <a href="#section-1">
              <FiArrowDown className="w-8 h-8 mx-auto animate-bounce text-white" />
            </a>
          </FadeIn>
        </div>
      </motion.section>

      {/* Full-Screen Sections */}
      {portfolioData.sections.map((section, index) => (
        <section
          key={section.id}
          id={`section-${section.id}`}
          className="h-screen relative overflow-hidden flex items-center justify-center"
        >
          {/* Background Image with Parallax */}
          <ParallaxSection speed={0.5} className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${section.image})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </ParallaxSection>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span
                className="inline-block text-sm font-semibold px-4 py-2 rounded-full mb-4"
                style={{ backgroundColor: section.color }}
              >
                {section.subtitle}
              </span>
              <h2 className="text-6xl md:text-8xl font-bold mb-6">
                {section.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-4">
                {section.description}
              </p>
              <p className="text-lg text-gray-400 max-w-xl mx-auto italic">
                {section.details}
              </p>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          {index < portfolioData.sections.length - 1 && (
            <a
              href={`#section-${section.id + 1}`}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
            >
              <FiArrowDown className="w-6 h-6 animate-bounce text-white/70" />
            </a>
          )}
        </section>
      ))}

      {/* About Section - Split Screen */}
      <section className="min-h-screen flex items-center bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[600px] bg-gradient-to-br from-purple-900 to-blue-900"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=1000&fit=crop')] bg-cover bg-center opacity-80" />
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                About Me
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                {portfolioData.bio}
              </p>
              <div className="flex flex-wrap gap-3">
                {portfolioData.clients.map((client) => (
                  <span
                    key={client}
                    className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section - Fullscreen */}
      <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/20" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">
              My Process
            </h2>
            <p className="text-xl text-gray-400">
              From concept to final delivery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioData.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Split Screen */}
      <section className="min-h-screen flex items-center bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-16 text-center"
          >
            Services
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {portfolioData.services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur border border-white/10 p-8 hover:bg-white/10 transition-all"
              >
                <h3 className="text-3xl font-bold mb-3">{service.name}</h3>
                <p className="text-gray-400 mb-4">{service.desc}</p>
                <p className="text-2xl font-bold text-purple-400">{service.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gear Section - Fullscreen */}
      <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-12">
              My Gear
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {portfolioData.gear.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur border border-white/20 p-6 text-xl font-semibold"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center relative bg-black">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-8">
              Let's Create
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Have a project in mind? Let's bring your vision to life.
            </p>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 h-auto"
            >
              <FiMail className="mr-2 w-5 h-5" />
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
