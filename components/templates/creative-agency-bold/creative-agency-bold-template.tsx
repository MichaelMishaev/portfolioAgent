"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiMail, FiInstagram, FiTwitter, FiMenu, FiX, FiArrowRight, FiZap, FiHeart, FiStar } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n-context";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CustomizeTemplateButton } from "@/components/customize-template-button";

export function CreativeAgencyBoldTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { tt } = useI18n();
  const data = tt?.creativeAgencyBold;

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const accentColors = ['border-blue-500', 'border-green-500', 'border-pink-500', 'border-yellow-400'];

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleCardMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-blue-600 hover:text-blue-700">
            {tt.common.backToGallery}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-sm font-bold hover:text-blue-600 transition-colors">
              {tt.common.work}
            </a>
            <a href="#services" className="text-sm font-bold hover:text-blue-600 transition-colors">
              {tt.common.services}
            </a>
            <a href="#contact" className="text-sm font-bold hover:text-blue-600 transition-colors">
              {tt.common.contact}
            </a>
            <ThemeToggle />
            <LanguageToggle />
            <CustomizeTemplateButton />
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              <a href="#work" onClick={() => setMobileMenuOpen(false)} className="font-bold">
                {tt.common.work}
              </a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="font-bold">
                {tt.common.services}
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="font-bold">
                {tt.common.contact}
              </a>
              <div className="pt-2">
                <CustomizeTemplateButton className="w-full" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Split-Screen Hero with Parallax */}
      <section className="min-h-screen grid lg:grid-cols-2 mt-16 relative overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ y: y, opacity, scale }}
          className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 text-white flex items-center p-8 lg:p-20 relative z-10"
        >
          <div>
            <motion.h1
              className="text-6xl lg:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {data.hero.line1}
              <br />
              <span className="text-yellow-300 inline-block hover:scale-110 transition-transform duration-300">{data.hero.line2}</span>
              <br />
              {data.hero.line3}
            </motion.h1>
            <motion.p
              className="text-2xl text-blue-100 mb-8 max-w-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {data.hero.subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:scale-110 hover:shadow-2xl transition-all duration-300 px-10 py-6 rounded-full text-xl font-bold group relative overflow-hidden"
              >
                <span className="relative z-10">{data.hero.cta}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-pink-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 150]) }}
          className="bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 relative overflow-hidden flex items-center justify-center"
        >
          <motion.div
            className="text-9xl text-yellow-500/20"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <FiZap />
          </motion.div>

          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </section>

      {/* Bold Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {data.stats.map((stat: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-600 mb-2 break-words">{stat.value}</div>
                  <div className="text-xl font-bold text-gray-600">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating Content Blocks */}
      <section id="work" className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl font-black mb-20 text-center break-words text-gray-900">{data.portfolio.title}</h2>
          </ScrollReveal>

          {data.portfolio.projects.map((project: any, index: number) => (
            <ScrollReveal key={index}>
              <div className={`grid lg:grid-cols-2 gap-12 items-center mb-32 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <motion.div
                    className="w-16 h-1 bg-blue-600 mb-6"
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                  <h3 className="text-4xl lg:text-4xl sm:text-5xl font-bold mb-6 hover:text-blue-600 transition-colors duration-300 break-words">{project.title}</h3>
                  <p className="text-xl text-gray-600 leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <motion.a
                    href="#"
                    className="text-blue-600 text-lg font-bold hover:underline inline-flex items-center gap-2 group"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tt.common.viewProject} <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </motion.a>
                </div>
                <motion.div
                  className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12),0_16px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] h-96 flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-500">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-8xl text-blue-600/20 group-hover:scale-110 transition-transform duration-500">
                        <FiStar />
                      </div>
                    )}
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10" />
                    {/* Gradient border glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                         style={{
                           background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5))',
                           filter: 'blur(20px)',
                           zIndex: -1
                         }}
                    />
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Services with Border Accents */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl font-black text-center mb-16 break-words text-gray-900">{data.services.title}</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {data.services.items.map((service: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  className={`bg-white p-8 rounded-lg border-l-4 ${
                    accentColors[index % 4]
                  } shadow-[0_2px_10px_rgba(0,0,0,0.1),0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] cursor-pointer relative overflow-hidden group`}
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.div
                    className="text-5xl mb-4 relative z-10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 relative z-10 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed relative z-10">{service.description}</p>

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-bl-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      {data.process && (
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-7xl px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black mb-4 break-words text-gray-900">{data.process.title}</h2>
                <p className="text-xl text-gray-600">{data.process.subtitle}</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-5 gap-8">
              {data.process.steps.map((step: any, index: number) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    className="text-center group cursor-pointer"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-600/20 mb-4 group-hover:text-blue-600/40 transition-colors break-words">{step.number}</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    <div className="text-sm text-blue-600 font-bold">{step.duration}</div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {data.team && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black mb-4 break-words text-gray-900">{data.team.title}</h2>
                <p className="text-xl text-gray-600">{data.team.subtitle}</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-4 gap-8">
              {data.team.members.map((member: any, index: number) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    className="text-center group cursor-pointer"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6 relative overflow-hidden rounded-2xl aspect-square">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{member.name}</h3>
                    <div className="text-blue-600 font-bold mb-2">{member.role}</div>
                    <p className="text-gray-600">{member.bio}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog/Insights Section */}
      {data.blog && (
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-7xl px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black mb-4 break-words text-gray-900">{data.blog.title}</h2>
                <p className="text-xl text-gray-600">{data.blog.subtitle}</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {data.blog.posts.map((post: any, index: number) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.article
                    className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-blue-600 uppercase">{post.category}</span>
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="text-sm text-gray-500">{post.date}</div>
                    </div>
                  </motion.article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Awards Section */}
      {data.awards && (
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto max-w-7xl px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black mb-4 break-words text-gray-900">{data.awards.title}</h2>
                <p className="text-xl text-gray-400">{data.awards.subtitle}</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {data.awards.items.map((award: any, index: number) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    className="p-8 bg-white/5 rounded-2xl border border-white/10 group cursor-pointer"
                    whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="text-4xl">🏆</div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{award.title}</h3>
                        <div className="text-blue-400 font-bold mb-2">{award.organization} • {award.year}</div>
                        <p className="text-gray-400">{award.category}</p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {data.faq && (
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-4xl px-6">
            <ScrollReveal>
              <h2 className="text-4xl sm:text-5xl font-black text-center mb-16 break-words text-gray-900">{data.faq.title}</h2>
            </ScrollReveal>

            <div className="space-y-6">
              {data.faq.items.map((item: any, index: number) => (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <motion.div
                    className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-xl font-bold mb-3 text-blue-600">{item.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      {data.newsletter && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto max-w-3xl px-6">
            <ScrollReveal>
              <div className="text-center">
                <h2 className="text-4xl sm:text-5xl font-black mb-4 break-words text-gray-900">{data.newsletter.title}</h2>
                <p className="text-xl text-gray-600 mb-8">{data.newsletter.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder={data.newsletter.placeholder}
                    className="flex-1 px-6 py-4 rounded-full border-2 border-blue-200 focus:border-blue-600 focus:outline-none text-lg"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold">
                    {data.newsletter.buttonText}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">{data.newsletter.disclaimer}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Bold CTA */}
      <section className="py-32 bg-gradient-to-br from-pink-500 via-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight break-words text-gray-900">
              {data.cta.title}
            </h2>
            <p className="text-2xl mb-12 text-white/90">
              {data.cta.subtitle}
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:scale-110 transition-transform px-12 py-8 rounded-full text-2xl font-black"
            >
              {data.cta.buttonText}
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-black mb-4 text-gray-900">{tt.common.getInTouch}</h3>
            <p className="text-xl text-gray-400 mb-8">{data.contact.description}</p>
            <div className="flex gap-6 justify-center">
              <a
                href={`mailto:${data.contact.email}`}
                className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <FiMail size={24} />
              </a>
              <a
                href="#"
                className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <FiInstagram size={24} />
              </a>
              <a
                href="#"
                className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <FiTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Skills - Creative Agency Bold */}
          <section className="py-20 border-t border-gray-800">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-12 text-center break-words text-gray-900">OUR SKILLS</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Branding', 'Design', 'Strategy', 'Development', 'Marketing', 'Content', 'Video', 'Photography'].map((skill, i) => (
                <div key={i} className="bg-gradient-to-br from-red-500 to-orange-500 p-8 rounded-2xl text-center transform hover:scale-105 transition-transform">
                  <span className="font-black text-white text-xl">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* About - Creative Agency Bold */}
          <section className="py-20 border-t border-gray-800 bg-gradient-to-br from-purple-900 to-black">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 break-words text-gray-900">ABOUT US</h3>
              <p className="text-2xl text-gray-300 mb-6 font-bold">
                WE ARE A BOLD CREATIVE AGENCY PUSHING BOUNDARIES AND BREAKING RULES.
              </p>
              <p className="text-xl text-gray-400">
                With a team of fearless creatives, we transform brands through daring design and innovative thinking.
              </p>
            </div>
          </section>

          {/* Pricing - Creative Agency Bold */}
          <section className="py-20 border-t border-gray-800">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-12 text-center break-words text-gray-900">PRICING</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'LAUNCH', price: '$5K', color: 'from-blue-500 to-cyan-500', features: ['Brand Identity', 'Website Design', '3 Revisions'] },
                { name: 'GROW', price: '$15K', color: 'from-red-500 to-orange-500', features: ['Full Branding', 'Website + Marketing', 'Unlimited Revisions', 'Social Strategy'], popular: true },
                { name: 'DOMINATE', price: '$50K+', color: 'from-purple-500 to-pink-500', features: ['Complete Rebrand', 'Multi-Platform', 'Video Production', 'Ongoing Support'] }
              ].map((pkg, i) => (
                <div key={i} className={`bg-gradient-to-br ${pkg.color} p-8 rounded-2xl ${pkg.popular ? 'ring-4 ring-yellow-400 scale-105' : ''}`}>
                  {pkg.popular && <div className="text-xs font-black text-yellow-300 mb-2">MOST POPULAR</div>}
                  <h4 className="text-3xl font-black mb-2 text-white">{pkg.name}</h4>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-8 break-words">{pkg.price}</div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="font-bold text-white">✓ {f}</li>
                    ))}
                  </ul>
                  <Button className="w-full bg-white text-black hover:bg-gray-200 font-black text-lg h-14">
                    LET'S GO
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials - Creative Agency Bold */}
          <section className="py-20 border-t border-gray-800 bg-gradient-to-br from-red-900 to-black">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-12 text-center break-words text-gray-900">WHAT CLIENTS SAY</h3>
            <div className="max-w-4xl mx-auto space-y-8">
              {[
                { text: 'They completely transformed our brand. Bold, fearless, and incredibly talented!', author: 'Sarah Martinez', company: 'TechStartup Inc' },
                { text: 'Best agency we\'ve worked with. They don\'t just design - they innovate!', author: 'James Chen', company: 'Fashion Forward' },
                { text: 'Our sales increased 400% after the rebrand. These guys are LEGENDS!', author: 'Emily Rodriguez', company: 'FitLife' }
              ].map((t, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border-2 border-white/10">
                  <p className="text-2xl font-bold text-white mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <div className="font-black text-xl text-white">{t.author}</div>
                    <div className="text-gray-400">{t.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline - Creative Agency Bold */}
          <section className="py-20 border-t border-gray-800">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-12 text-center break-words text-gray-900">OUR JOURNEY</h3>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { year: '2024', title: 'GLOBAL EXPANSION', desc: 'Opened studios in NYC, London, Tokyo' },
                { year: '2022', title: 'AWARD WINNING', desc: 'Won 15 international design awards' },
                { year: '2020', title: 'TEAM GROWTH', desc: 'Grew to 50+ creative professionals' },
                { year: '2018', title: 'AGENCY FOUNDED', desc: 'Started with a bold vision' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-24 bg-gradient-to-br from-red-500 to-orange-500 p-4 rounded-xl text-center">
                    <div className="text-3xl font-black text-white">{item.year}</div>
                  </div>
                  <div className="flex-1 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                    <h4 className="font-black text-xl mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="font-bold">&copy; 2025 Creative Bold Agency. Let's Create Something Amazing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
