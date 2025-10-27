"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiMail, FiGithub, FiLinkedin, FiInstagram, FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";

const portfolioData = {
  name: "Sarah Chen",
  title: "Creative Director & Photographer",
  bio: "Capturing moments that tell stories. Specialized in portrait, fashion, and commercial photography with a cinematic touch.",
  stats: [
    { value: "500+", label: "Projects Completed" },
    { value: "50+", label: "Brand Clients" },
    { value: "10+", label: "Awards Won" },
  ],
  services: [
    "Portrait Photography",
    "Fashion Editorial",
    "Commercial Campaigns",
    "Creative Direction",
    "Photo Editing",
    "Brand Storytelling",
  ],
  projects: [
    {
      id: 1,
      title: "Urban Stories",
      category: "Photography",
      description: "A visual journey through urban landscapes and city life.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Fashion Forward",
      category: "Fashion",
      description: "Editorial fashion photography for leading magazines.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Brand Campaign",
      category: "Commercial",
      description: "Complete visual identity and campaign for luxury brand.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Portrait Series",
      category: "Portrait",
      description: "Intimate portraits exploring human emotion and character.",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Night Life Series",
      category: "Photography",
      description: "Capturing the energy and atmosphere of nighttime cityscapes.",
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      title: "Product Showcase",
      category: "Commercial",
      description: "High-end product photography for e-commerce and advertising.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    },
  ],
  testimonials: [
    {
      quote: "Sarah's creative vision transformed our brand campaign beyond expectations.",
      author: "Marcus Lee",
      role: "Creative Director, Vogue",
    },
    {
      quote: "Working with Sarah is always a pleasure. Her attention to detail is unmatched.",
      author: "Amanda Rodriguez",
      role: "Brand Manager, Nike",
    },
  ],
};

export function DarkModeTemplate() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </Link>
          <div className="flex items-center gap-8">
            <a
              href="#work"
              className="text-sm hover:text-cyan-400 transition-colors"
            >
              Work
            </a>
            <a
              href="#about"
              className="text-sm hover:text-cyan-400 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <FadeIn>
            <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {portfolioData.name}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8">
              {portfolioData.title}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold"
            >
              Explore My Work
            </Button>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full p-1">
            <div className="w-1 h-2 bg-cyan-400 rounded-full mx-auto" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20 border-t border-white/10">
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {portfolioData.stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="container mx-auto px-6 py-32">
        <ScrollReveal>
          <h2 className="text-sm font-semibold text-cyan-400 mb-12 uppercase tracking-wider">
            Selected Work
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <Card className="group bg-gray-900/50 border-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {project.description}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center">
                      <FiExternalLink className="text-black" />
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-6 py-32 border-t border-white/10">
        <ScrollReveal>
          <h2 className="text-sm font-semibold text-cyan-400 mb-12 uppercase tracking-wider text-center">
            What I Do
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {portfolioData.services.map((service, index) => (
            <ScrollReveal key={service} delay={index * 0.05}>
              <div className="bg-white/5 hover:bg-cyan-400/10 border border-white/10 hover:border-cyan-400/50 p-6 transition-all">
                <p className="text-lg text-gray-300">{service}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-sm font-semibold text-cyan-400 mb-8 uppercase tracking-wider">
                About Me
              </h2>
              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-12">
                {portfolioData.bio}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex justify-center gap-6">
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 hover:bg-cyan-400/20 border border-white/10 hover:border-cyan-400 rounded-full flex items-center justify-center transition-all"
                  aria-label="Instagram Profile"
                >
                  <FiInstagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 hover:bg-cyan-400/20 border border-white/10 hover:border-cyan-400 rounded-full flex items-center justify-center transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 hover:bg-cyan-400/20 border border-white/10 hover:border-cyan-400 rounded-full flex items-center justify-center transition-all"
                  aria-label="GitHub Profile"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-32 border-t border-white/10">
        <ScrollReveal>
          <h2 className="text-sm font-semibold text-cyan-400 mb-16 uppercase tracking-wider text-center">
            Client Testimonials
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {portfolioData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.author} delay={index * 0.1}>
              <Card className="bg-white/5 border-white/10 p-8">
                <p className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-cyan-400">{testimonial.role}</p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-6 py-32">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Let's Create Something{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Amazing
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-400 mb-12">
              Available for freelance projects and collaborations
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold text-lg px-8"
            >
              <FiMail className="mr-2" />
              Get in Touch
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black">
        <div className="container mx-auto px-6 py-8">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} {portfolioData.name}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
