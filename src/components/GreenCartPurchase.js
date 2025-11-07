"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShoppingCart, Zap, Gift, Crown, Check, Sparkles, Leaf } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { config } from "@/lib/config";

export default function GreenCartPurchase() {
  const { user, purchaseGreenCart } = useUser();
  const [isHovered, setIsHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  if (user.hasGreenCart) return null;

  const handlePurchase = () => {
    purchaseGreenCart();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <>
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '50%',
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  y: [-100, (typeof window !== 'undefined' ? window.innerHeight : 1000)],
                  x: [(Math.random() - 0.5) * 200],
                  opacity: [1, 0],
                  rotate: [0, 360],
                }}
                transition={{ duration: 2 + Math.random(), ease: "easeOut" }}
              >
                {i % 2 === 0 ? (
                  <Leaf className="w-6 h-6 text-nature-green" />
                ) : (
                  <Sparkles className="w-6 h-6 text-gold" />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md"
      >
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
          className="relative glass-green rounded-3xl p-8 border-2 border-nature-green/50 overflow-hidden cursor-pointer"
          onClick={handlePurchase}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-nature-green/20 to-gold/20"
            animate={{
              opacity: isHovered ? 0.8 : 0.3,
            }}
          />

          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      x: Math.random() * 400,
                      y: 400,
                      opacity: 0,
                      rotate: 0,
                    }}
                    animate={{
                      y: -100,
                      opacity: [0, 1, 0],
                      rotate: 360,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                    }}
                  >
                    <Leaf className="w-6 h-6 text-nature-green" />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: isHovered ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-nature-green to-gold rounded-2xl flex items-center justify-center shadow-glow-green"
                >
                  <ShoppingCart className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-black gradient-text">Green Cart</h3>
                  <p className="text-sm text-gray-400">Premium Membership</p>
                </div>
              </div>

              <motion.div
                animate={{
                  scale: isHovered ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                className="bg-gradient-to-br from-gold to-nature-green px-4 py-2 rounded-full"
              >
                <div className="text-2xl font-black text-white">
                  ${config.greenCart.priceUSD}
                </div>
              </motion.div>
            </div>

            <div className="space-y-3 mb-6">
              {[
                {
                  icon: Zap,
                  text: `${config.greenCart.voltageMultiplier}x Voltage Multiplier`,
                  color: "text-gold",
                  bg: "bg-gold/20",
                },
                {
                  icon: Gift,
                  text: `+${config.greenCart.pointsBonus} ${config.tokenSymbol} Instant Bonus`,
                  color: "text-nature-green",
                  bg: "bg-nature-green/20",
                },
                {
                  icon: Crown,
                  text: "Exclusive VIP Status & Badge",
                  color: "text-gold",
                  bg: "bg-gold/20",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-3 p-3 ${feature.bg} rounded-xl border border-white/10`}
                >
                  <div className={`w-8 h-8 rounded-full bg-black/30 flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-white flex-1">
                    {feature.text}
                  </span>
                  <Check className={`w-5 h-5 ${feature.color}`} />
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-r from-nature-green to-gold rounded-xl font-black text-white"
            >
              <ShoppingCart className="w-5 h-5 inline mr-2" />
              Upgrade to VIP Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
