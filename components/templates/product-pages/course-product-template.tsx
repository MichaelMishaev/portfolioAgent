"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiCheck, FiStar, FiArrowRight, FiPlay, FiBook, FiUsers, FiTrendingUp, FiAward, FiClock, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const courseData = {
  name: "Master UI/UX Design in 12 Weeks",
  tagline: "From beginner to professional designer",
  description: "Learn the complete design process, build a stunning portfolio, and land your dream job in tech.",
  instructor: {
    name: "Sarah Martinez",
    title: "Senior Product Designer at Google",
    bio: "15+ years designing products for Google, Apple, and Netflix. Mentored 500+ students who now work at top tech companies.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    credentials: [
      "15 years at Google, Apple, Netflix",
      "500+ students placed in top companies",
      "Featured on Design Weekly, Awwwards",
      "3x Dribbble Top Designer of the Year",
    ],
  },
  cta: {
    primary: "Enroll Now",
    secondary: "Watch Free Preview",
  },
  hero: {
    stats: [
      { value: "2,847", label: "Students Enrolled" },
      { value: "4.9/5", label: "Course Rating" },
      { value: "92%", label: "Job Placement Rate" },
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
  },
  transformation: {
    title: "Real Student Success Stories",
    before: {
      title: "Before the Course",
      points: [
        "No design experience",
        "Working in retail for $35k/year",
        "No portfolio or design tools knowledge",
        "No idea how to break into tech",
      ],
    },
    after: {
      title: "12 Weeks Later",
      points: [
        "Junior Designer at Spotify",
        "Earning $85k/year + equity",
        "Professional portfolio with 5 projects",
        "Confident in Figma, prototyping, research",
      ],
    },
    student: {
      name: "Marcus Chen",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      quote: "This course changed my life. I went from zero design skills to landing my dream job at Spotify in just 3 months.",
    },
  },
  curriculum: {
    title: "12-Week Curriculum",
    subtitle: "Everything you need to become a professional UI/UX designer",
    modules: [
      {
        week: "Weeks 1-2",
        title: "Design Foundations",
        lessons: 12,
        duration: "3 hours",
        topics: ["Typography fundamentals", "Color theory & psychology", "Layout & composition", "Design principles"],
      },
      {
        week: "Weeks 3-4",
        title: "Figma Mastery",
        lessons: 15,
        duration: "4 hours",
        topics: ["Interface design", "Components & variants", "Auto layout & constraints", "Prototyping & animations"],
      },
      {
        week: "Weeks 5-6",
        title: "UX Research & Strategy",
        lessons: 10,
        duration: "3.5 hours",
        topics: ["User research methods", "Personas & user journeys", "Information architecture", "Usability testing"],
      },
      {
        week: "Weeks 7-8",
        title: "Mobile App Design",
        lessons: 14,
        duration: "4.5 hours",
        topics: ["iOS & Android patterns", "Navigation design", "Gestures & interactions", "Responsive design"],
      },
      {
        week: "Weeks 9-10",
        title: "Web Design & Development Handoff",
        lessons: 12,
        duration: "4 hours",
        topics: ["Web design best practices", "Design systems", "Developer handoff", "Design tokens & documentation"],
      },
      {
        week: "Weeks 11-12",
        title: "Portfolio & Career Launch",
        lessons: 8,
        duration: "3 hours",
        topics: ["Building your portfolio", "Case study writing", "Resume & LinkedIn", "Job interview prep"],
      },
    ],
  },
  testimonials: [
    {
      quote: "I had ZERO design experience. 3 months later, I'm a Product Designer at Airbnb earning $95k. This course is the real deal.",
      author: "Jessica Wu",
      role: "Product Designer at Airbnb",
      company: "Airbnb",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      rating: 5,
      result: "Salary increased from $40k → $95k",
    },
    {
      quote: "Best investment I ever made. The instructor genuinely cares about your success. Got a design job at Stripe 2 weeks after finishing.",
      author: "David Park",
      role: "UX Designer at Stripe",
      company: "Stripe",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      rating: 5,
      result: "Hired at Stripe within 2 weeks",
    },
    {
      quote: "I tried other courses but they were too theoretical. This one is hands-on, practical, and gets you hired. Now at Meta!",
      author: "Priya Sharma",
      role: "Product Designer at Meta",
      company: "Meta",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      rating: 5,
      result: "Career change to $110k/year at Meta",
    },
  ],
  features: [
    {
      icon: <FiBook className="w-6 h-6" />,
      title: "71 Video Lessons",
      description: "Step-by-step tutorials you can follow at your own pace",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Live Weekly Sessions",
      description: "Get feedback on your work and ask questions directly",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Real Projects",
      description: "Build 5 portfolio pieces that actually get you hired",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "Job Placement Support",
      description: "Resume reviews, interview prep, and hiring network access",
      color: "from-orange-500 to-red-500",
    },
  ],
  pricing: {
    title: "Investment in your future",
    subtitle: "Most students earn back their investment in the first month at their new job",
    plans: [
      {
        name: "Pay in Full",
        price: "$1,497",
        period: "one-time payment",
        description: "Best value - save $300",
        features: [
          "Complete 12-week course",
          "71 video lessons (40+ hours)",
          "Weekly live coaching calls",
          "5 portfolio projects",
          "Job placement support",
          "Lifetime access to updates",
          "Private student community",
          "Certificate of completion",
        ],
        cta: "Enroll Now",
        popular: false,
        savings: "Save $300",
      },
      {
        name: "Payment Plan",
        price: "$599",
        period: "per month × 3 months",
        description: "Most popular - easier on your budget",
        features: [
          "Complete 12-week course",
          "71 video lessons (40+ hours)",
          "Weekly live coaching calls",
          "5 portfolio projects",
          "Job placement support",
          "Lifetime access to updates",
          "Private student community",
          "Certificate of completion",
        ],
        cta: "Start Learning",
        popular: true,
        savings: "",
      },
    ],
  },
  guarantee: {
    title: "100% Money-Back Guarantee",
    description: "Complete the course, apply to jobs, and if you don't get a design job offer within 6 months, we'll refund 100% of your tuition. No questions asked.",
    badge: "Risk-Free",
  },
  faq: [
    {
      question: "Do I need any design experience?",
      answer: "No! This course is designed for complete beginners. 80% of our students had zero design experience before starting.",
    },
    {
      question: "How long do I have access?",
      answer: "Lifetime access. You can learn at your own pace and revisit lessons anytime, even after completing the course.",
    },
    {
      question: "What if I can't keep up with the 12-week schedule?",
      answer: "The 12 weeks is a suggested timeline. You can go faster or slower based on your schedule. Most students finish in 10-16 weeks.",
    },
    {
      question: "Will I actually get a job after this?",
      answer: "92% of our graduates land a design role within 6 months. We provide resume reviews, portfolio feedback, and interview prep to help you succeed.",
    },
    {
      question: "What's included in job placement support?",
      answer: "Resume & portfolio reviews, mock interviews, access to our hiring partner network (200+ companies), LinkedIn optimization, and salary negotiation coaching.",
    },
    {
      question: "Can I get a refund?",
      answer: "Yes! We have a 30-day money-back guarantee, no questions asked. Plus, our job guarantee means if you don't get hired within 6 months, we refund 100%.",
    },
  ],
  finalCTA: {
    title: "Ready to launch your design career?",
    description: "Join 2,847 students who transformed their careers in just 12 weeks",
    guarantee: "30-day money-back guarantee • 92% job placement rate • Lifetime access",
  },
};

