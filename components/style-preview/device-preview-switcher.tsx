"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

type DeviceType = "desktop" | "tablet" | "mobile";

interface DevicePreviewSwitcherProps {
  children: React.ReactNode;
}

export function DevicePreviewSwitcher({ children }: DevicePreviewSwitcherProps) {
  const { t } = useI18n();
  const [activeDevice, setActiveDevice] = useState<DeviceType>("desktop");

  const devices = [
    { type: "desktop" as DeviceType, icon: Monitor, label: "Desktop", width: "100%", height: "auto" },
    { type: "tablet" as DeviceType, icon: Tablet, label: "Tablet", width: "768px", height: "1024px" },
    { type: "mobile" as DeviceType, icon: Smartphone, label: "Mobile", width: "375px", height: "667px" },
  ];

  const getDeviceFrameStyles = () => {
    switch (activeDevice) {
      case "desktop":
        return {
          width: "100%",
          maxWidth: "100%",
          height: "auto",
          border: "none",
          borderRadius: "0",
        };
      case "tablet":
        return {
          width: "768px",
          maxWidth: "90vw",
          height: "600px",
          border: "12px solid #1f2937",
          borderRadius: "24px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        };
      case "mobile":
        return {
          width: "375px",
          maxWidth: "90vw",
          height: "667px",
          border: "12px solid #1f2937",
          borderRadius: "32px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Device Selector */}
      <div className="flex items-center justify-center gap-2 p-2 bg-muted rounded-lg">
        {devices.map((device) => {
          const Icon = device.icon;
          const isActive = activeDevice === device.type;

          return (
            <Button
              key={device.type}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveDevice(device.type)}
              className={`min-h-[40px] touch-manipulation transition-all ${
                isActive ? "shadow-md" : ""
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{device.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Device Frame */}
      <div className="flex justify-center items-start py-4">
        <motion.div
          layout
          initial={false}
          animate={getDeviceFrameStyles()}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative bg-white overflow-hidden"
          style={{
            maxHeight: activeDevice === "desktop" ? "none" : "600px",
          }}
        >
          {/* Device Notch (for mobile) */}
          {activeDevice === "mobile" && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-10" />
          )}

          {/* Content Container */}
          <div
            className="w-full h-full overflow-auto"
            style={{
              transform: activeDevice === "desktop" ? "scale(1)" : undefined,
            }}
          >
            {children}
          </div>

          {/* Device Home Button (for mobile/tablet) */}
          {activeDevice !== "desktop" && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full" />
          )}
        </motion.div>
      </div>

      {/* Info Text */}
      <p className="text-xs text-center text-muted-foreground">
        {activeDevice === "desktop" && "Full desktop view"}
        {activeDevice === "tablet" && "Tablet view (768px × 1024px)"}
        {activeDevice === "mobile" && "Mobile view (375px × 667px)"}
      </p>
    </div>
  );
}
