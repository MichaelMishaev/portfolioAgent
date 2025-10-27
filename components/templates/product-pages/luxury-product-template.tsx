"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiAward, FiMapPin, FiCalendar, FiClock, FiZap, FiShield } from "react-icons/fi";
import Link from "next/link";

const productData = {
  name: "CHRONOS ROYAL",
  collection: "Heritage Collection 2024",
  tagline: "Where Time Becomes Art",
  description: "A masterpiece of Swiss horological excellence. Limited to 100 pieces worldwide.",
  investment: 12500,
  currency: "$",
  hero: {
    video: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dcc1697b647b13b096b4e39b6dcc&profile_id=165",
    productImages: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611987721446-c9f7c8f4a5b2?w=1200&h=800&fit=crop",
    ],
  },
  heritage: {
    title: "Four Generations of Mastery",
    story: "Since 1892, our atelier has been crafting timepieces for discerning collectors. Each Chronos Royal embodies 132 years of innovation, tradition, and uncompromising excellence.",
    timeline: [
      {
        year: "1892",
        title: "The Beginning",
        description: "François Chronos establishes the first workshop in Geneva.",
      },
      {
        year: "1924",
        title: "Royal Patronage",
        description: "Appointed Official Watchmaker to European Royal Courts.",
      },
      {
        year: "1967",
        title: "Innovation Era",
        description: "Introduction of the revolutionary perpetual calendar mechanism.",
      },
      {
        year: "2024",
        title: "Royal Collection",
        description: "The Chronos Royal debuts, limited to 100 masterpieces.",
      },
    ],
  },
  craftsmanship: {
    title: "The Art of Perfection",
    details: [
      {
        title: "200+ Hours of Handwork",
        description: "Each movement assembled, adjusted, and finished by a single master watchmaker.",
        image: "https://images.unsplash.com/photo-1606076330099-670e12d7e034?w=800&h=600&fit=crop",
      },
      {
        title: "43 Jewels, Infinite Precision",
        description: "Ruby and sapphire jewels reduce friction for a lifetime of accuracy.",
        image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&h=600&fit=crop",
      },
      {
        title: "Hand-Guilloché Dial",
        description: "Ancient guillochage technique creates mesmerizing patterns that dance with light.",
        image: "https://images.unsplash.com/photo-1611987721446-c9f7c8f4a5b2?w=800&h=600&fit=crop",
      },
    ],
  },
  configurator: {
    materials: [
      { name: "18K Rose Gold", premium: 0, available: true },
      { name: "Platinum 950", premium: 8500, available: true },
      { name: "18K White Gold", premium: 2500, available: false },
    ],
    dials: [
      { name: "Midnight Blue Guilloché", premium: 0, available: true },
      { name: "Silver Sunburst", premium: 0, available: true },
      { name: "Meteorite", premium: 5000, available: true },
    ],
    straps: [
      { name: "Hand-Stitched Alligator", premium: 0, available: true },
      { name: "Milanese Mesh", premium: 1500, available: true },
      { name: "Premium Rubber", premium: 500, available: true },
    ],
  },
  technical: {
    title: "Technical Excellence",
    specs: [
      {
        icon: FiClock,
        label: "Movement",
        value: "In-house Caliber CR-2024, Automatic",
      },
      {
        icon: FiZap,
        label: "Power Reserve",
        value: "72 hours",
      },
      {
        icon: FiShield,
        label: "Water Resistance",
        value: "100m / 330ft",
      },
      {
        icon: FiCalendar,
        label: "Complications",
        value: "Date, Moon Phase, Power Reserve Indicator",
      },
    ],
    details: [
      { label: "Case Diameter", value: "42mm" },
      { label: "Case Thickness", value: "12.5mm" },
      { label: "Crystal", value: "Sapphire (AR coated, both sides)" },
      { label: "Case Back", value: "Exhibition sapphire" },
      { label: "Jewels", value: "43 Ruby & Sapphire" },
      { label: "Frequency", value: "28,800 vph (4Hz)" },
      { label: "Accuracy", value: "-2/+4 seconds per day" },
      { label: "Finishing", value: "Geneva Stripes, Perlage, Beveling" },
    ],
  },
  awards: [
    {
      title: "Grand Prix d'Horlogerie",
      year: "2024",
      category: "Best Complication Watch",
    },
    {
      title: "WatchTime Award",
      year: "2024",
      category: "Excellence in Finishing",
    },
    {
      title: "Red Dot Design Award",
      year: "2024",
      category: "Product Design",
    },
  ],
  press: [
    {
      quote: "A triumph of mechanical artistry. The Chronos Royal sets a new benchmark.",
      source: "Horological Times",
    },
    {
      quote: "Every detail speaks of uncompromising quality and timeless elegance.",
      source: "The Watch Connoisseur",
    },
  ],
};

