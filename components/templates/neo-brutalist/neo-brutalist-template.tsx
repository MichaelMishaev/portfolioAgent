"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiMail, FiArrowRight , FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const portfolioData = {
  name: "ASH WOLF",
  title: "ANTI-DESIGNER",
  manifesto: "DESIGN SHOULDN'T BE POLITE. IT SHOULD CHALLENGE. DISRUPT. DEMAND ATTENTION.",
  bio: "10+ YEARS BREAKING RULES. STARTED IN PUNK SCENE. NOW LEADING ANTI-DESIGN MOVEMENT. CLIENTS WHO DARE TO BE DIFFERENT.",
  work: [
    { id: "01", title: "REBEL BRAND CO.", year: "2024", type: "IDENTITY", desc: "COMPLETE REBRAND FOR UNDERGROUND STREETWEAR. REJECTED EVERY SAFE CHOICE. BOLD COLORS, HARSH SHAPES, ZERO COMPROMISE." },
    { id: "02", title: "CHAOS THEORY APP", year: "2024", type: "UI/UX", desc: "PRODUCTIVITY APP THAT BREAKS THE MOLD. NO PASTELS. NO SOFT CORNERS. JUST RAW, HONEST INTERFACE." },
    { id: "03", title: "UNDERGROUND ZINE", year: "2023", type: "EDITORIAL", desc: "MONTHLY PRINT PUBLICATION. 100% ANALOG DESIGN. SCISSORS, GLUE, PHOTOCOPIER. DIGITAL CAN'T TOUCH THIS." },
    { id: "04", title: "NOISE COLLECTIVE", year: "2023", type: "ART DIRECTION", desc: "VISUAL IDENTITY FOR EXPERIMENTAL MUSIC LABEL. LOUD VISUALS FOR LOUD SOUNDS. NO SUBTLETY ALLOWED." },
  ],
  process: [
    { step: "01", title: "DESTROY", desc: "FORGET WHAT YOU KNOW ABOUT 'GOOD DESIGN'" },
    { step: "02", title: "CHALLENGE", desc: "QUESTION EVERY ASSUMPTION AND EXPECTATION" },
    { step: "03", title: "CREATE", desc: "BUILD SOMETHING THAT DEMANDS ATTENTION" },
    { step: "04", title: "ITERATE", desc: "REFINE THE CHAOS UNTIL IT WORKS" },
  ],
  skills: [
    { name: "BRANDING", level: "EXPERT", color: "bg-red-600" },
    { name: "TYPOGRAPHY", level: "MASTER", color: "bg-yellow-400" },
    { name: "UI/UX", level: "REBEL", color: "bg-blue-600" },
    { name: "PRINT", level: "OLD SCHOOL", color: "bg-green-600" },
    { name: "ART DIRECTION", level: "FEARLESS", color: "bg-purple-600" },
    { name: "EDITORIAL", level: "RADICAL", color: "bg-orange-600" },
  ],
  testimonials: [
    { client: "REBEL BRAND CO.", quote: "ASH DOESN'T JUST DESIGN. THEY DEMOLISH EXPECTATIONS AND BUILD SOMETHING BETTER.", role: "FOUNDER" },
    { client: "NOISE COLLECTIVE", quote: "FINALLY A DESIGNER WHO GETS IT. RAW. HONEST. UNCOMPROMISING.", role: "CREATIVE DIRECTOR" },
    { client: "CHAOS THEORY", quote: "WORKING WITH ASH CHANGED HOW WE SEE DESIGN. BOLD MOVES ONLY.", role: "CEO" },
  ],
  contact: "ash@antistudio.xyz",
};

