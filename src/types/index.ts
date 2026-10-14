export type ActiveTab = 'launcher' | 'fastflags' | 'export' | 's20plus';

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
  recommendedForS20: boolean;
}

export type ProfileId = 'ultra120' | 'potato' | 'balanced' | 'cool';

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

export interface S20Tweak {
  id: string;
  title: string;
  category: 'Tela 120Hz' | 'Resfriamento' | 'Samsung GOS' | 'Resolução & GPU';
  impact: string;
  description: string;
  steps: string[];
  command?: string;
  recommendedSetting: string;
}
