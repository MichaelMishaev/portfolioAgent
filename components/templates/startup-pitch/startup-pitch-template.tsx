"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiMenu, FiX, FiArrowRight, FiCheck, FiTrendingUp, FiUsers, FiZap, FiStar } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { useTheme } from "next-themes";
import { placeholderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function StartupPitchTemplate() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const { tt } = useI18n();
  const portfolioData = tt?.startupPitch;

  // Animated counter for metrics
  const [counts, setCounts] = useState({
    users: 0,
    growth: 0,
    revenue: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    const intervals = Object.keys(counts).map((key) => {
      return setInterval(() => {
        setCounts((prev) => {
          const target = portfolioData?.metrics.find((m) => m.key === key)?.value || 0;
          if (prev[key as keyof typeof prev] < target) {
            return { ...prev, [key]: Math.min(prev[key as keyof typeof prev] + Math.ceil(target / 50), target) };
          }
          return prev;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, [portfolioData]);

  if (!portfolioData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-white via-blue-50 to-orange-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors tracking-wide">
            {tt.common.backToGallery}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold hover:text-blue-600 transition-colors tracking-wide">
              {tt.common.features}
            </a>
            <a href="#pricing" className="text-sm font-semibold hover:text-blue-600 transition-colors tracking-wide">
              {tt.common.pricing}
            </a>
            <a href="#testimonials" className="text-sm font-semibold hover:text-blue-600 transition-colors tracking-wide">
              {tt.common.testimonials}
            </a>
            <ThemeToggle />
            <LanguageToggle />
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              <a href="#features" className={`text-sm font-medium py-2 ${isDark ? 'text-white' : 'text-gray-900'}`} onClick={() => setMobileMenuOpen(false)}>
                {tt.common.features}
              </a>
              <a href="#pricing" className={`text-sm font-medium py-2 ${isDark ? 'text-white' : 'text-gray-900'}`} onClick={() => setMobileMenuOpen(false)}>
                {tt.common.pricing}
              </a>
              <a href="#testimonials" className={`text-sm font-medium py-2 ${isDark ? 'text-white' : 'text-gray-900'}`} onClick={() => setMobileMenuOpen(false)}>
                {tt.common.testimonials}
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - SaaS Style with Product Screenshot */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-orange-500/5" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 tracking-wide uppercase">
                <FiZap className="text-orange-500" />
                {portfolioData.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.1] tracking-tight bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 bg-clip-text text-transparent break-words font-sans">
                {portfolioData.headline}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                {portfolioData.subheadline}
              </p>

              {/* Email Capture */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-80 h-12 text-base text-gray-900 placeholder:text-gray-500 font-medium border-2 border-gray-300 focus:border-blue-500"
                  aria-label="Email address"
                  autoComplete="email"
                />
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 px-8" aria-label="Start free trial">
                  Start Free Trial <FiArrowRight className="ml-2" aria-hidden="true" />
                </Button>
              </div>

              <p className="text-sm text-gray-600 font-medium">No credit card required • 14-day free trial</p>
            </motion.div>
          </div>

          {/* Product Screenshot */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? {} : { delay: 0.3, duration: 0.8 }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src={placeholderImages.projects.dashboard}
                alt="Product Dashboard"
                width={1200}
                height={700}
                className="w-full"
              />
            </div>
            {/* Floating elements */}
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
              transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 3 }}
              className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <FiCheck className="text-white" aria-hidden="true" />
                </div>
                <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>+2,400 Users</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Counter */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {portfolioData.metrics.map((metric, index) => (
              <motion.div
                key={metric.key}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-2 break-words tracking-tight font-sans">
                  {counts[metric.key as keyof typeof counts]}{metric.suffix}
                </div>
                <div className="text-sm sm:text-base text-gray-700 font-semibold uppercase tracking-wide">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 break-words tracking-tight leading-tight font-sans ${isDark ? 'text-white' : 'text-gray-900'}`}>Powerful Features</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed">
                Everything you need to grow your business, all in one place
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolioData.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { y: -5 }}
                className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-3 break-words tracking-tight font-sans ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 break-words tracking-tight leading-tight font-sans ${isDark ? 'text-white' : 'text-gray-900'}`}>How It Works</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">Get started in 3 simple steps</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {portfolioData.steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? {} : { delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                    {step.number}
                  </div>
                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 break-words tracking-tight font-sans ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">{step.description}</p>
                </div>
                {index < portfolioData.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-blue-200 to-orange-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 break-words tracking-tight leading-tight font-sans ${isDark ? 'text-white' : 'text-gray-900'}`}>Simple, Transparent Pricing</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">Choose the plan that's right for you</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolioData.pricing.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? {} : { delay: index * 0.15 }}
                whileHover={prefersReducedMotion ? {} : { y: -10 }}
                className={`rounded-2xl p-4 sm:p-6 md:p-8 border-2 ${
                  plan.popular
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-600 shadow-2xl"
                    : "bg-white border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words tracking-tight font-sans ${plan.popular ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                <div className="mb-6">
                  <span className={`text-4xl sm:text-5xl md:text-6xl font-bold break-words tracking-tight font-sans ${plan.popular ? "text-white" : "text-gray-900"}`}>${plan.price}</span>
                  <span className={`text-lg sm:text-xl ${plan.popular ? "text-blue-100 font-medium" : "text-gray-600 font-semibold"}`}>/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <FiCheck className={`mt-1 flex-shrink-0 ${plan.popular ? "text-orange-300" : "text-blue-600"}`} />
                      <span className={`${plan.popular ? "text-blue-50" : "text-gray-700"} font-medium`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  }`}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 break-words tracking-tight leading-tight font-sans ${isDark ? 'text-white' : 'text-gray-900'}`}>Loved by Thousands</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">See what our customers have to say</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolioData.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? {} : { delay: index * 0.15 }}
                className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed font-normal">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full" />
                  <div>
                    <div className="font-bold text-gray-900 text-base">{testimonial.author}</div>
                    <div className="text-sm text-gray-600 font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center break-words tracking-tight leading-tight font-sans ${isDark ? 'text-white' : 'text-gray-900'}`}>About FlowMetrics</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed text-center font-normal">
                {portfolioData.about}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 break-words tracking-tight leading-tight font-sans ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Expertise</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">Technologies & capabilities that power our platform</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {portfolioData.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? {} : { delay: index * 0.05 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center"
              >
                <p className="text-sm sm:text-base font-semibold text-gray-800 tracking-wide">{skill}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 break-words tracking-tight leading-tight font-sans ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Journey</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">From startup to scale</p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            {portfolioData.timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? {} : { duration: 0.6 }}
                className="flex gap-8 mb-12 last:mb-0"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="inline-block bg-gradient-to-r from-blue-600 to-orange-500 text-white font-bold text-xl px-4 py-2 rounded-lg">
                    {item.year}
                  </div>
                </div>
                <div className="flex-1 border-l-4 border-blue-200 pl-8 pb-8">
                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 tracking-tight font-sans ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 break-words tracking-tight leading-tight font-sans ${isDark ? 'text-white' : 'text-gray-900'}`}>Get in Touch</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 font-medium">
                Have questions? Want to see a demo? Our team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors tracking-tight font-sans"
                >
                  {portfolioData.email}
                </a>
              </div>
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-12 text-white" aria-label="Schedule a product demo">
                  Schedule a Demo
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-12 border-2 border-blue-600 !text-blue-600 hover:bg-blue-50" aria-label="Contact sales team">
                  Contact Sales
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-r from-blue-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 break-words text-white tracking-tight leading-tight font-sans">Ready to Get Started?</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
              Join thousands of companies already growing with our platform
            </p>
            <Button size="lg" className="bg-white !text-blue-600 hover:bg-blue-50 text-lg px-12">
              Start Your Free Trial <FiArrowRight className="ml-2" aria-hidden="true" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
            </p>
            <div className="flex gap-8">
              {portfolioData.social && Object.entries(portfolioData.social).map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  className="text-sm text-gray-400 hover:text-white transition-colors uppercase"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${key.charAt(0).toUpperCase() + key.slice(1)} profile`}
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
