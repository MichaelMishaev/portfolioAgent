"use client";

import { Puck, type Data, type Config } from "@measured/puck";
import "@measured/puck/puck.css";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GripVertical, User, Code, Briefcase, Mail, DollarSign, Sparkles, Palette, Type } from "lucide-react";
import { FiExternalLink } from "react-icons/fi";
import { type TemplateConfig } from "@/lib/template-registry";

// ============================================
// SAMPLE PROJECT IMAGES (varied and professional)
// ============================================

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", // Analytics Dashboard
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", // Charts & Graphs
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop", // Website Design
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop", // Laptop Code
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop", // Programming
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop", // Workspace
  "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800&h=600&fit=crop", // Mobile App
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop", // E-commerce
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop", // Business
];

// ============================================
// TYPES
// ============================================

type TemplateStyleProps = {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
};

// ============================================
// HERO COMPONENT
// ============================================

const HeroComponent = ({
  name,
  title,
  imageUrl,
  templateStyle
}: {
  name: string;
  title: string;
  imageUrl?: string;
  templateStyle: TemplateStyleProps;
}) => {
  return (
    <div className="relative group">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="p-2 bg-blue-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <div
        style={{
          backgroundColor: templateStyle.colors.primary,
          fontFamily: templateStyle.fonts.heading
        }}
        className="relative overflow-hidden rounded-2xl shadow-xl"
      >
        {imageUrl && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${templateStyle.colors.accent}20` }}
        />

        <div className="relative z-10 p-12 md:p-16 text-center space-y-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full text-sm font-medium mb-4"
            style={{
              backgroundColor: `${templateStyle.colors.secondary}30`,
              color: templateStyle.colors.secondary === '#FFFFFF' || templateStyle.colors.secondary === '#F5F5F5' ? templateStyle.colors.primary : '#FFFFFF'
            }}
          >
            <Sparkles className="w-4 h-4" />
            Hero Section
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight"
            style={{
              color: templateStyle.colors.secondary === '#FFFFFF' || templateStyle.colors.secondary === '#F5F5F5' ? '#FFFFFF' : templateStyle.colors.secondary
            }}
          >
            {name}
          </h1>

          <p
            className="text-xl md:text-2xl max-w-2xl mx-auto"
            style={{
              color: templateStyle.colors.secondary === '#FFFFFF' || templateStyle.colors.secondary === '#F5F5F5' ? 'rgba(255,255,255,0.9)' : `${templateStyle.colors.secondary}90`,
              fontFamily: templateStyle.fonts.body
            }}
          >
            {title}
          </p>

          <button
            className="mt-6 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
            style={{
              backgroundColor: templateStyle.colors.accent,
              color: '#FFFFFF'
            }}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// ABOUT COMPONENT
// ============================================

const AboutComponent = ({
  text,
  imageUrl,
  templateStyle
}: {
  text: string;
  imageUrl?: string;
  templateStyle: TemplateStyleProps;
}) => {
  return (
    <div className="relative group">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="p-2 bg-green-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <Card
        className="hover:shadow-2xl transition-all duration-300 border-2 overflow-hidden"
        style={{ borderColor: `${templateStyle.colors.accent}30` }}
      >
        {imageUrl && (
          <div className="w-full h-64 overflow-hidden">
            <img
              src={imageUrl}
              alt="About"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <CardHeader>
          <CardTitle
            className="flex items-center gap-3 text-2xl"
            style={{
              color: templateStyle.colors.primary,
              fontFamily: templateStyle.fonts.heading
            }}
          >
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${templateStyle.colors.accent}20` }}
            >
              <User className="w-6 h-6" style={{ color: templateStyle.colors.accent }} />
            </div>
            About Me
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className="text-base leading-relaxed"
            style={{ fontFamily: templateStyle.fonts.body }}
          >
            {text}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// ============================================
// PROJECTS COMPONENT (with varied images)
// ============================================

const ProjectsComponent = ({
  columns,
  projects,
  templateStyle
}: {
  columns: number;
  projects: Array<{title: string; description: string; imageUrl: string}>;
  templateStyle: TemplateStyleProps;
}) => {
  const gridClass = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4"
  }[columns] || "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="relative group">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="p-2 bg-purple-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <Card
        className="hover:shadow-2xl transition-all duration-300 border-2"
        style={{ borderColor: `${templateStyle.colors.accent}30` }}
      >
        <CardHeader>
          <CardTitle
            className="flex items-center gap-3 text-2xl"
            style={{
              color: templateStyle.colors.primary,
              fontFamily: templateStyle.fonts.heading
            }}
          >
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${templateStyle.colors.accent}20` }}
            >
              <Code className="w-6 h-6" style={{ color: templateStyle.colors.accent }} />
            </div>
            My Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${gridClass} gap-6`}>
            {projects.map((project, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 group/card"
                style={{ borderColor: `${templateStyle.colors.accent}20`, borderWidth: '1px', borderStyle: 'solid' }}
              >
                <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-900">
                  <h4
                    className="font-bold text-lg mb-2"
                    style={{
                      color: templateStyle.colors.primary,
                      fontFamily: templateStyle.fonts.heading
                    }}
                  >
                    {project.title}
                  </h4>
                  <p
                    className="text-sm opacity-80"
                    style={{ fontFamily: templateStyle.fonts.body }}
                  >
                    {project.description}
                  </p>
                  <button
                    className="mt-4 px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: `${templateStyle.colors.accent}20`,
                      color: templateStyle.colors.primary
                    }}
                  >
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ============================================
// SKILLS COMPONENT
// ============================================

const SkillsComponent = ({
  skills,
  templateStyle
}: {
  skills: string[];
  templateStyle: TemplateStyleProps;
}) => {
  return (
    <div className="relative group">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="p-2 bg-orange-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <Card
        className="hover:shadow-2xl transition-all duration-300 border-2"
        style={{ borderColor: `${templateStyle.colors.accent}30` }}
      >
        <CardHeader>
          <CardTitle
            className="flex items-center gap-3 text-2xl"
            style={{
              color: templateStyle.colors.primary,
              fontFamily: templateStyle.fonts.heading
            }}
          >
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${templateStyle.colors.accent}20` }}
            >
              <Briefcase className="w-6 h-6" style={{ color: templateStyle.colors.accent }} />
            </div>
            Skills & Expertise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-sm"
                style={{
                  backgroundColor: `${templateStyle.colors.accent}20`,
                  color: templateStyle.colors.primary,
                  fontFamily: templateStyle.fonts.body
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ============================================
// CONTACT COMPONENT
// ============================================

const ContactComponent = ({
  templateStyle
}: {
  templateStyle: TemplateStyleProps;
}) => {
  return (
    <div className="relative group">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="p-2 bg-pink-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <Card
        className="hover:shadow-2xl transition-all duration-300 border-2"
        style={{ borderColor: `${templateStyle.colors.accent}30` }}
      >
        <CardHeader>
          <CardTitle
            className="flex items-center gap-3 text-2xl"
            style={{
              color: templateStyle.colors.primary,
              fontFamily: templateStyle.fonts.heading
            }}
          >
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${templateStyle.colors.accent}20` }}
            >
              <Mail className="w-6 h-6" style={{ color: templateStyle.colors.accent }} />
            </div>
            Get In Touch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: `${templateStyle.colors.accent}40`,
                fontFamily: templateStyle.fonts.body
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: `${templateStyle.colors.accent}40`,
                fontFamily: templateStyle.fonts.body
              }}
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: `${templateStyle.colors.accent}40`,
                fontFamily: templateStyle.fonts.body
              }}
            />
            <button
              className="w-full px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
              style={{
                backgroundColor: templateStyle.colors.accent,
                color: '#FFFFFF'
              }}
            >
              Send Message
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// ============================================
// PRICING COMPONENT
// ============================================

