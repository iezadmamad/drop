"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Award, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";

const LETTER_PATTERNS = {
  A: [[1,0],[2,0],[0,1],[3,1],[0,2],[4,2],[0,3],[1,3],[3,3],[4,3],[0,4],[4,4]],
  B: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,2],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4]],
  C: [[1,0],[2,0],[0,1],[0,2],[0,3],[1,4],[2,4]],
  D: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[2,1],[2,3],[1,4]],
  E: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,2],[1,4],[2,0],[2,2],[2,4]],
  H: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,2],[2,0],[2,1],[2,2],[2,3],[2,4]],
  I: [[0,0],[1,0],[2,0],[1,1],[1,2],[1,3],[0,4],[1,4],[2,4]],
  L: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,4],[2,4]],
  N: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,1],[2,2],[3,0],[3,1],[3,2],[3,3],[3,4]],
  O: [[1,0],[2,0],[0,1],[0,2],[0,3],[3,1],[3,2],[3,3],[1,4],[2,4]],
  P: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[2,1],[1,2],[2,2]],
  R: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[2,1],[1,2],[1,3],[2,4]],
  S: [[1,0],[2,0],[0,1],[1,2],[2,3],[0,4],[1,4]],
  T: [[0,0],[1,0],[2,0],[3,0],[4,0],[2,1],[2,2],[2,3],[2,4]],
  X: [[0,0],[1,1],[2,2],[3,3],[4,4],[0,4],[1,3],[3,1],[4,0]],
};

const CRYPTO_IDS_MAP = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  BNB: 'binancecoin',
  SOL: 'solana',
  XRP: 'ripple',
  DOT: 'polkadot',
  LTC: 'litecoin',
};

function createWordPattern(word, viewBoxSize = 100) {
  const positions = [];
  const dotScale = 1.6;
  const letterSpacing = 2.5;
  const letterHeight = 5 * dotScale;

  const letterWidths = Array.from(word).map(char => {
    const pattern = LETTER_PATTERNS[char] || [];
    if (pattern.length === 0) return 0;
    const maxX = Math.max(...pattern.map(p => p[0]));
    return maxX * dotScale;
  });

  const totalWidth = letterWidths.reduce((sum, width) => sum + width, 0) + (word.length - 1) * letterSpacing;

  const startX = (viewBoxSize - totalWidth) / 2;
  const startY = (viewBoxSize - letterHeight) / 2;
  let currentX = startX;

  Array.from(word).forEach((char, index) => {
    const pattern = LETTER_PATTERNS[char] || [];
    pattern.forEach(([px, py]) => {
      positions.push({
        x: currentX + px * dotScale,
        y: startY + py * dotScale,
      });
    });
    currentX += letterWidths[index] + letterSpacing;
  });

  return positions;
}

