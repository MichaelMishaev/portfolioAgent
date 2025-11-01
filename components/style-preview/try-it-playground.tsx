"use client";

import { TemplateConfig } from "@/lib/template-registry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Zap } from "lucide-react";
import { EnhancedLivePreview } from "./enhanced-live-preview";
import { DevicePreviewSwitcher } from "./device-preview-switcher";
import { AvatarUpload } from "./avatar-upload";
import { useI18n } from "@/lib/i18n-context";

interface TryItPlaygroundProps {
  template: TemplateConfig;
  firstName: string;
  lastName: string;
  title: string;
  avatarImage: string | null;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onAvatarChange: (value: string | null) => void;
}

export function TryItPlayground({
  template,
  firstName,
  lastName,
  title,
  avatarImage,
  onFirstNameChange,
  onLastNameChange,
  onTitleChange,
  onAvatarChange,
}: TryItPlaygroundProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold">{t.stylePreview.playground.title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {t.stylePreview.playground.subtitle}
        </p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {t.stylePreview.playground.yourInfo}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AvatarUpload
            currentImage={avatarImage}
            onImageChange={onAvatarChange}
          />

          <div className="space-y-2">
            <Label htmlFor="firstName">{t.stylePreview.playground.firstName}</Label>
            <Input
              id="firstName"
              type="text"
              placeholder={t.stylePreview.playground.placeholders.firstName}
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">{t.stylePreview.playground.lastName}</Label>
            <Input
              id="lastName"
              type="text"
              placeholder={t.stylePreview.playground.placeholders.lastName}
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">{t.stylePreview.playground.roleTitle}</Label>
            <Input
              id="title"
              type="text"
              placeholder={t.stylePreview.playground.placeholders.title}
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <h3 className="text-lg font-semibold">{t.stylePreview.playground.livePreview}</h3>
        </div>

        <DevicePreviewSwitcher>
          <EnhancedLivePreview
            template={template}
            firstName={firstName}
            lastName={lastName}
            title={title}
            avatarImage={avatarImage}
          />
        </DevicePreviewSwitcher>

        <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
          <Zap className="w-3 h-3" />
          {t.stylePreview.playground.updatesRealtime}
        </p>
      </div>
    </div>
  );
}
