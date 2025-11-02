"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FiCode,
  FiZap,
  FiShield,
  FiGlobe,
  FiMail,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMenu,
  FiX,
  FiExternalLink,
  FiCheck,
} from "react-icons/fi";
import Link from "next/link";

export function LinTechPioneerTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const companyData = {
    name: "Unilink",
    tagline: "Enterprise Software Solutions",
    description:
      "Building the future of connected systems. Scalable, secure, and intelligent software solutions for modern enterprises.",
    features: [
      {
        icon: <FiCode size={32} />,
        title: "Modern Architecture",
        description: "Built with cutting-edge technologies and best practices for maximum scalability and performance.",
      },
      {
        icon: <FiZap size={32} />,
        title: "Lightning Fast",
        description: "Optimized for speed with advanced caching, CDN delivery, and efficient data processing.",
      },
      {
        icon: <FiShield size={32} />,
        title: "Enterprise Security",
        description: "Bank-grade encryption, SOC 2 compliance, and comprehensive security monitoring.",
      },
      {
        icon: <FiGlobe size={32} />,
        title: "Global Scale",
        description: "Distributed infrastructure across multiple regions ensuring 99.99% uptime worldwide.",
      },
    ],
    techStack: [
      { name: "React", color: "#61DAFB" },
      { name: "Node.js", color: "#339933" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Redis", color: "#DC382D" },
      { name: "Docker", color: "#2496ED" },
      { name: "Kubernetes", color: "#326CE5" },
      { name: "AWS", color: "#FF9900" },
    ],
    products: [
      {
        name: "Unilink Connect",
        description: "API integration platform connecting your systems seamlessly",
        features: ["Real-time sync", "100+ integrations", "Custom webhooks"],
      },
      {
        name: "Unilink Analytics",
        description: "Business intelligence and data visualization suite",
        features: ["Custom dashboards", "AI insights", "Export to any format"],
      },
      {
        name: "Unilink Security",
        description: "Enterprise-grade security and compliance management",
        features: ["SOC 2 certified", "GDPR compliant", "24/7 monitoring"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E293B] to-[#0F172A] text-white">
      {/* Attribution Banner */}
      <div className="bg-[#3B82F6] text-white py-3 px-4 text-center text-sm">
        Design inspired by{" "}
        <a
          href="https://www.unilink.co.il/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium inline-flex items-center gap-1 hover:text-[#06B6D4] transition-colors"
        >
          Unilink Software
          <FiExternalLink size={14} />
        </a>
        {" "}- originally created by{" "}
        <a
          href="https://lin.co.il"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium hover:text-[#06B6D4] transition-colors"
        >
          lin.co.il
        </a>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1E293B]/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-400 hover:text-[#3B82F6] transition-colors">
            ← Back to Gallery
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-white hover:text-[#3B82F6] transition-colors font-medium">
              Features
            </a>
            <a href="#products" className="text-sm text-white hover:text-[#3B82F6] transition-colors font-medium">
              Products
            </a>
            <a href="#tech" className="text-sm text-white hover:text-[#3B82F6] transition-colors font-medium">
              Technology
            </a>
            <a href="#contact" className="text-sm text-white hover:text-[#3B82F6] transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-[#3B82F6] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1E293B] border-t border-white/10">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a
                href="#features"
                className="text-sm text-white hover:text-[#3B82F6] transition-colors py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#products"
                className="text-sm text-white hover:text-[#3B82F6] transition-colors py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </a>
              <a
                href="#tech"
                className="text-sm text-white hover:text-[#3B82F6] transition-colors py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Technology
              </a>
              <a
                href="#contact"
                className="text-sm text-white hover:text-[#3B82F6] transition-colors py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#3B82F6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#06B6D4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-block px-4 py-2 bg-[#3B82F6]/20 border border-[#3B82F6]/50 rounded-full text-sm mb-6">
                <span className="text-[#3B82F6]">●</span> Enterprise-Grade Solutions
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-6 leading-none">
                <span className="bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
                  {companyData.name}
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-2xl md:text-3xl text-gray-300 font-light mb-8">
                {companyData.tagline}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
                {companyData.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white px-8 py-6 text-base font-semibold shadow-lg shadow-[#3B82F6]/30">
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white px-8 py-6 text-base font-semibold"
                >
                  View Demo
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Built for <span className="text-[#3B82F6]">Modern Teams</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Everything you need to build, deploy, and scale your applications
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {companyData.features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="bg-[#1E293B]/50 border border-[#3B82F6]/20 p-6 hover:border-[#3B82F6] hover:shadow-lg hover:shadow-[#3B82F6]/20 transition-all group">
                <CardContent className="p-0">
                  <div className="text-[#3B82F6] mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-[#0F172A] py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Our <span className="text-[#3B82F6]">Products</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              Comprehensive suite of tools designed for enterprise needs
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {companyData.products.map((product, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#3B82F6]/30 p-8 hover:border-[#3B82F6] hover:shadow-xl hover:shadow-[#3B82F6]/20 transition-all">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold mb-3 text-white">{product.name}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{product.description}</p>
                    <ul className="space-y-3">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <FiCheck className="text-[#06B6D4] flex-shrink-0" />
                          <span>{feature}</span>
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

      {/* Tech Stack Section */}
      <section id="tech" className="container mx-auto px-4 py-20">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Powered by <span className="text-[#3B82F6]">Modern Tech</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Built with industry-leading technologies and best practices
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
          {companyData.techStack.map((tech, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="bg-[#1E293B]/50 border border-[#3B82F6]/20 rounded-lg p-4 flex flex-col items-center justify-center gap-3 hover:border-[#3B82F6] hover:shadow-lg hover:shadow-[#3B82F6]/10 transition-all group">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-xs group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: tech.color }}
                >
                  {tech.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-xs text-gray-400 text-center">{tech.name}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Code Example */}
        <ScrollReveal delay={0.6}>
          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-[#0F172A] border border-[#3B82F6]/30 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-[#1E293B] border-b border-[#3B82F6]/20">
                <span className="text-sm text-gray-400">example.ts</span>
                <button className="text-xs text-[#3B82F6] hover:text-[#06B6D4] transition-colors">
                  Copy
                </button>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-gray-300">
                  {`import { Unilink } from '@unilink/sdk';

const client = new Unilink({
  apiKey: process.env.UNILINK_API_KEY,
  region: 'us-east-1'
});

// Connect to your data sources
await client.connect('postgresql', {
  host: 'db.example.com',
  database: 'production'
});

// Real-time data sync
await client.sync();`}
                </code>
              </pre>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Business?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join thousands of companies already using Unilink to power their operations
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="mailto:info@unilink.co.il">
                <Button className="bg-white text-[#3B82F6] hover:bg-gray-100 px-8 py-6 text-base font-semibold shadow-lg">
                  <FiMail className="mr-2" />
                  Contact Sales
                </Button>
              </a>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#3B82F6] px-8 py-6 text-base font-semibold"
              >
                Start Free Trial
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="flex gap-6 justify-center">
              <a href="https://github.com" className="text-white hover:text-[#06B6D4] transition-colors">
                <FiGithub size={24} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-[#06B6D4] transition-colors">
                <FiTwitter size={24} />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-[#06B6D4] transition-colors">
                <FiLinkedin size={24} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              © 2024 {companyData.name}. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Design inspired by lin.co.il client work
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
