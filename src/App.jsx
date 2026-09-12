import React from 'react';
import { ElephantFitProvider, useElephantFit } from './context/ElephantFitContext';
import Navbar from './components/navigation/Navbar';
import Confetti from './components/common/Confetti';
import HomePage from './pages/HomePage';
import ActivitiesPage from './pages/ActivitiesPage';
import WorkoutsPage from './pages/WorkoutsPage';
import ProgressPage from './pages/ProgressPage';
import AchievementsPage from './pages/AchievementsPage';

function AppContent() {
  const { activeTab, toast } = useElephantFit();

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'activities':
        return <ActivitiesPage />;
      case 'workouts':
        return <WorkoutsPage />;
      case 'progress':
        return <ProgressPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f4] text-charcoal">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm w-full bg-forest-950 text-white p-4 rounded-2xl shadow-2xl border border-forest-800 flex items-start space-x-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-2xl shrink-0">{toast.icon || '🐘'}</span>
          <div className="flex-1">
            <h5 className="font-bold text-sm text-forest-100">{toast.title}</h5>
            <p className="text-xs text-forest-300 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Particle Confetti */}
      <Confetti />

      {/* Clean 5-Tab Navbar */}
      <Navbar />

      {/* Main Page View */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Clean Footer */}
      <footer className="py-6 border-t border-stone-200/80 text-center text-xs text-stone-400 space-y-1">
        <p className="font-bold text-forest-900">🐘 ElephantFit — Built for Jumbo, the World’s Biggest Athlete</p>
        <p>“Helping elephants become lighter… one peanut at a time.” Simple, authentic, and 3D interactive.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ElephantFitProvider>
      <AppContent />
    </ElephantFitProvider>
  );
}
