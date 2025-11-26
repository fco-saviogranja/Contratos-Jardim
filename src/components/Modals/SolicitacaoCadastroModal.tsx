import React, { useState } from 'react';
import { X, UserPlus, Mail, User, Briefcase, CheckCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface SolicitacaoCadastroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SolicitacaoCadastroModal({ isOpen, onClose }: SolicitacaoCadastroModalProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [setor, setSetor] = useState('');
  const [senha, setSenha] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da/solicitacoes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            nome,
            email,
            cargo,
            setor,
            senha,
            justificativa,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao enviar solicitação');
      }

      setShowSuccess(true);
    } catch (err: any) {
      console.error('Erro ao solicitar cadastro:', err);
      setError(err.message || 'Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="size-8 text-green-600" />
          </div>
          <h2 className="text-gray-900 font-semibold mb-2">
            Solicitação enviada com sucesso!
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Sua solicitação de cadastro foi enviada para análise do administrador do sistema. 
            Você receberá um e-mail quando sua solicitação for aprovada.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-[#0b6b3a] text-white py-3 rounded-lg font-medium hover:bg-[#0a5a31] transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b6b3a] to-[#0a5a31] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <UserPlus className="size-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">
                Solicitar Cadastro no Sistema
              </h2>
              <p className="text-white/80 text-sm">
                Preencha os dados para solicitar acesso
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-900 text-sm">{error}</p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900 text-sm">
              <strong>Atenção:</strong> Esta solicitação será analisada pelo administrador do sistema. 
              Certifique-se de preencher todos os campos com informações corretas e institucionais.
            </p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Nome Completo *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome completo"
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Cargo *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <select
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Selecione o cargo</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Gestor de Contratos">Gestor de Contratos</option>
                  <option value="Fiscal de Contratos">Fiscal de Contratos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Setor/Departamento *
              </label>
              <select
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent appearance-none bg-white"
              >
                <option value="">Selecione o setor</option>
                <option value="Secretaria Municipal de Administração">Secretaria Municipal de Administração</option>
                <option value="Secretaria Municipal de Finanças">Secretaria Municipal de Finanças</option>
                <option value="Secretaria Municipal de Educação">Secretaria Municipal de Educação</option>
                <option value="Secretaria Municipal de Saúde">Secretaria Municipal de Saúde</option>
                <option value="Secretaria Municipal de Obras">Secretaria Municipal de Obras</option>
                <option value="Secretaria Municipal de Desenvolvimento Social">Secretaria Municipal de Desenvolvimento Social</option>
                <option value="Secretaria Municipal de Agricultura">Secretaria Municipal de Agricultura</option>
                <option value="Secretaria Municipal de Cultura">Secretaria Municipal de Cultura</option>
                <option value="Secretaria Municipal de Esporte e Lazer">Secretaria Municipal de Esporte e Lazer</option>
                <option value="Secretaria Municipal de Meio Ambiente">Secretaria Municipal de Meio Ambiente</option>
                <option value="Secretaria Municipal de Transporte">Secretaria Municipal de Transporte</option>
                <option value="Secretaria Municipal de Planejamento">Secretaria Municipal de Planejamento</option>
                <option value="Controladoria Geral do Município">Controladoria Geral do Município</option>
                <option value="Procuradoria Geral do Município">Procuradoria Geral do Município</option>
                <option value="Gabinete do Prefeito">Gabinete do Prefeito</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Senha *
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Justificativa *
            </label>
            <textarea
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              placeholder="Descreva brevemente por que você precisa de acesso ao sistema de gestão de contratos..."
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent resize-none"
            />
            <p className="text-gray-500 text-xs mt-1">
              Explique qual será sua função no sistema e por que necessita de acesso
            </p>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#0b6b3a] text-white py-3 rounded-lg font-medium hover:bg-[#0a5a31] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Enviando...' : 'Enviar Solicitação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}