"use client";

import { motion } from "framer-motion";

export default function CurvedPath({ progress }) {
  // SVG Path برای مسیر پیچ‌دار
  const pathData = "M 100 0 Q 50 200 100 400 T 100 800 Q 150 1000 100 1200 T 100 1600 Q 50 1800 100 2000";
  
  return (
    <svg
      className="absolute left-1/2 transform -translate-x-1/2 z-0"
      width="200"
      height="2000"
      viewBox="0 0 200 2000"
      style={{
        top: 0,
      }}
    >
      {/* Background Path */}
      <motion.path
        d={pathData}
        stroke="rgba(255, 215, 0, 0.2)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Progress Path */}
      <motion.path
        d={pathData}
        stroke="url(#path-gradient)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progress }}
        transition={{ duration: 0.5 }}
      />
      
      <defs>
        <linearGradient id="path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
  );
}

