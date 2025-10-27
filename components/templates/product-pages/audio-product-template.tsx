"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiCheck, FiMusic, FiHeadphones, FiZap, FiSettings, FiTrendingUp, FiRadio, FiCpu } from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";

const productData = {
  name: "Aurora Pro Headphones",
  tagline: "Experience sound. Reimagined.",
  description: "Studio-quality audio with adaptive noise cancellation and spatial audio technology.",
  price: {
    amount: 549,
    currency: "$",
  },
  colors: [
    { name: "Space Gray", hex: "#52525b", available: true },
    { name: "Silver", hex: "#d4d4d8", available: true },
    { name: "Sky Blue", hex: "#7dd3fc", available: true },
    { name: "Pink", hex: "#f9a8d4", available: true },
    { name: "Green", hex: "#86efac", available: true },
  ],
  hero: {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=800&fit=crop&q=80",
    video: "https://player.vimeo.com/external/example.mp4",
  },
  features: [
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: "Adaptive Noise Cancellation",
      description: "Industry-leading ANC with computational audio that adapts to your environment in real-time.",
      detail: "Uses 8 microphones and advanced algorithms to cancel noise up to 40dB. Transparency mode lets you hear what's around you with crystal clarity.",
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: <FiMusic className="w-8 h-8" />,
      title: "Spatial Audio with Head Tracking",
      description: "Immersive 3D audio that follows your head movements for a theater-like experience.",
      detail: "Powered by custom-designed 50mm drivers and gyroscopes that track your head position, creating a fixed sound stage in space.",
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "20-Hour Battery Life",
      description: "All-day listening with ANC on. 5 minutes of charging gives 3 hours of playback.",
      detail: "USB-C fast charging. Smart battery management learns your usage patterns to maximize longevity.",
      image: "https://images.unsplash.com/photo-1590658165737-15a047b7a1c4?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: <FiCpu className="w-8 h-8" />,
      title: "H2 Custom Chip",
      description: "Purpose-built chip delivering computational audio and ultra-low latency.",
      detail: "10 audio cores process 9 billion operations per second for lossless audio quality.",
      image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=600&fit=crop&q=80",
    },
  ],
  specs: {
    audio: {
      title: "Audio",
      items: [
        { label: "Driver Size", value: "50mm dynamic" },
        { label: "Frequency Response", value: "10Hz – 40kHz" },
        { label: "Impedance", value: "36 ohms" },
        { label: "THD", value: "< 0.1%" },
        { label: "Codecs", value: "AAC, LDAC, aptX HD" },
      ],
    },
    design: {
      title: "Design",
      items: [
        { label: "Weight", value: "385g" },
        { label: "Materials", value: "Aluminum, memory foam" },
        { label: "Colors", value: "5 finishes" },
        { label: "Foldable", value: "Yes, with case" },
      ],
    },
    connectivity: {
      title: "Connectivity",
      items: [
        { label: "Bluetooth", value: "5.3 with multipoint" },
        { label: "Range", value: "Up to 50m" },
        { label: "3.5mm Jack", value: "Included cable" },
        { label: "USB-C", value: "Audio + charging" },
      ],
    },
    battery: {
      title: "Battery & Charging",
      items: [
        { label: "Battery Life (ANC on)", value: "20 hours" },
        { label: "Battery Life (ANC off)", value: "30 hours" },
        { label: "Charging Time", value: "2 hours (full)" },
        { label: "Fast Charge", value: "5 min = 3 hours" },
      ],
    },
  },
  comparison: {
    title: "How Aurora Pro Compares",
    products: [
      {
        name: "Aurora Pro",
        price: "$549",
        anc: "40dB",
        battery: "20h",
        spatialAudio: true,
        weight: "385g",
        codecs: "AAC, LDAC, aptX HD",
        current: true,
      },
      {
        name: "Competitor A",
        price: "$399",
        anc: "30dB",
        battery: "18h",
        spatialAudio: true,
        weight: "410g",
        codecs: "AAC, SBC",
        current: false,
      },
      {
        name: "Competitor B",
        price: "$449",
        anc: "35dB",
        battery: "22h",
        spatialAudio: false,
        weight: "395g",
        codecs: "AAC, LDAC",
        current: false,
      },
    ],
  },
  inTheBox: [
    "Aurora Pro Headphones",
    "Premium carrying case",
    "USB-C charging cable (1m)",
    "3.5mm audio cable (1.2m)",
    "Airplane adapter",
    "Quick start guide",
    "Warranty card",
  ],
  reviews: [
    {
      author: "Sound & Vision Magazine",
      rating: 5,
      excerpt: "The Aurora Pro delivers audiophile-grade sound quality with the best ANC we've ever tested.",
      logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=150&h=50&fit=crop&q=80",
    },
    {
      author: "TechRadar",
      rating: 5,
      excerpt: "These headphones redefine what wireless audio can be. A masterclass in engineering.",
      logo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=150&h=50&fit=crop&q=80",
    },
    {
      author: "What Hi-Fi?",
      rating: 5,
      excerpt: "Exceptional across the board. The spatial audio feature is truly immersive.",
      logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=50&fit=crop&q=80",
    },
  ],
  featureImages: [
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=600&fit=crop&q=80",
  ],
};

