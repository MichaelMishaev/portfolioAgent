"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FiMic,
  FiMicOff,
  FiMessageSquare,
  FiHelpCircle,
  FiMail,
  FiVolume2,
  FiCommand,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "VoiceUX Pro",
  title: "Voice Interface Designer",
  tagline: "Designing conversations, not just interfaces",
};

const sampleConversation = [
  { type: "user", text: "Tell me about your work", timestamp: "2:34 PM" },
  {
    type: "assistant",
    text: "I specialize in creating intuitive voice-first experiences. My work spans voice assistants, conversational AI, and multimodal interfaces.",
    timestamp: "2:34 PM",
  },
  { type: "user", text: "What projects have you completed?", timestamp: "2:35 PM" },
  {
    type: "assistant",
    text: "I've designed voice experiences for smart home devices, automotive interfaces, and healthcare applications. Each project focuses on natural conversation flow and accessibility.",
    timestamp: "2:35 PM",
  },
];

const voiceCommands = [
  "Show me your work",
  "What's your experience?",
  "Contact information",
  "Tell me about voice design",
  "How can we collaborate?",
  "View case studies",
];

const projects = [
  {
    title: "Smart Home Assistant",
    description: "Natural language control for connected home devices",
    tech: "Alexa Skills, DialogFlow, NLU",
    icon: "🏠",
  },
  {
    title: "Automotive Voice UI",
    description: "Hands-free car interface with multimodal feedback",
    tech: "Nuance, VUI Design, Speech Recognition",
    icon: "🚗",
  },
  {
    title: "Healthcare Voice App",
    description: "HIPAA-compliant voice assistant for patient care",
    tech: "Google Assistant, Privacy Design, NLP",
    icon: "🏥",
  },
  {
    title: "Banking Voice Auth",
    description: "Voice biometrics for secure transactions",
    tech: "Voice Biometrics, Security, UX",
    icon: "🏦",
  },
];

