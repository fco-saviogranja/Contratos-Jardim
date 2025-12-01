import React, { useState } from 'react';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SolicitacaoCadastroModal } from '../components/Modals/SolicitacaoCadastroModal';
import logoImage from 'figma:asset/600321a23fd1c8706abb2a9ad97f41dade268db0.png';
import { Settings } from 'lucide-react';

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
      
      if (err.message?.includes('Credenciais inválidas') || 
          err.message?.includes('Invalid login credentials') ||
          err.message?.includes('Sessão expirada')) {
        errorMessage = 'E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.';
      } else if (err.message?.includes('servidor') || err.message?.includes('conexão')) {
        errorMessage = 'Não foi possível conectar ao servidor. Tente novamente em alguns instantes.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
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
          <div className="text-center mt-3">
            <a
              href="/diagnostico"
              className="text-[#0b6b3a] text-xs font-medium hover:underline inline-flex items-center gap-1"
            >
              <Settings className="size-3" />
              Ferramentas de Diagnóstico
            </a>
          </div>
        </div>
      </div>

      {/* Modal de Solicitação de Cadastro */}
      <SolicitacaoCadastroModal
        isOpen={showSolicitacaoModal}
        onClose={() => setShowSolicitacaoModal(false)}
      />
    </div>
  );
}