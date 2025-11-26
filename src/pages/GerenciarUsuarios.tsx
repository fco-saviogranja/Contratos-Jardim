import React, { useState, useEffect } from 'react';
import { Search, Edit, UserX, UserCheck, UserPlus, Loader, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { usuarios as usuariosAPI } from '../utils/api';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function GerenciarUsuarios() {
  const [activeTab, setActiveTab] = useState<'admin' | 'gestor' | 'fiscal' | 'secretarias' | 'solicitacoes'>('admin');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAprovarModal, setShowAprovarModal] = useState(false);
  const [showRejeitarModal, setShowRejeitarModal] = useState(false);
  const [showSecretariaModal, setShowSecretariaModal] = useState(false);
  const [showEditSecretariaModal, setShowEditSecretariaModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<any | null>(null);
  const [selectedSecretaria, setSelectedSecretaria] = useState<any | null>(null);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
  const [secretarias, setSecretarias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    nome: '',
    email: '',
    perfil: '',
    secretaria: '',
    situacao: ''
  });
  const [createForm, setCreateForm] = useState({
    nome: '',
    email: '',
    password: '',
    perfil: 'gestor',
    secretaria: ''
  });
  const [aprovarForm, setAprovarForm] = useState({
    perfil: 'gestor',
    observacoes: ''
  });
  const [rejeitarForm, setRejeitarForm] = useState({
    observacoes: ''
  });
  const [secretariaForm, setSecretariaForm] = useState({
    nome: '',
    sigla: '',
    responsavel: ''
  });

  useEffect(() => {
    carregarUsuarios();
    carregarSolicitacoes();
    carregarSecretarias();
  }, []);

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      console.log('🔍 Buscando usuários do backend...');
      const response = await usuariosAPI.getAll();
      console.log('📥 Usuários recebidos:', response);
      
      if (response.success && response.usuarios) {
        setUsuarios(response.usuarios);
        toast.success('Usuários carregados com sucesso!');
      }
    } catch (error: any) {
      console.error('❌ Erro ao carregar usuários:', error);
      toast.error('Erro ao carregar usuários: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const carregarSolicitacoes = async () => {
    try {
      setLoading(true);
      console.log('🔍 Buscando solicitações de usuários do backend...');
      const response = await usuariosAPI.getSolicitacoes();
      console.log('📥 Solicitações recebidas:', response);
      
      if (response.success && response.solicitacoes) {
        setSolicitacoes(response.solicitacoes);
        toast.success('Solicitações carregadas com sucesso!');
      }
    } catch (error: any) {
      console.error('❌ Erro ao carregar solicitações:', error);
      toast.error('Erro ao carregar solicitações: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Calcular contadores dinamicamente baseado nos usuários reais
  const countByPerfil = {
    admin: usuarios.filter(u => u.perfil === 'admin').length,
    gestor: usuarios.filter(u => u.perfil === 'gestor').length,
    fiscal: usuarios.filter(u => u.perfil === 'fiscal').length
  };

  const tabs = [
    { id: 'admin' as const, label: 'Administradores (CGM)', count: countByPerfil.admin },
    { id: 'gestor' as const, label: 'Gestores de Contratos', count: countByPerfil.gestor },
    { id: 'fiscal' as const, label: 'Fiscais de Contratos', count: countByPerfil.fiscal },
    { id: 'secretarias' as const, label: 'Secretarias / Órgãos', count: secretarias.length },
    { id: 'solicitacoes' as const, label: 'Solicitações de Usuários', count: solicitacoes.length }
  ];

  const getPerfilLabel = (perfil: string) => {
    const labels = {
      admin: 'Administrador (CGM)',
      gestor: 'Gestor de Contratos',
      fiscal: 'Fiscal de Contratos'
    };
    return labels[perfil as keyof typeof labels];
  };

  const getSituacaoBadge = (situacao: string) => {
    if (situacao === 'ativo') {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          Ativo
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
        Inativo
      </span>
    );
  };

  const filteredUsers = usuarios.filter(user => user.perfil === activeTab);

  const handleEditClick = (usuario: any) => {
    setSelectedUser(usuario);
    setEditForm({
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
      secretaria: usuario.secretaria,
      situacao: usuario.situacao
    });
    setShowEditModal(true);
  };

  const handleToggleSituacao = (usuario: any) => {
    const novaSituacao = usuario.situacao === 'ativo' ? 'inativo' : 'ativo';
    const acao = novaSituacao === 'ativo' ? 'reativar' : 'desativar';
    if (confirm(`Deseja realmente ${acao} o usuário ${usuario.nome}?`)) {
      alert('Funcionalidade em desenvolvimento');
    }
  };

  const handleSaveEdit = async () => {
    if (!editForm.nome || !editForm.email || !editForm.secretaria) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setSaving(true);
    try {
      console.log('📝 Atualizando usuário no backend...');
      const response = await usuariosAPI.update(selectedUser.id, editForm);
      console.log('💾 Resposta do backend:', response);
      
      if (response.success) {
        toast.success('Usuário atualizado com sucesso!');
        carregarUsuarios();
      } else {
        toast.error('Erro ao atualizar usuário: ' + response.message);
      }
    } catch (error: any) {
      console.error('❌ Erro ao atualizar usuário:', error);
      toast.error('Erro ao atualizar usuário: ' + error.message);
    } finally {
      setSaving(false);
      setShowEditModal(false);
      setSelectedUser(null);
    }
  };

  const handleSaveCreate = async () => {
    if (!createForm.nome || !createForm.email || !createForm.password || !createForm.secretaria) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setSaving(true);
    try {
      console.log('📝 Criando usuário no backend...');
      const response = await usuariosAPI.create(createForm);
      console.log('💾 Resposta do backend:', response);
      
      if (response.success) {
        toast.success('Usuário criado com sucesso!');
        carregarUsuarios();
      } else {
        toast.error('Erro ao criar usuário: ' + response.message);
      }
    } catch (error: any) {
      console.error('❌ Erro ao criar usuário:', error);
      toast.error('Erro ao criar usuário: ' + error.message);
    } finally {
      setSaving(false);
      setShowCreateModal(false);
      setCreateForm({
        nome: '',
        email: '',
        password: '',
        perfil: 'gestor',
        secretaria: ''
      });
    }
  };

  const handleAprovarSolicitacao = async () => {
    if (!aprovarForm.perfil) {
      alert('Por favor, selecione o perfil do usuário.');
      return;
    }

    setSaving(true);
    try {
      console.log('📝 Aprovando solicitação de usuário no backend...');
      const response = await usuariosAPI.aprovarSolicitacao(selectedSolicitacao.id, aprovarForm);
      console.log('💾 Resposta do backend:', response);
      
      if (response.success) {
        toast.success('Solicitação aprovada com sucesso!');
        carregarSolicitacoes();
        carregarUsuarios();
      } else {
        toast.error('Erro ao aprovar solicitação: ' + response.message);
      }
    } catch (error: any) {
      console.error('❌ Erro ao aprovar solicitação:', error);
      toast.error('Erro ao aprovar solicitação: ' + error.message);
    } finally {
      setSaving(false);
      setShowAprovarModal(false);
      setSelectedSolicitacao(null);
      setAprovarForm({
        perfil: 'gestor',
        observacoes: ''
      });
    }
  };

  const handleRejeitarSolicitacao = async () => {
    if (!rejeitarForm.observacoes) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setSaving(true);
    try {
      console.log('📝 Rejeitando solicitação de usuário no backend...');
      const response = await usuariosAPI.rejeitarSolicitacao(selectedSolicitacao.id, rejeitarForm);
      console.log('💾 Resposta do backend:', response);
      
      if (response.success) {
        toast.success('Solicitação rejeitada com sucesso!');
        carregarSolicitacoes();
      } else {
        toast.error('Erro ao rejeitar solicitação: ' + response.message);
      }
    } catch (error: any) {
      console.error('❌ Erro ao rejeitar solicitação:', error);
      toast.error('Erro ao rejeitar solicitação: ' + error.message);
    } finally {
      setSaving(false);
      setShowRejeitarModal(false);
      setSelectedSolicitacao(null);
      setRejeitarForm({
        observacoes: ''
      });
    }
  };

  const handleSaveSecretaria = async () => {
    if (!secretariaForm.nome || !secretariaForm.sigla || !secretariaForm.responsavel) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setSaving(true);
    try {
      console.log('📝 Criando secretaria no backend...');
      const response = await usuariosAPI.createSecretaria(secretariaForm);
      console.log('💾 Resposta do backend:', response);
      
      if (response.success) {
        toast.success('Secretaria criada com sucesso!');
        carregarSecretarias();
      } else {
        toast.error('Erro ao criar secretaria: ' + response.message);
      }
    } catch (error: any) {
      console.error('❌ Erro ao criar secretaria:', error);
      toast.error('Erro ao criar secretaria: ' + error.message);
    } finally {
      setSaving(false);
      setShowSecretariaModal(false);
      setSecretariaForm({
        nome: '',
        sigla: '',
        responsavel: ''
      });
    }
  };

  const handleSaveEditSecretaria = async () => {
    if (!secretariaForm.nome || !secretariaForm.sigla || !secretariaForm.responsavel) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setSaving(true);
    try {
      console.log('📝 Atualizando secretaria no backend...');
      const response = await usuariosAPI.updateSecretaria(selectedSecretaria.id, secretariaForm);
      console.log('💾 Resposta do backend:', response);
      
      if (response.success) {
        toast.success('Secretaria atualizada com sucesso!');
        carregarSecretarias();
      } else {
        toast.error('Erro ao atualizar secretaria: ' + response.message);
      }
    } catch (error: any) {
      console.error('❌ Erro ao atualizar secretaria:', error);
      toast.error('Erro ao atualizar secretaria: ' + error.message);
    } finally {
      setSaving(false);
      setShowEditSecretariaModal(false);
      setSelectedSecretaria(null);
    }
  };

  const carregarSecretarias = async () => {
    try {
      setLoading(true);
      console.log('🔍 Buscando secretarias do backend...');
      const response = await usuariosAPI.getSecretarias();
      console.log('📥 Secretarias recebidas:', response);
      
      if (response.success && response.secretarias) {
        setSecretarias(response.secretarias);
      }
    } catch (error: any) {
      console.error('❌ Erro ao carregar secretarias:', error);
      toast.error('Erro ao carregar secretarias: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSecretariaClick = (secretaria: any) => {
    setSelectedSecretaria(secretaria);
    setSecretariaForm({
      nome: secretaria.nome,
      sigla: secretaria.sigla,
      responsavel: secretaria.responsavel
    });
    setShowEditSecretariaModal(true);
  };

  const handleDeleteSecretaria = async (secretaria: any) => {
    if (!confirm(`Tem certeza que deseja excluir a secretaria "${secretaria.nome}"?\n\nEsta ação não pode ser desfeita.`)) {
      return;
    }

    setSaving(true);
    try {
      console.log('🗑️ Excluindo secretaria no backend...');
      const response = await usuariosAPI.deleteSecretaria(secretaria.id);
      console.log('💾 Resposta do backend:', response);
      
      if (response.success) {
        toast.success('Secretaria excluída com sucesso!');
        // Atualizar lista local removendo a secretaria
        setSecretarias(secretarias.filter(s => s.id !== secretaria.id));
      } else {
        toast.error('Erro ao excluir secretaria: ' + response.message);
      }
    } catch (error: any) {
      console.error('❌ Erro ao excluir secretaria:', error);
      toast.error('Erro ao excluir secretaria: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#102a43] text-2xl mb-1 font-medium">
            Gerenciar usuários
          </h1>
          <p className="text-gray-600 text-sm">
            Cadastro, edição e controle de acesso ao sistema. Perfis: Admin, Gestor e Fiscal.
          </p>
        </div>
        
        <button className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] flex items-center gap-2 font-medium"
          onClick={() => setShowCreateModal(true)}
        >
          <UserPlus className="size-4" />
          Novo usuário
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm relative font-medium ${
              activeTab === tab.id
                ? 'text-[#0b6b3a]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
              activeTab === tab.id
                ? 'bg-[#0b6b3a] text-white'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {tab.count}
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0b6b3a]" />
            )}
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Buscar por nome ou e-mail
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Digite o nome ou e-mail"
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm"
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Secretaria / Órgão
            </label>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm">
              <option>Todas</option>
              <option>CGM - Controladoria Geral</option>
              <option>Secretaria de Saúde</option>
              <option>Secretaria de Educação</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Situação
            </label>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm">
              <option>Todas</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Perfil
            </label>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm">
              <option>Todos</option>
              <option>Administrador</option>
              <option>Gestor</option>
              <option>Fiscal</option>
            </select>
          </div>
          
          <button className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium">
            Filtrar
          </button>
        </div>
      </div>

      {/* Tabela de usuários */}
      <div className="bg-white rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader className="size-8 animate-spin text-[#0b6b3a]" />
            <span className="ml-3 text-gray-600">Carregando usuários...</span>
          </div>
        ) : activeTab === 'solicitacoes' ? (
          // Tabela de solicitações
          solicitacoes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-gray-600">Nenhuma solicitação encontrada.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        Nome
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        E-mail
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        Cargo Solicitado
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        Setor
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        Justificativa
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        Data
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {solicitacoes.map((solicitacao) => (
                      <tr key={solicitacao.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-[#102a43] text-sm font-medium">
                          {solicitacao.nome}
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-sm">
                          {solicitacao.email}
                        </td>
                        <td className="px-4 py-3 text-[#102a43] text-sm">
                          {solicitacao.cargo}
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-sm">
                          {solicitacao.setor}
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-sm">
                          {solicitacao.justificativa}
                        </td>
                        <td className="px-4 py-3">
                          {solicitacao.status === 'pendente' && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                              <Clock className="size-3" />
                              Pendente
                            </span>
                          )}
                          {solicitacao.status === 'aprovada' && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                              <CheckCircle className="size-3" />
                              Aprovada
                            </span>
                          )}
                          {solicitacao.status === 'rejeitada' && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                              <XCircle className="size-3" />
                              Rejeitada
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-sm">
                          {new Date(solicitacao.criadoEm).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-4 py-3">
                          {solicitacao.status === 'pendente' ? (
                            <div className="flex items-center gap-1">
                              <button 
                                className="p-1.5 hover:bg-green-100 rounded transition-colors"
                                title="Aprovar"
                                onClick={() => {
                                  setSelectedSolicitacao(solicitacao);
                                  setShowAprovarModal(true);
                                }}
                              >
                                <CheckCircle className="size-4 text-green-600" />
                              </button>
                              <button 
                                className="p-1.5 hover:bg-red-100 rounded transition-colors"
                                title="Rejeitar"
                                onClick={() => {
                                  setSelectedSolicitacao(solicitacao);
                                  setShowRejeitarModal(true);
                                }}
                              >
                                <XCircle className="size-4 text-red-600" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <span className="text-gray-600 text-sm">
                  Mostrando {solicitacoes.length} de {solicitacoes.length} solicitações
                </span>
              </div>
            </>
          )
        ) : activeTab === 'secretarias' ? (
          // Tabela de secretarias
          secretarias.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-gray-600">Nenhuma secretaria encontrada.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        Nome
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        Sigla
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        Responsável
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        Situação
                      </th>
                      <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {secretarias.map((secretaria) => (
                      <tr key={secretaria.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-[#102a43] text-sm font-medium">
                          {secretaria.nome}
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-sm">
                          {secretaria.sigla}
                        </td>
                        <td className="px-4 py-3 text-[#102a43] text-sm">
                          {secretaria.responsavel}
                        </td>
                        <td className="px-4 py-3">
                          {secretaria.situacao === 'ativa' && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              Ativa
                            </span>
                          )}
                          {secretaria.situacao === 'inativa' && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                              Inativa
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button 
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                              title="Editar"
                              onClick={() => handleEditSecretariaClick(secretaria)}
                            >
                              <Edit className="size-4 text-gray-600" />
                            </button>
                            <button 
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                              title="Excluir"
                              onClick={() => handleDeleteSecretaria(secretaria)}
                            >
                              <Trash2 className="size-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <span className="text-gray-600 text-sm">
                  Mostrando {secretarias.length} de {secretarias.length} secretarias
                </span>
                <button
                  className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
                  onClick={() => setShowSecretariaModal(true)}
                >
                  Nova secretaria
                </button>
              </div>
            </>
          )
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-600">Nenhum usuário encontrado para este perfil.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                      Nome
                    </th>
                    <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                      E-mail
                    </th>
                    <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                      Perfil
                    </th>
                    <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                      Secretaria / Órgão
                    </th>
                    <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                      Situação
                    </th>
                    <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                      Último acesso
                    </th>
                    <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((usuario) => (
                    <tr key={usuario.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-[#102a43] text-sm font-medium">
                        {usuario.nome}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">
                        {usuario.email}
                      </td>
                      <td className="px-4 py-3 text-[#102a43] text-sm">
                        {getPerfilLabel(usuario.perfil)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">
                        {usuario.secretaria}
                      </td>
                      <td className="px-4 py-3">
                        {getSituacaoBadge(usuario.situacao)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">
                        {usuario.ultimoAcesso || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button 
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                            title="Editar"
                            onClick={() => handleEditClick(usuario)}
                          >
                            <Edit className="size-4 text-gray-600" />
                          </button>
                          {usuario.situacao === 'ativo' ? (
                            <button 
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                              title="Desativar"
                              onClick={() => handleToggleSituacao(usuario)}
                            >
                              <UserX className="size-4 text-red-600" />
                            </button>
                          ) : (
                            <button 
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                              title="Reativar"
                              onClick={() => handleToggleSituacao(usuario)}
                            >
                              <UserCheck className="size-4 text-green-600" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <span className="text-gray-600 text-sm">
                Mostrando {filteredUsers.length} de {filteredUsers.length} usuários
              </span>
            </div>
          </>
        )}
      </div>

      {/* Modal de edição */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-2xl border border-gray-200">
            <h2 className="text-[#102a43] text-xl font-medium mb-4">
              Editar usuário
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Nome
                </label>
                <input
                  type="text"
                  value={editForm.nome}
                  onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Secretaria / Órgão
                </label>
                <select
                  value={editForm.secretaria}
                  onChange={(e) => setEditForm({ ...editForm, secretaria: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm"
                >
                  <option>CGM - Controladoria Geral</option>
                  <option>Secretaria de Saúde</option>
                  <option>Secretaria de Educação</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Situação
                </label>
                <select
                  value={editForm.situacao}
                  onChange={(e) => setEditForm({ ...editForm, situacao: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm"
                >
                  <option>Ativo</option>
                  <option>Inativo</option>
                </select>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md text-sm hover:bg-gray-300 mr-2"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
                  onClick={handleSaveEdit}
                >
                  {saving ? <Loader className="size-4 animate-spin" /> : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de criação */}
      {showCreateModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-2xl border border-gray-200">
            <h2 className="text-[#102a43] text-xl font-medium mb-4">
              Criar novo usuário
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Nome
                </label>
                <input
                  type="text"
                  value={createForm.nome}
                  onChange={(e) => setCreateForm({ ...createForm, nome: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Senha
                </label>
                <input
                  type="password"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Secretaria / Órgão
                </label>
                <select
                  value={createForm.secretaria}
                  onChange={(e) => setCreateForm({ ...createForm, secretaria: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm"
                >
                  <option>CGM - Controladoria Geral</option>
                  <option>Secretaria de Saúde</option>
                  <option>Secretaria de Educação</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Perfil
                </label>
                <select
                  value={createForm.perfil}
                  onChange={(e) => setCreateForm({ ...createForm, perfil: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm"
                >
                  <option value="admin">Administrador (CGM)</option>
                  <option value="gestor">Gestor de Contratos</option>
                  <option value="fiscal">Fiscal de Contratos</option>
                </select>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md text-sm hover:bg-gray-300 mr-2"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
                  onClick={handleSaveCreate}
                >
                  {saving ? <Loader className="size-4 animate-spin" /> : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de aprovar solicitação */}
      {showAprovarModal && selectedSolicitacao && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-2xl border border-gray-200">
            <h2 className="text-[#102a43] text-xl font-medium mb-4">
              Aprovar solicitação de usuário
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Nome
                </label>
                <input
                  type="text"
                  value={selectedSolicitacao.nome}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  readOnly
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  value={selectedSolicitacao.email}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  readOnly
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Secretaria / Órgão
                </label>
                <input
                  type="text"
                  value={selectedSolicitacao.setor}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  readOnly
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Perfil *
                </label>
                <select
                  value={aprovarForm.perfil}
                  onChange={(e) => setAprovarForm({ ...aprovarForm, perfil: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm"
                >
                  <option value="admin">Administrador (CGM)</option>
                  <option value="gestor">Gestor de Contratos</option>
                  <option value="fiscal">Fiscal de Contratos</option>
                </select>
                <p className="text-gray-500 text-xs mt-1">
                  A senha foi definida pelo usuário durante a solicitação
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Observações (opcional)
                </label>
                <textarea
                  value={aprovarForm.observacoes}
                  onChange={(e) => setAprovarForm({ ...aprovarForm, observacoes: e.target.value })}
                  placeholder="Adicione observações sobre esta aprovação (opcional)"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md text-sm hover:bg-gray-300 mr-2"
                  onClick={() => setShowAprovarModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
                  onClick={handleAprovarSolicitacao}
                >
                  {saving ? <Loader className="size-4 animate-spin" /> : 'Aprovar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de rejeitar solicitação */}
      {showRejeitarModal && selectedSolicitacao && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-2xl border border-gray-200">
            <h2 className="text-[#102a43] text-xl font-medium mb-4">
              Rejeitar solicitação de usuário
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Nome
                </label>
                <input
                  type="text"
                  value={selectedSolicitacao.nome}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  readOnly
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  value={selectedSolicitacao.email}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  readOnly
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Secretaria / Órgão
                </label>
                <input
                  type="text"
                  value={selectedSolicitacao.secretaria}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  readOnly
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Observações
                </label>
                <textarea
                  value={rejeitarForm.observacoes}
                  onChange={(e) => setRejeitarForm({ ...rejeitarForm, observacoes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md text-sm hover:bg-gray-300 mr-2"
                  onClick={() => setShowRejeitarModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
                  onClick={handleRejeitarSolicitacao}
                >
                  {saving ? <Loader className="size-4 animate-spin" /> : 'Rejeitar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de criação de secretaria */}
      {showSecretariaModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-2xl border border-gray-200">
            <h2 className="text-[#102a43] text-xl font-medium mb-4">
              Criar nova secretaria
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Nome
                </label>
                <input
                  type="text"
                  value={secretariaForm.nome}
                  onChange={(e) => setSecretariaForm({ ...secretariaForm, nome: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Sigla
                </label>
                <input
                  type="text"
                  value={secretariaForm.sigla}
                  onChange={(e) => setSecretariaForm({ ...secretariaForm, sigla: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Responsável
                </label>
                <input
                  type="text"
                  value={secretariaForm.responsavel}
                  onChange={(e) => setSecretariaForm({ ...secretariaForm, responsavel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md text-sm hover:bg-gray-300 mr-2"
                  onClick={() => setShowSecretariaModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
                  onClick={handleSaveSecretaria}
                >
                  {saving ? <Loader className="size-4 animate-spin" /> : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de edição de secretaria */}
      {showEditSecretariaModal && selectedSecretaria && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-2xl border border-gray-200">
            <h2 className="text-[#102a43] text-xl font-medium mb-4">
              Editar secretaria
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Nome
                </label>
                <input
                  type="text"
                  value={secretariaForm.nome}
                  onChange={(e) => setSecretariaForm({ ...secretariaForm, nome: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Sigla
                </label>
                <input
                  type="text"
                  value={secretariaForm.sigla}
                  onChange={(e) => setSecretariaForm({ ...secretariaForm, sigla: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1 font-medium">
                  Responsável
                </label>
                <input
                  type="text"
                  value={secretariaForm.responsavel}
                  onChange={(e) => setSecretariaForm({ ...secretariaForm, responsavel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md text-sm hover:bg-gray-300 mr-2"
                  onClick={() => setShowEditSecretariaModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
                  onClick={handleSaveEditSecretaria}
                >
                  {saving ? <Loader className="size-4 animate-spin" /> : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}