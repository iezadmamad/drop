"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Wallet, Users, Zap, Copy, Check } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { config } from "@/lib/config";
import AnimatedCounter from "./AnimatedCounter";
import StandardProfileCard from "./StandardProfileCard";
import GreenCartPurchase from "./GreenCartPurchase";
import Vip3DCard from "./Vip3DCard";

export default function Dashboard() {
  const { user, convertVoltageToGCT } = useUser();
  const [copied, setCopied] = useState(false);
  const referralLink = `https://greencandle.io/ref/${Math.random().toString(36).substr(2, 9)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConvert = () => {
    if (user.voltage > 0) convertVoltageToGCT();
  };

  return (
    <section id="dashboard" className="min-h-screen bg-gradient-to-b from-black to-forest py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Your Dashboard</h2>
          <p className="text-gray-400 text-lg">Track your progress and manage rewards</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            {user.hasGreenCart ? <Vip3DCard user={user} /> : <StandardProfileCard />}
            <GreenCartPurchase />
          </motion.div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="glass-gold p-6 rounded-2xl border-2 border-gold/50">
                <div className="flex items-center gap-3 mb-4">
                  <Wallet className="w-8 h-8 text-gold" />
                  <div>
                    <div className="text-sm text-gray-400">Total Balance</div>
                    <div className="text-3xl font-bold gradient-text">
                      <AnimatedCounter value={user.gctBalance} decimals={2} />
                      <span className="text-xl ml-2">{config.tokenSymbol}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-green p-6 rounded-2xl border-2 border-nature-green/50">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-nature-green" />
                  <div>
                    <div className="text-sm text-gray-400">Generated Voltage</div>
                    <div className="text-3xl font-bold text-nature-green">
                      <AnimatedCounter value={user.voltage} decimals={1} />
                      <span className="text-xl ml-2">V</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConvert}
                  disabled={user.voltage === 0}
                  className="w-full py-2 bg-nature-green/20 text-nature-green rounded-lg font-semibold"
                >
                  Convert to {config.tokenSymbol}
                </motion.button>
              </div>

              <div className="glass p-6 rounded-2xl md:col-span-2 border-2 border-gold/30">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8 text-gold" />
                  <div>
                    <div className="text-sm text-gray-400">Total Referrals</div>
                    <div className="text-3xl font-bold text-gold">
                      {user.referrals?.length || 0}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 bg-black/30 border border-gold/30 rounded-lg px-4 py-2 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="px-4 py-2 bg-gradient-to-r from-gold to-nature-green text-black rounded-lg"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
