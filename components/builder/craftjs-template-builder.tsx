"use client";

import { Editor, Frame, Element, useNode, useEditor } from "@craftjs/core";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { ArrowLeft, Eye, Trash2, Settings, ImageIcon, Send, Plus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { TemplateConfig } from "@/lib/template-registry";
import { TooltipHint } from "@/components/ui/tooltip-hint";
import { OnboardingTour, TourStep } from "@/components/onboarding-tour";
import { SendToTelegramModal } from "@/components/send-to-telegram-modal";
import { SendToWhatsAppModal } from "@/components/send-to-whatsapp-modal";
import { useI18n } from "@/lib/i18n-context";
import { BuilderTutorialAnimation, ShowTutorialButton } from "@/components/builder-tutorial-animation";

// Import touch polyfill for mobile drag & drop support
import "drag-drop-touch";

// Import Split-Screen editable components (LEGACY - kept for backward compatibility)
import {
  SplitScreenHero,
  SplitScreenStats,
  SplitScreenSkills,
  SplitScreenContact,
} from "@/components/builder/split-screen-components";

// Import NEW UNIFIED COMPONENTS
import {
  Hero,
  Stats,
  Skills,
} from "@/components/builder/unified";

// ============================================
// CRAFT.JS USER COMPONENTS
// ============================================

interface HeroProps {
  name: string;
  nameRu: string;
  title: string;
  titleRu: string;
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
  nameRu,
  title,
  titleRu,
  imageUrl,
  backgroundColor = "#667eea",
  gradientFrom = "#667eea",
  gradientTo = "#764ba2",
  textColor = "#ffffff",
  subtitleColor = "#ffffff",
  padding = 80,
  fontSize = 48,
  subtitleSize = 24,
  language = 'en',
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1 shadow-lg"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
          {language === 'ru' ? nameRu : name}
        </h1>
        <p
          style={{
            color: subtitleColor,
            fontSize: `${subtitleSize}px`,
            opacity: 0.9,
          }}
        >
          {language === 'ru' ? titleRu : title}
        </p>
      </div>
    </div>
  );
};

HeroComponent.craft = {
  displayName: "Hero",
  props: {
    name: "John Doe",
    nameRu: "Джон Доу",
    title: "Full Stack Developer & Designer",
    titleRu: "Фулстек разработчик и дизайнер",
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
          <Label htmlFor="hero-name-en" className="text-sm font-medium">
            {t.name} (EN) <span className="text-red-500">*</span>
          </Label>
          <input
            id="hero-name-en"
            type="text"
            value={props.name}
            onChange={(e) => setProp((props: HeroProps) => (props.name = e.target.value))}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            aria-required="true"
            aria-label={language === 'en' ? 'Name (English)' : 'Имя (Английский)'}
          />
        </div>
        <div>
          <Label htmlFor="hero-name-ru" className="text-sm font-medium">
            {t.name} (RU) <span className="text-red-500">*</span>
          </Label>
          <input
            id="hero-name-ru"
            type="text"
            value={props.nameRu}
            onChange={(e) => setProp((props: HeroProps) => (props.nameRu = e.target.value))}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            aria-required="true"
            aria-label={language === 'en' ? 'Name (Russian)' : 'Имя (Русский)'}
          />
        </div>
        <div>
          <Label htmlFor="hero-title-en" className="text-sm font-medium">
            {t.title} (EN) <span className="text-red-500">*</span>
          </Label>
          <input
            id="hero-title-en"
            type="text"
            value={props.title}
            onChange={(e) => setProp((props: HeroProps) => (props.title = e.target.value))}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            aria-required="true"
            aria-label={language === 'en' ? 'Title (English)' : 'Заголовок (Английский)'}
          />
        </div>
        <div>
          <Label htmlFor="hero-title-ru" className="text-sm font-medium">
            {t.title} (RU) <span className="text-red-500">*</span>
          </Label>
          <input
            id="hero-title-ru"
            type="text"
            value={props.titleRu}
            onChange={(e) => setProp((props: HeroProps) => (props.titleRu = e.target.value))}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            aria-required="true"
            aria-label={language === 'en' ? 'Title (Russian)' : 'Заголовок (Русский)'}
          />
        </div>
        <div>
          <Label htmlFor="hero-bg-image" className="text-sm font-medium">{t.bgImage}</Label>
          <input
            id="hero-bg-image"
            type="text"
            value={props.imageUrl || ""}
            onChange={(e) => setProp((props: HeroProps) => (props.imageUrl = e.target.value))}
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://..."
            aria-label={language === 'en' ? 'Background image URL (optional)' : 'URL фонового изображения (опционально)'}
          />
        </div>
      </div>

      {/* Colors Section */}
      <div className="space-y-4 pt-4 border-t">
        <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">{t.colors}</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="hero-gradient-from" className="text-sm font-medium">{t.gradientFrom}</Label>
            <div className="flex gap-2 mt-1">
              <input
                id="hero-gradient-from"
                type="color"
                value={props.gradientFrom}
                onChange={(e) => setProp((props: HeroProps) => (props.gradientFrom = e.target.value))}
                className="w-12 h-10 rounded border cursor-pointer"
                aria-label={t.gradientFrom}
              />
              <input
                type="text"
                value={props.gradientFrom}
                onChange={(e) => setProp((props: HeroProps) => (props.gradientFrom = e.target.value))}
                className="flex-1 px-2 py-1 border rounded text-sm"
                aria-label={`${t.gradientFrom} hex value`}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="hero-gradient-to" className="text-sm font-medium">{t.gradientTo}</Label>
            <div className="flex gap-2 mt-1">
              <input
                id="hero-gradient-to"
                type="color"
                value={props.gradientTo}
                onChange={(e) => setProp((props: HeroProps) => (props.gradientTo = e.target.value))}
                className="w-12 h-10 rounded border cursor-pointer"
                aria-label={t.gradientTo}
              />
              <input
                type="text"
                value={props.gradientTo}
                onChange={(e) => setProp((props: HeroProps) => (props.gradientTo = e.target.value))}
                className="flex-1 px-2 py-1 border rounded text-sm"
                aria-label={`${t.gradientTo} hex value`}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="hero-text-color" className="text-sm font-medium">{t.textColor}</Label>
            <div className="flex gap-2 mt-1">
              <input
                id="hero-text-color"
                type="color"
                value={props.textColor}
                onChange={(e) => setProp((props: HeroProps) => (props.textColor = e.target.value))}
                className="w-12 h-10 rounded border cursor-pointer"
                aria-label={t.textColor}
              />
              <input
                type="text"
                value={props.textColor}
                onChange={(e) => setProp((props: HeroProps) => (props.textColor = e.target.value))}
                className="flex-1 px-2 py-1 border rounded text-sm"
                aria-label={`${t.textColor} hex value`}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="hero-subtitle-color" className="text-sm font-medium">{t.subtitleColor}</Label>
            <div className="flex gap-2 mt-1">
              <input
                id="hero-subtitle-color"
                type="color"
                value={props.subtitleColor}
                onChange={(e) => setProp((props: HeroProps) => (props.subtitleColor = e.target.value))}
                className="w-12 h-10 rounded border cursor-pointer"
                aria-label={t.subtitleColor}
              />
              <input
                type="text"
                value={props.subtitleColor}
                onChange={(e) => setProp((props: HeroProps) => (props.subtitleColor = e.target.value))}
                className="flex-1 px-2 py-1 border rounded text-sm"
                aria-label={`${t.subtitleColor} hex value`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography Section */}
      <div className="space-y-4 pt-4 border-t">
        <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">{t.typography}</h4>
        <div>
          <Label htmlFor="hero-font-size" className="text-sm font-medium">{t.nameFontSize}: {props.fontSize}px</Label>
          <input
            id="hero-font-size"
            type="range"
            min="24"
            max="96"
            value={props.fontSize}
            onChange={(e) => setProp((props: HeroProps) => (props.fontSize = parseInt(e.target.value)))}
            className="w-full mt-2"
            aria-label={`${t.nameFontSize}: ${props.fontSize} pixels`}
          />
        </div>
        <div>
          <Label htmlFor="hero-subtitle-size" className="text-sm font-medium">{t.subtitleFontSize}: {props.subtitleSize}px</Label>
          <input
            id="hero-subtitle-size"
            type="range"
            min="14"
            max="48"
            value={props.subtitleSize}
            onChange={(e) => setProp((props: HeroProps) => (props.subtitleSize = parseInt(e.target.value)))}
            className="w-full mt-2"
            aria-label={`${t.subtitleFontSize}: ${props.subtitleSize} pixels`}
          />
        </div>
      </div>

      {/* Layout Section */}
      <div className="space-y-4 pt-4 border-t">
        <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">{t.layout}</h4>
        <div>
          <Label htmlFor="hero-padding" className="text-sm font-medium">{t.padding}: {props.padding}px</Label>
          <input
            id="hero-padding"
            type="range"
            min="20"
            max="200"
            value={props.padding}
            onChange={(e) => setProp((props: HeroProps) => (props.padding = parseInt(e.target.value)))}
            className="w-full mt-2"
            aria-label={`${t.padding}: ${props.padding} pixels`}
          />
        </div>
      </div>
    </div>
  );
}

