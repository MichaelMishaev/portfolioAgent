"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiMail, FiInstagram, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "Luna Martinez",
  title: "Mixed Media Artist & Designer",
  location: "Brooklyn, NY",
  bio: "I blend digital and analog, creating visual stories through collage, illustration, and experimental design. Every piece is a conversation between chaos and control.",
  stats: [
    { number: "200+", label: "Artworks", emoji: "🎨" },
    { number: "50+", label: "Exhibitions", emoji: "🖼️" },
    { number: "8+", label: "Years Creating", emoji: "✨" },
  ],
  tools: ["Photoshop", "Procreate", "Scissors & Glue", "Vintage Magazines", "Scanner", "Analog Cameras"],
  projects: [
    {
      title: "Urban Collage Series",
      tags: ["Collage", "Photography"],
      rotation: "rotate-3",
      color: "bg-orange-100",
      description: "20-piece series exploring city life through layered photography and magazine cutouts",
    },
    {
      title: "Vintage Zine Project",
      tags: ["Editorial", "Illustration"],
      rotation: "-rotate-2",
      color: "bg-pink-100",
      description: "Monthly zine celebrating analog art techniques and DIY culture",
    },
    {
      title: "Brand Identity",
      tags: ["Design", "Collage"],
      rotation: "rotate-1",
      color: "bg-blue-100",
      description: "Collage-based visual identity for indie music label",
    },
    {
      title: "Art Exhibition",
      tags: ["Mixed Media", "Art"],
      rotation: "-rotate-3",
      color: "bg-green-100",
      description: "Solo show featuring large-scale collage installations",
    },
    {
      title: "Editorial Layouts",
      tags: ["Magazine", "Layout"],
      rotation: "rotate-2",
      color: "bg-purple-100",
      description: "Magazine spreads combining traditional typography with collage elements",
    },
    {
      title: "Album Artwork",
      tags: ["Music", "Illustration"],
      rotation: "-rotate-1",
      color: "bg-yellow-100",
      description: "Cover art for indie bands blending photography and hand-drawn elements",
    },
  ],
  testimonials: [
    { name: "Alex Chen", role: "Gallery Owner", quote: "Luna's work is pure magic—chaotic yet intentional!" },
    { name: "Maria Rodriguez", role: "Creative Director", quote: "She transformed our brand identity into something unforgettable." },
  ],
  process: [
    { step: "01", title: "Collect", desc: "Gather materials, images, textures" },
    { step: "02", title: "Experiment", desc: "Play with combinations & chaos" },
    { step: "03", title: "Layer", desc: "Build up textures and depth" },
    { step: "04", title: "Refine", desc: "Find balance in the madness" },
  ],
};

