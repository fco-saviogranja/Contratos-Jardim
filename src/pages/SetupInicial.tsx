import React, { useState } from 'react';
import { Shield, CheckCircle, AlertCircle, Loader, Search } from 'lucide-react';
import { auth } from '../utils/api';
import { createClient } from '../utils/supabase/client';

export function SetupInicial() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const verificarUsuarios = async () => {
    setDebugInfo('🔍 Verificando usuários no Supabase Auth...');
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Usuário atual:', user);
      setDebugInfo(prev => prev + '\n✅ Cliente Supabase conectado!');
      
      if (user) {
        setDebugInfo(prev => prev + `\n👤 Usuário logado: ${user.email}`);
      } else {
        setDebugInfo(prev => prev + '\n❌ Nenhum usuário logado');
      }
    } catch (err: any) {
      console.error('Erro ao verificar:', err);
      setDebugInfo(prev => prev + `\n❌ Erro: ${err.message}`);
    }
  };

  const criarAdministrador = async () => {
    setError('');
    setLoading(true);

    try {
      console.log('🔄 Iniciando criação do administrador...');
      
      const result = await auth.setupAdmin();

      console.log('📥 Resposta do servidor:', result);

      if (result.success) {
        setSuccess(true);
        console.log('✅ Administrador criado com sucesso!');
        console.log('📋 Dados do usuário:', result.user);
        console.log('🔑 Credenciais:', result.credentials);
      } else {
        throw new Error(result.error || 'Erro desconhecido');
      }
    } catch (err: any) {
      console.error('❌ Erro ao criar administrador:', err);
      setError(err.message || 'Erro ao criar usuário administrador. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b6b3a] to-[#0a5a31] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="size-12 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Sistema configurado com sucesso! 🎉
            </h1>
            
            <p className="text-gray-600 mb-6">
              O usuário administrador foi criado e o sistema está pronto para uso.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-blue-900 font-medium text-sm mb-3">
                📋 Credenciais de acesso:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-700 text-sm font-medium min-w-[80px]">E-mail:</span>
                  <span className="text-blue-900 text-sm font-mono">controleinterno@jardim.ce.gov.br</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-700 text-sm font-medium min-w-[80px]">Senha:</span>
                  <span className="text-blue-900 text-sm font-mono">@Gustavo25</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-700 text-sm font-medium min-w-[80px]">Perfil:</span>
                  <span className="text-blue-900 text-sm">Administrador CGM</span>
                </div>
              </div>
            </div>

            <a
              href="/"
              className="inline-block w-full px-6 py-3 bg-[#0b6b3a] text-white rounded-lg font-medium hover:bg-[#0a5a31] transition-colors"
            >
              Ir para tela de login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b6b3a] to-[#0a5a31] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b6b3a] to-[#0a5a31] p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <Shield className="size-12" />
            </div>
          </div>
          <h1 className="text-center text-2xl font-bold">
            Setup Inicial do Sistema
          </h1>
          <p className="text-center text-white/90 text-sm mt-2">
            ContratosJardim - Controladoria Geral
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-6">
              <AlertCircle className="size-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-900 text-sm font-medium">Erro no setup</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-gray-900 font-medium mb-3">
              Bem-vindo ao ContratosJardim! 👋
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Este é o primeiro acesso ao sistema. Clique no botão abaixo para criar automaticamente o usuário administrador e começar a usar o sistema.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-gray-700 text-sm font-medium mb-3">
              🔐 Usuário que será criado:
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Nome:</span>
                <span className="text-gray-900 text-sm font-medium">Administrador CGM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">E-mail:</span>
                <span className="text-gray-900 text-sm font-mono">controleinterno@jardim.ce.gov.br</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Senha:</span>
                <span className="text-gray-900 text-sm font-mono">@Gustavo25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Perfil:</span>
                <span className="text-gray-900 text-sm">Administrador (acesso total)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Secretaria:</span>
                <span className="text-gray-900 text-sm">CGM - Controladoria Geral</span>
              </div>
            </div>
          </div>

          <button
            onClick={criarAdministrador}
            disabled={loading}
            className="w-full bg-[#0b6b3a] text-white py-3 rounded-lg font-medium hover:bg-[#0a5a31] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="size-5 animate-spin" />
                Criando administrador...
              </>
            ) : (
              <>
                <Shield className="size-5" />
                Criar administrador e iniciar sistema
              </>
            )}
          </button>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-900 text-xs leading-relaxed">
              ⚠️ <strong>Importante:</strong> Após criar o administrador, você poderá alterar a senha e criar outros usuários através do painel de administração.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <p className="text-center text-gray-500 text-xs">
            Município de Jardim - Ceará
          </p>
          <p className="text-center text-gray-400 text-xs mt-1">
            © 2024 Controladoria Geral do Município
          </p>
        </div>
      </div>
    </div>
  );
}