export function LuxuryProductTemplate() {
  const [selectedMaterial, setSelectedMaterial] = useState(productData.configurator.materials[0]);
  const [selectedDial, setSelectedDial] = useState(productData.configurator.dials[0]);
  const [selectedStrap, setSelectedStrap] = useState(productData.configurator.straps[0]);

  const totalInvestment =
    productData.investment +
    selectedMaterial.premium +
    selectedDial.premium +
    selectedStrap.premium;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-light tracking-[0.2em]">
            CHRONOS
          </Link>
          <div className="flex items-center gap-8">
            <a
              href="#heritage"
              className="text-sm tracking-wider hover:text-amber-500 transition-colors"
            >
              HERITAGE
            </a>
            <a
              href="#craftsmanship"
              className="text-sm tracking-wider hover:text-amber-500 transition-colors"
            >
              CRAFTSMANSHIP
            </a>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-black"
            >
              FIND BOUTIQUE
            </Button>
          </div>
        </div>
      </nav>

      {/* Cinematic Video Hero */}
      <section className="relative h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&h=1080&fit=crop"
          >
            <source src={productData.hero.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative h-full flex items-center justify-center text-center px-6">
          <FadeIn>
            <div className="space-y-6">
              <div className="text-sm tracking-[0.3em] text-amber-500 font-light">
                {productData.collection}
              </div>
              <h1 className="text-7xl md:text-9xl font-light tracking-tight">
                {productData.name}
              </h1>
              <p className="text-2xl md:text-3xl font-light text-neutral-400 max-w-2xl mx-auto">
                {productData.tagline}
              </p>
              <p className="text-lg text-neutral-500 max-w-xl mx-auto">{productData.description}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Heritage Story */}
      <section id="heritage" className="py-32 border-t border-neutral-800">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-24">
              <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight">
                {productData.heritage.title}
              </h2>
              <p className="text-xl text-neutral-400 leading-relaxed">
                {productData.heritage.story}
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            {productData.heritage.timeline.map((event, index) => (
              <ScrollReveal key={event.year} delay={index * 0.15}>
                <div className="grid md:grid-cols-4 gap-8 mb-16 pb-16 border-b border-neutral-800 last:border-0">
                  <div className="text-6xl font-light text-amber-500">{event.year}</div>
                  <div className="md:col-span-3">
                    <h3 className="text-3xl font-light mb-4">{event.title}</h3>
                    <p className="text-lg text-neutral-400">{event.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Details */}
      <section id="craftsmanship" className="py-32 bg-neutral-950">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-light text-center mb-24 tracking-tight">
              {productData.craftsmanship.title}
            </h2>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto space-y-32">
            {productData.craftsmanship.details.map((detail, index) => (
              <ScrollReveal key={detail.title}>
                <div
                  className={`grid md:grid-cols-2 gap-16 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <h3 className="text-4xl font-light mb-6">{detail.title}</h3>
                    <p className="text-xl text-neutral-400 leading-relaxed">{detail.description}</p>
                  </div>
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <img
                      src={detail.image}
                      alt={detail.title}
                      className="w-full rounded-lg border border-neutral-800"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Configurator */}
      <section className="py-32 border-t border-neutral-800">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-light text-center mb-24 tracking-tight">
              Create Your Masterpiece
            </h2>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Material Selection */}
            <div>
              <label className="text-sm tracking-wider text-neutral-400 mb-4 block">
                CASE MATERIAL
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {productData.configurator.materials.map((material) => (
                  <button
                    key={material.name}
                    onClick={() => material.available && setSelectedMaterial(material)}
                    disabled={!material.available}
                    className={`p-6 border-2 transition-all ${
                      selectedMaterial.name === material.name
                        ? "border-amber-500 bg-amber-500/5"
                        : "border-neutral-800 hover:border-neutral-600"
                    } ${!material.available ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="text-lg font-light mb-2">{material.name}</div>
                    {material.premium > 0 && (
                      <div className="text-sm text-amber-500">+${material.premium.toLocaleString()}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Dial Selection */}
            <div>
              <label className="text-sm tracking-wider text-neutral-400 mb-4 block">DIAL</label>
              <div className="grid md:grid-cols-3 gap-4">
                {productData.configurator.dials.map((dial) => (
                  <button
                    key={dial.name}
                    onClick={() => dial.available && setSelectedDial(dial)}
                    disabled={!dial.available}
                    className={`p-6 border-2 transition-all ${
                      selectedDial.name === dial.name
                        ? "border-amber-500 bg-amber-500/5"
                        : "border-neutral-800 hover:border-neutral-600"
                    } ${!dial.available ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="text-lg font-light mb-2">{dial.name}</div>
                    {dial.premium > 0 && (
                      <div className="text-sm text-amber-500">+${dial.premium.toLocaleString()}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Strap Selection */}
            <div>
              <label className="text-sm tracking-wider text-neutral-400 mb-4 block">STRAP</label>
              <div className="grid md:grid-cols-3 gap-4">
                {productData.configurator.straps.map((strap) => (
                  <button
                    key={strap.name}
                    onClick={() => strap.available && setSelectedStrap(strap)}
                    disabled={!strap.available}
                    className={`p-6 border-2 transition-all ${
                      selectedStrap.name === strap.name
                        ? "border-amber-500 bg-amber-500/5"
                        : "border-neutral-800 hover:border-neutral-600"
                    } ${!strap.available ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="text-lg font-light mb-2">{strap.name}</div>
                    {strap.premium > 0 && (
                      <div className="text-sm text-amber-500">+${strap.premium.toLocaleString()}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Investment Summary */}
            <div className="border-t border-neutral-800 pt-8 text-center">
              <div className="text-sm tracking-wider text-neutral-400 mb-2">YOUR INVESTMENT</div>
              <div className="text-5xl font-light mb-8">${totalInvestment.toLocaleString()}</div>
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-500 text-black text-lg px-12"
              >
                BOOK PRIVATE VIEWING
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Excellence */}
      <section className="py-32 bg-neutral-950">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-light text-center mb-24 tracking-tight">
              {productData.technical.title}
            </h2>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {productData.technical.specs.map((spec, index) => (
                <ScrollReveal key={spec.label} delay={index * 0.1}>
                  <Card className="bg-black border-neutral-800">
                    <CardContent className="p-8">
                      <spec.icon className="w-10 h-10 text-amber-500 mb-6" />
                      <div className="text-sm tracking-wider text-neutral-400 mb-2">
                        {spec.label}
                      </div>
                      <div className="text-xl font-light">{spec.value}</div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 border-t border-neutral-800 pt-12">
              {productData.technical.details.map((detail, index) => (
                <div key={index} className="flex justify-between py-3 border-b border-neutral-900">
                  <span className="text-neutral-400">{detail.label}</span>
                  <span className="font-light">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Press */}
      <section className="py-32 border-t border-neutral-800">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-5xl font-light text-center mb-24 tracking-tight">
              Recognition of Excellence
            </h2>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-24">
              {productData.awards.map((award, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className="bg-neutral-950 border-neutral-800 text-center">
                    <CardContent className="p-8">
                      <FiAward className="w-12 h-12 mx-auto mb-6 text-amber-500" />
                      <div className="text-xl font-light mb-2">{award.title}</div>
                      <div className="text-sm text-neutral-400 mb-1">{award.year}</div>
                      <div className="text-sm text-neutral-500">{award.category}</div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <div className="space-y-8">
              {productData.press.map((item, index) => (
                <ScrollReveal key={index}>
                  <blockquote className="border-l-2 border-amber-500 pl-8 py-4">
                    <p className="text-2xl font-light italic mb-4">"{item.quote}"</p>
                    <cite className="text-sm text-neutral-400 not-italic">— {item.source}</cite>
                  </blockquote>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Boutique Locator CTA */}
      <section className="py-32 bg-neutral-950">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <FiMapPin className="w-16 h-16 mx-auto mb-8 text-amber-500" />
              <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight">
                Experience Chronos Royal
              </h2>
              <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
                Visit one of our exclusive boutiques for a private viewing. Our Master Watchmakers
                will guide you through every detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-500 text-black text-lg px-12"
                >
                  FIND YOUR BOUTIQUE
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-black text-lg px-12"
                >
                  BOOK APPOINTMENT
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-light tracking-[0.2em] mb-4">CHRONOS</div>
            <p className="text-sm text-neutral-500">
              © 2024 Chronos Manufacture. Geneva, Switzerland.
            </p>
            <p className="text-xs text-neutral-600 mt-2">Est. 1892</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
