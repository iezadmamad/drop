"use client";

import { createContext, useContext, useState } from 'react';
import { config } from '@/lib/config';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Javi",
    gctBalance: 0,
    voltage: 0,
    hasGreenCart: false,
    completedTasks: [],
    referrals: [],
    dailyVoltageGenerated: 0,
  });

  const [floatingRewards, setFloatingRewards] = useState([]);

  const completeTask = (taskId) => {
    if (user.completedTasks.includes(taskId)) return;
    const task = config.tasks.find(t => t.id === taskId);
    if (!task) return;
    setUser(prev => ({
      ...prev,
      gctBalance: prev.gctBalance + task.reward,
      completedTasks: [...prev.completedTasks, taskId],
    }));
    showFloatingReward(`+${task.reward} ${config.tokenSymbol}`);
  };

  const addVoltage = (amount) => {
    const multiplier = user.hasGreenCart ? config.greenCart.voltageMultiplier : 1;
    const voltageToAdd = amount * multiplier;
    if (user.dailyVoltageGenerated >= config.game.maxDailyVoltage) return false;
    const newDailyVoltage = Math.min(user.dailyVoltageGenerated + voltageToAdd, config.game.maxDailyVoltage);
    const actualVoltage = newDailyVoltage - user.dailyVoltageGenerated;
    setUser(prev => ({
      ...prev,
      voltage: prev.voltage + actualVoltage,
      dailyVoltageGenerated: newDailyVoltage,
    }));
    return true;
  };

  const convertVoltageToGCT = () => {
    const gctAmount = user.voltage * config.rewards.voltageToGCT;
    setUser(prev => ({ ...prev, gctBalance: prev.gctBalance + gctAmount, voltage: 0 }));
    showFloatingReward(`+${gctAmount.toFixed(2)} ${config.tokenSymbol}`);
  };

  const purchaseGreenCart = () => {
    setUser(prev => ({
      ...prev,
      hasGreenCart: true,
      gctBalance: prev.gctBalance + config.greenCart.pointsBonus,
    }));
    showFloatingReward(`Green Cart Activated! +${config.greenCart.pointsBonus} ${config.tokenSymbol}`);
  };

  const showFloatingReward = (text) => {
    const id = Date.now();
    setFloatingRewards(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setFloatingRewards(prev => prev.filter(r => r.id !== id));
    }, 2000);
  };

  return (
    <UserContext.Provider value={{
      user,
      completeTask,
      addVoltage,
      convertVoltageToGCT,
      purchaseGreenCart,
      floatingRewards,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}
