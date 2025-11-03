"use client";

import { useNode, useEditor } from "@craftjs/core";
import React from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";

// ============================================
// UNIFIED HERO COMPONENT WITH VARIANTS
// ============================================

type HeroVariant = "centered" | "split-screen";

interface HeroProps {
  // Content
  name: string;
  nameRu: string;
  title: string;
  titleRu: string;
  tagline?: string;
  taglineRu?: string;
  location?: string;
  locationRu?: string;
  availability?: string;
  availabilityRu?: string;
  initials?: string;
  buttonText?: string;
  buttonTextRu?: string;

  // Visual
  imageUrl?: string;
  backgroundColor: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  subtitleColor: string;

  // Layout
  padding: number;
  fontSize: number;
  subtitleSize: number;
  variant: HeroVariant;

  // System
  language?: 'en' | 'ru';
}

export const Hero = ({
  name = "John Doe",
  nameRu = "Джон Доу",
  title = "Full Stack Developer & Designer",
  titleRu = "Full Stack разработчик и дизайнер",
  tagline = "Crafting experiences that matter through thoughtful design",
  taglineRu = "Создаю важные решения через продуманный дизайн",
  location = "San Francisco, CA",
  locationRu = "Сан-Франциско, США",
  availability = "Available for projects",
  availabilityRu = "Доступен для проектов",
  initials = "JD",
  buttonText = "View Projects",
  buttonTextRu = "Смотреть проекты",
  imageUrl,
  backgroundColor = "#1E293B",
  gradientFrom = "#1E293B",
  gradientTo = "#06B6D4",
  textColor = "#ffffff",
  subtitleColor = "#ffffff",
  padding = 80,
  fontSize = 48,
  subtitleSize = 24,
  variant = "centered",
  language = 'en',
}: HeroProps) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { actions: editorActions } = useEditor();

  // Mobile detection - show delete button always on mobile
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get display text based on language
  const displayName = language === 'ru' ? nameRu : name;
  const displayTitle = language === 'ru' ? titleRu : title;
  const displayTagline = language === 'ru' ? taglineRu : tagline;
  const displayLocation = language === 'ru' ? locationRu : location;
  const displayAvailability = language === 'ru' ? availabilityRu : availability;
  const displayButton = language === 'ru' ? buttonTextRu : buttonText;

  // Background style
  const backgroundStyle = imageUrl
    ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` };

  // CENTERED VARIANT
  if (variant === "centered") {
    return (
      <div
        ref={(ref) => ref && connect(drag(ref))}
        className={`relative text-center min-h-[180px] sm:min-h-[250px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
        style={{
          ...backgroundStyle,
          padding: `${padding}px`,
        }}
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
        <div className="relative z-10 max-w-4xl mx-auto">
          <FadeIn>
            <h1
              className="font-bold mb-4"
              style={{
                color: textColor,
                fontSize: `${fontSize}px`,
              }}
            >
              {displayName}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              style={{
                color: subtitleColor,
                fontSize: `${subtitleSize}px`,
                opacity: 0.9,
              }}
            >
              {displayTitle}
            </p>
          </FadeIn>
          {tagline && (
            <FadeIn delay={0.3}>
              <p className="mt-4 text-lg opacity-80" style={{ color: textColor }}>
                {displayTagline}
              </p>
            </FadeIn>
          )}
          {buttonText && (
            <FadeIn delay={0.4}>
              <Button size="lg" className="mt-8">
                {displayButton}
              </Button>
            </FadeIn>
          )}
        </div>
      </div>
    );
  }

  // SPLIT-SCREEN VARIANT
  return (
    <section
      ref={(ref) => ref && connect(drag(ref))}
      className={`min-h-[180px] sm:min-h-[250px] md:min-h-[400px] lg:min-h-[500px] flex items-center border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
      style={{ padding: `${padding}px 0` }}
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
      <div className="container mx-auto px-3 sm:px-3 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-8">
          {/* Left Side - Text */}
          <div className="flex flex-col justify-center">
            <FadeIn>
              <h1
                className="font-bold mb-6 leading-tight"
                style={{
                  color: textColor,
                  fontSize: `${fontSize}px`,
                }}
              >
                {displayName}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p
                className="mb-4"
                style={{
                  color: subtitleColor,
                  fontSize: `${subtitleSize}px`,
                }}
              >
                {displayTitle}
              </p>
            </FadeIn>
            {tagline && (
              <FadeIn delay={0.3}>
                <p className="text-lg mb-4 max-w-lg" style={{ color: textColor, opacity: 0.8 }}>
                  {displayTagline}
                </p>
              </FadeIn>
            )}
            {(location || availability) && (
              <FadeIn delay={0.35}>
                <div className="flex flex-col gap-2 mb-8 text-sm" style={{ color: textColor, opacity: 0.7 }}>
                  {location && <p>📍 {displayLocation}</p>}
                  {availability && <p>✓ {displayAvailability}</p>}
                </div>
              </FadeIn>
            )}
            {buttonText && (
              <FadeIn delay={0.4}>
                <Button size="lg" className="w-fit">
                  {displayButton} <FiArrowRight className="ml-2" />
                </Button>
              </FadeIn>
            )}
          </div>

          {/* Right Side - Visual */}
          <div className="flex items-center justify-center">
            <div
              className="w-full h-full max-h-[600px] rounded-3xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
              }}
            >
              <div className="text-9xl font-bold" style={{ color: textColor, opacity: 0.2 }}>
                {initials}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// SETTINGS PANEL
function HeroSettings() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as HeroProps,
  }));

  const language = props.language || 'en';

  const labels = {
    en: {
      variant: 'Layout Variant',
      centered: 'Centered',
      splitScreen: 'Split Screen',
      content: 'Content',
      name: 'Name',
      title: 'Title',
      tagline: 'Tagline (optional)',
      location: 'Location (optional)',
      availability: 'Availability (optional)',
      initials: 'Initials (for split-screen)',
      buttonText: 'Button Text (optional)',
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
      variant: 'Вариант макета',
      centered: 'По центру',
      splitScreen: 'Разделенный экран',
      content: 'Содержание',
      name: 'Имя',
      title: 'Заголовок',
      tagline: 'Слоган (опционально)',
      location: 'Местоположение (опционально)',
      availability: 'Доступность (опционально)',
      initials: 'Инициалы (для разделенного экрана)',
      buttonText: 'Текст кнопки (опционально)',
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
      {/* Variant Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold uppercase text-gray-700">{t.variant}</Label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setProp((props: HeroProps) => (props.variant = "centered"))}
            className={`px-3 py-2 text-sm border rounded ${
              props.variant === "centered"
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-white border-gray-300 hover:border-blue-400"
            }`}
          >
            {t.centered}
          </button>
          <button
            onClick={() => setProp((props: HeroProps) => (props.variant = "split-screen"))}
            className={`px-3 py-2 text-sm border rounded ${
              props.variant === "split-screen"
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-white border-gray-300 hover:border-blue-400"
            }`}
          >
            {t.splitScreen}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4 pt-4 border-t">
        <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">{t.content}</h4>

        <div>
          <Label className="text-sm font-medium">{t.name}</Label>
          <Input
            value={language === 'ru' ? props.nameRu : props.name}
            onChange={(e) => setProp((props: HeroProps) => {
              if (language === 'ru') {
                props.nameRu = e.target.value;
              } else {
                props.name = e.target.value;
              }
            })}
          />
        </div>

        <div>
          <Label className="text-sm font-medium">{t.title}</Label>
          <Input
            value={language === 'ru' ? props.titleRu : props.title}
            onChange={(e) => setProp((props: HeroProps) => {
              if (language === 'ru') {
                props.titleRu = e.target.value;
              } else {
                props.title = e.target.value;
              }
            })}
          />
        </div>

        <div>
          <Label className="text-sm font-medium">{t.tagline}</Label>
          <Textarea
            value={language === 'ru' ? props.taglineRu : props.tagline}
            onChange={(e) => setProp((props: HeroProps) => {
              if (language === 'ru') {
                props.taglineRu = e.target.value;
              } else {
                props.tagline = e.target.value;
              }
            })}
            rows={2}
          />
        </div>

        {props.variant === "split-screen" && (
          <>
            <div>
              <Label className="text-sm font-medium">{t.location}</Label>
              <Input
                value={language === 'ru' ? props.locationRu : props.location}
                onChange={(e) => setProp((props: HeroProps) => {
                  if (language === 'ru') {
                    props.locationRu = e.target.value;
                  } else {
                    props.location = e.target.value;
                  }
                })}
              />
            </div>

            <div>
              <Label className="text-sm font-medium">{t.availability}</Label>
              <Input
                value={language === 'ru' ? props.availabilityRu : props.availability}
                onChange={(e) => setProp((props: HeroProps) => {
                  if (language === 'ru') {
                    props.availabilityRu = e.target.value;
                  } else {
                    props.availability = e.target.value;
                  }
                })}
              />
            </div>

            <div>
              <Label className="text-sm font-medium">{t.initials}</Label>
              <Input
                value={props.initials}
                onChange={(e) => setProp((props: HeroProps) => (props.initials = e.target.value))}
                maxLength={3}
              />
            </div>
          </>
        )}

        <div>
          <Label className="text-sm font-medium">{t.buttonText}</Label>
          <Input
            value={language === 'ru' ? props.buttonTextRu : props.buttonText}
            onChange={(e) => setProp((props: HeroProps) => {
              if (language === 'ru') {
                props.buttonTextRu = e.target.value;
              } else {
                props.buttonText = e.target.value;
              }
            })}
          />
        </div>

        {props.variant === "centered" && (
          <div>
            <Label className="text-sm font-medium">{t.bgImage}</Label>
            <Input
              type="text"
              value={props.imageUrl || ""}
              onChange={(e) => setProp((props: HeroProps) => (props.imageUrl = e.target.value))}
              placeholder="https://..."
            />
          </div>
        )}
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
              <Input
                type="text"
                value={props.gradientFrom}
                onChange={(e) => setProp((props: HeroProps) => (props.gradientFrom = e.target.value))}
                className="flex-1"
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
              <Input
                type="text"
                value={props.gradientTo}
                onChange={(e) => setProp((props: HeroProps) => (props.gradientTo = e.target.value))}
                className="flex-1"
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

// CRAFT.JS CONFIG
Hero.craft = {
  displayName: "Hero",
  props: {
    name: "John Doe",
    nameRu: "Джон Доу",
    title: "Full Stack Developer & Designer",
    titleRu: "Full Stack разработчик и дизайнер",
    tagline: "Crafting experiences that matter through thoughtful design",
    taglineRu: "Создаю важные решения через продуманный дизайн",
    location: "San Francisco, CA",
    locationRu: "Сан-Франциско, США",
    availability: "Available for projects",
    availabilityRu: "Доступен для проектов",
    initials: "JD",
    buttonText: "View Projects",
    buttonTextRu: "Смотреть проекты",
    imageUrl: "",
    backgroundColor: "#1E293B",
    gradientFrom: "#1E293B",
    gradientTo: "#06B6D4",
    textColor: "#ffffff",
    subtitleColor: "#ffffff",
    padding: 80,
    fontSize: 48,
    subtitleSize: 24,
    variant: "centered" as HeroVariant,
    language: 'en' as 'en' | 'ru',
  },
  related: {
    settings: HeroSettings,
  },
};