interface AboutProps {
  title: string;
  titleRu: string;
  text: string;
  textRu: string;
  imageUrl?: string;
  language?: 'en' | 'ru';
}

const AboutComponent = ({ title, titleRu, text, textRu, imageUrl, language = 'en' }: AboutProps) => {
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
      className={`relative p-6 md:p-12 lg:p-16 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {imageUrl && (
          <img src={imageUrl} alt="About" className="rounded-lg w-full h-64 object-cover" />
        )}
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{language === 'ru' ? titleRu : title}</h2>
          <p className="text-lg leading-relaxed">{language === 'ru' ? textRu : text}</p>
        </div>
      </div>
    </div>
  );
};

AboutComponent.craft = {
  displayName: "About",
  props: {
    title: "About Me",
    titleRu: "Обо мне",
    text: "I'm a passionate developer with 5 years of experience building amazing web applications.",
    textRu: "Я увлеченный разработчик с 5-летним опытом создания потрясающих веб-приложений.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    language: 'en' as 'en' | 'ru',
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
      title: 'Title',
      aboutText: 'About Text',
    },
    ru: {
      title: 'Заголовок',
      aboutText: 'Текст о нас',
    },
  };

  const t = labels[language];

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label>{t.title} (EN)</Label>
        <input
          type="text"
          value={props.title}
          onChange={(e) => setProp((props: AboutProps) => (props.title = e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <Label>{t.title} (RU)</Label>
        <input
          type="text"
          value={props.titleRu}
          onChange={(e) => setProp((props: AboutProps) => (props.titleRu = e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <Label>{t.aboutText} (EN)</Label>
        <textarea
          value={props.text}
          onChange={(e) => setProp((props: AboutProps) => (props.text = e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
        />
      </div>
      <div>
        <Label>{t.aboutText} (RU)</Label>
        <textarea
          value={props.textRu}
          onChange={(e) => setProp((props: AboutProps) => (props.textRu = e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
        />
      </div>
    </div>
  );
}

interface SkillsProps {
  title: string;
  titleRu: string;
  skills: string[];
  language?: 'en' | 'ru';
}

const SkillsComponent = ({ title, titleRu, skills, language = 'en' }: SkillsProps) => {
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
      className={`relative p-6 md:p-12 lg:p-16 bg-gray-50 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">{language === 'ru' ? titleRu : title}</h2>
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
    title: "Skills & Expertise",
    titleRu: "Навыки и Экспертиза",
    skills: ["React", "TypeScript", "Node.js", "Python", "UI/UX Design", "GraphQL", "AWS", "Docker"],
    language: 'en' as 'en' | 'ru',
  },
};

interface ProjectsProps {
  title: string;
  titleRu: string;
  projects: Array<{ title: string; titleRu: string; description: string; descriptionRu: string; imageUrl?: string }>;
  language?: 'en' | 'ru';
}

