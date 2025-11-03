"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiInfo, FiX } from "react-icons/fi";

export interface TooltipHintProps {
  content: string;
  contentRu?: string;
  title?: string;
  titleRu?: string;
  position?: "top" | "bottom" | "left" | "right";
  trigger?: "hover" | "click" | "always";
  icon?: React.ReactNode;
  className?: string;
  language?: "en" | "ru";
  maxWidth?: number;
  showArrow?: boolean;
  persistent?: boolean; // If true, show until user dismisses
  storageKey?: string; // For persistent dismissal
  insideButton?: boolean; // If true, render as div instead of button (for nested button scenarios)
}

export function TooltipHint({
  content,
  contentRu,
  title,
  titleRu,
  position = "top",
  trigger = "hover",
  icon,
  className = "",
  language = "en",
  maxWidth = 300,
  showArrow = true,
  persistent = false,
  storageKey,
  insideButton = false,
}: TooltipHintProps) {
  const [isVisible, setIsVisible] = useState(() => {
    // Initialize state based on trigger and storage
    if (typeof window !== "undefined" && storageKey) {
      const dismissed = localStorage.getItem(`tooltip-dismissed-${storageKey}`);
      if (dismissed === "true") {
        return false;
      }
    }
    return trigger === "always" || persistent;
  });

  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window !== "undefined" && storageKey) {
      const dismissed = localStorage.getItem(`tooltip-dismissed-${storageKey}`);
      return dismissed === "true";
    }
    return false;
  });

  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | HTMLDivElement>(null);

  const displayContent = language === "ru" && contentRu ? contentRu : content;
  const displayTitle = language === "ru" && titleRu ? titleRu : title;

  const handleMouseEnter = () => {
    if (trigger === "hover" && !isDismissed) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (trigger === "click" && !isDismissed) {
      setIsVisible(!isVisible);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
    if (storageKey && typeof window !== "undefined") {
      localStorage.setItem(`tooltip-dismissed-${storageKey}`, "true");
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case "top":
        return "top-full left-1/2 transform -translate-x-1/2 border-t-blue-600 dark:border-t-blue-500";
      case "bottom":
        return "bottom-full left-1/2 transform -translate-x-1/2 border-b-blue-600 dark:border-b-blue-500";
      case "left":
        return "left-full top-1/2 transform -translate-y-1/2 border-l-blue-600 dark:border-l-blue-500";
      case "right":
        return "right-full top-1/2 transform -translate-y-1/2 border-r-blue-600 dark:border-r-blue-500";
      default:
        return "top-full left-1/2 transform -translate-x-1/2 border-t-blue-600 dark:border-t-blue-500";
    }
  };

  if (isDismissed && !persistent) {
    return null;
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger Icon */}
      {trigger !== "always" && (
        <>
          {insideButton ? (
            <div
              ref={triggerRef as React.RefObject<HTMLDivElement>}
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 dark:text-blue-400 transition-colors cursor-help"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              aria-label={displayTitle || "Information"}
            >
              {icon || <FiInfo className="w-3 h-3" />}
            </div>
          ) : (
            <button
              ref={triggerRef as React.RefObject<HTMLButtonElement>}
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 dark:text-blue-400 transition-colors cursor-help"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              aria-label={displayTitle || "Information"}
            >
              {icon || <FiInfo className="w-3 h-3" />}
            </button>
          )}
        </>
      )}

      {/* Tooltip Content */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95, y: position === "top" ? 10 : position === "bottom" ? -10 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 ${getPositionClasses()}`}
            style={{ maxWidth: `${maxWidth}px` }}
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white rounded-lg shadow-xl p-3 sm:p-4">
              {/* Header */}
              {displayTitle && (
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-sm">{displayTitle}</h4>
                  {(persistent || trigger === "click") && (
                    <>
                      {insideButton ? (
                        <div
                          onClick={handleDismiss}
                          className="flex-shrink-0 hover:bg-white/20 rounded p-0.5 transition-colors cursor-pointer"
                          aria-label="Dismiss"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && handleDismiss(e as any)}
                        >
                          <FiX className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <button
                          onClick={handleDismiss}
                          className="flex-shrink-0 hover:bg-white/20 rounded p-0.5 transition-colors"
                          aria-label="Dismiss"
                        >
                          <FiX className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Content */}
              <p className="text-sm leading-relaxed opacity-95">{displayContent}</p>

              {/* Dismiss button for persistent tooltips without title */}
              {!displayTitle && (persistent || trigger === "click") && (
                <>
                  {insideButton ? (
                    <div
                      onClick={handleDismiss}
                      className="absolute top-2 right-2 hover:bg-white/20 rounded p-0.5 transition-colors cursor-pointer"
                      aria-label="Dismiss"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleDismiss(e as any)}
                    >
                      <FiX className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <button
                      onClick={handleDismiss}
                      className="absolute top-2 right-2 hover:bg-white/20 rounded p-0.5 transition-colors"
                      aria-label="Dismiss"
                    >
                      <FiX className="w-3.5 h-3.5" />
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Arrow */}
            {showArrow && (
              <div
                className={`absolute w-0 h-0 border-8 border-transparent ${getArrowClasses()}`}
                style={{ borderWidth: "8px" }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
