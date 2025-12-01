import React, { useState, useEffect } from 'react';
import { exportToCSV, exportToExcel, exportToPDF, ContratoExport } from '../utils/exportUtils';
import { ImportarExcelModal } from '../components/ImportarExcelModal';
import { Search, Download, Edit, FileText, ChevronDown, Plus, Upload, X } from 'lucide-react';
import { contratos as contratosAPI } from '../utils/api';
import { MOCK_CONTRATOS } from '../utils/mockData';
import { useSecretarias } from '../hooks/useSecretarias';
import { useAuth } from '../contexts/AuthContext';

interface TodosContratosProps {
  onNavigate: (page: string) => void;
}

export function TodosContratos({ onNavigate }: TodosContratosProps) {
  const { user } = useAuth();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAcaoModal, setShowAcaoModal] = useState(false);
  const [contratoSelecionado, setContratoSelecionado] = useState<any>(null);
  const [contratoEditado, setContratoEditado] = useState<any>(null);
  const [acaoTexto, setAcaoTexto] = useState('');
  const [filtros, setFiltros] = useState({
    busca: '',
    secretaria: 'todas',
    situacao: 'todas',
    gestor: 'todos'
  });
  
  // Verificar se o usuário pode editar contratos
  const podeEditar = user?.perfil === 'Administrador CGM' || user?.perfil === 'Gestor de Contratos';

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [contratos, setContratos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { secretarias } = useSecretarias();
  
  // Carregar contratos da API
  useEffect(() => {
    const carregarContratos = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Carregando contratos da API...');
        const response = await contratosAPI.getAll();
        
        console.log('📦 Resposta completa da API:', response);
        
        if (response.success && response.contratos) {
          console.log(`✅ ${response.contratos.length} contratos carregados da API`);
          console.log('📋 Primeiros 3 contratos:', response.contratos.slice(0, 3));
          setContratos(response.contratos);
        } else {
          console.warn('⚠️ Resposta da API sem contratos');
          setContratos([]);
        }
      } catch (err) {
        console.error('❌ Erro ao carregar contratos da API:', err);
        console.log('🔄 Usando dados mock como fallback');
        setError('Não foi possível conectar ao servidor. Usando dados de exemplo.');
        setContratos(MOCK_CONTRATOS);
      } finally {
        setLoading(false);
      }
    };

    carregarContratos();
  }, []);
  
  // Para usar os contratos diretamente (no futuro será com filtros)
  const filteredContratos = contratos;

  const handleLimparFiltros = () => {
    setFiltros({
      busca: '',
      secretaria: 'todas',
      situacao: 'todas',
      gestor: 'todos'
    });
  };

  const aplicarFiltros = () => {
    console.log('Aplicando filtros:', filtros);
    // No futuro: fetchContratos(filtros);
  };

  const handleEditar = (contratoId: string) => {
    console.log('Editar contrato:', contratoId);
    // No futuro: onNavigate(`editar-contrato/${contratoId}`);
    const contrato = contratos.find(c => c.id === contratoId);
    if (contrato) {
      setContratoSelecionado(contrato);
      setContratoEditado({ ...contrato });
      setShowEditModal(true);
    }
  };

  const handleRegistrarAcao = (contratoId: string) => {
    console.log('Registrar ação para contrato:', contratoId);
    const contrato = contratos.find(c => c.id === contratoId);
    if (contrato) {
      setContratoSelecionado(contrato);
      setShowAcaoModal(true);
    }
  };
  
  // Paginação
  const ITENS_POR_PAGINA = 10;
  const totalPaginas = Math.ceil(filteredContratos.length / ITENS_POR_PAGINA);
  const indiceInicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const indiceFim = indiceInicio + ITENS_POR_PAGINA;
  const contratosPaginados = filteredContratos.slice(indiceInicio, indiceFim);
  
  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };
  
  const handleProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };
  
  const handleIrParaPagina = (pagina: number) => {
    setPaginaAtual(pagina);
  };
  
  // Resetar para página 1 quando filtros mudarem
  useEffect(() => {
    setPaginaAtual(1);
  }, [filtros]);

  // Função para preparar dados para exportação
  const prepararDadosExportacao = (): ContratoExport[] => {
    return filteredContratos.map(contrato => ({
      numero: contrato.numero,
      objeto: contrato.objeto,
      contratado: contrato.contratado,
      valor: contrato.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
      inicio: new Date(contrato.dataInicio).toLocaleDateString('pt-BR'),
      vencimento: new Date(contrato.dataFinal).toLocaleDateString('pt-BR'),
      situacao: contrato.situacao,
      gestor: contrato.gestor,
      secretaria: contrato.secretaria
    }));
  };

  const handleExport = (formato: 'csv' | 'excel' | 'pdf') => {
    const dados = prepararDadosExportacao();
    
    switch (formato) {
      case 'csv':
        exportToCSV(dados, 'contratos');
        break;
      case 'excel':
        exportToExcel(dados, 'contratos');
        break;
      case 'pdf':
        exportToPDF(dados, 'contratos');
        break;
    }
    
    setShowExportMenu(false);
  };

  const getSituacaoBadge = (status: string) => {
    // Mapeamento de status do banco para situações de exibição
    const statusMap: Record<string, string> = {
      'ativo': 'vigente',
      'vigente': 'vigente',
      'proximo_vencimento': 'proximo_vencimento',
      'vencido': 'vencido',
      'encerrado': 'vencido'
    };
    
    const situacao = statusMap[status?.toLowerCase()] || 'vigente';
    
    const styles = {
      vigente: 'bg-green-100 text-green-700',
      proximo_vencimento: 'bg-amber-100 text-amber-700',
      vencido: 'bg-red-100 text-red-700'
    };
    
    const labels = {
      vigente: 'Vigente',
      proximo_vencimento: 'Próx. vencimento',
      vencido: 'Vencido'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[situacao as keyof typeof styles]}`}>
        {labels[situacao as keyof typeof labels]}
      </span>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#102a43] text-2xl mb-1 font-medium">
            Contratos {loading ? '(carregando...)' : `(${contratos.length})`}
          </h1>
          <p className="text-gray-600 text-sm">
            Visualização consolidada de contratos de todas as secretarias e órgãos.
          </p>
          {error && (
            <p className="text-amber-600 text-sm mt-1">
              ⚠️ {error}
            </p>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('cadastro-contrato')}
            className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] flex items-center gap-2 font-medium"
          >
            <Plus className="size-4" />
            Cadastro de contrato
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] flex items-center gap-2 font-medium"
          >
            <Upload className="size-4" />
            Importar Excel
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 flex items-center gap-2 font-medium"
            >
              <Download className="size-4" />
              Exportar
              <ChevronDown className="size-4" />
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => handleExport('csv')}>
                  Exportar como CSV
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => handleExport('pdf')}>
                  Exportar como PDF
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => handleExport('excel')}>
                  Exportar como Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Número, objeto ou fornecedor"
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm"
                value={filtros.busca}
                onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Secretaria
            </label>
            <select
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm"
              value={filtros.secretaria}
              onChange={(e) => setFiltros({ ...filtros, secretaria: e.target.value })}
            >
              <option value="todas">Todas</option>
              {secretarias.map(secretaria => (
                <option key={secretaria.id} value={secretaria.id}>{secretaria.nome}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Situação
            </label>
            <select
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm"
              value={filtros.situacao}
              onChange={(e) => setFiltros({ ...filtros, situacao: e.target.value })}
            >
              <option value="todas">Todas</option>
              <option value="vigente">Vigente</option>
              <option value="proximo_vencimento">Próximo do vencimento</option>
              <option value="vencido">Vencido</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Gestor
            </label>
            <select
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm"
              value={filtros.gestor}
              onChange={(e) => setFiltros({ ...filtros, gestor: e.target.value })}
            >
              <option value="todos">Todos</option>
              <option value="carlos_souza">Carlos Souza</option>
              <option value="ana_pereira">Ana Pereira</option>
              <option value="roberto_alves">Roberto Alves</option>
            </select>
          </div>
          
          <button className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium" onClick={aplicarFiltros}>
            Filtrar
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 font-medium" onClick={handleLimparFiltros}>
            Limpar
          </button>
        </div>
      </div>

      {/* Tabela de contratos */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Número
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Objeto
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Fornecedor
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Vencimento
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Situação
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Gestor
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">{filteredContratos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="size-12 text-gray-300 mb-3" />
                      <p className="text-gray-600 font-medium mb-1">
                        Nenhum contrato cadastrado
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        Comece cadastrando um novo contrato ou importe via Excel
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onNavigate('cadastro-contrato')}
                          className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
                        >
                          Cadastrar primeiro contrato
                        </button>
                        <button
                          onClick={() => setShowImportModal(true)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium"
                        >
                          Importar Excel
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
              contratosPaginados.map((contrato) => (
                <tr key={contrato.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-[#102a43] text-sm font-medium">
                    {contrato.numero}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm max-w-xs truncate">
                    {contrato.objeto}
                  </td>
                  <td className="px-4 py-3 text-[#102a43] text-sm">
                    {contrato.contratado}
                  </td>
                  <td className="px-4 py-3 text-[#102a43] text-sm">
                    {formatDate(contrato.dataFim)}
                  </td>
                  <td className="px-4 py-3">
                    {getSituacaoBadge(contrato.status)}
                  </td>
                  <td className="px-4 py-3 text-[#102a43] text-sm">
                    {contrato.gestor || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {podeEditar && (
                        <button 
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                          title="Editar"
                          onClick={() => handleEditar(contrato.id)}
                        >
                          <Edit className="size-4 text-gray-600" />
                        </button>
                      )}
                      <button 
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        title="Registrar ação"
                        onClick={() => handleRegistrarAcao(contrato.id)}
                      >
                        <FileText className="size-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <span className="text-gray-600 text-sm">
            Mostrando {indiceInicio + 1}-{indiceFim} de {filteredContratos.length} contratos
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePaginaAnterior}
              disabled={paginaAtual === 1}
            >
              Anterior
            </button>
            {Array.from({ length: Math.min(totalPaginas, 5) }, (_, index) => {
              // Mostra no máximo 5 botões de página
              let pageNumber;
              if (totalPaginas <= 5) {
                pageNumber = index + 1;
              } else if (paginaAtual <= 3) {
                pageNumber = index + 1;
              } else if (paginaAtual >= totalPaginas - 2) {
                pageNumber = totalPaginas - 4 + index;
              } else {
                pageNumber = paginaAtual - 2 + index;
              }
              
              return (
                <button
                  key={pageNumber}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    paginaAtual === pageNumber 
                      ? 'bg-[#0b6b3a] text-white' 
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleIrParaPagina(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleProximaPagina}
              disabled={paginaAtual === totalPaginas}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de importação */}
      <ImportarExcelModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
      />

      {/* Modal de Editar Contrato */}
      {showEditModal && contratoSelecionado && contratoEditado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-medium text-[#102a43]">
                  Editar Contrato
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Contrato: {contratoSelecionado.numero}
                </p>
              </div>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setContratoEditado(null);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="size-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Número do Contrato */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Número do Contrato *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.numero}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, numero: e.target.value })}
                  />
                </div>

                {/* Secretaria */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Secretaria/Órgão *
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.secretaria}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, secretaria: e.target.value })}
                  >
                    <option value="">Selecione...</option>
                    {secretarias.map(sec => (
                      <option key={sec.id} value={sec.nome}>{sec.nome}</option>
                    ))}
                  </select>
                </div>

                {/* Objeto */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Objeto do Contrato *
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.objeto}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, objeto: e.target.value })}
                  />
                </div>

                {/* Fornecedor/Contratado */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Fornecedor/Contratado *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.contratado}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, contratado: e.target.value })}
                  />
                </div>

                {/* CNPJ */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    CNPJ do Contratado
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.cnpj || ''}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, cnpj: e.target.value })}
                    placeholder="00.000.000/0000-00"
                  />
                </div>

                {/* Valor */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Valor Total (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.valor}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, valor: parseFloat(e.target.value) })}
                  />
                </div>

                {/* Modalidade */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Modalidade *
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.modalidade || ''}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, modalidade: e.target.value })}
                  >
                    <option value="">Selecione...</option>
                    <option value="Pregão Eletrônico">Pregão Eletrônico</option>
                    <option value="Pregão Presencial">Pregão Presencial</option>
                    <option value="Concorrência">Concorrência</option>
                    <option value="Tomada de Preços">Tomada de Preços</option>
                    <option value="Convite">Convite</option>
                    <option value="Dispensa">Dispensa</option>
                    <option value="Inexigibilidade">Inexigibilidade</option>
                  </select>
                </div>

                {/* Data de Início */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Data de Início *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.dataInicio?.split('T')[0]}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, dataInicio: e.target.value })}
                  />
                </div>

                {/* Data de Término */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Data de Término *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.dataFim?.split('T')[0]}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, dataFim: e.target.value })}
                  />
                </div>

                {/* Gestor */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Gestor Responsável *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.gestor || ''}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, gestor: e.target.value })}
                  />
                </div>

                {/* Fiscal */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Fiscal do Contrato
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.fiscal || ''}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, fiscal: e.target.value })}
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Status *
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.status}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, status: e.target.value })}
                  >
                    <option value="ativo">Ativo/Vigente</option>
                    <option value="proximo_vencimento">Próximo do Vencimento</option>
                    <option value="vencido">Vencido</option>
                    <option value="encerrado">Encerrado</option>
                  </select>
                </div>

                {/* Observações */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Observações
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    value={contratoEditado.observacoes || ''}
                    onChange={(e) => setContratoEditado({ ...contratoEditado, observacoes: e.target.value })}
                    placeholder="Informações adicionais sobre o contrato..."
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setContratoEditado(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    console.log('Salvando alterações do contrato:', contratoEditado);
                    alert(`Contrato ${contratoEditado.numero} atualizado com sucesso!`);
                    // Aqui você adicionaria a chamada à API para salvar as alterações
                    setShowEditModal(false);
                    setContratoEditado(null);
                  }}
                  className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md hover:bg-[#0a5a31] text-sm font-medium"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Registrar Ação */}
      {showAcaoModal && contratoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-medium text-[#102a43]">
                Registrar Ação no Contrato
              </h2>
              <button 
                onClick={() => setShowAcaoModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="size-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800">
                    <strong>Contrato:</strong> {contratoSelecionado.numero} - {contratoSelecionado.objeto}
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    <strong>Fornecedor:</strong> {contratoSelecionado.contratado}
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Descreva a ação ou providência tomada
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm min-h-[150px] focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                    placeholder="Ex: Notificação enviada ao fornecedor em 01/12/2024 solicitando apresentação de documentação atualizada. Prazo para resposta: 10 dias úteis. Processo nº 2024/12345..."
                    value={acaoTexto}
                    onChange={(e) => setAcaoTexto(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    onClick={() => {
                      setShowAcaoModal(false);
                      setAcaoTexto('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      console.log('Registrando ação no contrato:', contratoSelecionado.id, acaoTexto);
                      alert(`Ação registrada com sucesso para o contrato ${contratoSelecionado.numero}:\n\n${acaoTexto}`);
                      setShowAcaoModal(false);
                      setAcaoTexto('');
                    }}
                    className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md hover:bg-[#0a5a31] text-sm font-medium"
                  >
                    Registrar Ação
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}