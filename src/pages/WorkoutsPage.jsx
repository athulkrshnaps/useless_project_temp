import React, { useState } from 'react';
import { 
  Play, 
  Flame, 
  Clock, 
  Dumbbell, 
  Volume2,
  Sparkles,
  Award
} from 'lucide-react';
import { CORE_WORKOUTS } from '../data/initialData';
import WorkoutDemonstrationModal from '../components/workouts/WorkoutDemonstrationModal';
import { useElephantFit } from '../context/ElephantFitContext';
import { sounds } from '../audio/soundEffects';

export default function WorkoutsPage() {
  const { elephant, finishWorkout } = useElephantFit();
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleStartWorkout = (workout) => {
    sounds.playChime();
    setSelectedWorkout(workout);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-bold mb-1">
          <Dumbbell className="w-3.5 h-3.5" />
          <span>Savanna Functional Conditioning</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Megafauna Workouts (6 Core Exercises)
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Select any exercise to enter Workout Demonstration Mode with live 3D movement, rep counting, and audio.
        </p>
      </div>

      {/* 6 Core Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {CORE_WORKOUTS.map((workout) => (
          <div
            key={workout.id}
            className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2.5 rounded-2xl bg-stone-100 group-hover:scale-110 transition-transform">
                  {workout.icon}
                </span>
                <span className="text-xs font-extrabold text-amber-700 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full">
                  <Flame className="w-3.5 h-3.5" />
                  {workout.calories} kcal
                </span>
              </div>

              <span className="text-[10px] uppercase font-bold tracking-wider text-forest-700 block">
                {workout.category}
              </span>
              <h3 className="text-xl font-extrabold text-charcoal mt-1">
                {workout.name}
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                {workout.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-stone-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {workout.displayDuration}
                </span>
                <span className="text-forest-800">{workout.difficulty}</span>
              </div>

              <button
                onClick={() => handleStartWorkout(workout)}
                className="px-4 py-2 bg-forest-900 hover:bg-forest-950 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current text-amber-300" />
                <span>Start Workout</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Workout Demonstration Modal */}
      {selectedWorkout && (
        <WorkoutDemonstrationModal
          workout={selectedWorkout}
          onClose={() => setSelectedWorkout(null)}
          onFinish={(w, cals) => {
            finishWorkout(w, cals);
            setSelectedWorkout(null);
          }}
        />
      )}

    </div>
  );
}