const ProjectsComponent = ({ title, titleRu, projects, language = 'en' }: ProjectsProps) => {
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
      className={`relative p-6 md:p-12 lg:p-16 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">{language === 'ru' ? titleRu : title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={language === 'ru' ? project.titleRu : project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold mb-2">{language === 'ru' ? project.titleRu : project.title}</h3>
              <p className="text-gray-600">{language === 'ru' ? project.descriptionRu : project.description}</p>
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
    title: "Projects",
    titleRu: "Проекты",
    projects: [
      {
        title: "E-Commerce Platform",
        titleRu: "Платформа электронной коммерции",
        description: "Built a full-stack e-commerce platform with React and Node.js",
        descriptionRu: "Создана полнофункциональная платформа электронной коммерции на React и Node.js",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      },
      {
        title: "Mobile App",
        titleRu: "Мобильное приложение",
        description: "Developed a cross-platform mobile app using React Native",
        descriptionRu: "Разработано кроссплатформенное мобильное приложение на React Native",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      },
    ],
    language: 'en' as 'en' | 'ru',
  },
};

interface ContactProps {
  title: string;
  titleRu: string;
  emailLabel: string;
  emailLabelRu: string;
  phoneLabel: string;
  phoneLabelRu: string;
  locationLabel: string;
  locationLabelRu: string;
  email: string;
  phone: string;
  location: string;
  language?: 'en' | 'ru';
}

const ContactComponent = ({
  title,
  titleRu,
  emailLabel,
  emailLabelRu,
  phoneLabel,
  phoneLabelRu,
  locationLabel,
  locationLabelRu,
  email,
  phone,
  location,
  language = 'en'
}: ContactProps) => {
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
      className={`relative p-6 md:p-12 lg:p-16 bg-gray-50 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">{language === 'ru' ? titleRu : title}</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 mb-1">{language === 'ru' ? emailLabelRu : emailLabel}</p>
            <p className="text-lg font-medium">{email}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">{language === 'ru' ? phoneLabelRu : phoneLabel}</p>
            <p className="text-lg font-medium">{phone}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">{language === 'ru' ? locationLabelRu : locationLabel}</p>
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
    title: "Get In Touch",
    titleRu: "Свяжитесь с нами",
    emailLabel: "Email",
    emailLabelRu: "Электронная почта",
    phoneLabel: "Phone",
    phoneLabelRu: "Телефон",
    locationLabel: "Location",
    locationLabelRu: "Местоположение",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    language: 'en' as 'en' | 'ru',
  },
};

interface PricingProps {
  title: string;
  titleRu: string;
  plans: Array<{ name: string; nameRu: string; price: string; priceRu: string; features: string[]; featuresRu: string[] }>;
  language?: 'en' | 'ru';
}

