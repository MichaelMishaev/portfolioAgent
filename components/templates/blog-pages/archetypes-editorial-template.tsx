"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FiStar,
  FiCheck,
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiHeart,
  FiTarget,
  FiZap,
  FiShield,
  FiCompass,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

// 7 Transformational Archetypes
const archetypes = [
  {
    number: "01",
    icon: FiTarget,
    title: "The Leader",
    subtitle: "Command Your Presence",
    description: "Master the art of influence and inspire others to follow your vision. Build unwavering confidence and executive presence.",
    color: "from-blue-600 to-indigo-600",
    traits: ["Decisive", "Visionary", "Confident", "Strategic"],
  },
  {
    number: "02",
    icon: FiHeart,
    title: "The Nurturer",
    subtitle: "Create Deep Connections",
    description: "Develop profound empathy and build meaningful relationships. Transform lives through compassion and understanding.",
    color: "from-rose-600 to-pink-600",
    traits: ["Empathetic", "Supportive", "Caring", "Intuitive"],
  },
  {
    number: "03",
    icon: FiZap,
    title: "The Innovator",
    subtitle: "Disrupt & Transform",
    description: "Think beyond boundaries and create breakthrough solutions. Channel your creative energy into world-changing ideas.",
    color: "from-purple-600 to-violet-600",
    traits: ["Creative", "Bold", "Pioneering", "Original"],
  },
  {
    number: "04",
    icon: FiShield,
    title: "The Protector",
    subtitle: "Stand For Justice",
    description: "Defend what matters and create safe spaces. Become the guardian of values and advocate for change.",
    color: "from-amber-600 to-orange-600",
    traits: ["Courageous", "Loyal", "Principled", "Strong"],
  },
  {
    number: "05",
    icon: FiCompass,
    title: "The Explorer",
    subtitle: "Chart New Territory",
    description: "Embrace adventure and discover hidden potential. Navigate uncertainty with confidence and curiosity.",
    color: "from-teal-600 to-cyan-600",
    traits: ["Adventurous", "Curious", "Independent", "Brave"],
  },
  {
    number: "06",
    icon: FiStar,
    title: "The Performer",
    subtitle: "Captivate & Inspire",
    description: "Own the spotlight and express your authentic self. Transform presence into magnetic influence and impact.",
    color: "from-fuchsia-600 to-purple-600",
    traits: ["Charismatic", "Expressive", "Dynamic", "Inspiring"],
  },
  {
    number: "07",
    icon: FiSun,
    title: "The Sage",
    subtitle: "Wisdom & Mastery",
    description: "Cultivate deep wisdom and share transformative knowledge. Guide others through insight and understanding.",
    color: "from-emerald-600 to-green-600",
    traits: ["Wise", "Reflective", "Knowledgeable", "Calm"],
  },
];

const testimonials = [
  {
    name: "Jennifer Martinez",
    role: "Executive Coach",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    quote: "This program completely transformed how I show up in the world. I finally understand my core archetype and leverage it for maximum impact.",
  },
  {
    name: "Marcus Thompson",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    rating: 5,
    quote: "The archetype framework gave me clarity I've been searching for years. My business and relationships have completely transformed.",
  },
  {
    name: "Sarah Chen",
    role: "Leadership Consultant",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 5,
    quote: "Powerful beyond words. I now lead with authenticity and purpose. This is the missing piece I needed in my leadership journey.",
  },
  {
    name: "David Park",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    rating: 5,
    quote: "Understanding my archetype unlocked creative potential I didn't know existed. Game-changing for my career and personal growth.",
  },
];

const programDetails = {
  modules: [
    {
      title: "Archetype Discovery",
      description: "Deep dive assessment to identify your primary and secondary archetypes",
      duration: "Week 1-2",
    },
    {
      title: "Shadow Integration",
      description: "Work through limiting beliefs and embrace your full authentic power",
      duration: "Week 3-4",
    },
    {
      title: "Mastery Activation",
      description: "Develop advanced strategies to leverage your archetype in all areas of life",
      duration: "Week 5-8",
    },
    {
      title: "Leadership Expression",
      description: "Apply your archetype mastery to create lasting impact and influence",
      duration: "Week 9-12",
    },
  ],
  investment: {
    full: "$3,997",
    payment: "$397/month",
    bonus: "Limited Time: Receive $1,500 in exclusive bonuses",
  },
};

