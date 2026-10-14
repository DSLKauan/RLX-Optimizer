# RoBoost Mobile: Universal Roblox Launcher & Optimizer (APK Edition)

Reformulação completa do aplicativo para funcionar como uma solução universal para **qualquer celular Android** (Samsung, Xiaomi/Poco, Motorola, Realme, Infinix, etc.) e suporte à arquitetura nativa com **Capacitor** para geração e instalação de APK.

---

## Decisões Confirmadas com o Usuário

> [!IMPORTANT]
> - **Nome Oficial Genérico**: **RoBoost Mobile: Universal Roblox Launcher** (todas as menções fixas a "Galaxy S20+", "Exynos 990" e modelos específicos foram eliminadas).
> - **Arquitetura APK Nativa**: Adição do Capacitor (`@capacitor/core`, `@capacitor/android`, `capacitor.config.ts`, estrutura `android/` com `AndroidManifest.xml` e build Gradle) permitindo empacotamento nativo em APK além da instalação universal como PWA.
> - **Detecção Automática de Hardware**: Algoritmo em tempo real que afere a taxa de atualização real da tela do usuário (60Hz, 90Hz, 120Hz ou 144Hz) através de amostragem `requestAnimationFrame`, identifica a memória RAM disponível (`navigator.deviceMemory`) e o status da bateria, adaptando os perfis dinamicamente.
> - **Perfis Universais de Desempenho**:
>   1. *Ultra Fluido (Display Máximo do Aparelho)*: Desbloqueia a taxa nativa da tela do celular conectado (90Hz, 120Hz ou 144Hz).
>   2. *Batata / Competitivo (Max FPS)*: Redução drástica de texturas e remoção de sombras para celulares de entrada / básicos.
>   3. *Equilibrado Universal*: 60 FPS com gráficos médios para celulares intermediários.
>   4. *Modo Frio & Bateria*: Limite de calor e economia de energia para qualquer chip (Snapdragon, MediaTek Helio/Dimensity, Unisoc ou Exynos).

---

## 1. Visão Geral e Conceito Central

### O que o novo aplicativo entrega
O **RoBoost Mobile** agora é um ecossistema completo para qualquer jogador de Roblox no Android:
1. **Suporte a APK Nativo com Capacitor**:
   - Configuração de build Capacitor (`capacitor.config.ts`) com ID de pacote `com.roboost.launcher`, permissões de rede, armazenamento e deep links.
   - Central de Instalação e Compilação de APK: instruções e scripts para compilar o APK diretamente no celular usando Termux/AIDE ou via Android Studio.
2. **Hardware Diagnostic Engine**:
   - Painel dinâmico que detecta a tela do aparelho atual (calcula se o celular está em 60Hz, 90Hz ou 120Hz+), quantifica a memória RAM e alerta se o aparelho está no modo de economia de energia.
3. **Launcher Universal com Deep Links (`roblox://`)**:
   - Catálogo com pesquisa, filtros e suporte a jogos personalizados por link ou Place ID.
   - Inicia partidas instantaneamente no Roblox oficial em qualquer versão de Android (Android 9 a 15).
4. **Gerador Universal de FastFlags (`ClientAppSettings.json`)**:
   - Ajuste universal de sombras, pós-processamento, terreno, partículas e FPS.
   - Guia de injeção adaptado para qualquer fabricante (ZArchiver com SAF, Shizuku e Termux).
5. **Painel de Otimizações de Sistema para Todos os Fabricantes**:
   - Dicas e comandos universais para Xiaomi (Game Turbo), Samsung (Game Booster), Motorola (Moto Gametime) e genéricos Android (escala de resolução ADB, desativação de swap lento, etc.).

---

## 2. Experiência do Usuário e Design Visual Universal

