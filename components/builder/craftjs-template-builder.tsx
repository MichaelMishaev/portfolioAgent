"use client";

import { Editor, Frame, Element, useNode, useEditor } from "@craftjs/core";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Eye, Trash2, Settings } from "lucide-react";
import type { TemplateConfig } from "@/lib/template-registry";

// ============================================
// CRAFT.JS USER COMPONENTS
// ============================================

interface HeroProps {
  name: string;
  title: string;
  imageUrl?: string;
  backgroundColor: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  subtitleColor: string;
  padding: number;
  fontSize: number;
  subtitleSize: number;
}

const HeroComponent = ({
  name,
  title,
  imageUrl,
  backgroundColor = "#667eea",
  gradientFrom = "#667eea",
  gradientTo = "#764ba2",
  textColor = "#ffffff",
  subtitleColor = "#ffffff",
  padding = 80,
  fontSize = 48,
  subtitleSize = 24,
}: HeroProps) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { actions: editorActions } = useEditor();

  const backgroundStyle = imageUrl
    ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` };

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className={`relative text-center border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
      style={{
        ...backgroundStyle,
        padding: `${padding}px`,
      }}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <button
            onClick={() => editorActions.delete(id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1 shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1
          className="font-bold mb-4"
          style={{
            color: textColor,
            fontSize: `${fontSize}px`,
          }}
        >
          {name}
        </h1>
        <p
          style={{
            color: subtitleColor,
            fontSize: `${subtitleSize}px`,
            opacity: 0.9,
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

HeroComponent.craft = {
  displayName: "Hero",
  props: {
    name: "John Doe",
    title: "Full Stack Developer & Designer",
    imageUrl: "",
    backgroundColor: "#667eea",
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    textColor: "#ffffff",
    subtitleColor: "#ffffff",
    padding: 80,
    fontSize: 48,
    subtitleSize: 24,
  },
  related: {
    settings: HeroSettings,
  },
};

function HeroSettings() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-6 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Content Section */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">Content</h4>
        <div>
          <Label className="text-sm font-medium">Name</Label>
          <input
            type="text"
            value={props.name}
            onChange={(e) => setProp((props: HeroProps) => (props.name = e.target.value))}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">Title</Label>
          <input
            type="text"
            value={props.title}
            onChange={(e) => setProp((props: HeroProps) => (props.title = e.target.value))}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">Background Image URL (optional)</Label>
          <input
            type="text"
            value={props.imageUrl || ""}
            onChange={(e) => setProp((props: HeroProps) => (props.imageUrl = e.target.value))}
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Colors Section */}
      <div className="space-y-4 pt-4 border-t">
        <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">Colors</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm font-medium">Gradient From</Label>
            <div className="flex gap-2 mt-1">
              <input
                type="color"
                value={props.gradientFrom}
                onChange={(e) => setProp((props: HeroProps) => (props.gradientFrom = e.target.value))}
                className="w-12 h-10 rounded border cursor-pointer"
              />
              <input
                type="text"
                value={props.gradientFrom}
                onChange={(e) => setProp((props: HeroProps) => (props.gradientFrom = e.target.value))}
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">Gradient To</Label>
            <div className="flex gap-2 mt-1">
              <input
                type="color"
                value={props.gradientTo}
                onChange={(e) => setProp((props: HeroProps) => (props.gradientTo = e.target.value))}
                className="w-12 h-10 rounded border cursor-pointer"
              />
              <input
                type="text"
                value={props.gradientTo}
                onChange={(e) => setProp((props: HeroProps) => (props.gradientTo = e.target.value))}
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">Text Color</Label>
            <div className="flex gap-2 mt-1">
              <input
                type="color"
                value={props.textColor}
                onChange={(e) => setProp((props: HeroProps) => (props.textColor = e.target.value))}
                className="w-12 h-10 rounded border cursor-pointer"
              />
              <input
                type="text"
                value={props.textColor}
                onChange={(e) => setProp((props: HeroProps) => (props.textColor = e.target.value))}
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">Subtitle Color</Label>
            <div className="flex gap-2 mt-1">
              <input
                type="color"
                value={props.subtitleColor}
                onChange={(e) => setProp((props: HeroProps) => (props.subtitleColor = e.target.value))}
                className="w-12 h-10 rounded border cursor-pointer"
              />
              <input
                type="text"
                value={props.subtitleColor}
                onChange={(e) => setProp((props: HeroProps) => (props.subtitleColor = e.target.value))}
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography Section */}
      <div className="space-y-4 pt-4 border-t">
        <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">Typography</h4>
        <div>
          <Label className="text-sm font-medium">Name Font Size: {props.fontSize}px</Label>
          <input
            type="range"
            min="24"
            max="96"
            value={props.fontSize}
            onChange={(e) => setProp((props: HeroProps) => (props.fontSize = parseInt(e.target.value)))}
            className="w-full mt-2"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">Subtitle Font Size: {props.subtitleSize}px</Label>
          <input
            type="range"
            min="14"
            max="48"
            value={props.subtitleSize}
            onChange={(e) => setProp((props: HeroProps) => (props.subtitleSize = parseInt(e.target.value)))}
            className="w-full mt-2"
          />
        </div>
      </div>

      {/* Layout Section */}
      <div className="space-y-4 pt-4 border-t">
        <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">Layout</h4>
        <div>
          <Label className="text-sm font-medium">Padding: {props.padding}px</Label>
          <input
            type="range"
            min="20"
            max="200"
            value={props.padding}
            onChange={(e) => setProp((props: HeroProps) => (props.padding = parseInt(e.target.value)))}
            className="w-full mt-2"
          />
        </div>
      </div>
    </div>
  );
}