// Waveform visualization component
function Waveform({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1 h-20">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full"
          animate={{
            height: isActive ? [20, 60, 30, 70, 20] : [20, 20, 20, 20, 20],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

// Voice Command Chip
function CommandChip({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full text-sm text-gray-300 hover:text-white transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FiCommand className="inline mr-2 w-3 h-3" />
      {text}
    </motion.button>
  );
}

export function VoiceFirstTemplate() {
  const [isListening, setIsListening] = useState(false);  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [messages, setMessages] = useState(sampleConversation);
  const [showCommands, setShowCommands] = useState(true);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const handleCommandClick = (command: string) => {
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: command,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white overflow-x-hidden max-w-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-3 sm:px-3 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </Link>
          <a
            href="#contact"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section with Voice Interface */}
      <section className="min-h-screen flex items-center justify-center px-3 pt-20 relative">
        <div className="container mx-auto max-w-full">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              {portfolioData.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl text-gray-300 mb-4"
            >
              {portfolioData.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-400"
            >
              {portfolioData.tagline}
            </motion.p>
          </div>

          {/* Voice Interaction Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-xl p-8">
              {/* Waveform */}
              <Waveform isActive={isListening} />

              {/* Microphone Button */}
              <div className="flex justify-center my-8">
                <motion.button
                  onClick={toggleListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all ${
                    isListening
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={isListening ? "Stop voice recognition" : "Start voice recognition"}
                  animate={
                    isListening
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(239, 68, 68, 0.7)",
                            "0 0 0 20px rgba(239, 68, 68, 0)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: isListening ? Infinity : 0,
                  }}
                >
                  {isListening ? <FiMic /> : <FiMicOff />}
                </motion.button>
              </div>

              {/* Status Text */}
              <p className="text-center text-gray-400 mb-8">
                {isListening ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Listening...
                    </motion.span>
                    <FiVolume2 className="animate-pulse" />
                  </span>
                ) : (
                  "Click the microphone or try a voice command"
                )}
              </p>

              {/* Voice Commands */}
              {showCommands && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
                    <FiHelpCircle />
                    Try these voice commands:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {voiceCommands.slice(0, 4).map((cmd) => (
                      <CommandChip
                        key={cmd}
                        text={cmd}
                        onClick={() => handleCommandClick(cmd)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Conversation History */}
      <section className="py-20 px-3 bg-gray-900/30">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
              Sample Conversation
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    initial={{ opacity: 0, x: msg.type === "user" ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] md:max-w-[60%] ${
                        msg.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-200"
                      } rounded-2xl p-4 shadow-lg`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {msg.type === "assistant" && (
                          <FiMessageSquare className="w-4 h-4 text-blue-400" />
                        )}
                        <span className="text-xs opacity-70">{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-3">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
              Voice Experience Projects
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.1}>
                <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all group">
                  <div className="p-8">
                    <div className="text-6xl mb-4">{project.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.split(", ").map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Voice Design Principles */}
      <section className="py-20 px-3 bg-gray-900/30">
        <div className="container mx-auto max-w-full">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
              Voice Design Principles
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Natural Conversation",
                description:
                  "Design dialogs that feel human and intuitive, not robotic.",
                emoji: "💬",
              },
              {
                title: "Error Tolerance",
                description:
                  "Handle misunderstandings gracefully with helpful recovery paths.",
                emoji: "🔄",
              },
              {
                title: "Context Awareness",
                description:
                  "Remember user preferences and maintain conversation context.",
                emoji: "🧠",
              },
            ].map((principle, index) => (
              <ScrollReveal key={principle.title} delay={index * 0.1}>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all">
                  <div className="text-5xl mb-4">{principle.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-3">
        <div className="container mx-auto max-w-full text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Talk About Voice
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-300 mb-12">
              Ready to create conversational experiences that users love? Let's design together.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col gap-4 sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 text-lg px-8 py-6 h-auto">
                <FiMail className="mr-2 w-5 h-5" />
                voice@uxpro.com
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-2 border-gray-700 text-white hover:bg-gray-800 hover:text-white text-lg px-8 py-6 h-auto"
              >
                <FiMic className="mr-2 w-5 h-5" />
                Schedule Call
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats - Voice First Style */}
      <section className="py-20 px-3 sm:px-3 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-white">
            🎙️ Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '1000+', label: 'Voice Commands', icon: '🗣️' },
              { num: '50+', label: 'Voice Apps', icon: '📱' },
              { num: '98%', label: 'Accuracy', icon: '✅' },
              { num: '24/7', label: 'Available', icon: '⏰' }
            ].map((stat, i) => (
              <div key={i} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{stat.num}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Voice First Style */}
      <section className="py-20 px-3 sm:px-3 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center text-white">
            🎯 Pricing
          </h2>
          <p className="text-center text-gray-400 mb-12">Voice-enabled solutions for every need</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Basic Voice', price: '$499', features: ['Voice Navigation', 'Basic Commands', 'Mobile Support', '2 Revisions'] },
              { name: 'Pro Voice', price: '$1299', features: ['Advanced AI', 'Multi-Language', 'Voice Analytics', '5 Revisions', 'Priority Support'], popular: true },
              { name: 'Enterprise', price: '$2999', features: ['Custom AI Model', 'Unlimited Commands', 'Full Analytics', 'Unlimited Revisions', 'Dedicated Support'] }
            ].map((plan, i) => (
              <div key={i} className={`bg-gray-800 p-8 rounded-2xl border-2 transition-all hover:scale-105 ${
                plan.popular ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-gray-700'
              }`}>
                {plan.popular && (
                  <div className="text-xs font-bold text-blue-400 mb-2 uppercase">Most Popular</div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="text-5xl font-bold mb-8 text-white">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-blue-400 mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'} text-white`}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Voice First Style */}
      <section className="py-20 px-3 sm:px-3 bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-white">
            💬 Testimonials
          </h2>
          <div className="space-y-8">
            {[
              { text: 'The voice interface is incredibly intuitive. Our users love it!', author: 'Sarah Chen', role: 'Product Manager, TechCo', icon: '🎤' },
              { text: 'Best voice-first experience I\'ve seen. Highly recommended!', author: 'Michael Ross', role: 'CEO, VoiceApp', icon: '🗣️' },
              { text: 'Revolutionary approach to voice interaction. Game changer!', author: 'Emma Wilson', role: 'UX Director', icon: '✨' }
            ].map((t, i) => (
              <div key={i} className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{t.icon}</div>
                  <div className="flex-1">
                    <p className="text-lg text-gray-300 mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                    <div>
                      <div className="font-bold text-white">{t.author}</div>
                      <div className="text-sm text-gray-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Voice First Style */}
      <section className="py-20 px-3 sm:px-3 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-white">
            🎨 Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: '🎙️', gradient: 'from-blue-500 to-cyan-500' },
              { icon: '🗣️', gradient: 'from-purple-500 to-pink-500' },
              { icon: '📱', gradient: 'from-green-500 to-emerald-500' },
              { icon: '🎧', gradient: 'from-orange-500 to-red-500' },
              { icon: '🔊', gradient: 'from-indigo-500 to-purple-500' },
              { icon: '🎵', gradient: 'from-pink-500 to-rose-500' }
            ].map((item, i) => (
              <div key={i} className={`aspect-square bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-6xl hover:scale-105 transition-transform cursor-pointer`}>
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Voice First */}
      <section className="py-32 px-3 sm:px-3 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <div className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20">
            <div className="text-6xl mb-6">🎙️</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Go Voice-First?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's build the future of voice interaction together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8">
                Start Voice Project
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-semibold text-lg px-8">
                See Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 py-8">
        <div className="container mx-auto px-3 sm:px-3">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} {portfolioData.name}. Designed for voice-first experiences.
          </p>
        </div>
      </footer>
    </div>
  );
}
