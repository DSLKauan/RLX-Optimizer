import React, { useState } from 'react';
import { X, Plus, Gamepad2, AlertCircle } from 'lucide-react';
import { RobloxGame } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

interface CustomGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGame: (game: RobloxGame) => void;
}

export const CustomGameModal: React.FC<CustomGameModalProps> = ({
  isOpen,
  onClose,
  onAddGame,
}) => {
  const [title, setTitle] = useState('');
  const [placeInput, setPlaceInput] = useState('');
  const [category, setCategory] = useState('Personalizado');
  const [targetFps, setTargetFps] = useState<number>(120);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Extract pure placeId if user pasted a full URL
  const extractPlaceId = (input: string): string => {
    const trimmed = input.trim();
    const urlMatch = trimmed.match(/\/games\/(\d+)/i);
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];
    }
    const pureNumbers = trimmed.replace(/\D/g, '');
    return pureNumbers;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Por favor, informe o nome do jogo.');
      return;
    }

    const placeId = extractPlaceId(placeInput);
    if (!placeId) {
      setError('Informe um Place ID numérico válido ou link do jogo.');
      return;
    }

    const newGame: RobloxGame = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category: category || 'Personalizado',
      placeId: placeId,
      iconUrl: '🎮',
      bannerGradient: 'from-blue-700 via-indigo-800 to-slate-900',
      playersCount: 'Customizado',
      description: `Jogo adicionado para lançamento rápido com Place ID ${placeId}.`,
      recommendedFps: targetFps,
      isCustom: true,
    };

    triggerHaptic('success');
    onAddGame(newGame);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm rounded-3xl bg-[#141C2E] border border-slate-700/80 p-5 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-none">Adicionar Jogo</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Criar atalho para o S20+</p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-3.5">
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Nome do Jogo
            </label>
            <input
              type="text"
              placeholder="Ex: Blox Fruits / Pet Sim 99"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Place ID ou Link do Jogo
            </label>
            <input
              type="text"
              placeholder="Ex: 2753915549 ou cole o link do Roblox"
              value={placeInput}
              onChange={(e) => setPlaceInput(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono transition-colors"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              O Place ID é a numeração presente no link do jogo no navegador.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Meta de FPS
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[60, 90, 120].map((fps) => (
                <button
                  type="button"
                  key={fps}
                  onClick={() => setTargetFps(fps)}
                  className={`h-9 rounded-xl text-xs font-bold border transition-all ${
                    targetFps === fps
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {fps} FPS
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Salvar Jogo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
