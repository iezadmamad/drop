"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, Circle, Settings, ArrowRight, Wind, X, Gauge, Target } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Image from 'next/image';

function GameTutorial({ onComplete, onSkip, windHeight }) {
  const [step, setStep] = useState(0);

  const steps = [
    { title: "Welcome to Wind Turbine Challenge! 🎮", description: "Generate clean energy and earn GCT tokens by matching your turbine height with wind conditions.", icon: Zap, color: "#FFD700" },
    { title: "Current Wind Conditions 💨", description: `Right now, wind is blowing at ${windHeight}m height. You'll need to adjust your turbine to match this height!`, icon: Wind, color: "#3b82f6" },
    { title: "How to Play 🎚️", description: "Use the slider at the bottom to adjust your turbine height. Move it left (lower) or right (higher) until you match the wind.", icon: Settings, color: "#22c55e" },
    { title: "Match Within ±5 Meters 🎯", description: `Get your turbine within 5 meters of ${windHeight}m (so between ${windHeight - 5}m and ${windHeight + 5}m) to enter the OPTIMAL zone!`, icon: Target, color: "#ef4444" },
    { title: "Earn While Optimal ⚡", description: "When you're in the OPTIMAL zone, your blades spin and you earn 0.5 Voltage per second. Keep it matched to keep earning!", icon: Gauge, color: "#FFD700" },
    { title: "Wind Changes Every 3-5 Hours ⏰", description: "Watch the red ticker at the bottom! It shows when wind will change. Come back online to adjust and keep earning!", icon: Wind, color: "#dc2626" }
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  const nextStep = () => step < steps.length - 1 ? setStep(step + 1) : onComplete();
  const prevStep = () => step > 0 && setStep(step - 1);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[100] flex items-center justify-center p-4">
      <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onSkip} className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-[102] cursor-pointer">
        <X className="w-8 h-8" />
      </motion.button>
      <div className="max-w-2xl w-full z-[101]">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -50, scale: 0.9 }} transition={{ type: "spring", duration: 0.6 }} className="glass-gold rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border-2 border-gold/50">
            <motion.div className="absolute inset-0 opacity-10 pointer-events-none" animate={{ background: [`radial-gradient(circle at 20% 50%, ${currentStep.color} 0%, transparent 50%)`, `radial-gradient(circle at 80% 50%, ${currentStep.color} 0%, transparent 50%)`, `radial-gradient(circle at 20% 50%, ${currentStep.color} 0%, transparent 50%)`] }} transition={{ duration: 4, repeat: Infinity }} />
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.2 }} className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${currentStep.color}, ${currentStep.color}88)`, boxShadow: `0 0 40px ${currentStep.color}66` }}>
              <Icon className="w-12 h-12 text-white" />
              <motion.div className="absolute inset-0 rounded-full border-2 pointer-events-none" style={{ borderColor: currentStep.color }} animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            </motion.div>
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-3xl md:text-4xl font-black gradient-text mb-4">{currentStep.title}</motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed">{currentStep.description}</motion.p>
            <div className="flex items-center justify-center gap-2 mb-8">
              {steps.map((_, index) => (<motion.div key={index} className="h-2 rounded-full" animate={{ width: index === step ? '40px' : '12px', background: index === step ? currentStep.color : '#ffffff33' }} transition={{ duration: 0.3 }} />))}
            </div>
            <div className="flex gap-4 justify-center">
              {step > 0 && (<motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={prevStep} className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold cursor-pointer">Back</motion.button>)}
              <motion.button initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStep} className="px-8 py-3 rounded-full font-bold text-black flex items-center gap-2 cursor-pointer" style={{ background: `linear-gradient(135deg, ${currentStep.color}, ${currentStep.color}dd)` }}>{step < steps.length - 1 ? (<>Next<ArrowRight className="w-5 h-5" /></>) : (<>Start Playing<Play className="w-5 h-5" /></>)}</motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Turbine({ height, isOptimal }) {
  const minHeightPx = 80;
  const maxHeightPx = 420;
  const nacelleHeight = 40;
  const towerHeight = minHeightPx + ((height - 20) / 80) * (maxHeightPx - minHeightPx);

  const markers = [20, 40, 60, 80, 100];

  return (
    <div className="relative w-full h-[500px] flex justify-center items-end">
      <div className="absolute right-full mr-4 bottom-10 h-[420px]">
        <motion.div
          className="relative h-full"
          animate={{ y: (maxHeightPx - towerHeight) * 0.95 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          {markers.map((m) => (
            <div key={m} className="flex items-center gap-2 text-gray-500" style={{ position: 'absolute', bottom: `${((m - 20) / 80) * 100}%`, transform: 'translateY(50%)' }}>
              <span className="text-xs font-bold w-8 text-right">{m}m</span>
              <div className="w-4 h-px bg-gray-500" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative flex flex-col items-center">
        <motion.div
          className="absolute z-10 bottom-0 flex flex-col items-center"
          initial={{ y: -towerHeight }}
          animate={{ y: -towerHeight }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <div className="w-20 h-10 bg-gray-700 rounded-t-md rounded-b-sm shadow-inner" style={{ height: `${nacelleHeight}px` }} />
          <div className="relative w-40 h-40 flex items-center justify-center -mt-6">
            <motion.div
              className="absolute"
              animate={isOptimal ? { rotate: 360 } : { rotate: 0 }}
              transition={isOptimal ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
            >
              <Image src="/pare.png" alt="Turbine Blades" width={160} height={160} className={`object-contain drop-shadow-2xl transition-all duration-500 ${isOptimal ? "filter hue-rotate-90 brightness-125" : ""}`} priority />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="relative w-8 rounded-t-sm overflow-hidden"
          initial={{ height: towerHeight }}
          animate={{ height: towerHeight }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <Image src="/stan.png" alt="Turbine Tower" fill className="object-cover object-bottom" quality={100} />
        </motion.div>
        
        <div className="w-16 h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg" />
        <div className="w-20 h-1 mt-0.5 bg-gray-900 rounded-full" />
      </div>
    </div>
  );
}

function WindEffect({ isOptimal, turbineHeight }) {
  if (!isOptimal) return null;

  const minHeightPx = 80;
  const maxHeightPx = 420;
  const nacelleHeight = 40;
  const towerHeight = minHeightPx + ((turbineHeight - 20) / 80) * (maxHeightPx - minHeightPx);
  const windPosition = 500 - (towerHeight + nacelleHeight - 20);

  const windLines = 25;

  return (
    <motion.div 
      className="absolute inset-x-0 h-[200px] overflow-hidden pointer-events-none z-20"
      initial={{ bottom: windPosition }}
      animate={{ bottom: windPosition }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
    >
      {[...Array(windLines)].map((_, i) => {
        const duration = 1.2 + Math.random() * 1;
        const verticalOffset = (Math.random() - 0.5) * 150;
        return (
          <motion.div key={`wind-${i}`} className="absolute h-px" style={{ width: `${100 + Math.random() * 150}px`, background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.6), transparent)', top: `calc(50% + ${verticalOffset}px)`, left: '-200px', filter: 'blur(0.5px)' }}
            animate={{ x: [0, typeof window !== 'undefined' ? window.innerWidth + 400 : 1000] }}
            transition={{ x: { duration: duration, repeat: Infinity, ease: "linear", delay: Math.random() * duration } }} />
        );
      })}
    </motion.div>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute w-full h-full">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 215, 0, 0.1)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {[...Array(5)].map((_, i) => (
        <motion.div key={`line-${i}`} className="absolute h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" style={{ top: `${20 + i * 20}%` }} animate={{ x: ['-100%', '100%'] }} transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }} />
      ))}
    </div>
  );
}

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`;
};

