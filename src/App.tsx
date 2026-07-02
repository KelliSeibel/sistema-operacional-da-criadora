import React, { useEffect } from 'react';
import { StateProvider, useAppState } from './components/StateContext';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Products } from './components/Products';
import { Hooks } from './components/Hooks';
import { References } from './components/References';
import { Ideas } from './components/Ideas';
import { Scripts } from './components/Scripts';
import { Scenes } from './components/Scenes';
import { Calendar } from './components/Calendar';
import { PlanningView } from './components/Planning';
import { Search } from './components/Search';
import { Productivity } from './components/Productivity';
import { Settings } from './components/Settings';
import { Studio } from './components/Studio';

const AppContent: React.FC = () => {
  const { activeTab } = useAppState();

  // Scroll viewport to top on tab changes (like a native app page transition)
  useEffect(() => {
    const el = document.getElementById('app-viewport');
    if (el) {
      el.scrollTop = 0;
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
      case 'categories':
        return <Products />;
      case 'hooks':
        return <Hooks />;
      case 'references':
        return <References />;
      case 'ideas':
        return <Ideas />;
      case 'scripts':
        return <Scripts />;
      case 'studio':
        return <Studio />;
      case 'scenes':
        return <Scenes />;
      case 'calendar':
        return <Calendar />;
      case 'planning':
        return <PlanningView />;
      case 'search':
        return <Search />;
      case 'productivity':
        return <Productivity />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1918] flex items-center justify-center font-sans antialiased selection:bg-brand-pink/20 py-0 sm:py-6">
      {/* Smartphone simulation container */}
      <div className="w-full sm:w-[430px] h-screen sm:h-[880px] bg-brand-offwhite relative flex flex-col shadow-2xl sm:rounded-[48px] overflow-hidden border border-brand-pink-light/30 sm:border-neutral-800">
        
        {/* Dynamic Island / Speaker cutout (only visible on desktop) */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-10 h-1 bg-neutral-800 rounded-full mr-3" />
          <div className="w-2 h-2 bg-neutral-800 rounded-full" />
        </div>

        {/* Top Spacer to offset simulated status bar on desktop */}
        <div className="hidden sm:block h-6 shrink-0 bg-brand-offwhite" />

        {/* Unified Mobile Header Bar */}
        <Navigation />

        {/* Scrollable Viewport */}
        <main 
          id="app-viewport" 
          className="flex-1 overflow-y-auto px-4 pt-4 pb-28 scrollbar-none scroll-smooth w-full"
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StateProvider>
      <AppContent />
    </StateProvider>
  );
}
