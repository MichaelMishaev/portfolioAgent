"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiMail,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiArrowRight,
  FiStar,
  FiCheckCircle,
  FiBook,
  FiHeadphones,
  FiVideo,
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiHeart
} from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { useState } from "react";

export function OnlineBusinessCoachTemplate() {
  const { tt } = useI18n();
  const data = tt.onlineBusiness || {};
  const [email, setEmail] = useState("");
  const [formStep, setFormStep] = useState(1);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gradient-to-br from-amber-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-amber-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-3 md:px-3 max-w-full py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            {tt.common?.backToGallery || "← Back to Gallery"}
          </Link>
          <div className="flex items-center gap-6">
            <a href="#about" className="hidden md:block text-sm font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {tt.common?.about || "About"}
            </a>
            <a href="#offerings" className="hidden md:block text-sm font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {data.nav?.workWithMe || "Work With Me"}
            </a>
            <a href="#testimonials" className="hidden md:block text-sm font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {data.nav?.successStories || "Success Stories"}
            </a>
            <a href="#contact" className="hidden md:block text-sm font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {data.nav?.connect || "Connect"}
            </a>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section - Coach/Expert Focus */}
      <section className="container mx-auto px-3 md:px-3 max-w-full pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 px-3 py-2">
                <FiAward className="mr-2" />
                {data.badge || "Bestselling Author • Speaker • Coach"}
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {data.heroTitle || "From Overwhelm to Empowerment"}
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {data.heroSubtitle || "Transforming lives through coaching, courses, and community. Join thousands who've discovered their path to success."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-lg px-8 py-6">
                  {data.hero?.startJourney || "Start Your Journey"}
                  <FiArrowRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-amber-500 !text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950 text-lg px-8 py-6">
                  {data.hero?.freeCall || "Free Discovery Call"}
                </Button>
              </div>

              {/* Social Proof Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <div className="text-3xl font-bold text-amber-600">50K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{data.hero?.students || "Students"}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{data.hero?.yearsExp || "Years Experience"}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">4.9★</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{data.hero?.rating || "Rating"}</div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-blue-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop&q=80"
                  alt="Professional Life Coach"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                    <FiTrendingUp className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured In / Press Logos */}
      <section className="py-12 border-y border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-3 md:px-3 max-w-full">
          <ScrollReveal>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-8 uppercase tracking-wider">
              {data.featuredIn || "Featured In"}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              <div className="text-2xl font-bold text-gray-400">FORBES</div>
              <div className="text-2xl font-bold text-gray-400">ELLE</div>
              <div className="text-2xl font-bold text-gray-400">INC.</div>
              <div className="text-2xl font-bold text-gray-400">COSMOPOLITAN</div>
              <div className="text-2xl font-bold text-gray-400">HUFFPOST</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-3 md:px-3 max-w-full py-20 md:py-32">
        <ScrollReveal>
          <div className="text-center max-w-full mx-auto">
            <h2 className="text-3xl md:text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent break-words">
              {data.aboutTitle || "Hi, I'm Your Guide to Transformation"}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {data.aboutText || "For over 15 years, I've been helping ambitious entrepreneurs and leaders break through their limitations and create the life and business they truly desire. My approach combines practical strategies with deep inner work, creating lasting transformation from the inside out."}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Offerings Section - Books, Courses, Coaching */}
      <section id="offerings" className="container mx-auto px-3 md:px-3 max-w-full py-20 md:py-32 bg-gradient-to-br from-amber-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl sm:text-5xl font-bold mb-4 break-words text-gray-900">
              {data.offerings?.title || "Ways to Work With Me"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-full mx-auto">
              {data.offerings?.subtitle || "Choose the path that feels right for you. Each offering is designed to meet you where you are."}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Bestselling Book */}
          <ScrollReveal delay={0.1}>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-amber-300 dark:hover:border-amber-600 overflow-hidden">
              <div className="aspect-[3/4] bg-gradient-to-br from-amber-400 to-amber-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiBook className="w-24 h-24 text-white/80" />
                </div>
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  {data.offerings?.book?.badge || "Bestseller"}
                </Badge>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{data.offerings?.book?.title || "Time Magic"}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {data.offerings?.book?.description || "A practical guide to reclaiming your time and energy. Transform how you work and live."}
                </p>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
                  {data.offerings?.book?.cta || "Get the Book"}
                  <FiArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Online Course */}
          <ScrollReveal delay={0.2}>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600 overflow-hidden">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-400 to-blue-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiVideo className="w-24 h-24 text-white/80" />
                </div>
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  {data.offerings?.course?.badge || "Self-Paced"}
                </Badge>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{data.offerings?.course?.title || "Mastery Program"}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {data.offerings?.course?.description || "8-week online course with video lessons, workbooks, and community support."}
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                  {data.offerings?.course?.cta || "Learn More"}
                  <FiArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* 1:1 Coaching */}
          <ScrollReveal delay={0.3}>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600 overflow-hidden">
              <div className="aspect-[3/4] bg-gradient-to-br from-purple-400 to-purple-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiUsers className="w-24 h-24 text-white/80" />
                </div>
                <Badge className="absolute top-4 right-4 bg-white/90 text-purple-700">
                  <FiStar className="mr-1" />
                  {data.offerings?.coaching?.premiumBadge || "Premium"}
                </Badge>
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  {data.offerings?.coaching?.badge || "Limited Spots"}
                </Badge>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{data.offerings?.coaching?.title || "1:1 Coaching"}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {data.offerings?.coaching?.description || "Work directly with me for personalized transformation and breakthrough results."}
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                  {data.offerings?.coaching?.cta || "Apply Now"}
                  <FiArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Podcast */}
          <ScrollReveal delay={0.4}>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-pink-300 dark:hover:border-pink-600 overflow-hidden">
              <div className="aspect-[3/4] bg-gradient-to-br from-pink-400 to-pink-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiHeadphones className="w-24 h-24 text-white/80" />
                </div>
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">
                  {data.offerings?.podcast?.badge || "#1 Podcast"}
                </Badge>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{data.offerings?.podcast?.title || "The Growth Show"}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {data.offerings?.podcast?.description || "Weekly inspiration, practical tips, and interviews with world-class guests."}
                </p>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white">
                  {data.offerings?.podcast?.cta || "Listen Now"}
                  <FiArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Community */}
          <ScrollReveal delay={0.5}>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-green-300 dark:hover:border-green-600 overflow-hidden">
              <div className="aspect-[3/4] bg-gradient-to-br from-green-400 to-green-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiHeart className="w-24 h-24 text-white/80" />
                </div>
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {data.offerings?.community?.badge || "Join 10K+ Members"}
                </Badge>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{data.offerings?.community?.title || "Inner Circle Community"}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {data.offerings?.community?.description || "Connect with like-minded individuals on the same journey. Monthly coaching calls, resources, and support."}
                </p>
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                  {data.offerings?.community?.cta || "Join the Community"}
                  <FiArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-3 md:px-3 max-w-full py-20 md:py-32">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl sm:text-5xl font-bold mb-4 break-words text-gray-900">
              {data.testimonials?.title || "Success Stories"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-full mx-auto">
              {data.testimonials?.subtitle || "Real transformations from real people who've done the work."}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                    {data.testimonials?.quote || "Working with her changed my life. I went from overwhelmed and stuck to clear, focused, and thriving in my business."}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-blue-500"></div>
                    <div>
                      <div className="font-semibold">Sarah Johnson</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">CEO, TechStart</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Newsletter Signup with Lead Magnet */}
      <section className="container mx-auto px-3 md:px-3 max-w-full py-20 md:py-32">
        <ScrollReveal>
          <Card className="bg-gradient-to-br from-amber-500 to-blue-600 border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="text-center max-w-full mx-auto">
                <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold text-white mb-4">
                  {data.newsletter?.title || "Get My Free Clarity Guide"}
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  {data.newsletter?.subtitle || "Join 50,000+ subscribers and get weekly strategies for growth, plus my proven 7-step framework for clarity."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder={data.newsletter?.placeholder || "Enter your email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900"
                  />
                  <Button size="lg" className="bg-white !text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold">
                    {data.newsletter?.cta || "Get Free Guide"}
                  </Button>
                </div>

                <p className="text-sm text-white/80 mt-4">
                  {data.newsletter?.privacy || "✓ No spam, ever. Unsubscribe anytime."}
                </p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* Blog/Content Section */}
      <section className="container mx-auto px-3 md:px-3 max-w-full py-20 md:py-32 border-t border-gray-200 dark:border-gray-800">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl sm:text-5xl font-bold mb-4 break-words text-gray-900">
              {data.blog?.title || "Latest Insights"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-full mx-auto">
              {data.blog?.subtitle || "Strategies and inspiration to fuel your growth journey."}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-amber-200 to-blue-200 relative overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${i === 1 ? '1499750310107-5fef28a66643' : i === 2 ? '1522202176988-66273c2fd55f' : '1484480974693-6ca0a78fb36b'}?w=600&h=400&fit=crop&q=80`}
                    alt="Blog post about personal growth and success"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3">Mindset</Badge>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors text-gray-900">
                    5 Ways to Overcome Impostor Syndrome
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Discover practical strategies to silence self-doubt and step into your power.
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>5 min read</span>
                    <span>→</span>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact/Discovery Call Section */}
      <section id="contact" className="container mx-auto px-3 md:px-3 max-w-full py-20 md:py-32">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <div className="max-w-full mx-auto text-center">
              <h2 className="text-3xl md:text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                {data.contactForm?.title || "Ready to Transform Your Life?"}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {data.contactForm?.subtitle || "Book a free 30-minute discovery call to see if we're a good fit to work together."}
              </p>

              {formStep === 1 && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder={data.contactForm?.namePlaceholder || "Your Name"}
                    className="w-full px-3 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="email"
                    placeholder={data.contactForm?.emailPlaceholder || "Your Email"}
                    className="w-full px-3 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 text-lg"
                    onClick={() => setFormStep(2)}
                  >
                    {data.contactForm?.continue || "Continue"}
                    <FiArrowRight className="ml-2" />
                  </Button>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-4">
                  <select className="w-full px-3 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>{data.contactForm?.selectQuestion || "What are you most interested in?"}</option>
                    <option>1:1 Coaching</option>
                    <option>Online Course</option>
                    <option>Group Program</option>
                    <option>Just Exploring</option>
                  </select>
                  <textarea
                    placeholder={data.contactForm?.challengePlaceholder || "Tell me about your biggest challenge right now..."}
                    rows={4}
                    className="w-full px-3 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 text-lg"
                  >
                    {data.contactForm?.bookCall || "Book My Free Call"}
                    <FiCheckCircle className="ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 py-12">
        <div className="container mx-auto px-3 md:px-3 max-w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">{data.footer?.resources || "Resources"}</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.books || "Books"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.courses || "Courses"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.podcast || "Podcast"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.blog || "Blog"}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">{data.footer?.workWithMe || "Work With Me"}</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.oneOnOne || "1:1 Coaching"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.groupPrograms || "Group Programs"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.speaking || "Speaking"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.consulting || "Consulting"}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">{data.footer?.company || "Company"}</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-amber-600 transition-colors">{tt.common?.about || "About"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.press || "Press"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{tt.common?.contact || "Contact"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.privacy || "Privacy"}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">{data.nav?.connect || "Connect"}</h3>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                  <FiInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                  <FiYoutube className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>{data.footer?.copyright || "© 2025 Your Name. All rights reserved. | Built with passion and purpose."}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
