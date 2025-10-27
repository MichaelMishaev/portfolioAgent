"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { FiMail, FiArrowRight, FiChevronLeft, FiChevronRight , FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "David Kim",
  title: "Digital Designer",
  tagline: "Crafting experiences that matter through thoughtful design, strategic thinking, and pixel-perfect execution",
  location: "Seoul, South Korea",
  availability: "Available for select projects",
  stats: [
    { value: "150+", label: "Projects Completed" },
    { value: "50+", label: "Happy Clients" },
    { value: "8+", label: "Years Experience" },
    { value: "15+", label: "Awards Won" },
  ],
  skills: ["UI/UX Design", "Prototyping", "Branding", "Motion Design", "Figma", "Design Systems", "User Research", "Visual Design", "Typography", "Interaction Design", "3D Design", "Art Direction"],
  testimonials: [
    {
      quote: "David's design sensibility and attention to detail transformed our product completely. Our user engagement increased by 70% and customer satisfaction scores hit all-time highs.",
      author: "Sarah Johnson",
      role: "CEO, TechStart",
      company: "TechStart Inc.",
      rating: 5,
    },
    {
      quote: "Working with David was seamless. He understood our vision and delivered beyond expectations. The brand identity he created perfectly captures who we are and resonates with our audience.",
      author: "Michael Chen",
      role: "Product Manager, FinCo",
      company: "FinCo Global",
      rating: 5,
    },
    {
      quote: "Best designer we've ever worked with. David brings creativity, professionalism, and strategic thinking to every project. He doesn't just make things look good – he makes them work better.",
      author: "Emma Rodriguez",
      role: "CMO, GrowthTech",
      company: "GrowthTech Solutions",
      rating: 5,
    },
  ],
  projects: [
    {
      id: 1,
      title: "E-Commerce Revolution",
      category: "Web Design",
      year: "2024",
      client: "Fashion Retail Co.",
      description: "Complete redesign of a major e-commerce platform, increasing conversion by 45% through improved UX and visual hierarchy. Redesigned checkout flow reduced cart abandonment by 35%.",
      challenge: "Outdated interface with 60% cart abandonment rate and declining mobile sales",
      solution: "Mobile-first redesign with streamlined checkout, smart recommendations, and improved product discovery",
      results: "45% conversion increase, 35% reduction in cart abandonment, $5M additional annual revenue",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=1600&fit=crop",
      color: "#3B82F6",
      duration: "6 months",
      tags: ["E-commerce", "UX Research", "Conversion Optimization"],
    },
    {
      id: 2,
      title: "FinTech Mobile App",
      category: "App Design",
      year: "2024",
      client: "NextGen Banking",
      description: "Intuitive mobile banking experience with focus on accessibility and security for next-generation financial services. Built for 2M+ users with WCAG AA compliance.",
      challenge: "Complex banking features intimidating first-time users, low app adoption",
      solution: "Simplified onboarding, biometric security, and AI-powered financial insights",
      results: "500K downloads in 3 months, 4.8★ rating, 80% user retention",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=1600&fit=crop",
      color: "#10B981",
      duration: "8 months",
      tags: ["Fintech", "Mobile", "Accessibility", "Security"],
    },
    {
      id: 3,
      title: "Brand Identity System",
      category: "Branding",
      year: "2023",
      client: "EcoFashion Startup",
      description: "Comprehensive brand system for a sustainable fashion startup, from logo to packaging and digital presence. Created cohesive identity across 50+ touchpoints.",
      challenge: "New brand needed to stand out in saturated sustainable fashion market",
      solution: "Bold, earthy visual identity with focus on transparency and sustainability",
      results: "Brand recognition increased 200%, featured in Vogue and Elle",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=1600&fit=crop",
      color: "#F59E0B",
      duration: "4 months",
      tags: ["Branding", "Visual Identity", "Packaging", "Sustainability"],
    },
    {
      id: 4,
      title: "SaaS Dashboard",
      category: "Product Design",
      year: "2023",
      client: "DataViz Corp",
      description: "Data-rich analytics dashboard with real-time insights and customizable workflows for enterprise clients. Complex data visualization made simple and actionable.",
      challenge: "Users overwhelmed by data, struggling to find actionable insights",
      solution: "Smart data hierarchy, customizable dashboards, and AI-powered recommendations",
      results: "60% reduction in support tickets, 95 NPS score, $10M ARR",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=1600&fit=crop",
      color: "#8B5CF6",
      duration: "10 months",
      tags: ["SaaS", "Data Visualization", "Enterprise", "B2B"],
    },
    {
      id: 5,
      title: "Travel Booking Platform",
      category: "Web Design",
      year: "2024",
      client: "TravelEase",
      description: "Modern travel booking platform with smart search, personalized recommendations, and seamless multi-device experience. Built for spontaneous and planned travelers.",
      challenge: "Fragmented booking experience causing users to abandon before completion",
      solution: "Unified search across flights, hotels, and activities with predictive AI",
      results: "40% increase in bookings, 3M active users, Series B funded",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=1600&fit=crop",
      color: "#EC4899",
      duration: "7 months",
      tags: ["Travel", "Booking", "AI", "Personalization"],
    },
    {
      id: 6,
      title: "Fitness Coaching App",
      category: "App Design",
      year: "2023",
      client: "FitLife",
      description: "AI-powered fitness coaching app with personalized workout plans, nutrition tracking, and community features. Gamification increased daily active users by 85%.",
      challenge: "High churn rate, users losing motivation after first week",
      solution: "Gamification, social features, and adaptive AI coaching",
      results: "85% increase in DAU, 1M+ downloads, featured by Apple",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&h=1600&fit=crop",
      color: "#F97316",
      duration: "5 months",
      tags: ["Health", "Fitness", "AI", "Gamification"],
    },
    {
      id: 7,
      title: "Design System Platform",
      category: "Product Design",
      year: "2023",
      client: "Enterprise Tech Co.",
      description: "Comprehensive design system serving 200+ designers and developers across 15 products. Built scalable component library with automated documentation and version control.",
      challenge: "Inconsistent UI across products, slow design-to-dev handoff",
      solution: "Unified design tokens, 150+ components, automated Figma-to-code workflow",
      results: "70% faster development, 90% design consistency, $2M cost savings",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=1200&h=1600&fit=crop",
      color: "#06B6D4",
      duration: "12 months",
      tags: ["Design Systems", "Enterprise", "Components", "Automation"],
    },
    {
      id: 8,
      title: "Real Estate Marketplace",
      category: "Web Design",
      year: "2023",
      client: "PropFinder",
      description: "Modern property search platform with 3D virtual tours, AR visualization, and smart matching algorithm. Revolutionized how people find their dream homes.",
      challenge: "Traditional listings not engaging, high bounce rates",
      solution: "3D tours, AR room visualization, neighborhood insights, AI matching",
      results: "250% increase in property views, 50% faster sales cycle",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=1600&fit=crop",
      color: "#14B8A6",
      duration: "8 months",
      tags: ["PropTech", "3D", "AR", "Real Estate"],
    },
  ],
  awards: [
    { name: "Awwwards Site of the Day", year: "2024" },
    { name: "CSS Design Awards Winner", year: "2024" },
    { name: "FWA of the Month", year: "2023" },
    { name: "Best Mobile App Design", year: "2023" },
  ],
  services: [
    {
      title: "Product Design",
      description: "End-to-end product design from research to delivery",
      price: "From $8,000",
      includes: ["User Research", "Wireframing & Prototyping", "Visual Design", "Testing & Iteration"],
    },
    {
      title: "Brand Identity",
      description: "Comprehensive brand systems and visual identities",
      price: "From $12,000",
      includes: ["Brand Strategy", "Logo & Visual Identity", "Brand Guidelines", "Marketing Materials"],
    },
    {
      title: "Design Systems",
      description: "Scalable design systems for growing teams",
      price: "From $15,000",
      includes: ["Component Library", "Design Tokens", "Documentation", "Training & Support"],
    },
  ],
  caseStudies: [
    {
      title: "How we increased conversion by 300%",
      client: "E-Commerce Platform",
      metric: "300% Conversion Increase",
      description: "Deep dive into the complete redesign process, user research findings, and implementation strategy.",
      link: "#",
    },
    {
      title: "Building a design system from scratch",
      client: "Enterprise SaaS",
      metric: "70% Faster Development",
      description: "Creating a scalable design system that serves 200+ designers and developers across 15 products.",
      link: "#",
    },
    {
      title: "Mobile-first banking experience",
      client: "FinTech Startup",
      metric: "4.8★ App Rating",
      description: "Designing an accessible, secure banking app for 2M+ users with WCAG AA compliance.",
      link: "#",
    },
  ],
  process: [
    { phase: "01", name: "Discovery", desc: "Understanding business goals, user needs, and market landscape through research and analysis" },
    { phase: "02", name: "Strategy", desc: "Defining design direction, information architecture, and user flows based on insights" },
    { phase: "03", name: "Design", desc: "Creating wireframes, prototypes, and high-fidelity designs with focus on usability" },
    { phase: "04", name: "Testing", desc: "Validating designs through user testing, A/B tests, and iterating based on feedback" },
    { phase: "05", name: "Development", desc: "Collaborating with engineers for pixel-perfect implementation and design handoff" },
    { phase: "06", name: "Launch & Iterate", desc: "Monitoring metrics post-launch and continuously improving based on data" },
  ],
  expertise: [
    { area: "User Research", years: "8", description: "Qualitative & quantitative research methods" },
    { area: "Interaction Design", years: "8", description: "Creating intuitive user interfaces" },
    { area: "Visual Design", years: "8", description: "Beautiful, on-brand aesthetics" },
    { area: "Prototyping", years: "7", description: "High-fidelity interactive prototypes" },
    { area: "Design Systems", years: "6", description: "Scalable component libraries" },
    { area: "Frontend Development", years: "5", description: "React, TypeScript, Tailwind CSS" },
  ],
  collaborators: ["Google", "Apple", "Microsoft", "Amazon", "Meta", "Netflix", "Spotify", "Adobe"],
};

