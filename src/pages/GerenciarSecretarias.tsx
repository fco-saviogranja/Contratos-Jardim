import React, { useState, useEffect } from 'react';
import { Building2, Plus, Search, Edit, Trash2, X, Check, AlertTriangle } from 'lucide-react';
import { usuarios } from '../utils/api';
import { toast } from 'sonner';

interface Secretaria {
  id: string;
  nome: string;
  sigla: string;
  responsavel: string;
  situacao: 'ativa' | 'inativa';
  criadoEm?: string;
  atualizadoEm?: string;
}

export function GerenciarSecretarias() {
  const [secretarias, setSecretarias] = useState<Secretaria[]>([]);
  const [filteredSecretarias, setFilteredSecretarias] = useState<Secretaria[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSecretaria, setEditingSecretaria] = useState<Secretaria | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  // Formulário
  const [formData, setFormData] = useState({
    nome: '',
    sigla: '',
    responsavel: '',
  });

  // Carregar secretarias
  useEffect(() => {
    loadSecretarias();
  }, []);

  // Filtrar secretarias
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSecretarias(secretarias);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = secretarias.filter(
        (s) =>
          s.nome.toLowerCase().includes(term) ||
          s.sigla.toLowerCase().includes(term) ||
          s.responsavel.toLowerCase().includes(term)
      );
      setFilteredSecretarias(filtered);
    }
  }, [searchTerm, secretarias]);

  const loadSecretarias = async () => {
    try {
      setLoading(true);
      const response = await usuarios.getSecretarias();
      
      if (response.success && response.secretarias) {
        setSecretarias(response.secretarias);
        setFilteredSecretarias(response.secretarias);
      }
    } catch (error: any) {
      console.error('Erro ao carregar secretarias:', error);
      toast.error(error.message || 'Erro ao carregar secretarias');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (secretaria?: Secretaria) => {
    if (secretaria) {
      setEditingSecretaria(secretaria);
      setFormData({
        nome: secretaria.nome,
        sigla: secretaria.sigla,
        responsavel: secretaria.responsavel || '',
      });
    } else {
      setEditingSecretaria(null);
      setFormData({
        nome: '',
        sigla: '',
        responsavel: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSecretaria(null);
    setFormData({
      nome: '',
      sigla: '',
      responsavel: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.sigla.trim()) {
      toast.error('Nome e sigla são obrigatórios');
      return;
    }

    try {
      if (editingSecretaria) {
        // Atualizar
        const response = await usuarios.updateSecretaria(editingSecretaria.id, formData);
        
        if (response.success) {
          toast.success('Secretaria atualizada com sucesso!');
          loadSecretarias();
          handleCloseModal();
        }
      } else {
        // Criar
        const response = await usuarios.createSecretaria(formData);
        
        if (response.success) {
          toast.success('Secretaria criada com sucesso!');
          loadSecretarias();
          handleCloseModal();
        }
      }
    } catch (error: any) {
      console.error('Erro ao salvar secretaria:', error);
      toast.error(error.message || 'Erro ao salvar secretaria');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await usuarios.deleteSecretaria(id);
      
      if (response.success) {
        toast.success('Secretaria excluída com sucesso!');
        loadSecretarias();
        setShowDeleteConfirm(null);
      }
    } catch (error: any) {
      console.error('Erro ao excluir secretaria:', error);
      toast.error(error.message || 'Erro ao excluir secretaria');
    }
  };

  const secretariasAtivas = secretarias.filter((s) => s.situacao === 'ativa').length;
  const secretariasInativas = secretarias.filter((s) => s.situacao === 'inativa').length;

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#102a43] text-2xl mb-1">
            Gerenciar secretarias
          </h1>
          <p className="text-gray-600 text-sm">
            Gerencie as secretarias municipais e seus responsáveis
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] flex items-center gap-2"
        >
          <Plus className="size-4" />
          Nova secretaria
        </button>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de secretarias</p>
              <p className="text-[#102a43] text-2xl mt-1">{secretarias.length}</p>
            </div>
            <Building2 className="size-8 text-[#0b6b3a]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Secretarias ativas</p>
              <p className="text-[#102a43] text-2xl mt-1">{secretariasAtivas}</p>
            </div>
            <Check className="size-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Secretarias inativas</p>
              <p className="text-[#102a43] text-2xl mt-1">{secretariasInativas}</p>
            </div>
            <AlertTriangle className="size-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Busca */}
      <div className="bg-white rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, sigla ou responsável..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Tabela de secretarias */}
      <div className="bg-white rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Carregando secretarias...
          </div>
        ) : filteredSecretarias.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchTerm ? 'Nenhuma secretaria encontrada' : 'Nenhuma secretaria cadastrada'}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase">
                  Sigla
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase">
                  Nome
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase">
                  Responsável
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase">
                  Situação
                </th>
                <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSecretarias.map((secretaria) => (
                <tr key={secretaria.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs bg-blue-100 text-blue-800">
                      {secretaria.sigla}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {secretaria.nome}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {secretaria.responsavel || <span className="text-gray-400 italic">Não definido</span>}
                  </td>
                  <td className="px-4 py-3">
                    {secretaria.situacao === 'ativa' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                        Ativa
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                        Inativa
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(secretaria)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="Editar"
                      >
                        <Edit className="size-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(secretaria.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                        title="Excluir"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de Criar/Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Building2 className="size-5 text-[#0b6b3a]" />
                <h2 className="text-[#102a43]">
                  {editingSecretaria ? 'Editar secretaria' : 'Nova secretaria'}
                </h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  placeholder="Ex: Secretaria Municipal de Educação"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Sigla *
                </label>
                <input
                  type="text"
                  value={formData.sigla}
                  onChange={(e) =>
                    setFormData({ ...formData, sigla: e.target.value.toUpperCase() })
                  }
                  placeholder="Ex: SEMED"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm uppercase"
                  maxLength={10}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Responsável
                </label>
                <input
                  type="text"
                  value={formData.responsavel}
                  onChange={(e) =>
                    setFormData({ ...formData, responsavel: e.target.value })
                  }
                  placeholder="Ex: João da Silva"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Nome do secretário ou responsável pela pasta
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] flex items-center gap-2"
                >
                  <Check className="size-4" />
                  {editingSecretaria ? 'Salvar alterações' : 'Criar secretaria'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="size-5 text-red-600" />
              </div>
              <h2 className="text-[#102a43]">
                Confirmar exclusão
              </h2>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Tem certeza que deseja excluir esta secretaria? Esta ação não pode ser desfeita.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 flex items-center gap-2"
              >
                <Trash2 className="size-4" />
                Excluir secretaria
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
