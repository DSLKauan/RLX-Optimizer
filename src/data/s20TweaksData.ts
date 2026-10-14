import { S20Tweak } from '../types';

export const S20_TWEAKS: S20Tweak[] = [
  {
    id: 'refresh-rate-lock',
    title: 'Travar Taxa de 120Hz no Galaxy S20+',
    category: 'Tela 120Hz',
    impact: 'Suavidade Extrema',
    description: 'A One UI pode forçar jogos para 60Hz automaticamente se a temperatura subir. Siga este ajuste para manter 120Hz contínuos.',
    steps: [
      'Vá em Configurações > Visor > Suavidade do movimento e marque "Alta (120 Hz)".',
      'Certifique-se de que a resolução de tela está em FHD+ (2400 x 1080), pois o S20+ não suporta 120Hz em WQHD+.',
      'Dica Pro: Caso o Roblox insista em rodar a 60Hz, use o app "Galaxy Max Hz" para forçar a taxa de 120Hz travada em jogos.',
    ],
    recommendedSetting: 'FHD+ (1080p) a 120Hz Ativado',
  },
  {
    id: 'game-plugins-perfz',
    title: 'Monitor de FPS Real: Game Plugins + Perf Z',
    category: 'Samsung GOS',
    impact: 'Telemetria e Controle',
    description: 'Instale a ferramenta oficial da Samsung para exibir FPS em tempo real, temperatura da CPU/GPU e uso de RAM na tela do jogo.',
    steps: [
      'Abra a Galaxy Store no seu S20+ e pesquise por "Game Plugins".',
      'Dentro do Game Plugins, ative o módulo "Perf Z".',
      'Abra o Roblox: um pequeno overlay flutuante mostrará o FPS cravado, porcentagem de uso do processador e temperatura do aparelho.',
    ],
    recommendedSetting: 'Perf Z Ativado na Galaxy Store',
  },
  {
    id: 'gos-priority-mode',
    title: 'Modo Prioridade no Game Booster da One UI',
    category: 'Samsung GOS',
    impact: 'Zero Notificações e Foco na CPU',
    description: 'Fecha todos os apps que rodam em segundo plano e direciona 100% da conexão de internet e potência do processador para o Roblox.',
    steps: [
      'Inicie o Roblox no seu celular.',
      'Deslize da borda inferior para abrir a barra de navegação da Samsung e toque no ícone do Game Booster (canto esquerdo).',
      'Toque no botão com o ícone de liga/desliga para ativar o "Modo Prioridade".',
      'Isso bloqueia chamadas recebidas, alarmes e silencia notificações durante as partidas.',
    ],
    recommendedSetting: 'Modo Prioridade Ativado durante o jogo',
  },
  {
    id: 'resolution-scaler',
    title: 'Escala de Resolução (Termux / Shizuku / ADB)',
    category: 'Resolução & GPU',
    impact: 'Dobra os FPS e Reduz Calor',
    description: 'A tela de 1440p ou 1080p nativa do S20+ exige muito da GPU. Reduzir a resolução interna para 720p ou 810p dobra os quadros por segundo sem perda visível.',
    steps: [
      'Usando o Shizuku ou Termux diretamente pelo celular (ou ADB sem PC):',
      'Execute o comando abaixo para aplicar resolução 720p otimizada:',
      'Para voltar ao normal depois de jogar, use o comando de reset.',
    ],
    command: 'adb shell wm size 720x1600 && adb shell wm density 280',
    recommendedSetting: '720x1600 @ 280 DPI (Modo Torneio)',
  },
  {
    id: 'ram-plus-tuning',
    title: 'Ajuste de RAM Plus (Memória Virtual)',
    category: 'Resfriamento',
    impact: 'Reduz Engasgos de Leitura',
    description: 'O RAM Plus do One UI usa o armazenamento UFS como memória RAM, o que pode causar micro-travamentos (stuttering) durante os jogos.',
    steps: [
      'Acesse Configurações > Assistência do aparelho e bateria > Memória.',
      'Toque na opção "RAM Plus" na parte inferior.',
      'Defina para 2 GB ou desative totalmente (se estiver na One UI 5 / Android 13). O S20+ já possui 8GB ou 12GB de RAM física ultra-rápida LPDDR5, dispensando swap lento.',
    ],
    recommendedSetting: 'Desativado ou 2GB',
  },
  {
    id: 'thermal-guardian',
    title: 'Controle Térmico (Good Guardians - Thermal Guardian)',
    category: 'Resfriamento',
    impact: 'Evita Queda Brusca de FPS',
    description: 'No processador Exynos 990 / Snapdragon 865, quando o aparelho atinge 42°C, o sistema reduz o clock pela metade. O Thermal Guardian permite elevar o limite de temperatura.',
    steps: [
      'Instale o "Good Guardians" pela Galaxy Store (ou APKMirror).',
      'Abra o módulo "Thermal Guardian".',
      'Mova o controle deslizante de limiar térmico para +2°C. O processador manterá a velocidade máxima por muito mais tempo sem cortar o FPS.',
    ],
    recommendedSetting: '+1°C ou +2°C no Thermal Guardian',
  },
];