export function CourseProductTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-3 sm:px-3 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Design Mastery
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#curriculum" className="text-sm hover:text-primary transition-colors">Curriculum</a>
              <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
              <Button size="sm">{courseData.cta.primary}</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 text-foreground hover:bg-accent rounded-md border border-border transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t">
            <div className="container mx-auto px-3 sm:px-3 py-4 flex flex-col gap-4">
              <a
                href="#curriculum"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Curriculum
              </a>
              <a
                href="#pricing"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                {courseData.cta.primary}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-3 sm:px-3 pt-20 pb-16">
        <div className="max-w-full mx-auto text-center">
          <FadeIn>
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-gold-500 text-white border-0">
              🎓 New cohort starts November 1st - 12 spots left
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold mb-6 leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent break-words">
              {courseData.tagline}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-full mx-auto">
              {courseData.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col gap-4 sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-blue-600 to-blue-700">
                {courseData.cta.primary}
                <FiArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <FiPlay className="mr-2" />
                {courseData.cta.secondary}
              </Button>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.4}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-full mx-auto mb-12">
              {courseData.hero.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Hero Image */}
          <FadeIn delay={0.5}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border">
              <img
                src={courseData.hero.image}
                alt="Students Learning"
                className="w-full"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Instructor Credibility */}
      <section className="container mx-auto px-3 sm:px-3 py-20 border-t">
        <ScrollReveal>
          <div className="max-w-full mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <img
                src={courseData.instructor.avatar}
                alt={courseData.instructor.name}
                className="w-32 h-32 rounded-full"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{courseData.instructor.name}</h2>
                <p className="text-xl text-muted-foreground mb-4">{courseData.instructor.title}</p>
                <p className="text-lg mb-6">{courseData.instructor.bio}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {courseData.instructor.credentials.map((credential, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{credential}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Transformation - Before/After */}
      <section className="container mx-auto px-3 sm:px-3 py-20 bg-gradient-to-r from-blue-100 to-gold-100 dark:from-blue-950 dark:to-gold-950">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl   font-bold mb-4 break-words">
              {courseData.transformation.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ScrollReveal delay={0.1}>
              <Card className="h-full bg-red-50 dark:bg-red-950 border-red-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-600">
                    {courseData.transformation.before.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {courseData.transformation.before.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-500">✗</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="h-full bg-green-50 dark:bg-green-950 border-green-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-600">
                    {courseData.transformation.after.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {courseData.transformation.after.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3}>
            <Card className="bg-gradient-to-r from-blue-600 to-gold-600 text-white border-0">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={courseData.transformation.student.photo}
                    alt={courseData.transformation.student.name}
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                  <div>
                    <div className="font-bold text-lg">{courseData.transformation.student.name}</div>
                    <div className="text-sm opacity-90">Graduate, now at Spotify</div>
                  </div>
                </div>
                <p className="text-lg italic">"{courseData.transformation.student.quote}"</p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="container mx-auto px-3 sm:px-3 py-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl   font-bold mb-4 break-words">
              {courseData.curriculum.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {courseData.curriculum.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-full mx-auto space-y-6">
          {courseData.curriculum.modules.map((module, index) => (
            <ScrollReveal key={module.title} delay={index * 0.1}>
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge className="mb-3">{module.week}</Badge>
                      <CardTitle className="text-2xl mb-2">{module.title}</CardTitle>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <FiBook className="w-4 h-4" />
                          {module.lessons} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          {module.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                    {module.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <FiCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-3 sm:px-3 py-20 bg-muted/30">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl   font-bold mb-4 break-words">
              Everything you need to succeed
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
          {courseData.features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-all">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-3 sm:px-3 py-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl   font-bold mb-4 break-words">
              Student Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              Real people, real results
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto">
          {courseData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.author} delay={index * 0.1}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    {testimonial.result}
                  </Badge>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-3 sm:px-3 py-20 bg-muted/30">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl   font-bold mb-4 break-words">
              {courseData.pricing.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {courseData.pricing.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto mb-12">
          {courseData.pricing.plans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={index * 0.1}>
              <Card className={`relative h-full ${plan.popular ? "border-blue-600 shadow-lg scale-105" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                {plan.savings && (
                  <div className="absolute -top-4 right-4">
                    <Badge className="bg-green-600 text-white">{plan.savings}</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl sm:text-4xl  font-bold">{plan.price}</span>
                    <span className="text-muted-foreground"> / {plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-6" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Guarantee */}
        <ScrollReveal>
          <Card className="max-w-full mx-auto bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200">
            <CardContent className="p-8 text-center">
              <Badge className="mb-4 bg-green-600 text-white">{courseData.guarantee.badge}</Badge>
              <h3 className="text-2xl font-bold mb-3">{courseData.guarantee.title}</h3>
              <p className="text-muted-foreground">{courseData.guarantee.description}</p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-3 sm:px-3 py-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl   font-bold mb-4 break-words">
              Frequently Asked Questions
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-full mx-auto space-y-4">
          {courseData.faq.map((item, index) => (
            <ScrollReveal key={item.question} delay={index * 0.05}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                  <CardDescription>{item.answer}</CardDescription>
                </CardHeader>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-3 sm:px-3 py-20 bg-muted/30">
        <ScrollReveal>
          <Card className="max-w-full mx-auto bg-gradient-to-r from-blue-600 to-gold-500 text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl sm:text-5xl   font-bold mb-4 break-words">
                {courseData.finalCTA.title}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {courseData.finalCTA.description}
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8">
                {courseData.cta.primary}
                <FiArrowRight className="ml-2" />
              </Button>
              <p className="text-sm mt-6 opacity-75">
                {courseData.finalCTA.guarantee}
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Design Mastery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
