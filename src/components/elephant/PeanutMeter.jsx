import React from 'react';
import { AlertTriangle, ShieldCheck, Flame, Utensils } from 'lucide-react';
import { PEANUT_WARNINGS } from '../../data/quotes';

/**
 * PeanutMeter - Humorous, real-time peanut saturation gauge with escalating warnings
 */
export default function PeanutMeter({
  percentage = 68,
  peanutKg = 1.2,
  onFeedGrass = () => {},
  onTriggerOverload = () => {}
}) {
  // Find current warning level
  const warning = PEANUT_WARNINGS.find(w => percentage >= w.min && percentage <= w.max) || PEANUT_WARNINGS[0];

  // Dynamic styling based on danger
  const isCritical = percentage >= 90;
  const isHigh = percentage >= 70;
  const isModerate = percentage >= 36;

  const barColor = isCritical 
    ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 animate-pulse'
    : isHigh 
    ? 'bg-gradient-to-r from-amber-400 to-orange-500'
    : isModerate
    ? 'bg-gradient-to-r from-emerald-500 to-amber-400'
    : 'bg-gradient-to-r from-forest-500 to-emerald-400';

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-500 ${
      isCritical 
        ? 'bg-red-50/90 border-red-300 shadow-peanut-glow' 
        : isHigh 
        ? 'bg-amber-50/80 border-amber-300' 
        : 'bg-white/80 border-stone-200/80'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2.5">
          <span className="text-2xl animate-bounce">🥜</span>
          <div>
            <h4 className="font-bold text-charcoal text-base flex items-center gap-1.5">
              Peanut Meter
              {isCritical ? (
                <span className="px-2 py-0.5 text-xs font-extrabold uppercase tracking-wider bg-red-600 text-white rounded-full animate-ping">
                  CRITICAL
                </span>
              ) : isHigh ? (
                <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-orange-500 text-white rounded-full">
                  HIGH
                </span>
              ) : null}
            </h4>
            <p className="text-xs text-stone-500">
              Today: <strong className="text-stone-800">{peanutKg} kg</strong> consumed
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className={`text-2xl font-extrabold tracking-tight ${
            isCritical ? 'text-red-600' : isHigh ? 'text-amber-600' : 'text-forest-700'
          }`}>
            {percentage}%
          </span>
          <p className="text-[11px] text-stone-400 font-medium">Daily Tolerance</p>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-4 bg-stone-200/80 rounded-full overflow-hidden p-0.5 shadow-inner relative">
        {/* Threshold indicator line at 80% */}
        <div className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-red-400/80 z-10" title="Safe Limit" />
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Warning Box */}
      <div className={`mt-3 p-3 rounded-xl flex items-start gap-2.5 text-xs leading-relaxed transition-colors ${
        isCritical 
          ? 'bg-red-100 text-red-900 border border-red-200' 
          : isHigh 
          ? 'bg-amber-100 text-amber-900 border border-amber-200' 
          : 'bg-forest-50 text-forest-900 border border-forest-100'
      }`}>
        {isCritical ? (
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5 animate-bounce" />
        ) : isHigh ? (
          <Flame className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        ) : (
          <ShieldCheck className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
        )}
        <div>
          <strong className="font-semibold block">{warning.title}:</strong>
          {warning.message}
        </div>
      </div>

      {/* Countermeasure Actions */}
      <div className="mt-3 flex items-center justify-between gap-2 pt-1 border-t border-stone-100">
        <button
          onClick={onFeedGrass}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-700 hover:bg-forest-800 active:scale-95 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          title="Consuming fibrous grass dilutes the peanut saturation"
        >
          <span>🌿</span> Feed Counter-Grass (-10%)
        </button>

        <button
          onClick={onTriggerOverload}
          className="text-[11px] font-medium text-stone-500 hover:text-red-600 underline transition-colors"
          title="Demo feature: instantly simulate peanut overload reaction"
        >
          Simulate Overload 🚨
        </button>
      </div>
    </div>
  );
}
