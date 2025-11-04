"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiMail,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiArrowRight,
  FiCheckCircle,
  FiCode,
  FiZap,
  FiTrendingUp,
  FiAward,
  FiUsers,
  FiTarget,
  FiBarChart2,
  FiShield
} from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { useState } from "react";

export function OnlineBusinessAgencyTemplate() {
  const { tt } = useI18n();
  const data = tt.onlineBusinessAgency || {};
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      icon: FiCode,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      features: ["React & Next.js", "E-commerce", "API Integration", "Performance Optimization"]
    },
    {
      icon: FiZap,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies that deliver measurable results",
      features: ["SEO & SEM", "Social Media", "Content Marketing", "Analytics"]
    },
    {
      icon: FiTrendingUp,
      title: "Growth Strategy",
      description: "Comprehensive growth plans tailored to your business goals",
      features: ["Market Research", "Competitor Analysis", "Growth Hacking", "Conversion Optimization"]
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-slate-200 dark:border-gray-800">
        <div className="container mx-auto px-3 md:px-3 max-w-full py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {tt.common?.backToGallery || "← Back to Gallery"}
          </Link>
          <div className="flex items-center gap-6">
            <a href="#services" className="hidden md:block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {tt.common?.services || "Services"}
            </a>
            <a href="#work" className="hidden md:block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {data.nav?.ourWork || "Our Work"}
            </a>
            <a href="#process" className="hidden md:block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {data.nav?.process || "Process"}
            </a>
            <a href="#contact" className="hidden md:block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {tt.common?.contact || "Contact"}
            </a>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section - Agency Focus */}
      <section className="container mx-auto px-3 md:px-3 max-w-full pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-full mx-auto text-center">
          <FadeIn>
            <Badge className="mb-6 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0 px-3 py-2">
              <FiAward className="mr-2" />
              {data.badge || "Award-Winning Digital Agency"}
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-gray-900 dark:text-white">
                {data.hero?.mainTitle || "We Build Digital"}
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {data.heroTitle || "Experiences That Convert"}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-full mx-auto">
              {data.heroSubtitle || "We help ambitious businesses scale with custom web development, strategic marketing, and data-driven growth solutions."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg px-8 py-6">
                {data.hero?.startProject || "Start Your Project"}
                <FiArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-500 !text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 text-lg px-8 py-6">
                {data.hero?.viewCaseStudies || "View Case Studies"}
              </Button>
            </div>

            {/* Clients Logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              <div className="text-2xl font-bold text-gray-400">TESLA</div>
              <div className="text-2xl font-bold text-gray-400">SHOPIFY</div>
              <div className="text-2xl font-bold text-gray-400">STRIPE</div>
              <div className="text-2xl font-bold text-gray-400">NOTION</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-3 md:px-3 max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <ScrollReveal>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">250+</div>
                <div className="text-gray-600 dark:text-gray-400">{data.stats?.projects || "Projects Completed"}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600 dark:text-gray-400">{data.stats?.satisfaction || "Client Satisfaction"}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">$50M+</div>
                <div className="text-gray-600 dark:text-gray-400">{data.stats?.revenue || "Revenue Generated"}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600 dark:text-gray-400">{data.stats?.experience || "Years Experience"}</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-3 md:px-3 max-w-full py-20 md:py-32">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {data.services?.title || "Full-Service Digital Solutions"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-full mx-auto">
              {data.services?.subtitle || "From strategy to execution, we handle everything your business needs to thrive online"}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Card
                className={`h-full hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                  selectedService === i ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => setSelectedService(i)}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <FiCheckCircle className="text-blue-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-2 border-blue-500 !text-blue-600">
            {data.services?.seeAll || "See All Services"}
            <FiArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section id="work" className="container mx-auto px-3 md:px-3 max-w-full py-20 md:py-32 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {data.work?.title || "Recent Work"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {data.work?.subtitle || "Case studies from our portfolio"}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "E-Commerce Platform",
              client: "TechStart Inc.",
              result: "+240% Revenue",
              category: "Development",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&q=80"
            },
            {
              title: "Brand Redesign",
              client: "Fashion Co.",
              result: "+180% Engagement",
              category: "Design",
              image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop&q=80"
            },
            {
              title: "Marketing Campaign",
              client: "FinTech Pro",
              result: "+500 Leads/mo",
              category: "Marketing",
              image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop&q=80"
            },
            {
              title: "App Development",
              client: "HealthTech",
              result: "100K Downloads",
              category: "Mobile",
              image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop&q=80"
            }
          ].map((project, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-cyan-900 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-blue-900">
                    {project.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{project.client}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold">{project.result}</span>
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="container mx-auto px-3 md:px-3 max-w-full py-20 md:py-32">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {data.process?.title || "Our Proven Process"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {data.process?.subtitle || "A systematic approach to delivering exceptional results"}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", title: data.process?.discovery?.title || "Discovery", description: data.process?.discovery?.description || "We learn your business, goals, and challenges" },
            { step: "02", title: data.process?.strategy?.title || "Strategy", description: data.process?.strategy?.description || "Create a data-driven plan tailored to you" },
            { step: "03", title: data.process?.execution?.title || "Execution", description: data.process?.execution?.description || "Build and launch with precision and care" },
            { step: "04", title: data.process?.optimize?.title || "Optimize", description: data.process?.optimize?.description || "Continuously improve and scale results" }
          ].map((phase, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {phase.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-3 md:px-3 max-w-full py-20 md:py-32 border-t border-gray-200 dark:border-gray-800">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {data.testimonials?.title || "Trusted by Industry Leaders"}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Michael Chen", role: "CEO, TechStart", company: "TechStart Inc." },
            { name: "Sarah Williams", role: "CMO, Fashion Brand", company: "Fashion Co." },
            { name: "David Park", role: "Founder, FinTech", company: "FinTech Pro" }
          ].map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiCheckCircle key={i} className="w-5 h-5 text-blue-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                    {data.testimonials?.quote || "Working with this agency transformed our digital presence. Professional, efficient, and results-driven. Highly recommended!"}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500"></div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="container mx-auto px-3 md:px-3 max-w-full py-20 md:py-32">
        <ScrollReveal>
          <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <CardContent className="p-8 md:p-16 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {data.cta?.title || "Ready to Scale Your Business?"}
                  </h2>
                  <p className="text-xl text-white/90 mb-6">
                    {data.cta?.subtitle || "Let's discuss how we can help you achieve your goals. Book a free strategy call today."}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {(data.cta?.features || ["Free consultation", "Custom proposal", "No obligation"]).map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white">
                        <FiCheckCircle className="flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder={data.cta?.namePlaceholder || "Your Name"}
                      className="w-full px-3 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <input
                      type="email"
                      placeholder={data.cta?.emailPlaceholder || "Your Email"}
                      className="w-full px-3 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder={data.cta?.websitePlaceholder || "Company Website"}
                      className="w-full px-3 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <select className="w-full px-3 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option>{data.cta?.budgetLabel || "Project Budget"}</option>
                      <option>$10K - $25K</option>
                      <option>$25K - $50K</option>
                      <option>$50K - $100K</option>
                      <option>$100K+</option>
                    </select>
                    <Button size="lg" className="w-full bg-white !text-blue-600 hover:bg-gray-100 py-6 text-lg font-semibold">
                      {data.cta?.button || "Book Strategy Call"}
                      <FiArrowRight className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 py-12">
        <div className="container mx-auto px-3 md:px-3 max-w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{tt.common?.services || "Services"}</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-600 transition-colors">{data.footer?.webDev || "Web Development"}</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">{data.footer?.digitalMarketing || "Digital Marketing"}</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">{data.footer?.brandStrategy || "Brand Strategy"}</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">{data.footer?.growthConsulting || "Growth Consulting"}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-600 transition-colors">{data.footer?.aboutUs || "About Us"}</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">{data.footer?.ourTeam || "Our Team"}</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">{data.footer?.careers || "Careers"}</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">{tt.common?.contact || "Contact"}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">{data.footer?.caseStudies || "Case Studies"}</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">{data.footer?.whitepapers || "Whitepapers"}</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">{data.footer?.webinars || "Webinars"}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <FiTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <FiGithub className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>{data.footer?.copyright || "© 2025 Digital Agency. All rights reserved. | Privacy Policy • Terms of Service"}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
