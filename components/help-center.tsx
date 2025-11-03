"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHelpCircle,
  FiX,
  FiSearch,
  FiGrid,
  FiEdit3,
  FiDownload,
  FiZap,
  FiMessageCircle,
  FiBook,
  FiVideo,
  FiChevronRight,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export interface HelpArticle {
  id: string;
  title: string;
  titleRu?: string;
  content: string;
  contentRu?: string;
  category: "getting-started" | "templates" | "builder" | "customization" | "export" | "troubleshooting";
  icon: React.ReactNode;
  tags?: string[];
  videoUrl?: string;
}

export interface HelpCenterProps {
  language?: "en" | "ru";
  onClose?: () => void;
  defaultArticleId?: string;
}

const helpArticles: HelpArticle[] = [
  {
    id: "welcome",
    title: "Welcome to Portfolio Builder",
    titleRu: "Добро пожаловать в Portfolio Builder",
    content: "This platform helps you create professional portfolio websites in minutes. Browse our templates, customize them to your needs, and export ready-to-use code. No coding experience required!",
    contentRu: "Эта платформа помогает создавать профессиональные портфолио за минуты. Просматривайте шаблоны, настраивайте их под свои нужды и экспортируйте готовый код. Опыт программирования не требуется!",
    category: "getting-started",
    icon: <FiZap className="w-5 h-5" />,
    tags: ["beginner", "overview"],
  },
  {
    id: "browse-templates",
    title: "How to Browse Templates",
    titleRu: "Как просматривать шаблоны",
    content: "Use the category menu to filter templates by type (Online Business, Service, Product, etc.). You can also search for templates by name, description, or tags. Click on any template card to see more details and start customizing.",
    contentRu: "Используйте меню категорий для фильтрации шаблонов по типу (Онлайн-бизнес, Услуги, Продукты и т.д.). Вы также можете искать шаблоны по названию, описанию или тегам. Нажмите на любую карточку шаблона, чтобы увидеть больше деталей и начать настройку.",
    category: "templates",
    icon: <FiGrid className="w-5 h-5" />,
    tags: ["templates", "search", "filter"],
  },
  {
    id: "search-templates",
    title: "Advanced Search & Filtering",
    titleRu: "Расширенный поиск и фильтрация",
    content: "The search bar allows you to find templates quickly. Search by keywords, template names, or specific features. Use category filters and tag chips for refined results. All filters work together to help you find the perfect template.",
    contentRu: "Строка поиска позволяет быстро находить шаблоны. Ищите по ключевым словам, названиям шаблонов или специфическим функциям. Используйте фильтры категорий и теги для уточнения результатов. Все фильтры работают вместе, чтобы помочь вам найти идеальный шаблон.",
    category: "templates",
    icon: <FiSearch className="w-5 h-5" />,
    tags: ["search", "filter", "advanced"],
  },
  {
    id: "customize-template",
    title: "Using the Template Builder",
    titleRu: "Использование конструктора шаблонов",
    content: "The template builder features a drag-and-drop interface. Click on any component to edit its content, colors, and styling. On mobile, tap components to select them. Use the sidebar to add new sections. Changes are shown in real-time!",
    contentRu: "Конструктор шаблонов имеет интерфейс drag-and-drop. Нажмите на любой компонент для редактирования его содержимого, цветов и стилей. На мобильных устройствах нажмите на компоненты, чтобы выбрать их. Используйте боковую панель для добавления новых секций. Изменения отображаются в реальном времени!",
    category: "builder",
    icon: <FiEdit3 className="w-5 h-5" />,
    tags: ["builder", "editing", "drag-drop"],
  },
  {
    id: "mobile-builder",
    title: "Using Builder on Mobile",
    titleRu: "Использование конструктора на мобильном",
    content: "On mobile devices, tap any component to select and edit it. Use the 'Tap to Add Component' button at the bottom to add new sections. Settings panel appears as a bottom sheet for easy access. Swipe between preview and edit modes.",
    contentRu: "На мобильных устройствах нажмите на любой компонент для выбора и редактирования. Используйте кнопку 'Нажмите для добавления компонента' внизу, чтобы добавить новые секции. Панель настроек появляется как нижняя панель для удобного доступа. Переключайтесь между режимами просмотра и редактирования.",
    category: "builder",
    icon: <FiEdit3 className="w-5 h-5" />,
    tags: ["mobile", "touch", "builder"],
  },
  {
    id: "color-customization",
    title: "Customizing Colors & Styles",
    titleRu: "Настройка цветов и стилей",
    content: "Each component has customizable properties. Click the settings icon to adjust colors, gradients, fonts, spacing, and more. Use color pickers for precise control. Changes apply instantly to see how they look.",
    contentRu: "Каждый компонент имеет настраиваемые свойства. Нажмите на иконку настроек, чтобы изменить цвета, градиенты, шрифты, отступы и многое другое. Используйте палитры цветов для точного контроля. Изменения применяются мгновенно, чтобы увидеть, как они выглядят.",
    category: "customization",
    icon: <FiZap className="w-5 h-5" />,
    tags: ["colors", "styling", "design"],
  },
  {
    id: "export-code",
    title: "Exporting Your Website",
    titleRu: "Экспорт вашего сайта",
    content: "Once you're satisfied with your design, click 'Export Code' to download production-ready HTML, CSS, and JavaScript files. The code is clean, optimized, and ready to deploy to any hosting service. Includes responsive design and modern best practices.",
    contentRu: "Когда вы довольны своим дизайном, нажмите 'Экспортировать код', чтобы загрузить готовые HTML, CSS и JavaScript файлы. Код чистый, оптимизированный и готов к развертыванию на любой хостинговой службе. Включает адаптивный дизайн и современные лучшие практики.",
    category: "export",
    icon: <FiDownload className="w-5 h-5" />,
    tags: ["export", "download", "deploy"],
  },
  {
    id: "troubleshooting-mobile",
    title: "Troubleshooting Mobile Issues",
    titleRu: "Устранение проблем на мобильных устройствах",
    content: "If drag-and-drop isn't working on mobile, try using tap gestures instead. Make sure to tap components to select them first. If the component toggle isn't appearing, scroll to the bottom of the page. For best experience, use in portrait mode.",
    contentRu: "Если drag-and-drop не работает на мобильных устройствах, попробуйте использовать жесты нажатия. Обязательно сначала нажмите на компоненты, чтобы выбрать их. Если переключатель компонентов не появляется, прокрутите вниз страницы. Для лучшего опыта используйте портретный режим.",
    category: "troubleshooting",
    icon: <FiMessageCircle className="w-5 h-5" />,
    tags: ["mobile", "troubleshooting", "help"],
  },
  {
    id: "keyboard-shortcuts",
    title: "Keyboard Shortcuts (Desktop)",
    titleRu: "Горячие клавиши (Десктоп)",
    content: "Speed up your workflow with keyboard shortcuts: Delete selected component (Delete/Backspace), Copy component (Ctrl/Cmd + C), Paste component (Ctrl/Cmd + V), Undo (Ctrl/Cmd + Z), Preview mode (P), Save (Ctrl/Cmd + S).",
    contentRu: "Ускорьте работу с помощью горячих клавиш: Удалить выбранный компонент (Delete/Backspace), Копировать компонент (Ctrl/Cmd + C), Вставить компонент (Ctrl/Cmd + V), Отменить (Ctrl/Cmd + Z), Режим просмотра (P), Сохранить (Ctrl/Cmd + S).",
    category: "builder",
    icon: <FiBook className="w-5 h-5" />,
    tags: ["shortcuts", "desktop", "productivity"],
  },
];

