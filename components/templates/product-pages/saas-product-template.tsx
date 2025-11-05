"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiCheck, FiZap, FiShield, FiTrendingUp, FiUsers, FiStar, FiArrowRight, FiPlay, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const productData = {
  name: "TaskFlow Pro",
  tagline: "The project management tool that doesn't get in your way",
  description: "Powerful enough for teams. Simple enough for anyone. TaskFlow Pro helps you ship faster without the complexity.",
  cta: {
    primary: "Start Free Trial",
    secondary: "Watch Demo",
  },
  hero: {
    stats: [
      { value: "50K+", label: "Active Teams" },
      { value: "4.9/5", label: "User Rating" },
      { value: "99.9%", label: "Uptime" },
    ],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
  },
  socialProof: {
    title: "Trusted by teams at",
    companies: ["Google", "Stripe", "Notion", "Figma", "Linear", "Vercel"],
  },
  features: [
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Built for speed. No lag, no waiting. Your work flows at the speed of thought.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-level encryption. SOC 2 compliant. Your data is safe with us.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Track progress, measure impact, and make data-driven decisions.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Work together seamlessly. Comments, mentions, and real-time updates.",
      color: "from-green-500 to-emerald-500",
    },
  ],
  testimonials: [
    {
      quote: "TaskFlow Pro cut our project delivery time by 40%. It's now our single source of truth.",
      author: "Sarah Chen",
      role: "VP of Engineering",
      company: "TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5,
    },
    {
      quote: "Finally, a tool that doesn't require a PhD to use. Onboarded our entire team in under an hour.",
      author: "Marcus Johnson",
      role: "Product Manager",
      company: "StartupX",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 5,
    },
    {
      quote: "We tried Asana, Monday, and Jira. TaskFlow Pro beats them all in simplicity and power.",
      author: "Elena Rodriguez",
      role: "CTO",
      company: "GrowthCo",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      rating: 5,
    },
  ],
  pricing: {
    title: "Simple, transparent pricing",
    subtitle: "Start free. Upgrade when you're ready. Cancel anytime.",
    plans: [
      {
        name: "Starter",
        price: "$0",
        period: "forever",
        description: "Perfect for trying out TaskFlow Pro",
        features: [
          "Up to 10 team members",
          "5 projects",
          "Basic analytics",
          "7-day history",
          "Community support",
        ],
        cta: "Start Free",
        popular: false,
      },
      {
        name: "Professional",
        price: "$29",
        period: "per month",
        description: "For growing teams who need more",
        features: [
          "Unlimited team members",
          "Unlimited projects",
          "Advanced analytics",
          "Unlimited history",
          "Priority support",
          "Custom workflows",
          "API access",
        ],
        cta: "Start 14-day trial",
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "contact sales",
        description: "For large teams with special needs",
        features: [
          "Everything in Professional",
          "Dedicated support",
          "Custom integrations",
          "SSO & SAML",
          "Advanced security",
          "SLA guarantee",
        ],
        cta: "Contact Sales",
        popular: false,
      },
    ],
  },
  faq: [
    {
      question: "Do you offer a free trial?",
      answer: "Yes! Our Starter plan is free forever. Professional plan includes a 14-day free trial with no credit card required.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. Cancel anytime with one click. No questions asked, no fees.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes. We use bank-level encryption, are SOC 2 compliant, and never sell your data.",
    },
  ],
  finalCTA: {
    title: "Ready to ship faster?",
    description: "Join 50,000+ teams using TaskFlow Pro to build better products",
    guarantee: "14-day money-back guarantee. No credit card required.",
  },
};

export function SaaSProductTemplate() {
  const [activePlan, setActivePlan] = useState<"monthly" | "annual">("monthly");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-3 sm:px-3 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              TaskFlow Pro
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
              <Button size="sm">{productData.cta.primary}</Button>
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t">
            <div className="container mx-auto px-3 sm:px-3 py-4 flex flex-col gap-4">
              <a
                href="#features"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                {productData.cta.primary}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-3 sm:px-3 pt-20 pb-16">
        <div className="max-w-full mx-auto text-center">
          <FadeIn>
            <Badge className="mb-4" variant="secondary">
              🎉 New: AI-powered task suggestions
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm: text-3xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold mb-6 leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent break-words">
              {productData.tagline}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-full mx-auto">
              {productData.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col gap-4 justify-center mb-12 sm:flex-row">
              <Button size="lg" className="text-lg px-8 w-full sm:w-auto min-h-[44px]">
                {productData.cta.primary}
                <FiArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto min-h-[44px]">
                <FiPlay className="mr-2" />
                {productData.cta.secondary}
              </Button>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.4}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-full mx-auto mb-12">
              {productData.hero.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Hero Image/Video */}
          <FadeIn delay={0.5}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border">
              <img
                src={productData.hero.image}
                alt="Product Screenshot"
                className="w-full"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-3 sm:px-3 py-12 border-t">
        <ScrollReveal>
          <p className="text-center text-sm text-muted-foreground mb-8">
            {productData.socialProof.title}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-60">
            {productData.socialProof.companies.map((company) => (
              <div key={company} className="text-xl sm:text-2xl font-bold">{company}</div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-3 sm:px-3 py-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm: text-3xl sm:text-5xl   font-bold mb-4 break-words">
              Everything you need to ship faster
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-full mx-auto">
              Powerful features that help teams collaborate and deliver exceptional results
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
          {productData.features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-all">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-3 sm:px-3 py-20 bg-muted/30">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm: text-3xl sm:text-5xl   font-bold mb-4 break-words">
              Loved by teams worldwide
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              See what our customers have to say
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto">
          {productData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.author} delay={index * 0.1}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-3 sm:px-3 py-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm: text-3xl sm:text-5xl   font-bold mb-4 break-words">
              {productData.pricing.title}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              {productData.pricing.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto">
          {productData.pricing.plans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={index * 0.1}>
              <Card className={`relative h-full ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl sm:text-4xl  font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground"> / {plan.period}</span>}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-6" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-3 sm:px-3 py-20 bg-muted/30">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm: text-3xl sm:text-5xl   font-bold mb-4 break-words">
              Frequently Asked Questions
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-full mx-auto space-y-4">
          {productData.faq.map((item, index) => (
            <ScrollReveal key={item.question} delay={index * 0.05}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                  <CardDescription>{item.answer}</CardDescription>
                </CardHeader>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-3 sm:px-3 py-20">
        <ScrollReveal>
          <Card className="max-w-full mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-3xl sm: text-3xl sm:text-5xl   font-bold mb-4 break-words">
                {productData.finalCTA.title}
              </h2>
              <p className="text-lg sm:text-xl mb-8 opacity-90">
                {productData.finalCTA.description}
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 w-full sm:w-auto min-h-[44px]">
                {productData.cta.primary}
                <FiArrowRight className="ml-2" />
              </Button>
              <p className="text-sm mt-6 opacity-75">
                {productData.finalCTA.guarantee}
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 TaskFlow Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
