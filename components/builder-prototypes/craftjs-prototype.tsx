"use client";

import { Editor, Frame, Element, useNode, useEditor } from "@craftjs/core";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Plus, Trash2, GripVertical, User, Briefcase, Code, Mail, DollarSign, Star } from "lucide-react";

// ============================================
// PORTFOLIO BUILDING BLOCKS (Draggable Sections)
// ============================================

// Hero Section Component
const HeroSection = ({ name = "Your Name", title = "Your Title", bgColor = "#3B82F6" }: any) => {
  const { connectors: { connect, drag }, selected, actions: { setProp } } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <div ref={(ref: any) => connect(drag(ref))} className="relative mb-4">
      <div
        style={{ backgroundColor: bgColor }}
        className="text-white p-12 rounded-lg text-center cursor-move border-2 border-transparent hover:border-blue-400 transition-all"
      >
        <div className="absolute top-2 left-2 text-white/60">
          <GripVertical className="w-5 h-5" />
        </div>
        <h1 className="text-4xl font-bold mb-2">{name}</h1>
        <p className="text-xl opacity-90">{title}</p>
      </div>
      {selected && (
        <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs font-semibold mb-2">✏️ Edit Hero Section</p>
          <div className="space-y-2">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setProp((props: any) => props.name = e.target.value)}
            />
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setProp((props: any) => props.title = e.target.value)}
            />
            <div className="flex items-center gap-2">
              <Label className="text-xs">Background:</Label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setProp((props: any) => props.bgColor = e.target.value)}
                className="w-12 h-8 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

HeroSection.craft = {
  displayName: "Hero Section",
  props: {
    name: "Your Name",
    title: "Your Title",
    bgColor: "#3B82F6"
  }
};