export function CollageMaximalistTemplate() {
  return (
    <div className="min-h-screen bg-[#f5f3ef] relative overflow-hidden">
      {/* Background Texture */}
      <div className="fixed inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMTBoNDBNMCAzMGg0MCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b-4 border-black bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-bold hover:bg-black hover:text-white px-3 py-2 transition-colors border-2 border-black"
          >
            ← BACK
          </Link>
          <a
            href="#contact"
            className="text-sm font-bold hover:bg-black hover:text-white px-3 py-2 transition-colors border-2 border-black"
          >
            CONTACT
          </a>
        </div>
      </nav>

      {/* Hero Section - Layered Collage Style */}
      <section className="container mx-auto px-6 py-20 relative">
        <div className="max-w-6xl mx-auto relative min-h-[600px] flex items-center">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-20 w-32 h-32 bg-yellow-300 rounded-full border-4 border-black transform rotate-12 opacity-70" />
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-pink-300 border-4 border-black transform -rotate-6 opacity-60" />
          <div className="absolute top-32 left-1/2 text-6xl transform -rotate-12">★</div>
          <div className="absolute bottom-32 right-1/4 text-4xl transform rotate-45">✦</div>

          {/* Main Content */}
          <div className="relative z-10 bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <div className="bg-red-500 text-white px-4 py-1 inline-block transform -rotate-2 mb-4 border-2 border-black">
              <span className="text-sm font-bold">{portfolioData.location}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-4 leading-none">
              {portfolioData.name}
            </h1>
            <div className="h-1 w-32 bg-black mb-6" />
            <p className="text-2xl md:text-3xl font-bold mb-4">
              {portfolioData.title}
            </p>
            <p className="text-lg max-w-2xl leading-relaxed mb-8">
              {portfolioData.bio}
            </p>
            <Button className="bg-black hover:bg-gray-800 text-white font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              VIEW WORK
              <FiArrowRight className="ml-2" />
            </Button>
          </div>

          {/* Tape Decoration */}
          <div className="absolute -top-4 left-1/4 w-20 h-8 bg-yellow-200 border-2 border-black opacity-70 transform rotate-12" />
          <div className="absolute -bottom-4 right-1/3 w-24 h-8 bg-yellow-200 border-2 border-black opacity-70 transform -rotate-6" />
        </div>
      </section>

      {/* Stats Section - Chaotic Stamps */}
      <section className="container mx-auto px-6 py-16 relative">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8">
          {portfolioData.stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div
                className={`bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${
                  index % 2 === 0 ? "rotate-3" : "-rotate-2"
                }`}
              >
                <div className="text-6xl mb-2">{stat.emoji}</div>
                <div className="text-4xl font-black mb-1">{stat.number}</div>
                <p className="text-sm font-bold uppercase">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        {/* Scattered Stars */}
        <div className="absolute top-10 left-20 text-4xl transform rotate-12">★</div>
        <div className="absolute bottom-10 right-20 text-3xl transform -rotate-12">✦</div>
        <div className="absolute top-1/2 left-10 text-5xl transform rotate-45">✨</div>
      </section>

      {/* About Section - Torn Paper Effect */}
      <section className="container mx-auto px-6 py-20 relative">
        <div className="max-w-5xl mx-auto relative">
          {/* Background Chaos */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-300 border-4 border-black transform -rotate-12 opacity-40" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-300 rounded-full border-4 border-black opacity-40" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-yellow-300 border-4 border-black transform rotate-45 opacity-40" />

          <ScrollReveal>
            <div className="relative z-10 bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              <div className="bg-orange-400 text-white px-6 py-2 inline-block transform -rotate-2 mb-6 border-2 border-black font-black text-xl">
                ABOUT ME
              </div>
              <p className="text-xl leading-relaxed mb-6 font-medium">
                {portfolioData.bio}
              </p>

              {/* Decorative Line */}
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1 flex-1 bg-black" />
                <div className="text-3xl">✂️</div>
                <div className="h-1 flex-1 bg-black" />
              </div>

              <h3 className="text-2xl font-black mb-4">MY TOOLS & MATERIALS</h3>
              <div className="flex flex-wrap gap-3">
                {portfolioData.tools.map((tool, index) => (
                  <Badge
                    key={tool}
                    className={`text-base px-4 py-2 border-2 border-black font-bold ${
                      index % 5 === 0
                        ? "bg-red-300"
                        : index % 5 === 1
                        ? "bg-blue-300"
                        : index % 5 === 2
                        ? "bg-yellow-300"
                        : index % 5 === 3
                        ? "bg-green-300"
                        : "bg-pink-300"
                    } ${index % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tape Decorations */}
          <div className="absolute -top-4 left-1/4 w-24 h-10 bg-yellow-200 border-2 border-black opacity-70 transform rotate-12" />
          <div className="absolute -bottom-4 right-1/3 w-28 h-10 bg-yellow-200 border-2 border-black opacity-70 transform -rotate-6" />
        </div>
      </section>

      {/* Projects Section - Scattered Polaroid Style */}
      <section className="container mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black inline-block bg-blue-200 px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              RECENT WORK
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {portfolioData.projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <div
                className={`relative group cursor-pointer ${project.rotation}`}
              >
                {/* Polaroid Card */}
                <div className={`${project.color} border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-2 transition-all`}>
                  {/* Image Placeholder */}
                  <div className="aspect-square bg-gray-300 border-2 border-black mb-4 flex items-center justify-center text-6xl">
                    {index % 6 === 0 ? "📷" : index % 6 === 1 ? "✂️" : index % 6 === 2 ? "🎨" : index % 6 === 3 ? "📝" : index % 6 === 4 ? "🖼️" : "🎵"}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black mb-2">{project.title}</h3>

                  {/* Description */}
                  <p className="text-sm mb-3 font-medium">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-white border-2 border-black text-black font-bold"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Decorative Tape */}
                <div className="absolute -top-2 left-1/4 w-16 h-6 bg-yellow-200 border-2 border-black opacity-80 transform rotate-45" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process Section - Stamp Style */}
      <section className="container mx-auto px-6 py-20 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]" />

        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black inline-block bg-pink-300 px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
              MY PROCESS
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioData.process.map((item, index) => (
            <ScrollReveal key={item.step} delay={index * 0.1}>
              <div
                className={`bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${
                  index % 2 === 0 ? "rotate-1" : "-rotate-1"
                } hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all`}
              >
                <div className="bg-red-500 text-white w-16 h-16 rounded-full border-4 border-black flex items-center justify-center text-2xl font-black mb-4 mx-auto">
                  {item.step}
                </div>
                <h3 className="text-2xl font-black mb-2 text-center uppercase">{item.title}</h3>
                <p className="text-center font-medium">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Decorative Doodles */}
        <div className="absolute top-20 right-10 text-5xl transform rotate-12">💡</div>
        <div className="absolute bottom-20 left-10 text-5xl transform -rotate-12">🌟</div>
      </section>

      {/* Testimonials Section - Polaroid Quotes */}
      <section className="container mx-auto px-6 py-20 relative">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-yellow-200 border-4 border-black transform rotate-45 opacity-20" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-blue-200 rounded-full border-4 border-black opacity-20" />

        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black inline-block bg-green-300 px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              WHAT THEY SAY
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
          {portfolioData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 0.1}>
              <div
                className={`bg-orange-100 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                  index % 2 === 0 ? "rotate-2" : "-rotate-2"
                }`}
              >
                <div className="text-6xl mb-4">💬</div>
                <p className="text-xl font-bold mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t-2 border-black pt-4">
                  <p className="font-black text-lg">{testimonial.name}</p>
                  <p className="text-sm font-bold uppercase">{testimonial.role}</p>
                </div>
              </div>

              {/* Tape Decoration */}
              <div className="absolute -top-2 left-1/4 w-16 h-8 bg-yellow-200 border-2 border-black opacity-70 transform rotate-45" />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Hand-drawn Arrow Decoration */}
      <div className="container mx-auto px-6 py-12 text-center">
        <div className="text-8xl">↓</div>
        <p className="text-2xl font-bold mt-4 transform -rotate-2 inline-block bg-yellow-300 px-6 py-2 border-2 border-black">
          Let's collaborate!
        </p>
      </div>

      {/* Contact Section - Mixed Media Style */}
      <section id="contact" className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto relative">
          {/* Background Shapes */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-200 border-4 border-black transform rotate-12 opacity-50" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-green-200 rounded-full border-4 border-black opacity-50" />

          <div className="relative z-10 bg-white border-4 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            <div className="text-center">
              <div className="text-7xl mb-6">✉️</div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                GET IN TOUCH
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Available for commissions, collaborations, and creative projects that push boundaries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button className="bg-black hover:bg-gray-800 text-white font-bold text-lg px-8 py-6 h-auto border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <FiMail className="mr-2 w-5 h-5" />
                  luna@collagelab.art
                </Button>
                <Button
                  variant="outline"
                  className="font-bold text-lg px-8 py-6 h-auto border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <FiInstagram className="mr-2 w-5 h-5" />
                  @luna.collage
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative Stickers */}
          <div className="absolute top-0 left-0 transform -translate-x-8 -translate-y-8 text-6xl rotate-12">
            ⭐
          </div>
          <div className="absolute bottom-0 right-0 transform translate-x-8 translate-y-8 text-6xl -rotate-12">
            ✨
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-white py-8">
        <div className="container mx-auto px-6">
          <p className="text-center font-bold text-sm">
            © {new Date().getFullYear()} {portfolioData.name} // HANDCRAFTED WITH LOVE
          </p>
        </div>
      </footer>
    </div>
  );
}
