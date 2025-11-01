"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Library, Search, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  ContentPreset,
  contentPresets,
  getPresetsByCategory,
  searchPresets,
  categoryMetadata,
  getRandomPreset,
} from "@/lib/content-presets";

interface ContentLibraryProps {
  onSelectPreset: (preset: ContentPreset) => void;
}

export function ContentLibrary({ onSelectPreset }: ContentLibraryProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ContentPreset["category"] | "all"
  >("all");

  // Filter presets based on search and category
  const filteredPresets = (() => {
    let presets = contentPresets;

    // Filter by category
    if (selectedCategory !== "all") {
      presets = getPresetsByCategory(selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      presets = searchPresets(searchQuery);
    }

    return presets;
  })();

  const handleSelectPreset = (preset: ContentPreset) => {
    onSelectPreset(preset);
    setIsOpen(false);
  };

  const handleRandomPreset = () => {
    const randomPreset = getRandomPreset();
    onSelectPreset(randomPreset);
    setIsOpen(false);
  };

  const categories = [
    { key: "all" as const, label: "All", icon: "✨" },
    ...Object.entries(categoryMetadata).map(([key, meta]) => ({
      key: key as ContentPreset["category"],
      label: meta.label,
      icon: meta.icon,
    })),
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Library className="w-4 h-4 mr-2" />
          Content Library
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Library className="w-5 h-5" />
            Content Library
          </DialogTitle>
          <DialogDescription>
            Choose from pre-made examples to quickly populate your preview
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Search + Random Button */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              onClick={handleRandomPreset}
              className="shrink-0"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Random
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.key}
                size="sm"
                variant={selectedCategory === category.key ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.key)}
                className="shrink-0"
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>

          {/* Presets Grid */}
          <div className="flex-1 overflow-y-auto">
            {filteredPresets.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">
                  No presets found. Try a different search or category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
                {filteredPresets.map((preset, index) => (
                  <motion.div
                    key={preset.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Card
                      className="cursor-pointer hover:border-primary transition-colors group"
                      onClick={() => handleSelectPreset(preset)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-sm">
                                {preset.firstName} {preset.lastName}
                              </p>
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {preset.title}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs"
                        >
                          {categoryMetadata[preset.category].icon}{" "}
                          {preset.name}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="border-t pt-3 text-xs text-muted-foreground text-center">
            {filteredPresets.length} {filteredPresets.length === 1 ? "preset" : "presets"} available
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
