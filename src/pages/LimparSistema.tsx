import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Loader, XCircle, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function LimparSistema() {
  const [status, setStatus] = useState<'aguardando' | 'limpando' | 'sucesso' | 'erro'>('aguardando');
  const [progresso, setProgresso] = useState<string[]>([]);
  const [resultado, setResultado] = useState<any>(null);

  const adicionarLog = (mensagem: string) => {
    setProgresso(prev => [...prev, mensagem]);
  };

  const limparFrontend = () => {
    adicionarLog('🔄 Limpando Frontend (localStorage)...');
    
    try {
      const itemsRemovidos = [];
      
      // Remover usuários mock
      const mockUsers = localStorage.getItem('mock_users');
      if (mockUsers) {
        const users = JSON.parse(mockUsers);
        adicionarLog(`   📊 ${users.length} usuários mock encontrados`);
        localStorage.removeItem('mock_users');
        itemsRemovidos.push(`mock_users (${users.length})`);
      }
      
      // Remover usuário logado
      if (localStorage.getItem('contratos_jardim_user')) {
        adicionarLog('   👤 Removendo usuário logado');
        localStorage.removeItem('contratos_jardim_user');
        itemsRemovidos.push('contratos_jardim_user');
      }
      
      // Remover token
      if (localStorage.getItem('contratos_jardim_token')) {
        adicionarLog('   🔑 Removendo token de autenticação');
        localStorage.removeItem('contratos_jardim_token');
        itemsRemovidos.push('contratos_jardim_token');
      }
      
      // Remover solicitações
      const solicitacoes = localStorage.getItem('mock_solicitacoes');
      if (solicitacoes) {
        const sols = JSON.parse(solicitacoes);
        adicionarLog(`   📋 Removendo ${sols.length} solicitações`);
        localStorage.removeItem('mock_solicitacoes');
        itemsRemovidos.push(`mock_solicitacoes (${sols.length})`);
      }
      
      adicionarLog(`✅ Frontend limpo! ${itemsRemovidos.length} itens removidos`);
      return { success: true, itemsRemovidos };
    } catch (error: any) {
      adicionarLog(`❌ Erro ao limpar frontend: ${error.message}`);
      return { success: false, error: error.message };
    }
  };

  const limparBackend = async () => {
    adicionarLog('🔄 Limpando Backend (Supabase)...');
    
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da/admin/limpar-usuarios`;
      
      adicionarLog('   📡 Enviando requisição ao servidor...');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        adicionarLog(`✅ Backend limpo!`);
        adicionarLog(`   👥 Usuários Auth excluídos: ${result.resumo?.usuariosExcluidosAuth || 0}`);
        adicionarLog(`   📦 Usuários KV excluídos: ${result.resumo?.usuariosExcluidosKV || 0}`);
        
        if (result.detalhes?.excluidos && result.detalhes.excluidos.length > 0) {
          adicionarLog(`   📋 Emails excluídos: ${result.detalhes.excluidos.join(', ')}`);
        }
        
        return result;
      } else {
        throw new Error(result.error || 'Erro desconhecido');
      }
    } catch (error: any) {
      adicionarLog(`❌ Erro ao limpar backend: ${error.message}`);
      return { success: false, error: error.message };
    }
  };

  const executarLimpeza = async () => {
    setStatus('limpando');
    setProgresso([]);
    
    adicionarLog('╔══════════════════════════════════════════════════╗');
    adicionarLog('║     🗑️  LIMPEZA AUTOMÁTICA DO SISTEMA           ║');
    adicionarLog('╚══════════════════════════════════════════════════╝');
    adicionarLog('');
    
    // Passo 1: Limpar Backend
    adicionarLog('📍 PASSO 1/2: Limpando Backend');
    const backendResult = await limparBackend();
    adicionarLog('');
    
    // Passo 2: Limpar Frontend
    adicionarLog('📍 PASSO 2/2: Limpando Frontend');
    const frontendResult = limparFrontend();
    adicionarLog('');
    
    // Resultado Final
    if (backendResult.success && frontendResult.success) {
      adicionarLog('╔══════════════════════════════════════════════════╗');
      adicionarLog('║        ✅ LIMPEZA CONCLUÍDA COM SUCESSO!         ║');
      adicionarLog('╚══════════════════════════════════════════════════╝');
      setStatus('sucesso');
      setResultado({
        frontend: frontendResult,
        backend: backendResult
      });
    } else {
      adicionarLog('╔══════════════════════════════════════════════════╗');
      adicionarLog('║      ⚠️ LIMPEZA CONCLUÍDA COM ERROS              ║');
      adicionarLog('╚══════════════════════════════════════════════════╝');
      setStatus('erro');
      setResultado({
        frontend: frontendResult,
        backend: backendResult
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-4 rounded-xl">
              <Trash2 className="size-10 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 text-3xl">Limpar Sistema Completo</h1>
              <p className="text-gray-600">ContratosJardim - Limpeza Automática</p>
            </div>
          </div>
        </div>

        {/* Status Aguardando */}
        {status === 'aguardando' && (
          <div className="bg-white border-x shadow-2xl p-8">
            <div className="text-center space-y-6">
              <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="size-12 text-red-600" />
              </div>
              
              <div>
                <h2 className="text-gray-900 text-2xl mb-2">⚠️ ATENÇÃO - OPERAÇÃO IRREVERSÍVEL</h2>
                <p className="text-gray-600">
                  Esta ação irá excluir <strong>TODOS os usuários</strong> do sistema
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 text-left max-w-md mx-auto">
                <p className="text-red-900 font-bold mb-3">O que será excluído:</p>
                <ul className="text-red-800 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Todos os usuários do localStorage (frontend)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Todos os usuários do Supabase Auth (backend)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Todos os usuários do KV Store (backend)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Todas as solicitações de acesso pendentes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Sessão do usuário atual (logout automático)</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <a
                  href="/"
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  ← Cancelar e Voltar
                </a>
                <button
                  onClick={executarLimpeza}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="size-5" />
                  Confirmar e Limpar Tudo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Limpando */}
        {status === 'limpando' && (
          <div className="bg-white border-x shadow-2xl p-8">
            <div className="text-center space-y-6">
              <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                <Loader className="size-12 text-blue-600 animate-spin" />
              </div>
              
              <div>
                <h2 className="text-gray-900 text-2xl mb-2">🔄 Limpando Sistema...</h2>
                <p className="text-gray-600">Por favor, aguarde. Não feche esta página.</p>
              </div>

              {/* Log de Progresso */}
              <div className="bg-gray-900 rounded-xl p-4 text-left max-w-3xl mx-auto max-h-96 overflow-y-auto">
                <div className="font-mono text-sm space-y-1">
                  {progresso.map((log, index) => (
                    <div key={index} className="text-green-400">
                      {log}
                    </div>
                  ))}
                  <div className="text-green-400 animate-pulse">▊</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Sucesso */}
        {status === 'sucesso' && (
          <div className="bg-white border-x shadow-2xl p-8">
            <div className="text-center space-y-6">
              <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="size-12 text-green-600" />
              </div>
              
              <div>
                <h2 className="text-gray-900 text-2xl mb-2">✅ Limpeza Concluída!</h2>
                <p className="text-gray-600">
                  Todos os usuários foram excluídos com sucesso do sistema.
                </p>
              </div>

              {/* Log de Progresso */}
              <div className="bg-gray-900 rounded-xl p-4 text-left max-w-3xl mx-auto max-h-64 overflow-y-auto">
                <div className="font-mono text-sm space-y-1">
                  {progresso.map((log, index) => (
                    <div key={index} className="text-green-400">
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumo */}
              {resultado && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-left max-w-md mx-auto">
                  <p className="text-green-900 font-bold mb-3">📊 Resumo:</p>
                  <div className="space-y-2 text-green-800 text-sm">
                    <p>
                      <strong>Frontend:</strong> {resultado.frontend.itemsRemovidos?.length || 0} itens removidos
                    </p>
                    <p>
                      <strong>Backend Auth:</strong> {resultado.backend.resumo?.usuariosExcluidosAuth || 0} usuários excluídos
                    </p>
                    <p>
                      <strong>Backend KV:</strong> {resultado.backend.resumo?.usuariosExcluidosKV || 0} usuários excluídos
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-[#0b6b3a] text-white rounded-lg font-medium hover:bg-[#0a5a31] transition-colors"
                >
                  ← Voltar para Login
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Status Erro */}
        {status === 'erro' && (
          <div className="bg-white border-x shadow-2xl p-8">
            <div className="text-center space-y-6">
              <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="size-12 text-red-600" />
              </div>
              
              <div>
                <h2 className="text-gray-900 text-2xl mb-2">⚠️ Limpeza com Erros</h2>
                <p className="text-gray-600">
                  A limpeza foi concluída, mas houve alguns erros.
                </p>
              </div>

              {/* Log de Progresso */}
              <div className="bg-gray-900 rounded-xl p-4 text-left max-w-3xl mx-auto max-h-64 overflow-y-auto">
                <div className="font-mono text-sm space-y-1">
                  {progresso.map((log, index) => (
                    <div 
                      key={index} 
                      className={log.includes('❌') ? 'text-red-400' : 'text-green-400'}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <a
                  href="/"
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  ← Voltar para Login
                </a>
                <button
                  onClick={executarLimpeza}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="size-5" />
                  Tentar Novamente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-white rounded-b-2xl shadow-2xl p-4 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            Município de Jardim - CE | Sistema ContratosJardim
          </p>
        </div>
      </div>
    </div>
  );
}
