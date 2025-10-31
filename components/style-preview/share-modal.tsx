"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  FiX,
  FiCopy,
  FiCheck,
  FiMessageCircle,
  FiMail,
  FiLink
} from "react-icons/fi";
import { FaWhatsapp, FaTelegram, FaTwitter, FaFacebookF } from "react-icons/fa";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  imageUrl?: string;
}

export function ShareModal({ isOpen, onClose, title, url, imageUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-6 h-6" />,
      color: "bg-[#25D366] hover:bg-[#20BA5A]",
      action: () => {
        const text = encodeURIComponent(`Check out this template: ${title}`);
        window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`, "_blank");
      }
    },
    {
      name: "Telegram",
      icon: <FaTelegram className="w-6 h-6" />,
      color: "bg-[#0088cc] hover:bg-[#0077b3]",
      action: () => {
        const text = encodeURIComponent(`Check out this template: ${title}`);
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`, "_blank");
      }
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="w-6 h-6" />,
      color: "bg-[#1DA1F2] hover:bg-[#1a91da]",
      action: () => {
        const text = encodeURIComponent(`Check out this amazing template: ${title}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, "_blank");
      }
    },
    {
      name: "Facebook",
      icon: <FaFacebookF className="w-5 h-5" />,
      color: "bg-[#1877F2] hover:bg-[#166fe5]",
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
      }
    },
    {
      name: "Email",
      icon: <FiMail className="w-5 h-5" />,
      color: "bg-gray-600 hover:bg-gray-700",
      action: () => {
        const subject = encodeURIComponent(`Check out: ${title}`);
        const body = encodeURIComponent(`I found this great template:\n\n${title}\n${url}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      }
    }
  ];

  // Native Share API support
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this template: ${title}`,
          url: url
        });

        // Haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md z-50"
          >
            <div className="bg-background rounded-2xl shadow-2xl border overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Share Template</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors min-h-[44px] min-w-[44px] touch-manipulation flex items-center justify-center"
                  aria-label="Close"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Copy Link */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">
                    Template Link
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={url}
                      readOnly
                      className="flex-1 px-3 py-2 text-sm bg-background border rounded-lg font-mono text-muted-foreground"
                    />
                    <Button
                      size="sm"
                      onClick={handleCopyLink}
                      className="min-h-[44px] min-w-[44px] touch-manipulation shrink-0"
                    >
                      {copied ? (
                        <FiCheck className="w-4 h-4" />
                      ) : (
                        <FiCopy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {copied && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-green-600 dark:text-green-400 mt-2"
                    >
                      ✓ Link copied to clipboard!
                    </motion.p>
                  )}
                </div>

                {/* Social Share Options */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-3 block">
                    Share via Social Media
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {shareOptions.map((option) => (
                      <motion.button
                        key={option.name}
                        onClick={option.action}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          flex flex-col items-center gap-2 p-4 rounded-xl text-white transition-all
                          min-h-[80px] touch-manipulation ${option.color}
                        `}
                      >
                        {option.icon}
                        <span className="text-xs font-medium">{option.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Native Share (if supported) */}
                {navigator.share && (
                  <Button
                    onClick={handleNativeShare}
                    variant="outline"
                    className="w-full min-h-[48px] touch-manipulation"
                  >
                    <FiMessageCircle className="w-4 h-4 mr-2" />
                    More Options...
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
