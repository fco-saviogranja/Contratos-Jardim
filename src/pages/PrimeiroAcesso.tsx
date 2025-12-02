import React, { useState, useEffect } from 'react';
import { UserPlus, Mail, Lock, User, Building } from 'lucide-react';
import { auth } from '../utils/api';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function PrimeiroAcesso() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretaria: ''
  });
  const [secretarias, setSecretarias] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Carregar secretarias da API
  useEffect(() => {
    const carregarSecretarias = async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da/secretarias`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        const data = await response.json();
        if (data.success && data.secretarias) {
          setSecretarias(data.secretarias);
          // Definir CGM como padrão se existir
          const cgm = data.secretarias.find((s: any) => s.nome.includes('CGM'));
          if (cgm && !formData.secretaria) {
            setFormData(prev => ({ ...prev, secretaria: cgm.nome }));
          }
        }
      } catch (err) {
        console.error('Erro ao carregar secretarias:', err);
      }
    };
    carregarSecretarias();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const result = await auth.signup({
        nome: formData.nome,
        email: formData.email,
        password: formData.password,
        perfil: 'admin',
        secretaria: formData.secretaria
      });

      if (result.success) {
        setSuccess(true);
        setFormData({
          nome: '',
          email: '',
          password: '',
          confirmPassword: '',
          secretaria: ''
        });
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao criar usuário. Tente novamente.');
      console.error('Erro no cadastro:', err);
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
            Usuário criado com sucesso!
          </h2>
          <p className="text-gray-600 mb-6">
            O administrador foi cadastrado e já pode fazer login no sistema.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-[#0b6b3a] text-white rounded-lg font-medium hover:bg-[#0a5a31] transition-colors"
          >
            Ir para tela de login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b6b3a] to-[#0a5a31] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b6b3a] to-[#0a5a31] p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <UserPlus className="size-12" />
            </div>
          </div>
          <h1 className="text-center text-2xl font-bold">
            Primeiro Acesso
          </h1>
          <p className="text-center text-white/90 text-sm mt-2">
            Criar usuário administrador
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-900 text-sm font-medium">Erro</p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Nome completo
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
              E-mail institucional
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

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Secretaria/Órgão
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <select
                name="secretaria"
                value={formData.secretaria}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] appearance-none"
              >
                <option value="">Selecione uma secretaria</option>
                {secretarias.map((s: any) => (
                  <option key={s.id} value={s.nome}>{s.nome}</option>
                ))}
              </select>
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a]"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Confirmar senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Digite a senha novamente"
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b3a]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0b6b3a] text-white py-3 rounded-lg font-medium hover:bg-[#0a5a31] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Criando usuário...' : 'Criar administrador'}
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