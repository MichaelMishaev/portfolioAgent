"use client";

import { Editor, Frame, Element, useNode, useEditor } from "@craftjs/core";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Eye, Trash2, Settings } from "lucide-react";
import type { TemplateConfig } from "@/lib/template-registry";

// Import touch polyfill for mobile drag & drop support
import "drag-drop-touch";

// Import Split-Screen editable components
import {
  SplitScreenHero,
  SplitScreenStats,
  SplitScreenSkills,
  SplitScreenContact,
} from "@/components/builder/split-screen-components";

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
  language?: 'en' | 'ru';
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
    backgroundColor: "#1E293B",
    gradientFrom: "#1E293B",
    gradientTo: "#06B6D4",
    textColor: "#ffffff",
    subtitleColor: "#ffffff",
    padding: 80,
    fontSize: 48,
    subtitleSize: 24,
    language: 'en',
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

  const language = props.language || 'en';

  const labels = {
    en: {
      content: 'Content',
      name: 'Name',
      title: 'Title',
      bgImage: 'Background Image URL (optional)',
      colors: 'Colors',
      gradientFrom: 'Gradient From',
      gradientTo: 'Gradient To',
      textColor: 'Text Color',
      subtitleColor: 'Subtitle Color',
      typography: 'Typography',
      nameFontSize: 'Name Font Size',
      subtitleFontSize: 'Subtitle Font Size',
      layout: 'Layout',
      padding: 'Padding',
    },
    ru: {
      content: 'Содержание',
      name: 'Имя',
      title: 'Заголовок',
      bgImage: 'URL фонового изображения (опционально)',
      colors: 'Цвета',
      gradientFrom: 'Градиент от',
      gradientTo: 'Градиент до',
      textColor: 'Цвет текста',
      subtitleColor: 'Цвет подзаголовка',
      typography: 'Типографика',
      nameFontSize: 'Размер шрифта имени',
      subtitleFontSize: 'Размер шрифта подзаголовка',
      layout: 'Макет',
      padding: 'Отступы',
    },
  };

  const t = labels[language];

  return (
    <div className="space-y-6 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Content Section */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">{t.content}</h4>
        <div>
          <Label className="text-sm font-medium">{t.name}</Label>
          <input
            type="text"
            value={props.name}
            onChange={(e) => setProp((props: HeroProps) => (props.name = e.target.value))}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">{t.title}</Label>
          <input
            type="text"
            value={props.title}
            onChange={(e) => setProp((props: HeroProps) => (props.title = e.target.value))}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">{t.bgImage}</Label>
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
        <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">{t.colors}</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm font-medium">{t.gradientFrom}</Label>
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
            <Label className="text-sm font-medium">{t.gradientTo}</Label>
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
            <Label className="text-sm font-medium">{t.textColor}</Label>
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
            <Label className="text-sm font-medium">{t.subtitleColor}</Label>
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
        <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">{t.typography}</h4>
        <div>
          <Label className="text-sm font-medium">{t.nameFontSize}: {props.fontSize}px</Label>
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
          <Label className="text-sm font-medium">{t.subtitleFontSize}: {props.subtitleSize}px</Label>
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
        <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">{t.layout}</h4>
        <div>
          <Label className="text-sm font-medium">{t.padding}: {props.padding}px</Label>
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
  language?: 'en' | 'ru';
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
    language: 'en',
  },
  related: {
    settings: AboutSettings,
  },
};

function AboutSettings() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const language = props.language || 'en';

  const labels = {
    en: {
      aboutText: 'About Text',
    },
    ru: {
      aboutText: 'Текст о нас',
    },
  };

  const t = labels[language];

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label>{t.aboutText}</Label>
        <textarea
          value={props.text}
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
  language?: 'en' | 'ru';
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
    language: 'en',
  },
};

interface ProjectsProps {
  projects: Array<{ title: string; description: string; imageUrl?: string }>;
  language?: 'en' | 'ru';
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
    language: 'en',
  },
};

interface ContactProps {
  email: string;
  phone: string;
  location: string;
  language?: 'en' | 'ru';
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
    language: 'en',
  },
};

