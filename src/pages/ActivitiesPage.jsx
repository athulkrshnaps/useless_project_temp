import React, { useState, useEffect } from 'react';
import { 
  Footprints, 
  Play, 
  Pause, 
  Trophy, 
  MapPin, 
  Compass, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import Jumbo3DViewer from '../components/elephant/Jumbo3DViewer';
import { useElephantFit } from '../context/ElephantFitContext';
import { sounds } from '../audio/soundEffects';

export default function ActivitiesPage() {
  const { elephant, addSteps, triggerConfetti } = useElephantFit();
  const [isSimulatingWalk, setIsSimulatingWalk] = useState(false);

  const goal = 20000;
  const steps = elephant.currentSteps;
  const progressPercent = Math.min(100, Math.round((steps / goal) * 100));
  const distanceKm = (steps * 0.0008).toFixed(1);
  const isGoalReached = steps >= goal;

  // Simulator loop
  useEffect(() => {
    let timer = null;
    if (isSimulatingWalk) {
      timer = setInterval(() => {
        addSteps(150);
      }, 800);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSimulatingWalk, addSteps]);

  const checkpoints = [
    { step: 0, label: "Baobab Start", icon: "🌳", percent: 0 },
    { step: 5000, label: "Checkpoint 1", icon: "📍", percent: 25 },
    { step: 10000, label: "Checkpoint 2", icon: "📍", percent: 50 },
    { step: 15000, label: "River Crossing", icon: "💧", percent: 75 },
    { step: 20000, label: "Finish Line", icon: "🏁", percent: 100 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-900 text-xs font-bold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Savanna Territorial Trails</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
            Jumbo’s Walking Activities
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Follow Jumbo in 3D as he treks across the savanna trail towards the 20,000 steps milestone.
          </p>
        </div>

        {/* Live Stride Simulator Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const next = !isSimulatingWalk;
              setIsSimulatingWalk(next);
              if (next) sounds.playFootstepRumble();
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all ${
              isSimulatingWalk ? 'bg-amber-500 text-white animate-pulse' : 'bg-forest-900 text-white hover:bg-forest-950'
            }`}
          >
            {isSimulatingWalk ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isSimulatingWalk ? 'Pause Walking' : 'Simulate Live Stride'}</span>
          </button>
        </div>
      </div>

      {/* Goal Reached Celebration Banner */}
      {isGoalReached && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-forest-700 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base">Your elephant has officially touched grass!</h4>
              <p className="text-xs text-emerald-100">Full 20,000 steps completed. Maximum savanna glory unlocked.</p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerConfetti();
              sounds.playAuthenticTrumpet();
            }}
            className="px-3.5 py-1.5 bg-amber-400 text-charcoal font-bold text-xs rounded-xl shadow"
          >
            Trumpet Celebration 🎺
          </button>
        </div>
      )}

      {/* 3D Walking Viewport */}
      <div className="rounded-3xl bg-gradient-to-b from-[#eaf2eb] via-[#f7f3e8] to-[#dce8d5] border-2 border-stone-300 p-4 sm:p-6 shadow-md overflow-hidden relative">
        <div className="flex items-center justify-between pb-2 border-b border-stone-300/80 mb-2">
          <span className="text-xs font-bold text-forest-950">
            Active Gait: <span className="text-forest-700">{isSimulatingWalk ? 'Walking Migration' : 'Standing Trailside'}</span>
          </span>
          <span className="text-xs font-mono font-bold text-charcoal">
            {distanceKm} km walked • {steps.toLocaleString()} steps
          </span>
        </div>

        <Jumbo3DViewer
          state={isSimulatingWalk ? 'walking' : 'idle'}
          height="h-72 sm:h-80"
          showControls={true}
        />
      </div>

      {/* Savanna Trail Waypoints Progress Track */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-charcoal">Trail Checkpoint Progression</span>
          <span className="text-forest-800">{progressPercent}% Completed</span>
        </div>

        {/* Trail Checkpoints Bar */}
        <div className="relative pt-6 pb-2">
          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-forest-600 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center mt-3">
            {checkpoints.map((cp) => {
              const reached = progressPercent >= cp.percent;
              return (
                <div key={cp.step} className="flex flex-col items-center">
                  <span className={`text-base ${reached ? 'scale-110' : 'opacity-40'}`}>{cp.icon}</span>
                  <span className={`text-[10px] font-bold mt-1 ${reached ? 'text-forest-900' : 'text-stone-400'}`}>
                    {cp.label}
                  </span>
                  <span className="text-[9px] text-stone-400 font-mono">{cp.step.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stepper Buttons */}
        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => addSteps(1000)}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-all"
            >
              +1,000 Steps
            </button>
            <button
              onClick={() => addSteps(1568)}
              className="px-3.5 py-1.5 bg-forest-900 hover:bg-forest-950 text-white rounded-xl text-xs font-bold transition-all"
            >
              Finish 20,000 Steps 🏁
            </button>
          </div>

          <button
            onClick={() => addSteps(-steps + 6432)}
            className="text-xs text-stone-400 hover:text-stone-600 flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Trail</span>
          </button>
        </div>
      </div>

    </div>
  );
}
