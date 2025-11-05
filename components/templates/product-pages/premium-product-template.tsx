"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiCheck,
  FiStar,
  FiArrowRight,
  FiAward,
  FiTrendingUp,
  FiClock,
  FiZap,
  FiShield,
  FiPackage,
  FiGlobe,
  FiHeart
,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

const productData = {
  name: "CHRONOS ÉLITE",
  collection: "Heritage Collection 2024",
  tagline: "Where Time Becomes Art",
  description: "Hand-crafted Swiss timepiece featuring a flying tourbillon, perpetual calendar, and our signature moon phase complication. Limited to 500 pieces worldwide.",
  price: {
    amount: 185000,
    currency: "$",
    starting: "Starting at",
  },
  hero: {
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&h=1080&fit=crop&q=90",
    badge: "Limited Edition · 47 Remaining",
  },
  heritage: {
    title: "Two Centuries of Excellence",
    founded: "1824",
    story: "For 200 years, CHRONOS has been at the pinnacle of haute horlogerie. Each timepiece is a masterwork, requiring over 1,200 hours of craftsmanship by our master watchmakers in Geneva.",
    milestones: [
      { year: "1824", event: "Founded in Geneva by Master Horologist Jacques Beaumont", image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&h=600&fit=crop&q=90" },
      { year: "1889", event: "Awarded Gold Medal at Paris Universal Exposition", image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800&h=600&fit=crop&q=90" },
      { year: "1955", event: "Introduced first automatic tourbillon movement", image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&h=600&fit=crop&q=90" },
      { year: "2024", event: "Heritage Collection: Our most sophisticated caliber yet", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=600&fit=crop&q=90" },
    ],
  },
  technicalMastery: {
    title: "Technical Mastery",
    subtitle: "Every component engineered to perfection",
    features: [
      {
        title: "Flying Tourbillon",
        description: "Our signature flying tourbillon compensates for gravity's effects on accuracy. Visible through the sapphire caseback, it completes one rotation every 60 seconds.",
        image: "https://images.unsplash.com/photo-1514498911774-ea6177c201ab?w=1200&h=800&fit=crop&q=90",
        stat: "±1 sec/day",
        metric: "Precision",
      },
      {
        title: "Perpetual Calendar",
        description: "Automatically accounts for leap years until 2100. Moon phase accuracy: one day's deviation every 122 years.",
        image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=1200&h=800&fit=crop&q=90",
        stat: "122 years",
        metric: "Moon Phase Accuracy",
      },
      {
        title: "In-House Caliber CE-1824",
        description: "Our entirely in-house movement features 473 components, 68 jewels, and a 7-day power reserve. Each movement is aged for 3 months before assembly.",
        image: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1200&h=800&fit=crop&q=90",
        stat: "168 hours",
        metric: "Power Reserve",
      },
      {
        title: "Artisan Dial Making",
        description: "Each dial undergoes 17 manual processes including Grand Feu enameling, hand-guilloché engraving, and 24K gold appliqués.",
        image: "https://images.unsplash.com/photo-1611858923112-1970299d2b38?w=1200&h=800&fit=crop&q=90",
        stat: "17 steps",
        metric: "Hand Crafted",
      },
    ],
  },
  configurator: {
    title: "Configure Your Masterpiece",
    subtitle: "Each CHRONOS ÉLITE is made to order",
    materials: [
      {
        name: "18K Rose Gold",
        price: 185000,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop&q=90",
        color: "#D4AF37",
        description: "Our signature 5N rose gold alloy",
      },
      {
        name: "Platinum 950",
        price: 235000,
        image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&h=600&fit=crop&q=90",
        color: "#E5E4E2",
        description: "Ultra-rare platinum case",
      },
      {
        name: "White Gold & Diamonds",
        price: 325000,
        image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=600&fit=crop&q=90",
        color: "#F0F0F0",
        description: "18K white gold with 2.5ct diamonds",
      },
    ],
    complications: [
      { name: "Flying Tourbillon", included: true },
      { name: "Perpetual Calendar", included: true },
      { name: "Moon Phase", included: true },
      { name: "Minute Repeater", price: 75000 },
      { name: "Celestial Chart", price: 50000 },
      { name: "Equation of Time", price: 35000 },
    ],
    straps: [
      { name: "Alligator Leather - Black", price: 0, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop&q=90" },
      { name: "Alligator Leather - Brown", price: 0, image: "https://images.unsplash.com/photo-1533139142584-c2c6e4ba3b7e?w=400&h=400&fit=crop&q=90" },
      { name: "Crocodile Leather - Navy", price: 8500, image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop&q=90" },
      { name: "Solid Gold Bracelet", price: 45000, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop&q=90" },
    ],
  },
  craftsmen: {
    title: "The Masters Behind Your Timepiece",
    subtitle: "Meet the artisans who will craft your CHRONOS ÉLITE",
    profiles: [
      {
        name: "Laurent Beaumont",
        title: "Master Watchmaker",
        specialty: "Tourbillon Assembly",
        experience: "37 years",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=90",
        quote: "Each tourbillon cage is balanced to within 0.001 grams. It's not just precision—it's poetry.",
      },
      {
        name: "Sophie Mercier",
        title: "Dial Artisan",
        specialty: "Grand Feu Enameling",
        experience: "28 years",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=90",
        quote: "The enamel fires at 800°C. One mistake and we start over. Perfection cannot be rushed.",
      },
      {
        name: "Pierre Dubois",
        title: "Movement Finisher",
        specialty: "Hand Engraving",
        experience: "42 years",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=90",
        quote: "I engrave your serial number by hand. Your watch carries my signature forever.",
      },
    ],
  },
  specifications: {
    title: "Technical Specifications",
    details: {
      case: {
        title: "Case",
        specs: [
          "Diameter: 42mm",
          "Thickness: 13.8mm",
          "Crystal: Sapphire (front & back)",
          "Water resistance: 50m",
          "Bezel: Polished with 24 screws",
        ],
      },
      movement: {
        title: "Movement",
        specs: [
          "Caliber: CE-1824 (in-house)",
          "Components: 473 parts",
          "Jewels: 68 rubies",
          "Frequency: 21,600 vph",
          "Power reserve: 168 hours",
          "Finish: Côtes de Genève, perlage",
        ],
      },
      dial: {
        title: "Dial & Hands",
        specs: [
          "Material: Grand Feu enamel",
          "Technique: Hand guilloché",
          "Markers: 24K gold appliqués",
          "Hands: Heat-blued steel",
          "Lume: Super-LumiNova",
        ],
      },
    },
  },
  ownership: {
    title: "The CHRONOS ÉLITE Experience",
    subtitle: "Ownership extends far beyond the timepiece",
    benefits: [
      {
        icon: <FiShield className="w-8 h-8" />,
        title: "Lifetime Warranty",
        description: "Comprehensive coverage for all mechanical components. Free servicing every 5 years at our Geneva atelier.",
      },
      {
        icon: <FiGlobe className="w-8 h-8" />,
        title: "Global Concierge",
        description: "24/7 access to our concierge team. Priority reservations, travel assistance, and exclusive event invitations.",
      },
      {
        icon: <FiAward className="w-8 h-8" />,
        title: "Certificate of Authenticity",
        description: "Hand-signed by Master Watchmaker Laurent Beaumont. Includes detailed movement photograph and serial number.",
      },
      {
        icon: <FiTrendingUp className="w-8 h-8" />,
        title: "Investment Grade",
        description: "Our timepieces appreciate avg. 12% annually. We offer first refusal for resale through our heritage program.",
      },
      {
        icon: <FiPackage className="w-8 h-8" />,
        title: "Private Delivery",
        description: "Hand-delivered to your door in a bespoke wooden presentation case. Includes certified appraisal ($5,000 value).",
      },
      {
        icon: <FiHeart className="w-8 h-8" />,
        title: "Geneva Experience",
        description: "Complimentary 3-day visit to our atelier. Watch your timepiece being assembled and meet your craftsmen.",
      },
    ],
  },
  testimonials: [
    {
      quote: "I've owned Patek, Vacheron, and AP. My CHRONOS ÉLITE is the crown jewel of my collection. The craftsmanship is simply unparalleled.",
      author: "James Morrison",
      title: "Collector",
      collection: "18 timepieces",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=90",
      rating: 5,
    },
    {
      quote: "Bought it as an investment. It's appreciated 28% in three years. But honestly, I'll never sell it. It's going to my son.",
      author: "Victoria Chen",
      title: "Investment Banker",
      collection: "2024 Heritage Edition",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=90",
      rating: 5,
    },
    {
      quote: "The Geneva experience was incredible. Watching Laurent assemble the tourbillon for MY watch was a moment I'll never forget.",
      author: "Alexander Petrov",
      title: "Entrepreneur",
      collection: "Platinum 950",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=90",
      rating: 5,
    },
  ],
  finalCTA: {
    title: "Begin Your Journey",
    description: "47 of 500 pieces remain. Each CHRONOS ÉLITE requires 6-8 months to craft.",
    urgency: "Next availability: March 2025",
  },
};

export function PremiumProductTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [selectedComplications, setSelectedComplications] = useState<number[]>([]);
  const [selectedStrap, setSelectedStrap] = useState(0);
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  const calculatePrice = () => {
    let total = productData.configurator.materials[selectedMaterial].price;
    selectedComplications.forEach(idx => {
      const complication = productData.configurator.complications[idx];
      if (complication.price) total += complication.price;
    });
    const strap = productData.configurator.straps[selectedStrap];
    if (strap.price) total += strap.price;
    return total.toLocaleString();
  };

  const toggleComplication = (index: number) => {
    const complication = productData.configurator.complications[index];
    if (complication.included) return; // Can't toggle included complications

    if (selectedComplications.includes(index)) {
      setSelectedComplications(selectedComplications.filter(i => i !== index));
    } else {
      setSelectedComplications([...selectedComplications, index]);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-black text-white">
      {/* Elegant Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-3 max-w-full py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-light tracking-[0.2em] text-white">
            CHRONOS
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
            <a href="#heritage" className="text-xs uppercase tracking-widest text-gray-300 hover:text-white transition-colors">Heritage</a>
            <a href="#configure" className="text-xs uppercase tracking-widest text-gray-300 hover:text-white transition-colors">Configure</a>
            <a href="#ownership" className="text-xs uppercase tracking-widest text-gray-300 hover:text-white transition-colors">Ownership</a>
            <Button size="sm" className="bg-white text-black hover:bg-gray-200 font-light tracking-wider">
              Inquire
            </Button>
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
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-t">
            <div className="container mx-auto px-3 max-w-full py-4 flex flex-col gap-4">
              <a
                href="#heritage"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Heritage
              </a>
              <a
                href="#configure"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Configure
              </a>
              <a
                href="#ownership"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ownership
              </a>
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Cinematic Hero with Parallax */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <img
            src={productData.hero.image}
            alt={productData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </motion.div>

        <motion.div
          className="relative h-full flex flex-col items-center justify-center text-center px-3"
          style={{ opacity: heroOpacity }}
        >
          <FadeIn>
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm px-3 py-2 text-xs tracking-widest">
              {productData.hero.badge}
            </Badge>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-4xl sm:text-5xl md:text-6xl lg:text-9xl font-light mb-4 tracking-tight break-words text-gray-900">
              {productData.name}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl text-gray-300 mb-3 font-light tracking-wide">
              {productData.collection}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-lg text-gray-400 mb-12 max-w-full font-light italic">
              {productData.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="text-base text-gray-300 mb-12 max-w-full leading-relaxed">
              {productData.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex flex-col items-center gap-4">
              <span className="text-sm text-gray-400 uppercase tracking-widest">{productData.price.starting}</span>
              <span className="text-5xl font-light tracking-tight">
                {productData.price.currency}{productData.price.amount.toLocaleString()}
              </span>
              <Button size="lg" className="mt-4 bg-white text-black hover:bg-gray-200 px-8 py-6 text-sm tracking-wider">
                Schedule Private Viewing
                <FiArrowRight className="ml-2" />
              </Button>
            </div>
          </FadeIn>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ opacity: heroOpacity }}
        >
          <div className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Heritage Section */}
      <section id="heritage" className="container mx-auto px-3 max-w-full py-32">
        <ScrollReveal>
          <div className="max-w-full mx-auto text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-light mb-8 tracking-tight text-gray-900">
              {productData.heritage.title}
            </h2>
            <div className="text-9xl font-light text-gray-800 mb-8">
              {productData.heritage.founded}
            </div>
            <p className="text-xl text-gray-400 leading-relaxed">
              {productData.heritage.story}
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="max-w-full mx-auto space-y-24 mt-32">
          {productData.heritage.milestones.map((milestone, index) => (
            <ScrollReveal key={milestone.year} delay={index * 0.1}>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                    <img
                      src={milestone.image}
                      alt={milestone.year}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                  <div className="text-7xl font-light text-gray-700 mb-6">{milestone.year}</div>
                  <p className="text-2xl text-gray-300 leading-relaxed">{milestone.event}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Technical Mastery */}
      <section className="container mx-auto px-3 max-w-full py-32 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-tight text-gray-900">
              {productData.technicalMastery.title}
            </h2>
            <p className="text-xl text-gray-400">
              {productData.technicalMastery.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-full mx-auto space-y-32">
          {productData.technicalMastery.features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="relative overflow-hidden rounded-3xl aspect-[3/2] border border-white/5">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="inline-block px-3 py-3 bg-white/5 rounded-full mb-6">
                    <span className="text-4xl font-light">{feature.stat}</span>
                    <span className="text-sm text-gray-400 ml-3 uppercase tracking-wider">{feature.metric}</span>
                  </div>
                  <h3 className="text-4xl font-light mb-6 text-gray-900">{feature.title}</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Interactive Configurator */}
      <section id="configure" className="container mx-auto px-3 max-w-full py-32">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-tight text-gray-900">
              {productData.configurator.title}
            </h2>
            <p className="text-xl text-gray-400">
              {productData.configurator.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-full mx-auto">
          {/* Material Selection */}
          <ScrollReveal delay={0.1}>
            <div className="mb-16">
              <h3 className="text-3xl font-light mb-8 text-center text-gray-900">Select Case Material</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {productData.configurator.materials.map((material, index) => (
                  <motion.div
                    key={material.name}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedMaterial(index)}
                    className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedMaterial === index
                        ? 'border-white shadow-2xl shadow-white/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={material.image}
                        alt={material.name}
                        className="w-full h-full object-cover"
                      />
                      {selectedMaterial === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center"
                        >
                          <FiCheck className="text-black" />
                        </motion.div>
                      )}
                    </div>
                    <div className="p-6 bg-gray-900/50 backdrop-blur">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: material.color }}
                        />
                        <h4 className="text-lg font-light">{material.name}</h4>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{material.description}</p>
                      <p className="text-2xl font-light">${material.price.toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Complications */}
          <ScrollReveal delay={0.2}>
            <div className="mb-16">
              <h3 className="text-3xl font-light mb-8 text-center text-gray-900">Complications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full mx-auto">
                {productData.configurator.complications.map((complication, index) => (
                  <motion.button
                    key={complication.name}
                    whileHover={{ scale: complication.included ? 1 : 1.02 }}
                    whileTap={{ scale: complication.included ? 1 : 0.98 }}
                    onClick={() => toggleComplication(index)}
                    disabled={complication.included}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      complication.included
                        ? 'border-white/20 bg-white/5 cursor-default'
                        : selectedComplications.includes(index)
                        ? 'border-white bg-white/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-base font-light">{complication.name}</span>
                      {complication.included ? (
                        <Badge className="bg-white/10 text-white text-xs">Included</Badge>
                      ) : (
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedComplications.includes(index) ? 'border-white bg-white' : 'border-white/30'
                        }`}>
                          {selectedComplications.includes(index) && (
                            <FiCheck className="w-3 h-3 text-black" />
                          )}
                        </div>
                      )}
                    </div>
                    {complication.price && (
                      <p className="text-sm text-gray-400">+${complication.price.toLocaleString()}</p>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Strap Selection */}
          <ScrollReveal delay={0.3}>
            <div className="mb-16">
              <h3 className="text-3xl font-light mb-8 text-center text-gray-900">Select Strap</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-full mx-auto">
                {productData.configurator.straps.map((strap, index) => (
                  <motion.div
                    key={strap.name}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedStrap(index)}
                    className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                      selectedStrap === index
                        ? 'border-white'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={strap.image}
                        alt={strap.name}
                        className="w-full h-full object-cover"
                      />
                      {selectedStrap === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                        >
                          <FiCheck className="text-black w-4 h-4" />
                        </motion.div>
                      )}
                    </div>
                    <div className="p-3 bg-gray-900/50 backdrop-blur">
                      <p className="text-sm font-light mb-1">{strap.name}</p>
                      <p className="text-xs text-gray-400">
                        {strap.price === 0 ? 'Included' : `+$${strap.price.toLocaleString()}`}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Price Summary */}
          <ScrollReveal delay={0.4}>
            <Card className="max-w-full mx-auto bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 backdrop-blur">
              <CardContent className="p-10 text-center">
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">Your Configuration</p>
                <div className="text-6xl font-light mb-8">
                  ${calculatePrice()}
                </div>
                <div className="space-y-2 mb-8 text-sm text-gray-400">
                  <p>{productData.configurator.materials[selectedMaterial].name}</p>
                  {selectedComplications.map(idx => (
                    <p key={idx}>{productData.configurator.complications[idx].name}</p>
                  ))}
                  <p>{productData.configurator.straps[selectedStrap].name}</p>
                </div>
                <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 px-12 py-6">
                  Request Consultation
                  <FiArrowRight className="ml-2" />
                </Button>
                <p className="text-xs text-gray-500 mt-6">Estimated delivery: 6-8 months from order</p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Master Craftsmen */}
      <section className="container mx-auto px-3 max-w-full py-32 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-tight text-gray-900">
              {productData.craftsmen.title}
            </h2>
            <p className="text-xl text-gray-400">
              {productData.craftsmen.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {productData.craftsmen.profiles.map((craftsman, index) => (
            <ScrollReveal key={craftsman.name} delay={index * 0.1}>
              <Card className="h-full bg-white/5 border-white/10 hover:border-white/20 transition-all backdrop-blur">
                <CardContent className="p-8">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 border border-white/10">
                    <img
                      src={craftsman.image}
                      alt={craftsman.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <h3 className="text-2xl font-light mb-2 text-gray-900">{craftsman.name}</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">{craftsman.title}</p>
                  <p className="text-sm text-gray-500 mb-4">{craftsman.specialty}</p>
                  <Badge className="bg-white/10 text-white text-xs mb-6">{craftsman.experience}</Badge>
                  <div className="border-l-2 border-white/20 pl-4 py-2">
                    <p className="text-sm text-gray-300 italic leading-relaxed">"{craftsman.quote}"</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="container mx-auto px-3 max-w-full py-32">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-tight text-gray-900">
              {productData.specifications.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(productData.specifications.details).map((section, index) => (
            <ScrollReveal key={section.title} delay={index * 0.1}>
              <Card className="h-full bg-white/5 border-white/10 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl font-light">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.specs.map((spec, idx) => (
                      <li key={idx} className="text-sm text-gray-400 leading-relaxed border-b border-white/5 pb-3 last:border-0">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Ownership Benefits */}
      <section id="ownership" className="container mx-auto px-3 max-w-full py-32 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-tight text-gray-900">
              {productData.ownership.title}
            </h2>
            <p className="text-xl text-gray-400">
              {productData.ownership.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productData.ownership.benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.1}>
              <Card className="h-full bg-white/5 border-white/10 hover:border-white/20 transition-all backdrop-blur">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-light mb-3 text-gray-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-3 max-w-full py-32">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-tight text-gray-900">
              Collector Testimonials
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {productData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.author} delay={index * 0.1}>
              <Card className="h-full bg-white/5 border-white/10 backdrop-blur">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 fill-white text-white" />
                    ))}
                  </div>
                  <p className="text-base mb-8 text-gray-300 leading-relaxed italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full grayscale"
                    />
                    <div>
                      <div className="font-light">{testimonial.author}</div>
                      <div className="text-xs text-gray-400">{testimonial.title}</div>
                    </div>
                  </div>
                  <Badge className="bg-white/5 text-gray-400 text-xs border-white/10">
                    {testimonial.collection}
                  </Badge>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-3 max-w-full py-32">
        <ScrollReveal>
          <Card className="max-w-full mx-auto bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-xl">
            <CardContent className="p-16 text-center">
              <FiClock className="w-16 h-16 mx-auto mb-8 text-gray-400" />
              <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight text-gray-900">
                {productData.finalCTA.title}
              </h2>
              <p className="text-xl text-gray-300 mb-4">
                {productData.finalCTA.description}
              </p>
              <p className="text-sm text-gray-400 mb-10 uppercase tracking-widest">
                {productData.finalCTA.urgency}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row gap-4 justify-center">
                <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 px-12 py-6 text-sm tracking-wider">
                  Schedule Consultation
                  <FiArrowRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 !text-white !bg-transparent hover:bg-white/10 px-12 py-6 text-sm tracking-wider">
                  Download Brochure
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* Elegant Footer */}
      <footer className="border-t border-white/5 py-16">
        <div className="container mx-auto px-3 max-w-full">
          <div className="text-center">
            <div className="text-3xl font-light tracking-[0.2em] mb-6">CHRONOS</div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-8">Geneva · Since 1824</p>
            <div className="flex justify-center gap-8 text-xs text-gray-500 uppercase tracking-wider">
              <a href="#" className="hover:text-white transition-colors">Heritage</a>
              <a href="#" className="hover:text-white transition-colors">Craftsmanship</a>
              <a href="#" className="hover:text-white transition-colors">Atelier Visits</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
