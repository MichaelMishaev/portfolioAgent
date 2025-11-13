"use client";

import { motion } from "framer-motion";

export const LeadGenerationGraphic = () => {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background circles */}
      <motion.circle
        cx="200"
        cy="150"
        r="100"
        fill="url(#gradient1)"
        opacity="0.1"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <motion.circle
        cx="200"
        cy="150"
        r="70"
        fill="url(#gradient2)"
        opacity="0.2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />

      {/* Funnel representation */}
      <motion.path
        d="M120 60 L280 60 L260 120 L140 120 Z"
        fill="url(#gradient3)"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d="M140 120 L260 120 L240 180 L160 180 Z"
        fill="url(#gradient4)"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.path
        d="M160 180 L240 180 L220 240 L180 240 Z"
        fill="url(#gradient5)"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* Percentage indicators */}
      <motion.text
        x="200"
        y="90"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        1000+
      </motion.text>
      <motion.text
        x="200"
        y="150"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        500
      </motion.text>
      <motion.text
        x="200"
        y="210"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        100
      </motion.text>

      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="gradient5" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="1" />
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const DataAnalyticsGraphic = () => {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Chart bars */}
      {[60, 90, 70, 100, 80, 95, 85].map((height, i) => (
        <motion.rect
          key={i}
          x={40 + i * 50}
          y={250 - height * 1.5}
          width="35"
          height={height * 1.5}
          fill="url(#barGradient)"
          rx="4"
          initial={{ height: 0, y: 250 }}
          animate={{ height: height * 1.5, y: 250 - height * 1.5 }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
        />
      ))}

      {/* Trend line */}
      <motion.path
        d="M 57 190 Q 107 160, 157 180 T 257 130 T 357 115"
        stroke="#60A5FA"
        strokeWidth="3"
        fill="none"
        strokeDasharray="5,5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      {/* Data points */}
      {[57, 107, 157, 207, 257, 307, 357].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={[190, 160, 180, 150, 130, 120, 115][i]}
          r="6"
          fill="#3B82F6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
        />
      ))}

      <defs>
        <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const TeamCollaborationGraphic = () => {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Central hub */}
      <motion.circle
        cx="200"
        cy="150"
        r="40"
        fill="url(#hubGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      />

      {/* Team members around hub */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 200 + Math.cos(rad) * 100;
        const y = 150 + Math.sin(rad) * 100;

        return (
          <g key={i}>
            <motion.line
              x1="200"
              y1="150"
              x2={x}
              y2={y}
              stroke="#60A5FA"
              strokeWidth="2"
              strokeDasharray="4,4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            />
            <motion.circle
              cx={x}
              cy={y}
              r="25"
              fill="url(#memberGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: "spring" }}
            />
          </g>
        );
      })}

      <defs>
        <linearGradient id="hubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="memberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const GrowthArrowGraphic = () => {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Growth curve */}
      <motion.path
        d="M 50 250 Q 150 200, 200 150 T 350 50"
        stroke="url(#growthGradient)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Arrow head */}
      <motion.path
        d="M 350 50 L 330 60 L 340 70 Z"
        fill="#3B82F6"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.8 }}
      />

      {/* Milestone markers */}
      {[
        { x: 50, y: 250, label: "Start" },
        { x: 150, y: 200, label: "+50%" },
        { x: 250, y: 120, label: "+150%" },
        { x: 350, y: 50, label: "+247%" }
      ].map((marker, i) => (
        <g key={i}>
          <motion.circle
            cx={marker.x}
            cy={marker.y}
            r="8"
            fill="#3B82F6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.4 }}
          />
          <motion.text
            x={marker.x}
            y={marker.y + 25}
            textAnchor="middle"
            fill="#3B82F6"
            fontSize="14"
            fontWeight="600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.4 + 0.2 }}
          >
            {marker.label}
          </motion.text>
        </g>
      ))}

      <defs>
        <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
};
