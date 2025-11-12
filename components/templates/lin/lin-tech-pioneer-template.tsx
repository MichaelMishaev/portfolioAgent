"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FiCode,
  FiZap,
  FiShield,
  FiGlobe,
  FiMail,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMenu,
  FiX,
  FiExternalLink,
  FiCheck,
  FiCopy,
  FiCheckCircle,
  FiTrendingUp,
  FiUsers,
  FiServer,
} from "react-icons/fi";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useI18n } from "@/lib/i18n-context";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

export function LinTechPioneerTemplate() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { tt } = useI18n();
  const data = tt?.linTechPioneer;
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -50]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#3B82F6] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const handleCopyCode = async () => {
    const code = `import { Unilink } from '@unilink/sdk';

const client = new Unilink({
  apiKey: process.env.UNILINK_API_KEY,
  region: 'us-east-1'
});

// Connect to your data sources
await client.connect('postgresql', {
  host: 'db.example.com',
  database: 'production'
});

// Real-time data sync
await client.sync();`;
    
    try {
      await navigator.clipboard.writeText(code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const companyData = {
    name: data.hero.name,
    tagline: data.hero.tagline,
    description: data.hero.description,
    features: [
      {
        icon: <FiCode size={32} />,
        title: data.features.items[0].title,
        description: data.features.items[0].description,
      },
      {
        icon: <FiZap size={32} />,
        title: data.features.items[1].title,
        description: data.features.items[1].description,
      },
      {
        icon: <FiShield size={32} />,
        title: data.features.items[2].title,
        description: data.features.items[2].description,
      },
      {
        icon: <FiGlobe size={32} />,
        title: data.features.items[3].title,
        description: data.features.items[3].description,
      },
    ],
    stats: [
      { icon: <FiTrendingUp size={24} />, value: "99.99%", label: "Uptime" },
      { icon: <FiUsers size={24} />, value: "10K+", label: "Active Users" },
      { icon: <FiServer size={24} />, value: "50+", label: "Countries" },
      { icon: <FiZap size={24} />, value: "<100ms", label: "Avg Response" },
    ],
    techStack: [
      { name: "React", color: "#61DAFB" },
      { name: "Node.js", color: "#339933" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Redis", color: "#DC382D" },
      { name: "Docker", color: "#2496ED" },
      { name: "Kubernetes", color: "#326CE5" },
      { name: "AWS", color: "#FF9900" },
    ],
    products: [
      {
        name: data.products.items[0].name,
        description: data.products.items[0].description,
        features: data.products.items[0].features,
      },
      {
        name: data.products.items[1].name,
        description: data.products.items[1].description,
        features: data.products.items[1].features,
      },
      {
        name: data.products.items[2].name,
        description: data.products.items[2].description,
        features: data.products.items[2].features,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E293B] to-[#0F172A] text-white">
      {/* Attribution Banner */}
      <div className="bg-[#3B82F6] text-white py-3 px-4 text-center text-sm">
        {data.attribution.text}{" "}
        <a
          href="https://www.unilink.co.il/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium inline-flex items-center gap-1 hover:text-[#06B6D4] transition-colors"
        >
          {data.attribution.company}
          <FiExternalLink size={14} />
        </a>
        {" "}- {data.attribution.originalCreator}{" "}
        <a
          href="https://lin.co.il"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium hover:text-[#06B6D4] transition-colors"
        >
          {data.attribution.creator}
        </a>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1E293B]/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-400 hover:text-[#3B82F6] transition-colors">
            {data.navigation.backToGallery}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-white hover:text-[#3B82F6] transition-colors font-medium">
              {data.navigation.features}
            </a>
            <a href="#products" className="text-sm text-white hover:text-[#3B82F6] transition-colors font-medium">
              {data.navigation.products}
            </a>
            <a href="#tech" className="text-sm text-white hover:text-[#3B82F6] transition-colors font-medium">
              {data.navigation.technology}
            </a>
            <a href="#contact" className="text-sm text-white hover:text-[#3B82F6] transition-colors font-medium">
              {data.navigation.contact}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-[#3B82F6] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#1E293B] border-t border-white/10">
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <a
                  href="#features"
                  className="text-sm text-white hover:text-[#3B82F6] transition-colors py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {data.navigation.features}
                </a>
                <a
                  href="#products"
                  className="text-sm text-white hover:text-[#3B82F6] transition-colors py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {data.navigation.products}
                </a>
                <a
                  href="#tech"
                  className="text-sm text-white hover:text-[#3B82F6] transition-colors py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {data.navigation.technology}
                </a>
                <a
                  href="#contact"
                  className="text-sm text-white hover:text-[#3B82F6] transition-colors py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {data.navigation.contact}
                </a>
              </div>
            </div>
          )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        {/* Animated Background Grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ y }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </motion.div>

        {/* Gradient Orbs with enhanced animation */}
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-[#3B82F6] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#06B6D4] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className={`inline-block px-4 py-2 bg-[#3B82F6]/20 border border-[#3B82F6]/50 rounded-full text-sm mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-[#3B82F6]">●</span> {data.hero.badge}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className={`text-5xl md:text-6xl lg:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span className="bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
                  {companyData.name}
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light mb-8">
                {companyData.tagline}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
                {companyData.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white px-8 py-6 text-base font-semibold shadow-lg shadow-[#3B82F6]/30 relative overflow-hidden group">
                    <span className="relative z-10">{data.hero.getStarted}</span>
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white px-8 py-6 text-base font-semibold relative overflow-hidden group"
                  >
                    <span className="relative z-10">{data.hero.viewDemo}</span>
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 bg-[#3B82F6]"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Button>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0F172A] py-16 border-y border-[#3B82F6]/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {companyData.stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  className="text-center group"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-[#3B82F6] mb-4 flex justify-center"
                    animate={prefersReducedMotion ? {} : {
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <ScrollReveal>
          <h2 className={`text-3xl sm:text-5xl font-bold text-center mb-4 break-words ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {data.features.title} <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">{data.features.titleHighlight}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
            {data.features.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {companyData.features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-[#1E293B]/50 border border-[#3B82F6]/20 p-6 hover:border-[#3B82F6] hover:shadow-xl hover:shadow-[#3B82F6]/30 transition-all group relative overflow-hidden cursor-pointer">
                  {/* Animated background gradient */}
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 to-[#06B6D4]/10 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/0 via-[#3B82F6]/20 to-[#3B82F6]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  
                  <CardContent className="p-0 relative z-10">
                    <motion.div 
                      className="text-[#3B82F6] mb-4"
                      animate={hoveredCard === index && !prefersReducedMotion ? {
                        scale: [1, 1.2, 1.1],
                        rotate: [0, 5, -5, 0],
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#06B6D4] transition-colors">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-[#0F172A] py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className={`text-3xl sm:text-5xl font-bold text-center mb-4 break-words ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {data.products.title} <span className="text-[#3B82F6]">{data.products.titleHighlight}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              {data.products.subtitle}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {companyData.products.map((product, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -12, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#3B82F6]/30 p-8 hover:border-[#3B82F6] hover:shadow-2xl hover:shadow-[#3B82F6]/30 transition-all group relative overflow-hidden h-full cursor-pointer">
                    {/* Animated gradient overlay */}
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-[#06B6D4]/5 to-[#3B82F6]/5 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3B82F6]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardContent className="p-0 relative z-10">
                      <motion.h3 
                        className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#3B82F6] group-hover:to-[#06B6D4] group-hover:bg-clip-text transition-all"
                        whileHover={prefersReducedMotion ? {} : { x: 5 }}
                      >
                        {product.name}
                      </motion.h3>
                      <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">{product.description}</p>
                      <ul className="space-y-3">
                        {product.features.map((feature, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <motion.div
                              animate={prefersReducedMotion ? {} : {
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 0.3,
                                delay: i * 0.1,
                              }}
                            >
                              <FiCheck className="text-[#06B6D4] flex-shrink-0" aria-hidden="true" />
                            </motion.div>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="container mx-auto px-4 py-20">
        <ScrollReveal>
          <h2 className={`text-3xl sm:text-5xl font-bold text-center mb-4 break-words ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {data.tech.title} <span className="text-[#3B82F6]">{data.tech.titleHighlight}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            {data.tech.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
          {companyData.techStack.map((tech, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <motion.div
                className="bg-[#1E293B]/50 border border-[#3B82F6]/20 rounded-lg p-4 flex flex-col items-center justify-center gap-3 hover:border-[#3B82F6] hover:shadow-xl hover:shadow-[#3B82F6]/20 transition-all group cursor-pointer relative overflow-hidden"
                whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-xs relative z-10"
                  style={{ backgroundColor: tech.color }}
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: [1, 1.3, 1.2],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {tech.name.substring(0, 2).toUpperCase()}
                </motion.div>
                <span className="text-xs text-gray-400 text-center group-hover:text-white transition-colors relative z-10">{tech.name}</span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Code Example */}
        <ScrollReveal delay={0.6}>
          <div className="max-w-3xl mx-auto mt-16">
            <motion.div
              className="bg-[#0F172A] border border-[#3B82F6]/30 rounded-lg overflow-hidden shadow-2xl shadow-[#3B82F6]/10"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-[#1E293B] border-b border-[#3B82F6]/20">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-sm text-gray-400 ml-2 font-mono">{data.tech.codeExample.filename}</span>
                </div>
                <motion.button
                  onClick={handleCopyCode}
                  className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-md transition-all ${
                    codeCopied 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'text-[#3B82F6] hover:text-[#06B6D4] hover:bg-[#3B82F6]/10 border border-transparent'
                  }`}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  {codeCopied ? (
                    <>
                      <FiCheckCircle size={14} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy size={14} />
                      <span>{data.tech.codeExample.copy}</span>
                    </>
                  )}
                </motion.button>
              </div>
              <pre className={`p-6 text-sm overflow-x-auto bg-[#0F172A] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <code className="text-gray-300 font-mono">
                  {`import { Unilink } from '@unilink/sdk';

const client = new Unilink({
  apiKey: process.env.UNILINK_API_KEY,
  region: 'us-east-1'
});

// Connect to your data sources
await client.connect('postgresql', {
  host: 'db.example.com',
  database: 'production'
});

// Real-time data sync
await client.sync();`}
                </code>
              </pre>
            </motion.div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] py-20 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : {
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : {
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <motion.h2 
              className="text-3xl sm:text-5xl font-bold mb-6 text-white break-words"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {data.cta.title}
            </motion.h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.p 
              className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {data.cta.subtitle}
            </motion.p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.a
                href="mailto:info@unilink.co.il"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Button className="bg-white text-[#3B82F6] hover:bg-gray-100 px-8 py-6 text-base font-semibold shadow-xl relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    <FiMail className="mr-2" aria-hidden="true" />
                    {data.cta.contactSales}
                  </span>
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] opacity-0 group-hover:opacity-10"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Button>
              </motion.a>
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#3B82F6] px-8 py-6 text-base font-semibold relative overflow-hidden group"
                >
                  <span className="relative z-10">{data.cta.startTrial}</span>
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="flex gap-6 justify-center">
              {[
                { icon: FiGithub, href: "https://github.com", label: "GitHub profile" },
                { icon: FiTwitter, href: "https://twitter.com", label: "Twitter profile" },
                { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn profile" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-white hover:text-[#06B6D4] transition-colors relative"
                  aria-label={social.label}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.2, y: -3 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                  animate={prefersReducedMotion ? {} : {
                    y: [0, -5, 0],
                  }}
                  transition={{
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    },
                  }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              {data.footer.copyright}
            </p>
            <p className="text-xs text-gray-600">
              {data.footer.designCredit}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
