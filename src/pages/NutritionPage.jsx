import React, { useState } from 'react';
import { 
  Apple, 
  Utensils, 
  Flame, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  Plus,
  RotateCcw
} from 'lucide-react';
import ElephantVisualizer from '../components/elephant/ElephantVisualizer';
import ElephantEnvironment from '../components/elephant/ElephantEnvironment';
import PeanutMeter from '../components/elephant/PeanutMeter';
import CoachTrompo from '../components/coach/CoachTrompo';
import { AVAILABLE_FOODS } from '../data/initialData';
import { useElephantFit } from '../context/ElephantFitContext';
import { sounds } from '../audio/soundEffects';

export default function NutritionPage() {
  const { 
    elephant, 
    feedElephant, 
    setElephantState 
  } = useElephantFit();

  const [lastFedFood, setLastFedFood] = useState(null);

  const mealSchedule = [
    {
      meal: "Breakfast (06:00 - 08:30)",
      description: "Morning carbohydrate and hydration primer",
      items: [
        { name: "Sweet Bananas", qty: "35 kg", calories: "4,200 kcal", icon: "🍌", foodId: "banana" },
        { name: "Fresh Savanna Grass", qty: "50 kg", calories: "3,100 kcal", icon: "🌿", foodId: "grass" },
      ]
    },
    {
      meal: "Lunch (12:00 - 14:00)",
      description: "High-roughage sustained digestion block",
      items: [
        { name: "Acacia Foliage", qty: "45 kg", calories: "3,800 kcal", icon: "🌾", foodId: "acacia" },
        { name: "Sweet Sugarcane Stalks", qty: "20 kg", calories: "2,900 kcal", icon: "🎋", foodId: "sugarcane" },
      ]
    },
    {
      meal: "Snack & Restraint Challenge (16:30)",
      description: "Careful legume surveillance zone",
      items: [
        { name: "Salted Peanuts (Danger Zone)", qty: "1.2 kg", calories: "6,800 kcal", icon: "🥜", foodId: "peanuts" },
      ]
    },
    {
      meal: "Dinner (19:00 - 21:00)",
      description: "Overnight cellulose fermentation balance",
      items: [
        { name: "Riverbed Grasses", qty: "60 kg", calories: "3,700 kcal", icon: "🌿", foodId: "grass" },
        { name: "Forest Apples & Berries", qty: "25 kg", calories: "2,100 kcal", icon: "🍎", foodId: "apple" },
      ]
    },
  ];

  const handleFeed = (foodItem) => {
    setLastFedFood(foodItem);
    feedElephant(foodItem);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
            <Apple className="w-3.5 h-3.5" />
            <span>Megafauna Herbivorous Nutrition OS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-forest-950 tracking-tight">
            Diet & Feeding Station
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Feed your elephant directly with live trunk-eating animations. Balance high-fiber grasses against the irresistible gravitational pull of peanuts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-white border border-stone-200 rounded-2xl shadow-sm flex items-center gap-3">
            <span className="text-2xl">🧺</span>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Daily Intake</span>
              <span className="text-sm font-extrabold text-charcoal">~180 kg Biomass</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Stage + Feeding Pantry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Cols: Interactive Feeding Stage & Trunk Interaction */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div>
              <h3 className="text-xl font-extrabold text-charcoal">
                Interactive Feeding Enclosure
              </h3>
              <p className="text-xs text-stone-500">
                Click any food below to watch the elephant pick it up with its trunk and eat!
              </p>
            </div>

            {lastFedFood && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 animate-pulse">
                Just Fed: {lastFedFood.name}
              </span>
            )}
          </div>

          {/* Elephant Viewport in Nutrition Clearing */}
          <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-stone-200 relative shadow-inner">
            <ElephantEnvironment type="nutrition" className="w-full h-full">
              <ElephantVisualizer
                state={elephant.currentState}
                accessory={elephant.accessory}
                size="large"
                customFood={lastFedFood}
              />
            </ElephantEnvironment>
          </div>

          {/* Interactive Feeding Tray */}
          <div>
            <span className="text-xs font-bold text-stone-500 block mb-3">
              Savanna Feeding Tray (Click to Feed Trunk):
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVAILABLE_FOODS.map((food) => {
                const isPeanut = food.id === 'peanuts';
                return (
                  <button
                    key={food.id}
                    onClick={() => handleFeed(food)}
                    className={`p-3.5 rounded-2xl border text-left transition-all active:scale-95 flex flex-col justify-between group ${
                      isPeanut 
                        ? 'bg-red-50/70 hover:bg-red-100/90 border-red-200 hover:border-red-400' 
                        : 'bg-stone-50 hover:bg-forest-50 border-stone-200 hover:border-forest-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl group-hover:scale-110 transition-transform">{food.icon}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isPeanut ? 'bg-red-200 text-red-800' : 'bg-forest-100 text-forest-800'
                      }`}>
                        {food.serving}
                      </span>
                    </div>

                    <div className="mt-2">
                      <h4 className="font-bold text-sm text-charcoal">{food.name}</h4>
                      <p className="text-[11px] text-stone-500">{food.description}</p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-stone-600">+{food.calories} kcal</span>
                      <span className={isPeanut ? 'text-red-600 font-bold' : 'text-emerald-700 font-bold'}>
                        {isPeanut ? '+25% Peanuts' : `${food.peanutRating}% Peanuts`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right 5 Cols: Peanut Meter & Daily Meals Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Real-Time Humorous Peanut Meter */}
          <PeanutMeter
            percentage={elephant.peanutMeterPercent}
            peanutKg={elephant.peanutConsumptionKg}
            onFeedGrass={() => handleFeed(AVAILABLE_FOODS.find(f => f.id === 'grass'))}
            onTriggerOverload={() => setElephantState('peanut_overload', 5000)}
          />

          {/* Coach Trompo Nutrition Speech */}
          <CoachTrompo context="nutrition" />

          {/* Daily Elephant Meal Schedule */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-charcoal text-base flex items-center gap-2">
              <span>🌿</span>
              <span>Daily Meal Breakdown</span>
            </h3>

            <div className="space-y-4">
              {mealSchedule.map((schedule, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-forest-950">{schedule.meal}</h4>
                    <span className="text-[10px] text-stone-400 font-medium">Logged</span>
                  </div>
                  <p className="text-[11px] text-stone-500 italic">{schedule.description}</p>

                  <div className="space-y-1.5 pt-1">
                    {schedule.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-stone-200">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-semibold text-charcoal">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-stone-700 block">{item.qty}</span>
                          <span className="text-[10px] text-stone-400">{item.calories}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