```
┌────────────────────────────────────────────────────────────────────────┐
│               ROBOOST MOBILE - UNIVERSAL ROBLOX HUB                    │
├────────────────────────────────┬───────────────────────────────────────┤
│    HARDWARE AUTO-DETECTOR      │           APK & NATIVE CORE           │
│  - Taxa da tela (60/90/120Hz)  │  - Capacitor Native Android Engine    │
│  - Memória RAM detectada       │  - Central de Download/Geração APK    │
├────────────────────────────────┼───────────────────────────────────────┤
│       LAUNCHER UNIVERSAL       │          OPTIMIZER FASTFLAGS          │
│  - roblox:// PlaceId Launcher  │  - Perfis para Fraco, Médio e Avançado│
│  - Catálogo de Jogos & Busca   │  - Editor de Sombras, Texturas e FPS  │
├────────────────────────────────┴───────────────────────────────────────┤
│                    GUIA SAF / SHIZUKU UNIVERSAL                        │
│  - Compatível com Android 9, 10, 11, 12, 13, 14 e 15                   │
│  - Exportação direta de ClientAppSettings.json                         │
└────────────────────────────────────────────────────────────────────────┘
```

- **Interface Universal Gamer & Moderna**: Paleta dark elegante e neutra (preto profundo `#0B0F19`, acentos azul elétrico `#3B82F6` e verde neon `#10B981`), com botões ergonômicos de toque e sem referências a uma única marca.
- **Navegação em 4 Abas**:
  1. **Launcher**: Jogos com lançamento rápido e status de tela detectada.
  2. **FastFlags**: Toggles e seletor de FPS calibrado para a taxa real do aparelho.
  3. **Exportar JSON**: Download e guia universal ZArchiver / Shizuku.
  4. **APK & Sistema**: Painel do APK nativo Capacitor, comandos ADB universais e guia por fabricante.

---

## 3. Principais Alterações Técnicas

1. **Remoção de referências ao S20+**:
   - Limpeza em `metadata.json`, `index.html`, `public/manifest.json`, `public/icon.svg` e todos os arquivos em `src/`.
   - Substituição por termos universais: "RoBoost Mobile", "Qualquer Android", "Taxa de Atualização Detectada".
2. **Integração do Capacitor**:
   - Instalação de `@capacitor/core` e `@capacitor/cli`.
   - Criação de `capacitor.config.json` / `capacitor.config.ts` com configurações de App ID `com.roboost.launcher`, nome do app e esquemas de deep link.
3. **Módulo de Diagnóstico de Hardware (`useDeviceHardware.ts`)**:
   - Medição ativa da taxa de quadros do display usando `requestAnimationFrame` em um loop de 60 frames para calcular se a tela é 60Hz, 90Hz, 120Hz ou 144Hz.
   - Leitura de núcleos de CPU (`navigator.hardwareConcurrency`) e RAM (`navigator.deviceMemory`).
4. **Aba "APK & Sistema"**:
   - Status da integração nativa Capacitor.
   - Opções para baixar o pacote do projeto pronto para gerar APK no celular via Termux/AIDE ou PC via Android Studio.
   - Ajustes de resolução universais aplicáveis a qualquer Android.

---

## 4. Plano de Execução

1. **Instalação de Pacotes**: Instalar `@capacitor/core` e `@capacitor/cli`.
2. **Configuração do Capacitor**: Criar `capacitor.config.ts` e arquivos de manifesto Android.
3. **Atualização dos Metadados**: Renomear em `metadata.json`, `index.html`, `manifest.json` e `icon.svg`.
4. **Criação do Hook de Diagnóstico de Hardware (`src/hooks/useDeviceHardware.ts`)**: Medição em tempo real de Hz e recursos.
5. **Atualização dos Dados e Perfis (`profilesData.ts`, `s20TweaksData.ts` -> `androidTweaksData.ts`)**: Generalizar para todos os celulares Android.
6. **Atualização dos Componentes**:
   - `HeaderOneUI.tsx` -> `HeaderUniversal.tsx` (mostra o modelo detectado ou "Android Universal" + Hz medido).
   - `S20TweaksTab.tsx` -> `AndroidTweaksTab.tsx` (guia para Xiaomi, Samsung, Motorola e comandos universais + central de APK).
   - `LauncherTab.tsx`, `FastFlagsTab.tsx`, `ExportGuideTab.tsx`, `App.tsx`.
7. **Compilação e Verificação**: Executar `compile_applet` e garantir zero erros de build.
