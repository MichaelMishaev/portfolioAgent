"use client";

import { useNode, useEditor } from "@craftjs/core";
import React from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

// ============================================
// UNIFIED SKILLS COMPONENT
// ============================================

interface SkillsProps {
  title: string;
  titleRu: string;
  skills: string[];
  language?: 'en' | 'ru';
}

export const Skills = ({
  title = "Skills & Expertise",
  titleRu = "Навыки и экспертиза",
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
  language = 'en',
}: SkillsProps) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { actions: editorActions } = useEditor();

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayTitle = language === 'ru' ? titleRu : title;

  return (
    <section
      ref={(ref) => ref && connect(drag(ref))}
      className={`py-8 sm:py-12 md:py-16 border-t border-2 ${selected ? "border-blue-500" : "border-transparent"}`}
    >
      {(selected || isMobile) && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <button
            onClick={() => editorActions.delete(id)}
            className={`bg-red-500 text-white rounded hover:bg-red-600 flex items-center shadow-lg ${
              isMobile ? 'p-2' : 'px-3 py-1 gap-1'
            }`}
            title="Delete component"
          >
            <Trash2 className="w-4 h-4" />
            {!isMobile && <span>Delete</span>}
          </button>
        </div>
      )}
      <div className="container mx-auto px-3 sm:px-3">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">{displayTitle}</h2>
        </ScrollReveal>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                {skill}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// SETTINGS PANEL
function SkillsSettings() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as SkillsProps,
  }));

  const language = props.language || 'en';

  const labels = {
    en: {
      content: 'CONTENT',
      sectionTitle: 'Section Title',
      skills: 'Skills (one per line)',
    },
    ru: {
      content: 'СОДЕРЖАНИЕ',
      sectionTitle: 'Заголовок секции',
      skills: 'Навыки (по одному на строку)',
    },
  };

  const t = labels[language];

  return (
    <div className="space-y-4 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="text-sm font-medium">{t.content}</div>

      <div>
        <Label>{t.sectionTitle} (EN)</Label>
        <Input
          value={props.title}
          onChange={(e) => setProp((props: SkillsProps) => (props.title = e.target.value))}
        />
      </div>

      <div>
        <Label>{t.sectionTitle} (RU)</Label>
        <Input
          value={props.titleRu}
          onChange={(e) => setProp((props: SkillsProps) => (props.titleRu = e.target.value))}
        />
      </div>

      <div>
        <Label>{t.skills}</Label>
        <Textarea
          value={props.skills.join('\n')}
          onChange={(e) =>
            setProp((props: SkillsProps) => (props.skills = e.target.value.split('\n').filter((s: string) => s.trim())))
          }
          rows={12}
        />
      </div>
    </div>
  );
}

// CRAFT.JS CONFIG
Skills.craft = {
  displayName: "Skills",
  props: {
    title: "Skills & Expertise",
    titleRu: "Навыки и экспертиза",
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
    language: 'en' as 'en' | 'ru',
  },
  related: {
    settings: SkillsSettings,
  },
};
