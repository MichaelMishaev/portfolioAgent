"use client";

import { useState } from "react";
import { TemplateConfig } from "@/lib/template-registry";
import { StyleGuide } from "./style-guide";
import { TryItPlayground } from "./try-it-playground";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Eye, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface StylePreviewProps {
  template: TemplateConfig;
}

export function StylePreview({ template: initialTemplate }: StylePreviewProps) {
  const { t, tt } = useI18n();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");

  // Get localized template data
  const templateData = tt[initialTemplate.id as keyof typeof tt];
  const template = templateData
    ? { ...initialTemplate, name: templateData.name, description: templateData.description, tags: templateData.tags || initialTemplate.tags }
    : initialTemplate;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.common.backToGallery}
            </Link>
            <h1 className="text-lg font-semibold">{template.name}</h1>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              {t.stylePreview.badge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{template.name}</h2>
            <p className="text-lg text-muted-foreground mb-6">{template.description}</p>

            {/* Explanation Box */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-1">
                    {t.stylePreview.title}
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {t.stylePreview.description}{" "}
                    <Link href={template.demoPath} className="font-semibold underline hover:text-blue-600">
                      {t.stylePreview.viewFullLink}
                    </Link>{" "}
                    {t.stylePreview.viewFullEnd}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {template.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-muted rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[40%_60%] gap-8 max-w-7xl mx-auto">
          {/* Left Column: Style Guide */}
          <div className="lg:sticky lg:top-24 self-start">
            <StyleGuide template={template} />
          </div>

          {/* Right Column: Try It Playground */}
          <div className="lg:sticky lg:top-24 self-start">
            <TryItPlayground
              template={template}
              firstName={firstName}
              lastName={lastName}
              title={title}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
              onTitleChange={setTitle}
            />
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">{t.stylePreview.cta.ready}</h3>
            <p className="text-muted-foreground mb-8">
              {t.stylePreview.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href={template.demoPath}>
                  <Eye className="w-4 h-4 mr-2" />
                  {t.stylePreview.cta.viewFullDemo}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/">
                  {t.stylePreview.cta.chooseAnother}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
