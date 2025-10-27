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
  const parallaxX = useTransform(cursorX, [0, window.innerWidth], [-20, 20]);
  const parallaxY = useTransform(cursorY, [0, window.innerHeight], [-20, 20]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white overflow-hidden relative">
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
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
          >
            ← Exit Spatial Mode
          </Link>
          <a
            href="#contact"
            className="px-6 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm hover:bg-cyan-500/30 transition-all backdrop-blur-sm"
          >
            Connect
          </a>
        </div>
      </nav>

      {/* Hero Section with Layered Depth */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div
          className="relative z-10 text-center max-w-5xl"
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
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(6,182,212,0.3)]">
              {portfolioData.name}
            </h1>
          </FloatingLayer>

          <FloatingLayer depth={60} delay={0.4}>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
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

      {/* Spatial Projects Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Spatial Experiences
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
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

      {/* Capabilities Section */}
      <section className="relative py-20 px-6 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
              Spatial Computing Capabilities
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Spatial Info Panel */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-12">
              <div className="flex items-center gap-4 mb-6">
                <FiZap className="text-4xl text-purple-400" />
                <h3 className="text-3xl font-bold text-white">The Future is Spatial</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Spatial computing represents the next evolution of human-computer interaction.
                By blending digital content with the physical world, we create experiences that
                feel natural, intuitive, and magical.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Hand Tracking", "Eye Gaze", "Spatial Audio", "6DOF"].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              Step Into the Future
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-300 mb-12">
              Ready to create immersive spatial experiences? Let's build the next dimension together.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} {portfolioData.name}. Designed for the spatial web.
          </p>
        </div>
      </footer>
    </div>
  );
}
