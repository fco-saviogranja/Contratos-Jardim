import React, { useState } from 'react';
import { LogIn, Mail, Lock, AlertCircle, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SolicitacaoCadastroModal } from '../components/Modals/SolicitacaoCadastroModal';
import logoImage from 'figma:asset/600321a23fd1c8706abb2a9ad97f41dade268db0.png';
import { auth as authApi, admin } from '../utils/api';
import { toast } from 'sonner@2.0.3';

interface LoginProps {
  onShowSolicitarAcesso?: () => void;
}

export function Login({ onShowSolicitarAcesso }: LoginProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSolicitacaoModal, setShowSolicitacaoModal] = useState(false);
  const [setupStatus, setSetupStatus] = useState<'idle' | 'checking' | 'done'>('idle');
  const [resetting, setResetting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Verificar e criar admin no primeiro acesso
  React.useEffect(() => {
    const setupAdmin = async () => {
      // Verificar se já executou o setup
      const hasSetup = localStorage.getItem('admin_setup_done');
      if (hasSetup) {
        setSetupStatus('done');
        return;
      }

      try {
        setSetupStatus('checking');
        console.log('🔍 Testando conectividade com o servidor...');
        
        // Primeiro, testar o health check
        const healthUrl = `https://qtbepussaveckryzrhor.supabase.co/functions/v1/make-server-1a8b02da/health`;
        console.log('📡 URL do health check:', healthUrl);
        
        const healthResponse = await fetch(healthUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!healthResponse.ok) {
          throw new Error(`Health check falhou: ${healthResponse.status}`);
        }
        
        const healthData = await healthResponse.json();
        console.log('✅ Servidor respondendo:', healthData);
        
        console.log('🔧 Verificando se admin existe...');
        
        // Tentar criar o admin (se já existir, o backend vai ignorar)
        await authApi.setupAdmin();
        
        localStorage.setItem('admin_setup_done', 'true');
        setSetupStatus('done');
        console.log('✅ Verificação de admin concluída');
      } catch (error: any) {
        console.warn('⚠️ Erro ao verificar admin:', error);
        
        // Se for erro de conexão, mostrar mensagem específica
        if (error.message === 'Failed to fetch' || error.message?.includes('fetch') || error.message?.includes('401')) {
          console.error('❌ ERRO: Backend Supabase não está acessível!');
          console.error('❌ A Edge Function NÃO está deployada no Supabase.');
          console.error('');
          console.error('📋 INSTRUÇÕES DE DEPLOY:');
          console.error('1. Acesse: https://supabase.com/dashboard/project/qtbepussaveckryzrhor/functions');
          console.error('2. Crie/edite a função "hello-world"');
          console.error('3. Copie o conteúdo de /supabase/functions/server/index.tsx');
          console.error('4. Cole no editor e clique em Deploy');
          console.error('5. Configure "verify_jwt": false no config.json');
          console.error('');
          console.error('📄 Leia o arquivo DEPLOY_INSTRUCTIONS.md para mais detalhes.');
          console.error('');
          
          setError('🚨 Edge Function não deployada!\n\n' +
            '❌ A função do servidor não está disponível no Supabase.\n\n' +
            '📋 SOLUÇÃO:\n' +
            '1. Acesse o Dashboard do Supabase\n' +
            '2. Vá em Edge Functions\n' +
            '3. Deploy a função "hello-world"\n\n' +
            '📄 Veja DEPLOY_INSTRUCTIONS.md no código-fonte para instruções detalhadas.\n\n' +
            '🔗 Link direto: https://supabase.com/dashboard/project/qtbepussaveckryzrhor/functions');
        }
        
        // Mesmo com erro, marcar como done para não ficar tentando infinitamente
        setSetupStatus('done');
      }
    };

    setupAdmin();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      
      if (!success) {
        setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      }
    } catch (err: any) {
      console.error('Erro no login:', err);
      
      // Limpar mensagens técnicas e mostrar erro amigável
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      
      // Verificar se é solicitação pendente
      if (err.message?.includes('solicitação de cadastro') && err.message?.includes('pendente')) {
        errorMessage = '⏳ Sua solicitação de cadastro ainda está sendo analisada.\n\n' +
          'Por favor, aguarde até que um administrador aprove seu acesso ao sistema.\n\n' +
          '💡 Você receberá um e-mail quando sua solicitação for aprovada.';
      } 
      else if (err.message?.includes('Credenciais inválidas') || 
          err.message?.includes('Invalid login credentials') ||
          err.message?.includes('Sessão expirada')) {
        errorMessage = 'E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.';
      } else if (err.message?.includes('servidor') || err.message?.includes('conexão') || err.message === 'Failed to fetch') {
        errorMessage = '❌ Não foi possível conectar ao servidor Supabase.\n\n' +
          '🔧 O sistema precisa que a Edge Function seja deployada.\n\n' +
          'Por favor, verifique se o backend está configurado corretamente.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSystem = async () => {
    if (!showResetConfirm) {
      setShowResetConfirm(true);
      return;
    }

    try {
      setResetting(true);
      console.log('🔥 Resetando sistema...');
      
      const response = await admin.resetarSistemaCompleto();
      
      console.log('✅ Sistema resetado:', response);
      
      toast.success('Sistema completamente limpo!', {
        description: `${response.estatisticas.totalExcluidos} itens foram excluídos do sistema.`
      });
      
      // Resetar o status de setup para forçar nova criação do admin
      localStorage.removeItem('admin_setup_done');
      setSetupStatus('idle');
      setShowResetConfirm(false);
      
      // Recarregar a página após 2 segundos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error: any) {
      console.error('❌ Erro ao resetar sistema:', error);
      toast.error('Erro ao resetar sistema', {
        description: error.message || 'Tente novamente.'
      });
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b6b3a] to-[#0a5a31] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b6b3a] to-[#0a5a31] p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <ImageWithFallback 
                src={logoImage}
                alt="ContratosJardim - Gestão de Contratos Municipal"
                className="h-20 w-auto object-contain"
              />
            </div>
          </div>
          <p className="text-center text-white/90 font-semibold mt-2">
            Sistema Interno de Gestão de Contratos
          </p>
          <p className="text-center text-white/80 text-xs mt-1">
            Controladoria Geral do Município
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="size-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-900 text-sm font-medium">Erro ao fazer login</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@email.com"
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0b6b3a] text-white py-3 rounded-lg font-medium hover:bg-[#0a5a31] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar no sistema'}
          </button>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-center text-gray-600 text-sm">
              Esqueceu sua senha?{' '}
              <a href="#" className="text-[#0b6b3a] font-medium hover:underline">
                Solicitar recuperação
              </a>
            </p>
            <p className="text-center text-gray-600 text-sm mt-3">
              Não tem acesso?{' '}
              <button
                type="button"
                onClick={() => setShowSolicitacaoModal(true)}
                className="text-[#0b6b3a] font-medium hover:underline"
              >
                Solicitar cadastro
              </button>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <p className="text-center text-gray-500 text-xs">
            Município de Jardim - Ceará
          </p>
          <p className="text-center text-gray-400 text-xs mt-1">
            © 2025 Controladoria Geral do Município
          </p>
        </div>
      </div>

      {/* Botão de Reset (desenvolvimento) */}
      <div className="mt-4 text-center">
        {!showResetConfirm ? (
          <button
            type="button"
            onClick={handleResetSystem}
            disabled={resetting}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 hover:border-red-400 transition-colors disabled:opacity-50"
          >
            <Trash2 className="size-3.5" />
            Limpar Sistema (Dev)
          </button>
        ) : (
          <div className="inline-flex flex-col items-center gap-2 px-6 py-3 bg-white border-2 border-red-500 rounded-lg">
            <p className="text-xs text-red-600 font-medium">
              ⚠️ Tem certeza? Isso vai excluir TODOS os dados!
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleResetSystem}
                disabled={resetting}
                className="px-3 py-1.5 text-xs text-white bg-red-600 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {resetting ? 'Excluindo...' : 'Sim, excluir tudo'}
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                disabled={resetting}
                className="px-3 py-1.5 text-xs text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Solicitação de Cadastro */}
      <SolicitacaoCadastroModal
        isOpen={showSolicitacaoModal}
        onClose={() => setShowSolicitacaoModal(false)}
      />
    </div>
  );
}