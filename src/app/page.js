"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Hero from "@/components/Hero";
import TaskJourney from "@/components/TaskJourney";
import Dashboard from "@/components/Dashboard";
import WindTurbineGame from "@/components/WindTurbineGame";
import FloatingReward from "@/components/FloatingReward";
import Loading from "@/components/Loading";
import ScrollProgress from "@/components/ScrollProgress";
import BackgroundLines from "@/components/BackgroundLines";
import ProfileCard from "@/components/ProfileCard";
import AirdropCountdown from "@/components/AirdropCountdown";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showReturn, setShowReturn] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setShowReturn(latest > 0.98);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold to-nature-green origin-left z-50"
        style={{ scaleX }}
      />

      <AnimatePresence>
        {isLoading && (
          <Loading key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <main className="relative">
          <BackgroundLines />
          <ScrollProgress />
          <FloatingReward />

          <Hero />

          <section className="bg-black py-20">
             <AirdropCountdown />
             <div className="max-w-sm mx-auto mt-16">
               <ProfileCard
                 avatarUrl="/logo3.png"
                 name="Golden Deer NFT"
                 title="Legendary Edition"
                 handle="greencandle"
                 status="Exclusive Reward"
                 contactText="View Collection"
               />
             </div>
          </section>

          <TaskJourney />
          <Dashboard />
          <WindTurbineGame />

          <footer className="bg-black border-t border-gold/30 py-10 relative">
            <div className="container mx-auto px-6 text-center">
              <p className="gradient-text font-semibold text-lg mb-2">
                © 2024 Green Candle. Powering Nature's Future.
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Empowering sustainable energy through blockchain technology
              </p>
            </div>

            <AnimatePresence>
              {showReturn && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="fixed bottom-10 right-10 z-50"
                >
                  <motion.button
                    onClick={scrollToTop}
                    className="w-16 h-16 rounded-full bg-gold/20 backdrop-blur-md border border-gold/50 text-gold"
                    animate={{
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(255, 215, 0, 0.4)",
                        "0 0 0 15px rgba(255, 215, 0, 0)",
                        "0 0 0 0 rgba(255, 215, 0, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ↑
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </footer>
        </main>
      )}
    </>
  );
}
