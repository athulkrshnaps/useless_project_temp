import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function StatCard({
  title,
  value,
  unit = '',
  subtitle = '',
  icon: Icon,
  trend = null, // { value: '+12%', positive: true }
  progress = null, // percentage 0-100
  color = 'forest', // forest, amber, blue, stone
  onClick = null,
  badge = null
}) {
  const colorMap = {
    forest: 'bg-forest-50 text-forest-700 border-forest-200/60',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/60',
    blue: 'bg-sky-50 text-sky-700 border-sky-200/60',
    stone: 'bg-stone-100 text-stone-700 border-stone-200',
  };

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-stone-200/80 shadow-sm hover:shadow-md transition-all ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${colorMap[color] || colorMap.forest}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline space-x-1.5">
        <span className="text-3xl font-extrabold tracking-tight text-charcoal">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-semibold text-stone-500">
            {unit}
          </span>
        )}
      </div>

      {progress !== null && (
        <div className="mt-3">
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                color === 'amber' ? 'bg-amber-500' : 'bg-forest-600'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
        <span>{subtitle}</span>
        {trend && (
          <span className={`inline-flex items-center font-bold ${
            trend.positive ? 'text-forest-700' : 'text-amber-600'
          }`}>
            {trend.positive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {trend.value}
          </span>
        )}
        {badge && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
