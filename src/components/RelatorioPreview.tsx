import React from 'react';
import { X, Download, FileText } from 'lucide-react';

interface RelatorioPreviewProps {
  titulo: string;
  dados: any[];
  onClose: () => void;
  onExport: (formato: 'csv' | 'excel' | 'pdf') => void;
}

export function RelatorioPreview({ titulo, dados, onClose, onExport }: RelatorioPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <FileText className="size-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl text-[#102a43] font-medium">
                Prévia do Relatório
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {titulo}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">
                Total de registros: <span className="font-medium text-[#102a43]">{dados.length}</span>
              </p>
              <p className="text-sm text-gray-600">
                Data de geração: <span className="font-medium text-[#102a43]">
                  {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
                </span>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  {dados.length > 0 && Object.keys(dados[0]).map(key => (
                    <th
                      key={key}
                      className="px-4 py-3 text-left text-[#102a43] text-sm font-medium capitalize"
                    >
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {dados.slice(0, 20).map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {Object.values(row).map((value: any, colIdx) => (
                      <td key={colIdx} className="px-4 py-3 text-sm text-gray-700">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {dados.length > 20 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Exibindo 20 de {dados.length} registros. Exporte para ver todos os dados.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium"
          >
            Fechar prévia
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={() => onExport('pdf')}
              className="px-4 py-2 bg-red-50 text-red-700 rounded-md text-sm hover:bg-red-100 font-medium flex items-center gap-2"
            >
              <Download className="size-4" />
              Exportar PDF
            </button>
            <button
              onClick={() => onExport('excel')}
              className="px-4 py-2 bg-green-50 text-green-700 rounded-md text-sm hover:bg-green-100 font-medium flex items-center gap-2"
            >
              <Download className="size-4" />
              Exportar Excel
            </button>
            <button
              onClick={() => onExport('csv')}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm hover:bg-blue-100 font-medium flex items-center gap-2"
            >
              <Download className="size-4" />
              Exportar CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
