import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles, 
  FileDown, 
  Flame, 
  Zap
} from 'lucide-react';
import { FastFlag } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

interface FastFlagsTabProps {
  flags: FastFlag[];
  onToggleFlag: (key: string, value: boolean | number) => void;
  onResetAllFlags: () => void;
  onNavigateToExport: () => void;
}

export const FastFlagsTab: React.FC<FastFlagsTabProps> = ({
  flags,
  onToggleFlag,
  onResetAllFlags,
  onNavigateToExport,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Todas as Flags' },
    { id: 'fps', label: 'FPS & Hz' },
    { id: 'graphics', label: 'Gráficos & Texturas' },
    { id: 'lighting', label: 'Sombras & Luz' },
    { id: 'physics', label: 'Física & Memória' },
    { id: 'system', label: 'Sistema & UI' },
  ];

  const filteredFlags = flags.filter((flag) => {
    const matchesCategory = selectedCategory === 'all' || flag.category === selectedCategory;
    const matchesSearch =
      flag.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      flag.key.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const modifiedCount = flags.filter((f) => f.currentValue !== f.defaultValue).length;

  return (
    <div className="space-y-5 pb-24">
      {/* Header Overview Card */}
      <section className="rounded-3xl bg-[#141C2E] border border-slate-800 p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                ClientAppSettings
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {modifiedCount} flags ativas
              </span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight mt-1">
              Editor de FastFlags Universal
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Ajuste os parâmetros internos do motor Roblox (Bloxstrap Mobile) para desativar texturas pesadas, pós-processamento e destravar a taxa máxima de quadros no seu celular.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                triggerHaptic('medium');
                onResetAllFlags();
              }}
              className="h-10 px-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar</span>
            </button>
            <button
              onClick={() => {
                triggerHaptic('light');
                onNavigateToExport();
              }}
              className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 active:scale-95 transition-all"
            >
              <FileDown className="w-4 h-4" />
              <span>Exportar JSON</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter Chips */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              triggerHaptic('light');
              setSelectedCategory(cat.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Flags List */}
      <div className="space-y-3">
        {filteredFlags.map((flag) => {
          const isModified = flag.currentValue !== flag.defaultValue;

          return (
            <div
              key={flag.key}
              className={`rounded-2xl p-4 transition-all border ${
                isModified
                  ? 'bg-[#151F33] border-blue-500/30'
                  : 'bg-[#111827] border-slate-800/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-white">{flag.label}</h4>
                    {flag.recommendedForAndroid && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Recomendado Android
                      </span>
                    )}
                    <span className="text-[10px] font-semibold text-slate-400">
                      Impacto: {flag.impact}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {flag.description}
                  </p>

                  <span className="inline-block text-[11px] font-mono text-slate-400 mt-1 select-all">
                    {flag.key}
                  </span>
                </div>

                {/* Control Element: Toggle Switch for Boolean */}
                {flag.type === 'boolean' && (
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('toggle');
                      onToggleFlag(flag.key, !flag.currentValue);
                    }}
                    className={`w-13 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 focus:outline-none ${
                      flag.currentValue ? 'bg-blue-600' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                        flag.currentValue ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* Control Element: Segmented Buttons for Numbers */}
              {flag.type === 'number' && flag.options && (
                <div className="mt-3 pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                    Selecione o Valor Desejado:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {flag.options.map((option) => {
                      const isOptionActive = flag.currentValue === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            triggerHaptic('toggle');
                            onToggleFlag(flag.key, option.value);
                          }}
                          className={`h-9 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
                            isOptionActive
                              ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
