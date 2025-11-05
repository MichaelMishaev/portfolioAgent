"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n-context";
import {
  FiBriefcase,
  FiZap,
  FiFolder,
  FiTrendingUp,
  FiFeather,
  FiBookOpen,
  FiPackage,
  FiUsers,
  FiGrid,
  FiTarget,
  FiStar
} from "react-icons/fi";

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

const categoryBadges: Record<string, { label: string; color: string } | undefined> = {
  "Online Business": { label: "🔥 Hot", color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30" },
  Service: { label: "⭐ Best Seller", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" },
  Product: { label: "💎 Premium", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30" },
  Blog: { label: "✨ Popular", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
};

interface CategoryMenuProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categoryLabels: Record<string, string>;
  categoryCounts: Record<string, number>;
}

export function CategoryMenu({
  categories,
  activeCategory,
  onCategoryChange,
  categoryLabels,
  categoryCounts
}: CategoryMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useI18n();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);

    // Scroll to templates section
    setTimeout(() => {
      const templatesSection = document.getElementById('templates');
      if (templatesSection) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = templatesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const activeCategoryName = categoryLabels[activeCategory] || activeCategory;
  const activeCount = categoryCounts[activeCategory] || 0;

  return (
    <>
      {/* Categories Button - Aligned with Header */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="category-menu-button fixed top-2 sm:top-3 left-4 z-50 flex items-center gap-2.5 px-3.5 py-2 bg-background border border-border hover:border-foreground/20 text-foreground rounded-xl shadow-sm hover:shadow-md h-10 sm:h-11 touch-manipulation transition-all duration-200"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Open categories menu"
      >
        <FiGrid className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium capitalize">
          {activeCategoryName}
        </span>
        <span className="text-xs text-muted-foreground font-normal ml-0.5">
          ({activeCount})
        </span>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-background border-r border-border z-50 overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{language === 'ru' ? 'Категории' : 'Categories'}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-muted touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Закрыть меню"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Categories List */}
            <nav className="p-4 space-y-1">
              {categories.map((category) => {
                const Icon = categoryIcons[category] || FiFolder;
                const isActive = activeCategory === category;
                const categoryName = categoryLabels[category] || category;
                const count = categoryCounts[category] || 0;
                const badge = categoryBadges[category];

                return (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl text-sm font-medium
                      transition-all duration-200 min-h-[52px] touch-manipulation
                      ${isActive
                        ? "bg-foreground text-background shadow-md"
                        : "text-foreground hover:bg-muted"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-left">{categoryName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {badge && !isActive && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400">
                          {badge.label}
                        </span>
                      )}
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          isActive
                            ? "bg-background/20 text-background"
                            : "bg-muted"
                        }`}
                      >
                        {count}
                      </Badge>
                    </div>
                  </motion.button>
                );
              })}
            </nav>

            {/* Footer Stats */}
            <div className="sticky bottom-0 bg-background border-t border-border p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {categoryCounts['all'] || 0}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Всего проектов</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {categories.length - 1}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Категорий</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
