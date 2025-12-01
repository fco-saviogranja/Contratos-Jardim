import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Building2, Shield, Lock, Camera, Save, Loader, Eye, EyeOff } from 'lucide-react';
import { usuarios as usuariosAPI, auth } from '../utils/api';
import { toast } from 'sonner@2.0.3';

export function MeuPerfil() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingFoto, setUploadingFoto] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [secretarias, setSecretarias] = useState<any[]>([]);
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  
  const [form, setForm] = useState({
    nome: '',
    email: '',
    perfil: '',
    secretaria: '',
    fotoPerfil: ''
  });

  const [senhaForm, setSenhaForm] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      
      // Carregar dados do usuário logado
      const userResponse = await usuariosAPI.getMe();
      if (userResponse.success && userResponse.usuario) {
        setUsuario(userResponse.usuario);
        setForm({
          nome: userResponse.usuario.nome || '',
          email: userResponse.usuario.email || '',
          perfil: userResponse.usuario.perfil || '',
          secretaria: userResponse.usuario.secretaria || '',
          fotoPerfil: userResponse.usuario.fotoPerfil || ''
        });
      }

      // Carregar secretarias
      const secResponse = await usuariosAPI.getSecretarias();
      if (secResponse.success && secResponse.secretarias) {
        setSecretarias(secResponse.secretarias);
      }
    } catch (error: any) {
      console.error('❌ Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB');
      return;
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      toast.error('Apenas imagens são permitidas');
      return;
    }

    try {
      setUploadingFoto(true);
      
      // Converter para base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64 = reader.result as string;
          
          // Fazer upload
          const response = await usuariosAPI.uploadFotoPerfil(base64, file.name);
          
          if (response.success) {
            setForm(prev => ({ ...prev, fotoPerfil: response.fotoUrl }));
            toast.success('Foto atualizada com sucesso!');
            
            // Recarregar dados do usuário
            await carregarDados();
            
            // Disparar evento para atualizar header
            window.dispatchEvent(new Event('fotoPerfilAtualizada'));
          }
        } catch (error: any) {
          console.error('❌ Erro ao fazer upload:', error);
          toast.error('Erro ao fazer upload: ' + error.message);
        } finally {
          setUploadingFoto(false);
        }
      };
      
      reader.readAsDataURL(file);
    } catch (error: any) {
      console.error('❌ Erro ao processar imagem:', error);
      toast.error('Erro ao processar imagem: ' + error.message);
      setUploadingFoto(false);
    }
  };

  const handleSalvar = async () => {
    try {
      setSaving(true);
      
      // Preparar dados para atualização
      const updateData: any = {
        nome: form.nome,
        secretaria: form.secretaria
      };

      // Se estiver alterando senha
      if (senhaForm.novaSenha) {
        if (!senhaForm.senhaAtual) {
          toast.error('Informe a senha atual para alterar a senha');
          return;
        }
        
        if (senhaForm.novaSenha !== senhaForm.confirmarSenha) {
          toast.error('As senhas não coincidem');
          return;
        }
        
        if (senhaForm.novaSenha.length < 6) {
          toast.error('A nova senha deve ter pelo menos 6 caracteres');
          return;
        }
        
        updateData.senhaAtual = senhaForm.senhaAtual;
        updateData.novaSenha = senhaForm.novaSenha;
      }

      const response = await usuariosAPI.updateMeuPerfil(updateData);
      
      if (response.success) {
        toast.success('Perfil atualizado com sucesso!');
        
        // Limpar campos de senha
        setSenhaForm({
          senhaAtual: '',
          novaSenha: '',
          confirmarSenha: ''
        });
        
        // Recarregar dados
        await carregarDados();
        
        // Atualizar localStorage se nome foi alterado
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (storedUser) {
          storedUser.nome = form.nome;
          storedUser.secretaria = form.secretaria;
          localStorage.setItem('user', JSON.stringify(storedUser));
        }
      }
    } catch (error: any) {
      console.error('❌ Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const getPerfilLabel = (perfil: string) => {
    const labels: any = {
      admin: 'Administrador (CGM)',
      gestor: 'Gestor de Contratos',
      fiscal: 'Fiscal de Contratos'
    };
    return labels[perfil] || perfil;
  };

  const getPerfilBadge = (perfil: string) => {
    if (perfil === 'admin') {
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2 w-fit">
          <Shield className="size-4" />
          Administrador (CGM)
        </span>
      );
    }
    if (perfil === 'gestor') {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-2 w-fit">
          <Shield className="size-4" />
          Gestor de Contratos
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2 w-fit">
        <Shield className="size-4" />
        Fiscal de Contratos
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="size-8 animate-spin text-[#102a43]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#102a43] to-[#243b53] p-6 text-white">
          <h2 className="text-2xl font-medium">Meu Perfil</h2>
          <p className="text-white/80 text-sm mt-1">
            Gerencie suas informações pessoais e configurações de conta
          </p>
        </div>

        <div className="p-8">
          {/* Foto de Perfil */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="relative">
              <div className="size-32 rounded-full bg-gradient-to-br from-[#102a43] to-[#243b53] flex items-center justify-center text-white text-4xl font-medium overflow-hidden">
                {form.fotoPerfil ? (
                  <img 
                    src={form.fotoPerfil} 
                    alt="Foto de perfil" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{form.nome?.charAt(0)?.toUpperCase() || 'U'}</span>
                )}
              </div>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingFoto}
                className="absolute bottom-0 right-0 size-10 rounded-full bg-white shadow-lg border-2 border-gray-200 flex items-center justify-center text-[#102a43] hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {uploadingFoto ? (
                  <Loader className="size-5 animate-spin" />
                ) : (
                  <Camera className="size-5" />
                )}
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="hidden"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-xl text-[#102a43] font-medium">{form.nome}</h3>
              <p className="text-gray-600 text-sm mt-1">{form.email}</p>
              <div className="mt-3">
                {getPerfilBadge(form.perfil)}
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <User className="size-4 inline mr-2" />
                Nome completo
              </label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102a43] focus:border-transparent"
                placeholder="Seu nome completo"
              />
            </div>

            {/* E-mail (somente leitura) */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <Mail className="size-4 inline mr-2" />
                E-mail
              </label>
              <input
                type="email"
                value={form.email}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                O e-mail não pode ser alterado
              </p>
            </div>

            {/* Perfil (somente leitura) */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <Shield className="size-4 inline mr-2" />
                Perfil de acesso
              </label>
              <input
                type="text"
                value={getPerfilLabel(form.perfil)}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Apenas administradores podem alterar perfis de acesso
              </p>
            </div>

            {/* Secretaria */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <Building2 className="size-4 inline mr-2" />
                Secretaria / Órgão
              </label>
              <select
                value={form.secretaria}
                onChange={(e) => setForm({ ...form, secretaria: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102a43] focus:border-transparent"
              >
                <option value="">Selecione...</option>
                {secretarias.map((sec) => (
                  <option key={sec.id} value={sec.nome}>
                    {sec.sigla} - {sec.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Alterar Senha */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg text-[#102a43] font-medium mb-4">
                <Lock className="size-5 inline mr-2" />
                Alterar senha
              </h3>
              
              <div className="space-y-4">
                {/* Senha Atual */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Senha atual
                  </label>
                  <div className="relative">
                    <input
                      type={showSenhaAtual ? 'text' : 'password'}
                      value={senhaForm.senhaAtual}
                      onChange={(e) => setSenhaForm({ ...senhaForm, senhaAtual: e.target.value })}
                      className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102a43] focus:border-transparent"
                      placeholder="Digite sua senha atual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showSenhaAtual ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </div>

                {/* Nova Senha */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Nova senha
                  </label>
                  <div className="relative">
                    <input
                      type={showNovaSenha ? 'text' : 'password'}
                      value={senhaForm.novaSenha}
                      onChange={(e) => setSenhaForm({ ...senhaForm, novaSenha: e.target.value })}
                      className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102a43] focus:border-transparent"
                      placeholder="Digite a nova senha (mín. 6 caracteres)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNovaSenha(!showNovaSenha)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNovaSenha ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirmar Senha */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Confirmar nova senha
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmarSenha ? 'text' : 'password'}
                      value={senhaForm.confirmarSenha}
                      onChange={(e) => setSenhaForm({ ...senhaForm, confirmarSenha: e.target.value })}
                      className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102a43] focus:border-transparent"
                      placeholder="Confirme a nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmarSenha ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão Salvar */}
            <div className="flex justify-end pt-6">
              <button
                onClick={handleSalvar}
                disabled={saving}
                className="px-6 py-3 bg-[#102a43] text-white rounded-lg hover:bg-[#243b53] transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader className="size-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="size-5" />
                    Salvar alterações
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}