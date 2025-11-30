import React, { useState } from 'react';
import { exportToCSV, exportToExcel, exportToPDF, ContratoExport } from '../utils/exportUtils';
import { ImportarExcelModal } from '../components/ImportarExcelModal';
import { Search, Download, Eye, Edit, FileText, ChevronDown, Plus, Upload } from 'lucide-react';

interface TodosContratosProps {
  onNavigate: (page: string) => void;
}

export function TodosContratos({ onNavigate }: TodosContratosProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  
  // Dados de exemplo temporários - no futuro virá da API
  const mockContratos: any[] = [];
  
  // Para usar os contratos diretamente (no futuro será com filtros)
  const filteredContratos = mockContratos;

  // Função para preparar dados para exportação
  const prepararDadosExportacao = (): ContratoExport[] => {
    return filteredContratos.map(contrato => ({
      numero: contrato.numero,
      objeto: contrato.objeto,
      contratado: contrato.contratado,
      valor: contrato.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
      inicio: new Date(contrato.dataInicio).toLocaleDateString('pt-BR'),
      vencimento: new Date(contrato.dataFinal).toLocaleDateString('pt-BR'),
      situacao: contrato.situacao,
      gestor: contrato.gestor,
      secretaria: contrato.secretaria
    }));
  };

  const handleExport = (formato: 'csv' | 'excel' | 'pdf') => {
    const dados = prepararDadosExportacao();
    
    switch (formato) {
      case 'csv':
        exportToCSV(dados, 'contratos');
        break;
      case 'excel':
        exportToExcel(dados, 'contratos');
        break;
      case 'pdf':
        exportToPDF(dados, 'contratos');
        break;
    }
    
    setShowExportMenu(false);
  };

  const getSituacaoBadge = (situacao: string) => {
    const styles = {
      vigente: 'bg-green-100 text-green-700',
      proximo_vencimento: 'bg-amber-100 text-amber-700',
      vencido: 'bg-red-100 text-red-700'
    };
    
    const labels = {
      vigente: 'Vigente',
      proximo_vencimento: 'Próx. vencimento',
      vencido: 'Vencido'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[situacao as keyof typeof styles]}`}>
        {labels[situacao as keyof typeof labels]}
      </span>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#102a43] text-2xl mb-1 font-medium">
            Contratos
          </h1>
          <p className="text-gray-600 text-sm">
            Visualização consolidada de contratos de todas as secretarias e órgãos.
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('cadastro-contrato')}
            className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] flex items-center gap-2 font-medium"
          >
            <Plus className="size-4" />
            Cadastro de contrato
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] flex items-center gap-2 font-medium"
          >
            <Upload className="size-4" />
            Importar Excel
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 flex items-center gap-2 font-medium"
            >
              <Download className="size-4" />
              Exportar
              <ChevronDown className="size-4" />
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => handleExport('csv')}>
                  Exportar como CSV
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => handleExport('pdf')}>
                  Exportar como PDF
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => handleExport('excel')}>
                  Exportar como Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Número, objeto ou fornecedor"
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm"
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Secretaria
            </label>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm">
              <option>Todas</option>
              <option>Secretaria de Saúde</option>
              <option>Secretaria de Educação</option>
              <option>Secretaria de Obras</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Situação
            </label>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm">
              <option>Todas</option>
              <option>Vigente</option>
              <option>Próximo do vencimento</option>
              <option>Vencido</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Gestor
            </label>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#102a43] text-sm">
              <option>Todos</option>
              <option>Carlos Souza</option>
              <option>Ana Pereira</option>
              <option>Roberto Alves</option>
            </select>
          </div>
          
          <button className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium">
            Filtrar
          </button>
        </div>
      </div>

      {/* Tabela de contratos */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Número
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Objeto
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Fornecedor
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Valor (R$)
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Vencimento
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Situação
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Gestor
                </th>
                <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">{filteredContratos.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="size-12 text-gray-300 mb-3" />
                      <p className="text-gray-600 font-medium mb-1">
                        Nenhum contrato cadastrado
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        Comece cadastrando um novo contrato ou importe via Excel
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onNavigate('cadastro-contrato')}
                          className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
                        >
                          Cadastrar primeiro contrato
                        </button>
                        <button
                          onClick={() => setShowImportModal(true)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium"
                        >
                          Importar Excel
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
              mockContratos.map((contrato) => (
                <tr key={contrato.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-[#102a43] text-sm font-medium">
                    {contrato.numero}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm max-w-xs truncate">
                    {contrato.objeto}
                  </td>
                  <td className="px-4 py-3 text-[#102a43] text-sm">
                    {contrato.contratado}
                  </td>
                  <td className="px-4 py-3 text-[#102a43] text-sm">
                    {formatCurrency(contrato.valor)}
                  </td>
                  <td className="px-4 py-3 text-[#102a43] text-sm">
                    {formatDate(contrato.dataFinal)}
                  </td>
                  <td className="px-4 py-3">
                    {getSituacaoBadge(contrato.situacao)}
                  </td>
                  <td className="px-4 py-3 text-[#102a43] text-sm">
                    {contrato.gestor}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button 
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        title="Ver detalhes"
                      >
                        <Eye className="size-4 text-gray-600" />
                      </button>
                      <button 
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        title="Editar"
                      >
                        <Edit className="size-4 text-gray-600" />
                      </button>
                      <button 
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        title="Registrar ação"
                      >
                        <FileText className="size-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <span className="text-gray-600 text-sm">
            Mostrando 1-5 de 320 contratos
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 font-medium">
              Anterior
            </button>
            <button className="px-3 py-1 bg-[#0b6b3a] text-white rounded text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 font-medium">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 font-medium">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 font-medium">
              Próximo
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de importação */}
      <ImportarExcelModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
      />
    </div>
  );
}