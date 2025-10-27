"use client";

import { BackButton } from "./back-button";

interface TemplateLayoutProps {
  children: React.ReactNode;
}

export function TemplateLayout({ children }: TemplateLayoutProps) {
  return (
    <>
      <BackButton floating />
      {children}
    </>
  );
}
