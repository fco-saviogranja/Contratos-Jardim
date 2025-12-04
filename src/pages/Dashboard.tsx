import React, { useState, useEffect } from 'react';
import { FileText, AlertTriangle, TrendingUp, Users, Calendar, Download, ChevronRight, Clock, Bell } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { contratos as contratosAPI, alertas as alertasAPI } from '../utils/api';
import { MOCK_CONTRATOS, MOCK_ALERTAS } from '../utils/mockData';
import { useSecretarias } from '../hooks/useSecretarias';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { calcularDiasRestantes, getSituacaoAtual, PARAMETROS_ALERTA } from '../utils/contratoUtils';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

// Função auxiliar para obter o status do contrato usando os parâmetros de alerta
const getStatusContrato = (dataFinal: string) => {
  const diasRestantes = calcularDiasRestantes(dataFinal);
  if (diasRestantes < 0) return 'vencido';
  if (diasRestantes <= PARAMETROS_ALERTA.diasAlertaMaximo) return 'alerta';
  return 'vigente';
};

export function Dashboard({ onNavigate }: DashboardProps) {
  const { checkSession, logout } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    periodo: '90',
    secretaria: 'todas',
    gestor: 'todos'
  });
  const [contratos, setContratos] = useState<any[]>([]);
  const [alertas, setAlertas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { secretarias } = useSecretarias();
  const [filtrosAtivos, setFiltrosAtivos] = useState({
    periodo: '90',
    secretaria: 'todas',
    gestor: 'todos'
  });

  // Carregar dados da API
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Carregando dados do Dashboard...');
        
        // Buscar contratos e alertas em paralelo
        const [contratosResponse, alertasResponse] = await Promise.all([
          contratosAPI.getAll().catch(err => {
            console.warn('⚠️ Erro ao buscar contratos:', err);
            
            // Se for erro de backend indisponível, usar dados mock
            if (err.message === 'BACKEND_UNAVAILABLE') {
              console.warn('⚠️ Backend indisponível, usando dados mock para contratos');
              return { success: true, contratos: MOCK_CONTRATOS };
            }
            
            // Se for erro de autenticação, propagar o erro
            if (err.message?.includes('expirada') || err.message?.includes('Sessão')) {
              throw err;
            }
            
            console.warn('⚠️ Usando dados mock para contratos');
            return { success: true, contratos: MOCK_CONTRATOS };
          }),
          alertasAPI.getAll().catch(err => {
            console.warn('⚠️ Erro ao buscar alertas:', err);
            
            // Se for erro de backend indisponível, usar dados mock
            if (err.message === 'BACKEND_UNAVAILABLE') {
              console.warn('⚠️ Backend indisponível, usando dados mock para alertas');
              return { success: true, alertas: MOCK_ALERTAS };
            }
            
            // Se for erro de autenticação, propagar o erro
            if (err.message?.includes('expirada') || err.message?.includes('Sessão')) {
              throw err;
            }
            
            console.warn('⚠️ Usando dados mock para alertas');
            return { success: true, alertas: MOCK_ALERTAS };
          })
        ]);
        
        const contratosData = contratosResponse.success ? contratosResponse.contratos : [];
        const alertasData = alertasResponse.success ? alertasResponse.alertas : [];
        
        console.log(`✅ Dashboard carregado: ${contratosData.length} contratos, ${alertasData.length} alertas`);
        setContratos(contratosData);
        setAlertas(alertasData);
      } catch (err: any) {
        console.error('❌ Erro ao carregar dados do Dashboard:', err);
        
        // Se for erro de backend indisponível, usar dados mock
        if (err.message === 'BACKEND_UNAVAILABLE') {
          console.warn('⚠️ Backend indisponível, usando dados mock');
          setContratos(MOCK_CONTRATOS);
          setAlertas(MOCK_ALERTAS);
          return;
        }
        
        // Se for erro de autenticação, apenas usar dados vazios
        // O AuthProvider vai redirecionar automaticamente
        if (err.message?.includes('expirada') || err.message?.includes('Sessão')) {
          setContratos([]);
          setAlertas([]);
          return;
        }
        
        setError('Não foi possível conectar ao servidor.');
        setContratos([]);
        setAlertas([]);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const handleLimparFiltros = () => {
    const filtrosPadrao = {
      periodo: '90',
      secretaria: 'todas',
      gestor: 'todos'
    };
    setFilters(filtrosPadrao);
    setFiltrosAtivos(filtrosPadrao);
  };

  const handleAplicarFiltros = () => {
    console.log('✅ Aplicando filtros:', filters);
    setFiltrosAtivos({ ...filters });
    
    // Contar quantos contratos foram filtrados
    const total = contratos.length;
    const filtrados = contratos.filter(contrato => {
      // Mesma lógica de filtro
      if (filters.periodo !== 'todos') {
        const diasRestantes = calcularDiasRestantes(contrato.dataFim);
        const periodoDias = parseInt(filters.periodo);
        if (diasRestantes > periodoDias) return false;
      }
      if (filters.secretaria !== 'todas') {
        const secretariaSelecionada = secretarias.find(s => s.id === filters.secretaria);
        if (secretariaSelecionada && contrato.secretaria !== secretariaSelecionada.nome) {
          return false;
        }
      }
      if (filters.gestor !== 'todos') {
        if (contrato.gestor !== filters.gestor) return false;
      }
      return true;
    }).length;
    
    toast.success(`Filtros aplicados: ${filtrados} de ${total} contratos exibidos`);
  };

  // Verificar se há contratos
  const temContratos = contratos.length > 0;

  // Aplicar filtros aos contratos
  const contratosFiltrados = contratos.filter(contrato => {
    // Filtro de período (vencimento nos próximos X dias)
    if (filtrosAtivos.periodo !== 'todos') {
      const diasRestantes = calcularDiasRestantes(contrato.dataFim);
      const periodoDias = parseInt(filtrosAtivos.periodo);
      // Apenas mostrar contratos que vençam dentro do período OU já vencidos
      if (diasRestantes > periodoDias) {
        return false;
      }
    }

    // Filtro de secretaria
    if (filtrosAtivos.secretaria !== 'todas') {
      // Buscar a secretaria pelo ID para pegar o nome
      const secretariaSelecionada = secretarias.find(s => s.id === filtrosAtivos.secretaria);
      if (secretariaSelecionada && contrato.secretaria !== secretariaSelecionada.nome) {
        return false;
      }
    }

    // Filtro de gestor
    if (filtrosAtivos.gestor !== 'todos') {
      if (contrato.gestor !== filtrosAtivos.gestor) {
        return false;
      }
    }

    return true;
  });

  // Calcular métricas reais baseadas nos contratos FILTRADOS
  const contratosVigentes = contratosFiltrados.filter(c => c.dataFim && getStatusContrato(c.dataFim) === 'vigente');
  const contratosEmAlerta = contratosFiltrados.filter(c => c.dataFim && getStatusContrato(c.dataFim) === 'alerta');
  const contratosVencidos = contratosFiltrados.filter(c => c.dataFim && getStatusContrato(c.dataFim) === 'vencido');
  const alertasPendentes = alertas.filter(a => a.status === 'pendente' || !a.status);

  // Filtrar contratos próximos do vencimento para a tabela
  const contratosProximosVencimento = [...contratosEmAlerta]
    .sort((a, b) => calcularDiasRestantes(a.dataFim) - calcularDiasRestantes(b.dataFim))
    .slice(0, 4);

  // Filtrar contratos vencidos para a tabela
  const contratosVencidosLista = [...contratosVencidos]
    .sort((a, b) => new Date(a.dataFim).getTime() - new Date(b.dataFim).getTime())
    .slice(0, 3);

  // Calcular dados para o gráfico de linha do tempo (últimos 6 meses)
  const calcularTimelineData = () => {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const hoje = new Date();
    const timelineData = [];

    // Calcular projeção para os próximos 6 meses
    for (let i = 0; i < 6; i++) {
      const mesInicio = new Date(hoje.getFullYear(), hoje.getMonth() + i, 1);
      const mesFim = new Date(hoje.getFullYear(), hoje.getMonth() + i + 1, 0);
      const mesNome = meses[mesInicio.getMonth()];
      
      // Contar contratos que vão vencer neste mês
      const contratosVencemEsteMes = contratos.filter(contrato => {
        const dataVencimento = new Date(contrato.dataFim);
        return dataVencimento >= mesInicio && dataVencimento <= mesFim;
      }).length;

      timelineData.push({
        mes: mesNome,
        vencimentos: contratosVencemEsteMes
      });
    }

    return timelineData;
  };

  // Calcular dados para distribuição por mês de vencimento (ano inteiro)
  const calcularDistribuicaoData = () => {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const anoAtual = new Date().getFullYear();
    const distribuicao: { [key: string]: number } = {};
    
    // Inicializar todos os meses com 0
    meses.forEach(mes => distribuicao[mes] = 0);

    // Contar contratos que vencem em cada mês do ano atual
    contratos.forEach(contrato => {
      const dataFinal = new Date(contrato.dataFim);
      if (dataFinal.getFullYear() === anoAtual) {
        const mes = meses[dataFinal.getMonth()];
        distribuicao[mes]++;
      }
    });

    return meses.map(mes => ({
      mes,
      contratos: distribuicao[mes]
    }));
  };

  const timelineData = calcularTimelineData();
  const distribuicaoData = calcularDistribuicaoData();

  // Formatar data para exibição
  const formatarData = (data: string) => {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
  };

  // Calcular secretarias com contratos vencidos sem providência
  const calcularSecretariasAtrasadas = () => {
    const secretariasMap: { [key: string]: number } = {};
    
    contratosVencidos.forEach(contrato => {
      const secretaria = contrato.secretaria || 'Sem secretaria';
      if (!secretariasMap[secretaria]) {
        secretariasMap[secretaria] = 0;
      }
      secretariasMap[secretaria]++;
    });

    return Object.entries(secretariasMap)
      .map(([nome, quantidade]) => ({
        nome,
        quantidade,
        diasAtraso: Math.abs(calcularDiasRestantes(contratosVencidos.find(c => c.secretaria === nome)?.dataFim || ''))
      }))
      .sort((a, b) => b.diasAtraso - a.diasAtraso)
      .slice(0, 3);
  };

  // Calcular gestores com contratos em atraso
  const calcularGestoresAtrasados = () => {
    const gestoresMap: { [key: string]: { vencidos: number; emAlerta: number; secretaria: string } } = {};
    
    [...contratosVencidos, ...contratosEmAlerta].forEach(contrato => {
      const gestor = contrato.gestor || 'Sem gestor';
      const secretaria = contrato.secretaria || 'Sem secretaria';
      
      if (!gestoresMap[gestor]) {
        gestoresMap[gestor] = { vencidos: 0, emAlerta: 0, secretaria };
      }
      
      if (getStatusContrato(contrato.dataFim) === 'vencido') {
        gestoresMap[gestor].vencidos++;
      } else {
        gestoresMap[gestor].emAlerta++;
      }
    });

    return Object.entries(gestoresMap)
      .map(([nome, dados]) => ({
        nome,
        vencidos: dados.vencidos,
        emAlerta: dados.emAlerta,
        secretaria: dados.secretaria
      }))
      .sort((a, b) => (b.vencidos + b.emAlerta) - (a.vencidos + a.emAlerta))
      .slice(0, 2);
  };

  const secretariasAtrasadas = calcularSecretariasAtrasadas();
  const gestoresAtrasados = calcularGestoresAtrasados();
  const contratosVencidosSemAcao = contratosVencidos.length;
  const contratosAlertaSemAcao = contratosEmAlerta.length;
  const secretariasComPendencias = new Set([...contratosVencidos, ...contratosEmAlerta].map(c => c.secretaria)).size;

  // Calcular contratos adicionados este mês
  const calcularContratosEsteMes = () => {
    const hoje = new Date();
    const inicioDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    
    return contratos.filter(contrato => {
      const dataCriacao = contrato.criadoEm ? new Date(contrato.criadoEm) : null;
      return dataCriacao && dataCriacao >= inicioDoMes;
    }).length;
  };

  // Calcular contratos vencidos sem ação registrada
  const calcularVencidosSemAcao = () => {
    return contratosVencidos.filter(contrato => {
      // Verificar se não há ações registradas ou campo está vazio
      return !contrato.acoes || contrato.acoes.length === 0;
    }).length;
  };

  const contratosEsteMes = calcularContratosEsteMes();
  const vencidosSemAcao = calcularVencidosSemAcao();

  // Se não há contratos, mostrar estado vazio
  if (!temContratos) {
    return (
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[#102a43] text-2xl mb-1 font-medium">
              Dashboard
            </h1>
            <p className="text-gray-600 text-sm">
              Visão geral dos contratos sob responsabilidade da CGM e gestores. Destaque para prazos críticos.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('meus-contratos')}
              className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium"
            >
              Ver meus contratos
            </button>
          </div>
        </div>

        {/* Estado vazio */}
        <div className="bg-white rounded-lg p-12">
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <FileText className="size-16 text-gray-300 mb-4" />
            <h2 className="text-[#102a43] text-xl font-medium mb-2">
              Nenhum contrato cadastrado
            </h2>
            <p className="text-gray-600 mb-6">
              O dashboard estará disponível assim que você cadastrar ou importar os primeiros contratos do sistema.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => onNavigate('todos-contratos')}
                className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
              >
                Ir para Contratos
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[#102a43] text-2xl mb-1 font-medium">
            Dashboard
          </h1>
          <p className="text-gray-600 text-sm">
            Visão geral dos contratos sob responsabilidade da CGM e gestores. Destaque para prazos críticos.
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-[#102a43] text-xs mb-1.5">Período de vencimento</label>
            <select 
              value={filters.periodo}
              onChange={(e) => setFilters({ ...filters, periodo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
            >
              <option value="30">Próximos 30 dias</option>
              <option value="60">Próximos 60 dias</option>
              <option value="90">Próximos 90 dias</option>
              <option value="todos">Todos os períodos</option>
            </select>
          </div>
          <div>
            <label className="block text-[#102a43] text-xs mb-1.5">Secretaria / Órgão</label>
            <select 
              value={filters.secretaria}
              onChange={(e) => setFilters({ ...filters, secretaria: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
            >
              <option value="todas">Todas</option>
              {secretarias.map(secretaria => (
                <option key={secretaria.id} value={secretaria.id}>{secretaria.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[#102a43] text-xs mb-1.5">Gestor responsável</label>
            <select 
              value={filters.gestor}
              onChange={(e) => setFilters({ ...filters, gestor: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
            >
              <option value="todos">Todos</option>
              {/* Extrair gestores únicos dos contratos */}
              {Array.from(new Set(contratos.map(c => c.gestor).filter(Boolean))).sort().map((gestor, idx) => (
                <option key={idx} value={gestor}>{gestor}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3">
          <button
            onClick={handleLimparFiltros}
            className="px-4 py-1.5 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50"
          >
            Limpar
          </button>
          <button
            onClick={handleAplicarFiltros}
            className="px-4 py-1.5 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31]"
          >
            Aplicar filtros
          </button>
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Contratos vigentes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-gray-600 text-sm">Contratos vigentes</h3>
            <FileText className="size-5 text-green-600" />
          </div>
          <div className="mb-1">
            <span className="text-[#102a43] text-3xl font-medium">{contratosVigentes.length}</span>
            {contratosEsteMes > 0 && (
              <span className="text-gray-500 text-sm ml-2">+{contratosEsteMes} este mês</span>
            )}
          </div>
          <p className="text-gray-500 text-xs">
            Inclui contratos com prazo acima da faixa de alerta.
          </p>
        </div>

        {/* Próximos do vencimento */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-gray-600 text-sm">Próximos do vencimento</h3>
            <Clock className="size-5 text-orange-500" />
          </div>
          <div className="mb-1">
            <span className="text-[#102a43] text-3xl font-medium">{contratosEmAlerta.length}</span>
            <span className="text-gray-500 text-sm ml-2">Faixa até 90 dias</span>
          </div>
          <p className="text-gray-500 text-xs">
            Recomendado revisar prorrogações e encamiramentos.
          </p>
        </div>

        {/* Contratos vencidos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-gray-600 text-sm">Contratos vencidos</h3>
            <AlertTriangle className="size-5 text-red-500" />
          </div>
          <div className="mb-1">
            <span className="text-[#102a43] text-3xl font-medium">{contratosVencidos.length}</span>
            {vencidosSemAcao > 0 && (
              <span className="text-gray-500 text-sm ml-2">{vencidosSemAcao} sem ação registrada</span>
            )}
          </div>
          <p className="text-gray-500 text-xs">
            Exigem registro de providências pela CGM ou gestor.
          </p>
        </div>

        {/* Alertas pendentes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-gray-600 text-sm">Alertas pendentes de resposta</h3>
            <Bell className="size-5 text-blue-500" />
          </div>
          <div className="mb-1">
            <span className="text-[#102a43] text-3xl font-medium">{alertasPendentes.length}</span>
            <span className="text-gray-500 text-sm ml-2">Alertas e prazos</span>
          </div>
          <p className="text-gray-500 text-xs">
            Alertas ainda não marcados como "em tramitação" ou concluídos.
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Linha do tempo de vencimentos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h3 className="text-[#102a43] text-sm font-medium mb-4">
            Linha do tempo de vencimentos
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="mes" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="circle"
              />
              <Line 
                type="monotone" 
                dataKey="vencimentos" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Vencimentos"
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribuição por mês */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h3 className="text-[#102a43] text-sm font-medium mb-4">
            Distribuição de contratos por mês de vencimento
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={distribuicaoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="mes" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="contratos" 
                fill="#0b6b3a" 
                radius={[4, 4, 0, 0]}
                name="Contratos"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cards de alertas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Secretarias fora do prazo */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-[#102a43] text-sm font-medium mb-3">
            Secretarias fora do prazo sem providência
          </h3>
          <div className="space-y-2">
            {secretariasAtrasadas.map((secretaria, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{secretaria.nome}</span>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">Atrasada {secretaria.diasAtraso} dias</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contratos vencidos ou em alerta */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-[#102a43] text-sm font-medium mb-3">
            Contratos vencidos ou em alerta sem ação registrada
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-orange-600">Em faixa de alerta</span>
              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded">{contratosAlertaSemAcao} contratos</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-red-600">Vencidos sem providência</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">{contratosVencidosSemAcao} contratos</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {secretariasComPendencias} secretarias
            </div>
          </div>
        </div>

        {/* Gestores com contratos em atraso */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-[#102a43] text-sm font-medium mb-3">
            Gestores com contratos em atraso
          </h3>
          <div className="space-y-2.5">
            {gestoresAtrasados.map((gestor, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-700">{gestor.nome}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {gestor.secretaria} • {gestor.vencidos} vencidos, {gestor.emAlerta} em alerta
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsáveis com maior quantidade */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-[#102a43] text-sm font-medium mb-3">
            Responsáveis com maior quantidade de pendências
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-700">Última ação há 45 dias</span>
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded">Alta</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Sem registros há 30 dias
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-gray-700">Última ação há 28 dias</span>
              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded">Média</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-gray-700">3 alertas críticos</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">Crítica</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabelas de contratos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Contratos próximos do vencimento */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-[#102a43] text-sm font-medium">
              Contratos próximos do vencimento
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">
              Mostrando {Math.min(4, contratosProximosVencimento.length)} de {contratosEmAlerta.length} contratos em faixa de alerta
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-[#102a43] text-xs">Secretaria</th>
                  <th className="px-4 py-2 text-left text-[#102a43] text-xs">Contratado</th>
                  <th className="px-4 py-2 text-left text-[#102a43] text-xs">Objeto (resumo)</th>
                  <th className="px-4 py-2 text-left text-[#102a43] text-xs">Data final</th>
                </tr>
              </thead>
              <tbody>
                {contratosProximosVencimento.map((contrato, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-xs text-gray-700">{contrato.secretaria}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{contrato.contratado}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{contrato.objeto}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{formatarData(contrato.dataFim)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-gray-200 text-center">
            <button 
              onClick={() => onNavigate('alertas')}
              className="text-[#0b6b3a] text-xs hover:underline"
            >
              Ver todos em "Alertas e prazos"
            </button>
          </div>
        </div>

        {/* Contratos vencidos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-[#102a43] text-sm font-medium">
              Contratos vencidos
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">
              Ordenado por data de vencimento (mais antigos primeiro)
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-[#102a43] text-xs">Secretaria</th>
                  <th className="px-4 py-2 text-left text-[#102a43] text-xs">Contratado</th>
                  <th className="px-4 py-2 text-left text-[#102a43] text-xs">Data final</th>
                  <th className="px-4 py-2 text-left text-[#102a43] text-xs">Situação</th>
                </tr>
              </thead>
              <tbody>
                {contratosVencidosLista.map((contrato, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-xs text-gray-700">{contrato.secretaria}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{contrato.contratado}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{formatarData(contrato.dataFim)}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                        Sem providência
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-gray-200 text-center">
            <button 
              onClick={() => onNavigate('todos-contratos')}
              className="text-[#0b6b3a] text-xs hover:underline"
            >
              Ir para lista completa
            </button>
          </div>
        </div>
      </div>

      {/* Ações recentes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-[#102a43] text-sm font-medium">
            Ações recentes em contratos
          </h3>
          <p className="text-gray-500 text-xs mt-0.5">
            Últimas movimentações registradas
          </p>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-xs text-gray-700">
              <strong>Renovação registrada</strong> • Contrato Secretaria de Saúde / Clínica Vida Plena
            </span>
            <span className="text-xs text-gray-500">Hoje, 10:24</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-xs text-gray-700">
              <strong>Providência cadastrada</strong> • Contrato Secretaria de Obras / Construtora Jardim Urbano
            </span>
            <span className="text-xs text-gray-500">Ontem, 17:12</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-xs text-gray-700">
              <strong>Anexo incluído</strong> • Contrato Secretaria de Educação / Alfa Sistemas Educacionais
            </span>
            <span className="text-xs text-gray-500">Ontem, 09:03</span>
          </div>
        </div>
        <div className="p-3 border-t border-gray-200 text-center">
          <span className="text-xs text-gray-500">
            Histórico completo disponível no detalhe de cada contrato
          </span>
        </div>
      </div>
    </div>
  );
}