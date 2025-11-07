"use client";

import { motion } from "framer-motion";
import { User, TrendingUp, Zap } from "lucide-react";
import { useUser } from "@/context/UserContext";
import AnimatedCounter from "./AnimatedCounter";

export default function StandardProfileCard() {
  const { user } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-6 max-w-md border border-gray-700"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border-2 border-gray-600">
          <User className="w-8 h-8 text-gray-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Standard Member</h3>
          <p className="text-sm text-gray-400">Free Tier</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl border border-gray-700">
          <span className="text-gray-400 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            GCT Balance
          </span>
          <span className="text-2xl font-bold text-gray-300">
            <AnimatedCounter value={user.gctBalance} decimals={2} />
          </span>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl border border-gray-700">
          <span className="text-gray-400 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Voltage
          </span>
          <span className="text-xl font-bold text-gray-300">
            <AnimatedCounter value={user.voltage} decimals={1} />
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gold/10 to-nature-green/10 p-4 rounded-xl border border-gold/30">
        <p className="text-sm text-gray-300 text-center mb-2">
          🌟 Unlock VIP Benefits
        </p>
        <p className="text-xs text-gray-500 text-center">
          Upgrade to Green Cart for exclusive perks
        </p>
      </div>
    </motion.div>
  );
}
