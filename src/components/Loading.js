
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TreePine } from 'lucide-react';
import TrueFocus from './TrueFocus';
import './TrueFocus.css';

export default function Loading({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 50) {
      setShowGlow(true);
    }
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center"
    >
      <div className="fixed top-6 right-6">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="40" cy="40" r="35" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="4" fill="none" />
            <motion.circle
              cx="40"
              cy="40"
              r="35"
              stroke="#22c55e"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              strokeDasharray="220"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-10 h-10">
              <TreePine className="w-10 h-10 text-gray-700 absolute" strokeWidth={2} />
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
              >
                <TreePine className="w-10 h-10 text-nature-green absolute" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.8))' }} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-72 h-32 flex items-center justify-center mb-8">
        <motion.div
          className="absolute"
          initial={{ scale: 0, x: -30 }}
          animate={{
            scale: progress > 5 ? 1 : 0,
            x: progress > 50 ? -80 : -30
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="relative">
            <AnimatePresence>
              {showGlow && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 0.8, 0.4, 0.8, 0.4], scale: [0.8, 1.3, 1, 1.3, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
                    className="absolute -inset-8 bg-gradient-to-r from-nature-green/60 via-gold/40 to-nature-green/60 rounded-full blur-3xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: [0, 0.6, 0.3, 0.6, 0.3], scale: [0.6, 1.5, 1.2, 1.5, 1.2] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 0.2 }}
                    className="absolute -inset-12 bg-gradient-to-r from-gold/50 via-nature-green/30 to-gold/50 rounded-full blur-3xl"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0.2, 0.4, 0.2], rotate: [0, 360] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                    className="absolute -inset-10 bg-gradient-to-r from-nature-green/40 to-gold/40 rounded-full blur-2xl"
                  />
                </>
              )}
            </AnimatePresence>
            <Image src="/logo.png" alt="GCT Logo" width={80} height={80} priority className="relative z-10" />
          </div>
        </motion.div>

        <motion.div
          className="absolute text-4xl font-black text-gold z-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: progress > 50 ? 1 : 0,
            scale: progress > 50 ? 1 : 0
          }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          =
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ scale: 0, x: 30 }}
          animate={{
            scale: progress > 5 ? 1 : 0,
            x: progress > 50 ? 80 : 30
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="relative">
            <AnimatePresence>
              {showGlow && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 0.8, 0.4, 0.8, 0.4], scale: [0.8, 1.3, 1, 1.3, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, delay: 0.3 }}
                    className="absolute -inset-8 bg-gradient-to-r from-gold/60 via-nature-green/40 to-gold/60 rounded-full blur-3xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: [0, 0.6, 0.3, 0.6, 0.3], scale: [0.6, 1.5, 1.2, 1.5, 1.2] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
                    className="absolute -inset-12 bg-gradient-to-r from-nature-green/50 via-gold/30 to-nature-green/50 rounded-full blur-3xl"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0.2, 0.4, 0.2], rotate: [360, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                    className="absolute -inset-10 bg-gradient-to-r from-gold/40 to-nature-green/40 rounded-full blur-2xl"
                  />
                </>
              )}
            </AnimatePresence>
            <Image src="/treecos.png" alt="Tree Logo" width={80} height={80} priority className="relative z-10" />
          </div>
        </motion.div>
      </div>

      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: progress > 60 ? 1 : 0, y: progress > 60 ? 0 : 20 }}
          className="text-2xl font-bold gradient-text mb-2"
        >
          One Token, One Tree
        </motion.div>
      </div>

      <div className="absolute bottom-10 w-full max-w-sm px-4">
        <TrueFocus
          sentence="LOADING GCT"
          manualMode={false}
          blurAmount={3}
          borderColor="#22c55e"
          glowColor="rgba(34, 197, 94, 0.6)"
          animationDuration={0.6}
          pauseBetweenAnimations={0.2}
        />
      </div>
    </motion.div>
  );
}