const PricingComponent = ({
  templateStyle
}: {
  templateStyle: TemplateStyleProps;
}) => {
  const plans = [
    { name: "Basic", price: "$49", features: ["Feature 1", "Feature 2", "Feature 3"] },
    { name: "Pro", price: "$99", features: ["Everything in Basic", "Feature 4", "Feature 5", "Priority Support"] },
    { name: "Enterprise", price: "$199", features: ["Everything in Pro", "Custom Solutions", "Dedicated Account Manager"] }
  ];

  return (
    <div className="relative group">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="p-2 bg-yellow-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <Card
        className="hover:shadow-2xl transition-all duration-300 border-2"
        style={{ borderColor: `${templateStyle.colors.accent}30` }}
      >
        <CardHeader>
          <CardTitle
            className="flex items-center gap-3 text-2xl"
            style={{
              color: templateStyle.colors.primary,
              fontFamily: templateStyle.fonts.heading
            }}
          >
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${templateStyle.colors.accent}20` }}
            >
              <DollarSign className="w-6 h-6" style={{ color: templateStyle.colors.accent }} />
            </div>
            Pricing Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className="p-6 rounded-xl text-center hover:scale-105 transition-all duration-300 shadow-lg"
                style={{
                  border: `2px solid ${templateStyle.colors.accent}30`,
                  backgroundColor: index === 1 ? `${templateStyle.colors.accent}10` : 'transparent'
                }}
              >
                <h4
                  className="font-bold text-xl mb-2"
                  style={{
                    color: templateStyle.colors.primary,
                    fontFamily: templateStyle.fonts.heading
                  }}
                >
                  {plan.name}
                </h4>
                <p
                  className="text-4xl font-bold mb-4"
                  style={{ color: templateStyle.colors.accent }}
                >
                  {plan.price}
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ fontFamily: templateStyle.fonts.body }}>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full px-6 py-2 rounded-lg font-medium transition-all hover:scale-105 shadow-md"
                  style={{
                    backgroundColor: index === 1 ? templateStyle.colors.accent : 'transparent',
                    color: index === 1 ? '#FFFFFF' : templateStyle.colors.accent,
                    border: `2px solid ${templateStyle.colors.accent}`
                  }}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ============================================
// PUCK CONFIGURATION
// ============================================

export function createEnhancedConfig(template: TemplateConfig, customStyle?: TemplateStyleProps): Config {
  const templateStyle: TemplateStyleProps = customStyle || {
    colors: template.colors,
    fonts: template.fonts
  };

  return {
    components: {
      Hero: {
        fields: {
          name: { type: "text" },
          title: { type: "text" },
          imageUrl: { type: "text", label: "Background Image URL (optional)" },
        },
        defaultProps: {
          name: "Your Name",
          title: "Your Professional Title",
          imageUrl: "",
        },
        render: ({ name, title, imageUrl }) => (
          <HeroComponent name={name} title={title} imageUrl={imageUrl} templateStyle={templateStyle} />
        ),
      },
      About: {
        fields: {
          text: { type: "textarea" },
          imageUrl: { type: "text", label: "Image URL (optional)" },
        },
        defaultProps: {
          text: "Tell your story here. Share your background, experience, and what makes you unique...",
          imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        },
        render: ({ text, imageUrl }) => (
          <AboutComponent text={text} imageUrl={imageUrl} templateStyle={templateStyle} />
        ),
      },
      Projects: {
        fields: {
          columns: {
            type: "select",
            options: [
              { label: "1 Column", value: 1 },
              { label: "2 Columns", value: 2 },
              { label: "3 Columns", value: 3 },
              { label: "4 Columns", value: 4 },
            ],
          },
        },
        defaultProps: {
          columns: 3,
          projects: [
            { title: "E-Commerce Platform", description: "Full-stack web application with payment integration", imageUrl: PROJECT_IMAGES[0] },
            { title: "Analytics Dashboard", description: "Real-time data visualization and reporting tool", imageUrl: PROJECT_IMAGES[1] },
            { title: "Mobile App Design", description: "iOS and Android app UI/UX design", imageUrl: PROJECT_IMAGES[2] },
          ],
        },
        render: ({ columns, projects }) => (
          <ProjectsComponent columns={columns} projects={projects} templateStyle={templateStyle} />
        ),
      },
      Skills: {
        fields: {},
        defaultProps: {
          skills: ["React", "TypeScript", "Node.js", "Python", "UI/UX Design", "GraphQL", "AWS", "Docker"],
        },
        render: ({ skills }) => <SkillsComponent skills={skills} templateStyle={templateStyle} />,
      },
      Contact: {
        fields: {},
        defaultProps: {},
        render: () => <ContactComponent templateStyle={templateStyle} />,
      },
      Pricing: {
        fields: {},
        defaultProps: {},
        render: () => <PricingComponent templateStyle={templateStyle} />,
      },
    },
  };
}

// ============================================
// MAIN ENHANCED BUILDER COMPONENT
// ============================================

export function EnhancedTemplateBuilder({ template }: { template: TemplateConfig }) {
  const [customColors, setCustomColors] = useState(template.colors);
  const [customFonts, setCustomFonts] = useState(template.fonts);
  const [showStylePanel, setShowStylePanel] = useState(false);

  const customStyle: TemplateStyleProps = {
    colors: customColors,
    fonts: customFonts
  };

  const config = createEnhancedConfig(template, customStyle);

  // Use useMemo to create a stable initialData reference
  const initialData: Data = useMemo(() => ({
    content: [
      {
        type: "Hero",
        props: { name: "John Doe", title: "Full Stack Developer & Designer", imageUrl: "" },
        id: "Hero-1"
      },
      {
        type: "About",
        props: {
          text: "I'm a passionate developer with 5 years of experience building amazing web applications. I specialize in creating user-friendly interfaces and scalable backend systems.",
          imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
        },
        id: "About-1"
      },
      {
        type: "Projects",
        props: {
          columns: 3,
          projects: [
            { title: "E-Commerce Platform", description: "Full-stack web application with payment integration", imageUrl: PROJECT_IMAGES[0] },
            { title: "Analytics Dashboard", description: "Real-time data visualization and reporting tool", imageUrl: PROJECT_IMAGES[1] },
            { title: "Mobile App Design", description: "iOS and Android app UI/UX design", imageUrl: PROJECT_IMAGES[2] },
          ]
        },
        id: "Projects-1"
      },
      {
        type: "Skills",
        props: { skills: ["React", "TypeScript", "Node.js", "Python", "UI/UX Design", "GraphQL", "AWS", "Docker"] },
        id: "Skills-1"
      },
    ],
    root: {
      props: { title: "Portfolio Page" }
    },
    zones: {}
  }), []);

  // Track if component has mounted and localStorage been cleared
  const [isReady, setIsReady] = useState(false);

  // Manage Puck data state
  const [puckData, setPuckData] = useState<Data>(initialData);

  // Clear localStorage SYNCHRONOUSLY on first render, BEFORE Puck mounts
  if (typeof window !== 'undefined' && !isReady) {
    const puckKey = `puck:${window.location.pathname}`;
    localStorage.removeItem(puckKey);
    console.log('🧹 Cleared localStorage for:', puckKey);
  }

  // Mark as ready after clearing localStorage
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Reset to initialData when template changes
  useEffect(() => {
    setPuckData(initialData);
  }, [template.id, initialData]);

  const handleSave = (data: Data) => {
    const exportData = {
      template: template.id,
      customStyle: {
        colors: customColors,
        fonts: customFonts
      },
      layout: data,
      timestamp: new Date().toISOString(),
      templateInfo: {
        name: template.name,
        originalColors: template.colors,
        originalFonts: template.fonts
      }
    };

    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-${template.id}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetToTemplate = () => {
    setCustomColors(template.colors);
    setCustomFonts(template.fonts);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Enhanced Header with Style Controls */}
      <div
        className="border-b shadow-sm"
        style={{
          backgroundColor: `${template.colors.primary}05`,
          borderBottomColor: `${template.colors.accent}30`
        }}
      >
        <div className="p-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2
              className="text-xl font-bold mb-1"
              style={{
                color: template.colors.primary,
                fontFamily: template.fonts.heading
              }}
            >
              Building: {template.name}
            </h2>
            <p className="text-sm opacity-70">
              Customize layout & styling • Changes apply in real-time
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={resetToTemplate} className="gap-2">
              Reset to Template
            </Button>
            <Button asChild variant="default" className="gap-2">
              <a href={template.demoPath} target="_blank" rel="noopener noreferrer">
                <FiExternalLink className="w-4 h-4" />
                View Demo
              </a>
            </Button>
          </div>
        </div>

      </div>

      {/* Main Content Area - Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Style Customization Panel - Always Visible */}
        <div className="w-80 border-r overflow-y-auto bg-white dark:bg-gray-900 flex-shrink-0 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5" style={{ color: template.colors.accent }} />
                Style Customization
              </h3>
            </div>

            {/* Colors Section */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground mb-3">Colors</h4>
              <div>
                  <Label className="text-xs">Primary Color</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={customColors.primary}
                      onChange={(e) => setCustomColors({ ...customColors, primary: e.target.value })}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={customColors.primary}
                      onChange={(e) => setCustomColors({ ...customColors, primary: e.target.value })}
                      className="flex-1 font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Secondary Color</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={customColors.secondary}
                      onChange={(e) => setCustomColors({ ...customColors, secondary: e.target.value })}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={customColors.secondary}
                      onChange={(e) => setCustomColors({ ...customColors, secondary: e.target.value })}
                      className="flex-1 font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Accent Color</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={customColors.accent}
                      onChange={(e) => setCustomColors({ ...customColors, accent: e.target.value })}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={customColors.accent}
                      onChange={(e) => setCustomColors({ ...customColors, accent: e.target.value })}
                      className="flex-1 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

            {/* Fonts Section */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground mb-3">Typography</h4>
              <div>
                  <Label className="text-xs">Heading Font</Label>
                  <select
                    value={customFonts.heading}
                    onChange={(e) => setCustomFonts({ ...customFonts, heading: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="Bebas Neue">Bebas Neue</option>
                    <option value="Space Grotesk">Space Grotesk</option>
                    <option value="Lora">Lora</option>
                  </select>
                </div>

                <div>
                  <Label className="text-xs">Body Font</Label>
                  <select
                    value={customFonts.body}
                    onChange={(e) => setCustomFonts({ ...customFonts, body: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Lora">Lora</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Roboto">Roboto</option>
                  </select>
                </div>
              </div>

            {/* Preview Section */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground mb-3">Live Preview</h4>
              <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: customColors.primary }}
                >
                  <h4
                    className="text-xl font-bold mb-2"
                    style={{
                      color: customColors.secondary,
                      fontFamily: customFonts.heading
                    }}
                  >
                    Heading Text
                  </h4>
                  <p
                    style={{
                      color: customColors.secondary,
                      fontFamily: customFonts.body,
                      opacity: 0.9
                    }}
                  >
                    This is body text
                  </p>
                  <button
                    className="mt-3 px-4 py-2 rounded-lg font-medium"
                    style={{ backgroundColor: customColors.accent, color: '#FFFFFF' }}
                  >
                    Button
                  </button>
                </div>
              </div>
            </div>
          </div>

        {/* Puck Editor - Right Side */}
        <div className="flex-1 overflow-hidden">
          {isReady ? (
            <Puck
              key={`${template.id}-${isReady}`}
              config={config}
              data={puckData}
              onChange={setPuckData}
              onPublish={handleSave}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">Loading Builder...</div>
                <div className="text-sm text-muted-foreground">Preparing fresh canvas</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
