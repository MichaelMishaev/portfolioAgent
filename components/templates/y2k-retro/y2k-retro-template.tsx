"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FiMail, FiStar ,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "⭐ PIXEL DREAMS ⭐",
  tagline: "ur fave digital artist  ✨💖",
  bio: "creating cute stuff since 2024~ anime lover 🌸 pixel art enthusiast 🎮 y2k aesthetic 💿",
  stats: [
    { label: "projects", value: "100+", emoji: "🎨" },
    { label: "happy clients", value: "50+", emoji: "💖" },
    { label: "coffee consumed", value: "999+", emoji: "☕" },
  ],
  projects: [
    {
      title: "Cyber Café Rebrand",
      emoji: "☕",
      color: "from-pink-400 to-purple-400",
      description: "complete branding overhaul with holographic menus & neon signage~",
      year: "2024"
    },
    {
      title: "Retro Gaming UI",
      emoji: "🎮",
      color: "from-cyan-400 to-blue-400",
      description: "pixel-perfect interface inspired by classic 90s games!",
      year: "2024"
    },
    {
      title: "Holographic Stickers",
      emoji: "✨",
      color: "from-yellow-400 to-pink-400",
      description: "super shiny sticker packs sold out in 2 weeks 💫",
      year: "2023"
    },
    {
      title: "90s Web Revival",
      emoji: "💿",
      color: "from-green-400 to-cyan-400",
      description: "brought back geocities vibes with modern tech~",
      year: "2023"
    },
    {
      title: "Anime Merch Store",
      emoji: "🌸",
      color: "from-pink-400 to-red-400",
      description: "e-commerce site with kawaii animations everywhere!",
      year: "2023"
    },
    {
      title: "Vaporwave Album Art",
      emoji: "🌴",
      color: "from-purple-400 to-pink-400",
      description: "cover art for indie synthwave artists ✨",
      year: "2022"
    },
  ],
  testimonials: [
    { name: "sakura chan", message: "omg so cuteee!!! 💖✨", emoji: "🌸" },
    { name: "retro vibes", message: "totally captures the y2k aesthetic!", emoji: "💿" },
    { name: "kawaii_studio", message: "10/10 would recommend!! 🌟", emoji: "⭐" },
  ],
  skills: ["photoshop", "procreate", "pixel art", "3D modeling", "animation", "UI design"],
  about: "hiiii! i'm a digital artist obsessed with all things sparkly, kawaii, and nostalgic 💫 i love bringing y2k aesthetics into modern design~ when i'm not creating, you'll find me binge-watching anime or collecting vintage tech 🎮✨",
  achievements: [
    { icon: "🏆", text: "featured on dribbble popular" },
    { icon: "⭐", text: "10k followers on instagram" },
    { icon: "💖", text: "100+ five-star reviews" },
    { icon: "🎨", text: "collaborated with major brands" },
  ],
  vibes: ["✨ sparkly", "💖 kawaii", "🌈 rainbow", "💫 dreamy", "🎨 creative", "🌸 aesthetic"],
};

