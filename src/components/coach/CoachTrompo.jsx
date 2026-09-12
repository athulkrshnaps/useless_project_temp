import React, { useState } from 'react';
import { MessageSquare, Sparkles, ChevronRight, X, RotateCcw } from 'lucide-react';
import { COACH_QUOTES } from '../../data/quotes';
import { sounds } from '../../audio/soundEffects';

export default function CoachTrompo({ context = 'general', className = '' }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [minimized, setMinimized] = useState(false);

  // Filter quotes matching current context if available, otherwise use all
  const filteredQuotes = COACH_QUOTES.filter(q => q.context === context || q.context === 'general');
  const quotes = filteredQuotes.length > 0 ? filteredQuotes : COACH_QUOTES;
  const quote = quotes[currentIdx % quotes.length];

  const handleNextAdvice = () => {
    sounds.playChime();
    setCurrentIdx(prev => (prev + 1) % quotes.length);
  };

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className={`flex items-center space-x-2 px-4 py-2.5 rounded-full bg-forest-900 text-white shadow-xl hover:scale-105 transition-all text-xs font-bold border border-forest-700 ${className}`}
      >
        <span className="text-base">🐘</span>
        <span>Coach Trompo Advice</span>
      </button>
    );
  }

  return (
    <div className={`relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-forest-900 via-forest-950 to-charcoal text-white shadow-xl border border-forest-700/50 overflow-hidden ${className}`}>
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-forest-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-forest-700/80 border border-forest-500/40 flex items-center justify-center text-2xl shadow-inner">
            🐘
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-bold text-sm text-forest-100">Coach Trompo</h4>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-amber-400 text-charcoal tracking-wider">
                Savanna Head Coach
              </span>
            </div>
            <p className="text-[11px] text-forest-300">Elephant Biomechanics & Peanut Restraint</p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={handleNextAdvice}
            className="p-1.5 rounded-lg text-forest-300 hover:text-white hover:bg-forest-800 transition-colors"
            title="Next coaching tip"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMinimized(true)}
            className="p-1.5 rounded-lg text-forest-300 hover:text-white hover:bg-forest-800 transition-colors"
            title="Minimize coach"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Speech Bubble */}
      <div className="mt-3.5 pt-3 border-t border-forest-800/80 relative z-10">
        <div className="bg-forest-800/50 backdrop-blur-md rounded-xl p-3.5 border border-forest-600/30 text-xs sm:text-sm text-stone-200 leading-relaxed italic flex items-start space-x-2.5">
          <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>“{quote.text}”</span>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[10px] text-forest-400 px-1">
        <span>Advice for: <strong className="text-amber-300 capitalize">{quote.context}</strong></span>
        <button
          onClick={handleNextAdvice}
          className="flex items-center space-x-1 font-semibold text-forest-200 hover:text-amber-300 transition-colors"
        >
          <span>Ask Trompo for more</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
