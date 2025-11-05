"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { FiMail, FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

export function MinimalPortfolioCleanTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { tt } = useI18n();
  const data = tt?.minimalPortfolioClean;

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-white">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            {data.initials}
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <a href="#work" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              {tt.common.work}
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              {tt.common.about}
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              {tt.common.contact}
            </a>
            <ThemeToggle />
            <LanguageToggle />
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-6 py-4 flex flex-col gap-4">
              <a href="#work" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.work}
              </a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.about}
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.contact}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Centered Text-First Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-3xl text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl md:text-5xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight break-words">
              {data.hero.greeting}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
              {data.hero.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex gap-6 justify-center flex-wrap">
              <a href="#work" className="text-blue-600 font-semibold hover:underline">
                {tt.common.viewAll} {tt.common.work}
              </a>
              <a href="#about" className="text-gray-600 font-semibold hover:text-gray-900">
                {tt.common.about}
              </a>
              <a href="#contact" className="text-gray-600 font-semibold hover:text-gray-900">
                {tt.common.contact}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Simple Project Grid */}
      <section id="work" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Selected Work</h2>
          </ScrollReveal>

          <div className="space-y-16">
            {data.projects.map((project: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <a href="#" className="block group">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2">
                      <div className="w-full rounded-lg bg-gray-200 h-80 shadow-sm group-hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                        <span className="text-gray-400 text-6xl">📱</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-2">{project.category}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {project.tags.map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{tt.common.about}</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                {data.about.bio}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {data.about.approach}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              {data.about.skills.map((skill: string, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2 text-gray-900">✓</div>
                  <div className="font-medium text-gray-900">{skill}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{tt.common.getInTouch}</h2>
            <p className="text-xl text-gray-600 mb-12">
              {data.contact.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex gap-8 justify-center mb-12">
              <a
                href={`mailto:${data.contact.email}`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiMail size={28} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <FiGithub size={28} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <FiLinkedin size={28} />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg">
              Send a Message
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats - Minimal Numbers Only */}
      <section className="py-16 px-6 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <ScrollReveal>
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-2">6</div>
                <div className="text-sm uppercase tracking-wider text-gray-500">Years</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-2">47</div>
                <div className="text-sm uppercase tracking-wider text-gray-500">Projects</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-2">12</div>
                <div className="text-sm uppercase tracking-wider text-gray-500">Clients</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-2">2</div>
                <div className="text-sm uppercase tracking-wider text-gray-500">Awards</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Gallery - Text List Only */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Archive</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {[
              { title: "Mobile Interface", year: "2024" },
              { title: "Dashboard Design", year: "2024" },
              { title: "Design System", year: "2023" },
              { title: "Brand Identity", year: "2023" },
              { title: "Web Application", year: "2022" },
              { title: "Product Strategy", year: "2022" }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 hover:border-gray-900 transition-colors">
                  <span className="text-lg text-gray-900">{item.title}</span>
                  <span className="text-gray-500 font-mono text-sm">{item.year}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Simple List */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Experience</h2>
          </ScrollReveal>
          <div className="space-y-8">
            {[
              { year: "2024", event: "Design Lead, Atlas Fintech" },
              { year: "2022", event: "Senior Designer, CreatorCo" },
              { year: "2020", event: "Product Designer, StartupX" },
              { year: "2018", event: "Started independent practice" }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="flex gap-12 items-baseline">
                  <span className="text-sm font-mono text-gray-500 w-16">{item.year}</span>
                  <span className="text-lg text-gray-900">{item.event}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Plain Quotes */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Testimonials</h2>
          </ScrollReveal>
          <div className="space-y-12">
            {[
              {
                quote: "Alex's attention to detail is unmatched. Clean, thoughtful design.",
                author: "Sarah Kim",
                role: "CEO, HealthFlow"
              },
              {
                quote: "Delivered exactly what we needed. Professional and efficient.",
                author: "Mark Wilson",
                role: "Founder, Creator Studio"
              },
              {
                quote: "The design system Alex created scaled perfectly with our growth.",
                author: "Lisa Chen",
                role: "VP Product, FinanceHub"
              }
            ].map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <blockquote className="border-l-2 border-gray-900 pl-6">
                  <p className="text-xl text-gray-700 mb-4">"{testimonial.quote}"</p>
                  <footer className="text-sm text-gray-900">
                    <span className="text-gray-900 font-medium">{testimonial.author}</span>
                    <span className="text-gray-500"> — {testimonial.role}</span>
                  </footer>
                </blockquote>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Simple Table */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Services</h2>
          </ScrollReveal>
          <div className="space-y-6">
            {[
              { name: "Consultation", price: "$150/hr", description: "Strategic design consultation and audit" },
              { name: "Project", price: "$8K–$25K", description: "Full product design from concept to delivery" },
              { name: "Retainer", price: "$5K/mo", description: "Ongoing design partnership" }
            ].map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="flex justify-between items-start py-6 border-b border-gray-200">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                  <div className="text-lg font-medium text-gray-900 ml-8">{service.price}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Simple Accordion Style */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Questions</h2>
          </ScrollReveal>
          <div className="space-y-8">
            {[
              {
                q: "What's your typical timeline?",
                a: "Most projects take 4-8 weeks depending on scope and complexity."
              },
              {
                q: "Do you work remotely?",
                a: "Yes. I work with clients globally via video calls and async collaboration."
              },
              {
                q: "What's your process?",
                a: "Research → Strategy → Design → Development support → Iteration."
              },
              {
                q: "Do you offer ongoing support?",
                a: "Yes. I offer monthly retainers for continued design partnership."
              }
            ].map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Ultra Minimal */}
      <section className="py-24 px-6 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Let's work together</h2>
            <p className="text-xl text-gray-600 mb-12">Available for select projects starting Q2 2025.</p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-lg"
            >
              Get in touch
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 px-6 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>&copy; 2025 {data.hero.name}. Designed with clarity and purpose.</p>
        </div>
      </footer>
    </div>
  );
}
