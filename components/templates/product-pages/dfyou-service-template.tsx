"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiZap,
  FiRefreshCw,
  FiCheck,
  FiClock,
  FiShield,
  FiInbox,
  FiMessageCircle,
  FiPause,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

const serviceData = {
  name: "DESIGN ON TAP",
  tagline: "Unlimited Design. Fixed Price. Blazing Fast.",
  description:
    "Subscribe to unlimited graphic design, branding, and web design. Pause or cancel anytime. No surprises.",
  speed: "48-hour turnaround",
  price: 2995,
  hero: {
    badges: [
      { icon: FiZap, text: "48hr avg. turnaround" },
      { icon: FiRefreshCw, text: "Unlimited revisions" },
      { icon: FiPause, text: "Pause or cancel anytime" },
    ],
  },
  howItWorks: [
    {
      step: "1",
      title: "Subscribe & Request",
      description:
        "Choose your plan and submit unlimited design requests through our simple portal. Add as many to your queue as you need.",
      icon: FiInbox,
    },
    {
      step: "2",
      title: "We Design, Fast",
      description:
        "Our expert designers work on your requests one at a time. Most projects delivered in 48 hours or less.",
      icon: FiZap,
    },
    {
      step: "3",
      title: "Revise Until Perfect",
      description:
        "Request unlimited revisions until you're 100% satisfied. We don't stop until you love it.",
      icon: FiRefreshCw,
    },
  ],
  portfolio: {
    title: "Recent Work",
    categories: ["All", "Branding", "Web Design", "Social Media", "Marketing"],
    projects: [
      {
        title: "TechStart Branding",
        category: "Branding",
        turnaround: "36 hours",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      },
      {
        title: "EcoShop Website",
        category: "Web Design",
        turnaround: "48 hours",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      },
      {
        title: "FitLife Social Campaign",
        category: "Social Media",
        turnaround: "24 hours",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
      },
      {
        title: "Urban Cafe Brand Guide",
        category: "Branding",
        turnaround: "42 hours",
        image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop",
      },
      {
        title: "SaaS Dashboard UI",
        category: "Web Design",
        turnaround: "48 hours",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      },
      {
        title: "Product Launch Pack",
        category: "Marketing",
        turnaround: "36 hours",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
      },
      {
        title: "Restaurant Rebrand",
        category: "Branding",
        turnaround: "48 hours",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      },
      {
        title: "E-commerce Redesign",
        category: "Web Design",
        turnaround: "48 hours",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      },
      {
        title: "Instagram Templates",
        category: "Social Media",
        turnaround: "12 hours",
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop",
      },
      {
        title: "Email Campaign Design",
        category: "Marketing",
        turnaround: "24 hours",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop",
      },
      {
        title: "App Icon & Branding",
        category: "Branding",
        turnaround: "30 hours",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      },
      {
        title: "Landing Page Design",
        category: "Web Design",
        turnaround: "48 hours",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
      },
    ],
  },
  pricing: {
    title: "Simple, Transparent Pricing",
    subtitle: "One flat monthly fee. Unlimited requests. Pause or cancel anytime.",
    plan: {
      name: "Unlimited Design",
      price: 2995,
      period: "per month",
      features: [
        "Unlimited design requests",
        "Unlimited revisions",
        "48-hour avg. turnaround",
        "Pause or cancel anytime",
        "Dedicated Slack channel",
        "Design system & brand consistency",
        "Source files included",
        "Stock photos included",
      ],
      notIncluded: ["Custom development (HTML/CSS)", "Motion graphics & animation", "3D modeling"],
    },
    comparison: {
      diy: {
        option: "Hiring In-House",
        cost: "$80K+/year",
        speed: "Weeks to recruit",
        quality: "Variable",
        flexibility: "Low",
      },
      freelance: {
        option: "Freelancers",
        cost: "$50-150/hour",
        speed: "Inconsistent",
        quality: "Variable",
        flexibility: "Medium",
      },
      designOnTap: {
        option: "Design on Tap",
        cost: "$2,995/month",
        speed: "48 hours avg.",
        quality: "Consistent",
        flexibility: "Total",
      },
    },
  },
  guarantees: [
    {
      icon: FiShield,
      title: "75% Refund Guarantee",
      description:
        "Not satisfied in the first month? We'll refund 75% of your payment, no questions asked.",
    },
    {
      icon: FiClock,
      title: "48-Hour Promise",
      description:
        "Most designs delivered in 48 hours or less. Rush requests available for urgent needs.",
    },
    {
      icon: FiRefreshCw,
      title: "Unlimited Revisions",
      description:
        "We don't stop until you're 100% happy. Seriously unlimited. We mean it.",
    },
    {
      icon: FiPause,
      title: "Pause Anytime",
      description:
        "Only need design some months? Pause your subscription and resume whenever you need us.",
    },
  ],
  faq: [
    {
      question: "How fast will I receive my designs?",
      answer:
        "Most requests are completed within 48 hours or less. More complex projects may take longer, but we'll always give you a clear timeline upfront.",
    },
    {
      question: "What if I don't like the design?",
      answer:
        "Request as many revisions as you need until you're 100% satisfied. We don't stop until you love it. Plus, first-month 75% refund guarantee if we're not the right fit.",
    },
    {
      question: "How many requests can I have at once?",
      answer:
        "Unlimited! Add as many to your queue as you need. We work on them one at a time to ensure quality and speed.",
    },
    {
      question: "What design tools do you use?",
      answer:
        "We primarily use Figma, Adobe Creative Suite (Photoshop, Illustrator, InDesign), and other industry-standard tools. All source files are included.",
    },
    {
      question: "Who are the designers?",
      answer:
        "Our team consists of senior-level designers with 8+ years of experience. Each has worked with major brands and startups alike.",
    },
    {
      question: "Can I pause my subscription?",
      answer:
        "Absolutely! Pause anytime and resume whenever you need design work again. Perfect for seasonal businesses or project-based needs.",
    },
    {
      question: "What's not included?",
      answer:
        "Custom code development (we design, you develop), motion graphics/animation, 3D modeling, and physical product design are not included.",
    },
    {
      question: "How do I request designs?",
      answer:
        "Simply submit requests through our easy-to-use portal. You can use our brief template or just describe what you need. Add files, links, inspiration - whatever helps us understand your vision.",
    },
  ],
  testimonials: [
    {
      quote:
        "Design on Tap has been a game-changer. We went from waiting weeks for design to getting gorgeous work in 2 days. The quality is consistently excellent.",
      author: "Sarah Chen",
      role: "CEO, TechStart",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      quote:
        "I was skeptical about 'unlimited' but they really mean it. We've submitted 30+ requests this month and the quality never drops. Best investment we've made.",
      author: "Marcus Johnson",
      role: "Marketing Director, EcoShop",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      quote:
        "The pause feature is brilliant. We only need design 6 months a year, so this saves us a fortune compared to hiring. Quality is top-tier.",
      author: "Elena Rodriguez",
      role: "Founder, Urban Cafe",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ],
};

export function DFYouServiceTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? serviceData.portfolio.projects
      : serviceData.portfolio.projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-stone-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
            DESIGN ON TAP
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
            <a
              href="#work"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Work
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-blue-600 transition-colors">
              FAQ
            </a>
            <Button className="bg-gradient-to-r from-blue-600 to-pink-500 hover:opacity-90 text-white">
              Subscribe Now
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
            <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
              <a
                href="#work"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </a>
              <a
                href="#pricing"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-pink-50 py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn>
              <Badge className="mb-6 bg-pink-500 text-white text-sm px-4 py-2">
                {serviceData.speed}
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight">
                {serviceData.name}
              </h1>
              <p className="text-3xl font-light mb-8 text-stone-700">{serviceData.tagline}</p>
              <p className="text-xl mb-12 text-stone-600 max-w-2xl mx-auto">
                {serviceData.description}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row gap-4 justify-center mb-16">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-pink-500 hover:opacity-90 text-white text-lg px-12 py-6"
                >
                  Get Started — ${serviceData.price}/mo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-12 py-6"
                >
                  View Examples
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm">
                {serviceData.hero.badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <badge.icon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{badge.text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-5xl font-bold text-center mb-24">How It Works</h2>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            {serviceData.howItWorks.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.15}>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-pink-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-8">
                    {step.step}
                  </div>
                  <step.icon className="w-12 h-12 mx-auto mb-6 text-blue-600" />
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-lg text-stone-600">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section id="work" className="py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-5xl font-bold text-center mb-8">{serviceData.portfolio.title}</h2>
            <p className="text-xl text-center text-stone-600 mb-12">
              Real projects. Real fast. All delivered in under 48 hours.
            </p>
          </ScrollReveal>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {serviceData.portfolio.categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={index} delay={(index % 9) * 0.05}>
                <Card className="overflow-hidden border-2 border-stone-200 hover:border-blue-600 transition-all hover:shadow-xl group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-pink-500 text-white">
                      <FiClock className="w-3 h-3 mr-1" />
                      {project.turnaround}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-stone-600">{project.category}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">{serviceData.pricing.title}</h2>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                {serviceData.pricing.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <Card className="border-4 border-blue-600 shadow-2xl">
                <CardHeader className="text-center pb-8 pt-12 bg-gradient-to-br from-blue-50 to-pink-50">
                  <CardTitle className="text-3xl mb-6">{serviceData.pricing.plan.name}</CardTitle>
                  <div className="mb-6">
                    <span className="text-6xl font-bold">${serviceData.pricing.plan.price}</span>
                    <span className="text-xl text-stone-600">/{serviceData.pricing.plan.period}</span>
                  </div>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-pink-500 hover:opacity-90 text-white text-lg px-12"
                  >
                    Subscribe Now
                  </Button>
                  <p className="text-sm text-stone-600 mt-4">Pause or cancel anytime</p>
                </CardHeader>
                <CardContent className="p-12">
                  <div className="space-y-4 mb-8">
                    {serviceData.pricing.plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <FiCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-stone-200 pt-8">
                    <h4 className="font-semibold mb-4 text-stone-600">Not Included:</h4>
                    <div className="space-y-3">
                      {serviceData.pricing.plan.notIncluded.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <FiX className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" />
                          <span className="text-stone-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-5xl font-bold text-center mb-24">Our Guarantees</h2>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {serviceData.guarantees.map((guarantee, index) => (
              <ScrollReveal key={guarantee.title} delay={index * 0.1}>
                <Card className="border-2 border-stone-200 hover:border-blue-600 transition-colors">
                  <CardContent className="p-8">
                    <guarantee.icon className="w-12 h-12 text-blue-600 mb-6" />
                    <h3 className="text-2xl font-bold mb-4">{guarantee.title}</h3>
                    <p className="text-lg text-stone-600">{guarantee.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-5xl font-bold text-center mb-24">What Clients Say</h2>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {serviceData.testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="border-2 border-stone-200">
                  <CardContent className="p-8">
                    <p className="text-lg italic mb-6 text-stone-700">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-bold">{testimonial.author}</div>
                        <div className="text-sm text-stone-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-5xl font-bold text-center mb-24">Frequently Asked Questions</h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-6">
            {serviceData.faq.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <Card className="border-2 border-stone-200">
                  <CardHeader>
                    <CardTitle className="text-xl">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-600">{item.answer}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Ready for Unlimited Design?
              </h2>
              <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
                Subscribe today and get your first design delivered in 48 hours. Pause or cancel
                anytime.
              </p>
              <Button
                size="lg"
                className="bg-white hover:bg-stone-100 text-blue-600 text-lg px-12 py-6"
              >
                Subscribe for ${serviceData.price}/month
              </Button>
              <p className="text-sm mt-6 opacity-75">
                75% refund guarantee • Pause anytime • No contracts
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent mb-2">
              DESIGN ON TAP
            </div>
            <p className="text-sm text-stone-600">
              © 2024 Design on Tap. Unlimited design for modern teams.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
