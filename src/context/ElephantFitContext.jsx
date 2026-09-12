import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_ELEPHANT, 
  INITIAL_LEADERBOARD, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_GOALS 
} from '../data/initialData';
import { sounds } from '../audio/soundEffects';

const ElephantFitContext = createContext(null);

export function ElephantFitProvider({ children }) {
  const [elephant, setElephant] = useState(() => {
    try {
      const saved = localStorage.getItem('elephantfit_profile');
      return saved ? JSON.parse(saved) : INITIAL_ELEPHANT;
    } catch {
      return INITIAL_ELEPHANT;
    }
  });

  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);
  const [achievements, setAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('elephantfit_achievements');
      return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem('elephantfit_goals');
      return saved ? JSON.parse(saved) : INITIAL_GOALS;
    } catch {
      return INITIAL_GOALS;
    }
  });

  const [activeTab, setActiveTab] = useState('home');
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [soundMuted, setSoundMuted] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [toast, setToast] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('elephantfit_profile', JSON.stringify(elephant));
  }, [elephant]);

  useEffect(() => {
    localStorage.setItem('elephantfit_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('elephantfit_goals', JSON.stringify(goals));
  }, [goals]);

  const showToast = (title, message, icon = '🐘') => {
    setToast({ title, message, icon });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const triggerConfetti = () => {
    setConfettiTrigger(prev => prev + 1);
  };

  const toggleSound = () => {
    const isMuted = sounds.toggleMute();
    setSoundMuted(isMuted);
    if (!isMuted) {
      sounds.playChime();
    }
  };

  const setElephantState = (state, durationMs = null) => {
    setElephant(prev => ({ ...prev, currentState: state }));
    if (durationMs) {
      setTimeout(() => {
        setElephant(prev => ({ ...prev, currentState: 'idle' }));
      }, durationMs);
    }
  };

  // Add / Increment steps
  const addSteps = (delta) => {
    sounds.playStomp();
    setElephant(prev => {
      const newSteps = Math.max(0, prev.currentSteps + delta);
      const stepDiff = newSteps - prev.currentSteps;
      const additionalCalories = Math.round(stepDiff * 0.135); // ~135 kcal per 1,000 elephant steps
      const newCalories = prev.caloriesBurned + additionalCalories;
      
      // Calculate dynamic score
      let newScore = Math.min(100, Math.round((newSteps / prev.dailyStepGoal) * 60 + (newCalories / prev.targetCalories) * 40));

      let newState = 'walking';

      // Check if 20,000 steps reached!
      if (newSteps >= prev.dailyStepGoal && prev.currentSteps < prev.dailyStepGoal) {
        triggerConfetti();
        sounds.playTrumpet();
        showToast(
          "Milestone Achieved: 20,000 Steps!", 
          "Your elephant has officially touched grass. Savanna glory unlocked!",
          "🏆"
        );
        unlockAchievement('long_walk');
        newState = 'celebrating';
      }

      return {
        ...prev,
        currentSteps: newSteps,
        caloriesBurned: newCalories,
        fitnessScore: newScore,
        currentState: newState
      };
    });

    // Reset back to idle after walking duration if not celebrating
    setTimeout(() => {
      setElephant(prev => {
        if (prev.currentState === 'walking') {
          return { ...prev, currentState: 'idle' };
        }
        return prev;
      });
    }, 2800);
  };

  // Feed elephant
  const feedElephant = (food) => {
    sounds.playCrunch();
    
    setElephant(prev => {
      let newPeanutPercent = prev.peanutMeterPercent + food.peanutRating;
      newPeanutPercent = Math.max(5, Math.min(100, newPeanutPercent));

      let newPeanutKg = prev.peanutConsumptionKg;
      if (food.id === 'peanuts') {
        newPeanutKg = Number((newPeanutKg + 0.5).toFixed(2));
      }

      let newState = 'eating';

      if (newPeanutPercent >= 90) {
        newState = 'peanut_overload';
        sounds.playWarning();
        showToast(
          "CRITICAL PEANUT OVERLOAD!",
          "Put the peanut bucket down! Your elephant is wobbling under the gravity of salted legumes.",
          "🥜"
        );
      } else if (food.id === 'peanuts') {
        showToast(
          "Peanuts Consumed!",
          "Irresistible crunch, but Coach Trompo is raising a stern eyebrow.",
          "🥜"
        );
      } else {
        showToast(
          `${food.name} Enjoyed!`,
          `Wholesome nourishment! Peanut meter dropped to ${newPeanutPercent}%.`,
          food.icon
        );
      }

      return {
        ...prev,
        peanutMeterPercent: newPeanutPercent,
        peanutConsumptionKg: newPeanutKg,
        currentState: newState
      };
    });

    setTimeout(() => {
      setElephant(prev => {
        if (prev.currentState === 'eating') {
          return { ...prev, currentState: 'idle' };
        }
        return prev;
      });
    }, 3200);
  };

  // Workout completions
  const finishWorkout = (workout, calories) => {
    sounds.playTrumpet();
    triggerConfetti();

    setElephant(prev => {
      const newCalories = prev.caloriesBurned + calories;
      const newScore = Math.min(100, prev.fitnessScore + 8);
      return {
        ...prev,
        caloriesBurned: newCalories,
        fitnessScore: newScore,
        currentState: 'celebrating'
      };
    });

    if (workout.id === 'mud_pool') {
      unlockAchievement('mud_master');
    }
    if (workout.category === 'Trunk Strength') {
      unlockAchievement('trunk_power');
    }

    showToast(
      "Workout Completed!",
      `Your legs have filed a complaint. But you survived! +${calories} kcal burned.`,
      "💪"
    );

    setActiveWorkout(null);

    setTimeout(() => {
      setElephant(prev => ({ ...prev, currentState: 'happy' }));
    }, 3500);
  };

  const unlockAchievement = (id) => {
    setAchievements(prev => {
      const found = prev.find(a => a.id === id);
      if (found && !found.unlocked) {
        sounds.playCelebration();
        triggerConfetti();
        showToast(
          `Achievement Unlocked: ${found.title}`,
          found.description,
          found.icon
        );
        return prev.map(a => a.id === id ? { ...a, unlocked: true } : a);
      }
      return prev;
    });
  };

  const completeGoal = (goalId) => {
    sounds.playCelebration();
    triggerConfetti();
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        showToast(
          "Goal Accomplished!",
          `Bravo! "${g.title}" marked as complete!`,
          "🌟"
        );
        return { ...g, completed: true, current: g.target };
      }
      return g;
    }));
    setElephant(prev => ({
      ...prev,
      fitnessScore: Math.min(100, prev.fitnessScore + 5),
      currentState: 'celebrating'
    }));
    setTimeout(() => {
      setElephant(prev => ({ ...prev, currentState: 'idle' }));
    }, 3000);
  };

  const recordWeight = (weightKg) => {
    sounds.playChime();
    const formatted = `${weightKg.toLocaleString()} kg`;
    setElephant(prev => {
      const updatedHistory = [
        ...prev.weightHistory,
        { date: `Entry ${prev.weightHistory.length + 1}`, weight: weightKg, label: formatted }
      ];
      return {
        ...prev,
        weight: weightKg,
        weightHistory: updatedHistory,
        currentState: 'happy'
      };
    });
    showToast(
      "Weight Entry Logged!",
      "Yes, that number looks enormous. You're an elephant. Keep stepping!",
      "⚖️"
    );
  };

  const updateProfile = (profileData) => {
    setElephant(prev => ({
      ...prev,
      ...profileData
    }));
    sounds.playChime();
    showToast("Profile Updated", "Biometric data updated for the savanna database.", "✅");
  };

  // Reset ALL data — wipes localStorage and reloads fresh for a new elephant
  const resetProfile = () => {
    localStorage.removeItem('elephantfit_profile');
    localStorage.removeItem('elephantfit_achievements');
    localStorage.removeItem('elephantfit_goals');
    window.location.reload();
  };

  return (
    <ElephantFitContext.Provider
      value={{
        elephant,
        setElephant,
        leaderboard,
        achievements,
        goals,
        activeTab,
        setActiveTab,
        activeWorkout,
        setActiveWorkout,
        soundMuted,
        toggleSound,
        confettiTrigger,
        triggerConfetti,
        toast,
        showToast,
        setElephantState,
        addSteps,
        feedElephant,
        finishWorkout,
        unlockAchievement,
        completeGoal,
        recordWeight,
        updateProfile,
        resetProfile,
      }}
    >
      {children}
    </ElephantFitContext.Provider>
  );
}

export function useElephantFit() {
  const context = useContext(ElephantFitContext);
  if (!context) {
    throw new Error('useElephantFit must be used within ElephantFitProvider');
  }
  return context;
}
