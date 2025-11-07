"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";

export default function FloatingReward() {
  const { floatingRewards } = useUser();

  return (
    <div className="fixed top-20 right-10 z-50 pointer-events-none">
      <AnimatePresence>
        {floatingRewards.map((reward) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -100, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-gold font-bold text-2xl mb-2 drop-shadow-lg"
            style={{ textShadow: "0 0 10px rgba(255, 215, 0, 0.8)" }}
          >
            {reward.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
