import React, { useState, useEffect } from 'react';
import { X, Upload, FileSpreadsheet, AlertCircle, CheckCircle, Download, AlertTriangle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { contratos as contratosAPI } from '../utils/api';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ImportarExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SecretariaNaoEncontrada {
  nomeArquivo: string;
  linhas: number[];
  sugestoes: Array<{ nome: string; similaridade: number }>;
}

interface ContratoDuplicado {
  numero: string;
  linhas: number[];
  contratoExistente: any;
}

// Função para calcular similaridade entre strings (Levenshtein Distance)
function calcularSimilaridade(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  const costs: number[] = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) {
      costs[s2.length] = lastValue;
    }
  }
  
  // Retorna similaridade normalizada (0 a 1, onde 1 é idêntico)
  const maxLength = Math.max(s1.length, s2.length);
  return 1 - (costs[s2.length] / maxLength);
}

// Função para calcular pontuação semântica baseada em palavras-chave
function calcularPontuacaoSemantica(str1: string, str2: string): number {
  const palavras1 = str1.toLowerCase().split(/\s+/).filter(p => p.length > 2);
  const palavras2 = str2.toLowerCase().split(/\s+/).filter(p => p.length > 2);
  
  // Remover palavras muito comuns (stop words)
  const stopWords = ['de', 'da', 'do', 'das', 'dos', 'e', 'ou', 'para'];
  const palavrasFiltradas1 = palavras1.filter(p => !stopWords.includes(p));
  const palavrasFiltradas2 = palavras2.filter(p => !stopWords.includes(p));
  
  if (palavrasFiltradas1.length === 0 || palavrasFiltradas2.length === 0) {
    return 0;
  }
  
  // Contar palavras em comum
  let palavrasEmComum = 0;
  for (const palavra1 of palavrasFiltradas1) {
    for (const palavra2 of palavrasFiltradas2) {
      // Match exato
      if (palavra1 === palavra2) {
        palavrasEmComum += 1;
      }
      // Match parcial (uma palavra contém a outra)
      else if (palavra1.includes(palavra2) || palavra2.includes(palavra1)) {
        palavrasEmComum += 0.7;
      }
      // Match fuzzy (similaridade > 70%)
      else if (calcularSimilaridade(palavra1, palavra2) > 0.7) {
        palavrasEmComum += 0.5;
      }
    }
  }
  
  // Normalizar pela média do número de palavras
  const mediaPalavras = (palavrasFiltradas1.length + palavrasFiltradas2.length) / 2;
  return Math.min(1, palavrasEmComum / mediaPalavras);
}

// Função híbrida para encontrar as secretarias mais parecidas (considerando nome e sigla)
function encontrarSecretariasMaisParecidas(
  secretaria: string, 
  secretariasCadastradas: string[], 
  secretariasCadastradasCompletas: Array<{ nome: string; sigla: string }>,
  limite: number = 3
): Array<{ nome: string; similaridade: number }> {
  // Calcular pontuação híbrida para cada secretaria cadastrada
  const similaridades = secretariasCadastradas.map((nomeCompleto, index) => {
    const secretariaCompleta = secretariasCadastradasCompletas[index];
    
    // Similaridade com o nome completo
    const simTextoNome = calcularSimilaridade(secretaria, nomeCompleto);
    const simSemanticaNome = calcularPontuacaoSemantica(secretaria, nomeCompleto);
    const pontuacaoNome = (simTextoNome * 0.6) + (simSemanticaNome * 0.4);
    
    // Similaridade com a sigla (se existir)
    let pontuacaoSigla = 0;
    if (secretariaCompleta.sigla) {
      const simTextoSigla = calcularSimilaridade(secretaria, secretariaCompleta.sigla);
      const simSemanticaSigla = calcularPontuacaoSemantica(secretaria, secretariaCompleta.sigla);
      pontuacaoSigla = (simTextoSigla * 0.6) + (simSemanticaSigla * 0.4);
    }
    
    // Pontuação final: usa a maior entre nome e sigla
    const pontuacaoFinal = Math.max(pontuacaoNome, pontuacaoSigla);
    
    return {
      nome: nomeCompleto,
      similaridade: pontuacaoFinal,
      simNome: pontuacaoNome,
      simSigla: pontuacaoSigla
    };
  });
  
  // Ordenar por pontuação final (maior primeiro)
  similaridades.sort((a, b) => b.similaridade - a.similaridade);
  
  // Filtrar apenas sugestões com similaridade >= 30% (threshold mínimo)
  const sugestoesRelevantes = similaridades.filter(s => s.similaridade >= 0.30);
  
  // Se não houver sugestões relevantes, retornar array vazio
  if (sugestoesRelevantes.length === 0) {
    return [];
  }
  
  // Retornar as top N mais parecidas
  return sugestoesRelevantes.slice(0, limite).map(s => ({
    nome: s.nome,
    similaridade: s.similaridade
  }));
}

