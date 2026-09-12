import React from 'react';
import { Award, CheckCircle2, Lock, Sparkles, Volume2 } from 'lucide-react';
import { CORE_ACHIEVEMENTS } from '../data/initialData';
import Jumbo3DViewer from '../components/elephant/Jumbo3DViewer';
import { useElephantFit } from '../context/ElephantFitContext';
import { sounds } from '../audio/soundEffects';

export default function AchievementsPage() {
  const { achievements, unlockAchievement, triggerConfetti, setElephantState } = useElephantFit();

  // Use core achievements requested
  const items = CORE_ACHIEVEMENTS;

  const handleTestUnlock = (item) => {
    sounds.playAuthenticTrumpet();
    triggerConfetti();
    setElephantState('celebrating', 4000);
    unlockAchievement(item.id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-bold mb-1">
          <Award className="w-3.5 h-3.5" />
          <span>Savanna Honors & Badges</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Jumbo’s Achievements
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Unlocking badges triggers authentic elephant celebration trumpet calls and celebratory Jumbo postures.
        </p>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                item.unlocked
                  ? 'bg-white border-stone-200 shadow-sm'
                  : 'bg-stone-50 border-stone-200/70 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2 rounded-2xl bg-stone-100">
                    {item.icon}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                    item.unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'
                  }`}>
                    {item.unlocked ? <CheckCircle2 className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    {item.unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-charcoal">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-forest-700">+{item.xp} Savanna XP</span>

                <button
                  onClick={() => handleTestUnlock(item)}
                  className="text-xs font-bold text-stone-600 hover:text-forest-900 underline"
                >
                  Celebrate 🎺
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
