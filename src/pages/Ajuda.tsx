import React, { useState } from 'react';
import { 
  FileText, 
  BarChart3, 
  Search,
  Shield,
  Download,
  FileCheck,
  FilePlus,
  BookMarked,
  Upload,
  X,
  Trash2,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type TipoDocumento = 'instrucoes-normativas' | 'legislacao' | 'manuais' | 'formularios';

interface Documento {
  id: string;
  nome: string;
  tipo: TipoDocumento;
  dataUpload: string;
  tamanho: string;
  uploadPor: string;
}

export function Ajuda() {
  const { user } = useAuth();
  const [secaoAtiva, setSecaoAtiva] = useState<string>('contratos');
  const [buscaTexto, setBuscaTexto] = useState('');
  
  // Estados para upload de documentos
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadNome, setUploadNome] = useState('');
  const [uploadTipo, setUploadTipo] = useState<TipoDocumento>('instrucoes-normativas');
  const [uploadArquivo, setUploadArquivo] = useState<File | null>(null);

  // Função para buscar conteúdo
  const buscarConteudo = (texto: string) => {
    setBuscaTexto(texto);
    
    if (!texto.trim()) return;
    
    const textoLower = texto.toLowerCase();
    
    // Mapa de palavras-chave para seções
    const mapaBusca: Record<string, string> = {
      'cadastrar': 'contratos',
      'novo contrato': 'contratos',
      'editar': 'contratos',
      'documento': 'contratos',
      'upload': 'contratos',
      'relatório': 'relatorios',
      'exportar': 'relatorios',
      'excel': 'relatorios',
      'pdf': 'relatorios',
      'instrução normativa': 'documentos-normativos',
      'normativa': 'documentos-normativos',
      'legislação': 'documentos-normativos',
    };
    
    // Buscar correspondência
    for (const [palavra, secao] of Object.entries(mapaBusca)) {
      if (textoLower.includes(palavra)) {
        setSecaoAtiva(secao);
        return;
      }
    }
  };

  // Seções da ajuda focadas em gestão de contratos
  const secoes = [
    {
      id: 'contratos',
      titulo: 'Gestão de Contratos',
      icon: FileText,
      perfis: ['admin', 'gestor', 'fiscal']
    },
    {
      id: 'relatorios',
      titulo: 'Relatórios',
      icon: BarChart3,
      perfis: ['admin', 'gestor', 'fiscal']
    },
    {
      id: 'documentos-normativos',
      titulo: 'Documentos e Instruções Normativas',
      icon: BookMarked,
      perfis: ['admin', 'gestor', 'fiscal']
    }
  ];

  // Filtrar seções por perfil do usuário
  const secoesVisiveis = secoes.filter(secao => 
    secao.perfis.includes(user?.perfil || '')
  );

  // Função para fazer upload de documento
  const handleUpload = () => {
    if (!uploadNome.trim() || !uploadArquivo) {
      alert('Preencha o nome do documento e selecione um arquivo');
      return;
    }

    const novoDocumento: Documento = {
      id: Date.now().toString(),
      nome: uploadNome,
      tipo: uploadTipo,
      dataUpload: new Date().toLocaleDateString('pt-BR'),
      tamanho: (uploadArquivo.size / 1024 / 1024).toFixed(2) + ' MB',
      uploadPor: user?.nome || 'Administrador'
    };

    setDocumentos([...documentos, novoDocumento]);
    
    // Limpar formulário
    setUploadNome('');
    setUploadTipo('instrucoes-normativas');
    setUploadArquivo(null);
    setShowUploadModal(false);
    
    alert('Documento adicionado com sucesso!');
  };

  // Função para excluir documento
  const handleExcluir = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este documento?')) {
      setDocumentos(documentos.filter(doc => doc.id !== id));
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Cabeçalho */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-gray-900 mb-2">Central de Ajuda - Gestão de Contratos</h1>
            <p className="text-gray-600 text-sm md:text-base">
              Guia completo para utilização do Sistema ContratosJardim
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
            <Shield className="size-4 text-green-700 flex-shrink-0" />
            <span className="text-green-700 text-sm">
              {user?.perfil === 'admin' ? 'Administrador' : 
               user?.perfil === 'gestor' ? 'Gestor' : 
               'Fiscal'}
            </span>
          </div>
        </div>

        {/* Busca */}
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar na ajuda..."
              value={buscaTexto}
              onChange={(e) => buscarConteudo(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  buscarConteudo(buscaTexto);
                }
              }}
              className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Menu lateral */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:sticky lg:top-6">
            <h3 className="text-gray-700 mb-3 text-sm md:text-base">Tópicos</h3>
            <nav className="space-y-1">
              {secoesVisiveis.map((secao) => {
                const Icon = secao.icon;
                const ativo = secaoAtiva === secao.id;
                
                return (
                  <button
                    key={secao.id}
                    onClick={() => setSecaoAtiva(secao.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                      ativo
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`size-4 flex-shrink-0 ${ativo ? 'text-green-700' : 'text-gray-500'}`} />
                    <span className="text-sm">{secao.titulo}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-8">
            {secaoAtiva === 'contratos' && <SecaoContratos />}
            {secaoAtiva === 'relatorios' && <SecaoRelatorios />}
            {secaoAtiva === 'documentos-normativos' && (
              <SecaoDocumentosNormativos 
                documentos={documentos}
                onUploadClick={() => setShowUploadModal(true)}
                onExcluir={handleExcluir}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal de Upload */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900">Adicionar Documento Normativo</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Nome do documento */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Nome do Documento *
                </label>
                <input
                  type="text"
                  value={uploadNome}
                  onChange={(e) => setUploadNome(e.target.value)}
                  placeholder="Ex: Instrução Normativa 001/2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Tipo de documento */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Tipo de Documento *
                </label>
                <select
                  value={uploadTipo}
                  onChange={(e) => setUploadTipo(e.target.value as TipoDocumento)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="instrucoes-normativas">Instruções Normativas</option>
                  <option value="legislacao">Legislação Aplicável</option>
                  <option value="manuais">Manuais e Orientações</option>
                  <option value="formularios">Formulários e Modelos</option>
                </select>
              </div>

              {/* Upload de arquivo */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Arquivo *
                </label>
                <input
                  type="file"
                  onChange={(e) => setUploadArquivo(e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formatos aceitos: PDF, DOC, DOCX, XLS, XLSX (máx. 10MB)
                </p>
              </div>

              {uploadArquivo && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className="size-4 text-green-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{uploadArquivo.name}</p>
                      <p className="text-xs text-gray-500">
                        {(uploadArquivo.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Upload className="size-4" />
                Adicionar Documento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componentes de seções

function SecaoContratos() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-gray-900 mb-4">Gestão de Contratos</h2>

      <p className="text-gray-600 mb-6">
        O módulo de contratos permite cadastrar, editar, visualizar e gerenciar todos os 
        contratos municipais de forma centralizada e eficiente.
      </p>

      <h3 className="text-gray-900 mb-3">📝 Cadastrar Novo Contrato</h3>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <p className="text-green-800 text-sm mb-2">
          <strong>Perfis autorizados:</strong> Administrador e Gestor
        </p>
      </div>

      <ol className="text-gray-600 space-y-3">
        <li>
          <strong>Acesse o módulo:</strong>
          <ul className="mt-1 text-sm">
            <li>• Clique em <strong>"Contratos"</strong> no menu superior</li>
            <li>• Clique no botão <strong>"+ Novo contrato"</strong></li>
          </ul>
        </li>
        <li>
          <strong>Preencha os dados básicos:</strong>
          <ul className="mt-1 text-sm">
            <li>• <strong>Número do contrato</strong> - Identificação única</li>
            <li>• <strong>Objeto</strong> - Descrição detalhada do contrato</li>
            <li>• <strong>Tipo</strong> - Serviços, Obras, Fornecimento, etc.</li>
            <li>• <strong>Modalidade</strong> - Licitação, Pregão, Dispensa, etc.</li>
            <li>• <strong>Número do processo</strong> - Número do processo administrativo</li>
          </ul>
        </li>
        <li>
          <strong>Defina datas e valores:</strong>
          <ul className="mt-1 text-sm">
            <li>• <strong>Data de assinatura</strong></li>
            <li>• <strong>Data de início</strong></li>
            <li>• <strong>Data de término</strong></li>
            <li>• <strong>Valor total</strong> - Em reais (R$)</li>
          </ul>
        </li>
        <li>
          <strong>Identifique os responsáveis:</strong>
          <ul className="mt-1 text-sm">
            <li>• <strong>Contratada</strong> - Empresa ou fornecedor</li>
            <li>• <strong>CNPJ da contratada</strong></li>
            <li>• <strong>Secretaria responsável</strong></li>
            <li>• <strong>Gestor do contrato</strong></li>
            <li>• <strong>Fiscal do contrato</strong></li>
          </ul>
        </li>
        <li>
          <strong>Adicione informações extras (opcional):</strong>
          <ul className="mt-1 text-sm">
            <li>• <strong>Observações</strong> - Notas importantes</li>
            <li>• <strong>Tags</strong> - Palavras-chave para organização</li>
          </ul>
        </li>
        <li>
          <strong>Faça upload de documentos:</strong>
          <ul className="mt-1 text-sm">
            <li>• Contrato assinado (PDF)</li>
            <li>• Termos aditivos</li>
            <li>• Documentos complementares</li>
            <li>• Máximo de <strong>10MB por arquivo</strong></li>
          </ul>
        </li>
        <li>
          Clique em <strong>"Salvar contrato"</strong>
        </li>
      </ol>

      <h3 className="text-gray-900 mt-6 mb-3">🔍 Visualizar e Pesquisar Contratos</h3>
      
      <p className="text-gray-600 mb-3">
        Na página <strong>"Contratos"</strong>, você pode:
      </p>

      <ul className="text-gray-600 space-y-2">
        <li>
          <strong>Pesquisar:</strong> Use a barra de busca para encontrar por número, 
          objeto, contratada ou processo
        </li>
        <li>
          <strong>Filtrar:</strong> Clique em "Filtros" para refinar por:
          <ul className="mt-1 text-sm ml-4">
            <li>• Status (Vigente, Alerta, Vencido)</li>
            <li>• Secretaria</li>
            <li>• Tipo de contrato</li>
            <li>• Período</li>
          </ul>
        </li>
        <li>
          <strong>Ordenar:</strong> Clique nos cabeçalhos da tabela para ordenar
        </li>
        <li>
          <strong>Visualizar detalhes:</strong> Clique em qualquer contrato para ver 
          informações completas
        </li>
      </ul>

      <h3 className="text-gray-900 mt-6 mb-3">✏️ Editar Contrato</h3>
      
      <ol className="text-gray-600 space-y-2">
        <li>Acesse a lista de contratos</li>
        <li>Clique no contrato que deseja editar</li>
        <li>Clique no botão <strong>"Editar"</strong></li>
        <li>Altere as informações necessárias</li>
        <li>Clique em <strong>"Salvar alterações"</strong></li>
      </ol>

      <h3 className="text-gray-900 mt-6 mb-3">📎 Gerenciar Documentos Contratuais</h3>
      
      <p className="text-gray-600 mb-3">
        Cada contrato pode ter múltiplos documentos anexados:
      </p>

      <ul className="text-gray-600 space-y-2">
        <li><strong>Upload:</strong> Clique em "Adicionar documento" na edição do contrato</li>
        <li><strong>Download:</strong> Clique no nome do documento para baixar</li>
        <li><strong>Excluir:</strong> Clique no ícone de lixeira ao lado do documento</li>
        <li><strong>Formatos aceitos:</strong> PDF, DOC, DOCX, XLS, XLSX, JPG, PNG</li>
        <li><strong>Tamanho máximo:</strong> 10MB por arquivo</li>
      </ul>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="size-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-blue-900 mb-1">💡 Dica</h4>
            <p className="text-blue-800 text-sm mb-0">
              Organize seus documentos com nomes descritivos. Exemplo: "Contrato_123-2024_Assinado.pdf", 
              "Termo_Aditivo_01_Contrato_123.pdf"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecaoRelatorios() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-gray-900 mb-4">Relatórios de Contratos</h2>

      <p className="text-gray-600 mb-6">
        O módulo de relatórios permite gerar análises detalhadas dos contratos municipais 
        e exportar dados em diversos formatos para uso gerencial.
      </p>

      <h3 className="text-gray-900 mb-3">📊 Tipos de Relatórios</h3>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-gray-900 mb-2">📈 Relatório Geral de Contratos</h4>
          <p className="text-gray-600 text-sm mb-2">
            Lista completa de todos os contratos municipais cadastrados.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Número, objeto e contratada</li>
            <li>• Datas de início e término</li>
            <li>• Valores e status</li>
            <li>• Gestor e fiscal responsáveis</li>
            <li>• Secretaria vinculada</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-gray-900 mb-2">⚠️ Relatório de Contratos com Alerta</h4>
          <p className="text-gray-600 text-sm mb-2">
            Contratos que vencem em 90 dias ou menos.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Dias restantes para vencimento</li>
            <li>• Priorização por urgência</li>
            <li>• Ações recomendadas</li>
            <li>• Responsáveis a serem notificados</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-gray-900 mb-2">🔴 Relatório de Contratos Vencidos</h4>
          <p className="text-gray-600 text-sm mb-2">
            Contratos com data de término já ultrapassada.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Dias em atraso</li>
            <li>• Necessidade de renovação ou encerramento</li>
            <li>• Histórico de ações</li>
            <li>• Impacto no serviço público</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-gray-900 mb-2">🏛️ Relatório por Secretaria</h4>
          <p className="text-gray-600 text-sm mb-2">
            Agrupa contratos por secretaria municipal responsável.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Total de contratos por pasta</li>
            <li>• Valores consolidados</li>
            <li>• Status de cada secretaria</li>
            <li>• Alertas e vencimentos por órgão</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-gray-900 mb-2">💰 Relatório Financeiro</h4>
          <p className="text-gray-600 text-sm mb-2">
            Análise dos valores dos contratos municipais.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Valor total contratado</li>
            <li>• Distribuição por tipo e modalidade</li>
            <li>• Evolução temporal</li>
            <li>• Consolidação por exercício financeiro</li>
          </ul>
        </div>
      </div>

      <h3 className="text-gray-900 mt-6 mb-3">📥 Exportar Relatórios</h3>

      <p className="text-gray-600 mb-3">
        Todos os relatórios podem ser exportados nos seguintes formatos:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-3 text-center">
          <Download className="size-6 text-green-600 mx-auto mb-2" />
          <h4 className="text-gray-900 text-sm mb-1">Excel (.xlsx)</h4>
          <p className="text-gray-600 text-xs mb-0">
            Ideal para análises e planilhas
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-3 text-center">
          <Download className="size-6 text-red-600 mx-auto mb-2" />
          <h4 className="text-gray-900 text-sm mb-1">PDF (.pdf)</h4>
          <p className="text-gray-600 text-xs mb-0">
            Ideal para impressão e apresentações
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-3 text-center">
          <Download className="size-6 text-blue-600 mx-auto mb-2" />
          <h4 className="text-gray-900 text-sm mb-1">CSV (.csv)</h4>
          <p className="text-gray-600 text-xs mb-0">
            Ideal para importação em outros sistemas
          </p>
        </div>
      </div>

      <h3 className="text-gray-900 mt-6 mb-3">🎯 Como Gerar um Relatório</h3>

      <ol className="text-gray-600 space-y-2">
        <li>Clique em <strong>"Relatórios"</strong> no menu superior</li>
        <li>Selecione o <strong>tipo de relatório</strong> desejado</li>
        <li>Configure os <strong>filtros</strong> (período, secretaria, status, etc.)</li>
        <li>Clique em <strong>"Gerar relatório"</strong></li>
        <li>Visualize o resultado na tela</li>
        <li>Clique em <strong>"Exportar"</strong> e escolha o formato (Excel, PDF ou CSV)</li>
        <li>O arquivo será baixado automaticamente</li>
      </ol>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="size-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-blue-900 mb-1">💡 Dica</h4>
            <p className="text-blue-800 text-sm mb-0">
              Use os filtros para gerar relatórios específicos. Por exemplo, você pode gerar 
              um relatório apenas dos contratos da Secretaria de Saúde que vencem nos próximos 30 dias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecaoDocumentosNormativos({ documentos, onUploadClick, onExcluir }: { documentos: Documento[], onUploadClick: () => void, onExcluir: (id: string) => void }) {
  const { user } = useAuth();
  const isAdmin = user?.perfil === 'admin';

  // Filtrar documentos por tipo
  const getTipoLabel = (tipo: TipoDocumento) => {
    const labels = {
      'instrucoes-normativas': 'Instruções Normativas',
      'legislacao': 'Legislação Aplicável',
      'manuais': 'Manuais e Orientações',
      'formularios': 'Formulários e Modelos'
    };
    return labels[tipo];
  };

  const documentosPorTipo = {
    'instrucoes-normativas': documentos.filter(d => d.tipo === 'instrucoes-normativas'),
    'legislacao': documentos.filter(d => d.tipo === 'legislacao'),
    'manuais': documentos.filter(d => d.tipo === 'manuais'),
    'formularios': documentos.filter(d => d.tipo === 'formularios')
  };

  return (
    <div className="prose max-w-none">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-900 mb-0">Documentos e Instruções Normativas</h2>
        {isAdmin && (
          <button
            onClick={onUploadClick}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <FilePlus className="size-4" />
            Adicionar Documento
          </button>
        )}
      </div>

      <p className="text-gray-600 mb-6">
        Biblioteca de documentos normativos, instruções técnicas, manuais e 
        legislações aplicáveis à gestão de contratos municipais.
      </p>

      {isAdmin && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="size-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-blue-900 mb-1">🔐 Acesso Administrativo</h4>
              <p className="text-blue-800 text-sm mb-0">
                Como Administrador, você pode fazer upload e excluir documentos normativos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instruções Normativas */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FileCheck className="size-5 text-purple-600" />
          <h3 className="text-gray-900 mb-0">Instruções Normativas</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Normas internas da CGM sobre procedimentos de gestão de contratos, 
          fluxos de aprovação e documentação obrigatória.
        </p>
        
        {documentosPorTipo['instrucoes-normativas'].length > 0 ? (
          <div className="space-y-2">
            {documentosPorTipo['instrucoes-normativas'].map(doc => (
              <div key={doc.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-purple-600" />
                      <h4 className="text-gray-900 text-sm mb-0">{doc.nome}</h4>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">{doc.dataUpload}</span>
                      <span className="text-xs text-gray-500">{doc.tamanho}</span>
                      <span className="text-xs text-gray-500">Por: {doc.uploadPor}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1"
                    >
                      <Download className="size-3" />
                      Baixar
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => onExcluir(doc.id)}
                        className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="size-3" />
                        Excluir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm mb-0">Nenhum documento cadastrado nesta categoria</p>
          </div>
        )}
      </div>

      {/* Legislação Aplicável */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <BookMarked className="size-5 text-blue-600" />
          <h3 className="text-gray-900 mb-0">Legislação Aplicável</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Leis municipais, estaduais e federais relacionadas a contratos públicos, 
          licitações e gestão administrativa (Lei 8.666/93, Lei 14.133/2021, etc.).
        </p>
        
        {documentosPorTipo['legislacao'].length > 0 ? (
          <div className="space-y-2">
            {documentosPorTipo['legislacao'].map(doc => (
              <div key={doc.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-blue-600" />
                      <h4 className="text-gray-900 text-sm mb-0">{doc.nome}</h4>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">{doc.dataUpload}</span>
                      <span className="text-xs text-gray-500">{doc.tamanho}</span>
                      <span className="text-xs text-gray-500">Por: {doc.uploadPor}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1"
                    >
                      <Download className="size-3" />
                      Baixar
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => onExcluir(doc.id)}
                        className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="size-3" />
                        Excluir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm mb-0">Nenhum documento cadastrado nesta categoria</p>
          </div>
        )}
      </div>

      {/* Manuais e Orientações */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="size-5 text-green-600" />
          <h3 className="text-gray-900 mb-0">Manuais e Orientações</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Guias práticos, checklists, modelos de documentos e orientações técnicas 
          para gestores e fiscais de contratos.
        </p>
        
        {documentosPorTipo['manuais'].length > 0 ? (
          <div className="space-y-2">
            {documentosPorTipo['manuais'].map(doc => (
              <div key={doc.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-green-600" />
                      <h4 className="text-gray-900 text-sm mb-0">{doc.nome}</h4>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">{doc.dataUpload}</span>
                      <span className="text-xs text-gray-500">{doc.tamanho}</span>
                      <span className="text-xs text-gray-500">Por: {doc.uploadPor}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1"
                    >
                      <Download className="size-3" />
                      Baixar
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => onExcluir(doc.id)}
                        className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="size-3" />
                        Excluir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm mb-0">Nenhum documento cadastrado nesta categoria</p>
          </div>
        )}
      </div>

      {/* Formulários e Modelos */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Download className="size-5 text-orange-600" />
          <h3 className="text-gray-900 mb-0">Formulários e Modelos</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Templates padronizados de termos aditivos, relatórios de fiscalização, 
          notificações e demais documentos utilizados na gestão contratual.
        </p>
        
        {documentosPorTipo['formularios'].length > 0 ? (
          <div className="space-y-2">
            {documentosPorTipo['formularios'].map(doc => (
              <div key={doc.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-orange-600" />
                      <h4 className="text-gray-900 text-sm mb-0">{doc.nome}</h4>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">{doc.dataUpload}</span>
                      <span className="text-xs text-gray-500">{doc.tamanho}</span>
                      <span className="text-xs text-gray-500">Por: {doc.uploadPor}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1"
                    >
                      <Download className="size-3" />
                      Baixar
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => onExcluir(doc.id)}
                        className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="size-3" />
                        Excluir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm mb-0">Nenhum documento cadastrado nesta categoria</p>
          </div>
        )}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="size-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="text-green-900 mb-1">💡 Importância</h4>
            <p className="text-green-800 text-sm mb-0">
              Consultar regularmente as instruções normativas garante que a gestão dos contratos 
              esteja em conformidade com as normas internas da CGM e a legislação vigente, 
              evitando irregularidades e garantindo a eficiência dos processos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}