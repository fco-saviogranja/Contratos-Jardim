import React, { useState, useEffect } from 'react';
import { Settings, CheckCircle, XCircle, AlertCircle, RefreshCw, User, Key, Shield, UserPlus } from 'lucide-react';
import { apiRequest, auth } from '../utils/api';

export function Diagnostico() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [novaSenha, setNovaSenha] = useState('SenhaTemp123');
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [kvStoreData, setKvStoreData] = useState<any>(null);
  const [edgeFunctionStatus, setEdgeFunctionStatus] = useState<any>(null);
  
  // Verificar usuário logado
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);
  
  useEffect(() => {
    const userStr = localStorage.getItem('contratos_jardim_user');
    if (userStr) {
      setUsuarioLogado(JSON.parse(userStr));
    }
  }, []);

  const executarSetupInicial = async () => {
    setLoading(true);
    setResultado(null);
    
    try {
      console.log('🔧 Executando Setup Inicial...');
      const result = await auth.setupAdmin();
      
      if (result.success) {
        setResultado({
          tipo: 'sucesso',
          mensagem: `✅ Administrador criado com sucesso!`,
          detalhes: {
            nome: result.user?.nome || 'Administrador',
            email: result.credentials?.email || 'admin@jardim.ce.gov.br',
            senha: result.credentials?.password || 'senha',
            perfil: result.user?.perfil || 'admin'
          }
        });
      } else {
        setResultado({
          tipo: 'erro',
          mensagem: result.error || 'Erro ao executar setup inicial'
        });
      }
    } catch (error: any) {
      console.error('❌ Erro ao executar setup:', error);
      setResultado({
        tipo: 'erro',
        mensagem: error.message || 'Endpoint de setup removido. Crie usuários manualmente através da página de Gerenciar Usuários.'
      });
    } finally {
      setLoading(false);
    }
  };

  const diagnosticarLogin = async () => {
    setLoading(true);
    setResultado(null);
    
    try {
      // Passo 1: Verificar se usuário existe
      const checkResult = await apiRequest('/debug/check-user', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      
      // Passo 2: Testar login
      const testResult = await apiRequest('/debug/test-login', {
        method: 'POST',
        body: JSON.stringify({ email, password: senha }),
      });
      
      setResultado({
        tipo: 'diagnostico',
        authUser: checkResult.authUser,
        kvUser: checkResult.kvUser,
        loginFuncionou: testResult.success,
        erro: testResult.error
      });
    } catch (error: any) {
      setResultado({
        tipo: 'erro',
        mensagem: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const corrigirUsuario = async () => {
    setLoading(true);
    
    try {
      const result = await apiRequest('/debug/fix-user', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      
      if (result.success) {
        setResultado({
          tipo: 'fix-success',
          mensagem: result.message,
          authUser: result.authUser,
          kvUser: result.kvUser,
          loginTest: result.loginTest,
          credentials: result.credentials
        });
      } else {
        setResultado({
          tipo: 'erro',
          mensagem: result.error
        });
      }
    } catch (error: any) {
      setResultado({
        tipo: 'erro',
        mensagem: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const resetarSenha = async () => {
    setLoading(true);
    
    try {
      const result = await apiRequest('/debug/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, novaSenha }),
      });
      
      if (result.success) {
        setResultado({
          tipo: 'sucesso',
          mensagem: `Senha resetada! Use a senha: ${novaSenha}`
        });
      } else {
        setResultado({
          tipo: 'erro',
          mensagem: result.error
        });
      }
    } catch (error: any) {
      setResultado({
        tipo: 'erro',
        mensagem: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const corrigirTodos = async () => {
    setLoading(true);
    
    try {
      const result = await apiRequest('/debug/fix-all-users', {
        method: 'POST',
      });
      
      if (result.success) {
        setResultado({
          tipo: 'lista',
          usuarios: result.users,
          senhaTemporaria: result.senhaTemporaria
        });
      } else {
        setResultado({
          tipo: 'erro',
          mensagem: result.error
        });
      }
    } catch (error: any) {
      setResultado({
        tipo: 'erro',
        mensagem: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const alterarPerfil = async (novoPerfil: string) => {
    setLoading(true);
    
    try {
      const result = await apiRequest('/debug/change-profile', {
        method: 'POST',
        body: JSON.stringify({ email, novoPerfil }),
      });
      
      if (result.success) {
        setResultado({
          tipo: 'sucesso',
          mensagem: `Perfil alterado para: ${novoPerfil}. Faça logout e login novamente!`
        });
      } else {
        setResultado({
          tipo: 'erro',
          mensagem: result.error
        });
      }
    } catch (error: any) {
      setResultado({
        tipo: 'erro',
        mensagem: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const limparTodosUsuarios = async () => {
    setShowConfirmacao(false);
    setLoading(true);
    
    try {
      const result = await apiRequest('/admin/limpar-usuarios', {
        method: 'POST',
      });
      
      if (result.success) {
        setResultado({
          tipo: 'limpeza',
          resumo: result.resumo,
          detalhes: result.detalhes
        });
      } else {
        setResultado({
          tipo: 'erro',
          mensagem: result.error
        });
      }
    } catch (error: any) {
      setResultado({
        tipo: 'erro',
        mensagem: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const verificarKVStore = async () => {
    setLoading(true);
    try {
      console.log('🔍 Verificando KV Store...');
      
      // Buscar todos os usuários do KV Store
      const result = await apiRequest('/admin/listar-usuarios-kv', {
        method: 'GET'
      });
      
      console.log('📊 Resultado KV Store:', result);
      
      setKvStoreData({
        sucesso: result.success,
        usuarios: result.usuarios || [],
        total: result.total || 0,
        timestamp: new Date().toLocaleString('pt-BR')
      });
      
      setResultado({
        tipo: 'kv-store',
        data: result
      });
      
    } catch (error: any) {
      console.error('❌ Erro ao verificar KV Store:', error);
      setKvStoreData({
        sucesso: false,
        erro: error.message,
        timestamp: new Date().toLocaleString('pt-BR')
      });
      setResultado({
        tipo: 'erro',
        mensagem: `Erro ao verificar KV Store: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const verificarEdgeFunction = async () => {
    setLoading(true);
    try {
      console.log('🔍 Verificando Edge Function...');
      
      // Health check da Edge Function
      const result = await apiRequest('/health', {
        method: 'GET'
      });
      
      console.log('📊 Resultado Edge Function:', result);
      
      setEdgeFunctionStatus({
        status: result.status || 'ok',
        online: true,
        timestamp: result.timestamp || new Date().toISOString(),
        nome: 'make-server-1a8b02da'
      });
      
      setResultado({
        tipo: 'edge-function',
        data: {
          status: 'online',
          nome: 'make-server-1a8b02da',
          timestamp: result.timestamp
        }
      });
      
    } catch (error: any) {
      console.error('❌ Erro ao verificar Edge Function:', error);
      setEdgeFunctionStatus({
        status: 'offline',
        online: false,
        erro: error.message,
        nome: 'make-server-1a8b02da'
      });
      setResultado({
        tipo: 'erro',
        mensagem: `Edge Function offline: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const criarAdminSimples = async () => {
    setLoading(true);
    setResultado(null);
    
    try {
      console.log('🔧 Criando usuário admin funcional...');
      
      const result = await apiRequest('/admin/criar-admin-simples', {
        method: 'POST'
      });
      
      console.log('📊 Resultado:', result);
      
      if (result.success) {
        setResultado({
          tipo: 'admin-criado',
          credentials: result.credentials,
          loginTested: result.loginTested,
          message: result.message
        });
      } else {
        setResultado({
          tipo: 'erro',
          mensagem: result.error || 'Erro ao criar admin'
        });
      }
      
    } catch (error: any) {
      console.error('❌ Erro ao criar admin:', error);
      setResultado({
        tipo: 'erro',
        mensagem: `Erro: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const verificarTudo = async () => {
    setLoading(true);
    try {
      console.log('🔍 Verificando todo o sistema...');
      
      // 1. Verificar Edge Function
      let edgeStatus = { online: false, erro: '' };
      try {
        const healthResult = await apiRequest('/health', { method: 'GET' });
        edgeStatus = { online: true, erro: '' };
        setEdgeFunctionStatus({
          status: 'online',
          online: true,
          timestamp: healthResult.timestamp,
          nome: 'make-server-1a8b02da'
        });
      } catch (error: any) {
        edgeStatus = { online: false, erro: error.message };
        setEdgeFunctionStatus({
          status: 'offline',
          online: false,
          erro: error.message,
          nome: 'make-server-1a8b02da'
        });
      }
      
      // 2. Verificar KV Store
      let kvData = { usuarios: [], total: 0, erro: '' };
      try {
        const kvResult = await apiRequest('/admin/listar-usuarios-kv', { method: 'GET' });
        kvData = {
          usuarios: kvResult.usuarios || [],
          total: kvResult.total || 0,
          erro: ''
        };
        setKvStoreData({
          sucesso: true,
          usuarios: kvResult.usuarios || [],
          total: kvResult.total || 0,
          timestamp: new Date().toLocaleString('pt-BR')
        });
      } catch (error: any) {
        kvData = { usuarios: [], total: 0, erro: error.message };
        setKvStoreData({
          sucesso: false,
          erro: error.message,
          timestamp: new Date().toLocaleString('pt-BR')
        });
      }
      
      // Mostrar resultado consolidado
      setResultado({
        tipo: 'verificacao-completa',
        edgeFunction: edgeStatus,
        kvStore: kvData,
        timestamp: new Date().toLocaleString('pt-BR')
      });
      
    } catch (error: any) {
      console.error('❌ Erro na verificação completa:', error);
      setResultado({
        tipo: 'erro',
        mensagem: `Erro na verificação: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b6b3a] to-[#0a5a31] p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-2xl p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-[#0b6b3a] to-[#0a5a31] p-3 rounded-xl">
              <Settings className="size-8 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 text-2xl">Ferramentas de Diagnóstico</h1>
              <p className="text-gray-600 text-sm">ContratosJardim - Sistema de Gestão de Contratos</p>
            </div>
          </div>
          
          {/* GUIA RÁPIDO */}
          <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-4">
            <h3 className="text-yellow-900 font-bold mb-3 flex items-center gap-2 text-lg">
              <AlertCircle className="size-6" />
              🚨 Problemas com Login? Siga Este Guia:
            </h3>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                <p className="text-gray-900 font-bold mb-1">1️⃣ Solução Rápida (RECOMENDADO)</p>
                <p className="text-gray-700 text-sm">
                  Role para baixo e clique no botão verde <strong>"🚀 Criar Admin Funcional Agora"</strong>. 
                  Isso vai criar um usuário admin testado e pronto para usar em segundos!
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
                <p className="text-gray-900 font-bold mb-1">2️⃣ Verificar o Sistema</p>
                <p className="text-gray-700 text-sm">
                  Use o botão <strong>"🔍 Verificar Todo o Sistema"</strong> para ver quantos usuários existem 
                  no KV Store e se a Edge Function está funcionando.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                <p className="text-gray-900 font-bold mb-1">3️⃣ Diagnosticar Login Específico</p>
                <p className="text-gray-700 text-sm">
                  Se você já tem um usuário criado mas não consegue logar, preencha o email e senha 
                  e clique em <strong>"Diagnosticar Login"</strong> para ver qual é o problema.
                </p>
              </div>
            </div>
          </div>
          
          {/* Ação de Emergência - Limpar Todos os Usuários */}
          <div className="mt-4 bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <h3 className="text-red-900 font-bold mb-2 flex items-center gap-2">
              <XCircle className="size-6" />
              🚨 Ação de Emergência
            </h3>
            <p className="text-red-800 text-sm mb-3">
              Use esta opção para <strong>EXCLUIR TODOS OS USUÁRIOS</strong> do sistema (frontend + backend). Esta ação é irreversível!
            </p>
            <div className="bg-white border border-red-200 rounded-lg p-3 text-sm space-y-2">
              <p className="text-gray-700">
                <strong>Via Interface:</strong> Clique no botão "Limpar Todos os Usuários" abaixo
              </p>
              <p className="text-gray-700">
                <strong>Via Página Automática:</strong> Acesse <a href="/limpar-sistema" className="text-red-600 font-bold underline hover:text-red-700">/limpar-sistema</a>
              </p>
              <p className="text-gray-700">
                <strong>Via Console:</strong> Execute no console do navegador:
              </p>
              <code className="block bg-gray-100 px-3 py-2 rounded text-red-600 font-mono text-xs">
                await limparTodosUsuarios()
              </code>
            </div>
          </div>
        </div>

        {/* Status do Sistema */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-x border-blue-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Edge Function Status */}
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Settings className="size-4 text-indigo-600" />
                <p className="text-gray-600 text-xs font-medium">Edge Function</p>
              </div>
              {edgeFunctionStatus ? (
                <div className="flex items-center gap-2">
                  {edgeFunctionStatus.online ? (
                    <>
                      <CheckCircle className="size-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">Online</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="size-4 text-red-600" />
                      <span className="text-sm font-medium text-red-900">Offline</span>
                    </>
                  )}
                </div>
              ) : (
                <span className="text-xs text-gray-500">Clique para verificar</span>
              )}
            </div>

            {/* KV Store Status */}
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <User className="size-4 text-cyan-600" />
                <p className="text-gray-600 text-xs font-medium">KV Store</p>
              </div>
              {kvStoreData ? (
                kvStoreData.sucesso ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">{kvStoreData.total} usuários</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <XCircle className="size-4 text-red-600" />
                    <span className="text-sm font-medium text-red-900">Erro</span>
                  </div>
                )
              ) : (
                <span className="text-xs text-gray-500">Clique para verificar</span>
              )}
            </div>

            {/* Usuário Logado */}
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <User className="size-4 text-blue-600" />
                <p className="text-gray-600 text-xs font-medium">Sessão Atual</p>
              </div>
              {usuarioLogado ? (
                <div>
                  <p className="text-sm font-medium text-blue-900 truncate">{usuarioLogado.nome}</p>
                  <p className="text-xs text-gray-600 truncate">{usuarioLogado.perfil}</p>
                </div>
              ) : (
                <span className="text-xs text-gray-500">Não logado</span>
              )}
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white border-x shadow-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">E-mail do usuário</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a]"
                placeholder="email@exemplo.com"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Senha atual (para testar)</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a]"
                placeholder="Senha atual"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Nova senha (para resetar/corrigir)</label>
              <input
                type="text"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a]"
                placeholder="Nova senha"
              />
            </div>
          </div>

          {/* Botão PRINCIPAL - Criar Admin Funcional */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <UserPlus className="size-5 text-green-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-green-900 font-bold mb-1">✅ Solução Rápida de Login</h3>
                <p className="text-green-800 text-sm mb-2">
                  Cria um usuário administrador <strong>TESTADO E FUNCIONAL</strong> em um clique:
                </p>
                <div className="bg-white rounded-lg p-3 text-sm mb-3 border border-green-200">
                  <p className="text-gray-700"><strong>📧 Email:</strong> controleinterno@jardim.ce.gov.br</p>
                  <p className="text-gray-700"><strong>🔑 Senha:</strong> @Gustavo25</p>
                  <p className="text-gray-700"><strong>🎭 Perfil:</strong> Administrador CGM</p>
                  <p className="text-gray-700"><strong>👤 Nome:</strong> Controle Interno CGM</p>
                </div>
                <p className="text-green-700 text-xs">
                  ℹ️ O sistema vai criar o usuário, confirmar o email automaticamente e testar o login para garantir que funciona!
                </p>
              </div>
            </div>
            
            <button
              onClick={criarAdminSimples}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition-colors disabled:opacity-50 shadow-lg"
            >
              <UserPlus className="size-6" />
              {loading ? 'Criando e testando...' : '🚀 Criar Admin Funcional Agora'}
            </button>
          </div>

          {/* Botões de Verificação do Sistema */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t-2 border-green-200">
            <button
              onClick={verificarTudo}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-colors disabled:opacity-50 md:col-span-3 shadow-lg"
            >
              <Settings className="size-5" />
              {loading ? 'Verificando...' : '🔍 Verificar Todo o Sistema'}
            </button>
            
            <button
              onClick={verificarEdgeFunction}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <Settings className="size-5" />
              {loading ? 'Verificando...' : 'Edge Function'}
            </button>
            
            <button
              onClick={verificarKVStore}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-cyan-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-cyan-700 transition-colors disabled:opacity-50"
            >
              <User className="size-5" />
              {loading ? 'Verificando...' : 'KV Store (Usuários)'}
            </button>
            
            <button
              onClick={diagnosticarLogin}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <AlertCircle className="size-5" />
              {loading ? 'Diagnosticando...' : 'Diagnosticar Login'}
            </button>
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-gray-200">
            
            <button
              onClick={corrigirUsuario}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <CheckCircle className="size-5" />
              {loading ? 'Corrigindo...' : 'Corrigir Usuário'}
            </button>
            
            <button
              onClick={resetarSenha}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              <Key className="size-5" />
              {loading ? 'Resetando...' : 'Resetar Senha'}
            </button>
            
            <button
              onClick={corrigirTodos}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className="size-5" />
              {loading ? 'Processando...' : 'Corrigir Todos os Usuários'}
            </button>
            
            <button
              onClick={() => alterarPerfil('Administrador CGM')}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 md:col-span-2"
            >
              <Shield className="size-5" />
              {loading ? 'Alterando...' : 'Tornar Administrador CGM'}
            </button>
            
            <button
              onClick={() => setShowConfirmacao(true)}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 md:col-span-2"
            >
              <XCircle className="size-5" />
              {loading ? 'Processando...' : 'Limpar Todos os Usuários'}
            </button>
            
            <button
              onClick={executarSetupInicial}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 md:col-span-2"
            >
              <UserPlus className="size-5" />
              {loading ? 'Executando...' : 'Setup Inicial'}
            </button>
          </div>
        </div>

        {/* Resultados */}
        {resultado && (
          <div className="bg-white border-x shadow-2xl p-6">
            {resultado.tipo === 'diagnostico' && (
              <div className="space-y-4">
                <h3 className="text-gray-900 font-medium text-lg border-b border-gray-200 pb-2">
                  Resultado do Diagnóstico
                </h3>
                
                {/* Supabase Auth */}
                <div className={`p-4 rounded-lg border ${resultado.authUser ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {resultado.authUser ? (
                      <CheckCircle className="size-5 text-green-600" />
                    ) : (
                      <XCircle className="size-5 text-red-600" />
                    )}
                    <h4 className={`font-medium ${resultado.authUser ? 'text-green-900' : 'text-red-900'}`}>
                      Supabase Auth
                    </h4>
                  </div>
                  {resultado.authUser ? (
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><strong>Email:</strong> {resultado.authUser.email}</p>
                      <p><strong>ID:</strong> {resultado.authUser.id}</p>
                      <p><strong>Email confirmado:</strong> {resultado.authUser.email_confirmed_at ? 'Sim' : 'Não'}</p>
                    </div>
                  ) : (
                    <p className="text-red-700 text-sm">Usuário NÃO existe no Supabase Auth!</p>
                  )}
                </div>

                {/* KV Store */}
                <div className={`p-4 rounded-lg border ${resultado.kvUser ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {resultado.kvUser ? (
                      <CheckCircle className="size-5 text-green-600" />
                    ) : (
                      <AlertCircle className="size-5 text-yellow-600" />
                    )}
                    <h4 className={`font-medium ${resultado.kvUser ? 'text-green-900' : 'text-yellow-900'}`}>
                      KV Store
                    </h4>
                  </div>
                  {resultado.kvUser ? (
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><strong>Nome:</strong> {resultado.kvUser.nome}</p>
                      <p><strong>Perfil:</strong> {resultado.kvUser.perfil}</p>
                      <p><strong>Secretaria:</strong> {resultado.kvUser.secretaria}</p>
                    </div>
                  ) : (
                    <p className="text-yellow-700 text-sm">Usuário não existe no KV Store (será criado no login)</p>
                  )}
                </div>

                {/* Teste de Login */}
                <div className={`p-4 rounded-lg border ${resultado.loginFuncionou ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {resultado.loginFuncionou ? (
                      <CheckCircle className="size-5 text-green-600" />
                    ) : (
                      <XCircle className="size-5 text-red-600" />
                    )}
                    <h4 className={`font-medium ${resultado.loginFuncionou ? 'text-green-900' : 'text-red-900'}`}>
                      Teste de Login
                    </h4>
                  </div>
                  {resultado.loginFuncionou ? (
                    <p className="text-green-700 text-sm font-medium">✅ A senha está CORRETA! O login funcionou!</p>
                  ) : (
                    <div>
                      <p className="text-red-700 text-sm font-medium">❌ A senha está INCORRETA!</p>
                      <p className="text-red-600 text-sm mt-1">Clique em "Resetar Senha" para definir uma nova senha.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {resultado.tipo === 'fix-success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="size-6 text-green-600" />
                  <div>
                    <p className="text-green-900 font-medium">✅ Usuário Sincronizado com Sucesso!</p>
                    <p className="text-green-700 text-sm">{resultado.mensagem}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-gray-700 font-medium mb-2">📊 Status do Usuário:</p>
                    <div className="space-y-1 text-sm">
                      <p><strong>ID:</strong> {resultado.authUser?.id}</p>
                      <p><strong>Email:</strong> {resultado.authUser?.email}</p>
                      <p><strong>Email Confirmado:</strong> {resultado.authUser?.email_confirmed ? '✅ Sim' : '❌ Não'}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-gray-700 font-medium mb-2">💾 Dados no KV Store:</p>
                    <div className="space-y-1 text-sm">
                      <p><strong>Nome:</strong> {resultado.kvUser?.nome}</p>
                      <p><strong>Perfil:</strong> {resultado.kvUser?.perfil}</p>
                      <p><strong>Secretaria:</strong> {resultado.kvUser?.secretaria}</p>
                      <p><strong>Situação:</strong> {resultado.kvUser?.situacao}</p>
                    </div>
                  </div>
                  
                  {resultado.credentials && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-blue-900 font-medium mb-2">🔑 Credenciais de Login:</p>
                      <div className="space-y-1 text-sm">
                        <p><strong>Email:</strong> <code className="bg-white px-2 py-1 rounded">{resultado.credentials.email}</code></p>
                        <p><strong>Senha:</strong> <code className="bg-white px-2 py-1 rounded">{resultado.credentials.password}</code></p>
                      </div>
                      <div className="mt-3 p-2 bg-blue-100 rounded">
                        <p className="text-blue-900 text-sm font-medium">
                          {resultado.loginTest?.success 
                            ? '✅ Teste de login passou! Você pode fazer login agora.' 
                            : '⚠️ Teste de login: ' + (resultado.loginTest?.error || 'Não testado')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {resultado.tipo === 'sucesso' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-6 text-green-600" />
                  <div>
                    <p className="text-green-900 font-medium">Sucesso!</p>
                    <p className="text-green-700 text-sm">{resultado.mensagem}</p>
                    {resultado.detalhes && (
                      <div className="mt-2">
                        <p className="text-gray-700 font-medium">Detalhes:</p>
                        <ul className="text-gray-600 text-sm list-disc ml-4">
                          <li><strong>Nome:</strong> {resultado.detalhes.nome}</li>
                          <li><strong>Email:</strong> {resultado.detalhes.email}</li>
                          <li><strong>Senha:</strong> {resultado.detalhes.senha}</li>
                          <li><strong>Perfil:</strong> {resultado.detalhes.perfil}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {resultado.tipo === 'erro' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <XCircle className="size-6 text-red-600" />
                  <div>
                    <p className="text-red-900 font-medium">Erro</p>
                    <p className="text-red-700 text-sm">{resultado.mensagem}</p>
                  </div>
                </div>
              </div>
            )}

            {resultado.tipo === 'lista' && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="size-6 text-green-600" />
                    <p className="text-green-900 font-medium">
                      {resultado.usuarios.length} usuários corrigidos!
                    </p>
                  </div>
                  <p className="text-green-700 text-sm mb-3">
                    Senha padrão: <strong>{resultado.senhaTemporaria}</strong>
                  </p>
                </div>
                
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {resultado.usuarios.map((user: any, index: number) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-gray-900 font-medium">{user.nome}</p>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                      <p className="text-gray-500 text-sm">Perfil: {user.perfil}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resultado.tipo === 'admin-criado' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="size-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-green-900 font-bold text-xl">🎉 Admin Criado com Sucesso!</h3>
                      <p className="text-green-700 text-sm">{resultado.message}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border-2 border-green-200 p-5 mb-4">
                    <h4 className="text-gray-900 font-bold mb-3 flex items-center gap-2">
                      <Key className="size-5 text-green-600" />
                      Suas Credenciais de Acesso
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-gray-50 rounded p-3">
                        <span className="text-gray-600 font-medium">📧 Email:</span>
                        <code className="bg-blue-100 text-blue-900 px-3 py-1 rounded font-mono text-sm font-bold">
                          {resultado.credentials.email}
                        </code>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 rounded p-3">
                        <span className="text-gray-600 font-medium">🔑 Senha:</span>
                        <code className="bg-green-100 text-green-900 px-3 py-1 rounded font-mono text-sm font-bold">
                          {resultado.credentials.password}
                        </code>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 rounded p-3">
                        <span className="text-gray-600 font-medium">👤 Nome:</span>
                        <span className="text-gray-900 font-medium">{resultado.credentials.nome}</span>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 rounded p-3">
                        <span className="text-gray-600 font-medium">🎭 Perfil:</span>
                        <span className="bg-purple-100 text-purple-900 px-3 py-1 rounded font-medium text-sm">
                          {resultado.credentials.perfil}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {resultado.loginTested && (
                    <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="size-5 text-green-700" />
                        <p className="text-green-900 font-bold">✅ Login testado e FUNCIONANDO!</p>
                      </div>
                      <p className="text-green-800 text-sm mt-1">
                        O sistema fez um teste automático de login e confirmou que as credenciais estão corretas.
                      </p>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-blue-900 font-bold mb-2 flex items-center gap-2">
                      <AlertCircle className="size-5" />
                      Próximos Passos
                    </h4>
                    <ol className="text-blue-800 text-sm space-y-2 ml-4 list-decimal">
                      <li>Copie as credenciais acima (principalmente a senha)</li>
                      <li>Clique no botão "Voltar para Login" abaixo</li>
                      <li>Use o email e senha mostrados acima</li>
                      <li>Pronto! Você terá acesso total ao sistema como Administrador</li>
                    </ol>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <a
                      href="/"
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors text-center"
                    >
                      <CheckCircle className="size-5" />
                      Voltar para Login
                    </a>
                  </div>
                </div>
              </div>
            )}

            {resultado.tipo === 'verificacao-completa' && (
              <div className="space-y-4">
                <h3 className="text-gray-900 font-medium text-lg border-b border-gray-200 pb-2">
                  ✅ Verificação Completa do Sistema
                </h3>
                
                {/* Edge Function Status */}
                <div className={`p-4 rounded-lg border ${resultado.edgeFunction.online ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {resultado.edgeFunction.online ? (
                      <CheckCircle className="size-5 text-green-600" />
                    ) : (
                      <XCircle className="size-5 text-red-600" />
                    )}
                    <h4 className={`font-medium ${resultado.edgeFunction.online ? 'text-green-900' : 'text-red-900'}`}>
                      Edge Function: make-server-1a8b02da
                    </h4>
                  </div>
                  {resultado.edgeFunction.online ? (
                    <p className="text-green-700 text-sm">✅ Edge Function está ONLINE e funcionando!</p>
                  ) : (
                    <p className="text-red-700 text-sm">❌ Edge Function OFFLINE: {resultado.edgeFunction.erro}</p>
                  )}
                </div>

                {/* KV Store Status */}
                <div className={`p-4 rounded-lg border ${resultado.kvStore.total > 0 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {resultado.kvStore.total > 0 ? (
                      <CheckCircle className="size-5 text-green-600" />
                    ) : (
                      <AlertCircle className="size-5 text-yellow-600" />
                    )}
                    <h4 className={`font-medium ${resultado.kvStore.total > 0 ? 'text-green-900' : 'text-yellow-900'}`}>
                      KV Store: kv_store_1a8b02da
                    </h4>
                  </div>
                  {resultado.kvStore.erro ? (
                    <p className="text-red-700 text-sm">❌ Erro ao acessar: {resultado.kvStore.erro}</p>
                  ) : (
                    <div>
                      <p className="text-gray-700 text-sm mb-3">
                        <strong>{resultado.kvStore.total}</strong> usuário(s) cadastrado(s) no KV Store
                      </p>
                      
                      {resultado.kvStore.usuarios.length > 0 && (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {resultado.kvStore.usuarios.map((user: any, index: number) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                              <p className="text-gray-900 font-medium">{user.nome}</p>
                              <p className="text-gray-600 text-sm">{user.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{user.perfil}</span>
                                <span className="text-xs text-gray-500">{user.secretaria}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <div className="text-gray-500 text-sm text-center">
                  Verificado em: {resultado.timestamp}
                </div>
              </div>
            )}

            {resultado.tipo === 'edge-function' && (
              <div className="space-y-4">
                <h3 className="text-gray-900 font-medium text-lg border-b border-gray-200 pb-2">
                  Edge Function Status
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-6 text-green-600" />
                    <div>
                      <p className="text-green-900 font-medium">make-server-1a8b02da está ONLINE!</p>
                      <p className="text-green-700 text-sm">Status: {resultado.data.status}</p>
                      <p className="text-gray-600 text-sm">Timestamp: {new Date(resultado.data.timestamp).toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {resultado.tipo === 'kv-store' && (
              <div className="space-y-4">
                <h3 className="text-gray-900 font-medium text-lg border-b border-gray-200 pb-2">
                  KV Store - Usuários Cadastrados
                </h3>
                
                {resultado.data.success ? (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-900 font-medium">
                        Total de usuários no KV Store: <strong>{resultado.data.total}</strong>
                      </p>
                    </div>
                    
                    {resultado.data.usuarios && resultado.data.usuarios.length > 0 ? (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {resultado.data.usuarios.map((user: any, index: number) => (
                          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-gray-900 font-medium">{user.nome}</p>
                                <p className="text-gray-600 text-sm">{user.email}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">
                                    {user.perfil}
                                  </span>
                                  <span className="text-xs text-gray-500">{user.secretaria}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className={`text-xs px-2 py-0.5 rounded ${user.situacao === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {user.situacao}
                                </span>
                              </div>
                            </div>
                            {user.criadoEm && (
                              <p className="text-gray-500 text-xs mt-2">
                                Criado: {new Date(user.criadoEm).toLocaleString('pt-BR')}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-900 text-sm">
                          ⚠️ Nenhum usuário encontrado no KV Store
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-900 text-sm">
                      ❌ Erro ao buscar usuários do KV Store
                    </p>
                  </div>
                )}
              </div>
            )}

            {resultado.tipo === 'limpeza' && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="size-6 text-green-600" />
                    <p className="text-green-900 font-medium">
                      Limpeza Concluída com Sucesso!
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <strong>Usuários excluídos do Auth:</strong> {resultado.resumo.usuariosExcluidosAuth}
                    </p>
                    <p className="text-gray-700">
                      <strong>Usuários excluídos do KV:</strong> {resultado.resumo.usuariosExcluidosKV}
                    </p>
                    <p className="text-gray-700">
                      <strong>Erros:</strong> {resultado.resumo.erros}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 font-medium mb-2">Usuário Administrador:</p>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Nome:</strong> {resultado.resumo.admin.nome}</p>
                    <p><strong>Email:</strong> {resultado.resumo.admin.email}</p>
                    <p><strong>Perfil:</strong> {resultado.resumo.admin.perfil}</p>
                    <p><strong>Senha:</strong> {resultado.resumo.admin.senha}</p>
                  </div>
                </div>

                {resultado.detalhes.excluidos.length > 0 && (
                  <div>
                    <p className="text-gray-900 font-medium mb-2">Usuários Excluídos:</p>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {resultado.detalhes.excluidos.map((email: string, index: number) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                          <p className="text-gray-700 text-sm">{email}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {resultado.detalhes.erros.length > 0 && (
                  <div>
                    <p className="text-red-900 font-medium mb-2">Erros Durante a Exclusão:</p>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {resultado.detalhes.erros.map((erro: any, index: number) => (
                        <div key={index} className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                          <p className="text-red-700 text-sm">
                            <strong>{erro.email}:</strong> {erro.erro}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="bg-white rounded-b-2xl shadow-2xl p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="text-[#0b6b3a] font-medium hover:underline"
            >
              ← Voltar para Login
            </a>
            <p className="text-gray-500 text-sm">
              Município de Jardim - CE
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmacao && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="size-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium text-lg">Confirmar Limpeza</h3>
                <p className="text-gray-600 text-sm">Esta ação não pode ser desfeita!</p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-900 text-sm font-medium mb-2">⚠️ ATENÇÃO:</p>
              <ul className="text-red-700 text-sm space-y-1 ml-4 list-disc">
                <li><strong>TODOS</strong> os usuários serão excluídos do sistema</li>
                <li>Nenhum usuário será mantido</li>
                <li>Esta ação é <strong>IRREVERSÍVEL</strong></li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmacao(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={limparTodosUsuarios}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Confirmar Limpeza
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}