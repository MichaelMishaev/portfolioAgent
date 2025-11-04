"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiMail, FiLinkedin, FiTwitter, FiGithub, FiMenu, FiX, FiDownload } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

export function PersonalBrandTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { tt } = useI18n();
  const data = tt?.personalBrand;

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900 hover:text-blue-600">
            {tt.common.backToGallery}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {tt.common.work}
            </a>
            <a href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {tt.common.about}
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-blue-600 transition-colors">
              FAQ
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {tt.common.contact}
            </a>
            <ThemeToggle />
            <LanguageToggle />
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
              <a href="#work" onClick={() => setMobileMenuOpen(false)}>{tt.common.work}</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>{tt.common.about}</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{tt.common.contact}</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero with Personal Photo */}
      <section className="min-h-screen flex items-center px-6 pt-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {data.hero.greeting}
              </h1>
              <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
                {data.hero.intro}
              </p>
              <p className="text-xl text-gray-600 mb-8">
                {data.hero.currentRole}
              </p>

              <div className="flex gap-4 flex-wrap mb-8">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  {data.hero.primaryCta}
                </Button>
                <Button variant="outline" className="border-2 px-8 py-6 text-lg">
                  <FiDownload className="mr-2" />
                  {data.hero.secondaryCta}
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-6">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FiLinkedin size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FiTwitter size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FiGithub size={24} />
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-gray-200 rounded-3xl shadow-2xl aspect-square flex items-center justify-center overflow-hidden">
                <span className="text-9xl">👋</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Companies Worked With */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="text-sm font-semibold text-gray-500 mb-2">
                {data.companies.title}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center">
              {data.companies.logos.map((company: any, index: number) => (
                <div key={index} className="relative group">
                  <div className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="text-3xl mb-2">{company.icon}</div>
                    <div className="text-xs text-gray-500">{company.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-20 px-6 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-16 text-center">Selected Work</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {data.work.projects.map((project: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="overflow-hidden hover:shadow-2xl transition-shadow border-0">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-6xl">{project.icon}</span>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 text-center mb-16">
              {data.faq.subtitle}
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {data.faq.items.map((faq: any, index: number) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-gray-50 rounded-xl p-6">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full text-left flex justify-between items-center"
                  >
                    <span className="text-xl font-semibold text-gray-900">{faq.question}</span>
                    <span
                      className={`text-2xl transform transition-transform ${
                        expandedFaq === index ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {expandedFaq === index && (
                    <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-8 text-center">{tt.common.about}</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                {data.about.bio}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {data.about.philosophy}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {tt.common.letsWorkTogether}
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              {data.contact.description}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg">
                <FiMail className="mr-2" />
                {data.contact.emailCta}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 px-12 py-6 text-lg"
              >
                Schedule a Call
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-400">
              &copy; 2025 {data.hero.name}. Building products people love.
            </p>
          </div>

          {/* Stats - Personal Brand */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8 text-center">By The Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: '50K+', label: 'Followers' },
                { num: '100+', label: 'Projects' },
                { num: '5M+', label: 'Impressions' },
                { num: '4.9', label: 'Avg Rating' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold mb-2">{stat.num}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills - Personal Brand */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8 text-center">What I Do Best</h3>
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {['Product Strategy', 'UI/UX Design', 'Frontend Development', 'Brand Identity', 'Content Creation', 'Growth Marketing'].map((skill, i) => (
                <div key={i} className="bg-gray-800 p-6 rounded-lg text-center border border-gray-700 hover:border-blue-500 transition-colors">
                  <span className="font-semibold">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing - Personal Brand */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8 text-center">Work With Me</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Consultation', price: '$200/hr', desc: 'Strategy session and expert advice' },
                { name: 'Project', price: '$5,000+', desc: 'End-to-end product development' },
                { name: 'Retainer', price: '$10,000/mo', desc: 'Ongoing partnership and support' }
              ].map((option, i) => (
                <div key={i} className="bg-gray-800 p-8 rounded-lg border border-gray-700">
                  <h4 className="text-xl font-bold mb-2">{option.name}</h4>
                  <div className="text-3xl font-bold text-blue-400 mb-4">{option.price}</div>
                  <p className="text-gray-400">{option.desc}</p>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Get Started</Button>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials - Personal Brand */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8 text-center">What People Say</h3>
            <div className="max-w-4xl mx-auto space-y-6">
              {[
                { text: 'Incredible talent and great to work with. Highly recommended!', author: 'Alex Johnson', role: 'Founder, StartupCo' },
                { text: 'Delivered beyond expectations. A true professional.', author: 'Sarah Lee', role: 'VP Product, TechCorp' },
                { text: 'The best investment we made. 10/10 would work with again.', author: 'Mike Chen', role: 'CEO, GrowthLab' }
              ].map((t, i) => (
                <div key={i} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <p className="text-lg mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <div className="font-bold">{t.author}</div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline - Personal Brand */}
          <section className="py-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-8 text-center">My Journey</h3>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { year: '2024', title: 'Independent Consultant', desc: 'Helping companies build better products' },
                { year: '2022', title: 'Product Lead', desc: 'Led product team at Series B startup' },
                { year: '2020', title: 'Senior Designer', desc: 'Designed products for Fortune 500' },
                { year: '2018', title: 'Started Career', desc: 'Began journey in tech' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="text-2xl font-bold text-blue-400">{item.year}</div>
                  </div>
                  <div className="flex-1 bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
