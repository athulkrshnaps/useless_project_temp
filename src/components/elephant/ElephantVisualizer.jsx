import React from 'react';

/**
 * ElephantVisualizer - Modeled directly on the Asian elephant from the reference photo:
 * - Iconic twin-domed forehead (two prominent cranial humps)
 * - Deep earthy slate-grey textured leathery skin with warm sunlit highlights
 * - Naturally curved ivory tusks with warm tips
 * - Folded triangular ears matching the photo
 * - Wrinkled trunk capable of curling, lifting, eating, and celebratory trumpeting
 * - Tall savanna grass foreground waving in the breeze
 */
export default function ElephantVisualizer({
  state = 'idle',
  accessory = 'none',
  size = 'medium',
  className = '',
  customFood = null,
  showGrass = true
}) {
  const sizeStyles = {
    small: 'w-36 h-36',
    medium: 'w-64 h-64 sm:w-72 sm:h-72',
    large: 'w-80 h-80 sm:w-96 sm:h-96',
    hero: 'w-72 h-72 sm:w-96 sm:h-96 md:w-[440px] md:h-[480px]'
  };

  const isWalking = state === 'walking' || state === 'running';
  const isSquatting = state === 'squats' || state === 'exercising';
  const isCurling = state === 'trunk_curls';
  const isEating = state === 'eating';
  const isOverload = state === 'peanut_overload';
  const isTired = state === 'tired';
  const isCelebrating = state === 'celebrating';
  const isMudPool = state === 'mud_pool';

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeStyles[size] || sizeStyles.medium} ${className}`}>
      
      {/* Ambient shadow beneath feet */}
      <div 
        className={`absolute bottom-4 w-[75%] h-8 bg-stone-900/25 rounded-full blur-md transition-all duration-500 ${
          isSquatting ? 'scale-110 opacity-40' : isWalking ? 'scale-95 animate-pulse' : 'scale-100 opacity-30'
        }`}
      />

      {/* Floating Indicators */}
      {isCelebrating && (
        <div className="absolute -top-6 text-3xl animate-bounce pointer-events-none z-30">
          ✨ 🎺 ✨
        </div>
      )}
      {isOverload && (
        <div className="absolute -top-6 text-2xl animate-bounce pointer-events-none z-30">
          🥜 ⚠️ 🥜
        </div>
      )}
      {isTired && (
        <div className="absolute -top-4 right-4 text-xl animate-pulse pointer-events-none z-30">
          💧 💦
        </div>
      )}

      {/* Realistic Asian Elephant SVG */}
      <svg
        viewBox="0 0 400 440"
        className={`w-full h-full overflow-visible transition-transform duration-500 ${
          isSquatting ? 'anim-squat' : 
          isOverload ? 'anim-panic' : 
          !isWalking ? 'anim-breath' : ''
        }`}
      >
        <defs>
          {/* Elephant Skin Gradient matching photo (dark slate grey with earthy undertones) */}
          <radialGradient id="asianSkinHead" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#685d56" />
            <stop offset="40%" stopColor="#514742" />
            <stop offset="85%" stopColor="#3d3531" />
            <stop offset="100%" stopColor="#2c2623" />
          </radialGradient>

          <linearGradient id="asianSkinBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5c524c" />
            <stop offset="50%" stopColor="#483f3a" />
            <stop offset="100%" stopColor="#302926" />
          </linearGradient>

          {/* Ivory Tusks Gradient */}
          <linearGradient id="ivoryTusk" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#fffdf7" />
            <stop offset="60%" stopColor="#f4ecd8" />
            <stop offset="100%" stopColor="#dfcfb2" />
          </linearGradient>

          {/* Ear Inner Texture */}
          <linearGradient id="earInnerShade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a403c" />
            <stop offset="70%" stopColor="#3d3430" />
            <stop offset="100%" stopColor="#28221f" />
          </linearGradient>

          {/* Tall Savanna Grass Gradient */}
          <linearGradient id="savannaGrass" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#3b6b3e" />
            <stop offset="60%" stopColor="#689849" />
            <stop offset="100%" stopColor="#a3c467" />
          </linearGradient>
        </defs>

        {/* --- BACK BODY & HINDQUARTERS (From photo perspective: massive body curving back) --- */}
        <g className="hindquarters">
          {/* Main Torso Mass */}
          <ellipse
            cx="245"
            cy="215"
            rx={isOverload ? "135" : "118"}
            ry={isOverload ? "105" : "94"}
            fill="url(#asianSkinBody)"
          />
          {/* Back Spine Ridge Slope */}
          <path
            d="M 180 145 C 230 120 295 140 330 195 C 350 230 340 280 305 310"
            fill="none"
            stroke="#413935"
            strokeWidth="18"
            strokeLinecap="round"
          />
        </g>

        {/* --- HIND LEGS --- */}
        <g className="hind-legs opacity-90">
          <path
            d="M 285 240 L 295 380 Q 295 395 315 395 L 335 395 Q 345 395 345 380 L 335 240 Z"
            fill="url(#asianSkinBody)"
            className={isWalking ? 'anim-leg-2' : ''}
          />
        </g>

        {/* --- FRONT LEGS (Sturdy front pillars matching photo) --- */}
        <g className="front-legs">
          {/* Front Right Leg */}
          <g className={isWalking ? 'anim-leg-2' : ''}>
            <path
              d="M 230 240 L 235 385 Q 235 398 250 398 L 275 398 Q 285 398 285 385 L 275 240 Z"
              fill="url(#asianSkinBody)"
            />
            {/* Toenails */}
            <circle cx="248" cy="395" r="4.5" fill="#f5eedb" />
            <circle cx="262" cy="395" r="4.5" fill="#f5eedb" />
            <circle cx="275" cy="395" r="4.5" fill="#f5eedb" />
          </g>

          {/* Front Left Leg (Dominant foreground leg from photo) */}
          <g className={isWalking ? 'anim-leg-1' : ''}>
            <path
              d="M 155 235 L 150 390 Q 150 402 168 402 L 195 402 Q 205 402 205 390 L 198 235 Z"
              fill="url(#asianSkinHead)"
            />
            {/* Toenails */}
            <circle cx="163" cy="399" r="5" fill="#f5eedb" />
            <circle cx="178" cy="399" r="5" fill="#f5eedb" />
            <circle cx="193" cy="399" r="5" fill="#f5eedb" />

            {/* Muscle wrinkle contours on knee */}
            <path d="M 154 315 Q 175 320 196 315" stroke="#2a2421" strokeWidth="2.5" fill="none" opacity="0.6" />
            <path d="M 155 330 Q 175 335 195 330" stroke="#2a2421" strokeWidth="2" fill="none" opacity="0.5" />
          </g>
        </g>

        {/* --- HEAD WITH ICONIC ASIAN ELEPHANT TWIN CRANIAL DOMES --- */}
        <g className="head-structure">
          
          {/* Main Skull Mass */}
          <path
            d="M 115 155 
               C 105 100, 145 68, 172 72 
               C 186 74, 194 88, 200 88 
               C 206 88, 214 74, 228 72 
               C 255 68, 295 100, 285 155 
               C 280 205, 235 235, 200 235 
               C 165 235, 120 205, 115 155 Z"
            fill="url(#asianSkinHead)"
          />

          {/* Left Cranial Dome Highlight (Forehead bump 1 from photo) */}
          <ellipse
            cx="168"
            cy="92"
            rx="28"
            ry="24"
            fill="#756961"
            opacity="0.55"
          />
          {/* Right Cranial Dome Highlight (Forehead bump 2 from photo) */}
          <ellipse
            cx="232"
            cy="92"
            rx="28"
            ry="24"
            fill="#756961"
            opacity="0.55"
          />

          {/* Temporal depression between the two domes */}
          <path
            d="M 194 78 Q 200 115 200 145"
            stroke="#29231f"
            strokeWidth="3.5"
            fill="none"
            opacity="0.7"
          />

          {/* --- EARS (Folded, triangular Asian elephant ears matching photo) --- */}
          {/* Left Ear */}
          <g className={`left-ear ${isWalking ? 'anim-ear' : ''}`}>
            <path
              d="M 125 125 
                 C 80 110, 65 145, 68 185 
                 C 70 215, 95 235, 120 215 
                 C 130 195, 135 155, 125 125 Z"
              fill="url(#earInnerShade)"
            />
            {/* Ear Fold Contour along top */}
            <path
              d="M 125 125 Q 85 120 72 155"
              stroke="#544843"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Right Ear */}
          <g className={`right-ear ${isWalking ? 'anim-ear' : ''}`}>
            <path
              d="M 275 125 
                 C 320 110, 335 145, 332 185 
                 C 330 215, 305 235, 280 215 
                 C 270 195, 265 155, 275 125 Z"
              fill="url(#earInnerShade)"
            />
            {/* Ear Fold Contour along top */}
            <path
              d="M 275 125 Q 315 120 328 155"
              stroke="#544843"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* --- TUSKS (Naturally curved ivory matching the photo) --- */}
          {/* Right Tusk (Curving forward and inward) */}
          <path
            d="M 235 225 Q 265 245 258 268 Q 235 260 226 230 Z"
            fill="url(#ivoryTusk)"
            stroke="#cfbfa0"
            strokeWidth="1"
          />
          {/* Left Tusk (Prominent curved ivory tusk from photo) */}
          <path
            d="M 165 225 Q 135 245 142 268 Q 165 260 174 230 Z"
            fill="url(#ivoryTusk)"
            stroke="#cfbfa0"
            strokeWidth="1"
          />

          {/* --- TRUNK ARTICULATION --- */}
          <g className={`trunk-root ${
            isCurling ? 'anim-trunk-curl' : 
            isCelebrating ? 'anim-trunk-celebrate' : 
            isEating ? 'anim-trunk-eat' : 
            isWalking ? 'anim-trunk-swing' : ''
          }`}>
            {isCurling ? (
              // Trunk tightly curled lifting 150 kg acacia log
              <g id="asian-trunk-curl">
                <path
                  d="M 180 200 
                     C 165 240, 150 285, 175 315 
                     C 200 335, 240 320, 235 285 
                     C 230 255, 195 255, 190 275"
                  fill="none"
                  stroke="url(#asianSkinHead)"
                  strokeWidth="28"
                  strokeLinecap="round"
                />
                {/* Acacia Gym Log */}
                <g transform="translate(165, 275) rotate(-10)">
                  <rect x="-10" y="-12" width="85" height="26" rx="6" fill="#6d4220" stroke="#543114" strokeWidth="2" />
                  <ellipse cx="-10" cy="1" rx="6" ry="13" fill="#8c582c" />
                  <ellipse cx="75" cy="1" rx="6" ry="13" fill="#b0743e" />
                  <text x="32" y="5" fontSize="10" fill="#fef08a" fontWeight="bold" textAnchor="middle">150 KG</text>
                </g>
              </g>
            ) : isCelebrating ? (
              // Trunk raised high in triumph!
              <g id="asian-trunk-celebrate">
                <path
                  d="M 195 200 
                     C 180 160, 160 110, 175 65 
                     C 185 40, 220 35, 228 60 
                     C 232 80, 215 105, 202 120"
                  fill="none"
                  stroke="url(#asianSkinHead)"
                  strokeWidth="26"
                  strokeLinecap="round"
                />
                <circle cx="215" cy="45" r="7" fill="none" stroke="#eab308" strokeWidth="2.5" className="animate-ping" />
                <circle cx="228" cy="35" r="10" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.8" />
              </g>
            ) : isTired ? (
              // Drooping exhausted trunk touching the grass
              <g id="asian-trunk-tired">
                <path
                  d="M 185 200 
                     C 185 250, 190 320, 185 390 
                     C 185 405, 215 405, 215 390 
                     C 215 320, 215 250, 215 200"
                  fill="url(#asianSkinHead)"
                />
              </g>
            ) : (
              // Natural forward curl matching the reference picture!
              <g id="asian-trunk-natural">
                <path
                  d="M 182 200 
                     C 178 245, 175 295, 185 335 
                     C 192 360, 218 360, 225 335 
                     C 230 310, 212 285, 200 270 
                     C 192 255, 198 220, 218 200 Z"
                  fill="url(#asianSkinHead)"
                />
                {/* Horizontal skin wrinkle rings across trunk (from photo) */}
                <line x1="182" y1="230" x2="216" y2="230" stroke="#29231f" strokeWidth="2" opacity="0.6" />
                <line x1="181" y1="250" x2="212" y2="250" stroke="#29231f" strokeWidth="2" opacity="0.6" />
                <line x1="182" y1="270" x2="208" y2="270" stroke="#29231f" strokeWidth="2" opacity="0.6" />
                <line x1="184" y1="290" x2="214" y2="290" stroke="#29231f" strokeWidth="2" opacity="0.6" />
                <line x1="188" y1="315" x2="222" y2="315" stroke="#29231f" strokeWidth="2" opacity="0.6" />
              </g>
            )}

            {/* Food item held in trunk when eating */}
            {isEating && (
              <g transform="translate(200, 310)">
                <circle cx="0" cy="0" r="16" fill="#ffffff" opacity="0.25" />
                <text x="-10" y="8" fontSize="22">
                  {customFood?.icon || '🌿'}
                </text>
              </g>
            )}
          </g>

          {/* --- EYES (Expressive, wise eyes matching photo) --- */}
          {isOverload ? (
            // Swirling panic eyes
            <g transform="translate(150, 155)">
              <circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#1f2937" strokeWidth="1.5" />
              <path d="M -4 -2 Q 0 -5 4 -2 Q 5 3 0 4 Q -5 2 -2 -2" fill="none" stroke="#dc2626" strokeWidth="2" className="animate-spin origin-center" />
            </g>
          ) : (
            // Warm wise dark eye from photo with subtle brow ridge
            <g transform="translate(148, 154)">
              <ellipse cx="0" cy="0" rx="7" ry="5.5" fill="#1b1715" />
              <circle cx="-1.5" cy="-1.5" r="1.8" fill="#ffffff" />
              {/* Upper brow fold from photo */}
              <path d="M -8 -4 Q 0 -8 8 -3" stroke="#241e1b" strokeWidth="2" fill="none" />
            </g>
          )}

          {/* Right eye */}
          {isOverload ? (
            <g transform="translate(252, 155)">
              <circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#1f2937" strokeWidth="1.5" />
              <path d="M -4 -2 Q 0 -5 4 -2 Q 5 3 0 4 Q -5 2 -2 -2" fill="none" stroke="#dc2626" strokeWidth="2" className="animate-spin origin-center" />
            </g>
          ) : (
            <g transform="translate(252, 154)">
              <ellipse cx="0" cy="0" rx="7" ry="5.5" fill="#1b1715" />
              <circle cx="-1.5" cy="-1.5" r="1.8" fill="#ffffff" />
              <path d="M -8 -3 Q 0 -8 8 -4" stroke="#241e1b" strokeWidth="2" fill="none" />
            </g>
          )}

          {/* Optional accessory: Headband */}
          {accessory === 'headband' && (
            <g transform="translate(125, 80) rotate(-4)">
              <rect x="0" y="0" width="150" height="18" rx="5" fill="#dc2626" />
              <rect x="0" y="6" width="150" height="6" fill="#ffffff" opacity="0.8" />
              <circle cx="75" cy="9" r="5" fill="#eab308" />
            </g>
          )}

          {/* Optional accessory: Sunglasses */}
          {accessory === 'sunglasses' && (
            <g transform="translate(138, 145)">
              <rect x="0" y="0" width="30" height="18" rx="4" fill="#0f172a" />
              <rect x="80" y="0" width="30" height="18" rx="4" fill="#0f172a" />
              <line x1="30" y1="7" x2="80" y2="7" stroke="#0f172a" strokeWidth="3" />
            </g>
          )}

        </g>

        {/* --- FOREGROUND TALL SAVANNA GRASS (Matching user photo exactly) --- */}
        {showGrass && !isMudPool && (
          <g className="foreground-grass">
            {/* Left grass cluster */}
            <path d="M 20 440 Q 50 360 70 340 Q 60 380 40 440 Z" fill="url(#savannaGrass)" opacity="0.9" />
            <path d="M 60 440 Q 90 340 120 320 Q 100 370 80 440 Z" fill="url(#savannaGrass)" />
            <path d="M 100 440 Q 130 350 150 330 Q 130 385 115 440 Z" fill="url(#savannaGrass)" opacity="0.9" />

            {/* Center grass tufts in front of feet */}
            <path d="M 150 440 Q 170 365 190 350 Q 180 395 165 440 Z" fill="url(#savannaGrass)" />
            <path d="M 180 440 Q 210 355 240 340 Q 220 390 200 440 Z" fill="url(#savannaGrass)" opacity="0.95" />
            <path d="M 220 440 Q 250 360 270 345 Q 250 395 235 440 Z" fill="url(#savannaGrass)" />

            {/* Right grass cluster */}
            <path d="M 270 440 Q 300 350 330 330 Q 310 380 290 440 Z" fill="url(#savannaGrass)" opacity="0.9" />
            <path d="M 320 440 Q 350 360 380 340 Q 360 390 340 440 Z" fill="url(#savannaGrass)" />
          </g>
        )}

      </svg>
    </div>
  );
}
