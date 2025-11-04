"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiMail, FiArrowRight } from "react-icons/fi";
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
        <div className="max-w-full w-full">
          <div className="bg-black text-white p-8 md:p-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
            <h1 className="text-6xl md:text-9xl font-black leading-none mb-4 tracking-tighter break-words">
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
      <section className="py-20 px-3 border-b-4 border-black bg-yellow-400">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Photo Placeholder */}
            <div className="bg-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] aspect-square flex items-center justify-center rotate-2">
              <span className="text-9xl">⚡</span>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                <h2 className="text-4xl md:text-5xl font-black mb-4 break-words">
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
      <section className="py-20 px-3 border-b-4 border-black">
        <div className="max-w-full mx-auto">
          <div className="bg-red-600 text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 rotate-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black break-words">
              SKILLS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <section className="py-20 px-3 border-b-4 border-black">
        <div className="max-w-full mx-auto">
          <div className="bg-blue-600 text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 -rotate-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black break-words">
              {"SELECTED WORK" || "SELECTED WORK"}
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
      <section className="py-20 px-3 border-b-4 border-black bg-lime-300">
        <div className="max-w-full mx-auto">
          <div className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 rotate-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black break-words">
              {"HOW I WORK" || "HOW I WORK"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <section className="py-20 px-3 border-b-4 border-black">
        <div className="max-w-full mx-auto">
          <div className="bg-purple-600 text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 -rotate-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black break-words">
              {"WHAT THEY SAY" || "WHAT THEY SAY"}
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
      <section className="py-20 px-3 bg-black text-white border-b-4 border-white">
        <div className="max-w-full mx-auto">
          <div className="space-y-6">
            {["NO ROUNDED CORNERS", "NO SUBTLE GRADIENTS", "NO SAFE CHOICES", "ONLY HONEST WORK"].map((item, index) => {
              const colors = ["bg-white text-black", "bg-red-600 text-white", "bg-yellow-400 text-black", "bg-blue-600 text-white"];
              const rotations = ["rotate-2", "-rotate-1", "rotate-1", "-rotate-2"];
              return (
                <div key={index} className={`p-6 ${colors[index % colors.length]} border-4 border-white ${rotations[index % rotations.length]}`}>
                  <p className="text-2xl font-black uppercase">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-3 bg-lime-300">
        <div className="max-w-full mx-auto text-center">
          <div className="bg-black text-white p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-8 uppercase break-words">
              {"LET'S TALK" || "LET'S TALK"}
            </h2>
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] font-black text-xl px-8 py-6 h-auto uppercase"
            >
              <FiMail className="mr-2 w-6 h-6" />
              {portfolioData.contact || "ash@antistudio.xyz"}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats - Neo-Brutalist Style */}
      <section className="py-20 px-3 bg-yellow-300 border-y-8 border-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-7xl font-black mb-12 uppercase">STATS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '100+', label: 'PROJECTS' },
              { num: '50+', label: 'CLIENTS' },
              { num: '5YRS', label: 'EXPERIENCE' },
              { num: '99%', label: 'SATISFACTION' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-5xl font-black mb-2">{stat.num}</div>
                <div className="text-lg font-bold uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Neo-Brutalist Style */}
      <section className="py-20 px-3 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-7xl font-black mb-12 uppercase border-b-8 border-black pb-4">PRICING</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'BASIC', price: '$599', color: 'bg-red-500', features: ['1 PAGE', '2 REVISIONS', 'RESPONSIVE'] },
              { name: 'PRO', price: '$1499', color: 'bg-blue-500', features: ['5 PAGES', '5 REVISIONS', 'ANIMATIONS', 'CMS'], highlight: true },
              { name: 'ULTRA', price: '$3999', color: 'bg-green-500', features: ['UNLIMITED', 'WEB APP', 'CUSTOM CODE', 'SUPPORT'] }
            ].map((plan, i) => (
              <div key={i} className={`${plan.color} text-white p-8 border-8 border-black ${plan.highlight ? 'shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]' : 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}`}>
                <h3 className="text-4xl font-black mb-4 uppercase">{plan.name}</h3>
                <div className="text-6xl font-black mb-8">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="font-bold text-lg uppercase">/// {f}</li>
                  ))}
                </ul>
                <Button className="w-full bg-black hover:bg-gray-800 text-white border-4 border-white font-black uppercase text-lg h-14">
                  SELECT
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Neo-Brutalist Style */}
      <section className="py-20 px-3 bg-black text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-7xl font-black mb-12 uppercase border-b-8 border-white pb-4">GALLERY</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { bg: 'bg-red-500' },
              { bg: 'bg-yellow-500' },
              { bg: 'bg-blue-500' },
              { bg: 'bg-green-500' },
              { bg: 'bg-purple-500' },
              { bg: 'bg-pink-500' }
            ].map((item, i) => (
              <div key={i} className={`aspect-square ${item.bg} border-8 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer flex items-center justify-center`}>
                <span className="text-8xl font-black text-white">{(i+1).toString().padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Neo-Brutalist Style */}
      <section className="py-20 px-3 bg-yellow-300">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-black mb-12 uppercase border-b-8 border-black pb-4">TIMELINE</h2>
          <div className="space-y-6">
            {[
              { year: '2024', title: 'CREATIVE DIRECTOR', company: 'ANTI STUDIO', color: 'bg-red-500' },
              { year: '2022', title: 'LEAD DESIGNER', company: 'CHAOS AGENCY', color: 'bg-blue-500' },
              { year: '2020', title: 'DESIGNER', company: 'REBEL CO', color: 'bg-green-500' },
              { year: '2018', title: 'JUNIOR', company: 'STARTUP X', color: 'bg-purple-500' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className={`flex-shrink-0 w-32 ${item.color} text-white p-4 border-4 border-black font-black text-3xl flex items-center justify-center`}>
                  {item.year}
                </div>
                <div className="flex-1 bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-2xl font-black uppercase mb-2">{item.title}</h3>
                  <p className="font-bold uppercase text-lg">{item.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black text-white py-8">
        <div className="container mx-auto px-3 max-w-full">
          <p className="text-center font-bold uppercase text-sm">
            © {new Date().getFullYear()} {portfolioData.name || "ASH WOLF"} /// {"ANTI-DESIGN STUDIO" || "ANTI-DESIGN STUDIO"}
          </p>
        </div>
      </footer>
    </div>
  );
}
