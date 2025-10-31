"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiGrid, FiMail, FiMenu } from "react-icons/fi";
import { useI18n } from "@/lib/i18n-context";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  const isHome = pathname === "/";

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 64;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border shadow-lg">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 min-w-[64px] min-h-[56px] touch-manipulation transition-colors hover:text-primary"
            aria-label="Home"
          >
            <FiHome className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </Link>

          <button
            onClick={() => scrollToSection("templates")}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 min-w-[64px] min-h-[56px] touch-manipulation transition-colors hover:text-primary"
            aria-label="Templates"
          >
            <FiGrid className="w-5 h-5" />
            <span className="text-xs font-medium">Templates</span>
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 min-w-[64px] min-h-[56px] touch-manipulation transition-colors hover:text-primary"
            aria-label="Contact"
          >
            <FiMail className="w-5 h-5" />
            <span className="text-xs font-medium">Contact</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
