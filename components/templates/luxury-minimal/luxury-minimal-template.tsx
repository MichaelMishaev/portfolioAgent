"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { placeholderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function LuxuryMinimalTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { tt } = useI18n();
  const portfolioData = tt?.luxuryMinimal;

  if (!portfolioData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F5F5DC] text-black">
      {/* Navigation - Elegant & Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5DC]/95 backdrop-blur-sm border-b border-[#D4AF37]/20">
        <div className="container mx-auto px-8 py-6 flex items-center justify-between max-w-7xl">
          <Link href="/" className="text-xs uppercase tracking-[0.2em] text-black/60 hover:text-black transition-colors font-light">
            {tt.common.backToGallery}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <a href="#portfolio" className="text-xs uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors font-light">
              {tt.common.portfolio}
            </a>
            <a href="#about" className="text-xs uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors font-light">
              {tt.common.about}
            </a>
            <a href="#contact" className="text-xs uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors font-light">
              {tt.common.contact}
            </a>
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
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
            className="md:hidden bg-[#F5F5DC]/98 backdrop-blur-sm border-t border-[#D4AF37]/20"
          >
            <div className="container mx-auto px-8 py-6 flex flex-col gap-6">
              <a href="#portfolio" className="text-xs uppercase tracking-[0.2em] py-2" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.portfolio}
              </a>
              <a href="#about" className="text-xs uppercase tracking-[0.2em] py-2" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.about}
              </a>
              <a href="#contact" className="text-xs uppercase tracking-[0.2em] py-2" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.contact}
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Elegant with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={placeholderImages.heroBackgrounds.minimal}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-8 relative z-10 text-center text-white max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="mb-6 text-[#D4AF37] text-sm uppercase tracking-[0.3em] font-light">
              {portfolioData.category}
            </div>
            <h1 className="font-serif  text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl  mb-8 font-light tracking-tight leading-none break-words">
              {portfolioData.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              {portfolioData.tagline}
            </p>
            <Button
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#C19B2E] text-black border-none text-sm uppercase tracking-[0.2em] px-12 py-6"
            >
              {tt.common.viewAll}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8 max-w-4xl">
          <ScrollReveal>
            <p className="font-serif  text-3xl sm:text-4xl md:text-5xl  text-center leading-relaxed text-black/80 font-light">
              {portfolioData.statement}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Gallery - Masonry Grid */}
      <section id="portfolio" className="py-32 bg-[#F5F5DC]">
        <div className="container mx-auto px-8 max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-6xl mb-6 font-light">Selected Works</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[500px] mb-6 overflow-hidden bg-black">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:opacity-75 transition-all duration-700"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-3xl mb-3 font-light group-hover:text-[#D4AF37] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-black/60 mb-4 leading-relaxed">{project.description}</p>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">{project.category}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <h2 className="font-serif text-5xl md:text-6xl mb-8 font-light">About</h2>
                <div className="w-16 h-px bg-[#D4AF37] mb-8" />
                <p className="text-lg text-black/70 leading-relaxed mb-6">{portfolioData.bio}</p>
                <Button className="bg-black hover:bg-black/80 text-white text-xs uppercase tracking-[0.2em] px-8 py-6">
                  {tt.common.readMore}
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="relative h-[600px]">
                <Image
                  src={placeholderImages.people.person1}
                  alt="Portrait"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 bg-[#F5F5DC]">
        <div className="container mx-auto px-8 max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-6xl mb-6 font-light">Services</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12">
            {portfolioData.services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl mb-6 text-[#D4AF37]">{service.icon}</div>
                <h3 className="font-serif text-2xl mb-4 font-light">{service.title}</h3>
                <p className="text-black/60 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-black text-white">
        <div className="container mx-auto px-8 max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-6xl mb-6 font-light">Testimonials</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12">
            {portfolioData.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="border border-[#D4AF37]/30 p-8 md:p-12"
              >
                <p className="font-serif text-2xl mb-8 leading-relaxed italic text-white/90">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-light text-lg mb-1">{testimonial.author}</div>
                  <div className="text-sm text-white/60 uppercase tracking-[0.2em]">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 bg-[#D4AF37]">
        <div className="container mx-auto px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif  text-4xl sm:text-5xl md:text-6xl lg:text-7xl  mb-8 font-light text-black break-words">
              {tt.common.letsWorkTogether}
            </h2>
            <p className="text-xl text-black/80 mb-12 font-light">
              Ready to elevate your brand to the next level?
            </p>
            <Button
              size="lg"
              className="bg-black hover:bg-black/80 text-white text-sm uppercase tracking-[0.2em] px-12 py-6"
            >
              {tt.common.getInTouch}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Gallery - Luxury Minimal */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8 max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-6xl mb-6 font-light">Gallery</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              placeholderImages.heroBackgrounds.minimal,
              placeholderImages.heroBackgrounds.modern,
              placeholderImages.products.luxury1,
              placeholderImages.products.luxury2,
              placeholderImages.products.luxury3,
              placeholderImages.people.person1,
              placeholderImages.people.person2,
              placeholderImages.people.person3
            ].map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="relative aspect-square overflow-hidden group cursor-pointer">
                  <Image
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Luxury Minimal */}
      <section className="py-32 bg-[#F5F5DC]">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { num: '15+', label: 'YEARS OF EXCELLENCE' },
              { num: '200+', label: 'LUXURY PROJECTS' },
              { num: '50+', label: 'GLOBAL AWARDS' },
              { num: '98%', label: 'CLIENT SATISFACTION' }
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center border-t border-[#D4AF37]/30 pt-8">
                  <div className="font-serif text-5xl md:text-6xl mb-4 text-[#D4AF37] font-light">{stat.num}</div>
                  <div className="text-xs uppercase tracking-[0.3em] text-black/60 font-light">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills - Luxury Minimal */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8 max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-6xl mb-6 font-light">Expertise</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-1">
            {['Brand Strategy', 'Art Direction', 'Editorial Design', 'Luxury Packaging', 'Creative Direction', 'Visual Identity'].map((skill, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border border-black/10 p-12 text-center hover:bg-[#F5F5DC] transition-colors duration-500">
                  <span className="text-xs uppercase tracking-[0.3em] font-light">{skill}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Luxury Minimal */}
      <section className="py-32 bg-[#F5F5DC]">
        <div className="container mx-auto px-8 max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-6xl mb-6 font-light">Investment</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto mb-6" />
              <p className="text-black/60 text-lg font-light">Bespoke solutions tailored to your vision</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: 'CURATED', price: '$15,000', features: ['Brand Strategy', 'Visual Identity', 'Art Direction', '3 Month Timeline'] },
              { name: 'SIGNATURE', price: '$35,000', features: ['Full Brand Suite', 'Editorial Design', 'Packaging Design', '6 Month Timeline'], featured: true },
              { name: 'PRESTIGE', price: '$75,000+', features: ['Complete Transformation', 'Ongoing Support', 'Global Campaign', '12 Month Partnership'] }
            ].map((pkg, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className={`bg-white p-12 border ${pkg.featured ? 'border-[#D4AF37] shadow-2xl' : 'border-black/10'}`}>
                  <div className="text-xs uppercase tracking-[0.3em] mb-8 text-[#D4AF37] font-light">{pkg.name}</div>
                  <div className="font-serif text-5xl mb-12 font-light">{pkg.price}</div>
                  <ul className="space-y-6 mb-12">
                    {pkg.features.map((f, idx) => (
                      <li key={idx} className="text-sm text-black/70 font-light flex items-center gap-3">
                        <span className="w-1 h-1 bg-[#D4AF37]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.featured ? 'bg-[#D4AF37] hover:bg-[#C19B2E] text-black' : 'bg-black hover:bg-black/80 text-white'} text-xs uppercase tracking-[0.2em] py-6`}>
                    {tt.common.getStarted}
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Luxury Minimal */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8 max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-6xl mb-6 font-light">Journey</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto" />
            </div>
          </ScrollReveal>

          <div className="space-y-16">
            {[
              { year: '2024', title: 'Global Recognition', desc: 'Featured in leading design publications' },
              { year: '2021', title: 'Studio Expansion', desc: 'Opened international offices' },
              { year: '2018', title: 'Industry Awards', desc: 'Won prestigious design awards' },
              { year: '2015', title: 'Founded', desc: 'Began crafting luxury experiences' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex gap-12 items-start border-t border-black/10 pt-8">
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="font-serif text-3xl text-[#D4AF37] font-light">{item.year}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-3xl mb-3 font-light">{item.title}</h4>
                    <p className="text-black/60 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Luxury Minimal */}
      <section className="py-32 bg-[#F5F5DC]">
        <div className="container mx-auto px-8 max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-6xl mb-6 font-light">Questions</h2>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto" />
            </div>
          </ScrollReveal>

          <div className="space-y-1">
            {[
              { q: 'What is your design philosophy?', a: 'We believe in timeless elegance and meticulous attention to detail.' },
              { q: 'How long does a project take?', a: 'Luxury cannot be rushed. Projects typically span 3-12 months.' },
              { q: 'Do you work internationally?', a: 'Yes, we collaborate with clients worldwide.' },
              { q: 'What is your minimum project size?', a: 'Our starting investment is $15,000 for curated projects.' }
            ].map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white border border-black/10 p-8 md:p-12">
                  <div className="font-serif text-2xl mb-4 font-light">{faq.q}</div>
                  <p className="text-black/60 leading-relaxed font-light">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-[#D4AF37]/20">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60 font-light">
              © {new Date().getFullYear()} {portfolioData.name}
            </p>
            <div className="flex gap-8">
              {portfolioData.social && Object.entries(portfolioData.social).map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-[#D4AF37] transition-colors font-light"
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
    </div>
  );
}
