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
import { useTheme } from "next-themes";
import { FiMenu, FiX } from "react-icons/fi";

export function OnlineBusinessCoachTemplate() {
  const { tt } = useI18n();
  const data = tt.onlineBusiness || {};
  const [email, setEmail] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gradient-to-br from-amber-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-amber-200 dark:border-gray-800 shadow-sm supports-[backdrop-filter]:bg-white/90 supports-[backdrop-filter]:dark:bg-gray-900/90">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            {tt.common?.backToGallery || "← Back to Gallery"}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-foreground/70 hover:text-amber-600 dark:hover:text-amber-400 transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
              {tt.common?.about || "About"}
            </a>
            <a href="#offerings" className="text-sm font-medium text-foreground/70 hover:text-amber-600 dark:hover:text-amber-400 transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
              {data.nav?.workWithMe || "Work With Me"}
            </a>
            <a href="#testimonials" className="text-sm font-medium text-foreground/70 hover:text-amber-600 dark:hover:text-amber-400 transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
              {data.nav?.successStories || "Success Stories"}
            </a>
            <a href="#contact" className="text-sm font-medium text-foreground/70 hover:text-amber-600 dark:hover:text-amber-400 transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
              {data.nav?.connect || "Connect"}
            </a>
            <div className="h-6 w-px bg-border mx-2" />
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors touch-manipulation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <a 
                href="#about" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-muted/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tt.common?.about || "About"}
              </a>
              <a 
                href="#offerings" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-muted/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {data.nav?.workWithMe || "Work With Me"}
              </a>
              <a 
                href="#testimonials" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-muted/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {data.nav?.successStories || "Success Stories"}
              </a>
              <a 
                href="#contact" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-muted/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {data.nav?.connect || "Connect"}
              </a>
              <div className="flex items-center gap-3 pt-2 border-t">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Coach/Expert Focus */}
      <section className="container mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 px-3 py-2">
                <FiAward className="mr-2" />
                {data.badge || "Bestselling Author • Speaker • Coach"}
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                {data.heroTitle || "From Overwhelm to Empowerment"}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                {data.heroSubtitle || "Transforming lives through coaching, courses, and community. Join thousands who've discovered their path to success."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-lg px-8 py-6">
                  {data.hero?.startJourney || "Start Your Journey"}
                  <FiArrowRight className="ml-2" aria-hidden="true" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-amber-500 !text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950 text-lg px-8 py-6">
                  {data.hero?.freeCall || "Free Discovery Call"}
                </Button>
              </div>

              {/* Social Proof Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <div className="text-3xl font-bold text-amber-600">50K+</div>
                  <div className={`text-gray-600 mt-1 ${darkMode ? 'text-gray-400' : 'text-sm'}`}>{data.hero?.students || "Students"}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">15+</div>
                  <div className={`text-gray-600 mt-1 ${darkMode ? 'text-gray-400' : 'text-sm'}`}>{data.hero?.yearsExp || "Years Experience"}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">4.9★</div>
                  <div className={`text-gray-600 mt-1 ${darkMode ? 'text-gray-400' : 'text-sm'}`}>{data.hero?.rating || "Rating"}</div>
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
                    <div className={`font-bold text-gray-900 ${darkMode ? 'text-white' : 'text-2xl'}`}>98%</div>
                    <div className={`text-gray-600 ${darkMode ? 'text-gray-400' : 'text-xs'}`}>Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured In / Press Logos */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-sm text-muted-foreground mb-8 uppercase tracking-wider text-center">
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
      <section id="about" className="container mx-auto px-4 sm:px-6 max-w-4xl py-20 md:py-32">
        <ScrollReveal>
          <div className="text-center mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent break-words">
              {data.aboutTitle || "Hi, I'm Your Guide to Transformation"}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {data.aboutText || "For over 15 years, I've been helping ambitious entrepreneurs and leaders break through their limitations and create the life and business they truly desire. My approach combines practical strategies with deep inner work, creating lasting transformation from the inside out."}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Offerings Section - Books, Courses, Coaching */}
      <section id="offerings" className="container mx-auto px-4 sm:px-6 py-20 md:py-32 bg-gradient-to-br from-amber-50/50 to-blue-50/50 dark:from-gray-800 dark:to-gray-900 rounded-3xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 break-words text-foreground">
              {data.offerings?.title || "Ways to Work With Me"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {data.offerings?.subtitle || "Choose the path that feels right for you. Each offering is designed to meet you where you are."}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Bestselling Book */}
          <ScrollReveal delay={0.1}>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-amber-300 dark:hover:border-amber-600 overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-800/10">
                <Image
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1000&fit=crop&q=80"
                  alt="Book about time management and productivity"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <Badge className={`mb-3 bg-amber-100 dark:bg-amber-900/30 ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                  {data.offerings?.book?.badge || "Bestseller"}
                </Badge>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{data.offerings?.book?.title || "Time Magic"}</h3>
                <p className="mb-4 text-muted-foreground">
                  {data.offerings?.book?.description || "A practical guide to reclaiming your time and energy. Transform how you work and live."}
                </p>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
                  {data.offerings?.book?.cta || "Get the Book"}
                  <FiArrowRight className="ml-2" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Online Course */}
          <ScrollReveal delay={0.2}>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600 overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10">
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=1000&fit=crop&q=80"
                  alt="Online learning and video courses"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <Badge className={`mb-3 bg-blue-100 dark:bg-blue-900/30 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  {data.offerings?.course?.badge || "Self-Paced"}
                </Badge>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{data.offerings?.course?.title || "Mastery Program"}</h3>
                <p className="mb-4 text-muted-foreground">
                  {data.offerings?.course?.description || "8-week online course with video lessons, workbooks, and community support."}
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                  {data.offerings?.course?.cta || "Learn More"}
                  <FiArrowRight className="ml-2" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* 1:1 Coaching */}
          <ScrollReveal delay={0.3}>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600 overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-800/10">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&q=80"
                  alt="One-on-one coaching session"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-4 right-4 bg-white/90 text-purple-700">
                  <FiStar className="mr-1" />
                  {data.offerings?.coaching?.premiumBadge || "Premium"}
                </Badge>
              </div>
              <CardContent className="p-6">
                <Badge className={`mb-3 bg-purple-100 dark:bg-purple-900/30 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                  {data.offerings?.coaching?.badge || "Limited Spots"}
                </Badge>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{data.offerings?.coaching?.title || "1:1 Coaching"}</h3>
                <p className="mb-4 text-muted-foreground">
                  {data.offerings?.coaching?.description || "Work directly with me for personalized transformation and breakthrough results."}
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                  {data.offerings?.coaching?.cta || "Apply Now"}
                  <FiArrowRight className="ml-2" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Podcast */}
          <ScrollReveal delay={0.4}>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-pink-300 dark:hover:border-pink-600 overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-900/20 dark:to-pink-800/10">
                <Image
                  src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=1000&fit=crop&q=80"
                  alt="Podcast recording and audio production"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <Badge className={`mb-3 bg-pink-100 dark:bg-pink-900/30 ${darkMode ? 'text-pink-400' : 'text-pink-700'}`}>
                  {data.offerings?.podcast?.badge || "#1 Podcast"}
                </Badge>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{data.offerings?.podcast?.title || "The Growth Show"}</h3>
                <p className="mb-4 text-muted-foreground">
                  {data.offerings?.podcast?.description || "Weekly inspiration, practical tips, and interviews with world-class guests."}
                </p>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white">
                  {data.offerings?.podcast?.cta || "Listen Now"}
                  <FiArrowRight className="ml-2" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Community */}
          <ScrollReveal delay={0.5}>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-green-300 dark:hover:border-green-600 overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10">
                <Image
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=1000&fit=crop&q=80"
                  alt="Community of professionals networking"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <Badge className={`mb-3 bg-green-100 dark:bg-green-900/30 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                  {data.offerings?.community?.badge || "Join 10K+ Members"}
                </Badge>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{data.offerings?.community?.title || "Inner Circle Community"}</h3>
                <p className="mb-4 text-muted-foreground">
                  {data.offerings?.community?.description || "Connect with like-minded individuals on the same journey. Monthly coaching calls, resources, and support."}
                </p>
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                  {data.offerings?.community?.cta || "Join the Community"}
                  <FiArrowRight className="ml-2" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 sm:px-6 py-20 md:py-32">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 break-words text-foreground">
              {data.testimonials?.title || "Success Stories"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
                  <p className={`mb-6 italic leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {data.testimonials?.quote || "Working with her changed my life. I went from overwhelmed and stuck to clear, focused, and thriving in my business."}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-blue-500"></div>
                    <div>
                      <div className="font-semibold">Sarah Johnson</div>
                      <div className={`text-gray-600 ${darkMode ? 'text-gray-400' : 'text-sm'}`}>CEO, TechStart</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Newsletter Signup with Lead Magnet */}
      <section className="container mx-auto px-4 sm:px-6 max-w-4xl py-20 md:py-32">
        <ScrollReveal>
          <Card className="bg-gradient-to-br from-amber-500 to-blue-600 border-0 overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <CardContent className="p-8 sm:p-10 md:p-12 relative z-10">
              <div className="text-center mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  {data.newsletter?.title || "Get My Free Clarity Guide"}
                </h2>
                <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {data.newsletter?.subtitle || "Join 50,000+ subscribers and get weekly strategies for growth, plus my proven 7-step framework for clarity."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder={data.newsletter?.placeholder || "Enter your email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900 placeholder:text-gray-500 text-base shadow-md"
                  />
                  <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all min-h-[48px] touch-manipulation whitespace-nowrap">
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
      <section className="container mx-auto px-4 sm:px-6 py-20 md:py-32 border-t border-border">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 break-words text-foreground">
              {data.blog?.title || "Latest Insights"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors text-foreground">
                    5 Ways to Overcome Impostor Syndrome
                  </h3>
                  <p className="text-sm mb-4 text-muted-foreground">
                    Discover practical strategies to silence self-doubt and step into your power.
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
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
      <section id="contact" className="container mx-auto px-4 sm:px-6 max-w-2xl py-20 md:py-32">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-background to-amber-50/50 dark:to-amber-950/20 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-border shadow-lg overflow-hidden">
            <div className="mx-auto text-center w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground break-words px-2">
                {data.contactForm?.title || "Ready to Transform Your Life?"}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto break-words px-2 leading-relaxed">
                {data.contactForm?.subtitle || "Book a free 30-minute discovery call to see if we're a good fit to work together."}
              </p>

              {formStep === 1 && (
                <div className="space-y-4 max-w-md mx-auto w-full px-2">
                  <input
                    type="text"
                    placeholder={data.contactForm?.namePlaceholder || "Your Name"}
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-base"
                  />
                  <input
                    type="email"
                    placeholder={data.contactForm?.emailPlaceholder || "Your Email"}
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-base"
                  />
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all min-h-[56px] touch-manipulation"
                    onClick={() => setFormStep(2)}
                  >
                    <span className="break-words">{data.contactForm?.continue || "Continue"}</span>
                    <FiArrowRight className="ml-2 w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  </Button>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-4 max-w-md mx-auto w-full px-2">
                  <select className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-base cursor-pointer">
                    <option>{data.contactForm?.selectQuestion || "What are you most interested in?"}</option>
                    <option>1:1 Coaching</option>
                    <option>Online Course</option>
                    <option>Group Program</option>
                    <option>Just Exploring</option>
                  </select>
                  <textarea
                    placeholder={data.contactForm?.challengePlaceholder || "Tell me about your biggest challenge right now..."}
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-base resize-none break-words"
                  />
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all min-h-[56px] touch-manipulation"
                  >
                    <span className="break-words">{data.contactForm?.bookCall || "Book My Free Call"}</span>
                    <FiCheckCircle className="ml-2 w-5 h-5 flex-shrink-0" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">{data.footer?.resources || "Resources"}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.books || "Books"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.courses || "Courses"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.podcast || "Podcast"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.blog || "Blog"}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">{data.footer?.workWithMe || "Work With Me"}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.oneOnOne || "1:1 Coaching"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.groupPrograms || "Group Programs"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.speaking || "Speaking"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.consulting || "Consulting"}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">{data.footer?.company || "Company"}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-amber-600 transition-colors">{tt.common?.about || "About"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.press || "Press"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{tt.common?.contact || "Contact"}</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">{data.footer?.privacy || "Privacy"}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">{data.nav?.connect || "Connect"}</h3>
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

          <div className="pt-8 border-t border-border text-sm text-muted-foreground text-center">
            <p>{data.footer?.copyright || "© 2025 Your Name. All rights reserved. | Built with passion and purpose."}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
