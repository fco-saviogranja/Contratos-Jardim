import React, { useState } from 'react';
import { Sun, Moon, Monitor, Eye, Palette, Layout, Type } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AparenciaLayout() {
  const [tema, setTema] = useState('claro');
  const [identidadeVisual, setIdentidadeVisual] = useState('padrao');
  const [densidade, setDensidade] = useState('padrao');
  const [fonte, setFonte] = useState('cgm');
  const [mostrarSubtitulo, setMostrarSubtitulo] = useState(true);
  const [mostrarLogo, setMostrarLogo] = useState(true);
  const [abasFixas, setAbasFixas] = useState(true);
  const [exibirRodape, setExibirRodape] = useState(true);
  const [contadorAlertas, setContadorAlertas] = useState(true);

  // Estado inicial para permitir descartar alterações
  const [configInicial] = useState({
    tema: 'claro',
    identidadeVisual: 'padrao',
    densidade: 'padrao',
    fonte: 'cgm',
    mostrarSubtitulo: true,
    mostrarLogo: true,
    abasFixas: true,
    exibirRodape: true,
    contadorAlertas: true
  });

  const handleSalvar = () => {
    // Aqui você pode salvar no backend ou localStorage
    localStorage.setItem('aparenciaConfig', JSON.stringify({
      tema,
      identidadeVisual,
      densidade,
      fonte,
      mostrarSubtitulo,
      mostrarLogo,
      abasFixas,
      exibirRodape,
      contadorAlertas
    }));

    toast.success('Configurações de aparência salvas com sucesso!');
  };

  const handleDescartar = () => {
    setTema(configInicial.tema);
    setIdentidadeVisual(configInicial.identidadeVisual);
    setDensidade(configInicial.densidade);
    setFonte(configInicial.fonte);
    setMostrarSubtitulo(configInicial.mostrarSubtitulo);
    setMostrarLogo(configInicial.mostrarLogo);
    setAbasFixas(configInicial.abasFixas);
    setExibirRodape(configInicial.exibirRodape);
    setContadorAlertas(configInicial.contadorAlertas);
    
    toast.info('Alterações descartadas');
  };

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-[#102a43] text-2xl mb-1 font-medium">
          Aparência e layout
        </h1>
        <p className="text-gray-600 text-sm">
          Personalize a aparência do sistema de acordo com suas preferências de acessibilidade e usabilidade.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tema do sistema */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="size-5 text-[#0b6b3a]" />
            <h2 className="text-[#102a43] font-medium">
              Tema do sistema
            </h2>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="tema"
                value="claro"
                checked={tema === 'claro'}
                onChange={(e) => setTema(e.target.value)}
                className="size-4"
              />
              <Sun className="size-5 text-amber-500" />
              <div className="flex-1">
                <span className="text-[#102a43] text-sm font-medium">
                  Tema claro
                </span>
                <p className="text-gray-600 text-sm">
                  Interface com fundo claro (padrão)
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="tema"
                value="escuro"
                checked={tema === 'escuro'}
                onChange={(e) => setTema(e.target.value)}
                className="size-4"
              />
              <Moon className="size-5 text-indigo-500" />
              <div className="flex-1">
                <span className="text-[#102a43] text-sm font-medium">
                  Tema escuro
                </span>
                <p className="text-gray-600 text-sm">
                  Reduz cansaço visual em ambientes com pouca luz
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="tema"
                value="auto"
                checked={tema === 'auto'}
                onChange={(e) => setTema(e.target.value)}
                className="size-4"
              />
              <Monitor className="size-5 text-gray-500" />
              <div className="flex-1">
                <span className="text-[#102a43] text-sm font-medium">
                  Seguir configuração do navegador
                </span>
                <p className="text-gray-600 text-sm">
                  Adapta automaticamente ao tema do sistema
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Modo de exibição */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="size-5 text-[#0b6b3a]" />
            <h2 className="text-[#102a43] font-medium">
              Modo de exibição
            </h2>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Ajusta contraste e tamanho de texto para usuários da Controladoria.
          </p>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="identidade"
                value="padrao"
                checked={identidadeVisual === 'padrao'}
                onChange={(e) => setIdentidadeVisual(e.target.value)}
                className="size-4"
              />
              <div className="flex-1">
                <span className="text-[#102a43] text-sm font-medium">
                  Padrão CGM Jardim
                </span>
                <p className="text-gray-600 text-sm">
                  Verde institucional, legibilidade padrão
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="identidade"
                value="alto_contraste"
                checked={identidadeVisual === 'alto_contraste'}
                onChange={(e) => setIdentidadeVisual(e.target.value)}
                className="size-4"
              />
              <div className="flex-1">
                <span className="text-[#102a43] text-sm font-medium">
                  Alto contraste
                </span>
                <p className="text-gray-600 text-sm">
                  Cores mais intensas, ideal para acessibilidade
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Exibição do cabeçalho */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Layout className="size-5 text-[#0b6b3a]" />
            <h2 className="text-[#102a43] font-medium">
              Exibição do cabeçalho
            </h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-[#102a43] text-sm font-medium block">
                  Mostrar subtítulo do sistema
                </span>
                <p className="text-gray-600 text-sm">
                  "Sistema Interno de Gestão de Contratos"
                </p>
              </div>
              <input
                type="checkbox"
                checked={mostrarSubtitulo}
                onChange={(e) => setMostrarSubtitulo(e.target.checked)}
                className="size-5 text-[#0b6b3a] rounded"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-[#102a43] text-sm font-medium block">
                  Exibir brasão/logotipo
                </span>
                <p className="text-gray-600 text-sm">
                  Mostra o logo no cabeçalho
                </p>
              </div>
              <input
                type="checkbox"
                checked={mostrarLogo}
                onChange={(e) => setMostrarLogo(e.target.checked)}
                className="size-5 text-[#0b6b3a] rounded"
              />
            </label>
          </div>
        </div>

        {/* Layout e densidade */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Layout className="size-5 text-[#0b6b3a]" />
            <h2 className="text-[#102a43] font-medium">
              Layout e densidade
            </h2>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-3 font-medium">
              Densidade de informação
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="densidade"
                  value="confortavel"
                  checked={densidade === 'confortavel'}
                  onChange={(e) => setDensidade(e.target.value)}
                  className="size-4"
                />
                <span className="text-gray-600 text-sm">
                  Confortável (mais espaçamento)
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="densidade"
                  value="padrao"
                  checked={densidade === 'padrao'}
                  onChange={(e) => setDensidade(e.target.value)}
                  className="size-4"
                />
                <span className="text-gray-600 text-sm">
                  Padrão
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="densidade"
                  value="compacto"
                  checked={densidade === 'compacto'}
                  onChange={(e) => setDensidade(e.target.value)}
                  className="size-4"
                />
                <span className="text-gray-600 text-sm">
                  Compacto (mais informações visíveis)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Elementos de navegação */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Layout className="size-5 text-[#0b6b3a]" />
            <h2 className="text-[#102a43] font-medium">
              Elementos de navegação
            </h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-[#102a43] text-sm font-medium">
                Manter abas sempre fixas no topo
              </span>
              <input
                type="checkbox"
                checked={abasFixas}
                onChange={(e) => setAbasFixas(e.target.checked)}
                className="size-5 text-[#0b6b3a] rounded"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-[#102a43] text-sm font-medium">
                Exibir rodapé institucional
              </span>
              <input
                type="checkbox"
                checked={exibirRodape}
                onChange={(e) => setExibirRodape(e.target.checked)}
                className="size-5 text-[#0b6b3a] rounded"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-[#102a43] text-sm font-medium">
                Mostrar contador de alertas
              </span>
              <input
                type="checkbox"
                checked={contadorAlertas}
                onChange={(e) => setContadorAlertas(e.target.checked)}
                className="size-5 text-[#0b6b3a] rounded"
              />
            </label>
          </div>
        </div>

        {/* Padrão de fonte */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Type className="size-5 text-[#0b6b3a]" />
            <h2 className="text-[#102a43] font-medium">
              Padrão de fonte
            </h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="fonte"
                value="cgm"
                checked={fonte === 'cgm'}
                onChange={(e) => setFonte(e.target.value)}
                className="size-4"
              />
              <div className="flex-1">
                <span className="text-[#102a43] text-sm font-medium">
                  Fonte do portal CGM (Inter)
                </span>
                <p className="text-gray-600 text-sm">
                  Fonte padrão do sistema
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="fonte"
                value="legibilidade"
                checked={fonte === 'legibilidade'}
                onChange={(e) => setFonte(e.target.value)}
                className="size-4"
              />
              <div className="flex-1">
                <span className="text-[#102a43] text-sm font-medium">
                  Fonte alternativa de alta legibilidade
                </span>
                <p className="text-gray-600 text-sm">
                  Recomendada para acessibilidade
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex justify-end gap-3">
        <button
          className="px-6 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium"
          onClick={handleDescartar}
        >
          Descartar alterações
        </button>
        <button
          className="px-6 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
          onClick={handleSalvar}
        >
          Salvar configurações de layout
        </button>
      </div>
    </div>
  );
}