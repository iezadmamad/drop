"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ProfileCard({ avatarUrl = '/logo3.png', onContactClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-80 h-96 rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onContactClick}
      >
        <img src={avatarUrl} alt="Profile" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <motion.div
          className="absolute inset-0 opacity-50"
          animate={{
            background: isHovered
              ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.4), rgba(168, 85, 247, 0.4))'
              : 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(168, 85, 247, 0.2))',
          }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 rounded-3xl border border-gold/30" />
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0"
          animate={{
            opacity: isHovered ? 1 : 0,
            boxShadow: 'inset 0 0 50px rgba(34, 197, 94, 0.4), inset 0 0 50px rgba(168, 85, 247, 0.4)',
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gold/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
