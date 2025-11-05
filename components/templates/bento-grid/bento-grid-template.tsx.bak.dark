"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiMail, FiGithub, FiLinkedin, FiCode, FiLayers, FiZap, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "Riley Chen",
  title: "Product Designer & Developer",
  location: "San Francisco, CA",
  availability: "Available for Projects",
  bio: "I design and build digital experiences that blend creativity with code. From mobile apps to web platforms, I turn ideas into products people love to use. With 5+ years across design and development, I bring a unique perspective that bridges the gap between beautiful interfaces and robust functionality.",
  stats: [
    { label: "Projects", value: "100+", icon: <FiLayers /> },
    { label: "Clients", value: "50+", icon: <FiTrendingUp /> },
    { label: "Years", value: "5+", icon: <FiZap /> },
    { label: "Countries", value: "15", icon: <FiCode /> },
  ],
  skills: ["UI/UX Design", "React", "Figma", "TypeScript", "Tailwind", "Node.js", "Framer Motion", "Design Systems", "Three.js", "GSAP", "Python", "Product Strategy"],
  projects: [
    {
      title: "Banking Revolution",
      description: "Redesigned mobile banking experience for 2M+ users, increasing engagement by 60%",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      featured: true,
      metrics: "60% engagement increase",
    },
    {
      title: "E-Commerce Platform",
      description: "Analytics dashboard for online retailers with real-time insights",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      featured: false,
      metrics: "$2M revenue impact",
    },
    {
      title: "Fitness Tracking App",
      description: "iOS app with 500K+ downloads and 4.8★ rating",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop",
      featured: false,
      metrics: "500K+ downloads",
    },
    {
      title: "Travel Booking Site",
      description: "Seamless booking experience with AI recommendations",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
      featured: false,
      metrics: "3M active users",
    },
    {
      title: "SaaS Dashboard",
      description: "Enterprise analytics platform with customizable widgets",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      featured: false,
      metrics: "95 NPS score",
    },
    {
      title: "Food Delivery App",
      description: "On-demand delivery with live tracking and smart recommendations",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
      featured: false,
      metrics: "2M orders/year",
    },
  ],
  testimonials: [
    {
      quote: "Riley's attention to detail and creative solutions elevated our product significantly. User engagement increased by 70%.",
      author: "Sarah Johnson",
      role: "CEO, TechStart",
      rating: 5,
    },
    {
      quote: "Best designer we've worked with. Delivered beyond expectations every single time.",
      author: "Marcus Wong",
      role: "CTO, FinanceApp",
      rating: 5,
    },
    {
      quote: "Riley doesn't just design - they think strategically about business impact and user needs.",
      author: "Elena Rodriguez",
      role: "Product Lead, Enterprise Co.",
      rating: 5,
    },
  ],
  timeline: [
    { year: "2024", event: "Senior Product Designer at Tech Giant", icon: "🚀" },
    { year: "2022", event: "Founded Design Studio", icon: "🎨" },
    { year: "2020", event: "Lead Designer at Startup", icon: "💼" },
    { year: "2019", event: "Started Freelancing", icon: "✨" },
  ],
  services: [
    { title: "Product Design", desc: "End-to-end product design from research to delivery", icon: "🎨" },
    { title: "Frontend Development", desc: "React, Next.js, and modern web technologies", icon: "⚡" },
    { title: "Design Systems", desc: "Scalable component libraries and guidelines", icon: "🎯" },
  ],
  achievements: [
    { title: "Awwwards SOTD", year: "2024", icon: "🏆" },
    { title: "CSS Design Award", year: "2023", icon: "🥇" },
    { title: "Best Mobile App", year: "2023", icon: "📱" },
  ],
  blogPosts: [
    { title: "10 UX Principles That Actually Work", category: "UX", readTime: "5 min" },
    { title: "Building Design Systems at Scale", category: "Systems", readTime: "8 min" },
    { title: "The Future of AI in Design", category: "AI", readTime: "6 min" },
  ],
  tools: ["Figma", "React", "TypeScript", "Tailwind", "Framer", "Three.js"],
  socialProof: {
    followers: "15K",
    articles: "50+",
    talks: "20+",
    mentees: "30+",
  },
};

