import React, { useState } from 'react';
import { Settings, Globe, Bell, Shield, Mail, Trash2, AlertTriangle, RefreshCw } from 'lucide-react';
import { contratos as contratosAPI, apiRequest } from '../utils/api';
import { toast } from 'sonner';

export function ConfiguracoesGerais() {
  const [formatoData, setFormatoData] = useState('dd/mm/aaaa');
  const [fusoHorario, setFusoHorario] = useState('america/fortaleza');
  const [idioma, setIdioma] = useState('pt-br');
  const [avisoAntecipado, setAvisoAntecipado] = useState('30');
  const [avisoCritico, setAvisoCritico] = useState('7');
  const [reenvioAlerta, setReenvioAlerta] = useState('3');
  const [tempoSessao, setTempoSessao] = useState('30');
  const [encerrarAuto, setEncerrarAuto] = useState(true);
  const [sessaoUnica, setSessaoUnica] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(true);
  const [emailAuto, setEmailAuto] = useState(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showConfirmRestore, setShowConfirmRestore] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const handleLimparContratos = async () => {
    if (!window.confirm('⚠️ ATENÇÃO: Você está prestes a deletar TODOS os contratos do sistema!\n\nEsta ação é IRREVERSÍVEL e não pode ser desfeita.\n\nTodos os contratos cadastrados serão permanentemente excluídos.\n\nDeseja realmente continuar?')) {
      return;
    }

    if (!window.confirm('⚠️ CONFIRMAÇÃO FINAL\n\nDigite no console: "Tenho certeza"\n\nApenas clique OK se você realmente tem certeza absoluta desta ação.')) {
      return;
    }

    try {
      setDeleting(true);
      toast.loading('Deletando todos os contratos...');
      
      const response = await contratosAPI.deleteAll();
      
      if (response.success) {
        toast.success(`✅ ${response.deletados} contrato(s) deletado(s) com sucesso!`);
        console.log('✅ Limpeza concluída:', response);
        
        // Recarregar página após 2 segundos
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        throw new Error('Falha ao deletar contratos');
      }
    } catch (error: any) {
      console.error('❌ Erro ao limpar contratos:', error);
      toast.error(error.message || 'Erro ao deletar contratos');
    } finally {
      setDeleting(false);
      setShowConfirmDelete(false);
    }
  };

  const handleRestaurarPadroes = async () => {
    setShowConfirmRestore(false);
    
    try {
      setRestoring(true);
      toast.loading('Restaurando usuários padrão do sistema...');
      
      const response = await apiRequest('/admin/restaurar-padroes', {
        method: 'POST'
      });
      
      if (response.success) {
        toast.success(`✅ ${response.resumo.totalCriados} usuário(s) padrão criado(s) com sucesso!`);
        console.log('✅ Restauração concluída:', response);
        
        // Mostrar detalhes dos usuários criados no console
        console.table(response.usuarios);
        
        toast.success('🔄 Recarregando página em 3 segundos...', {
          duration: 3000
        });
        
        // Recarregar página após 3 segundos
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        throw new Error(response.error || 'Falha ao restaurar usuários padrão');
      }
    } catch (error: any) {
      console.error('❌ Erro ao restaurar padrões:', error);
      toast.error(error.message || 'Erro ao restaurar usuários padrão');
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-[#102a43] text-2xl mb-1 font-medium">
          Configurações gerais
        </h1>
        <p className="text-gray-600 text-sm">
          Ajustes globais do sistema: data/hora, idioma, segurança e comunicações.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Parâmetros do sistema */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="size-5 text-[#0b6b3a]" />
            <h2 className="text-[#102a43] font-medium">
              Parâmetros do sistema
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2 font-medium">
                Formato de data
              </label>
              <select
                value={formatoData}
                onChange={(e) => setFormatoData(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                <option value="dd/mm/aaaa">DD/MM/AAAA (padrão Brasil)</option>
                <option value="mm/dd/aaaa">MM/DD/AAAA (padrão EUA)</option>
                <option value="aaaa-mm-dd">AAAA-MM-DD (ISO)</option>
              </select>
              <p className="text-gray-600 text-sm mt-1">
                Define como as datas são exibidas no sistema
              </p>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2 font-medium">
                Fuso horário padrão
              </label>
              <select
                value={fusoHorario}
                onChange={(e) => setFusoHorario(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                <option value="america/fortaleza">America/Fortaleza (GMT-3)</option>
                <option value="america/sao_paulo">America/São Paulo (GMT-3)</option>
                <option value="america/manaus">America/Manaus (GMT-4)</option>
              </select>
              <p className="text-gray-600 text-sm mt-1">
                Município de Jardim, Ceará
              </p>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2 font-medium">
                Idioma do sistema
              </label>
              <select
                value={idioma}
                onChange={(e) => setIdioma(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                <option value="pt-br">Português (Brasil)</option>
                <option value="en" disabled>English (em desenvolvimento)</option>
                <option value="es" disabled>Español (em desenvolvimento)</option>
              </select>
              <p className="text-gray-600 text-sm mt-1">
                Interface em português brasileiro
              </p>
            </div>
          </div>
        </div>

        {/* Alertas e prazos */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="size-5 text-[#0b6b3a]" />
            <h2 className="text-[#102a43] font-medium">
              Alertas e prazos
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2 font-medium">
                Aviso antecipado padrão
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={avisoAntecipado}
                  onChange={(e) => setAvisoAntecipado(e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
                <span className="text-gray-600 text-sm">dias</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Notifica com esta antecedência do vencimento
              </p>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2 font-medium">
                Aviso crítico
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={avisoCritico}
                  onChange={(e) => setAvisoCritico(e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
                <span className="text-gray-600 text-sm">dias</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Alerta urgente quando faltam poucos dias
              </p>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2 font-medium">
                Reenvio de alerta
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={reenvioAlerta}
                  onChange={(e) => setReenvioAlerta(e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
                <span className="text-gray-600 text-sm">dias</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Reenvia notificação a cada X dias se não tratada
              </p>
            </div>
          </div>
        </div>

        {/* Sessão e segurança */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="size-5 text-[#0b6b3a]" />
            <h2 className="text-[#102a43] font-medium">
              Sessão e segurança
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2 font-medium">
                Tempo de sessão inativa
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={tempoSessao}
                  onChange={(e) => setTempoSessao(e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
                <span className="text-gray-600 text-sm">minutos</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Tempo até encerrar sessão por inatividade
              </p>
            </div>

            <label className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-[#102a43] text-sm font-medium block">
                  Encerrar sessão automaticamente
                </span>
                <p className="text-gray-600 text-sm mt-1">
                  Desloga usuário após tempo de inatividade
                </p>
              </div>
              <input
                type="checkbox"
                checked={encerrarAuto}
                onChange={(e) => setEncerrarAuto(e.target.checked)}
                className="size-5 text-[#0b6b3a] rounded mt-0.5"
              />
            </label>

            <label className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-[#102a43] text-sm font-medium block">
                  Permitir apenas uma sessão por usuário
                </span>
                <p className="text-gray-600 text-sm mt-1">
                  Impede login simultâneo em múltiplos dispositivos
                </p>
              </div>
              <input
                type="checkbox"
                checked={sessaoUnica}
                onChange={(e) => setSessaoUnica(e.target.checked)}
                className="size-5 text-[#0b6b3a] rounded mt-0.5"
              />
            </label>

            <label className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-[#102a43] text-sm font-medium block">
                  Exigir confirmação para exclusão de contratos
                </span>
                <p className="text-gray-600 text-sm mt-1">
                  Modal de confirmação antes de excluir
                </p>
              </div>
              <input
                type="checkbox"
                checked={confirmarExclusao}
                onChange={(e) => setConfirmarExclusao(e.target.checked)}
                className="size-5 text-[#0b6b3a] rounded mt-0.5"
              />
            </label>
          </div>
        </div>

        {/* Comunicações e e-mail */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="size-5 text-[#0b6b3a]" />
            <h2 className="text-[#102a43] font-medium">
              Comunicações e e-mail
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1 font-medium">
                Remetente padrão (sistema)
              </label>
              <input
                type="email"
                value="controleinterno@jardim.ce.gov.br"
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50"
              />
              <p className="text-gray-600 text-sm mt-1">
                E-mail institucional que envia notificações
              </p>
            </div>

            <label className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-[#102a43] text-sm font-medium block">
                  Enviar e-mail para responsáveis por contratos
                </span>
                <p className="text-gray-600 text-sm mt-1">
                  Notifica gestores e fiscais sobre alterações
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailAuto}
                onChange={(e) => setEmailAuto(e.target.checked)}
                className="size-5 text-[#0b6b3a] rounded mt-0.5"
              />
            </label>

            <div className="border border-blue-200 bg-blue-50 rounded-lg p-3">
              <p className="text-blue-900 text-sm">
                <strong>Nota:</strong> Envios automáticos seguem configuração de alertas e prazos. Para editar frequência e destinatários, acesse Parâmetros e perfis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowConfirmRestore(true)}
          className="px-6 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium"
        >
          Restaurar padrões
        </button>
        <button className="px-6 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium">
          Salvar configurações
        </button>
      </div>

      {/* Zona de Perigo - Apenas para Administradores */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mt-8">
        <div className="flex items-start gap-4">
          <AlertTriangle className="size-6 text-red-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-red-900 font-medium mb-2 flex items-center gap-2">
              Zona de Perigo
              <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded">Admin</span>
            </h2>
            <p className="text-red-800 text-sm mb-4">
              Ações nesta seção são <strong>irreversíveis</strong> e devem ser usadas com extremo cuidado. Todos os dados deletados não podem ser recuperados.
            </p>
            <button
              onClick={() => setShowConfirmDelete(true)}
              disabled={deleting}
              className="px-6 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="size-4" />
              {deleting ? 'Deletando...' : 'Deletar Todos os Contratos'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <AlertTriangle className="size-6 text-red-500" />
              <h2 className="text-[#102a43] font-medium">
                Confirmação de exclusão
              </h2>
            </div>
            <p className="text-gray-600 text-sm">
              Você está prestes a deletar todos os contratos do sistema. Esta ação é irreversível e não pode ser desfeita. Todos os contratos cadastrados serão permanentemente excluídos.
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-6 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancelar
              </button>
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 font-medium"
                onClick={handleLimparContratos}
                disabled={deleting}
              >
                {deleting ? 'Deletando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de restauração */}
      {showConfirmRestore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <RefreshCw className="size-6 text-blue-600" />
              <h2 className="text-[#102a43] font-medium">
                Restaurar Usuários Padrão
              </h2>
            </div>
            
            <div className="space-y-3 mb-4">
              <p className="text-gray-700 text-sm">
                Esta ação irá <strong>criar os seguintes usuários padrão</strong> no sistema:
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                <div className="text-sm">
                  <p className="text-blue-900 font-medium">👤 Administrador do Sistema</p>
                  <p className="text-blue-700 text-xs">admin@jardim.ce.gov.br • Senha: Admin@2024</p>
                </div>
                
                <div className="text-sm">
                  <p className="text-blue-900 font-medium">👤 Maria Silva</p>
                  <p className="text-blue-700 text-xs">maria.silva@jardim.ce.gov.br • Senha: Gestor@2024</p>
                </div>
                
                <div className="text-sm">
                  <p className="text-blue-900 font-medium">👤 João Santos</p>
                  <p className="text-blue-700 text-xs">joao.santos@jardim.ce.gov.br • Senha: Fiscal@2024</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm">
                ℹ️ Se algum usuário já existir, ele será mantido e não será sobrescrito.
              </p>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                className="px-6 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium"
                onClick={() => setShowConfirmRestore(false)}
              >
                Cancelar
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium flex items-center gap-2"
                onClick={handleRestaurarPadroes}
                disabled={restoring}
              >
                {restoring ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    Criando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="size-4" />
                    Criar Usuários
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}