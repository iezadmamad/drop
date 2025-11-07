"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Twitter, Send, Instagram, MessageSquare, Check, AlertTriangle, ExternalLink } from "lucide-react";

const iconMap = { Twitter, Send, Instagram, MessageSquare };

export default function MatrixTask({ task, isActive, isCompleted, onComplete }) {
  const Icon = iconMap[task.icon] || Twitter;
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(false);

  const handleTaskClick = () => {
    if (isCompleted || isProcessing) return;

    window.open(task.link, '_blank');
    setIsProcessing(true);
    setError(false);

    setTimeout(() => {
      const didComplete = Math.random() > 0.2;
      if (didComplete) {
        onComplete();
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
      setIsProcessing(false);
    }, 10000);
  };

  return (
    <motion.div
      className="relative flex flex-col items-center gap-4"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.5 }}
        className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-black/50 border-4 relative z-10 flex items-center justify-center"
        style={{ borderColor: task.color, boxShadow: `0 0 20px ${task.color}55` }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Icon className="w-12 h-12 md:w-14 md:h-14" style={{ color: task.color }} />
        </motion.div>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-nature-green/90 rounded-full"
          >
            <Check className="w-12 h-12 md:w-14 md:h-14 text-white/30" strokeWidth={4} />
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {isActive && !isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="glass-gold p-4 rounded-xl border-2 z-50 w-64 md:w-80 text-center"
            style={{ borderColor: task.color, boxShadow: `0 0 30px ${task.color}66` }}
          >
            <motion.h3
              key={task.name}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "steps(25)" }}
              className="overflow-hidden whitespace-nowrap font-bold text-white text-lg mx-auto"
            >
              {task.name}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-black text-gold text-2xl my-2"
            >
              +{task.reward} GCT
            </motion.div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={handleTaskClick}
              disabled={isProcessing}
              className="w-full py-2 rounded-lg font-semibold text-white transition-all duration-300 disabled:opacity-50"
              style={{ background: task.color }}
            >
              {isProcessing ? "Verifying..." : (
                <span className="flex items-center justify-center gap-2">
                  {task.platform === 'twitter' && 'Follow X'}
                  {task.platform === 'telegram' && 'Join Channel'}
                  {task.platform === 'instagram' && 'Follow Us'}
                  {task.platform === 'discord' && 'Join Server'}
                  <ExternalLink size={16} />
                </span>
              )}
            </motion.button>
            {error && (
              <p className="text-xs text-red-500 mt-2 flex items-center justify-center gap-1">
                <AlertTriangle size={14} /> Task not completed!
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
