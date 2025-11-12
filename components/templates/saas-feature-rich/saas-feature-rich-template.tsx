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
import { useTheme } from "next-themes";

export function SaasFeatureRichTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { tt } = useI18n();
  const { theme } = useTheme();
  const darkMode = theme === 'dark';
  const data = tt?.saasFeatureRich;

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4 flex items-center justify-between">
          <Link href="/" className="text-base sm:text-lg font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            {tt.common.backToGallery}
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {tt.common.features}
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {tt.common.pricing}
            </a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {tt.common.testimonials}
            </a>
            <ThemeToggle />
            <LanguageToggle />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2">
              Start Free Trial
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors touch-manipulation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3">
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              >
                {tt.common.features}
              </a>
              <a 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              >
                {tt.common.pricing}
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              >
                {tt.common.testimonials}
              </a>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero with Email Capture */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16 sm:py-20 lg:py-32 mt-14 sm:mt-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <FadeIn>
              <div>
                <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                  {data.hero.badge}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 break-words leading-tight">
                  {data.hero.title}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8">
                  {data.hero.subtitle}
                </p>

                {/* Email Capture Form */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-lg mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={data.hero.emailPlaceholder}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg border-2 border-border bg-background text-foreground focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                  />
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base whitespace-nowrap touch-manipulation">
                    {data.hero.ctaButton}
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-green-600 dark:text-green-400 flex-shrink-0" aria-hidden="true" /> 
                    <span className="break-words">{data.hero.benefits[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-green-600 dark:text-green-400 flex-shrink-0" aria-hidden="true" /> 
                    <span className="break-words">{data.hero.benefits[1]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-green-600 dark:text-green-400 flex-shrink-0" aria-hidden="true" /> 
                    <span className="break-words">{data.hero.benefits[2]}</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative mt-8 lg:mt-0">
                <div className="bg-background rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 transform hover:scale-105 transition-transform duration-500">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center">
                    <FiTrendingUp className="text-4xl sm:text-6xl lg:text-8xl text-blue-600/30 dark:text-blue-400/30" />
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 bg-background p-3 sm:p-4 rounded-lg shadow-xl border border-border">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">+247%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Conversion</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 text-foreground break-words">{data.features.title}</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
              {data.features.subtitle}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {data.features.items.map((feature: any, index: number) => {
              const icons = [FiZap, FiTrendingUp, FiUsers, FiTarget];
              const Icon = icons[index % icons.length];

              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                      <Icon className="text-2xl sm:text-3xl text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground break-words">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground break-words">{feature.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section id="pricing" className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 sm:mb-16 text-foreground break-words">{data.pricing.title}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data.pricing.plans.map((plan: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card
                  className={`${
                    plan.featured
                      ? 'ring-2 sm:ring-4 ring-blue-500 shadow-2xl lg:scale-105 border-0'
                      : 'shadow-lg border-0'
                  } hover:shadow-xl transition-shadow h-full`}
                >
                  <CardContent className="p-6 sm:p-8">
                    {plan.featured && (
                      <div className="bg-blue-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 rounded-full inline-block mb-4">
                        MOST POPULAR
                      </div>
                    )}

                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground break-words">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-bold break-words text-foreground">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>

                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      {plan.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <FiCheck className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span className="text-sm sm:text-base text-muted-foreground break-words">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full py-4 sm:py-6 text-sm sm:text-base touch-manipulation ${
                        plan.featured
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
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
      <section id="testimonials" className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 sm:mb-16 text-foreground break-words">{data.testimonials.title}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data.testimonials.items.map((testimonial: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-shadow h-full">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-foreground mb-6 leading-relaxed break-words">"{testimonial.quote}"</p>
                    <div>
                      <div className="font-semibold text-foreground break-words">{testimonial.author}</div>
                      <div className="text-muted-foreground text-sm break-words">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 break-words text-white">{data.cta.title}</h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 break-words">{data.cta.subtitle}</p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg touch-manipulation">
              {data.cta.buttonText}
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 bg-gray-900 text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
            <div className="sm:col-span-2">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">SaaS Platform</h3>
              <p className="text-sm sm:text-base text-gray-400 break-words">{data.footer.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <div className="space-y-2">
                <a href="#features" className="block text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#pricing" className="block text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Security</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <FiTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <FiLinkedin size={20} />
                </a>
                <a href={`mailto:${data.contact.email}`} className="text-gray-400 hover:text-white transition-colors" aria-label="Email">
                  <FiMail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Skills - SaaS Feature Rich */}
          <section className="py-12 sm:py-16 border-t border-gray-800">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white break-words">Platform Capabilities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {['API Integration', 'Real-time Analytics', 'Cloud Infrastructure', 'Security', 'Scalability', 'Automation', 'Reporting', 'Multi-tenant'].map((skill, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 sm:p-6 rounded-lg text-center">
                  <span className="font-semibold text-white text-xs sm:text-sm break-words">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* About - SaaS Feature Rich */}
          <section className="py-12 sm:py-16 border-t border-gray-800">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white break-words">About Our Platform</h3>
              <p className="text-base sm:text-lg text-gray-300 mb-4 break-words">
                Enterprise-grade SaaS platform designed to scale with your business. Built with modern technology and best practices.
              </p>
              <p className="text-sm sm:text-base text-gray-400 break-words">
                Trusted by over 1000+ companies worldwide to power their operations and drive growth.
              </p>
            </div>
          </section>

          {/* Projects - SaaS Feature Rich */}
          <section className="py-12 sm:py-16 border-t border-gray-800">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white break-words">Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { title: 'Enterprise Migration', desc: 'Helped Fortune 500 company migrate 10M users', metric: '10M Users' },
                { title: 'Startup Scale', desc: 'Scaled from 0 to 1M users in 6 months', metric: '1M Users' },
                { title: 'Global Expansion', desc: 'Enabled operations in 50+ countries', metric: '50+ Countries' }
              ].map((project, i) => (
                <div key={i} className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-blue-400 break-words">{project.title}</h4>
                  <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 break-words">{project.desc}</p>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400 break-words">{project.metric}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline - SaaS Feature Rich */}
          <section className="py-12 sm:py-16 border-t border-gray-800">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white break-words">Product Roadmap</h3>
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 px-4">
              {[
                { quarter: 'Q4 2024', title: 'AI Features', desc: 'Advanced AI-powered analytics and insights' },
                { quarter: 'Q3 2024', title: 'Mobile Apps', desc: 'Native iOS and Android applications' },
                { quarter: 'Q2 2024', title: 'Enterprise Features', desc: 'SSO, advanced security, compliance' },
                { quarter: 'Q1 2024', title: 'Platform Launch', desc: 'Initial platform release' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-full sm:w-24 bg-gradient-to-br from-blue-500 to-purple-500 p-3 sm:p-4 rounded-lg text-center">
                    <div className="text-xs sm:text-sm font-bold text-white break-words">{item.quarter}</div>
                  </div>
                  <div className="flex-1 bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700">
                    <h4 className="font-bold text-base sm:text-lg mb-2 text-white break-words">{item.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm break-words">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ - SaaS Feature Rich */}
          <section className="py-12 sm:py-16 border-t border-gray-800">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white break-words">Frequently Asked Questions</h3>
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 px-4">
              {[
                { q: 'What is the uptime guarantee?', a: '99.9% uptime SLA with automatic failover and redundancy.' },
                { q: 'How does billing work?', a: 'Monthly or annual billing based on usage. No hidden fees or long-term contracts.' },
                { q: 'Is my data secure?', a: 'Enterprise-grade security with SOC 2 Type II compliance and end-to-end encryption.' },
                { q: 'Can I migrate from another platform?', a: 'Yes, we provide free migration assistance and dedicated support.' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-blue-400 break-words">{item.q}</h4>
                  <p className="text-sm sm:text-base text-gray-300 break-words">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2025 SaaS Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
