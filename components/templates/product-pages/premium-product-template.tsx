"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiCheck, FiStar, FiArrowRight, FiAward, FiTrendingUp, FiUsers, FiZap } from "react-icons/fi";
import Link from "next/link";

const productData = {
  name: "Executive Transformation Program",
  tagline: "Exclusive. Transformative. Results-Driven.",
  description: "A bespoke 6-month journey for C-level executives ready to 10x their impact and income.",
  subtitle: "Limited to 12 clients per year",
  investment: {
    amount: 150000,
    currency: "$",
    period: "6-month engagement",
    paymentOptions: "Payment plans available",
  },
  hero: {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
    exclusiveBadge: "By Application Only",
  },
  transformation: {
    title: "The Transformation",
    before: {
      title: "Where You Are Now",
      points: [
        "Earning $200K-500K annually",
        "Working 60+ hour weeks",
        "Feeling stuck at current level",
        "No clear path to 7-figure income",
        "Limited strategic network",
      ],
    },
    after: {
      title: "Where You'll Be",
      points: [
        "Earning $1M+ annually",
        "Working 40 hours or less",
        "Clear executive presence",
        "Multiple income streams",
        "Connected to key decision-makers",
      ],
    },
  },
  caseStudies: [
    {
      name: "Michael Chen",
      title: "From VP to CEO",
      company: "Tech Fortune 500",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      challenge: "Stuck as VP for 5 years with no path to C-suite. Earning $280K.",
      transformation: "Landed CEO role at mid-sized tech company. Now earning $850K + equity worth $2M+.",
      metrics: [
        { label: "Income Increase", value: "+204%" },
        { label: "Time to C-Suite", value: "7 months" },
        { label: "Equity Value", value: "$2M+" },
      ],
      quote: "This program didn't just change my career trajectory—it transformed my entire life. Best investment I've ever made.",
    },
    {
      name: "Sarah Martinez",
      title: "From Corporate to Founder",
      company: "SaaS Startup (Acquired)",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      challenge: "Senior Director earning $320K but dreaming of starting her own company.",
      transformation: "Left corporate, launched SaaS company, grew to $5M ARR in 18 months. Acquired for $22M.",
      metrics: [
        { label: "Exit Value", value: "$22M" },
        { label: "Time to Exit", value: "18 months" },
        { label: "ROI", value: "14,567%" },
      ],
      quote: "I had the idea but not the strategy or network. This program gave me both. My company was acquired for $22M.",
    },
    {
      name: "David Park",
      title: "From Employee to Board Member",
      company: "Multiple Companies",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      challenge: "C-level executive at $450K wanting to expand influence and income.",
      transformation: "Now serves on 4 boards, consults for Fortune 100, and earns $1.2M+ annually while working less.",
      metrics: [
        { label: "Board Seats", value: "4" },
        { label: "Income", value: "$1.2M+" },
        { label: "Hours/Week", value: "35" },
      ],
      quote: "I went from being well-paid to being wealthy. The network alone is worth 10x the investment.",
    },
  ],
  whatYouGet: {
    title: "What's Included",
    subtitle: "A comprehensive 6-month transformation designed exclusively for you",
    modules: [
      {
        icon: <FiUsers className="w-8 h-8" />,
        title: "1-on-1 Executive Coaching",
        description: "24 private sessions (weekly) with your dedicated executive coach",
        details: [
          "Custom strategy development",
          "Real-time problem-solving",
          "Accountability & momentum",
          "24/7 messaging access",
        ],
      },
      {
        icon: <FiTrendingUp className="w-8 h-8" />,
        title: "Strategic Positioning",
        description: "Become the obvious choice for C-suite roles and board seats",
        details: [
          "Personal brand architecture",
          "Executive presence training",
          "Thought leadership strategy",
          "Media & speaking opportunities",
        ],
      },
      {
        icon: <FiZap className="w-8 h-8" />,
        title: "Elite Network Access",
        description: "Direct introductions to CEOs, investors, and board members",
        details: [
          "Quarterly exclusive dinners",
          "Introduction to 50+ decision-makers",
          "Private community access",
          "Partnership opportunities",
        ],
      },
      {
        icon: <FiAward className="w-8 h-8" />,
        title: "Income Acceleration",
        description: "Multiple strategies to reach 7-figure income within 12 months",
        details: [
          "Negotiation masterclasses",
          "Side business opportunities",
          "Investment strategy sessions",
          "Equity & compensation optimization",
        ],
      },
    ],
  },
  investment: {
    title: "Investment",
    subtitle: "Most clients earn back their investment within 6 months",
    options: [
      {
        name: "Full Investment",
        price: "$150,000",
        period: "6-month program",
        description: "Pay in full and receive additional benefits",
        features: [
          "24 private 1-on-1 coaching sessions",
          "Lifetime community access",
          "4 exclusive executive dinners",
          "Direct introductions to 50+ executives",
          "Personal brand & positioning",
          "Income acceleration strategies",
          "24/7 coach messaging access",
          "6-month post-program support",
          "Bonus: 2 additional strategy sessions",
          "Bonus: VIP event access for 1 year",
        ],
        cta: "Apply Now",
        popular: false,
        bonus: "+$25K in bonuses",
      },
      {
        name: "Payment Plan",
        price: "$27,500",
        period: "per month × 6 months",
        description: "Flexible payment option ($165K total)",
        features: [
          "24 private 1-on-1 coaching sessions",
          "Lifetime community access",
          "4 exclusive executive dinners",
          "Direct introductions to 50+ executives",
          "Personal brand & positioning",
          "Income acceleration strategies",
          "24/7 coach messaging access",
          "6-month post-program support",
        ],
        cta: "Apply Now",
        popular: true,
        bonus: "",
      },
    ],
  },
  guarantee: {
    title: "Our Commitment",
    description: "If you complete the program, implement the strategies, and don't see at least a $150K increase in your annual income within 12 months, we'll work with you for free until you do.",
    badge: "Income Guarantee",
  },
  applicationProcess: {
    title: "Application Process",
    subtitle: "We only work with committed, action-oriented executives",
    steps: [
      {
        number: "01",
        title: "Submit Application",
        description: "Complete our detailed application form. Tell us about your current situation and goals.",
      },
      {
        number: "02",
        title: "Strategy Call",
        description: "If selected, you'll have a 60-minute strategy call with our team to discuss your fit.",
      },
      {
        number: "03",
        title: "Custom Proposal",
        description: "We'll create a custom transformation roadmap specifically for your situation.",
      },
      {
        number: "04",
        title: "Begin Transformation",
        description: "Once accepted, we begin immediately with your first coaching session.",
      },
    ],
  },
  testimonials: [
    {
      quote: "I was skeptical about the investment, but within 4 months I negotiated a $400K raise. The program paid for itself twice over before it even ended.",
      author: "Jessica Wu",
      role: "Chief Product Officer",
      company: "Enterprise SaaS",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      rating: 5,
      result: "$400K salary increase",
    },
    {
      quote: "The network alone is worth millions. I've closed 3 major deals through introductions made in this program. ROI is infinite.",
      author: "Robert Chen",
      role: "Founder & CEO",
      company: "AI Startup",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      rating: 5,
      result: "3 major deals closed",
    },
    {
      quote: "I went from feeling stuck to sitting on 2 boards and running my own advisory practice. My income tripled. This program is the real deal.",
      author: "Amanda Foster",
      role: "Board Member & Advisor",
      company: "Multiple Companies",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      rating: 5,
      result: "Income tripled",
    },
  ],
  faqs: [
    {
      question: "Who is this program for?",
      answer: "This program is exclusively for senior executives and high-performers earning $200K+ who are ready to make the leap to $1M+ income. You should be ambitious, coachable, and ready to invest in yourself.",
    },
    {
      question: "How is this different from other coaching programs?",
      answer: "Most programs are group coaching with generic advice. This is 1-on-1, fully customized to your situation, and includes direct access to our elite network of CEOs, investors, and board members.",
    },
    {
      question: "What if I can't afford the full investment upfront?",
      answer: "We offer a 6-month payment plan. Given that most clients see ROI within the first 4-6 months, the program often pays for itself before you finish paying.",
    },
    {
      question: "How much time does this require?",
      answer: "You'll have one 90-minute coaching session per week, plus 2-4 hours of implementation work. Most of the 'work' happens during your regular job as you apply the strategies.",
    },
    {
      question: "What's your success rate?",
      answer: "94% of our clients achieve at least a $150K income increase within 12 months. The average increase is $427K. We only work with committed individuals, which is why we have an application process.",
    },
    {
      question: "Do you guarantee results?",
      answer: "Yes. If you complete the program, implement the strategies, and don't see at least a $150K income increase within 12 months, we'll continue working with you at no additional cost until you do.",
    },
  ],
  finalCTA: {
    title: "Ready to Transform?",
    description: "Limited to 12 clients per year. 4 spots remaining for Q4 2024.",
    urgency: "Applications close in 14 days",
  },
};

