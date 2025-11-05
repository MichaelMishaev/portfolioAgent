"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { FiMail, FiTwitter, FiInstagram, FiGithub } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { motion } from "framer-motion";

export function Experimental3dTemplate() {
  const { tt } = useI18n();
  const data = tt?.experimental3d;

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center text-white bg-black">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-black text-white">
      {/* Fullscreen 3D Hero */}
      <section className="relative h-screen overflow-hidden">
        {/* Simulated 3D Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30">
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated geometric shapes */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-64 h-64 border border-cyan-500/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </div>

        {/* UI Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center pointer-events-auto z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-7xl lg:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter">
                {data.hero.name}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-2xl text-white/80 mb-8"
            >
              {data.hero.title}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-md text-white px-8 py-6 rounded-full border border-white/30 hover:bg-white/20 transition-all text-lg"
              >
                {data.hero.cta}
              </Button>
            </motion.div>

            <div className="flex gap-6 justify-center mt-12">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="absolute top-8 left-8 text-white/60 hover:text-white transition-colors z-50"
        >
          {tt.common.back}
        </Link>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Fullscreen Project Showcase */}
      <section className="bg-black">
        {data.projects.map((project: any, index: number) => (
          <div
            key={index}
            className="relative h-screen flex items-center justify-center group cursor-pointer"
          >
            {/* Background gradient per project */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                index % 2 === 0
                  ? 'from-purple-900/40 to-black'
                  : 'from-blue-900/40 to-black'
              } opacity-50 group-hover:opacity-70 transition-opacity duration-700`}
            ></div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center text-white px-6">
              <ScrollReveal>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black transform group-hover:scale-110 transition-transform duration-500 text-gray-900">
                    {project.title}
                  </div>
                </motion.div>
                <div className="text-2xl text-white/70">{project.category}</div>
                <p className="text-lg text-white/60 mt-4 max-w-2xl mx-auto">
                  {project.description}
                </p>
              </ScrollReveal>
            </div>

            {/* Parallax Number */}
            <div className="absolute top-8 right-8 text-white/20 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black">
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Animated Grid */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px',
                }}
              ></div>
            </div>
          </div>
        ))}
      </section>

      {/* About Section - Immersive */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-black via-purple-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 break-words text-gray-900">{tt.common.about}</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-2xl text-white/80 leading-relaxed mb-12">
              {data.about.bio}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="grid md:grid-cols-3 gap-8">
              {data.about.expertise.map((skill: string, index: number) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="p-6 bg-white/5 backdrop-blur-md rounded-lg border border-white/10"
                >
                  <div className="text-6xl mb-4 text-gray-900">✦</div>
                  <div className="text-xl font-bold text-gray-900">{skill}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Experimental Stats */}
      <section className="py-32 bg-black">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-16">
            {data.stats.map((stat: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4 text-white">
                    {stat.value}
                  </div>
                  <div className="text-xl text-white/60">{stat.label}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - Immersive CTA */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-black to-blue-600/20"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-6xl lg:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 text-gray-900">
              {tt.common.letsWorkTogether}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-2xl text-white/80 mb-12">
              {data.contact.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex gap-6 justify-center flex-wrap mb-12">
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-md text-white px-12 py-8 rounded-full border border-white/30 hover:bg-white/20 transition-all text-xl font-bold"
              >
                <FiMail className="mr-2" />
                {data.contact.emailCta}
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="flex gap-8 justify-center">
              <a
                href="#"
                className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all"
              >
                <FiTwitter size={24} />
              </a>
              <a
                href="#"
                className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all"
              >
                <FiInstagram size={24} />
              </a>
              <a
                href="#"
                className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all"
              >
                <FiGithub size={24} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <p className="text-white/40">
            &copy; 2025 {data.hero.name}. Pushing boundaries in 3D & immersive design.
          </p>

          {/* Pricing - Experimental 3D */}
          <section className="py-20 border-t border-white/10">
            <h3 className="text-4xl sm:text-5xl font-bold mb-12 text-center break-words text-gray-900">Pricing</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: '3D Starter', price: '$1,999', features: ['Basic 3D Scene', 'WebGL Implementation', '2 Revisions', 'Performance Optimization'] },
                { name: '3D Pro', price: '$4,999', features: ['Complex 3D Environment', 'Custom Shaders', 'Interactive Elements', '5 Revisions', 'VR/AR Ready'], popular: true },
                { name: '3D Ultimate', price: '$12,999', features: ['Full 3D Experience', 'Real-time Rendering', 'Physics Simulation', 'Unlimited Revisions', 'Dedicated Support'] }
              ].map((pkg, i) => (
                <div key={i} className={`bg-white/5 backdrop-blur-xl p-8 rounded-2xl border ${pkg.popular ? 'border-purple-500 ring-4 ring-purple-500/20' : 'border-white/10'}`}>
                  {pkg.popular && <div className="text-xs font-bold text-purple-400 mb-2 uppercase">Most Popular</div>}
                  <h4 className="text-2xl font-bold mb-2 text-gray-900">{pkg.name}</h4>
                  <div className="text-4xl sm:text-5xl font-bold text-purple-400 mb-8 break-words">{pkg.price}</div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-purple-400 mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.popular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-white/10 hover:bg-white/20'}`}>
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials - Experimental 3D */}
          <section className="py-20 border-t border-white/10">
            <h3 className="text-4xl sm:text-5xl font-bold mb-12 text-center break-words text-gray-900">Client Feedback</h3>
            <div className="max-w-4xl mx-auto space-y-8">
              {[
                { text: 'Mind-blowing 3D work. Our website engagement increased 400%!', author: 'David Kim', role: 'CEO, TechVision' },
                { text: 'The most innovative 3D experience we\'ve seen. Truly cutting-edge!', author: 'Emma Stone', role: 'Creative Director' },
                { text: 'Exceptional quality and attention to detail. Highly recommended!', author: 'James Wilson', role: 'Founder, StartupXYZ' }
              ].map((t, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                  <p className="text-xl text-white/90 mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <div className="font-bold text-white">{t.author}</div>
                    <div className="text-sm text-white/60">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery - Experimental 3D */}
          <section className="py-20 border-t border-white/10">
            <h3 className="text-4xl sm:text-5xl font-bold mb-12 text-center break-words text-gray-900">3D Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl border border-white/10 hover:scale-105 transition-transform cursor-pointer backdrop-blur-xl"></div>
              ))}
            </div>
          </section>

          {/* Timeline - Experimental 3D */}
          <section className="py-20 border-t border-white/10">
            <h3 className="text-4xl sm:text-5xl font-bold mb-12 text-center break-words text-gray-900">Evolution</h3>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { year: '2024', title: '3D Innovation Leader', desc: 'Pioneering WebGL experiences' },
                { year: '2022', title: 'Advanced 3D Studio', desc: 'Expanded to VR/AR development' },
                { year: '2020', title: '3D Specialist', desc: 'Focused on Three.js mastery' },
                { year: '2018', title: 'Started 3D Journey', desc: 'First WebGL experiments' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="text-3xl font-bold text-purple-400">{item.year}</div>
                  </div>
                  <div className="flex-1 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                    <h4 className="font-bold text-xl mb-2 text-white">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ - Experimental 3D */}
          <section className="py-20 border-t border-white/10">
            <h3 className="text-4xl sm:text-5xl font-bold mb-12 text-center break-words text-gray-900">FAQ</h3>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { q: 'What technologies do you use?', a: 'Three.js, WebGL, GLSL shaders, and modern 3D web frameworks.' },
                { q: 'How long does a 3D project take?', a: 'Typically 4-8 weeks depending on complexity and scope.' },
                { q: 'Will it work on mobile?', a: 'Yes, all projects are optimized for mobile performance.' },
                { q: 'Can you do VR/AR?', a: 'Absolutely! We specialize in WebXR experiences.' }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-lg mb-3 text-purple-400">{item.q}</h4>
                  <p className="text-white/70">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
