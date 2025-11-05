"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiUsers,
  FiTrendingUp,
  FiVideo,
  FiMessageCircle,
  FiCalendar,
  FiZap,
  FiCheck,
  FiStar,
  FiAward,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

const platformData = {
  name: "CREATOR COLLECTIVE",
  tagline: "Where Creators Connect, Grow, and Thrive",
  description:
    "Join 50,000+ creators building sustainable businesses through community, collaboration, and continuous learning.",
  hero: {
    stats: [
      { value: "50K+", label: "Active Creators" },
      { value: "2M+", label: "Community Members" },
      { value: "500+", label: "Monthly Events" },
      { value: "$120M", label: "Creator Earnings" },
    ],
  },
  valueProps: {
    creators: {
      title: "For Creators",
      subtitle: "Build, Grow, and Monetize Your Community",
      benefits: [
        {
          icon: FiUsers,
          title: "Engaged Community",
          description: "Tools to build and nurture your audience in one place.",
        },
        {
          icon: FiTrendingUp,
          title: "Revenue Tools",
          description: "Memberships, courses, events, and more. Keep 90% of earnings.",
        },
        {
          icon: FiVideo,
          title: "Content Platform",
          description: "Host videos, podcasts, articles, and live streams seamlessly.",
        },
        {
          icon: FiZap,
          title: "Analytics & Insights",
          description: "Understand your audience and optimize your content strategy.",
        },
      ],
    },
    members: {
      title: "For Members",
      subtitle: "Connect with Creators You Love",
      benefits: [
        {
          icon: FiMessageCircle,
          title: "Direct Access",
          description: "Chat with creators and fellow members in private communities.",
        },
        {
          icon: FiCalendar,
          title: "Exclusive Events",
          description: "Join live Q&As, workshops, and virtual meetups.",
        },
        {
          icon: FiAward,
          title: "Premium Content",
          description: "Behind-the-scenes, early access, and member-only perks.",
        },
        {
          icon: FiStar,
          title: "Support Creators",
          description: "Help your favorite creators build sustainable businesses.",
        },
      ],
    },
  },
  creatorShowcase: [
    {
      name: "Sarah Chen",
      category: "Photography & Education",
      members: "12.5K",
      earnings: "$45K/mo",
      quote:
        "Creator Collective gave me everything I needed to turn my passion into a full-time business.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      communityImage:
        "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=500&fit=crop",
    },
    {
      name: "Marcus Williams",
      category: "Fitness & Wellness",
      members: "8.2K",
      earnings: "$32K/mo",
      quote:
        "The platform handles everything - payments, content hosting, community management. I just focus on creating.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      communityImage:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=500&fit=crop",
    },
    {
      name: "Elena Rodriguez",
      category: "Art & Design",
      members: "15.8K",
      earnings: "$58K/mo",
      quote: "I've built a thriving community of artists. The engagement tools are incredible.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      communityImage:
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=500&fit=crop",
    },
  ],
  pricing: {
    title: "Choose Your Plan",
    subtitle: "Start free. Upgrade as you grow. Cancel anytime.",
    tiers: [
      {
        name: "Free",
        price: 0,
        period: "forever",
        description: "Perfect for getting started",
        features: [
          "Up to 100 members",
          "Basic community features",
          "10% platform fee",
          "Email support",
          "Mobile app access",
        ],
        limitations: ["Limited analytics", "No custom branding", "Standard support"],
        cta: "Start Free",
        highlighted: false,
      },
      {
        name: "Pro",
        price: 29,
        period: "per month",
        description: "For growing creators",
        features: [
          "Unlimited members",
          "Advanced community features",
          "5% platform fee",
          "Priority support",
          "Custom branding",
          "Advanced analytics",
          "Integrations (Zapier, etc.)",
          "Scheduled posts",
        ],
        limitations: [],
        cta: "Start 14-Day Trial",
        highlighted: true,
      },
      {
        name: "Business",
        price: 99,
        period: "per month",
        description: "For established communities",
        features: [
          "Everything in Pro",
          "3% platform fee",
          "White-label options",
          "Dedicated account manager",
          "Custom integrations",
          "Advanced automation",
          "Team collaboration (5 seats)",
          "API access",
        ],
        limitations: [],
        cta: "Start 14-Day Trial",
        highlighted: false,
      },
    ],
  },
  successMetrics: [
    {
      creator: "Alex Thompson",
      category: "Music Production",
      growth: "0 to 5K members in 6 months",
      revenue: "$18K monthly recurring",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    },
    {
      creator: "Jessica Park",
      category: "Business Coaching",
      growth: "2K to 10K members in 1 year",
      revenue: "$42K monthly recurring",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
    },
    {
      creator: "David Kim",
      category: "Tech Education",
      growth: "500 to 8K members in 8 months",
      revenue: "$35K monthly recurring",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    },
  ],
  platformFeatures: [
    {
      title: "Built for Reliability",
      description: "99.9% uptime SLA. Enterprise-grade infrastructure.",
      icon: FiZap,
    },
    {
      title: "Mobile-First",
      description: "Beautiful native apps for iOS and Android.",
      icon: FiUsers,
    },
    {
      title: "Global Payments",
      description: "Accept payments in 135+ currencies. Instant payouts.",
      icon: FiTrendingUp,
    },
  ],
  onboarding: {
    title: "Get Started in Minutes",
    steps: [
      {
        step: "1",
        title: "Create Your Space",
        description: "Set up your community in under 5 minutes. No coding required.",
      },
      {
        step: "2",
        title: "Customize & Brand",
        description: "Make it yours with custom colors, logos, and domain.",
      },
      {
        step: "3",
        title: "Invite Your Audience",
        description: "Import from email, social media, or start fresh.",
      },
      {
        step: "4",
        title: "Start Creating",
        description: "Post content, host events, and build your community.",
      },
    ],
  },
};

