"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiMail, FiGithub, FiLinkedin, FiExternalLink, FiCode, FiLayout, FiDatabase , FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { useTheme } from "next-themes";

const portfolioData = {
  name: "Taylor Morgan",
  title: "Product Designer",
  bio: "Creating digital experiences that are both beautiful and functional. I focus on user-centered design and seamless interactions. With 6+ years of experience, I've helped startups and Fortune 500 companies transform their digital presence through thoughtful design, rigorous research, and data-driven decisions.",
  stats: [
    { label: "Projects Completed", value: "120+" },
    { label: "Years Experience", value: "6+" },
    { label: "Happy Clients", value: "45+" },
    { label: "Success Rate", value: "98%" },
  ],
  process: [
    { title: "Research", desc: "Understanding user needs and business goals through interviews, surveys, and competitive analysis", icon: "🔍" },
    { title: "Design", desc: "Creating intuitive and beautiful interfaces with focus on accessibility and usability", icon: "✏️" },
    { title: "Test", desc: "Validating solutions with real users through A/B testing and usability studies", icon: "✅" },
    { title: "Iterate", desc: "Continuously improving based on feedback and analytics to optimize experience", icon: "🔄" },
    { title: "Scale", desc: "Building design systems and documentation for consistent experiences at scale", icon: "📈" },
  ],
  testimonials: [
    {
      quote: "Taylor's design thinking transformed our product. User engagement increased by 60% within 3 months of launch. Her attention to detail and user research approach is unmatched.",
      author: "Alex Chen",
      role: "CEO, TechCo",
      company: "TechCo Inc.",
      rating: 5,
    },
    {
      quote: "Professional, creative, and always delivers on time. Best designer we've worked with. Taylor brought our vision to life and exceeded all expectations.",
      author: "Sarah Kim",
      role: "Product Manager, StartupX",
      company: "StartupX",
      rating: 5,
    },
    {
      quote: "Working with Taylor was a game-changer. She reduced our user churn by 40% through thoughtful UX improvements. Highly recommend!",
      author: "Marcus Johnson",
      role: "CTO, FinanceApp",
      company: "FinanceApp",
      rating: 5,
    },
  ],
  skills: [
    {
      icon: <FiLayout className="w-6 h-6" />,
      name: "UI/UX Design",
      level: "Expert",
      percentage: 95,
      tools: ["Figma", "Sketch", "Adobe XD", "Framer"],
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      name: "Frontend Dev",
      level: "Advanced",
      percentage: 85,
      tools: ["React", "Tailwind", "TypeScript", "Next.js"],
    },
    {
      icon: <FiDatabase className="w-6 h-6" />,
      name: "Prototyping",
      level: "Expert",
      percentage: 90,
      tools: ["Framer", "Principle", "ProtoPie", "After Effects"],
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      name: "Design Systems",
      level: "Expert",
      percentage: 92,
      tools: ["Storybook", "Figma Tokens", "CSS-in-JS"],
    },
    {
      icon: <FiLayout className="w-6 h-6" />,
      name: "User Research",
      level: "Advanced",
      percentage: 88,
      tools: ["UserTesting", "Maze", "Hotjar", "Analytics"],
    },
    {
      icon: <FiDatabase className="w-6 h-6" />,
      name: "Visual Design",
      level: "Expert",
      percentage: 93,
      tools: ["Photoshop", "Illustrator", "Blender", "Cinema 4D"],
    },
  ],
  projects: [
    {
      title: "Banking App Redesign",
      description: "Complete UX overhaul of mobile banking application serving 2M+ users. Redesigned onboarding flow, account management, and payment systems with focus on accessibility and security.",
      category: "Mobile App",
      tags: ["UI/UX", "Fintech", "Accessibility"],
      color: "bg-blue-500",
      results: "40% increase in task completion, 60% faster onboarding",
      duration: "4 months",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    },
    {
      title: "E-Commerce Platform",
      description: "Modern shopping experience for premium fashion brand. Rebuilt checkout flow, implemented smart recommendations, and created seamless mobile-first experience.",
      category: "Web Design",
      tags: ["E-commerce", "React", "Conversion Optimization"],
      color: "bg-purple-500",
      results: "35% increase in conversion rate, $2M additional revenue",
      duration: "6 months",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      title: "SaaS Dashboard",
      description: "Analytics dashboard for B2B software serving enterprise clients. Complex data visualization, customizable widgets, and real-time collaboration features.",
      category: "Web App",
      tags: ["SaaS", "Data Viz", "Enterprise"],
      color: "bg-green-500",
      results: "50% reduction in support tickets, 90 NPS score",
      duration: "8 months",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    },
    {
      title: "Fitness Tracking App",
      description: "Health and wellness mobile application with AI-powered workout recommendations, social features, and integration with popular wearables.",
      category: "Mobile App",
      tags: ["Health", "IoT", "AI/ML"],
      color: "bg-orange-500",
      results: "500K downloads in first 3 months, 4.8★ rating",
      duration: "5 months",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
    },
    {
      title: "Design System",
      description: "Comprehensive component library for enterprise products. Built scalable design tokens, 100+ components, and complete documentation for engineering teams.",
      category: "System",
      tags: ["Components", "Figma", "Storybook"],
      color: "bg-pink-500",
      results: "70% faster design-to-dev handoff, used across 15 products",
      duration: "12 months",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    },
    {
      title: "Travel Booking Site",
      description: "Seamless booking experience for modern travelers. Smart search, personalized recommendations, and streamlined checkout process.",
      category: "Web Design",
      tags: ["Travel", "UX", "Personalization"],
      color: "bg-cyan-500",
      results: "45% increase in bookings, 25% higher average order value",
      duration: "4 months",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
    },
    {
      title: "Meditation App",
      description: "Mindfulness and meditation app with guided sessions, mood tracking, and community features. Focus on calming design and accessibility.",
      category: "Mobile App",
      tags: ["Wellness", "Audio", "Community"],
      color: "bg-indigo-500",
      results: "1M+ downloads, featured by Apple and Google",
      duration: "6 months",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    },
    {
      title: "Real Estate Platform",
      description: "Property search and virtual tour platform. 3D walkthroughs, AR visualization, and smart matching algorithm.",
      category: "Web App",
      tags: ["PropTech", "3D", "AR"],
      color: "bg-teal-500",
      results: "300% increase in property views, 55% faster sales cycle",
      duration: "7 months",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    },
    {
      title: "Food Delivery App",
      description: "On-demand food delivery platform with live tracking, smart recommendations, and seamless checkout. Built for scale.",
      category: "Mobile App",
      tags: ["Food Tech", "Real-time", "Maps"],
      color: "bg-red-500",
      results: "2M orders in first year, 95% customer satisfaction",
      duration: "8 months",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop",
    },
    {
      title: "Crypto Wallet",
      description: "Secure cryptocurrency wallet with multi-chain support, DeFi integration, and intuitive portfolio management.",
      category: "Web App",
      tags: ["Crypto", "Web3", "Security"],
      color: "bg-yellow-500",
      results: "$500M in managed assets, 99.9% uptime",
      duration: "10 months",
      image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&h=600&fit=crop",
    },
  ],
  awards: [
    { title: "Awwwards Site of the Day", year: "2024" },
    { title: "CSS Design Awards Winner", year: "2023" },
    { title: "Best UI/UX Designer", year: "2023" },
  ],
  services: [
    {
      title: "Product Design",
      description: "End-to-end product design from research to delivery",
      price: "From $5,000",
      features: ["User Research", "Wireframing", "Prototyping", "UI Design", "Testing"],
    },
    {
      title: "Design Systems",
      description: "Scalable design systems and component libraries",
      price: "From $8,000",
      features: ["Design Tokens", "Component Library", "Documentation", "Figma Setup", "Training"],
    },
    {
      title: "UX Consulting",
      description: "Strategic UX consulting and audits",
      price: "From $2,000",
      features: ["UX Audit", "Strategy", "Recommendations", "Roadmap", "Training"],
    },
  ],
  experience: [
    {
      year: "2024 - Present",
      title: "Senior Product Designer",
      company: "Tech Innovators Inc.",
      description: "Leading design for enterprise SaaS products serving 10M+ users. Built design system adopted across 5 product teams.",
      achievements: ["Reduced design-to-dev time by 60%", "Increased user satisfaction by 45%", "Led team of 8 designers"],
    },
    {
      year: "2021 - 2024",
      title: "Lead Designer",
      company: "StartupX",
      description: "Led complete product redesign resulting in $5M additional revenue. Established design practice from ground up.",
      achievements: ["Grew design team from 1 to 5", "Won 3 industry awards", "100% project success rate"],
    },
    {
      year: "2019 - 2021",
      title: "Product Designer",
      company: "Creative Agency Co.",
      description: "Designed digital products for Fortune 500 clients. Specialized in mobile-first experiences and e-commerce.",
      achievements: ["Delivered 50+ projects", "95% client retention", "Mentored 3 junior designers"],
    },
  ],
  clients: ["Apple", "Google", "Microsoft", "Amazon", "Meta", "Netflix", "Spotify", "Adobe", "Salesforce", "Tesla", "Nike", "Airbnb"],
  blogPosts: [
    {
      title: "10 UX Principles That Actually Matter",
      excerpt: "After 6 years in product design, these are the principles that consistently deliver results in real-world projects.",
      date: "2024-10-15",
      readTime: "5 min read",
      category: "UX Design",
    },
    {
      title: "Building Design Systems That Scale",
      excerpt: "Lessons learned from building design systems used by teams of 50+ designers and 200+ developers.",
      date: "2024-09-22",
      readTime: "8 min read",
      category: "Design Systems",
    },
    {
      title: "The Future of AI in Design",
      excerpt: "How AI tools are transforming the design process and what it means for designers in 2025 and beyond.",
      date: "2024-08-30",
      readTime: "6 min read",
      category: "AI & Design",
    },
  ],
  tools: {
    design: ["Figma", "Sketch", "Adobe XD", "Adobe Illustrator", "Adobe Photoshop", "Framer"],
    prototyping: ["Framer", "ProtoPie", "Principle", "After Effects", "Origami Studio"],
    development: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML/CSS"],
    collaboration: ["Slack", "Notion", "Miro", "FigJam", "Linear", "GitHub"],
    research: ["UserTesting", "Maze", "Hotjar", "Amplitude", "Mixpanel", "Google Analytics"],
  },
  achievements: [
    { icon: "🏆", title: "15+ Industry Awards", desc: "Recognized by Awwwards, CSS Design Awards, and more" },
    { icon: "👥", title: "50+ Happy Clients", desc: "Maintained 98% client satisfaction rate" },
    { icon: "💰", title: "$50M+ Revenue Impact", desc: "Design work directly contributed to client revenue" },
    { icon: "📈", title: "120+ Successful Projects", desc: "100% on-time delivery rate over 6 years" },
  ],
};

