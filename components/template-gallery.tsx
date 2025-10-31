"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { getTemplates } from "@/lib/template-registry";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryMenu } from "@/components/shared/category-menu";
import {
  FiExternalLink,
  FiMessageCircle,
  FiEye,
} from "react-icons/fi";
import { useI18n } from "@/lib/i18n-context";

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

  // Restore scroll position when returning from template detail page
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('gallery-scroll-position');
    const savedCategory = sessionStorage.getItem('gallery-category');

    if (savedScrollPosition) {
      // Restore scroll position
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
      // Clean up
      sessionStorage.removeItem('gallery-scroll-position');
    }

    // Restore category filter if it was saved
    if (savedCategory && savedCategory !== filter) {
      const params = new URLSearchParams(searchParams);
      if (savedCategory === "all") {
        params.delete("category");
      } else {
        params.set("category", savedCategory);
      }
      router.replace(`/?${params.toString()}`, { scroll: false });
      sessionStorage.removeItem('gallery-category');
    }
  }, []);

  // Save scroll position before navigating to template
  const handleTemplateClick = (e: React.MouseEvent) => {
    sessionStorage.setItem('gallery-scroll-position', window.scrollY.toString());
    sessionStorage.setItem('gallery-category', filter);
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

  const filteredTemplates = filter === "all"
    ? templates
    : templates.filter(temp => temp.category === filter);

  const handleFilterChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
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
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
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

                {/* Features - Simplified */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {template.features.slice(0, 3).map((feature) => (
                    <Badge
                      key={feature}
                      variant="outline"
                      className="text-xs"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-auto space-y-2">
                  <Button
                    asChild
                    className="w-full min-h-[44px] touch-manipulation font-semibold"
                    size="default"
                  >
                    <Link href={`/templates/${template.id}/preview`}>
                      <FiEye className="mr-2 h-4 w-4" />
                      {t.ui.stylePreview}
                    </Link>
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 min-h-[44px] touch-manipulation text-sm"
                    >
                      <Link href={template.demoPath} onClick={handleTemplateClick}>
                        <FiExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        {t.ui.viewDemo}
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="min-h-[44px] min-w-[44px] touch-manipulation"
                      asChild
                    >
                      <a href="#contact" aria-label="Contact about this template">
                        <FiMessageCircle className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
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
