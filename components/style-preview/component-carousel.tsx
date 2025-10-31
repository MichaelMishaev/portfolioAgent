"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface ComponentSection {
  id: string;
  title: string;
  description: string;
  preview: React.ReactNode;
}

interface ComponentCarouselProps {
  sections: ComponentSection[];
}

export function ComponentCarousel({ sections }: ComponentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < sections.length) {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
    }
  };

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  return (
    <div className="relative space-y-4">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl border bg-card">
        <div className="aspect-[4/3] relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <div className="h-full flex flex-col">
                {/* Section Header */}
                <div className="p-4 border-b bg-muted/30">
                  <h3 className="font-semibold text-lg">
                    {sections[currentIndex].title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {sections[currentIndex].description}
                  </p>
                </div>

                {/* Section Preview */}
                <div className="flex-1 p-4 overflow-auto">
                  {sections[currentIndex].preview}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => paginate(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/90 backdrop-blur-sm rounded-full border shadow-lg hover:bg-background transition-all min-h-[48px] min-w-[48px] touch-manipulation"
              aria-label="Previous section"
            >
              <FiChevronLeft className="w-6 h-6" />
            </motion.button>
          )}

          {currentIndex < sections.length - 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => paginate(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/90 backdrop-blur-sm rounded-full border shadow-lg hover:bg-background transition-all min-h-[48px] min-w-[48px] touch-manipulation"
              aria-label="Next section"
            >
              <FiChevronRight className="w-6 h-6" />
            </motion.button>
          )}

          {/* Swipe Hint (First Time) */}
          {currentIndex === 0 && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border"
            >
              ← Swipe to explore →
            </motion.div>
          )}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`
              h-2 rounded-full transition-all touch-manipulation
              ${index === currentIndex
                ? "w-8 bg-foreground"
                : "w-2 bg-foreground/30 hover:bg-foreground/50"
              }
            `}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Section Counter */}
      <div className="text-center text-sm text-muted-foreground">
        Section {currentIndex + 1} of {sections.length}
      </div>
    </div>
  );
}
