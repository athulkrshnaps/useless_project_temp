import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle2, 
  Plus, 
  Trophy, 
  Sparkles, 
  Footprints, 
  Dumbbell, 
  Scale, 
  Flame,
  Award
} from 'lucide-react';
import ElephantVisualizer from '../components/elephant/ElephantVisualizer';
import ElephantEnvironment from '../components/elephant/ElephantEnvironment';
import CoachTrompo from '../components/coach/CoachTrompo';
import { useElephantFit } from '../context/ElephantFitContext';
import { sounds } from '../audio/soundEffects';

export default function GoalsPage() {
  const { goals, completeGoal, triggerConfetti, setElephantState } = useElephantFit();

  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState(10);
  const [newGoalUnit, setNewGoalUnit] = useState('sessions');
  const [showAddForm, setShowAddForm] = useState(false);

  const completedCount = goals.filter(g => g.completed).length;

  const handleManualComplete = (goal) => {
    completeGoal(goal.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Savanna Milestone Tracking</span>
          </div>
          <h1 className="text-3xl font-extrabold text-forest-950 tracking-tight">
            Fitness Goals & Milestones
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Setting ambitious targets for endurance, trunk torque, and legume discipline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white rounded-2xl border border-stone-200 shadow-sm flex items-center gap-3">
            <span className="text-2xl">🌟</span>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Accomplished</span>
              <span className="text-sm font-extrabold text-charcoal">{completedCount} of {goals.length} Goals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Cols: Active Goals List */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between pb-2">
            <h3 className="font-extrabold text-lg text-charcoal">Active Herd Goals</h3>
            <span className="text-xs text-stone-500 font-semibold">Click Complete to celebrate!</span>
          </div>

          <div className="space-y-4">
            {goals.map((goal) => {
              const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
              return (
                <div
                  key={goal.id}
                  className={`p-6 rounded-3xl border transition-all ${
                    goal.completed
                      ? 'bg-forest-50/70 border-forest-200/80'
                      : 'bg-white border-stone-200/90 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">
                          {goal.category}
                        </span>
                        {goal.completed && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> COMPLETED
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-charcoal">{goal.title}</h4>
                    </div>

                    {!goal.completed && (
                      <button
                        onClick={() => handleManualComplete(goal)}
                        className="px-4 py-2 bg-amber-400 hover:bg-amber-500 active:scale-95 text-charcoal rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 shrink-0"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Complete Goal</span>
                      </button>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                      <span>Progress: {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}</span>
                      <span className="font-bold text-forest-800">{percent}%</span>
                    </div>
                    <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          goal.completed ? 'bg-emerald-600' : 'bg-forest-600'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right 5 Cols: Celebration Stage & Coach Advice */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-charcoal text-base">
                Victory Stage Preview
              </h3>
              <span className="text-xs font-bold text-amber-600">Trunk Raised High</span>
            </div>

            <div className="h-64 w-full rounded-2xl overflow-hidden border border-stone-200 relative shadow-inner">
              <ElephantEnvironment type="forest" className="w-full h-full">
                <ElephantVisualizer state="celebrating" accessory="sunglasses" size="medium" />
              </ElephantEnvironment>
            </div>

            <p className="text-xs text-stone-500 italic text-center">
              Completing a goal triggers triumphant trunk trumpeting, sparkling confetti, and instant herd recognition!
            </p>
          </div>

          <CoachTrompo context="general" />

        </div>

      </div>

    </div>
  );
}
