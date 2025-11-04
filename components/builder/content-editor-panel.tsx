"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { builderContent, type BuilderContent } from "@/lib/builder-content";
import { FileText, User, Briefcase, MessageSquare, Star, Mail, ChevronDown, ChevronRight, Save, RotateCcw } from "lucide-react";

interface ContentEditorPanelProps {
  language?: 'en' | 'ru';
}

export const ContentEditorPanel: React.FC<ContentEditorPanelProps> = ({ language = 'en' }) => {
  const [content, setContent] = useState<BuilderContent>(builderContent);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personal: true,
    hero: false,
    about: false,
    skills: false,
    work: false,
    stats: false,
    testimonials: false,
    contact: false,
  });

  const labels = {
    en: {
      panelTitle: "Content Editor",
      panelSubtitle: "Edit your portfolio content",
      personal: "Personal Information",
      hero: "Hero Section",
      about: "About Section",
      skills: "Skills & Technologies",
      work: "Work & Projects",
      stats: "Stats & Achievements",
      testimonials: "Testimonials",
      contact: "Contact Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      location: "Location",
      avatar: "Avatar URL",
      heroTitle: "Title",
      heroSubtitle: "Subtitle",
      description: "Description",
      ctaButton: "CTA Button Text",
      ctaLink: "CTA Link",
      heading: "Heading",
      bio: "Biography",
      highlights: "Highlights",
      categories: "Categories",
      projects: "Projects",
      social: "Social Links",
      save: "Save Changes",
      reset: "Reset to Default",
      english: "English",
      russian: "Russian",
      searchPlaceholder: "Search content...",
    },
    ru: {
      panelTitle: "Редактор контента",
      panelSubtitle: "Редактирование содержимого портфолио",
      personal: "Личная информация",
      hero: "Первый экран",
      about: "О себе",
      skills: "Навыки и технологии",
      work: "Работы и проекты",
      stats: "Статистика и достижения",
      testimonials: "Отзывы",
      contact: "Контактная информация",
      firstName: "Имя",
      lastName: "Фамилия",
      email: "Электронная почта",
      phone: "Телефон",
      location: "Местоположение",
      avatar: "URL аватара",
      heroTitle: "Заголовок",
      heroSubtitle: "Подзаголовок",
      description: "Описание",
      ctaButton: "Текст кнопки",
      ctaLink: "Ссылка кнопки",
      heading: "Заголовок",
      bio: "Биография",
      highlights: "Основные моменты",
      categories: "Категории",
      projects: "Проекты",
      social: "Социальные сети",
      save: "Сохранить изменения",
      reset: "Восстановить умолчания",
      english: "Английский",
      russian: "Русский",
      searchPlaceholder: "Поиск контента...",
    }
  };

  const t = labels[language];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality (e.g., to localStorage or API)
    console.log("Saving content:", content);
    alert(language === 'ru' ? 'Контент сохранён!' : 'Content saved!');
  };

  const handleReset = () => {
    if (confirm(language === 'ru' ? 'Сбросить всё к значениям по умолчанию?' : 'Reset all to default values?')) {
      setContent(builderContent);
    }
  };

  return (
    <div className="h-full bg-white border-l flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-5 h-5 text-purple-600" />
          <h3 className="font-bold text-lg text-gray-900">{t.panelTitle}</h3>
        </div>
        <p className="text-sm text-gray-600">{t.panelSubtitle}</p>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b bg-gray-50">
        <div className="relative">
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            className="pl-10 bg-white"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Content Sections - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {/* Personal Information Section */}
        <SectionAccordion
          title={t.personal}
          icon={<User className="w-4 h-4" />}
          isExpanded={expandedSections.personal}
          onToggle={() => toggleSection('personal')}
        >
          <div className="space-y-3">
            <BilingualInput
              label={t.firstName}
              valueEn={content.personal.firstName.en}
              valueRu={content.personal.firstName.ru}
              onChangeEn={(val) => setContent(prev => ({
                ...prev,
                personal: { ...prev.personal, firstName: { ...prev.personal.firstName, en: val } }
              }))}
              onChangeRu={(val) => setContent(prev => ({
                ...prev,
                personal: { ...prev.personal, firstName: { ...prev.personal.firstName, ru: val } }
              }))}
            />

            <BilingualInput
              label={t.lastName}
              valueEn={content.personal.lastName.en}
              valueRu={content.personal.lastName.ru}
              onChangeEn={(val) => setContent(prev => ({
                ...prev,
                personal: { ...prev.personal, lastName: { ...prev.personal.lastName, en: val } }
              }))}
              onChangeRu={(val) => setContent(prev => ({
                ...prev,
                personal: { ...prev.personal, lastName: { ...prev.personal.lastName, ru: val } }
              }))}
            />

            <div>
              <Label className="text-xs text-gray-600">{t.email}</Label>
              <Input
                value={content.personal.email}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  personal: { ...prev.personal, email: e.target.value }
                }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-gray-600">{t.phone}</Label>
              <Input
                value={content.personal.phone}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  personal: { ...prev.personal, phone: e.target.value }
                }))}
                className="mt-1"
              />
            </div>

            <BilingualInput
              label={t.location}
              valueEn={content.personal.location.en}
              valueRu={content.personal.location.ru}
              onChangeEn={(val) => setContent(prev => ({
                ...prev,
                personal: { ...prev.personal, location: { ...prev.personal.location, en: val } }
              }))}
              onChangeRu={(val) => setContent(prev => ({
                ...prev,
                personal: { ...prev.personal, location: { ...prev.personal.location, ru: val } }
              }))}
            />
          </div>
        </SectionAccordion>

        {/* Hero Section */}
        <SectionAccordion
          title={t.hero}
          icon={<Star className="w-4 h-4" />}
          isExpanded={expandedSections.hero}
          onToggle={() => toggleSection('hero')}
        >
          <div className="space-y-3">
            <BilingualTextarea
              label={t.heroTitle}
              valueEn={content.hero.title.en}
              valueRu={content.hero.title.ru}
              onChangeEn={(val) => setContent(prev => ({
                ...prev,
                hero: { ...prev.hero, title: { ...prev.hero.title, en: val } }
              }))}
              onChangeRu={(val) => setContent(prev => ({
                ...prev,
                hero: { ...prev.hero, title: { ...prev.hero.title, ru: val } }
              }))}
            />

            <BilingualTextarea
              label={t.heroSubtitle}
              valueEn={content.hero.subtitle.en}
              valueRu={content.hero.subtitle.ru}
              onChangeEn={(val) => setContent(prev => ({
                ...prev,
                hero: { ...prev.hero, subtitle: { ...prev.hero.subtitle, en: val } }
              }))}
              onChangeRu={(val) => setContent(prev => ({
                ...prev,
                hero: { ...prev.hero, subtitle: { ...prev.hero.subtitle, ru: val } }
              }))}
            />

            <BilingualTextarea
              label={t.description}
              valueEn={content.hero.description.en}
              valueRu={content.hero.description.ru}
              rows={3}
              onChangeEn={(val) => setContent(prev => ({
                ...prev,
                hero: { ...prev.hero, description: { ...prev.hero.description, en: val } }
              }))}
              onChangeRu={(val) => setContent(prev => ({
                ...prev,
                hero: { ...prev.hero, description: { ...prev.hero.description, ru: val } }
              }))}
            />
          </div>
        </SectionAccordion>

        {/* About Section */}
        <SectionAccordion
          title={t.about}
          icon={<User className="w-4 h-4" />}
          isExpanded={expandedSections.about}
          onToggle={() => toggleSection('about')}
        >
          <div className="space-y-3">
            <BilingualInput
              label={t.heading}
              valueEn={content.about.heading.en}
              valueRu={content.about.heading.ru}
              onChangeEn={(val) => setContent(prev => ({
                ...prev,
                about: { ...prev.about, heading: { ...prev.about.heading, en: val } }
              }))}
              onChangeRu={(val) => setContent(prev => ({
                ...prev,
                about: { ...prev.about, heading: { ...prev.about.heading, ru: val } }
              }))}
            />

            <BilingualTextarea
              label={t.bio}
              valueEn={content.about.bio.en}
              valueRu={content.about.bio.ru}
              rows={4}
              onChangeEn={(val) => setContent(prev => ({
                ...prev,
                about: { ...prev.about, bio: { ...prev.about.bio, en: val } }
              }))}
              onChangeRu={(val) => setContent(prev => ({
                ...prev,
                about: { ...prev.about, bio: { ...prev.about.bio, ru: val } }
              }))}
            />
          </div>
        </SectionAccordion>

        {/* Contact Section */}
        <SectionAccordion
          title={t.contact}
          icon={<Mail className="w-4 h-4" />}
          isExpanded={expandedSections.contact}
          onToggle={() => toggleSection('contact')}
        >
          <div className="space-y-3">
            <BilingualInput
              label={t.heading}
              valueEn={content.contact.heading.en}
              valueRu={content.contact.heading.ru}
              onChangeEn={(val) => setContent(prev => ({
                ...prev,
                contact: { ...prev.contact, heading: { ...prev.contact.heading, en: val } }
              }))}
              onChangeRu={(val) => setContent(prev => ({
                ...prev,
                contact: { ...prev.contact, heading: { ...prev.contact.heading, ru: val } }
              }))}
            />

            <BilingualTextarea
              label={t.description}
              valueEn={content.contact.message.en}
              valueRu={content.contact.message.ru}
              rows={3}
              onChangeEn={(val) => setContent(prev => ({
                ...prev,
                contact: { ...prev.contact, message: { ...prev.contact.message, en: val } }
              }))}
              onChangeRu={(val) => setContent(prev => ({
                ...prev,
                contact: { ...prev.contact, message: { ...prev.contact.message, ru: val } }
              }))}
            />

            <div>
              <Label className="text-xs text-gray-600 mb-2 block">{t.social}</Label>
              <div className="space-y-2">
                <Input
                  placeholder="GitHub URL"
                  value={content.contact.social.github || ''}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, social: { ...prev.contact.social, github: e.target.value } }
                  }))}
                  className="text-sm"
                />
                <Input
                  placeholder="LinkedIn URL"
                  value={content.contact.social.linkedin || ''}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, social: { ...prev.contact.social, linkedin: e.target.value } }
                  }))}
                  className="text-sm"
                />
                <Input
                  placeholder="Twitter URL"
                  value={content.contact.social.twitter || ''}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, social: { ...prev.contact.social, twitter: e.target.value } }
                  }))}
                  className="text-sm"
                />
                <Input
                  placeholder="Telegram URL"
                  value={content.contact.social.telegram || ''}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, social: { ...prev.contact.social, telegram: e.target.value } }
                  }))}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </SectionAccordion>

      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t bg-gray-50 space-y-2">
        <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          {t.save}
        </Button>
        <Button onClick={handleReset} variant="outline" className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          {t.reset}
        </Button>
      </div>
    </div>
  );
};

