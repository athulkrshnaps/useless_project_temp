import React from 'react';
import { Activity, Compass, Dumbbell, Apple, Trophy } from 'lucide-react';
import { useElephantFit } from '../../context/ElephantFitContext';

export default function MobileNav() {
  const { activeTab, setActiveTab } = useElephantFit();

  const mobileTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'activity', label: 'Trail', icon: Compass },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'leaderboard', label: 'Ranks', icon: Trophy },
  ];

  return (
    <nav className="xl:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200 py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-forest-800 scale-105' : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] mt-1 font-semibold ${isActive ? 'text-forest-900 font-bold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
