"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiMail, FiCalendar, FiClock , FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "Olivia Chen",
  title: "Content Strategist & Writer",
  intro: "I help brands tell their stories through thoughtful, engaging content. With 10+ years of experience in content strategy, I've worked with Fortune 500 companies and startups alike to create content that ranks, resonates, and drives real business results.",
  bio: "Award-winning content strategist with a background in journalism and digital marketing. Published in The New York Times, Forbes, and Wired. Former content lead at two unicorn startups. Now helping businesses scale their content operations with strategic frameworks and SEO-optimized storytelling.",
  stats: [
    { number: "500+", label: "Articles Published" },
    { number: "50M+", label: "Words Written" },
    { number: "10+", label: "Years Experience" },
    { number: "85%", label: "Avg Traffic Increase" },
  ],
  expertise: [
    { topic: "Content Strategy", count: "150+ articles" },
    { topic: "SEO & Search", count: "120+ articles" },
    { topic: "Digital Marketing", count: "100+ articles" },
    { topic: "Brand Storytelling", count: "80+ articles" },
    { topic: "Growth Hacking", count: "50+ articles" },
  ],
  publications: ["The New York Times", "Forbes", "Wired", "TechCrunch", "Harvard Business Review", "Medium"],
  articles: [
    {
      title: "The Art of Storytelling in Modern Marketing",
      excerpt: "In today's digital landscape, brands that tell authentic stories win hearts and minds. Here's how to craft narratives that resonate with your audience and drive meaningful engagement.",
      date: "January 15, 2024",
      readTime: "8 min read",
      tags: ["Marketing", "Storytelling", "Strategy"],
      featured: true,
    },
    {
      title: "Content Strategy for Sustainable Growth",
      excerpt: "Building a content strategy isn't about quick wins—it's about creating sustainable systems that grow with your business. Learn the frameworks that drive long-term success.",
      date: "December 20, 2023",
      readTime: "12 min read",
      tags: ["Strategy", "Growth", "Content"],
      featured: true,
    },
    {
      title: "Why Every Brand Needs a Content Audit",
      excerpt: "A content audit isn't just housekeeping—it's strategic intelligence. Discover how auditing your content can reveal hidden opportunities and optimize your entire content ecosystem.",
      date: "November 8, 2023",
      readTime: "10 min read",
      tags: ["SEO", "Audit", "Optimization"],
      featured: false,
    },
    {
      title: "Building Authority Through Long-Form Content",
      excerpt: "Deep-dive articles don't just rank better—they establish your brand as a thought leader. Here's how to create comprehensive content that builds trust and drives conversions.",
      date: "October 5, 2023",
      readTime: "15 min read",
      tags: ["SEO", "Authority", "Content"],
      featured: false,
    },
  ],
  caseStudies: [
    {
      client: "TechStartup Inc.",
      challenge: "New SaaS company with zero organic traffic and no content presence.",
      solution: "Developed comprehensive content strategy targeting high-intent keywords, created 50+ SEO-optimized articles, built internal linking structure.",
      results: "300% increase in organic traffic in 6 months, ranking #1 for 15 target keywords, 120+ qualified leads per month from content.",
      metrics: { traffic: "+300%", keywords: "15 #1 rankings", leads: "120/mo" },
    },
    {
      client: "E-commerce Brand",
      challenge: "High bounce rate and low conversion on product pages. Content wasn't compelling or optimized.",
      solution: "Rewrote 200+ product descriptions with SEO + persuasive copywriting, created category page content, implemented schema markup.",
      results: "45% reduction in bounce rate, 75% increase in organic revenue, improved conversion rate by 28%.",
      metrics: { bounce: "-45%", revenue: "+75%", conversion: "+28%" },
    },
  ],
  testimonials: [
    {
      name: "David Park",
      role: "CEO, TechStartup Inc.",
      quote: "Olivia's content strategy transformed our entire business. We went from invisible to ranking #1 for our most important keywords. Her work directly contributed to our Series A raise.",
    },
    {
      name: "Sarah Martinez",
      role: "Marketing Director, E-commerce Brand",
      quote: "The ROI on Olivia's work was immediate and substantial. She doesn't just write—she understands business, SEO, and what makes customers buy.",
    },
  ],
  process: [
    { step: "Research", desc: "Deep dive into your audience, competitors, and keyword opportunities" },
    { step: "Strategy", desc: "Create data-driven content plan aligned with business goals" },
    { step: "Creation", desc: "Write SEO-optimized, compelling content that ranks and converts" },
    { step: "Optimization", desc: "Track performance, iterate, and continuously improve results" },
  ],
  services: [
    {
      title: "Content Strategy",
      description: "Comprehensive content planning, from audience research to editorial calendars, designed to align with your business goals and drive measurable results. Includes keyword research, competitive analysis, and content gap identification.",
    },
    {
      title: "SEO Copywriting",
      description: "Compelling copy that converts AND ranks. Website content, blog articles, landing pages, and more—written with strategic keyword integration, semantic SEO, and persuasive storytelling that resonates with both search engines and humans.",
    },
    {
      title: "Content Audits",
      description: "In-depth analysis of your existing content to identify opportunities, fix SEO issues, and maximize ROI. Includes technical SEO review, content gap analysis, and actionable optimization roadmap.",
    },
  ],
};

