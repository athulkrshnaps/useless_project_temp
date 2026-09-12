import React from 'react';

/**
 * ElephantEnvironment - Scenic responsive backdrops matching the elephant's activity
 * Types: 'forest' | 'trail' | 'gym' | 'nutrition' | 'mud' | 'podium'
 */
export default function ElephantEnvironment({ 
  type = 'forest', 
  children, 
  className = '',
  trailProgress = 0 // 0 to 100 for walking trail
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl transition-all duration-700 ${className}`}>
      {/* 1. Forest / Dashboard Atmosphere */}
      {type === 'forest' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#e8f1ec] via-[#f2eee3] to-[#e4eade] pointer-events-none">
          {/* Subtle Sunbeam glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />
          {/* Distant mountains silhouette */}
          <svg className="absolute bottom-0 w-full h-40 text-forest-200/40" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <path d="M0,160 L150,90 L320,150 L500,70 L720,140 L880,100 L1000,160 L1000,200 L0,200 Z" fill="currentColor" />
          </svg>
          {/* Acacia canopy */}
          <svg className="absolute top-0 right-0 w-72 h-44 text-forest-700/10" viewBox="0 0 300 200">
            <ellipse cx="220" cy="50" rx="100" ry="35" fill="currentColor" />
            <ellipse cx="140" cy="65" rx="70" ry="25" fill="currentColor" />
            <path d="M220,80 Q210,130 180,180" stroke="currentColor" strokeWidth="8" fill="none" />
          </svg>
          {/* Ground grassland layer */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#cddbc9] to-transparent" />
        </div>
      )}

      {/* 2. Walking Forest Trail */}
      {type === 'trail' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#eaf2eb] via-[#f7f2e7] to-[#e1dec8] pointer-events-none">
          {/* Cloud drifts */}
          <div className="absolute top-4 left-10 w-28 h-8 bg-white/60 rounded-full blur-sm animate-pulse" />
          <div className="absolute top-8 right-24 w-36 h-10 bg-white/50 rounded-full blur-sm" />
          
          {/* Rolling Savanna Hills */}
          <svg className="absolute bottom-12 w-full h-36 text-[#c7d6bc]" viewBox="0 0 1200 160" preserveAspectRatio="none">
            <path d="M0,80 Q300,10 600,60 T1200,40 L1200,160 L0,160 Z" fill="currentColor" />
          </svg>

          {/* Dirt Trekking Path */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-[#c8b393] border-t-4 border-[#ab9573]/60">
            {/* Trail dashed guide lines */}
            <div className="absolute top-1/2 inset-x-0 border-b-2 border-dashed border-[#b89f78]/80" />
            {/* Pebble textures */}
            <div className="absolute bottom-3 left-1/4 w-3 h-2 rounded-full bg-[#8c7453]/40" />
            <div className="absolute bottom-5 left-2/3 w-4 h-2.5 rounded-full bg-[#8c7453]/40" />
            <div className="absolute top-4 right-1/4 w-2 h-1.5 rounded-full bg-[#8c7453]/40" />
          </div>

          {/* Grass tufts */}
          <div className="absolute bottom-20 left-12 text-forest-700/30 text-lg">🌾🌾</div>
          <div className="absolute bottom-22 right-20 text-forest-700/30 text-xl">🌿🌾</div>
        </div>
      )}

      {/* 3. Savanna Gym Clearing */}
      {type === 'gym' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#e3ede6] via-[#eeeae0] to-[#dfd7c2] pointer-events-none">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-40 bg-amber-200/30 rounded-full blur-3xl" />
          {/* Wooden Weight Rack Silhouette */}
          <div className="absolute bottom-16 left-6 flex items-end space-x-2 opacity-35">
            <div className="w-4 h-28 bg-[#5c4033] rounded-t-sm" />
            <div className="w-16 h-10 bg-[#8b5a2b] rounded-lg border border-[#3e2723]" />
            <div className="w-4 h-28 bg-[#5c4033] rounded-t-sm" />
          </div>
          {/* Acacia Barbell */}
          <div className="absolute bottom-14 right-10 flex items-center opacity-40">
            <div className="w-8 h-16 bg-[#4a2e18] rounded" />
            <div className="w-20 h-4 bg-[#784d28]" />
            <div className="w-8 h-16 bg-[#4a2e18] rounded" />
          </div>
          <div className="absolute bottom-0 inset-x-0 h-16 bg-[#cebfa8] border-t-2 border-[#b5a38a]" />
        </div>
      )}

      {/* 4. Nutrition / Feeding Station */}
      {type === 'nutrition' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#e6f4ea] via-[#f7f4ea] to-[#e6decb] pointer-events-none">
          <div className="absolute top-6 left-12 text-4xl opacity-15">🎋</div>
          <div className="absolute top-14 right-16 text-4xl opacity-15">🌿</div>
          <div className="absolute bottom-12 right-6 text-5xl opacity-25">🧺</div>
          <div className="absolute bottom-0 inset-x-0 h-16 bg-[#d9cdb8]" />
        </div>
      )}

      {/* 5. Mud Pool Wellness Spa */}
      {type === 'mud' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#dfece6] via-[#dfd4c4] to-[#784928]/40 pointer-events-none">
          {/* Steam / Mist elements */}
          <div className="absolute bottom-24 inset-x-0 flex justify-around opacity-30">
            <div className="w-24 h-12 bg-white rounded-full blur-xl animate-float" />
            <div className="w-32 h-14 bg-white rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }} />
          </div>
          {/* Reeds on border */}
          <div className="absolute bottom-16 left-4 text-3xl opacity-40">🌾🌾</div>
          <div className="absolute bottom-16 right-4 text-3xl opacity-40">🌿🌾</div>
        </div>
      )}

      {/* 6. Herd Champion Podium */}
      {type === 'podium' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#183a2b] via-[#10271d] to-[#0a1812] text-white pointer-events-none">
          <div className="absolute -top-10 inset-x-0 h-40 bg-amber-400/15 blur-3xl" />
          {/* Spotlight beams */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-20 bg-forest-950 border-t-2 border-amber-500/40" />
        </div>
      )}

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
