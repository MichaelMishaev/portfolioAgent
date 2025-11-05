"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiCheck, FiZap, FiWind, FiBattery, FiActivity, FiAward, FiTrendingUp, FiFilter ,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";

const productData = {
  name: "V20 Quantum Vacuum",
  tagline: "Intelligent cleaning. Powerful suction.",
  description: "Cordless stick vacuum with laser dust detection and 2-hour runtime. Engineered for whole-home deep cleaning.",
  price: {
    amount: 699,
    currency: "$",
  },
  colors: [
    { name: "Nickel/Blue", hex: "#60a5fa", available: true },
    { name: "Iron/Red", hex: "#ef4444", available: true },
    { name: "Copper/Silver", hex: "#a3a3a3", available: true },
  ],
  hero: {
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=1200&h=800&fit=crop&q=80",
  },
  performanceMetrics: {
    suctionPower: "240 AW",
    runtime: "120 min",
    dustCapacity: "0.76 L",
    filtration: "99.99%",
    weight: "3.2 kg",
    noiseLevel: "65 dB",
  },
  keyFeatures: [
    {
      icon: <FiWind className="w-8 h-8" />,
      title: "240 AW Suction Power",
      description: "Most powerful cordless vacuum. Picks up dust, dirt, and debris from any surface.",
      detail: "Hyperdymium™ motor spins at 125,000rpm generating 240 air watts of suction power - 20% more than our V15 model.",
      stat: "240 AW",
      metric: "Air Watts",
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: <FiBattery className="w-8 h-8" />,
      title: "2-Hour Runtime",
      description: "Clean your entire home on a single charge with fade-free suction throughout.",
      detail: "7-cell lithium-ion battery with intelligent power management. Extends runtime by 50% in Eco mode.",
      stat: "120 min",
      metric: "Battery Life",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Laser Dust Detection",
      description: "Precisely angled laser reveals microscopic dust particles invisible to the naked eye.",
      detail: "Green diode laser positioned at 1.5° angle illuminates particles as small as 10 microns on hard floors.",
      stat: "10 μm",
      metric: "Particle Detection",
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: <FiFilter className="w-8 h-8" />,
      title: "Advanced Filtration",
      description: "Whole-machine HEPA filtration traps 99.99% of particles as small as 0.3 microns.",
      detail: "Fully-sealed 5-stage filtration system captures allergens and expels cleaner air. Ideal for allergy sufferers.",
      stat: "99.99%",
      metric: "Filtration",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop&q=80",
    },
  ],
  modes: [
    {
      name: "Eco Mode",
      power: "Low",
      runtime: "120 minutes",
      useCase: "Daily cleaning, hard floors",
      suctionPower: "80 AW",
    },
    {
      name: "Auto Mode",
      power: "Adaptive",
      runtime: "60 minutes",
      useCase: "Mixed surfaces, intelligent optimization",
      suctionPower: "120-180 AW",
    },
    {
      name: "Boost Mode",
      power: "Maximum",
      runtime: "12 minutes",
      useCase: "Deep pile carpets, stubborn dirt",
      suctionPower: "240 AW",
    },
  ],
  accessories: [
    {
      name: "Laser Slim Fluffy™ Cleaner Head",
      description: "For hard floors with laser dust detection",
      included: true,
    },
    {
      name: "Digital Motorbar™ Cleaner Head",
      description: "Deep cleans carpets, de-tangles hair automatically",
      included: true,
    },
    {
      name: "Hair Screw Tool",
      description: "Removes long hair and pet hair from upholstery",
      included: true,
    },
    {
      name: "Combination Tool",
      description: "2-in-1 dusting brush and crevice tool",
      included: true,
    },
    {
      name: "Crevice Tool",
      description: "Extended reach for tight spaces",
      included: true,
    },
    {
      name: "Wall Dock",
      description: "Charges vacuum and stores 3 accessories",
      included: true,
    },
  ],
  technicalSpecs: {
    performance: [
      { label: "Suction Power", value: "240 AW" },
      { label: "Motor Speed", value: "125,000 rpm" },
      { label: "Dust Capacity", value: "0.76 L" },
      { label: "Filtration", value: "HEPA (99.99%)" },
      { label: "Noise Level", value: "65 dB" },
    ],
    battery: [
      { label: "Battery Type", value: "7-cell Li-ion" },
      { label: "Runtime (Eco)", value: "120 minutes" },
      { label: "Runtime (Auto)", value: "60 minutes" },
      { label: "Runtime (Boost)", value: "12 minutes" },
      { label: "Charge Time", value: "4.5 hours" },
    ],
    design: [
      { label: "Weight", value: "3.2 kg (main body)" },
      { label: "Height", value: "1,256 mm" },
      { label: "Bin Type", value: "Point and shoot" },
      { label: "Display", value: "LCD screen" },
      { label: "Colors", value: "3 options" },
    ],
  },
  comparison: {
    title: "V20 Quantum vs Competition",
    products: [
      {
        name: "V20 Quantum",
        price: "$699",
        suction: "240 AW",
        runtime: "120 min",
        dustCap: "0.76 L",
        laserDetection: true,
        autoTangle: true,
        hepa: true,
        current: true,
      },
      {
        name: "Competitor X",
        price: "$649",
        suction: "200 AW",
        runtime: "90 min",
        dustCap: "0.6 L",
        laserDetection: false,
        autoTangle: true,
        hepa: true,
        current: false,
      },
      {
        name: "Competitor Y",
        price: "$599",
        suction: "185 AW",
        runtime: "100 min",
        dustCap: "0.5 L",
        laserDetection: false,
        autoTangle: false,
        hepa: false,
        current: false,
      },
    ],
  },
  awards: [
    { name: "Best Cordless Vacuum 2024", org: "Consumer Reports" },
    { name: "Editor's Choice", org: "TechGear Magazine" },
    { name: "Innovation Award", org: "CES 2024" },
  ],
};