export function ImportarExcelModal({ isOpen, onClose }: ImportarExcelModalProps) {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [etapa, setEtapa] = useState<'upload' | 'preview' | 'validacao' | 'mapeamento' | 'sucesso'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [validacao, setValidacao] = useState({
    total: 0,
    validos: 0,
    invalidos: 0,
    duplicados: 0,
    erros: [] as string[]
  });
  const [secretariasNaoEncontradas, setSecretariasNaoEncontradas] = useState<SecretariaNaoEncontrada[]>([]);
  const [contratosDuplicados, setContratosDuplicados] = useState<ContratoDuplicado[]>([]);
  const [mapeamentos, setMapeamentos] = useState<{[key: string]: string}>({});
  const [dadosLidos, setDadosLidos] = useState<any[][]>([]);
  const [linhasParaImportar, setLinhasParaImportar] = useState<any[][]>([]); // TODAS as linhas válidas
  const [ignorarDuplicatas, setIgnorarDuplicatas] = useState(true);
  const [secretariasCadastradasCompletas, setSecretariasCadastradasCompletas] = useState<Array<{ nome: string; sigla: string }>>([]);

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
      console.log('🔄 Buscando contratos existentes para verificar duplicatas...');
      
      // Buscar contratos existentes da API
      let contratosExistentes: any[] = [];
      try {
        const response = await contratosAPI.getAll();
        contratosExistentes = response.success ? response.contratos : [];
        console.log(`✅ ${contratosExistentes.length} contratos existentes carregados`);
      } catch (err) {
        console.warn('⚠️ Não foi possível buscar contratos existentes:', err);
      }
      
      // Buscar secretarias cadastradas da API
      let secretariasCadastradas: string[] = [];
      let secretariasCompletasLocal: Array<{ nome: string; sigla: string }> = [];
      try {
        // Obter token de autenticação do localStorage
        const accessToken = localStorage.getItem('access_token');
        const authHeader = accessToken ? `Bearer ${accessToken}` : `Bearer ${publicAnonKey}`;
        
        console.log('🔄 Buscando secretarias cadastradas...');
        const responseSecretarias = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da/secretarias`, {
          headers: {
            'Authorization': authHeader
          }
        });
        const dataSecretarias = await responseSecretarias.json();
        
        console.log('📊 Resposta da API de secretarias:', dataSecretarias);
        
        if (dataSecretarias.success && dataSecretarias.secretarias) {
          // Armazenar lista completa com nome e sigla
          secretariasCompletasLocal = dataSecretarias.secretarias.map((s: any) => ({
            nome: s.nome,
            sigla: s.sigla || ''
          }));
          setSecretariasCadastradasCompletas(secretariasCompletasLocal);
          
          // Lista de nomes para compatibilidade
          secretariasCadastradas = dataSecretarias.secretarias.map((s: any) => s.nome);
          
          console.log(`✅ ${secretariasCadastradas.length} secretarias cadastradas carregadas:`, secretariasCompletasLocal);
        } else {
          console.warn('⚠️ API não retornou secretarias válidas:', dataSecretarias);
          // Fallback para lista padrão
          secretariasCompletasLocal = [
            { nome: 'CGM - Controladoria Geral', sigla: 'CGM' },
            { nome: 'Secretaria de Educação', sigla: 'SEMED' },
            { nome: 'Secretaria de Saúde', sigla: 'SEMSAU' },
            { nome: 'Secretaria de Obras', sigla: 'SEMOSP' },
            { nome: 'Secretaria de Infraestrutura', sigla: 'SEMI' },
            { nome: 'Secretaria de Meio Ambiente', sigla: 'SEMAMA' },
            { nome: 'Secretaria de Desenvolvimento Sustentável', sigla: 'SEMDES' },
            { nome: 'Secretaria de Desenvolvimento Urbano', sigla: 'SEMDU' }
          ];
          setSecretariasCadastradasCompletas(secretariasCompletasLocal);
          secretariasCadastradas = secretariasCompletasLocal.map(s => s.nome);
          console.log('⚠️ Usando lista padrão de secretarias');
        }
      } catch (err) {
        console.warn('⚠️ Erro ao buscar secretarias:', err);
        // Fallback para lista padrão
        secretariasCompletasLocal = [
          { nome: 'CGM - Controladoria Geral', sigla: 'CGM' },
          { nome: 'Secretaria de Educação', sigla: 'SEMED' },
          { nome: 'Secretaria de Saúde', sigla: 'SEMSAU' },
          { nome: 'Secretaria de Obras', sigla: 'SEMOSP' },
          { nome: 'Secretaria de Infraestrutura', sigla: 'SEMI' },
          { nome: 'Secretaria de Meio Ambiente', sigla: 'SEMAMA' },
          { nome: 'Secretaria de Desenvolvimento Sustentável', sigla: 'SEMDES' },
          { nome: 'Secretaria de Desenvolvimento Urbano', sigla: 'SEMDU' }
        ];
        setSecretariasCadastradasCompletas(secretariasCompletasLocal);
        secretariasCadastradas = secretariasCompletasLocal.map(s => s.nome);
      }
      
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
      const todasLinhasValidas: any[][] = []; // Array temporário para todas as linhas válidas
      
      const erros: string[] = [];
      const secretariasProblema: SecretariaNaoEncontrada[] = [];
      const contratosProblema: ContratoDuplicado[] = [];
      let validos = 0;
      let invalidos = 0;
      let processados = 0;
      
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
        
        // Função para converter número serial do Excel em data DD/MM/AAAA
        const converterDataExcel = (valor: any): string => {
          if (!valor) return '';
          
          const valorStr = String(valor).trim();
          
          // Se já está no formato DD/MM/AAAA, retornar como está
          const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
          if (regexData.test(valorStr)) {
            return valorStr;
          }
          
          // Se é um número (serial do Excel)
          const numeroSerial = Number(valorStr);
          if (!isNaN(numeroSerial) && numeroSerial > 0) {
            try {
              // Converter número serial do Excel para data JavaScript
              // Excel conta dias desde 01/01/1900, JavaScript desde 01/01/1970
              // Diferença: 25569 dias
              // Criar data em UTC para evitar problemas de timezone
              const dataJS = new Date(Date.UTC(1970, 0, 1));
              dataJS.setUTCDate(dataJS.getUTCDate() + (numeroSerial - 25569));
              
              // Verificar se a data é válida
              if (isNaN(dataJS.getTime())) {
                return valorStr; // Retornar valor original se conversão falhar
              }
              
              // Formatar como DD/MM/AAAA usando UTC para evitar problemas de timezone
              const dia = String(dataJS.getUTCDate()).padStart(2, '0');
              const mes = String(dataJS.getUTCMonth() + 1).padStart(2, '0');
              const ano = dataJS.getUTCFullYear();
              
              const dataFormatada = `${dia}/${mes}/${ano}`;
              console.log(`  🔄 Convertido número serial ${numeroSerial} → ${dataFormatada}`);
              return dataFormatada;
            } catch (error) {
              console.warn(`  ⚠️ Erro ao converter data serial ${numeroSerial}:`, error);
              return valorStr;
            }
          }
          
          return valorStr;
        };
        
        // Extrair dados das colunas conforme ordem definida
        // COLUNA A (índice 0): Secretaria
        // COLUNA B (índice 1): Contratado
        // COLUNA C (índice 2): Objeto
        // COLUNA D (índice 3): Data Final da Vigência
        const secretaria = linha[0] ? String(linha[0]).trim() : '';
        const contratado = linha[1] ? String(linha[1]).trim() : '';
        const objeto = linha[2] ? String(linha[2]).trim() : '';
        const dataFinal = converterDataExcel(linha[3]); // Converter data do Excel
        
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
        
        // Verificar se secretaria existe (por nome exato, sigla exata, ou similar)
        if (secretaria) {
          // Verificar match exato de nome
          const matchNomeExato = secretariasCadastradas.includes(secretaria);
          
          // Verificar match exato de sigla
          const matchSiglaExata = secretariasCompletasLocal.find(s => 
            s.sigla && s.sigla.toLowerCase() === secretaria.toLowerCase()
          );
          
          // Se encontrou match exato (nome ou sigla), está OK
          if (!matchNomeExato && !matchSiglaExata) {
            // Não encontrou match exato - gerar sugestões inteligentes
            const sugestoes = encontrarSecretariasMaisParecidas(secretaria, secretariasCadastradas, secretariasCompletasLocal);
            
            const secretariaExistente = secretariasProblema.find(s => s.nomeArquivo === secretaria);
            if (secretariaExistente) {
              secretariaExistente.linhas.push(numeroLinha);
            } else {
              secretariasProblema.push({
                nomeArquivo: secretaria,
                linhas: [numeroLinha],
                sugestoes
              });
            }
            temErro = true;
          } else if (matchSiglaExata) {
            // Se encontrou pela sigla, registrar no console para debug
            console.log(`  ✅ Secretaria encontrada pela sigla: "${secretaria}" → "${matchSiglaExata.nome}"`);
          }
        }
        
        // Verificar se contrato já existe
        if (contratado) {
          const contratoExistente = contratosExistentes.find(c => c.contratado === contratado);
          if (contratoExistente) {
            const contratoProblemaExistente = contratosProblema.find(c => c.numero === contratado);
            if (contratoProblemaExistente) {
              contratoProblemaExistente.linhas.push(numeroLinha);
            } else {
              contratosProblema.push({
                numero: contratado,
                linhas: [numeroLinha],
                contratoExistente
              });
            }
            temErro = true;
          }
        }
        
        if (temErro) {
          invalidos++;
        } else {
          validos++;
          // Adicionar linha válida para importação
          linhasParaImportar.push([secretaria, contratado, objeto, dataFinal]);
          todasLinhasValidas.push([secretaria, contratado, objeto, dataFinal]);
        }
      }
      
      console.log('\n✅ Processamento concluído:');
      console.log('  ├─ Total processados:', processados);
      console.log('  ├─ Válidos:', validos);
      console.log('  ├─ Inválidos:', invalidos);
      console.log('  ├─ Duplicados:', contratosProblema.length);
      console.log('  └─ Erros:', erros.length);
      
      setDadosLidos(dadosParaExibir);
      setLinhasParaImportar(todasLinhasValidas); // Salvar TODAS as linhas válidas
      setSecretariasNaoEncontradas(secretariasProblema);
      setContratosDuplicados(contratosProblema);
      setValidacao({
        total: processados,
        validos,
        invalidos,
        duplicados: contratosProblema.length,
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

  const importarContratos = async () => {
    try {
      console.log('🚀 [IMPORTAÇÃO] Iniciando importação de contratos...');
      console.log('📊 [IMPORTAÇÃO] Total de linhas para importar:', linhasParaImportar.length);
      console.log('📋 [IMPORTAÇÃO] Linhas para importar:', linhasParaImportar);
      
      setEtapa('preview'); // Mostra loading
      
      let contratosImportados = 0;
      let errosImportacao: string[] = [];
      
      // Processar cada linha válida do Excel
      for (let i = 1; i < linhasParaImportar.length + 1; i++) {
        const linha = linhasParaImportar[i - 1];
        if (!linha) continue;
        
        try {
          // Extrair dados
          let secretaria = linha[0] ? String(linha[0]).trim() : '';
          const contratado = linha[1] ? String(linha[1]).trim() : '';
          const objeto = linha[2] ? String(linha[2]).trim() : '';
          const dataFinal = linha[3] ? String(linha[3]).trim() : '';
          
          console.log(`\n📝 [IMPORTAÇÃO] Processando linha ${i}:`, {
            secretaria,
            contratado,
            objeto,
            dataFinal
          });
          
          // Se a secretaria estava no mapeamento, usar o valor mapeado
          if (mapeamentos[secretaria]) {
            console.log(`  🔄 [IMPORTAÇÃO] Secretaria mapeada: "${secretaria}" → "${mapeamentos[secretaria]}"`);
            if (mapeamentos[secretaria] === '__NOVA__') {
              // TODO: Implementar cadastro de nova secretaria
              console.warn(`⚠️ [IMPORTAÇÃO] Cadastro de nova secretaria não implementado: ${secretaria}`);
              errosImportacao.push(`Linha ${i + 1}: Cadastro de nova secretaria não implementado`);
              continue;
            } else {
              secretaria = mapeamentos[secretaria];
            }
          }
          
          // Verificar se encontrou a secretaria pela sigla
          const secretariaEncontrada = secretariasCadastradasCompletas.find(s => 
            s.sigla && s.sigla.toLowerCase() === linha[0]?.toString().trim().toLowerCase()
          );
          
          if (secretariaEncontrada) {
            console.log(`  ✅ [IMPORTAÇÃO] Secretaria encontrada pela sigla: "${linha[0]}" → "${secretariaEncontrada.nome}"`);
            secretaria = secretariaEncontrada.nome;
          }
          
          // Validar campos obrigatórios
          if (!secretaria || !contratado || !objeto || !dataFinal) {
            console.warn(`⚠️ [IMPORTAÇÃO] Linha ${i + 1}: Campos obrigatórios faltando`);
            errosImportacao.push(`Linha ${i + 1}: Campos obrigatórios faltando`);
            continue;
          }
          
          // Criar contrato
          const contratoData = {
            numero: `IMP-${Date.now()}-${i}`, // Número temporário - ajuste conforme necessário
            objeto: objeto,
            contratado: contratado,
            secretaria: secretaria,
            dataInicio: new Date().toISOString().split('T')[0], // Data atual - ajuste conforme necessário
            dataFim: dataFinal.split('/').reverse().join('-'), // Converter DD/MM/AAAA para AAAA-MM-DD
            valor: 0, // Valor padrão - ajuste conforme necessário
            status: 'ativo',
            gestor: '', // Opcional
            fiscal: '' // Opcional
          };
          
          console.log(`📝 [IMPORTAÇÃO] Dados do contrato a ser criado:`, contratoData);
          
          // Salvar no backend
          console.log(`🌐 [IMPORTAÇÃO] Chamando API para criar contrato...`);
          const response = await contratosAPI.create(contratoData);
          
          console.log(`📡 [IMPORTAÇÃO] Resposta da API:`, response);
          
          if (response.success) {
            contratosImportados++;
            console.log(`✅ [IMPORTAÇÃO] Contrato ${i} importado com sucesso!`);
            console.log(`📊 [IMPORTAÇÃO] Total importados até agora: ${contratosImportados}`);
          } else {
            errosImportacao.push(`Linha ${i + 1}: ${response.error || 'Erro desconhecido'}`);
            console.error(`❌ [IMPORTAÇÃO] Erro ao importar contrato ${i}:`, response.error);
          }
          
        } catch (error) {
          errosImportacao.push(`Linha ${i + 1}: ${error.message}`);
          console.error(`❌ [IMPORTAÇÃO] Erro ao processar linha ${i}:`, error);
        }
      }
      
      console.log(`\n✅ [IMPORTAÇÃO] Importação concluída!`);
      console.log(`📊 [IMPORTAÇÃO] Total de contratos importados: ${contratosImportados}/${linhasParaImportar.length}`);
      
      if (errosImportacao.length > 0) {
        console.warn('⚠️ [IMPORTAÇÃO] Erros durante importação:', errosImportacao);
      }
      
      // Atualizar validação com resultado
      setValidacao(prev => ({
        ...prev,
        validos: contratosImportados,
        erros: errosImportacao
      }));
      
      setEtapa('sucesso');
      
      // Recarregar página após 2 segundos para mostrar novos contratos
      console.log('🔄 [IMPORTAÇÃO] Recarregando página em 2 segundos...');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('❌ [IMPORTAÇÃO] Erro fatal durante importação:', error);
      alert('Erro ao importar contratos. Verifique o console para mais detalhes.');
      setEtapa('validacao');
    }
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
                  {validacao.erros.length > 0 && (() => {
                    // Categorizar erros
                    const categoriasErros = {
                      camposVazios: validacao.erros.filter(e => e.includes('não informad')),
                      dataInvalida: validacao.erros.filter(e => e.includes('Data final da vigência inválida')),
                      secretariaNaoEncontrada: validacao.erros.filter(e => e.includes('Secretaria não encontrada')),
                      contratosDuplicados: validacao.erros.filter(e => e.includes('duplicado'))
                    };
                    
                    const totalErros = validacao.erros.length;
                    const [errosExpandidos, setErrosExpandidos] = React.useState(totalErros <= 10);
                    
                    return (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h3 className="text-red-900 font-medium text-sm mb-3 flex items-center gap-2">
                          <AlertCircle className="size-4" />
                          {totalErros} {totalErros === 1 ? 'Erro encontrado' : 'Erros encontrados'}
                        </h3>
                        
                        {/* Resumo por categoria */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {categoriasErros.camposVazios.length > 0 && (
                            <div className="bg-white rounded border border-red-200 p-2">
                              <p className="text-red-600 font-medium text-xs">
                                {categoriasErros.camposVazios.length} campos vazios
                              </p>
                            </div>
                          )}
                          {categoriasErros.dataInvalida.length > 0 && (
                            <div className="bg-white rounded border border-red-200 p-2">
                              <p className="text-red-600 font-medium text-xs">
                                {categoriasErros.dataInvalida.length} datas inválidas
                              </p>
                            </div>
                          )}
                          {categoriasErros.secretariaNaoEncontrada.length > 0 && (
                            <div className="bg-white rounded border border-red-200 p-2">
                              <p className="text-red-600 font-medium text-xs">
                                {categoriasErros.secretariaNaoEncontrada.length} secretarias não encontradas
                              </p>
                            </div>
                          )}
                          {categoriasErros.contratosDuplicados.length > 0 && (
                            <div className="bg-white rounded border border-red-200 p-2">
                              <p className="text-red-600 font-medium text-xs">
                                {categoriasErros.contratosDuplicados.length} contratos duplicados
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Lista de erros */}
                        <div className={`space-y-2 ${!errosExpandidos && totalErros > 10 ? 'max-h-48 overflow-hidden' : ''}`}>
                          <ul className="text-red-800 text-sm space-y-2">
                            {validacao.erros.map((erro, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-red-600 mt-0.5">•</span>
                                <span>{erro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Botão para expandir/colapsar quando há muitos erros */}
                        {totalErros > 10 && (
                          <button
                            onClick={() => setErrosExpandidos(!errosExpandidos)}
                            className="mt-3 text-red-700 text-sm font-medium hover:text-red-800 underline"
                          >
                            {errosExpandidos ? 'Mostrar menos' : `Mostrar todos os ${totalErros} erros`}
                          </button>
                        )}
                      </div>
                    );
                  })()}
                  
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
                    
                    {/* Mostrar sugestões como dica visual (se houver) */}
                    {secretaria.sugestoes.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-900 text-xs font-medium mb-2">
                          💡 Sugestões baseadas em similaridade:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {secretaria.sugestoes.slice(0, 3).map((sugestao, sIdx) => {
                            const confianca = Math.round(sugestao.similaridade * 100);
                            let badgeColor = 'bg-blue-100 text-blue-700';
                            
                            if (confianca >= 70) {
                              badgeColor = 'bg-green-100 text-green-700';
                            } else if (confianca >= 50) {
                              badgeColor = 'bg-amber-100 text-amber-700';
                            }
                            
                            return (
                              <span key={sIdx} className={`px-2 py-1 rounded text-xs font-medium ${badgeColor}`}>
                                {sugestao.nome.split(' - ')[0]} ({confianca}%)
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Dropdown com todas as secretarias */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Selecione a secretaria correspondente:
                      </label>
                      <select
                        value={mapeamentos[`${secretaria.nomeArquivo}`] || ''}
                        onChange={(e) => setMapeamentos({
                          ...mapeamentos,
                          [`${secretaria.nomeArquivo}`]: e.target.value
                        })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[#102a43] text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent"
                      >
                        <option value="">Escolha uma secretaria...</option>
                        
                        {/* Opção de cadastrar nova - em destaque */}
                        <option value="__NOVA__" className="font-medium">
                          ✨ Cadastrar nova secretaria: "{secretaria.nomeArquivo}"
                        </option>
                        
                        <option disabled>────────────────────────</option>
                        
                        {/* Lista de todas as secretarias cadastradas */}
                        {secretariasCadastradasCompletas.map((sec, secIdx) => (
                          <option key={secIdx} value={sec.nome}>
                            {sec.sigla ? `${sec.sigla} - ${sec.nome}` : sec.nome}
                          </option>
                        ))}
                      </select>
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
                  {validacao.erros.length > 0 && (() => {
                    // Categorizar erros
                    const categoriasErros = {
                      camposVazios: validacao.erros.filter(e => e.includes('não informad')),
                      dataInvalida: validacao.erros.filter(e => e.includes('Data final da vigência inválida')),
                      secretariaNaoEncontrada: validacao.erros.filter(e => e.includes('Secretaria não encontrada')),
                      contratosDuplicados: validacao.erros.filter(e => e.includes('duplicado'))
                    };
                    
                    const totalErros = validacao.erros.length;
                    const [errosExpandidos, setErrosExpandidos] = React.useState(totalErros <= 10);
                    
                    return (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-h-60 overflow-y-auto">
                        <h3 className="text-red-900 font-medium text-sm mb-3 flex items-center gap-2">
                          <AlertCircle className="size-4" />
                          {totalErros} {totalErros === 1 ? 'Erro encontrado' : 'Erros encontrados'}
                        </h3>
                        
                        {/* Resumo por categoria */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {categoriasErros.camposVazios.length > 0 && (
                            <div className="bg-white rounded border border-red-200 p-2">
                              <p className="text-red-600 font-medium text-xs">
                                {categoriasErros.camposVazios.length} campos vazios
                              </p>
                            </div>
                          )}
                          {categoriasErros.dataInvalida.length > 0 && (
                            <div className="bg-white rounded border border-red-200 p-2">
                              <p className="text-red-600 font-medium text-xs">
                                {categoriasErros.dataInvalida.length} datas inválidas
                              </p>
                            </div>
                          )}
                          {categoriasErros.secretariaNaoEncontrada.length > 0 && (
                            <div className="bg-white rounded border border-red-200 p-2">
                              <p className="text-red-600 font-medium text-xs">
                                {categoriasErros.secretariaNaoEncontrada.length} secretarias não encontradas
                              </p>
                            </div>
                          )}
                          {categoriasErros.contratosDuplicados.length > 0 && (
                            <div className="bg-white rounded border border-red-200 p-2">
                              <p className="text-red-600 font-medium text-xs">
                                {categoriasErros.contratosDuplicados.length} contratos duplicados
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Lista de erros */}
                        <div className={`space-y-2 ${!errosExpandidos && totalErros > 10 ? 'max-h-48 overflow-hidden' : ''}`}>
                          <ul className="text-red-800 text-sm space-y-2">
                            {validacao.erros.map((erro, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-red-600 mt-0.5">•</span>
                                <span>{erro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Botão para expandir/colapsar quando há muitos erros */}
                        {totalErros > 10 && (
                          <button
                            onClick={() => setErrosExpandidos(!errosExpandidos)}
                            className="mt-3 text-red-700 text-sm font-medium hover:text-red-800 underline"
                          >
                            {errosExpandidos ? 'Mostrar menos' : `Mostrar todos os ${totalErros} erros`}
                          </button>
                        )}
                      </div>
                    );
                  })()}
                  
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
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto mb-6">
                <p className="text-green-900 text-sm">
                  Os contratos já estão disponíveis na listagem e podem ser visualizados e editados normalmente.
                </p>
              </div>
              
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] font-medium inline-flex items-center gap-2"
              >
                Fechar e visualizar contratos
              </button>
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