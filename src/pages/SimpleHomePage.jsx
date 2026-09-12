import React, { useState } from 'react';
import { 
  Footprints, 
  Dumbbell, 
  Sparkles, 
  Play, 
  Trophy, 
  Scale, 
  Flame, 
  Apple, 
  CheckCircle2, 
  Volume2, 
  Eye, 
  Compass,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import ElephantVisualizer from '../components/elephant/ElephantVisualizer';
import PeanutMeter from '../components/elephant/PeanutMeter';
import CoachTrompo from '../components/coach/CoachTrompo';
import { useElephantFit } from '../context/ElephantFitContext';
import { sounds } from '../audio/soundEffects';

export default function SimpleHomePage() {
  const { 
    elephant, 
    addSteps, 
    feedElephant, 
    setElephantState, 
    triggerConfetti, 
    leaderboard,
    activeWorkout,
    setActiveWorkout,
    finishWorkout
  } = useElephantFit();

  // Mode toggle: 'animated' (interactive SVG character matching photo) vs 'photo' (actual reference photo)
  const [viewMode, setViewMode] = useState('animated');
  const [isSimulatingWalk, setIsSimulatingWalk] = useState(false);

  // Quick Action handler
  const handleAction = (stateName, soundType = 'chime') => {
    setElephantState(stateName);
    if (soundType === 'trumpet') sounds.playTrumpet();
    else if (soundType === 'stomp') sounds.playStomp();
    else if (soundType === 'warning') sounds.playWarning();
    else sounds.playChime();
  };

  // Trail progress
  const stepGoal = 20000;
  const progressPercent = Math.min(100, Math.round((elephant.currentSteps / stepGoal) * 100));
  const isGoalReached = elephant.currentSteps >= stepGoal;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
      
      {/* --- HERO & LIVE ELEPHANT COMPANION SECTION --- */}
      <section id="companion" className="space-y-6 text-center">
        
        {/* Brand Taglines */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-forest-100 border border-forest-300/60 text-forest-800 text-xs font-extrabold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-forest-600" />
            <span>Helping elephants become lighter… one peanut at a time</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-forest-950">
            Fitness, Reimagined for the World’s <span className="text-forest-600 underline decoration-amber-400 decoration-wavy">Biggest</span> Athletes.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
            A smarter way for elephants to track their weight, improve their fitness, and finally think twice before ordering another bucket of peanuts.
          </p>
        </div>

        {/* --- MAIN ELEPHANT STAGE --- */}
        <div className="relative max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-[#e3efe6] via-[#f7f3e8] to-[#d6e3cd] border-2 border-stone-300 p-6 sm:p-8 shadow-xl overflow-hidden">
          
          {/* View Mode Switcher (Animated Character vs Reference Photo) */}
          <div className="absolute top-4 right-4 z-20 flex items-center bg-white/90 backdrop-blur-md p-1 rounded-xl border border-stone-200 shadow-sm text-xs font-bold">
            <button
              onClick={() => setViewMode('animated')}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === 'animated' ? 'bg-forest-800 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Animated Elephant
            </button>
            <button
              onClick={() => setViewMode('photo')}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === 'photo' ? 'bg-forest-800 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Photo Match 📸
            </button>
          </div>

          {/* Elephant Display Viewport */}
          <div className="h-80 sm:h-96 w-full flex items-center justify-center relative">
            {viewMode === 'animated' ? (
              <ElephantVisualizer
                state={elephant.currentState}
                accessory={elephant.accessory || 'none'}
                size="large"
                showGrass={true}
              />
            ) : (
              // Photo Mode displaying the user-uploaded image with ambient natural animation
              <div className="relative h-full w-full flex items-center justify-center">
                <img
                  src="/hero-elephant.jpg"
                  alt="Majestic Asian Elephant in tall savanna grass"
                  className="h-full w-full object-cover rounded-2xl shadow-md"
                />
                {/* Overlay speech badge */}
                <div className="absolute bottom-4 left-4 bg-charcoal/85 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-2">
                  <span>🐘</span>
                  <span>Jumbo (24 yrs, Bull • 5,200 kg)</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Elephant Action Bar */}
          <div className="mt-4 pt-4 border-t border-stone-300/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600 px-1">
              <span>Interactive Controls (Watch elephant participate):</span>
              <span className="text-forest-700 capitalize">State: {elephant.currentState.replace('_', ' ')}</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              <button
                onClick={() => {
                  addSteps(1000);
                  handleAction('walking', 'stomp');
                }}
                className="p-2.5 rounded-xl bg-white hover:bg-forest-50 border border-stone-200 text-xs font-bold text-charcoal shadow-sm transition-all flex flex-col items-center gap-1 active:scale-95"
              >
                <span className="text-lg">🐾</span>
                <span>+1k Steps</span>
              </button>

              <button
                onClick={() => handleAction('trunk_curls', 'chime')}
                className="p-2.5 rounded-xl bg-white hover:bg-forest-50 border border-stone-200 text-xs font-bold text-charcoal shadow-sm transition-all flex flex-col items-center gap-1 active:scale-95"
              >
                <span className="text-lg">🪵</span>
                <span>Trunk Lift</span>
              </button>

              <button
                onClick={() => handleAction('squats', 'chime')}
                className="p-2.5 rounded-xl bg-white hover:bg-forest-50 border border-stone-200 text-xs font-bold text-charcoal shadow-sm transition-all flex flex-col items-center gap-1 active:scale-95"
              >
                <span className="text-lg">🏋️</span>
                <span>Squats</span>
              </button>

              <button
                onClick={() => feedElephant({ id: 'grass', name: 'Fresh Grass', icon: '🌿', peanutRating: -10 })}
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-900 shadow-sm transition-all flex flex-col items-center gap-1 active:scale-95"
              >
                <span className="text-lg">🌿</span>
                <span>Eat Grass</span>
              </button>

              <button
                onClick={() => feedElephant({ id: 'peanuts', name: 'Peanuts', icon: '🥜', peanutRating: 25 })}
                className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-bold text-red-900 shadow-sm transition-all flex flex-col items-center gap-1 active:scale-95"
              >
                <span className="text-lg">🥜</span>
                <span>Eat Peanuts</span>
              </button>

              <button
                onClick={() => {
                  triggerConfetti();
                  handleAction('celebrating', 'trumpet');
                }}
                className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-xs font-extrabold text-amber-900 shadow-sm transition-all flex flex-col items-center gap-1 active:scale-95"
              >
                <span className="text-lg">🎺</span>
                <span>Celebrate</span>
              </button>
            </div>
          </div>

        </div>

        {/* 4 Clean Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase text-stone-400">Today's Steps</span>
            <div className="text-2xl font-extrabold text-charcoal mt-1">
              {elephant.currentSteps.toLocaleString()}
            </div>
            <p className="text-xs text-forest-700 font-semibold">{progressPercent}% of 20k target</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase text-stone-400">Current Weight</span>
            <div className="text-2xl font-extrabold text-charcoal mt-1">
              {elephant.weight.toLocaleString()} kg
            </div>
            <p className="text-xs text-stone-500">-200 kg from Day 1</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase text-stone-400">Fitness Score</span>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">
              {elephant.fitnessScore} / 100
            </div>
            <p className="text-xs text-stone-500">Active Elephant</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase text-stone-400">Peanut Meter</span>
            <div className="text-2xl font-extrabold text-charcoal mt-1">
              {elephant.peanutMeterPercent}%
            </div>
            <p className="text-xs text-stone-500">{elephant.peanutConsumptionKg} kg consumed</p>
          </div>
        </div>

      </section>

      {/* --- FOREST TRAIL & 20,000 STEP JOURNEY --- */}
      <section id="trail" className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-forest-100 text-forest-800 text-lg">🌾</span>
              <h2 className="text-2xl font-extrabold text-forest-950">Daily Savanna Trail</h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Watch your elephant physically stride forward across the dirt path towards 20,000 steps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const next = !isSimulatingWalk;
                setIsSimulatingWalk(next);
                if (next) sounds.playChime();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isSimulatingWalk ? 'bg-amber-500 text-white animate-pulse' : 'bg-forest-800 text-white hover:bg-forest-900'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>{isSimulatingWalk ? 'Pause Walking' : 'Simulate Walk'}</span>
            </button>

            <button
              onClick={() => addSteps(1568)}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-charcoal text-xs font-extrabold rounded-xl shadow-sm transition-all"
            >
              Reach 20k Finish! 🏁
            </button>
          </div>
        </div>

        {/* Milestone Celebration Banner */}
        {isGoalReached && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-forest-700 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base">Your elephant has officially touched grass!</h4>
                <p className="text-xs text-emerald-100">Full 20,000 steps reached. Savanna championship status unlocked.</p>
              </div>
            </div>
            <button
              onClick={() => {
                triggerConfetti();
                sounds.playTrumpet();
              }}
              className="px-3.5 py-1.5 bg-amber-400 text-charcoal font-bold text-xs rounded-xl shadow"
            >
              Trumpet 🎺
            </button>
          </div>
        )}

        {/* Visual Path Waypoints */}
        <div className="relative w-full h-40 bg-gradient-to-b from-[#e3efe7] via-[#f7f2e5] to-[#cbb898] rounded-2xl border border-stone-300 overflow-hidden shadow-inner flex items-end px-6 pb-4">
          
          {/* Trail milestones */}
          <div className="absolute top-3 inset-x-6 flex justify-between text-[11px] font-bold text-stone-500">
            <span>Baobab (0k)</span>
            <span>Creek (5k)</span>
            <span>Acacia (10k)</span>
            <span>Ridge (15k)</span>
            <span className="text-forest-900">Finish (20k) 🏁</span>
          </div>

          {/* Dirt road */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-[#bda47e] border-t-2 border-[#9b825c]" />

          {/* Walking Elephant Indicator */}
          <div
            className="absolute bottom-2 transition-all duration-700 ease-out"
            style={{ left: `${Math.min(84, Math.max(2, (progressPercent * 0.82) + 2))}%`, transform: 'translateX(-20%)' }}
          >
            <div className="flex flex-col items-center">
              <span className="bg-charcoal text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow mb-1 animate-float">
                🐘 {elephant.currentSteps.toLocaleString()} steps
              </span>
              <span className="text-3xl">🐘</span>
            </div>
          </div>

        </div>

      </section>

      {/* --- WORKOUTS & PEANUT METER --- */}
      <section id="workouts" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Cols: Quick Workouts */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800 text-lg">💪</span>
              <h3 className="text-xl font-extrabold text-forest-950">Quick Megafauna Workouts</h3>
            </div>
            <span className="text-xs text-stone-500 font-semibold">1-Click Sessions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Workout 1: Trunk Curls */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-forest-400 transition-all flex flex-col justify-between">
              <div>
                <span className="text-2xl">🪵</span>
                <h4 className="font-bold text-sm text-charcoal mt-2">Log Trunk Curls</h4>
                <p className="text-[11px] text-stone-500 mt-1">Lift 150 kg acacia log with trunk torque.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600">+380 kcal</span>
                <button
                  onClick={() => {
                    handleAction('trunk_curls', 'chime');
                    finishWorkout({ id: 'trunk_curls', name: 'Log Trunk Curls', category: 'Trunk Strength' }, 380);
                  }}
                  className="px-3 py-1.5 bg-forest-800 hover:bg-forest-900 text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  Start
                </button>
              </div>
            </div>

            {/* Workout 2: Elephant Squats */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-forest-400 transition-all flex flex-col justify-between">
              <div>
                <span className="text-2xl">🏋️</span>
                <h4 className="font-bold text-sm text-charcoal mt-2">5-Ton Squats</h4>
                <p className="text-[11px] text-stone-500 mt-1">Monumental joint flexion supporting 5,200 kg.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600">+620 kcal</span>
                <button
                  onClick={() => {
                    handleAction('squats', 'chime');
                    finishWorkout({ id: 'elephant_squats', name: '5-Ton Squats', category: 'Full Body' }, 620);
                  }}
                  className="px-3 py-1.5 bg-forest-800 hover:bg-forest-900 text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  Start
                </button>
              </div>
            </div>

            {/* Workout 3: Mud Soak */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-forest-400 transition-all flex flex-col justify-between">
              <div>
                <span className="text-2xl">🛁</span>
                <h4 className="font-bold text-sm text-charcoal mt-2">Mud Recovery</h4>
                <p className="text-[11px] text-stone-500 mt-1">Therapeutic mineral clay dermatological soak.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600">+90 kcal</span>
                <button
                  onClick={() => {
                    handleAction('mud_pool', 'chime');
                    finishWorkout({ id: 'mud_pool', name: 'Mud Recovery', category: 'Full Body' }, 90);
                  }}
                  className="px-3 py-1.5 bg-forest-800 hover:bg-forest-900 text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  Start
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right 5 Cols: Peanut Meter */}
        <div className="lg:col-span-5 space-y-4">
          <PeanutMeter
            percentage={elephant.peanutMeterPercent}
            peanutKg={elephant.peanutConsumptionKg}
            onFeedGrass={() => feedElephant({ id: 'grass', name: 'Fresh Grass', icon: '🌿', peanutRating: -10 })}
            onTriggerOverload={() => handleAction('peanut_overload', 'warning')}
          />
        </div>

      </section>

      {/* --- HERD LEADERBOARD & COACH TROMPO --- */}
      <section id="ranks" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Cols: Herd Leaderboard */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800 text-lg">🏆</span>
              <h3 className="text-xl font-extrabold text-forest-950">Savanna Herd Leaderboard</h3>
            </div>
            <span className="text-xs font-bold text-forest-700">Top 5 Megafauna</span>
          </div>

          <div className="divide-y divide-stone-100">
            {leaderboard.slice(0, 4).map((item) => (
              <div key={item.rank} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-bold">{item.badge}</span>
                  <div>
                    <h4 className="font-bold text-sm text-charcoal">{item.name} {item.name === 'Jumbo' && '(You)'}</h4>
                    <p className="text-[11px] text-stone-500">{item.accessory} • {item.weight.toLocaleString()} kg</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-charcoal font-mono block">{item.steps.toLocaleString()} steps</span>
                  <span className="text-[10px] font-bold text-amber-600">Score {item.score}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Coach Trompo Advice */}
        <div className="lg:col-span-5 space-y-4">
          <CoachTrompo context="general" />
        </div>

      </section>

      {/* Simple Footer */}
      <footer className="pt-8 border-t border-stone-200 text-center text-xs text-stone-400 space-y-2">
        <p className="font-bold text-forest-900">🐘 ElephantFit — Built for the World’s Biggest Athletes</p>
        <p>“Helping elephants become lighter… one peanut at a time.” Simple, fast, and responsive.</p>
      </footer>

    </div>
  );
}
