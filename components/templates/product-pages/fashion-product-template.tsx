"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiCheck, FiHeart, FiTruck, FiRefreshCw, FiPackage, FiFeather ,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useI18n } from "@/lib/i18n-context";

const productData = {
  name: "URBAN STRIDE SNEAKERS",
  tagline: "Sustainable. Comfortable. Timeless.",
  description: "Handcrafted from recycled materials. Walk lighter on the planet without compromising on style.",
  price: {
    amount: 129,
    currency: "$",
  },
  colors: [
    { name: "Cloud White", hex: "#FAFAF9", available: true },
    { name: "Sage Green", hex: "#A5B4A0", available: true },
    { name: "Sand Beige", hex: "#D4A574", available: true },
  ],
  sizes: [
    { size: "US 7", eu: "EU 38", available: true },
    { size: "US 8", eu: "EU 39", available: true },
    { size: "US 9", eu: "EU 40", available: true },
    { size: "US 10", eu: "EU 41", available: true },
    { size: "US 11", eu: "EU 42", available: false },
    { size: "US 12", eu: "EU 43", available: true },
  ],
  hero: {
    mainImage: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&h=1400&fit=crop",
    lifestyleImages: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=1000&fit=crop",
    ],
  },
  sustainability: {
    title: "Walk Lighter on the Planet",
    features: [
      {
        icon: FiFeather,
        title: "100% Recycled Materials",
        description: "Upper made from 12 recycled plastic bottles. Sole from recycled rubber.",
      },
      {
        icon: FiPackage,
        title: "Carbon Neutral Shipping",
        description: "Every shipment is carbon offset. Recyclable packaging only.",
      },
      {
        icon: FiRefreshCw,
        title: "Circular Design",
        description: "Designed to be repaired, not replaced. Free repair service for life.",
      },
    ],
  },
  features: [
    {
      title: "All-Day Comfort",
      description: "Cushioned insoles and breathable materials keep your feet happy from morning to night.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
    },
    {
      title: "Timeless Design",
      description: "Classic silhouette that works with everything. From coffee runs to city explorations.",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop",
    },
    {
      title: "Built to Last",
      description: "Premium construction and quality materials. These aren't throwaway shoes.",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop",
    },
  ],
  customerPhotos: [
    {
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
      author: "@sarahstyle",
      location: "Brooklyn, NY",
    },
    {
      image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=400&h=500&fit=crop",
      author: "@alex_urban",
      location: "Portland, OR",
    },
    {
      image: "https://images.unsplash.com/photo-1467632499275-7a693a761056?w=400&h=500&fit=crop",
      author: "@miavibe",
      location: "Austin, TX",
    },
    {
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=500&fit=crop",
      author: "@jakewalks",
      location: "Seattle, WA",
    },
  ],
  productDetails: {
    materials: [
      "Upper: 100% recycled PET plastic",
      "Lining: Organic cotton",
      "Insole: Cork and recycled foam",
      "Outsole: Recycled rubber",
      "Laces: Organic cotton",
    ],
    care: [
      "Wipe clean with damp cloth",
      "Air dry only - do not machine wash",
      "Use shoe trees to maintain shape",
      "Apply water-resistant spray for protection",
    ],
  },
  reviews: [
    {
      rating: 5,
      quote: "Most comfortable shoes I own. Love that they're sustainable too!",
      author: "Emma L.",
      verified: true,
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      rating: 5,
      quote: "Perfect everyday sneaker. Goes with everything in my wardrobe.",
      author: "Marcus J.",
      verified: true,
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      rating: 4,
      quote: "Great quality and style. Sizing runs slightly small, order half size up.",
      author: "Sofia R.",
      verified: true,
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
  ],
  completeTheLook: [
    {
      name: "Organic Cotton Crew Socks",
      price: 16,
      image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop",
    },
    {
      name: "Recycled Canvas Backpack",
      price: 89,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    },
    {
      name: "Bamboo Sunglasses",
      price: 45,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
    },
  ],
  shipping: {
    freeShipping: "Free shipping on orders over $75",
    returns: "30-day free returns",
    warranty: "Lifetime repair service",
  },
};