export function CardModularTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const darkMode = theme === 'dark';
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

            <a href="#about" className="text-sm hover:text-primary transition-colors">
              About
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
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Card */}
      <section className="container mx-auto px-3 sm:px-3 pt-32 pb-12">
        <FadeIn>
          <Card className="max-w-full mx-auto">
            <CardHeader className="text-center pb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold">
                {portfolioData.name.split(" ").map(n => n[0]).join("")}
              </div>
              <CardTitle className="text-5xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 break-words text-white">
                {portfolioData.name}
              </CardTitle>
              <CardDescription className="text-2xl text-gray-900">
                {portfolioData.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground mb-8 max-w-full mx-auto">
                {portfolioData.bio}
              </p>
              <Button size="lg">
                <FiMail className="mr-2" />
                Get in Touch
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      {/* Stats Cards */}
      <section className="container mx-auto px-3 sm:px-3 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-full mx-auto">
          {portfolioData.stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <Card className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="about" className="container mx-auto px-3 sm:px-3 py-12">
        <ScrollReveal>
          <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Skills & Expertise
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full mx-auto">
          {portfolioData.skills.map((skill, index) => (
            <ScrollReveal key={skill.name} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                    {skill.icon}
                  </div>
                  <CardTitle>{skill.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">{skill.level}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1 text-foreground">
                      <span className="text-muted-foreground">Proficiency</span>
                      <span className="font-semibold">{skill.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-1000"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.map((tool) => (
                      <Badge key={tool} variant="outline" className="text-xs text-gray-900">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="container mx-auto px-3 sm:px-3 py-12">
        <ScrollReveal>
          <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Featured Projects
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full mx-auto">
          {portfolioData.projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.05}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FiExternalLink className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    {project.category}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Results */}
                  {project.results && (
                    <div className="text-sm font-semibold text-primary">
                      {project.results}
                    </div>
                  )}

                  {/* Duration */}
                  {project.duration && (
                    <div className="text-xs text-muted-foreground">
                      Duration: {project.duration}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs text-gray-900">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process Cards */}
      <section className="container mx-auto px-3 sm:px-3 py-20">
        <ScrollReveal>
          <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            My Process
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-6 max-w-full mx-auto">
          {portfolioData.process.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 border-t">
        <ScrollReveal>
          <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Awards & Recognition
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full mx-auto">
          {portfolioData.awards.map((award, index) => (
            <ScrollReveal key={award.title} delay={index * 0.1}>
              <Card className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">🏆</div>
                  <h3 className="font-bold mb-1 text-gray-900">{award.title}</h3>
                  <p className="text-sm text-muted-foreground">{award.year}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 border-t">
        <ScrollReveal>
          <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Services
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full mx-auto">
          {portfolioData.services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-4">
                    {service.price}
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2 text-gray-900">
                        <span className="text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6">Get Started</Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials Cards */}
      <section className="container mx-auto px-3 sm:px-3 py-20 border-t">
        <ScrollReveal>
          <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            What Clients Say
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full mx-auto">
          {portfolioData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.author} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  <p className="text-lg italic mb-6 text-gray-900">"{testimonial.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 border-t">
        <ScrollReveal>
          <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Experience & Journey
          </h2>
        </ScrollReveal>

        <div className="max-w-full mx-auto space-y-8">
          {portfolioData.experience.map((exp, index) => (
            <ScrollReveal key={exp.company} delay={index * 0.1}>
              <Card className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <Badge className="mb-2">{exp.year}</Badge>
                      <h3 className="text-2xl font-bold mb-1 text-gray-900">{exp.title}</h3>
                      <p className="text-primary font-semibold">{exp.company}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-900">Key Achievements:</p>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2 text-gray-900">
                          <span className="text-primary mt-1">✓</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 border-t bg-muted/20">
        <ScrollReveal>
          <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Achievements & Impact
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-full mx-auto">
          {portfolioData.achievements.map((achievement, index) => (
            <ScrollReveal key={achievement.title} delay={index * 0.1}>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{achievement.icon}</div>
                  <h3 className="font-bold mb-2 text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Clients Logo Grid */}
      <section className="container mx-auto px-3 sm:px-3 py-20 border-t">
        <ScrollReveal>
          <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
            Trusted By Leading Brands
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-full mx-auto">
            I've had the privilege of working with some of the world's most innovative companies
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-full mx-auto">
          {portfolioData.clients.map((client, index) => (
            <ScrollReveal key={client} delay={index * 0.05}>
              <Card className="hover:shadow-lg transition-all hover:scale-105">
                <CardContent className="p-6 flex items-center justify-center h-24">
                  <span className="font-bold text-lg text-muted-foreground hover:text-foreground transition-colors">
                    {client}
                  </span>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 border-t bg-muted/20">
        <ScrollReveal>
          <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
            Latest Insights
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-full mx-auto">
            Thoughts on design, technology, and building great products
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full mx-auto">
          {portfolioData.blogPosts.map((post, index) => (
            <ScrollReveal key={post.title} delay={index * 0.1}>
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs text-gray-900">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <Button variant="ghost" size="sm" className="group-hover:gap-2 transition-all">
                    Read More
                    <FiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Tools & Technologies Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 border-t">
        <ScrollReveal>
          <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Tools & Technologies
          </h2>
        </ScrollReveal>

        <div className="max-w-full mx-auto space-y-8">
          {Object.entries(portfolioData.tools).map(([category, tools], index) => (
            <ScrollReveal key={category} delay={index * 0.1}>
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {tools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="px-3 py-2 text-sm text-gray-900">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Newsletter Signup Card */}
      <section className="container mx-auto px-3 sm:px-3 py-20 border-t bg-muted/20">
        <ScrollReveal>
          <Card className="max-w-full mx-auto bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
            <CardContent className="p-12 text-center">
              <div className="text-4xl mb-4">📬</div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Stay Updated</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get design insights, tips, and updates delivered to your inbox monthly
              </p>
              <div className="flex flex-col gap-4 sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-3 rounded-lg border bg-background"
                />
                <Button size="lg" className="whitespace-nowrap">
                  Subscribe Now
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Join 5,000+ designers receiving monthly insights
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* Contact Card */}
      <section id="contact" className="container mx-auto px-3 sm:px-3 py-20">
        <ScrollReveal>
          <Card className="max-w-full mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl sm:text-5xl font-bold mb-4 break-words text-gray-900">
                Let's Connect
              </CardTitle>
              <CardDescription className="text-lg text-gray-900">
                I'm always open to discussing new projects, creative ideas, or opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row gap-4 justify-center">
                <Button size="lg" className="w-full sm:w-auto min-h-[44px]">
                  <FiMail className="mr-2" />
                  Email Me
                </Button>
                <Button variant="outline" size="lg" className={`w-full sm:w-auto min-h-[44px] ! ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Download Resume
                </Button>
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <Button variant="ghost" size="icon" aria-label="GitHub Profile">
                  <FiGithub className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="LinkedIn Profile">
                  <FiLinkedin className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-3">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {n:"Basic",p:"$99",f:["5 Projects","Basic Support","1 User"]},
              {n:"Pro",p:"$299",f:["Unlimited Projects","Priority Support","5 Users","Advanced Features"]},
              {n:"Enterprise",p:"Custom",f:["Custom Solutions","24/7 Support","Unlimited Users","Dedicated Manager"]}
            ].map((plan,i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.n}</h3>
                <div className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{plan.p}</div>
                <ul className="space-y-2">{plan.f.map((f,j) => <li key={j} className="text-sm text-gray-900">✓ {f}</li>)}</ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-3 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => (
              <Card key={i} className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20"></Card>
            ))}
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
