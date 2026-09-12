import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  CheckCircle2, 
  Volume2, 
  Flame, 
  Clock, 
  Award,
  ArrowDown,
  ArrowUp,
  RotateCw,
  Sparkles
} from 'lucide-react';
import Jumbo3DViewer from '../elephant/Jumbo3DViewer';
import { sounds } from '../../audio/soundEffects';

export default function WorkoutDemonstrationModal({
  workout,
  onClose,
  onFinish
}) {
  const [isPaused, setIsPaused] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [currentRep, setCurrentRep] = useState(0);
  const [squatPhase, setSquatPhase] = useState('DOWN');
  const [earFlapPhase, setEarFlapPhase] = useState('Open');
  const [distanceWalkedKm, setDistanceWalkedKm] = useState(0.2);
  const [completed, setCompleted] = useState(false);

  const targetReps = workout.targetReps || 10;
  const totalDuration = workout.durationSec || 35;

  useEffect(() => {
    let repTimer = null;
    if (!isPaused && !completed) {
      repTimer = setInterval(() => {
        setSecondsElapsed(prev => {
          const next = prev + 1;
          if (next >= totalDuration && !completed) {
            handleComplete();
          }
          return next;
        });

        setCurrentRep(prev => {
          if (prev < targetReps) {
            const nextRep = prev + 1;
            sounds.playChime();
            return nextRep;
          }
          return prev;
        });

        setSquatPhase(prev => (prev === 'DOWN' ? 'UP' : 'DOWN'));
        setEarFlapPhase(prev => (prev === 'Open' ? 'Close' : 'Open'));
        setDistanceWalkedKm(prev => +(prev + 0.1).toFixed(1));
      }, 3000);
    }
    return () => {
      if (repTimer) clearInterval(repTimer);
    };
  }, [isPaused, completed, targetReps, totalDuration]);

  const handleComplete = () => {
    setCompleted(true);
    sounds.playAuthenticTrumpet();
  };

  const handleHearSound = () => {
    if (workout.id === 'trunk_curls') {
      sounds.playDeepRumble();
    } else if (workout.id === 'forest_walk' || workout.id === 'distance_walk') {
      sounds.playFootstepRumble();
    } else {
      sounds.playDeepRumble();
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const caloriesBurned = Math.round((secondsElapsed / totalDuration) * workout.calories);

  const exerciseInstructions = {
    trunk_curls: [
      "1. Raise the trunk slowly.",
      "2. Curl the trunk inward lifting the 150 kg log.",
      "3. Hold the peak contraction briefly.",
      "4. Lower it back smoothly.",
      "5. Repeat for recommended reps."
    ],
    elephant_squats: [
      "1. Stand naturally with pillars shoulder-width apart.",
      "2. Lower the massive body smoothly (DOWN ↓).",
      "3. Engage glutes and return upward (UP ↑).",
      "4. Exhale with a steady rumble."
    ],
    ear_flaps: [
      "1. Stand relaxed in savanna clearing.",
      "2. Open ears outward to catch cooling air currents.",
      "3. Close ears inward in rhythmic cadence.",
      "4. Disperse vascular heat."
    ],
    forest_walk: [
      "1. Maintain a brisk 4 km/h migration stride.",
      "2. Cycle all four columnar legs in 4-beat rhythm.",
      "3. Breathe naturally through the trunk."
    ],
    distance_walk: [
      "1. Sustained territorial endurance walk.",
      "2. Pass Checkpoints 1, 2, River crossing, and Finish line.",
      "3. Keep hydrated."
    ],
    mud_pool: [
      "1. Enter the cool mineral clay pool.",
      "2. Submerge knees, hips, and flanks.",
      "3. Let therapeutic mud restore dermatological health.",
      "4. Rest and recover."
    ]
  };

  const instructions = exerciseInstructions[workout.id] || exerciseInstructions.trunk_curls;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-forest-950 text-white flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-xs font-bold text-forest-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Workouts</span>
          </button>

          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Workout Demonstration Mode
          </span>
        </div>

        {!completed ? (
          <div className="p-6 space-y-5">
            
            {/* Title & Category */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-forest-950 uppercase tracking-tight">
                  {workout.name}
                </h3>
                <p className="text-xs text-stone-500">{workout.category} • {workout.difficulty} Intensity</p>
              </div>

              <button
                onClick={handleHearSound}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-forest-100 hover:bg-forest-200 text-forest-900 text-xs font-bold transition-all"
                title="Hear authentic elephant vocalization"
              >
                <Volume2 className="w-4 h-4 text-forest-700" />
                <span>Hear Jumbo</span>
              </button>
            </div>

            {/* REALISTIC 3D JUMBO DEMONSTRATION VIEWPORT */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#eaf2eb] via-[#f7f3e8] to-[#dce8d5] border border-stone-300 overflow-hidden shadow-inner">
              <Jumbo3DViewer
                state={isPaused ? 'idle' : (workout.animationState || 'exercising')}
                workoutId={isPaused ? null : workout.id}
                height="h-72 sm:h-80"
                showControls={true}
              />

              {workout.id === 'elephant_squats' && !isPaused && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-charcoal/90 text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
                  {squatPhase === 'DOWN' ? (
                    <>
                      <ArrowDown className="w-4 h-4 text-amber-400" />
                      <span>DOWN ↓</span>
                    </>
                  ) : (
                    <>
                      <ArrowUp className="w-4 h-4 text-emerald-400" />
                      <span>UP ↑</span>
                    </>
                  )}
                </div>
              )}

              {workout.id === 'ear_flaps' && !isPaused && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-charcoal/90 text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                  <RotateCw className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>{earFlapPhase} → {earFlapPhase === 'Open' ? 'Close' : 'Open'}</span>
                </div>
              )}

              {workout.id === 'mud_pool' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-amber-900/90 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  “Recovery time. Even elephants need a break.”
                </div>
              )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {workout.id === 'forest_walk' || workout.id === 'distance_walk' ? (
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Distance</span>
                  <span className="text-xl font-extrabold text-charcoal font-mono">{distanceWalkedKm} / 3.0 km</span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Repetitions</span>
                  <span className="text-xl font-extrabold text-charcoal font-mono">
                    {currentRep.toString().padStart(2, '0')} / {targetReps.toString().padStart(2, '0')} REPS
                  </span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Timer</span>
                <span className="text-xl font-extrabold text-charcoal font-mono">{formatTime(secondsElapsed)}</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Active Burn</span>
                <span className="text-xl font-extrabold text-amber-700">+{caloriesBurned} kcal</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-forest-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (secondsElapsed / totalDuration) * 100)}%` }}
              />
            </div>

            {/* Instructions */}
            <div className="p-4 rounded-2xl bg-forest-50/80 border border-forest-200/60 text-xs text-forest-950 space-y-1.5">
              <span className="font-extrabold text-xs uppercase tracking-wider text-forest-800 block">
                How Jumbo Does It:
              </span>
              <ul className="space-y-1 text-stone-700">
                {instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-forest-600 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center gap-2 transition-all"
              >
                {isPaused ? <Play className="w-4 h-4 text-forest-700" /> : <Pause className="w-4 h-4 text-amber-700" />}
                <span>{isPaused ? 'Resume Exercise' : 'Pause'}</span>
              </button>

              <button
                onClick={handleComplete}
                className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-950 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Finish Workout</span>
              </button>
            </div>

          </div>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="h-64 rounded-2xl bg-gradient-to-b from-forest-100 to-amber-50 border border-stone-200 overflow-hidden relative shadow-inner">
              <Jumbo3DViewer state="celebrating" height="h-64" showControls={false} />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Workout Complete! 🎉</span>
              </div>
              <h3 className="text-2xl font-extrabold text-forest-950">
                Great job, Jumbo!
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-center">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Duration</span>
                <span className="text-base font-extrabold text-charcoal">{formatTime(secondsElapsed)}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Calories</span>
                <span className="text-base font-extrabold text-amber-600">+{workout.calories} kcal</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Experience</span>
                <span className="text-base font-extrabold text-forest-700">+25 XP</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-savanna-100 text-stone-700 text-xs font-medium italic max-w-md mx-auto">
              “Your legs have filed a complaint. But you survived.” 🐘
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => {
                  onFinish(workout, workout.calories);
                  onClose();
                }}
                className="px-8 py-3 rounded-2xl bg-forest-900 hover:bg-forest-950 text-white font-extrabold text-xs shadow-lg transition-all"
              >
                Claim Rewards & Continue
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
