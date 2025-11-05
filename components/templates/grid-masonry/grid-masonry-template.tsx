"use client";

import { useState } from "react";
import Masonry from "react-masonry-css";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiMail, FiInstagram, FiTwitter, FiX , FiMenu } from "react-icons/fi";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const portfolioData = {
  name: "Emma Wilson",
  title: "Visual Artist & Photographer",
  bio: "Creating visual stories through photography, illustration, and mixed media. Based in NYC. 10+ years capturing moments that matter, featured in National Geographic, Vogue, and The New York Times.",
  approach: [
    { step: "Concept", desc: "Understanding the vision and story" },
    { step: "Create", desc: "Bringing ideas to life through visuals" },
    { step: "Refine", desc: "Perfecting every detail" },
  ],
  testimonials: [
    {
      quote: "Emma's artistic vision is unparalleled. She transformed our brand identity completely.",
      author: "James Miller",
      role: "Creative Director",
      rating: 5,
    },
    {
      quote: "Working with Emma was an absolute pleasure. Her attention to detail is extraordinary.",
      author: "Lisa Chen",
      role: "Magazine Editor",
      rating: 5,
    },
    {
      quote: "Every photo tells a story. Emma captures emotion like no one else.",
      author: "Marcus Johnson",
      role: "Art Curator",
      rating: 5,
    },
  ],
  awards: [
    { title: "Photography of the Year", year: "2024", org: "National Geographic" },
    { title: "Best Portrait Series", year: "2023", org: "World Press Photo" },
    { title: "Emerging Artist Award", year: "2022", org: "Art Directors Club" },
  ],
  categories: ["All", "Photography", "Illustration", "Design", "Art", "Fashion", "Nature"],
  items: [
    {
      id: 1,
      title: "Sunset Dreams",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",
      height: "tall",
    },
    {
      id: 2,
      title: "Abstract Forms",
      category: "Illustration",
      image: "https://images.unsplash.com/photo-1541753866388-0b3c701627d3?w=800&h=600&fit=crop",
      height: "medium",
    },
    {
      id: 3,
      title: "Urban Exploration",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=1200&fit=crop",
      height: "tall",
    },
    {
      id: 4,
      title: "Brand Identity",
      category: "Design",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
      height: "short",
    },
    {
      id: 5,
      title: "Nature's Beauty",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=1000&fit=crop",
      height: "tall",
    },
    {
      id: 6,
      title: "Digital Art",
      category: "Art",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop",
      height: "medium",
    },
    {
      id: 7,
      title: "Portrait Series",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1000&fit=crop",
      height: "tall",
    },
    {
      id: 8,
      title: "Watercolor Dreams",
      category: "Illustration",
      image: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=800&h=600&fit=crop",
      height: "short",
    },
    {
      id: 9,
      title: "Architectural Lines",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&h=1200&fit=crop",
      height: "tall",
    },
    {
      id: 10,
      title: "Minimal Design",
      category: "Design",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      height: "medium",
    },
    {
      id: 11,
      title: "Street Life",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=1000&fit=crop",
      height: "tall",
    },
    {
      id: 12,
      title: "Color Studies",
      category: "Art",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop",
      height: "medium",
    },
    {
      id: 13,
      title: "Fashion Editorial",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&h=1200&fit=crop",
      height: "tall",
    },
    {
      id: 14,
      title: "Mountain Majesty",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",
      height: "tall",
    },
    {
      id: 15,
      title: "Fashion Week",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=1200&fit=crop",
      height: "tall",
    },
    {
      id: 16,
      title: "Wildlife Portrait",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop",
      height: "medium",
    },
    {
      id: 17,
      title: "Urban Geometry",
      category: "Design",
      image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&h=800&fit=crop",
      height: "medium",
    },
    {
      id: 18,
      title: "Modern Sculpture",
      category: "Art",
      image: "https://images.unsplash.com/photo-1543246145-e8e5ca3a4825?w=800&h=1200&fit=crop",
      height: "tall",
    },
    {
      id: 19,
      title: "Night Photography",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
      height: "short",
    },
    {
      id: 20,
      title: "Botanical Study",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800&h=1000&fit=crop",
      height: "tall",
    },
  ],
  stats: [
    { value: "500+", label: "Projects" },
    { value: "100+", label: "Clients" },
    { value: "50+", label: "Awards" },
    { value: "10+", label: "Years" },
  ],
};

const breakpointColumns = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
};