function PhysicsNetwork() {
  const cryptoSymbols = useMemo(() => ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'DOT', 'LTC'], []);
  const [nodes, setNodes] = useState([]);
  const [mode, setMode] = useState('dispersing');
  const [currentSymbolIndex, setCurrentSymbolIndex] = useState(0);
  const [targetPositions, setTargetPositions] = useState([]);
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [apiStatus, setApiStatus] = useState('loading');
  
  const connectionRef = useRef([]);
  const animationParams = useRef({});
  
  const bounds = { minX: 10, maxX: 90, minY: 15, maxY: 85 };
  const nodeCount = 80;

  useEffect(() => {
    const initialNodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: bounds.minX + Math.random() * (bounds.maxX - bounds.minX),
      y: bounds.minY + Math.random() * (bounds.maxY - bounds.minY),
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }));
    setNodes(initialNodes);
  }, []);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const ids = Object.values(CRYPTO_IDS_MAP).join(',');
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        const newPrices = {};
        data.forEach(coin => {
          newPrices[coin.symbol.toUpperCase()] = coin.price_change_percentage_24h;
        });
        setCryptoPrices(newPrices);
        setApiStatus('success');
      } catch (error) {
        console.error("Failed to fetch crypto data:", error);
        setApiStatus('error');
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const symbol = cryptoSymbols[currentSymbolIndex];
    const newPositions = createWordPattern(symbol, 100);
    setTargetPositions(newPositions);

    animationParams.current = {
      noiseStrength: 0.04 + Math.random() * 0.06,
      timeFactor: 0.0008 + Math.random() * 0.0004,
      driftX: (Math.random() - 0.5) * 0.02,
      driftY: (Math.random() - 0.5) * 0.02,
    };

    const formTimer = setTimeout(() => setMode('forming'), 2000);
    const holdTimer = setTimeout(() => setMode('holding'), 6000);
    const disperseTimer = setTimeout(() => setMode('dispersing'), 12000);
    const nextSymbolTimer = setTimeout(() => {
      setCurrentSymbolIndex((prev) => (prev + 1) % cryptoSymbols.length);
    }, 14000);

    return () => {
      clearTimeout(formTimer);
      clearTimeout(holdTimer);
      clearTimeout(disperseTimer);
      clearTimeout(nextSymbolTimer);
    };
  }, [currentSymbolIndex, cryptoSymbols.length]);

  useEffect(() => {
    let frameId;
    const animate = () => {
      setNodes(prevNodes =>
        prevNodes.map((node, idx) => {
          let { x, y, vx, vy } = node;

          if (mode === 'forming') {
            const target = targetPositions[idx % targetPositions.length];
            if (target) {
              vx = (vx * 0.92) + (target.x - x) * 0.07;
              vy = (vy * 0.92) + (target.y - y) * 0.07;
            }
          } else if (mode === 'holding') {
            const target = targetPositions[idx % targetPositions.length];
            if (target) {
              vx = (vx * 0.8) + (target.x - x) * 0.05 + (Math.random() - 0.5) * 0.04;
              vy = (vy * 0.8) + (target.y - y) * 0.05 + (Math.random() - 0.5) * 0.04;
            }
          } else {
            const { noiseStrength, driftX, driftY, timeFactor } = animationParams.current;
            const noiseX = Math.sin(Date.now() * timeFactor + idx) * noiseStrength;
            const noiseY = Math.cos(Date.now() * timeFactor + idx) * noiseStrength;
            vx += noiseX + driftX;
            vy += noiseY + driftY;
            vx *= 0.97;
            vy *= 0.97;
          }

          x += vx;
          y += vy;

          if (x <= bounds.minX || x >= bounds.maxX) { vx *= -0.9; x = Math.max(bounds.minX, Math.min(bounds.maxX, x)); }
          if (y <= bounds.minY || y >= bounds.maxY) { vy *= -0.9; y = Math.max(bounds.minY, Math.min(bounds.maxY, y)); }

          return { ...node, x, y, vx, vy };
        })
      );
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [mode, targetPositions]);

  useEffect(() => {
    if (mode === 'holding') {
      connectionRef.current = [];
      return;
    }
    const updateConnections = () => {
      if (!nodes || nodes.length === 0) return;
      const newConnections = [];
      const currentNodes = nodes;
      for (let i = 0; i < currentNodes.length; i++) {
        let connected = 0;
        for (let j = i + 1; j < currentNodes.length && connected < 3; j++) {
          const dx = currentNodes[i].x - currentNodes[j].x;
          const dy = currentNodes[i].y - currentNodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 20) {
            newConnections.push({
              from: currentNodes[i],
              to: currentNodes[j],
              opacity: 1 - distance / 20,
            });
            connected++;
          }
        }
      }
      connectionRef.current = newConnections;
    };
    
    const interval = setInterval(updateConnections, 100);
    return () => clearInterval(interval);
  }, [nodes, mode]);

  const connections = useMemo(() => connectionRef.current.slice(0, 150), [nodes, mode]);
  const currentSymbol = cryptoSymbols[currentSymbolIndex];
  const changePercent = cryptoPrices[currentSymbol] ?? 0;
  const isPositive = changePercent >= 0;

  return (
    <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="glow-physics">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {connections.map((conn, idx) => (
          <motion.line
            key={`${conn.from.id}-${conn.to.id}-${idx}`}
            x1={conn.from.x} y1={conn.from.y} x2={conn.to.x} y2={conn.to.y}
            stroke="#10b981"
            strokeWidth="0.15"
            initial={{ opacity: 0 }}
            animate={{ opacity: conn.opacity * 0.2 }}
            transition={{ duration: 0.3 }}
          />
        ))}

        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x} cy={node.y}
            r="0.8"
            fill="#22c55e"
            filter="url(#glow-physics)"
            animate={{
              opacity: mode === 'holding' ? 1 : 0.7,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          />
        ))}
      </svg>

      <AnimatePresence>
        {mode === 'holding' && apiStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="absolute bottom-24 right-6 flex flex-col items-end gap-1 text-lg font-bold text-black/90"
          >
            <span className="text-xl">{currentSymbol}</span>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Vip3DCard({ user }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 30;
    const rotateX = -(y / rect.height - 0.5) * 20;
    e.currentTarget.style.setProperty('--rotate-y', `${rotateY}deg`);
    e.currentTarget.style.setProperty('--rotate-x', `${rotateX}deg`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty('--rotate-y', '0deg');
    e.currentTarget.style.setProperty('--rotate-x', '0deg');
  };

  return (
    <motion.div
      className="relative w-full max-w-md h-64 rounded-3xl"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full rounded-3xl shadow-lg overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(var(--rotate-y, 0deg)) rotateX(var(--rotate-x, 0deg))",
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.15) 50%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.95) 100%)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          boxShadow: '0px 20px 40px rgba(34, 197, 94, 0.4)'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <PhysicsNetwork />

        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10" style={{ transform: "translateZ(40px)" }}>
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-black text-nature-green flex items-center gap-2">
              <Leaf />
              GCT
            </h2>
            <div className="text-right">
              <div className="text-lg font-bold text-nature-green flex items-center gap-1">
                <Award className="w-5 h-5 text-gold" />
                VIP MEMBER
              </div>
              <div className="text-xs text-gold font-semibold">Elite Access</div>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="text-left">
              <div className="text-xs text-black/60 font-semibold mb-1">EMAIL</div>
              <div className="text-xs tracking-wide text-black/70 font-mono font-medium backdrop-blur-sm bg-white/40 px-3 py-1.5 rounded-lg border border-nature-green/20">
                {user?.email || "user@gmail.com"}
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              <div className="text-xs text-black/60 font-semibold">MEMBER SINCE</div>
              <div className="font-bold text-lg text-nature-green">2024</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
