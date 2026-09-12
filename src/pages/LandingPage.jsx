import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  Flame, 
  Compass, 
  Trophy, 
  Dumbbell, 
  Footprints,
  Scale
} from 'lucide-react';
import ElephantVisualizer from '../components/elephant/ElephantVisualizer';
import ElephantEnvironment from '../components/elephant/ElephantEnvironment';
import { useElephantFit } from '../context/ElephantFitContext';
import { sounds } from '../audio/soundEffects';

export default function LandingPage() {
  const { setActiveTab, elephant, setElephantState } = useElephantFit();
  const [heroState, setHeroState] = useState('idle');

  const handleHeroPoseChange = (stateName) => {
    setHeroState(stateName);
    setElephantState(stateName);
    if (stateName === 'celebrating') sounds.playTrumpet();
    else if (stateName === 'walking') sounds.playStomp();
    else if (stateName === 'peanut_overload') sounds.playWarning();
    else sounds.playChime();
  };

  return (
    <div className="min-h-screen bg-[#f9f8f5] text-charcoal pb-24 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-forest-100/60 via-savanna-100/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left: Copy & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest-100/90 border border-forest-300/50 text-forest-800 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                <span>Helping elephants become lighter… one peanut at a time</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-forest-950 leading-[1.12]">
                Fitness, Reimagined for the World’s <span className="text-forest-600 underline decoration-amber-400 decoration-wavy decoration-2">Biggest</span> Athletes.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                A smarter way for elephants to track their weight, improve their fitness, and finally think twice before ordering another bucket of peanuts.
              </p>

              {/* Funny Supporting Quips */}
              <div className="p-3.5 rounded-xl bg-savanna-100/80 border border-savanna-200/90 text-stone-700 text-xs sm:text-sm font-medium italic flex items-center gap-2 max-w-lg mx-auto lg:mx-0">
                <span className="text-xl">🌿</span>
                <span>“Every journey begins with one step. Even when that step weighs 200 kg.”</span>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    sounds.playChime();
                    setActiveTab('profile');
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-forest-800 hover:bg-forest-900 active:scale-95 text-white font-bold text-base shadow-luxury hover:shadow-glow transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Start My Elephant Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    sounds.playChime();
                    setActiveTab('dashboard');
                  }}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-forest-900 font-bold text-base shadow-sm hover:border-forest-400 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Dashboard</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-stone-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  <span>Zero peanut shaming</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  <span>40,000-muscle trunk analytics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  <span>Savanna terrain sync</span>
                </div>
              </div>

            </div>

            {/* Hero Right: Interactive Elephant Character with Floating Stats */}
            <div className="lg:col-span-6 relative flex flex-col items-center">
              
              {/* Floating Stat Card: Steps */}
              <div className="absolute -top-4 -left-4 sm:left-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200/90 shadow-luxury animate-float">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-forest-100 text-forest-700">
                    <Footprints className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">Today's Trek</span>
                    <span className="text-xl font-extrabold text-charcoal">18,432 Steps</span>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card: Fitness Score */}
              <div className="absolute top-24 -right-3 sm:right-2 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200/90 shadow-luxury animate-float" style={{ animationDelay: '1.2s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">Fitness Score</span>
                    <span className="text-xl font-extrabold text-forest-800">78 / 100</span>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card: Weight */}
              <div className="absolute -bottom-4 left-6 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200/90 shadow-luxury animate-float" style={{ animationDelay: '2.3s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-stone-100 text-stone-700">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">Biometric Mass</span>
                    <span className="text-xl font-extrabold text-charcoal">5,200 kg</span>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card: Peanuts Saved */}
              <div className="absolute bottom-6 -right-2 sm:right-6 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200/90 shadow-luxury animate-float" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🥜</span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">Peanuts Saved</span>
                    <span className="text-base font-extrabold text-emerald-700">0.3 kg Restraint</span>
                  </div>
                </div>
              </div>

              {/* Center Stage: Interactive Elephant Visualizer in Forest Atmosphere */}
              <div className="w-full max-w-md h-[400px] sm:h-[440px] relative">
                <ElephantEnvironment type="forest" className="w-full h-full shadow-luxury border border-stone-200/70">
                  <ElephantVisualizer 
                    state={heroState} 
                    accessory="headband" 
                    size="hero" 
                  />
                </ElephantEnvironment>
              </div>

              {/* Interactive Pose Switcher Pills */}
              <div className="mt-6 flex flex-wrap justify-center gap-2 bg-white/80 p-2 rounded-2xl border border-stone-200/80 shadow-sm">
                <span className="text-xs font-bold text-stone-400 flex items-center px-2">Preview State:</span>
                {[
                  { id: 'idle', label: 'Resting', icon: '🪨' },
                  { id: 'walking', label: 'Walking', icon: '🐾' },
                  { id: 'trunk_curls', label: 'Lifting Log', icon: '🪵' },
                  { id: 'celebrating', label: 'Triumph', icon: '🎺' },
                  { id: 'peanut_overload', label: 'Peanut Panic', icon: '🥜' },
                ].map((pose) => (
                  <button
                    key={pose.id}
                    onClick={() => handleHeroPoseChange(pose.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      heroState === pose.id
                        ? 'bg-forest-800 text-white shadow-sm scale-105'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <span>{pose.icon}</span>
                    <span>{pose.label}</span>
                  </button>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* --- HUMOROUS PROOF & BANTER STRIP --- */}
      <section className="bg-forest-900 text-white py-12 border-y border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-forest-800/40 border border-forest-700/40">
              <span className="text-3xl">🥜</span>
              <div>
                <h4 className="font-bold text-base text-forest-100">Zero Peanut Judgment</h4>
                <p className="text-xs text-forest-300 mt-1 leading-relaxed">
                  We won’t judge your bucket consumption. We will simply flash an amber warning when your center of gravity tilts.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-forest-800/40 border border-forest-700/40">
              <span className="text-3xl">🐘</span>
              <div>
                <h4 className="font-bold text-base text-forest-100">Believe In Your Trunk</h4>
                <p className="text-xs text-forest-300 mt-1 leading-relaxed">
                  With over 40,000 distinct muscle fascicles, your trunk is the Swiss Army knife of megafauna fitness.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-forest-800/40 border border-forest-700/40">
              <span className="text-3xl">🌾</span>
              <div>
                <h4 className="font-bold text-base text-forest-100">Touch Real Grass</h4>
                <p className="text-xs text-forest-300 mt-1 leading-relaxed">
                  20,000 steps across the savanna guaranteed to reconnect your soles with ancestral fertile soil.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FEATURE HIGHLIGHTS --- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-forest-600 bg-forest-100 px-3 py-1 rounded-full">
            Engineered For Megafauna
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
            The Complete Wellness OS for Elephants
          </h2>
          <p className="text-base text-stone-600">
            A startup platform designed to solve the authentic day-to-day challenges of modern African and Asian elephants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Trail */}
          <div 
            onClick={() => setActiveTab('activity')}
            className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-charcoal mb-2">Interactive Forest Trail</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Step tracking where your elephant physically marches forward through acacia trails. Reach 20,000 steps and earn the "Touched Grass" badge.
            </p>
          </div>

          {/* Card 2: Interactive Workouts */}
          <div 
            onClick={() => setActiveTab('workouts')}
            className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-charcoal mb-2">Live Trunk & Squat Training</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Real-time interactive workout player. Watch your elephant lift 150 kg logs, perform monumental 5-ton squats, and soak in mineral mud pools.
            </p>
          </div>

          {/* Card 3: Peanut Meter */}
          <div 
            onClick={() => setActiveTab('nutrition')}
            className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-charcoal mb-2">The Patented Peanut Meter</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Feed bananas, grass, and sugarcane with live trunk-eating animations. Push peanut saturation to 90%+ and witness humorous panic reactions!
            </p>
          </div>

        </div>
      </section>

      {/* --- HERD TESTIMONIALS --- */}
      <section className="bg-savanna-100/60 py-16 border-t border-savanna-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
              Endorsed by Top Savanna Athletes
            </h3>
            <p className="text-sm text-stone-600 mt-2">
              Read what verified heavyweights are saying about ElephantFit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-forest-800 text-white font-bold flex items-center justify-center text-sm">
                  JU
                </div>
                <div>
                  <h4 className="font-bold text-sm text-charcoal">Jumbo (24 yrs, Bull)</h4>
                  <p className="text-[11px] text-stone-400">Current Herd Rank #1 • 5,200 kg</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                “Before ElephantFit, I was eating 6 buckets of peanuts before lunch. Now I curl acacia logs daily and my calves are pure marble.”
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center text-sm">
                  BA
                </div>
                <div>
                  <h4 className="font-bold text-sm text-charcoal">Babu (28 yrs, Bull)</h4>
                  <p className="text-[11px] text-stone-400">Herd Rank #2 • 5,410 kg</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                “The mud pool recovery timer changed my life. My dermatological hydration is up 40% and Coach Trompo only yelled at me twice.”
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
                  EL
                </div>
                <div>
                  <h4 className="font-bold text-sm text-charcoal">Ellie (19 yrs, Cow)</h4>
                  <p className="text-[11px] text-stone-400">Herd Rank #4 • 4,750 kg</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                “Finally an app that doesn’t tell me 4,800 kg is overweight. It understands megafauna biology and celebrates my 20,000 steps!”
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- STARTUP FOOTER --- */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center text-xs text-stone-500 space-y-4">
        <div className="flex items-center justify-center space-x-2 font-bold text-forest-900 text-base">
          <span>🐘</span>
          <span>ElephantFit Inc.</span>
        </div>
        <p className="max-w-md mx-auto">
          “Helping elephants become lighter… one peanut at a time.” Intentionally absurd, proudly high performance.
        </p>
        <div className="pt-4 border-t border-stone-200 text-stone-400 flex flex-col sm:flex-row items-center justify-between text-[11px]">
          <span>© 2026 ElephantFit Technologies. Fictional demo for Hackathon.</span>
          <span>No actual elephants were deprived of peanuts during development.</span>
        </div>
      </footer>

    </div>
  );
}