export function TextHeavyTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-3 sm:px-3 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Gallery
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">

            <a href="#about" className="text-sm hover:text-primary transition-colors">
              About
            </a>
            <a href="#articles" className="text-sm hover:text-primary transition-colors">
              Articles
            </a>
            <a href="#case-studies" className="text-sm hover:text-primary transition-colors">
              Case Studies
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
                href="#articles"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Articles
              </a>
              <a
                href="#case-studies"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
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

      {/* Hero Section */}
      <section className="container mx-auto px-3 sm:px-3 pt-32 pb-20 max-w-full">
        <FadeIn>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
            {portfolioData.name}
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8 font-serif">
            {portfolioData.title}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-xl leading-relaxed text-foreground/90 mb-8">
            {portfolioData.intro}
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Button variant="outline" size="lg">
            <FiMail className="mr-2" />
            Work with Me
          </Button>
        </FadeIn>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-3 sm:px-3 py-16 max-w-full border-y">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {portfolioData.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-serif">
                  {stat.number}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-3 sm:px-3 py-20 max-w-full">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            About
          </h2>
          <p className="text-xl leading-relaxed text-foreground/90 mb-8">
            {portfolioData.bio}
          </p>
        </ScrollReveal>

        {/* Publications */}
        <ScrollReveal delay={0.2}>
          <h3 className="text-2xl font-bold mb-4">Published In</h3>
          <div className="flex flex-wrap gap-3">
            {portfolioData.publications.map((pub) => (
              <Badge key={pub} variant="outline" className="text-base py-2 px-3">
                {pub}
              </Badge>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Expertise Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 max-w-full bg-accent/5">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            Writing Expertise
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          {portfolioData.expertise.map((item, index) => (
            <ScrollReveal key={item.topic} delay={index * 0.1}>
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-bold">{item.topic}</h3>
                <span className="text-muted-foreground">{item.count}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="container mx-auto px-3 sm:px-3 py-20 max-w-full">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">
            Recent Articles
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          {portfolioData.articles.map((article, index) => (
            <ScrollReveal key={article.title} delay={index * 0.1}>
              <article className="border-b pb-12 last:border-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 hover:text-primary transition-colors cursor-pointer">
                  {article.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>

                <p className="text-lg leading-relaxed text-foreground/80 mb-4">
                  {article.excerpt}
                </p>

                <Button variant="link" className="p-0 h-auto font-semibold">
                  Read More →
                </Button>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-3 sm:px-3 py-20 max-w-full">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">
            Services
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          {portfolioData.services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <div className="border-l-4 border-primary pl-6 py-2">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  {service.title}
                </h3>
                <p className="text-lg leading-relaxed text-foreground/80">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="container mx-auto px-3 sm:px-3 py-20 max-w-full">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">
            Case Studies
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          {portfolioData.caseStudies.map((study, index) => (
            <ScrollReveal key={study.client} delay={index * 0.1}>
              <article className="border-l-4 border-primary pl-6">
                <h3 className="text-3xl font-bold mb-4">{study.client}</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold mb-2">Challenge</h4>
                    <p className="text-foreground/80 leading-relaxed">{study.challenge}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-2">Solution</h4>
                    <p className="text-foreground/80 leading-relaxed">{study.solution}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-2">Results</h4>
                    <p className="text-foreground/80 leading-relaxed mb-4">{study.results}</p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-6 mt-4">
                      {Object.entries(study.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-primary font-serif">
                            {value as string}
                          </div>
                          <p className="text-xs text-muted-foreground uppercase">
                            {key}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 max-w-full bg-accent/5">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center">
            My Process
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {portfolioData.process.map((step, index) => (
            <ScrollReveal key={step.step} delay={index * 0.1}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-primary flex items-center justify-center text-2xl font-bold">
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

      {/* Testimonials Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 max-w-full">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">
            Client Testimonials
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          {portfolioData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 0.1}>
              <blockquote className="border-l-4 border-primary pl-6 py-4">
                <p className="text-xl leading-relaxed text-foreground/90 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <footer>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-3 sm:px-3 py-20 max-w-full">
        <ScrollReveal>
          <div className="border-t pt-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Let's Start a Conversation
            </h2>
            <p className="text-xl leading-relaxed text-foreground/80 mb-8">
              Whether you need a content strategy overhaul, ongoing copywriting support, or a one-time project, I'd love to hear about your goals and explore how we can work together.
            </p>
            <Button size="lg">
              <FiMail className="mr-2" />
              hello@oliviachen.com
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* Pricing - Text-Heavy Style */}
      <section className="py-20 px-3 border-t">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-8">Services & Pricing</h2>
            <div className="prose prose-lg max-w-none space-y-8">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-2xl font-bold mb-2">Consulting - $200/hour</h3>
                <p className="text-muted-foreground">Strategic guidance, code review, and technical advisory services for your projects.</p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-2xl font-bold mb-2">Project Work - $5K-$20K</h3>
                <p className="text-muted-foreground">Full-stack development from concept to deployment. Fixed-price or milestone-based billing available.</p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-2xl font-bold mb-2">Retainer - $3K/month</h3>
                <p className="text-muted-foreground">Ongoing development support with priority access and dedicated hours each month.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline - Text Format */}
      <section className="py-20 px-3 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-12">Professional Timeline</h2>
            <div className="space-y-12">
              {[
                {y:"2024",t:"Lead Engineer",c:"Tech Startup",d:"Leading full-stack development team building scalable web applications."},
                {y:"2022",t:"Senior Developer",c:"Digital Agency",d:"Architected and delivered 15+ client projects using React and Node.js."},
                {y:"2020",t:"Full-Stack Developer",c:"SaaS Company",d:"Built core features for B2B platform serving 10,000+ users."},
                {y:"2018",t:"Junior Developer",c:"Web Studio",d:"Gained foundation in modern web development and agile methodologies."}
              ].map((item,i) => (
                <div key={i} className="relative pl-8 border-l-2 border-muted-foreground/20">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="text-sm font-mono text-muted-foreground mb-2">{item.y}</div>
                  <h3 className="text-xl font-bold mb-1">{item.t}</h3>
                  <div className="text-lg text-muted-foreground mb-2">{item.c}</div>
                  <p className="text-muted-foreground leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-3 sm:px-3 max-w-full">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              This website uses semantic HTML and is optimized for SEO.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
