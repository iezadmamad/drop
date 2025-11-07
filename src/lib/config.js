export const config = {
  projectName: "Green Candle",
  tokenSymbol: "GCT",
  tagline: "Powering Nature's Future",
  description: "Join the revolution of sustainable energy and earn rewards",
  airdrop: {
    totalSupply: 1000000,
    durationDays: 30,
  },
  socialLinks: {
    twitter: "https://twitter.com/greencandle",
    telegram: "https://t.me/greencandle",
    instagram: "https://instagram.com/greencandle",
    discord: "https://discord.gg/greencandle",
  },
  rewards: {
    socialTask: 100,
    referral: 500,
    dailyGame: 200,
    voltageToGCT: 0.1,
  },
  greenCart: {
    priceUSD: 10.99,
    pointsBonus: 5000,
    voltageMultiplier: 2.0,
  },
  game: {
    maxDailyVoltage: 1000,
    windHeightChangeInterval: 14400,
  },
  tasks: [
    { id: 1, name: "Follow on Twitter", platform: "twitter", reward: 100, icon: "Twitter", color: "#1DA1F2", link: "https://twitter.com/greencandle" },
    { id: 2, name: "Join Telegram", platform: "telegram", reward: 100, icon: "Send", color: "#0088cc", link: "https://t.me/greencandle" },
    { id: 3, name: "Follow Instagram", platform: "instagram", reward: 100, icon: "Instagram", color: "#E4405F", link: "https://instagram.com/greencandle" },
    { id: 4, name: "Join Discord", platform: "discord", reward: 150, icon: "MessageSquare", color: "#5865F2", link: "https://discord.gg/greencandle" },
  ],
};
