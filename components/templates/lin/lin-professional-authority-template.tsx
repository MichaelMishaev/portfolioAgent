"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiMenu,
  FiX,
  FiExternalLink,
  FiCheckCircle,
  FiUsers,
  FiAward,
  FiBriefcase,
} from "react-icons/fi";
import Link from "next/link";

export function LinProfessionalAuthorityTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const firmData = {
    name: "Monarov & Partners",
    tagline: "Accounting & Tax Advisory",
    description:
      "Premium accounting services for businesses and individuals. Expert guidance in tax planning, financial consulting, and business strategy.",
    services: [
      {
        icon: <FiBriefcase size={32} />,
        title: "Tax Planning",
        description: "Strategic tax optimization for businesses and individuals, ensuring compliance while maximizing savings.",
      },
      {
        icon: <FiUsers size={32} />,
        title: "Business Consulting",
        description: "Expert advice on business structure, growth strategies, and financial management.",
      },
      {
        icon: <FiAward size={32} />,
        title: "Audit & Assurance",
        description: "Comprehensive audit services to ensure accuracy and compliance with all regulations.",
      },
      {
        icon: <FiCheckCircle size={32} />,
        title: "Bookkeeping",
        description: "Professional bookkeeping services to keep your financial records organized and accurate.",
      },
    ],
    stats: [
      { number: "25+", label: "Years Experience" },
      { number: "500+", label: "Happy Clients" },
      { number: "₪2B+", label: "Managed Annually" },
      { number: "98%", label: "Client Satisfaction" },
    ],
    team: [
      {
        name: "David Monarov",
        role: "Senior Partner",
        description: "CPA with 25+ years of experience in corporate tax and financial strategy.",
      },
      {
        name: "Sarah Cohen",
        role: "Tax Specialist",
        description: "Expert in international taxation and cross-border transactions.",
      },
      {
        name: "Michael Levi",
        role: "Audit Director",
        description: "Specializes in audit and assurance for mid to large enterprises.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Attribution Banner */}
      <div className="bg-[#1A1A2E] text-white py-3 px-4 text-center text-sm">
        Design inspired by{" "}
        <a
          href="https://www.monarov.co.il/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium inline-flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
        >
          Monarov Accounting
          <FiExternalLink size={14} />
        </a>
        {" "}- originally created by{" "}
        <a
          href="https://lin.co.il"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium hover:text-[#D4AF37] transition-colors"
        >
          lin.co.il
        </a>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E0E0E0]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-600 hover:text-[#D4AF37] transition-colors">
            ← Back to Gallery
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-[#1A1A1A] hover:text-[#D4AF37] transition-colors font-medium">
              Services
            </a>
            <a href="#about" className="text-sm text-[#1A1A1A] hover:text-[#D4AF37] transition-colors font-medium">
              About
            </a>
            <a href="#team" className="text-sm text-[#1A1A1A] hover:text-[#D4AF37] transition-colors font-medium">
              Team
            </a>
            <a href="#contact" className="text-sm text-[#1A1A1A] hover:text-[#D4AF37] transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#1A1A1A] hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#E0E0E0]">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a
                href="#services"
                className="text-sm text-[#1A1A1A] hover:text-[#D4AF37] transition-colors py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#about"
                className="text-sm text-[#1A1A1A] hover:text-[#D4AF37] transition-colors py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#team"
                className="text-sm text-[#1A1A1A] hover:text-[#D4AF37] transition-colors py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </a>
              <a
                href="#contact"
                className="text-sm text-[#1A1A1A] hover:text-[#D4AF37] transition-colors py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#1A1A2E] text-white py-32 md:py-48 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <ScrollReveal>
              <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {firmData.name}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl sm:text-2xl md:text-3xl  text-[#D4AF37] font-light mb-8">
                {firmData.tagline}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl">
                {firmData.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <Button className="bg-[#D4AF37] hover:bg-[#C19B2B] text-[#1A1A2E] px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                Schedule Consultation
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#F8F8F8] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {firmData.stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-3xl sm:text-5xl   font-bold text-[#D4AF37] mb-2 break-words">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-[#555555]">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4 py-20">
        <ScrollReveal>
          <h2 className="font-['Playfair_Display']  text-3xl sm:text-5xl   font-bold text-center mb-4 text-[#1A1A1A] break-words">
            Our Services
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-center text-[#666666] mb-16 max-w-2xl mx-auto">
            Comprehensive financial services tailored to your needs
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {firmData.services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="p-8 border border-[#E0E0E0] hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-[#1A1A1A] font-['Montserrat']">
                    {service.title}
                  </h3>
                  <p className="text-[#666666] leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="bg-[#F8F8F8] py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-['Playfair_Display']  text-3xl sm:text-5xl   font-bold text-center mb-4 text-[#1A1A1A] break-words">
              Our Team
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-center text-[#666666] mb-16 max-w-2xl mx-auto">
              Expert professionals dedicated to your financial success
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {firmData.team.map((member, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="text-center p-8 border-0 shadow-md hover:shadow-xl transition-all">
                  <CardContent className="p-0">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1A1A2E] to-[#D4AF37] flex items-center justify-center text-white  text-3xl sm:text-4xl  font-bold">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">{member.name}</h3>
                    <p className="text-[#D4AF37] font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-[#666666] leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-['Playfair_Display']  text-3xl sm:text-5xl   font-bold mb-6 break-words">
              Ready to Get Started?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Contact us today for a free consultation and discover how we can help your business thrive.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="mailto:office@monarov.co.il">
                <Button className="bg-[#D4AF37] hover:bg-[#C19B2B] text-[#1A1A2E] px-8 py-6 text-base font-semibold">
                  <FiMail className="mr-2" />
                  Email Us
                </Button>
              </a>
              <a href="tel:+972501234567">
                <Button
                  variant="outline"
                  className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1A2E] px-8 py-6 text-base font-semibold"
                >
                  <FiPhone className="mr-2" />
                  Call Us
                </Button>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
              <div className="flex items-center gap-2">
                <FiMapPin />
                <span>Tel Aviv, Israel</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone />
                <span>+972-50-123-4567</span>
              </div>
              <a href="https://linkedin.com" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <FiLinkedin />
                <span>LinkedIn</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              © 2024 {firmData.name}. All rights reserved.
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