const PricingComponent = ({ title, titleRu, plans, language = 'en' }: PricingProps) => {
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
      className={`relative p-6 md:p-12 lg:p-16 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">{language === 'ru' ? titleRu : title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200">
              <h3 className="text-xl font-bold mb-2">{language === 'ru' ? plan.nameRu : plan.name}</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">{language === 'ru' ? plan.priceRu : plan.price}</p>
              <ul className="space-y-2">
                {(language === 'ru' ? plan.featuresRu : plan.features).map((feature, featureIndex) => (
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
    title: "Pricing Plans",
    titleRu: "Тарифные планы",
    plans: [
      {
        name: "Basic",
        nameRu: "Базовый",
        price: "$99/mo",
        priceRu: "99$/мес",
        features: ["5 Projects", "10GB Storage", "Basic Support"],
        featuresRu: ["5 проектов", "10ГБ хранилища", "Базовая поддержка"],
      },
      {
        name: "Pro",
        nameRu: "Профессиональный",
        price: "$199/mo",
        priceRu: "199$/мес",
        features: ["Unlimited Projects", "100GB Storage", "Priority Support", "Advanced Analytics"],
        featuresRu: ["Неограниченные проекты", "100ГБ хранилища", "Приоритетная поддержка", "Расширенная аналитика"],
      },
      {
        name: "Enterprise",
        nameRu: "Корпоративный",
        price: "$499/mo",
        priceRu: "499$/мес",
        features: ["Unlimited Everything", "Custom Solutions", "24/7 Support", "Dedicated Manager"],
        featuresRu: ["Всё без ограничений", "Индивидуальные решения", "Поддержка 24/7", "Персональный менеджер"],
      },
    ],
    language: 'en' as 'en' | 'ru',
  },
};

// Testimonials Component
interface TestimonialsProps {
  title: string;
  titleRu: string;
  testimonials: Array<{ name: string; nameRu: string; role: string; roleRu: string; text: string; textRu: string; avatar?: string }>;
  language?: 'en' | 'ru';
}

const TestimonialsComponent = ({ title, titleRu, testimonials, language = 'en' }: TestimonialsProps) => {
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
      className={`relative p-6 md:p-12 lg:p-16 bg-gray-50 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-center">{language === 'ru' ? titleRu : title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {(language === 'ru' ? testimonial.nameRu : testimonial.name).charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold">{language === 'ru' ? testimonial.nameRu : testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{language === 'ru' ? testimonial.roleRu : testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{language === 'ru' ? testimonial.textRu : testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

TestimonialsComponent.craft = {
  displayName: "Testimonials",
  props: {
    title: "What Clients Say",
    titleRu: "Отзывы клиентов",
    testimonials: [
      { name: "Sarah Johnson", nameRu: "Сара Джонсон", role: "CEO, TechCorp", roleRu: "Генеральный директор, TechCorp", text: "Amazing work! Exceeded all expectations.", textRu: "Потрясающая работа! Превзошли все ожидания." },
      { name: "Mike Chen", nameRu: "Майк Чен", role: "Designer, Creative Co", roleRu: "Дизайнер, Creative Co", text: "Professional, creative, and on time.", textRu: "Профессионально, креативно и вовремя." },
      { name: "Emma Davis", nameRu: "Эмма Дэвис", role: "Founder, StartupXYZ", roleRu: "Основатель, StartupXYZ", text: "Best decision we made for our brand.", textRu: "Лучшее решение для нашего бренда." },
    ],
    language: 'en' as 'en' | 'ru',
  },
};

// Gallery Component
interface GalleryProps {
  title: string;
  titleRu: string;
  images: Array<{ url: string; title: string }>;
  columns: number;
  language?: 'en' | 'ru';
}

const GalleryComponent = ({ title, titleRu, images, columns, language = 'en' }: GalleryProps) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { actions: editorActions } = useEditor();

  const gridClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns] || "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className={`relative p-6 md:p-12 lg:p-16 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">{language === 'ru' ? titleRu : title}</h2>
        <div className={`grid ${gridClass} gap-4`}>
          {images.map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-gray-400" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-medium">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

GalleryComponent.craft = {
  displayName: "Gallery",
  props: {
    title: "Gallery",
    titleRu: "Галерея",
    images: [
      { url: "", title: "Project 1" },
      { url: "", title: "Project 2" },
      { url: "", title: "Project 3" },
      { url: "", title: "Project 4" },
      { url: "", title: "Project 5" },
      { url: "", title: "Project 6" },
    ],
    columns: 3,
    language: 'en' as 'en' | 'ru',
  },
};

// CTA Component
interface CTAProps {
  title: string;
  titleRu: string;
  description: string;
  descriptionRu: string;
  buttonText: string;
  buttonTextRu: string;
  backgroundColor: string;
  textColor: string;
  language?: 'en' | 'ru';
}

const CTAComponent = ({
  title,
  titleRu,
  description,
  descriptionRu,
  buttonText,
  buttonTextRu,
  backgroundColor,
  textColor,
  language = 'en'
}: CTAProps) => {
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
      className={`relative p-16 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
      style={{ backgroundColor }}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: textColor }}>
          {language === 'ru' ? titleRu : title}
        </h2>
        <p className="text-xl mb-8" style={{ color: textColor, opacity: 0.9 }}>
          {language === 'ru' ? descriptionRu : description}
        </p>
        <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg">
          {language === 'ru' ? buttonTextRu : buttonText}
        </button>
      </div>
    </div>
  );
};

CTAComponent.craft = {
  displayName: "Call to Action",
  props: {
    title: "Ready to Get Started?",
    titleRu: "Готовы начать?",
    description: "Join thousands of satisfied customers today",
    descriptionRu: "Присоединяйтесь к тысячам довольных клиентов сегодня",
    buttonText: "Get Started Now",
    buttonTextRu: "Начать сейчас",
    backgroundColor: "#667eea",
    textColor: "#ffffff",
    language: 'en' as 'en' | 'ru',
  },
};

// Timeline Component
interface TimelineProps {
  title: string;
  titleRu: string;
  steps: Array<{ year: string; title: string; titleRu: string; description: string; descriptionRu: string }>;
  language?: 'en' | 'ru';
}

const TimelineComponent = ({ title, titleRu, steps, language = 'en' }: TimelineProps) => {
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
      className={`relative p-6 md:p-12 lg:p-16 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-center">{language === 'ru' ? titleRu : title}</h2>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                {index < steps.length - 1 && <div className="w-0.5 flex-1 bg-blue-200 mt-2" />}
              </div>
              <div className="flex-1 pb-8">
                <div className="text-sm text-blue-600 font-semibold mb-1">{step.year}</div>
                <h3 className="text-xl font-bold mb-2">{language === 'ru' ? step.titleRu : step.title}</h3>
                <p className="text-gray-600">{language === 'ru' ? step.descriptionRu : step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

TimelineComponent.craft = {
  displayName: "Timeline",
  props: {
    title: "Our Journey",
    titleRu: "Наш путь",
    steps: [
      { year: "2020", title: "Company Founded", titleRu: "Основание компании", description: "Started with a vision to change the industry", descriptionRu: "Начали с видения изменить индустрию" },
      { year: "2021", title: "First Major Client", titleRu: "Первый крупный клиент", description: "Landed our first enterprise customer", descriptionRu: "Получили первого корпоративного клиента" },
      { year: "2022", title: "Team Expansion", titleRu: "Расширение команды", description: "Grew to 50+ team members", descriptionRu: "Выросли до 50+ членов команды" },
      { year: "2023", title: "Global Reach", titleRu: "Глобальное присутствие", description: "Expanded to 10+ countries worldwide", descriptionRu: "Расширились на 10+ стран по всему миру" },
    ],
    language: 'en' as 'en' | 'ru',
  },
};

// FAQ Component
interface FAQProps {
  title: string;
  titleRu: string;
  faqs: Array<{ question: string; questionRu: string; answer: string; answerRu: string }>;
  language?: 'en' | 'ru';
}

const FAQComponent = ({ title, titleRu, faqs, language = 'en' }: FAQProps) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { actions: editorActions } = useEditor();
  const displayTitle = language === 'ru' ? titleRu : title;

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className={`relative p-6 md:p-12 lg:p-16 bg-gray-50 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-center">{displayTitle}</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const displayQuestion = language === 'ru' ? faq.questionRu : faq.question;
            const displayAnswer = language === 'ru' ? faq.answerRu : faq.answer;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">{displayQuestion}</h3>
                <p className="text-gray-600">{displayAnswer}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

FAQComponent.craft = {
  displayName: "FAQ",
  props: {
    title: "Frequently Asked Questions",
    titleRu: "Часто задаваемые вопросы",
    faqs: [
      {
        question: "How does it work?",
        questionRu: "Как это работает?",
        answer: "It's simple and straightforward. Just sign up and get started in minutes.",
        answerRu: "Всё просто и понятно. Просто зарегистрируйтесь и начните работу за считанные минуты."
      },
      {
        question: "What's included?",
        questionRu: "Что входит в комплект?",
        answer: "All features are included in every plan with no hidden fees.",
        answerRu: "Все функции включены в каждый тариф без скрытых платежей."
      },
      {
        question: "Can I cancel anytime?",
        questionRu: "Могу ли я отменить подписку в любое время?",
        answer: "Yes, you can cancel your subscription at any time with no penalties.",
        answerRu: "Да, вы можете отменить подписку в любое время без штрафов."
      },
    ],
    language: 'en' as 'en' | 'ru',
  },
};

// Video Component
interface VideoProps {
  videoUrl: string;
  title: string;
  titleRu: string;
  description: string;
  descriptionRu: string;
  language?: 'en' | 'ru';
}

const VideoComponent = ({ videoUrl, title, titleRu, description, descriptionRu, language = 'en' }: VideoProps) => {
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
      className={`relative p-6 md:p-12 lg:p-16 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">{language === 'ru' ? titleRu : title}</h2>
        <p className="text-center text-gray-600 mb-8">{language === 'ru' ? descriptionRu : description}</p>
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
            </div>
            <p className="text-white">{language === 'ru' ? 'Видеоплеер' : 'Video Player Placeholder'}</p>
            <p className="text-white/60 text-sm mt-2">{videoUrl || (language === 'ru' ? 'Добавьте URL видео' : 'Add video URL')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

VideoComponent.craft = {
  displayName: "Video",
  props: {
    videoUrl: "https://www.youtube.com/watch?v=example",
    title: "Watch Our Story",
    titleRu: "Смотрите нашу историю",
    description: "See how we're making a difference",
    descriptionRu: "Узнайте, как мы меняем мир к лучшему",
    language: 'en' as 'en' | 'ru',
  },
};

// Social Media Links Component
interface SocialLinksProps {
  title: string;
  titleRu: string;
  links: Array<{ platform: string; url: string }>;
  language?: 'en' | 'ru';
}

const SocialLinksComponent = ({ title, titleRu, links, language = 'en' }: SocialLinksProps) => {
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
      className={`relative p-6 md:p-12 lg:p-16 border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                aria-label={language === 'ru' ? 'Удалить компонент' : 'Delete component'}
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {language === 'ru' ? 'Удалить компонент?' : 'Delete component?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {language === 'ru'
                    ? 'Это действие нельзя отменить. Компонент будет удален навсегда.'
                    : 'This action cannot be undone. The component will be permanently deleted.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => editorActions.delete(id)} className="bg-red-500 hover:bg-red-600">
                  {language === 'ru' ? 'Удалить' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">{language === 'ru' ? titleRu : title}</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-gray-900 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"
            >
              <span className="text-xl font-bold">{link.platform.charAt(0)}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

SocialLinksComponent.craft = {
  displayName: "Social Links",
  props: {
    title: "Connect With Us",
    titleRu: "Свяжитесь с нами",
    links: [
      { platform: "Facebook", url: "https://facebook.com" },
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
    ],
    language: 'en' as 'en' | 'ru',
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

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const t = {
    en: {
      title: "Start Creating Your Site",
      subtitle: isMobile
        ? "Tap components from the Components tab to add them to your site"
        : "Drag and drop components from the left panel to build your site structure",
      step1: "Choose Component",
      step1desc: isMobile ? "Tap on any component" : "Drag from left panel",
      step2: "Add to Canvas",
      step2desc: isMobile ? "It appears here" : "Drop it here",
      step3: "Customize",
      step3desc: "Edit colors & content",
      step4: "Save",
      step4desc: "Export your site",
      cta: isMobile ? "Switch to Components tab to begin" : "Choose components from the left panel to begin",
    },
    ru: {
      title: "Начните создавать свой сайт",
      subtitle: isMobile
        ? "Нажмите на компоненты во вкладке Компоненты, чтобы добавить их на сайт"
        : "Перетащите компоненты из левой панели, чтобы создать структуру сайта",
      step1: "Выберите компонент",
      step1desc: isMobile ? "Нажмите на компонент" : "Перетащите из панели",
      step2: "Добавьте на холст",
      step2desc: isMobile ? "Он появится здесь" : "Бросьте здесь",
      step3: "Настройте",
      step3desc: "Измените цвета и контент",
      step4: "Сохраните",
      step4desc: "Экспортируйте сайт",
      cta: isMobile ? "Перейдите на вкладку Компоненты" : "Выберите компоненты из панели слева",
    }
  };

  const text = language === 'ru' ? t.ru : t.en;

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className="min-h-[600px] flex items-center justify-center text-center p-4 sm:p-8"
    >
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-6xl mb-6 animate-bounce">🎨</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          {text.title}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {text.subtitle}
        </p>

        {/* Component Preview Cards */}
        <div className="mb-8">
          <div className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
            {language === 'ru' ? 'Популярные компоненты' : 'Popular Components'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {/* Hero Component */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] px-2 py-0.5">
                  {language === 'ru' ? 'Популярно' : 'Popular'}
                </Badge>
                <div className="text-3xl mb-2">👤</div>
                <div className="font-bold text-sm text-blue-900 mb-1">Hero</div>
                <div className="text-xs text-blue-700">{language === 'ru' ? 'Главный баннер' : 'Main banner'}</div>
              </div>
            </div>

            {/* About Component */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <Badge className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] px-2 py-0.5">
                  {language === 'ru' ? 'Популярно' : 'Popular'}
                </Badge>
                <div className="text-3xl mb-2">📝</div>
                <div className="font-bold text-sm text-purple-900 mb-1">About</div>
                <div className="text-xs text-purple-700">{language === 'ru' ? 'О компании' : 'About section'}</div>
              </div>
            </div>

            {/* Contact Component */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <Badge className="absolute top-2 right-2 bg-pink-600 text-white text-[10px] px-2 py-0.5">
                  {language === 'ru' ? 'Популярно' : 'Popular'}
                </Badge>
                <div className="text-3xl mb-2">📧</div>
                <div className="font-bold text-sm text-pink-900 mb-1">Contact</div>
                <div className="text-xs text-pink-700">{language === 'ru' ? 'Контакты' : 'Contact form'}</div>
              </div>
            </div>

            {/* More Components */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <div className="text-3xl mb-2">✨</div>
                <div className="font-bold text-sm text-green-900 mb-1">
                  {language === 'ru' ? '+9 еще' : '+9 more'}
                </div>
                <div className="text-xs text-green-700">{language === 'ru' ? 'Больше опций' : 'More options'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Flowchart */}
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">📦</div>
                <div className="font-bold text-sm mb-1">{text.step1}</div>
                <div className="text-xs opacity-90">{text.step1desc}</div>
              </div>
              {/* Arrow */}
              <div className="hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-blue-400 text-2xl">
                →
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">➕</div>
                <div className="font-bold text-sm mb-1">{text.step2}</div>
                <div className="text-xs opacity-90">{text.step2desc}</div>
              </div>
              {/* Arrow */}
              <div className="hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-purple-400 text-2xl">
                →
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">✨</div>
                <div className="font-bold text-sm mb-1">{text.step3}</div>
                <div className="text-xs opacity-90">{text.step3desc}</div>
              </div>
              {/* Arrow */}
              <div className="hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-pink-400 text-2xl">
                →
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">🚀</div>
                <div className="font-bold text-sm mb-1">{text.step4}</div>
                <div className="text-xs opacity-90">{text.step4desc}</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 shadow-md hover:shadow-lg transition-all hover:scale-105">
          <span className="text-3xl">{isMobile ? '👇' : '👈'}</span>
          <span className="text-sm sm:text-base font-semibold text-blue-900">
            {text.cta}
          </span>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-gray-600 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 justify-center bg-gray-50 p-3 rounded-lg">
            <span className="text-lg">💡</span>
            <span>{language === 'ru' ? 'Нажмите для редактирования' : 'Click to edit'}</span>
          </div>
          <div className="flex items-center gap-2 justify-center bg-gray-50 p-3 rounded-lg">
            <span className="text-lg">🎨</span>
            <span>{language === 'ru' ? 'Измените цвета и стили' : 'Customize colors & styles'}</span>
          </div>
          <div className="flex items-center gap-2 justify-center bg-gray-50 p-3 rounded-lg">
            <span className="text-lg">💾</span>
            <span>{language === 'ru' ? 'Сохраните когда готово' : 'Save when done'}</span>
          </div>
        </div>
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
    <div className="w-full md:w-80 bg-white border-l h-full overflow-y-auto">
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

const Toolbox = ({ language, setMobileView }: { language: 'en' | 'ru'; setMobileView?: (view: 'canvas' | 'components' | 'settings') => void }) => {
  const { connectors, actions, query } = useEditor((state, query) => ({
    enabled: state.options.enabled,
  }));
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMobileAdd = (component: React.ReactElement, onSuccess?: () => void) => {
    if (isMobile) {
      try {
        // On mobile, directly add to canvas instead of drag-drop
        const tree = query.getSerializedNodes();

        // Look for Container node first
        let containerNodeId = Object.keys(tree).find(
          id => tree[id] && tree[id].type && tree[id].type.resolvedName === 'Container'
        );

        // If Container not found, look for the first canvas-enabled node
        if (!containerNodeId) {
          containerNodeId = Object.keys(tree).find(
            id => tree[id] && tree[id].data && tree[id].data.props && tree[id].data.props.canvas
          );
        }

        // Final fallback to ROOT
        if (!containerNodeId && tree['ROOT']) {
          containerNodeId = 'ROOT';
        }

        if (containerNodeId) {
          const componentNodeTree = query.parseReactElement(component).toNodeTree();

          // Check if EmptyCanvas exists and remove it when adding first real component
          const emptyCanvasNode = Object.keys(tree).find(
            id => tree[id] && tree[id].type && tree[id].type.resolvedName === 'EmptyCanvas'
          );

          if (emptyCanvasNode) {
            actions.delete(emptyCanvasNode);
          }

          actions.addNodeTree(componentNodeTree, containerNodeId);

          // Call success callback if provided
          if (onSuccess) {
            setTimeout(() => {
              onSuccess();
            }, 300);
          }
        }
      } catch (error) {
        console.error('Error adding component:', error);
      }
    }
  };

  const labels = {
    en: {
      components: 'Components',
      unified: '⭐ Unified',
      unifiedHero: 'Hero',
      unifiedHeroDesc: 'Flexible hero with variants',
      unifiedStats: 'Stats',
      unifiedStatsDesc: 'Statistics grid',
      unifiedSkills: 'Skills',
      unifiedSkillsDesc: 'Skills tags',
      content: 'Content',
      contact: 'Contact',
      contactDesc: 'Contact section',
      about: 'About',
      aboutDesc: 'About section',
      projects: 'Projects',
      projectsDesc: 'Project showcase',
      pricing: 'Pricing',
      pricingDesc: 'Pricing tables',
      testimonials: 'Testimonials',
      testimonialsDesc: 'Client reviews',
      gallery: 'Gallery',
      galleryDesc: 'Image gallery',
      cta: 'Call to Action',
      ctaDesc: 'Action button section',
      timeline: 'Timeline',
      timelineDesc: 'Process steps',
      faq: 'FAQ',
      faqDesc: 'Q&A section',
      video: 'Video',
      videoDesc: 'Video player',
      social: 'Social Links',
      socialDesc: 'Social media links',
    },
    ru: {
      components: 'Компоненты',
      unified: '⭐ Унифицированные',
      unifiedHero: 'Главная секция',
      unifiedHeroDesc: 'Гибкая главная секция с вариантами',
      unifiedStats: 'Статистика',
      unifiedStatsDesc: 'Сетка статистики',
      unifiedSkills: 'Навыки',
      unifiedSkillsDesc: 'Теги навыков',
      content: 'Контент',
      contact: 'Контакты',
      contactDesc: 'Секция контактов',
      about: 'О нас',
      aboutDesc: 'Секция о нас',
      projects: 'Проекты',
      projectsDesc: 'Витрина проектов',
      pricing: 'Цены',
      pricingDesc: 'Таблицы цен',
      testimonials: 'Отзывы',
      testimonialsDesc: 'Отзывы клиентов',
      gallery: 'Галерея',
      galleryDesc: 'Галерея изображений',
      cta: 'Призыв к действию',
      ctaDesc: 'Секция с кнопкой',
      timeline: 'Временная шкала',
      timelineDesc: 'Этапы процесса',
      faq: 'Вопросы',
      faqDesc: 'Вопросы и ответы',
      video: 'Видео',
      videoDesc: 'Видеоплеер',
      social: 'Соцсети',
      socialDesc: 'Ссылки на соцсети',
    },
  };

  const t = labels[language];

  return (
    <div className="w-full md:w-64 bg-white border-r h-full overflow-y-auto">
      <div className="p-3 sm:p-4 border-b bg-gray-50">
        <h3 className="font-bold text-base sm:text-lg">{t.components}</h3>
        <p className="text-sm md:text-xs text-gray-700 mt-1 font-medium">{isMobile ? (language === 'ru' ? 'Нажмите для добавления' : 'Tap to add components') : 'Drag to canvas'}</p>
      </div>
      <div className="p-3 sm:p-4 space-y-3">
        {/* NEW UNIFIED COMPONENTS SECTION */}
        <div className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-2 flex items-center gap-2">
          <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded"></div>
          {t.unified}
        </div>

        {/* Unified Hero */}
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={Hero} language={language} variant="centered" canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={Hero} language={language} variant="centered" canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:border-purple-400 hover:shadow-md transition-all active:scale-95 cursor-pointer"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm flex items-center gap-2">
            <span className="text-purple-600 text-xl">✨</span>
            {t.unifiedHero}
          </div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.unifiedHeroDesc}
          </div>
        </button>

        {/* Unified Stats */}
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={Stats} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={Stats} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:border-purple-400 hover:shadow-md transition-all active:scale-95 cursor-pointer"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm flex items-center gap-2">
            <span className="text-purple-600 text-xl">✨</span>
            {t.unifiedStats}
          </div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.unifiedStatsDesc}
          </div>
        </button>

        {/* Unified Skills */}
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={Skills} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={Skills} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:border-purple-400 hover:shadow-md transition-all active:scale-95 cursor-pointer"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm flex items-center gap-2">
            <span className="text-purple-600 text-xl">✨</span>
            {t.unifiedSkills}
          </div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.unifiedSkillsDesc}
          </div>
        </button>

        {/* OTHER COMPONENTS SECTION */}
        <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2 mt-6 flex items-center gap-2">
          <div className="w-1 h-4 bg-green-500 rounded"></div>
          {t.content}
        </div>

        {/* Contact (Split-Screen style - kept until unified replacement) */}
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={SplitScreenContact} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={SplitScreenContact} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm">{t.contact}</div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.contactDesc}
          </div>
        </button>

        {/* Other content components */}
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={AboutComponent} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={AboutComponent} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm">{t.about}</div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.aboutDesc}
          </div>
        </button>
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={AboutComponent} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={AboutComponent} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm">{t.about}</div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.aboutDesc}
          </div>
        </button>
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={ProjectsComponent} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={ProjectsComponent} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm">{t.projects}</div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.projectsDesc}
          </div>
        </button>

        <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2 mt-6 flex items-center gap-2">
          <div className="w-1 h-4 bg-purple-500 rounded"></div>
          {t.content}
        </div>
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={PricingComponent} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={PricingComponent} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm">{t.pricing}</div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.pricingDesc}
          </div>
        </button>
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={TestimonialsComponent} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={TestimonialsComponent} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm">{t.testimonials}</div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.testimonialsDesc}
          </div>
        </button>
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={GalleryComponent} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={GalleryComponent} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm">{t.gallery}</div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.galleryDesc}
          </div>
        </button>
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={CTAComponent} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={CTAComponent} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm">{t.cta}</div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.ctaDesc}
          </div>
        </button>
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={TimelineComponent} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={TimelineComponent} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm">{t.timeline}</div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.timelineDesc}
          </div>
        </button>
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={FAQComponent} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={FAQComponent} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm">{t.faq}</div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.faqDesc}
          </div>
        </button>
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={VideoComponent} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={VideoComponent} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm">{t.video}</div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.videoDesc}
          </div>
        </button>
        <button
          ref={(ref) => {
            if (ref && !isMobile) {
              connectors.create(ref, <Element is={SocialLinksComponent} language={language} canvas />);
            }
          }}
          onClick={isMobile ? () => handleMobileAdd(
            <Element is={SocialLinksComponent} language={language} canvas />,
            () => setMobileView && setMobileView('canvas')
          ) : undefined}
          className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          style={{ touchAction: isMobile ? 'auto' : 'none' }}
        >
          <div className="font-semibold text-base md:text-sm">{t.social}</div>
          <div className="text-sm md:text-xs text-gray-700 mt-1 font-medium">
            {isMobile ? (language === 'ru' ? '👆 Нажмите чтобы добавить' : '👆 Tap to add') : t.socialDesc}
          </div>
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
  const hasSetActions = React.useRef(false);

  React.useEffect(() => {
    if (!hasSetActions.current) {
      setActions({ actions, query });
      hasSetActions.current = true;
    }
  }, [actions, query, setActions]);

  return null;
};

// ============================================
// MAIN BUILDER
// ============================================

export function CraftJSTemplateBuilder({ template }: { template: TemplateConfig }) {
  const { language, setLanguage } = useI18n(); // Use global language context
  const [isSaving, setIsSaving] = React.useState(false);
  const [editorActions, setEditorActions] = React.useState<any>(null);
  const [mobileView, setMobileView] = React.useState<'canvas' | 'components' | 'settings'>('canvas');
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [showTelegramModal, setShowTelegramModal] = React.useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = React.useState(false);

  // Keyboard Navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input/textarea
      if (
        (e.target as HTMLElement)?.tagName === 'INPUT' ||
        (e.target as HTMLElement)?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      // Delete key - delete selected component
      if (e.key === 'Delete' && editorActions?.query) {
        try {
          const selectedNodes = editorActions.query.getEvent('selected').all();
          if (selectedNodes.length > 0) {
            e.preventDefault();
            editorActions.delete(selectedNodes[0]);
          }
        } catch (err) {
          console.error('Error deleting component:', err);
        }
      }

      // Escape key - deselect component
      if (e.key === 'Escape' && editorActions) {
        e.preventDefault();
        editorActions.selectNode('');
      }

      // Ctrl/Cmd + S - save
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }

      // Ctrl/Cmd + Z - undo (if history is implemented)
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && editorActions?.history) {
        e.preventDefault();
        try {
          editorActions.history.undo();
        } catch (err) {
          console.log('Undo not available yet');
        }
      }

      // Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z - redo (if history is implemented)
      if (
        ((e.metaKey || e.ctrlKey) && e.key === 'y') ||
        ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z')
      ) {
        if (editorActions?.history) {
          e.preventDefault();
          try {
            editorActions.history.redo();
          } catch (err) {
            console.log('Redo not available yet');
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editorActions]);

  const handleSave = () => {
    setIsSaving(true);
    // TODO: Implement save/submit functionality
    // This will serialize the editor state and send to backend
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 1000);
  };

  const getTemplateData = () => {
    if (editorActions && editorActions.query) {
      try {
        const serializedNodes = editorActions.query.getSerializedNodes();
        return {
          templateId: template.id,
          templateName: template.name,
          language: language,
          nodes: serializedNodes,
          timestamp: new Date().toISOString(),
        };
      } catch (e) {
        console.error('Error serializing template:', e);
        return null;
      }
    }
    return null;
  };

  // Builder tour steps
  const builderTourSteps: TourStep[] = [
    {
      title: language === 'en' ? "Welcome to the Builder!" : "Добро пожаловать в конструктор!",
      content: language === 'en'
        ? "Let's quickly show you how to customize your template. This tour will only take 30 seconds!"
        : "Давайте быстро покажем, как настроить ваш шаблон. Этот тур займет всего 30 секунд!",
      position: "center",
    },
    {
      target: ".toolbox-container",
      title: language === 'en' ? "Add Components" : "Добавить компоненты",
      content: language === 'en'
        ? "Click these buttons to add new sections to your page. Try adding a Hero, About, or Contact section!"
        : "Нажмите эти кнопки, чтобы добавить новые секции на вашу страницу. Попробуйте добавить Hero, О нас или Контакты!",
      position: "right",
    },
    {
      target: ".craftjs-renderer",
      title: language === 'en' ? "Click to Edit" : "Нажмите для редактирования",
      content: language === 'en'
        ? "Click on any component in the preview to select it. On mobile, tap components to select them."
        : "Нажмите на любой компонент в предварительном просмотре, чтобы выбрать его. На мобильных устройствах нажмите, чтобы выбрать.",
      position: "left",
    },
    {
      target: ".settings-panel-container",
      title: language === 'en' ? "Customize Settings" : "Настройка параметров",
      content: language === 'en'
        ? "After selecting a component, change its colors, text, images, and more here. Changes appear instantly!"
        : "После выбора компонента измените его цвета, текст, изображения и многое другое здесь. Изменения появляются мгновенно!",
      position: "left",
    },
    {
      title: language === 'en' ? "You're Ready!" : "Вы готовы!",
      content: language === 'en'
        ? "That's it! Click components to edit, drag to rearrange, and save when done. Have fun building!"
        : "Вот и все! Нажимайте компоненты для редактирования, перетаскивайте для перестановки и сохраняйте, когда закончите. Удачи!",
      position: "center",
    },
  ];

  // Update all components when language changes
  React.useEffect(() => {
    if (editorActions && editorActions.query) {
      // Use setTimeout to avoid setState during render
      setTimeout(() => {
        try {
          const serializedNodes = editorActions.query.getSerializedNodes();
          const nodeIds = Object.keys(serializedNodes);
          nodeIds.forEach((nodeId) => {
            editorActions.actions.setProp(nodeId, (props: any) => {
              if (props.hasOwnProperty('language')) {
                props.language = language;
              }
            });
          });
        } catch (e) {
          // Ignore errors during Frame re-render
          console.log('Language update skipped during Frame re-render');
        }
      }, 0);
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b shadow-sm px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="hidden sm:inline font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div className="text-sm sm:text-xl font-bold text-gray-900 truncate">
              {template.name}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Language Toggle - Modern Segmented Control */}
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 gap-1 relative">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                language === 'en'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ru')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                language === 'ru'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              RU
            </button>
            <div className="absolute -top-2 -right-2 hidden sm:block">
              <TooltipHint
                content="Switch language to preview your site in English or Russian"
                contentRu="Переключите язык для предварительного просмотра сайта на английском или русском"
                position="bottom"
                language={language}
                trigger="hover"
              />
            </div>
          </div>

          {/* View Demo Button */}
          <div className="relative">
            <Link
              href={`/templates/${template.id}`}
              target="_blank"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 border-2 border-gray-300 hover:border-blue-600 rounded-lg font-semibold text-gray-700 hover:text-blue-600 bg-white hover:bg-blue-50 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'ru' ? 'Демо' : 'Demo'}</span>
            </Link>
            <div className="absolute -top-2 -right-2 hidden sm:block">
              <TooltipHint
                content="Preview the original template before customization"
                contentRu="Просмотр оригинального шаблона до настройки"
                position="bottom"
                language={language}
                trigger="hover"
              />
            </div>
          </div>

          {/* Send to Telegram Button */}
          <Button
            onClick={() => setShowTelegramModal(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2.5 rounded-lg font-semibold shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'ru' ? 'Отправить' : 'Send'}</span>
          </Button>

          {/* Send to WhatsApp Button */}
          <Button
            onClick={() => setShowWhatsAppModal(true)}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 sm:px-6 py-2.5 rounded-lg font-semibold shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'ru' ? 'WhatsApp' : 'WhatsApp'}</span>
          </Button>

          {/* Save Button - Enhanced Design */}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Settings className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save"}</span>
          </Button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="hidden sm:block bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-3 sm:px-6 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
            <span className="text-blue-600">ℹ️</span>
            {currentText.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
              <div className="font-semibold text-blue-600 mb-1 text-sm sm:text-base">{currentText.step1}</div>
              <div className="text-xs sm:text-sm text-gray-600">{currentText.step1desc}</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
              <div className="font-semibold text-blue-600 mb-1 text-sm sm:text-base">{currentText.step2}</div>
              <div className="text-xs sm:text-sm text-gray-600">{currentText.step2desc}</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
              <div className="font-semibold text-green-600 mb-1 text-sm sm:text-base">{currentText.step3}</div>
              <div className="text-xs sm:text-sm text-gray-600">{currentText.step3desc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <Editor
        resolver={{
          // NEW UNIFIED COMPONENTS (Recommended)
          Hero,
          Stats,
          Skills,
          // LEGACY COMPONENTS (Backward compatibility)
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
          TestimonialsComponent,
          GalleryComponent,
          CTAComponent,
          TimelineComponent,
          FAQComponent,
          VideoComponent,
          SocialLinksComponent,
          Container,
          EmptyCanvas,
        }}
      >
        <EditorActionsCapturer setActions={setEditorActions} />
        <div className="flex-1 flex relative min-h-0">
          {/* Toolbox - Hidden on mobile unless active */}
          <div className={`toolbox-container ${mobileView === 'components' ? 'block' : 'hidden'} md:block absolute md:relative inset-0 md:inset-auto z-20 md:z-auto`}>
            <Toolbox language={language} setMobileView={setMobileView} />
          </div>

          {/* Canvas - Always visible on desktop, conditionally on mobile */}
          <div
            className={`${mobileView === 'canvas' ? 'block' : 'hidden'} md:block flex-1 overflow-auto bg-gray-100 absolute md:relative inset-0 md:inset-auto`}
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

          {/* Settings Panel - Hidden on mobile unless active */}
          <div className={`settings-panel-container ${mobileView === 'settings' ? 'block' : 'hidden'} md:block absolute md:relative inset-0 md:inset-auto z-20 md:z-auto`}>
            <SettingsPanel />
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden bg-white border-t flex items-center justify-around py-3 sticky bottom-0 z-30 shadow-lg">
          <button
            onClick={() => setMobileView('components')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-md transition-colors relative ${
              mobileView === 'components' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-xs font-medium">{language === 'ru' ? 'Компоненты' : 'Components'}</span>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <TooltipHint
                content="Add new sections to your page"
                contentRu="Добавить новые секции на страницу"
                position="top"
                language={language}
                trigger="hover"
                persistent={true}
                storageKey="mobile-components-hint"
                insideButton={true}
              />
            </div>
          </button>
          <button
            onClick={() => setMobileView('canvas')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-md transition-colors relative ${
              mobileView === 'canvas' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <span className="text-xs font-medium">{language === 'ru' ? 'Холст' : 'Canvas'}</span>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <TooltipHint
                content="Tap components to select and edit them"
                contentRu="Нажмите компоненты для выбора и редактирования"
                position="top"
                language={language}
                trigger="hover"
                persistent={true}
                storageKey="mobile-canvas-hint"
                insideButton={true}
              />
            </div>
          </button>
          <button
            onClick={() => setMobileView('settings')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-md transition-colors relative ${
              mobileView === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs font-medium">{language === 'ru' ? 'Настройки' : 'Settings'}</span>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <TooltipHint
                content="Customize colors, text, and images"
                contentRu="Настройка цветов, текста и изображений"
                position="top"
                language={language}
                trigger="hover"
                persistent={true}
                storageKey="mobile-settings-hint"
                insideButton={true}
              />
            </div>
          </button>
        </div>
      </Editor>

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 animate-in slide-in-from-bottom-5">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className="font-semibold">
                {language === 'ru' ? 'Сохранено!' : 'Saved!'}
              </div>
              <div className="text-sm text-white/90">
                {language === 'ru'
                  ? 'Ваша настройка сохранена успешно'
                  : 'Your customization saved successfully'}
              </div>
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Builder Tour */}
      <OnboardingTour
        steps={builderTourSteps}
        tourKey="builder-tour"
        language={language}
        autoStart={true}
        showProgress={true}
      />

      {/* Send to Telegram Modal */}
      <SendToTelegramModal
        isOpen={showTelegramModal}
        onClose={() => setShowTelegramModal(false)}
        templateData={getTemplateData()}
        language={language}
      />

      {/* Send to WhatsApp Modal */}
      <SendToWhatsAppModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        templateData={getTemplateData()}
        language={language}
      />
    </div>
  );
}
