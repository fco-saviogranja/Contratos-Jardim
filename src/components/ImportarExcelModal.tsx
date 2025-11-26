import React, { useState, useEffect } from 'react';
import { X, Upload, FileSpreadsheet, AlertCircle, CheckCircle, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ImportarExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SecretariaNaoEncontrada {
  nomeArquivo: string;
  linhas: number[];
  sugestoes: string[];
}

export function ImportarExcelModal({ isOpen, onClose }: ImportarExcelModalProps) {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [etapa, setEtapa] = useState<'upload' | 'preview' | 'validacao' | 'mapeamento' | 'sucesso'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [validacao, setValidacao] = useState({
    total: 0,
    validos: 0,
    invalidos: 0,
    erros: [] as string[]
  });
  const [secretariasNaoEncontradas, setSecretariasNaoEncontradas] = useState<SecretariaNaoEncontrada[]>([]);
  const [mapeamentos, setMapeamentos] = useState<{[key: string]: string}>({});
  const [dadosLidos, setDadosLidos] = useState<any[][]>([]);

  // Iniciar validação automaticamente quando arquivo for carregado
  useEffect(() => {
    if (arquivo) {
      validarArquivo();
    }
  }, [arquivo]);

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

  const validarArquivo = async () => {
    if (!arquivo) return;
    
    setEtapa('preview');
    
    try {
      // Ler o arquivo Excel
      const data = await arquivo.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      
      // Pegar a primeira planilha
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Converter para JSON (sem header para ter controle total)
      const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      console.log('📋 Total de linhas no arquivo:', jsonData.length);
      console.log('📋 Cabeçalho (linha 1):', jsonData[0]);
      
      // Salvar dados lidos para exibição
      const dadosParaExibir: any[][] = [];
      
      const erros: string[] = [];
      const secretariasProblema: SecretariaNaoEncontrada[] = [];
      let validos = 0;
      let invalidos = 0;
      let processados = 0;
      
      // Lista de secretarias cadastradas (simular - depois vem do backend)
      const secretariasCadastradas = [
        'Secretaria de Educação',
        'Secretaria de Saúde',
        'Secretaria de Obras',
        'Secretaria de Infraestrutura',
        'Secretaria de Meio Ambiente',
        'Secretaria de Desenvolvimento Sustentável',
        'Secretaria de Desenvolvimento Urbano'
      ];
      
      // Processar TODAS as linhas, começando da linha 2 (índice 1, pois linha 1 é cabeçalho)
      for (let i = 1; i < jsonData.length; i++) {
        const linha = jsonData[i];
        const numeroLinha = i + 1; // +1 porque Excel começa em 1
        
        // Verificar se a linha está vazia (todas as células undefined/null/vazio)
        const linhaVazia = !linha || linha.every(cell => 
          cell === undefined || cell === null || cell === '' || String(cell).trim() === ''
        );
        
        if (linhaVazia) {
          console.log(`📄 Linha ${numeroLinha}: vazia - ignorando e continuando...`);
          continue; // Ignora linha vazia e continua para a próxima
        }
        
        processados++;
        
        // Extrair dados das colunas conforme ordem definida
        // COLUNA A (índice 0): Secretaria
        // COLUNA B (índice 1): Contratado
        // COLUNA C (índice 2): Objeto
        // COLUNA D (índice 3): Data Final da Vigência
        const secretaria = linha[0] ? String(linha[0]).trim() : '';
        const contratado = linha[1] ? String(linha[1]).trim() : '';
        const objeto = linha[2] ? String(linha[2]).trim() : '';
        const dataFinal = linha[3] ? String(linha[3]).trim() : '';
        
        console.log(`\n📊 Linha ${numeroLinha}:`);
        console.log(`  ├─ Coluna A (Secretaria): "${secretaria}"`);
        console.log(`  ├─ Coluna B (Contratado): "${contratado}"`);
        console.log(`  ├─ Coluna C (Objeto): "${objeto}"`);
        console.log(`  └─ Coluna D (Data Final): "${dataFinal}"`);
        
        // Salvar para preview (primeiras 5 linhas)
        if (dadosParaExibir.length < 5) {
          dadosParaExibir.push([secretaria, contratado, objeto, dataFinal]);
        }
        
        let temErro = false;
        
        // Validar campos obrigatórios
        if (!secretaria) {
          erros.push(`Linha ${numeroLinha}: Secretaria não informada (Coluna A)`);
          temErro = true;
        }
        
        if (!contratado) {
          erros.push(`Linha ${numeroLinha}: Contratado não informado (Coluna B)`);
          temErro = true;
        }
        
        if (!objeto) {
          erros.push(`Linha ${numeroLinha}: Objeto não informado (Coluna C)`);
          temErro = true;
        }
        
        if (!dataFinal) {
          erros.push(`Linha ${numeroLinha}: Data final da vigência não informada (Coluna D)`);
          temErro = true;
        } else {
          // Validar formato de data DD/MM/AAAA
          const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
          if (!regexData.test(dataFinal)) {
            erros.push(`Linha ${numeroLinha}: Data final da vigência inválida (formato esperado: DD/MM/AAAA, recebido: "${dataFinal}")`);
            temErro = true;
          }
        }
        
        // Verificar se secretaria existe
        if (secretaria && !secretariasCadastradas.includes(secretaria)) {
          // Gerar sugestões (simples match por palavras-chave)
          const sugestoes = secretariasCadastradas.filter(s => {
            const palavrasSecretaria = secretaria.toLowerCase().split(' ');
            const palavrasSugestao = s.toLowerCase();
            return palavrasSecretaria.some(p => p.length > 3 && palavrasSugestao.includes(p));
          });
          
          // Se não encontrou sugestões por palavras, mostrar todas
          const sugestoesFinais = sugestoes.length > 0 ? sugestoes : secretariasCadastradas.slice(0, 3);
          
          const secretariaExistente = secretariasProblema.find(s => s.nomeArquivo === secretaria);
          if (secretariaExistente) {
            secretariaExistente.linhas.push(numeroLinha);
          } else {
            secretariasProblema.push({
              nomeArquivo: secretaria,
              linhas: [numeroLinha],
              sugestoes: sugestoesFinais
            });
          }
          temErro = true;
        }
        
        if (temErro) {
          invalidos++;
        } else {
          validos++;
        }
      }
      
      console.log('\n✅ Processamento concluído:');
      console.log('  ├─ Total processados:', processados);
      console.log('  ├─ Válidos:', validos);
      console.log('  ├─ Inválidos:', invalidos);
      console.log('  └─ Erros:', erros.length);
      
      setDadosLidos(dadosParaExibir);
      setSecretariasNaoEncontradas(secretariasProblema);
      setValidacao({
        total: processados,
        validos,
        invalidos,
        erros
      });
      
      // Se houver secretarias não encontradas, vai para mapeamento
      if (secretariasProblema.length > 0) {
        setEtapa('mapeamento');
      } else {
        setEtapa('validacao');
      }
      
    } catch (error) {
      console.error('❌ Erro ao processar arquivo:', error);
      alert('Erro ao processar arquivo Excel. Verifique se o arquivo está no formato correto.');
      setEtapa('upload');
    }
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
                  <li>• Linhas vazias serão ignoradas automaticamente</li>
                  <li>• Todas as colunas obrigatórias devem ser preenchidas</li>
                  <li>• Datas no formato DD/MM/AAAA</li>
                  <li>• Valores numéricos sem símbolos (ex: 50000.00)</li>
                  <li>• Secretarias devem existir no sistema</li>
                  <li>• Gestores e fiscais devem estar cadastrados</li>
                </ul>
              </div>
            </div>
          )}

          {etapa === 'preview' && (
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

          {etapa === 'mapeamento' && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-amber-900 font-medium text-sm mb-2">
                      Secretarias não encontradas
                    </h3>
                    <p className="text-amber-800 text-sm">
                      Foram encontradas {secretariasNaoEncontradas.length} secretaria(s) que não existem no sistema. 
                      Para cada uma, escolha uma secretaria cadastrada ou cadastre uma nova.
                    </p>
                  </div>
                </div>
              </div>

              {secretariasNaoEncontradas.map((secretaria, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="mb-4">
                    <span className="text-xs text-gray-500 font-medium">Linhas {secretaria.linhas.join(', ')}</span>
                    <h4 className="text-[#102a43] font-medium mt-1">
                      "{secretaria.nomeArquivo}"
                    </h4>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700 text-sm font-medium">
                      Esta secretaria se enquadra em alguma já cadastrada?
                    </p>
                    
                    <div className="space-y-2">
                      {secretaria.sugestoes.map((sugestao, sIdx) => (
                        <label 
                          key={sIdx}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <input
                            type="radio"
                            name={`secretaria-${idx}`}
                            value={sugestao}
                            checked={mapeamentos[`${secretaria.nomeArquivo}`] === sugestao}
                            onChange={(e) => setMapeamentos({
                              ...mapeamentos,
                              [`${secretaria.nomeArquivo}`]: e.target.value
                            })}
                            className="size-4"
                          />
                          <span className="text-[#102a43] text-sm flex-1">
                            {sugestao}
                          </span>
                        </label>
                      ))}
                      
                      <label className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0b6b3a] hover:bg-green-50 transition-colors">
                        <input
                          type="radio"
                          name={`secretaria-${idx}`}
                          value="__NOVA__"
                          checked={mapeamentos[`${secretaria.nomeArquivo}`] === '__NOVA__'}
                          onChange={(e) => setMapeamentos({
                            ...mapeamentos,
                            [`${secretaria.nomeArquivo}`]: e.target.value
                          })}
                          className="size-4"
                        />
                        <span className="text-[#0b6b3a] text-sm font-medium flex-1">
                          Cadastrar nova secretaria: "{secretaria.nomeArquivo}"
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              {Object.keys(mapeamentos).length === secretariasNaoEncontradas.length && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-900 text-sm">
                    ✓ Todas as secretarias foram mapeadas. Clique em "Continuar importação" para prosseguir.
                  </p>
                </div>
              )}
            </div>
          )}

          {etapa === 'validacao' && (
            <div className="space-y-6">
              {dadosLidos.length === 0 ? (
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
              ) : (
                <>
                  {/* Preview dos dados lidos */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-blue-900 font-medium text-sm mb-3">
                      ✓ Prévia dos dados lidos (primeiras 5 linhas)
                    </h3>
                    <div className="bg-white rounded border border-blue-300 p-3 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-blue-200">
                            <th className="text-left py-2 px-3 text-blue-900 font-medium">Coluna A<br/><span className="font-normal text-xs">Secretaria</span></th>
                            <th className="text-left py-2 px-3 text-blue-900 font-medium">Coluna B<br/><span className="font-normal text-xs">Contratado</span></th>
                            <th className="text-left py-2 px-3 text-blue-900 font-medium">Coluna C<br/><span className="font-normal text-xs">Objeto</span></th>
                            <th className="text-left py-2 px-3 text-blue-900 font-medium">Coluna D<br/><span className="font-normal text-xs">Data Final</span></th>
                          </tr>
                        </thead>
                        <tbody>
                          {dadosLidos.map((linha, idx) => (
                            <tr key={idx} className="border-b border-gray-100">
                              <td className="py-2 px-3 text-[#102a43]">{linha[0] || <span className="text-gray-400 italic">vazio</span>}</td>
                              <td className="py-2 px-3 text-[#102a43]">{linha[1] || <span className="text-gray-400 italic">vazio</span>}</td>
                              <td className="py-2 px-3 text-[#102a43]">{linha[2] || <span className="text-gray-400 italic">vazio</span>}</td>
                              <td className="py-2 px-3 text-[#102a43]">{linha[3] || <span className="text-gray-400 italic">vazio</span>}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-blue-800 text-xs mt-2">
                      Verifique se os dados estão nas colunas corretas conforme a ordem especificada.
                    </p>
                  </div>

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
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-h-60 overflow-y-auto">
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
                </>
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

          {etapa === 'mapeamento' && (
            <button
              onClick={importarContratos}
              disabled={Object.keys(mapeamentos).length !== secretariasNaoEncontradas.length}
              className={`px-4 py-2 text-white rounded-md text-sm font-medium ${
                Object.keys(mapeamentos).length === secretariasNaoEncontradas.length
                  ? 'bg-[#0b6b3a] hover:bg-[#0a5a31]'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Continuar importação
            </button>
          )}
        </div>
      </div>
    </div>
  );
}