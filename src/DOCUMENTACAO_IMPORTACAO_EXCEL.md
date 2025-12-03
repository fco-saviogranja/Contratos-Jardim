# 📊 DOCUMENTAÇÃO COMPLETA: IMPORTAÇÃO DE CONTRATOS VIA EXCEL

## 🎯 OBJETIVO
Sistema completo de importação de contratos via planilha Excel (.xlsx/.xls) com validação inteligente, detecção de erros, mapeamento de secretarias e feedback visual detalhado.

---

## 📋 ESTRUTURA DO ARQUIVO EXCEL

### **Colunas Obrigatórias (Ordem Fixa)**

| Coluna | Nome | Tipo | Formato | Obrigatório |
|--------|------|------|---------|-------------|
| **A** | Secretaria | Texto | Nome completo ou sigla | ✅ Sim |
| **B** | Contratado | Texto | Nome da empresa/pessoa | ✅ Sim |
| **C** | Objeto | Texto | Descrição do objeto | ✅ Sim |
| **D** | Data Final da Vigência | Data | DD/MM/AAAA | ✅ Sim |

### **Exemplo de Planilha**

```
| A (Secretaria)          | B (Contratado)      | C (Objeto)                    | D (Data Final) |
|------------------------|---------------------|-------------------------------|----------------|
| Secretaria de Educação | ABC Construções     | Reforma de escola municipal   | 31/12/2024     |
| SEMED                  | XYZ Serviços Ltda   | Manutenção de equipamentos    | 15/06/2025     |
| CGM                    | Tech Solutions      | Licença de software           | 20/08/2025     |
```

---

## 🔧 TECNOLOGIAS E BIBLIOTECAS

### **Frontend**
```typescript
import * as XLSX from 'xlsx'; // Biblioteca para leitura de Excel
import { useState, useEffect } from 'react';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, Download, AlertTriangle } from 'lucide-react';
```

### **Biblioteca XLSX (SheetJS)**
- **Versão:** Latest
- **Uso:** Leitura de arquivos .xlsx e .xls
- **Funções principais:**
  - `XLSX.read(data, { type: 'array' })` - Lê o arquivo
  - `XLSX.utils.sheet_to_json(worksheet, { header: 1 })` - Converte para array

---

## 🎨 ETAPAS DO PROCESSO

### **1. Upload (Etapa Inicial)**

**Interface:**
- Área de drag & drop
- Botão de seleção de arquivo
- Link para download do modelo Excel
- Instruções de preenchimento

**Validações:**
- Aceita apenas `.xlsx` e `.xls`
- Verifica MIME type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- Mostra nome e tamanho do arquivo

**Código:**
```typescript
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
```

---

### **2. Preview (Processamento)**

**O que acontece:**
- Leitura do arquivo Excel
- Validação de todas as linhas
- Detecção de erros
- Verificação de duplicatas
- Busca de secretarias no backend

**Código de Leitura:**
```typescript
const data = await arquivo.arrayBuffer();
const workbook = XLSX.read(data, { type: 'array' });
const sheetName = workbook.SheetNames[0]; // Primeira aba
const worksheet = workbook.Sheets[sheetName];
const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
```

**Processamento de Linhas:**
```typescript
// Ignora linha de cabeçalho (índice 0)
for (let i = 1; i < jsonData.length; i++) {
  const linha = jsonData[i];
  const numeroLinha = i + 1; // Excel começa em 1
  
  // Verifica se linha está vazia
  const linhaVazia = !linha || linha.every(cell => 
    cell === undefined || cell === null || cell === '' || String(cell).trim() === ''
  );
  
  if (linhaVazia) {
    continue; // Pula linhas vazias
  }
  
  // Extrai dados das colunas
  const secretaria = linha[0] ? String(linha[0]).trim() : '';
  const contratado = linha[1] ? String(linha[1]).trim() : '';
  const objeto = linha[2] ? String(linha[2]).trim() : '';
  const dataFinal = converterDataExcel(linha[3]);
}
```

---

### **3. Conversão de Datas Excel**

**Problema:** Excel armazena datas como números seriais (ex: 45292)