export function FashionProductTemplate() {
  const { tt } = useI18n();
  const data = tt?.productFashion;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[2]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-stone-50 text-stone-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="container mx-auto px-3 sm:px-3 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-medium tracking-wide text-gray-900">
            URBAN STRIDE
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-stone-600 transition-colors">
              Features
            </a>
            <a href="#sustainability" className="text-sm hover:text-stone-600 transition-colors">
              Sustainability
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={isWishlisted ? "text-red-500" : ""}
            >
              <FiHeart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
          </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 text-foreground hover:bg-accent rounded-md border border-border transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-t">
            <div className="container mx-auto px-3 sm:px-3 py-4 flex flex-col gap-4">
              <a
                href="#features"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#sustainability"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sustainability
              </a>
              <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Vertical Scrolling Gallery */}
      <section className="container mx-auto px-3 sm:px-3 pt-12 pb-8">
        <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Image Gallery */}
          <div className="space-y-4">
            <FadeIn>
              <img
                src={productData.hero.mainImage}
                alt="Urban Stride Sneakers"
                className="w-full rounded-2xl"
              />
            </FadeIn>
            {productData.hero.lifestyleImages.map((image, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <img src={image} alt={`Lifestyle ${index + 1}`} className="w-full rounded-2xl" />
              </ScrollReveal>
            ))}
          </div>

          {/* Right - Product Info (Sticky) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <FadeIn>
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-stone-900 text-stone-50">
                  Sustainable Choice
                </Badge>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight break-words text-gray-900">
                  {productData.name}
                </h1>
                <p className="text-xl text-stone-600">{productData.tagline}</p>
                <p className="text-lg text-stone-700">{productData.description}</p>

                <div className="text-3xl font-semibold text-stone-900">
                  ${productData.price.amount}
                </div>

                {/* Color Selector */}
                <div>
                  <label className="text-sm font-medium mb-3 block text-gray-900">
                    Color: {selectedColor.name}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {productData.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-14 h-14 rounded-full border-2 transition-all ${
                          selectedColor.name === color.name
                            ? "border-stone-900 scale-110"
                            : "border-stone-300"
                        } hover:scale-105`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <label className="text-sm font-medium mb-3 block text-gray-900">
                    Size: {selectedSize.size}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {productData.sizes.map((size) => (
                      <button
                        key={size.size}
                        onClick={() => size.available && setSelectedSize(size)}
                        disabled={!size.available}
                        className={`py-3 px-3 border-2 rounded-lg text-sm transition-all ${
                          selectedSize.size === size.size
                            ? "border-stone-900 bg-stone-900 text-stone-50"
                            : "border-stone-300 hover:border-stone-500"
                        } ${!size.available ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <div className="font-medium">{size.size}</div>
                        <div className="text-xs opacity-70">{size.eu}</div>
                      </button>
                    ))}
                  </div>
                  <a href="#size-guide" className="text-sm text-stone-600 underline mt-2 block">
                    Size Guide
                  </a>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    size="lg"
                    className="w-full text-lg py-6 bg-stone-900 hover:bg-stone-800 text-stone-50"
                  >
                    ADD TO BAG
                  </Button>
                  <Button
                    variant="outline" className={darkMode ? 'text-white' : 'text-slate-900'}
                    size="lg"
                    className="w-full text-lg py-6 border-stone-300 text-gray-900"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <FiHeart
                      className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current text-red-500" : ""}`}
                    />
                    {isWishlisted ? "SAVED" : "ADD TO WISHLIST"}
                  </Button>
                </div>

                {/* Shipping Info */}
                <div className="border-t border-stone-200 pt-6 space-y-3 text-sm text-gray-900">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <FiTruck className="w-5 h-5 text-stone-600" />
                    <span>{productData.shipping.freeShipping}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <FiRefreshCw className="w-5 h-5 text-stone-600" />
                    <span>{productData.shipping.returns}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <FiFeather className="w-5 h-5 text-stone-600" />
                    <span>{productData.shipping.warranty}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="bg-stone-100 py-24">
        <div className="container mx-auto px-3 sm:px-3">
          <ScrollReveal>
            <div className="max-w-full mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 break-words text-gray-900">
                {productData.sustainability.title}
              </h2>
              <p className="text-xl text-stone-600">
                Every pair makes a difference. Here's how we're building a better future.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {productData.sustainability.features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <Card className="bg-white border-stone-200 h-full">
                  <CardContent className="p-8 text-center">
                    <feature.icon className="w-12 h-12 mx-auto mb-6 text-stone-700" />
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-stone-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="max-w-full mx-auto space-y-24">
            {productData.features.map((feature, index) => (
              <ScrollReveal key={feature.title}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <h3 className="text-3xl md:text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-lg text-stone-600">{feature.description}</p>
                  </div>
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <img src={feature.image} alt={feature.title} className="w-full rounded-2xl" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Photos */}
      <section className="bg-stone-900 text-stone-50 py-24">
        <div className="container mx-auto px-3 sm:px-3">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-4 break-words text-gray-900">
              #UrbanStrideStyle
            </h2>
            <p className="text-center text-stone-400 mb-16">
              Real people, real style. Tag us to be featured.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {productData.customerPhotos.map((photo, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={photo.image}
                    alt={photo.author}
                    className="w-full aspect-[4/5] object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-white">
                      <div className="font-medium">{photo.author}</div>
                      <div className="text-sm text-stone-300">{photo.location}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-24">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Materials</h3>
                <ul className="space-y-3">
                  {productData.productDetails.materials.map((material, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheck className="w-5 h-5 text-stone-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-stone-700">{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Care Instructions</h3>
                <ul className="space-y-3">
                  {productData.productDetails.care.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheck className="w-5 h-5 text-stone-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-stone-700">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-stone-100 py-24">
        <div className="container mx-auto px-3 sm:px-3">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-900">What Our Community Says</h2>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {productData.reviews.map((review, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="bg-white border-stone-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={review.photo}
                        alt={review.author}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-semibold">{review.author}</div>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs text-gray-900">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-stone-700">"{review.quote}"</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Complete the Look */}
      <section className="py-24">
        <div className="container mx-auto px-3 sm:px-3">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-900">Complete the Look</h2>
          </ScrollReveal>

          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {productData.completeTheLook.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="border-stone-200 overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform"
                  />
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 text-stone-900 text-gray-900">{item.name}</h3>
                    <div className="text-lg font-semibold text-gray-900">${item.price}</div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 bg-white">
        <div className="container mx-auto px-3 sm:px-3">
          <div className="text-center text-sm text-stone-600">
            <p>© 2024 Urban Stride. Designed with care for people and planet.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
