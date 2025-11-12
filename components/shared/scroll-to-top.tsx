"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { FiArrowUp } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const prefersReducedMotion = useReducedMotion();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={prefersReducedMotion ? {} : { duration: 0.2 }}
          className="fixed bottom-20 md:bottom-6 right-4 z-40"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full shadow-lg hover:shadow-xl touch-manipulation"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-5 h-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
