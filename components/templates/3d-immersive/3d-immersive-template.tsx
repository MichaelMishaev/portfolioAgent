"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiMail, FiGithub, FiLinkedin, FiCode, FiLayers, FiZap } from "react-icons/fi";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

const portfolioData = {
  name: "Alex Quantum",
  title: "3D Web Developer & Creative Technologist",
  tagline: "Building immersive digital experiences with WebGL",
  projects: [
    {
      title: "3D Product Configurator",
      description: "Real-time 3D product customization with WebGL",
      tech: ["Three.js", "React", "WebGL"],
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "VR Museum Experience",
      description: "Virtual reality art gallery with spatial audio",
      tech: ["Three.js", "WebXR", "Spatial Audio"],
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Interactive Data Visualization",
      description: "3D data visualization with particle systems",
      tech: ["D3.js", "Three.js", "GLSL"],
      color: "from-green-500 to-teal-600",
    },
    {
      title: "Game Engine Prototype",
      description: "Custom 3D game engine with physics",
      tech: ["Three.js", "Cannon.js", "TypeScript"],
      color: "from-orange-500 to-red-600",
    },
  ],
  skills: [
    { name: "Three.js", icon: <FiCode />, level: 95 },
    { name: "WebGL", icon: <FiLayers />, level: 90 },
    { name: "GLSL Shaders", icon: <FiZap />, level: 85 },
  ],
};

// Animated 3D Sphere Component
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Rotating Cube Component
function RotatingCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#06b6d4" wireframe />
      </mesh>
    </Float>
  );
}

// Particle System Component
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8b5cf6" transparent opacity={0.6} />
    </points>
  );
}

// 3D Scene Component
function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

      <AnimatedSphere />
      <RotatingCube position={[-4, 2, -2]} />
      <RotatingCube position={[4, -2, -3]} />
      <Particles />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
    </>
  );
}

export function ThreeDImmersiveTemplate() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </Link>
          <a
            href="#contact"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section with 3D Canvas */}
      <section className="relative h-screen flex items-center justify-center">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </Canvas>
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center max-w-4xl px-6"
          style={{ opacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            {portfolioData.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl text-gray-300 mb-4"
          >
            {portfolioData.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-400 mb-12"
          >
            {portfolioData.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 text-lg px-8 py-6 h-auto"
            >
              Explore My Work
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.1}>
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur hover:bg-gray-900/80 transition-all duration-300 group overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800 rounded-full text-sm text-cyan-400 border border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section with 3D Elements */}
      <section className="relative py-20 px-6 bg-black">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
              Technical Expertise
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            {portfolioData.skills.map((skill, index) => (
              <ScrollReveal key={skill.name} delay={index * 0.1}>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl">
                        {skill.icon}
                      </div>
                      <span className="text-xl font-bold text-white">{skill.name}</span>
                    </div>
                    <span className="text-2xl font-bold text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Create Together
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-400 mb-12">
              Interested in 3D web experiences? Let's build something immersive.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 text-lg px-8 py-6 h-auto"
              >
                <FiMail className="mr-2 w-5 h-5" />
                alex@quantum3d.dev
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-gray-700 text-white hover:bg-gray-800 hover:text-white text-lg px-8 py-6 h-auto"
              >
                <FiGithub className="mr-2 w-5 h-5" />
                GitHub
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-gray-700 text-white hover:bg-gray-800 hover:text-white text-lg px-8 py-6 h-auto"
              >
                <FiLinkedin className="mr-2 w-5 h-5" />
                LinkedIn
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black py-8">
        <div className="container mx-auto px-6">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} {portfolioData.name}. Powered by Three.js & WebGL.
          </p>
        </div>
      </footer>
    </div>
  );
}
