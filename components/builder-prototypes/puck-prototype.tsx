"use client";

import * as React from "react";
import { Puck, Config, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Briefcase, Code, Mail, DollarSign, Image as ImageIcon, GripVertical, Sparkles } from "lucide-react";

// ============================================
// ENHANCED UI/UX COMPONENTS
// ============================================

// Hero Component with Beautiful Design
const HeroComponent = ({ name, title, bgColor }: { name: string; title: string; bgColor: string }) => {
  return (
    <div className="relative group">
      {/* Drag Handle */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-2 bg-blue-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div style={{ backgroundColor: bgColor }} className="relative overflow-hidden rounded-2xl p-12 md:p-16 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 text-center text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Hero Section
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{name}</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">{title}</p>
          <div className="flex gap-4 justify-center pt-6">
            <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// About Component with Modern Card Design
const AboutComponent = ({ text }: { text: string }) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2">
      {/* Drag Handle */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-2 bg-green-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-bl-full"></div>

      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
            <User className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <CardTitle className="text-2xl">About Me</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">My story and background</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-relaxed text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
};

// Projects Component with Grid Layout
const ProjectsComponent = ({ columns }: { columns: number }) => {
  const gridClass = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4"
  }[columns] || "md:grid-cols-2 lg:grid-cols-3";

  return (
    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2">
      {/* Drag Handle */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="p-2 bg-purple-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
            <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-2xl">Projects</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{columns} column layout</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`grid ${gridClass} gap-6`}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="group/card relative overflow-hidden rounded-xl border-2 hover:border-purple-400 transition-all">
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 transition-all"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold inline-block">
                    Featured
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg mb-2">Project {i}</h4>
                <p className="text-sm text-muted-foreground mb-4">An amazing project showcase with modern design</p>
                <Button variant="outline" size="sm" className="w-full">View Project</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Skills Component with Tag Design
const SkillsComponent = () => {
  const skills = ["React", "TypeScript", "Node.js", "Design", "UI/UX", "Next.js", "Tailwind", "Git"];

  return (
    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2">
      {/* Drag Handle */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-2 bg-orange-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-xl">
            <Briefcase className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <CardTitle className="text-2xl">Skills & Expertise</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">My technical skillset</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, idx) => (
            <span
              key={skill}
              className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 text-orange-700 dark:text-orange-300 rounded-full text-sm font-semibold hover:shadow-lg transition-all transform hover:scale-105 cursor-default"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Contact Component with Form
const ContactComponent = () => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2">
      {/* Drag Handle */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-2 bg-blue-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-2xl">Get In Touch</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Send me a message</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Input placeholder="Your Name" className="h-12" />
          </div>
          <div>
            <Input placeholder="Your Email" type="email" className="h-12" />
          </div>
          <div>
            <textarea
              className="w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Your Message"
            />
          </div>
          <Button className="w-full h-12 text-lg font-semibold">Send Message</Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Pricing Component with Card Grid
const PricingComponent = () => {
  const plans = [
    { name: "Basic", price: "$29", features: ["Feature 1", "Feature 2", "Feature 3"], highlight: false },
    { name: "Pro", price: "$99", features: ["All Basic", "Feature 4", "Feature 5", "Priority Support"], highlight: true },
    { name: "Enterprise", price: "$299", features: ["All Pro", "Feature 6", "Custom Solutions", "Dedicated Manager"], highlight: false }
  ];

  return (
    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2">
      {/* Drag Handle */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="p-2 bg-yellow-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
            <DollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <CardTitle className="text-2xl">Pricing Plans</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Choose your perfect plan</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                plan.highlight
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 shadow-xl'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-blue-500 text-white text-xs font-bold rounded-full shadow-lg">
                    POPULAR
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">{plan.price}</div>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full h-12"
                variant={plan.highlight ? "default" : "outline"}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Gallery Component
const GalleryComponent = ({ imageCount }: { imageCount: number }) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2">
      {/* Drag Handle */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-2 bg-pink-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-xl">
            <ImageIcon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
          <div>
            <CardTitle className="text-2xl">Gallery</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{imageCount} images</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: imageCount }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 hover:scale-105 transition-transform cursor-pointer relative overflow-hidden group/img"
            >
              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-all"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ============================================
// PUCK CONFIGURATION
// ============================================

const config: Config = {
  components: {
    Hero: {
      label: "Hero Section",
      fields: {
        name: { type: "text", label: "Name" },
        title: { type: "text", label: "Job Title" },
        bgColor: { type: "text", label: "Background Color" },
      },
      defaultProps: {
        name: "John Doe",
        title: "Full Stack Developer & Designer",
        bgColor: "#6366F1",
      },
      render: ({ name, title, bgColor }) => {
        return <HeroComponent name={name} title={title} bgColor={bgColor} />;
      },
    },
    About: {
      label: "About Section",
      fields: {
        text: { type: "textarea", label: "About Text" },
      },
      defaultProps: {
        text: "I'm a passionate developer with 5+ years of experience building amazing web applications. I love creating beautiful, functional, and user-friendly digital experiences.",
      },
      render: ({ text }) => {
        return <AboutComponent text={text} />;
      },
    },
    Projects: {
      label: "Projects Section",
      fields: {
        columns: {
          type: "select",
          label: "Columns",
          options: [
            { label: "1 Column", value: 1 },
            { label: "2 Columns", value: 2 },
            { label: "3 Columns", value: 3 },
            { label: "4 Columns", value: 4 },
          ]
        },
      },
      defaultProps: {
        columns: 3,
      },
      render: ({ columns }) => {
        return <ProjectsComponent columns={columns} />;
      },
    },
    Skills: {
      label: "Skills Section",
      fields: {},
      render: () => {
        return <SkillsComponent />;
      },
    },
    Contact: {
      label: "Contact Section",
      fields: {},
      render: () => {
        return <ContactComponent />;
      },
    },
    Pricing: {
      label: "Pricing Section",
      fields: {},
      render: () => {
        return <PricingComponent />;
      },
    },
    Gallery: {
      label: "Image Gallery",
      fields: {
        imageCount: {
          type: "number",
          label: "Number of Images",
          min: 3,
          max: 12,
        },
      },
      defaultProps: {
        imageCount: 6,
      },
      render: ({ imageCount }) => {
        return <GalleryComponent imageCount={imageCount} />;
      },
    },
  },
};

// ============================================
// INITIAL DATA
// ============================================

const initialData: Data = {
  content: [
    {
      type: "Hero",
      props: {
        id: "hero-1",
        name: "Jane Smith",
        title: "Product Designer & Developer",
        bgColor: "#8B5CF6",
      },
    },
    {
      type: "About",
      props: {
        id: "about-1",
        text: "I'm a creative professional who loves building beautiful and functional digital experiences that make a difference.",
      },
    },
    {
      type: "Projects",
      props: {
        id: "projects-1",
        columns: 3,
      },
    },
  ],
  root: {},
};

// ============================================
// MAIN PUCK PROTOTYPE COMPONENT
// ============================================

export default function PuckPrototype() {
  const [selectedTemplate, setSelectedTemplate] = React.useState("minimalist");

  const handleSave = (data: Data) => {
    const exportData = {
      template: selectedTemplate,
      layout: data,
      timestamp: new Date().toISOString(),
      note: "This is a layout template. Each section will use the design of your chosen template style."
    };
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-layout-${selectedTemplate}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const templates = [
    { id: "minimalist", name: "Minimalist", color: "#000000", desc: "Clean & Simple" },
    { id: "dark-mode", name: "Dark Mode", color: "#1A1A2E", desc: "Modern & Sleek" },
    { id: "bold-typography", name: "Bold Typography", color: "#FF006E", desc: "Eye-Catching" },
    { id: "neo-brutalist", name: "Neo Brutalist", color: "#FFFF00", desc: "Unique & Bold" },
  ];

  return (
    <div className="space-y-6">
      {/* Template Selection Banner */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="p-4 bg-blue-500 text-white rounded-2xl shadow-lg flex-shrink-0">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                📐 Building Your Layout Template
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300">
                You're creating the <strong className="text-blue-600 dark:text-blue-400">structure</strong> of your portfolio.
                Each section will use the <strong className="text-purple-600 dark:text-purple-400">design style</strong> from your chosen template.
              </p>
            </div>

            {/* Template Selector */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                Choose Your Design Template:
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`group p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-white dark:bg-gray-800 shadow-2xl scale-105 ring-4 ring-blue-500/30'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:scale-102'
                    }`}
                  >
                    <div
                      className="w-full h-16 rounded-lg mb-3 shadow-inner transition-transform group-hover:scale-105"
                      style={{ backgroundColor: template.color }}
                    />
                    <p className="font-bold text-sm mb-1">{template.name}</p>
                    <p className="text-xs text-muted-foreground">{template.desc}</p>
                    {selectedTemplate === template.id && (
                      <div className="mt-2 flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-bold">
                        <span>✓</span> Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>{templates.find(t => t.id === selectedTemplate)?.name}</strong> style will be applied to all sections
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Puck Editor */}
      <div className="border-2 border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-xl">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 px-6 py-4 border-b-2 border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Layout Builder</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Drag sections from the left. Hover to see drag handles. Click "Publish" when done!
              </p>
            </div>
          </div>
        </div>
        <div className="h-[700px] overflow-auto">
          <Puck
            config={config}
            data={initialData}
            onPublish={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
