"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { config } from "@/lib/config";
import { useUser } from "@/context/UserContext";
import MatrixTask from "./MatrixTask";
import Galaxy from "./Galaxy";

const StarSVG = ({ className }) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <defs>
      <filter id="journey-star-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      filter="url(#journey-star-glow)"
    />
  </svg>
);

export default function TaskJourney() {
  const containerRef = useRef(null);
  const { user, completeTask } = useUser();
  const { scrollYProgress } = useScroll({ target: containerRef });

  const pathLength = 2500;
  const pathWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 600;

  const taskPositions = useMemo(() => {
    return config.tasks.map((_, index) => {
      const y = ((index + 1) / (config.tasks.length + 1)) * pathLength;
      const x = Math.sin((y / pathLength) * Math.PI * 4) * (pathWidth / 3);
      return { x, y };
    });
  }, [pathLength, pathWidth]);
  
  const pathData = useMemo(() => generate2DPath(pathLength, pathWidth), [pathLength, pathWidth]);

  const cometX = useTransform(scrollYProgress, (v) => Math.sin(v * Math.PI * 4) * (pathWidth / 3));
  const cometY = useTransform(scrollYProgress, [0, 1], [0, pathLength]);

  const [activeTaskIndex, setActiveTaskIndex] = useState(-1);
  const [isMoving, setIsMoving] = useState(false);
  const verticalScroll = useTransform(scrollYProgress, v => -v * (pathLength - (typeof window !== 'undefined' ? window.innerHeight * 0.8 : 0)));

  useEffect(() => {
    let lastY = 0;
    const unsubscribe = cometY.on("change", (latest) => {
      setIsMoving(Math.abs(latest - lastY) > 0.5);
      lastY = latest;

      let closestTaskIndex = -1;
      let minDistance = 100;

      taskPositions.forEach((pos, index) => {
        const distance = Math.abs(latest - pos.y);
        if (distance < minDistance) {
          minDistance = distance;
          closestTaskIndex = index;
        }
      });
      setActiveTaskIndex(closestTaskIndex);
    });
    return () => unsubscribe();
  }, [cometY, taskPositions]);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative bg-black"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <Galaxy
          autoCenterRepulsion={1.5}
          rotationSpeed={0.05}
          density={1.2}
        />

        <div className="absolute inset-0 flex flex-col items-center pt-10 md:pt-20 z-10">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-2">Your Journey to Rewards</h2>
          <p className="text-gray-400 text-sm md:text-base">Follow the star and complete tasks</p>

          <div className="w-full flex-1 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-1/2"
              style={{
                y: verticalScroll,
                x: "-50%",
                willChange: "transform",
                transform: "translateZ(0)"
              }}
            >
              <div className="relative" style={{ width: `${pathWidth}px`, height: `${pathLength}px` }}>
                <svg width={pathWidth} height={pathLength} className="absolute inset-0 overflow-visible">
                  <defs>
                    <linearGradient id="path-gradient-journey" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="50%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                    <filter id="node-glow-journey" x="-50%" y="-50%" width="200%" height="200%">
                       <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    </filter>
                  </defs>
                  <motion.path d={pathData} stroke="rgba(255, 215, 0, 0.2)" strokeWidth="4" fill="none" />
                  <motion.path d={pathData} stroke="url(#path-gradient-journey)" strokeWidth="6" fill="none" style={{ pathLength: scrollYProgress }} />
                  
                  {config.tasks.map((task, index) => {
                    const pos = taskPositions[index];
                    const isCompleted = user.completedTasks.includes(task.id);
                    const isActive = activeTaskIndex === index;
                    return (
                      <motion.circle
                        key={`node-${task.id}`}
                        cx={pathWidth / 2 + pos.x}
                        cy={pos.y}
                        r="8"
                        fill={isCompleted ? "#22c55e" : "#FFD700"}
                        stroke={isCompleted ? "#22c55e" : "#FFD700"}
                        strokeWidth="2"
                        filter="url(#node-glow-journey)"
                        animate={{
                          scale: isActive && !isCompleted ? 1.5 : 1,
                          opacity: isCompleted ? 1 : 0.7
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                      />
                    );
                  })}
                </svg>

                {config.tasks.map((task, index) => {
                  const pos = taskPositions[index];
                  return (
                    <div key={task.id} className="absolute z-40" style={{ top: `${pos.y}px`, left: `calc(50% + ${pos.x}px)`, transform: 'translate(-50%, -50%)' }}>
                      <MatrixTask
                        task={task}
                        isActive={activeTaskIndex === index}
                        isCompleted={user.completedTasks.includes(task.id)}
                        onComplete={() => completeTask(task.id)}
                      />
                    </div>
                  );
                })}

                <motion.div className="absolute z-50" style={{ y: cometY, left: useTransform(cometX, v => `calc(50% + ${v}px)`), x: '-50%' }}>
                  <ShootingStar isMoving={isMoving} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShootingStar({ isMoving }) {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <AnimatePresence>
        {isMoving && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 192 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-4 left-1/2 w-4 bg-gradient-to-t from-gold to-transparent"
            style={{ transform: 'translateX(-50%)', filter: 'blur(4px)' }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <StarSVG className="w-10 h-10 text-gold" />
      </motion.div>

      <AnimatePresence>
        {!isMoving && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gold"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0, 0.8, 0] }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            />
        )}
      </AnimatePresence>
    </div>
  );
}

function generate2DPath(height, width) {
  const points = 50;
  const amplitude = width / 3;
  let path = `M ${width / 2} 0`;
  for (let i = 1; i <= points; i++) {
    const y = (i / points) * height;
    const x = width / 2 + Math.sin((y / height) * Math.PI * 4) * amplitude;
    path += ` L ${x} ${y}`;
  }
  return path;
}