const getRandomInterval = () => Math.floor((3 + Math.random() * 2) * 3600);

export default function WindTurbineGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const { addVoltage } = useUser();
  const [windHeight, setWindHeight] = useState(50);
  const [nextWindHeight, setNextWindHeight] = useState(70);
  const [timeToNextChange, setTimeToNextChange] = useState(getRandomInterval());
  const [turbineHeight, setTurbineHeight] = useState(30);
  const [isOptimal, setIsOptimal] = useState(false);
  const [soundsEnabled, setSoundsEnabled] = useState(false);

  const windSoundRef = useRef(null);
  const bipSoundRef = useRef(null);
  const lastOptimalStateRef = useRef(false);
  const gameSectionRef = useRef(null);
  const [proximity, setProximity] = useState(1);
  const windLoopIntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (windSoundRef.current) windSoundRef.current.pause();
      if (bipSoundRef.current) bipSoundRef.current.pause();
      if (windLoopIntervalRef.current) clearInterval(windLoopIntervalRef.current);
    };
  }, []);

  const initializeSounds = () => {
    if (!soundsEnabled && typeof window !== 'undefined') {
      try {
        windSoundRef.current = new Audio('/hood.mp3');
        windSoundRef.current.loop = false;
        windSoundRef.current.volume = 0.5;
        bipSoundRef.current = new Audio('/bip.mp3');
        bipSoundRef.current.volume = 0.6;
        setSoundsEnabled(true);
      } catch (e) {
        console.error("Audio could not be initialized.", e);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setProximity(entry.intersectionRatio)),
      { root: null, rootMargin: '0px', threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );
    if (gameSectionRef.current) observer.observe(gameSectionRef.current);
    return () => gameSectionRef.current && observer.unobserve(gameSectionRef.current);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const gameInterval = setInterval(() => isOptimal && addVoltage(0.5), 1000);
    return () => clearInterval(gameInterval);
  }, [isPlaying, isOptimal, addVoltage]);

  useEffect(() => {
    const changeTimer = setInterval(() => {
      setTimeToNextChange(prev => {
        if (prev <= 1) {
          setWindHeight(nextWindHeight);
          setNextWindHeight(Math.floor(20 + Math.random() * 81));
          return getRandomInterval();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(changeTimer);
  }, [nextWindHeight]);

  useEffect(() => setIsOptimal(Math.abs(turbineHeight - windHeight) < 5), [turbineHeight, windHeight]);

  useEffect(() => {
    if (!soundsEnabled || !bipSoundRef.current) return;
    if (isPlaying && isOptimal && lastOptimalStateRef.current !== isOptimal) {
      bipSoundRef.current.currentTime = 0;
      bipSoundRef.current.play().catch(e => console.error("Bip sound error:", e));
    }
    lastOptimalStateRef.current = isOptimal;
  }, [isOptimal, isPlaying, soundsEnabled]);

  useEffect(() => {
    if (!soundsEnabled || !windSoundRef.current) return;
    if (windLoopIntervalRef.current) clearInterval(windLoopIntervalRef.current);
    if (isPlaying && isOptimal) {
      const playWindSound = () => {
        if (windSoundRef.current) {
          windSoundRef.current.currentTime = 0;
          windSoundRef.current.play().catch(e => console.error("Wind sound error:", e));
        }
      };
      playWindSound();
      windLoopIntervalRef.current = setInterval(playWindSound, 10000);
    } else if (windSoundRef.current && !windSoundRef.current.paused) {
      windSoundRef.current.pause();
    }
  }, [isOptimal, isPlaying, soundsEnabled]);

  useEffect(() => {
    if (!soundsEnabled || !windSoundRef.current) return;
    const targetVolume = (isPlaying && isOptimal && proximity > 0.1) ? proximity * 0.7 : 0;
    if (windSoundRef.current.volume !== targetVolume) {
      windSoundRef.current.volume = targetVolume;
    }
  }, [proximity, isPlaying, isOptimal, soundsEnabled]);

  const handleSliderChange = (event) => {
    setTurbineHeight(Number(event.target.value));
    initializeSounds();
  };

  const handleStartGame = () => {
    setIsPlaying(true);
    initializeSounds();
  };

  const handleTutorialComplete = () => setShowTutorial(false);
  const handleTutorialSkip = () => setShowTutorial(false);

  if (!isPlaying) {
    return (
      <section id="game" className="min-h-screen bg-black relative flex flex-col items-center justify-center overflow-hidden p-4">
        <AnimatedBackground />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10">
          <h2 className="text-5xl font-black gradient-text mb-4">Wind Turbine Challenge</h2>
          <p className="text-gray-400 mb-8">Generate energy to earn more GCT!</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleStartGame} className="px-10 py-5 bg-gradient-to-r from-gold to-nature-green text-black font-bold text-xl rounded-full">
            <Play className="inline mr-2" /> Start Game
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section ref={gameSectionRef} id="game-active" className="min-h-screen bg-black relative flex flex-col lg:flex-row items-center justify-center overflow-hidden p-4 lg:p-8">
      <AnimatePresence>
        {showTutorial && (<GameTutorial onComplete={handleTutorialComplete} onSkip={handleTutorialSkip} windHeight={windHeight} />)}
      </AnimatePresence>
      <AnimatedBackground />
      <WindEffect isOptimal={isOptimal} turbineHeight={turbineHeight} />
      <div className="w-full lg:w-1/3 h-full flex flex-col items-center justify-center p-4 z-10">
        <Turbine height={turbineHeight} isOptimal={isOptimal} />
        <div className="mt-8 flex items-center gap-2 w-full max-w-xs relative">
          <Settings className="w-6 h-6 text-gold" />
          <input type="range" min="20" max="100" value={turbineHeight} onChange={handleSliderChange} className="w-full accent-gold" />
          <span className="font-bold text-lg text-gold w-16 text-center">{turbineHeight}m</span>
        </div>
      </div>
      <div className="w-full lg:w-2/3 h-full relative flex items-center justify-center z-10">
        <AnimatePresence>
          {isOptimal ? (
            <motion.div key="optimal" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="text-center">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-nature-green bg-nature-green/10 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gold bg-gold/10 flex flex-col items-center justify-center">
                  <Zap className="w-8 h-8 md:w-12 md:h-12 text-gold animate-pulse" />
                  <span className="mt-2 font-bold text-sm md:text-lg text-gold">Optimal!</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-nature-green font-bold">
                <Circle className="w-3 h-3 fill-current" />Status Active
              </div>
            </motion.div>
          ) : (
            <motion.div key="inactive" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="text-center">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-gray-600 bg-gray-800/50 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-700 bg-gray-900/50 flex flex-col items-center justify-center">
                  <Circle className="w-8 h-8 md:w-12 md:h-12 text-gray-500" />
                  <span className="mt-2 font-bold text-sm md:text-lg text-gray-500">Adjust</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 font-bold">
                <Circle className="w-3 h-3" />Status Inactive
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-0 w-full overflow-hidden bg-red-800/80 backdrop-blur-sm py-1 z-20">
        <motion.div className="flex whitespace-nowrap text-white font-bold text-sm" animate={{ x: ['100%', '-100%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
          <span className="mx-16">CURRENT WIND HEIGHT: {windHeight.toFixed(0)}m | NEXT SHIFT IN {formatTime(timeToNextChange)} TO {nextWindHeight.toFixed(0)}m</span>
        </motion.div>
      </div>
    </section>
  );
}
