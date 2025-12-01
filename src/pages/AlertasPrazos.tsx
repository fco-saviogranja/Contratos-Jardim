import React, { useState, useEffect } from 'react';
import { exportToCSV, exportToExcel, exportToPDF } from '../utils/exportUtils';
import { AlertTriangle, FileX, UserX, DollarSign, Eye, FileText, Settings, Download, ChevronDown, Bell } from 'lucide-react';
import { alertas as alertasAPI } from '../utils/api';
import { MOCK_ALERTAS } from '../utils/mockData';
import { useSecretarias } from '../hooks/useSecretarias';

export function AlertasPrazos() {
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showEditNamesModal, setShowEditNamesModal] = useState(false);
  const [alertas, setAlertas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { secretarias } = useSecretarias();
  
  // Carregar alertas da API
  useEffect(() => {
    const carregarAlertas = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Carregando alertas da API...');
        const response = await alertasAPI.getAll();
        
        if (response.success && response.alertas) {
          console.log(`✅ ${response.alertas.length} alertas carregados da API`);
          setAlertas(response.alertas);
        } else {
          console.warn('⚠️ Resposta da API sem alertas');
          setAlertas([]);
        }
      } catch (err) {
        console.error('❌ Erro ao carregar alertas da API:', err);
        console.log('🔄 Usando dados mock como fallback');
        setError('Não foi possível conectar ao servidor. Usando dados de exemplo.');
        setAlertas(MOCK_ALERTAS);
      } finally {
        setLoading(false);
      }
    };

    carregarAlertas();
  }, []);

  const [limites, setLimites] = useState({
    diasAlertaCritico: 7,
    diasAlertaNormal: 30,
    percentualValorAlerta: 90
  });
  const [nomesAlertas, setNomesAlertas] = useState({
    vencimento_prazo: 'Alertas de vencimento de prazo',
    pendencia_documental: 'Alertas de pendências documentais',
    sem_fiscal: 'Alertas de contratos sem fiscal',
    valor_ultrapassado: 'Alertas de valores ultrapassados no empenho'
  });

  const tiposAlerta = [
    { 
      id: 'vencimento_prazo', 
      icon: AlertTriangle, 
      label: nomesAlertas.vencimento_prazo,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    { 
      id: 'pendencia_documental', 
      icon: FileX, 
      label: nomesAlertas.pendencia_documental,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      id: 'sem_fiscal', 
      icon: UserX, 
      label: nomesAlertas.sem_fiscal,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      id: 'valor_ultrapassado', 
      icon: DollarSign, 
      label: nomesAlertas.valor_ultrapassado,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const getSituacaoBadge = (situacao: string) => {
    const styles = {
      pendente: 'bg-amber-100 text-amber-700',
      em_tratativa: 'bg-blue-100 text-blue-700',
      concluido: 'bg-green-100 text-green-700'
    };
    
    const labels = {
      pendente: 'Pendente',
      em_tratativa: 'Em tratativa',
      concluido: 'Concluído'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[situacao as keyof typeof styles]}`}>
        {labels[situacao as keyof typeof labels]}
      </span>
    );
  };

  const getAlertasByTipo = (tipo: string) => {
    return alertas.filter(a => a.tipo === tipo);
  };

  // Preparar dados para exportação
  const prepararDadosExportacao = () => {
    return alertas.map(alerta => ({
      numero: alerta.contrato,
      objeto: alerta.mensagem,
      contratado: '',
      valor: '',
      inicio: '',
      vencimento: alerta.diasRestantes ? `${alerta.diasRestantes} dias` : '',
      situacao: alerta.situacao,
      gestor: '',
      secretaria: alerta.secretaria
    }));
  };

  const handleExport = (formato: 'csv' | 'excel' | 'pdf') => {
    const dados = prepararDadosExportacao();
    
    switch (formato) {
      case 'csv':
        exportToCSV(dados, 'alertas-e-prazos');
        break;
      case 'excel':
        exportToExcel(dados, 'alertas-e-prazos');
        break;
      case 'pdf':
        exportToPDF(dados, 'alertas-e-prazos');
        break;
    }
    
    setShowExportMenu(false);
  };

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#102a43] text-2xl mb-1 font-medium">
            Alertas e prazos
          </h1>
          <p className="text-gray-600 text-sm">
            Alertas automáticos de contratos com prazos críticos, documentações pendentes ou outras irregularidades.
          </p>
        </div>
        
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 flex items-center gap-2 font-medium" onClick={() => setShowConfigModal(true)}>
            <Settings className="size-4" />
            Configurar limites de alerta
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium" onClick={() => setShowEditNamesModal(true)}>
            Editar nomes dos alertas
          </button>
        </div>
      </div>

      {/* Estado vazio quando não há alertas */}
      {alertas.length === 0 ? (
        <div className="bg-white rounded-lg p-12">
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <Bell className="size-16 text-gray-300 mb-4" />
            <h2 className="text-[#102a43] text-xl font-medium mb-2">
              Nenhum alerta cadastrado
            </h2>
            <p className="text-gray-600">
              Os alertas serão gerados automaticamente quando contratos estiverem próximos do vencimento ou apresentarem irregularidades.
            </p>
          </div>
        </div>
      ) : (
        <>
      {/* Filtros */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Tipo de alerta
            </label>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm">
              <option>Todos os tipos</option>
              <option>Vencimento de prazo</option>
              <option>Pendências documentais</option>
              <option>Sem fiscal</option>
              <option>Valores ultrapassados</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Período de vencimento
            </label>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm">
              <option>Todos os períodos</option>
              <option>Próximos 30 dias</option>
              <option>Próximos 60 dias</option>
              <option>Vencidos</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Secretaria / Órgão
            </label>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm">
              <option>Todas</option>
              {secretarias.map(secretaria => (
                <option key={secretaria.id}>{secretaria.nome}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Gestor responsável
            </label>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm">
              <option>Todos</option>
              <option>Carlos Souza</option>
              <option>Ana Pereira</option>
              <option>Roberto Alves</option>
            </select>
          </div>
          
          <button className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium">
            Filtrar
          </button>
        </div>
      </div>

      {/* Lista de alertas por tipo */}
      <div className="space-y-4">
        {tiposAlerta.map(tipo => {
          const Icon = tipo.icon;
          const alertas = getAlertasByTipo(tipo.id);
          
          return (
            <div key={tipo.id} className="bg-white rounded-lg overflow-hidden">
              <div className={`${tipo.bgColor} px-4 py-3 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <Icon className={`size-5 ${tipo.color}`} />
                  <div>
                    <h3 className="text-[#102a43] font-medium">
                      {tipo.label}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {alertas.length} {alertas.length === 1 ? 'contrato' : 'contratos'}
                    </p>
                  </div>
                </div>
              </div>
              
              {alertas.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                          Contrato
                        </th>
                        <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                          Secretaria
                        </th>
                        <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                          Descrição do alerta
                        </th>
                        {tipo.id === 'vencimento_prazo' && (
                          <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                            Dias restantes
                          </th>
                        )}
                        <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                          Situação
                        </th>
                        <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {alertas.map(alerta => (
                        <tr key={alerta.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-[#102a43] text-sm font-medium">
                            {alerta.contrato}
                          </td>
                          <td className="px-4 py-3 text-gray-600 text-sm">
                            {alerta.secretaria}
                          </td>
                          <td className="px-4 py-3 text-gray-600 text-sm">
                            {alerta.mensagem}
                          </td>
                          {tipo.id === 'vencimento_prazo' && (
                            <td className="px-4 py-3 text-sm font-medium">
                              {alerta.diasRestantes && alerta.diasRestantes > 0 ? (
                                <span className="text-amber-600">{alerta.diasRestantes} dias</span>
                              ) : (
                                <span className="text-red-600">
                                  {alerta.diasRestantes && Math.abs(alerta.diasRestantes)} dias atrás
                                </span>
                              )}
                            </td>
                          )}
                          <td className="px-4 py-3">
                            {getSituacaoBadge(alerta.situacao)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button 
                                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                                title="Ver contrato"
                              >
                                <Eye className="size-4 text-gray-600" />
                              </button>
                              <button 
                                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                                title="Registrar ação"
                              >
                                <FileText className="size-4 text-gray-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-gray-600 text-sm">
                    Nenhum alerta deste tipo no momento
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
        </>
      )}

      {/* Modal: Configurar Limites de Alerta */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl text-[#102a43] font-medium">
                Configurar limites de alerta
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Defina os prazos e valores para disparar alertas automáticos no sistema.
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Alerta crítico */}
              <div>
                <label className="block text-[#102a43] text-sm font-medium mb-2">
                  Alerta crítico de vencimento
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={limites.diasAlertaCritico}
                    onChange={(e) => setLimites({ ...limites, diasAlertaCritico: Number(e.target.value) })}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="1"
                  />
                  <span className="text-gray-600 text-sm">
                    dias antes do vencimento (alerta vermelho, alta prioridade)
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Recomendado: 7 dias
                </p>
              </div>

              {/* Alerta normal */}
              <div>
                <label className="block text-[#102a43] text-sm font-medium mb-2">
                  Alerta normal de vencimento
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={limites.diasAlertaNormal}
                    onChange={(e) => setLimites({ ...limites, diasAlertaNormal: Number(e.target.value) })}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="1"
                  />
                  <span className="text-gray-600 text-sm">
                    dias antes do vencimento (alerta laranja, revisão necessária)
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Recomendado: 30 dias
                </p>
              </div>

              {/* Alerta de valor */}
              <div>
                <label className="block text-[#102a43] text-sm font-medium mb-2">
                  Percentual de valor empenhado
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={limites.percentualValorAlerta}
                    onChange={(e) => setLimites({ ...limites, percentualValorAlerta: Number(e.target.value) })}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="1"
                    max="100"
                  />
                  <span className="text-gray-600 text-sm">
                    % do valor total contratado (alerta de aditivo necessário)
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Recomendado: 90%
                </p>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Importante:</strong> As alterações nos limites serão aplicadas imediatamente e afetarão todos os contratos cadastrados no sistema.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowConfigModal(false);
                  // Aqui você salvaria as configurações
                  alert('Configurações salvas com sucesso!');
                }}
                className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
              >
                Salvar configurações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Editar Nomes dos Alertas */}
      {showEditNamesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl text-[#102a43] font-medium">
                Editar nomes dos alertas
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Personalize os nomes exibidos para cada categoria de alerta.
              </p>
            </div>
            
            <div className="p-6 space-y-5">
              {/* Vencimento de prazo */}
              <div>
                <label className="block text-[#102a43] text-sm font-medium mb-2">
                  <AlertTriangle className="size-4 inline mr-2 text-amber-600" />
                  Alertas de vencimento de prazo
                </label>
                <input
                  type="text"
                  value={nomesAlertas.vencimento_prazo}
                  onChange={(e) => setNomesAlertas({ ...nomesAlertas, vencimento_prazo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Nome para alertas de vencimento"
                />
              </div>

              {/* Pendências documentais */}
              <div>
                <label className="block text-[#102a43] text-sm font-medium mb-2">
                  <FileX className="size-4 inline mr-2 text-blue-600" />
                  Alertas de pendências documentais
                </label>
                <input
                  type="text"
                  value={nomesAlertas.pendencia_documental}
                  onChange={(e) => setNomesAlertas({ ...nomesAlertas, pendencia_documental: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Nome para alertas documentais"
                />
              </div>

              {/* Sem fiscal */}
              <div>
                <label className="block text-[#102a43] text-sm font-medium mb-2">
                  <UserX className="size-4 inline mr-2 text-purple-600" />
                  Alertas de contratos sem fiscal
                </label>
                <input
                  type="text"
                  value={nomesAlertas.sem_fiscal}
                  onChange={(e) => setNomesAlertas({ ...nomesAlertas, sem_fiscal: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Nome para alertas sem fiscal"
                />
              </div>

              {/* Valores ultrapassados */}
              <div>
                <label className="block text-[#102a43] text-sm font-medium mb-2">
                  <DollarSign className="size-4 inline mr-2 text-red-600" />
                  Alertas de valores ultrapassados no empenho
                </label>
                <input
                  type="text"
                  value={nomesAlertas.valor_ultrapassado}
                  onChange={(e) => setNomesAlertas({ ...nomesAlertas, valor_ultrapassado: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Nome para alertas de valores"
                />
              </div>

              {/* Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <p className="text-amber-800 text-sm">
                  <strong>Dica:</strong> Use nomes claros e intuitivos que facilitem a compreensão dos gestores e fiscais de contratos.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowEditNamesModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowEditNamesModal(false);
                  // Aqui você salvaria os nomes
                  alert('Nomes dos alertas atualizados com sucesso!');
                }}
                className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
              >
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}