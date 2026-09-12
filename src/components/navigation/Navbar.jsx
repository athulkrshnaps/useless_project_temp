import React, { useState } from 'react';
import { Volume2, VolumeX, Home, Compass, Dumbbell, BarChart3, Trophy, ChevronDown, RotateCcw } from 'lucide-react';
import { useElephantFit } from '../../context/ElephantFitContext';
import { sounds } from '../../audio/soundEffects';

export default function Navbar() {
  const { 
    elephant, 
    activeTab, 
    setActiveTab, 
    soundMuted, 
    toggleSound,
    resetProfile,
  } = useElephantFit();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'activities', label: 'Activities', icon: Compass },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#16271c]/95 backdrop-blur-md border-b border-[#243d2c] text-white transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo matching mockup */}
          <div 
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-forest-800/80 border border-forest-600/60 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-transform">
              🐘
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white font-sans">
                Elephant<span className="text-emerald-400">Fit</span>
              </span>
            </div>
          </div>

          {/* Center Navigation Links matching mockup */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (activeTab === 'landing' && item.id === 'home');
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-white bg-forest-800/80 border border-emerald-500/40 shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-forest-800/30'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Sound toggle & User Avatar dropdown matching mockup */}
          <div className="flex items-center space-x-3">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all ${
                soundMuted 
                  ? 'bg-forest-900/60 border-forest-800 text-stone-500' 
                  : 'bg-forest-800/80 border-forest-600 text-emerald-400 shadow-sm'
              }`}
              title={soundMuted ? "Audio muted" : "Audio on"}
            >
              {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
            </button>

            {/* Jumbo Profile Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 pr-2.5 rounded-full bg-forest-800/70 hover:bg-forest-700/80 border border-forest-600/60 transition-all text-left"
              >
                <img
                  src="/jumbo-avatar.jpg"
                  alt="Jumbo"
                  className="w-7 h-7 rounded-full object-cover border border-emerald-400/60"
                />
                <span className="text-xs font-bold text-stone-100 hidden sm:inline">{elephant.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#18291e] border border-forest-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 text-xs">
                  <div className="p-2 border-b border-forest-800 text-stone-300 mb-1">
                    <span className="font-extrabold text-white block">{elephant.name}</span>
                    <span className="text-[10px] text-stone-400">{elephant.age} yrs • {elephant.weight?.toLocaleString()} kg</span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('progress');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-xl text-stone-200 hover:bg-forest-800/60 hover:text-white flex items-center gap-2"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Progress</span>
                  </button>
                  <button
                    onClick={() => {
                      sounds.playAuthenticTrumpet();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-xl text-stone-200 hover:bg-forest-800/60 hover:text-white flex items-center gap-2"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Trumpet Call</span>
                  </button>

                  {/* Divider */}
                  <div className="border-t border-forest-800/70 my-1.5" />

                  {/* Reset / New Elephant */}
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      const confirmed = window.confirm(
                        '🐘 Start fresh with a new elephant?\n\nThis will permanently reset all stats, steps, achievements, and goals back to default.\n\nPress OK to confirm.'
                      );
                      if (confirmed) {
                        resetProfile();
                      }
                    }}
                    className="w-full text-left p-2 rounded-xl text-red-300 hover:bg-red-900/30 hover:text-red-200 flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-red-400" />
                    <span>New Elephant / Reset All</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-forest-800/60 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (activeTab === 'landing' && item.id === 'home');
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-1 px-2 rounded-lg ${
                  isActive ? 'text-emerald-400 font-bold' : 'text-stone-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
