"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiCheck, FiStar, FiTruck, FiShield, FiRefreshCw, FiBox } , FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const productData = {
  name: "AirWave Pro",
  tagline: "Wireless. Effortless. Perfect.",
  description: "The most comfortable headphones we've ever made. With 40-hour battery life and studio-quality sound.",
  price: {
    amount: 349,
    currency: "$",
  },
  colors: [
    { name: "Midnight Black", hex: "#1a1a1a", available: true },
    { name: "Cloud White", hex: "#f5f5f5", available: true },
    { name: "Ocean Blue", hex: "#0066cc", available: true },
    { name: "Sunset Rose", hex: "#d4a5a5", available: false },
  ],
  hero: {
    mainImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=800&fit=crop",
    productViews: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
    ],
  },
  features: [
    {
      title: "40-Hour Battery Life",
      description: "Listen all week on a single charge. Fast charging gives you 5 hours in just 10 minutes.",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop",
    },
    {
      title: "Studio-Quality Sound",
      description: "Custom-designed 40mm drivers deliver pristine highs, rich mids, and deep bass. Hear every detail.",
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=600&fit=crop",
    },
    {
      title: "Active Noise Cancellation",
      description: "Advanced ANC technology blocks out the world. Or switch to transparency mode to hear what's around you.",
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop",
    },
    {
      title: "All-Day Comfort",
      description: "Memory foam ear cushions and premium materials. So comfortable, you'll forget you're wearing them.",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=600&fit=crop",
    },
  ],
  specifications: {
    title: "Technical Specifications",
    categories: [
      {
        name: "Audio",
        specs: [
          { label: "Driver Size", value: "40mm dynamic drivers" },
          { label: "Frequency Response", value: "20Hz - 20kHz" },
          { label: "Impedance", value: "32 Ω" },
          { label: "THD", value: "<0.1%" },
        ],
      },
      {
        name: "Battery & Charging",
        specs: [
          { label: "Battery Life", value: "40 hours (ANC off) / 35 hours (ANC on)" },
          { label: "Charging Time", value: "2.5 hours (full charge)" },
          { label: "Fast Charging", value: "10 min = 5 hours playback" },
          { label: "Charging Port", value: "USB-C" },
        ],
      },
      {
        name: "Design",
        specs: [
          { label: "Weight", value: "260g" },
          { label: "Materials", value: "Aluminum frame, memory foam, vegan leather" },
          { label: "Foldable", value: "Yes, with carrying case" },
          { label: "Colors", value: "4 (Black, White, Blue, Rose)" },
        ],
      },
      {
        name: "Connectivity",
        specs: [
          { label: "Bluetooth", value: "5.3" },
          { label: "Range", value: "10m / 33ft" },
          { label: "Multi-device", value: "Connect to 2 devices simultaneously" },
          { label: "Codecs", value: "AAC, aptX HD, LDAC" },
        ],
      },
    ],
  },
  inTheBox: {
    title: "What's in the Box",
    items: [
      { name: "AirWave Pro Headphones", icon: "🎧" },
      { name: "Premium Hard-Shell Carrying Case", icon: "💼" },
      { name: "USB-C Charging Cable (1.2m)", icon: "🔌" },
      { name: "3.5mm Audio Cable (1.5m)", icon: "🎵" },
      { name: "Airplane Adapter", icon: "✈️" },
      { name: "Quick Start Guide & Warranty Card", icon: "📄" },
    ],
  },
  reviews: [
    {
      rating: 5,
      quote: "Best headphones I've ever owned. The sound quality is incredible and they're so comfortable I forget I'm wearing them.",
      author: "Alex Chen",
      verified: true,
      date: "October 15, 2024",
      withPhoto: true,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      rating: 5,
      quote: "Worth every penny. The noise cancellation is perfect for my daily commute. Battery lasts forever.",
      author: "Sarah Johnson",
      verified: true,
      date: "October 12, 2024",
      withPhoto: true,
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      rating: 5,
      quote: "I'm a music producer and these rival my studio monitors. The detail and clarity are exceptional.",
      author: "Marcus Williams",
      verified: true,
      date: "October 8, 2024",
      withPhoto: true,
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      rating: 4,
      quote: "Fantastic sound and comfort. Only complaint is I wish they came in more colors. Still highly recommend!",
      author: "Emily Rodriguez",
      verified: true,
      date: "October 3, 2024",
      withPhoto: false,
      photo: "",
    },
  ],
  comparison: {
    title: "How We Compare",
    competitors: [
      {
        brand: "AirWave Pro",
        price: 349,
        battery: "40h",
        anc: true,
        multiDevice: true,
        weight: "260g",
        warranty: "2 years",
        isOurs: true,
      },
      {
        brand: "Competitor A",
        price: 399,
        battery: "30h",
        anc: true,
        multiDevice: false,
        weight: "290g",
        warranty: "1 year",
        isOurs: false,
      },
      {
        brand: "Competitor B",
        price: 329,
        battery: "25h",
        anc: true,
        multiDevice: false,
        weight: "280g",
        warranty: "1 year",
        isOurs: false,
      },
      {
        brand: "Competitor C",
        price: 299,
        battery: "20h",
        anc: false,
        multiDevice: false,
        weight: "270g",
        warranty: "1 year",
        isOurs: false,
      },
    ],
  },
  shipping: {
    freeShipping: "Free 2-day shipping on orders over $50",
    returns: "30-day returns. No questions asked.",
    warranty: "2-year warranty included",
    inStock: true,
    deliveryTime: "2-3 business days",
  },
};

