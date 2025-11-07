"use client";

import { motion } from "framer-motion";
import { config } from "@/lib/config";
import { Clock } from "lucide-react";
import Countdown from "react-countdown";

const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <div className="text-3xl md:text-5xl font-black text-nature-green">
        Airdrop is Live! Join Now!
      </div>
    );
  } else {
    return (
      <div className="flex justify-center gap-2 md:gap-6">
        <div className="text-center p-2 rounded-lg w-20 md:w-28">
          <div className="text-4xl md:text-6xl font-black gradient-text">{String(days).padStart(2, '0')}</div>
          <div className="text-xs text-gray-400 mt-1">Days</div>
        </div>
        <div className="text-4xl md:text-6xl font-black text-gold opacity-50">:</div>
        <div className="text-center p-2 rounded-lg w-20 md:w-28">
          <div className="text-4xl md:text-6xl font-black gradient-text">{String(hours).padStart(2, '0')}</div>
          <div className="text-xs text-gray-400 mt-1">Hours</div>
        </div>
        <div className="text-4xl md:text-6xl font-black text-gold opacity-50">:</div>
        <div className="text-center p-2 rounded-lg w-20 md:w-28">
          <div className="text-4xl md:text-6xl font-black gradient-text">{String(minutes).padStart(2, '0')}</div>
          <div className="text-xs text-gray-400 mt-1">Minutes</div>
        </div>
        <div className="text-4xl md:text-6xl font-black text-gold opacity-50">:</div>
        <div className="text-center p-2 rounded-lg w-20 md:w-28">
          <div className="text-4xl md:text-6xl font-black gradient-text">{String(seconds).padStart(2, '0')}</div>
          <div className="text-xs text-gray-400 mt-1">Seconds</div>
        </div>
      </div>
    );
  }
};

export default function AirdropCountdown() {
  const endDate = new Date(Date.now() + config.airdrop.durationDays * 24 * 60 * 60 * 1000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto my-20"
    >
      <div className="glass-gold rounded-3xl p-6 md:p-10 border-2 border-gold/50 shadow-glow-gold relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent animate-pulse" />
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-2 flex items-center justify-center gap-3">
            <Clock className="w-10 h-10" />
            Airdrop Countdown
          </h2>
          <p className="text-gray-400">
            {config.airdrop.totalSupply.toLocaleString()} {config.tokenSymbol} tokens to be distributed!
          </p>
        </div>
        
        <div className="relative z-10">
          <Countdown date={endDate} renderer={CountdownRenderer} />
        </div>

        <div className="mt-8 pt-6 border-t border-gold/30 text-center relative z-10">
          <p className="text-sm text-gray-400">
            The airdrop event will last for <span className="font-bold text-gold">{config.airdrop.durationDays} days</span>. 
            Join now to secure your share!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