interface AboutProps {
  text: string;
  imageUrl?: string;
}

const AboutComponent = ({ text, imageUrl }: AboutProps) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { actions: editorActions } = useEditor();

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className={`relative p-12 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <button
            onClick={() => editorActions.delete(id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {imageUrl && (
          <img src={imageUrl} alt="About" className="rounded-lg w-full h-64 object-cover" />
        )}
        <div>
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
};

AboutComponent.craft = {
  displayName: "About",
  props: {
    text: "I'm a passionate developer with 5 years of experience building amazing web applications.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
  },
  related: {
    settings: AboutSettings,
  },
};

function AboutSettings() {
  const {
    actions: { setProp },
    text,
  } = useNode((node) => ({
    text: node.data.props.text,
  }));

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label>About Text</Label>
        <textarea
          value={text}
          onChange={(e) => setProp((props: AboutProps) => (props.text = e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
        />
      </div>
    </div>
  );
}

interface SkillsProps {
  skills: string[];
}

const SkillsComponent = ({ skills }: SkillsProps) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { actions: editorActions } = useEditor();

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className={`relative p-12 bg-gray-50 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <button
            onClick={() => editorActions.delete(id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills & Expertise</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

SkillsComponent.craft = {
  displayName: "Skills",
  props: {
    skills: ["React", "TypeScript", "Node.js", "Python", "UI/UX Design", "GraphQL", "AWS", "Docker"],
  },
};

interface ProjectsProps {
  projects: Array<{ title: string; description: string; imageUrl?: string }>;
}

const ProjectsComponent = ({ projects }: ProjectsProps) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { actions: editorActions } = useEditor();

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className={`relative p-12 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <button
            onClick={() => editorActions.delete(id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ProjectsComponent.craft = {
  displayName: "Projects",
  props: {
    projects: [
      {
        title: "E-Commerce Platform",
        description: "Built a full-stack e-commerce platform with React and Node.js",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      },
      {
        title: "Mobile App",
        description: "Developed a cross-platform mobile app using React Native",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      },
    ],
  },
};

interface ContactProps {
  email: string;
  phone: string;
  location: string;
}

const ContactComponent = ({ email, phone, location }: ContactProps) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { actions: editorActions } = useEditor();

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className={`relative p-12 bg-gray-50 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <button
            onClick={() => editorActions.delete(id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 mb-1">Email</p>
            <p className="text-lg font-medium">{email}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Phone</p>
            <p className="text-lg font-medium">{phone}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Location</p>
            <p className="text-lg font-medium">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactComponent.craft = {
  displayName: "Contact",
  props: {
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  },
};

interface PricingProps {
  plans: Array<{ name: string; price: string; features: string[] }>;
}

const PricingComponent = ({ plans }: PricingProps) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { actions: editorActions } = useEditor();

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className={`relative p-12 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <button
            onClick={() => editorActions.delete(id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-600">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

PricingComponent.craft = {
  displayName: "Pricing",
  props: {
    plans: [
      {
        name: "Basic",
        price: "$99/mo",
        features: ["5 Projects", "10GB Storage", "Basic Support"],
      },
      {
        name: "Pro",
        price: "$199/mo",
        features: ["Unlimited Projects", "100GB Storage", "Priority Support", "Advanced Analytics"],
      },
      {
        name: "Enterprise",
        price: "$499/mo",
        features: ["Unlimited Everything", "Custom Solutions", "24/7 Support", "Dedicated Manager"],
      },
    ],
  },
};

// Container component
const Container = ({ children }: { children: React.ReactNode }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => ref && connect(drag(ref))} className="min-h-[100px] p-4">
      {children}
    </div>
  );
};

Container.craft = {
  displayName: "Container",
};

// ============================================
// SETTINGS PANEL
// ============================================

const SettingsPanel = () => {
  const { currentNodeId, settings, displayName, actions } = useEditor((state) => {
    // Get the selected node ID - it's a Set, so we need to get the first item
    const selectedNodeIds = state.events.selected;
    const currentNodeId = selectedNodeIds && selectedNodeIds.size > 0
      ? Array.from(selectedNodeIds)[0]
      : null;

    if (currentNodeId && state.nodes[currentNodeId]) {
      const node = state.nodes[currentNodeId];

      // Access the settings component from node.related
      const settings = node.related && node.related.settings;

      // Get display name from various sources
      const displayName = node.data.displayName || node.data.name || 'Component';

      return {
        currentNodeId,
        settings,
        displayName,
      };
    }

    return {
      currentNodeId: null,
      settings: null,
      displayName: '',
    };
  });

  return (
    <div className="w-80 bg-white border-l h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Settings</h3>
      </div>
      {currentNodeId ? (
        <div>
          <div className="p-4 bg-gray-50 border-b">
            <p className="text-sm font-medium">{displayName}</p>
          </div>
          {settings && React.createElement(settings)}
          <div className="p-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => actions.delete(currentNodeId)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Component
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          <p>Select a component to edit</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// TOOLBOX
// ============================================

const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div className="w-64 bg-white border-r h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Components</h3>
      </div>
      <div className="p-4 space-y-2">
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={HeroComponent} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors"
        >
          <div className="font-medium">Hero</div>
          <div className="text-xs text-gray-500">Header section</div>
        </button>
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={AboutComponent} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors"
        >
          <div className="font-medium">About</div>
          <div className="text-xs text-gray-500">About section</div>
        </button>
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={ProjectsComponent} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors"
        >
          <div className="font-medium">Projects</div>
          <div className="text-xs text-gray-500">Project showcase</div>
        </button>
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={SkillsComponent} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors"
        >
          <div className="font-medium">Skills</div>
          <div className="text-xs text-gray-500">Skills showcase</div>
        </button>
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={ContactComponent} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors"
        >
          <div className="font-medium">Contact</div>
          <div className="text-xs text-gray-500">Contact information</div>
        </button>
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={PricingComponent} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors"
        >
          <div className="font-medium">Pricing</div>
          <div className="text-xs text-gray-500">Pricing plans</div>
        </button>
      </div>
    </div>
  );
};

// ============================================
// MAIN BUILDER
// ============================================

export function CraftJSTemplateBuilder({ template }: { template: TemplateConfig }) {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gallery</span>
          </Link>
          <div className="text-lg font-semibold">Building: {template.name}</div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/templates/${template.id}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            <Eye className="w-4 h-4" />
            View Demo
          </Link>
        </div>
      </div>

      {/* Editor */}
      <Editor
        resolver={{
          HeroComponent,
          AboutComponent,
          ProjectsComponent,
          SkillsComponent,
          ContactComponent,
          PricingComponent,
          Container,
        }}
      >
        <div className="flex-1 flex overflow-hidden">
          <Toolbox />
          <div className="flex-1 overflow-auto bg-gray-100">
            <Frame>
              <Element is={Container} canvas>
                <Element
                  is={HeroComponent}
                  name="John Doe"
                  title="Full Stack Developer & Designer"
                  imageUrl=""
                  gradientFrom="#667eea"
                  gradientTo="#764ba2"
                  textColor="#ffffff"
                  subtitleColor="#ffffff"
                  padding={80}
                  fontSize={48}
                  subtitleSize={24}
                  canvas
                />
                <Element
                  is={AboutComponent}
                  text="I'm a passionate developer with 5 years of experience building amazing web applications. I specialize in creating user-friendly interfaces and scalable backend systems."
                  imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
                  canvas
                />
                <Element
                  is={SkillsComponent}
                  skills={["React", "TypeScript", "Node.js", "Python", "UI/UX Design", "GraphQL", "AWS", "Docker"]}
                  canvas
                />
              </Element>
            </Frame>
          </div>
          <SettingsPanel />
        </div>
      </Editor>
    </div>
  );
}
