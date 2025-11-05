"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiCheck, FiStar, FiZap, FiCpu, FiActivity, FiTrendingUp ,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

const productData = {
  name: "HYPERX CLOUD ULTRA",
  tagline: "DOMINATE THE COMPETITION",
  description: "Next-gen gaming headset with spatial audio, ultra-low latency, and pro-grade comfort.",
  price: 199,
  inStock: true,
  hero: {
    video: "https://videos.pexels.com/video-files/8065268/8065268-uhd_2560_1440_25fps.mp4",
    images: [
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop",
    ],
  },
  keyFeatures: [
    { icon: <FiZap />, title: "7.1 SURROUND SOUND", description: "Pinpoint enemy locations with precision audio" },
    { icon: <FiCpu />, title: "5MS RESPONSE TIME", description: "Ultra-low latency for competitive edge" },
    { icon: <FiActivity />, title: "50-HOUR BATTERY", description: "Marathon gaming sessions without interruption" },
    { icon: <FiTrendingUp />, title: "PRO-TUNED EQ", description: "Optimized for FPS, MOBA, and Battle Royale" },
  ],
  specs: {
    audio: [
      { label: "Driver Type", value: "50mm Neodymium" },
      { label: "Frequency Response", value: "15Hz - 28kHz" },
      { label: "Impedance", value: "32 Ω" },
      { label: "Sensitivity", value: "98 dB SPL @ 1kHz" },
      { label: "Surround Sound", value: "7.1 Virtual Surround" },
    ],
    connectivity: [
      { label: "Connection", value: "2.4GHz Wireless + USB-C" },
      { label: "Latency", value: "<5ms" },
      { label: "Range", value: "15m / 50ft" },
      { label: "Battery Life", value: "50 hours" },
      { label: "Charge Time", value: "2 hours (full)" },
    ],
    design: [
      { label: "Weight", value: "285g" },
      { label: "Ear Cushions", value: "Memory foam with cooling gel" },
      { label: "Headband", value: "Steel-reinforced adjustable" },
      { label: "Microphone", value: "Detachable noise-canceling boom" },
      { label: "RGB Lighting", value: "Customizable 16.8M colors" },
    ],
    compatibility: [
      { label: "PC", value: "Windows 10/11" },
      { label: "Console", value: "PS5, Xbox Series X/S" },
      { label: "Mobile", value: "USB-C compatible devices" },
      { label: "Software", value: "HyperX NGENUITY" },
    ],
  },
  configuration: {
    colors: [
      { name: "Midnight Black", hex: "#0A0A0A", available: true },
      { name: "Crimson Red", hex: "#DC143C", available: true },
      { name: "Arctic White", hex: "#F5F5F5", available: true },
      { name: "Neon Green", hex: "#39FF14", available: false },
    ],
  },
  comparison: [
    { feature: "Price", us: "$199", competitor1: "$249", competitor2: "$179", winner: "us" },
    { feature: "Battery Life", us: "50h", competitor1: "40h", competitor2: "30h", winner: "us" },
    { feature: "Latency", us: "<5ms", competitor1: "7ms", competitor2: "10ms", winner: "us" },
    { feature: "Surround Sound", us: "7.1", competitor1: "7.1", competitor2: "Stereo", winner: "us" },
    { feature: "Weight", us: "285g", competitor1: "320g", competitor2: "275g", winner: "competitor2" },
  ],
  reviews: [
    { author: "IGN", rating: 9.5, quote: "Best gaming headset under $200. The audio clarity is phenomenal." },
    { author: "PC Gamer", rating: 9, quote: "Crushes the competition in battery life and comfort." },
    { author: "The Verge", rating: 8.5, quote: "A must-have for serious gamers. The low latency is a game-changer." },
  ],
  userReviews: {
    average: 4.8,
    total: 2847,
    breakdown: [
      { stars: 5, count: 2104 },
      { stars: 4, count: 542 },
      { stars: 3, count: 143 },
      { stars: 2, count: 38 },
      { stars: 1, count: 20 },
    ],
  },
};