export function Y2KRetroTemplate() {
  const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const newParticle = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    };
    setCursorTrail((prev) => [...prev.slice(-10), newParticle]);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor Trail Stars */}
      {cursorTrail.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none text-2xl z-50"
          initial={{ opacity: 1, x: particle.x, y: particle.y, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8 }}
        >
          ⭐
        </motion.div>
      ))}

      {/* Navigation */}
      <nav className="border-b-4 border-white bg-pink-500/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-white font-bold text-lg hover:scale-110 transition-transform inline-block"
          >
            ← baaack~
          </Link>
          <a
            href="#contact"
            className="bg-yellow-400 text-purple-900 font-bold px-6 py-2 rounded-full border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            contact me! 💌
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        {/* Decorative Stars */}
        <div className="absolute top-20 left-20 text-6xl animate-spin-slow">✨</div>
        <div className="absolute top-40 right-32 text-5xl animate-bounce">💫</div>
        <div className="absolute bottom-32 left-40 text-7xl animate-pulse">⭐</div>
        <div className="absolute bottom-20 right-20 text-6xl animate-spin-slow">🌟</div>

        <div className="text-center max-w-4xl relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mb-8"
          >
            <div className="text-8xl mb-4">🎀</div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)] [text-shadow:_3px_3px_0_rgb(255_0_255),_6px_6px_0_rgb(0_255_255)]"
            style={{ fontFamily: "'Comic Sans MS', cursive" }}
          >
            {portfolioData.name}
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-purple-900 mb-4 drop-shadow-lg"
          >
            {portfolioData.tagline}
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-purple-800 mb-8"
          >
            {portfolioData.bio}
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold text-xl px-8 py-6 h-auto rounded-full border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              view my work ✨
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Visitor Counter - Y2K Style */}
      <section className="py-8 bg-white/40 backdrop-blur-sm border-y-4 border-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <motion.div
              className="bg-black text-green-400 px-6 py-3 rounded-lg border-4 border-white font-mono text-xl font-bold shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              VISITOR COUNT: 042069 ✨
            </motion.div>
            <div className="text-2xl">👀</div>
            <div className="bg-yellow-300 text-purple-900 px-6 py-3 rounded-lg border-4 border-white font-bold shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              welcome 2 my page!! 💖
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
            ~*~ by the numbers ~*~
          </h2>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          {portfolioData.stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <motion.div
                className="bg-white rounded-3xl p-6 text-center border-6 border-purple-500 shadow-[6px_6px_0px_0px_rgba(147,51,234,1)]"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-5xl mb-3">{stat.emoji}</div>
                <div className="text-4xl font-black text-purple-900 mb-2">{stat.value}</div>
                <p className="text-sm font-bold text-purple-700 uppercase">{stat.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-300/50 via-purple-300/50 to-cyan-300/50 border-y-4 border-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-white rounded-[2rem] p-10 border-8 border-pink-500 shadow-[12px_12px_0px_0px_rgba(236,72,153,1)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-6xl">🎀</div>
                <h2 className="text-4xl md:text-5xl font-black text-purple-900">
                  about meeee~
                </h2>
              </div>
              <p className="text-xl leading-relaxed text-purple-800 mb-6">
                {portfolioData.about}
              </p>

              {/* Marquee Text */}
              <div className="overflow-hidden bg-gradient-to-r from-pink-500 to-purple-500 py-3 rounded-full border-4 border-white">
                <motion.div
                  animate={{ x: [0, -1000] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="whitespace-nowrap text-white font-bold text-lg"
                >
                  ✨ available for commissions ✨ DM me for custom work ✨ fast turnaround ✨ affordable prices ✨ let's create something amazing together ✨
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-6">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
            ~*~ my skillz ~*~
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-4">
          {portfolioData.skills.map((skill, index) => (
            <ScrollReveal key={skill} delay={index * 0.05}>
              <motion.div
                className="bg-gradient-to-br from-cyan-400 to-blue-400 text-white px-6 py-3 rounded-full border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] font-bold text-lg"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {skill}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6">
        <ScrollReveal>
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
            ~*~ my projects ~*~
          </h2>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <Card
                className={`overflow-hidden bg-gradient-to-br ${project.color} border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all cursor-pointer`}
              >
                <div className="p-6">
                  <div className="text-7xl mb-4 text-center">{project.emoji}</div>
                  <div className="bg-white rounded-2xl p-4 border-4 border-black">
                    <h3 className="text-xl font-black text-purple-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-purple-700 mb-2">{project.description}</p>
                    <div className="text-xs font-bold text-purple-500">{project.year}</div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-6 bg-white/30 backdrop-blur-sm border-y-4 border-white">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-purple-900">
            ~*~ achievements unlocked ~*~
          </h2>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {portfolioData.achievements.map((achievement, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                className="bg-gradient-to-br from-yellow-300 to-orange-300 p-6 rounded-2xl border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-5xl">{achievement.icon}</div>
                <p className="text-lg font-bold text-purple-900">{achievement.text}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials - Chat Bubble Style */}
      <section className="py-20 px-6">
        <ScrollReveal>
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
            ~*~ what ppl r saying ~*~
          </h2>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto space-y-8">
          {portfolioData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 0.1}>
              <motion.div
                className={`flex gap-4 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl flex-shrink-0">{testimonial.emoji}</div>
                <div className={`flex-1 ${index % 2 === 0 ? "" : "text-right"}`}>
                  <div
                    className={`inline-block bg-white p-6 rounded-3xl border-4 ${
                      index % 2 === 0 ? "border-pink-500" : "border-cyan-500"
                    } shadow-[6px_6px_0px_0px_rgba(147,51,234,1)] ${
                      index % 2 === 0 ? "rounded-tl-none" : "rounded-tr-none"
                    }`}
                  >
                    <p className="text-lg font-bold text-purple-900 mb-2">
                      {testimonial.message}
                    </p>
                    <p className="text-sm font-bold text-purple-600">
                      - {testimonial.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Vibes Section */}
      <section className="py-20 px-6 bg-white/30 backdrop-blur-sm border-y-4 border-white">
        <ScrollReveal>
          <h3 className="text-4xl font-black text-center mb-12 text-purple-900">
            the vibes~
          </h3>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-4">
            {portfolioData.vibes.map((vibe, index) => (
              <motion.div
                key={vibe}
                className="bg-white px-6 py-3 rounded-full border-4 border-purple-500 shadow-[4px_4px_0px_0px_rgba(147,51,234,1)] font-bold text-purple-900 text-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {vibe}
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="bg-white rounded-3xl p-12 border-8 border-pink-500 shadow-[12px_12px_0px_0px_rgba(236,72,153,1)]">
              <div className="text-7xl mb-6">💌</div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-purple-900">
                let's collab!
              </h2>
              <p className="text-xl text-purple-700 mb-8">
                hmu for all ur creative needs~ ✨
              </p>
              <Button className="bg-gradient-to-r from-cyan-400 to-pink-400 hover:from-cyan-500 hover:to-pink-500 text-white font-black text-xl px-10 py-6 h-auto rounded-full border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                <FiMail className="mr-2 w-6 h-6" />
                pixel@dreams.com
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-white bg-purple-500/90 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-center font-bold text-white text-lg">
            made with 💖 by pixel dreams © {new Date().getFullYear()} ✨
          </p>
        </div>
      </footer>
    </div>
  );
}
