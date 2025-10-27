"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { getTemplates } from "@/lib/template-registry";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiExternalLink, FiStar } from "react-icons/fi";
import { useI18n } from "@/lib/i18n-context";

export function TemplateGallery() {
  const { language, t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = searchParams.get("category") || "all";

  const templates = getTemplates(language);
  const categories = ["all", ...Array.from(new Set(templates.map(t => t.category)))];

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

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            onClick={() => handleFilterChange(category)}
            className="capitalize"
          >
            {t.categories[category as keyof typeof t.categories] || category}
          </Button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader className="flex-shrink-0">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.accent} 100%)`
                    }}
                  />
                  <span className="text-4xl font-bold text-muted-foreground/30">
                    {template.name.split(" ")[0]}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 flex-1">
                    {template.name}
                  </CardTitle>
                  <Badge className="flex-shrink-0" variant={template.difficulty === "beginner" ? "secondary" : template.difficulty === "intermediate" ? "default" : "destructive"}>
                    {t.ui[template.difficulty]}
                  </Badge>
                </div>

                <CardDescription className="line-clamp-3 min-h-[4.5rem]">{template.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 flex-grow">
                {/* Features */}
                <div className="flex flex-wrap gap-1.5 min-h-[2rem]">
                  {template.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Color Palette */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{t.ui.colors}:</span>
                  <div className="flex space-x-1">
                    {Object.values(template.colors).map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-background shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Best For */}
                <div className="text-xs text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                  <span className="font-semibold">{t.ui.bestFor}:</span> {template.bestFor.join(", ")}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2 flex-shrink-0 mt-auto">
                <Button asChild className="flex-1" size="sm">
                  <Link href={template.demoPath}>
                    <FiExternalLink className="mr-2 h-4 w-4" />
                    {t.ui.viewDemo}
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <FiStar className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