**Solução:**
```typescript
const converterDataExcel = (valor: any): string => {
  if (!valor) return '';
  
  const valorStr = String(valor).trim();
  
  // Se já está no formato DD/MM/AAAA, retorna
  const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (regexData.test(valorStr)) {
    return valorStr;
  }
  
  // Se é número serial do Excel
  const numeroSerial = Number(valorStr);
  if (!isNaN(numeroSerial) && numeroSerial > 0) {
    // Excel conta dias desde 01/01/1900
    // JavaScript desde 01/01/1970
    // Diferença: 25569 dias
    const dataJS = new Date(Date.UTC(1970, 0, 1));
    dataJS.setUTCDate(dataJS.getUTCDate() + (numeroSerial - 25569));
    
    const dia = String(dataJS.getUTCDate()).padStart(2, '0');
    const mes = String(dataJS.getUTCMonth() + 1).padStart(2, '0');
    const ano = dataJS.getUTCFullYear();
    
    return `${dia}/${mes}/${ano}`;
  }
  
  return valorStr;
};
```

---

### **4. Validações Implementadas**

#### **4.1 Campos Obrigatórios**
```typescript
// Validar secretaria
if (!secretaria) {
  erros.push(`Linha ${numeroLinha}: Secretaria não informada (Coluna A)`);
  temErro = true;
}

// Validar contratado
if (!contratado) {
  erros.push(`Linha ${numeroLinha}: Contratado não informado (Coluna B)`);
  temErro = true;
}

// Validar objeto
if (!objeto) {
  erros.push(`Linha ${numeroLinha}: Objeto não informado (Coluna C)`);
  temErro = true;
}

// Validar data
if (!dataFinal) {
  erros.push(`Linha ${numeroLinha}: Data final da vigência não informada (Coluna D)`);
  temErro = true;
}
```

#### **4.2 Formato de Data**
```typescript
const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
if (!regexData.test(dataFinal)) {
  erros.push(`Linha ${numeroLinha}: Data inválida (formato esperado: DD/MM/AAAA)`);
  temErro = true;
}
```

#### **4.3 Verificação de Secretarias**

**Busca por:**
1. **Nome exato:** "Secretaria de Educação"
2. **Sigla exata:** "SEMED", "CGM", etc.
3. **Similaridade:** Algoritmo fuzzy matching

```typescript
// Match exato de nome
const matchNomeExato = secretariasCadastradas.includes(secretaria);

// Match exato de sigla
const matchSiglaExata = secretariasCompletasLocal.find(s => 
  s.sigla && s.sigla.toLowerCase() === secretaria.toLowerCase()
);

// Se não encontrou, busca similares
if (!matchNomeExato && !matchSiglaExata) {
  const sugestoes = encontrarSecretariasMaisParecidas(
    secretaria, 
    secretariasCadastradas, 
    secretariasCompletasLocal
  );
}
```

#### **4.4 Detecção de Duplicatas**
```typescript
// Busca contratos existentes no backend
const response = await contratosAPI.getAll();
const contratosExistentes = response.success ? response.contratos : [];

// Verifica duplicata pelo nome do contratado
const contratoExistente = contratosExistentes.find(c => 
  c.contratado === contratado
);

if (contratoExistente) {
  contratosProblema.push({
    numero: contratado,
    linhas: [numeroLinha],
    contratoExistente
  });
}
```

---

### **5. Algoritmo de Similaridade (Fuzzy Matching)**

**Algoritmo Levenshtein Distance + Análise Semântica**