export function AudioProductTemplate() {
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            AURORA
          </Link>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-blue-600 transition-colors font-medium">Features</a>
            <a href="#specs" className="text-sm hover:text-blue-600 transition-colors font-medium">Specs</a>
            <a href="#compare" className="text-sm hover:text-blue-600 transition-colors font-medium">Compare</a>
            <Button size="sm">Buy Now</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                New
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
                {productData.name}
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground mb-4 font-light">
                {productData.tagline}
              </p>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                {productData.description}
              </p>
              <div className="text-4xl font-semibold mb-8">
                {productData.price.currency}{productData.price.amount}
              </div>
            </div>
          </FadeIn>

          {/* Product Image */}
          <FadeIn delay={0.2}>
            <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[600px] flex items-center justify-center"
              >
                <img
                  src={productData.hero.image}
                  alt={productData.name}
                  className="h-full object-contain"
                  style={{ filter: `hue-rotate(${productData.colors.findIndex(c => c.name === selectedColor.name) * 40}deg)` }}
                />
              </motion.div>
            </div>
          </FadeIn>

          {/* Color Selector */}
          <FadeIn delay={0.3}>
            <div className="flex flex-col items-center gap-6 mb-12">
              <div className="flex gap-3">
                {productData.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative w-12 h-12 rounded-full transition-all ${
                      selectedColor.name === color.name ? "ring-4 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900" : "hover:scale-110"
                    }`}
                    title={color.name}
                  >
                    <div
                      className="w-full h-full rounded-full border-2 border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{selectedColor.name}</p>
            </div>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-12">
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-12">
                Try in Store
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Engineered for Excellence
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every detail refined. Every component optimized. Experience audio engineering at its finest.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto space-y-32">
            {productData.features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <div className={`grid md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                  <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-xl text-muted-foreground mb-4">{feature.description}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.detail}</p>
                  </div>
                  <div className={index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
                    <div className="relative rounded-3xl overflow-hidden h-[400px]">
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

      {/* Technical Specifications */}
      <section id="specs" className="py-32 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Technical Specifications
              </h2>
              <p className="text-xl text-muted-foreground">
                Precision engineering down to the last detail
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {Object.values(productData.specs).map((category, index) => (
              <ScrollReveal key={category.title} delay={index * 0.1}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      {category.items.map((spec) => (
                        <div key={spec.label} className="flex justify-between items-start border-b border-gray-200 dark:border-gray-800 pb-3 last:border-0">
                          <dt className="text-sm text-muted-foreground font-medium">{spec.label}</dt>
                          <dd className="text-sm font-semibold text-right">{spec.value}</dd>
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

      {/* Comparison Table */}
      <section id="compare" className="py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                {productData.comparison.title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <ScrollReveal>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300 dark:border-gray-700">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    {productData.comparison.products.map((product) => (
                      <th key={product.name} className={`p-4 text-center font-semibold ${product.current ? "text-blue-600 dark:text-blue-400" : ""}`}>
                        {product.name}
                        {product.current && (
                          <Badge className="ml-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                            New
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
                    <td className="p-4 font-medium">ANC Performance</td>
                    {productData.comparison.products.map((product) => (
                      <td key={product.name} className="p-4 text-center font-semibold">{product.anc}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 font-medium">Battery Life</td>
                    {productData.comparison.products.map((product) => (
                      <td key={product.name} className="p-4 text-center">{product.battery}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 font-medium">Spatial Audio</td>
                    {productData.comparison.products.map((product) => (
                      <td key={product.name} className="p-4 text-center">
                        {product.spatialAudio ? (
                          <FiCheck className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 font-medium">Weight</td>
                    {productData.comparison.products.map((product) => (
                      <td key={product.name} className="p-4 text-center">{product.weight}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Codecs</td>
                    {productData.comparison.products.map((product) => (
                      <td key={product.name} className="p-4 text-center text-sm">{product.codecs}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-32 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                What Experts Say
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {productData.reviews.map((review, index) => (
              <ScrollReveal key={review.author} delay={index * 0.1}>
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="mb-4 h-12 flex items-center">
                      <img src={review.logo} alt={review.author} className="h-8 opacity-60" />
                    </div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed mb-4 italic">"{review.excerpt}"</p>
                    <p className="text-sm text-muted-foreground font-semibold">— {review.author}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* In the Box */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  In the Box
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <Card>
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    {productData.inTheBox.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <FiCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Ready to Experience Aurora?
              </h2>
              <p className="text-2xl mb-12 opacity-90">
                Order now and get free 2-day shipping.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-12">
                  Buy Now - ${productData.price.amount}
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-12 text-white border-white hover:bg-white/10">
                  Find a Store
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Aurora Audio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
