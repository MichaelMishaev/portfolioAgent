"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiTrendingUp,
  FiUsers,
  FiZap,
  FiTarget,
  FiCheckCircle,
  FiArrowRight,
  FiDownload,
  FiFileText,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

const serviceData = {
  name: "STRATEX CONSULTING",
  tagline: "Strategy. Execution. Excellence.",
  description:
    "We partner with Fortune 500 companies to drive transformational change and measurable results.",
  hero: {
    stats: [
      { value: "$2.4B", label: "Value Delivered" },
      { value: "150+", label: "Global Clients" },
      { value: "94%", label: "Client Retention" },
      { value: "25%", label: "Avg. ROI Increase" },
    ],
  },
  capabilities: [
    {
      icon: FiTrendingUp,
      name: "Growth Strategy",
      description: "Data-driven strategies that accelerate revenue and market expansion.",
      features: ["Market Entry", "M&A Strategy", "Portfolio Optimization", "Revenue Growth"],
    },
    {
      icon: FiZap,
      name: "Digital Transformation",
      description: "Technology-enabled transformation that delivers competitive advantage.",
      features: ["Cloud Migration", "AI Integration", "Automation", "Digital Operations"],
    },
    {
      icon: FiUsers,
      name: "Organizational Excellence",
      description: "Build high-performing organizations that sustain competitive advantage.",
      features: [
        "Leadership Development",
        "Culture Change",
        "Talent Strategy",
        "Operating Model Design",
      ],
    },
    {
      icon: FiTarget,
      name: "Performance Improvement",
      description: "Rapid operational improvements that flow directly to the bottom line.",
      features: [
        "Cost Reduction",
        "Process Optimization",
        "Supply Chain",
        "Working Capital",
      ],
    },
  ],
  caseStudies: [
    {
      client: "Global Technology Leader",
      industry: "Technology",
      challenge:
        "Market share declining due to legacy product portfolio and slow innovation cycle.",
      solution:
        "Redesigned product strategy, accelerated R&D processes, and launched three category-defining products in 18 months.",
      results: [
        { metric: "Revenue Growth", value: "+32%" },
        { metric: "Market Share", value: "+12pts" },
        { metric: "Time to Market", value: "-45%" },
        { metric: "ROI", value: "18x" },
      ],
      testimonial:
        "StratEx didn't just give us a strategy - they embedded with our teams and made it happen. The results exceeded our most optimistic projections.",
      author: "Chief Strategy Officer",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    },
    {
      client: "Fortune 100 Retailer",
      industry: "Retail",
      challenge:
        "E-commerce platform losing ground to digital-native competitors. Legacy systems preventing innovation.",
      solution:
        "Full digital transformation including cloud migration, AI-powered personalization, and omnichannel integration.",
      results: [
        { metric: "Online Revenue", value: "+127%" },
        { metric: "Customer Retention", value: "+41%" },
        { metric: "Operating Costs", value: "-28%" },
        { metric: "NPS Score", value: "+35pts" },
      ],
      testimonial:
        "They transformed our entire digital operation in under a year. Our online business is now the growth engine of the company.",
      author: "Chief Digital Officer",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
    },
    {
      client: "International Manufacturer",
      industry: "Manufacturing",
      challenge: "Rising costs and supply chain disruptions threatening profitability.",
      solution:
        "Comprehensive supply chain redesign, strategic sourcing program, and lean manufacturing implementation across 23 facilities.",
      results: [
        { metric: "Cost Savings", value: "$180M" },
        { metric: "Lead Time", value: "-52%" },
        { metric: "Quality Issues", value: "-67%" },
        { metric: "Cash Flow", value: "+$95M" },
      ],
      testimonial:
        "The operational improvements were immediate and sustainable. We're now the low-cost producer in our category.",
      author: "Chief Operating Officer",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    },
  ],
  industries: [
    {
      name: "Technology & Software",
      expertise: [
        "SaaS Growth Strategy",
        "Platform Economics",
        "AI/ML Implementation",
        "Cloud Strategy",
      ],
    },
    {
      name: "Financial Services",
      expertise: [
        "Regulatory Compliance",
        "Digital Banking",
        "Risk Management",
        "Fintech Integration",
      ],
    },
    {
      name: "Healthcare & Life Sciences",
      expertise: [
        "Value-Based Care",
        "Clinical Operations",
        "R&D Optimization",
        "Commercial Excellence",
      ],
    },
    {
      name: "Retail & Consumer",
      expertise: [
        "Omnichannel Strategy",
        "E-commerce Growth",
        "Supply Chain",
        "Customer Experience",
      ],
    },
    {
      name: "Manufacturing & Industrial",
      expertise: ["Smart Manufacturing", "Supply Chain", "M&A Integration", "Sustainability"],
    },
    {
      name: "Energy & Utilities",
      expertise: [
        "Energy Transition",
        "Grid Modernization",
        "Regulatory Strategy",
        "Asset Optimization",
      ],
    },
  ],
  thoughtLeadership: [
    {
      type: "Research Report",
      title: "The Future of Enterprise AI: 2024 Executive Survey",
      description: "Insights from 500 C-suite executives on AI adoption and ROI.",
      downloadLink: "#",
      icon: FiFileText,
    },
    {
      type: "Whitepaper",
      title: "Unlocking Value Through Digital Transformation",
      description: "A framework for successful digital transformation initiatives.",
      downloadLink: "#",
      icon: FiDownload,
    },
    {
      type: "Industry Report",
      title: "Supply Chain Resilience in an Uncertain World",
      description: "Strategies for building adaptable and resilient supply chains.",
      downloadLink: "#",
      icon: FiFileText,
    },
  ],
  clientLogos: [
    { name: "Fortune 500 Tech", logo: "TECH CORP" },
    { name: "Global Bank", logo: "GLOBAL BANK" },
    { name: "Major Retailer", logo: "RETAIL CO" },
    { name: "Healthcare Leader", logo: "HEALTH SYSTEMS" },
    { name: "Manufacturing Giant", logo: "MANU GROUP" },
    { name: "Energy Provider", logo: "POWER CORP" },
    { name: "Insurance Leader", logo: "INSURANCE INC" },
    { name: "Pharma Company", logo: "PHARMA CO" },
  ],
  applicationProcess: {
    title: "Our Engagement Process",
    steps: [
      {
        number: "01",
        title: "Initial Consultation",
        description:
          "Complimentary 60-minute consultation to understand your challenges and objectives.",
      },
      {
        number: "02",
        title: "Diagnostic Assessment",
        description:
          "Deep-dive analysis with key stakeholders to identify opportunities and constraints.",
      },
      {
        number: "03",
        title: "Proposal & Investment",
        description:
          "Customized engagement plan with clear deliverables, timeline, and investment requirements.",
      },
      {
        number: "04",
        title: "Engagement & Delivery",
        description:
          "Collaborative execution with embedded teams and regular progress reviews.",
      },
    ],
  },
};

