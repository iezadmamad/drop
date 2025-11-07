"use client";

export default function BackgroundLines() {
  const lines = [...Array(8)].map((_, i) => ({
    id: i,
    left: `${10 + i * 12}%`,
    duration: 25 + Math.random() * 15,
    delay: Math.random() * 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
      {lines.map((line) => (
        <div
          key={line.id}
          className="absolute w-px h-[200vh] bg-gradient-to-b from-transparent via-gold to-transparent bg-line"
          style={{
            left: line.left,
            '--duration': `${line.duration}s`,
            animationDelay: `${line.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