const categories = [
  { id: "getting-started", label: "Getting Started", labelRu: "Начало работы", color: "bg-blue-500" },
  { id: "templates", label: "Templates", labelRu: "Шаблоны", color: "bg-purple-500" },
  { id: "builder", label: "Builder", labelRu: "Конструктор", color: "bg-green-500" },
  { id: "customization", label: "Customization", labelRu: "Настройка", color: "bg-orange-500" },
  { id: "export", label: "Export", labelRu: "Экспорт", color: "bg-pink-500" },
  { id: "troubleshooting", label: "Troubleshooting", labelRu: "Помощь", color: "bg-red-500" },
];

export function HelpCenter({ language = "en", onClose, defaultArticleId }: HelpCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);

  // Open help center with default article if provided
  React.useEffect(() => {
    if (defaultArticleId && isOpen) {
      const article = helpArticles.find((a) => a.id === defaultArticleId);
      if (article) {
        setSelectedArticle(article);
      }
    }
  }, [defaultArticleId, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedArticle(null);
    if (onClose) {
      onClose();
    }
  };

  // Filter articles by search and category
  const filteredArticles = helpArticles.filter((article) => {
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.titleRu && article.titleRu.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory = !selectedCategory || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const displayTitle = (article: HelpArticle) => (language === "ru" && article.titleRu ? article.titleRu : article.title);
  const displayContent = (article: HelpArticle) => (language === "ru" && article.contentRu ? article.contentRu : article.content);

  return (
    <>
      {/* Help Button - Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 md:bottom-8 md:right-8"
        aria-label={language === "en" ? "Help Center" : "Центр помощи"}
      >
        <FiHelpCircle className="w-6 h-6" />
      </motion.button>

      {/* Help Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-4xl md:h-[85vh] bg-background rounded-2xl shadow-2xl z-[101] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white flex-shrink-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      {language === "en" ? "Help Center" : "Центр помощи"}
                    </h2>
                    <p className="text-white/80 text-sm">
                      {language === "en" ? "Find answers and learn how to use the platform" : "Найдите ответы и узнайте, как использовать платформу"}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="hover:bg-white/20 rounded-full p-2 transition-colors"
                    aria-label="Close"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder={language === "en" ? "Search help articles..." : "Поиск статей помощи..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                  />
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {selectedArticle ? (
                    /* Article View */
                    <div>
                      <button
                        onClick={() => setSelectedArticle(null)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 group"
                      >
                        <FiChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        {language === "en" ? "Back to articles" : "Назад к статьям"}
                      </button>

                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                          {selectedArticle.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{displayTitle(selectedArticle)}</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedArticle.tags?.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="prose prose-blue dark:prose-invert max-w-none">
                        <p className="text-base leading-relaxed">{displayContent(selectedArticle)}</p>
                      </div>

                      {selectedArticle.videoUrl && (
                        <div className="mt-6">
                          <div className="flex items-center gap-2 mb-3">
                            <FiVideo className="w-5 h-5 text-blue-600" />
                            <h4 className="font-semibold">{language === "en" ? "Video Tutorial" : "Видео урок"}</h4>
                          </div>
                          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <p className="text-muted-foreground">{language === "en" ? "Video coming soon" : "Видео скоро"}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Articles List */
                    <>
                      {/* Category Filters */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        <Button
                          variant={selectedCategory === null ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(null)}
                        >
                          {language === "en" ? "All" : "Все"}
                        </Button>
                        {categories.map((cat) => (
                          <Button
                            key={cat.id}
                            variant={selectedCategory === cat.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(cat.id)}
                          >
                            {language === "ru" ? cat.labelRu : cat.label}
                          </Button>
                        ))}
                      </div>

                      {/* Articles Grid */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        {filteredArticles.map((article) => {
                          const category = categories.find((c) => c.id === article.category);
                          return (
                            <motion.button
                              key={article.id}
                              onClick={() => setSelectedArticle(article)}
                              className="p-4 border rounded-xl hover:shadow-lg transition-all text-left group bg-card"
                              whileHover={{ y: -2 }}
                            >
                              <div className="flex items-start gap-3 mb-2">
                                <div className={`w-10 h-10 rounded-lg ${category?.color} bg-gradient-to-br flex items-center justify-center text-white flex-shrink-0`}>
                                  {article.icon}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                                    {displayTitle(article)}
                                  </h4>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {displayContent(article)}
                                  </p>
                                </div>
                                <FiChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Empty State */}
                      {filteredArticles.length === 0 && (
                        <div className="text-center py-12">
                          <FiSearch className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                          <p className="text-muted-foreground">
                            {language === "en" ? "No articles found" : "Статьи не найдены"}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t p-4 bg-muted/30 flex-shrink-0">
                <p className="text-sm text-muted-foreground text-center">
                  {language === "en" ? "Still need help? " : "Все еще нужна помощь? "}
                  <a href="mailto:345287biz@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                    {language === "en" ? "Contact support" : "Связаться с поддержкой"}
                  </a>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
