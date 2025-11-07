
"use client";

import { motion } from "framer-motion";
import { config } from "@/lib/config";
import { Sparkles, TrendingUp } from "lucide-react";
import Image from 'next/image';

const LeafSVG = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L5.71 22c2.08-5.17 4.17-11.34 13.17-13.34 2.39-.53 4.68-.73 6.12-.73v-2c-1.44 0-3.73.2-6.12.73-.53.12-1.03.25-1.53.39C17.14 7.46 17 7.72 17 8zm-4.5 3.5c-.37 0-.74.04-1.10.12C10.9 11.8 10.5 12 10.5 12.5c0 .83.67 1.5 1.5 1.5 2.49 0 4.5 2.01 4.5 4.5 0 .83.67 1.5 1.5 1.5.5 0 .7-.4.88-.9.08-.36.12-.73.12-1.1 0-3.59-2.91-6.5-6.5-6.5z"/>
  </svg>
);

export default function Hero() {
  const leaves = [...Array(8)].map((_, i) => {
    const fromLeft = i % 2 === 0;
    const duration = 20 + Math.random() * 15;
    
    return {
      id: i,
      src: i % 3 === 0 ? '/leaf.png' : '/leaf2.png',
      size: 18 + Math.random() * 22,
      duration,
      delay: Math.random() * 15,
      fromLeft,
      yPosition: 10 + Math.random() * 80,
      yFloat: 20 + Math.random() * 30,
      rotateAmount: 15 + Math.random() * 25,
      opacity: 0.5 + Math.random() * 0.3,
    };
  });

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-forest to-black" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {leaves.map((leaf, index) => (
          <motion.div
            key={leaf.id}
            className="absolute"
            initial={{
              x: leaf.fromLeft ? '-10vw' : '110vw',
              y: `${leaf.yPosition}vh`,
            }}
            animate={{
              x: leaf.fromLeft ? '110vw' : '-10vw',
            }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              animate={{
                y: [0, -leaf.yFloat, 0, leaf.yFloat, 0],
                rotate: [0, leaf.rotateAmount, 0, -leaf.rotateAmount, 0],
              }}
              transition={{
                duration: leaf.duration / 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{
                  rotateY: [0, 180, 360],
                }}
                transition={{
                  duration: leaf.duration / 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image 
                  src={leaf.src} 
                  alt="leaf" 
                  width={leaf.size} 
                  height={leaf.size} 
                  style={{ opacity: leaf.opacity }}
                  priority={index < 2}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}

        <motion.div
          className="absolute"
          initial={{ x: '120vw', y: '50vh' }}
          animate={{
            x: '-20vw',
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "linear",
          }}
        >
          <motion.div
            animate={{
              y: [0, -40, 0, 30, 0],
              rotate: [0, 25, 0, -25, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{
                rotateY: [0, 180, 360],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image 
                src="/leaf.png" 
                alt="special leaf" 
                width={70} 
                height={70} 
                style={{ opacity: 0.6 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8 inline-block"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-nature-green blur-3xl rounded-full"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Image src="/logo.png" alt="GCT Logo" width={96} height={96} className="relative" priority />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold mb-6 gradient-text"
          >
            {config.projectName} Airdrop
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-8 glass-gold rounded-full px-6 py-3 max-w-md mx-auto"
          >
            <Image src="/logo.png" alt="GCT Logo" width={32} height={32} />
            <span className="text-xl font-bold text-white">=</span>
            <Image src="/treecos.png" alt="Tree Logo" width={32} height={32} />
            <span className="font-semibold text-lg text-gold">One Token, One Tree</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