```typescript
// 1. Similaridade de texto (Levenshtein)
function calcularSimilaridade(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  // Calcula distância de edição
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
    if (i > 0) costs[s2.length] = lastValue;
  }
  
  // Normaliza (0 a 1, onde 1 = idêntico)
  const maxLength = Math.max(s1.length, s2.length);
  return 1 - (costs[s2.length] / maxLength);
}

// 2. Análise semântica (palavras em comum)
function calcularPontuacaoSemantica(str1: string, str2: string): number {
  const palavras1 = str1.toLowerCase().split(/\s+/).filter(p => p.length > 2);
  const palavras2 = str2.toLowerCase().split(/\s+/).filter(p => p.length > 2);
  
  // Remove stop words
  const stopWords = ['de', 'da', 'do', 'das', 'dos', 'e', 'ou', 'para'];
  const palavrasFiltradas1 = palavras1.filter(p => !stopWords.includes(p));
  const palavrasFiltradas2 = palavras2.filter(p => !stopWords.includes(p));
  
  // Conta palavras em comum
  let palavrasEmComum = 0;
  for (const palavra1 of palavrasFiltradas1) {
    for (const palavra2 of palavrasFiltradas2) {
      if (palavra1 === palavra2) {
        palavrasEmComum += 1; // Match exato
      } else if (palavra1.includes(palavra2) || palavra2.includes(palavra1)) {
        palavrasEmComum += 0.7; // Match parcial
      } else if (calcularSimilaridade(palavra1, palavra2) > 0.7) {
        palavrasEmComum += 0.5; // Match fuzzy
      }
    }
  }
  
  const mediaPalavras = (palavrasFiltradas1.length + palavrasFiltradas2.length) / 2;
  return Math.min(1, palavrasEmComum / mediaPalavras);
}

// 3. Pontuação híbrida (nome + sigla)
function encontrarSecretariasMaisParecidas(
  secretaria: string, 
  secretariasCadastradas: string[], 
  secretariasCompletas: Array<{ nome: string; sigla: string }>,
  limite: number = 3
): Array<{ nome: string; similaridade: number }> {
  
  const similaridades = secretariasCadastradas.map((nomeCompleto, index) => {
    const secretariaCompleta = secretariasCompletas[index];
    
    // Similaridade com nome
    const simTextoNome = calcularSimilaridade(secretaria, nomeCompleto);
    const simSemanticaNome = calcularPontuacaoSemantica(secretaria, nomeCompleto);
    const pontuacaoNome = (simTextoNome * 0.6) + (simSemanticaNome * 0.4);
    
    // Similaridade com sigla
    let pontuacaoSigla = 0;
    if (secretariaCompleta.sigla) {
      const simTextoSigla = calcularSimilaridade(secretaria, secretariaCompleta.sigla);
      const simSemanticaSigla = calcularPontuacaoSemantica(secretaria, secretariaCompleta.sigla);
      pontuacaoSigla = (simTextoSigla * 0.6) + (simSemanticaSigla * 0.4);
    }
    
    // Usa a maior pontuação
    const pontuacaoFinal = Math.max(pontuacaoNome, pontuacaoSigla);
    
    return {
      nome: nomeCompleto,
      similaridade: pontuacaoFinal
    };
  });
  
  // Ordena por similaridade (maior primeiro)
  similaridades.sort((a, b) => b.similaridade - a.similaridade);
  
  // Filtra apenas >= 30% de similaridade
  const sugestoesRelevantes = similaridades.filter(s => s.similaridade >= 0.30);
  
  // Retorna top 3
  return sugestoesRelevantes.slice(0, limite);
}
```

**Parâmetros do Algoritmo:**
- **Threshold mínimo:** 30% de similaridade
- **Peso texto:** 60%
- **Peso semântica:** 40%
- **Match exato:** 1.0 ponto
- **Match parcial:** 0.7 pontos
- **Match fuzzy:** 0.5 pontos

---

### **6. Etapa de Mapeamento**

**Quando ocorre:**
- Quando secretarias não são encontradas (nem por nome, nem por sigla)

**Interface:**
- Lista de secretarias não encontradas
- Linhas onde aparecem
- Top 3 sugestões com % de similaridade
- Dropdown para selecionar secretaria correta
- Opção "Cadastrar nova secretaria"

**Código:**
```typescript
interface SecretariaNaoEncontrada {
  nomeArquivo: string;        // Nome digitado no Excel
  linhas: number[];            // Linhas onde aparece
  sugestoes: Array<{          // Sugestões inteligentes
    nome: string;
    similaridade: number;
  }>;
}

const [mapeamentos, setMapeamentos] = useState<{[key: string]: string}>({});

// Aplicar mapeamento
const handleMapeamento = (nomeArquivo: string, secretariaSelecionada: string) => {
  setMapeamentos(prev => ({
    ...prev,
    [nomeArquivo]: secretariaSelecionada
  }));
};
```

---

### **7. Etapa de Validação (Revisão Final)**

**Exibe:**
- Total de registros
- Registros válidos
- Registros com erros
- Contratos duplicados (checkbox para ignorar)
- Lista categorizada de erros:
  - Campos vazios
  - Datas inválidas
  - Secretarias não encontradas
  - Contratos duplicados

**Interface:**
```typescript
<div className="grid grid-cols-3 gap-4">
  <div className="bg-blue-50 rounded-lg p-4 text-center">
    <p className="text-blue-600 text-2xl">{validacao.total}</p>
    <p className="text-blue-900 text-sm">Total de registros</p>
  </div>
  <div className="bg-green-50 rounded-lg p-4 text-center">
    <p className="text-green-600 text-2xl">{validacao.validos}</p>
    <p className="text-green-900 text-sm">Registros válidos</p>
  </div>
  <div className="bg-red-50 rounded-lg p-4 text-center">
    <p className="text-red-600 text-2xl">{validacao.invalidos}</p>
    <p className="text-red-900 text-sm">Com erros</p>
  </div>
</div>
```

