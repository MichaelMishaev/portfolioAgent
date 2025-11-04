"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiMenu, FiX, FiCode, FiLayers, FiZap } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { motion, useScroll, useTransform } from "framer-motion";

export function GlassmorphismModernTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { tt } = useI18n();
  const data = tt?.glassmorphismModern;

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleCardMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-[#343434]">
      {/* Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-3xl border-b border-white/20">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl py-4 flex items-center justify-between">
          <Link href="/" className="text-white font-bold hover:text-cyan-400 transition-colors">
            {tt.common.backToGallery}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-white/80 hover:text-white font-medium transition-colors">
              {tt.common.work}
            </a>
            <a href="#features" className="text-white/80 hover:text-white font-medium transition-colors">
              {tt.common.features}
            </a>
            <a href="#pricing" className="text-white/80 hover:text-white font-medium transition-colors">
              {tt.common.pricing}
            </a>
            <a href="#contact" className="text-white/80 hover:text-white font-medium transition-colors">
              {tt.common.contact}
            </a>
            <ThemeToggle />
            <LanguageToggle />
            <Button className="bg-cyan-500/20 hover:bg-cyan-500/30 text-white border border-cyan-400/50 backdrop-blur-sm">
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-3xl border-t border-white/20">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4 text-white">
              <a href="#work" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.work}
              </a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.features}
              </a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.pricing}
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.contact}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero with Glass Effect */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        {/* Animated Background Gradient with Parallax */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-600/20 to-blue-600/20"
          style={{ y }}
        />

        {/* Floating glass orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full blur-3xl"
            style={{
              background: i === 0 ? 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)' :
                         i === 1 ? 'radial-gradient(circle, rgba(34,211,238,0.3), transparent)' :
                         'radial-gradient(circle, rgba(59,130,246,0.3), transparent)',
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <motion.h1
              className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ textShadow: '0 0 80px rgba(255,255,255,0.3)' }}
            >
              {data.hero.title}
            </motion.h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
              {data.hero.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md px-8 py-6 text-lg relative overflow-hidden group"
                >
                  <span className="relative z-10">{data.hero.primaryCta}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-md px-8 py-6 text-lg"
                >
                  {data.hero.secondaryCta}
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Glass Cards Features */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white text-center mb-16">{data.features.title}</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {data.features.items.map((feature: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                  <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 transition-colors">
                    <FiCode className="text-cyan-400 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Glass Pricing Table */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white text-center mb-16">{data.pricing.title}</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/20">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/10 border-b border-white/20">
                    <th className="px-6 py-4 text-left text-white font-semibold">Feature</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Basic</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Pro</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pricing.features.map((feature: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-white/10 hover:bg-white/15 transition-colors duration-300"
                    >
                      <td className="px-6 py-4 text-white/90">{feature.name}</td>
                      <td className="px-6 py-4 text-white/90">{feature.basic}</td>
                      <td className="px-6 py-4 text-white/90">{feature.pro}</td>
                      <td className="px-6 py-4 text-white/90">{feature.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-cyan-500/20 hover:bg-cyan-500/30 text-white border border-cyan-400/50 backdrop-blur-sm px-12 py-6 text-lg"
              >
                {data.pricing.cta}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white text-center mb-16">{data.work.title}</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {data.work.projects.map((project: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group cursor-pointer">
                  <div className="aspect-video bg-white/5 rounded-lg mb-6 flex items-center justify-center">
                    <FiLayers className="text-6xl text-white/20" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/80 mb-4">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-white/10 text-white/90 text-sm rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Frosted Glass Cards */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "500+", label: "Projects", icon: <FiCode /> },
              { number: "98%", label: "Satisfaction", icon: <FiZap /> },
              { number: "50+", label: "Clients", icon: <FiLayers /> },
              { number: "5yrs", label: "Experience", icon: <FiCode /> }
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="text-cyan-400 mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About - Glass Panel */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-3xl rounded-3xl p-12 border border-white/20">
              <h2 className="text-4xl font-bold text-white mb-6">About</h2>
              <p className="text-xl text-white/80 leading-relaxed mb-6">
                Creating next-generation digital experiences with modern web technologies.
                Specialized in glassmorphism design, 3D interactions, and immersive user interfaces.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                Every project is an opportunity to push boundaries and create something extraordinary.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills - Floating Glass Tags */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Skills & Technologies</h2>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React", "Next.js", "TypeScript", "Framer Motion", "Three.js", "WebGL",
              "GSAP", "Tailwind CSS", "Glassmorphism", "3D Design", "UI/UX", "Animation"
            ].map((skill, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-white/10 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all cursor-pointer">
                  <span className="text-white font-medium">{skill}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Glass Timeline */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Journey</h2>
          </ScrollReveal>
          <div className="space-y-6">
            {[
              { year: "2024", title: "Senior UI Engineer", company: "Tech Innovations Inc" },
              { year: "2022", title: "Lead Designer", company: "Creative Studio" },
              { year: "2020", title: "Frontend Developer", company: "Digital Agency" },
              { year: "2019", title: "Started Freelancing", company: "Independent" }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 hover:bg-white/10 transition-all">
                  <div className="flex gap-6 items-center">
                    <div className="text-cyan-400 font-bold text-xl w-20">{item.year}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-white/60">{item.company}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Glass Cards with Glow */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Testimonials</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Absolutely stunning work. The glassmorphism effects are perfection.", author: "Sarah J.", role: "CEO, TechCorp" },
              { quote: "Transformed our brand with cutting-edge design and smooth animations.", author: "Mike R.", role: "Founder, StartupX" },
              { quote: "Professional, creative, and ahead of the curve. Highly recommended.", author: "Emma L.", role: "Director, Agency Co" }
            ].map((test, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all">
                  <p className="text-white/90 text-lg mb-6 italic">"{test.quote}"</p>
                  <div className="text-white font-semibold">{test.author}</div>
                  <div className="text-white/60 text-sm">{test.role}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Accordion Glass */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white mb-12 text-center">FAQ</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {[
              { q: "What's your design process?", a: "Discovery → Strategy → Design → Development → Testing → Launch" },
              { q: "Do you work with startups?", a: "Yes! I love working with startups and bringing bold ideas to life." },
              { q: "What's your turnaround time?", a: "Typically 2-6 weeks depending on project complexity." },
              { q: "Do you offer support after launch?", a: "Absolutely. I provide ongoing support and maintenance packages." }
            ].map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 hover:bg-white/10 transition-all">
                  <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-white/70">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with Glass Effect */}
      <footer id="contact" className="py-16 px-6 border-t border-white/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">{tt.common.getInTouch}</h3>
            <p className="text-xl text-white/80 mb-8">{data.contact.description}</p>
            <div className="flex gap-6 justify-center">
              <a
                href={`mailto:${data.contact.email}`}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm border border-white/20 transition-all footer-link"
              >
                <FiMail size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm border border-white/20 transition-all footer-link"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm border border-white/20 transition-all footer-link"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm border border-white/20 transition-all footer-link"
              >
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2025 Glass Portfolio. Modern. Transparent. Beautiful.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
