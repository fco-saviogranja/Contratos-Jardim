import React, { useState, useEffect } from 'react';
import { exportToCSV, exportToExcel, exportToPDF, ContratoExport } from '../utils/exportUtils';
import { ImportarExcelModal } from '../components/ImportarExcelModal';
import { Search, Download, Edit, FileText, ChevronDown, Plus, Upload, X, ArrowUpDown, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { contratos as contratosAPI } from '../utils/api';
import { MOCK_CONTRATOS } from '../utils/mockData';
import { useSecretarias } from '../hooks/useSecretarias';
import { useGestores } from '../hooks/useGestores';
import { useAuth } from '../contexts/AuthContext';
import { getSituacaoAtual, getSituacaoBadgeClass, calcularDiasRestantes, correspondeAoFiltroSituacao } from '../utils/contratoUtils';

interface TodosContratosProps {
  onNavigate: (page: string) => void;
}

type SortField = 'numero' | 'objeto' | 'contratado' | 'dataFim' | 'status' | 'gestor';
type SortOrder = 'asc' | 'desc' | null;

// Mapeamento para normalizar nomes de secretarias
const SECRETARIAS_ALIASES: Record<string, string> = {
  'GABINETE': 'GAB',
  'Gabinete do Prefeito': 'GAB',
  'Gabinete': 'GAB',
  'SAAEJ': 'SAAEJ',
  'Secretaria de Assuntos Especiais e Jurídicos': 'SAAEJ',
};

// Função para normalizar nome de secretaria
const normalizarSecretaria = (nome: string): string => {
  if (!nome) return nome;
  // Verificar se existe um alias
  return SECRETARIAS_ALIASES[nome] || nome;
};

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
  
  // Estado para ordenação
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  
  // Verificar se o usuário pode editar contratos
  const podeEditar = user?.perfil === 'Administrador CGM' || user?.perfil === 'Gestor de Contratos' || user?.perfil === 'admin' || user?.perfil === 'gestor';
  
  // Verificar se é fiscal (só pode registrar ações)
  const eFiscal = user?.perfil === 'Fiscal de Contratos' || user?.perfil === 'fiscal';
  
  // Debug: Verificar perfil do usuário
  useEffect(() => {
    if (user) {
      console.log('👤 [DEBUG PERFIL] Usuário logado:', {
        nome: user.nome,
        email: user.email,
        perfil: user.perfil,
        perfilTipo: typeof user.perfil,
        perfilLength: user.perfil?.length,
        podeEditar,
        eFiscal
      });
    }
  }, [user, podeEditar, eFiscal]);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [contratos, setContratos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { secretarias } = useSecretarias();
  const { gestores } = useGestores();
  
  // Debug: Verificar secretarias carregadas
  useEffect(() => {
    console.log('📋 [DEBUG SECRETARIAS] Total de secretarias:', secretarias.length);
    console.log('📋 [DEBUG SECRETARIAS] Lista:', secretarias);
  }, [secretarias]);
  
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
          
          // Debug: Listar todas as secretarias únicas nos contratos
          const secretariasUnicas = [...new Set(response.contratos.map((c: any) => c.secretaria))];
          console.log('📋 [DEBUG] Secretarias únicas nos contratos:', secretariasUnicas);
          
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
  
  // Função para alternar ordenação
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Se já está ordenando por este campo, alterar a ordem
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        // Se está em desc, remover ordenação
        setSortField(null);
        setSortOrder(null);
      } else {
        setSortOrder('asc');
      }
    } else {
      // Se é um novo campo, começar com ordem crescente
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Renderizar ícone de ordenação
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="size-3.5 text-gray-400" />;
    }
    if (sortOrder === 'asc') {
      return <ArrowUp className="size-3.5 text-[#0b6b3a]" />;
    }
    if (sortOrder === 'desc') {
      return <ArrowDown className="size-3.5 text-[#0b6b3a]" />;
    }
    return <ArrowUpDown className="size-3.5 text-gray-400" />;
  };
  
  // Para usar os contratos diretamente com ordenação e filtros aplicados
  const filteredContratos = React.useMemo(() => {
    let resultado = [...contratos];

    console.log('🔍 [FILTRO] Iniciando filtros...');
    console.log('🔍 [FILTRO] Total de contratos antes do filtro:', resultado.length);
    console.log('🔍 [FILTRO] Filtros ativos:', filtros);

    // Aplicar filtros
    // Filtro por busca (número, objeto ou contratado)
    if (filtros.busca.trim() !== '') {
      const buscaLower = filtros.busca.toLowerCase();
      resultado = resultado.filter(c => 
        c.numero?.toLowerCase().includes(buscaLower) ||
        c.objeto?.toLowerCase().includes(buscaLower) ||
        c.contratado?.toLowerCase().includes(buscaLower)
      );
      console.log('🔍 [FILTRO] Após filtro de busca:', resultado.length);
    }

    // Filtro por secretaria
    if (filtros.secretaria !== 'todas') {
      console.log('🔍 [FILTRO] Filtrando por secretaria:', filtros.secretaria);
      console.log('🔍 [FILTRO] Tipo de filtros.secretaria:', typeof filtros.secretaria);
      
      // Debug: verificar primeiros 3 contratos
      console.log('🔍 [FILTRO] Secretarias dos primeiros 3 contratos:', 
        resultado.slice(0, 3).map(c => ({ 
          numero: c.numero, 
          secretaria: c.secretaria,
          secretariaNormalizada: normalizarSecretaria(c.secretaria),
          secretariaId: c.secretariaId,
          tipoSecretaria: typeof c.secretaria 
        }))
      );
      
      // Normalizar secretaria do contrato antes de comparar
      resultado = resultado.filter(c => {
        const secretariaContratoNormalizada = normalizarSecretaria(c.secretaria);
        return c.secretariaId === filtros.secretaria || 
               c.secretaria === filtros.secretaria ||
               secretariaContratoNormalizada === filtros.secretaria;
      });
      console.log('🔍 [FILTRO] Após filtro de secretaria:', resultado.length);
    }

    // Filtro por situação
    if (filtros.situacao !== 'todas') {
      resultado = resultado.filter(c => correspondeAoFiltroSituacao(c.dataFim, filtros.situacao));
      console.log('🔍 [FILTRO] Após filtro de situação:', resultado.length);
    }

    // Filtro por gestor
    if (filtros.gestor !== 'todos') {
      resultado = resultado.filter(c => c.gestorId === filtros.gestor);
      console.log('🔍 [FILTRO] Após filtro de gestor:', resultado.length);
    }

    console.log('🔍 [FILTRO] Total final após todos os filtros:', resultado.length);

    // Aplicar ordenação se houver
    if (sortField && sortOrder) {
      resultado.sort((a, b) => {
        let valorA = a[sortField];
        let valorB = b[sortField];

        // Tratamento especial para datas
        if (sortField === 'dataFim') {
          valorA = new Date(valorA).getTime();
          valorB = new Date(valorB).getTime();
        }

        // Tratamento para valores nulos/undefined
        if (valorA == null) valorA = '';
        if (valorB == null) valorB = '';

        // Conversão para string para comparação
        if (typeof valorA === 'string') {
          valorA = valorA.toLowerCase();
        }
        if (typeof valorB === 'string') {
          valorB = valorB.toLowerCase();
        }

        if (sortOrder === 'asc') {
          return valorA > valorB ? 1 : valorA < valorB ? -1 : 0;
        } else {
          return valorA < valorB ? 1 : valorA > valorB ? -1 : 0;
        }
      });
    }

    return resultado;
  }, [contratos, sortField, sortOrder, filtros]);

  const handleLimparFiltros = () => {
    setFiltros({
      busca: '',
      secretaria: 'todas',
      situacao: 'todas',
      gestor: 'todos'
    });
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
  
  const handleExcluir = async (contratoId: string) => {
    const contrato = contratos.find(c => c.id === contratoId);
    if (!contrato) return;
    
    const confirmacao = confirm(
      `Tem certeza que deseja excluir o contrato "${contrato.numero}"?\n\n` +
      `Esta ação não pode ser desfeita.`
    );
    
    if (confirmacao) {
      try {
        // Aqui você adicionaria a chamada à API para excluir o contrato
        console.log('Excluindo contrato:', contratoId);
        
        // Simular exclusão removendo do estado local
        setContratos(contratos.filter(c => c.id !== contratoId));
        
        alert(`Contrato "${contrato.numero}" excluído com sucesso!`);
      } catch (error) {
        console.error('Erro ao excluir contrato:', error);
        alert('Erro ao excluir contrato. Tente novamente.');
      }
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    // Converter data AAAA-MM-DD para DD/MM/AAAA garantindo timezone local
    const [ano, mes, dia] = dateString.split('-');
    // Criar data no timezone local (não UTC) para evitar problemas de fuso horário
    const data = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
    return data.toLocaleDateString('pt-BR');
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
                <option key={secretaria.id} value={secretaria.nome}>{secretaria.nome}</option>
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
              {gestores.map(gestor => (
                <option key={gestor.id} value={gestor.id}>{gestor.nome}</option>
              ))}
            </select>
          </div>
          
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 font-medium" onClick={handleLimparFiltros}>
            Limpar filtros
          </button>
        </div>
      </div>

      {/* Tabela de contratos */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-gray-600 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  onClick={() => handleSort('numero')}
                >
                  <div className="flex items-center gap-2">
                    Número
                    {renderSortIcon('numero')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-gray-600 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  onClick={() => handleSort('objeto')}
                >
                  <div className="flex items-center gap-2">
                    Objeto
                    {renderSortIcon('objeto')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-gray-600 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  onClick={() => handleSort('contratado')}
                >
                  <div className="flex items-center gap-2">
                    Fornecedor
                    {renderSortIcon('contratado')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-gray-600 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  onClick={() => handleSort('dataFim')}
                >
                  <div className="flex items-center gap-2">
                    Vencimento
                    {renderSortIcon('dataFim')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-gray-600 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Situação
                    {renderSortIcon('status')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-gray-600 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  onClick={() => handleSort('gestor')}
                >
                  <div className="flex items-center gap-2">
                    Gestor
                    {renderSortIcon('gestor')}
                  </div>
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSituacaoBadgeClass(getSituacaoAtual(contrato.dataFim))}`}>
                      {getSituacaoAtual(contrato.dataFim)}
                    </span>
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
                      {podeEditar && (
                        <button 
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                          title="Excluir"
                          onClick={() => handleExcluir(contrato.id)}
                        >
                          <Trash2 className="size-4 text-gray-600" />
                        </button>
                      )}
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

                {/* Observaçes */}
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