"use client";

import { useNode } from "@craftjs/core";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiMail, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// ============================================
// SPLIT-SCREEN HERO COMPONENT
// ============================================

interface SplitScreenHeroProps {
  name: string;
  title: string;
  tagline: string;
  location: string;
  availability: string;
  initials: string;
  backgroundColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export const SplitScreenHero = ({
  name = "David Kim",
  title = "Digital Designer",
  tagline = "Crafting experiences that matter through thoughtful design, strategic thinking, and pixel-perfect execution",
  location = "Seoul, South Korea",
  availability = "Available for select projects",
  initials = "DK",
  backgroundColor = "#6366f1",
  gradientFrom = "#6366f1",
  gradientTo = "#a855f7",
}: SplitScreenHeroProps) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <section
      ref={(ref) => ref && connect(drag(ref))}
      className={`h-screen flex items-center pt-16 ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="container mx-auto px-3 sm:px-3 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-8">
          {/* Left Side - Text */}
          <div className="flex flex-col justify-center">
            <FadeIn>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
                {name}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-2xl md:text-3xl text-muted-foreground mb-4">
                {title}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-lg text-muted-foreground mb-4 max-w-lg">
                {tagline}
              </p>
            </FadeIn>
            <FadeIn delay={0.35}>
              <div className="flex flex-col gap-2 mb-8 text-sm text-muted-foreground">
                <p>📍 {location}</p>
                <p>✓ {availability}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Button size="lg" className="w-fit">
                View Projects <FiArrowRight className="ml-2" />
              </Button>
            </FadeIn>
          </div>

          {/* Right Side - Visual */}
          <div className="flex items-center justify-center">
            <div
              className="w-full h-full max-h-[600px] rounded-3xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
              }}
            >
              <div className="text-9xl font-bold text-white/20">
                {initials}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Settings Panel for Hero - Define before .craft object
const SplitScreenHeroSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">CONTENT</div>

      <div>
        <Label>Name</Label>
        <Input
          value={props.name}
          onChange={(e) => setProp((props: any) => (props.name = e.target.value))}
        />
      </div>

      <div>
        <Label>Title</Label>
        <Input
          value={props.title}
          onChange={(e) => setProp((props: any) => (props.title = e.target.value))}
        />
      </div>

      <div>
        <Label>Tagline</Label>
        <Textarea
          value={props.tagline}
          onChange={(e) => setProp((props: any) => (props.tagline = e.target.value))}
          rows={3}
        />
      </div>

      <div>
        <Label>Location</Label>
        <Input
          value={props.location}
          onChange={(e) => setProp((props: any) => (props.location = e.target.value))}
        />
      </div>

      <div>
        <Label>Availability</Label>
        <Input
          value={props.availability}
          onChange={(e) => setProp((props: any) => (props.availability = e.target.value))}
        />
      </div>

      <div className="text-sm font-medium mt-6">VISUAL</div>

      <div>
        <Label>Initials</Label>
        <Input
          value={props.initials}
          onChange={(e) => setProp((props: any) => (props.initials = e.target.value))}
          maxLength={3}
        />
      </div>

      <div>
        <Label>Gradient Start Color</Label>
        <Input
          type="color"
          value={props.gradientFrom}
          onChange={(e) => setProp((props: any) => (props.gradientFrom = e.target.value))}
        />
      </div>

      <div>
        <Label>Gradient End Color</Label>
        <Input
          type="color"
          value={props.gradientTo}
          onChange={(e) => setProp((props: any) => (props.gradientTo = e.target.value))}
        />
      </div>
    </div>
  );
};

// Assign .craft config AFTER Settings component is defined
SplitScreenHero.craft = {
  displayName: "Split-Screen Hero",
  props: {
    name: "David Kim",
    title: "Digital Designer",
    tagline: "Crafting experiences that matter through thoughtful design, strategic thinking, and pixel-perfect execution",
    location: "Seoul, South Korea",
    availability: "Available for select projects",
    initials: "DK",
    backgroundColor: "#6366f1",
    gradientFrom: "#6366f1",
    gradientTo: "#a855f7",
  },
  related: {
    settings: SplitScreenHeroSettings,
  },
};

// ============================================
// STATS SECTION COMPONENT
// ============================================

interface StatsProps {
  stats: Array<{ value: string; label: string }>;
}

export const SplitScreenStats = ({
  stats = [
    { value: "150+", label: "Projects Completed" },
    { value: "50+", label: "Happy Clients" },
    { value: "8+", label: "Years Experience" },
    { value: "15+", label: "Awards Won" },
  ],
}: StatsProps) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <section
      ref={(ref) => ref && connect(drag(ref))}
      className={`py-20 border-t ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="container mx-auto px-3 sm:px-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Settings Panel for Stats - Define before .craft object
const SplitScreenStatsSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">STATS</div>

      {props.stats.map((stat: any, index: number) => (
        <div key={index} className="p-3 border rounded">
          <Label>Stat {index + 1} - Value</Label>
          <Input
            value={stat.value}
            onChange={(e) =>
              setProp((props: any) => {
                props.stats[index].value = e.target.value;
              })
            }
            className="mb-2"
          />
          <Label>Stat {index + 1} - Label</Label>
          <Input
            value={stat.label}
            onChange={(e) =>
              setProp((props: any) => {
                props.stats[index].label = e.target.value;
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

// Assign .craft config AFTER Settings component is defined
SplitScreenStats.craft = {
  displayName: "Stats Section",
  props: {
    stats: [
      { value: "150+", label: "Projects Completed" },
      { value: "50+", label: "Happy Clients" },
      { value: "8+", label: "Years Experience" },
      { value: "15+", label: "Awards Won" },
    ],
  },
  related: {
    settings: SplitScreenStatsSettings,
  },
};

// ============================================
// SKILLS SECTION COMPONENT
// ============================================

interface SkillsProps {
  title: string;
  skills: string[];
}

export const SplitScreenSkills = ({
  title = "Skills & Expertise",
  skills = [
    "UI/UX Design",
    "Prototyping",
    "Branding",
    "Motion Design",
    "Figma",
    "Design Systems",
    "User Research",
    "Visual Design",
    "Typography",
    "Interaction Design",
    "3D Design",
    "Art Direction",
  ],
}: SkillsProps) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <section
      ref={(ref) => ref && connect(drag(ref))}
      className={`py-20 border-t ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="container mx-auto px-3 sm:px-3">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">{title}</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <div className="px-4 py-2 bg-muted rounded-full text-sm">{skill}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Settings Panel for Skills - Define before .craft object
const SplitScreenSkillsSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">CONTENT</div>

      <div>
        <Label>Section Title</Label>
        <Input
          value={props.title}
          onChange={(e) => setProp((props: any) => (props.title = e.target.value))}
        />
      </div>

      <div>
        <Label>Skills (one per line)</Label>
        <Textarea
          value={props.skills.join('\n')}
          onChange={(e) =>
            setProp((props: any) => (props.skills = e.target.value.split('\n').filter((s: string) => s.trim())))
          }
          rows={8}
        />
      </div>
    </div>
  );
};

// Assign .craft config AFTER Settings component is defined
SplitScreenSkills.craft = {
  displayName: "Skills Section",
  props: {
    title: "Skills & Expertise",
    skills: [
      "UI/UX Design",
      "Prototyping",
      "Branding",
      "Motion Design",
      "Figma",
      "Design Systems",
      "User Research",
      "Visual Design",
      "Typography",
      "Interaction Design",
      "3D Design",
      "Art Direction",
    ],
  },
  related: {
    settings: SplitScreenSkillsSettings,
  },
};

// ============================================
// CONTACT SECTION COMPONENT
// ============================================

interface ContactProps {
  title: string;
  subtitle: string;
  email: string;
  location: string;
  availability: string;
}

export const SplitScreenContact = ({
  title = "Let's Work Together",
  subtitle = "Have a project in mind? Let's create something amazing.",
  email = "hello@davidkim.com",
  location = "Seoul, South Korea",
  availability = "Available worldwide remotely",
}: ContactProps) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <section
      ref={(ref) => ref && connect(drag(ref))}
      className={`min-h-screen flex items-center border-t ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="container mx-auto px-3 sm:px-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {subtitle}
            </p>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <Button size="lg" className="w-full justify-start text-lg">
              <FiMail className="mr-2" />
              {email}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Based in {location}
              <br />
              {availability}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Settings Panel for Contact - Define before .craft object
const SplitScreenContactSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">CONTENT</div>

      <div>
        <Label>Title</Label>
        <Input
          value={props.title}
          onChange={(e) => setProp((props: any) => (props.title = e.target.value))}
        />
      </div>

      <div>
        <Label>Subtitle</Label>
        <Textarea
          value={props.subtitle}
          onChange={(e) => setProp((props: any) => (props.subtitle = e.target.value))}
          rows={2}
        />
      </div>

      <div>
        <Label>Email</Label>
        <Input
          value={props.email}
          onChange={(e) => setProp((props: any) => (props.email = e.target.value))}
          type="email"
        />
      </div>

      <div>
        <Label>Location</Label>
        <Input
          value={props.location}
          onChange={(e) => setProp((props: any) => (props.location = e.target.value))}
        />
      </div>

      <div>
        <Label>Availability</Label>
        <Input
          value={props.availability}
          onChange={(e) => setProp((props: any) => (props.availability = e.target.value))}
        />
      </div>
    </div>
  );
};

// Assign .craft config AFTER Settings component is defined
SplitScreenContact.craft = {
  displayName: "Contact Section",
  props: {
    title: "Let's Work Together",
    subtitle: "Have a project in mind? Let's create something amazing.",
    email: "hello@davidkim.com",
    location: "Seoul, South Korea",
    availability: "Available worldwide remotely",
  },
  related: {
    settings: SplitScreenContactSettings,
  },
};
