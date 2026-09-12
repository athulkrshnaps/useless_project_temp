import React, { useState, useEffect, useRef } from 'react';
import { 
  Footprints, 
  Star, 
  Smile, 
  Volume2, 
  Rotate3d, 
  RotateCcw, 
  Edit3, 
  Sparkles, 
  Flame, 
  Dumbbell, 
  Utensils, 
  Moon, 
  Check, 
  X
} from 'lucide-react';
import Jumbo3DViewer from '../components/elephant/Jumbo3DViewer';
import WorkoutDemonstrationModal from '../components/workouts/WorkoutDemonstrationModal';
import { AVAILABLE_FOODS, CORE_WORKOUTS } from '../data/initialData';
import { useElephantFit } from '../context/ElephantFitContext';
import { sounds } from '../audio/soundEffects';

export default function HomePage() {
  const { 
    elephant, 
    setElephant, 
    addSteps, 
    setElephantState, 
    triggerConfetti, 
    finishWorkout,
    updateProfile,
    showToast
  } = useElephantFit();

  // Angle preset state ('front' | 'perspective' | 'back' | 'side' | 'right' | 'custom')
  const [cameraAngle, setCameraAngle] = useState('perspective');
  
  // Modals & drawers
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: elephant.name || 'Jumbo',
    age: elephant.age || 24,
    weight: elephant.weight || 5200,
    targetWeight: elephant.targetWeight || 5050
  });

  const [feedDrawerOpen, setFeedDrawerOpen] = useState(false);
  const [activeWorkoutDemo, setActiveWorkoutDemo] = useState(null);
  const [feedbackNotice, setFeedbackNotice] = useState(null);
  const [coachMsg, setCoachMsg] = useState(null);
  const coachIndexRef = useRef(0);

  // Context-aware motivational messages from Coach Trompo 🎽
  // Picked based on Jumbo's current stats each cycle
  const getCoachMessages = () => {
    const steps = elephant.currentSteps || 0;
    const peanut = elephant.peanutMeterPercent || 0;
    const fitness = elephant.fitnessScore || 0;
    const state = elephant.currentState;

    // Situation-specific messages take priority
    if (state === 'celebrating') return [
      { text: "YEAAAH! That's what I'm talking about! LEGEND! 🏆", icon: "🎽" },
      { text: "This elephant just broke the savanna record! TRUMPET! 📯", icon: "🏆" },
      { text: "Coach Trompo is CRYING tears of joy right now! 😭🥇", icon: "🎽" },
    ];

    if (state === 'peanut_overload') return [
      { text: "PUT DOWN THE PEANUT BUCKET, JUMBO. Right now. I'm serious. 🥜🚫", icon: "😤" },
      { text: "You've eaten more peanuts than a circus. Not a compliment. 🥜😬", icon: "😤" },
      { text: "Coach Trompo is confiscating the peanuts. For your own good. 🥜", icon: "🎽" },
    ];

    if (state === 'resting') return [
      { text: "Rest is training too! Champions recover like champions. 💤", icon: "🎽" },
      { text: "Even 5-ton athletes need their beauty sleep. Rest up, Jumbo! 😴", icon: "🌙" },
      { text: "Recharging those magnificent muscles. Good call, big fella! ⚡", icon: "🎽" },
    ];

    if (state === 'walking' || state === 'running') return [
      { text: "Those footsteps are SHAKING the savanna! Keep stomping! 🐾", icon: "🎽" },
      { text: "Every step counts! The herd can hear you coming! 💪", icon: "👟" },
      { text: "Look at those legs go! Built different, Jumbo! BUILT. DIFFERENT. 🔥", icon: "🎽" },
    ];

    if (peanut >= 80) return [
      { text: "Ease off the peanuts a little! Some acacia leaves would do wonders. 🌿", icon: "⚠️" },
      { text: "Your peanut meter is screaming. Feed Jumbo some watermelon! 🍉", icon: "😬" },
      { text: "Peanut level critical! Drop and give me 10 squats to burn it off! 🏋️", icon: "🎽" },
    ];

    if (steps >= 18000) return [
      { text: "SO CLOSE to 20,000! Don't you dare stop now! PUSH! 🔥", icon: "🎽" },
      { text: "Final stretch! The savanna finish line is RIGHT THERE! 🏁", icon: "🏃" },
      { text: "Coach Trompo is standing ovation right now. FINISH STRONG! 👏", icon: "🎽" },
    ];

    if (steps >= 15000) return [
      { text: "15,000 steps down! You're in the TOP 1% of elephants worldwide! 🌍", icon: "🎽" },
      { text: "Coach Trompo is genuinely impressed. That's real savanna mileage. 🗺️", icon: "🏆" },
      { text: "Three-quarters done! The watering hole is waiting at 20K! 💧", icon: "🎽" },
    ];

    if (steps >= 10000) return [
      { text: "HALFWAY! 10,000 steps! Jumbo is officially an athlete! 🐘💪", icon: "🎽" },
      { text: "Double digits in the thousands! Coach Trompo approves! ✅", icon: "🎽" },
      { text: "10K steps is no joke for a 5-ton legend. Respect! 🤝", icon: "🏆" },
    ];

    if (steps < 3000) return [
      { text: "Come on Jumbo, the savanna won't walk itself! Let's get moving! 🚶", icon: "🎽" },
      { text: "Coach Trompo's whistle is ready. Time to start those steps! 📣", icon: "🎽" },
      { text: "Even the slowest elephant beats the fastest couch. Get up! 🛋️🚫", icon: "😤" },
      { text: "Jumbo, I see you just standing there. Drop and give me a trunk curl! 💪", icon: "🎽" },
    ];

    if (fitness >= 85) return [
      { text: "Fitness score 85+! You're the pride of the elephant kingdom! 👑", icon: "🏆" },
      { text: "This elephant is the GOAT. Greatest Of All Tuskers. 🐘🐐", icon: "🎽" },
    ];

    // General motivational rotation for normal state
    const general = [
      { text: `Great job, ${elephant.name || 'Jumbo'}! Every rep brings you closer to savanna glory! 💪`, icon: "🎽" },
      { text: "Consistency is king — even elephants earn their stripes one step at a time! 🦓", icon: "🎽" },
      { text: "Remember: you're literally one of the strongest creatures on Earth. ACT LIKE IT! 🌍", icon: "😤" },
      { text: "Coach Trompo's tip: hydrate well! Elephants need 200 litres a day! 💧", icon: "🎽" },
      { text: "The workout session doesn't start when you begin — it starts when you WANT to stop! 🔥", icon: "🎽" },
      { text: "5 tonnes of pure potential. Don't waste a single gram of it today! ⚖️", icon: "🏆" },
      { text: "Did you know? Elephants can smell water from 19 km away. Use that nose — smell victory! 👃", icon: "🐘" },
      { text: "Your trunk is stronger than most Olympic lifters' entire body. Use it! 🪵", icon: "🎽" },
      { text: "No shortcuts to the watering hole, Jumbo. Earn every sip! 💧🏁", icon: "🎽" },
      { text: "Coach Trompo says: a little effort today = a legendary elephant tomorrow! ⭐", icon: "🎽" },
      { text: "The herd is watching. Be the elephant they look up to! 🐘🐘🐘", icon: "👑" },
      { text: "You finished the last workout! The next one is where CHAMPIONS are made. 🏆", icon: "🎽" },
      { text: "Trunk curls, ear flaps, squats — Jumbo does it all. Truly a multi-sport athlete! 🎖️", icon: "🎽" },
      { text: "Progress over perfection. Even Jumbo started with one step! 🐾", icon: "🌱" },
    ];

    return general;
  };

  // Rotate coach message every 7 seconds
  useEffect(() => {
    const rotate = () => {
      const msgs = getCoachMessages();
      coachIndexRef.current = (coachIndexRef.current + 1) % msgs.length;
      setCoachMsg(msgs[coachIndexRef.current]);
    };

    // Show first message immediately
    const msgs = getCoachMessages();
    setCoachMsg(msgs[0]);

    const timer = setInterval(rotate, 7000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elephant.currentState, elephant.currentSteps, elephant.peanutMeterPercent, elephant.fitnessScore]);

  // Angle selection handler
  const handleSelectAngle = (angle) => {
    sounds.playChime();
    setCameraAngle(angle);
  };

  // Sound handler
  const handleHearJumbo = () => {
    if (elephant.currentState === 'celebrating') {
      sounds.playAuthenticTrumpet();
    } else if (elephant.currentState === 'walking') {
      sounds.playFootstepRumble();
    } else {
      sounds.playDeepRumble();
    }
    showToast("🔊 Jumbo Vocalization", "Infrasonic contact rumble resonating across the savanna.", "🐘");
  };

  // Quick Action 1: Take a Walk
  const handleTakeAWalk = () => {
    sounds.playFootstepRumble();
    addSteps(500);
    setElephantState('walking', 3500);
    setElephant(prev => ({
      ...prev,
      energy: Math.max(10, prev.energy - 5),
      mood: "Energetic"
    }));
  };

  // Quick Action 2: Workout
  const handleOpenWorkout = () => {
    if (elephant.peanutMeterPercent >= 85) {
      sounds.playWarning();
      setFeedbackNotice("Jumbo has eaten too many peanuts and feels too lethargic to workout! Feed grass to restore energy.");
      setTimeout(() => setFeedbackNotice(null), 4000);
      return;
    }
    setActiveWorkoutDemo(CORE_WORKOUTS[0]); // Default: Trunk Curls
  };

  // Quick Action 3: Feed
  const handleFeedItem = (food) => {
    sounds.playDeepRumble();
    setElephantState('eating', 3000);

    let newPeanutPercent = elephant.peanutMeterPercent + food.peanutRating;
    newPeanutPercent = Math.max(10, Math.min(100, newPeanutPercent));

    let newMood = food.moodEffect;
    let notice = food.message;

    if (food.id === 'peanuts' && newPeanutPercent >= 85) {
      sounds.playWarning();
      newMood = "Lazy";
      notice = "Jumbo, that's enough peanuts! The peanut meter reached " + newPeanutPercent + "%. Jumbo is now too full to exercise.";
      setElephantState('peanut_overload', 4000);
    }

    setElephant(prev => ({
      ...prev,
      peanutMeterPercent: newPeanutPercent,
      peanutConsumptionKg: food.id === 'peanuts' ? +(prev.peanutConsumptionKg + 0.3).toFixed(1) : prev.peanutConsumptionKg,
      mood: newMood,
      energy: Math.min(100, prev.energy + (food.id === 'peanuts' ? -10 : 10))
    }));

    setFeedbackNotice(notice);
    setTimeout(() => setFeedbackNotice(null), 4500);
  };

  // Quick Action 4: Rest
  const handleRest = () => {
    sounds.playDeepRumble();
    setElephantState('resting', 5000);
    setElephant(prev => ({
      ...prev,
      energy: 100,
      mood: "Relaxed"
    }));
  };

  // Edit Profile Submit
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: editForm.name,
      age: Number(editForm.age),
      weight: Number(editForm.weight),
      targetWeight: Number(editForm.targetWeight)
    });
    setIsEditModalOpen(false);
    triggerConfetti();
  };

  // Progress Calculations for Left Card
  const stepProgress = Math.min(100, Math.round((elephant.currentSteps / 20000) * 100));
  const fitnessScoreProgress = Math.min(100, elephant.fitnessScore || 68);
  const peanutProgress = Math.min(100, elephant.peanutMeterPercent || 60);

  // Map angle name to active thumbnail
  const isAngleActive = (preset) => {
    if (preset === 'side' && (cameraAngle === 'side' || cameraAngle === 'left')) return true;
    return cameraAngle === preset;
  };

  const isPeanutOverloaded = elephant.peanutMeterPercent >= 85;

  return (
    <div className="relative w-full overflow-x-hidden bg-[#101b14] text-stone-100 min-h-screen">

      {/* ========================================================= */}
      {/* 1. HERO VIEWPORT: PURE 3D ANIMATED ELEPHANT STAGE         */}
      {/* ========================================================= */}
      <div className="relative w-full h-[620px] sm:h-[720px] lg:h-[780px] overflow-hidden select-none">
        
        {/* Background Savanna Landscape (Photorealistic mountain lake & forest backdrop) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/savanna-backdrop.jpg')` }}
        >
          {/* Subtle gradient vignette to blend top nav and bottom controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* --- CENTER: AUTHENTIC 3D ANIMATED ELEPHANT ON CIRCULAR STONE TURNTABLE --- */}
        <div className="absolute inset-0 flex items-center justify-center pt-8 sm:pt-6 pointer-events-auto">
          <Jumbo3DViewer
            state={elephant.currentState}
            height="h-[540px] sm:h-[660px] lg:h-[720px]"
            activeAngle={cameraAngle}
            onAngleChange={(ang) => setCameraAngle(ang)}
          />
        </div>

        {/* --- LEFT FLOATING GLASSMORPIC STATS CARD --- */}
        <div className="absolute top-16 sm:top-20 left-4 sm:left-8 z-20 w-72 sm:w-80 pointer-events-auto">
          <div className="bg-[#14261d]/85 backdrop-blur-md rounded-3xl p-5 border border-white/10 shadow-2xl space-y-4">
            
            {/* Header: Jumbo + Edit Pencil */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 font-sans">
                  <span>{elephant.name || 'Jumbo'}</span>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="p-1 text-stone-400 hover:text-emerald-400 transition-colors"
                    title="Edit Jumbo Profile"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </h2>
              </div>
              <div className="text-xs text-stone-300 font-medium mt-1 flex items-center gap-2">
                <span>Age: {elephant.age || 24}</span>
                <span className="text-stone-500">|</span>
                <span>Weight: {(elephant.weight || 5200).toLocaleString()} kg</span>
              </div>
            </div>

            {/* 4 Metric Rows matching reference mockup */}
            <div className="space-y-2.5">
              
              {/* Row 1: Steps */}
              <div className="p-2.5 rounded-2xl bg-[#1b3327]/60 border border-emerald-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-800/80 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Footprints className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-stone-300 block">Steps</span>
                    <span className="text-xs font-bold text-white font-mono">
                      {elephant.currentSteps.toLocaleString()} <span className="text-stone-400 font-normal">/ 20,000</span>
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-stone-900/60 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${stepProgress}%` }}
                  />
                </div>
              </div>

              {/* Row 2: Fitness Score */}
              <div className="p-2.5 rounded-2xl bg-[#1b3327]/60 border border-emerald-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-800/80 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 text-emerald-300 fill-emerald-300/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-stone-300 block">Fitness Score</span>
                    <span className="text-xs font-bold text-white font-mono">
                      {elephant.fitnessScore || 68} <span className="text-stone-400 font-normal">/ 100</span>
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-stone-900/60 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${fitnessScoreProgress}%` }}
                  />
                </div>
              </div>

              {/* Row 3: Peanut Level */}
              <div className="p-2.5 rounded-2xl bg-[#1b3327]/60 border border-emerald-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-900/70 border border-amber-500/40 flex items-center justify-center shrink-0 text-sm">
                    🥜
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-stone-300 block">Peanut Level</span>
                    <span className={`text-xs font-bold font-mono ${isPeanutOverloaded ? 'text-red-400' : 'text-amber-300'}`}>
                      {elephant.peanutMeterPercent || 60}%
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-stone-900/60 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPeanutOverloaded ? 'bg-red-500' : 'bg-amber-400'
                    }`}
                    style={{ width: `${peanutProgress}%` }}
                  />
                </div>
              </div>

              {/* Row 4: Mood */}
              <div className="p-2.5 rounded-2xl bg-[#1b3327]/60 border border-emerald-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-800/80 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Smile className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-stone-300 block">Mood</span>
                    <span className="text-xs font-bold text-white capitalize">
                      {elephant.mood || 'Happy'}
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-stone-900/60 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: elephant.mood === 'Lazy' ? '30%' : '88%' }}
                  />
                </div>
              </div>

            </div>

            {/* ── Coach Trompo Motivational Bubble ── */}
            {coachMsg && (
              <div className="mt-2 p-3 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-[#0f1f14]/80 border border-emerald-600/35 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent pointer-events-none" />
                <div className="flex items-start gap-2 relative">
                  <div className="w-7 h-7 rounded-full bg-emerald-700/80 border border-emerald-400/50 flex items-center justify-center shrink-0 text-sm shadow mt-0.5">
                    {coachMsg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[9px] font-extrabold tracking-widest uppercase text-emerald-400">Coach Trompo</span>
                      <span className="flex gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-100 font-medium leading-relaxed">
                      {coachMsg.text}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* --- RIGHT VERTICAL STACK OF 4 ANGLE THUMBNAILS --- */}
        <div className="absolute top-16 sm:top-20 right-4 sm:right-8 z-20 flex flex-col space-y-3 pointer-events-auto">
          
          {/* 1. Front View */}
          <button
            onClick={() => handleSelectAngle('front')}
            className={`relative w-16 h-12 sm:w-20 sm:h-16 rounded-2xl overflow-hidden border-2 transition-all group active:scale-95 shadow-lg ${
              isAngleActive('front')
                ? 'border-emerald-400 ring-2 ring-emerald-400/80 scale-105 shadow-emerald-900/50'
                : 'border-white/20 hover:border-white/60 opacity-80 hover:opacity-100'
            }`}
            title="Front View (0°)"
          >
            <img src="/thumbnails/front.jpg" alt="Front" className="w-full h-full object-cover" />
            <span className="absolute bottom-0.5 inset-x-0 text-center text-[9px] font-bold text-white bg-black/60 backdrop-blur-xs py-0.5">
              Front
            </span>
          </button>

          {/* 2. 3/4 Perspective View */}
          <button
            onClick={() => handleSelectAngle('perspective')}
            className={`relative w-16 h-12 sm:w-20 sm:h-16 rounded-2xl overflow-hidden border-2 transition-all group active:scale-95 shadow-lg ${
              isAngleActive('perspective')
                ? 'border-emerald-400 ring-2 ring-emerald-400/80 scale-105 shadow-emerald-900/50'
                : 'border-white/20 hover:border-white/60 opacity-80 hover:opacity-100'
            }`}
            title="Perspective View (45°)"
          >
            <img src="/thumbnails/perspective.jpg" alt="Perspective" className="w-full h-full object-cover" />
            <span className="absolute bottom-0.5 inset-x-0 text-center text-[9px] font-bold text-white bg-black/60 backdrop-blur-xs py-0.5">
              3/4 Angle
            </span>
          </button>

          {/* 3. Back View */}
          <button
            onClick={() => handleSelectAngle('back')}
            className={`relative w-16 h-12 sm:w-20 sm:h-16 rounded-2xl overflow-hidden border-2 transition-all group active:scale-95 shadow-lg ${
              isAngleActive('back')
                ? 'border-emerald-400 ring-2 ring-emerald-400/80 scale-105 shadow-emerald-900/50'
                : 'border-white/20 hover:border-white/60 opacity-80 hover:opacity-100'
            }`}
            title="Back View (180°)"
          >
            <img src="/thumbnails/back.jpg" alt="Back" className="w-full h-full object-cover" />
            <span className="absolute bottom-0.5 inset-x-0 text-center text-[9px] font-bold text-white bg-black/60 backdrop-blur-xs py-0.5">
              Back
            </span>
          </button>

          {/* 4. Side Profile View */}
          <button
            onClick={() => handleSelectAngle('side')}
            className={`relative w-16 h-12 sm:w-20 sm:h-16 rounded-2xl overflow-hidden border-2 transition-all group active:scale-95 shadow-lg ${
              isAngleActive('side')
                ? 'border-emerald-400 ring-2 ring-emerald-400/80 scale-105 shadow-emerald-900/50'
                : 'border-white/20 hover:border-white/60 opacity-80 hover:opacity-100'
            }`}
            title="Side Profile (90°)"
          >
            <img src="/thumbnails/side.jpg" alt="Side" className="w-full h-full object-cover" />
            <span className="absolute bottom-0.5 inset-x-0 text-center text-[9px] font-bold text-white bg-black/60 backdrop-blur-xs py-0.5">
              Side
            </span>
          </button>

        </div>

        {/* --- BOTTOM LEFT: HEAR JUMBO BUTTON --- */}
        <div className="absolute bottom-6 left-4 sm:left-8 z-20 pointer-events-auto">
          <button
            onClick={handleHearJumbo}
            className="flex items-center space-x-2 bg-[#14261d]/85 hover:bg-[#1b3327] backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-white text-xs font-bold shadow-xl transition-all active:scale-95"
            title="Listen to low-frequency infrasonic chest rumble"
          >
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>Hear Jumbo</span>
          </button>
        </div>

        {/* --- BOTTOM CENTER: 360° TURNTABLE CONTROLS & 5 PRESET BUTTONS --- */}
        <div className="absolute bottom-5 inset-x-0 z-20 flex flex-col items-center space-y-2.5 pointer-events-auto">
          
          {/* 360° indicator badge matching mockup */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1.5 text-white text-xs sm:text-sm font-bold bg-black/45 backdrop-blur-sm px-3.5 py-1 rounded-full border border-white/10">
              <Rotate3d className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-sm sm:text-base font-extrabold tracking-tight">360°</span>
            </div>
            <span className="text-[11px] sm:text-xs text-stone-200 mt-0.5 drop-shadow font-medium">
              Drag to rotate Jumbo from every angle.
            </span>
          </div>

          {/* 5 Preset Buttons matching reference mockup */}
          <div className="flex items-center space-x-2 sm:space-x-3 bg-black/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 shadow-2xl">
            
            {/* Front */}
            <button
              onClick={() => handleSelectAngle('front')}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isAngleActive('front')
                  ? 'bg-emerald-950/80 text-white border border-emerald-400 shadow-md ring-1 ring-emerald-400/50'
                  : 'text-stone-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              <span>🐘</span>
              <span>Front</span>
            </button>

            {/* Back */}
            <button
              onClick={() => handleSelectAngle('back')}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isAngleActive('back')
                  ? 'bg-emerald-950/80 text-white border border-emerald-400 shadow-md ring-1 ring-emerald-400/50'
                  : 'text-stone-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              <span>🐘</span>
              <span>Back</span>
            </button>

            {/* Left */}
            <button
              onClick={() => handleSelectAngle('left')}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isAngleActive('left')
                  ? 'bg-emerald-950/80 text-white border border-emerald-400 shadow-md ring-1 ring-emerald-400/50'
                  : 'text-stone-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              <span>🐘</span>
              <span>Left</span>
            </button>

            {/* Right */}
            <button
              onClick={() => handleSelectAngle('right')}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isAngleActive('right')
                  ? 'bg-emerald-950/80 text-white border border-emerald-400 shadow-md ring-1 ring-emerald-400/50'
                  : 'text-stone-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              <span>🐘</span>
              <span>Right</span>
            </button>

            {/* Reset */}
            <button
              onClick={() => handleSelectAngle('perspective')}
              className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isAngleActive('perspective')
                  ? 'bg-emerald-950/80 text-white border border-emerald-400'
                  : 'text-stone-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Reset to 3/4 Perspective"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

          </div>

        </div>

        {/* Feedback Alert Toast */}
        {feedbackNotice && (
          <div className="absolute top-16 inset-x-6 z-40 max-w-md mx-auto p-3 rounded-2xl bg-charcoal/90 text-white text-xs font-semibold shadow-2xl backdrop-blur-md border border-stone-500 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🐘</span>
              <span>{feedbackNotice}</span>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* 2. DIRECT SAVANNA ACTIVITIES                              */}
      {/* ========================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">Direct Savanna Activities</h3>
            <p className="text-xs text-stone-400">Trigger live 3D movements and audio responses from Jumbo</p>
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
            Status: {elephant.currentState || 'Idle'}
          </span>
        </div>

        {/* 4 Interactive Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          
          {/* 1. Take a Walk */}
          <button
            onClick={handleTakeAWalk}
            className="p-4 rounded-3xl bg-[#14261d]/90 hover:bg-[#1b3327] border border-forest-800/60 shadow-lg text-left flex flex-col justify-between group active:scale-95 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl group-hover:scale-110 transition-transform">🚶</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                +500 Steps
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-extrabold text-sm sm:text-base text-white">Take a Walk</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Heavy footstep resonance across savanna.</p>
            </div>
          </button>

          {/* 2. Workout */}
          <button
            onClick={handleOpenWorkout}
            className={`p-4 rounded-3xl border shadow-lg text-left flex flex-col justify-between group active:scale-95 transition-all ${
              isPeanutOverloaded 
                ? 'bg-red-950/40 border-red-800' 
                : 'bg-[#14261d]/90 hover:bg-[#1b3327] border-forest-800/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl group-hover:scale-110 transition-transform">🏋️</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isPeanutOverloaded 
                  ? 'bg-red-900/60 text-red-200 border-red-700' 
                  : 'bg-amber-950 text-amber-300 border-amber-800'
              }`}>
                {isPeanutOverloaded ? 'Too Lazy 🥜' : '6 Exercises'}
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-extrabold text-sm sm:text-base text-white">Workout</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">5-ton squats, log curls & aerobics.</p>
            </div>
          </button>

          {/* 3. Feed */}
          <button
            onClick={() => setFeedDrawerOpen(!feedDrawerOpen)}
            className="p-4 rounded-3xl bg-[#14261d]/90 hover:bg-[#1b3327] border border-forest-800/60 shadow-lg text-left flex flex-col justify-between group active:scale-95 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl group-hover:scale-110 transition-transform">🍌</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                4 Foods
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-extrabold text-sm sm:text-base text-white">Feed Jumbo</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Grass, bananas, sugarcane, peanuts.</p>
            </div>
          </button>

          {/* 4. Rest */}
          <button
            onClick={handleRest}
            className="p-4 rounded-3xl bg-[#14261d]/90 hover:bg-[#1b3327] border border-forest-800/60 shadow-lg text-left flex flex-col justify-between group active:scale-95 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl group-hover:scale-110 transition-transform">😴</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-300 bg-stone-900 px-2 py-0.5 rounded-full border border-stone-700">
                Recovery
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-extrabold text-sm sm:text-base text-white">Rest & Sleep</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Restore energy & trunk relaxation.</p>
            </div>
          </button>

        </div>

        {/* FEEDING DRAWER (If toggled) */}
        {feedDrawerOpen && (
          <div className="p-5 rounded-3xl bg-[#14261d] border border-forest-700 shadow-2xl space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-white">Select Food for Jumbo:</h4>
                <p className="text-xs text-stone-400">Notice the Peanut Meter and comic reaction if overloaded.</p>
              </div>
              <span className="text-xs font-bold text-amber-400">
                Peanut Meter: {elephant.peanutMeterPercent}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AVAILABLE_FOODS.map((food) => (
                <button
                  key={food.id}
                  onClick={() => handleFeedItem(food)}
                  className={`p-3 rounded-2xl border text-left transition-all active:scale-95 ${
                    food.id === 'peanuts'
                      ? 'bg-red-950/40 hover:bg-red-900/50 border-red-800/70'
                      : 'bg-[#1b3327]/60 hover:bg-[#203c2e] border-forest-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{food.icon}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-black/40 text-stone-300 border border-white/10">
                      {food.serving}
                    </span>
                  </div>
                  <div className="mt-2">
                    <h5 className="font-bold text-xs text-white">{food.name}</h5>
                    <p className="text-[10px] text-stone-400">{food.moodEffect} mood</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* 3. EDIT PROFILE MODAL (Triggered by ✏️ on Left Card)      */}
      {/* ========================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#14261d] border border-forest-700 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-400" />
                <span>Edit Jumbo’s Biometrics</span>
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-xl text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Athlete Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-[#1b3327] border border-forest-600 rounded-xl px-3 py-2 text-white font-bold outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Age (Years)</label>
                  <input
                    type="number"
                    value={editForm.age}
                    onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                    className="w-full bg-[#1b3327] border border-forest-600 rounded-xl px-3 py-2 text-white font-bold outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Current Weight (kg)</label>
                  <input
                    type="number"
                    value={editForm.weight}
                    onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                    className="w-full bg-[#1b3327] border border-forest-600 rounded-xl px-3 py-2 text-white font-bold outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Target Weight (kg)</label>
                <input
                  type="number"
                  value={editForm.targetWeight}
                  onChange={(e) => setEditForm({ ...editForm, targetWeight: e.target.value })}
                  className="w-full bg-[#1b3327] border border-forest-600 rounded-xl px-3 py-2 text-white font-bold outline-none focus:border-emerald-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
                >
                  Save Biometrics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. WORKOUT DEMONSTRATION MODAL                            */}
      {/* ========================================================= */}
      {activeWorkoutDemo && (
        <WorkoutDemonstrationModal
          workout={activeWorkoutDemo}
          onClose={() => setActiveWorkoutDemo(null)}
          onFinish={(w, cals) => {
            finishWorkout(w, cals);
            setActiveWorkoutDemo(null);
          }}
        />
      )}

    </div>
  );
}
