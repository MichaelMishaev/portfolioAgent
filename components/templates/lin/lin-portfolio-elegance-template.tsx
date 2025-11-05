"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiMail, FiInstagram, FiFacebook, FiPhone, FiMenu, FiX, FiExternalLink } from "react-icons/fi";
import Link from "next/link";

export function LinPortfolioEleganceTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const portfolioData = {
    name: "Iris Sukar",
    tagline: "Interior Designer",
    bio: "Creating beautiful, functional spaces that reflect your unique style and personality. With over 15 years of experience in residential and commercial design.",
    projects: [
      {
        id: 1,
        title: "Modern Apartment",
        category: "Residential",
        image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop",
      },
      {
        id: 2,
        title: "Luxury Villa",
        category: "Residential",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
      },
      {
        id: 3,
        title: "Office Space",
        category: "Commercial",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      },
      {
        id: 4,
        title: "Restaurant Design",
        category: "Commercial",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      },
      {
        id: 5,
        title: "Penthouse Suite",
        category: "Residential",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      },
      {
        id: 6,
        title: "Boutique Hotel",
        category: "Commercial",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Attribution Banner */}
      <div className="bg-[#C9A87C] text-white py-3 px-4 text-center text-sm">
        Design inspired by{" "}
        <a
          href="https://www.irissukar.co.il/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          Iris Sukar
          <FiExternalLink size={14} />
        </a>
        {" "}- originally created by{" "}
        <a
          href="https://lin.co.il"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium hover:opacity-80 transition-opacity"
        >
          lin.co.il
        </a>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E0E0E0]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-600 hover:text-[#C9A87C] transition-colors">
            ← Back to Gallery
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-[#1A1A1A] hover:text-[#C9A87C] transition-colors">
              About
            </a>
            <a href="#portfolio" className="text-sm text-[#1A1A1A] hover:text-[#C9A87C] transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="text-sm text-[#1A1A1A] hover:text-[#C9A87C] transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#1A1A1A] hover:text-[#C9A87C] transition-colors"
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
                href="#about"
                className="text-sm text-[#1A1A1A] hover:text-[#C9A87C] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#portfolio"
                className="text-sm text-[#1A1A1A] hover:text-[#C9A87C] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </a>
              <a
                href="#contact"
                className="text-sm text-[#1A1A1A] hover:text-[#C9A87C] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 text-center">
        <ScrollReveal>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light mb-6 text-[#1A1A1A] tracking-tight break-words text-gray-900">
            {portfolioData.name}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-xl md:text-2xl text-[#C9A87C] font-light mb-8">
            {portfolioData.tagline}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p className="text-base md:text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
            {portfolioData.bio}
          </p>
        </ScrollReveal>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="container mx-auto px-4 py-20">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-light text-center mb-16 text-[#1A1A1A] text-gray-900">
            Selected Projects
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-light mb-1 text-[#C9A87C]">{project.category}</p>
                      <h3 className="text-xl font-light text-gray-900">{project.title}</h3>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[#F5F5F5] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-light text-center mb-12 text-[#1A1A1A] text-gray-900">
                About
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-[#666666] leading-relaxed mb-6">
                    With a passion for creating harmonious spaces, I bring together functionality and aesthetics to craft interiors that truly feel like home.
                  </p>
                  <p className="text-[#666666] leading-relaxed mb-6">
                    Each project is a unique journey, tailored to reflect the personality and lifestyle of my clients. From concept to completion, I ensure every detail is thoughtfully considered.
                  </p>
                  <p className="text-[#666666] leading-relaxed">
                    My approach combines timeless design principles with contemporary trends, resulting in spaces that are both beautiful and enduring.
                  </p>
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=600&fit=crop"
                    alt="Interior design workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-light mb-6 text-[#1A1A1A] text-gray-900">
              Let's Work Together
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-[#666666] mb-12 leading-relaxed">
              Have a project in mind? I'd love to hear about it. Get in touch to discuss how we can bring your vision to life.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="mailto:hello@irissukar.com">
                <Button className="bg-[#C9A87C] hover:bg-[#B8976B] text-white px-8 py-6 text-base">
                  <FiMail className="mr-2" />
                  Email Me
                </Button>
              </a>
              <a href="tel:+972501234567">
                <Button variant="outline" className="border-[#C9A87C] text-[#C9A87C] hover:bg-[#C9A87C] hover:text-white px-8 py-6 text-base">
                  <FiPhone className="mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="flex gap-6 justify-center">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#C9A87C] transition-colors"
              >
                <FiInstagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#C9A87C] transition-colors"
              >
                <FiFacebook size={24} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2024 {portfolioData.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Design inspired by lin.co.il client work
          </p>
        </div>
      </footer>
    </div>
  );
}
