# RoBoost Launcher & Optimizer para Android (Samsung Galaxy S20+)

Aplicativo completo de launcher e otimizador de desempenho para Roblox no Android, desenhado sob a linguagem de design Samsung One UI. Ele permite ajustar parâmetros gráficos avançados, gerar arquivos de FastFlags (`ClientAppSettings.json`) para desbloquear FPS e reduzir texturas pesadas, configurar o display de 120Hz do Galaxy S20+ e iniciar jogos diretamente via protocolo `roblox://`.

---

## Decisões Confirmadas com o Usuário

> [!IMPORTANT]
> - **Foco Principal**: Hub Completo integrando Otimizador FastFlags, Game Booster e Launcher com protocolo `roblox://`.
> - **Método de Aplicação no Android (S20+)**: Perfis prontos de desempenho com exportação direta de arquivos (`ClientAppSettings.json`, scripts e presets) com guia interativo passo a passo para o gerenciador de arquivos (ZArchiver / SAF) e Shizuku.
> - **Identidade Visual**: Samsung One UI limpa e moderna, com paleta dark/light suave, cantos arredondados (squircle One UI), tipografia legível, botões de toque com tamanho ergonômico (≥48px) para uso com uma mão na tela de 6,7" do S20+.

---

## 1. Visão Geral e Conceito Central

### O que o aplicativo faz
O **RoBoost S20+ Edition** transforma a experiência de jogar Roblox no Galaxy S20+ (Snapdragon 865 ou Exynos 990), eliminando travamentos causados por thermal throttling e resolução nativa excessiva (QHD+/FHD+):
1. **Launcher de Jogos Direto**: Catálogo de jogos favoritos e recentes com botão "Jogar Agora" acionando a URI nativa `roblox://placeId=...` ou abrindo o app oficial instantaneamente.
2. **Gerador e Editor de FastFlags (Estilo Bloxstrap para Android)**:
   - Desbloqueador de FPS (60, 90, 120 FPS para a tela fluida de 120Hz do S20+).
   - Redutor de partículas, sombras dinâmicas, iluminação Future-to-Voxel e pós-processamento.
   - Texturas otimizadas e renderizador Vulkan / GLES ajustado.
   - Presets prontos: **Ultra Fluido 120Hz** (foco em suavidade), **Batata / Competitivo** (máximo FPS para jogos pesados como Blox Fruits/Bedwars), **Equilibrado One UI** e **Economia de Bateria / Baixa Temperatura**.
3. **Game Booster S20+ & Guia One UI**:
   - Recomendações e comandos de otimização específicos da Samsung (Game Plugins, Perf Z, GOS Priority Mode, RAM Plus, Resolução via ADB/Shizuku).
   - Injetor e exportador de `ClientAppSettings.json` com guia visual passo a passo para colocar na pasta do Roblox via SAF ou ZArchiver sem precisar de computador.
4. **PWA Mobile-First**:
   - Instalável na tela inicial do celular pelo Chrome/Samsung Internet com 1 toque, funcionando offline e sem barras de navegação do browser.

---

## 2. Experiência do Usuário e Design Visual (Samsung One UI)

### Estilo e Identidade
- **DNA One UI**: Cabeçalhos amplos e acolhedores no topo, facilitando o alcance dos dedos na metade inferior da tela de 6,7 polegadas do S20+. Cantos suaves (`rounded-2xl` e `rounded-3xl`), sombras discretas e cartões de agrupamento limpos.
- **Paleta de Cores**:
  - *Fundo principal*: `#0B0F19` (Modo Noturno Profundo AMOLED para economizar bateria no display Dynamic AMOLED 2X do S20+) ou `#F4F6FB` no modo claro.
  - *Superfícies*: `#161D2F` com bordas sutis `rgba(255, 255, 255, 0.08)`.
  - *Acentos One UI*: Azul Samsung `#2D68FF` / `#4C82FF` e Verde de Eficiência `#10B981`.
