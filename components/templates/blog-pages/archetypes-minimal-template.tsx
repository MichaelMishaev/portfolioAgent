"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n-context";
import {
  FiArrowRight,
  FiStar,
  FiCheck,
  FiUsers,
  FiHeart,
  FiZap,
  FiTarget,
  FiCompass,
  FiFeather,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

const archetypesData = {
  hero: {
    title: "Discover Your Creative Archetype",
    subtitle: "Unlock your true creative potential and learn to express yourself authentically",
    description: "Are you feeling stuck in your creative journey? Do you sense there's more to your creative identity than meets the eye? Your creative archetype holds the key to unlocking your authentic voice.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=800&fit=crop",
  },
  archetypes: [
    {
      id: 1,
      number: "01",
      title: "The Visionary",
      description: "You see possibilities others miss. Your imagination transforms the ordinary into extraordinary.",
      icon: <FiCompass className="w-6 h-6" />,
      color: "from-teal-500 to-cyan-500",
      traits: ["Innovative thinking", "Future-focused", "Big picture perspective"],
    },
    {
      id: 2,
      number: "02",
      title: "The Storyteller",
      description: "You weave narratives that captivate hearts and minds, making meaning from experience.",
      icon: <FiFeather className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      traits: ["Narrative mastery", "Emotional depth", "Connection builder"],
    },
    {
      id: 3,
      number: "03",
      title: "The Architect",
      description: "You build systems and structures that stand the test of time through careful planning.",
      icon: <FiTarget className="w-6 h-6" />,
      color: "from-teal-400 to-purple-500",
      traits: ["Strategic thinking", "Detail-oriented", "Systematic approach"],
    },
    {
      id: 4,
      number: "04",
      title: "The Catalyst",
      description: "You ignite change and inspire action, turning ideas into movements.",
      icon: <FiZap className="w-6 h-6" />,
      color: "from-purple-600 to-teal-500",
      traits: ["Energy driver", "Change agent", "Momentum creator"],
    },
    {
      id: 5,
      number: "05",
      title: "The Curator",
      description: "You refine and perfect, bringing order and beauty to creative chaos.",
      icon: <FiAward className="w-6 h-6" />,
      color: "from-teal-500 to-purple-400",
      traits: ["Excellence focused", "Taste maker", "Quality guardian"],
    },
    {
      id: 6,
      number: "06",
      title: "The Explorer",
      description: "You venture into unknown territory, discovering new creative frontiers.",
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: "from-purple-500 to-cyan-500",
      traits: ["Curiosity driven", "Risk taker", "Pioneer spirit"],
    },
    {
      id: 7,
      number: "07",
      title: "The Connector",
      description: "You bridge worlds and bring people together through collaborative creativity.",
      icon: <FiHeart className="w-6 h-6" />,
      color: "from-teal-400 to-pink-500",
      traits: ["Relationship builder", "Community focused", "Collaboration expert"],
    },
  ],
  targetAudience: {
    title: "Is This For You?",
    subtitle: "This program is designed for creative professionals who are ready to level up",
    groups: [
      {
        icon: <FiUsers className="w-8 h-8" />,
        title: "Creative Professionals",
        description: "Designers, writers, artists, and makers looking to understand their creative voice",
      },
      {
        icon: <FiTarget className="w-8 h-8" />,
        title: "Career Transitioners",
        description: "Those pivoting into creative fields and seeking clarity on their path",
      },
      {
        icon: <FiTrendingUp className="w-8 h-8" />,
        title: "Growing Leaders",
        description: "Creative directors and team leads wanting to amplify their impact",
      },
    ],
  },
  testimonials: [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Brand Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      quote: "Discovering my archetype was like finding the missing piece. My work has transformed completely.",
      rating: 5,
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      quote: "This framework gave me the confidence to embrace my unique creative approach. Game-changing.",
      rating: 5,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      quote: "I finally understand why certain projects energize me and others drain me. Life-changing insight.",
      rating: 5,
    },
  ],
  program: {
    title: "The Archetypes Program",
    subtitle: "A comprehensive journey to discover and master your creative archetype",
    features: [
      "90-minute comprehensive assessment",
      "Personalized archetype profile",
      "Custom creative strategy guide",
      "Access to private community",
      "Monthly group coaching sessions",
      "Archetype-specific resources library",
    ],
    pricing: {
      original: "$497",
      current: "$297",
      discount: "40% Launch Discount",
    },
    guarantee: "30-Day Money-Back Guarantee",
    cta: "Start Your Journey",
  },
};

