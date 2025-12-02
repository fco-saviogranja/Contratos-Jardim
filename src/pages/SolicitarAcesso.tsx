import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, Building, Briefcase, FileText } from 'lucide-react';
import { solicitacoes } from '../utils/api';

export function SolicitarAcesso() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cargo: '',
    setor: '',
    justificativa: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validações
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    if (!formData.cargo || !formData.setor || !formData.justificativa) {
      setError('Preencha todos os campos obrigatórios');
      setLoading(false);
      return;
    }

    try {
      console.log('📤 Enviando solicitação de acesso...');
      console.log('📋 Dados do formulário:', {
        nome: formData.nome,
        email: formData.email,
        cargo: formData.cargo,
        setor: formData.setor
      });
      
      await solicitacoes.criar(formData);
      
      console.log('✅ Solicitação enviada com sucesso');

      setSuccess(true);
      setFormData({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        cargo: '',
        setor: '',
        justificativa: ''
      });
    } catch (err: any) {
      console.error('❌ Erro completo ao enviar solicitação:', err);
      
      let errorMessage = 'Erro ao enviar solicitação. Tente novamente.';
      
      if (err.message) {
        errorMessage = err.message;
      }
      
      // Verificar se o e-mail já está cadastrado
      if (err.message && err.message.includes('já está cadastrado')) {
        errorMessage = '❌ Este e-mail já possui cadastro no sistema.\n\n' +
          '💡 Possíveis soluções:\n' +
          '1. Faça login usando este e-mail na tela de login\n' +
          '2. Se esqueceu sua senha, entre em contato com o administrador\n' +
          '3. Use outro e-mail institucional para solicitar acesso';
      }
      // Verificar se é erro de conexão
      else if (err.message && err.message.includes('Failed to fetch')) {
        errorMessage = '❌ Não foi possível conectar ao servidor.\n\n' +
          '🔧 Possíveis soluções:\n' +
          '1. Verifique sua conexão com a internet\n' +
          '2. Aguarde alguns segundos e tente novamente\n' +
          '3. Entre em contato com o administrador do sistema';
      }
      
      setError(errorMessage);
      console.error('💬 Mensagem de erro exibida:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b6b3a] to-[#0a5a31] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <UserPlus className="size-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Solicitação enviada com sucesso!
          </h2>
          <p className="text-gray-600 mb-6">
            Sua solicitação de acesso foi enviada para análise dos administradores. Você receberá um e-mail quando sua solicitação for aprovada.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-[#0b6b3a] text-white rounded-lg font-medium hover:bg-[#0a5a31] transition-colors"
          >
            Voltar para tela de login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b6b3a] to-[#0a5a31] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b6b3a] to-[#0a5a31] p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <UserPlus className="size-12" />
            </div>
          </div>
          <h1 className="text-center text-2xl font-bold">
            Solicitar Acesso ao Sistema
          </h1>
          <p className="text-center text-white/90 text-sm mt-2">
            Preencha os dados abaixo para solicitar acesso ao ContratosJardim
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-900 text-sm font-medium mb-2">Erro</p>
              <p className="text-red-700 text-sm whitespace-pre-line">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Nome completo *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="João da Silva"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                E-mail *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="joao@jardim.ce.gov.br"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Cargo pretendido *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <select
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] appearance-none"
                >
                  <option value="">Selecione o cargo</option>
                  <option value="Gestor de Contratos">Gestor de Contratos</option>
                  <option value="Fiscal de Contratos">Fiscal de Contratos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Secretaria/Órgão *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <select
                  name="setor"
                  value={formData.setor}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] appearance-none"
                >
                  <option value="">Selecione a secretaria</option>
                  <option>Secretaria Municipal de Administração e Finanças</option>
                  <option>Secretaria Municipal de Educação</option>
                  <option>Secretaria Municipal de Saúde</option>
                  <option>Secretaria Municipal de Obras e Serviços Públicos</option>
                  <option>Secretaria Municipal de Agricultura e Meio Ambiente</option>
                  <option>Secretaria Municipal de Assistência Social</option>
                  <option>Secretaria Municipal de Esporte e Juventude</option>
                  <option>Secretaria Municipal de Cultura e Turismo</option>
                  <option>Controladoria Geral do Município</option>
                  <option>Procuradoria Geral do Município</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Justificativa *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 size-5 text-gray-400" />
              <textarea
                name="justificativa"
                value={formData.justificativa}
                onChange={handleChange}
                placeholder="Explique por que você precisa de acesso ao sistema..."
                required
                rows={3}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Senha *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirmar senha *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Digite a senha novamente"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0b6b3a] text-white py-3 rounded-lg font-medium hover:bg-[#0a5a31] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Enviando solicitação...' : 'Enviar solicitação'}
          </button>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-center text-gray-600 text-sm">
              Já possui conta?{' '}
              <a href="/" className="text-[#0b6b3a] font-medium hover:underline">
                Fazer login
              </a>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <p className="text-center text-gray-500 text-xs">
            Município de Jardim - Ceará
          </p>
        </div>
      </div>
    </div>
  );
}