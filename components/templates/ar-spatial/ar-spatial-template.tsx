"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FiLayers,
  FiBox,
  FiEye,
  FiZap,
  FiMail,
  FiGithub,
  FiMaximize,
  FiMove,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "Spatial Vision",
  title: "AR/VR Experience Designer",
  tagline: "Crafting the future of spatial computing",
  about: "As a pioneering AR/VR experience designer with 6+ years pushing the boundaries of spatial computing, I create immersive digital experiences that blur the line between physical and virtual worlds. Specialized in Apple Vision Pro, Meta Quest, and WebXR platforms.",
  email: "spatial@vision.ar",
  stats: [
    { label: "AR/VR Projects", value: "80+" },
    { label: "Platform Reach", value: "5M+" },
    { label: "Awards Won", value: "12" },
    { label: "Innovation Rate", value: "98%" },
  ],
  skills: [
    "Unity & Unreal Engine",
    "ARKit & ARCore",
    "WebXR & Three.js",
    "Spatial UI/UX",
    "Hand Tracking",
    "Eye Tracking",
    "6DOF Interaction",
    "Spatial Audio",
    "Computer Vision",
    "3D Modeling",
    "Gesture Recognition",
    "Mixed Reality",
  ],
  experiences: [
    {
      title: "Mixed Reality Shopping",
      description: "Virtual try-on experience for retail",
      tech: "ARKit, WebXR, Three.js",
      depth: 100,
      color: "from-cyan-500/20 to-blue-500/20",
    },
    {
      title: "Spatial Collaboration",
      description: "Multi-user 3D workspace",
      tech: "WebRTC, Spatial Audio, Unity",
      depth: 200,
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "AR Navigation System",
      description: "Real-world wayfinding overlay",
      tech: "ARCore, GPS, Computer Vision",
      depth: 150,
      color: "from-green-500/20 to-teal-500/20",
    },
    {
      title: "Virtual Showroom",
      description: "Immersive product exhibition",
      tech: "VR, Unreal Engine, WebGL",
      depth: 180,
      color: "from-orange-500/20 to-red-500/20",
    },
  ],
  capabilities: [
    { name: "3D Spatial Design", icon: <FiLayers />, level: "Advanced" },
    { name: "AR Development", icon: <FiBox />, level: "Expert" },
    { name: "Eye Tracking UX", icon: <FiEye />, level: "Advanced" },
    { name: "Gesture Control", icon: <FiMove />, level: "Expert" },
  ],
  testimonials: [
    {
      quote: "The spatial experiences created by Spatial Vision are truly next-generation. Their AR shopping app increased our conversion rate by 340%.",
      author: "Jennifer Martinez",
      role: "Head of Digital, Fashion Retail Co",
    },
    {
      quote: "Working with a true spatial computing pioneer. The VR collaboration tool revolutionized how our remote teams work together.",
      author: "David Chang",
      role: "CTO, TechCollaborate",
    },
    {
      quote: "Incredible attention to spatial UX details. The hand tracking interactions feel natural and intuitive. Best AR developer we've partnered with.",
      author: "Lisa Anderson",
      role: "Product Lead, SpatialTech",
    },
  ],
  pricing: [
    {
      name: "AR Experience",
      price: "$8,000",
      period: "per project",
      features: [
        "Custom AR Application",
        "iOS/Android Support",
        "Basic 3D Assets",
        "Gesture Interactions",
        "2 Months Development",
        "Technical Support",
      ],
    },
    {
      name: "VR Solution",
      price: "$15,000",
      period: "per project",
      popular: true,
      features: [
        "Full VR Experience",
        "Quest/PSVR/PC Support",
        "Advanced 3D Assets",
        "6DOF Interactions",
        "Spatial Audio",
        "4 Months Development",
        "Premium Support",
        "2 Months Maintenance",
      ],
    },
    {
      name: "Mixed Reality",
      price: "Custom",
      period: "enterprise",
      features: [
        "Vision Pro Compatible",
        "Full MR Platform",
        "Eye/Hand Tracking",
        "Spatial Computing UI",
        "Multi-User Support",
        "Enterprise Integration",
        "Dedicated Team",
        "Ongoing Support",
      ],
    },
  ],
  timeline: [
    {
      year: "2023-2024",
      title: "Lead XR Designer",
      company: "Apple Vision Labs",
      description: "Pioneered spatial computing experiences for Vision Pro launch, creating groundbreaking UI paradigms for mixed reality.",
    },
    {
      year: "2021-2023",
      title: "Senior AR/VR Developer",
      company: "Meta Reality Labs",
      description: "Developed immersive VR experiences for Quest platform, focusing on hand tracking and social presence.",
    },
    {
      year: "2019-2021",
      title: "AR Experience Designer",
      company: "Google Creative Lab",
      description: "Created innovative AR applications using ARCore, pushing the boundaries of mobile spatial computing.",
    },
    {
      year: "2018-2019",
      title: "XR Degree Specialization",
      company: "MIT Media Lab",
      description: "Focused on human-computer interaction in spatial computing environments and gesture-based interfaces.",
    },
  ],
  faq: [
    {
      question: "What platforms do you develop for?",
      answer: "I specialize in Apple Vision Pro, Meta Quest 2/3/Pro, iOS (ARKit), Android (ARCore), and WebXR for browser-based experiences. Each platform has unique capabilities I leverage for optimal user experiences.",
    },
    {
      question: "How long does an AR/VR project typically take?",
      answer: "AR applications typically take 2-3 months, while VR experiences require 3-6 months depending on complexity. Mixed reality projects for platforms like Vision Pro may take 4-8 months due to advanced interactions.",
    },
    {
      question: "Do you provide 3D assets or do I need to supply them?",
      answer: "I offer full 3D asset creation services, from modeling to texturing and optimization. I can also work with your existing assets, optimizing them for spatial computing performance.",
    },
    {
      question: "Can you integrate AR/VR with existing mobile apps?",
      answer: "Absolutely! I specialize in integrating AR/VR features into existing applications, whether they're native iOS/Android apps or web-based platforms using WebXR.",
    },
    {
      question: "What makes spatial computing different from traditional UX?",
      answer: "Spatial computing requires thinking in 3D space with depth, considering factors like eye gaze, hand gestures, spatial audio, and real-world context. It's about creating intuitive interactions that feel natural in mixed reality.",
    },
  ],
  gallery: [
    { title: "Vision Pro Shopping", description: "Mixed reality retail experience", depth: 100 },
    { title: "VR Training Simulator", description: "Industrial safety training in VR", depth: 150 },
    { title: "AR Museum Guide", description: "Interactive cultural heritage app", depth: 80 },
    { title: "Spatial Workspace", description: "Multi-user 3D collaboration", depth: 200 },
    { title: "Hand Tracking Game", description: "Controller-free VR gaming", depth: 120 },
    { title: "AR Navigation", description: "Real-world wayfinding overlay", depth: 90 },
  ],
};

