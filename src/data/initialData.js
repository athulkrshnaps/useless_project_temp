export const INITIAL_ELEPHANT = {
  name: "Jumbo",
  age: 24,
  gender: "Bull",
  weight: 5200,
  targetWeight: 5050,
  height: 3.2,
  activityLevel: "Moderately Active",
  dailyStepGoal: 20000,
  currentSteps: 6432,
  fitnessScore: 68,
  caloriesBurned: 1840,
  targetCalories: 3200,
  peanutConsumptionKg: 0.9,
  peanutThresholdKg: 1.5,
  peanutMeterPercent: 60,
  energy: 85,
  mood: "Happy",
  activeGoal: "Reach 20,000 steps/day & moderate peanut snacking",
  currentState: "idle",
  accessory: "none",
  weightHistory: [
    { date: "Day 1", weight: 5400, label: "5,400 kg" },
    { date: "Day 8", weight: 5350, label: "5,350 kg" },
    { date: "Day 15", weight: 5300, label: "5,300 kg" },
    { date: "Day 22", weight: 5250, label: "5,250 kg" },
    { date: "Today", weight: 5200, label: "5,200 kg" },
  ],
  weeklyActivity: [
    { day: "Mon", steps: 14200, calories: 2100, peanuts: 1.8 },
    { day: "Tue", steps: 16800, calories: 2350, peanuts: 1.4 },
    { day: "Wed", steps: 19500, calories: 2600, peanuts: 0.9 },
    { day: "Thu", steps: 15400, calories: 2200, peanuts: 1.5 },
    { day: "Fri", steps: 17900, calories: 2400, peanuts: 1.1 },
    { day: "Sat", steps: 21200, calories: 2850, peanuts: 0.7 },
    { day: "Sun", steps: 6432, calories: 1840, peanuts: 0.9 },
  ],
};

export const CORE_WORKOUTS = [
  {
    id: "trunk_curls",
    name: "Trunk Curls",
    category: "Trunk Strength",
    durationSec: 30,
    displayDuration: "8 min",
    difficulty: "Medium",
    calories: 380,
    targetReps: 10,
    animationState: "trunk_curls",
    description: "Raise trunk slowly, curl inward lifting 150 kg acacia log, hold, and return.",
    icon: "🪵"
  },
  {
    id: "elephant_squats",
    name: "Elephant Squats",
    category: "Full Body",
    durationSec: 36,
    displayDuration: "12 min",
    difficulty: "Hard",
    calories: 620,
    targetReps: 12,
    animationState: "squats",
    description: "Lower the massive body downward, engage pillar legs, and push back upward.",
    icon: "🏋️"
  },
  {
    id: "ear_flaps",
    name: "Ear Flaps",
    category: "Cardio & Cooling",
    durationSec: 25,
    displayDuration: "6 min",
    difficulty: "Easy",
    calories: 180,
    targetReps: 15,
    animationState: "ear_flaps",
    description: "Open ears outward and close rhythmically to disperse vascular heat.",
    icon: "🍃"
  },
  {
    id: "forest_walk",
    name: "Forest Walk",
    category: "Savanna Cardio",
    durationSec: 40,
    displayDuration: "25 min",
    difficulty: "Medium",
    calories: 850,
    targetReps: 10,
    animationState: "walking",
    description: "Visibly trek through realistic savanna forest environment (1.2 km / 3 km).",
    icon: "🌲"
  },
  {
    id: "distance_walk",
    name: "Long Distance Walk",
    category: "Endurance Migration",
    durationSec: 50,
    displayDuration: "40 min",
    difficulty: "Hard",
    calories: 1400,
    targetReps: 12,
    animationState: "walking",
    description: "Trek across Checkpoint 1, Checkpoint 2, River, and Finish line.",
    icon: "⛰️"
  },
  {
    id: "mud_pool",
    name: "Mud-Pool Recovery",
    category: "Wellness & Spa",
    durationSec: 30,
    displayDuration: "15 min",
    difficulty: "Recovery",
    calories: 90,
    targetReps: 1,
    animationState: "resting",
    description: "Relax in mineral mud pool. Recovery time — even elephants need a break.",
    icon: "🛁"
  }
];

export const WORKOUT_CATEGORIES = [
  { id: "core", name: "Core Workouts", description: "Essential exercises for Jumbo", workouts: CORE_WORKOUTS }
];

export const AVAILABLE_FOODS = [
  {
    id: "banana",
    name: "Banana",
    icon: "🍌",
    serving: "10 kg bunch",
    calories: 1100,
    peanutRating: 0,
    moodEffect: "Happy",
    message: "Jumbo happily savors potassium-rich sweet bananas!"
  },
  {
    id: "grass",
    name: "Grass",
    icon: "🌿",
    serving: "30 kg bundle",
    calories: 850,
    peanutRating: -15,
    moodEffect: "Energetic",
    message: "Jumbo munches wholesome fibrous grass. Peanut meter drops!"
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    icon: "🎋",
    serving: "15 kg stalks",
    calories: 1400,
    peanutRating: 0,
    moodEffect: "Happy",
    message: "Crunchy sweet sugarcane energizes Jumbo for the next workout!"
  },
  {
    id: "peanuts",
    name: "Peanuts",
    icon: "🥜",
    serving: "0.5 kg bucket",
    calories: 2850,
    peanutRating: 25,
    moodEffect: "Lazy",
    message: "Peanut level rising! “Jumbo, that's enough peanuts.”"
  }
];

export const CORE_ACHIEVEMENTS = [
  {
    id: "first_workout",
    title: "First Workout",
    description: "Completed your first live workout demonstration with proper form.",
    icon: "🏆",
    unlocked: true,
    xp: 250
  },
  {
    id: "10k_steps",
    title: "10,000 Steps",
    description: "Crossed the halfway savanna milestone without crushing low shrubs.",
    icon: "🚶",
    unlocked: false,
    xp: 350
  },
  {
    id: "peanut_control",
    title: "Peanut Control",
    description: "Kept peanut consumption under 60% with fibrous grass countermeasures.",
    icon: "🥜",
    unlocked: true,
    xp: 300
  },
  {
    id: "trunk_power",
    title: "Trunk Power",
    description: "Completed full 10 reps of acacia log curls with peak contraction.",
    icon: "💪",
    unlocked: false,
    xp: 400
  },
  {
    id: "herd_champion",
    title: "Herd Champion",
    description: "Achieved the #1 ranking on the savanna fitness leaderboard.",
    icon: "👑",
    unlocked: false,
    xp: 1000
  }
];

export const INITIAL_ACHIEVEMENTS = CORE_ACHIEVEMENTS;

export const INITIAL_GOALS = [
  { id: "goal_steps", title: "Walk 20,000 Steps", current: 6432, target: 20000, unit: "steps", completed: false, category: "Activity" }
];

export const INITIAL_LEADERBOARD = [
  { rank: 1, name: "Jumbo", badge: "🥇", steps: 6432, score: 68, weight: 5200, status: "Active on savanna trail" },
  { rank: 2, name: "Babu", badge: "🥈", steps: 5890, score: 64, weight: 5410, status: "Log curls champion" },
  { rank: 3, name: "Dumbo", badge: "🥉", steps: 4950, score: 58, weight: 4980, status: "Ear flaps recovery" },
];