export function CommunityServiceTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(1);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-white text-stone-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <div className="container mx-auto px-3 max-w-full py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent">
            CREATOR COLLECTIVE
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium hover:text-teal-500 transition-colors"
            >
              Features
            </a>
            <a
              href="#creators"
              className="text-sm font-medium hover:text-teal-500 transition-colors"
            >
              Success Stories
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-teal-500 transition-colors"
            >
              Pricing
            </a>
            <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:opacity-90">
              Start Free Trial
            </Button>
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
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-t">
            <div className="container mx-auto px-3 max-w-full py-4 flex flex-col gap-4">
              <a
                href="#features"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#creators"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Success Stories
              </a>
              <a
                href="#pricing"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 py-24">
        <div className="container mx-auto px-3 max-w-full">
          <div className="max-w-full mx-auto text-center">
            <FadeIn>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900">
                {platformData.name}
              </h1>
              <p className="text-3xl font-light mb-8 text-stone-700">{platformData.tagline}</p>
              <p className="text-xl mb-12 text-stone-600 max-w-full mx-auto">
                {platformData.description}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row gap-4 justify-center mb-16">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-purple-600 hover:opacity-90 text-white text-lg px-12"
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outline" className="text-slate-900 dark:text-white"
                  size="lg"
                  className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 text-lg px-12"
                >
                  Watch Demo
                </Button>
              </div>
            </FadeIn>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
              {platformData.hero.stats.map((stat, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-stone-200">
                    <div className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-stone-600 font-medium">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dual Value Props */}
      <section id="features" className="py-32">
        <div className="container mx-auto px-3 max-w-full">
          <div className="max-w-full mx-auto space-y-32">
            {/* For Creators */}
            <div>
              <ScrollReveal>
                <div className="text-center mb-16">
                  <Badge className="mb-4 bg-teal-500 text-white">
                    {platformData.valueProps.creators.title}
                  </Badge>
                  <h2 className="text-4xl sm:text-5xl font-bold mb-4 break-words text-gray-900">
                    {platformData.valueProps.creators.subtitle}
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {platformData.valueProps.creators.benefits.map((benefit, index) => (
                  <ScrollReveal key={benefit.title} delay={index * 0.1}>
                    <Card className="border-2 border-stone-200 hover:border-teal-500 transition-colors">
                      <CardContent className="p-8">
                        <benefit.icon className="w-12 h-12 text-teal-500 mb-6" />
                        <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                        <p className="text-stone-600">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* For Members */}
            <div>
              <ScrollReveal>
                <div className="text-center mb-16">
                  <Badge className="mb-4 bg-purple-600 text-white">
                    {platformData.valueProps.members.title}
                  </Badge>
                  <h2 className="text-4xl sm:text-5xl font-bold mb-4 break-words text-gray-900">
                    {platformData.valueProps.members.subtitle}
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {platformData.valueProps.members.benefits.map((benefit, index) => (
                  <ScrollReveal key={benefit.title} delay={index * 0.1}>
                    <Card className="border-2 border-stone-200 hover:border-purple-600 transition-colors">
                      <CardContent className="p-8">
                        <benefit.icon className="w-12 h-12 text-purple-600 mb-6" />
                        <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                        <p className="text-stone-600">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Showcase */}
      <section id="creators" className="py-32 bg-stone-50">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 break-words text-gray-900">Success Stories</h2>
              <p className="text-xl text-stone-600 max-w-full mx-auto">
                Real creators building sustainable businesses on our platform.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto space-y-16">
            {platformData.creatorShowcase.map((creator, index) => (
              <ScrollReveal key={creator.name}>
                <Card
                  className={`overflow-hidden border-2 border-stone-200 ${
                    index % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className={index % 2 === 1 ? "md:order-2" : ""}>
                      <img
                        src={creator.communityImage}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`p-12 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={creator.image}
                          alt={creator.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{creator.name}</h3>
                          <p className="text-stone-600">{creator.category}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-teal-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-teal-600">
                            {creator.members}
                          </div>
                          <div className="text-sm text-stone-600">Members</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-purple-600">
                            {creator.earnings}
                          </div>
                          <div className="text-sm text-stone-600">Earnings</div>
                        </div>
                      </div>

                      <blockquote className="text-lg italic text-stone-700 border-l-4 border-teal-500 pl-6">
                        "{creator.quote}"
                      </blockquote>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 break-words text-gray-900">{platformData.pricing.title}</h2>
              <p className="text-xl text-stone-600 max-w-full mx-auto mb-8">
                {platformData.pricing.subtitle}
              </p>

              {/* Billing Toggle */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={`px-3 py-2 rounded-full transition-all ${
                    billingPeriod === "monthly"
                      ? "bg-teal-500 text-white"
                      : "bg-stone-200 text-stone-600"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod("annual")}
                  className={`px-3 py-2 rounded-full transition-all ${
                    billingPeriod === "annual"
                      ? "bg-teal-500 text-white"
                      : "bg-stone-200 text-stone-600"
                  }`}
                >
                  Annual <Badge className="ml-2 bg-pink-500">Save 20%</Badge>
                </button>
              </div>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {platformData.pricing.tiers.map((tier, index) => (
              <ScrollReveal key={tier.name} delay={index * 0.1}>
                <Card
                  className={`relative ${
                    tier.highlighted
                      ? "border-4 border-teal-500 shadow-2xl scale-105"
                      : "border-2 border-stone-200"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-teal-500 to-purple-600 text-white px-3 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8 pt-12">
                    <CardTitle className="text-2xl mb-4">{tier.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl sm:text-5xl font-bold break-words">${tier.price}</span>
                      <span className="text-stone-600">/{tier.period}</span>
                    </div>
                    <p className="text-stone-600">{tier.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <FiCheck className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        tier.highlighted
                          ? "bg-gradient-to-r from-teal-500 to-purple-600 hover:opacity-90 text-white"
                          : "border-2 border-teal-500 text-teal-600 hover:bg-teal-50"
                      }`}
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      {tier.cta}
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Reliability */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-3 max-w-full">
          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {platformData.platformFeatures.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <div className="text-center">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-teal-500" />
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-stone-600">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Preview */}
      <section className="py-32">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 break-words text-gray-900">{platformData.onboarding.title}</h2>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {platformData.onboarding.steps.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.1}>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                    <p className="text-stone-600">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-teal-500 via-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="max-w-full mx-auto text-center">
              <h2 className="text-5xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-8 break-words text-gray-900">
                Start Building Your Community Today
              </h2>
              <p className="text-xl mb-12 max-w-full mx-auto opacity-90">
                Join 50,000+ creators who've chosen Creator Collective. No credit card required.
              </p>
              <Button
                size="lg"
                className="bg-white hover:bg-stone-100 text-purple-600 text-lg px-12"
              >
                Start Free Trial
              </Button>
              <p className="text-sm mt-6 opacity-75">
                14-day free trial • No credit card required • Cancel anytime
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 bg-white">
        <div className="container mx-auto px-3 max-w-full">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent mb-2">
              CREATOR COLLECTIVE
            </div>
            <p className="text-sm text-stone-600">
              © 2024 Creator Collective. Empowering creators worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
