"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { FiMail, FiGithub, FiLinkedin, FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "Marcus Stone",
  tagline: "Brand Strategist",
  subtitle: "Creating bold identities for fearless brands",
  bio: "I help startups and established companies craft memorable brand experiences through strategic thinking and bold visual communication. 12+ years crafting brands that break through the noise.",
  stats: [
    { number: "150+", label: "Brands Launched" },
    { number: "50M+", label: "Revenue Generated" },
    { number: "12+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
  ],
  services: [
    {
      number: "01",
      title: "Brand Strategy",
      description: "Comprehensive brand positioning and messaging frameworks that differentiate you from competitors.",
    },
    {
      number: "02",
      title: "Visual Identity",
      description: "Logo design, color systems, and typography that stands out and stays memorable.",
    },
    {
      number: "03",
      title: "Creative Direction",
      description: "End-to-end creative leadership for campaigns and launches that drive results.",
    },
  ],
  process: [
    { step: "DISCOVER", desc: "Deep dive into your brand, competitors, and audience" },
    { step: "DEFINE", desc: "Clarify positioning, messaging, and visual direction" },
    { step: "DESIGN", desc: "Create bold visual systems that stand out" },
    { step: "DELIVER", desc: "Launch with confidence and measure impact" },
  ],
  caseStudies: [
    {
      title: "TechFlow",
      category: "SaaS Startup",
      challenge: "New B2B SaaS needed to stand out in crowded market",
      solution: "Bold brand identity with data-driven messaging",
      impact: "300% increase in demo requests, $2M seed round",
      before: "Generic tech branding, low conversion rates",
      after: "Distinctive brand, clear value prop, 10x engagement",
    },
    {
      title: "GreenEats",
      category: "Food Tech",
      challenge: "Sustainable food delivery struggling with brand awareness",
      solution: "Purpose-driven brand with vibrant visuals",
      impact: "5x social media growth, featured in major press",
      before: "Invisible in market, 2% monthly growth",
      after: "Category leader, 45% monthly growth",
    },
  ],
  testimonials: [
    { client: "Sarah Chen, CEO TechFlow", quote: "Marcus didn't just design a logo. He transformed how we think about our brand. We went from invisible to unforgettable." },
    { client: "David Park, Founder GreenEats", quote: "The ROI speaks for itself. Our brand work with Marcus paid for itself in 3 months." },
  ],
  clients: ["Nike", "Spotify", "Airbnb", "Tesla", "Netflix", "Apple", "Stripe", "Notion"],
  contact: {
    email: "hello@marcusstone.com",
    location: "Los Angeles, CA",
  },
};

