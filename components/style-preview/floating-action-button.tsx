"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiDroplet,
  FiType,
  FiShare2,
  FiDownload,
  FiX,
  FiZap
} from "react-icons/fi";

interface FABAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}

interface FloatingActionButtonProps {
  actions: FABAction[];
}

export function FloatingActionButton({ actions }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40">
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 flex flex-col-reverse gap-3 pb-2"
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.1, x: -4 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 min-h-[56px] touch-manipulation"
              >
                {/* Label */}
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg shadow-lg whitespace-nowrap"
                >
                  {action.label}
                </motion.span>

                {/* Icon Button */}
                <div
                  className={`
                    w-14 h-14 rounded-full shadow-lg flex items-center justify-center
                    transition-all
                    ${action.color || "bg-foreground text-background"}
                  `}
                >
                  {action.icon}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 135 : 0 }}
        className="w-16 h-16 min-w-[64px] min-h-[64px] rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-2xl flex items-center justify-center touch-manipulation group"
        aria-label={isOpen ? "Close menu" : "Open quick actions"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiZap className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Export pre-configured FAB with common actions
export function PreviewPageFAB({
  onColorChange,
  onFontChange,
  onShare,
  onDownload
}: {
  onColorChange: () => void;
  onFontChange: () => void;
  onShare: () => void;
  onDownload: () => void;
}) {
  const actions: FABAction[] = [
    {
      icon: <FiDroplet className="w-6 h-6" />,
      label: "Change Colors",
      onClick: onColorChange,
      color: "bg-gradient-to-br from-pink-500 to-rose-500 text-white"
    },
    {
      icon: <FiType className="w-6 h-6" />,
      label: "Change Font",
      onClick: onFontChange,
      color: "bg-gradient-to-br from-purple-500 to-indigo-500 text-white"
    },
    {
      icon: <FiShare2 className="w-6 h-6" />,
      label: "Share Preview",
      onClick: onShare,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
    },
    {
      icon: <FiDownload className="w-6 h-6" />,
      label: "Download",
      onClick: onDownload,
      color: "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
    }
  ];

  return <FloatingActionButton actions={actions} />;
}