export function ArchetypesMinimalTemplate() {
  const { tt } = useI18n();

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2"
          >
            {tt?.common?.backToGallery || "← Back to Gallery"}
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      {/* Stage 1: AWARENESS - Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 sm:py-20">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={archetypesData.hero.image}
            alt="Hero background"
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-purple-500/10 to-pink-500/10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn className="text-center max-w-4xl mx-auto">
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm border-teal-500 dark:border-teal-400 text-teal-600 dark:text-teal-400"
            >
              Transform Your Creative Journey
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-purple-600 dark:from-teal-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
              {archetypesData.hero.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {archetypesData.hero.subtitle}
            </p>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              {archetypesData.hero.description}
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Discover Your Archetype
              <FiArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Stage 2: EDUCATION - The 7 Archetypes */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-3xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white break-words">
                The 7 Creative Archetypes
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Each archetype represents a unique creative approach and set of strengths
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {archetypesData.archetypes.map((archetype, index) => (
              <ScrollReveal key={archetype.id} delay={index * 0.1}>
                <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${archetype.color}`} />

                  <CardContent className="p-6 sm:p-8">
                    {/* Number badge */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl sm:text-4xl font-bold text-gray-200 dark:text-gray-700">
                        {archetype.number}
                      </span>
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${archetype.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        {archetype.icon}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      {archetype.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {archetype.description}
                    </p>

                    {/* Traits */}
                    <div className="space-y-2">
                      {archetype.traits.map((trait, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <FiCheck className="w-4 h-4 text-teal-500 flex-shrink-0" />
                          <span>{trait}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stage 3: QUALIFICATION - Target Audience */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-3xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white break-words">
                {archetypesData.targetAudience.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {archetypesData.targetAudience.subtitle}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {archetypesData.targetAudience.groups.map((group, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="relative">
                  {/* Glassmorphism card */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600 transition-all shadow-lg hover:shadow-xl backdrop-blur-sm">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-purple-600 flex items-center justify-center text-white mb-6 shadow-lg">
                      {group.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      {group.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {group.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stage 4: CONSIDERATION - Testimonials */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-3xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white break-words">
                Success Stories
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Join thousands who have discovered their creative archetype
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {archetypesData.testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} delay={index * 0.1}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white dark:bg-gray-800 overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    {/* Star rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FiStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-teal-200 dark:border-teal-700"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stage 5: DECISION - Program & Pricing */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-3xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white break-words">
                  {archetypesData.program.title}
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                  {archetypesData.program.subtitle}
                </p>
              </div>

              {/* Pricing card with glassmorphism */}
              <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <CardContent className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Features */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                        What's Included
                      </h3>
                      <div className="space-y-4">
                        {archetypesData.program.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <FiCheck className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Pricing */}
                    <div className="flex flex-col justify-center">
                      <div className="bg-gradient-to-br from-teal-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
                        <Badge
                          variant="secondary"
                          className="mb-4 bg-white/20 text-white border-0"
                        >
                          {archetypesData.program.pricing.discount}
                        </Badge>

                        <div className="mb-6">
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-2xl line-through opacity-60">
                              {archetypesData.program.pricing.original}
                            </span>
                            <span className="text-4xl sm:text-5xl font-bold break-words">
                              {archetypesData.program.pricing.current}
                            </span>
                          </div>
                          <p className="text-teal-100 text-sm">
                            One-time payment, lifetime access
                          </p>
                        </div>

                        <Button
                          size="lg"
                          className="w-full bg-white text-teal-600 hover:bg-gray-100 font-semibold py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all mb-4"
                        >
                          {archetypesData.program.cta}
                          <FiArrowRight className="ml-2 w-5 h-5" />
                        </Button>

                        <p className="text-center text-sm text-teal-100">
                          <FiCheck className="inline w-4 h-4 mr-1" />
                          {archetypesData.program.guarantee}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-teal-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-3xl sm:text-5xl font-bold mb-6 break-words">
              Ready to Transform Your Creative Journey?
            </h2>
            <p className="text-xl sm:text-2xl mb-8 text-teal-50 max-w-2xl mx-auto">
              Join thousands of creative professionals who have discovered their true archetype
            </p>
            <Button
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-100 font-semibold px-10 py-7 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              Start Your Journey Now
              <FiArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 Creative Archetypes. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