// Section Accordion Component
interface SectionAccordionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const SectionAccordion: React.FC<SectionAccordionProps> = ({ title, icon, isExpanded, onToggle, children }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="text-blue-600">{icon}</div>
          <span className="font-semibold text-sm text-gray-900">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="p-4 border-t bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
};

// Bilingual Input Component
interface BilingualInputProps {
  label: string;
  valueEn: string;
  valueRu: string;
  onChangeEn: (value: string) => void;
  onChangeRu: (value: string) => void;
}

const BilingualInput: React.FC<BilingualInputProps> = ({ label, valueEn, valueRu, onChangeEn, onChangeRu }) => {
  return (
    <div>
      <Label className="text-xs text-gray-600 mb-2 block">{label}</Label>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 w-6">EN</span>
          <Input
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            placeholder="English"
            className="flex-1 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 w-6">RU</span>
          <Input
            value={valueRu}
            onChange={(e) => onChangeRu(e.target.value)}
            placeholder="Русский"
            className="flex-1 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

// Bilingual Textarea Component
interface BilingualTextareaProps {
  label: string;
  valueEn: string;
  valueRu: string;
  rows?: number;
  onChangeEn: (value: string) => void;
  onChangeRu: (value: string) => void;
}

const BilingualTextarea: React.FC<BilingualTextareaProps> = ({ label, valueEn, valueRu, rows = 2, onChangeEn, onChangeRu }) => {
  return (
    <div>
      <Label className="text-xs text-gray-600 mb-2 block">{label}</Label>
      <div className="space-y-2">
        <div className="space-y-1">
          <span className="text-xs text-gray-500">EN</span>
          <Textarea
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            placeholder="English"
            rows={rows}
            className="text-sm resize-none"
          />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-gray-500">RU</span>
          <Textarea
            value={valueRu}
            onChange={(e) => onChangeRu(e.target.value)}
            placeholder="Русский"
            rows={rows}
            className="text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentEditorPanel;
