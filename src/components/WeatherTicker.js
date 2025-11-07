"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wind, CloudRain, Sun, AlertCircle, Clock } from "lucide-react";

export default function WeatherTicker({ windSpeed, windDirection, nextChangeIn }) {
  const getWindIcon = () => {
    if (windSpeed < 5) return <Sun className="w-5 h-5" />;
    if (windSpeed < 10) return <Wind className="w-5 h-5" />;
    return <CloudRain className="w-5 h-5" />;
  };

  const getDirectionName = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 glass-gold border-t-2 border-gold/50 px-6 py-4 z-40 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 glass-green px-4 py-2 rounded-full border border-nature-green/50">
            {getWindIcon()}
            <div>
              <div className="text-xs text-gray-400">Wind Speed</div>
              <div className="text-nature-green font-bold text-lg">
                {windSpeed.toFixed(1)} m/s
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 glass px-4 py-2 rounded-full border border-gold/50">
            <Wind 
              className="w-5 h-5 text-gold transition-transform duration-500" 
              style={{ transform: `rotate(${windDirection}deg)` }} 
            />
            <div>
              <div className="text-xs text-gray-400">Direction</div>
              <div className="text-gold font-bold text-lg">
                {getDirectionName(windDirection)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-gray-600">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-xs text-gray-400">Next Change In</div>
              <div className="text-white font-bold text-lg">
                {formatTime(nextChangeIn)}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {nextChangeIn <= 30 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 glass-gold px-4 py-2 rounded-full border-2 border-gold"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <AlertCircle className="w-5 h-5 text-gold" />
                </motion.div>
                <span className="text-gold font-bold">
                  Wind changing soon!
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="glass-green px-5 py-2 rounded-full border border-nature-green/50">
          <div className="text-xs text-gray-400 text-center mb-1">
            Optimal Height Range
          </div>
          <div className="text-nature-green font-bold text-lg text-center">
            {(windSpeed * 5).toFixed(0)}m - {(windSpeed * 7).toFixed(0)}m
          </div>
        </div>
      </div>
    </motion.div>
  );
}
