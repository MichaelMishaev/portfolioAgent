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
  language?: 'en' | 'ru';
  nameRu?: string;
  titleRu?: string;
  taglineRu?: string;
  locationRu?: string;
  availabilityRu?: string;
  buttonText?: string;
  buttonTextRu?: string;
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
  language = 'en',
  nameRu = "Дэвид Ким",
  titleRu = "Цифровой дизайнер",
  taglineRu = "Создаю важные решения через продуманный дизайн, стратегическое мышление и идеальное исполнение",
  locationRu = "Сеул, Южная Корея",
  availabilityRu = "Доступен для избранных проектов",
  buttonText = "View Projects",
  buttonTextRu = "Смотреть проекты",
}: SplitScreenHeroProps) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const displayName = language === 'ru' ? nameRu : name;
  const displayTitle = language === 'ru' ? titleRu : title;
  const displayTagline = language === 'ru' ? taglineRu : tagline;
  const displayLocation = language === 'ru' ? locationRu : location;
  const displayAvailability = language === 'ru' ? availabilityRu : availability;
  const displayButton = language === 'ru' ? buttonTextRu : buttonText;

  return (
    <section
      ref={(ref) => ref && connect(drag(ref))}
      className={`min-h-[400px] md:min-h-[600px] lg:h-screen flex items-center pt-16 ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="container mx-auto px-3 sm:px-3 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-8">
          {/* Left Side - Text */}
          <div className="flex flex-col justify-center">
            <FadeIn>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
                {displayName}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-2xl md:text-3xl text-muted-foreground mb-4">
                {displayTitle}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-lg text-muted-foreground mb-4 max-w-lg">
                {displayTagline}
              </p>
            </FadeIn>
            <FadeIn delay={0.35}>
              <div className="flex flex-col gap-2 mb-8 text-sm text-muted-foreground">
                <p>📍 {displayLocation}</p>
                <p>✓ {displayAvailability}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Button size="lg" className="w-fit">
                {displayButton} <FiArrowRight className="ml-2" />
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

  const language = props.language || 'en';

  const labels = {
    en: {
      content: 'CONTENT',
      name: 'Name',
      title: 'Title',
      tagline: 'Tagline',
      location: 'Location',
      availability: 'Availability',
      visual: 'VISUAL',
      initials: 'Initials',
      gradientStart: 'Gradient Start Color',
      gradientEnd: 'Gradient End Color',
    },
    ru: {
      content: 'СОДЕРЖАНИЕ',
      name: 'Имя',
      title: 'Должность',
      tagline: 'Слоган',
      location: 'Местоположение',
      availability: 'Доступность',
      visual: 'ВИЗУАЛ',
      initials: 'Инициалы',
      gradientStart: 'Начальный цвет градиента',
      gradientEnd: 'Конечный цвет градиента',
    },
  };

  const t = labels[language];

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">{t.content}</div>

      <div>
        <Label>{t.name}</Label>
        <Input
          value={language === 'ru' ? props.nameRu : props.name}
          onChange={(e) => setProp((props: any) => {
            if (language === 'ru') {
              props.nameRu = e.target.value;
            } else {
              props.name = e.target.value;
            }
          })}
        />
      </div>

      <div>
        <Label>{t.title}</Label>
        <Input
          value={language === 'ru' ? props.titleRu : props.title}
          onChange={(e) => setProp((props: any) => {
            if (language === 'ru') {
              props.titleRu = e.target.value;
            } else {
              props.title = e.target.value;
            }
          })}
        />
      </div>

      <div>
        <Label>{t.tagline}</Label>
        <Textarea
          value={language === 'ru' ? props.taglineRu : props.tagline}
          onChange={(e) => setProp((props: any) => {
            if (language === 'ru') {
              props.taglineRu = e.target.value;
            } else {
              props.tagline = e.target.value;
            }
          })}
          rows={3}
        />
      </div>

      <div>
        <Label>{t.location}</Label>
        <Input
          value={language === 'ru' ? props.locationRu : props.location}
          onChange={(e) => setProp((props: any) => {
            if (language === 'ru') {
              props.locationRu = e.target.value;
            } else {
              props.location = e.target.value;
            }
          })}
        />
      </div>

      <div>
        <Label>{t.availability}</Label>
        <Input
          value={language === 'ru' ? props.availabilityRu : props.availability}
          onChange={(e) => setProp((props: any) => {
            if (language === 'ru') {
              props.availabilityRu = e.target.value;
            } else {
              props.availability = e.target.value;
            }
          })}
        />
      </div>

      <div className="text-sm font-medium mt-6">{t.visual}</div>

      <div>
        <Label>{t.initials}</Label>
        <Input
          value={props.initials}
          onChange={(e) => setProp((props: any) => (props.initials = e.target.value))}
          maxLength={3}
        />
      </div>

      <div>
        <Label>{t.gradientStart}</Label>
        <Input
          type="color"
          value={props.gradientFrom}
          onChange={(e) => setProp((props: any) => (props.gradientFrom = e.target.value))}
        />
      </div>

      <div>
        <Label>{t.gradientEnd}</Label>
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
    language: 'en',
    nameRu: "Дэвид Ким",
    titleRu: "Цифровой дизайнер",
    taglineRu: "Создаю важные решения через продуманный дизайн, стратегическое мышление и идеальное исполнение",
    locationRu: "Сеул, Южная Корея",
    availabilityRu: "Доступен для избранных проектов",
    buttonText: "View Projects",
    buttonTextRu: "Смотреть проекты",
  },
  related: {
    settings: SplitScreenHeroSettings,
  },
};

// ============================================
// STATS SECTION COMPONENT
// ============================================

interface StatsProps {
  stats: Array<{ value: string; label: string; labelRu?: string }>;
  language?: 'en' | 'ru';
}

export const SplitScreenStats = ({
  stats = [
    { value: "150+", label: "Projects Completed", labelRu: "Завершенных проектов" },
    { value: "50+", label: "Happy Clients", labelRu: "Довольных клиентов" },
    { value: "8+", label: "Years Experience", labelRu: "Лет опыта" },
    { value: "15+", label: "Awards Won", labelRu: "Наград получено" },
  ],
  language = 'en',
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
          {stats.map((stat, index) => {
            const displayLabel = language === 'ru' && stat.labelRu ? stat.labelRu : stat.label;
            return (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{displayLabel}</div>
                </div>
              </FadeIn>
            );
          })}
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

  const language = props.language || 'en';

  const labels = {
    en: {
      stats: 'STATS',
      stat: 'Stat',
      value: 'Value',
      label: 'Label',
    },
    ru: {
      stats: 'СТАТИСТИКА',
      stat: 'Показатель',
      value: 'Значение',
      label: 'Подпись',
    },
  };

  const t = labels[language];

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">{t.stats}</div>

      {props.stats.map((stat: any, index: number) => (
        <div key={index} className="p-3 border rounded">
          <Label>{t.stat} {index + 1} - {t.value}</Label>
          <Input
            value={stat.value}
            onChange={(e) =>
              setProp((props: any) => {
                props.stats[index].value = e.target.value;
              })
            }
            className="mb-2"
          />
          <Label>{t.stat} {index + 1} - {t.label}</Label>
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
      { value: "150+", label: "Projects Completed", labelRu: "Завершенных проектов" },
      { value: "50+", label: "Happy Clients", labelRu: "Довольных клиентов" },
      { value: "8+", label: "Years Experience", labelRu: "Лет опыта" },
      { value: "15+", label: "Awards Won", labelRu: "Наград получено" },
    ],
    language: 'en',
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
  language?: 'en' | 'ru';
  titleRu?: string;
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
  language = 'en',
  titleRu = "Навыки и экспертиза",
}: SkillsProps) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const displayTitle = language === 'ru' ? titleRu : title;

  return (
    <section
      ref={(ref) => ref && connect(drag(ref))}
      className={`py-20 border-t ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="container mx-auto px-3 sm:px-3">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">{displayTitle}</h2>
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
    <div className="space-y-4">
      <div className="text-sm font-medium">{t.content}</div>

      <div>
        <Label>{t.sectionTitle}</Label>
        <Input
          value={language === 'ru' ? props.titleRu : props.title}
          onChange={(e) => setProp((props: any) => {
            if (language === 'ru') {
              props.titleRu = e.target.value;
            } else {
              props.title = e.target.value;
            }
          })}
        />
      </div>

      <div>
        <Label>{t.skills}</Label>
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
    language: 'en',
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
  language?: 'en' | 'ru';
  titleRu?: string;
  subtitleRu?: string;
  locationRu?: string;
  availabilityRu?: string;
}

export const SplitScreenContact = ({
  title = "Let's Work Together",
  subtitle = "Have a project in mind? Let's create something amazing.",
  email = "hello@davidkim.com",
  location = "Seoul, South Korea",
  availability = "Available worldwide remotely",
  language = 'en',
  titleRu = "Давайте работать вместе",
  subtitleRu = "Есть проект? Давайте создадим что-то удивительное.",
  locationRu = "Сеул, Южная Корея",
  availabilityRu = "Доступен для работы по всему миру удаленно",
}: ContactProps) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const displayTitle = language === 'ru' ? titleRu : title;
  const displaySubtitle = language === 'ru' ? subtitleRu : subtitle;
  const displayLocation = language === 'ru' ? locationRu : location;
  const displayAvailability = language === 'ru' ? availabilityRu : availability;

  return (
    <section
      ref={(ref) => ref && connect(drag(ref))}
      className={`min-h-[400px] md:min-h-[600px] lg:min-h-screen flex items-center border-t ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="container mx-auto px-3 sm:px-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {displayTitle}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {displaySubtitle}
            </p>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <Button size="lg" className="w-full justify-start text-lg">
              <FiMail className="mr-2" />
              {email}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              {language === 'ru' ? 'Базируется в' : 'Based in'} {displayLocation}
              <br />
              {displayAvailability}
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

  const language = props.language || 'en';

  const labels = {
    en: {
      content: 'CONTENT',
      title: 'Title',
      subtitle: 'Subtitle',
      email: 'Email',
      location: 'Location',
      availability: 'Availability',
    },
    ru: {
      content: 'СОДЕРЖАНИЕ',
      title: 'Заголовок',
      subtitle: 'Подзаголовок',
      email: 'Электронная почта',
      location: 'Местоположение',
      availability: 'Доступность',
    },
  };

  const t = labels[language];

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">{t.content}</div>

      <div>
        <Label>{t.title}</Label>
        <Input
          value={language === 'ru' ? props.titleRu : props.title}
          onChange={(e) => setProp((props: any) => {
            if (language === 'ru') {
              props.titleRu = e.target.value;
            } else {
              props.title = e.target.value;
            }
          })}
        />
      </div>

      <div>
        <Label>{t.subtitle}</Label>
        <Textarea
          value={language === 'ru' ? props.subtitleRu : props.subtitle}
          onChange={(e) => setProp((props: any) => {
            if (language === 'ru') {
              props.subtitleRu = e.target.value;
            } else {
              props.subtitle = e.target.value;
            }
          })}
          rows={2}
        />
      </div>

      <div>
        <Label>{t.email}</Label>
        <Input
          value={props.email}
          onChange={(e) => setProp((props: any) => (props.email = e.target.value))}
          type="email"
        />
      </div>

      <div>
        <Label>{t.location}</Label>
        <Input
          value={language === 'ru' ? props.locationRu : props.location}
          onChange={(e) => setProp((props: any) => {
            if (language === 'ru') {
              props.locationRu = e.target.value;
            } else {
              props.location = e.target.value;
            }
          })}
        />
      </div>

      <div>
        <Label>{t.availability}</Label>
        <Input
          value={language === 'ru' ? props.availabilityRu : props.availability}
          onChange={(e) => setProp((props: any) => {
            if (language === 'ru') {
              props.availabilityRu = e.target.value;
            } else {
              props.availability = e.target.value;
            }
          })}
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
    language: 'en',
    titleRu: "Давайте работать вместе",
    subtitleRu: "Есть проект? Давайте создадим что-то удивительное.",
    locationRu: "Сеул, Южная Корея",
    availabilityRu: "Доступен для работы по всему миру удаленно",
  },
  related: {
    settings: SplitScreenContactSettings,
  },
};