export function ArchetypesEditorialTemplate() {
  const { tt } = useI18n();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden max-w-full">
      {/* Bold Header Bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white border-b-4 border-blue-500">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-8">
              <Link
                href="/"
                className="text-xs sm:text-sm font-bold hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                {tt.common.backToGallery}
              </Link>
              <div className="hidden sm:flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0 text-xs sm:text-sm whitespace-nowrap">
              LIMITED ENROLLMENT
            </Badge>
          </div>
        </div>
      </div>

      {/* Stage 1: Awareness - Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-32 bg-slate-900 dark:bg-slate-950 text-white border-b-8 border-blue-500">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1920&h=1080&fit=crop')] opacity-10 bg-cover bg-center" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn>
            <div className="max-w-5xl mx-auto text-center">
              <Badge className="mb-4 sm:mb-8 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-bold border-0 shadow-2xl">
                THE ARCHETYPE MASTERY PROGRAM
              </Badge>

              <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 sm:mb-8">
                Who Are You
                <br />
                <span className="text-blue-400">Really</span> Meant To Be?
              </h1>

              <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto mb-4 sm:mb-8" />

              <p className="text-base sm:text-xl md:text-2xl text-gray-300 leading-relaxed mb-6 sm:mb-12 font-light max-w-3xl mx-auto px-4">
                Most people spend their entire lives playing a role that isn't theirs.
                <span className="text-white font-semibold"> Discover your true archetype</span> and unlock
                the power, presence, and purpose you were born to express.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-16">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-12 py-4 sm:py-8 text-base sm:text-xl font-bold border-4 border-white shadow-2xl hover:scale-105 transition-transform w-full sm:w-auto"
                >
                  CLAIM YOUR ARCHETYPE
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-slate-900 px-6 sm:px-12 py-4 sm:py-8 text-base sm:text-xl font-bold border-4 shadow-2xl w-full sm:w-auto"
                >
                  TAKE FREE QUIZ
                </Button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
                {[
                  { value: "50,000+", label: "Lives Transformed" },
                  { value: "7", label: "Power Archetypes" },
                  { value: "12 Weeks", label: "To Mastery" },
                  { value: "98%", label: "Success Rate" },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center border-2 border-white p-3 sm:p-6 bg-slate-800/50">
                    <div className="text-2xl sm:text-4xl font-black text-blue-400 mb-1 sm:mb-2">{stat.value}</div>
                    <div className="text-xs sm:text-sm font-bold text-white">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stage 2: Education - 7 Archetypes Grid */}
      <section className="py-12 sm:py-20 lg:py-32 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <FadeIn>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                The <span className="text-blue-600">Seven</span> Archetypes
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6" />
              <p className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
                Each archetype represents a unique pathway to power, influence, and authentic expression.
                Which one is calling to you?
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {archetypes.map((archetype, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <Card className="border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(59,130,246,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all group overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    {/* Number Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-6xl sm:text-7xl font-black text-slate-200 dark:text-slate-800">
                        {archetype.number}
                      </div>
                      <div className={`p-3 sm:p-4 bg-gradient-to-br ${archetype.color} rounded-lg`}>
                        <archetype.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-playfair text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
                      {archetype.title}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-blue-600 mb-4">
                      {archetype.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {archetype.description}
                    </p>

                    {/* Traits */}
                    <div className="flex flex-wrap gap-2">
                      {archetype.traits.map((trait, tIdx) => (
                        <Badge
                          key={tIdx}
                          variant="outline"
                          className="border-2 border-slate-900 dark:border-white font-bold text-xs"
                        >
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA After Archetypes */}
          <div className="text-center mt-12 sm:mt-20">
            <FadeIn delay={0.8}>
              <div className="bg-slate-900 dark:bg-slate-950 text-white p-6 sm:p-12 border-4 border-blue-500 shadow-[12px_12px_0px_0px_rgba(59,130,246,1)] max-w-4xl mx-auto">
                <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6">
                  Ready to Discover Your Dominant Archetype?
                </h3>
                <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8">
                  Take our free 5-minute assessment and unlock your personalized archetype profile
                </p>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-16 py-4 sm:py-8 text-base sm:text-xl font-black border-4 border-white w-full sm:w-auto"
                >
                  START FREE ASSESSMENT
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stage 3: Qualification - Who This Is For */}
      <section className="py-12 sm:py-20 lg:py-32 bg-slate-900 dark:bg-slate-950 text-white border-y-8 border-blue-500">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center mb-6 sm:mb-8 leading-tight">
                Is This <span className="text-blue-400">Your Journey</span>?
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto mb-8 sm:mb-16" />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Column - This IS For You */}
              <ScrollReveal>
                <div className="border-4 border-green-500 p-6 sm:p-10 bg-slate-800">
                  <div className="flex items-center gap-4 mb-6 sm:mb-8">
                    <FiCheck className="w-8 h-8 sm:w-12 sm:h-12 text-green-500" />
                    <h3 className="font-playfair text-2xl sm:text-3xl font-black">This IS For You If...</h3>
                  </div>
                  <ul className="space-y-4 sm:space-y-6">
                    {[
                      "You feel like you're playing a role that isn't authentically YOU",
                      "You're ready to step into leadership but lack clarity on your unique approach",
                      "You want to amplify your influence without compromising your values",
                      "You're seeking a framework that honors your individuality while providing structure",
                      "You're committed to 12 weeks of deep inner work and transformation",
                      "You're ready to invest in becoming the person you were meant to be",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <FiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-base sm:text-lg leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Right Column - This IS NOT For You */}
              <ScrollReveal delay={0.2}>
                <div className="border-4 border-red-500 p-6 sm:p-10 bg-slate-800">
                  <div className="flex items-center gap-4 mb-6 sm:mb-8">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                      <div className="w-full h-1 bg-red-500 rotate-45" />
                    </div>
                    <h3 className="font-playfair text-2xl sm:text-3xl font-black">This IS NOT For You If...</h3>
                  </div>
                  <ul className="space-y-4 sm:space-y-6">
                    {[
                      "You're looking for quick fixes or surface-level personality tests",
                      "You're not willing to confront limiting beliefs and shadow patterns",
                      "You expect transformation without consistent practice and application",
                      "You're seeking external validation rather than internal alignment",
                      "You're not ready to invest time, energy, and resources in yourself",
                      "You prefer staying comfortable over embracing growth challenges",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1">
                          <div className="w-full h-0.5 bg-red-500 rotate-45 relative top-2.5" />
                          <div className="w-full h-0.5 bg-red-500 -rotate-45 relative -top-0" />
                        </div>
                        <span className="text-base sm:text-lg leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            <div className="text-center mt-12 sm:mt-16">
              <FadeIn delay={0.4}>
                <p className="text-xl sm:text-2xl font-bold text-blue-400 mb-6 sm:mb-8">
                  If you're nodding YES to the left column, this program will change your life.
                </p>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-16 py-4 sm:py-8 text-base sm:text-xl font-black border-4 border-white w-full sm:w-auto"
                >
                  APPLY NOW - LIMITED SPOTS
                </Button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 4: Consideration - Testimonials */}
      <section className="py-12 sm:py-20 lg:py-32 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <FadeIn>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                Real People. <span className="text-blue-600">Real Transformation</span>.
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6" />
              <p className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                See what happens when you align with your true archetype
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <Card className="border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(59,130,246,1)] transition-all">
                  <CardContent className="p-6 sm:p-8">
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-4 sm:mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FiStar key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-blue-600 text-blue-600" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed italic font-medium">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-slate-900 dark:border-white object-cover"
                      />
                      <div>
                        <div className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-semibold">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Social Proof Bar */}
          <div className="mt-12 sm:mt-20">
            <FadeIn delay={0.5}>
              <div className="bg-blue-600 text-white p-6 sm:p-10 border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] max-w-4xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
                  <div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">4.9/5</div>
                    <div className="text-sm sm:text-base font-bold">Average Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">2,847</div>
                    <div className="text-sm sm:text-base font-bold">Success Stories</div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">98%</div>
                    <div className="text-sm sm:text-base font-bold">Would Recommend</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stage 5: Decision - Program Details & Pricing */}
      <section className="py-12 sm:py-20 lg:py-32 bg-slate-900 dark:bg-slate-950 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-20">
              <FadeIn>
                <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
                  The <span className="text-blue-400">Mastery Program</span>
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto mb-4 sm:mb-6" />
                <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                  12 weeks to discover, embody, and master your archetype
                </p>
              </FadeIn>
            </div>

            {/* Program Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-20">
              {programDetails.modules.map((module, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <div className="border-4 border-white p-6 sm:p-8 bg-slate-800 hover:bg-slate-700 transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-3xl sm:text-4xl font-black text-blue-400">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-playfair text-xl sm:text-2xl font-black mb-2">
                          {module.title}
                        </h3>
                        <Badge className="bg-blue-600 text-white mb-4 text-xs sm:text-sm">
                          {module.duration}
                        </Badge>
                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                          {module.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Pricing Card */}
            <FadeIn delay={0.5}>
              <div className="border-8 border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-8 sm:p-12 shadow-[16px_16px_0px_0px_rgba(59,130,246,1)] max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <Badge className="bg-red-600 text-white px-4 sm:px-6 py-2 text-sm sm:text-lg font-black mb-4 sm:mb-6">
                    LIMITED TIME OFFER
                  </Badge>
                  <h3 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
                    Investment Options
                  </h3>
                  <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                    Choose the payment plan that works for you
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  {/* Pay in Full */}
                  <div className="border-4 border-slate-900 dark:border-white p-6 sm:p-8 text-center bg-blue-50 dark:bg-slate-800">
                    <div className="text-sm font-bold mb-2 text-gray-600 dark:text-gray-400">PAY IN FULL</div>
                    <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2">{programDetails.investment.full}</div>
                    <div className="text-sm sm:text-base font-bold text-green-600 mb-4">Save $781</div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black border-4 border-slate-900 dark:border-white py-4 sm:py-6 text-base sm:text-lg">
                      ENROLL NOW
                    </Button>
                  </div>

                  {/* Payment Plan */}
                  <div className="border-4 border-slate-900 dark:border-white p-6 sm:p-8 text-center">
                    <div className="text-sm font-bold mb-2 text-gray-600 dark:text-gray-400">PAYMENT PLAN</div>
                    <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2">{programDetails.investment.payment}</div>
                    <div className="text-sm sm:text-base font-bold text-gray-600 dark:text-gray-400 mb-4">12 Monthly Payments</div>
                    <Button
                      variant="outline"
                      className="w-full border-4 border-slate-900 dark:border-white hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 font-black py-4 sm:py-6 text-base sm:text-lg"
                    >
                      START PAYMENT PLAN
                    </Button>
                  </div>
                </div>

                {/* Bonus */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 sm:p-8 border-4 border-slate-900 dark:border-white text-center">
                  <FiAward className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4" />
                  <p className="text-xl sm:text-2xl font-black mb-2">{programDetails.investment.bonus}</p>
                  <p className="text-sm sm:text-base">1-on-1 Strategy Session + Lifetime Community Access + Bonus Workshops</p>
                </div>

                {/* Guarantee */}
                <div className="text-center mt-8 sm:mt-12 p-6 sm:p-8 border-4 border-green-500 bg-green-50 dark:bg-slate-800">
                  <FiShield className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-green-600" />
                  <h4 className="font-playfair text-xl sm:text-2xl font-black mb-3">
                    100% Satisfaction Guarantee
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    Complete the first 30 days. If you don't see profound shifts in your self-awareness
                    and presence, we'll refund every penny. No questions asked.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Final CTA */}
            <div className="text-center mt-12 sm:mt-20">
              <FadeIn delay={0.7}>
                <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6">
                  Your True Self Is Waiting
                </h3>
                <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
                  Stop living someone else's story. Enrollment closes in 72 hours.
                </p>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-20 py-6 sm:py-10 text-xl sm:text-2xl font-black border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transition-all w-full sm:w-auto"
                >
                  CLAIM YOUR SPOT NOW
                </Button>
                <p className="text-sm sm:text-base text-gray-400 mt-4 sm:mt-6">
                  Only 12 spots remaining in this cohort
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-8 sm:py-12 border-t-4 border-blue-500">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-xl sm:text-2xl font-playfair font-black mb-3 sm:mb-4">
            ARCHETYPES JOURNAL
          </p>
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
            Discover who you were meant to be. Master your archetype. Transform your life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-xs sm:text-sm text-gray-500">
            © 2025 Archetypes Journal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
