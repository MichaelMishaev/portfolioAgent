"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiTrendingUp,
  FiZap,
  FiAward,
  FiUsers,
  FiTarget,
  FiCheckCircle,
  FiArrowRight,
  FiPlay,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

const serviceData = {
  name: "PIXEL PERFECT AGENCY",
  tagline: "Where Creativity Meets Performance",
  description:
    "Award-winning digital agency specializing in brand strategy, creative design, and performance marketing for ambitious brands.",
  hero: {
    video: "https://player.vimeo.com/video/placeholder",
    stats: [
      { value: "200+", label: "Brands Transformed" },
      { value: "150%", label: "Avg. ROI Increase" },
      { value: "45+", label: "Industry Awards" },
      { value: "95%", label: "Client Retention" },
    ],
  },
  services: [
    {
      icon: FiTarget,
      name: "Brand Strategy",
      tagline: "Positioning that resonates",
      description: "Strategic brand development that captures hearts and minds.",
      features: [
        "Brand Identity & Positioning",
        "Market Research & Insights",
        "Competitive Analysis",
        "Brand Architecture",
        "Messaging Framework",
        "Visual Identity Systems",
      ],
      process: ["Discovery", "Research", "Strategy", "Implementation"],
      timeline: "8-12 weeks",
      investment: "From $25K",
    },
    {
      icon: FiZap,
      name: "Creative Design",
      tagline: "Designs that demand attention",
      description: "Award-winning creative that drives business results.",
      features: [
        "Web & App Design",
        "Motion Graphics",
        "Packaging Design",
        "Campaign Creative",
        "Social Media Assets",
        "Video Production",
      ],
      process: ["Briefing", "Concepting", "Design", "Production"],
      timeline: "4-8 weeks",
      investment: "From $15K",
    },
    {
      icon: FiTrendingUp,
      name: "Performance Marketing",
      tagline: "Growth that compounds",
      description: "Data-driven campaigns that scale your business.",
      features: [
        "Paid Media Strategy",
        "Social Advertising",
        "Search Marketing",
        "Conversion Optimization",
        "Analytics & Reporting",
        "Marketing Automation",
      ],
      process: ["Audit", "Strategy", "Launch", "Optimize"],
      timeline: "Ongoing",
      investment: "From $10K/mo",
    },
  ],
  portfolio: [
    {
      client: "TechVision Inc",
      industry: "SaaS",
      challenge: "Rebranding for Series B",
      result: "3x brand awareness, 200% lead increase",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      tags: ["Branding", "Web Design", "Marketing"],
    },
    {
      client: "Luna Cosmetics",
      industry: "Beauty",
      challenge: "Launch campaign for new product line",
      result: "$2M revenue in first month",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      tags: ["Campaign", "Social Media", "Video"],
    },
    {
      client: "UrbanFit",
      industry: "Fitness",
      challenge: "Digital transformation & app launch",
      result: "100K app downloads in 6 weeks",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
      tags: ["UX/UI", "App Design", "Growth"],
    },
  ],
  team: [
    {
      name: "Sarah Chen",
      role: "Creative Director",
      expertise: "15 years in brand strategy",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
      name: "Marcus Williams",
      role: "Head of Growth",
      expertise: "Ex-Google, scaled 50+ brands",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
      name: "Elena Rodriguez",
      role: "Design Lead",
      expertise: "Award-winning designer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    },
  ],
  awards: [
    "Webby Award Winner 2024",
    "Awwwards Site of the Year",
    "FWA of the Day x12",
    "CSS Design Awards Winner",
  ],
  process: {
    title: "Our Proven Process",
    steps: [
      {
        number: "01",
        name: "Discovery",
        description: "Deep dive into your business, audience, and goals.",
        deliverables: ["Stakeholder interviews", "Market analysis", "Competitor audit"],
      },
      {
        number: "02",
        name: "Strategy",
        description: "Data-driven strategy aligned with your objectives.",
        deliverables: ["Strategic roadmap", "Creative brief", "Success metrics"],
      },
      {
        number: "03",
        name: "Creation",
        description: "World-class creative that brings strategy to life.",
        deliverables: ["Design concepts", "Content creation", "Asset production"],
      },
      {
        number: "04",
        name: "Launch & Optimize",
        description: "Seamless execution with continuous improvement.",
        deliverables: ["Campaign launch", "Performance tracking", "Ongoing optimization"],
      },
    ],
  },
};

export function AgencyServiceTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-3 max-w-full py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              PIXEL<span className="text-blue-600">PERFECT</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Services
              </a>
              <a href="#portfolio" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Portfolio
              </a>
              <a href="#process" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Process
              </a>
              <Button className="bg-blue-600 hover:bg-blue-700">Start a Project</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-900 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t">
            <div className="container mx-auto px-3 max-w-full py-4 flex flex-col gap-4">
              <a
                href="#services"
                className="text-sm font-medium hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#portfolio"
                className="text-sm font-medium hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </a>
              <a
                href="#process"
                className="text-sm font-medium hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Process
              </a>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full" onClick={() => setMobileMenuOpen(false)}>
                Start a Project
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-3 max-w-full py-24">
        <div className="max-w-full mx-auto text-center">
          <FadeIn>
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
              Award-Winning Agency
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              {serviceData.tagline}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-gray-600 mb-8 max-w-full mx-auto">
              {serviceData.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                View Our Work
                <FiArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto group text-slate-900 dark:text-white">
                <FiPlay className="mr-2 group-hover:scale-110 transition-transform" />
                Watch Showreel
              </Button>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
              {serviceData.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-50 py-24">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-gray-600">End-to-end solutions for modern brands</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceData.services.map((service, index) => (
              <ScrollReveal key={service.name} delay={index * 0.1}>
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-2xl">{service.name}</CardTitle>
                    <p className="text-blue-600 font-medium">{service.tagline}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <FiCheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Timeline:</span>
                        <span className="font-medium">{service.timeline}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Investment:</span>
                        <span className="font-medium text-blue-600">{service.investment}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">Featured Work</h2>
              <p className="text-xl text-gray-600">Transforming brands, driving results</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceData.portfolio.map((project, index) => (
              <ScrollReveal key={project.client} delay={index * 0.1}>
                <Card className="group overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.client}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-lg">{project.client}</span>
                      <Badge variant="outline">{project.industry}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{project.challenge}</p>
                    <p className="text-sm font-medium text-blue-600 mb-4">{project.result}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">Meet the Team</h2>
              <p className="text-xl text-gray-600">World-class talent, focused on your success</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto">
            {serviceData.team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                    />
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.expertise}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24">
        <div className="container mx-auto px-3 max-w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">{serviceData.process.title}</h2>
              <p className="text-xl text-gray-600">Consistent excellence, every time</p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceData.process.steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 0.1}>
                <Card>
                  <CardContent className="p-8">
                    <div className="text-6xl font-bold text-blue-100 mb-4">{step.number}</div>
                    <h3 className="text-2xl font-bold mb-3">{step.name}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="space-y-2">
                      {step.deliverables.map((deliverable) => (
                        <div key={deliverable} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          <span>{deliverable}</span>
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-24">
        <div className="container mx-auto px-3 max-w-full text-center">
          <ScrollReveal>
            <h2 className="text-5xl font-bold text-white mb-6">Ready to Transform Your Brand?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-full mx-auto">
              Let's create something extraordinary together. Book a free strategy call today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                Start Your Project
                <FiArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                View Pricing
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-3 max-w-full text-center">
          <div className="text-2xl font-bold mb-4">
            PIXEL<span className="text-blue-500">PERFECT</span>
          </div>
          <div className="flex justify-center gap-8 mb-6 text-sm">
            {serviceData.awards.map((award) => (
              <span key={award} className="text-gray-400">{award}</span>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            © 2025 Pixel Perfect Agency. New York • London • Tokyo
          </p>
        </div>
      </footer>
    </div>
  );
}
