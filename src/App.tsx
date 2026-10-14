/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, FastFlag, OptimizationProfile, ProfileId, RobloxGame } from './types';
import { INITIAL_FAST_FLAGS } from './data/fastFlagsData';
import { PROFILES } from './data/profilesData';
import { INITIAL_GAMES } from './data/popularGames';
import { HeaderUniversal } from './components/HeaderUniversal';
import { BottomTabBar } from './components/BottomTabBar';
import { LauncherTab } from './components/tabs/LauncherTab';
import { FastFlagsTab } from './components/tabs/FastFlagsTab';
import { ExportGuideTab } from './components/tabs/ExportGuideTab';
import { AndroidTweaksTab } from './components/tabs/AndroidTweaksTab';
import { LatencyTesterModal } from './components/tabs/LatencyTesterModal';
import { CustomGameModal } from './components/tabs/CustomGameModal';
import { useDeviceHardware } from './hooks/useDeviceHardware';
import { triggerHaptic } from './utils/haptics';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('launcher');
  const [selectedProfileId, setSelectedProfileId] = useState<ProfileId>('ultra');
  const hardware = useDeviceHardware();

  const [flags, setFlags] = useState<FastFlag[]>(() => {
    const saved = localStorage.getItem('roboost_universal_flags');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return INITIAL_FAST_FLAGS.map((f) => {
          if (parsed[f.key] !== undefined) {
            return { ...f, currentValue: parsed[f.key] };
          }
          return f;
        });
      } catch {
        // Fallback
      }
    }
    // Default: Apply ultra profile
    const ultra = PROFILES.find((p) => p.id === 'ultra')!;
    return INITIAL_FAST_FLAGS.map((f) => ({
      ...f,
      currentValue: ultra.flagOverrides[f.key] !== undefined ? ultra.flagOverrides[f.key] : f.defaultValue,
    }));
  });

  const [games, setGames] = useState<RobloxGame[]>(() => {
    const saved = localStorage.getItem('roboost_universal_games');
    if (saved) {
      try {
        const custom = JSON.parse(saved);
        return [...custom, ...INITIAL_GAMES];
      } catch {
        return INITIAL_GAMES;
      }
    }
    return INITIAL_GAMES;
  });

  const [latencyModalOpen, setLatencyModalOpen] = useState(false);
  const [customGameModalOpen, setCustomGameModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync flags to localStorage
  useEffect(() => {
    const map: Record<string, boolean | number> = {};
    flags.forEach((f) => {
      map[f.key] = f.currentValue;
    });
    localStorage.setItem('roboost_universal_flags', JSON.stringify(map));
  }, [flags]);

  // Adjust ultra profile's target FPS if hardware detected a custom Hz (e.g. 90Hz, 144Hz)
  useEffect(() => {
    if (!hardware.isCalibratingHz && hardware.detectedHz) {
      setFlags((prev) =>
        prev.map((f) => {
          if (f.key === 'DFIntTaskSchedulerTargetFps' && selectedProfileId === 'ultra') {
            return { ...f, currentValue: hardware.detectedHz };
          }
          return f;
        })
      );
    }
  }, [hardware.detectedHz, hardware.isCalibratingHz, selectedProfileId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleSelectProfile = (id: ProfileId) => {
    setSelectedProfileId(id);
    const targetProfile = PROFILES.find((p) => p.id === id);
    if (!targetProfile) return;

    setFlags((prev) =>
      prev.map((f) => {
        if (targetProfile.flagOverrides[f.key] !== undefined) {
          let val = targetProfile.flagOverrides[f.key];
          // If ultra profile, set to real hardware detected Hz
          if (id === 'ultra' && f.key === 'DFIntTaskSchedulerTargetFps' && hardware.detectedHz) {
            val = hardware.detectedHz;
          }
          return { ...f, currentValue: val };
        }
        return f;
      })
    );

    triggerHaptic('toggle');
    showToast(`Perfil "${targetProfile.name}" ativado com sucesso!`);
  };

  const handleToggleFlag = (key: string, value: boolean | number) => {
    setFlags((prev) =>
      prev.map((f) => (f.key === key ? { ...f, currentValue: value } : f))
    );
  };

  const handleResetAllFlags = () => {
    setFlags(INITIAL_FAST_FLAGS.map((f) => ({ ...f, currentValue: f.defaultValue })));
    triggerHaptic('medium');
    showToast('Todas as FastFlags foram restauradas para os padrões.');
  };

  const handleAddCustomGame = (newGame: RobloxGame) => {
    setGames((prev) => {
      const updated = [newGame, ...prev];
      const customOnly = updated.filter((g) => g.isCustom);
      localStorage.setItem('roboost_universal_games', JSON.stringify(customOnly));
      return updated;
    });
    showToast(`Jogo "${newGame.title}" adicionado ao launcher!`);
  };

  const currentProfile = PROFILES.find((p) => p.id === selectedProfileId) || PROFILES[0];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Universal Top Header */}
      <HeaderUniversal
        currentProfile={currentProfile}
        hardware={hardware}
        onOpenLatencyModal={() => setLatencyModalOpen(true)}
        onQuickProfileClick={() => setActiveTab('launcher')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'launcher' && (
          <LauncherTab
            games={games}
            profiles={PROFILES}
            currentProfile={currentProfile}
            hardware={hardware}
            onSelectProfile={handleSelectProfile}
            onOpenCustomGameModal={() => setCustomGameModalOpen(true)}
            onNavigateToTab={(tab) => {
              triggerHaptic('light');
              setActiveTab(tab);
            }}
          />
        )}

        {activeTab === 'fastflags' && (
          <FastFlagsTab
            flags={flags}
            onToggleFlag={handleToggleFlag}
            onResetAllFlags={handleResetAllFlags}
            onNavigateToExport={() => {
              triggerHaptic('light');
              setActiveTab('export');
            }}
          />
        )}

        {activeTab === 'export' && <ExportGuideTab flags={flags} />}

        {activeTab === 'system' && <AndroidTweaksTab hardware={hardware} />}
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-blue-600/95 text-white font-semibold text-xs shadow-xl shadow-blue-600/30 border border-blue-400/40 backdrop-blur-md animate-bounce duration-300 flex items-center gap-2 max-w-[90vw]">
          <span className="w-2 h-2 rounded-full bg-emerald-300 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <LatencyTesterModal
        isOpen={latencyModalOpen}
        onClose={() => setLatencyModalOpen(false)}
      />

      <CustomGameModal
        isOpen={customGameModalOpen}
        onClose={() => setCustomGameModalOpen(false)}
        onAddGame={handleAddCustomGame}
      />

      {/* Bottom Navigation Bar */}
      <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
}
