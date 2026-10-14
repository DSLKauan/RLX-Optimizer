import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  Flame, 
  Gauge, 
  Search, 
  Plus, 
  Share2, 
  ExternalLink, 
  Smartphone, 
  Check, 
  Zap,
  Layers
} from 'lucide-react';
import { RobloxGame, OptimizationProfile, ProfileId } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

interface LauncherTabProps {
  games: RobloxGame[];
  profiles: OptimizationProfile[];
  currentProfile: OptimizationProfile;
  onSelectProfile: (id: ProfileId) => void;
  onOpenCustomGameModal: () => void;
  onNavigateToTab: (tab: 'fastflags' | 'export' | 's20plus') => void;
}

export const LauncherTab: React.FC<LauncherTabProps> = ({
  games,
  profiles,
  currentProfile,
  onSelectProfile,
  onOpenCustomGameModal,
  onNavigateToTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [launchingId, setLaunchingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'Aventura / RPG', label: 'RPG & Frutas' },
    { id: 'Ação / PvP', label: 'PvP & Luta' },
    { id: 'FPS / Tiro', label: 'Competitivo' },
  ];

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || game.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const launchRobloxGame = (game: RobloxGame) => {
    triggerHaptic('success');
    setLaunchingId(game.id);

    // Protocol URI for Android: roblox://placeId=...
    const directUri = `roblox://placeId=${game.placeId}`;
    
    // Attempt launching native Android intent
    window.location.href = directUri;

    setTimeout(() => {
      setLaunchingId(null);
    }, 2500);
  };

  const launchRobloxApp = () => {
    triggerHaptic('success');
    // Open Roblox main home
    window.location.href = 'roblox://';
  };

  const copyPlaceLink = (game: RobloxGame) => {
    triggerHaptic('light');
    const url = `https://www.roblox.com/games/${game.placeId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(game.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* S20+ AMOLED 120Hz Performance Banner (One UI Card) */}
      <section className="rounded-3xl bg-gradient-to-br from-[#162036] via-[#101726] to-[#0A0E17] border border-blue-500/20 p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                {currentProfile.badge} ATIVO
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Alvo: {currentProfile.targetFps} FPS
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              {currentProfile.name}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              {currentProfile.description}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <button
              onClick={launchRobloxApp}
              className="flex-1 sm:flex-initial h-11 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Abrir Roblox App</span>
            </button>
            <button
              onClick={() => onNavigateToTab('export')}
              className="flex-1 sm:flex-initial h-11 px-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Injetar Config</span>
            </button>
          </div>
        </div>

        {/* Quick S20+ Hardware Stats Strip */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Display</span>
            <span className="text-xs font-extrabold text-blue-400">120Hz AMOLED</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Carga de GPU</span>
            <span className="text-xs font-extrabold text-emerald-400">-35% Alívio</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Injeção</span>
            <span className="text-xs font-extrabold text-indigo-400">ZArchiver / SAF</span>
          </div>
        </div>
      </section>

      {/* Preset Profiles Carousel */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-blue-400" />
            <span>Mudar Perfil de Otimização</span>
          </h3>
          <button
            onClick={() => onNavigateToTab('fastflags')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300"
          >
            Ajustar Flags &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {profiles.map((profile) => {
            const isSelected = profile.id === currentProfile.id;
            return (
              <button
                key={profile.id}
                onClick={() => {
                  triggerHaptic('toggle');
                  onSelectProfile(profile.id);
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all relative overflow-hidden active:scale-97 ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-500/10'
                    : 'bg-slate-900/60 hover:bg-slate-850 border-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isSelected
                        ? 'bg-blue-500 text-white border-blue-400'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {profile.badge}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </div>
                <h4 className="text-xs font-bold text-white truncate">{profile.name}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{profile.subtitle}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Launcher & Game Catalog Header */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Lançador de Jogos</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {filteredGames.length}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Clique em jogar para abrir direto no aplicativo oficial do Roblox
            </p>
          </div>

          <button
            onClick={() => {
              triggerHaptic('light');
              onOpenCustomGameModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-blue-400" />
            <span>Adicionar</span>
          </button>
        </div>

        {/* Search Bar & Categories */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar jogo (ex: Blox Fruits, Blade Ball, Arsenal)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Category Tabs */}
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
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="rounded-3xl bg-[#121A2B] border border-slate-800/80 p-4 shadow-md hover:border-slate-700 transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Top Badge & Players */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-2 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner">
                      {game.iconUrl}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {game.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {game.category} · <span className="text-slate-500 font-mono">ID: {game.placeId}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {game.playersCount}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {game.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/70">
                <button
                  onClick={() => launchRobloxGame(game)}
                  className="flex-1 h-11 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 active:scale-95 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>
                    {launchingId === game.id ? 'Iniciando Roblox...' : 'Jogar Agora'}
                  </span>
                </button>

                <button
                  onClick={() => copyPlaceLink(game)}
                  className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center border border-slate-700/60 active:scale-95 transition-all"
                  title="Copiar Link do Jogo"
                >
                  {copiedId === game.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
