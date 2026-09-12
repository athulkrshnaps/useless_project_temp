import React, { useState } from 'react';
import { 
  User, 
  Scale, 
  Ruler, 
  Activity, 
  Target, 
  Sparkles, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import ElephantVisualizer from '../components/elephant/ElephantVisualizer';
import ElephantEnvironment from '../components/elephant/ElephantEnvironment';
import CoachTrompo from '../components/coach/CoachTrompo';
import { useElephantFit } from '../context/ElephantFitContext';

export default function ProfilePage() {
  const { elephant, updateProfile, setElephantState } = useElephantFit();

  const [form, setForm] = useState({
    name: elephant.name,
    age: elephant.age,
    weight: elephant.weight,
    targetWeight: elephant.targetWeight,
    height: elephant.height,
    gender: elephant.gender,
    activityLevel: elephant.activityLevel,
    activeGoal: elephant.activeGoal,
    accessory: elephant.accessory || 'headband',
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setElephantState('happy', 2500);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Savanna Registry Biometrics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-forest-950 tracking-tight">
            Elephant Profile & Biometrics
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Configure your biometric parameters, height, current mass, and fitness target.
          </p>
        </div>

        {saved && (
          <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-1.5 border border-emerald-200 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Profile Saved to Savanna DB</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 5 Cols: Prominent Elephant Portrait */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-extrabold text-charcoal">{form.name}</h3>
            <p className="text-xs text-stone-500">
              {form.age} Years Old • {form.gender} • {form.weight.toLocaleString()} kg
            </p>
          </div>

          <div className="h-72 w-full rounded-2xl overflow-hidden border border-stone-200 shadow-inner">
            <ElephantEnvironment type="forest" className="w-full h-full">
              <ElephantVisualizer
                state={elephant.currentState}
                accessory={form.accessory}
                size="large"
              />
            </ElephantEnvironment>
          </div>

          {/* Accessory Selector */}
          <div>
            <label className="text-xs font-bold text-stone-500 block mb-2">Savanna Athletic Accessory:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'headband', label: 'Sports Headband', icon: '🔴' },
                { id: 'sunglasses', label: 'Cool Sunglasses', icon: '🕶️' },
              ].map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => setForm({ ...form, accessory: acc.id })}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    form.accessory === acc.id
                      ? 'bg-forest-800 text-white border-forest-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span>{acc.icon}</span>
                  <span>{acc.label}</span>
                </button>
              ))}
            </div>
          </div>

          <CoachTrompo context="general" />
        </div>

        {/* Right 7 Cols: Biometrics Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="font-extrabold text-lg text-charcoal pb-3 border-b border-stone-100">
            Biometric Registration & Goals
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1">Elephant Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-semibold text-sm text-charcoal focus:ring-2 focus:ring-forest-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1">Age (Years)</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-semibold text-sm text-charcoal focus:ring-2 focus:ring-forest-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1">Current Mass (kg)</label>
                <input
                  type="number"
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-semibold text-sm text-charcoal focus:ring-2 focus:ring-forest-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1">Target Mass (kg)</label>
                <input
                  type="number"
                  value={form.targetWeight}
                  onChange={(e) => setForm({ ...form, targetWeight: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-semibold text-sm text-charcoal focus:ring-2 focus:ring-forest-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1">Height (Meters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-semibold text-sm text-charcoal focus:ring-2 focus:ring-forest-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1">Gender / Herd Role</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-semibold text-sm text-charcoal focus:ring-2 focus:ring-forest-500 focus:outline-none"
                >
                  <option value="Bull">Bull (Heavy Trunk Specialist)</option>
                  <option value="Cow">Cow (Herd Matriarch / Stamina Trekker)</option>
                  <option value="Calf">Calf (Grass Cadet)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1">Daily Activity Level</label>
                <select
                  value={form.activityLevel}
                  onChange={(e) => setForm({ ...form, activityLevel: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-semibold text-sm text-charcoal focus:ring-2 focus:ring-forest-500 focus:outline-none"
                >
                  <option value="Sedentary">Sedentary (Baobab Shade Connoisseur)</option>
                  <option value="Moderately Active">Moderately Active (Daily Savanna Trekker)</option>
                  <option value="High Intensity">High Intensity (Acacia Powerlifter)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-500 block mb-1">Primary Fitness Goal</label>
              <input
                type="text"
                value={form.activeGoal}
                onChange={(e) => setForm({ ...form, activeGoal: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-semibold text-sm text-charcoal focus:ring-2 focus:ring-forest-500 focus:outline-none"
                placeholder="e.g. Reach 20,000 steps & moderate peanut snacking"
              />
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-2xl bg-forest-800 hover:bg-forest-900 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Biometric Profile</span>
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}
