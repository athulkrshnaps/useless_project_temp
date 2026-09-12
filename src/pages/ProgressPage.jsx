import React from 'react';
import { TrendingUp, Scale, Footprints, Dumbbell, Trophy } from 'lucide-react';
import { useElephantFit } from '../context/ElephantFitContext';

export default function ProgressPage() {
  const { elephant } = useElephantFit();

  // Simple clean SVG Weight Line Chart (5,400 -> 5,200 kg)
  const history = elephant.weightHistory || [];
  const minW = 5000;
  const maxW = 5500;
  const chartW = 460;
  const chartH = 160;

  const points = history.map((item, idx) => {
    const x = 30 + (idx / Math.max(1, history.length - 1)) * (chartW - 60);
    const normalizedY = (item.weight - minW) / (maxW - minW);
    const y = chartH - 25 - normalizedY * (chartH - 50);
    return { x, y, ...item };
  });

  const svgPath = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-900 text-xs font-bold mb-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Megafauna Health Tracking</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
          Jumbo’s Simple Progress
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Clean analytics tracking mass recomposition, steps volume, workouts, and fitness score.
        </p>
      </div>

      {/* 4 Simple Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Current Mass</span>
          <div className="text-2xl font-extrabold text-charcoal mt-1">{elephant.weight.toLocaleString()} kg</div>
          <span className="text-xs text-forest-700 font-bold">-200 kg from Start</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Today's Steps</span>
          <div className="text-2xl font-extrabold text-charcoal mt-1">{elephant.currentSteps.toLocaleString()}</div>
          <span className="text-xs text-stone-500">Target: 20,000 steps</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Workouts Done</span>
          <div className="text-2xl font-extrabold text-charcoal mt-1">4 Sessions</div>
          <span className="text-xs text-emerald-700 font-bold">Consistent Herd Cadence</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Fitness Score</span>
          <div className="text-2xl font-extrabold text-forest-800 mt-1">{elephant.fitnessScore} / 100</div>
          <span className="text-xs text-stone-500">Active Elephant Tier</span>
        </div>
      </div>

      {/* Clean Weight Chart & Weekly Steps Bar Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Chart 1: Weight Progress */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-base text-charcoal">Weight Progress</h4>
            <span className="text-xs font-bold text-forest-800">Target: 5,050 kg</span>
          </div>

          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200">
            <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-44 overflow-visible">
              {/* Target Line */}
              <line x1="30" y1="130" x2={chartW - 30} y2="130" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4" />
              <text x={chartW - 80} y="125" fontSize="9" fill="#b45309" fontWeight="bold">Target 5,050 kg</text>

              {/* Path */}
              <path d={svgPath} fill="none" stroke="#2c7353" strokeWidth="3" strokeLinecap="round" />

              {/* Points */}
              {points.map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill="#ffffff" stroke="#1c4d37" strokeWidth="2.5" />
                  <text x={pt.x} y={pt.y - 8} fontSize="9" fontWeight="bold" fill="#1f2937" textAnchor="middle">
                    {pt.label}
                  </text>
                  <text x={pt.x} y={chartH - 4} fontSize="9" fill="#6b7280" textAnchor="middle">
                    {pt.date}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <p className="text-[11px] text-stone-400 italic">“Yes, that number looks enormous. You're an elephant.”</p>
        </div>

        {/* Chart 2: Weekly Steps Volume */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-base text-charcoal">Weekly Steps</h4>
            <span className="text-xs font-bold text-forest-800">20k Daily Goal</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-2 pt-4 bg-stone-50 rounded-2xl p-4 border border-stone-200">
            {elephant.weeklyActivity.map((day, idx) => {
              const h = Math.round((day.steps / 22000) * 100);
              const isToday = idx === 6;
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    className={`w-full max-w-[22px] rounded-t-md transition-all ${
                      isToday ? 'bg-forest-800' : 'bg-forest-300'
                    }`}
                    style={{ height: `${h}%` }}
                  />
                  <span className={`text-[10px] font-bold ${isToday ? 'text-forest-900' : 'text-stone-400'}`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-stone-400 text-right">Average: 18,240 steps/day</p>
        </div>

      </div>

    </div>
  );
}
