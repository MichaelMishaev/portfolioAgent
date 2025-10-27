"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiMail, FiHeart, FiSun, FiWind ,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "Willow Hayes",
  title: "Wellness Brand Designer",
  tagline: "Creating calm, organic experiences that nurture the soul",
  bio: "For 8+ years, I've been crafting brand experiences that feel as natural as breathing. Drawing inspiration from nature's perfect imperfections, I help wellness brands find their authentic voice through organic design that flows, adapts, and grows with their journey.",
  stats: [
    { number: "100+", label: "Brands Nurtured" },
    { number: "8+", label: "Years Growing" },
    { number: "25+", label: "Awards Bloomed" },
  ],
  services: [
    {
      icon: <FiHeart className="w-10 h-10" />,
      title: "Brand Identity",
      description: "Holistic visual identities rooted in natural harmony",
    },
    {
      icon: <FiSun className="w-10 h-10" />,
      title: "Packaging Design",
      description: "Sustainable, beautiful packaging that feels organic",
    },
    {
      icon: <FiWind className="w-10 h-10" />,
      title: "Digital Presence",
      description: "Websites and apps with flowing, intuitive experiences",
    },
  ],
  portfolio: [
    {
      title: "Moonrise Botanicals",
      category: "Skincare Brand",
      description: "Complete brand identity and packaging for a sustainable skincare line. Organic shapes, earthy tones, and flowing typography create a calm, trustworthy presence.",
      color: "from-rose-400 to-amber-400",
    },
    {
      title: "Sacred Spaces Yoga",
      category: "Wellness Studio",
      description: "Website and brand refresh for a yoga studio. Fluid animations and soft gradients reflect the peaceful, mindful experience of their practice.",
      color: "from-teal-400 to-blue-400",
    },
    {
      title: "Nourish Kitchen",
      category: "Plant-Based Food",
      description: "Brand identity and digital presence for a plant-based meal delivery service. Fresh, vibrant, and full of life—just like their food.",
      color: "from-green-400 to-lime-400",
    },
  ],
  process: [
    { step: "Discover", desc: "Understanding your essence and values" },
    { step: "Flow", desc: "Letting ideas bloom naturally" },
    { step: "Shape", desc: "Crafting organic visual systems" },
    { step: "Grow", desc: "Nurturing your brand's evolution" },
  ],
  testimonials: [
    {
      name: "Luna Martinez",
      role: "Founder, Moonrise Botanicals",
      quote: "Willow captured our essence perfectly. The brand feels alive, organic, and exactly like us.",
    },
    {
      name: "Kai Thompson",
      role: "Owner, Sacred Spaces Yoga",
      quote: "Working with Willow was like a creative meditation. Every element flows with intention.",
    },
  ],
  values: ["Sustainability", "Mindfulness", "Authenticity", "Connection"],
};

export function OrganicLiquidTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md">
        <div className="container mx-auto px-3 sm:px-3 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back
          </Link>
          <a href="#contact" className="text-sm hover:text-primary transition-colors">
            Connect
          </a>
        </div>
      </nav>

      {/* Hero with Organic Shapes */}
      <section className="min-h-screen overflow-x-hidden max-w-full flex items-center justify-center relative px-3 pt-20">
        {/* Morphing Background Blobs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-rose-300 to-amber-300 rounded-full opacity-40 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-teal-300 to-blue-300 rounded-full opacity-40 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 text-center max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-amber-600 to-teal-600 bg-clip-text text-transparent">
              {portfolioData.name}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl text-foreground/80 mb-8"
          >
            {portfolioData.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-muted-foreground mb-12 max-w-full mx-auto"
          >
            {portfolioData.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-rose-500 to-teal-500 hover:from-rose-600 hover:to-teal-600 text-white border-0"
            >
              Explore My Work
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-3 relative">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-300 to-rose-300 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-full mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl leading-relaxed text-foreground/80 mb-12">
              {portfolioData.bio}
            </p>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {portfolioData.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-2 border-rose-200/50"
                  whileHover={{
                    borderRadius: "70% 30% 30% 70% / 60% 40% 60% 40%",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services with Liquid Cards */}
      <section className="py-20 px-3">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent">
            What I Do
          </h2>
        </ScrollReveal>

        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <Card className="h-full overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur border-2 border-rose-200/50 dark:border-rose-800/50 hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-200 to-teal-200 dark:from-rose-800 dark:to-teal-800 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-300"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-3 relative">
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-300 to-blue-300 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-full mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent">
              Selected Work
            </h2>
          </ScrollReveal>

          <div className="space-y-12">
            {portfolioData.portfolio.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.1}>
                <Card className="overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur border-2 border-rose-200/50 hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      {/* Gradient Blob */}
                      <motion.div
                        className={`w-48 h-48 bg-gradient-to-br ${project.color} rounded-[40%_60%_60%_40%_/_60%_40%_40%_60%] flex-shrink-0`}
                        whileHover={{
                          borderRadius: "60% 40% 40% 60% / 40% 60% 60% 40%",
                          scale: 1.05,
                        }}
                        transition={{ type: "spring", stiffness: 200 }}
                      />

                      {/* Content */}
                      <div className="flex-1">
                        <span className="text-sm text-primary font-semibold uppercase tracking-wide">
                          {project.category}
                        </span>
                        <h3 className="text-3xl font-bold mt-2 mb-4">
                          {project.title}
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-3">
        <div className="max-w-full mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent">
              My Process
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {portfolioData.process.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.1}>
                <motion.div
                  className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-[35%_65%_60%_40%_/_40%_60%_65%_35%] border-2 border-rose-200/50"
                  whileHover={{
                    borderRadius: "60% 40% 40% 60% / 40% 60% 60% 40%",
                    y: -10,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.step}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-3 relative">
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-rose-300 to-amber-300 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="max-w-full mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent">
              Kind Words
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} delay={index * 0.1}>
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur border-2 border-rose-200/50 hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <p className="text-xl leading-relaxed text-foreground/90 mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values with Organic Pills */}
      <section className="py-20 px-3">
        <div className="max-w-full mx-auto">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Core Values
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              {portfolioData.values.map((value, index) => (
                <motion.div
                  key={value}
                  className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full border-2 border-rose-300/50 dark:border-rose-700/50 text-lg font-medium"
                  whileHover={{
                    scale: 1.05,
                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {value}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact with Liquid Background */}
      <section id="contact" className="py-20 px-3 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-rose-300/30 via-amber-300/30 to-teal-300/30 rounded-[40%_60%_70%_30%_/_60%_30%_70%_40%]"
          animate={{
            borderRadius: [
              "40% 60% 70% 30% / 60% 30% 70% 40%",
              "60% 40% 30% 70% / 40% 60% 30% 70%",
              "40% 60% 70% 30% / 60% 30% 70% 40%",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 max-w-full mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent">
              Let's Create
              <br />
              Together
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-muted-foreground mb-12">
              Ready to bring organic beauty to your brand?
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-teal-500 hover:from-rose-600 hover:via-amber-600 hover:to-teal-600 text-white text-lg px-10 py-6 h-auto"
            >
              <FiMail className="mr-2 w-5 h-5" />
              hello@willowhaves.com
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rose-200/50 dark:border-rose-800/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur py-8">
        <div className="container mx-auto px-3 sm:px-3">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} {portfolioData.name}. Designed with love and nature.
          </p>
        </div>
      </footer>
    </div>
  );
}