export function B2BServiceTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-white text-stone-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <div className="container mx-auto px-3 max-w-full py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-900">
            STRATEX
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
            <a
              href="#capabilities"
              className="text-sm font-medium hover:text-red-600 transition-colors"
            >
              Capabilities
            </a>
            <a
              href="#case-studies"
              className="text-sm font-medium hover:text-red-600 transition-colors"
            >
              Case Studies
            </a>
            <a
              href="#insights"
              className="text-sm font-medium hover:text-red-600 transition-colors"
            >
              Insights
            </a>
            <Button className="bg-red-600 hover:bg-red-700 text-white">Apply Now</Button>
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
                href="#capabilities"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Capabilities
              </a>
              <a
                href="#case-studies"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
              </a>
              <a
                href="#insights"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insights
              </a>
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                Apply Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-32">
        <div className="container mx-auto px-3 max-w-full">
          <div className="max-w-full mx-auto text-center">
            <FadeIn>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900">
                {serviceData.name}
              </h1>
              <p className="text-3xl font-light mb-8 text-blue-200">{serviceData.tagline}</p>
              <p className="text-xl mb-12 text-blue-100 max-w-full mx-auto">
                {serviceData.description}
              </p>
              <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-lg px-12">
                Schedule Consultation
              </Button>
            </FadeIn>
          </div>

          {/* Stats */}
          <div className="max-w-full mx-auto mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
            {serviceData.hero.stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold mb-2 text-blue-100 break-words">{stat.value}</div>
                  <div className="text-sm text-blue-300 font-medium">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service Capabilities */}
      <section id="capabilities" className="py-32 bg-stone-50">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 break-words text-gray-900">Our Capabilities</h2>
              <p className="text-xl text-stone-600 max-w-full mx-auto">
                Integrated services that deliver measurable business impact across your organization.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceData.capabilities.map((capability, index) => (
              <ScrollReveal key={capability.name} delay={index * 0.1}>
                <Card className="h-full border-2 border-stone-200 hover:border-red-600 transition-colors">
                  <CardHeader>
                    <capability.icon className="w-12 h-12 text-red-600 mb-4" />
                    <CardTitle className="text-2xl mb-3 text-gray-900">{capability.name}</CardTitle>
                    <p className="text-stone-600">{capability.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {capability.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <FiCheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                          <span className="text-sm text-gray-900">{feature}</span>
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

      {/* Case Studies */}
      <section id="case-studies" className="py-32">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 break-words text-gray-900">Proven Results</h2>
              <p className="text-xl text-stone-600 max-w-full mx-auto">
                Real transformations. Real impact. Real ROI.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto space-y-24">
            {serviceData.caseStudies.map((study, index) => (
              <ScrollReveal key={index}>
                <Card className="overflow-hidden border-2 border-stone-200">
                  <div className="grid md:grid-cols-5 gap-8">
                    <div className="md:col-span-2">
                      <img
                        src={study.image}
                        alt={study.client}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-3 p-8">
                      <Badge className="mb-4 bg-blue-900">{study.industry}</Badge>
                      <h3 className="text-3xl font-bold mb-6 text-gray-900">{study.client}</h3>

                      <div className="space-y-6 mb-8">
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">Challenge</h4>
                          <p className="text-stone-700">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">Solution</h4>
                          <p className="text-stone-700">{study.solution}</p>
                        </div>
                      </div>

                      {/* Results Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-6 bg-stone-50 rounded-lg">
                        {study.results.map((result) => (
                          <div key={result.metric} className="text-center">
                            <div className="text-3xl font-bold text-red-600 mb-1">
                              {result.value}
                            </div>
                            <div className="text-sm text-stone-600">{result.metric}</div>
                          </div>
                        ))}
                      </div>

                      <blockquote className="border-l-4 border-blue-900 pl-6 italic text-stone-700">
                        "{study.testimonial}"
                        <footer className="mt-2 text-sm text-stone-600 not-italic">
                          — {study.author}
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-32 bg-stone-50">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 break-words text-gray-900">Industry Expertise</h2>
              <p className="text-xl text-stone-600 max-w-full mx-auto">
                Deep sector knowledge combined with cross-industry best practices.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceData.industries.map((industry, index) => (
              <ScrollReveal key={industry.name} delay={index * 0.1}>
                <Card
                  className="cursor-pointer hover:shadow-lg transition-all border-2 border-stone-200 hover:border-red-600"
                  onClick={() =>
                    setSelectedIndustry(
                      selectedIndustry === industry.name ? null : industry.name
                    )
                  }
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">{industry.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {industry.expertise.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-900">
                          <FiArrowRight className="w-4 h-4 text-red-600 flex-shrink-0" />
                          {item}
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

      {/* Thought Leadership */}
      <section id="insights" className="py-32">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 break-words text-gray-900">Insights & Research</h2>
              <p className="text-xl text-stone-600 max-w-full mx-auto">
                Download our latest thinking on critical business challenges.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceData.thoughtLeadership.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="border-2 border-stone-200 hover:border-blue-900 transition-colors h-full">
                  <CardContent className="p-8">
                    <item.icon className="w-12 h-12 text-blue-900 mb-6" />
                    <Badge className="mb-4 bg-stone-200 text-stone-900">{item.type}</Badge>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-stone-600 mb-6">{item.description}</p>
                    <Button
                      variant="outline"
                      className="w-full border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
                    >
                      <FiDownload className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <h3 className="text-center text-2xl font-bold mb-12 text-stone-600 text-gray-900">
              Trusted by Industry Leaders
            </h3>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {serviceData.clientLogos.map((client, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="flex items-center justify-center p-6 bg-white rounded-lg border border-stone-200">
                  <div className="text-center text-sm font-bold text-stone-400">
                    {client.logo}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-32">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 break-words text-gray-900">{serviceData.applicationProcess.title}</h2>
              <p className="text-xl text-stone-600 max-w-full mx-auto">
                A rigorous, collaborative approach designed to deliver lasting impact.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto">
            {serviceData.applicationProcess.steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 0.1}>
                <div className="flex gap-8 mb-12 last:mb-0">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-red-600/20 flex-shrink-0 break-words">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-lg text-stone-600">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="max-w-full mx-auto text-center">
              <h2 className="text-5xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-8 break-words text-gray-900">Ready to Transform?</h2>
              <p className="text-xl mb-12 text-blue-100 max-w-full mx-auto">
                Schedule a complimentary consultation to explore how we can help you achieve your
                strategic objectives.
              </p>
              <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-lg px-12">
                Apply for Engagement
              </Button>
              <p className="text-sm text-blue-300 mt-6">
                Application review typically takes 3-5 business days
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 bg-white">
        <div className="container mx-auto px-3 max-w-full">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900 mb-2">STRATEX</div>
            <p className="text-sm text-stone-600">
              © 2024 StratEx Consulting. Offices in New York, London, Singapore.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
