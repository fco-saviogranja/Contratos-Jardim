import React, { useState, useEffect } from 'react';
import { Settings, CheckCircle, XCircle, AlertCircle, RefreshCw, User, Key, Shield } from 'lucide-react';
import { apiRequest } from '../utils/api';

export function Diagnostico() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [email, setEmail] = useState('controleinterno@jardim.ce.gov.br');
  const [senha, setSenha] = useState('@Gustavo25');
  const [novaSenha, setNovaSenha] = useState('SenhaTemp123');
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  
  // Verificar usuário logado
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);
  
  useEffect(() => {
    const userStr = localStorage.getItem('contratos_jardim_user');
    if (userStr) {
      setUsuarioLogado(JSON.parse(userStr));
    }
  }, []);

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
        body: JSON.stringify({ email, novaSenha }),
      });
      
      if (result.success) {
        setResultado({
          tipo: 'sucesso',
          mensagem: `Usuário corrigido! Use a senha: ${novaSenha}`
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
          
          {/* Aviso importante */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-blue-900 font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="size-5" />
              Guia Rápido de Reorganização do Sistema
            </h3>
            <ol className="text-blue-700 text-sm space-y-1 ml-6 list-decimal">
              <li>Clique em <strong>"Limpar Todos os Usuários"</strong> para excluir todos exceto Gustavo Barros</li>
              <li>Confirme a ação no modal que aparece</li>
              <li>Faça login com: <code className="bg-blue-100 px-1 rounded">controleinterno@jardim.ce.gov.br</code> / <code className="bg-blue-100 px-1 rounded">@Gustavo25</code></li>
              <li>O menu <strong>"Administração do sistema"</strong> deve aparecer automaticamente!</li>
            </ol>
          </div>
        </div>

        {/* Usuário Logado */}
        {usuarioLogado && (
          <div className="bg-blue-50 border-x border-blue-200 p-4">
            <div className="flex items-center gap-2">
              <User className="size-5 text-blue-600" />
              <div>
                <p className="text-blue-900 font-medium">{usuarioLogado.nome}</p>
                <p className="text-blue-700 text-sm">
                  {usuarioLogado.email} • Perfil: <strong>{usuarioLogado.perfil}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

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

          {/* Botões de Ação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={diagnosticarLogin}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <AlertCircle className="size-5" />
              {loading ? 'Diagnosticando...' : 'Diagnosticar Login'}
            </button>
            
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

            {resultado.tipo === 'sucesso' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-6 text-green-600" />
                  <div>
                    <p className="text-green-900 font-medium">Sucesso!</p>
                    <p className="text-green-700 text-sm">{resultado.mensagem}</p>
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
                <li>Todos os usuários serão excluídos do sistema</li>
                <li>Apenas <strong>Gustavo Barros</strong> será mantido</li>
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