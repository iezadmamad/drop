"use client";

import { motion } from "framer-motion";
import { config } from "@/lib/config";
import { Calendar, Coins, TrendingUp } from "lucide-react";

export default function AirdropTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto my-20"
    >
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold gradient-text mb-4">
          Airdrop Distribution
        </h2>
        <p className="text-gray-400">
          {config.airdrop.totalSupply.toLocaleString()} {config.tokenSymbol} over {config.airdrop.durationDays} days
        </p>
      </div>

      <div className="glass-gold rounded-3xl overflow-hidden border-2 border-gold/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gold/20 to-nature-green/20">
                <th className="px-6 py-4 text-left text-gold font-bold">Phase</th>
                <th className="px-6 py-4 text-center text-gold font-bold">
                  <Calendar className="w-5 h-5 inline mr-2" />
                  Duration
                </th>
                <th className="px-6 py-4 text-center text-gold font-bold">
                  <Coins className="w-5 h-5 inline mr-2" />
                  Tokens
                </th>
                <th className="px-6 py-4 text-center text-gold font-bold">
                  <TrendingUp className="w-5 h-5 inline mr-2" />
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {config.airdrop.phases.map((phase, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-t border-gray-700/50 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ 
                          backgroundColor: phase.color,
                          boxShadow: `0 0 10px ${phase.color}`
                        }}
                      />
                      <span className="font-semibold text-white">{phase.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className="text-nature-green font-bold text-lg">
                      {phase.days} Days
                    </span>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className="text-gold font-bold text-lg">
                      {phase.tokens.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm ml-2">{config.tokenSymbol}</span>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-white font-bold text-xl">{phase.percentage}%</span>
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${phase.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full rounded-full"
                          style={{ 
                            backgroundColor: phase.color,
                            boxShadow: `0 0 10px ${phase.color}`
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-black/30 border-t border-gray-700/50">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Distribution</span>
            <span className="text-2xl font-bold gradient-text">
              {config.airdrop.totalSupply.toLocaleString()} {config.tokenSymbol}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
