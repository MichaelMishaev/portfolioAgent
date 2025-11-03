"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTemplates } from "@/lib/template-registry";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryMenu } from "@/components/shared/category-menu";
import { Input } from "@/components/ui/input";
import {
  FiExternalLink,
  FiMessageCircle,
  FiEye,
  FiFolder,
  FiEdit3,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { useI18n } from "@/lib/i18n-context";
import { TooltipHint } from "@/components/ui/tooltip-hint";

// Priority order for categories
const categoryOrder = [
  "all",
  "Online Business",
  "Service",
  "Product",
  "Blog",
  // Rest will be sorted alphabetically
];

export function TemplateGallery() {
  const { language, t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = searchParams.get("category") || "all";
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedTag, setSelectedTag] = useState<string | null>(searchParams.get("tag") || null);

  // Restore scroll position and all filters when returning from template detail page
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('gallery-scroll-position');
    const savedCategory = sessionStorage.getItem('gallery-category');
    const savedSearch = sessionStorage.getItem('gallery-search');
    const savedTag = sessionStorage.getItem('gallery-tag');

    // Restore filters first
    const needsRestore = savedCategory || savedSearch || savedTag;
    if (needsRestore) {
      const params = new URLSearchParams();

      // Restore category
      if (savedCategory && savedCategory !== "all") {
        params.set("category", savedCategory);
      }

      // Restore search query
      if (savedSearch) {
        params.set("search", savedSearch);
        setSearchQuery(savedSearch);
      }

      // Restore selected tag
      if (savedTag) {
        params.set("tag", savedTag);
        setSelectedTag(savedTag);
      }

      router.replace(`/?${params.toString()}`, { scroll: false });

      // Clean up
      sessionStorage.removeItem('gallery-category');
      sessionStorage.removeItem('gallery-search');
      sessionStorage.removeItem('gallery-tag');
    }

    // Restore scroll position after a short delay to ensure content is rendered
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
        sessionStorage.removeItem('gallery-scroll-position');
      }, 100);
    }
  }, []);

  // Save all filter states before navigating to template
  const handleTemplateClick = (e: React.MouseEvent) => {
    sessionStorage.setItem('gallery-scroll-position', window.scrollY.toString());
    sessionStorage.setItem('gallery-category', filter);

    // Save search query if present
    if (searchQuery) {
      sessionStorage.setItem('gallery-search', searchQuery);
    }

    // Save selected tag if present
    if (selectedTag) {
      sessionStorage.setItem('gallery-tag', selectedTag);
    }
  };

  const templates = getTemplates(language);

  // Get all unique categories and sort them according to priority
  const allCategories = ["all", ...Array.from(new Set(templates.map(t => t.category)))];
  const categories = allCategories.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    // If both are in priority list, sort by priority
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // If only A is in priority, A comes first
    if (indexA !== -1) return -1;
    // If only B is in priority, B comes first
    if (indexB !== -1) return 1;
    // Otherwise sort alphabetically
    return a.localeCompare(b);
  });

  // Combined filtering: category + search + tag
  const filteredTemplates = templates.filter(template => {
    // Category filter
    const matchesCategory = filter === "all" || template.category === filter;

    // Text search filter (search in name, description, and tags)
    const matchesSearch = !searchQuery ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Tag filter (exact match or contains)
    const matchesTag = !selectedTag ||
      template.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());

    return matchesCategory && matchesSearch && matchesTag;
  });

  const handleFilterChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    // Preserve search and tag params
    if (searchQuery) params.set("search", searchQuery);
    if (selectedTag) params.set("tag", selectedTag);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    // Preserve category and tag params
    if (filter !== "all") params.set("category", filter);
    if (selectedTag) params.set("tag", selectedTag);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const clearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    if (filter !== "all") params.set("category", filter);
    if (selectedTag) params.set("tag", selectedTag);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);

    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (newTag) {
      params.set("tag", newTag);
    } else {
      params.delete("tag");
    }
    // Preserve search and category params
    if (searchQuery) params.set("search", searchQuery);
    if (filter !== "all") params.set("category", filter);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  // Prepare data for CategoryMenu
  const categoryLabels = Object.fromEntries(
    categories.map(cat => [cat, t.categories[cat as keyof typeof t.categories] || cat])
  );

  const categoryCounts = Object.fromEntries(
    categories.map(cat => [
      cat,
      cat === "all" ? templates.length : templates.filter(t => t.category === cat).length
    ])
  );

  return (
    <div className="relative">
      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <div className="relative max-w-2xl mx-auto">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder={language === 'en' ? "Search templates by name, description, or tags..." : "Поиск по названию, описанию или тегам..."}
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-12 pr-12 py-6 text-base rounded-full border-2 focus:border-primary"
          />
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <TooltipHint
              content="Search by template name, description, features, or tags. Try searching for 'modern', 'portfolio', or 'business'."
              contentRu="Поиск по названию, описанию, функциям или тегам шаблона. Попробуйте искать 'современный', 'портфолио' или 'бизнес'."
              title="Smart Search"
              titleRu="Умный поиск"
              position="bottom"
              language={language}
            />
          </div>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Active Filters */}
        {(selectedTag || searchQuery) && (
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {searchQuery && (
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-sm cursor-pointer hover:bg-destructive/10"
                onClick={clearSearch}
              >
                Search: "{searchQuery}" <FiX className="ml-1 w-3 h-3" />
              </Badge>
            )}
            {selectedTag && (
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-sm cursor-pointer hover:bg-destructive/10"
                onClick={() => handleTagClick(selectedTag)}
              >
                Tag: {selectedTag} <FiX className="ml-1 w-3 h-3" />
              </Badge>
            )}
          </div>
        )}
      </motion.div>

      {/* Hamburger Category Menu */}
      <CategoryMenu
        categories={categories}
        activeCategory={filter}
        onCategoryChange={handleFilterChange}
        categoryLabels={categoryLabels}
        categoryCounts={categoryCounts}
      />

      {/* Current Category Info */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6 text-center"
      >
        <p className="text-sm text-foreground/60">
          {filteredTemplates.length} {filteredTemplates.length === 1 ? 'project' : 'projects'}
          {filter !== "all" && ` in ${t.categories[filter as keyof typeof t.categories] || filter}`}
        </p>
      </motion.div>

      {/* Template Grid */}
      <div id="templates-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
          >
            <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="p-0 flex-shrink-0">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-t-lg relative overflow-hidden">
                  <img
                    src={template.thumbnail}
                    alt={`${template.name} preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to gradient background if image fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </CardHeader>

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors line-clamp-2 flex-1">
                    {template.name}
                  </CardTitle>
                  <Badge className="flex-shrink-0 text-xs" variant="secondary">
                    {t.ui[template.difficulty]}
                  </Badge>
                </div>

                <CardDescription className="text-sm line-clamp-2 mb-3 min-h-[40px]">
                  {template.description}
                </CardDescription>

                {/* Best For - Clickable Chips (Who this site is good for) */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs text-muted-foreground mr-1">
                    {language === 'en' ? 'Best for:' : 'Подходит для:'}
                  </span>
                  {template.bestFor.map((audience) => (
                    <Badge
                      key={audience}
                      variant="default"
                      className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 cursor-default"
                    >
                      {audience}
                    </Badge>
                  ))}
                </div>

                {/* Actions - Primary CTA Button */}
                <div className="mt-auto pt-2">
                  <Button
                    asChild
                    className="w-full min-h-[56px] touch-manipulation font-bold text-lg shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 border-2 border-white/20"
                    size="lg"
                  >
                    <Link href={`/templates/${template.id}`} onClick={handleTemplateClick}>
                      <FiEdit3 className="mr-2 h-5 w-5" />
                      {t.ui.customizeAndBuild}
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 px-4 col-span-full"
          >
            <FiFolder className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              No projects found
            </h3>
            <p className="text-foreground/60">
              No projects available in this category yet
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
