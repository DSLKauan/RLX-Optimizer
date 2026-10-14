export type ActiveTab = 'launcher' | 'fastflags' | 'export' | 'system';

export interface RobloxGame {
  id: string;
  title: string;
  category: string;
  placeId: string;
  iconUrl: string;
  bannerGradient: string;
  playersCount: string;
  description: string;
  recommendedFps: number;
  isCustom?: boolean;
}

export type FlagCategory = 'fps' | 'graphics' | 'physics' | 'lighting' | 'system';

export interface FastFlag {
  key: string;
  label: string;
  description: string;
  category: FlagCategory;
  type: 'boolean' | 'number';
  defaultValue: boolean | number;
  currentValue: boolean | number;
  options?: { label: string; value: number }[];
  impact: 'Alto FPS' | 'Médio FPS' | 'Qualidade' | 'Estabilidade';
  recommendedForAndroid: boolean;
}

export type ProfileId = 'ultra' | 'potato' | 'balanced' | 'cool';

export interface OptimizationProfile {
  id: ProfileId;
  name: string;
  subtitle: string;
  description: string;
  targetFps: number;
  color: string;
  badge: string;
  flagOverrides: Record<string, boolean | number>;
}

export interface AndroidTweak {
  id: string;
  title: string;
  category: 'Tela & Hz' | 'Game Boosters' | 'Resolução & GPU' | 'Memória & RAM' | 'APK Nativo';
  impact: string;
  description: string;
  steps: string[];
  command?: string;
  recommendedSetting: string;
  applicableBrands?: string;
}
