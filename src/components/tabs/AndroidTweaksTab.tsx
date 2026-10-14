import React, { useState } from 'react';
import { 
  Smartphone, 
  Cpu, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp,
  Download,
  Terminal,
  ShieldCheck,
  Zap,
  Package
} from 'lucide-react';
import { ANDROID_TWEAKS } from '../../data/androidTweaksData';
import { triggerHaptic } from '../../utils/haptics';
import { DeviceHardwareInfo } from '../../hooks/useDeviceHardware';

interface AndroidTweaksTabProps {
  hardware: DeviceHardwareInfo;
}

export const AndroidTweaksTab: React.FC<AndroidTweaksTabProps> = ({ hardware }) => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>('apk-native-build');
  const [scriptDownloaded, setScriptDownloaded] = useState(false);

  const handleCopyCommand = (command: string, id: string) => {
    triggerHaptic('success');
    navigator.clipboard.writeText(command);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2500);
  };

  const toggleExpand = (id: string) => {
    triggerHaptic('light');
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDownloadApkBuildScript = () => {
    triggerHaptic('success');
    const scriptContent = `#!/bin/bash
# RoBoost Mobile - Script de Compilacao APK Nativo (Capacitor)
echo "=== Compilando RoBoost Mobile APK Nativo ==="
npm run build
npx cap sync android
echo "Projeto sincronizado com sucesso!"
echo "Para gerar o APK debug execute:"
echo "cd android && ./gradlew assembleDebug"
echo "O APK estara em: android/app/build/outputs/apk/debug/app-debug.apk"
`;
    const blob = new Blob([scriptContent], { type: 'text/x-shellscript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'build-apk.sh';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setScriptDownloaded(true);
    setTimeout(() => setScriptDownloaded(false), 3000);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Universal Hardware & APK Engine Overview Card */}
      <section className="rounded-3xl bg-gradient-to-br from-[#162138] to-[#0E1524] border border-blue-500/30 p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
            <Package className="w-3 h-3 text-blue-400" />
            Capacitor Native APK Engine
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            Package: com.roboost.launcher
          </span>
        </div>

        <h2 className="text-lg font-bold text-white tracking-tight">
          Central do APK Nativo & Otimizações do Sistema
        </h2>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Estruturado para rodar como aplicativo nativo em qualquer aparelho Android (Samsung, Xiaomi, Motorola, Realme, etc.), aproveitando aceleradores de hardware e evitando limitações de navegadores.
        </p>

        {/* Dynamic Hardware Grid */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Taxa Medida</span>
            <span className="text-xs font-extrabold text-blue-400 tabular-nums">
              {hardware.isCalibratingHz ? 'Medindo...' : `${hardware.detectedHz}Hz`}
            </span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Processador</span>
            <span className="text-xs font-extrabold text-emerald-400">
              {hardware.cpuCores} Threads
            </span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Memória RAM</span>
            <span className="text-xs font-extrabold text-purple-400">
              {hardware.deviceRamGb ? `${hardware.deviceRamGb} GB` : 'Disponível'}
            </span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Sistema</span>
            <span className="text-xs font-extrabold text-indigo-400">
              {hardware.androidVersion}
            </span>
          </div>
        </div>

        {/* Quick APK Script Download Button */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-300">
            <strong className="text-white block">Compilar APK no Celular ou PC:</strong>
            <span className="text-[11px] text-slate-400">Use o script oficial do Capacitor para compilar seu arquivo .apk</span>
          </div>

          <button
            onClick={handleDownloadApkBuildScript}
            className="w-full sm:w-auto h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 active:scale-95 transition-all shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{scriptDownloaded ? 'Script Baixado!' : 'Baixar Script APK'}</span>
          </button>
        </div>
      </section>

      {/* System Tweaks Accordion */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-white tracking-tight px-1">
          Guia de Otimizações por Fabricante
        </h3>

        <div className="space-y-3">
          {ANDROID_TWEAKS.map((tweak) => {
            const isExpanded = expandedId === tweak.id;

            return (
              <div
                key={tweak.id}
                className="rounded-3xl bg-[#121A2B] border border-slate-800/90 shadow-md transition-all overflow-hidden"
              >
                {/* Header Clickable Row */}
                <button
                  type="button"
                  onClick={() => toggleExpand(tweak.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-850/40 transition-colors"
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-blue-400 border border-slate-700">
                        {tweak.category}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-400">
                        {tweak.impact}
                      </span>
                      {tweak.applicableBrands && (
                        <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                          · {tweak.applicableBrands}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white">{tweak.title}</h4>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Body */}
                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-slate-800/60 space-y-3">
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      {tweak.description}
                    </p>

                    <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Passo a Passo de Configuração:
                      </span>
                      {tweak.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="text-blue-400 font-bold mt-0.5">•</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Copyable Command if present */}
                    {tweak.command && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Comando Rápido (Shizuku / Termux / ADB):
                        </span>
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <code className="text-[11px] font-mono text-emerald-400 truncate flex-1">
                            {tweak.command}
                          </code>
                          <button
                            onClick={() => handleCopyCommand(tweak.command!, tweak.id)}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1.5 shrink-0 active:scale-95 transition-all"
                          >
                            {copiedCommand === tweak.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-white" />
                                <span>Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs pt-2 text-slate-400">
                      <span>Configuração Ideal:</span>
                      <strong className="text-white font-medium">{tweak.recommendedSetting}</strong>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
