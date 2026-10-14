import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  FolderPlus, 
  Smartphone, 
  Terminal, 
  AlertCircle, 
  ChevronRight, 
  CheckCircle2, 
  FileCode,
  FolderTree,
  ExternalLink
} from 'lucide-react';
import { FastFlag } from '../../types';
import { triggerHaptic } from '../../utils/haptics';

interface ExportGuideTabProps {
  flags: FastFlag[];
}

export const ExportGuideTab: React.FC<ExportGuideTabProps> = ({ flags }) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeMethod, setActiveMethod] = useState<'zarchiver' | 'shizuku' | 'termux'>('zarchiver');

  // Generate valid ClientAppSettings.json object
  const generateJsonConfig = () => {
    const config: Record<string, boolean | number> = {};
    flags.forEach((f) => {
      config[f.key] = f.currentValue;
    });
    return JSON.stringify(config, null, 2);
  };

  const jsonContent = generateJsonConfig();

  const handleCopyJson = () => {
    triggerHaptic('success');
    navigator.clipboard.writeText(jsonContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    triggerHaptic('success');
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ClientAppSettings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Top Action Card */}
      <section className="rounded-3xl bg-[#141C2E] border border-slate-800 p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Pronto para Instalação
          </span>
          <span className="text-xs text-slate-400">Arquivo Oficial Bloxstrap</span>
        </div>

        <h2 className="text-lg font-bold text-white tracking-tight">
          Exportar ClientAppSettings.json
        </h2>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Baixe o arquivo de configuração gerado para o seu Galaxy S20+ e copie para a pasta do Roblox sem precisar de computador.
        </p>

        {/* Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleDownloadFile}
            className="flex-1 h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>
              {downloadSuccess ? 'Arquivo Baixado!' : 'Baixar ClientAppSettings.json'}
            </span>
          </button>

          <button
            onClick={handleCopyJson}
            className="h-12 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Código JSON</span>
              </>
            )}
          </button>
        </div>

        {downloadSuccess && (
          <div className="mt-3 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              O arquivo <strong>ClientAppSettings.json</strong> foi salvo na pasta <strong>Downloads</strong> do seu celular! Siga o passo a passo abaixo.
            </span>
          </div>
        )}
      </section>

      {/* JSON Viewer */}
      <section className="rounded-3xl bg-[#0E1524] border border-slate-800 p-4 shadow-md">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono font-bold text-slate-300">
              ClientAppSettings.json
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            {Object.keys(JSON.parse(jsonContent)).length} flags configuradas
          </span>
        </div>

        <pre className="text-[11px] font-mono text-blue-300 bg-slate-950/70 p-3.5 rounded-2xl border border-slate-900 max-h-48 overflow-y-auto no-scrollbar whitespace-pre leading-relaxed">
          {jsonContent}
        </pre>
      </section>

      {/* Interactive Step-by-Step Guide for S20+ */}
      <section className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-emerald-400" />
            <span>Guia Passo a Passo no Galaxy S20+ (Sem PC)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Escolha o método mais fácil para o seu aparelho (ZArchiver com SAF ou Shizuku)
          </p>
        </div>

        {/* Method Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveMethod('zarchiver');
            }}
            className={`h-9 rounded-xl text-xs font-bold transition-all ${
              activeMethod === 'zarchiver'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. ZArchiver (Fácil)
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveMethod('shizuku');
            }}
            className={`h-9 rounded-xl text-xs font-bold transition-all ${
              activeMethod === 'shizuku'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Shizuku (Sem Bloqueio)
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveMethod('termux');
            }}
            className={`h-9 rounded-xl text-xs font-bold transition-all ${
              activeMethod === 'termux'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Termux / ADB
          </button>
        </div>

        {/* Method 1: ZArchiver + SAF */}
        {activeMethod === 'zarchiver' && (
          <div className="rounded-3xl bg-[#131B2D] border border-slate-800 p-5 space-y-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-300">
              <strong className="text-blue-400 block mb-1">Caminho de Destino no Galaxy S20+:</strong>
              <code className="text-[11px] font-mono text-emerald-300 bg-slate-900/90 px-2 py-1 rounded block truncate">
                /Android/data/com.roblox.client/files/ClientSettings/
              </code>
            </div>

            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white">Instale o ZArchiver</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Baixe gratuitamente o aplicativo <strong>ZArchiver</strong> pela Google Play Store no seu S20+.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white">Abra a pasta do Roblox</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    No ZArchiver, navegue até: <code className="text-blue-400">Android &gt; data &gt; com.roblox.client &gt; files</code>.
                    Quando o Android pedir permissão (SAF), toque em <strong>"Usar esta pasta"</strong> e depois em <strong>"Permitir"</strong>.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white">Crie a pasta ClientSettings</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Se você ainda não tiver essa pasta, toque no botão <strong>+</strong> no canto e crie uma nova pasta com o nome exato: <code className="text-emerald-400">ClientSettings</code> (respeite maiúsculas e minúsculas).
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white">Cole o ClientAppSettings.json</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Vá até a pasta <strong>Download</strong>, copie o arquivo <strong>ClientAppSettings.json</strong> que você acabou de baixar e cole dentro de <code className="text-blue-400">ClientSettings</code>.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  5
                </span>
                <div>
                  <h5 className="text-xs font-bold text-emerald-400">Abra o Roblox pelo Launcher!</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Feche o Roblox e abra-o novamente usando a aba <strong>Launcher</strong> do RoBoost. Seus 120 FPS e gráficos otimizados estarão ativos!
                  </p>
                </div>
              </li>
            </ol>
          </div>
        )}

        {/* Method 2: Shizuku */}
        {activeMethod === 'shizuku' && (
          <div className="rounded-3xl bg-[#131B2D] border border-slate-800 p-5 space-y-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-300">
              <strong className="text-emerald-400 block mb-1">Por que usar Shizuku no Galaxy S20+?</strong>
              <p className="text-[11px] leading-relaxed">
                Na One UI 5 (Android 13), o Google aumentou o bloqueio da pasta <code className="text-white">/Android/data</code>. O Shizuku contorna essa restrição usando Depuração Sem Fio (Wireless Debugging) nativa da Samsung, sem conectar nenhum cabo USB ou PC.
              </p>
            </div>

            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white">Ative a Depuração Sem Fio</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Em <strong>Configurações &gt; Opções do desenvolvedor</strong>, ative <strong>"Depuração sem fio"</strong> (conectado ao Wi-Fi).
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white">Pareie com o Shizuku</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Abra o app <strong>Shizuku</strong>, toque em "Parear" e insira o código de 6 dígitos da notificação da Samsung.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white">Use o MT Manager ou FV File Manager</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Esses gerenciadores com suporte ao Shizuku copiam o arquivo <code className="text-blue-400">ClientAppSettings.json</code> direto para a pasta do Roblox com 1 toque, sem nenhum aviso de bloqueio.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        )}

        {/* Method 3: Termux */}
        {activeMethod === 'termux' && (
          <div className="rounded-3xl bg-[#131B2D] border border-slate-800 p-5 space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Se você possui o <strong>Termux</strong> instalado no seu S20+ com permissão root ou Shizuku Rish, pode copiar o arquivo instantaneamente com uma única linha de comando:
            </p>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto select-all">
              mkdir -p /sdcard/Android/data/com.roblox.client/files/ClientSettings && cp /sdcard/Download/ClientAppSettings.json /sdcard/Android/data/com.roblox.client/files/ClientSettings/
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
