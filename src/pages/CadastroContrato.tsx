import React, { useState } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';

interface CadastroContratoProps {
  onNavigate: (page: string) => void;
}

export function CadastroContrato({ onNavigate }: CadastroContratoProps) {
  const [formData, setFormData] = useState({
    numero: '',
    objeto: '',
    fornecedor: '',
    valor: '',
    vencimento: '',
    situacao: 'vigente',
    gestor: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui será a integração com Supabase
    console.log('Cadastrando contrato:', formData);
    alert('Contrato cadastrado com sucesso!');
    onNavigate('todos-contratos');
  };

  const handleCancel = () => {
    if (confirm('Deseja cancelar o cadastro? As informações não serão salvas.')) {
      onNavigate('todos-contratos');
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Breadcrumb/Voltar */}
      <button
        onClick={() => onNavigate('todos-contratos')}
        className="flex items-center gap-2 text-gray-600 hover:text-[#0b6b3a] mb-6 text-sm"
      >
        <ArrowLeft className="size-4" />
        Voltar para Contratos
      </button>

      {/* Card do formulário */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#102a43] text-2xl mb-2 font-medium">
            Cadastro de Contrato
          </h1>
          <p className="text-gray-600 text-sm">
            Preencha as informações abaixo para cadastrar um novo contrato no sistema.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* Número */}
            <div>
              <label className="block text-[#102a43] text-sm mb-2 font-medium">
                Número do Contrato <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.numero}
                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                placeholder="Ex: 001/2024"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-[#102a43] text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
              />
            </div>

            {/* Fornecedor */}
            <div>
              <label className="block text-[#102a43] text-sm mb-2 font-medium">
                Fornecedor <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fornecedor}
                onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
                placeholder="Nome do fornecedor"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-[#102a43] text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
              />
            </div>

            {/* Objeto */}
            <div className="col-span-2">
              <label className="block text-[#102a43] text-sm mb-2 font-medium">
                Objeto do Contrato <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.objeto}
                onChange={(e) => setFormData({ ...formData, objeto: e.target.value })}
                placeholder="Descreva o objeto do contrato"
                required
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-[#102a43] text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent resize-none"
              />
            </div>

            {/* Valor */}
            <div>
              <label className="block text-[#102a43] text-sm mb-2 font-medium">
                Valor (R$) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.valor}
                onChange={(e) => {
                  // Permite apenas números e vírgula
                  const value = e.target.value.replace(/[^\d,]/g, '');
                  setFormData({ ...formData, valor: value });
                }}
                placeholder="Ex: 150.000,00"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-[#102a43] text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
              />
            </div>

            {/* Vencimento */}
            <div>
              <label className="block text-[#102a43] text-sm mb-2 font-medium">
                Data de Vencimento <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.vencimento}
                onChange={(e) => setFormData({ ...formData, vencimento: e.target.value })}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-[#102a43] text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
              />
            </div>

            {/* Situação */}
            <div>
              <label className="block text-[#102a43] text-sm mb-2 font-medium">
                Situação <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.situacao}
                onChange={(e) => setFormData({ ...formData, situacao: e.target.value })}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-[#102a43] text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent bg-white"
              >
                <option value="vigente">Vigente</option>
                <option value="vencido">Vencido</option>
                <option value="a-vencer">A Vencer</option>
                <option value="suspenso">Suspenso</option>
                <option value="encerrado">Encerrado</option>
              </select>
            </div>

            {/* Gestor */}
            <div>
              <label className="block text-[#102a43] text-sm mb-2 font-medium">
                Gestor Responsável <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.gestor}
                onChange={(e) => setFormData({ ...formData, gestor: e.target.value })}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-[#102a43] text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent bg-white"
              >
                <option value="">Selecione um gestor</option>
                <option value="Maria Silva">Maria Silva</option>
                <option value="João Santos">João Santos</option>
                <option value="Ana Costa">Ana Costa</option>
                <option value="Carlos Oliveira">Carlos Oliveira</option>
                <option value="Patricia Lima">Patricia Lima</option>
              </select>
            </div>
          </div>

          {/* Informação sobre Ações */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800 text-sm">
              <strong>Ações:</strong> Após o cadastro, você poderá visualizar, editar, anexar documentos e gerenciar todas as ações relacionadas ao contrato na listagem de contratos.
            </p>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] flex items-center gap-2 font-medium"
            >
              <Save className="size-4" />
              Salvar Contrato
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 border border-gray-300 text-[#102a43] rounded-md text-sm hover:bg-gray-50 flex items-center gap-2 font-medium"
            >
              <X className="size-4" />
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
