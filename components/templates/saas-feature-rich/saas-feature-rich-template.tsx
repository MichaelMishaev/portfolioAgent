"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FiMail,
  FiTwitter,
  FiLinkedin,
  FiMenu,
  FiX,
  FiCheck,
  FiZap,
  FiTrendingUp,
  FiUsers,
  FiTarget
} from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

export function SaasFeatureRichTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { tt } = useI18n();
  const data = tt?.saasFeatureRich;

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
            {tt.common.backToGallery}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {tt.common.features}
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {tt.common.pricing}
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {tt.common.testimonials}
            </a>
            <ThemeToggle />
            <LanguageToggle />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Free Trial
            </Button>
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
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.features}
              </a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.pricing}
              </a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>
                {tt.common.testimonials}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero with Email Capture */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32 mt-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  {data.hero.badge}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-5xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 break-words">
                  {data.hero.title}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {data.hero.subtitle}
                </p>

                {/* Email Capture Form */}
                <div className="flex gap-3 max-w-lg mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={data.hero.emailPlaceholder}
                    className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                    {data.hero.ctaButton}
                  </Button>
                </div>

                <div className="flex gap-6 text-sm text-gray-500 flex-wrap">
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-green-600" /> {data.hero.benefits[0]}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-green-600" /> {data.hero.benefits[1]}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-green-600" /> {data.hero.benefits[2]}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="bg-white rounded-xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <FiTrendingUp className="text-8xl text-blue-600/30" />
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -left-4 bg-white p-4 rounded-lg shadow-xl">
                  <div className="text-2xl font-bold text-green-600">+247%</div>
                  <div className="text-sm text-gray-600">Conversion</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">{data.features.title}</h2>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              {data.features.subtitle}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.features.items.map((feature: any, index: number) => {
              const icons = [FiZap, FiTrendingUp, FiUsers, FiTarget];
              const Icon = icons[index % icons.length];

              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Icon className="text-3xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-900">{data.pricing.title}</h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {data.pricing.plans.map((plan: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card
                  className={`${
                    plan.featured
                      ? 'ring-4 ring-blue-500 shadow-2xl scale-105 border-0'
                      : 'shadow-lg border-0'
                  } hover:shadow-xl transition-shadow`}
                >
                  <CardContent className="p-8">
                    {plan.featured && (
                      <div className="bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                        MOST POPULAR
                      </div>
                    )}

                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl sm:text-5xl font-bold break-words">${plan.price}</span>
                      <span className="text-gray-500">/month</span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <FiCheck className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full py-6 ${
                        plan.featured
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-900">{data.testimonials.title}</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {data.testimonials.items.map((testimonial: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
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

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-4xl sm:text-5xl font-bold mb-6 break-words text-gray-900">{data.cta.title}</h2>
            <p className="text-xl mb-8">{data.cta.subtitle}</p>
            <Button size="lg" className="bg-white !text-blue-600 hover:bg-blue-50 px-12 py-6 text-lg">
              {data.cta.buttonText}
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">SaaS Platform</h3>
              <p className="text-gray-400">{data.footer.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Product</h4>
              <div className="space-y-2">
                <a href="#features" className="block text-gray-400 hover:text-white">Features</a>
                <a href="#pricing" className="block text-gray-400 hover:text-white">Pricing</a>
                <a href="#" className="block text-gray-400 hover:text-white">Security</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <FiTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FiLinkedin size={20} />
                </a>
                <a href={`mailto:${data.contact.email}`} className="text-gray-400 hover:text-white">
                  <FiMail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Skills - SaaS Feature Rich */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">Platform Capabilities</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {['API Integration', 'Real-time Analytics', 'Cloud Infrastructure', 'Security', 'Scalability', 'Automation', 'Reporting', 'Multi-tenant'].map((skill, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-lg text-center">
                  <span className="font-semibold text-white">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* About - SaaS Feature Rich */}
          <section className="py-16 border-t border-gray-800">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-6 text-gray-900">About Our Platform</h3>
              <p className="text-lg text-gray-300 mb-4">
                Enterprise-grade SaaS platform designed to scale with your business. Built with modern technology and best practices.
              </p>
              <p className="text-gray-400">
                Trusted by over 1000+ companies worldwide to power their operations and drive growth.
              </p>
            </div>
          </section>

          {/* Projects - SaaS Feature Rich */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">Case Studies</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Enterprise Migration', desc: 'Helped Fortune 500 company migrate 10M users', metric: '10M Users' },
                { title: 'Startup Scale', desc: 'Scaled from 0 to 1M users in 6 months', metric: '1M Users' },
                { title: 'Global Expansion', desc: 'Enabled operations in 50+ countries', metric: '50+ Countries' }
              ].map((project, i) => (
                <div key={i} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-xl mb-3 text-blue-400">{project.title}</h4>
                  <p className="text-gray-300 mb-4">{project.desc}</p>
                  <div className="text-2xl font-bold text-purple-400">{project.metric}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline - SaaS Feature Rich */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">Product Roadmap</h3>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { quarter: 'Q4 2024', title: 'AI Features', desc: 'Advanced AI-powered analytics and insights' },
                { quarter: 'Q3 2024', title: 'Mobile Apps', desc: 'Native iOS and Android applications' },
                { quarter: 'Q2 2024', title: 'Enterprise Features', desc: 'SSO, advanced security, compliance' },
                { quarter: 'Q1 2024', title: 'Platform Launch', desc: 'Initial platform release' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-24 bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-lg text-center">
                    <div className="text-sm font-bold text-white">{item.quarter}</div>
                  </div>
                  <div className="flex-1 bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ - SaaS Feature Rich */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h3>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { q: 'What is the uptime guarantee?', a: '99.9% uptime SLA with automatic failover and redundancy.' },
                { q: 'How does billing work?', a: 'Monthly or annual billing based on usage. No hidden fees or long-term contracts.' },
                { q: 'Is my data secure?', a: 'Enterprise-grade security with SOC 2 Type II compliance and end-to-end encryption.' },
                { q: 'Can I migrate from another platform?', a: 'Yes, we provide free migration assistance and dedicated support.' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-lg mb-3 text-blue-400">{item.q}</h4>
                  <p className="text-gray-300">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SaaS Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
