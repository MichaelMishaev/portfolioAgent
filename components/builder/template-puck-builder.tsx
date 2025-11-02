"use client";

import { Puck, type Data, type Config } from "@measured/puck";
import "@measured/puck/puck.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical, User, Code, Briefcase, Mail, DollarSign, Image as ImageIcon, Sparkles } from "lucide-react";
import { type TemplateConfig } from "@/lib/template-registry";

// ============================================
// TEMPLATE-AWARE COMPONENTS
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

// Hero Component with Template Styling
const HeroComponent = ({
  name,
  title,
  templateStyle
}: {
  name: string;
  title: string;
  templateStyle: TemplateStyleProps;
}) => {
  return (
    <div className="relative group">
      {/* Drag Handle */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="p-2 bg-blue-500 text-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Hero Content with Template Colors */}
      <div
        style={{
          backgroundColor: templateStyle.colors.primary,
          fontFamily: templateStyle.fonts.heading
        }}
        className="relative overflow-hidden rounded-2xl p-12 md:p-16 shadow-xl"
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${templateStyle.colors.accent}20` }}
        ></div>

        <div className="relative z-10 text-center space-y-4">
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
            className="mt-6 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
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

// About Component with Template Styling
const AboutComponent = ({
  text,
  templateStyle
}: {
  text: string;
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

// Projects Component with Template Styling
const ProjectsComponent = ({
  columns,
  templateStyle
}: {
  columns: number;
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
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
                style={{ borderColor: `${templateStyle.colors.accent}20`, borderWidth: '1px', borderStyle: 'solid' }}
              >
                <div
                  className="w-full h-48 flex items-center justify-center"
                  style={{ backgroundColor: `${templateStyle.colors.primary}10` }}
                >
                  <ImageIcon className="w-12 h-12" style={{ color: `${templateStyle.colors.primary}40` }} />
                </div>
                <div className="p-4">
                  <h4
                    className="font-bold text-lg mb-2"
                    style={{
                      color: templateStyle.colors.primary,
                      fontFamily: templateStyle.fonts.heading
                    }}
                  >
                    Project {i}
                  </h4>
                  <p
                    className="text-sm"
                    style={{ fontFamily: templateStyle.fonts.body }}
                  >
                    Project description goes here
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Skills Component with Template Styling
const SkillsComponent = ({
  templateStyle
}: {
  templateStyle: TemplateStyleProps;
}) => {
  const skills = ["React", "TypeScript", "Node.js", "Design", "UI/UX"];

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
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
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

// Contact Component with Template Styling
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
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: `${templateStyle.colors.accent}40`,
                fontFamily: templateStyle.fonts.body
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: `${templateStyle.colors.accent}40`,
                fontFamily: templateStyle.fonts.body
              }}
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: `${templateStyle.colors.accent}40`,
                fontFamily: templateStyle.fonts.body
              }}
            />
            <button
              className="w-full px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
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

// Pricing Component with Template Styling
const PricingComponent = ({
  templateStyle
}: {
  templateStyle: TemplateStyleProps;
}) => {
  const plans = ["Basic", "Pro", "Enterprise"];

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
                key={plan}
                className="p-6 rounded-xl text-center hover:scale-105 transition-transform"
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
                  {plan}
                </h4>
                <p
                  className="text-3xl font-bold mb-4"
                  style={{ color: templateStyle.colors.accent }}
                >
                  $99
                </p>
                <button
                  className="w-full px-6 py-2 rounded-lg font-medium transition-all"
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

export function createTemplateConfig(template: TemplateConfig): Config {
  const templateStyle: TemplateStyleProps = {
    colors: template.colors,
    fonts: template.fonts
  };

  return {
    components: {
      Hero: {
        fields: {
          name: { type: "text" },
          title: { type: "text" },
        },
        defaultProps: {
          name: "Your Name",
          title: "Your Professional Title",
        },
        render: ({ name, title }) => (
          <HeroComponent name={name} title={title} templateStyle={templateStyle} />
        ),
      },
      About: {
        fields: {
          text: { type: "textarea" },
        },
        defaultProps: {
          text: "Tell your story here. Share your background, experience, and what makes you unique...",
        },
        render: ({ text }) => (
          <AboutComponent text={text} templateStyle={templateStyle} />
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
        },
        render: ({ columns }) => (
          <ProjectsComponent columns={columns} templateStyle={templateStyle} />
        ),
      },
      Skills: {
        render: () => <SkillsComponent templateStyle={templateStyle} />,
      },
      Contact: {
        render: () => <ContactComponent templateStyle={templateStyle} />,
      },
      Pricing: {
        render: () => <PricingComponent templateStyle={templateStyle} />,
      },
    },
  };
}

// ============================================
// MAIN COMPONENT
// ============================================

export function TemplatePuckBuilder({ template }: { template: TemplateConfig }) {
  const config = createTemplateConfig(template);

  const initialData: Data = {
    content: [
      { type: "Hero", props: { name: "John Doe", title: "Full Stack Developer" } },
      { type: "About", props: { text: "I'm a passionate developer with 5 years of experience building amazing web applications." } },
      { type: "Projects", props: { columns: 3 } },
    ],
    root: { props: {} },
  };

  const handleSave = (data: Data) => {
    const exportData = {
      template: template.id,
      layout: data,
      timestamp: new Date().toISOString(),
      templateInfo: {
        name: template.name,
        colors: template.colors,
        fonts: template.fonts
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

  return (
    <div className="h-screen">
      {/* Template Info Banner */}
      <div
        className="p-4 text-center border-b"
        style={{
          backgroundColor: `${template.colors.primary}10`,
          borderBottomColor: `${template.colors.accent}30`
        }}
      >
        <h2
          className="text-xl font-bold mb-1"
          style={{
            color: template.colors.primary,
            fontFamily: template.fonts.heading
          }}
        >
          Building with: {template.name}
        </h2>
        <p className="text-sm opacity-70">
          Drag sections to reorder • Add new sections from the left panel • Edit content in the right panel
        </p>
      </div>

      <Puck
        config={config}
        data={initialData}
        onPublish={handleSave}
      />
    </div>
  );
}