export function SplitScreenTemplate() {
  const [activeProject, setActiveProject] = useState(0);  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [direction, setDirection] = useState(0);

  const nextProject = () => {
    setDirection(1);
    setActiveProject((prev) => (prev + 1) % portfolioData.projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setActiveProject((prev) => (prev - 1 + portfolioData.projects.length) % portfolioData.projects.length);
  };

  const currentProject = portfolioData.projects[activeProject];

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-3 sm:px-3 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">

            <a href="#work" className="text-sm hover:text-primary transition-colors">
              Work
            </a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </a>
          
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
            <div className="container mx-auto px-3 sm:px-3 py-4 flex flex-col gap-4">
              <a
                href="#work"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </a>
              <a
                href="#contact"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Split Screen */}
      <section className="h-screen flex items-center pt-16">
        <div className="container mx-auto px-3 sm:px-3 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-8">
            {/* Left Side - Text */}
            <div className="flex flex-col justify-center">
              <FadeIn>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
                  {portfolioData.name}
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-2xl md:text-3xl text-muted-foreground mb-4">
                  {portfolioData.title}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-lg text-muted-foreground mb-4 max-w-lg">
                  {portfolioData.tagline}
                </p>
              </FadeIn>
              <FadeIn delay={0.35}>
                <div className="flex flex-col gap-2 mb-8 text-sm text-muted-foreground">
                  <p>📍 {portfolioData.location}</p>
                  <p className="text-primary font-medium">✓ {portfolioData.availability}</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Button size="lg" className="w-fit group">
                  View Projects
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </FadeIn>
            </div>

            {/* Right Side - Visual */}
            <div className="relative flex items-center justify-center">
              <div className="w-full h-[60vh] bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white text-6xl font-bold opacity-20">DK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Split Screen */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">By The Numbers</h2>
              <p className="text-lg text-muted-foreground">
                Metrics that matter, results that speak for themselves. Over 8 years of creating exceptional digital experiences.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {portfolioData.stats.map((stat, index) => (
                <FadeIn key={stat.label} delay={index * 0.1}>
                  <div className="text-center bg-muted/30 p-4 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Split Screen */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-4">Core Skills</h2>
              <p className="text-lg text-muted-foreground">
                Tools and expertise I bring to every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Split Screen */}
      <section id="work" className="min-h-screen overflow-x-hidden max-w-full py-20 border-t">
        <div className="container mx-auto px-3 sm:px-3 mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold">Selected Work</h2>
        </div>

        <div className="container mx-auto px-3 sm:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[70vh]">
            {/* Left Side - Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeProject}
                  custom={direction}
                  initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <div
                    className="h-full bg-cover bg-center rounded-2xl"
                    style={{
                      backgroundImage: `url(${currentProject.image})`,
                      minHeight: "600px",
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeProject}
                  custom={direction}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="inline-block text-sm font-semibold px-3 py-2 rounded-full"
                      style={{ backgroundColor: currentProject.color, color: "white" }}
                    >
                      {currentProject.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {currentProject.client}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
                    {currentProject.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span>{currentProject.year}</span>
                    <span>•</span>
                    <span>{currentProject.duration}</span>
                  </div>

                  <p className="text-lg text-foreground/90 mb-6 leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Case Study Details */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-sm font-bold uppercase text-primary mb-1">Challenge</h4>
                      <p className="text-sm text-muted-foreground">{currentProject.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase text-primary mb-1">Solution</h4>
                      <p className="text-sm text-muted-foreground">{currentProject.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase text-primary mb-1">Results</h4>
                      <p className="text-sm font-semibold text-primary">{currentProject.results}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-muted rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevProject}
                      className="h-12 w-12"
                      aria-label="Previous project"
                    >
                      <FiChevronLeft className="h-5 w-5" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {activeProject + 1} / {portfolioData.projects.length}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextProject}
                      className="h-12 w-12"
                      aria-label="Next project"
                    >
                      <FiChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Split Screen */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-8">Client Feedback</h2>
              <p className="text-lg text-muted-foreground">
                What my clients say about working together.
              </p>
            </div>
            <div className="space-y-8">
              {portfolioData.testimonials.map((testimonial, index) => (
                <FadeIn key={testimonial.author} delay={index * 0.1}>
                  <div className="border-l-4 border-primary pl-6">
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-500 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-lg italic text-foreground/80 mb-4">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">{testimonial.company}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">Awards & Recognition</h2>
              <p className="text-lg text-muted-foreground">
                Industry recognition for exceptional work.
              </p>
            </div>
            <div className="space-y-4">
              {portfolioData.awards.map((award, index) => (
                <FadeIn key={award.name} delay={index * 0.1}>
                  <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="text-3xl">🏆</div>
                    <div>
                      <p className="font-semibold">{award.name}</p>
                      <p className="text-sm text-muted-foreground">{award.year}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 border-t bg-muted/20">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Services</h2>
            <p className="text-lg text-muted-foreground max-w-full mx-auto">
              Comprehensive design solutions tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto">
            {portfolioData.services.map((service, index) => (
              <FadeIn key={service.title} delay={index * 0.1}>
                <div className="bg-background p-8 rounded-lg border hover:shadow-lg transition-shadow h-full flex flex-col">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-primary mb-4">{service.price}</div>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process/Methodology Section */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">My Process</h2>
              <p className="text-lg text-muted-foreground">
                A systematic approach that delivers consistent results across projects of any size.
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Every project is unique, but my process ensures we achieve your goals efficiently and effectively.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.process.map((step, index) => (
              <FadeIn key={step.name} delay={index * 0.1}>
                <div className="bg-muted/30 p-6 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="text-4xl font-bold text-primary mb-3">{step.phase}</div>
                  <h3 className="text-xl font-bold mb-2">{step.name}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section - Split Screen */}
      <section className="py-20 border-t bg-muted/20">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Core Expertise
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Years of experience across the full spectrum of digital design, from research to implementation.
              </p>
            </div>

            <div className="space-y-6">
              {portfolioData.expertise.map((skill, index) => (
                <FadeIn key={skill.area} delay={index * 0.1}>
                  <div className="bg-background p-6 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{skill.area}</h3>
                      <span className="text-sm text-primary font-semibold">{skill.years} years</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section - Split Screen */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Case Studies</h2>
              <p className="text-lg text-muted-foreground">
                Detailed breakdowns of successful projects and the strategies behind them.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioData.caseStudies.map((study, index) => (
              <FadeIn key={study.title} delay={index * 0.1}>
                <div className="bg-muted/30 p-8 rounded-lg hover:bg-muted/50 transition-all cursor-pointer group">
                  <div className="text-3xl font-bold text-primary mb-3">{study.metric}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{study.client}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {study.description}
                  </p>
                  <Button variant="ghost" size="sm" className="group-hover:gap-2 transition-all">
                    Read Case Study
                    <FiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators Section - Split Screen */}
      <section className="py-20 border-t bg-muted/20">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Trusted Collaborators
              </h2>
              <p className="text-lg text-muted-foreground">
                Proud to have partnered with leading brands and innovative startups worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {portfolioData.collaborators.map((brand, index) => (
                <FadeIn key={brand} delay={index * 0.05}>
                  <div className="aspect-square bg-background rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow">
                    <span className="font-bold text-sm text-center text-muted-foreground hover:text-foreground transition-colors">
                      {brand}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Split Screen */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-5xl mb-4">📬</div>
              <h2 className="text-4xl font-bold mb-4">
                Design Insights
              </h2>
              <p className="text-lg text-muted-foreground">
                Monthly newsletter with design tips, case studies, and industry insights. Join 8,000+ designers.
              </p>
            </div>

            <div>
              <div className="flex flex-col gap-4 p-8 bg-muted/30 rounded-lg">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-3 rounded-lg border bg-background"
                />
                <Button size="lg">
                  Subscribe Now
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Split Screen */}
      <section id="contact" className="min-h-screen overflow-x-hidden max-w-full flex items-center border-t">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
                Let's Work
                <br />
                Together
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                I'm currently available for freelance projects and full-time opportunities.
              </p>
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              <Button size="lg" className="w-full justify-start text-lg">
                <FiMail className="mr-2" />
                hello@davidkim.com
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Based in Seoul, South Korea
                <br />
                Available worldwide remotely
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-8">
        <div className="container mx-auto px-3 sm:px-3">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