export function BoldTypographyTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-3 max-w-full py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm hover:text-primary transition-colors">
              Services
            </a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </a>
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
                href="#services"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Bold Typography */}
      <section className="container mx-auto px-3 max-w-full pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <FadeIn>
          <h1 className="text-[clamp(3rem,12vw,12rem)] font-black leading-[0.85] tracking-tight mb-8 text-gray-900">
            {portfolioData.name.split(" ").map((word, i) => (
              <div key={i}>{word}</div>
            ))}
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-full ml-auto">
            <p className="text-2xl md:text-3xl sm:text-4xl font-bold mb-4">
              {portfolioData.tagline}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {portfolioData.subtitle}
            </p>
            <Button size="lg" className="group">
              Let's Talk
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-3 max-w-full py-20 border-t">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 break-words text-gray-900">
                About
              </h2>
            </div>
            <div>
              <p className="text-xl leading-relaxed text-foreground/90">
                {portfolioData.bio}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-3 max-w-full py-20 border-t bg-accent/5">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {portfolioData.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-2 text-primary break-words">
                  {stat.number}
                </div>
                <p className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-3 max-w-full py-20 border-t">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-16 break-words text-gray-900">
            Services
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          {portfolioData.services.map((service, index) => (
            <ScrollReveal key={service.number} delay={index * 0.1}>
              <div className="group grid md:grid-cols-12 gap-6 py-8 border-b hover:bg-accent/50 transition-colors -mx-6 px-3 cursor-pointer">
                <div className="md:col-span-2">
                  <span className="text-3xl sm:text-4xl font-black text-muted-foreground group-hover:text-primary transition-colors">
                    {service.number}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-3xl md:text-3xl sm:text-4xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-lg text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-3 max-w-full py-20 border-t">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-16 text-center break-words text-gray-900">
            Process
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-full mx-auto">
          {portfolioData.process.map((step, index) => (
            <ScrollReveal key={step.step} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-primary mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase text-gray-900">
                  {step.step}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="container mx-auto px-3 max-w-full py-20 border-t bg-accent/5">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-16 break-words text-gray-900">
            Case Studies
          </h2>
        </ScrollReveal>

        <div className="space-y-20">
          {portfolioData.caseStudies.map((study, index) => (
            <ScrollReveal key={study.title} delay={index * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left: Project Info */}
                <div>
                  <span className="inline-block text-sm font-bold px-3 py-2 bg-primary text-primary-foreground mb-4 uppercase">
                    {study.category}
                  </span>
                  <h3 className="text-5xl md:text-4xl sm:text-5xl md:text-6xl font-black mb-6 break-words text-gray-900">
                    {study.title}
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold mb-2 uppercase">Challenge</h4>
                      <p className="text-lg text-muted-foreground">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold mb-2 uppercase">Solution</h4>
                      <p className="text-lg text-muted-foreground">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold mb-2 uppercase">Impact</h4>
                      <p className="text-lg font-bold text-primary">{study.impact}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Before & After */}
                <div className="space-y-6">
                  <div className="border-l-4 border-muted pl-6">
                    <div className="text-sm font-bold uppercase text-muted-foreground mb-2">Before</div>
                    <p className="text-lg">{study.before}</p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <div className="text-sm font-bold uppercase text-primary mb-2">After</div>
                    <p className="text-lg font-semibold">{study.after}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-3 max-w-full py-20 border-t">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-16 break-words text-gray-900">
            Testimonials
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-full mx-auto">
          {portfolioData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.client} delay={index * 0.1}>
              <div className="border-l-4 border-primary pl-6">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug mb-6">
                  "{testimonial.quote}"
                </p>
                <p className="text-lg font-semibold">
                  {testimonial.client}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Clients Section */}
      <section className="container mx-auto px-3 max-w-full py-20 border-t">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-16 break-words text-gray-900">
            Clients
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioData.clients.map((client) => (
              <div
                key={client}
                className="aspect-square flex items-center justify-center border hover:bg-accent/50 transition-colors"
              >
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-3 max-w-full py-32 border-t">
        <ScrollReveal>
          <h2 className="text-[clamp(3rem,10vw,10rem)] font-black leading-[0.9] mb-12 text-gray-900">
            Let's Create
            <br />
            Something
            <br />
            <span className="text-primary">Bold</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="space-y-4">
              <Button size="lg" className="text-lg">
                <FiMail className="mr-2" />
                {portfolioData.contact.email}
              </Button>
              <p className="text-lg text-muted-foreground">
                {portfolioData.contact.location}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="icon" className="h-12 w-12 !text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                <FiGithub className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 !text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                <FiLinkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Skills - Bold Typography Style */}
      <section className="py-20 px-3 border-t">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-16 tracking-tight break-words text-gray-900">SKILLS</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { cat: 'FRONTEND', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
              { cat: 'BACKEND', skills: ['Node.js', 'PostgreSQL', 'GraphQL', 'REST APIs'] },
              { cat: 'TOOLS', skills: ['Git', 'Docker', 'AWS', 'Figma'] },
              { cat: 'SOFT SKILLS', skills: ['Leadership', 'Communication', 'Problem Solving', 'Agile'] }
            ].map((group, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black tracking-tight text-gray-900">{group.cat}</h3>
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((s, j) => (
                      <span key={j} className="px-4 py-2 bg-foreground text-background font-bold text-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Bold Typography Style */}
      <section className="py-20 px-3 bg-foreground text-background">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-16 tracking-tight break-words text-gray-900">PRICING</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'BASIC', price: '$499', features: ['LANDING PAGE', '2 REVISIONS', 'RESPONSIVE', 'SEO READY'] },
              { name: 'PRO', price: '$999', features: ['FULL WEBSITE', '5 REVISIONS', 'CUSTOM DESIGN', 'CMS SETUP', 'ADVANCED SEO'] },
              { name: 'ULTIMATE', price: '$2499', features: ['WEB APPLICATION', 'UNLIMITED REVISIONS', 'CUSTOM FEATURES', 'API INTEGRATION', 'PRIORITY SUPPORT'] }
            ].map((plan, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border-4 border-background p-8">
                  <div className="text-3xl font-black mb-6">{plan.name}</div>
                  <div className="text-4xl sm:text-5xl font-black mb-8 break-words">{plan.price}</div>
                  <ul className="space-y-3">
                    {plan.features.map((f, j) => (
                      <li key={j} className="font-bold text-sm">{f}</li>
                    ))}
                  </ul>
                  <Button className="w-full mt-8 bg-background text-foreground hover:bg-background/90 font-black text-lg h-12">
                    SELECT
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Bold Typography Style */}
      <section className="py-20 px-3">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-16 tracking-tight break-words text-gray-900">GALLERY</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="aspect-square bg-foreground/10 hover:bg-foreground hover:text-background transition-all cursor-pointer flex items-center justify-center group">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black opacity-20 group-hover:opacity-100 transition-opacity break-words">
                    {i.toString().padStart(2, '0')}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Bold Typography Style */}
      <section className="py-32 px-3 bg-foreground text-background">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-5xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl lg:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter leading-none break-words text-gray-900">
              LET'S WORK
            </h2>
            <h2 className="text-5xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl lg:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-12 tracking-tighter leading-none break-words text-gray-900">
              TOGETHER
            </h2>
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 font-black text-xl px-12 h-16">
              GET IN TOUCH
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline - Bold Typography Style */}
      <section className="py-20 px-3">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-16 tracking-tight break-words text-gray-900">TIMELINE</h2>
          </ScrollReveal>
          <div className="space-y-8">
            {[
              { year: '2024', title: 'SENIOR DEVELOPER', company: 'TECH CORP' },
              { year: '2022', title: 'LEAD DEVELOPER', company: 'DIGITAL AGENCY' },
              { year: '2020', title: 'FULL STACK DEV', company: 'STARTUP CO' },
              { year: '2018', title: 'JUNIOR DEVELOPER', company: 'WEB STUDIO' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="grid grid-cols-4 gap-8 border-b-4 border-foreground pb-6">
                  <div className="text-3xl font-black">{item.year}</div>
                  <div className="col-span-3">
                    <div className="text-2xl font-black mb-2">{item.title}</div>
                    <div className="text-lg font-bold text-muted-foreground">{item.company}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-3 max-w-full py-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
