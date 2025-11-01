"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiArrowRight,
  FiCheck,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiAward,
  FiMenu,
  FiX,
  FiClock,
  FiStar,
} from "react-icons/fi";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

export function ServiceMarketplaceTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { tt } = useI18n();
  const portfolioData = tt.serviceMarketplace;

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-3 max-w-full py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            {tt.common.backToGallery}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-green-400 transition-colors">
              {portfolioData.nav.features}
            </a>
            <a href="#how-it-works" className="text-sm hover:text-green-400 transition-colors">
              {portfolioData.nav.howItWorks}
            </a>
            <a href="#testimonials" className="text-sm hover:text-green-400 transition-colors">
              {portfolioData.nav.testimonials}
            </a>
            <a href="#pricing" className="text-sm hover:text-green-400 transition-colors">
              {portfolioData.nav.pricing}
            </a>
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 text-white hover:bg-slate-800 rounded-md border border-slate-700 transition-colors flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <>
                <FiX size={28} />
                <span className="sr-only">Close menu</span>
              </>
            ) : (
              <>
                <FiMenu size={28} />
                <span className="sr-only">Open menu</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
            <div className="container mx-auto px-3 max-w-full py-4 flex flex-col gap-4">
              <a
                href="#features"
                className="text-sm hover:text-green-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {portfolioData.nav.features}
              </a>
              <a
                href="#how-it-works"
                className="text-sm hover:text-green-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {portfolioData.nav.howItWorks}
              </a>
              <a
                href="#testimonials"
                className="text-sm hover:text-green-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {portfolioData.nav.testimonials}
              </a>
              <a
                href="#pricing"
                className="text-sm hover:text-green-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {portfolioData.nav.pricing}
              </a>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-3 max-w-full pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <Badge className="mb-6 bg-green-500/10 text-green-400 border-green-500/20 px-4 py-2">
              {portfolioData.hero.badge}
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight break-words">
              {portfolioData.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
              {portfolioData.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg font-semibold w-full sm:w-auto"
              >
                {portfolioData.hero.ctaPrimary} <FiArrowRight className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-800 px-8 py-6 text-lg w-full sm:w-auto"
              >
                {portfolioData.hero.ctaSecondary}
              </Button>
            </div>
          </FadeIn>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16">
            {portfolioData.stats.map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 bg-slate-800/50">
        <div className="container mx-auto px-3 max-w-full">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {portfolioData.features.title}
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
                {portfolioData.features.subtitle}
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {portfolioData.features.items.map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <Card className="bg-slate-900 border-slate-700 hover:border-green-500/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                      {idx === 0 && <FiShield className="w-6 h-6 text-green-400" />}
                      {idx === 1 && <FiTrendingUp className="w-6 h-6 text-green-400" />}
                      {idx === 2 && <FiUsers className="w-6 h-6 text-green-400" />}
                      {idx === 3 && <FiDollarSign className="w-6 h-6 text-green-400" />}
                      {idx === 4 && <FiClock className="w-6 h-6 text-green-400" />}
                      {idx === 5 && <FiAward className="w-6 h-6 text-green-400" />}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-32">
        <div className="container mx-auto px-3 max-w-full">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {portfolioData.howItWorks.title}
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
                {portfolioData.howItWorks.subtitle}
              </p>
            </FadeIn>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {portfolioData.howItWorks.steps.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15}>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-lg">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-32 bg-slate-800/50">
        <div className="container mx-auto px-3 max-w-full">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {portfolioData.testimonials.title}
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
                {portfolioData.testimonials.subtitle}
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {portfolioData.testimonials.items.map((testimonial, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <Card className="bg-slate-900 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-300 mb-4">{testimonial.quote}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        <div className="text-sm text-slate-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 sm:py-32">
        <div className="container mx-auto px-3 max-w-full">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {portfolioData.pricing.title}
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
                {portfolioData.pricing.subtitle}
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolioData.pricing.plans.map((plan, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15}>
                <Card
                  className={`${
                    plan.featured
                      ? "bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500"
                      : "bg-slate-900 border-slate-700"
                  } relative`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-green-500 text-white px-4 py-1">
                        {portfolioData.pricing.popularBadge}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-slate-400 mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-slate-400">/{plan.period}</span>}
                    </div>
                    <Button
                      className={`w-full mb-6 ${
                        plan.featured
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-slate-800 hover:bg-slate-700 text-white"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <FiCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-3 max-w-full">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                {portfolioData.cta.title}
              </h2>
              <p className="text-lg sm:text-xl text-green-50 mb-8">
                {portfolioData.cta.subtitle}
              </p>
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 px-8 py-6 text-lg font-semibold"
              >
                {portfolioData.cta.button} <FiArrowRight className="ml-2" />
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-3 max-w-full">
          <p className="text-sm text-slate-400 text-center">
            © {new Date().getFullYear()} {portfolioData.hero.title}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
