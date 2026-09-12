import React, { useState, useEffect } from 'react';
import { 
  Footprints, 
  MapPin, 
  Flag, 
  Flame, 
  Clock, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw,
  Trophy,
  CheckCircle2,
  TreePine
} from 'lucide-react';
import ElephantVisualizer from '../components/elephant/ElephantVisualizer';
import CoachTrompo from '../components/coach/CoachTrompo';
import { useElephantFit } from '../context/ElephantFitContext';
import { sounds } from '../audio/soundEffects';

export default function ActivityPage() {
  const { 
    elephant, 
    addSteps, 
    setElephantState, 
    triggerConfetti 
  } = useElephantFit();

  const [isSimulatingWalk, setIsSimulatingWalk] = useState(false);

  const goal = elephant.dailyStepGoal || 20000;
  const steps = elephant.currentSteps;
  const progressPercent = Math.min(100, Math.round((steps / goal) * 100));
  const distanceKm = (steps * 0.0008).toFixed(1); // Elephant stride ~0.8 meters
  const isGoalReached = steps >= goal;

  // Simulator loop
  useEffect(() => {
    let interval = null;
    if (isSimulatingWalk) {
      interval = setInterval(() => {
        addSteps(120);
      }, 700);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulatingWalk, addSteps]);

  // Trail milestone markers
  const milestones = [
    { step: 0, label: 'Baobab Gate', icon: '🌳', percent: 0 },
    { step: 5000, label: '5k Creek', icon: '💧', percent: 25 },
    { step: 10000, label: '10k Acacia Grove', icon: '🌿', percent: 50 },
    { step: 15000, label: '15k Rocky Ridge', icon: '⛰️', percent: 75 },
    { step: 20000, label: '20k Grassland Finish', icon: '🏁', percent: 100 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold mb-2">
            <TreePine className="w-3.5 h-3.5" />
            <span>Savanna Trail Expedition</span>
          </div>
          <h1 className="text-3xl font-extrabold text-forest-950 tracking-tight">
            Daily Activity & Forest Trail
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Watch your elephant physically march forward across the savanna path toward the 20,000 steps milestone.
          </p>
        </div>

        {/* Live Walk Simulation Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const next = !isSimulatingWalk;
              setIsSimulatingWalk(next);
              if (next) sounds.playChime();
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all ${
              isSimulatingWalk 
                ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse' 
                : 'bg-forest-800 hover:bg-forest-900 text-white'
            }`}
          >
            {isSimulatingWalk ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isSimulatingWalk ? 'Pause Live Stride' : 'Simulate Live Stride'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Today's Steps</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-charcoal">{steps.toLocaleString()}</span>
            <span className="text-xs text-stone-400 font-bold">/ 20,000</span>
          </div>
          <p className="text-xs text-forest-700 font-semibold mt-1">{progressPercent}% of target</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Distance Traveled</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-charcoal">{distanceKm}</span>
            <span className="text-xs text-stone-400 font-bold">km</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">Cross-savanna trek</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Active Burn</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">{elephant.caloriesBurned.toLocaleString()}</span>
            <span className="text-xs text-stone-400 font-bold">kcal</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">~135 kcal per 1,000 steps</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Trail Status</span>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-xl">{isGoalReached ? '🏆' : '🐾'}</span>
            <span className="text-base font-extrabold text-charcoal">
              {isGoalReached ? 'Touched Grass!' : 'En Route'}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {isGoalReached ? 'Finish line conquered!' : `${(goal - steps > 0 ? (goal - steps).toLocaleString() : 0)} steps to go`}
          </p>
        </div>
      </div>

      {/* --- THE GRAND FOREST TRAIL VISUALIZATION --- */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6 overflow-hidden relative">
        
        {/* Grass Touch Milestone Banner (If Reached) */}
        {isGoalReached && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-forest-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg animate-in zoom-in-95 duration-500">
            <div className="flex items-center space-x-3.5 text-center sm:text-left">
              <span className="text-4xl animate-bounce">🏆</span>
              <div>
                <h3 className="text-lg font-extrabold">Your elephant has officially touched grass!</h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Full 20,000 steps completed. Maximum savanna glory unlocked. Trompo is crying tears of pride.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                triggerConfetti();
                sounds.playTrumpet();
              }}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-charcoal rounded-xl text-xs font-extrabold shadow transition-all"
            >
              Trumpet Celebration 🎺
            </button>
          </div>
        )}

        {/* Trail Viewport */}
        <div className="relative w-full h-[420px] rounded-2xl bg-gradient-to-b from-[#e3efe7] via-[#f7f2e5] to-[#decdae] border-2 border-stone-300 overflow-hidden shadow-inner">
          
          {/* Sky elements & distant savanna ridge */}
          <div className="absolute top-4 left-10 text-stone-300 text-2xl opacity-40">☁️</div>
          <div className="absolute top-8 right-24 text-stone-300 text-3xl opacity-30">☁️</div>

          <svg className="absolute bottom-28 w-full h-40 text-[#cbdbc0]/60" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <path d="M0,120 Q250,50 500,100 T1000,70 L1000,200 L0,200 Z" fill="currentColor" />
          </svg>

          {/* Milestone Flags & Landmarks Along Trail */}
          <div className="absolute bottom-24 inset-x-8 flex justify-between items-end z-10 pointer-events-none">
            {milestones.map((m) => {
              const reached = progressPercent >= m.percent;
              return (
                <div key={m.step} className="flex flex-col items-center group pointer-events-auto">
                  <div className={`p-2 rounded-xl text-sm transition-all ${
                    reached 
                      ? 'bg-white shadow-md text-forest-800 scale-110 border-2 border-forest-600' 
                      : 'bg-stone-200/70 text-stone-400 border border-stone-300'
                  }`}>
                    {m.icon}
                  </div>
                  <span className={`text-[10px] font-bold mt-1.5 px-2 py-0.5 rounded-full ${
                    reached ? 'bg-forest-800 text-white' : 'bg-stone-200 text-stone-500'
                  }`}>
                    {m.label}
                  </span>
                  <span className="text-[9px] text-stone-400 font-semibold">{m.step.toLocaleString()}</span>
                </div>
              );
            })}
          </div>

          {/* Dirt Trekking Trail Road */}
          <div className="absolute bottom-0 inset-x-0 h-28 bg-[#c2a983] border-t-4 border-[#9f855d]">
            {/* Trail center dashed lane */}
            <div className="absolute top-1/2 inset-x-0 border-b-2 border-dashed border-[#ddcbb1]/60" />
            <div className="absolute bottom-2 left-6 text-stone-600/40 text-xs">🌿🌾</div>
            <div className="absolute bottom-2 right-12 text-stone-600/40 text-xs">🌾🌿</div>
          </div>

          {/* THE ELEPHANT MOVING PHYSICALLY ALONG THE TRAIL */}
          {/* Position scales dynamically from 2% to 76% based on progressPercent */}
          <div 
            className="absolute bottom-12 z-20 transition-all duration-700 ease-out pointer-events-none"
            style={{ 
              left: `${Math.min(76, Math.max(2, (progressPercent * 0.74) + 2))}%`,
              transform: 'translateX(-20%)'
            }}
          >
            {/* Elephant Character */}
            <ElephantVisualizer
              state={isGoalReached ? 'celebrating' : (isSimulatingWalk || elephant.currentState === 'walking' ? 'walking' : 'idle')}
              accessory="headband"
              size="medium"
              showShadow={true}
            />

            {/* Floating Step Tracker Speech Bubble over Elephant */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1.5 animate-float">
              <span>🐘</span>
              <span>{steps.toLocaleString()} steps</span>
            </div>
          </div>

        </div>

        {/* Trail Controls & Quick Steppers */}
        <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-stone-400 mr-1">Add Stride:</span>
            
            <button
              onClick={() => addSteps(500)}
              className="px-3 py-2 bg-stone-100 hover:bg-forest-100 hover:text-forest-800 text-stone-700 rounded-xl text-xs font-bold border border-stone-200 transition-all"
            >
              +500 Steps (Short Stroll)
            </button>

            <button
              onClick={() => addSteps(1568)}
              className="px-3.5 py-2 bg-forest-800 hover:bg-forest-900 active:scale-95 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              +1,568 Steps (Reach 20k Finish!)
            </button>

            <button
              onClick={() => addSteps(5000)}
              className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold border border-amber-300 transition-all"
            >
              +5,000 Steps (Savanna March)
            </button>
          </div>

          <button
            onClick={() => {
              sounds.playChime();
              addSteps(-steps + 5000); // Reset to 5,000
            }}
            className="text-xs text-stone-400 hover:text-stone-600 font-semibold flex items-center gap-1 self-end sm:self-center"
            title="Reset to 5,000 steps for demo replay"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Trail to 5k</span>
          </button>
        </div>

      </div>

      {/* Coach Advice & Megafauna Walking Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <CoachTrompo context="steps" />
        </div>

        <div className="lg:col-span-5 p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
          <h4 className="font-extrabold text-charcoal text-sm flex items-center gap-2">
            <span>🌿</span>
            <span>Why 20,000 Steps for Elephants?</span>
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Wild African elephants trek between 15 and 30 kilometers daily in search of waterholes and acacia bark. In modern sanctuary and reserve environments, keeping that cadence maintains cardiovascular stamina, strengthens knee cartilage, and ensures natural digestive motility.
          </p>
          <div className="p-2.5 rounded-xl bg-savanna-50 border border-savanna-200 text-[11px] text-stone-700 italic">
            “No step is wasted when you are carrying 5 metric tons of pure grace.”
          </div>
        </div>
      </div>

    </div>
  );
}
