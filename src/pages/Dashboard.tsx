import React, { useState } from 'react';
import { FileText, AlertTriangle, TrendingUp, Users, Calendar, Eye, Download, ChevronRight, Clock, Bell } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    periodo: '90',
    secretaria: 'todas',
    gestor: 'todos',
    situacao: 'todas'
  });

  // Por enquanto, sempre mostrar o dashboard com dados estáticos para demonstração
  // No futuro, isso virá da API
  const temContratos = true;

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

  // Dados para o gráfico de linha do tempo
  const timelineData = [
    { mes: 'Mai', vigentes: 82, emAlerta: 8, vencidos: 4 },
    { mes: 'Jun', vigentes: 85, emAlerta: 6, vencidos: 5 },
    { mes: 'Jul', vigentes: 83, emAlerta: 10, vencidos: 6 },
    { mes: 'Ago', vigentes: 86, emAlerta: 9, vencidos: 7 },
    { mes: 'Set', vigentes: 84, emAlerta: 11, vencidos: 5 },
    { mes: 'Out', vigentes: 86, emAlerta: 9, vencidos: 7 }
  ];

  // Dados para distribuição por mês
  const distribuicaoData = [
    { mes: 'Jan', contratos: 8 },
    { mes: 'Fev', contratos: 12 },
    { mes: 'Mar', contratos: 15 },
    { mes: 'Abr', contratos: 10 },
    { mes: 'Mai', contratos: 18 },
    { mes: 'Jun', contratos: 14 },
    { mes: 'Jul', contratos: 9 },
    { mes: 'Ago', contratos: 11 },
    { mes: 'Set', contratos: 16 },
    { mes: 'Out', contratos: 13 },
    { mes: 'Nov', contratos: 7 },
    { mes: 'Dez', contratos: 5 }
  ];

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

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-4">
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
              <option value="educacao">Secretaria de Educação</option>
              <option value="saude">Secretaria de Saúde</option>
              <option value="obras">Secretaria de Obras</option>
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
              <option value="maria">Maria Silva</option>
              <option value="joao">João Santos</option>
            </select>
          </div>
          <div>
            <label className="block text-[#102a43] text-xs mb-1.5">Situação</label>
            <select 
              value={filters.situacao}
              onChange={(e) => setFilters({ ...filters, situacao: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
            >
              <option value="todas">Vigente, Próx. vencimento, Vencido</option>
              <option value="vigente">Vigente</option>
              <option value="proximo">Próx. vencimento</option>
              <option value="vencido">Vencido</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <button className="px-4 py-1.5 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50">
            Limpar
          </button>
          <button className="px-4 py-1.5 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31]">
            Aplicar filtros
          </button>
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-4 gap-4">
        {/* Contratos vigentes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-gray-600 text-sm">Contratos vigentes</h3>
            <FileText className="size-5 text-green-600" />
          </div>
          <div className="mb-1">
            <span className="text-[#102a43] text-3xl font-medium">86</span>
            <span className="text-gray-500 text-sm ml-2">+4 este mês</span>
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
            <span className="text-[#102a43] text-3xl font-medium">19</span>
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
            <span className="text-[#102a43] text-3xl font-medium">7</span>
            <span className="text-gray-500 text-sm ml-2">3 sem ação registrada</span>
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
            <span className="text-[#102a43] text-3xl font-medium">12</span>
            <span className="text-gray-500 text-sm ml-2">Alertas e prazos</span>
          </div>
          <p className="text-gray-500 text-xs">
            Alertas ainda não marcados como "em tramitação" ou concluídos.
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-2 gap-4">
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
                dataKey="vigentes" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Vigentes"
                dot={{ fill: '#10b981', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="emAlerta" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Em faixa de alerta"
                dot={{ fill: '#f59e0b', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="vencidos" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Vencidos"
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
      <div className="grid grid-cols-4 gap-4">
        {/* Secretarias fora do prazo */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-[#102a43] text-sm font-medium mb-3">
            Secretarias fora do prazo sem providência
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Educação</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">Atrasada 8 dias</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Administração</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">Atrasada 5 dias</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Obras</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">Atrasada 3 dias</span>
            </div>
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
              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded">9 contratos</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-red-600">Vencidos sem providência</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">5 contratos</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              3 secretarias
            </div>
          </div>
        </div>

        {/* Gestores com contratos em atraso */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-[#102a43] text-sm font-medium mb-3">
            Gestores com contratos em atraso
          </h3>
          <div className="space-y-2.5">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-700">João Pereira</span>
              </div>
              <div className="text-xs text-gray-500">
                Secretaria de Administração • 2 vencidos sem ação
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-700">Ana Souza</span>
              </div>
              <div className="text-xs text-gray-500">
                Secretaria de Obras • 1 vencido, 3 em alerta
              </div>
            </div>
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
      <div className="grid grid-cols-2 gap-4">
        {/* Contratos próximos do vencimento */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-[#102a43] text-sm font-medium">
              Contratos próximos do vencimento
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">
              Mostrando 1-4 de 19 contratos em faixa de alerta
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
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3 text-xs text-gray-700">Secretaria de Educação</td>
                  <td className="px-4 py-3 text-xs text-gray-700">Alfa Sistemas Educacionais S.A.</td>
                  <td className="px-4 py-3 text-xs text-gray-700">Material didático e tecnológico</td>
                  <td className="px-4 py-3 text-xs text-gray-700">30/09/2025</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3 text-xs text-gray-700">Secretaria de Obras</td>
                  <td className="px-4 py-3 text-xs text-gray-700">Construtora Jardim Urbano ME</td>
                  <td className="px-4 py-3 text-xs text-gray-700">Manutenção de vias urbanas e sarais.</td>
                  <td className="px-4 py-3 text-xs text-gray-700">15/08/2025</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3 text-xs text-gray-700">Secretaria de Saúde</td>
                  <td className="px-4 py-3 text-xs text-gray-700">Clínica Vida Plena Ltda.</td>
                  <td className="px-4 py-3 text-xs text-gray-700">Serviços médicos especializados.</td>
                  <td className="px-4 py-3 text-xs text-gray-700">12/02/2026</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3 text-xs text-gray-700">Secretaria de Administração</td>
                  <td className="px-4 py-3 text-xs text-gray-700">Alpha Serviços Gerais Ltda.</td>
                  <td className="px-4 py-3 text-xs text-gray-700">Serviços de limpeza e conservação predial.</td>
                  <td className="px-4 py-3 text-xs text-gray-700">10/05/2025</td>
                </tr>
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
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3 text-xs text-gray-700">Secretaria de Administração</td>
                  <td className="px-4 py-3 text-xs text-gray-700">Alpha Serviços Gerais Ltda.</td>
                  <td className="px-4 py-3 text-xs text-gray-700">10/05/2025</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                      Sem providência
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3 text-xs text-gray-700">Secretaria de Obras</td>
                  <td className="px-4 py-3 text-xs text-gray-700">Construtora Jardim Urbano ME</td>
                  <td className="px-4 py-3 text-xs text-gray-700">02/04/2025</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">
                      Em trâmite
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3 text-xs text-gray-700">Secretaria de Saúde</td>
                  <td className="px-4 py-3 text-xs text-gray-700">Clínica Vida Plena Ltda.</td>
                  <td className="px-4 py-3 text-xs text-gray-700">20/03/2025</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                      Aguardando resposta
                    </span>
                  </td>
                </tr>
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