export function PremiumProductTemplate() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gold-500/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gold-400">
            EXECUTIVE ASCENT
          </Link>
          <div className="flex items-center gap-6">
            <a href="#case-studies" className="text-sm text-gray-200 hover:text-gold-400 transition-colors font-medium">Case Studies</a>
            <a href="#investment" className="text-sm text-gray-200 hover:text-gold-400 transition-colors font-medium">Investment</a>
            <Button size="sm" className="bg-gold-500 text-black hover:bg-gold-400">
              Apply Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <Badge className="mb-4 bg-gold-500/10 text-gold-400 border-gold-500/30">
              {productData.hero.exclusiveBadge}
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                {productData.name}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-2xl md:text-3xl text-gray-100 mb-4 font-light">
              {productData.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
              {productData.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-lg text-gold-400 mb-12">
              {productData.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <Button size="lg" className="text-lg px-12 bg-gold-500 text-black hover:bg-gold-400">
              Submit Application
              <FiArrowRight className="ml-2" />
            </Button>
          </FadeIn>

          {/* Hero Image */}
          <FadeIn delay={0.6}>
            <div className="relative rounded-3xl overflow-hidden mt-16 border border-gold-500/20">
              <img
                src={productData.hero.image}
                alt="Executive Transformation"
                className="w-full h-[500px] object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Transformation - Before/After */}
      <section className="container mx-auto px-6 py-32 border-t border-gold-500/20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              {productData.transformation.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal delay={0.1}>
              <Card className="h-full bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-3xl text-gray-200">
                    {productData.transformation.before.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {productData.transformation.before.points.map((point, idx) => (
                      <li key={idx} className="text-lg text-gray-100">
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="h-full bg-gradient-to-br from-gold-500/10 to-gold-600/10 border-gold-500/30">
                <CardHeader>
                  <CardTitle className="text-3xl text-gold-300">
                    {productData.transformation.after.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {productData.transformation.after.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-lg text-white">
                        <FiCheck className="w-6 h-6 text-gold-300 flex-shrink-0 mt-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="container mx-auto px-6 py-32 bg-gradient-to-b from-transparent to-gray-950">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Real Results from Real Executives
            </h2>
            <p className="text-xl text-gray-100">
              These are actual clients who invested in themselves and transformed their careers
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto space-y-16">
          {productData.caseStudies.map((study, index) => (
            <ScrollReveal key={study.name} delay={index * 0.1}>
              <Card className="bg-gray-900 border-gold-500/20 hover:border-gold-500/40 transition-all">
                <CardContent className="p-10">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Left: Photo and Info */}
                    <div className="text-center md:text-left">
                      <img
                        src={study.photo}
                        alt={study.name}
                        className="w-32 h-32 rounded-full mx-auto md:mx-0 mb-4 border-2 border-gold-500"
                      />
                      <h3 className="text-2xl font-bold mb-2 text-white">{study.name}</h3>
                      <p className="text-gold-300 font-semibold mb-1">{study.title}</p>
                      <p className="text-sm text-gray-100 font-medium">{study.company}</p>
                    </div>

                    {/* Middle: Story */}
                    <div className="md:col-span-2">
                      <div className="mb-6">
                        <h4 className="text-sm uppercase text-gray-100 font-bold tracking-wider mb-3">Challenge</h4>
                        <p className="text-lg text-white leading-relaxed">{study.challenge}</p>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-sm uppercase text-gold-200 font-bold tracking-wider mb-3">Transformation</h4>
                        <p className="text-lg text-white leading-relaxed font-medium">{study.transformation}</p>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {study.metrics.map((metric) => (
                          <div key={metric.label} className="text-center p-5 bg-black/60 rounded-lg border border-gold-500/30">
                            <div className="text-3xl font-bold text-gold-300 mb-2">{metric.value}</div>
                            <div className="text-xs text-gray-100 font-semibold uppercase tracking-wide">{metric.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Quote */}
                      <div className="border-l-4 border-gold-400 pl-6 py-2">
                        <p className="italic text-gray-50 text-lg leading-relaxed">"{study.quote}"</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="container mx-auto px-6 py-32">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              {productData.whatYouGet.title}
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              {productData.whatYouGet.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {productData.whatYouGet.modules.map((module, index) => (
            <ScrollReveal key={module.title} delay={index * 0.1}>
              <Card className="h-full bg-gray-900 border-gold-500/20 hover:border-gold-500/40 transition-all">
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-black mb-4">
                    {module.icon}
                  </div>
                  <CardTitle className="text-2xl text-white">{module.title}</CardTitle>
                  <CardDescription className="text-base text-gray-100 leading-relaxed">{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {module.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-gold-300 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-100 font-medium">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Investment/Pricing */}
      <section id="investment" className="container mx-auto px-6 py-32 bg-gradient-to-b from-transparent to-gray-950">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              {productData.investment.title}
            </h2>
            <p className="text-xl text-gray-100">
              {productData.investment.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {productData.investment.options.map((option, index) => (
            <ScrollReveal key={option.name} delay={index * 0.1}>
              <Card className={`relative h-full bg-gray-900 ${option.popular ? "border-gold-500 shadow-lg shadow-gold-500/20 scale-105" : "border-gold-500/20"}`}>
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gold-500 text-black">Most Popular</Badge>
                  </div>
                )}
                {option.bonus && (
                  <div className="absolute -top-4 right-4">
                    <Badge className="bg-gold-500 text-black">{option.bonus}</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-3xl text-white">{option.name}</CardTitle>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-gold-300">{option.price}</span>
                    <p className="text-gray-100 mt-2 text-lg">{option.period}</p>
                  </div>
                  <CardDescription className="mt-4 text-gray-100 text-base">{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-8 bg-gold-500 text-black hover:bg-gold-400" size="lg">
                    {option.cta}
                  </Button>
                  <ul className="space-y-3">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-gold-300 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-100 font-medium">{feature}</span>
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
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-gold-500/10 to-gold-600/10 border-gold-500/30">
            <CardContent className="p-10 text-center">
              <Badge className="mb-4 bg-gold-500 text-black">{productData.guarantee.badge}</Badge>
              <h3 className="text-3xl font-bold mb-4">{productData.guarantee.title}</h3>
              <p className="text-lg text-gray-100">{productData.guarantee.description}</p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* Application Process */}
      <section className="container mx-auto px-6 py-32">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              {productData.applicationProcess.title}
            </h2>
            <p className="text-xl text-gray-100">
              {productData.applicationProcess.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {productData.applicationProcess.steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.1}>
              <Card className="bg-gray-900 border-gold-500/20">
                <CardContent className="p-8">
                  <div className="text-6xl font-bold text-gold-400/40 mb-4">{step.number}</div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-gray-100 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-32 bg-gradient-to-b from-transparent to-gray-950">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              What Clients Say
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {productData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.author} delay={index * 0.1}>
              <Card className="h-full bg-gray-900 border-gold-500/20">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 text-gray-50 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-100">{testimonial.role}</div>
                    </div>
                  </div>
                  <Badge className="bg-gold-500/10 text-gold-400 border-gold-500/30">
                    {testimonial.result}
                  </Badge>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 py-32">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto space-y-4">
          {productData.faqs.map((item, index) => (
            <ScrollReveal key={item.question} delay={index * 0.05}>
              <Card className="bg-gray-900 border-gold-500/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">{item.question}</CardTitle>
                  <CardDescription className="text-gray-100 text-base leading-relaxed mt-3">{item.answer}</CardDescription>
                </CardHeader>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-32 bg-gradient-to-b from-transparent to-black">
        <ScrollReveal>
          <Card className="max-w-5xl mx-auto bg-gradient-to-r from-gold-500 to-gold-600 text-black border-0">
            <CardContent className="p-16 text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                {productData.finalCTA.title}
              </h2>
              <p className="text-2xl mb-4 opacity-90">
                {productData.finalCTA.description}
              </p>
              <p className="text-lg mb-10 font-semibold">
                ⚠️ {productData.finalCTA.urgency}
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-12 bg-black text-white hover:bg-gray-900">
                Submit Your Application
                <FiArrowRight className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold-500/20 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center text-sm text-gray-400">
            <p>© 2024 Executive Ascent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
