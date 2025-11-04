"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { CustomizeTemplateButton } from "@/components/customize-template-button";

export function MinimalistTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { tt } = useI18n();
  const portfolioData = tt?.minimalist;

  if (!portfolioData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-3 max-w-full py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {tt.common.backToGallery}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm hover:text-primary transition-colors">
              {tt.common.about}
            </a>
            <a href="#work" className="text-sm hover:text-primary transition-colors">
              {tt.common.work}
            </a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">
              {tt.common.contact}
            </a>
            <ThemeToggle />
            <LanguageToggle />
            <CustomizeTemplateButton variant="outline" className="text-slate-900 dark:text-white" size="sm" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 text-foreground hover:bg-accent rounded-md border border-border transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-t">
            <div className="container mx-auto px-3 max-w-full py-4 flex flex-col gap-4">
              <a
                href="#about"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tt.common.about}
              </a>
              <a
                href="#work"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tt.common.work}
              </a>
              <a
                href="#contact"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tt.common.contact}
              </a>
              <div className="pt-2">
                <CustomizeTemplateButton variant="outline" size="sm" className="w-full !text-slate-900 dark:text-white" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Maximum Simplicity */}
      <section className="container mx-auto px-3 max-w-full pt-40 pb-32">
        <div className="max-w-full">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-light mb-8 tracking-tighter leading-none break-words">
              {portfolioData.name}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-foreground/50 mb-16 font-light">
              {portfolioData.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <a
              href="#contact"
              className="text-sm uppercase tracking-widest border-b border-foreground pb-1 hover:border-foreground/50 transition-colors"
            >
              {tt.common.getInTouch}
            </a>
          </FadeIn>
        </div>
      </section>

      {/* About Section - Minimal Typography */}
      <section id="about" className="container mx-auto px-3 max-w-full py-32">
        <div className="max-w-full mx-auto">
          <ScrollReveal>
            <h2 className="text-xs font-medium text-muted-foreground mb-16 uppercase tracking-widest">
              {tt.common.about}
            </h2>
            <p className="text-2xl leading-loose text-foreground/70 font-light">
              {portfolioData.bio}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="container mx-auto px-3 max-w-full py-32 border-t">
        <div className="max-w-full mx-auto">
          <ScrollReveal>
            <p className="text-4xl md:text-5xl font-light leading-tight tracking-tight text-center break-words">
              {portfolioData.statement}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats - Minimal Grid */}
      <section className="container mx-auto px-3 max-w-full py-20">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {portfolioData.stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-6xl md:text-7xl font-light mb-3 tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Minimal List */}
      <section className="container mx-auto px-3 max-w-full py-20 border-t">
        <div className="max-w-full mx-auto">
          <ScrollReveal>
            <h2 className="text-xs font-medium text-muted-foreground mb-12 uppercase tracking-widest">
              Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
              {portfolioData.skills.map((skill) => (
                <span key={skill} className="text-sm text-foreground/60">
                  {skill}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Work Section - Minimal List */}
      <section id="work" className="container mx-auto px-3 max-w-full py-32">
        <div className="max-w-full">
          <ScrollReveal>
            <h2 className="text-xs font-medium text-muted-foreground mb-16 uppercase tracking-widest">
              Selected Work
            </h2>
          </ScrollReveal>

          <div className="space-y-16">
            {portfolioData.projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.05}>
                <div className="grid grid-cols-12 gap-8 border-b pb-12 last:border-0">
                  <div className="col-span-2 text-sm text-muted-foreground font-mono">
                    {project.year}
                  </div>
                  <div className="col-span-10">
                    <h3 className="text-3xl font-medium mb-4 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-lg text-foreground/60 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex gap-3 text-xs uppercase tracking-wider text-muted-foreground">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-3 max-w-full py-32 border-t">
        <div className="max-w-full mx-auto">
          <ScrollReveal>
            <h2 className="text-xs font-medium text-muted-foreground mb-16 uppercase tracking-widest">
              Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {portfolioData.services.map((service) => (
                <div key={service} className="text-lg font-light text-foreground/70">
                  {service}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Clients */}
      <section className="container mx-auto px-3 max-w-full py-32 border-t">
        <div className="max-w-full mx-auto">
          <ScrollReveal>
            <h2 className="text-xs font-medium text-muted-foreground mb-16 uppercase tracking-widest text-center">
              Selected Clients
            </h2>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {portfolioData.clients.map((client) => (
                <span key={client} className="text-xl font-light text-foreground/50">
                  {client}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section - Minimal CTA */}
      <section id="contact" className="container mx-auto px-3 max-w-full py-40 border-t">
        <div className="max-w-full mx-auto">
          <ScrollReveal>
            <h2 className="text-xs font-medium text-muted-foreground mb-16 uppercase tracking-widest">
              {tt.common.contact}
            </h2>
            <p className="text-5xl md:text-6xl font-light mb-16 leading-tight tracking-tight break-words">
              {tt.common.letsWorkTogether}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <a
              href={`mailto:${portfolioData.email}`}
              className="text-2xl font-light text-foreground/60 hover:text-foreground transition-colors border-b border-foreground/20 hover:border-foreground pb-1"
            >
              {portfolioData.email}
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex gap-8 mt-16">
              <a
                href={portfolioData.social?.github || "https://github.com"}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                GitHub
              </a>
              <a
                href={portfolioData.social?.linkedin || "https://linkedin.com"}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                LinkedIn
              </a>
              <a
                href={portfolioData.social?.twitter || "https://twitter.com"}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
              >
                Twitter
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing - Minimalist Style */}
      <section className="py-20 px-3 border-t">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-xs uppercase tracking-widest mb-16 text-center">Pricing</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { name: 'Essential', price: '249', features: ['Single Page', 'Responsive Design', 'Basic SEO', '1 Revision'] },
              { name: 'Professional', price: '599', features: ['Multi-Page Site', 'Custom Design', 'Advanced SEO', '3 Revisions', 'CMS Setup'] },
              { name: 'Enterprise', price: '1299', features: ['Full Platform', 'Custom Features', 'API Integration', 'Unlimited Revisions', 'Priority Support'] }
            ].map((plan, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-background p-8">
                  <div className="text-xs uppercase tracking-widest mb-4">{plan.name}</div>
                  <div className="text-4xl font-light mb-8">${plan.price}</div>
                  <ul className="space-y-3">
                    {plan.features.map((f, j) => (
                      <li key={j} className="text-xs uppercase tracking-wider text-muted-foreground">{f}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Minimalist Style */}
      <section className="py-20 px-3 border-t">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-xs uppercase tracking-widest mb-16 text-center">Testimonials</h2>
          </ScrollReveal>
          <div className="space-y-12">
            {[
              { text: 'Exceptional work. Clean, functional, and exactly what we needed.', author: 'Sarah Chen', role: 'CEO, TechStart' },
              { text: 'The attention to detail is remarkable. Highly recommended.', author: 'Michael Ross', role: 'Creative Director' },
              { text: 'Professional, responsive, and delivered on time.', author: 'Emma Wilson', role: 'Product Manager' }
            ].map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border-l-2 border-foreground pl-6">
                  <p className="text-lg font-light mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t.author} — {t.role}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Minimalist Style */}
      <section className="py-20 px-3 border-t">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-xs uppercase tracking-widest mb-16 text-center">Timeline</h2>
          </ScrollReveal>
          <div className="space-y-8">
            {[
              { year: '2024', title: 'Senior Developer', company: 'Design Studio' },
              { year: '2022', title: 'Lead Developer', company: 'Tech Agency' },
              { year: '2020', title: 'Full Stack Developer', company: 'Startup Inc' },
              { year: '2018', title: 'Junior Developer', company: 'Web Solutions' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="grid grid-cols-4 gap-4 border-b pb-4">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{item.year}</div>
                  <div className="col-span-3">
                    <div className="text-sm font-medium mb-1">{item.title}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{item.company}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Minimalist Style */}
      <section className="py-20 px-3 border-t">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-xs uppercase tracking-widest mb-16 text-center">FAQ</h2>
          </ScrollReveal>
          <div className="space-y-8">
            {[
              { q: 'What is your typical project timeline?', a: 'Most projects take 4-8 weeks depending on complexity and scope.' },
              { q: 'Do you offer ongoing support?', a: 'Yes, all projects include 30 days of support. Extended plans available.' },
              { q: 'What technologies do you work with?', a: 'React, Next.js, TypeScript, Node.js, and modern web standards.' },
              { q: 'Can you work with existing codebases?', a: 'Absolutely. I specialize in both new builds and legacy improvements.' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="border-b pb-6">
                  <div className="text-sm font-medium mb-2">{item.q}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground leading-relaxed">{item.a}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-3 max-w-full py-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
