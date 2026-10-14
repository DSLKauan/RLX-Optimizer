import React from 'react';
import { Smartphone, Download, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { triggerHaptic } from '../utils/haptics';
import { OptimizationProfile } from '../types';

interface HeaderOneUIProps {
  currentProfile: OptimizationProfile;
  onOpenLatencyModal: () => void;
  onQuickProfileClick: () => void;
}

export const HeaderOneUI: React.FC<HeaderOneUIProps> = ({
  currentProfile,
  onOpenLatencyModal,
  onQuickProfileClick,
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  const handleInstallClick = async () => {
    triggerHaptic('success');
    await install();
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Phone Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black text-lg">
            R
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-tight leading-none">
                RoBoost
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25">
                S20+
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
              <Smartphone className="w-3 h-3 text-emerald-400" />
              <span>Galaxy S20+ One UI</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 font-semibold">{currentProfile.targetFps} FPS Target</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Active Profile Pill Button */}
          <button
            onClick={() => {
              triggerHaptic('light');
              onQuickProfileClick();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-slate-200 border border-slate-700/60 text-xs font-semibold active:scale-95 transition-all"
            title="Alterar Perfil de Desempenho"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">{currentProfile.name.split(' ')[0]}</span>
            <span className="text-[11px] text-blue-400 font-bold">{currentProfile.badge}</span>
          </button>

          {/* Latency Tester Quick Button */}
          <button
            onClick={() => {
              triggerHaptic('light');
              onOpenLatencyModal();
            }}
            className="w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700/60 flex items-center justify-center text-slate-300 active:scale-95 transition-all"
            title="Testador de Ping e Conexão"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
          </button>

          {/* PWA In-App Install Button */}
          {isInstallable && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 active:scale-95 transition-all"
              title="Instalar RoBoost na Tela Inicial do Celular"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Instalar</span>
            </button>
          )}

          {isInstalled && (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              <span>App Instalado</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
