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
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sort") || "newest");

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

  // Sort templates based on selected sort option
  const sortedTemplates = [...templates].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        // Newest first (reverse order since templates are added chronologically)
        return templates.indexOf(b) - templates.indexOf(a);
      case "oldest":
        // Oldest first
        return templates.indexOf(a) - templates.indexOf(b);
      case "name-az":
        // Alphabetical A-Z
        return a.name.localeCompare(b.name);
      case "name-za":
        // Alphabetical Z-A
        return b.name.localeCompare(a.name);
      default:
        return templates.indexOf(b) - templates.indexOf(a);
    }
  });

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
  const filteredTemplates = sortedTemplates.filter(template => {
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

  const handleSortChange = (value: string) => {
    setSortBy(value);

    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (value !== "newest") {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    // Preserve other params
    if (searchQuery) params.set("search", searchQuery);
    if (filter !== "all") params.set("category", filter);
    if (selectedTag) params.set("tag", selectedTag);
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

      {/* Current Category Info and Sort */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 px-2"
      >
        <p className="text-sm text-foreground/60">
          {filteredTemplates.length} {filteredTemplates.length === 1 ? 'project' : 'projects'}
          {filter !== "all" && ` in ${t.categories[filter as keyof typeof t.categories] || filter}`}
        </p>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-foreground/60 whitespace-nowrap">
            {language === 'en' ? 'Sort by:' : 'Сортировка:'}
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="newest">{language === 'en' ? 'Newest First' : 'Сначала новые'}</option>
            <option value="oldest">{language === 'en' ? 'Oldest First' : 'Сначала старые'}</option>
            <option value="name-az">{language === 'en' ? 'Name (A-Z)' : 'Название (А-Я)'}</option>
            <option value="name-za">{language === 'en' ? 'Name (Z-A)' : 'Название (Я-А)'}</option>
          </select>
        </div>
      </motion.div>

      {/* Template Grid - ThemeForest Style */}
      <div id="templates-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
          >
            <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-500 group border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
              {/* Thumbnail with Enhanced Hover Effects */}
              <CardHeader className="p-0 flex-shrink-0">
                <Link href={`/templates/${template.id}`} onClick={handleTemplateClick}>
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden cursor-pointer">
                    <img
                      src={template.thumbnail}
                      alt={`${template.name} preview`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Floating Action Buttons */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <Button
                        size="lg"
                        variant="secondary"
                        className="shadow-2xl backdrop-blur-sm bg-white/95 hover:bg-white border-2 border-white/20 font-semibold"
                        asChild
                      >
                        <Link href={`/templates/${template.id}`} onClick={handleTemplateClick}>
                          <FiEye className="mr-2 h-5 w-5" />
                          {language === 'en' ? 'Preview' : 'Просмотр'}
                        </Link>
                      </Button>
                    </div>

                    {/* Difficulty Badge - Top Right */}
                    <div className="absolute top-3 right-3">
                      <Badge className="text-xs font-semibold px-3 py-1 bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-gray-100 backdrop-blur-sm shadow-lg">
                        {t.ui[template.difficulty]}
                      </Badge>
                    </div>

                    {/* Category Badge - Top Left */}
                    <div className="absolute top-3 left-3">
                      <Badge className="text-xs font-semibold px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                        {t.categories[template.category as keyof typeof t.categories] || template.category}
                      </Badge>
                    </div>
                  </div>
                </Link>
              </CardHeader>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Title and Price */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <Link href={`/templates/${template.id}`} onClick={handleTemplateClick} className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                      {template.name}
                    </CardTitle>
                  </Link>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${template.price}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <CardDescription className="text-sm line-clamp-2 mb-4 min-h-[40px] leading-relaxed">
                  {template.description}
                </CardDescription>

                {/* Best For Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.bestFor.slice(0, 3).map((audience) => (
                    <Badge
                      key={audience}
                      variant="outline"
                      className="text-xs font-medium px-2.5 py-1 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                    >
                      {audience}
                    </Badge>
                  ))}
                  {template.bestFor.length > 3 && (
                    <Badge
                      variant="outline"
                      className="text-xs font-medium px-2.5 py-1 border-gray-200 dark:border-gray-800"
                    >
                      +{template.bestFor.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Features List */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 pb-4 border-b border-border/50">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>{template.features.length} {language === 'en' ? 'Features' : 'Функций'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>{template.tags.length} {language === 'en' ? 'Tags' : 'Тегов'}</span>
                  </div>
                </div>

                {/* CTA Buttons - View Details & Try Builder */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <Button
                    asChild
                    className="h-11 text-sm font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    size="default"
                  >
                    <Link href={`/templates/${template.id}`} onClick={handleTemplateClick} className="flex items-center justify-center gap-2">
                      <FiEye className="h-4 w-4" />
                      {language === 'en' ? 'View Details' : 'Подробнее'}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 text-sm font-semibold border-2 hover:bg-accent"
                    size="default"
                  >
                    <Link href={`/templates/${template.id}/builder`} onClick={handleTemplateClick} className="flex items-center justify-center gap-2">
                      <FiEdit3 className="h-4 w-4" />
                      {language === 'en' ? 'Try Builder' : 'Конструктор'}
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
