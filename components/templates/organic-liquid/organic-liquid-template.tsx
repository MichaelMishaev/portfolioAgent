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
            <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-amber-600 to-teal-600 bg-clip-text text-transparent break-words">
              {portfolioData.name}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl text-foreground/80 mb-8"
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
            <h2 className="text-3xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent break-words">
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
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent mb-2">
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
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent break-words">
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
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
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
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent break-words">
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
                        <h3 className="text-3xl font-bold mt-2 mb-4 text-gray-900">
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
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent break-words">
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
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent mb-4 break-words">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{step.step}</h3>
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
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent break-words">
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
            <h3 className="text-3xl md:text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
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
            <h2 className="text-3xl sm:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent break-words">
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

      {/* Skills - Organic Liquid Style */}
      <section className="py-20 px-3 sm:px-3 bg-gradient-to-br from-rose-50 via-amber-50 to-emerald-50 dark:from-gray-900 dark:via-rose-950 dark:to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-4xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-rose-600 via-amber-600 to-emerald-600 bg-clip-text text-transparent break-words">
              Skills & Expertise
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'React', color: 'from-rose-400 to-pink-400' },
              { name: 'TypeScript', color: 'from-blue-400 to-cyan-400' },
              { name: 'Design', color: 'from-purple-400 to-indigo-400' },
              { name: 'Node.js', color: 'from-green-400 to-emerald-400' },
              { name: 'Next.js', color: 'from-gray-600 to-gray-800' },
              { name: 'Tailwind', color: 'from-teal-400 to-cyan-400' },
              { name: 'Figma', color: 'from-orange-400 to-red-400' },
              { name: 'Framer', color: 'from-violet-400 to-purple-400' }
            ].map((skill, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className={`bg-gradient-to-br ${skill.color} p-6 rounded-[2.5rem] text-white text-center font-semibold text-lg shadow-lg hover:scale-105 transition-transform`}>
                  {skill.name}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Organic Liquid Style */}
      <section className="py-20 px-3 sm:px-3">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-4xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-rose-600 via-amber-600 to-emerald-600 bg-clip-text text-transparent break-words">
              Pricing
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12">Flexible plans for every need</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Seed', price: '$399', gradient: 'from-green-400 to-emerald-500', features: ['Landing Page', '2 Revisions', 'Responsive Design', 'Basic SEO'] },
              { name: 'Bloom', price: '$999', gradient: 'from-rose-400 to-pink-500', features: ['Multi-Page Site', '5 Revisions', 'Custom Design', 'Advanced SEO', 'CMS Integration'], popular: true },
              { name: 'Forest', price: '$2499', gradient: 'from-purple-400 to-indigo-500', features: ['Full Application', 'Unlimited Revisions', 'Custom Features', 'API Development', 'Priority Support', 'Maintenance'] }
            ].map((plan, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`relative p-8 rounded-[3rem] bg-gradient-to-br ${plan.gradient} text-white shadow-2xl hover:scale-105 transition-transform ${plan.popular ? 'ring-4 ring-amber-400' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 px-6 py-2 rounded-full font-bold text-sm">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-3xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                  <div className="text-4xl sm:text-5xl font-bold mb-8 break-words">{plan.price}</div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <span>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur text-white border-2 border-white/50 rounded-full">
                    Choose Plan
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Organic Liquid Style */}
      <section className="py-20 px-3 sm:px-3 bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 dark:from-gray-900 dark:via-amber-950 dark:to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-4xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 bg-clip-text text-transparent break-words">
              Gallery
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { gradient: 'from-rose-400 to-pink-500', shape: 'rounded-[3rem]' },
              { gradient: 'from-amber-400 to-orange-500', shape: 'rounded-[2rem_3rem]' },
              { gradient: 'from-emerald-400 to-teal-500', shape: 'rounded-[3rem_2rem]' },
              { gradient: 'from-purple-400 to-indigo-500', shape: 'rounded-[2.5rem]' },
              { gradient: 'from-blue-400 to-cyan-500', shape: 'rounded-[2rem_4rem]' },
              { gradient: 'from-pink-400 to-rose-500', shape: 'rounded-[4rem_2rem]' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className={`aspect-square bg-gradient-to-br ${item.gradient} ${item.shape} shadow-xl hover:scale-105 transition-transform cursor-pointer`}>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Organic Liquid Style */}
      <section className="py-32 px-3 sm:px-3 bg-gradient-to-br from-rose-500 via-amber-500 to-emerald-500 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <div className="bg-white/10 backdrop-blur-xl p-12 rounded-[4rem] border-2 border-white/30">
              <h2 className="text-4xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 break-words text-gray-900">
                Let's Create Something Beautiful
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Transform your ideas into flowing, organic digital experiences
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white !text-rose-600 hover:bg-white/90 rounded-full font-semibold text-lg px-8">
                  <FiMail className="mr-2" />
                  Start Project
                </Button>
                <Button size="lg" variant="outline" className="border-white !text-white !bg-transparent hover:bg-white/20 rounded-full font-semibold text-lg px-8">
                  View Portfolio
                </Button>
              </div>
            </div>
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
