"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { FiMenu, FiX, FiPlay, FiArrowRight } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { placeholderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function MotionDesignerTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { tt } = useI18n();
  const portfolioData = tt?.motionDesigner;
  const { scrollYProgress } = useScroll();

  // Animated shapes
  const shape1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const shape2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const shape3Rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  if (!portfolioData) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white relative">
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-neon-green/20 rounded-full blur-3xl"
          style={{ y: shape1Y }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-hot-pink/20 rounded-full blur-3xl"
          style={{ y: shape2Y }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 border-4 border-neon-green/10"
          style={{ rotate: shape3Rotate }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-neon-green/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-neon-green hover:text-hot-pink transition-colors text-white">
            {tt.common.backToGallery}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-sm font-bold hover:text-neon-green transition-colors uppercase text-gray-900">
              {tt.common.work}
            </a>
            <a href="#showreel" className="text-sm font-bold hover:text-neon-green transition-colors uppercase text-gray-900">
              Showreel
            </a>
            <a href="#contact" className="text-sm font-bold hover:text-neon-green transition-colors uppercase text-gray-900">
              {tt.common.contact}
            </a>
            <ThemeToggle />
            <LanguageToggle />
            <Button className="bg-neon-green text-black hover:bg-hot-pink hover:text-white font-bold uppercase">
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neon-green"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-neon-green/20"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              <a href="#work" className="text-sm font-bold py-2 uppercase text-white" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.work}
              </a>
              <a href="#showreel" className="text-sm font-bold py-2 uppercase text-gray-900" onClick={() => setMobileMenuOpen(false)}>
                Showreel
              </a>
              <a href="#contact" className="text-sm font-bold py-2 uppercase text-gray-900" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.contact}
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Kinetic Typography */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Animated Text Lines */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-7xl md:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-none text-gray-900"
                style={{
                  background: "linear-gradient(135deg, #00FF00 0%, #FF006E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Motion
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-7xl md:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-none text-white"
              >
                Designer
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto uppercase tracking-wider"
            >
              {portfolioData.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button size="lg" className="bg-neon-green text-black hover:bg-neon-green/90 font-bold uppercase text-lg px-8">
                <FiPlay className="mr-2" /> Watch Showreel
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-hot-pink text-hot-pink hover:bg-hot-pink/10 font-bold uppercase text-lg px-8 text-gray-900">
                View Projects
              </Button>
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap justify-center gap-12 mt-20"
            >
              {portfolioData.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, type: "spring" }}
                  className="text-center"
                >
                  <div className="text-4xl sm:text-5xl font-black text-neon-green mb-2 break-words text-gray-900">{stat.value}</div>
                  <div className="text-sm uppercase tracking-wider text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDI1NSwwLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </section>

      {/* Video Showreel Section */}
      <section id="showreel" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase mb-16 text-center break-words text-gray-900">
              <span className="text-neon-green">Show</span>
              <span className="text-hot-pink">reel</span>
            </h2>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="aspect-video bg-gradient-to-br from-neon-green/20 to-hot-pink/20 rounded-2xl overflow-hidden border-4 border-neon-green/30 relative group cursor-pointer">
              <Image
                src={placeholderImages.projects.web1}
                alt="Showreel"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-neon-green rounded-full flex items-center justify-center"
                >
                  <FiPlay className="text-black text-3xl ml-1" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Section - Video Grid */}
      <section id="work" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase mb-16 text-center text-white break-words">
              Featured <span className="text-hot-pink">Work</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden border-2 border-neon-green/20 mb-6">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-neon-green rounded-full flex items-center justify-center"
                    >
                      <FiPlay className="text-black text-2xl ml-1" />
                    </motion.div>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-hot-pink px-4 py-2 rounded-full text-xs font-bold uppercase text-gray-900">
                    {project.category}
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-black uppercase mb-3 group-hover:text-neon-green transition-colors text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-900 text-neon-green text-xs font-bold uppercase rounded border border-neon-green/30 text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Animated Bars */}
      <section className="py-32 relative z-10 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase mb-16 text-center break-words text-gray-900">
              <span className="text-white">Tool</span>
              <span className="text-neon-green">kit</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-8">
            {portfolioData.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold uppercase text-foreground">{skill.name}</span>
                  <span className="text-neon-green font-bold">{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-neon-green to-hot-pink rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase mb-16 text-center text-white break-words">
              Trusted <span className="text-hot-pink">By</span>
            </h2>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center items-center gap-12 max-w-5xl mx-auto">
            {portfolioData.clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-3xl font-black uppercase text-gray-600 hover:text-neon-green transition-colors cursor-pointer"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-neon-green to-hot-pink p-12 md:p-20 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase mb-6 text-black break-words">
                Let's Create
                <br />
                Something Epic
              </h2>
              <p className="text-xl text-black/80 mb-8 font-bold uppercase tracking-wide">
                Available for freelance projects
              </p>
              <Button size="lg" className="bg-black text-neon-green hover:bg-gray-900 font-bold uppercase text-lg px-12 text-white">
                Hire Me Now <FiArrowRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery - Motion Designer */}
      <section className="py-32 relative z-10 bg-gray-900">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase mb-16 text-center break-words text-gray-900">
              <span className="text-white">Style</span>
              <span className="text-hot-pink">Frames</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {[
              placeholderImages.projects.web1,
              placeholderImages.projects.web2,
              placeholderImages.projects.mobile1,
              placeholderImages.projects.mobile2,
              placeholderImages.products.luxury1,
              placeholderImages.products.luxury2,
              placeholderImages.products.audio,
              placeholderImages.products.vacuum
            ].map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="relative aspect-square overflow-hidden rounded-lg border-2 border-neon-green/20 cursor-pointer group"
                >
                  <Image
                    src={img}
                    alt={`Frame ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-green/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About - Motion Designer */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-neon-green to-hot-pink opacity-20 blur-3xl rounded-3xl" />
                <div className="relative h-[600px] rounded-2xl overflow-hidden border-4 border-neon-green/30">
                  <Image
                    src={placeholderImages.people.person1}
                    alt="About"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div>
                <h2 className="text-6xl md:text-7xl font-black uppercase mb-8 text-gray-900">
                  <span className="text-white">About</span>
                  <span className="text-neon-green"> Me</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-6">
                  I'm a motion designer who transforms ideas into captivating visual stories. With over 8 years of experience, I specialize in creating dynamic animations that engage and inspire.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  From explosive title sequences to smooth UI animations, I bring energy and precision to every frame. My passion is making the impossible look effortless.
                </p>
                <Button className="bg-hot-pink hover:bg-hot-pink/90 text-white font-bold uppercase text-lg px-8">
                  Download CV
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pricing - Motion Designer */}
      <section className="py-32 relative z-10 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase mb-8 text-center break-words text-gray-900">
              <span className="text-white">Pricing</span>
            </h2>
            <p className="text-center text-gray-400 mb-16 text-xl uppercase tracking-wide">
              Flexible packages for every project size
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { name: 'STARTER', price: '$1,200', features: ['5 Second Animation', '2 Revisions', '1080p Export', '5 Day Delivery'], color: 'neon-green' },
              { name: 'PRO', price: '$3,500', features: ['15 Second Animation', '4 Revisions', '4K Export', '10 Day Delivery', 'Sound Design'], color: 'hot-pink', popular: true },
              { name: 'ULTIMATE', price: '$8,000+', features: ['30+ Second Animation', 'Unlimited Revisions', '4K Export', 'Custom Timeline', 'Full Production'], color: 'neon-green' }
            ].map((pkg, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`bg-gray-900 p-10 rounded-2xl border-4 ${pkg.popular ? 'border-hot-pink shadow-2xl shadow-hot-pink/20' : 'border-neon-green/20'} relative`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-hot-pink px-6 py-2 rounded-full text-sm font-black uppercase text-white">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="text-sm uppercase tracking-widest mb-8 text-gray-500 font-bold">{pkg.name}</div>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-12 break-words text-gray-900" style={{ color: pkg.color === 'neon-green' ? '#00FF00' : '#FF006E' }}>
                    {pkg.price}
                  </div>
                  <ul className="space-y-4 mb-12">
                    {pkg.features.map((f, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-center gap-3 font-bold uppercase">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pkg.color === 'neon-green' ? '#00FF00' : '#FF006E' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.popular ? 'bg-hot-pink hover:bg-hot-pink/90' : 'bg-neon-green hover:bg-neon-green/90'} text-black font-black uppercase text-lg py-6`}>
                    Choose Plan
                  </Button>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Motion Designer */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase mb-16 text-center break-words text-gray-900">
              <span className="text-white">Client</span>
              <span className="text-neon-green"> Love</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { text: 'Absolutely incredible work! The animations were smooth, creative, and exactly what we needed.', author: 'Alex Rivera', role: 'Creative Director' },
              { text: 'Fast turnaround and amazing quality. Will definitely work together again!', author: 'Sarah Kim', role: 'Marketing Lead' },
              { text: 'A true motion master. Brought our brand to life in ways we never imagined.', author: 'Mike Chen', role: 'Founder, StartupXYZ' }
            ].map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-900 p-8 rounded-2xl border-2 border-neon-green/20 hover:border-hot-pink/50 transition-colors"
                >
                  <p className="text-xl font-bold mb-6 text-gray-300 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div className="border-t border-gray-800 pt-6">
                    <div className="text-sm font-black uppercase text-neon-green text-white">{t.author}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{t.role}</div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Motion Designer */}
      <section className="py-32 relative z-10 bg-gray-900">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase mb-16 text-center break-words text-gray-900">
              <span className="text-white">My</span>
              <span className="text-hot-pink"> Journey</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
              { year: '2024', title: 'Award Winner', desc: 'Won Motion Designer of the Year at Creative Summit' },
              { year: '2022', title: 'Agency Launch', desc: 'Founded independent motion design studio' },
              { year: '2019', title: 'Senior Position', desc: 'Promoted to Senior Motion Designer at top agency' },
              { year: '2016', title: 'Career Start', desc: 'First motion design role at digital studio' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex gap-8 items-start border-l-4 border-neon-green pl-8 hover:border-hot-pink transition-colors"
                >
                  <div className="flex-shrink-0 w-32 text-center">
                    <div className="text-4xl sm:text-5xl font-black text-neon-green break-words text-gray-900">{item.year}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-3xl font-black uppercase mb-3 text-white">{item.title}</h4>
                    <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Motion Designer */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase mb-16 text-center text-white break-words">
              <span className="text-hot-pink">FAQ</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { q: 'What software do you use?', a: 'I work primarily with After Effects, Cinema 4D, and Blender for 3D work.' },
              { q: 'How long does a project take?', a: 'Depends on complexity. Simple animations take 5-7 days, complex projects 2-4 weeks.' },
              { q: 'Do you offer rush delivery?', a: 'Yes! Rush delivery available for 50% extra fee.' },
              { q: 'Can you match a specific style?', a: 'Absolutely. Send me references and I\'ll match or evolve the style.' },
              { q: 'What file formats do you deliver?', a: 'MP4, MOV, GIF, and source files (AE project files) included in Pro+ packages.' }
            ].map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="bg-gray-900 p-8 rounded-xl border-2 border-neon-green/20 hover:border-neon-green/50 transition-colors"
                >
                  <div className="text-2xl font-black uppercase mb-4 text-neon-green text-white">{faq.q}</div>
                  <p className="text-gray-400 text-lg leading-relaxed">{faq.a}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neon-green/20 py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
            </p>
            <div className="flex gap-8">
              {portfolioData.social && Object.entries(portfolioData.social).map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  className="text-sm text-gray-500 hover:text-neon-green transition-colors uppercase tracking-wider font-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {key}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .text-neon-green {
          color: #00FF00;
        }
        .bg-neon-green {
          background-color: #00FF00;
        }
        .text-hot-pink {
          color: #FF006E;
        }
        .bg-hot-pink {
          background-color: #FF006E;
        }
        .border-neon-green {
          border-color: #00FF00;
        }
        .border-hot-pink {
          border-color: #FF006E;
        }
      `}</style>
    </div>
  );
}
