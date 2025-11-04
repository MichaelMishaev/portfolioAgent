"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FiMail,
  FiLinkedin,
  FiTwitter,
  FiMenu,
  FiX,
  FiCheckCircle,
  FiTrendingUp,
  FiUsers,
  FiTarget,
  FiAward,
  FiArrowRight
} from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { placeholderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function ProfessionalB2bTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { tt } = useI18n();
  const data = tt?.professionalB2b;

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePosition({ x, y });
  };

  const handleCardMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            {tt.common.backToGallery}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {tt.common.services}
            </a>
            <a href="#case-studies" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Case Studies
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {tt.common.testimonials}
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {tt.common.contact}
            </a>
            <ThemeToggle />
            <LanguageToggle />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started
            </Button>
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
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.services}
              </a>
              <a href="#case-studies" onClick={() => setMobileMenuOpen(false)}>
                Case Studies
              </a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.testimonials}
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.contact}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - B2B Professional */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 lg:py-32 mt-16">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="max-w-2xl">
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {data.hero.title}
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  {data.hero.subtitle}
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Button size="lg" className="bg-white !text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold">
                    {data.hero.primaryCta}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
                  >
                    {data.hero.secondaryCta}
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={placeholderImages.projects.dashboard}
                  alt="B2B Dashboard"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <div className="text-sm font-semibold text-gray-500 mb-2">TRUSTED BY</div>
            <h3 className="text-3xl font-bold">{data.socialProof.title}</h3>
          </div>

          <div className="flex justify-center gap-8 md:gap-16 flex-wrap">
            {data.socialProof.stats.map((stat: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4">{data.services.title}</h2>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              {data.services.subtitle}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {data.services.items.map((service: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePosition.x / 3}deg) rotateX(${-mousePosition.y / 3}deg)`,
                  }}
                >
                  <Card className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08),0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-300 group cursor-pointer border-0 h-full relative overflow-hidden">
                    <CardContent className="p-8 relative z-10">
                      <motion.div
                        className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <FiTarget className="text-blue-600 group-hover:text-white text-2xl" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <motion.a
                        href="#"
                        className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2 group/link"
                        whileHover={{ x: 5 }}
                      >
                        {tt.common.learnMore} <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                      </motion.a>
                    </CardContent>
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-500" />
                    {/* Border shine effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-100 rounded-lg transition-all duration-300" />
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Highlight */}
      <section id="case-studies" className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="text-blue-600 text-sm font-semibold mb-2">FEATURED CASE STUDY</div>
              <h2 className="text-4xl font-bold">{data.caseStudy.title}</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid lg:grid-cols-2">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 h-64 lg:h-auto flex items-center justify-center">
                  <div className="text-white text-8xl opacity-20">
                    <FiAward />
                  </div>
                </div>
                <CardContent className="p-12">
                  <h3 className="text-3xl font-bold mb-4">{data.caseStudy.headline}</h3>
                  <p className="text-gray-600 mb-8">{data.caseStudy.description}</p>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {data.caseStudy.results.map((result: any, index: number) => (
                      <div key={index}>
                        <div className="text-3xl font-bold text-gray-900">{result.value}</div>
                        <div className="text-gray-500">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Read Full Case Study <FiArrowRight className="ml-2" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-16">{data.testimonials.title}</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.testimonials.items.map((testimonial: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-gray-500 text-sm">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {data.cta.title}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {data.cta.subtitle}
            </p>
            <Button size="lg" className="bg-white !text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg">
              {data.cta.buttonText}
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">{tt.common.getInTouch}</h3>
              <p className="text-gray-400 mb-6">{data.contact.description}</p>
              <div className="flex gap-4">
                <a href={`mailto:${data.contact.email}`} className="text-gray-400 hover:text-white transition-colors">
                  <FiMail size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FiLinkedin size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FiTwitter size={24} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
              <div className="grid grid-cols-2 gap-4">
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a>
                <a href="#case-studies" className="text-gray-400 hover:text-white transition-colors">Case Studies</a>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>

          {/* Skills - B2B Professional */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8">Core Competencies</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {['Lead Generation', 'Sales Automation', 'CRM Integration', 'Email Marketing', 'Analytics & Reporting', 'Account Management'].map((skill, i) => (
                <div key={i} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <span className="font-semibold text-blue-400">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* About - B2B Professional */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-6">About Our B2B Services</h3>
            <p className="text-lg text-gray-300 mb-4">
              We specialize in helping B2B companies scale their sales and marketing operations through proven strategies and cutting-edge technology.
            </p>
            <p className="text-gray-400">
              With over 10 years of experience in the B2B sector, we've helped hundreds of companies achieve sustainable growth and increase their market share.
            </p>
          </section>

          {/* Pricing - B2B Professional */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8 text-center">Service Packages</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Starter', price: '$2,000/mo', features: ['50 Qualified Leads', 'Basic CRM Setup', 'Email Campaigns', 'Monthly Reports'] },
                { name: 'Growth', price: '$5,000/mo', features: ['200 Qualified Leads', 'Advanced CRM', 'Multi-Channel Campaigns', 'Weekly Reports', 'Dedicated Manager'], popular: true },
                { name: 'Enterprise', price: 'Custom', features: ['Unlimited Leads', 'Custom Solutions', 'Full Integration', 'Real-time Dashboard', 'Strategic Consulting'] }
              ].map((pkg, i) => (
                <div key={i} className={`bg-gray-800 p-8 rounded-xl border-2 ${pkg.popular ? 'border-blue-500' : 'border-gray-700'}`}>
                  {pkg.popular && <div className="text-xs font-bold text-blue-400 mb-2 uppercase">Most Popular</div>}
                  <h4 className="text-2xl font-bold mb-2">{pkg.name}</h4>
                  <div className="text-4xl font-bold text-blue-400 mb-6">{pkg.price}</div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-blue-400 mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline - B2B Professional */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8">Company Milestones</h3>
            <div className="space-y-6">
              {[
                { year: '2024', title: 'Expanded to Global Markets', desc: 'Opened offices in Europe and Asia' },
                { year: '2022', title: 'Series B Funding', desc: 'Raised $20M to scale operations' },
                { year: '2020', title: 'Reached 1000 Clients', desc: 'Major milestone in client growth' },
                { year: '2015', title: 'Company Founded', desc: 'Started with a vision to transform B2B sales' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="text-2xl font-bold text-blue-400">{item.year}</div>
                  </div>
                  <div className="flex-1 bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ - B2B Professional */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { q: 'What industries do you serve?', a: 'We work with B2B companies across all industries including SaaS, manufacturing, professional services, and technology.' },
                { q: 'How do you qualify leads?', a: 'We use a multi-stage qualification process including firmographic data, behavioral signals, and direct engagement.' },
                { q: 'What is your typical contract length?', a: 'We offer flexible contracts starting at 3 months, with most clients opting for 12-month engagements.' },
                { q: 'Do you integrate with our existing CRM?', a: 'Yes, we integrate with all major CRMs including Salesforce, HubSpot, and Microsoft Dynamics.' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-lg mb-3">{item.q}</h4>
                  <p className="text-gray-400">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 B2B Lead Generation Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
