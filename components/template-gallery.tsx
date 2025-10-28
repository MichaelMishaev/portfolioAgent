"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTemplates } from "@/lib/template-registry";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FiExternalLink,
  FiStar,
  FiBriefcase,
  FiZap,
  FiFolder,
  FiTrendingUp,
  FiFeather,
  FiBookOpen,
  FiPackage,
  FiUsers,
  FiMenu,
  FiX,
  FiGrid,
  FiMessageCircle,
  FiTag,
  FiTarget,
  FiChevronDown,
  FiChevronUp
} from "react-icons/fi";
import { useI18n } from "@/lib/i18n-context";

// Category icons mapping
const categoryIcons: Record<string, any> = {
  all: FiGrid,
  Professional: FiBriefcase,
  Creative: FiZap,
  Portfolio: FiFolder,
  Modern: FiTrendingUp,
  Simple: FiFeather,
  Blog: FiBookOpen,
  Product: FiPackage,
  Service: FiUsers,
  Experimental: FiStar,
  "Online Business": FiTarget,
};

// Category badges/chips configuration
const categoryBadges: Record<string, { label: string; color: string } | undefined> = {
  "Online Business": { label: "🔥 Hot", color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30" },
  Service: { label: "⭐ Best Seller", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" },
  Product: { label: "💎 Premium", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30" },
  Blog: { label: "✨ Popular", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
};

// Priority order for categories
const categoryOrder = [
  "all",
  "Online Business",
  "Service",
  "Product",
  "Blog",
  // Rest will be sorted alphabetically
];

// Component for expandable description
function ExpandableDescription({ description, readMore, showLess }: { description: string; readMore: string; showLess: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      // Check if content is overflowing
      const element = descriptionRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [description]);

  return (
    <div className="relative">
      <CardDescription
        ref={descriptionRef}
        className={`${isExpanded ? '' : 'line-clamp-3'} min-h-[4.5rem] transition-all duration-300`}
      >
        {description}
      </CardDescription>
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group"
        >
          {isExpanded ? (
            <>
              {showLess}
              <FiChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </>
          ) : (
            <>
              {readMore}
              <FiChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

// Component for expandable "Best For" section
function ExpandableBestFor({
  label,
  items,
  readMore,
  showLess
}: {
  label: string;
  items: string[];
  readMore: string;
  showLess: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      // Check if content is overflowing
      const element = textRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [items]);

  return (
    <div className="relative">
      <div
        ref={textRef}
        className={`text-xs text-muted-foreground ${isExpanded ? '' : 'line-clamp-2'} min-h-[2.5rem] transition-all duration-300`}
      >
        <span className="font-semibold">{label}:</span> {items.join(", ")}
      </div>
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group"
        >
          {isExpanded ? (
            <>
              {showLess}
              <FiChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </>
          ) : (
            <>
              {readMore}
              <FiChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

export function TemplateGallery() {
  const { language, t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    setIsSidebarOpen(false); // Close sidebar on mobile after selection

    // Scroll to templates section on mobile
    setTimeout(() => {
      const templatesSection = document.getElementById('templates-grid');
      if (templatesSection) {
        templatesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="relative">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors touch-manipulation"
        aria-label="Toggle categories menu"
      >
        {isSidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
      </button>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-20 lg:top-24 left-0
          h-[calc(100vh-5rem)] lg:h-[calc(100vh-8rem)]
          w-72 lg:w-64 xl:w-72 flex-shrink-0 z-40
          transition-transform duration-300 ease-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 lg:p-6 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Категории
            </h3>
          </div>

          <nav className="space-y-1">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || FiFolder;
              const isActive = filter === category;
              const categoryName = t.categories[category as keyof typeof t.categories] || category;
              const count = category === "all" ? templates.length : templates.filter(t => t.category === category).length;

              const badge = categoryBadges[category];

              return (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`
                    w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl text-sm font-medium
                    transition-all duration-200 group relative
                    ${isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <div className="flex flex-col items-start gap-1.5 flex-1">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"}`} />
                      <span>{categoryName}</span>
                    </div>
                    {badge && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ml-8 ${
                        isActive
                          ? "bg-white/20 text-white border-white/30"
                          : badge.color
                      }`}>
                        {badge.label}
                      </span>
                    )}
                  </div>
                  <Badge
                    variant="secondary"
                    className={`
                      ${isActive
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      }
                    `}
                  >
                    {count}
                  </Badge>
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer - Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{templates.length}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Всего</div>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{categories.length - 1}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Категорий</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 lg:ml-0 mt-4 lg:mt-0">
        {/* Header with current category info */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 lg:mb-8 px-4 lg:px-0"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white capitalize">
              {t.categories[filter as keyof typeof t.categories] || filter}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {filteredTemplates.length} {filteredTemplates.length === 1 ? 'проект' : 'проектов'}
            </p>
          </div>
        </motion.div>

        {/* Template Grid */}
        <div id="templates-grid" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-4 lg:px-0">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <CardHeader className="flex-shrink-0">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg mb-4 relative overflow-hidden">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 flex-1">
                      {template.name}
                    </CardTitle>
                    <Badge className="flex-shrink-0" variant={template.difficulty === "beginner" ? "secondary" : template.difficulty === "intermediate" ? "default" : "destructive"}>
                      {t.ui[template.difficulty]}
                    </Badge>
                  </div>

                  <ExpandableDescription
                    description={template.description}
                    readMore={t.ui?.readMore || "Read more"}
                    showLess={t.ui?.showLess || "Show less"}
                  />
                </CardHeader>

                <CardContent className="space-y-4 flex-grow">
                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 min-h-[2rem]">
                    {template.features.slice(0, 3).map((feature) => (
                      <motion.div
                        key={feature}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant="outline"
                          className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                        >
                          {feature}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* Interactive Tags */}
                  <div className="flex flex-wrap gap-1.5 min-h-[2rem]">
                    {template.tags.slice(0, 3).map((tag) => (
                      <motion.div
                        key={tag}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant="secondary"
                          className="text-xs cursor-pointer hover:shadow-md transition-all duration-200 flex items-center gap-1"
                        >
                          <FiTag className="w-3 h-3" />
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* Color Palette */}
                  {template.colors && Object.keys(template.colors).length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{t.ui.colors}:</span>
                      <div className="flex space-x-1">
                        {Object.values(template.colors).map((color, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-6 h-6 rounded-full border-2 border-background shadow-sm cursor-pointer"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Best For */}
                  <ExpandableBestFor
                    label={t.ui.bestFor}
                    items={template.bestFor}
                    readMore={t.ui?.readMore || "Read more"}
                    showLess={t.ui?.showLess || "Show less"}
                  />
                </CardContent>

                <CardFooter className="flex gap-2 flex-shrink-0 mt-auto">
                  <Button asChild className="flex-1" size="sm">
                    <Link href={template.demoPath} onClick={handleTemplateClick}>
                      <FiExternalLink className="mr-2 h-4 w-4" />
                      {t.ui.viewDemo}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="group"
                    asChild
                  >
                    <a href="#contact">
                      <FiMessageCircle className="h-4 w-4 group-hover:animate-bounce" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" className="group">
                    <FiStar className="h-4 w-4 group-hover:fill-yellow-400 group-hover:text-yellow-400 transition-all" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 px-4"
          >
            <FiFolder className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Нет проектов
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              В этой категории пока нет проектов
            </p>
          </motion.div>
        )}
      </div>
      </div>
    </div>
  );
}