export function BentoGridTemplate() {
  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-3 max-w-full py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back
          </Link>
          <a href="#contact" className="text-sm hover:text-primary transition-colors">
            Contact
          </a>
        </div>
      </nav>

      {/* Bento Grid Layout */}
      <div className="container mx-auto px-3 max-w-full pt-24 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-full mx-auto">

          {/* Hero Card - Large */}
          <ScrollReveal className="md:col-span-4 lg:col-span-4 md:row-span-2">
            <Card className="h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 overflow-hidden">
              <CardContent className="p-8 md:p-12 h-full flex flex-col justify-between">
                <div>
                  <Badge className="mb-4 bg-white/20 text-white border-0">
                    {portfolioData.availability}
                  </Badge>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight break-words text-gray-900">
                    {portfolioData.name}
                  </h1>
                  <p className="text-xl sm:text-2xl md:text-3xl mb-6 opacity-90 text-gray-900">
                    {portfolioData.title}
                  </p>
                  <p className="text-lg opacity-80 mb-8 text-gray-900">
                    📍 {portfolioData.location}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" variant="secondary">
                    <FiMail className="mr-2" />
                    Get in Touch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Stats Card 1 */}
          <ScrollReveal delay={0.1} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                  {portfolioData.stats[0].icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">{portfolioData.stats[0].value}</div>
                <div className="text-sm text-muted-foreground">{portfolioData.stats[0].label}</div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Stats Card 2 */}
          <ScrollReveal delay={0.15} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                  {portfolioData.stats[1].icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">{portfolioData.stats[1].value}</div>
                <div className="text-sm text-muted-foreground">{portfolioData.stats[1].label}</div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Featured Project - Large */}
          <ScrollReveal delay={0.2} className="md:col-span-4 lg:col-span-4 md:row-span-2">
            <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="h-48 md:h-64 overflow-hidden">
                <img
                  src={portfolioData.projects[0].image}
                  alt={portfolioData.projects[0].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <Badge className="w-fit mb-2">Featured</Badge>
                <CardTitle className="text-2xl text-gray-900">{portfolioData.projects[0].title}</CardTitle>
                <CardDescription className="text-base text-gray-900">
                  {portfolioData.projects[0].description}
                </CardDescription>
              </CardHeader>
            </Card>
          </ScrollReveal>

          {/* Stats Card 3 */}
          <ScrollReveal delay={0.2} className="md:col-span-2 lg:col-span-1">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                  {portfolioData.stats[2].icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">{portfolioData.stats[2].value}</div>
                <div className="text-sm text-muted-foreground">{portfolioData.stats[2].label}</div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Stats Card 4 */}
          <ScrollReveal delay={0.25} className="md:col-span-2 lg:col-span-1">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-400">
                  {portfolioData.stats[3].icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">{portfolioData.stats[3].value}</div>
                <div className="text-sm text-muted-foreground">{portfolioData.stats[3].label}</div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* About Card - Wide */}
          <ScrollReveal delay={0.3} className="md:col-span-4 lg:col-span-4">
            <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">About Me</h3>
                <p className="text-lg leading-relaxed text-white">{portfolioData.bio}</p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Timeline Card - Tall */}
          <ScrollReveal delay={0.35} className="md:col-span-2 lg:col-span-2 md:row-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {portfolioData.timeline.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="text-3xl">{item.icon}</div>
                      <div>
                        <div className="text-sm font-bold text-primary">{item.year}</div>
                        <div className="text-sm text-gray-900">{item.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Project 2 - Medium */}
          <ScrollReveal delay={0.4} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="h-32 overflow-hidden">
                <img
                  src={portfolioData.projects[1].image}
                  alt={portfolioData.projects[1].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-gray-900">{portfolioData.projects[1].title}</CardTitle>
                <CardDescription className="text-sm text-gray-900">
                  {portfolioData.projects[1].description}
                </CardDescription>
              </CardHeader>
            </Card>
          </ScrollReveal>

          {/* Project 3 - Medium */}
          <ScrollReveal delay={0.45} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="h-32 overflow-hidden">
                <img
                  src={portfolioData.projects[2].image}
                  alt={portfolioData.projects[2].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-gray-900">{portfolioData.projects[2].title}</CardTitle>
                <CardDescription className="text-sm text-gray-900">
                  {portfolioData.projects[2].description}
                </CardDescription>
              </CardHeader>
            </Card>
          </ScrollReveal>

          {/* Services Card - Wide */}
          <ScrollReveal delay={0.5} className="md:col-span-4 lg:col-span-4">
            <Card className="h-full bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 border-cyan-200 dark:border-cyan-800">
              <CardHeader>
                <CardTitle>What I Do</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {portfolioData.services.map((service, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-bold text-lg text-gray-900">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Skills Card */}
          <ScrollReveal delay={0.25} className="md:col-span-4 lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <FiCode className="text-primary" />
                  Skills & Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Testimonials Card - Wide */}
          <ScrollReveal delay={0.55} className="md:col-span-4 lg:col-span-6">
            <Card className="h-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle>Client Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {portfolioData.testimonials.map((testimonial, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-500">★</span>
                        ))}
                      </div>
                      <p className="text-sm italic text-gray-900">"{testimonial.quote}"</p>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{testimonial.author}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* More Projects */}
          <ScrollReveal delay={0.6} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="h-32 overflow-hidden">
                <img
                  src={portfolioData.projects[3].image}
                  alt={portfolioData.projects[3].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-gray-900">{portfolioData.projects[3].title}</CardTitle>
                <CardDescription className="text-sm text-gray-900">{portfolioData.projects[3].description}</CardDescription>
                <Badge className="mt-2 w-fit" variant="secondary">{portfolioData.projects[3].metrics}</Badge>
              </CardHeader>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.65} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="h-32 overflow-hidden">
                <img
                  src={portfolioData.projects[4].image}
                  alt={portfolioData.projects[4].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-gray-900">{portfolioData.projects[4].title}</CardTitle>
                <CardDescription className="text-sm text-gray-900">{portfolioData.projects[4].description}</CardDescription>
                <Badge className="mt-2 w-fit" variant="secondary">{portfolioData.projects[4].metrics}</Badge>
              </CardHeader>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.7} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="h-32 overflow-hidden">
                <img
                  src={portfolioData.projects[5].image}
                  alt={portfolioData.projects[5].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-gray-900">{portfolioData.projects[5].title}</CardTitle>
                <CardDescription className="text-sm text-gray-900">{portfolioData.projects[5].description}</CardDescription>
                <Badge className="mt-2 w-fit" variant="secondary">{portfolioData.projects[5].metrics}</Badge>
              </CardHeader>
            </Card>
          </ScrollReveal>

          {/* Achievements Card */}
          <ScrollReveal delay={0.75} className="md:col-span-4 lg:col-span-3">
            <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle>Awards & Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.achievements.map((achievement, index) => (
                    <div key={index} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <div className="font-semibold">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">{achievement.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Blog Posts Card */}
          <ScrollReveal delay={0.8} className="md:col-span-4 lg:col-span-3">
            <Card className="h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle>Latest Writing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.blogPosts.map((post, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <Badge variant="secondary" className="text-xs text-gray-900">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-gray-900">{post.title}</h4>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Social Proof Card */}
          <ScrollReveal delay={0.85} className="md:col-span-4 lg:col-span-6">
            <Card className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">{portfolioData.socialProof.followers}</div>
                    <div className="text-sm opacity-90 text-white">Followers</div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">{portfolioData.socialProof.articles}</div>
                    <div className="text-sm opacity-90 text-white">Articles</div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">{portfolioData.socialProof.talks}</div>
                    <div className="text-sm opacity-90 text-white">Talks</div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">{portfolioData.socialProof.mentees}</div>
                    <div className="text-sm opacity-90 text-white">Mentees</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Process/Methodology Bento Cards */}
          <ScrollReveal delay={0.9} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950 dark:to-orange-950 border-rose-200 dark:border-rose-800">
              <CardContent className="p-6">
                <div className="text-4xl mb-3 text-white">01</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Research</h3>
                <p className="text-sm text-muted-foreground">Understanding user needs and goals</p>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.95} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-950 dark:to-cyan-950 border-sky-200 dark:border-sky-800">
              <CardContent className="p-6">
                <div className="text-4xl mb-3 text-white">02</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Design</h3>
                <p className="text-sm text-muted-foreground">Creating beautiful solutions</p>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={1.0} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 border-violet-200 dark:border-violet-800">
              <CardContent className="p-6">
                <div className="text-4xl mb-3 text-white">03</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Build</h3>
                <p className="text-sm text-muted-foreground">Bringing ideas to life</p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Tools Showcase Bento */}
          <ScrollReveal delay={1.05} className="md:col-span-4 lg:col-span-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <FiCode className="text-primary" />
                  Tools I Use Daily
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.tools.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-sm text-gray-900">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Newsletter Bento Card */}
          <ScrollReveal delay={1.1} className="md:col-span-4 lg:col-span-4 md:row-span-2">
            <Card className="h-full bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-950 dark:to-rose-950 border-pink-200 dark:border-pink-800">
              <CardContent className="p-8 flex flex-col justify-center h-full">
                <div className="text-5xl mb-4">📬</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Stay in the Loop</h3>
                <p className="text-muted-foreground mb-6">
                  Get design tips, project updates, and exclusive content delivered monthly
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 rounded-lg border bg-white/50 dark:bg-black/50"
                  />
                  <Button>Subscribe</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Join 5,000+ subscribers</p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Video/Demo Bento */}
          <ScrollReveal delay={1.15} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 border-amber-200 dark:border-amber-800 overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-3">🎥</div>
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Watch Demo</h3>
                <p className="text-sm text-muted-foreground">See my work in action</p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Availability Bento */}
          <ScrollReveal delay={1.2} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-6 text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-3 animate-pulse"></div>
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{portfolioData.availability}</h3>
                <p className="text-sm text-muted-foreground">Taking new projects</p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Location Bento */}
          <ScrollReveal delay={1.25} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="font-bold mb-1 text-gray-900 dark:text-white">{portfolioData.location}</h3>
                <p className="text-sm text-muted-foreground">Working remotely worldwide</p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Calendar/Booking Bento */}
          <ScrollReveal delay={1.3} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">📅</div>
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Book a Call</h3>
                <Button variant="outline" className="!text-slate-900 dark:text-white !bg-transparent border-slate-900 dark:border-white" size="sm">Schedule Meeting</Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Social Links Bento */}
          <ScrollReveal delay={1.35} className="md:col-span-2 lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Connect</h3>
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" size="sm" className="justify-start">
                    <FiGithub className="mr-2" /> GitHub
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start">
                    <FiLinkedin className="mr-2" /> LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Quote Bento */}
          <ScrollReveal delay={1.4} className="md:col-span-4 lg:col-span-6">
            <Card className="h-full bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-900 dark:to-gray-900 border-slate-200 dark:border-slate-800">
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">💭</div>
                <blockquote className="text-xl italic font-medium mb-4 text-white">
                  "Design is not just what it looks like and feels like. Design is how it works."
                </blockquote>
                <p className="text-sm text-muted-foreground">— Steve Jobs</p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Contact Card */}
          <ScrollReveal delay={1.45} className="md:col-span-4 lg:col-span-6">
            <Card className="bg-gradient-to-r from-slate-900 to-slate-700 text-white border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl font-bold mb-4 text-gray-900">Ready to Start Your Project?</h3>
                <p className="text-lg mb-6 opacity-90 text-white">
                  Let's create something amazing together
                </p>
                <div className="flex flex-col gap-4 sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" variant="secondary">
                    <FiMail className="mr-2" />
                    hello@rileychen.com
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20" aria-label="GitHub Profile">
                      <FiGithub className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20" aria-label="LinkedIn Profile">
                      <FiLinkedin className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

        </div>
      </div>

      {/* Pricing Bento */}
      <section className="py-20 px-3">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{n:"Starter",p:"$49"},{n:"Professional",p:"$149"},{n:"Enterprise",p:"$499"}].map((p,i) => (
              <div key={i} className="rounded-3xl border-2 p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{p.n}</h3>
                <div className="text-4xl sm:text-5xl font-bold mb-6 break-words text-gray-900">{p.p}</div>
                <Button className="w-full">Choose Plan</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Bento */}
      <section className="py-20 px-3 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900">Gallery</h2>
          <div className="grid grid-cols-6 gap-4">
            {[...Array(12)].map((_,i) => (
              <div key={i} className={`rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 ${i%5===0?'col-span-3 row-span-2':'col-span-2'} aspect-square`}></div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-900 py-8">
        <div className="container mx-auto px-3 max-w-full">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