// About Section Component
const AboutSection = ({ text = "Tell your story here..." }: any) => {
  const { connectors: { connect, drag }, selected, actions: { setProp } } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <div ref={(ref: any) => connect(drag(ref))} className="relative mb-4">
      <Card className="cursor-move border-2 hover:border-blue-400 transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <User className="w-5 h-5" />
            About Me
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{text}</p>
        </CardContent>
      </Card>
      {selected && (
        <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs font-semibold mb-2">✏️ Edit About Section</p>
          <textarea
            className="w-full p-2 border rounded-md"
            rows={3}
            value={text}
            onChange={(e) => setProp((props: any) => props.text = e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

AboutSection.craft = {
  displayName: "About Section",
  props: { text: "Tell your story here..." }
};

// Projects Section Component
const ProjectsSection = ({ columns = 3 }: any) => {
  const { connectors: { connect, drag }, selected, actions: { setProp } } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4"
  }[columns] || "grid-cols-3";

  return (
    <div ref={(ref: any) => connect(drag(ref))} className="relative mb-4">
      <Card className="cursor-move border-2 hover:border-blue-400 transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <Code className="w-5 h-5" />
            Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${gridClass} gap-4`}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-muted rounded-lg">
                <div className="w-full h-32 bg-muted-foreground/20 rounded mb-2" />
                <h4 className="font-semibold">Project {i}</h4>
                <p className="text-sm text-muted-foreground">Description</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {selected && (
        <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs font-semibold mb-2">✏️ Edit Projects Layout</p>
          <Label>Columns: {columns}</Label>
          <input
            type="range"
            min="1"
            max="4"
            value={columns}
            onChange={(e) => setProp((props: any) => props.columns = parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

ProjectsSection.craft = {
  displayName: "Projects Section",
  props: { columns: 3 }
};

// Skills Section Component
const SkillsSection = () => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div ref={(ref: any) => connect(drag(ref))} className="relative mb-4">
      <Card className="cursor-move border-2 hover:border-blue-400 transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <Briefcase className="w-5 h-5" />
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Node.js", "Design", "UI/UX"].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

SkillsSection.craft = {
  displayName: "Skills Section"
};

// Contact Section Component
const ContactSection = () => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div ref={(ref: any) => connect(drag(ref))} className="relative mb-4">
      <Card className="cursor-move border-2 hover:border-blue-400 transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <Mail className="w-5 h-5" />
            Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Name" />
            <Input placeholder="Email" type="email" />
            <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="Message" />
            <Button>Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

ContactSection.craft = {
  displayName: "Contact Section"
};

// Pricing Section Component
const PricingSection = () => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div ref={(ref: any) => connect(drag(ref))} className="relative mb-4">
      <Card className="cursor-move border-2 hover:border-blue-400 transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <DollarSign className="w-5 h-5" />
            Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Basic", "Pro", "Enterprise"].map((plan) => (
              <div key={plan} className="p-4 border rounded-lg text-center">
                <h4 className="font-bold text-lg mb-2">{plan}</h4>
                <p className="text-2xl font-bold mb-4">$99</p>
                <Button variant="outline" className="w-full">Choose Plan</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

PricingSection.craft = {
  displayName: "Pricing Section"
};

// Container Component (for the canvas)
const Container = ({ children }: any) => {
  const { connectors: { connect } } = useNode();
  return (
    <div ref={(ref: any) => connect(ref)} className="min-h-[500px] p-6 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-muted/5">
      {children}
    </div>
  );
};

Container.craft = {
  displayName: "Container",
  rules: {
    canDrop: () => true,
  }
};

// ============================================
// ADD BUTTON COMPONENT
// ============================================

const AddButton = ({ component, label, icon }: any) => {
  const { connectors } = useEditor();

  return (
    <Button
      ref={(ref: any) => connectors.create(ref, component)}
      variant="outline"
      size="sm"
      className="w-full justify-start cursor-grab active:cursor-grabbing"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  );
};

// ============================================
// EXPORT BUTTON COMPONENT
// ============================================

const ExportButton = ({ onExport }: any) => {
  const { query } = useEditor();

  return (
    <Button
      variant="default"
      className="w-full"
      onClick={() => onExport(query)}
    >
      <Download className="w-4 h-4 mr-2" />
      Download Config
    </Button>
  );
};

// ============================================
// MAIN CRAFT.JS PROTOTYPE COMPONENT
// ============================================

export default function CraftJSPrototype() {
  const [enabled, setEnabled] = useState(true);

  const handleExport = (query: any) => {
    const json = query.serialize();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-design-craftjs-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Editor
      resolver={{
        Container,
        HeroSection,
        AboutSection,
        ProjectsSection,
        SkillsSection,
        ContactSection,
        PricingSection,
      }}
      enabled={enabled}
    >
      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Sidebar - Component Library */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📦 Available Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-muted-foreground mb-4">
                Drag these to the canvas →
              </p>

              <AddButton
                component={<HeroSection />}
                label="Hero Section"
                icon={<User className="w-4 h-4" />}
              />

              <AddButton
                component={<AboutSection />}
                label="About Section"
                icon={<User className="w-4 h-4" />}
              />

              <AddButton
                component={<ProjectsSection />}
                label="Projects"
                icon={<Code className="w-4 h-4" />}
              />

              <AddButton
                component={<SkillsSection />}
                label="Skills"
                icon={<Briefcase className="w-4 h-4" />}
              />

              <AddButton
                component={<PricingSection />}
                label="Pricing"
                icon={<DollarSign className="w-4 h-4" />}
              />

              <AddButton
                component={<ContactSection />}
                label="Contact"
                icon={<Mail className="w-4 h-4" />}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">⚙️ Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={enabled ? "default" : "outline"}
                className="w-full"
                onClick={() => setEnabled(!enabled)}
              >
                {enabled ? "✓ Editing Enabled" : "⚠ Editing Disabled"}
              </Button>

              <ExportButton onExport={handleExport} />
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-sm">💡 How to Use</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2 text-muted-foreground">
              <p>1. Drag sections from above to canvas</p>
              <p>2. Click a section to edit it</p>
              <p>3. Drag grip icon to reorder</p>
              <p>4. Download when done</p>
            </CardContent>
          </Card>
        </div>

        {/* Canvas Area */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🎨 Your Portfolio Preview</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Drag sections from sidebar. Click to edit. Reorder by dragging.
              </p>
            </CardHeader>
            <CardContent>
              <Frame>
                <Element is={Container} canvas>
                  <HeroSection name="John Doe" title="Full Stack Developer" bgColor="#8B5CF6" />
                  <AboutSection text="I'm a passionate developer with 5 years of experience building amazing web applications." />
                  <ProjectsSection columns={3} />
                </Element>
              </Frame>
            </CardContent>
          </Card>
        </div>
      </div>
    </Editor>
  );
}
