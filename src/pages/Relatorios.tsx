import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp, AlertCircle, Users, Building2, FileBarChart, Clock, ChevronRight, RefreshCw, Eye } from 'lucide-react';
import { exportToCSV, exportToExcel, exportToPDF } from '../utils/exportUtils';
import { mockContratos } from '../data/mockData';
import { RelatorioPreview } from '../components/RelatorioPreview';

interface RelatorioConfig {
  id: string;
  titulo: string;
  descricao: string;
  icon: any;
  color: string;
  bgColor: string;
  categoria: 'contratos' | 'financeiro' | 'gestao' | 'compliance';
}

interface RelatorioGerado {
  id: string;
  tipo: string;
  formato: string;
  dataGeracao: string;
  usuario: string;
  filtros: string;
}

export function Relatorios() {
  const [relatorioSelecionado, setRelatorioSelecionado] = useState<string | null>(null);
  const [showFiltros, setShowFiltros] = useState(false);
  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    secretaria: 'todas',
    situacao: 'todas',
    gestor: 'todos',
    fiscal: 'todos'
  });

  const relatoriosPredefinidos: RelatorioConfig[] = [
    {
      id: 'contratos-vigentes',
      titulo: 'Contratos Vigentes',
      descricao: 'Lista completa de todos os contratos ativos com detalhes',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      categoria: 'contratos'
    },
    {
      id: 'proximos-vencimento',
      titulo: 'Próximos ao Vencimento',
      descricao: 'Contratos que vencem nos próximos 30, 60 ou 90 dias',
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      categoria: 'contratos'
    },
    {
      id: 'contratos-vencidos',
      titulo: 'Contratos Vencidos',
      descricao: 'Contratos com prazo de vigência expirado',
      icon: Clock,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      categoria: 'contratos'
    },
    {
      id: 'empenhos-secretaria',
      titulo: 'Empenhos por Secretaria',
      descricao: 'Consolidação de valores empenhados por órgão',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      categoria: 'financeiro'
    },
    {
      id: 'contratos-gestor',
      titulo: 'Contratos por Gestor',
      descricao: 'Distribuição de contratos por gestor responsável',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      categoria: 'gestao'
    },
    {
      id: 'contratos-fiscal',
      titulo: 'Contratos por Fiscal',
      descricao: 'Contratos designados para cada fiscal',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      categoria: 'gestao'
    },
    {
      id: 'alertas-pendentes',
      titulo: 'Alertas e Providências',
      descricao: 'Resumo de alertas ativos e providências registradas',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      categoria: 'compliance'
    },
    {
      id: 'renovacoes',
      titulo: 'Histórico de Renovações',
      descricao: 'Registro de todas as renovações contratuais',
      icon: RefreshCw,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      categoria: 'contratos'
    },
    {
      id: 'aditivos',
      titulo: 'Aditivos Contratuais',
      descricao: 'Contratos com aditivos de prazo ou valor',
      icon: FileBarChart,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      categoria: 'financeiro'
    },
    {
      id: 'sem-fiscal',
      titulo: 'Contratos sem Fiscal',
      descricao: 'Contratos que não possuem fiscal designado',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      categoria: 'compliance'
    },
    {
      id: 'documentos-pendentes',
      titulo: 'Documentações Pendentes',
      descricao: 'Contratos com documentação fiscal pendente',
      icon: FileText,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      categoria: 'compliance'
    },
    {
      id: 'secretarias',
      titulo: 'Consolidado por Secretaria',
      descricao: 'Visão geral de contratos e valores por órgão',
      icon: Building2,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      categoria: 'gestao'
    }
  ];

  const historico: RelatorioGerado[] = [
    {
      id: '1',
      tipo: 'Contratos Vigentes',
      formato: 'PDF',
      dataGeracao: '2024-11-24 14:30',
      usuario: 'João Silva (Admin)',
      filtros: 'Todas as secretarias'
    },
    {
      id: '2',
      tipo: 'Próximos ao Vencimento',
      formato: 'Excel',
      dataGeracao: '2024-11-23 10:15',
      usuario: 'Maria Santos (Admin)',
      filtros: 'Próximos 30 dias'
    },
    {
      id: '3',
      tipo: 'Empenhos por Secretaria',
      formato: 'CSV',
      dataGeracao: '2024-11-22 16:45',
      usuario: 'João Silva (Admin)',
      filtros: 'Período: 01/01/2024 a 30/11/2024'
    }
  ];

  const categorias = [
    { id: 'todas', label: 'Todos os relatórios', count: relatoriosPredefinidos.length },
    { id: 'contratos', label: 'Contratos', count: relatoriosPredefinidos.filter(r => r.categoria === 'contratos').length },
    { id: 'financeiro', label: 'Financeiro', count: relatoriosPredefinidos.filter(r => r.categoria === 'financeiro').length },
    { id: 'gestao', label: 'Gestão', count: relatoriosPredefinidos.filter(r => r.categoria === 'gestao').length },
    { id: 'compliance', label: 'Compliance', count: relatoriosPredefinidos.filter(r => r.categoria === 'compliance').length }
  ];

  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');

  const relatoriosFiltrados = categoriaAtiva === 'todas' 
    ? relatoriosPredefinidos 
    : relatoriosPredefinidos.filter(r => r.categoria === categoriaAtiva);

  const gerarRelatorio = (relatorioId: string, formato: 'csv' | 'excel' | 'pdf') => {
    // Preparar dados baseado no tipo de relatório
    const dados = mockContratos.map(contrato => ({
      numero: contrato.numero,
      objeto: contrato.objeto,
      contratado: contrato.contratado,
      valor: `R$ ${contrato.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      inicio: contrato.dataInicio,
      vencimento: contrato.dataFinal,
      situacao: contrato.situacao,
      gestor: contrato.gestor,
      secretaria: contrato.secretaria
    }));

    const relatorio = relatoriosPredefinidos.find(r => r.id === relatorioId);
    const nomeArquivo = `relatorio-${relatorioId}`;

    switch (formato) {
      case 'csv':
        exportToCSV(dados, nomeArquivo);
        break;
      case 'excel':
        exportToExcel(dados, nomeArquivo);
        break;
      case 'pdf':
        exportToPDF(dados, nomeArquivo);
        break;
    }

    alert(`Relatório "${relatorio?.titulo}" gerado com sucesso em formato ${formato.toUpperCase()}!`);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-[#102a43] text-2xl mb-1 font-medium">
          Relatórios
        </h1>
        <p className="text-gray-600 text-sm">
          Gere relatórios detalhados sobre contratos, empenhos, gestores e indicadores do sistema.
        </p>
      </div>

      {/* Categorias */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex gap-2 flex-wrap">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                categoriaAtiva === cat.id
                  ? 'bg-[#0b6b3a] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                categoriaAtiva === cat.id
                  ? 'bg-white bg-opacity-20'
                  : 'bg-gray-200'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatoriosFiltrados.map(relatorio => {
          const Icon = relatorio.icon;
          return (
            <div
              key={relatorio.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-[#0b6b3a] transition-all hover:shadow-md group"
            >
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`${relatorio.bgColor} p-3 rounded-lg`}>
                    <Icon className={`size-6 ${relatorio.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#102a43] font-medium mb-1">
                      {relatorio.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {relatorio.descricao}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => gerarRelatorio(relatorio.id, 'pdf')}
                    className="flex-1 px-3 py-2 bg-red-50 text-red-700 rounded-md text-sm hover:bg-red-100 transition-colors font-medium"
                    title="Gerar PDF"
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => gerarRelatorio(relatorio.id, 'excel')}
                    className="flex-1 px-3 py-2 bg-green-50 text-green-700 rounded-md text-sm hover:bg-green-100 transition-colors font-medium"
                    title="Gerar Excel"
                  >
                    Excel
                  </button>
                  <button
                    onClick={() => gerarRelatorio(relatorio.id, 'csv')}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-md text-sm hover:bg-blue-100 transition-colors font-medium"
                    title="Gerar CSV"
                  >
                    CSV
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filtros Avançados */}
      <div className="bg-white rounded-lg border border-gray-200">
        <button
          onClick={() => setShowFiltros(!showFiltros)}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Filter className="size-5 text-gray-600" />
            <div className="text-left">
              <h3 className="text-[#102a43] font-medium">
                Filtros avançados
              </h3>
              <p className="text-gray-600 text-sm">
                Personalize os parâmetros dos relatórios
              </p>
            </div>
          </div>
          <ChevronRight className={`size-5 text-gray-400 transition-transform ${showFiltros ? 'rotate-90' : ''}`} />
        </button>

        {showFiltros && (
          <div className="px-5 pb-5 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Data inicial
                </label>
                <input
                  type="date"
                  value={filtros.dataInicio}
                  onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Data final
                </label>
                <input
                  type="date"
                  value={filtros.dataFim}
                  onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Secretaria / Órgão
                </label>
                <select
                  value={filtros.secretaria}
                  onChange={(e) => setFiltros({ ...filtros, secretaria: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="todas">Todas as secretarias</option>
                  <option value="saude">Secretaria de Saúde</option>
                  <option value="educacao">Secretaria de Educação</option>
                  <option value="obras">Secretaria de Obras</option>
                  <option value="transporte">Secretaria de Transporte</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Situação do contrato
                </label>
                <select
                  value={filtros.situacao}
                  onChange={(e) => setFiltros({ ...filtros, situacao: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="todas">Todas as situações</option>
                  <option value="vigente">Vigentes</option>
                  <option value="proximo_vencimento">Próximo ao vencimento</option>
                  <option value="vencido">Vencidos</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Gestor responsável
                </label>
                <select
                  value={filtros.gestor}
                  onChange={(e) => setFiltros({ ...filtros, gestor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="todos">Todos os gestores</option>
                  <option value="carlos">Carlos Souza</option>
                  <option value="ana">Ana Pereira</option>
                  <option value="roberto">Roberto Alves</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Fiscal designado
                </label>
                <select
                  value={filtros.fiscal}
                  onChange={(e) => setFiltros({ ...filtros, fiscal: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="todos">Todos os fiscais</option>
                  <option value="maria">Maria Santos</option>
                  <option value="joao">João Silva</option>
                  <option value="sem_fiscal">Sem fiscal designado</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setFiltros({
                  dataInicio: '',
                  dataFim: '',
                  secretaria: 'todas',
                  situacao: 'todas',
                  gestor: 'todos',
                  fiscal: 'todos'
                })}
                className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium"
              >
                Limpar filtros
              </button>
              <button className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium">
                Aplicar filtros
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Histórico de Relatórios Gerados */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-[#102a43] font-medium">
            Histórico de relatórios gerados
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Últimos relatórios exportados do sistema
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-gray-600 text-sm font-medium">
                  Tipo de relatório
                </th>
                <th className="px-5 py-3 text-left text-gray-600 text-sm font-medium">
                  Formato
                </th>
                <th className="px-5 py-3 text-left text-gray-600 text-sm font-medium">
                  Data/hora de geração
                </th>
                <th className="px-5 py-3 text-left text-gray-600 text-sm font-medium">
                  Gerado por
                </th>
                <th className="px-5 py-3 text-left text-gray-600 text-sm font-medium">
                  Filtros aplicados
                </th>
                <th className="px-5 py-3 text-left text-gray-600 text-sm font-medium">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {historico.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-[#102a43] text-sm font-medium">
                    {item.tipo}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.formato === 'PDF' ? 'bg-red-100 text-red-700' :
                      item.formato === 'Excel' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.formato}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600 text-sm">
                    {item.dataGeracao}
                  </td>
                  <td className="px-5 py-3 text-gray-600 text-sm">
                    {item.usuario}
                  </td>
                  <td className="px-5 py-3 text-gray-600 text-sm">
                    {item.filtros}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      title="Baixar novamente"
                    >
                      <Download className="size-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {historico.length === 0 && (
          <div className="px-5 py-12 text-center">
            <FileText className="size-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">
              Nenhum relatório gerado ainda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}