---

### **8. Importação Final**

**Processo:**
```typescript
const importarContratos = async () => {
  for (let i = 0; i < linhasParaImportar.length; i++) {
    const linha = linhasParaImportar[i];
    
    // Extrair dados
    let secretaria = linha[0];
    const contratado = linha[1];
    const objeto = linha[2];
    const dataFinal = linha[3];
    
    // Aplicar mapeamento se existir
    if (mapeamentos[secretaria]) {
      secretaria = mapeamentos[secretaria];
    }
    
    // Verificar sigla
    const secretariaEncontrada = secretariasCompletas.find(s => 
      s.sigla?.toLowerCase() === linha[0]?.toLowerCase()
    );
    if (secretariaEncontrada) {
      secretaria = secretariaEncontrada.nome;
    }
    
    // Criar contrato
    const contratoData = {
      numero: `IMP-${Date.now()}-${i}`,
      objeto: objeto,
      contratado: contratado,
      secretaria: secretaria,
      dataInicio: new Date().toISOString().split('T')[0],
      dataFim: dataFinal.split('/').reverse().join('-'), // DD/MM/AAAA → AAAA-MM-DD
      valor: 0,
      status: 'ativo',
      gestor: '',
      fiscal: ''
    };
    
    // Salvar no backend
    const response = await contratosAPI.create(contratoData);
    
    if (response.success) {
      contratosImportados++;
    } else {
      errosImportacao.push(`Linha ${i + 1}: ${response.error}`);
    }
  }
  
  // Recarregar página
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};
```

---

### **9. Etapa de Sucesso**

**Exibe:**
- Ícone de sucesso
- Número de contratos importados
- Mensagem de confirmação
- Recarregamento automático em 2 segundos

---

## 📊 ESTADOS DO COMPONENTE

```typescript
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
const [linhasParaImportar, setLinhasParaImportar] = useState<any[][]>([]);
const [ignorarDuplicatas, setIgnorarDuplicatas] = useState(true);
const [secretariasCadastradasCompletas, setSecretariasCadastradasCompletas] = useState<Array<{ nome: string; sigla: string }>>([]);
```

---

## 🔄 FLUXO COMPLETO

```
1. UPLOAD
   ↓
2. PREVIEW (Auto)
   ├─ Ler Excel
   ├─ Buscar secretarias do backend
   ├─ Buscar contratos existentes
   ├─ Validar cada linha
   └─ Converter datas
   ↓
3. MAPEAMENTO (Se houver secretarias não encontradas)
   ├─ Mostrar sugestões inteligentes
   ├─ Usuário mapeia secretarias
   └─ Salva mapeamentos
   ↓
4. VALIDAÇÃO (Revisão final)
   ├─ Mostra resumo
   ├─ Lista erros categorizados
   ├─ Opção de ignorar duplicatas
   └─ Confirma importação
   ↓
5. IMPORTAÇÃO
   ├─ Processa cada linha válida
   ├─ Aplica mapeamentos
   ├─ Cria contratos via API
   └─ Conta sucessos/erros
   ↓
6. SUCESSO
   ├─ Mostra total importado
   └─ Recarrega página (2s)
```

---

## 🎨 COMPONENTES VISUAIS

### **Cards de Resumo**
```typescript
<div className="bg-blue-50 rounded-lg p-4 text-center">
  <p className="text-blue-600 text-2xl font-medium">{total}</p>
  <p className="text-blue-900 text-sm">Total de registros</p>
</div>
```

### **Lista de Erros Categorizados**
```typescript
const categoriasErros = {
  camposVazios: erros.filter(e => e.includes('não informad')),
  dataInvalida: erros.filter(e => e.includes('inválida')),
  secretariaNaoEncontrada: erros.filter(e => e.includes('não encontrada')),
  contratosDuplicados: erros.filter(e => e.includes('duplicado'))
};
```

### **Sugestões de Secretarias**
```typescript
<div className="space-y-2">
  {sugestoes.map((sugestao, idx) => (
    <button
      key={idx}
      className="w-full text-left px-3 py-2 border rounded hover:bg-blue-50"
    >
      <span>{sugestao.nome}</span>
      <span className="text-sm text-gray-500">
        {(sugestao.similaridade * 100).toFixed(0)}% similar
      </span>
    </button>
  ))}
</div>
```

---

## 🚨 TRATAMENTO DE ERROS

