import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, AlertCircle, CheckCircle, Download } from 'lucide-react';

interface ImportarExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportarExcelModal({ isOpen, onClose }: ImportarExcelModalProps) {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [etapa, setEtapa] = useState<'upload' | 'validacao' | 'sucesso'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [validacao, setValidacao] = useState({
    total: 0,
    validos: 0,
    invalidos: 0,
    erros: [] as string[]
  });

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleArquivo(e.dataTransfer.files[0]);
    }
  };

  const handleArquivo = (file: File) => {
    if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        file.type === 'application/vnd.ms-excel' ||
        file.name.endsWith('.xlsx') ||
        file.name.endsWith('.xls')) {
      setArquivo(file);
    } else {
      alert('Por favor, selecione um arquivo Excel válido (.xlsx ou .xls)');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleArquivo(e.target.files[0]);
    }
  };

  const baixarModelo = () => {
    alert('Download do modelo Excel iniciado! O arquivo contém as colunas necessárias e exemplos de preenchimento.');
  };

  const validarArquivo = () => {
    // Simulação de validação
    setEtapa('validacao');
    
    setTimeout(() => {
      setValidacao({
        total: 15,
        validos: 12,
        invalidos: 3,
        erros: [
          'Linha 3: Data de início inválida (formato esperado: DD/MM/AAAA)',
          'Linha 7: Valor do contrato deve ser numérico',
          'Linha 12: Secretaria não encontrada no sistema'
        ]
      });
    }, 1500);
  };

  const importarContratos = () => {
    // Simulação de importação
    setTimeout(() => {
      setEtapa('sucesso');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-2 rounded-lg">
              <FileSpreadsheet className="size-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl text-[#102a43] font-medium">
                Importar Contratos via Excel
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Faça upload de uma planilha Excel para cadastrar múltiplos contratos
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
          {etapa === 'upload' && (
            <div className="space-y-6">
              {/* Download do modelo */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-5 text-blue-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-blue-900 font-medium text-sm mb-2">
                      Baixe o modelo Excel antes de importar
                    </p>
                    <p className="text-blue-800 text-sm mb-3">
                      O modelo contém as colunas necessárias e exemplos de preenchimento correto.
                    </p>
                    <button
                      onClick={baixarModelo}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium flex items-center gap-2"
                    >
                      <Download className="size-4" />
                      Baixar modelo Excel
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload area */}
              <div>
                <label className="block text-[#102a43] text-sm font-medium mb-3">
                  Selecione o arquivo Excel
                </label>
                
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-[#0b6b3a] bg-green-50' 
                      : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  <Upload className={`size-12 mx-auto mb-4 ${dragActive ? 'text-[#0b6b3a]' : 'text-gray-400'}`} />
                  
                  {arquivo ? (
                    <div>
                      <p className="text-[#102a43] font-medium mb-1">
                        {arquivo.name}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        {(arquivo.size / 1024).toFixed(2)} KB
                      </p>
                      <button
                        onClick={() => setArquivo(null)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Remover arquivo
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[#102a43] mb-2">
                        Arraste o arquivo Excel aqui ou clique para selecionar
                      </p>
                      <p className="text-gray-600 text-sm mb-4">
                        Formatos aceitos: .xlsx, .xls
                      </p>
                      <label className="inline-block">
                        <input
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={handleFileInput}
                          className="hidden"
                        />
                        <span className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium cursor-pointer inline-block">
                          Selecionar arquivo
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Instruções */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="text-amber-900 font-medium text-sm mb-3">
                  Ordem das colunas no Excel
                </h3>
                <div className="bg-white rounded border border-amber-300 p-3 mb-3">
                  <ol className="text-amber-900 text-sm space-y-1.5 font-medium">
                    <li>1. Secretaria</li>
                    <li>2. Contratado</li>
                    <li>3. Objeto</li>
                    <li>4. Data final da Vigência</li>
                  </ol>
                </div>
                <h3 className="text-amber-900 font-medium text-sm mb-2">
                  Instruções de preenchimento
                </h3>
                <ul className="text-amber-800 text-sm space-y-1">
                  <li>• Todas as colunas obrigatórias devem ser preenchidas</li>
                  <li>• Datas no formato DD/MM/AAAA</li>
                  <li>• Valores numéricos sem símbolos (ex: 50000.00)</li>
                  <li>• Secretarias devem existir no sistema</li>
                  <li>• Gestores e fiscais devem estar cadastrados</li>
                </ul>
              </div>
            </div>
          )}

          {etapa === 'validacao' && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center size-16 bg-blue-50 rounded-full mb-4">
                  <FileSpreadsheet className="size-8 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-[#102a43] font-medium mb-2">
                  Validando planilha...
                </h3>
                <p className="text-gray-600 text-sm">
                  Aguarde enquanto verificamos os dados
                </p>
              </div>

              {validacao.total > 0 && (
                <div className="space-y-4">
                  {/* Resumo */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-blue-600 text-2xl font-medium mb-1">
                        {validacao.total}
                      </p>
                      <p className="text-blue-900 text-sm">
                        Total de registros
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-green-600 text-2xl font-medium mb-1">
                        {validacao.validos}
                      </p>
                      <p className="text-green-900 text-sm">
                        Registros válidos
                      </p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <p className="text-red-600 text-2xl font-medium mb-1">
                        {validacao.invalidos}
                      </p>
                      <p className="text-red-900 text-sm">
                        Com erros
                      </p>
                    </div>
                  </div>

                  {/* Erros */}
                  {validacao.erros.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="text-red-900 font-medium text-sm mb-3 flex items-center gap-2">
                        <AlertCircle className="size-4" />
                        Erros encontrados
                      </h3>
                      <ul className="text-red-800 text-sm space-y-2">
                        {validacao.erros.map((erro, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-600 mt-0.5">•</span>
                            <span>{erro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {validacao.validos > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-900 text-sm">
                        <strong>{validacao.validos} contratos</strong> estão prontos para importação.
                        {validacao.invalidos > 0 && ' Os registros com erro serão ignorados.'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {etapa === 'sucesso' && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center size-20 bg-green-50 rounded-full mb-4">
                <CheckCircle className="size-10 text-green-600" />
              </div>
              <h3 className="text-[#102a43] font-medium text-xl mb-2">
                Importação concluída!
              </h3>
              <p className="text-gray-600 mb-6">
                {validacao.validos} contratos foram importados com sucesso para o sistema.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-green-900 text-sm">
                  Os contratos já estão disponíveis na listagem e podem ser visualizados e editados normalmente.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 font-medium"
          >
            {etapa === 'sucesso' ? 'Fechar' : 'Cancelar'}
          </button>
          
          {etapa === 'upload' && arquivo && (
            <button
              onClick={validarArquivo}
              className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
            >
              Validar e continuar
            </button>
          )}

          {etapa === 'validacao' && validacao.validos > 0 && (
            <button
              onClick={importarContratos}
              className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium"
            >
              Importar {validacao.validos} contratos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}