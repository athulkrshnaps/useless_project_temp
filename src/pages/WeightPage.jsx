import React, { useState } from 'react';
import { 
  Scale, 
  TrendingDown, 
  Plus, 
  Calculator, 
  Info, 
  Sparkles, 
  ArrowDownRight, 
  CheckCircle2,
  Flame,
  Dumbbell
} from 'lucide-react';
import ElephantVisualizer from '../components/elephant/ElephantVisualizer';
import ElephantEnvironment from '../components/elephant/ElephantEnvironment';
import CoachTrompo from '../components/coach/CoachTrompo';
import { useElephantFit } from '../context/ElephantFitContext';
import { sounds } from '../audio/soundEffects';

export default function WeightPage() {
  const { elephant, recordWeight, updateProfile, setElephantState } = useElephantFit();

  const [inputWeight, setInputWeight] = useState(elephant.weight);
  const [targetWeight, setTargetWeight] = useState(elephant.targetWeight);

  // Calorie Calculator state
  const [calcWeight, setCalcWeight] = useState(elephant.weight);
  const [calcActivity, setCalcActivity] = useState('moderate');
  const [calcDuration, setCalcDuration] = useState(45);
  const [calcSteps, setCalcSteps] = useState(15000);
  const [calculatedCalories, setCalculatedCalories] = useState(2480);

  // Fictional Elephant Calorie Algorithm
  const calculateElephantCalories = () => {
    sounds.playChime();
    const activityMultipliers = {
      light: 0.35,
      moderate: 0.55,
      intense: 0.85,
    };
    const mult = activityMultipliers[calcActivity] || 0.55;
    // Fictional mass calculation for 5,000kg megafauna
    const stepBurn = calcSteps * 0.12;
    const durationBurn = calcDuration * (calcWeight * 0.006) * mult;
    const total = Math.round(stepBurn + durationBurn);
    setCalculatedCalories(total);
    setElephantState('happy', 2500);
  };

  const handleWeightSubmit = (e) => {
    e.preventDefault();
    const val = Number(inputWeight);
    if (val > 2000 && val < 9000) {
      recordWeight(val);
    }
  };

  const handleTargetSubmit = (e) => {
    e.preventDefault();
    updateProfile({ targetWeight: Number(targetWeight) });
  };

  // SVG Line Chart coordinates calculation
  const history = elephant.weightHistory || [];
  const minWeight = 4900;
  const maxWeight = 5500;
  const chartHeight = 200;
  const chartWidth = 500;

  const points = history.map((item, idx) => {
    const x = 40 + (idx / Math.max(1, history.length - 1)) * (chartWidth - 80);
    const normalizedY = (item.weight - minWeight) / (maxWeight - minWeight);
    const y = chartHeight - 30 - normalizedY * (chartHeight - 60);
    return { x, y, ...item };
  });

  const svgPath = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-bold mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Megafauna Biometric Weight OS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-forest-950 tracking-tight">
            Weight Tracking & Calorie Engine
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Track healthy mass recomposition and calculate fictional metabolic expenditure for 5-ton athletes.
          </p>
        </div>

        {/* Humorous Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2.5">
          <span className="text-xl">🐘</span>
          <span>“Yes, that number looks enormous. You're an elephant.”</span>
        </div>
      </div>

      {/* --- WEIGHT PROGRESS & HISTORICAL CHART --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Cols: Weight Line Chart & Visualizer */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Current Biometric Mass</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-charcoal">{elephant.weight.toLocaleString()}</span>
                <span className="text-lg font-bold text-stone-500">kg</span>
                <span className="ml-2 inline-flex items-center text-xs font-bold text-forest-700 bg-forest-100 px-2.5 py-1 rounded-full">
                  <TrendingDown className="w-3.5 h-3.5 mr-1" />
                  -200 kg from Start
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Target Goal Mass</span>
              <div className="text-2xl font-extrabold text-forest-800 mt-1">
                {elephant.targetWeight.toLocaleString()} kg
              </div>
              <p className="text-[11px] text-stone-400">
                {(elephant.weight - elephant.targetWeight).toLocaleString()} kg remaining
              </p>
            </div>
          </div>

          {/* Attractive SVG Weight Line Chart */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
              <span>Historical Trend: 5,400 kg → 5,200 kg</span>
              <span className="text-forest-700 font-bold">Consistent Progressive Recomposition</span>
            </div>

            <div className="w-full bg-stone-50/80 rounded-2xl p-4 border border-stone-200/80 overflow-x-auto">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-56 overflow-visible">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2c7353" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2c7353" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="40" y1="50" x2={chartWidth - 40} y2="50" stroke="#e5e7eb" strokeDasharray="4" />
                <line x1="40" y1="110" x2={chartWidth - 40} y2="110" stroke="#e5e7eb" strokeDasharray="4" />
                <line x1="40" y1="170" x2={chartWidth - 40} y2="170" stroke="#e5e7eb" strokeDasharray="4" />

                <text x="5" y="55" fontSize="10" fill="#9ca3af">5,450</text>
                <text x="5" y="115" fontSize="10" fill="#9ca3af">5,300</text>
                <text x="5" y="175" fontSize="10" fill="#9ca3af">5,150</text>

                {/* Target Weight Dashed Guide Line */}
                <line x1="40" y1="190" x2={chartWidth - 40} y2="190" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6" />
                <text x={chartWidth - 110} y="185" fontSize="10" fill="#d97706" fontWeight="bold">Target 5,050 kg</text>

                {/* Area Fill */}
                <path
                  d={`${svgPath} L ${points[points.length - 1]?.x || 0} ${chartHeight - 30} L ${points[0]?.x || 0} ${chartHeight - 30} Z`}
                  fill="url(#chartGradient)"
                />

                {/* Solid Line */}
                <path
                  d={svgPath}
                  fill="none"
                  stroke="#2c7353"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Points & Labels */}
                {points.map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#1b4d36" strokeWidth="3" />
                    <text x={pt.x} y={pt.y - 12} fontSize="11" fontWeight="bold" fill="#1f2937" textAnchor="middle">
                      {pt.label}
                    </text>
                    <text x={pt.x} y={chartHeight - 12} fontSize="10" fill="#6b7280" textAnchor="middle">
                      {pt.date}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Form to log new weight entry */}
          <form onSubmit={handleWeightSubmit} className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:flex-1">
              <label className="text-xs font-bold text-stone-500 block mb-1">
                Log New Scale Weigh-in (kg):
              </label>
              <input
                type="number"
                step="10"
                min="3000"
                max="8000"
                value={inputWeight}
                onChange={(e) => setInputWeight(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-bold text-charcoal focus:ring-2 focus:ring-forest-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-forest-800 hover:bg-forest-900 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all sm:self-end flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Record Weigh-in</span>
            </button>
          </form>

        </div>

        {/* Right 5 Cols: Elephant Posture & Calorie Calculator */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Posture & Energy Status Display */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-charcoal text-base">
                Biometric Posture Status
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Energetic & Happy
              </span>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              As mass normalizes toward 5,050 kg, the elephant maintains proud stance, high joint agility, and smiling trunk curvature without extreme or cartoonish weight loss.
            </p>

            <div className="h-56 w-full rounded-2xl overflow-hidden border border-stone-200 shadow-inner">
              <ElephantEnvironment type="forest" className="w-full h-full">
                <ElephantVisualizer state="happy" accessory="headband" size="medium" />
              </ElephantEnvironment>
            </div>
          </div>

          {/* FICTIONAL CALORIE CALCULATOR */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-charcoal text-white shadow-xl border border-forest-700/50 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-400 text-charcoal font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-forest-100">
                  Megafauna Calorie Calculator
                </h3>
                <p className="text-[11px] text-forest-300">
                  Fictional / Hackathon demo calculation engine
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-forest-300 font-semibold block mb-1">Mass: {calcWeight} kg</label>
                <input
                  type="range"
                  min="4000"
                  max="7000"
                  step="50"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              <div>
                <label className="text-forest-300 font-semibold block mb-1">Activity Level</label>
                <select
                  value={calcActivity}
                  onChange={(e) => setCalcActivity(e.target.value)}
                  className="w-full bg-forest-800 border border-forest-600 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none"
                >
                  <option value="light">Sedentary Baobab Lounging (0.35x)</option>
                  <option value="moderate">Savanna Strolling & Grazing (0.55x)</option>
                  <option value="intense">Acacia Log Powerlifting (0.85x)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-forest-300 font-semibold block mb-1">Workout (min)</label>
                  <input
                    type="number"
                    value={calcDuration}
                    onChange={(e) => setCalcDuration(Number(e.target.value))}
                    className="w-full bg-forest-800 border border-forest-600 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-forest-300 font-semibold block mb-1">Daily Steps</label>
                  <input
                    type="number"
                    step="500"
                    value={calcSteps}
                    onChange={(e) => setCalcSteps(Number(e.target.value))}
                    className="w-full bg-forest-800 border border-forest-600 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
              </div>

              <button
                onClick={calculateElephantCalories}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-charcoal font-extrabold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 text-orange-600 fill-current" />
                <span>Calculate Estimated Burn</span>
              </button>

              {/* Result display */}
              <div className="p-3.5 rounded-xl bg-forest-800/70 border border-forest-600/40 text-center space-y-1">
                <span className="text-[10px] text-forest-300 uppercase font-bold tracking-wider">Estimated Expenditure</span>
                <div className="text-3xl font-extrabold text-amber-300 font-mono">
                  {calculatedCalories.toLocaleString()} <span className="text-sm font-sans text-forest-200">kcal/day</span>
                </div>
                <p className="text-[10px] text-forest-400 italic">
                  *Fictional demo estimate for hackathon. Not veterinary advice.
                </p>
              </div>
            </div>
          </div>

          <CoachTrompo context="weight" />

        </div>

      </div>

    </div>
  );
}
