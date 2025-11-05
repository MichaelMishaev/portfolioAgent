"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiCompass,
  FiTrendingUp,
  FiUsers,
  FiTarget,
  FiCheckCircle,
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiLayers,
  FiBriefcase,
  FiZap,
  FiGlobe,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

const serviceData = {
  name: "APEX STRATEGIC CONSULTING",
  tagline: "Transform. Execute. Excel.",
  description:
    "Elite management consulting for CEOs and boards. We partner with global leaders to solve their most critical challenges and capture their greatest opportunities.",
  hero: {
    stats: [
      { value: "$50B+", label: "Client Value Created" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "200+", label: "C-Suite Engagements" },
      { value: "45", label: "Countries" },
    ],
  },
  services: [
    {
      icon: FiCompass,
      name: "Corporate Strategy",
      tagline: "Chart the path to market leadership",
      description: "Board-level strategy consulting that defines your competitive advantage and growth trajectory.",
      capabilities: [
        "Growth strategy & market entry",
        "Portfolio optimization",
        "M&A strategy & due diligence",
        "Business model innovation",
        "Competitive positioning",
        "Strategic scenario planning",
      ],
      approach: ["Executive interviews", "Market analysis", "Strategy design", "Board presentation"],
      engagement: "12-16 weeks",
      investment: "$500K - $2M",
    },
    {
      icon: FiLayers,
      name: "Digital Transformation",
      tagline: "Modernize for the digital age",
      description: "End-to-end transformation programs that deliver measurable business impact.",
      capabilities: [
        "Digital operating model design",
        "Technology roadmap",
        "Agile transformation",
        "Data & analytics strategy",
        "Customer experience redesign",
        "Change management",
      ],
      approach: ["Diagnostic", "Roadmap", "Implementation", "Scale"],
      engagement: "6-18 months",
      investment: "$1M - $5M",
    },
    {
      icon: FiTrendingUp,
      name: "Performance Improvement",
      tagline: "Unlock operational excellence",
      description: "Rapid-impact programs that improve margins, reduce costs, and accelerate growth.",
      capabilities: [
        "Cost reduction programs",
        "Revenue optimization",
        "Supply chain efficiency",
        "Sales force effectiveness",
        "Pricing strategy",
        "Working capital optimization",
      ],
      approach: ["Baseline", "Quick wins", "Transformation", "Sustain"],
      engagement: "8-12 weeks",
      investment: "$300K - $1.5M",
    },
  ],
  engagements: [
    {
      client: "Global Retail Leader",
      industry: "Retail & Consumer",
      situation: "Revenue decline and digital disruption from e-commerce competitors",
      intervention: "3-year digital transformation program including omnichannel strategy, technology modernization, and organizational redesign",
      impact: [
        { metric: "Revenue Growth", value: "+$2.5B" },
        { metric: "Digital Sales", value: "15% → 45%" },
        { metric: "Customer NPS", value: "+32 points" },
      ],
      quote: "Apex helped us completely reimagine our business model. The results exceeded our board's expectations.",
      author: "CEO, Fortune 100 Retailer",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    },
    {
      client: "Investment Bank",
      industry: "Financial Services",
      situation: "Post-merger integration of two global institutions with $500B in assets",
      intervention: "18-month integration program covering technology, operations, culture, and client retention",
      impact: [
        { metric: "Cost Synergies", value: "$1.2B annually" },
        { metric: "Client Retention", value: "94%" },
        { metric: "Integration Speed", value: "40% faster" },
      ],
      quote: "The most complex merger in our industry's history. Apex made it successful.",
      author: "Chairman & CEO",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    },
  ],
  team: [
    {
      name: "Dr. James Morrison",
      role: "Senior Partner",
      credentials: "Ex-McKinsey, Harvard MBA, 25 years",
      specialization: "Corporate Strategy & M&A",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Sarah Chen",
      role: "Managing Partner",
      credentials: "Ex-Bain, MIT PhD, 20 years",
      specialization: "Digital Transformation",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
      name: "Michael Rodriguez",
      role: "Senior Partner",
      credentials: "Ex-BCG, Wharton MBA, 22 years",
      specialization: "Performance Improvement",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
      name: "Dr. Lisa Wang",
      role: "Partner",
      credentials: "Ex-Google, Stanford PhD, 15 years",
      specialization: "Innovation & Technology",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    },
  ],
  methodology: {
    title: "The Apex Method",
    description: "Battle-tested methodology refined over 1,000+ engagements",
    phases: [
      {
        number: "01",
        name: "Diagnostic",
        duration: "2-3 weeks",
        description: "Deep dive into your business, competitive landscape, and strategic challenges.",
        activities: [
          "Executive & board interviews",
          "Financial & operational analysis",
          "Market & competitor assessment",
          "Capability diagnostic",
        ],
        deliverable: "Situation assessment & opportunity sizing",
      },
      {
        number: "02",
        name: "Strategy Design",
        duration: "4-6 weeks",
        description: "Co-create the strategic roadmap with your leadership team.",
        activities: [
          "Strategic options development",
          "Business case modeling",
          "Risk & scenario analysis",
          "Implementation planning",
        ],
        deliverable: "Board-ready strategic plan",
      },
      {
        number: "03",
        name: "Implementation",
        duration: "3-12 months",
        description: "Execute the transformation with your team, side by side.",
        activities: [
          "Program governance",
          "Quick wins delivery",
          "Capability building",
          "Change management",
        ],
        deliverable: "Measurable business impact",
      },
      {
        number: "04",
        name: "Sustainability",
        duration: "Ongoing",
        description: "Embed capabilities and ensure lasting results.",
        activities: [
          "Knowledge transfer",
          "Performance tracking",
          "Continuous improvement",
          "Executive coaching",
        ],
        deliverable: "Self-sustaining organization",
      },
    ],
  },
  insights: [
    {
      type: "Research",
      title: "The State of Digital Transformation 2025",
      description: "Annual benchmark study of 500 enterprises across 12 industries",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    },
    {
      type: "White Paper",
      title: "M&A Integration: The First 100 Days",
      description: "Proven playbook from 200+ successful integrations",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    },
    {
      type: "Case Study",
      title: "AI-Powered Revenue Growth",
      description: "How a B2B company increased sales by 40% with AI",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    },
  ],
  recognition: [
    "Ranked #1 Strategy Firm by Vault",
    "Best Consultancy for Digital by Forbes",
    "Top 10 Most Prestigious Firms",
    "Excellence in Client Service Award",
  ],
};

