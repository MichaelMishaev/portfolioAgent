"use client";

import { useState, useEffect } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FiMail, FiGithub, FiLinkedin, FiInstagram, FiExternalLink, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "Sarah Chen",
  title: "Creative Director & Photographer",
  bio: "Capturing moments that tell stories. Specialized in portrait, fashion, and commercial photography with a cinematic touch.",
  stats: [
    { value: "500+", label: "Завершенных проектов" },
    { value: "50+", label: "Клиентов брендов" },
    { value: "10+", label: "Наград получено" },
  ],
  services: [
    "Портретная фотография",
    "Модная редакция",
    "Коммерческие кампании",
    "Креативное направление",
    "Редактирование фото",
    "Брендовый сторителлинг",
  ],
  projects: [
    {
      id: 1,
      title: "Городские истории",
      category: "Фотография",
      description: "Визуальное путешествие по городским пейзажам и городской жизни.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Мода вперед",
      category: "Мода",
      description: "Редакционная модная фотография для ведущих журналов.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Брендовая кампания",
      category: "Коммерческая",
      description: "Полная визуальная идентичность и кампания для люксового бренда.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Серия портретов",
      category: "Портрет",
      description: "Интимные портреты, исследующие человеческие эмоции и характер.",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Серия ночной жизни",
      category: "Фотография",
      description: "Захват энергии и атмосферы ночных городских пейзажей.",
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      title: "Витрина продуктов",
      category: "Коммерческая",
      description: "Высококачественная фотография продуктов для электронной коммерции и рекламы.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    },
  ],
  testimonials: [
    {
      quote: "Креативное видение Сары превзошло наши ожидания от брендовой кампании.",
      author: "Маркус Ли",
      role: "Креативный директор, Vogue",
    },
    {
      quote: "Работать с Сарой всегда удовольствие. Её внимание к деталям непревзойденно.",
      author: "Аманда Родригес",
      role: "Менеджер бренда, Nike",
    },
  ],
};

export default function TestUserPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-3 sm:px-3 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Назад
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#work" className="text-sm hover:text-cyan-400 transition-colors">
                Работы
              </a>
              <a href="#about" className="text-sm hover:text-cyan-400 transition-colors">
                О нас
              </a>
              <a href="#contact" className="text-sm hover:text-cyan-400 transition-colors">
                Контакт
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 text-white hover:bg-white/10 rounded-md border border-white/20 transition-colors"
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
              <a href="#work" className="text-sm hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                Работы
              </a>
              <a href="#about" className="text-sm hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                О нас
              </a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                Контакт
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* REORDERED SECTIONS BASED ON USER SELECTION */}

      {/* 1. STATS SECTION (User's first choice - IXk2iRakJQ) */}
      <section className="container mx-auto px-3 sm:px-3 py-20 pt-32 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-full mx-auto">
          {portfolioData.stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 2. SERVICES/SKILLS SECTION #1 (User's second choice - PAhVPHXvY8) */}
      <section className="container mx-auto px-3 sm:px-3 py-32 border-t border-white/10">
        <ScrollReveal>
          <h2 className="text-sm font-semibold text-cyan-400 mb-12 uppercase tracking-wider text-center">
            Что я делаю
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full mx-auto">
          {portfolioData.services.map((service, index) => (
            <ScrollReveal key={service} delay={index * 0.05}>
              <div className="bg-white/5 hover:bg-cyan-400/10 border border-white/10 hover:border-cyan-400/50 p-6 transition-all">
                <p className="text-lg text-gray-300">{service}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. SERVICES/SKILLS SECTION #2 (User's third choice - fgZV-Zo5y3 - DUPLICATE) */}
      <section className="container mx-auto px-3 sm:px-3 py-32 border-t border-white/10">
        <ScrollReveal>
          <h2 className="text-sm font-semibold text-cyan-400 mb-12 uppercase tracking-wider text-center">
            Что я делаю
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full mx-auto">
          {portfolioData.services.map((service, index) => (
            <ScrollReveal key={`dup-${service}`} delay={index * 0.05}>
              <div className="bg-white/5 hover:bg-cyan-400/10 border border-white/10 hover:border-cyan-400/50 p-6 transition-all">
                <p className="text-lg text-gray-300">{service}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. HERO SECTION (User's fourth choice - qncjQMQRxh) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10 text-center px-3">
          <FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {portfolioData.name}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8">
              {portfolioData.title}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold min-h-[44px] w-full sm:w-auto"
            >
              Изучить мои работы
            </Button>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full p-1">
            <div className="w-1 h-2 bg-cyan-400 rounded-full mx-auto" />
          </div>
        </div>
      </section>

      {/* 5. REST OF THE TEMPLATE CONTENT (after user's selections) */}

      {/* Work Section */}
      <section id="work" className="container mx-auto px-3 sm:px-3 py-32">
        <ScrollReveal>
          <h2 className="text-sm font-semibold text-cyan-400 mb-12 uppercase tracking-wider">
            Избранные работы
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <Card className="group bg-gray-900/50 border-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {project.description}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center">
                      <FiExternalLink className="text-black" />
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

        <div className="container mx-auto px-3 sm:px-3 relative z-10">
          <div className="max-w-full mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-sm font-semibold text-cyan-400 mb-8 uppercase tracking-wider">
                Обо мне
              </h2>
              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-12">
                {portfolioData.bio}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex justify-center gap-6">
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 hover:bg-cyan-400/20 border border-white/10 hover:border-cyan-400 rounded-full flex items-center justify-center transition-all"
                  aria-label="Instagram Profile"
                >
                  <FiInstagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 hover:bg-cyan-400/20 border border-white/10 hover:border-cyan-400 rounded-full flex items-center justify-center transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 hover:bg-cyan-400/20 border border-white/10 hover:border-cyan-400 rounded-full flex items-center justify-center transition-all"
                  aria-label="GitHub Profile"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-3 sm:px-3 py-32 border-t border-white/10">
        <ScrollReveal>
          <h2 className="text-sm font-semibold text-cyan-400 mb-16 uppercase tracking-wider text-center">
            Отзывы клиентов
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
          {portfolioData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.author} delay={index * 0.1}>
              <Card className="bg-white/5 border-white/10 p-8">
                <p className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-cyan-400">{testimonial.role}</p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-3 sm:px-3 py-32">
        <div className="max-w-full mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-8">
              Давайте создадим что-то{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Удивительное
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-400 mb-12">
              Доступен для фриланс проектов и сотрудничества
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold text-lg px-8 min-h-[44px] w-full sm:w-auto"
            >
              <FiMail className="mr-2" />
              Связаться
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black">
        <div className="container mx-auto px-3 sm:px-3 py-8">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} {portfolioData.name}. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
