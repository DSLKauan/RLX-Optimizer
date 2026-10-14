import React, { useState } from 'react';
import { 
  Smartphone, 
  Cpu, 
  Flame, 
  Check, 
  Copy, 
  Tv, 
  ShieldCheck, 
  Sliders, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Info
} from 'lucide-react';
import { S20_TWEAKS } from '../../data/s20TweaksData';
import { triggerHaptic } from '../../utils/haptics';

export const S20TweaksTab: React.FC = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>('refresh-rate-lock');

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

  return (
    <div className="space-y-5 pb-24">
      {/* S20+ Hardware Specs Card */}
      <section className="rounded-3xl bg-gradient-to-br from-[#162138] to-[#0E1524] border border-blue-500/30 p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-blue-400" />
            Perfil de Hardware S20+
          </span>
          <span className="text-xs text-slate-400 font-semibold">Exynos 990 / SD865</span>
        </div>

        <h2 className="text-lg font-bold text-white tracking-tight">
          Otimizações Exclusivas para Samsung S20+
        </h2>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          O Galaxy S20+ possui tela Dynamic AMOLED 2X de 120Hz e até 12GB de RAM, mas sofre com aquecimento e queda de clock se não estiver bem configurado.
        </p>

        {/* 3 Quick Tips */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-1">
              1. Resolução
            </div>
            <p className="text-[11px] text-slate-300">
              Mantenha o visor em <strong>FHD+</strong>. O modo WQHD+ (1440p) bloqueia os 120Hz e superaquece o Exynos.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
              2. Modo Prioridade
            </div>
            <p className="text-[11px] text-slate-300">
              No Game Booster da Samsung, ative o <strong>Modo Prioridade</strong> para fechar processos secundários.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-1">
              3. RAM Plus
            </div>
            <p className="text-[11px] text-slate-300">
              Deixe em <strong>2GB ou desligado</strong> para evitar que a memória virtual lenta gere engasgos de leitura.
            </p>
          </div>
        </div>
      </section>

      {/* Tweaks List */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-white tracking-tight px-1">
          Guia de Ajustes do Sistema One UI
        </h3>

        <div className="space-y-3">
          {S20_TWEAKS.map((tweak) => {
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
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-blue-400 border border-slate-700">
                        {tweak.category}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-400">
                        {tweak.impact}
                      </span>
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
                        Como Configurar:
                      </span>
                      {tweak.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="text-blue-400 font-bold mt-0.5">•</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Copyable Shell/ADB Command if present */}
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