export function ConsultingServiceTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-3 max-w-full py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
            APEX<span className="text-emerald-600">CONSULTING</span>
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Services
            </a>
            <a href="#engagements" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Case Studies
            </a>
            <a href="#team" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Our Team
            </a>
            <a href="#insights" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Insights
            </a>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Contact Us</Button>
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
                href="#services"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#engagements"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
              </a>
              <a
                href="#team"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Team
              </a>
              <a
                href="#insights"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insights
              </a>
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 opacity-70"></div>
        <div className="container relative mx-auto px-3 py-32">
          <div className="max-w-full">
            <FadeIn>
              <Badge className="mb-6 bg-emerald-100 text-emerald-700 border-emerald-200">
                Trusted by Fortune 500 Leaders
              </Badge>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-7xl md:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                {serviceData.tagline}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-2xl text-gray-600 mb-8 max-w-full leading-relaxed">
                {serviceData.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-lg px-8">
                  Schedule Consultation
                  <FiArrowRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                  Download Insights
                </Button>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.4}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20">
                {serviceData.hero.stats.map((stat) => (
                  <div key={stat.label} className="border-l-4 border-emerald-600 pl-4">
                    <div className="text-4xl sm:text-5xl font-bold text-emerald-600 mb-1 break-words">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 break-words">Our Services</h2>
              <p className="text-xl text-gray-600">Strategic solutions for your most critical challenges</p>
            </div>
          </ScrollReveal>

          <div className="space-y-8 max-w-full mx-auto">
            {serviceData.services.map((service, index) => (
              <ScrollReveal key={service.name} delay={index * 0.1}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all border-2 hover:border-emerald-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white flex items-center justify-center mb-4">
                        <service.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">{service.name}</h3>
                      <p className="text-emerald-600 font-semibold mb-4">{service.tagline}</p>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <div className="space-y-2 text-sm pt-4 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Typical Engagement:</span>
                          <span className="font-medium">{service.engagement}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Investment Range:</span>
                          <span className="font-medium text-emerald-600">{service.investment}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4 text-gray-900">Core Capabilities</h4>
                      <div className="space-y-3">
                        {service.capabilities.map((capability) => (
                          <div key={capability} className="flex items-start gap-2">
                            <FiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4 text-gray-900">Our Approach</h4>
                      <div className="space-y-4">
                        {service.approach.map((step, idx) => (
                          <div key={step} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                              {idx + 1}
                            </div>
                            <div className="pt-1">
                              <span className="text-sm font-medium text-gray-700">{step}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="engagements" className="py-24 bg-gray-50">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 break-words">Client Engagements</h2>
              <p className="text-xl text-gray-600">Transformational results for global enterprises</p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto space-y-16">
            {serviceData.engagements.map((engagement, index) => (
              <ScrollReveal key={engagement.client} delay={index * 0.1}>
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="relative h-96 md:h-auto">
                      <img
                        src={engagement.image}
                        alt={engagement.client}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8">
                        <Badge variant="outline" className="bg-white/90 mb-3">{engagement.industry}</Badge>
                        <h3 className="text-3xl font-bold text-white">{engagement.client}</h3>
                      </div>
                    </div>

                    <div className="p-10">
                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Situation</h4>
                        <p className="text-gray-700 mb-4">{engagement.situation}</p>
                        <h4 className="text-sm font-bold text-emerald-600 uppercase mb-2">Our Intervention</h4>
                        <p className="text-gray-700">{engagement.intervention}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-6 bg-emerald-50 rounded-xl">
                        {engagement.impact.map((item) => (
                          <div key={item.metric} className="text-center">
                            <div className="text-3xl font-bold text-emerald-600 mb-1">{item.value}</div>
                            <div className="text-xs text-gray-600 font-medium">{item.metric}</div>
                          </div>
                        ))}
                      </div>

                      <blockquote className="border-l-4 border-emerald-600 pl-6 italic text-gray-700">
                        "{engagement.quote}"
                        <footer className="mt-2 text-sm font-semibold text-gray-900 not-italic">
                          — {engagement.author}
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

      {/* Team Section */}
      <section id="team" className="py-24 bg-white">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 break-words">Our Partners</h2>
              <p className="text-xl text-gray-600">Senior leaders from the world's top firms</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-full mx-auto">
            {serviceData.team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <Card className="text-center hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-emerald-100"
                    />
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-emerald-600 font-semibold mb-2 text-sm">{member.role}</p>
                    <p className="text-xs text-gray-600 mb-3">{member.credentials}</p>
                    <Badge variant="outline" className="text-xs">{member.specialization}</Badge>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 break-words">{serviceData.methodology.title}</h2>
              <p className="text-xl text-gray-600">{serviceData.methodology.description}</p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceData.methodology.phases.map((phase, index) => (
              <ScrollReveal key={phase.number} delay={index * 0.1}>
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-7xl font-bold text-emerald-100">{phase.number}</div>
                      <div className="pt-2">
                        <h3 className="text-2xl font-bold mb-1">{phase.name}</h3>
                        <Badge variant="outline" className="text-xs">{phase.duration}</Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">{phase.description}</p>
                    <div className="space-y-2 mb-6">
                      {phase.activities.map((activity) => (
                        <div key={activity} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                          <span className="text-gray-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <span className="text-sm font-semibold text-emerald-600">
                        → {phase.deliverable}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Thought Leadership */}
      <section id="insights" className="py-24 bg-white">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 break-words">Latest Insights</h2>
              <p className="text-xl text-gray-600">Research and perspectives from our experts</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto">
            {serviceData.insights.map((insight, index) => (
              <ScrollReveal key={insight.title} delay={index * 0.1}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={insight.image}
                      alt={insight.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-emerald-600">{insight.type}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-600 transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
                    <Button variant="ghost" className="p-0 h-auto !text-emerald-600 hover:text-emerald-700">
                      Download PDF <FiArrowRight className="ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 py-24">
        <div className="container mx-auto px-3 max-w-full text-center">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 break-words">
              Let's Discuss Your Strategic Priorities
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-full mx-auto">
              Schedule a confidential consultation with one of our senior partners.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white !text-emerald-600 hover:bg-gray-100 text-lg px-8">
                Schedule Consultation
                <FiArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto !text-white !bg-transparent border-white hover:bg-white/10 text-lg px-8">
                Request Proposal
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-3 max-w-full">
          <div className="text-center mb-6">
            <div className="text-2xl font-bold mb-4">
              APEX<span className="text-emerald-500">CONSULTING</span>
            </div>
            <div className="flex justify-center gap-8 text-sm text-gray-400 mb-4">
              {serviceData.recognition.map((award) => (
                <span key={award}>{award}</span>
              ))}
            </div>
          </div>
          <div className="text-center text-sm text-gray-400 border-t border-gray-800 pt-8">
            © 2025 Apex Strategic Consulting. New York • London • Dubai • Singapore • Hong Kong
          </div>
        </div>
      </footer>
    </div>
  );
}