export function PhysicalProductTemplate() {
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">
            AirWave
          </Link>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors">Features</a>
            <a href="#specs" className="text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors">Specs</a>
            <Button size="sm" className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
              Buy ${productData.price.amount}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
                {productData.name}
              </h1>
              <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-8">
                {productData.tagline}
              </p>
              <p className="text-xl text-gray-500 dark:text-gray-500 mb-8">
                {productData.description}
              </p>
              <div className="text-4xl font-semibold mb-8">
                ${productData.price.amount}
              </div>

              {/* Color Selector */}
              <div className="flex justify-center gap-3 mb-8">
                {productData.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    disabled={!color.available}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? "border-black dark:border-white scale-110"
                        : "border-gray-300 dark:border-gray-700"
                    } ${!color.available ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:scale-105"}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>

              <Button size="lg" className="text-lg px-12 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                Add to Cart
              </Button>
            </div>
          </FadeIn>

          {/* Product Images */}
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src={productData.hero.productViews[selectedImage]}
                  alt="AirWave Pro"
                  className="w-full h-[600px] object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {productData.hero.productViews.map((view, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-black dark:border-white"
                        : "border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
                    }`}
                  >
                    <img
                      src={view}
                      alt={`View ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Shipping Info Banner */}
      <section className="border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <FiTruck className="w-6 h-6 mb-2" />
              <div className="font-semibold text-sm">{productData.shipping.freeShipping}</div>
            </div>
            <div className="flex flex-col items-center">
              <FiRefreshCw className="w-6 h-6 mb-2" />
              <div className="font-semibold text-sm">{productData.shipping.returns}</div>
            </div>
            <div className="flex flex-col items-center">
              <FiShield className="w-6 h-6 mb-2" />
              <div className="font-semibold text-sm">{productData.shipping.warranty}</div>
            </div>
            <div className="flex flex-col items-center">
              <FiBox className="w-6 h-6 mb-2" />
              <div className="font-semibold text-sm">In Stock - Ships in {productData.shipping.deliveryTime}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 sm:px-6 py-32">
        <div className="max-w-6xl mx-auto space-y-32">
          {productData.features.map((feature, index) => (
            <ScrollReveal key={feature.title}>
              <div className={`grid md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    {feature.title}
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full rounded-3xl"
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <section id="specs" className="container mx-auto px-4 sm:px-6 py-32 bg-gray-50 dark:bg-gray-950">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
              {productData.specifications.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {productData.specifications.categories.map((category) => (
                <Card key={category.name} className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-2xl">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.specs.map((spec) => (
                        <div key={spec.label} className="flex justify-between items-start border-b border-gray-100 dark:border-gray-900 pb-3 last:border-0">
                          <span className="text-gray-600 dark:text-gray-400 text-sm">{spec.label}</span>
                          <span className="font-medium text-sm text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* What's in the Box */}
      <section className="container mx-auto px-4 sm:px-6 py-32">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
              {productData.inTheBox.title}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {productData.inTheBox.items.map((item) => (
                <Card key={item.name} className="text-center hover:shadow-lg transition-all border-gray-200 dark:border-gray-800">
                  <CardContent className="p-8">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <p className="text-sm font-medium">{item.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Reviews */}
      <section className="container mx-auto px-4 sm:px-6 py-32 bg-gray-50 dark:bg-gray-950">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What Customers Say
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} className="w-6 h-6 fill-black dark:fill-white text-black dark:text-white" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400">4.9 out of 5 stars from 1,847 reviews</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {productData.reviews.map((review, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className="h-full border-gray-200 dark:border-gray-800">
                    <CardContent className="p-8">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <FiStar key={i} className="w-5 h-5 fill-black dark:fill-white text-black dark:text-white" />
                        ))}
                      </div>
                      <p className="text-lg mb-6">"{review.quote}"</p>
                      <div className="flex items-center gap-3">
                        {review.withPhoto && review.photo && (
                          <img
                            src={review.photo}
                            alt={review.author}
                            className="w-12 h-12 rounded-full"
                          />
                        )}
                        <div>
                          <div className="font-semibold">{review.author}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {review.verified && <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>}
                            {" "}{review.date}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 sm:px-6 py-32">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
              {productData.comparison.title}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-800">
                    <th className="text-left py-4 px-4">Brand</th>
                    <th className="text-center py-4 px-4">Price</th>
                    <th className="text-center py-4 px-4">Battery</th>
                    <th className="text-center py-4 px-4">ANC</th>
                    <th className="text-center py-4 px-4">Multi-Device</th>
                    <th className="text-center py-4 px-4">Weight</th>
                    <th className="text-center py-4 px-4">Warranty</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.comparison.competitors.map((competitor) => (
                    <tr
                      key={competitor.brand}
                      className={`border-b border-gray-100 dark:border-gray-900 ${
                        competitor.isOurs ? "bg-gray-100 dark:bg-gray-900 font-semibold" : ""
                      }`}
                    >
                      <td className="py-4 px-4">{competitor.brand}</td>
                      <td className="text-center py-4 px-4">${competitor.price}</td>
                      <td className="text-center py-4 px-4">{competitor.battery}</td>
                      <td className="text-center py-4 px-4">
                        {competitor.anc ? <FiCheck className="w-5 h-5 mx-auto" /> : "—"}
                      </td>
                      <td className="text-center py-4 px-4">
                        {competitor.multiDevice ? <FiCheck className="w-5 h-5 mx-auto" /> : "—"}
                      </td>
                      <td className="text-center py-4 px-4">{competitor.weight}</td>
                      <td className="text-center py-4 px-4">{competitor.warranty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 sm:px-6 py-32 bg-gray-50 dark:bg-gray-950">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to experience perfection?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              Free 2-day shipping. 30-day returns. 2-year warranty.
            </p>
            <Button size="lg" className="text-lg px-12 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
              Buy Now — ${productData.price.amount}
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2024 AirWave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
