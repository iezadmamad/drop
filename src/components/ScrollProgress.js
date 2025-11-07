"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { TreePine } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <motion.div
      className="fixed top-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ 
        delay: 0.5, 
        type: "spring", 
        stiffness: 200,
        damping: 15 
      }}
    >
      <motion.div 
        className="relative w-20 h-20"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="35"
            stroke="rgba(34, 197, 94, 0.2)"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="40"
            cy="40"
            r="35"
            stroke="#22c55e"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress,
            }}
            strokeDasharray="220"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-10 h-10">
            <TreePine className="w-10 h-10 text-gray-600 absolute" strokeWidth={2} />
            
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: useTransform(
                  scrollYProgress,
                  [0, 1],
                  ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']
                )
              }}
            >
              <TreePine 
                className="w-10 h-10 text-nature-green absolute" 
                strokeWidth={2}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))'
                }}
              />
            </motion.div>
          </div>
        </div>

        <motion.div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-nature-green whitespace-nowrap">
          {percentage}%
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
