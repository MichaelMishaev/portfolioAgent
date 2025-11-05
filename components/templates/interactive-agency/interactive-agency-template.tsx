"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { FiMenu, FiX, FiArrowRight, FiPlay, FiExternalLink } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { placeholderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function InteractiveAgencyTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { tt } = useI18n();
  const portfolioData = tt?.interactiveAgency;
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (!portfolioData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0A] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            {tt.common.backToGallery}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-sm hover:text-purple-400 transition-colors font-medium">
              {tt.common.work}
            </a>
            <a href="#services" className="text-sm hover:text-purple-400 transition-colors font-medium">
              {tt.common.services}
            </a>
            <a href="#contact" className="text-sm hover:text-purple-400 transition-colors font-medium">
              {tt.common.contact}
            </a>
            <ThemeToggle />
            <LanguageToggle />
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400">
              {tt.common.getInTouch}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
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
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-purple-500/20"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              <a href="#work" className="text-sm hover:text-purple-400 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.work}
              </a>
              <a href="#services" className="text-sm hover:text-purple-400 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.services}
              </a>
              <a href="#contact" className="text-sm hover:text-purple-400 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.contact}
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Full Screen with Kinetic Typography */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${placeholderImages.heroBackgrounds.abstract})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-cyan-900/50" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl lg:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none break-words"
              style={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {portfolioData.name}
            </motion.h1>

            <motion.p
              className="text-xl md:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {portfolioData.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-lg px-8">
                {tt.common.viewAll} <FiArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-purple-500 !text-white !bg-transparent hover:bg-purple-500/10 text-lg px-8">
                <FiPlay className="mr-2" /> Watch Showreel
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-6 h-10 border-2 border-purple-500 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-purple-500 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Parallax */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {portfolioData.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/20 backdrop-blur-sm"
              >
                <div className="text-5xl md:text-4xl sm:text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent break-words">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-wider text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section - Animated Project Cards */}
      <section id="work" className="py-32 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent break-words">
              Featured Work
            </h2>
          </ScrollReveal>

          <div className="grid gap-8">
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/20 backdrop-blur-sm"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  <div className="flex flex-col justify-center">
                    <div className="text-sm text-cyan-400 font-mono mb-4">{project.category}</div>
                    <h3 className="text-3xl sm:text-5xl font-black mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all break-words text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium border border-purple-500/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button className="w-fit bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400">
                      View Case Study <FiExternalLink className="ml-2" />
                    </Button>
                  </div>
                  <div className="relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent break-words">
              What We Do
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/20 backdrop-blur-sm group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-16 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent break-words">
              Client Love
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/20 backdrop-blur-sm"
              >
                <p className="text-lg text-gray-300 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-purple-600 to-cyan-500 p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white break-words">Ready to Create Magic?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let's collaborate and build something extraordinary together.
              </p>
              <Button size="lg" className="bg-white !text-purple-600 hover:bg-gray-100 text-lg px-12">
                Start a Project <FiArrowRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {portfolioData.social && Object.entries(portfolioData.social).map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  className="text-gray-400 hover:text-purple-400 transition-colors uppercase text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {key}
                </a>
              ))}
            </div>
          </div>

          {/* Skills - Interactive Agency */}
          <section className="py-20 border-t border-gray-800">
            <h3 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">Our Expertise</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {['Interactive Design', 'Motion Graphics', 'Web Development', 'Brand Strategy', 'UX/UI', 'Digital Marketing', 'Animation', '3D Design'].map((skill, i) => (
                <div key={i} className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-xl text-center hover:scale-105 transition-transform">
                  <span className="font-bold text-white">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* About - Interactive Agency */}
          <section className="py-20 border-t border-gray-800 bg-gradient-to-br from-gray-900 to-black">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">Who We Are</h3>
              <p className="text-2xl text-gray-300 mb-6 font-semibold">
                We're an interactive agency creating engaging digital experiences that connect brands with audiences.
              </p>
              <p className="text-xl text-gray-400">
                With a team of passionate creators, we blend art and technology to build memorable interactive moments.
              </p>
            </div>
          </section>

          {/* Pricing - Interactive Agency */}
          <section className="py-20 border-t border-gray-800">
            <h3 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">Our Packages</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Interactive Basic', price: '$8,000', features: ['Interactive Website', 'Basic Animations', '3 Revisions', 'Mobile Optimized'] },
                { name: 'Interactive Pro', price: '$20,000', features: ['Full Interactive Experience', 'Advanced Animations', 'Custom Interactions', '5 Revisions', 'Performance Optimization'], popular: true },
                { name: 'Interactive Elite', price: '$50,000+', features: ['Premium Interactive Platform', 'Custom Everything', 'Motion Graphics', 'Unlimited Revisions', 'Ongoing Support'] }
              ].map((pkg, i) => (
                <div key={i} className={`bg-gradient-to-br ${pkg.popular ? 'from-purple-600 to-pink-600' : 'from-gray-800 to-gray-900'} p-8 rounded-xl ${pkg.popular ? 'ring-4 ring-yellow-400 scale-105' : ''}`}>
                  {pkg.popular && <div className="text-xs font-bold text-yellow-300 mb-2 uppercase">Best Value</div>}
                  <h4 className="text-2xl font-bold mb-2 text-white">{pkg.name}</h4>
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-8 break-words">{pkg.price}</div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="text-white font-medium">✓ {f}</li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.popular ? 'bg-white !text-purple-600 hover:bg-gray-100' : 'bg-purple-600 hover:bg-purple-700'} font-bold`}>
                    Choose Plan
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline - Interactive Agency */}
          <section className="py-20 border-t border-gray-800">
            <h3 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">Our Story</h3>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { year: '2024', title: 'Industry Leaders', desc: 'Recognized as top interactive agency' },
                { year: '2022', title: 'International Expansion', desc: 'Opened studios in 5 countries' },
                { year: '2020', title: 'Award Winning', desc: 'Won 20+ industry awards' },
                { year: '2018', title: 'Agency Founded', desc: 'Started with a vision for interactive experiences' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-24 bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-white">{item.year}</div>
                  </div>
                  <div className="flex-1 bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h4 className="font-bold text-xl mb-2 text-white">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