// 3D Card with depth effect
function SpatialCard({
  children,
  depth = 0,
  className = "",
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${depth}px)`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// Floating spatial layer
function FloatingLayer({
  children,
  depth,
  delay = 0,
}: {
  children: React.ReactNode;
  depth: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, z: -depth }}
      animate={{ opacity: 1, z: 0 }}
      transition={{ duration: 0.8, delay }}
      style={{
        transformStyle: "preserve-3d",
        transform: `translateZ(${depth}px)`,
      }}
    >
      {children}
    </motion.div>
  );
}

export function ARSpatialTemplate() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax effect based on cursor
  const parallaxX = useTransform(cursorX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-20, 20]);
  const parallaxY = useTransform(cursorY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-20, 20]);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white overflow-hidden relative">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Custom Cursor Indicator */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          x: -16,
          y: -16,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-3 sm:px-3 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
          >
            ← Exit Spatial Mode
          </Link>
          <a
            href="#contact"
            className="px-3 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm hover:bg-cyan-500/30 transition-all backdrop-blur-sm"
          >
            Connect
          </a>
        </div>
      </nav>

      {/* Hero Section with Layered Depth */}
      <section className="relative min-h-screen flex items-center justify-center px-3 pt-20">
        <motion.div
          className="relative z-10 text-center max-w-full"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <FloatingLayer depth={100}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="text-8xl mb-6 filter drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                👁️
              </div>
            </motion.div>
          </FloatingLayer>

          <FloatingLayer depth={80} delay={0.2}>
            <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl  xl:text-5xl sm:text-6xl md:text-7xl lg:text-8xl  font-black mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(6,182,212,0.3)] break-words">
              {portfolioData.name}
            </h1>
          </FloatingLayer>

          <FloatingLayer depth={60} delay={0.4}>
            <p className="text-xl sm:text-2xl md:text-3xl  text-gray-300 mb-4 font-light">
              {portfolioData.title}
            </p>
          </FloatingLayer>

          <FloatingLayer depth={40} delay={0.6}>
            <p className="text-lg text-gray-400 mb-12">
              {portfolioData.tagline}
            </p>
          </FloatingLayer>

          <FloatingLayer depth={20} delay={0.8}>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 text-lg px-10 py-6 h-auto rounded-full shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transition-all">
              <FiMaximize className="mr-2" />
              Enter Experience
            </Button>
          </FloatingLayer>
        </motion.div>

        {/* Floating Depth Indicators */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 space-y-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-400/50 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 px-3 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-3xl md: text-3xl sm:text-4xl  font-bold text-center mb-12 text-white">
              Impact in Spatial Computing
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {portfolioData.stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05, z: 50 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="text-3xl sm:text-5xl   font-black bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-2 break-words">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 px-3">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl   font-bold text-center mb-12 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent break-words">
              About the Vision
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">
              {portfolioData.about}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Spatial Projects Section */}
      <section className="relative py-20 px-3 bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-5xl md: text-4xl sm:text-5xl md:text-6xl  font-bold text-center mb-16 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent break-words">
              Spatial Experiences
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.experiences.map((exp, index) => (
              <ScrollReveal key={exp.title} delay={index * 0.1}>
                <SpatialCard depth={exp.depth} className="h-full">
                  <Card className={`h-full bg-gradient-to-br ${exp.color} backdrop-blur-xl border-white/20 hover:border-cyan-400/50 transition-all duration-300 group overflow-hidden`}>
                    <div className="p-8 h-full flex flex-col">
                      {/* Depth indicator */}
                      <div className="flex items-center gap-2 mb-4 text-xs text-cyan-400">
                        <FiLayers />
                        <span>Depth: {exp.depth}px</span>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                        {exp.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-gray-300">
                          {exp.tech}
                        </div>
                      </div>
                    </div>
                  </Card>
                </SpatialCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-20 px-3">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl   font-bold text-center mb-16 text-white break-words">
              Spatial Tech Stack
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {portfolioData.skills.map((skill, index) => (
              <ScrollReveal key={skill} delay={index * 0.03}>
                <motion.div
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-white/20 rounded-lg p-4 text-center hover:border-cyan-400/50 transition-all cursor-pointer"
                  whileHover={{ scale: 1.1, z: 30 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="text-xs md:text-sm font-medium text-white">{skill}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative py-20 px-3 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl   font-bold text-center mb-16 text-white break-words">
              Spatial Computing Capabilities
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.capabilities.map((cap, index) => (
              <ScrollReveal key={cap.name} delay={index * 0.1}>
                <motion.div
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all cursor-pointer"
                  whileHover={{ scale: 1.05, z: 50 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-3xl mb-4 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                    {cap.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{cap.name}</h3>
                  <p className="text-cyan-400 text-sm font-semibold">{cap.level}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-20 px-3 bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl   font-bold text-center mb-16 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent break-words">
              Portfolio Gallery
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.gallery.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <SpatialCard depth={item.depth} className="h-full">
                  <Card className="h-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border-white/20 hover:border-cyan-400/50 transition-all group cursor-pointer overflow-hidden">
                    <div className="p-6 h-full flex flex-col">
                      <div className="w-full h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all relative overflow-hidden">
                        <FiBox className="w-16 h-16 text-cyan-400" />
                        <div className="absolute top-2 right-2 text-xs text-cyan-400 flex items-center gap-1">
                          <FiLayers />
                          {item.depth}px
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </Card>
                </SpatialCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 px-3">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl   font-bold text-center mb-16 text-white break-words">
              Journey Through Dimensions
            </h2>
          </ScrollReveal>
          <div className="space-y-8">
            {portfolioData.timeline.map((item, index) => (
              <ScrollReveal key={item.year} delay={index * 0.1}>
                <div className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-4 h-4 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                      whileHover={{ scale: 2 }}
                    />
                    {index !== portfolioData.timeline.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-cyan-500/50 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="text-cyan-400 font-semibold mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <div className="text-gray-400 text-sm mb-3">{item.company}</div>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 px-3 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl   font-bold text-center mb-4 text-white break-words">
              Investment Packages
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
              Choose the right spatial computing solution for your vision
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolioData.pricing.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, z: 50 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Card className={`bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border-white/20 ${plan.popular ? 'ring-2 ring-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.3)]' : ''} hover:border-cyan-500/50 transition-all relative h-full`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                        MOST POPULAR
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="mb-6">
                        <span className="text-3xl sm:text-4xl  font-black text-white">{plan.price}</span>
                        <span className="text-gray-400 ml-2">{plan.period}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-gray-300">
                            <FiZap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'bg-white/10 hover:bg-white/20'} text-white border-0 rounded-full`}>
                        Start Project
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 px-3">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl   font-bold text-center mb-16 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent break-words">
              Client Experiences
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolioData.testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.author} delay={index * 0.1}>
                <SpatialCard depth={100 + index * 30} className="h-full">
                  <Card className="h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-white/20 hover:border-purple-400/50 transition-all">
                    <div className="p-6 h-full flex flex-col">
                      <div className="text-cyan-400 text-4xl mb-4">"</div>
                      <p className="text-gray-300 mb-6 leading-relaxed flex-grow">{testimonial.quote}</p>
                      <div className="mt-auto">
                        <div className="font-semibold text-white">{testimonial.author}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </Card>
                </SpatialCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-3 bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl   font-bold text-center mb-12 text-white break-words">
              Frequently Asked
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {portfolioData.faq.map((item, index) => (
              <ScrollReveal key={item.question} delay={index * 0.05}>
                <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border-white/20 hover:border-cyan-400/50 transition-all">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-2">
                      <FiEye className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                      {item.question}
                    </h3>
                    <p className="text-gray-400 leading-relaxed pl-7">{item.answer}</p>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-3">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <motion.div
              className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/50 rounded-3xl p-12 shadow-[0_0_60px_rgba(6,182,212,0.3)]"
              whileHover={{ scale: 1.02 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <h2 className="text-3xl sm:text-5xl   font-bold mb-6 text-white break-words">
                Ready to Build the Future?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's create immersive spatial experiences that transform how people interact with technology
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 text-lg px-10 py-6 h-auto rounded-full shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                  Start Your Project
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 text-lg px-10 py-6 h-auto rounded-full backdrop-blur-sm"
                >
                  Schedule Demo
                </Button>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-3">
        <div className="container mx-auto max-w-full text-center">
          <ScrollReveal>
            <h2 className="text-5xl md: text-4xl sm:text-5xl md:text-6xl  font-bold mb-8 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent break-words">
              Step Into the Future
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-300 mb-12">
              Ready to create immersive spatial experiences? Let's build the next dimension together.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col gap-4 sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 text-lg px-8 py-6 h-auto rounded-full shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                <FiMail className="mr-2 w-5 h-5" />
                spatial@vision.ar
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-2 border-cyan-500/50 text-white hover:bg-cyan-500/20 hover:text-white text-lg px-8 py-6 h-auto rounded-full backdrop-blur-sm"
              >
                <FiGithub className="mr-2 w-5 h-5" />
                View Projects
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl py-8">
        <div className="container mx-auto px-3 sm:px-3">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} {portfolioData.name}. Designed for the spatial web.
          </p>
        </div>
      </footer>
    </div>
  );
}