export function GridMasonryTemplate() {
  const [selectedCategory, setSelectedCategory] = useState("All");  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<typeof portfolioData.items[0] | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? portfolioData.items
      : portfolioData.items.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-3 sm:px-3 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">

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
      <section className="container mx-auto px-3 sm:px-3 pt-32 pb-16 text-center">
        <FadeIn>
          <h1 className="text-3xl sm: text-3xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold mb-4 break-words">
            {portfolioData.name}
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {portfolioData.title}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-lg text-muted-foreground max-w-full mx-auto">
            {portfolioData.bio}
          </p>
        </FadeIn>
      </section>

      {/* Filter Categories */}
      <section className="container mx-auto px-3 sm:px-3 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {portfolioData.categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="container mx-auto px-3 sm:px-3 py-8">
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="mb-6"
            >
              <div
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <Badge className="w-fit mb-2" variant="secondary">
                    {item.category}
                  </Badge>
                  <h3 className="text-white text-xl font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </section>

      {/* Approach Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 border-t">
        <ScrollReveal>
          <h2 className="text-3xl md: text-3xl sm:text-4xl  font-bold text-center mb-12">My Approach</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto">
          {portfolioData.approach.map((item, index) => (
            <ScrollReveal key={item.step} delay={index * 0.1}>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{item.step}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-3 sm:px-3 py-20 border-t">
        <ScrollReveal>
          <h2 className="text-3xl md: text-3xl sm:text-4xl  font-bold text-center mb-12">Client Feedback</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
          {portfolioData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.author} delay={index * 0.1}>
              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-3 sm:px-3 py-20 border-t">
        <ScrollReveal>
          <div className="max-w-full mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl   font-bold mb-6 break-words">
              Let's Work Together
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Available for commissions, collaborations, and creative projects.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg">
                <FiMail className="mr-2" />
                Get in Touch
              </Button>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="!text-white !bg-transparent border-white" size="icon" aria-label="Instagram Profile">
                  <FiInstagram className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="!text-white !bg-transparent border-white" size="icon" aria-label="Twitter Profile">
                  <FiTwitter className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setSelectedItem(null)}
            >
              <FiX className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-6 text-center">
                <Badge className="mb-2">{selectedItem.category}</Badge>
                <h3 className="text-white text-2xl font-bold">
                  {selectedItem.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills - Masonry Grid Style */}
      <section className="py-20 px-3 sm:px-3 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl  font-bold mb-12">Skills & Expertise</h2>
          </ScrollReveal>
          <div className="columns-2 md:columns-4 gap-4 space-y-4">
            {['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'GraphQL', 'PostgreSQL', 'Docker', 'AWS', 'Figma', 'Git', 'REST APIs'].map((skill, i) => (
              <ScrollReveal key={i} delay={i * 0.03}>
                <div className="break-inside-avoid bg-background p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <span className="font-semibold">{skill}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About - Masonry Style */}
      <section className="py-20 px-3 sm:px-3">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl  font-bold mb-8">About Me</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                I'm a full-stack developer with over 6 years of experience building modern web applications.
                My passion lies in creating elegant solutions to complex problems.
              </p>
              <p className="text-lg text-muted-foreground">
                I specialize in React, Next.js, and Node.js, and I'm always exploring new technologies
                to improve my craft and deliver better results for my clients.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing - Masonry Grid */}
      <section className="py-20 px-3 sm:px-3 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl  font-bold mb-12">Pricing</h2>
          </ScrollReveal>
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {[
              { name: 'Starter', price: '$399', features: ['Single Page Site', '2 Revisions', 'Responsive Design', 'Basic SEO'], height: 'h-64' },
              { name: 'Business', price: '$899', features: ['Multi-Page Site', '5 Revisions', 'Custom Design', 'Advanced SEO', 'CMS Integration', 'Analytics'], height: 'h-80' },
              { name: 'Enterprise', price: '$2199', features: ['Full Application', 'Unlimited Revisions', 'Custom Features', 'API Development', 'Database Design', 'Priority Support', 'Maintenance'], height: 'h-96' }
            ].map((plan, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`break-inside-avoid bg-background p-8 rounded-lg border hover:shadow-lg transition-shadow ${plan.height}`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl sm:text-4xl  font-bold mb-6 text-primary">{plan.price}</div>
                  <ul className="space-y-2">
                    {plan.features.map((f, j) => (
                      <li key={j} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6">Choose Plan</Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Masonry Grid */}
      <section className="py-20 px-3 sm:px-3">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl  font-bold mb-12">Gallery</h2>
          </ScrollReveal>
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {[
              { h: 'h-48' }, { h: 'h-64' }, { h: 'h-56' },
              { h: 'h-72' }, { h: 'h-52' }, { h: 'h-60' },
              { h: 'h-64' }, { h: 'h-48' }, { h: 'h-68' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className={`break-inside-avoid ${item.h} bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg hover:scale-105 transition-transform cursor-pointer`}>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Masonry Style */}
      <section className="py-20 px-3 sm:px-3 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl  font-bold mb-12">Timeline</h2>
          </ScrollReveal>
          <div className="space-y-6">
            {[
              { year: '2024', title: 'Senior Full Stack Developer', company: 'Tech Innovations', desc: 'Leading development of cloud-native applications' },
              { year: '2022', title: 'Lead Developer', company: 'Digital Solutions', desc: 'Built scalable web platforms for enterprise clients' },
              { year: '2020', title: 'Full Stack Developer', company: 'Startup Hub', desc: 'Developed MVPs for multiple successful startups' },
              { year: '2018', title: 'Junior Developer', company: 'Web Agency', desc: 'Learned modern web development practices' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-background p-6 rounded-lg border">
                  <div className="flex items-start gap-4">
                    <div className="text-sm font-mono text-primary w-16 flex-shrink-0">{item.year}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <div className="text-sm text-muted-foreground mb-2">{item.company}</div>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-3 sm:px-3 py-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