### **Erros Capturados:**
1. ✅ Arquivo não é Excel
2. ✅ Campos obrigatórios vazios
3. ✅ Data em formato inválido
4. ✅ Secretaria não encontrada
5. ✅ Contrato duplicado
6. ✅ Linhas vazias (ignoradas automaticamente)
7. ✅ Erro ao salvar no backend

### **Feedback ao Usuário:**
- Mensagens específicas por linha
- Categorização visual de erros
- Sugestões inteligentes
- Opção de continuar ignorando problemas

---

## 📝 EXEMPLO DE INTEGRAÇÃO

```typescript
import { ImportarExcelModal } from './components/ImportarExcelModal';

function TodosContratos() {
  const [showImportModal, setShowImportModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowImportModal(true)}>
        Importar Excel
      </button>
      
      <ImportarExcelModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
      />
    </>
  );
}
```

---

## 🔑 PONTOS-CHAVE PARA REPLICAÇÃO

### **1. Instalação da Biblioteca**
```bash
npm install xlsx
```

### **2. Estrutura de Dados**
- **Entrada:** Array bidimensional `any[][]`
- **Saída:** Objetos de contrato validados

### **3. Validação em Camadas**
1. Formato de arquivo
2. Campos obrigatórios
3. Formato de dados (datas)
4. Existência de relacionamentos (secretarias)
5. Duplicatas

### **4. Conversão de Datas**
- Excel usa números seriais
- Fórmula: `(numeroSerial - 25569)` dias desde 01/01/1970
- Sempre usar UTC para evitar timezone

### **5. Fuzzy Matching**
- Levenshtein Distance (60%)
- Análise semântica (40%)
- Threshold: 30%
- Top 3 sugestões

### **6. Mapeamento Interativo**
- Interface dropdown
- Salva escolhas do usuário
- Aplica durante importação

### **7. Feedback Visual**
- 6 etapas claramente definidas
- Cards com números grandes
- Cores semânticas (verde/vermelho/azul)
- Animações de loading

---

## 📌 CONFIGURAÇÕES IMPORTANTES

### **Ordem das Colunas (FIXO)**
```typescript
const COLUNAS = {
  SECRETARIA: 0,    // Coluna A
  CONTRATADO: 1,    // Coluna B
  OBJETO: 2,        // Coluna C
  DATA_FINAL: 3     // Coluna D
};
```

### **Formatos Aceitos**
```typescript
const FORMATOS_ACEITOS = ['.xlsx', '.xls'];
const MIME_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel'
];
```

### **Parâmetros de Validação**
```typescript
const VALIDACAO = {
  FORMATO_DATA: /^(\d{2})\/(\d{2})\/(\d{4})$/, // DD/MM/AAAA
  SIMILARIDADE_MINIMA: 0.30,                     // 30%
  PESO_TEXTO: 0.6,                               // 60%
  PESO_SEMANTICA: 0.4,                           // 40%
  MAX_SUGESTOES: 3                               // Top 3
};
```

---

## ✅ CHECKLIST PARA IMPLEMENTAÇÃO

- [ ] Instalar biblioteca `xlsx`
- [ ] Criar componente modal
- [ ] Implementar drag & drop
- [ ] Validar formato de arquivo
- [ ] Ler Excel com XLSX.read()
- [ ] Converter array bidimensional
- [ ] Implementar conversão de datas
- [ ] Criar algoritmo Levenshtein
- [ ] Criar análise semântica
- [ ] Implementar fuzzy matching
- [ ] Buscar secretarias do backend
- [ ] Buscar contratos existentes
- [ ] Validar campos obrigatórios
- [ ] Validar formato de datas
- [ ] Detectar secretarias não encontradas
- [ ] Detectar duplicatas
- [ ] Criar interface de mapeamento
- [ ] Categorizar erros
- [ ] Criar interface de validação
- [ ] Implementar importação com API
- [ ] Aplicar mapeamentos
- [ ] Converter datas para backend
- [ ] Tratar erros de importação
- [ ] Exibir sucesso
- [ ] Recarregar página

---

## 🎯 RESULTADO FINAL

Um sistema completo, robusto e inteligente que:
- ✅ Lê arquivos Excel complexos
- ✅ Converte datas automaticamente
- ✅ Detecta erros em tempo real
- ✅ Sugere correções inteligentes
- ✅ Mapeia secretarias automaticamente
- ✅ Valida duplicatas
- ✅ Fornece feedback visual rico
- ✅ Importa em lote com tratamento de erros
- ✅ Experiência de usuário profissional

**Total de linhas de código:** ~1200 linhas
**Complexidade:** Alta
**Tempo estimado de implementação:** 3-5 dias
