"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Save,
  Download,
  Upload,
  Link2,
  FolderOpen,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PreviewPreferences,
  savePreferences,
  loadPreferences,
  savePreset,
  loadAllPresets,
  deletePreset,
  exportPreferencesAsJSON,
  importPreferencesFromFile,
  copyShareableLinkToClipboard,
} from "@/lib/preview-preferences";

interface SaveLoadPreferencesProps {
  currentPreferences: Omit<PreviewPreferences, "savedAt">;
  onLoadPreferences: (preferences: PreviewPreferences) => void;
}

export function SaveLoadPreferences({
  currentPreferences,
  onLoadPreferences,
}: SaveLoadPreferencesProps) {
  const { t } = useI18n();
  const [presets, setPresets] = useState<PreviewPreferences[]>(loadAllPresets());
  const [presetName, setPresetName] = useState("");
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleQuickSave = () => {
    const preferences: PreviewPreferences = {
      ...currentPreferences,
      savedAt: new Date().toISOString(),
    };
    savePreferences(preferences);
    alert("✓ Preferences saved!");
  };

  const handleSaveAsPreset = () => {
    if (!presetName.trim()) return;

    const preferences: PreviewPreferences = {
      ...currentPreferences,
      savedAt: new Date().toISOString(),
    };

    try {
      savePreset(preferences, presetName.trim());
      setPresets(loadAllPresets());
      setPresetName("");
      setIsSaveDialogOpen(false);
      alert(`✓ Preset "${presetName}" saved!`);
    } catch (error) {
      alert("Failed to save preset");
    }
  };

  const handleLoadPreset = (preset: PreviewPreferences) => {
    onLoadPreferences(preset);
    setIsLoadDialogOpen(false);
  };

  const handleDeletePreset = (name: string) => {
    if (confirm(`Delete preset "${name}"?`)) {
      deletePreset(name);
      setPresets(loadAllPresets());
    }
  };

  const handleExportJSON = () => {
    const preferences: PreviewPreferences = {
      ...currentPreferences,
      savedAt: new Date().toISOString(),
    };

    try {
      exportPreferencesAsJSON(preferences);
    } catch (error) {
      alert("Failed to export preferences");
    }
  };

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const preferences = await importPreferencesFromFile(file);
      onLoadPreferences(preferences);
      alert("✓ Preferences imported successfully!");
    } catch (error) {
      alert("Failed to import preferences file");
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCopyShareableLink = async () => {
    const preferences: PreviewPreferences = {
      ...currentPreferences,
      savedAt: new Date().toISOString(),
    };

    try {
      await copyShareableLinkToClipboard(preferences);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (error) {
      alert("Failed to copy link to clipboard");
    }
  };

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Save className="w-4 h-4" />
          {t.stylePreview.sharePreferences?.title || "Share & Export"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          size="lg"
          variant="default"
          onClick={handleCopyShareableLink}
          className="w-full"
        >
          <AnimatePresence>
            {showCopySuccess ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center"
              >
                <Check className="w-4 h-4 mr-2 text-white" />
                {t.stylePreview.sharePreferences?.copied || "Link Copied to Clipboard!"}
              </motion.div>
            ) : (
              <>
                <Link2 className="w-4 h-4 mr-2" />
                {t.stylePreview.sharePreferences?.shareButton || "Share Preview Link"}
              </>
            )}
          </AnimatePresence>
        </Button>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          {t.stylePreview.sharePreferences?.description || "Generate a shareable URL with all your current customizations"}
        </p>
      </CardContent>
    </Card>
  );
}
