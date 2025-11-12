"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiShield,
  FiGlobe,
  FiLock,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiArrowRight,
  FiZap,
  FiDatabase,
  FiCloud,
  FiBarChart,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import { useTheme } from "next-themes";

const serviceData = {
  name: "ENTERPRISE CLOUD PLATFORM",
  tagline: "Enterprise-Grade Solutions That Scale",
  description:
    "Trusted by Fortune 500 companies worldwide. Secure, compliant, and built for global enterprise operations.",
  hero: {
    stats: [
      { value: "500+", label: "Enterprise Clients" },
      { value: "99.99%", label: "Uptime SLA" },
      { value: "150+", label: "Countries Served" },
      { value: "10B+", label: "Transactions/Day" },
    ],
  },
  solutions: [
    {
      icon: FiCloud,
      name: "Cloud Infrastructure",
      tagline: "Limitless scale, zero downtime",
      description: "Enterprise-grade cloud infrastructure with global reach and local compliance.",
      features: [
        "Multi-region deployment",
        "Auto-scaling architecture",
        "99.99% uptime guarantee",
        "Disaster recovery built-in",
        "CDN acceleration",
        "Edge computing ready",
      ],
      benefits: "67% reduction in infrastructure costs",
    },
    {
      icon: FiShield,
      name: "Security & Compliance",
      tagline: "Bank-level security standards",
      description: "SOC 2 Type II, ISO 27001, GDPR, and HIPAA compliant platform.",
      features: [
        "End-to-end encryption",
        "Advanced threat detection",
        "SSO & SAML integration",
        "Role-based access control",
        "Audit logging & compliance",
        "Penetration tested quarterly",
      ],
      benefits: "Zero security breaches since 2015",
    },
    {
      icon: FiDatabase,
      name: "Data Analytics",
      tagline: "Turn data into decisions",
      description: "Real-time analytics and business intelligence for data-driven enterprises.",
      features: [
        "Real-time dashboards",
        "Predictive analytics",
        "Custom reporting",
        "Data warehouse integration",
        "AI-powered insights",
        "API-first architecture",
      ],
      benefits: "3x faster decision making",
    },
  ],
  integrations: [
    { name: "Salesforce", logo: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=200&h=100&fit=crop" },
    { name: "SAP", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop" },
    { name: "Microsoft", logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=200&h=100&fit=crop" },
    { name: "Oracle", logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=100&fit=crop" },
    { name: "AWS", logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=100&fit=crop" },
    { name: "Google Cloud", logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=100&fit=crop" },
  ],
  clients: [
    {
      company: "Global Bank Corp",
      industry: "Financial Services",
      challenge: "Modernize legacy banking infrastructure for 50M customers",
      result: "Processed $2T in transactions with zero downtime during migration",
      metrics: [
        { label: "Transaction Volume", value: "$2T annually" },
        { label: "Users Migrated", value: "50M" },
        { label: "Uptime", value: "100%" },
      ],
      logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=400&fit=crop",
    },
    {
      company: "HealthTech Solutions",
      industry: "Healthcare",
      challenge: "HIPAA-compliant platform for 10,000 healthcare providers",
      result: "Secured patient data for 25M people across 3 continents",
      metrics: [
        { label: "Patient Records", value: "25M" },
        { label: "Providers", value: "10K" },
        { label: "Compliance", value: "100%" },
      ],
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop",
    },
  ],
  pricing: {
    tiers: [
      {
        name: "Professional",
        tagline: "For growing teams",
        price: "$5,000",
        period: "/month",
        features: [
          "Up to 500 users",
          "99.9% uptime SLA",
          "Standard support",
          "Regional deployment",
          "Basic analytics",
          "API access",
        ],
        cta: "Start Trial",
      },
      {
        name: "Enterprise",
        tagline: "For large organizations",
        price: "Custom",
        period: "",
        featured: true,
        features: [
          "Unlimited users",
          "99.99% uptime SLA",
          "24/7 premium support",
          "Multi-region deployment",
          "Advanced analytics",
          "Dedicated account manager",
          "Custom integrations",
          "White-glove onboarding",
        ],
        cta: "Contact Sales",
      },
      {
        name: "Global Enterprise",
        tagline: "For Fortune 500",
        price: "Custom",
        period: "",
        features: [
          "Everything in Enterprise",
          "99.999% uptime SLA",
          "Dedicated support team",
          "Global deployment",
          "Custom compliance",
          "Executive business reviews",
          "Success engineering",
        ],
        cta: "Contact Sales",
      },
    ],
  },
  support: {
    title: "Enterprise Support That Never Sleeps",
    features: [
      {
        icon: FiUsers,
        name: "Dedicated Account Team",
        description: "Your success team includes account manager, solutions architect, and technical support.",
      },
      {
        icon: FiZap,
        name: "Priority Response",
        description: "15-minute response time for critical issues. 24/7/365 support across all time zones.",
      },
      {
        icon: FiBarChart,
        name: "Quarterly Business Reviews",
        description: "Strategic planning sessions with your executive team to optimize ROI and adoption.",
      },
      {
        icon: FiSettings,
        name: "Custom Implementation",
        description: "White-glove onboarding with custom workflows, integrations, and training programs.",
      },
    ],
  },
  certifications: [
    { name: "SOC 2 Type II", icon: FiShield },
    { name: "ISO 27001", icon: FiLock },
    { name: "GDPR Compliant", icon: FiGlobe },
    { name: "HIPAA Certified", icon: FiShield },
  ],
};

export function EnterpriseServiceTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-3 max-w-full py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
            ENTERPRISE<span className="text-blue-600">CLOUD</span>
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
            <a href="#solutions" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Solutions
            </a>
            <a href="#clients" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Clients
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <Button className="bg-blue-600 hover:bg-blue-700">Contact Sales</Button>
          </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 text-foreground hover:bg-accent rounded-md border border-border transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
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
                href="#solutions"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </a>
              <a
                href="#clients"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Clients
              </a>
              <a
                href="#pricing"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                Contact Sales
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-3 max-w-full py-24">
        <div className="max-w-full mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <FiShield className="w-3 h-3 mr-1" />
                SOC 2 Type II Certified
              </Badge>
              {serviceData.certifications.slice(1).map((cert) => (
                <Badge key={cert.name} variant="outline" className="text-xs text-gray-900">
                  {cert.name}
                </Badge>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-gray-900">
              {serviceData.tagline}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-gray-600 mb-8 max-w-full">
              {serviceData.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                Schedule Demo
                <FiArrowRight className="ml-2" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline" className={darkMode ? 'text-white' : 'text-slate-900'}>
                View Case Studies
              </Button>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
              {serviceData.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="bg-white py-24">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 break-words text-gray-900">Enterprise Solutions</h2>
              <p className="text-xl text-gray-600">Built for scale, security, and global operations</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto">
            {serviceData.solutions.map((solution, index) => (
              <ScrollReveal key={solution.name} delay={index * 0.1}>
                <Card className="h-full border-2 hover:border-blue-200 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center mb-4">
                      <solution.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl mb-2 text-white">{solution.name}</CardTitle>
                    <p className="text-blue-600 font-semibold text-sm">{solution.tagline}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">{solution.description}</p>
                    <div className="space-y-2 mb-6">
                      {solution.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <FiCheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-900">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <FiTrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">{solution.benefits}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 break-words text-gray-900">Seamless Integrations</h2>
              <p className="text-xl text-gray-600">Works with your existing enterprise stack</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-full mx-auto">
              {serviceData.integrations.map((integration) => (
                <Card key={integration.name} className="p-6 flex items-center justify-center bg-white hover:shadow-lg transition-shadow">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="w-full h-12 object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Client Case Studies */}
      <section id="clients" className="py-24">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 break-words text-gray-900">Trusted by Industry Leaders</h2>
              <p className="text-xl text-gray-600">Enterprise success stories</p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto space-y-12">
            {serviceData.clients.map((client, index) => (
              <ScrollReveal key={client.company} delay={index * 0.1}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8">
                      <Badge variant="outline" className="mb-4">{client.industry}</Badge>
                      <h3 className="text-3xl font-bold mb-4 text-gray-900">{client.company}</h3>
                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Challenge</h4>
                          <p className="text-gray-700">{client.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-blue-600 uppercase mb-2">Result</h4>
                          <p className="text-lg font-medium text-gray-900">{client.result}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                        {client.metrics.map((metric) => (
                          <div key={metric.label}>
                            <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
                            <div className="text-xs text-gray-600">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative h-64 md:h-auto">
                      <img
                        src={client.logo}
                        alt={client.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Support */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 break-words text-gray-900">{serviceData.support.title}</h2>
              <p className="text-xl text-gray-600">World-class support for mission-critical operations</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
            {serviceData.support.features.map((feature, index) => (
              <ScrollReveal key={feature.name} delay={index * 0.1}>
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.name}</h3>
                        <p className="text-gray-600">{feature.description}</p>
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
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 break-words text-gray-900">Enterprise Pricing</h2>
              <p className="text-xl text-gray-600">Flexible plans that scale with your organization</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto">
            {serviceData.pricing.tiers.map((tier, index) => (
              <ScrollReveal key={tier.name} delay={index * 0.1}>
                <Card className={`h-full ${tier.featured ? 'border-2 border-blue-600 shadow-xl scale-105' : 'border'}`}>
                  {tier.featured && (
                    <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                      MOST POPULAR
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-1 text-gray-900">{tier.name}</h3>
                      <p className="text-sm text-gray-600">{tier.tagline}</p>
                    </div>
                    <div className="mb-6">
                      <span className="text-4xl sm:text-5xl font-bold break-words text-white">{tier.price}</span>
                      {tier.period && <span className="text-gray-600">{tier.period}</span>}
                    </div>
                    <Button
                      className={`w-full mb-6 ${tier.featured ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      variant={tier.featured ? 'default' : 'outline'}
                    >
                      {tier.cta}
                    </Button>
                    <div className="space-y-3">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <FiCheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-900">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-24">
        <div className="container mx-auto px-3 max-w-full text-center">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 break-words">
              Ready to Scale Your Enterprise?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-full mx-auto">
              Join 500+ enterprise clients who trust us with their mission-critical operations.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white !text-blue-600 hover:bg-gray-100">
                Schedule Demo
                <FiArrowRight className="ml-2" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto !text-white !bg-transparent border-white hover:bg-white/10">
                Download White Paper
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-3 max-w-full">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-2xl font-bold mb-4 md:mb-0 text-white">
              ENTERPRISE<span className="text-blue-500">CLOUD</span>
            </div>
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              {serviceData.certifications.map((cert) => (
                <div key={cert.name} className="flex items-center gap-2 text-sm text-gray-400">
                  <cert.icon className="w-4 h-4" />
                  <span>{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-gray-400 border-t border-gray-800 pt-8">
            © 2025 EnterpriseCloud Platform. San Francisco • London • Singapore • Tokyo
          </div>
        </div>
      </footer>
    </div>
  );
}
