export const COACH_QUOTES = [
  {
    text: "You don't need motivation. You need fewer peanuts.",
    context: "peanuts",
    mood: "stern"
  },
  {
    text: "Only 1,568 steps left to 20,000. That is basically two elephant-sized strolls around the baobab.",
    context: "steps",
    mood: "encouraging"
  },
  {
    text: "Your trunk is stronger than your excuses. Lift that acacia log!",
    context: "workout",
    mood: "hype"
  },
  {
    text: "Yes, that number is 5,200 kg. You are an elephant. Own the mass, tone the glutes.",
    context: "weight",
    mood: "philosophical"
  },
  {
    text: "Time to move. The savanna isn't going to walk itself.",
    context: "general",
    mood: "action"
  },
  {
    text: "Every journey begins with one step. Even when that step creates a 2.4 magnitude tremor.",
    context: "steps",
    mood: "inspirational"
  },
  {
    text: "Consider replacing two handfuls of peanuts with a succulent bundle of fresh river grass.",
    context: "nutrition",
    mood: "diplomatic"
  },
  {
    text: "Rest is part of the regimen. A 20-minute mud soak restores your dermatological shine.",
    context: "recovery",
    mood: "zen"
  },
  {
    text: "Don't look at me like that. I saw you looking at that extra bucket of salted nuts.",
    context: "peanuts",
    mood: "suspicious"
  }
];

export const PEANUT_WARNINGS = [
  { min: 0, max: 35, title: "Virtuous Grazing", message: "Sensible snacking. Coach Trompo is quietly nod-approving.", tone: "safe" },
  { min: 36, max: 70, title: "Peanut Tension", message: "Peanut intake is escalating. Consider a fiber countermeasure.", tone: "caution" },
  { min: 71, max: 89, title: "High Peanut Density", message: "Your elephant has entered dangerous peanut territory. Put down the bucket!", tone: "warning" },
  { min: 90, max: 100, title: "CRITICAL PEANUT OVERLOAD", message: "Maximum peanut saturation reached! Emergency grass intervention required!", tone: "danger" },
];
