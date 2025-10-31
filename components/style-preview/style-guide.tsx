"use client";

import { TemplateConfig } from "@/lib/template-registry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Type, SquareMousePointer, FileInput } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface StyleGuideProps {
  template: TemplateConfig;
}

export function StyleGuide({ template }: StyleGuideProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t.stylePreview.styleGuide.title}</h2>
        <p className="text-sm text-muted-foreground">
          {t.stylePreview.styleGuide.subtitle}
        </p>
      </div>

      {/* Colors Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Palette className="w-5 h-5" />
            {t.stylePreview.styleGuide.colors}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div
                className="h-16 rounded-lg border shadow-sm"
                style={{ backgroundColor: template.colors.primary }}
              />
              <div className="text-xs">
                <p className="font-medium">{t.stylePreview.styleGuide.primary}</p>
                <p className="text-muted-foreground font-mono">{template.colors.primary}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div
                className="h-16 rounded-lg border shadow-sm"
                style={{ backgroundColor: template.colors.secondary }}
              />
              <div className="text-xs">
                <p className="font-medium">{t.stylePreview.styleGuide.secondary}</p>
                <p className="text-muted-foreground font-mono">{template.colors.secondary}</p>
              </div>
            </div>

            <div className="space-y-2 col-span-2">
              <div
                className="h-16 rounded-lg border shadow-sm"
                style={{ backgroundColor: template.colors.accent }}
              />
              <div className="text-xs">
                <p className="font-medium">{t.stylePreview.styleGuide.accent}</p>
                <p className="text-muted-foreground font-mono">{template.colors.accent}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Type className="w-5 h-5" />
            {t.stylePreview.styleGuide.typography}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h1
              className="text-4xl font-bold mb-1"
              style={{ fontFamily: template.fonts.heading }}
            >
              {t.stylePreview.styleGuide.yourName}
            </h1>
            <p className="text-xs text-muted-foreground">
              {template.fonts.heading} Bold 36px
            </p>
          </div>

          <div>
            <h2
              className="text-2xl font-semibold mb-1"
              style={{ fontFamily: template.fonts.heading }}
            >
              {t.stylePreview.styleGuide.yourRole}
            </h2>
            <p className="text-xs text-muted-foreground">
              {template.fonts.heading} Semibold 24px
            </p>
          </div>

          <div>
            <p
              className="text-base mb-1"
              style={{ fontFamily: template.fonts.body }}
            >
              {t.stylePreview.styleGuide.bodyText}
            </p>
            <p className="text-xs text-muted-foreground">
              {template.fonts.body} Regular 16px
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Buttons Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <SquareMousePointer className="w-5 h-5" />
            {t.stylePreview.styleGuide.buttons}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Button
              className="w-full"
              style={{
                backgroundColor: template.colors.accent,
                color: '#ffffff',
              }}
            >
              {t.stylePreview.styleGuide.primaryButton}
            </Button>
            <p className="text-xs text-muted-foreground">{t.stylePreview.styleGuide.primaryAction}</p>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              style={{
                borderColor: template.colors.accent,
                color: template.colors.accent,
              }}
            >
              {t.stylePreview.styleGuide.secondaryButton}
            </Button>
            <p className="text-xs text-muted-foreground">{t.stylePreview.styleGuide.secondaryAction}</p>
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full"
              style={{
                color: template.colors.accent,
              }}
            >
              {t.stylePreview.styleGuide.textButton}
            </Button>
            <p className="text-xs text-muted-foreground">{t.stylePreview.styleGuide.tertiaryAction}</p>
          </div>
        </CardContent>
      </Card>

      {/* Forms Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileInput className="w-5 h-5" />
            {t.stylePreview.styleGuide.forms}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.stylePreview.styleGuide.fullName}</label>
            <input
              type="text"
              placeholder={t.stylePreview.styleGuide.enterName}
              className="w-full px-3 py-2 border rounded-md bg-background"
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t.stylePreview.styleGuide.emailAddress}</label>
            <input
              type="email"
              placeholder={t.stylePreview.styleGuide.emailPlaceholder}
              className="w-full px-3 py-2 border rounded-md bg-background"
              disabled
            />
          </div>
        </CardContent>
      </Card>

      {/* Best For Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t.stylePreview.styleGuide.bestFor}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {template.bestFor.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
