"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiMail, FiHeart, FiStar, FiZap } from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "Luna Martinez",
  title: "Illustrator & Animator",
  tagline: "Bringing imagination to life, one pixel at a time ✨",
  about: "I create whimsical illustrations and animations for brands that want to stand out. My work is colorful, playful, and always tells a story. With 6+ years of experience, I've worked with startups, agencies, and indie creators to bring their visions to life.",
  stats: [
    { value: "300+", label: "Illustrations", emoji: "🎨" },
    { value: "50+", label: "Happy Clients", emoji: "💖" },
    { value: "6+", label: "Years Experience", emoji: "✨" },
  ],
  services: [
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Character Design",
      description: "Unique characters that capture personality and charm",
      color: "#FF6B9D",
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: "Brand Illustrations",
      description: "Custom artwork that makes your brand memorable",
      color: "#FFA500",
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Motion Graphics",
      description: "Animated content that engages and delights",
      color: "#C0FFEE",
    },
  ],
  projects: [
    {
      title: "Cute Coffee Shop",
      description: "Brand illustration system for artisan café",
      details: "Created a complete visual identity including menu illustrations, packaging designs, and wall murals. The playful characters became Instagram favorites.",
      color: "#FFA07A",
      emoji: "☕"
    },
    {
      title: "Kids Learning App",
      description: "Playful character designs for education",
      details: "Designed 20+ educational characters that make learning fun. Each character represents a different subject with unique personality traits.",
      color: "#98D8C8",
      emoji: "📚"
    },
    {
      title: "Startup Mascot",
      description: "Memorable mascot for tech company",
      details: "Developed a lovable tech mascot that appears across all brand touchpoints. Created expression sheets and animation guidelines.",
      color: "#AEC6CF",
      emoji: "🚀"
    },
    {
      title: "Editorial Illustrations",
      description: "Monthly magazine illustrations",
      details: "Ongoing collaboration creating illustrations for feature articles. Work has been published in major lifestyle magazines.",
      color: "#FFB6C1",
      emoji: "📰"
    },
    {
      title: "Podcast Cover Art",
      description: "Vibrant artwork for audio series",
      details: "Created eye-catching cover art and episode thumbnails for popular podcasts. Helped increase click-through rates by 40%.",
      color: "#B4A7D6",
      emoji: "🎙️"
    },
    {
      title: "Children's Book",
      description: "Full book illustration project",
      details: "Illustrated a 32-page children's book with watercolor-style digital art. Book became a bestseller in its category.",
      color: "#FFD4B2",
      emoji: "📖"
    },
  ],
  process: [
    { step: "1", title: "Concept", desc: "Understanding your vision and goals", icon: "💡" },
    { step: "2", title: "Sketch", desc: "Rough ideas and composition", icon: "✏️" },
    { step: "3", title: "Refine", desc: "Adding details and colors", icon: "🎨" },
    { step: "4", title: "Deliver", desc: "Final files in all formats", icon: "✨" },
  ],
  tools: ["Procreate", "Adobe Illustrator", "Photoshop", "After Effects", "Blender", "Framer"],
  styles: [
    { name: "Whimsical", emoji: "🌈", color: "from-pink-400 to-purple-400" },
    { name: "Minimalist", emoji: "⭐", color: "from-blue-400 to-cyan-400" },
    { name: "Retro", emoji: "🎮", color: "from-orange-400 to-yellow-400" },
    { name: "Kawaii", emoji: "🌸", color: "from-pink-300 to-red-300" },
  ],
  testimonials: [
    {
      name: "Sarah Johnson",
      role: "Brand Manager",
      quote: "Luna's illustrations brought our brand to life in ways we never imagined. The attention to detail and creativity is unmatched!",
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "Startup Founder",
      quote: "Working with Luna was a dream. She understood our vision immediately and delivered beyond expectations.",
      avatar: "MC"
    },
  ],
};

export function IllustrationFocusTemplate() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back
          </Link>
          <div className="flex items-center gap-6">
            <a href="#services" className="text-sm hover:text-primary transition-colors">
              Services
            </a>
            <a href="#work" className="text-sm hover:text-primary transition-colors">
              Work
            </a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <FadeIn>
            {/* Decorative Illustration Placeholder */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-6xl">🎨</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {portfolioData.name}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-2xl md:text-3xl text-foreground/80 mb-4">
              {portfolioData.title}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-lg text-muted-foreground mb-8">
              {portfolioData.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
              Let's Create Magic ✨
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-20">
        <ScrollReveal>
          <Card className="max-w-3xl mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur border-2 border-purple-200 dark:border-purple-800">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-center">About Me 👋</h2>
              <p className="text-lg text-center leading-relaxed text-foreground/80">
                {portfolioData.about}
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {portfolioData.stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <Card className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 border-2 border-pink-300 dark:border-pink-700 hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">{stat.emoji}</div>
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-lg text-foreground/70">{stat.label}</div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-6 py-20">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            What I Do
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portfolioData.services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-2"
                style={{ borderColor: service.color + "40" }}>
                <CardContent className="p-8 text-center">
                  <div
                    className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: service.color + "20", color: service.color }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="container mx-auto px-6 py-20">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            Recent Projects
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {portfolioData.projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur overflow-hidden group">
                <div
                  className="h-48 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: project.color }}
                >
                  {project.emoji}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <p className="text-sm leading-relaxed text-foreground/70">{project.details}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            My Creative Process
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {portfolioData.process.map((step, index) => (
            <ScrollReveal key={step.step} delay={index * 0.1}>
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-2 border-cyan-200 dark:border-cyan-800 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
                    {step.step}
                  </div>
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Art Styles Section */}
      <section className="container mx-auto px-6 py-20">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Art Styles I Love
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            From whimsical to minimalist, I adapt my style to match your brand's personality
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {portfolioData.styles.map((style, index) => (
            <ScrollReveal key={style.name} delay={index * 0.1}>
              <Card className={`bg-gradient-to-br ${style.color} border-0 hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer`}>
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">{style.emoji}</div>
                  <h3 className="text-2xl font-bold text-white">{style.name}</h3>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Tools & Software Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Tools I Use
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Professional software and tools to bring your ideas to life
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              {portfolioData.tools.map((tool) => (
                <Badge
                  key={tool}
                  className="text-lg px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-orange-400 hover:to-yellow-400 hover:text-white transition-all cursor-pointer border-2 border-orange-200 dark:border-orange-800"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-20">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Client Love
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            What people say about working with me
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {portfolioData.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 0.1}>
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-2 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed italic text-foreground/80">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-8xl">💌</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Let's Collaborate!
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Have a project in mind? I'd love to hear about it!
            </p>
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg px-8">
              <FiMail className="mr-2" />
              Say Hello
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 dark:bg-gray-900/50 backdrop-blur">
        <div className="container mx-auto px-6 py-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} {portfolioData.name}. Made with 💖
          </p>
        </div>
      </footer>
    </div>
  );
}
