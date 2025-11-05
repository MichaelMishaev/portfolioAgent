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
  stats: [
    { label: "Projects Completed", value: "500+" },
    { label: "Countries Visited", value: "47" },
    { label: "Awards Won", value: "23" },
    { label: "Happy Clients", value: "200+" },
  ],
  skills: [
    "Photography Direction",
    "Cinematography",
    "Photo Editing (Lightroom/Photoshop)",
    "Color Grading",
    "Drone Photography",
    "Studio Lighting",
    "Portrait Photography",
    "Landscape Photography",
    "Commercial Photography",
    "Editorial Photography",
    "Fashion Photography",
    "Storytelling",
  ],
  pricing: [
    {
      name: "Portrait Session",
      price: "$1,200",
      duration: "2 hours",
      deliverables: "50+ edited photos",
      features: ["Studio or location", "Professional editing", "Online gallery", "Print rights"],
    },
    {
      name: "Commercial Project",
      price: "$5,000",
      duration: "Full day",
      deliverables: "150+ edited photos",
      popular: true,
      features: ["Creative direction", "Location scouting", "Full editing suite", "Licensing rights", "Rush delivery option"],
    },
    {
      name: "Editorial Package",
      price: "$3,500",
      duration: "Half day",
      deliverables: "100+ edited photos",
      features: ["Magazine-ready quality", "Story development", "Professional retouching", "Usage rights"],
    },
  ],
  testimonials: [
    {
      name: "Sarah Johnson",
      role: "Creative Director, Adobe",
      content: "Elena's work transcends photography. She captures emotion, tells stories, and delivers stunning visuals that exceed every expectation. A true master of her craft.",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Michael Chen",
      role: "Editor, National Geographic",
      content: "Working with Elena is always inspiring. Her eye for detail and ability to find beauty in unexpected places makes every project exceptional.",
      image: "https://i.pravatar.cc/150?img=13",
    },
    {
      name: "Lisa Martinez",
      role: "Brand Manager, Patagonia",
      content: "Elena perfectly captured our brand's spirit. Her photographs tell our sustainability story better than words ever could. Simply outstanding work.",
      image: "https://i.pravatar.cc/150?img=5",
    },
  ],
  timeline: [
    {
      year: "2023",
      title: "International Recognition",
      description: "Featured in National Geographic's 'Photographer of the Year' and exhibited work in 5 countries.",
    },
    {
      year: "2020",
      title: "Commercial Success",
      description: "Expanded to commercial photography, working with Fortune 500 companies and major brands.",
    },
    {
      year: "2016",
      title: "Editorial Breakthrough",
      description: "First cover story for TIME Magazine. Published in major editorial publications worldwide.",
    },
    {
      year: "2011",
      title: "Career Launch",
      description: "Started professional photography career after graduating from Art Center College of Design.",
    },
  ],
  gallery: [
    {
      title: "Wilderness Campaign",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      client: "National Geographic",
    },
    {
      title: "Urban Stories",
      category: "Editorial",
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
      client: "TIME Magazine",
    },
    {
      title: "Brand Identity",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop",
      client: "Apple",
    },
    {
      title: "Human Connection",
      category: "Portrait",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      client: "Adobe",
    },
    {
      title: "Sustainable Living",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      client: "Patagonia",
    },
    {
      title: "Motion & Energy",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=600&fit=crop",
      client: "Nike",
    },
  ],
  faq: [
    {
      question: "What's your booking process?",
      answer: "Start with a consultation to discuss your vision. After agreeing on scope and pricing, I require a 50% deposit to secure your date. The remaining balance is due before final delivery.",
    },
    {
      question: "How long until I receive my photos?",
      answer: "Standard delivery is 2-3 weeks for full editing. Rush delivery (1 week) is available for an additional fee. You'll receive a preview gallery within 48 hours.",
    },
    {
      question: "Do you travel for shoots?",
      answer: "Absolutely! I've shot in 47 countries. Travel expenses are billed separately, and I'm always excited to explore new locations.",
    },
    {
      question: "What's included in the final delivery?",
      answer: "All packages include professionally edited high-resolution images, an online gallery, and print rights. Commercial projects include licensing agreements.",
    },
    {
      question: "Can I request specific editing styles?",
      answer: "Yes! During our consultation, we'll discuss your vision and preferences. I can match specific aesthetics while maintaining my signature quality.",
    },
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
        <div className="container mx-auto px-3 sm:px-3 py-6 flex items-center justify-between">
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

        <div className="relative z-10 text-center px-3">
          <FadeIn>
            <h1 className="text-4xl sm: text-4xl sm:text-5xl md:text-6xl lg:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 break-words">
              {portfolioData.name}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl sm:text-2xl md:text-3xl  text-gray-300 mb-12">
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
          <div className="relative z-10 container mx-auto px-3 sm:px-3 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span
                className="inline-block text-sm font-semibold px-3 py-2 rounded-full mb-4"
                style={{ backgroundColor: section.color }}
              >
                {section.subtitle}
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl  xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl  font-bold mb-6 break-words">
                {section.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-full mx-auto mb-4">
                {section.description}
              </p>
              <p className="text-lg text-gray-400 max-w-full mx-auto italic">
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
        <div className="container mx-auto px-3 sm:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
              <h2 className="text-5xl md: text-4xl sm:text-5xl md:text-6xl  font-bold mb-6 break-words">
                About Me
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                {portfolioData.bio}
              </p>
              <div className="flex flex-wrap gap-3">
                {portfolioData.clients.map((client) => (
                  <span
                    key={client}
                    className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg text-sm"
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

        <div className="relative z-10 container mx-auto px-3 sm:px-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm: text-3xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold mb-4 break-words">
              My Process
            </h2>
            <p className="text-xl text-gray-400">
              From concept to final delivery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <div className="container mx-auto px-3 sm:px-3 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md: text-4xl sm:text-5xl md:text-6xl  font-bold mb-16 text-center break-words"
          >
            Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full mx-auto">
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

        <div className="relative z-10 container mx-auto px-3 sm:px-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm: text-3xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold mb-12 break-words">
              My Gear
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full mx-auto">
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

      {/* Stats Section - Fullscreen */}
      <section className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30" />

        <div className="relative z-10 container mx-auto px-3 sm:px-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm: text-3xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold mb-4 break-words">
              By The Numbers
            </h2>
            <p className="text-xl text-gray-400">
              A decade of visual storytelling
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioData.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl md: text-4xl sm:text-5xl md:text-6xl  font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent break-words">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Fullscreen Grid */}
      <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />

        <div className="relative z-10 container mx-auto px-3 sm:px-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm: text-3xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold break-words">
              Expertise
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolioData.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur border border-white/10 p-6 hover:bg-white/10 transition-all text-center"
              >
                <p className="text-lg font-medium">{skill}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Fullscreen Grid */}
      <section className="min-h-screen flex items-center bg-gray-900 py-20">
        <div className="container mx-auto px-3 sm:px-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm: text-3xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold mb-4 break-words">
              Featured Work
            </h2>
            <p className="text-xl text-gray-400">
              Selected projects from recent years
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.gallery.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden aspect-[4/3]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-sm text-purple-400 mb-2">{item.category}</p>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.client}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Fullscreen Vertical */}
      <section className="min-h-screen flex items-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />

        <div className="relative z-10 container mx-auto px-3 sm:px-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm: text-3xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold break-words">
              Journey
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {portfolioData.timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex gap-8 items-start"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-3xl font-bold text-purple-400">{item.year}</div>
                </div>
                <div className="flex-shrink-0 w-px h-full bg-gradient-to-b from-purple-500 to-pink-500 mt-2"></div>
                <div className="flex-1 pb-8">
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-lg text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Fullscreen */}
      <section className="min-h-screen flex items-center bg-gray-900">
        <div className="container mx-auto px-3 sm:px-3 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm: text-3xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold mb-4 break-words">
              Investment
            </h2>
            <p className="text-xl text-gray-400">
              Tailored packages for every project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolioData.pricing.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white/5 backdrop-blur border ${
                  plan.popular ? "border-purple-500 ring-2 ring-purple-500" : "border-white/10"
                } p-8 hover:bg-white/10 transition-all relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                <div className="text-3xl sm:text-4xl  font-bold mb-2 text-purple-400">{plan.price}</div>
                <p className="text-gray-400 mb-2">{plan.duration}</p>
                <p className="text-sm text-gray-500 mb-6">{plan.deliverables}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-white text-black hover:bg-gray-200">
                  Book Now
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Fullscreen */}
      <section className="min-h-screen flex items-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-purple-900/20" />

        <div className="relative z-10 container mx-auto px-3 sm:px-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm: text-3xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold break-words">
              Kind Words
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolioData.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur border border-white/10 p-8"
              >
                <p className="text-lg text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Fullscreen */}
      <section className="min-h-screen flex items-center bg-gray-900">
        <div className="container mx-auto px-3 sm:px-3 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm: text-3xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold break-words">
              Questions?
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {portfolioData.faq.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur border border-white/10 p-8"
              >
                <h3 className="text-xl font-bold mb-3">{item.question}</h3>
                <p className="text-gray-400 leading-relaxed">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Fullscreen */}
      <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />

        <div className="relative z-10 container mx-auto px-3 sm:px-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl  xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl  font-bold mb-8 break-words">
              Ready to Create?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Let's bring your vision to life with stunning visual storytelling that captures hearts and minds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 h-auto"
              >
                Start Your Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto"
              >
                View Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center relative bg-black">
        <div className="container mx-auto px-3 sm:px-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl  xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl  font-bold mb-8 break-words">
              Let's Create
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-full mx-auto">
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
        <div className="container mx-auto px-3 sm:px-3">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