- **Navegação Ergonômica Inferior (Bottom Navigation Bar)**:
  - **Início / Launcher**: Monitor de status, seleção de perfil rápido e jogos em destaque com botão de lançamento imediato.
  - **Otimizador / FastFlags**: Toggles detalhados de FPS, sombras, texturas, iluminação e renderizador.
  - **Exportar & Instalar**: Gerador do arquivo `ClientAppSettings.json`, download direto e tutorial interativo com imagens/diagramas de injeção no S20+.
  - **Ajustes S20+**: Dicas de Game Booster, taxa de 120Hz forçada, resolução e resfriamento do Exynos/Snapdragon.

---

## 3. Decisões Técnicas e Funcionalidades Detalhadas

```
┌────────────────────────────────────────────────────────────────────────┐
│                   ROBOOST HUB - SAMSUNG GALAXY S20+                    │
├────────────────────────────────┬───────────────────────────────────────┤
│        LAUNCHER ENGINE         │          OPTIMIZER ENGINE             │
│  - roblox:// URI Launcher      │  - FastFlag Parser & JSON Generator   │
│  - Catálogo de Games Populares │  - Presets (120Hz, Batata, Equilibrado)│
│  - Jogos Personalizados        │  - Texture, Shadow & Shader Toggles   │
├────────────────────────────────┴───────────────────────────────────────┤
│                       PAINEL S20+ ONE UI TOOLS                         │
│  - Guia SAF / ZArchiver para /Android/data                             │
│  - Shizuku & Termux comandos de resolução (ex: wm size 720x1600)       │
│  - One UI Game Booster / Perf Z / 120Hz Refresh Rate Lock              │
├────────────────────────────────────────────────────────────────────────┤
│                       PWA / STORAGE / EXPORT                           │
│  - Salva preferências no LocalStorage                                  │
│  - Download de ClientAppSettings.json pronto com 1 clique              │
│  - Instalador PWA nativo na tela inicial do celular                    │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Geração de Arquivo `ClientAppSettings.json`**:
   - Cria o arquivo de configuração de FastFlags idêntico ao usado pelas comunidades de otimização de Roblox mobile.
   - Suporte a cópia do JSON para área de transferência ou download direto do arquivo com o nome correto.
2. **Guia Passo a Passo sem PC**:
   - Explicação ilustrada de como contornar a restrição de pasta do Android 11/12/13 no Galaxy S20+ usando o ZArchiver com Storage Access Framework (SAF) ou Shizuku.
3. **Lançador Direto de Jogos**:
   - Permite adicionar Place IDs ou links do Roblox (como Blox Fruits, Brookhaven, Blade Ball, Arsenal, Da Hood).
   - Ao clicar em "Iniciar", aciona o Intent/Deep Link `roblox://placeId={id}` que abre o jogo diretamente no app oficial do Roblox instalado no S20+.
4. **Calculadora e Testador de Latência / Ping**:
   - Teste de tempo de resposta com servidores do Roblox para selecionar melhores horários de jogo.

---

## 4. Plano de Implementação

1. **Instalação e Setup de Dependências**:
   - Ícones com `lucide-react` e suporte PWA.
2. **Desenvolvimento da Camada de Dados e FastFlags**:
   - Definição do catálogo de FastFlags testadas para mobile (FPS unlock, disable shadows, low poly terrains, rendering backend, particles).
   - Criação dos 4 perfis de fábrica + personalização total pelo usuário.
3. **Desenvolvimento dos Módulos da Interface (One UI)**:
   - `HeaderOneUI` e `BottomTabBar`: navegação por toque fluida.
   - `LauncherTab`: cartões de jogos rápidos, botão de iniciar com deep-link `roblox://` e status do perfil ativo.
   - `FastFlagsOptimizerTab`: toggles táteis One UI com feedback sonoro/vibração (haptic feedback API).
   - `S20PlusTweaksTab`: configurações de 120Hz, dicas térmicas e comandos de resolução para o S20+.
   - `ExportGuideTab`: assistente de instalação com visualizador de JSON, botão de download e passo a passo.
4. **Configuração de Manifesto PWA e Ícone**:
   - Configurar `index.html` e `manifest.json` com título "RoBoost S20+" e suporte a tela cheia no Android.
5. **Verificação e Compilação**:
   - Testar build com `compile_applet`.
