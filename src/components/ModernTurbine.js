"use client";

import { motion } from "framer-motion";

export default function ModernTurbine({ height, isOptimal }) {
  const bladeSpeed = isOptimal ? 2 : 5;

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        animate={{ y: -(height * 3) }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="relative z-20"
      >
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div 
            className={`absolute w-12 h-12 rounded-full flex items-center justify-center z-20 ${
              isOptimal ? 'bg-gold shadow-glow-gold' : 'bg-gray-600'
            }`}
          >
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{
              duration: bladeSpeed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[0, 120, 240].map((angle) => (
              <div
                key={angle}
                className="absolute"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'center',
                }}
              >
                <div
                  className={`w-4 h-20 rounded-full ${
                    isOptimal 
                      ? 'bg-gradient-to-t from-gold via-gold to-transparent' 
                      : 'bg-gradient-to-t from-gray-500 to-transparent'
                  }`}
                  style={{
                    clipPath: 'polygon(40% 0%, 60% 0%, 50% 100%)',
                    marginTop: '-60px',
                    marginLeft: '-2px',
                    filter: isOptimal ? 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))' : 'none',
                  }}
                />
              </div>
            ))}
          </motion.div>

          <div className={`absolute w-16 h-8 rounded-full z-10 ${
            isOptimal 
              ? 'bg-gradient-to-r from-gold to-dark-gold' 
              : 'bg-gradient-to-r from-gray-600 to-gray-700'
          }`} />
        </div>

        {isOptimal && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-gold rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, Math.cos((i * 45) * Math.PI / 180) * 50],
                  y: [0, Math.sin((i * 45) * Math.PI / 180) * 50],
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        className={`w-3 relative ${
          isOptimal 
            ? 'bg-gradient-to-b from-gold via-dark-gold to-gray-700' 
            : 'bg-gradient-to-b from-gray-600 to-gray-800'
        }`}
        style={{
          height: `${height * 3}px`,
          boxShadow: isOptimal ? '0 0 15px rgba(255, 215, 0, 0.4)' : 'none',
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-6 text-xs font-bold"
            style={{ 
              top: `${i * 25}%`,
              color: isOptimal ? '#FFD700' : '#6b7280',
            }}
          >
            {Math.round(height - (i * height / 4))}m
          </div>
        ))}
      </motion.div>

      <div className={`w-20 h-8 rounded-b-2xl ${
        isOptimal 
          ? 'bg-gradient-to-b from-gray-700 to-dark-gold/30' 
          : 'bg-gradient-to-b from-gray-700 to-gray-900'
      }`} />
      <div className={`w-28 h-2 rounded-full mt-1 ${
        isOptimal ? 'bg-gold/20' : 'bg-gray-900'
      }`} />
      
      <div className="w-32 h-1 bg-black/50 rounded-full blur-sm mt-1" />
    </div>
  );
}
