"use client";

import { Suspense } from "react";
import { TemplateGallery } from "@/components/template-gallery";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { useI18n } from "@/lib/i18n-context";

export default function Home() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.header.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            {t.header.subtitle}
          </p>
        </div>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <TemplateGallery />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
