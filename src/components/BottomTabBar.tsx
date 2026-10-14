import React from 'react';
import { Gamepad2, SlidersHorizontal, FileDown, Smartphone } from 'lucide-react';
import { ActiveTab } from '../types';
import { triggerHaptic } from '../utils/haptics';

interface BottomTabBarProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onChangeTab }) => {
  const tabs: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'launcher', label: 'Launcher', icon: Gamepad2 },
    { id: 'fastflags', label: 'FastFlags', icon: SlidersHorizontal },
    { id: 'export', label: 'Exportar', icon: FileDown },
    { id: 'system', label: 'Sistema & APK', icon: Smartphone },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0E1524]/95 backdrop-blur-xl border-t border-slate-800/80 pb-safe shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-4 items-center h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                triggerHaptic('light');
                onChangeTab(tab.id);
              }}
              className="group flex flex-col items-center justify-center h-full relative transition-all active:scale-95"
            >
              <div
                className={`flex items-center justify-center w-12 h-8 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 shadow-sm'
                    : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-blue-400' : ''}`} />
              </div>
              <span
                className={`text-[11px] font-semibold tracking-tight transition-colors duration-150 ${
                  isActive ? 'text-blue-400 font-bold' : 'text-slate-400 group-hover:text-slate-300'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
