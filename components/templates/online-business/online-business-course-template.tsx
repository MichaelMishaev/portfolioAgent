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
  FiTwitter,
  FiArrowRight,
  FiStar,
  FiCheckCircle,
  FiPlay,
  FiDownload,
  FiUsers,
  FiClock,
  FiAward,
  FiMonitor,
  FiBook,
  FiLock
} from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { useState } from "react";

export function OnlineBusinessCourseTemplate() {
  const { tt } = useI18n();
  const data = tt.onlineBusinessCourse || {};
  const [selectedPlan, setSelectedPlan] = useState("premium");

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-purple-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-3 md:px-3 max-w-full py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            {tt.common?.backToGallery || "← Back to Gallery"}
          </Link>
          <div className="flex items-center gap-6">
            <a href="#courses" className="hidden md:block text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {data.nav?.courses || "Courses"}
            </a>
            <a href="#curriculum" className="hidden md:block text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {data.nav?.curriculum || "Curriculum"}
            </a>
            <a href="#pricing" className="hidden md:block text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {tt.common?.pricing || "Pricing"}
            </a>
            <a href="#faq" className="hidden md:block text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {data.nav?.faq || "FAQ"}
            </a>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section - Course Focus */}
      <section className="container mx-auto px-4 md:px-6 max-w-full pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="overflow-hidden">
              <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 px-3 py-2 text-xs sm:text-sm">
                <FiPlay className="mr-2 flex-shrink-0" />
                <span className="truncate">{data.badge || "100,000+ Students Enrolled"}</span>
              </Badge>

              <h1 className="text-3xl sm:text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight break-words text-gray-900">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent break-words">
                  {data.heroTitle || "Master Digital Marketing"}
                </span>
                <br />
                <span className="text-gray-900 dark:text-white break-words">
                  {data.heroTitleEnd || "in 90 Days"}
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed break-words">
                {data.heroSubtitle || "Step-by-step video courses, practical assignments, and lifetime access. Learn at your own pace from industry experts."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                  <FiPlay className="mr-2 flex-shrink-0" />
                  <span className="truncate">{data.hero?.startLearning || "Start Learning Now"}</span>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-purple-500 !text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                  <FiDownload className="mr-2 flex-shrink-0" />
                  <span className="truncate">{data.hero?.freeSample || "Free Sample Lessons"}</span>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">{data.hero?.moneyBack || "30-Day Money Back"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">{data.hero?.lifetimeAccess || "Lifetime Access"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">{data.hero?.certificate || "Certificate Included"}</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl blur-2xl opacity-20"></div>
              <Card className="relative overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                <div className="aspect-video bg-gradient-to-br from-purple-900 to-pink-900 relative group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop"
                    alt="Course Preview"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <FiPlay className="w-10 h-10 text-purple-600 ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 border-0">
                    <FiStar className="mr-1" fill="currentColor" />
                    4.9 (12,450 reviews)
                  </Badge>
                </div>
                <CardContent className="p-6 bg-white dark:bg-gray-800">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">120+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{data.hero?.videoLessons || "Video Lessons"}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">45h</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{data.hero?.totalDuration || "Total Duration"}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">100K+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{data.hero?.students || "Students"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 border-y border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 md:px-6 max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <ScrollReveal>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
                  <FiMonitor className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{data.features?.onDemand?.title || "On-Demand Videos"}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{data.features?.onDemand?.description || "Watch anytime, anywhere"}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center">
                  <FiBook className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{data.features?.workbooks?.title || "Workbooks & PDFs"}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{data.features?.workbooks?.description || "Downloadable resources"}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                  <FiUsers className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{data.features?.community?.title || "Private Community"}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{data.features?.community?.description || "Network with peers"}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center">
                  <FiAward className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{data.features?.certificate?.title || "Certificate"}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{data.features?.certificate?.description || "Upon completion"}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section id="curriculum" className="container mx-auto px-4 md:px-6 max-w-full py-20 md:py-32">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl sm:text-5xl font-bold mb-4 break-words px-2 text-gray-900">
              {data.curriculum?.title || "Complete Course Curriculum"}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-full mx-auto break-words px-2">
              {data.curriculum?.subtitle || "8 comprehensive modules covering everything from beginner to advanced"}
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {[
            { module: 1, title: "Foundations & Mindset", lessons: 12, duration: "2.5h", locked: false },
            { module: 2, title: "Strategy & Planning", lessons: 15, duration: "3h", locked: false },
            { module: 3, title: "Content Creation Mastery", lessons: 18, duration: "4.5h", locked: false },
            { module: 4, title: "Social Media Marketing", lessons: 20, duration: "5h", locked: true },
            { module: 5, title: "Email Marketing & Automation", lessons: 16, duration: "4h", locked: true },
            { module: 6, title: "Paid Advertising Strategies", lessons: 14, duration: "3.5h", locked: true },
            { module: 7, title: "Analytics & Optimization", lessons: 12, duration: "3h", locked: true },
            { module: 8, title: "Scaling Your Business", lessons: 13, duration: "3.5h", locked: true },
          ].map((module, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <Card className={`hover:shadow-lg transition-all ${module.locked ? 'opacity-75' : ''}`}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0 ${
                        module.locked
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                          : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                      }`}>
                        {module.locked ? <FiLock /> : module.module}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 break-words text-gray-900">Module {module.module}: {module.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1 whitespace-nowrap">
                            <FiPlay className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            {module.lessons} {data.curriculum?.lessons || "lessons"}
                          </span>
                          <span className="flex items-center gap-1 whitespace-nowrap">
                            <FiClock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            {module.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    {!module.locked && (
                      <Button variant="ghost" size="sm" className="self-start sm:self-center flex-shrink-0 text-xs sm:text-sm text-gray-900">
                        <span className="hidden sm:inline">{data.curriculum?.preview || "Preview"}</span>
                        <FiArrowRight className="sm:ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 md:px-6 max-w-full py-20 md:py-32 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl sm:text-5xl font-bold mb-4 break-words px-2 text-gray-900">
              {data.pricing?.title || "Choose Your Learning Path"}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-full mx-auto break-words px-2">
              {data.pricing?.subtitle || "All plans include lifetime access. No subscriptions. Pay once, learn forever."}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Basic Plan */}
          <ScrollReveal delay={0.1}>
            <Card className="hover:shadow-2xl transition-all">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-2 break-words text-gray-900">{data.pricing?.essentials?.title || "Essentials"}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm break-words">
                  {data.pricing?.essentials?.description || "Perfect for getting started"}
                </p>
                <div className="mb-6">
                  <span className="text-3xl sm:text-3xl sm:text-4xl font-bold text-gray-900">$297</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2 text-sm">{data.pricing?.oneTime || "one-time"}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {["Modules 1-3", "Video Lessons", "Basic Workbooks", "Email Support"].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-900">
                      <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="break-words">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full !text-slate-900 dark:text-white" variant="outline">
                  {data.pricing?.essentials?.cta || "Get Started"}
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Premium Plan - Highlighted */}
          <ScrollReveal delay={0.2}>
            <Card className="border-4 border-purple-500 relative hover:shadow-2xl transition-all md:scale-105">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 py-1 text-xs sm:text-sm whitespace-nowrap">
                  {data.pricing?.complete?.badge || "MOST POPULAR"}
                </Badge>
              </div>
              <CardContent className="p-6 sm:p-8 pt-8">
                <h3 className="text-lg sm:text-xl font-bold mb-2 break-words text-gray-900">{data.pricing?.complete?.title || "Complete Course"}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm break-words">
                  {data.pricing?.complete?.description || "Everything you need to succeed"}
                </p>
                <div className="mb-6">
                  <span className="text-3xl sm:text-3xl sm:text-4xl font-bold text-gray-900">$697</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2 line-through text-sm">$997</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {["All 8 Modules", "120+ Video Lessons", "Premium Workbooks", "Private Community", "Live Q&A Sessions", "Certificate"].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-900">
                      <FiCheckCircle className="text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="break-words">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  {data.pricing?.complete?.cta || "Enroll Now"}
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* VIP Plan */}
          <ScrollReveal delay={0.3}>
            <Card className="hover:shadow-2xl transition-all bg-gradient-to-br from-gray-900 to-purple-900 text-white">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-2 break-words text-gray-900">{data.pricing?.vip?.title || "VIP Mentorship"}</h3>
                <p className="text-gray-300 mb-6 text-sm break-words">
                  {data.pricing?.vip?.description || "For serious entrepreneurs"}
                </p>
                <div className="mb-6">
                  <span className="text-3xl sm:text-3xl sm:text-4xl font-bold text-gray-900">$1,997</span>
                  <span className="text-gray-400 ml-2 text-sm">{data.pricing?.oneTime || "one-time"}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {["Everything in Complete", "1-on-1 Coaching Calls", "Personalized Feedback", "Implementation Support", "Bonus Templates", "Priority Support"].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-900">
                      <FiCheckCircle className="text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="break-words">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-white !text-purple-900 hover:bg-gray-100">
                  {data.pricing?.vip?.cta || "Apply Now"}
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        <p className="text-center mt-8 text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words px-2">
          {data.pricing?.guarantee || "💳 Secure payment • 30-day money-back guarantee • No subscriptions"}
        </p>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 md:px-6 max-w-full py-20 md:py-32">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl sm:text-5xl font-bold mb-4 break-words px-2 text-gray-900">
              {data.testimonials?.title || "Student Success Stories"}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 break-words px-2">
              {data.testimonials?.subtitle || "Real results from real students"}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Emily Rodriguez", result: "Quit my 9-5 and now making $15K/mo", image: "1" },
            { name: "James Chen", result: "Grew my agency from 0 to $50K/mo", image: "2" },
            { name: "Sarah Johnson", result: "Landed 5 high-ticket clients in 60 days", image: "3" }
          ].map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                    {data.testimonials?.quote || "This course completely changed my life. The strategies are practical, actionable, and actually work. Worth every penny!"}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-purple-600 font-medium">{testimonial.result}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-full py-20 md:py-32">
        <ScrollReveal>
          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16 relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl sm:text-5xl font-bold text-white mb-6 break-words">
                {data.cta?.title || "Ready to Transform Your Life?"}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-full mx-auto break-words">
                {data.cta?.subtitle || "Join 100,000+ students who have already started their journey. 30-day money-back guarantee."}
              </p>
              <Button size="lg" className="bg-white !text-purple-600 hover:bg-gray-100 px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto">
                <FiPlay className="mr-2 flex-shrink-0" />
                <span className="truncate">{data.cta?.button || "Enroll in Complete Course - $697"}</span>
              </Button>
              <p className="text-xs sm:text-sm text-white/80 mt-4 break-words">
                {data.cta?.limited || "⏰ Limited Time: Save $300 (Regular price $997)"}
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">{data.nav?.courses || "Courses"}</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-purple-600 transition-colors">{data.footer?.allCourses || "All Courses"}</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">{data.footer?.bundles || "Bundles"}</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">{data.footer?.freeLessons || "Free Lessons"}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">{tt.common?.services || "Resources"}</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-purple-600 transition-colors">{data.footer?.blog || tt.common?.readMore || "Blog"}</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">{data.footer?.templates || "Templates"}</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">{data.footer?.tools || "Tools"}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-purple-600 transition-colors">{data.footer?.helpCenter || "Help Center"}</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">{tt.common?.contact || "Contact"}</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">{data.footer?.refundPolicy || "Refund Policy"}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                  <FiInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                  <FiYoutube className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                  <FiTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>{data.footer?.copyright || "© 2025 Digital Academy. All rights reserved. | Terms • Privacy • Refunds"}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