interface PricingProps {
  plans: Array<{ name: string; price: string; features: string[] }>;
  language?: 'en' | 'ru';
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
    language: 'en',
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

// Empty Canvas component with instructions
const EmptyCanvas = ({ language = 'en' }: { language?: 'en' | 'ru' }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className="min-h-[600px] flex items-center justify-center text-center p-8"
    >
      <div className="max-w-2xl">
        <div className="text-6xl mb-6">🎨</div>
        {language === 'en' ? (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Start Building Your Site
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Drag widgets from the left panel and create your site's flow.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-lg border-2 border-blue-200">
              <span className="text-2xl">👈</span>
              <span className="text-sm font-medium text-blue-800">
                Choose components from the panel to begin
              </span>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Начните создавать свой сайт
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Перетащите виджеты из левой панели и создайте структуру вашего сайта.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-lg border-2 border-blue-200">
              <span className="text-2xl">👈</span>
              <span className="text-sm font-medium text-blue-800">
                Выберите компоненты из панели, чтобы начать
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

EmptyCanvas.craft = {
  displayName: "Empty Canvas",
  props: {
    language: 'en',
  },
  rules: {
    canDrag: () => false,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => false,
  },
  custom: {
    isDeletable: false,
  },
};

// ============================================
// SETTINGS PANEL
// ============================================

const SettingsPanel = () => {
  const { currentNodeId, settings, displayName, isDeletable, actions } = useEditor((state) => {
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

      // Check if component is deletable (default true if not specified)
      const isDeletable = node.data.custom?.isDeletable !== false;

      return {
        currentNodeId,
        settings,
        displayName,
        isDeletable,
      };
    }

    return {
      currentNodeId: null,
      settings: null,
      displayName: '',
      isDeletable: true,
    };
  });

  const language: 'en' | 'ru' = useEditor((state) => {
    // Try to get language from any selected node
    const selectedNodeIds = state.events.selected;
    if (selectedNodeIds && selectedNodeIds.size > 0) {
      const nodeId = Array.from(selectedNodeIds)[0];
      const node = state.nodes[nodeId];
      const lang = node?.data?.props?.language;
      if (lang === 'ru' || lang === 'en') {
        return lang;
      }
    }
    return 'en';
  }) as 'en' | 'ru';

  const labels = {
    en: {
      settings: 'Settings',
      deleteComponent: 'Delete Component',
      selectComponent: 'Select a component to edit',
    },
    ru: {
      settings: 'Настройки',
      deleteComponent: 'Удалить компонент',
      selectComponent: 'Выберите компонент для редактирования',
    },
  };

  const t = labels[language] || labels.en;

  return (
    <div className="w-80 bg-white border-l h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">{t.settings}</h3>
      </div>
      {currentNodeId ? (
        <div>
          <div className="p-4 bg-gray-50 border-b">
            <p className="text-sm font-medium">{displayName}</p>
          </div>
          {settings && React.createElement(settings)}
          {isDeletable && (
            <div className="p-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => actions.delete(currentNodeId)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t.deleteComponent}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          <p>{t.selectComponent}</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// TOOLBOX
// ============================================

const Toolbox = ({ language }: { language: 'en' | 'ru' }) => {
  const { connectors } = useEditor();

  const labels = {
    en: {
      components: 'Components',
      splitScreen: 'Split-Screen',
      generic: 'Generic',
      splitHero: 'Split Hero',
      splitHeroDesc: 'Split-screen hero section',
      stats: 'Stats',
      statsDesc: 'Statistics showcase',
      skills: 'Skills',
      skillsDesc: 'Skills tags section',
      contact: 'Contact',
      contactDesc: 'Contact split section',
      hero: 'Hero',
      heroDesc: 'Header section',
      about: 'About',
      aboutDesc: 'About section',
      projects: 'Projects',
      projectsDesc: 'Project showcase',
    },
    ru: {
      components: 'Компоненты',
      splitScreen: 'Разделённый экран',
      generic: 'Общие',
      splitHero: 'Главный баннер',
      splitHeroDesc: 'Секция главного баннера с разделённым экраном',
      stats: 'Статистика',
      statsDesc: 'Витрина статистики',
      skills: 'Навыки',
      skillsDesc: 'Секция навыков',
      contact: 'Контакты',
      contactDesc: 'Секция контактов с разделённым экраном',
      hero: 'Баннер',
      heroDesc: 'Секция заголовка',
      about: 'О нас',
      aboutDesc: 'Секция о нас',
      projects: 'Проекты',
      projectsDesc: 'Витрина проектов',
    },
  };

  const t = labels[language];

  return (
    <div className="w-64 bg-white border-r h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">{t.components}</h3>
      </div>
      <div className="p-4 space-y-2">
        <div className="text-xs font-semibold text-gray-500 uppercase mb-2">{t.splitScreen}</div>
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={SplitScreenHero} language={language} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors cursor-move active:opacity-50"
          style={{ touchAction: 'none' }}
        >
          <div className="font-medium">{t.splitHero}</div>
          <div className="text-xs text-gray-500">{t.splitHeroDesc}</div>
        </button>
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={SplitScreenStats} language={language} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors cursor-move active:opacity-50"
          style={{ touchAction: 'none' }}
        >
          <div className="font-medium">{t.stats}</div>
          <div className="text-xs text-gray-500">{t.statsDesc}</div>
        </button>
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={SplitScreenSkills} language={language} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors cursor-move active:opacity-50"
          style={{ touchAction: 'none' }}
        >
          <div className="font-medium">{t.skills}</div>
          <div className="text-xs text-gray-500">{t.skillsDesc}</div>
        </button>
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={SplitScreenContact} language={language} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors cursor-move active:opacity-50"
          style={{ touchAction: 'none' }}
        >
          <div className="font-medium">{t.contact}</div>
          <div className="text-xs text-gray-500">{t.contactDesc}</div>
        </button>

        <div className="text-xs font-semibold text-gray-500 uppercase mb-2 mt-6">{t.generic}</div>
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={HeroComponent} language={language} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors cursor-move active:opacity-50"
          style={{ touchAction: 'none' }}
        >
          <div className="font-medium">{t.hero}</div>
          <div className="text-xs text-gray-500">{t.heroDesc}</div>
        </button>
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={AboutComponent} language={language} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors cursor-move active:opacity-50"
          style={{ touchAction: 'none' }}
        >
          <div className="font-medium">{t.about}</div>
          <div className="text-xs text-gray-500">{t.aboutDesc}</div>
        </button>
        <button
          ref={(ref) => ref && connectors.create(ref, <Element is={ProjectsComponent} language={language} canvas />)}
          className="w-full p-3 text-left border rounded hover:bg-gray-50 transition-colors cursor-move active:opacity-50"
          style={{ touchAction: 'none' }}
        >
          <div className="font-medium">{t.projects}</div>
          <div className="text-xs text-gray-500">{t.projectsDesc}</div>
        </button>
      </div>
    </div>
  );
};

// ============================================
// EDITOR ACTIONS CAPTOR
// ============================================

const EditorActionsCapturer = ({ setActions }: { setActions: (actions: any) => void }) => {
  const { actions, query } = useEditor((state) => ({}), (query) => query);
  const actionsRef = React.useRef({ actions, query });

  React.useEffect(() => {
    actionsRef.current = { actions, query };
    setActions(actionsRef.current);
  }, []); // Only run once on mount

  return null;
};

// ============================================
// MAIN BUILDER
// ============================================

export function CraftJSTemplateBuilder({ template }: { template: TemplateConfig }) {
  const [isSaving, setIsSaving] = React.useState(false);
  const [language, setLanguage] = React.useState<'en' | 'ru'>('en');
  const [editorActions, setEditorActions] = React.useState<any>(null);

  const handleSave = () => {
    setIsSaving(true);
    // TODO: Implement save/submit functionality
    // This will serialize the editor state and send to backend
    setTimeout(() => {
      setIsSaving(false);
      alert("Template customization saved! (Submit functionality coming soon)");
    }, 1000);
  };

  // Update all components when language changes
  React.useEffect(() => {
    if (editorActions && editorActions.query) {
      const serializedNodes = editorActions.query.getSerializedNodes();
      const nodeIds = Object.keys(serializedNodes);
      nodeIds.forEach((nodeId) => {
        editorActions.actions.setProp(nodeId, (props: any) => {
          if (props.hasOwnProperty('language')) {
            props.language = language;
          }
        });
      });
    }
  }, [language, editorActions]);

  const infoText = {
    en: {
      title: "How It Works",
      step1: "1. Design your site structure",
      step1desc: "Customize sections, add content, and arrange your layout using the builder",
      step2: "2. Submit your design",
      step2desc: "Click 'Save Template' to send us your configuration",
      step3: "3. We create your site",
      step3desc: "Our team will build a professional, optimized website based on your design",
    },
    ru: {
      title: "Как это работает",
      step1: "1. Создайте структуру сайта",
      step1desc: "Настройте секции, добавьте контент и организуйте макет в конструкторе",
      step2: "2. Отправьте дизайн",
      step2desc: "Нажмите 'Сохранить шаблон' чтобы отправить нам конфигурацию",
      step3: "3. Мы создадим ваш сайт",
      step3desc: "Наша команда создаст профессиональный оптимизированный сайт по вашему дизайну",
    },
  };

  const currentText = infoText[language];

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
          <div className="flex items-center gap-2 border rounded-md overflow-hidden">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                language === 'en' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ru')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                language === 'ru' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              RU
            </button>
          </div>
          <Link
            href={`/templates/${template.id}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            <Eye className="w-4 h-4" />
            View Demo
          </Link>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <Settings className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Template"}
          </Button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-blue-600">ℹ️</span>
            {currentText.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="font-semibold text-blue-600 mb-1">{currentText.step1}</div>
              <div className="text-sm text-gray-600">{currentText.step1desc}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="font-semibold text-blue-600 mb-1">{currentText.step2}</div>
              <div className="text-sm text-gray-600">{currentText.step2desc}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="font-semibold text-green-600 mb-1">{currentText.step3}</div>
              <div className="text-sm text-gray-600">{currentText.step3desc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <Editor
        resolver={{
          SplitScreenHero,
          SplitScreenStats,
          SplitScreenSkills,
          SplitScreenContact,
          HeroComponent,
          AboutComponent,
          ProjectsComponent,
          SkillsComponent,
          ContactComponent,
          PricingComponent,
          Container,
          EmptyCanvas,
        }}
      >
        <EditorActionsCapturer setActions={setEditorActions} />
        <div className="flex-1 flex overflow-hidden">
          <Toolbox language={language} />
          <div
            className="flex-1 overflow-auto bg-gray-100"
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
          >
            <Frame key={language}>
              <Element is={Container} canvas>
                <Element is={EmptyCanvas} language={language} />
              </Element>
            </Frame>
          </div>
          <SettingsPanel />
        </div>
      </Editor>
    </div>
  );
}
