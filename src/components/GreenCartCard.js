
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Zap, Award, Crown, Sparkles } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { config } from "@/lib/config";
import AnimatedCounter from "./AnimatedCounter";
import BackgroundLines from "./BackgroundLines";

export default function GreenCartCard() {
  const { user } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ type: "spring", duration: 1.2, bounce: 0.4 }}
      className="relative max-w-md"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-nature-green/40 to-gold/40 rounded-3xl blur-3xl animate-pulse" />

      <div className="relative glass-green rounded-3xl overflow-hidden border-2 border-nature-green/50">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 400,
                y: Math.random() * 600,
                rotate: 0,
              }}
              animate={{
                y: [null, Math.random() * 600],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            >
              <Leaf className="text-nature-green" size={20 + Math.random() * 30} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 p-8">
          <div className="flex items-center gap-5 mb-8">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-gradient-to-r from-nature-green to-gold px-4 py-2 rounded-full flex items-center gap-2 border-2 border-white/30 shadow-glow-gold"
            >
              <Crown className="w-5 h-5 text-white" />
              <span className="text-white font-black text-sm">VIP MEMBER</span>
            </motion.div>
          </div>

          <div className="flex items-center gap-5 mb-8">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 10px rgba(255, 215, 0, 0.3)',
                  '0 0 25px rgba(255, 215, 0, 0.6)',
                  '0 0 10px rgba(255, 215, 0, 0.3)',
                ],
              }}
              className="relative w-24 h-24 rounded-full bg-gradient-to-br from-nature-green to-gold p-1"
            >
              <Leaf className="w-12 h-12 text-nature-green absolute" />
              {[0, 90, 180, 270].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.1,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                </motion.div>
              ))}
            </motion.div>

            <div className="flex items-center gap-5 mb-8">
              <h3 className="text-2xl font-black gradient-text mb-1 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-nature-green" />
                Green Cart Owner
                <Award className="w-6 h-6 text-gold" />
              </h3>
              <p className="text-nature-green font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-nature-green animate-pulse" />
                Elite VIP Status
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-nature-green/20 to-gold/20 p-5 rounded-2xl border border-nature-green/30"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nature-green to-gold p-1">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 font-semibold">GCT Balance</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-gold" />
                </motion.div>
              </div>
              <div className="text-4xl font-black gradient-text">
                <AnimatedCounter value={user.gctBalance} decimals={2} />
              </div>
              <div className="text-xs text-nature-green font-semibold mt-1">
                +{config.greenCart.pointsBonus} Bonus Applied ✨
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-gold/20 to-nature-green/20 p-5 rounded-2xl border border-gold/30"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-nature-green p-1">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 font-semibold">Total Voltage</span>
                </div>
                <div className="px-3 py-1 bg-gold/20 rounded-full border border-gold/40">
                  <span className="text-xs font-bold text-gold">{config.greenCart.voltageMultiplier}x BOOST</span>
                </div>
              </div>
              <div className="text-4xl font-black text-gold">
                <AnimatedCounter value={user.voltage} decimals={1} />
                <span className="text-2xl ml-1">V</span>
              </div>
              <div className="text-xs text-gold font-semibold mt-1">
                ⚡ {config.greenCart.voltageMultiplier}x Multiplier Active
              </div>
            </motion.div>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-gold/30">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-5 h-5 text-gold" />
              <span className="font-bold text-white">VIP Exclusive Perks</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "⚡", text: "2x Voltage", color: "gold" },
                { icon: "🎁", text: "Bonus Rewards", color: "nature-green" },
                { icon: "👑", text: "Priority Support", color: "gold" },
                { icon: "🌟", text: "Special Badge", color: "nature-green" },
              ].map((perk, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br from-${perk.color}/20 to-${perk.color}/10 px-3 py-2 rounded-xl border border-${perk.color}/30 text-center`}
                >
                  <div className="text-lg mb-1">{perk.icon}</div>
                  <div className={`text-xs font-bold text-${perk.color}`}>{perk.text}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-nature-green to-transparent rounded-full"
                animate={{
                  y: [0, -100, -100],
                  opacity: [0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
