import React, { useState } from 'react';
import { 
  Footprints, 
  Flame, 
  Scale, 
  Trophy, 
  Sparkles, 
  ChevronRight, 
  Dumbbell, 
  Play, 
  TrendingUp, 
  ArrowUpRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import ElephantVisualizer from '../components/elephant/ElephantVisualizer';
import ElephantEnvironment from '../components/elephant/ElephantEnvironment';
import PeanutMeter from '../components/elephant/PeanutMeter';
import StatCard from '../components/common/StatCard';
import CoachTrompo from '../components/coach/CoachTrompo';
import { useElephantFit } from '../context/ElephantFitContext';
import { sounds } from '../audio/soundEffects';

export default function DashboardPage() {
  const { 
    elephant, 
    setActiveTab, 
    setElephantState, 
    addSteps, 
    feedElephant, 
    triggerConfetti,
    completeGoal
  } = useElephantFit();

  const [selectedEnv, setSelectedEnv] = useState('forest');

  // Quick State test actions
  const handleStateChange = (stateName, env = 'forest') => {
    setElephantState(stateName);
    setSelectedEnv(env);
    if (stateName === 'celebrating') sounds.playTrumpet();
    else if (stateName === 'walking') sounds.playStomp();
    else if (stateName === 'peanut_overload') sounds.playWarning();
    else sounds.playChime();
  };

  // Score category label
  const getScoreTier = (score) => {
    if (score >= 100) return { label: 'Herd Champion', color: 'text-amber-500' };
    if (score >= 81) return { label: 'Super Fit Elephant', color: 'text-emerald-500' };
    if (score >= 61) return { label: 'Active Elephant', color: 'text-forest-600' };
    if (score >= 31) return { label: 'Getting Started', color: 'text-amber-600' };
    return { label: 'Sleepy Elephant', color: 'text-stone-500' };
  };

  const scoreTier = getScoreTier(elephant.fitnessScore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* --- DASHBOARD HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
              Good Morning, {elephant.name} 🐘
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-forest-100 text-forest-800 border border-forest-200">
              Day 28 on Savanna Plan
            </span>
          </div>
          <p className="text-stone-600 text-sm mt-1">
            Current Mass: <strong className="text-forest-900">{elephant.weight.toLocaleString()} kg</strong> • Target: {elephant.targetWeight.toLocaleString()} kg • Fitness Tier: <span className={`font-bold ${scoreTier.color}`}>{scoreTier.label}</span>
          </p>
        </div>

        {/* Quick Stride Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => addSteps(1568)}
            className="px-4 py-2.5 bg-forest-800 hover:bg-forest-900 active:scale-95 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            title="Simulate walking 1,568 steps"
          >
            <Footprints className="w-4 h-4 text-forest-300" />
            <span>+1,568 Steps (Reach 20k!)</span>
          </button>

          <button
            onClick={() => setActiveTab('workouts')}
            className="px-4 py-2.5 bg-white hover:bg-stone-50 border border-stone-200 text-forest-900 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Dumbbell className="w-4 h-4 text-forest-600" />
            <span>Start Workout</span>
          </button>
        </div>
      </div>

      {/* --- TOP STATISTICS OVERVIEW GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Stat 1: Weight */}
        <StatCard
          title="Current Weight"
          value={elephant.weight.toLocaleString()}
          unit="kg"
          subtitle="-200 kg from Day 1"
          icon={Scale}
          color="stone"
          onClick={() => setActiveTab('weight')}
          trend={{ value: "-50 kg this wk", positive: true }}
        />

        {/* Stat 2: Daily Steps */}
        <StatCard
          title="Daily Steps"
          value={elephant.currentSteps.toLocaleString()}
          unit="/ 20,000"
          subtitle={`${Math.round((elephant.currentSteps / elephant.dailyStepGoal) * 100)}% of goal`}
          icon={Footprints}
          color="forest"
          progress={(elephant.currentSteps / elephant.dailyStepGoal) * 100}
          onClick={() => setActiveTab('activity')}
        />

        {/* Stat 3: Calories Burned */}
        <StatCard
          title="Active Energy"
          value={elephant.caloriesBurned.toLocaleString()}
          unit="kcal"
          subtitle="Target: 3,200 kcal"
          icon={Flame}
          color="amber"
          progress={(elephant.caloriesBurned / elephant.targetCalories) * 100}
          trend={{ value: "+18% vs avg", positive: true }}
        />

        {/* Stat 4: Fitness Score */}
        <StatCard
          title="Fitness Score"
          value={elephant.fitnessScore}
          unit="/ 100"
          subtitle={scoreTier.label}
          icon={Trophy}
          color="forest"
          badge="TOP 3 HERD"
          onClick={() => setActiveTab('progress')}
        />

        {/* Stat 5: Peanut Consumption */}
        <StatCard
          title="Peanut Intake"
          value={elephant.peanutConsumptionKg}
          unit="kg"
          subtitle={`${elephant.peanutMeterPercent}% on meter`}
          icon={Sparkles}
          color="amber"
          onClick={() => setActiveTab('nutrition')}
          trend={{ value: "Safe limit < 1.5kg", positive: elephant.peanutConsumptionKg <= elephant.peanutThresholdKg }}
        />

      </div>

      {/* --- MAIN CENTERPIECE: DYNAMIC ELEPHANT VISUALIZATION HUB --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Cols: Large Interactive Elephant Stage */}
        <div className="lg:col-span-8 bg-white/90 backdrop-blur-sm rounded-3xl border border-stone-200/80 p-6 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-stone-100">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-extrabold text-charcoal">
                  Live Elephant State: <span className="capitalize text-forest-700">{elephant.currentState.replace('_', ' ')}</span>
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                The elephant visually reflects your current physical activity and nutritional state.
              </p>
            </div>

            {/* Environment Picker */}
            <div className="flex items-center gap-1.5 text-xs bg-stone-100 p-1.5 rounded-xl self-start">
              <span className="font-bold text-stone-400 px-1">Scenery:</span>
              {[
                { id: 'forest', label: 'Forest', icon: '🌲' },
                { id: 'trail', label: 'Trail', icon: '🌾' },
                { id: 'gym', label: 'Gym', icon: '🪵' },
                { id: 'mud', label: 'Mud Pool', icon: '🛁' },
              ].map((env) => (
                <button
                  key={env.id}
                  onClick={() => setSelectedEnv(env.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    selectedEnv === env.id
                      ? 'bg-white text-forest-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {env.icon} {env.label}
                </button>
              ))}
            </div>
          </div>

          {/* Central Elephant Environment Viewport */}
          <div className="w-full h-80 sm:h-96 rounded-2xl relative shadow-inner overflow-hidden border border-stone-200">
            <ElephantEnvironment type={selectedEnv} className="w-full h-full">
              <ElephantVisualizer 
                state={elephant.currentState}
                accessory={elephant.accessory}
                size="large"
              />
            </ElephantEnvironment>
          </div>

          {/* Dynamic State Control Panel for Interactive Testing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-500">
              <span>Interactive Motion Controls (Click to command elephant):</span>
              <span className="text-[11px] text-forest-700 font-semibold">12 Expressive States</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { id: 'idle', label: 'Resting', icon: '🪨', env: 'forest' },
                { id: 'walking', label: 'Walking', icon: '🐾', env: 'trail' },
                { id: 'squats', label: 'Squats', icon: '🏋️', env: 'gym' },
                { id: 'trunk_curls', label: 'Trunk Curls', icon: '🪵', env: 'gym' },
                { id: 'mud_pool', label: 'Mud Soak', icon: '🛁', env: 'mud' },
                { id: 'celebrating', label: 'Celebration', icon: '🎺', env: 'forest' },
                { id: 'eating', label: 'Eating Grass', icon: '🌿', env: 'forest' },
                { id: 'tired', label: 'Exhausted', icon: '💦', env: 'gym' },
                { id: 'peanut_overload', label: 'Peanut Panic', icon: '🥜', env: 'forest' },
                { id: 'ear_flaps', label: 'Ear Flaps', icon: '🍃', env: 'trail' },
                { id: 'super_fit', label: 'Super Fit', icon: '👑', env: 'forest' },
                { id: 'sleeping', label: 'Sleeping', icon: '💤', env: 'forest' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => handleStateChange(btn.id, btn.env)}
                  className={`p-2 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all border ${
                    elephant.currentState === btn.id
                      ? 'bg-forest-800 text-white border-forest-900 shadow-sm scale-105'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <span className="text-base">{btn.icon}</span>
                  <span className="truncate w-full text-center text-[10px]">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-semibold">Quick Feed:</span>
              <button
                onClick={() => feedElephant({ id: 'grass', name: 'Fresh Grass', icon: '🌿', peanutRating: -10 })}
                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200 font-semibold flex items-center gap-1"
              >
                🌿 Grass (-10% Peanuts)
              </button>
              <button
                onClick={() => feedElephant({ id: 'banana', name: 'Bananas', icon: '🍌', peanutRating: 0 })}
                className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg border border-amber-200 font-semibold flex items-center gap-1"
              >
                🍌 Banana (+Energy)
              </button>
              <button
                onClick={() => feedElephant({ id: 'peanuts', name: 'Peanuts', icon: '🥜', peanutRating: 25 })}
                className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-800 rounded-lg border border-red-200 font-semibold flex items-center gap-1"
              >
                🥜 Peanuts (+25% Panic)
              </button>
            </div>

            <button
              onClick={() => setActiveTab('activity')}
              className="text-forest-700 hover:text-forest-900 font-bold flex items-center gap-1"
            >
              <span>View Full Trail Progress</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Right 4 Cols: Peanut Meter + Coach Trompo + Quick Goal */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Peanut Meter Component */}
          <PeanutMeter
            percentage={elephant.peanutMeterPercent}
            peanutKg={elephant.peanutConsumptionKg}
            onFeedGrass={() => feedElephant({ id: 'grass', name: 'Fresh Grass', icon: '🌿', peanutRating: -10 })}
            onTriggerOverload={() => handleStateChange('peanut_overload', 'forest')}
          />

          {/* Coach Trompo AI Assistant Card */}
          <CoachTrompo context="general" />

          {/* Daily Goal Card */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Active Savanna Goal
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                In Progress
              </span>
            </div>

            <h4 className="font-extrabold text-charcoal text-sm">
              Reach 20,000 Daily Steps & Touch Grass
            </h4>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-stone-500 font-medium">
                <span>{elephant.currentSteps.toLocaleString()} steps</span>
                <span>20,000 steps</span>
              </div>
              <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-forest-600 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, (elephant.currentSteps / 20000) * 100)}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => addSteps(1568)}
                className="text-xs font-bold text-forest-700 hover:text-forest-900 flex items-center gap-1"
              >
                <span>Walk Remaining 1,568</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => completeGoal('goal_steps')}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-charcoal rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                Complete Goal 🌟
              </button>
            </div>
          </div>

          {/* Weekly Consistency Bar Chart Mini */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-stone-700">Weekly Step Volume</span>
              <span className="text-forest-700 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> 18.2k avg
              </span>
            </div>

            <div className="h-28 flex items-end justify-between gap-2 pt-4">
              {elephant.weeklyActivity.map((item, idx) => {
                const heightPercent = Math.min(100, Math.round((item.steps / 22000) * 100));
                const isToday = idx === 6;
                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <div className="relative w-full flex justify-center">
                      {/* Tooltip on hover */}
                      <div className="absolute -top-7 hidden group-hover:block bg-charcoal text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap">
                        {item.steps.toLocaleString()}
                      </div>
                      <div
                        className={`w-full max-w-[20px] rounded-t-md transition-all duration-500 ${
                          isToday ? 'bg-forest-700' : 'bg-forest-200 group-hover:bg-forest-400'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-semibold ${isToday ? 'text-forest-900 font-bold' : 'text-stone-400'}`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
