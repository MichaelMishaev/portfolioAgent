"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { FiMenu, FiX, FiMaximize2, FiX as FiClose } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { placeholderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function PhotographyImmersiveTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const { tt } = useI18n();
  const portfolioData = tt?.photographyImmersive;

  if (!portfolioData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const filteredProjects = activeCategory === "all"
    ? portfolioData.projects
    : portfolioData.projects.filter((p) => p.category === activeCategory);

  const openLightbox = (project: any) => {
    setSelectedImage(project);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            {tt.common.backToGallery}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#gallery" className="text-xs uppercase tracking-widest hover:text-white/60 transition-colors">
              Gallery
            </a>
            <a href="#about" className="text-xs uppercase tracking-widest hover:text-white/60 transition-colors">
              {tt.common.about}
            </a>
            <a href="#contact" className="text-xs uppercase tracking-widest hover:text-white/60 transition-colors">
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
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden bg-black/95 backdrop-blur-sm"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              <a href="#gallery" className="text-xs uppercase tracking-widest py-2" onClick={() => setMobileMenuOpen(false)}>
                Gallery
              </a>
              <a href="#about" className="text-xs uppercase tracking-widest py-2" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.about}
              </a>
              <a href="#contact" className="text-xs uppercase tracking-widest py-2" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.contact}
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Fullscreen Image */}
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src={placeholderImages.heroBackgrounds.modern}
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">
              {portfolioData.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">
              {portfolioData.tagline}
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="text-xs uppercase tracking-widest text-white/60">Scroll</div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section id="gallery" className="py-12 sticky top-16 z-30 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {portfolioData.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 text-xs uppercase tracking-widest transition-all ${
                  activeCategory === category.id
                    ? "bg-white text-black"
                    : "bg-transparent text-white/60 hover:text-white border border-white/20"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="break-inside-avoid group cursor-pointer relative overflow-hidden"
                  onClick={() => openLightbox(project)}
                >
                  <div className="relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={project.height || 600}
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center p-6">
                        <h3 className="text-2xl font-light mb-2">{project.title}</h3>
                        <p className="text-sm text-white/80 mb-4">{project.description}</p>
                        {project.exif && (
                          <div className="text-xs text-white/60 space-y-1">
                            <div>{project.exif.camera}</div>
                            <div>{project.exif.lens}</div>
                            <div>{project.exif.settings}</div>
                          </div>
                        )}
                        <FiMaximize2 className="mx-auto mt-4 text-white/80" size={24} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              <FiClose size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  width={1600}
                  height={1000}
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-3xl font-light mb-2">{selectedImage.title}</h3>
                <p className="text-white/80 mb-4">{selectedImage.description}</p>
                {selectedImage.exif && (
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
                    <div>{selectedImage.exif.camera}</div>
                    <div>•</div>
                    <div>{selectedImage.exif.lens}</div>
                    <div>•</div>
                    <div>{selectedImage.exif.settings}</div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About Section */}
      <section id="about" className="py-32 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative h-[600px]">
                <Image
                  src={placeholderImages.people.person1}
                  alt="Portrait"
                  fill
                  className="object-cover grayscale"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div>
                <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">{tt.common.about}</h2>
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  {portfolioData.bio}
                </p>
                <div className="space-y-4 text-sm text-white/60">
                  {portfolioData.awards.map((award, index) => (
                    <div key={index} className="border-l-2 border-white/20 pl-4">
                      <div className="font-medium text-white/90">{award.title}</div>
                      <div>{award.year} • {award.organization}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 border-t border-white/10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-light mb-16 text-center tracking-tight">Services</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {portfolioData.services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.15}>
                <div className="text-center">
                  <h3 className="text-2xl font-light mb-4">{service.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-4">{service.description}</p>
                  <div className="text-sm text-white/40">{service.price}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-light mb-8 tracking-tight">
              {tt.common.letsWorkTogether}
            </h2>
            <p className="text-xl text-white/70 mb-12">
              Available for commissions and collaborations
            </p>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 text-sm uppercase tracking-widest px-12"
            >
              {tt.common.getInTouch}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats - Photography Immersive */}
      <section className="py-32 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
            {[
              { num: '10K+', label: 'Photos Taken' },
              { num: '500+', label: 'Happy Clients' },
              { num: '25+', label: 'Countries Visited' },
              { num: '15+', label: 'Years Experience' }
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-light mb-3 text-white/90">{stat.num}</div>
                  <div className="text-xs uppercase tracking-widest text-white/50">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills - Photography Immersive */}
      <section className="py-32 border-t border-white/10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-light mb-16 text-center tracking-tight">Specializations</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {['Portrait Photography', 'Landscape Photography', 'Wedding Photography', 'Commercial Photography', 'Fine Art Photography', 'Editorial Photography'].map((skill, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border border-white/10 p-8 text-center hover:bg-white/5 transition-colors duration-300">
                  <span className="text-sm font-light tracking-wide">{skill}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Photography Immersive */}
      <section className="py-32 border-t border-white/10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-light mb-8 text-center tracking-tight">Packages</h2>
            <p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
              Tailored photography experiences to capture your moments
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Essential', price: '$800', features: ['2 Hour Session', '50 Edited Photos', 'Online Gallery', 'Digital Downloads'] },
              { name: 'Premium', price: '$1,800', features: ['4 Hour Session', '150 Edited Photos', 'Premium Retouching', 'Print Release', 'Fine Art Prints'], featured: true },
              { name: 'Ultimate', price: '$3,500+', features: ['Full Day Coverage', 'Unlimited Photos', 'Second Photographer', 'Album Design', 'Exclusive Rights'] }
            ].map((pkg, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className={`border ${pkg.featured ? 'border-white' : 'border-white/20'} p-10 hover:border-white/60 transition-colors`}>
                  <div className="text-xs uppercase tracking-widest mb-8 text-white/60">{pkg.name}</div>
                  <div className="text-5xl font-light mb-12">{pkg.price}</div>
                  <ul className="space-y-4 mb-12">
                    {pkg.features.map((f, idx) => (
                      <li key={idx} className="text-sm text-white/70 flex items-center gap-3">
                        <span className="w-1 h-1 bg-white/60" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.featured ? 'bg-white text-black hover:bg-white/90' : 'bg-transparent border border-white/30 hover:bg-white/10'} text-xs uppercase tracking-widest`}>
                    Book Now
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Photography Immersive */}
      <section className="py-32 border-t border-white/10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-light mb-16 text-center tracking-tight">Kind Words</h2>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto space-y-12">
            {[
              { text: 'The most beautiful photos we could have ever imagined. A true artist with the camera.', author: 'Emma & James', role: 'Wedding Clients' },
              { text: 'Capturing emotion and light in ways I never thought possible. Simply stunning.', author: 'Sarah Mitchell', role: 'Portrait Client' },
              { text: 'Professional, creative, and an absolute pleasure to work with. Highly recommended!', author: 'David Chen', role: 'Commercial Client' }
            ].map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="border-l border-white/20 pl-8">
                  <p className="text-2xl font-light mb-6 italic text-white/90 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <div className="text-sm font-medium text-white/80">{t.author}</div>
                    <div className="text-xs text-white/50 uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Photography Immersive */}
      <section className="py-32 border-t border-white/10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-light mb-16 text-center tracking-tight">Journey</h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-16">
            {[
              { year: '2024', title: 'International Recognition', desc: 'Featured in National Geographic' },
              { year: '2020', title: 'Solo Exhibition', desc: 'First major gallery showcase in NYC' },
              { year: '2017', title: 'Professional Career', desc: 'Started full-time photography business' },
              { year: '2012', title: 'First Award', desc: 'Won international photography competition' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="grid md:grid-cols-5 gap-8 items-start">
                  <div className="md:col-span-1 text-center md:text-right">
                    <div className="text-3xl font-light text-white/60">{item.year}</div>
                  </div>
                  <div className="md:col-span-4 border-l border-white/20 pl-8">
                    <h4 className="text-2xl font-light mb-2">{item.title}</h4>
                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Photography Immersive */}
      <section className="py-32 border-t border-white/10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-light mb-16 text-center tracking-tight">FAQ</h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { q: 'How do I book a session?', a: 'Contact me through the form above or email directly. I respond within 24 hours.' },
              { q: 'When will I receive my photos?', a: 'Edited photos are delivered within 2-4 weeks depending on the package.' },
              { q: 'Do you travel for shoots?', a: 'Yes! I work worldwide. Travel fees may apply for destinations outside my local area.' },
              { q: 'Can I request specific editing styles?', a: 'Absolutely. I work closely with clients to achieve their desired aesthetic.' },
              { q: 'What happens if weather is bad?', a: 'We can reschedule at no extra cost or embrace the moody atmosphere!' }
            ].map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border-b border-white/10 pb-8">
                  <div className="text-xl font-light mb-3 text-white/90">{faq.q}</div>
                  <p className="text-white/60 leading-relaxed">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs uppercase tracking-widest text-white/40">
              © {new Date().getFullYear()} {portfolioData.name}
            </p>
            <div className="flex gap-8">
              {portfolioData.social && Object.entries(portfolioData.social).map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors"
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
