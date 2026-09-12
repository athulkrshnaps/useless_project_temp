import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Sparkles, 
  Footprints, 
  Flame, 
  Glasses,
  CheckCircle2
} from 'lucide-react';
import ElephantVisualizer from '../components/elephant/ElephantVisualizer';
import ElephantEnvironment from '../components/elephant/ElephantEnvironment';
import CoachTrompo from '../components/coach/CoachTrompo';
import { useElephantFit } from '../context/ElephantFitContext';
import { sounds } from '../audio/soundEffects';

export default function LeaderboardPage() {
  const { leaderboard, elephant } = useElephantFit();
  const [selectedElephant, setSelectedElephant] = useState(leaderboard[0]);

  const handleSelect = (item) => {
    sounds.playChime();
    setSelectedElephant(item);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Savanna Herd Rankings</span>
          </div>
          <h1 className="text-3xl font-extrabold text-forest-950 tracking-tight">
            The Herd Leaderboard
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Meet the most disciplined megafauna on the savanna. Ranked by daily steps, caloric output, and peanut restraint.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2">
          <span>👑</span>
          <span>Leader: Jumbo (94 Score)</span>
        </div>
      </div>

      {/* Podium Top 3 Visual Display */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-[#183829] to-[#0c2016] text-white shadow-xl relative overflow-hidden">
        <div className="text-center mb-6">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">The Savanna Podium</span>
          <h3 className="text-2xl font-extrabold mt-1">Herd Champions</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-4">
          
          {/* Rank 2: Babu */}
          <div 
            onClick={() => handleSelect(leaderboard[1])}
            className="flex flex-col items-center cursor-pointer order-2 sm:order-1 group"
          >
            <div className="w-28 h-28 relative flex items-center justify-center group-hover:scale-105 transition-transform">
              <ElephantVisualizer state="happy" accessory="towel" size="small" showShadow={false} />
            </div>
            <div className="w-full p-4 rounded-2xl bg-forest-800/80 border border-forest-600/50 text-center space-y-1">
              <span className="text-2xl">🥈</span>
              <h4 className="font-bold text-base text-white">{leaderboard[1].name}</h4>
              <p className="text-xs text-forest-200 font-mono">{leaderboard[1].steps.toLocaleString()} steps</p>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-900 text-amber-300">
                Score {leaderboard[1].score}
              </span>
            </div>
          </div>

          {/* Rank 1: Jumbo (Center, Highest) */}
          <div 
            onClick={() => handleSelect(leaderboard[0])}
            className="flex flex-col items-center cursor-pointer order-1 sm:order-2 group -mt-6"
          >
            <div className="w-36 h-36 relative flex items-center justify-center group-hover:scale-105 transition-transform">
              <ElephantVisualizer state="celebrating" accessory="sunglasses" size="medium" showShadow={false} />
            </div>
            <div className="w-full p-5 rounded-2xl bg-gradient-to-b from-amber-500/30 to-forest-800 border-2 border-amber-400/80 text-center space-y-1 shadow-glow">
              <span className="text-3xl">🥇</span>
              <h4 className="font-extrabold text-lg text-white">{leaderboard[0].name} (You)</h4>
              <p className="text-xs text-amber-200 font-mono font-bold">{leaderboard[0].steps.toLocaleString()} steps</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-400 text-charcoal shadow-sm">
                Score {leaderboard[0].score} • Champion
              </span>
            </div>
          </div>

          {/* Rank 3: Dumbo */}
          <div 
            onClick={() => handleSelect(leaderboard[2])}
            className="flex flex-col items-center cursor-pointer order-3 group"
          >
            <div className="w-28 h-28 relative flex items-center justify-center group-hover:scale-105 transition-transform">
              <ElephantVisualizer state="ear_flaps" accessory="headband" size="small" showShadow={false} />
            </div>
            <div className="w-full p-4 rounded-2xl bg-forest-800/80 border border-forest-600/50 text-center space-y-1">
              <span className="text-2xl">🥉</span>
              <h4 className="font-bold text-base text-white">{leaderboard[2].name}</h4>
              <p className="text-xs text-forest-200 font-mono">{leaderboard[2].steps.toLocaleString()} steps</p>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-900 text-amber-300">
                Score {leaderboard[2].score}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Detailed Herd Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-extrabold text-charcoal text-lg">Herd Standings</h3>
          <span className="text-xs text-stone-500 font-semibold">Updated live via savanna sensory network</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-stone-500 text-xs uppercase font-bold tracking-wider border-b border-stone-200">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Elephant</th>
                <th className="px-6 py-4">Daily Steps</th>
                <th className="px-6 py-4">Fitness Score</th>
                <th className="px-6 py-4">Biometric Mass</th>
                <th className="px-6 py-4">Special Accessory</th>
                <th className="px-6 py-4">Current Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {leaderboard.map((item) => {
                const isUser = item.name === elephant.name;
                return (
                  <tr
                    key={item.rank}
                    onClick={() => handleSelect(item)}
                    className={`hover:bg-forest-50/60 cursor-pointer transition-colors ${
                      isUser ? 'bg-forest-50/40 font-bold' : ''
                    }`}
                  >
                    <td className="px-6 py-4 font-extrabold text-base">
                      {item.badge}
                    </td>
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-forest-700 text-white flex items-center justify-center font-bold text-xs">
                        {item.name.substring(0, 2)}
                      </div>
                      <div>
                        <span className="text-charcoal block">{item.name} {isUser && '(You)'}</span>
                        <span className="text-[11px] text-stone-400 font-normal">{item.streakDays} day streak</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-charcoal">
                      {item.steps.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800">
                        {item.score} / 100
                      </span>
                    </td>
                    <td className="px-6 py-4 text-stone-600">
                      {item.weight.toLocaleString()} kg
                    </td>
                    <td className="px-6 py-4 text-xs text-forest-700 font-semibold">
                      {item.accessory}
                    </td>
                    <td className="px-6 py-4 text-xs text-stone-500 italic">
                      {item.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <CoachTrompo context="general" />

    </div>
  );
}