export function NeoBrutalistTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-white text-black font-mono">
      {/* Navigation */}
      <nav className="border-b-4 border-black bg-yellow-400">
        <div className="container mx-auto px-3 max-w-full py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold hover:bg-black hover:text-yellow-400 px-2 py-1 transition-colors">
            ← BACK
          </Link>
          <a href="#contact" className="text-sm font-bold hover:bg-black hover:text-yellow-400 px-2 py-1 transition-colors">
            CONTACT
          </a>
        </div>
      </nav>

      {/* Hero - Harsh Typography */}
      <section className="min-h-screen flex items-center justify-center p-4 border-b-4 border-black">
        <div className="max-w-5xl w-full">
          <div className="bg-black text-white p-8 md:p-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
            <h1 className="text-6xl md:text-9xl font-black leading-none mb-4 tracking-tighter">
              {portfolioData.name}
            </h1>
            <div className="h-2 w-32 bg-red-600 mb-4"></div>
            <p className="text-2xl md:text-3xl font-bold uppercase">
              {portfolioData.title}
            </p>
          </div>

          <div className="bg-red-600 text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1">
            <p className="text-lg md:text-xl font-bold uppercase leading-tight">
              {portfolioData.manifesto}
            </p>
          </div>
        </div>
      </section>

      {/* About Section - Harsh Bio */}
      <section className="py-20 px-4 border-b-4 border-black bg-yellow-400">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Photo Placeholder */}
            <div className="bg-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] aspect-square flex items-center justify-center rotate-2">
              <span className="text-9xl">⚡</span>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  WHO IS THIS?
                </h2>
                <p className="text-lg font-bold uppercase leading-relaxed">
                  {portfolioData.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Harsh Grid */}
      <section className="py-20 px-4 border-b-4 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-600 text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 rotate-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black">
              SKILLS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolioData.skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`${skill.color} text-white p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer`}
                style={{
                  transform: `rotate(${index % 3 === 0 ? '1deg' : index % 3 === 1 ? '-1deg' : '0deg'})`,
                }}
              >
                <h3 className="text-2xl font-black mb-2 uppercase">
                  {skill.name}
                </h3>
                <p className="text-lg font-bold uppercase">
                  {skill.level}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section - Detailed Projects */}
      <section className="py-20 px-4 border-b-4 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="bg-blue-600 text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 -rotate-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black">
              SELECTED WORK
            </h2>
          </div>

          <div className="space-y-8">
            {portfolioData.work.map((project, index) => (
              <div
                key={project.id}
                className="group cursor-pointer"
                style={{
                  transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
                }}
              >
                <div className="bg-white p-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-2 group-hover:translate-y-2 transition-all">
                  <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b-4 border-black">
                      <div className="flex items-baseline gap-4">
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black">
                          {project.id}
                        </span>
                        <div>
                          <h3 className="text-3xl md:text-4xl font-black uppercase">
                            {project.title}
                          </h3>
                          <p className="text-sm font-bold uppercase text-gray-600">
                            {project.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <span className="text-xl font-bold">{project.year}</span>
                        <FiArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg font-bold uppercase leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 border-b-4 border-black bg-lime-300">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 rotate-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black">
              HOW I WORK
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {portfolioData.process.map((step, index) => (
              <div
                key={step.step}
                className="bg-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
                style={{
                  transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})`,
                }}
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-6xl font-black">{step.step}</span>
                  <h3 className="text-3xl font-black uppercase">{step.title}</h3>
                </div>
                <p className="text-lg font-bold uppercase">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 border-b-4 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="bg-purple-600 text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 -rotate-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black">
              WHAT THEY SAY
            </h2>
          </div>

          <div className="space-y-6">
            {portfolioData.testimonials.map((testimonial, index) => (
              <div
                key={testimonial.client}
                className="bg-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                style={{
                  transform: `rotate(${index % 3 === 0 ? '1deg' : index % 3 === 1 ? '-1deg' : '0deg'})`,
                }}
              >
                <p className="text-xl font-bold uppercase mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-2 pt-4 border-t-2 border-black">
                  <span className="font-black uppercase">{testimonial.client}</span>
                  <span className="text-gray-600">///</span>
                  <span className="font-bold uppercase text-sm">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 px-4 bg-black text-white border-b-4 border-white">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="p-6 bg-white text-black border-4 border-white rotate-2">
              <p className="text-2xl font-black uppercase">
                NO ROUNDED CORNERS
              </p>
            </div>
            <div className="p-6 bg-red-600 text-white border-4 border-white -rotate-1">
              <p className="text-2xl font-black uppercase">
                NO SUBTLE GRADIENTS
              </p>
            </div>
            <div className="p-6 bg-yellow-400 text-black border-4 border-white rotate-1">
              <p className="text-2xl font-black uppercase">
                NO SAFE CHOICES
              </p>
            </div>
            <div className="p-6 bg-blue-600 text-white border-4 border-white -rotate-2">
              <p className="text-2xl font-black uppercase">
                ONLY HONEST WORK
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-lime-300">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black text-white p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-8 uppercase">
              LET'S TALK
            </h2>
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] font-black text-xl px-8 py-6 h-auto uppercase"
            >
              <FiMail className="mr-2 w-6 h-6" />
              {portfolioData.contact}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black text-white py-8">
        <div className="container mx-auto px-3 max-w-full">
          <p className="text-center font-bold uppercase text-sm">
            © {new Date().getFullYear()} {portfolioData.name} /// ANTI-DESIGN STUDIO
          </p>
        </div>
      </footer>
    </div>
  );
}