export function TechProductTemplate() {
  const [selectedColor, setSelectedColor] = useState(productData.configuration.colors[0]);  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [showVideo, setShowVideo] = useState(true);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-yellow-500/20">
        <div className="container mx-auto px-3 sm:px-3 py-4">
          <div className="flex items-center justify-between">
<Link href="/" className="text-xl font-bold text-yellow-400">
            HYPERX
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
<a href="#specs" className="text-sm hover:text-yellow-400 transition-colors uppercase tracking-wider">Specs</a>
            <a href="#reviews" className="text-sm hover:text-yellow-400 transition-colors uppercase tracking-wider">Reviews</a>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold">
              ADD TO CART - ${productData.price}
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
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t">
            <div className="container mx-auto px-3 sm:px-3 py-4 flex flex-col gap-4">
              <a
                href="#specs"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Specs
              </a>
              <a
                href="#reviews"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </a>
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                
              ADD TO CART - ${productData.price}
            
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-3 sm:px-3 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Viewer */}
          <div>
            <FadeIn>
              {showVideo ? (
                <div className="relative rounded-xl overflow-hidden mb-4 bg-gray-900 aspect-square">
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  >
                    <source src={productData.hero.video} type="video/mp4" />
                  </video>
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute bottom-4 right-4 px-3 py-2 bg-black/70 hover:bg-black text-sm rounded"
                  >
                    View Images
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative rounded-xl overflow-hidden mb-4 bg-gray-900 aspect-square">
                    <img
                      src={productData.hero.images[selectedImage]}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    {productData.hero.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === idx ? "border-yellow-400" : "border-gray-800 hover:border-gray-600"
                        }`}
                      >
                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </FadeIn>
          </div>

          {/* Right: Product Info */}
          <div>
            <FadeIn delay={0.2}>
              <Badge className="mb-4 bg-yellow-400 text-black font-bold">IN STOCK</Badge>
              <h1 className="text-5xl md: text-4xl sm:text-5xl md:text-6xl  font-black mb-4 tracking-tight uppercase break-words">
                {productData.name}
              </h1>
              <p className="text-2xl text-yellow-400 font-bold mb-4 uppercase tracking-widest">
                {productData.tagline}
              </p>
              <p className="text-lg text-gray-400 mb-8">
                {productData.description}
              </p>

              <div className="text-3xl sm:text-4xl  font-black mb-8">
                <span className="text-yellow-400">${productData.price}</span>
              </div>

              {/* Color Selector */}
              <div className="mb-8">
                <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">COLOR</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {productData.configuration.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      disabled={!color.available}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? "border-yellow-400 scale-110"
                          : "border-gray-700"
                      } ${!color.available ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:scale-105"}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <Button size="lg" className="w-full mb-4 bg-yellow-400 text-black hover:bg-yellow-300 font-bold text-lg py-6">
                ADD TO CART - ${productData.price}
              </Button>
              <Button size="lg" variant="outline" className="w-full border-yellow-400 !text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold">
                ADD TO WISHLIST
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Key Features Bento Grid */}
      <section className="container mx-auto px-3 sm:px-3 py-16 border-t border-yellow-500/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {productData.keyFeatures.map((feature, idx) => (
            <ScrollReveal key={feature.title} delay={idx * 0.1}>
              <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-400/40 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black text-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-yellow-400">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Tech Specs */}
      <section id="specs" className="container mx-auto px-3 sm:px-3 py-16 border-t border-yellow-500/20">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl  font-black uppercase text-center mb-12 tracking-tight">
            TECHNICAL <span className="text-yellow-400">SPECIFICATIONS</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full mx-auto">
          {Object.entries(productData.specs).map(([category, specs]) => (
            <ScrollReveal key={category}>
              <Card className="bg-gray-900 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="uppercase tracking-wider text-yellow-400">
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span className="text-sm text-gray-400 uppercase tracking-wide">{spec.label}</span>
                        <span className="text-sm font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-3 sm:px-3 py-16 border-t border-yellow-500/20">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl  font-black uppercase text-center mb-12 tracking-tight">
            HOW WE <span className="text-yellow-400">COMPARE</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-full mx-auto overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-yellow-500">
                <th className="text-left py-4 px-3 uppercase text-sm tracking-wider">Feature</th>
                <th className="text-center py-4 px-3 uppercase text-sm tracking-wider bg-yellow-400/10">HyperX Ultra</th>
                <th className="text-center py-4 px-3 uppercase text-sm tracking-wider">Competitor A</th>
                <th className="text-center py-4 px-3 uppercase text-sm tracking-wider">Competitor B</th>
              </tr>
            </thead>
            <tbody>
              {productData.comparison.map((row) => (
                <tr key={row.feature} className="border-b border-gray-800">
                  <td className="py-4 px-3 font-semibold">{row.feature}</td>
                  <td className={`text-center py-4 px-3 ${row.winner === "us" ? "text-yellow-400 font-bold" : ""}`}>
                    {row.us} {row.winner === "us" && "✓"}
                  </td>
                  <td className={`text-center py-4 px-3 ${row.winner === "competitor1" ? "text-yellow-400 font-bold" : "text-gray-400"}`}>
                    {row.competitor1} {row.winner === "competitor1" && "✓"}
                  </td>
                  <td className={`text-center py-4 px-3 ${row.winner === "competitor2" ? "text-yellow-400 font-bold" : "text-gray-400"}`}>
                    {row.competitor2} {row.winner === "competitor2" && "✓"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="container mx-auto px-3 sm:px-3 py-16 border-t border-yellow-500/20">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl  font-black uppercase text-center mb-4 tracking-tight">
            WHAT <span className="text-yellow-400">PROS SAY</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-12">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-yellow-400">{productData.userReviews.average}</span>
            <span className="text-gray-400">/ 5 ({productData.userReviews.total.toLocaleString()} reviews)</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full mx-auto">
          {productData.reviews.map((review, idx) => (
            <ScrollReveal key={review.author} delay={idx * 0.1}>
              <Card className="bg-gray-900 border-yellow-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-yellow-400 uppercase">{review.author}</span>
                    <Badge className="bg-yellow-400 text-black font-bold">{review.rating}/10</Badge>
                  </div>
                  <p className="text-gray-300">"{review.quote}"</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-3 sm:px-3 py-16 border-t border-yellow-500/20">
        <ScrollReveal>
          <Card className="max-w-full mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 border-0">
            <CardContent className="p-12 text-center text-black">
              <h2 className="text-3xl sm:text-5xl   font-black uppercase mb-4 tracking-tight break-words">
                READY TO DOMINATE?
              </h2>
              <p className="text-xl mb-8 font-semibold">
                Free shipping • 2-year warranty • 30-day returns
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-12 py-6 bg-black !text-yellow-400 hover:bg-gray-900 font-bold">
                ADD TO CART - ${productData.price}
              </Button>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-yellow-500/20 py-12">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="text-center text-sm text-gray-400">
            <p>© 2024 HyperX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
