"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { FiMail, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { useTheme } from "next-themes";

export function SplitScreenEditorialTemplate() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { tt } = useI18n();
  const data = tt?.splitScreenEditorial;

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-12">
      {/* Fixed Left Sidebar */}
      <aside className="lg:col-span-4 lg:fixed lg:h-screen lg:w-1/3 bg-gray-900 text-white p-8 lg:p-12 flex flex-col justify-between overflow-y-auto">
        <div>
          <Link href="/" className="text-sm text-gray-400 hover:text-white mb-8 block">
            {tt.common.back}
          </Link>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">{data.sidebar.name}</h1>
          <p className="text-gray-400 text-lg mb-8">
            {data.sidebar.title}
          </p>

          <nav className="space-y-4 mb-12">
            <a href="#work" className="block text-xl hover:text-blue-400 transition-colors">
              {tt.common.work}
            </a>
            <a href="#about" className="block text-xl hover:text-blue-400 transition-colors">
              {tt.common.about}
            </a>
            <a href="#contact" className="block text-xl hover:text-blue-400 transition-colors">
              {tt.common.contact}
            </a>
          </nav>

          <div className="flex gap-4 mb-8">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-gray-500">CONNECT</div>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter profile">
              <FiTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn profile">
              <FiLinkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram profile">
              <FiInstagram size={20} />
            </a>
          </div>
        </div>
      </aside>

      {/* Scrolling Right Content */}
      <main className="lg:col-span-8 lg:col-start-5 bg-white">
        {/* Hero/Intro */}
        <section id="work" className="min-h-screen flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-2xl">
            <ScrollReveal>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 break-words ${isDark ? 'text-white' : 'text-gray-900'}`}>{data.intro.headline}</h2>
              <p className="text-2xl text-gray-600 leading-relaxed">
                {data.intro.description}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Project Gallery - Fullscreen */}
        {data.projects.map((project: any, index: number) => (
          <article
            key={index}
            className="relative min-h-screen flex items-center justify-center group cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>

            <div className="relative z-10 text-center text-white p-8">
              <ScrollReveal>
                <div className="text-sm font-semibold mb-2 text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]">{project.client}</div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 break-words text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]">{project.title}</h2>
                <p className="text-xl max-w-2xl mx-auto text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]">
                  {project.description}
                </p>
              </ScrollReveal>
            </div>

            <div className="absolute top-8 right-8 text-white/20 text-7xl lg:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black">
              {String(index + 1).padStart(2, '0')}
            </div>
          </article>
        ))}

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center p-8 lg:p-16 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>{tt.common.about}</h2>
              <div className="prose prose-lg">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {data.about.bio}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {data.about.experience}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-12 grid md:grid-cols-2 gap-8">
                {data.about.expertise.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{skill}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center p-8 lg:p-16 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollReveal>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 break-words ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {tt.common.letsWorkTogether}
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                {data.contact.description}
              </p>
              <a
                href={`mailto:${data.contact.email}`}
                className="inline-block text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {data.contact.email}
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats - Editorial Numbers */}
        <section className="py-20 px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-y border-gray-200 py-12">
            {[{ n: "10+", l: "Years" }, { n: "200+", l: "Stories" }, { n: "50M", l: "Readers" }, { n: "15", l: "Awards" }].map((s, i) => (
              <div key={i}>
                <div className={`text-4xl sm:text-5xl font-serif font-bold mb-2 break-words ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.n}</div>
                <div className="text-sm uppercase tracking-widest text-gray-600">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline - Editorial Career */}
        <section className="py-20 px-8">
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Career Highlights</h2>
          <div className="space-y-8 border-l-2 border-gray-300 pl-8">
            {[
              { y: "2024", t: "Editor-in-Chief", p: "Modern Magazine" },
              { y: "2021", t: "Senior Writer", p: "The Atlantic" },
              { y: "2018", t: "Staff Writer", p: "New York Times" },
              { y: "2015", t: "Freelance Journalist", p: "Various Publications" }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                <div className="text-sm text-gray-500 mb-1">{item.y}</div>
                <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.t}</h3>
                <p className="text-gray-600">{item.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials - Magazine Pull Quotes */}
        <section className="py-20 px-8 bg-gray-50">
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Praise</h2>
          <div className="space-y-12">
            {[
              { q: "A masterful storyteller with an eye for detail", a: "Jane Doe", r: "Editor, Vogue" },
              { q: "Their narratives captivate and inspire", a: "John Smith", r: "Publisher, TIME" },
              { q: "Consistently delivers award-winning journalism", a: "Sarah Lee", r: "Director, Columbia J-School" }
            ].map((t, i) => (
              <blockquote key={i} className="border-l-4 border-blue-600 pl-6 py-2">
                <p className={`text-2xl font-serif italic mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>"{t.q}"</p>
                <footer className="text-sm text-gray-700"><strong>{t.a}</strong>, {t.r}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Pricing - Editorial Services */}
        <section className="py-20 px-8">
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Services & Rates</h2>
          <div className="space-y-6">
            {[
              { s: "Feature Articles", p: "$2,500/piece", d: "Long-form journalism, 2000-5000 words" },
              { s: "Editorial Consulting", p: "$300/hr", d: "Story development and manuscript review" },
              { s: "Speaking Engagements", p: "Contact", d: "Keynotes, panels, and workshops" }
            ].map((srv, i) => (
              <div key={i} className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{srv.s}</h3>
                  <span className="text-lg font-semibold text-blue-600">{srv.p}</span>
                </div>
                <p className="text-gray-600">{srv.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ - Editorial Format */}
        <section className="py-20 px-8 bg-gray-50">
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>FAQ</h2>
          <div className="space-y-8">
            {[
              { q: "What's your editorial process?", a: "Research → Interviews → Drafting → Fact-checking → Editing → Publication" },
              { q: "How long does a feature take?", a: "Typically 3-6 weeks depending on complexity and interview availability." },
              { q: "Do you accept commissioned work?", a: "Yes, I work with publications and brands on commissioned pieces." },
              { q: "What topics do you cover?", a: "Culture, technology, politics, and human interest stories." }
            ].map((faq, i) => (
              <div key={i}>
                <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.q}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA - Editorial Call-Out */}
        <section className="py-24 px-8 bg-blue-600 text-white text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 break-words text-white">Let's Tell Your Story</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 text-white">
            Have a story that needs to be told? Let's collaborate on your next editorial project.
          </p>
          <a href="#contact" className="inline-block bg-white text-blue-600 px-8 py-4 font-bold hover:bg-gray-100 transition-colors">
            Get in Touch
          </a>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 bg-gray-900 text-white text-center">
          <p className="text-gray-400">&copy; 2025 {data.sidebar.name}. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