export function VacuumProductTemplate() {
  const [selectedMode, setSelectedMode] = useState(productData.modes[1]);  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-3 sm:px-3 py-4">
          <div className="flex items-center justify-between">
<Link href="/" className="text-xl font-bold text-blue-600">
            QUANTUM
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
<a href="#features" className="text-sm hover:text-blue-600 transition-colors font-medium">Features</a>
            <a href="#specs" className="text-sm hover:text-blue-600 transition-colors font-medium">Specs</a>
            <a href="#compare" className="text-sm hover:text-blue-600 transition-colors font-medium">Compare</a>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Buy Now</Button>
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
                href="#features"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#specs"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Specs
              </a>
              <a
                href="#compare"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Compare
              </a>
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                Buy Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 pt-20 pb-32">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: Product Info */}
            <FadeIn>
              <div>
                <Badge className="mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                  New Release
                </Badge>
                <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900">
                  {productData.name}
                </h1>
                <p className="text-2xl text-muted-foreground mb-4">
                  {productData.tagline}
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  {productData.description}
                </p>

                {/* Performance Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{productData.performanceMetrics.suctionPower}</div>
                    <div className="text-xs text-muted-foreground mt-1">Suction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{productData.performanceMetrics.runtime}</div>
                    <div className="text-xs text-muted-foreground mt-1">Runtime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{productData.performanceMetrics.filtration}</div>
                    <div className="text-xs text-muted-foreground mt-1">Filtration</div>
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
                  {productData.price.currency}{productData.price.amount}
                </div>

                <div className="flex gap-4 mb-8">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="text-slate-900 dark:text-white">
                    Watch Demo
                  </Button>
                </div>

                {/* Color Selector */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="text-sm text-muted-foreground">Color:</span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {productData.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor.name === color.name
                            ? "ring-4 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900"
                            : "hover:scale-110"
                        }`}
                        style={{ backgroundColor: color.hex, borderColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right: Product Image */}
            <FadeIn delay={0.2}>
              <div className="relative">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <img
                    src={productData.hero.image}
                    alt={productData.name}
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Key Features with Stats */}
      <section id="features" className="py-32 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-3 sm:px-3">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 break-words text-gray-900">
                Engineered to Outperform
              </h2>
              <p className="text-xl text-muted-foreground max-w-full mx-auto">
                Every component optimized for maximum cleaning power and efficiency
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto space-y-24">
            {productData.keyFeatures.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                  {/* Text Content */}
                  <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-xl text-muted-foreground mb-6">{feature.description}</p>
                    <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{feature.detail}</p>

                    {/* Stat Display */}
                    <div className="inline-block p-8 bg-white dark:bg-gray-900 rounded-2xl border-2 border-blue-200 dark:border-blue-900">
                      <div className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2 break-words">{feature.stat}</div>
                      <div className="text-sm text-muted-foreground uppercase tracking-wider">{feature.metric}</div>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
                    <div className="relative aspect-square rounded-3xl overflow-hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Modes */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-3 sm:px-3">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 break-words text-gray-900">
                Three Intelligent Cleaning Modes
              </h2>
              <p className="text-xl text-muted-foreground">
                Optimized power for every cleaning task
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {productData.modes.map((mode, index) => (
              <ScrollReveal key={mode.name} delay={index * 0.1}>
                <Card
                  className={`cursor-pointer transition-all ${
                    selectedMode.name === mode.name
                      ? "ring-2 ring-blue-500 shadow-lg"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedMode(mode)}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900">{mode.name}</CardTitle>
                    <CardDescription className="text-base text-gray-900">{mode.useCase}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Power</dt>
                        <dd className="text-sm font-semibold text-gray-900">{mode.power}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Runtime</dt>
                        <dd className="text-sm font-semibold text-gray-900">{mode.runtime}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Suction</dt>
                        <dd className="text-sm font-semibold text-blue-600 dark:text-blue-400">{mode.suctionPower}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section id="specs" className="py-32 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-3 sm:px-3">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 break-words text-gray-900">
                Technical Specifications
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(productData.technicalSpecs).map(([key, specs], index) => (
              <ScrollReveal key={key} delay={index * 0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl capitalize text-gray-900">{key}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-3">
                      {specs.map((spec) => (
                        <div key={spec.label} className="flex justify-between items-start border-b border-gray-200 dark:border-gray-800 pb-2 last:border-0">
                          <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                          <dd className="text-sm font-semibold text-right text-gray-900">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-3 sm:px-3">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 break-words text-gray-900">
                Complete Cleaning System
              </h2>
              <p className="text-xl text-muted-foreground">
                6 specialized tools included for every surface
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {productData.accessories.map((accessory, index) => (
              <ScrollReveal key={accessory.name} delay={index * 0.05}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <FiCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-gray-900">{accessory.name}</h3>
                        <p className="text-sm text-muted-foreground">{accessory.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="compare" className="py-32 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-3 sm:px-3">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 break-words text-gray-900">
                {productData.comparison.title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto overflow-x-auto">
            <ScrollReveal>
              <table className="w-full border-collapse bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="text-left p-4 font-semibold">Feature</th>
                    {productData.comparison.products.map((product) => (
                      <th key={product.name} className={`p-4 text-center font-semibold ${product.current ? "text-blue-600 dark:text-blue-400" : ""}`}>
                        <div>{product.name}</div>
                        {product.current && (
                          <Badge className="mt-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                            Our Pick
                          </Badge>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 font-medium">Price</td>
                    {productData.comparison.products.map((product) => (
                      <td key={product.name} className="p-4 text-center">{product.price}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 font-medium">Suction Power</td>
                    {productData.comparison.products.map((product) => (
                      <td key={product.name} className="p-4 text-center font-semibold text-blue-600 dark:text-blue-400">{product.suction}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 font-medium">Runtime (Eco Mode)</td>
                    {productData.comparison.products.map((product) => (
                      <td key={product.name} className="p-4 text-center">{product.runtime}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 font-medium">Dust Capacity</td>
                    {productData.comparison.products.map((product) => (
                      <td key={product.name} className="p-4 text-center">{product.dustCap}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 font-medium">Laser Detection</td>
                    {productData.comparison.products.map((product) => (
                      <td key={product.name} className="p-4 text-center">
                        {product.laserDetection ? (
                          <FiCheck className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 font-medium">Auto De-Tangle</td>
                    {productData.comparison.products.map((product) => (
                      <td key={product.name} className="p-4 text-center">
                        {product.autoTangle ? (
                          <FiCheck className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">HEPA Filtration</td>
                    {productData.comparison.products.map((product) => (
                      <td key={product.name} className="p-4 text-center">
                        {product.hepa ? (
                          <FiCheck className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-3 sm:px-3">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 break-words text-gray-900">
                Award-Winning Design
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto flex flex-wrap justify-center gap-8">
            {productData.awards.map((award, index) => (
              <ScrollReveal key={award.name} delay={index * 0.1}>
                <div className="text-center">
                  <FiAward className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                  <div className="font-semibold">{award.name}</div>
                  <div className="text-sm text-muted-foreground">{award.org}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-3 sm:px-3">
          <ScrollReveal>
            <div className="text-center max-w-full mx-auto">
              <h2 className="text-5xl md:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 break-words text-gray-900">
                Ready for Quantum Clean?
              </h2>
              <p className="text-2xl mb-12 opacity-90 text-gray-900">
                Free shipping and 30-day money-back guarantee.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-12 text-gray-900">
                  Buy Now - ${productData.price.amount}
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-12 !text-white !bg-transparent border-white hover:bg-white/10">
                  Watch Video Demo
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Quantum Home. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
