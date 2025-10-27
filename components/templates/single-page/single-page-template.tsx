"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "Jamie Taylor",
  title: "Full-Stack Developer",
  bio: "Passionate about building clean, efficient, and user-friendly web applications. Specializing in React, Node.js, and modern web technologies. With 5+ years of experience, I've helped startups and established companies ship products that users love.",
  stats: [
    { number: "50+", label: "Projects Delivered" },
    { number: "5+", label: "Years Experience" },
    { number: "30+", label: "Happy Clients" },
    { number: "100%", label: "On-Time Delivery" },
  ],
  skills: ["React", "Node.js", "TypeScript", "Python", "PostgreSQL", "AWS", "Docker", "GraphQL"],
  experience: [
    {
      year: "2022 - Present",
      role: "Senior Full-Stack Developer",
      company: "Tech Innovations Inc.",
      description: "Leading development of enterprise SaaS platforms, mentoring junior developers, and architecting scalable solutions.",
    },
    {
      year: "2020 - 2022",
      role: "Full-Stack Developer",
      company: "StartupXYZ",
      description: "Built core product features, implemented CI/CD pipelines, and grew user base from 1K to 50K users.",
    },
    {
      year: "2019 - 2020",
      role: "Junior Developer",
      company: "Digital Agency Co.",
      description: "Developed client websites and web applications, collaborated with design team on UX improvements.",
    },
  ],
  projects: [
    {
      title: "Task Management App",
      description: "A collaborative project management tool with real-time updates",
      tech: ["React", "Node.js", "Socket.io"],
      details: "Built a real-time collaboration platform serving 10,000+ users. Implemented WebSocket connections for instant updates, role-based access control, and automated task workflows. Reduced project completion time by 35% for teams.",
      link: "https://example.com",
    },
    {
      title: "E-Learning Platform",
      description: "Online education platform with video streaming and quizzes",
      tech: ["Next.js", "PostgreSQL", "Stripe"],
      details: "Created a comprehensive learning management system with video streaming, interactive quizzes, and payment integration. Supports 50,000+ students with 99.9% uptime. Features include progress tracking, certificates, and instructor dashboards.",
      link: "https://example.com",
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time data visualization dashboard for marketing teams",
      tech: ["React", "D3.js", "Express"],
      details: "Developed a real-time analytics platform processing 1M+ data points daily. Custom visualizations, exportable reports, and predictive insights. Helped clients make data-driven decisions 40% faster.",
      link: "https://example.com",
    },
  ],
  testimonials: [
    {
      name: "Sarah Johnson",
      role: "CEO, StartupXYZ",
      quote: "Jamie transformed our product vision into reality. Their technical expertise and attention to detail were instrumental in our growth from startup to Series A.",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Product Manager, Tech Innovations",
      quote: "Working with Jamie is a pleasure. They consistently deliver high-quality code, meet deadlines, and bring creative solutions to complex problems.",
      avatar: "MC",
    },
  ],
  process: [
    { step: "Discover", desc: "Understanding your goals, users, and technical requirements" },
    { step: "Design", desc: "Creating architecture and user experience that scales" },
    { step: "Develop", desc: "Building with clean code, best practices, and testing" },
    { step: "Deploy", desc: "Launching with monitoring, documentation, and support" },
  ],
  contact: {
    email: "jamie@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
};

export function SinglePageTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-background">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-3 sm:px-3 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6">
              <a href="#about" className="text-sm hover:text-primary transition-colors">
                About
              </a>
              <a href="#experience" className="text-sm hover:text-primary transition-colors">
                Experience
              </a>
              <a href="#projects" className="text-sm hover:text-primary transition-colors">
                Projects
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
                href="#about"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#experience"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Experience
              </a>
              <a
                href="#projects"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-3 sm:px-3 pt-32 pb-20 min-h-screen flex items-center">
        <div className="max-w-full">
          <FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              Hi, I'm {portfolioData.name}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8">
              {portfolioData.title}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto min-h-[44px]">
                <FiMail className="mr-2" />
                Get in Touch
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[44px]">
                View Projects
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-3 sm:px-3 py-20 scroll-mt-20">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8">About Me</h2>
          <p className="text-lg sm:text-xl leading-relaxed text-foreground/80 max-w-full">
            {portfolioData.bio}
          </p>
        </ScrollReveal>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-3 sm:px-3 py-16">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {portfolioData.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container mx-auto px-3 sm:px-3 py-20 scroll-mt-20">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12">Skills & Technologies</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap gap-2 sm:gap-3 max-w-full">
            {portfolioData.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm sm:text-base px-3 sm:px-3 py-2">
                {skill}
              </Badge>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="container mx-auto px-3 sm:px-3 py-20 scroll-mt-20">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12">Experience</h2>
        </ScrollReveal>

        <div className="max-w-full space-y-8">
          {portfolioData.experience.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="border-l-2 border-primary pl-6 pb-8">
                <span className="text-sm text-muted-foreground font-semibold">
                  {exp.year}
                </span>
                <h3 className="text-2xl font-bold mt-2 mb-1">
                  {exp.role}
                </h3>
                <p className="text-lg text-primary mb-3">
                  {exp.company}
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 bg-accent/5">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">How I Work</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-full mx-auto">
          {portfolioData.process.map((step, index) => (
            <ScrollReveal key={step.step} delay={index * 0.1}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {step.step}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-3 sm:px-3 py-20 scroll-mt-20">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12">Recent Projects</h2>
        </ScrollReveal>

        <div className="space-y-16 max-w-full">
          {portfolioData.projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                  <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
                  <p className="text-foreground/80 leading-relaxed mb-6">{project.details}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="outline" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project →
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 bg-accent/5">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">What People Say</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
          {portfolioData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 0.1}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-foreground/90 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-3 sm:px-3 py-20 scroll-mt-20">
        <ScrollReveal>
          <div className="max-w-full mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              I'm always open to discussing new projects and opportunities.
            </p>

            <div className="flex flex-col gap-4 justify-center mb-12 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto min-h-[44px]">
                <FiMail className="mr-2" />
                {portfolioData.contact.email}
              </Button>
            </div>

            <div className="flex gap-6 justify-center">
              <a
                href={portfolioData.contact.github}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub className="w-8 h-8" />
              </a>
              <a
                href={portfolioData.contact.linkedin}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin className="w-8 h-8" />
              </a>
              <a
                href={portfolioData.contact.twitter}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiTwitter className="w-8 h-8" />
              </a>
            </div>
          </div>
        </ScrollReveal>
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
