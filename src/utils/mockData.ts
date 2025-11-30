// Mock data para desenvolvimento offline (quando Edge Function não está deployada)

export const MOCK_USERS = [
  {
    id: 'admin-001',
    email: 'controleinterno@jardim.ce.gov.br',
    nome: 'Administrador CGM',
    perfil: 'admin',
    secretaria: 'CGM - Controladoria Geral do Município',
    situacao: 'ativo',
    criadoEm: '2024-01-15T10:00:00Z',
    ultimoAcesso: new Date().toISOString()
  },
  {
    id: 'gestor-001',
    email: 'gestor.educacao@jardim.ce.gov.br',
    nome: 'Maria Silva',
    perfil: 'gestor',
    secretaria: 'Secretaria Municipal de Educação',
    situacao: 'ativo',
    criadoEm: '2024-02-10T09:30:00Z',
    ultimoAcesso: '2024-11-25T14:22:00Z'
  },
  {
    id: 'fiscal-001',
    email: 'fiscal.obras@jardim.ce.gov.br',
    nome: 'João Santos',
    perfil: 'fiscal',
    secretaria: 'Secretaria Municipal de Obras e Serviços Públicos',
    situacao: 'ativo',
    criadoEm: '2024-03-05T11:15:00Z',
    ultimoAcesso: '2024-11-24T16:45:00Z'
  }
];

export const MOCK_SECRETARIAS = [
  { id: '1', nome: 'Secretaria Municipal de Administração e Finanças', sigla: 'SEMAF', responsavel: 'Carlos Mendes', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
  { id: '2', nome: 'Secretaria Municipal de Educação', sigla: 'SEMED', responsavel: 'Ana Paula Costa', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
  { id: '3', nome: 'Secretaria Municipal de Saúde', sigla: 'SEMSAU', responsavel: 'Dr. Roberto Lima', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
  { id: '4', nome: 'Secretaria Municipal de Obras e Serviços Públicos', sigla: 'SEMOSP', responsavel: 'Eng. Pedro Oliveira', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
  { id: '5', nome: 'Secretaria Municipal de Agricultura e Meio Ambiente', sigla: 'SEMAMA', responsavel: 'Fernanda Rocha', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
  { id: '6', nome: 'Secretaria Municipal de Assistência Social', sigla: 'SEMAS', responsavel: 'Juliana Martins', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
  { id: '7', nome: 'Secretaria Municipal de Esporte e Juventude', sigla: 'SEMEJ', responsavel: 'Rafael Santos', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
  { id: '8', nome: 'Secretaria Municipal de Cultura e Turismo', sigla: 'SEMCULT', responsavel: 'Beatriz Alves', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
  { id: '9', nome: 'Controladoria Geral do Município', sigla: 'CGM', responsavel: 'Administrador CGM', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
  { id: '10', nome: 'Procuradoria Geral do Município', sigla: 'PGM', responsavel: 'Dr. Marcos Ferreira', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' }
];

export const MOCK_CONTRATOS = [
  {
    id: 'contrato-001',
    numero: '001/2024',
    objeto: 'Contratação de empresa para fornecimento de material escolar para a rede municipal de ensino',
    contratada: 'Papelaria e Distribuidora Escolar Ltda',
    cnpj: '12.345.678/0001-90',
    valor: 250000.00,
    dataAssinatura: '2024-01-15',
    dataInicio: '2024-02-01',
    dataTermino: '2025-01-31',
    prazoVigencia: 12,
    status: 'vigente',
    secretaria: 'Secretaria Municipal de Educação',
    gestorContrato: 'Maria Silva',
    fiscalContrato: 'João Santos',
    observacoes: 'Contrato com renovação automática por mais 12 meses',
    documentos: [],
    criadoEm: '2024-01-10T10:30:00Z',
    criadoPor: 'gestor-001',
    atualizadoEm: '2024-01-15T14:20:00Z'
  },
  {
    id: 'contrato-002',
    numero: '002/2024',
    objeto: 'Prestação de serviços de manutenção preventiva e corretiva da frota municipal',
    contratada: 'Auto Mecânica Jardim Ltda',
    cnpj: '98.765.432/0001-10',
    valor: 180000.00,
    dataAssinatura: '2024-02-20',
    dataInicio: '2024-03-01',
    dataTermino: '2024-12-31',
    prazoVigencia: 10,
    status: 'vigente',
    secretaria: 'Secretaria Municipal de Administração e Finanças',
    gestorContrato: 'Carlos Mendes',
    fiscalContrato: 'João Santos',
    observacoes: 'Atende todos os veículos da prefeitura',
    documentos: [],
    criadoEm: '2024-02-15T09:00:00Z',
    criadoPor: 'gestor-001',
    atualizadoEm: '2024-02-20T11:30:00Z'
  },
  {
    id: 'contrato-003',
    numero: '003/2024',
    objeto: 'Aquisição de medicamentos para as Unidades Básicas de Saúde',
    contratada: 'Farmacêutica Saúde Total S/A',
    cnpj: '11.222.333/0001-44',
    valor: 450000.00,
    dataAssinatura: '2024-03-10',
    dataInicio: '2024-04-01',
    dataTermino: '2025-03-31',
    prazoVigencia: 12,
    status: 'vigente',
    secretaria: 'Secretaria Municipal de Saúde',
    gestorContrato: 'Dr. Roberto Lima',
    fiscalContrato: 'Enf. Sandra Costa',
    observacoes: 'Fornecimento mensal conforme demanda',
    documentos: [],
    criadoEm: '2024-03-05T08:15:00Z',
    criadoPor: 'admin-001',
    atualizadoEm: '2024-03-10T16:00:00Z'
  },
  {
    id: 'contrato-004',
    numero: '015/2023',
    objeto: 'Serviços de limpeza e conservação dos prédios públicos municipais',
    contratada: 'Limpeza Urbana Jardim Ltda',
    cnpj: '55.666.777/0001-88',
    valor: 320000.00,
    dataAssinatura: '2023-11-15',
    dataInicio: '2023-12-01',
    dataTermino: '2024-12-15',
    prazoVigencia: 12,
    status: 'proximo_vencer',
    secretaria: 'Secretaria Municipal de Administração e Finanças',
    gestorContrato: 'Carlos Mendes',
    fiscalContrato: 'João Santos',
    observacoes: 'Vence em breve - iniciar processo de renovação',
    documentos: [],
    criadoEm: '2023-11-10T10:00:00Z',
    criadoPor: 'admin-001',
    atualizadoEm: '2023-11-15T14:30:00Z'
  }
];

export const MOCK_SOLICITACOES = [
  {
    id: 'sol-001',
    nome: 'Pedro Oliveira',
    email: 'pedro.oliveira@jardim.ce.gov.br',
    cargo: 'Coordenador de Contratos',
    setor: 'Secretaria Municipal de Obras e Serviços Públicos',
    senha: 'Senha123!',
    justificativa: 'Necessito de acesso ao sistema para gerenciar os contratos da Secretaria de Obras',
    status: 'pendente',
    criadoEm: '2024-11-20T09:30:00Z',
    analisadoEm: null,
    analisadoPor: null,
    observacoes: null
  },
  {
    id: 'sol-002',
    nome: 'Ana Carolina Santos',
    email: 'ana.santos@jardim.ce.gov.br',
    cargo: 'Fiscal de Contratos',
    setor: 'Secretaria Municipal de Saúde',
    senha: 'SenhaSegura456!',
    justificativa: 'Preciso fiscalizar os contratos de medicamentos e serviços de saúde',
    status: 'pendente',
    criadoEm: '2024-11-22T14:15:00Z',
    analisadoEm: null,
    analisadoPor: null,
    observacoes: null
  },
  {
    id: 'sol-003',
    nome: 'Ricardo Ferreira',
    email: 'ricardo.ferreira@jardim.ce.gov.br',
    cargo: 'Assistente Administrativo',
    setor: 'Secretaria Municipal de Educação',
    senha: 'Admin789!',
    justificativa: 'Auxiliar no gerenciamento de contratos de merenda escolar',
    status: 'aprovada',
    criadoEm: '2024-11-18T11:00:00Z',
    analisadoEm: '2024-11-19T10:30:00Z',
    analisadoPor: 'admin-001',
    observacoes: 'Aprovado com perfil de Fiscal',
    usuarioCriadoId: 'fiscal-002'
  },
  {
    id: 'sol-004',
    nome: 'Mariana Costa',
    email: 'mariana.costa.externa@gmail.com',
    cargo: 'Consultora',
    setor: 'Empresa Externa',
    senha: 'Externa123!',
    justificativa: 'Trabalho como consultora e preciso de acesso temporário',
    status: 'rejeitada',
    criadoEm: '2024-11-21T16:45:00Z',
    analisadoEm: '2024-11-22T09:00:00Z',
    analisadoPor: 'admin-001',
    observacoes: 'Solicitação rejeitada - apenas servidores municipais podem ter acesso ao sistema'
  }
];

export const MOCK_ALERTAS = [
  {
    id: 'alerta-001',
    tipo: 'vencimento',
    prioridade: 'critica',
    contratoId: 'contrato-004',
    titulo: 'Contrato próximo ao vencimento',
    mensagem: 'O contrato 015/2023 vence em 15 dias',
    status: 'nao_lido',
    dataVencimento: '2024-12-15',
    destinatarios: ['admin-001', 'gestor-001'],
    criadoEm: '2024-11-25T08:00:00Z'
  },
  {
    id: 'alerta-002',
    tipo: 'prazo',
    prioridade: 'alta',
    contratoId: 'contrato-002',
    titulo: 'Prazo de renovação se aproxima',
    mensagem: 'O contrato 002/2024 pode ser renovado a partir de 30 dias antes do vencimento',
    status: 'nao_lido',
    dataVencimento: '2024-12-31',
    destinatarios: ['admin-001'],
    criadoEm: '2024-11-24T10:00:00Z'
  },
  {
    id: 'alerta-003',
    tipo: 'documento',
    prioridade: 'media',
    contratoId: 'contrato-001',
    titulo: 'Documento pendente',
    mensagem: 'Falta anexar certidões atualizadas da contratada',
    status: 'lido',
    dataVencimento: null,
    destinatarios: ['gestor-001', 'fiscal-001'],
    criadoEm: '2024-11-20T14:30:00Z'
  }
];

// Função para obter dados mock do localStorage com fallback
export function getMockData<T>(key: string, defaultData: T[]): T[] {
  try {
    const stored = localStorage.getItem(`mock_${key}`);
    if (stored) {
      return JSON.parse(stored);
    }
    // Se não existir, salvar os dados padrão
    localStorage.setItem(`mock_${key}`, JSON.stringify(defaultData));
    return defaultData;
  } catch (error) {
    console.error(`Erro ao carregar mock data para ${key}:`, error);
    return defaultData;
  }
}

// Função para salvar dados mock no localStorage
export function saveMockData<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(`mock_${key}`, JSON.stringify(data));
  } catch (error) {
    console.error(`Erro ao salvar mock data para ${key}:`, error);
  }
}

// Inicializar dados mock no localStorage se não existirem
export function initializeMockData(): void {
  getMockData('users', MOCK_USERS);
  getMockData('secretarias', MOCK_SECRETARIAS);
  getMockData('contratos', MOCK_CONTRATOS);
  getMockData('solicitacoes', MOCK_SOLICITACOES);
  getMockData('alertas', MOCK_ALERTAS);
}

// Verificar se está em modo mock
export function isOfflineMode(): boolean {
  return localStorage.getItem('offline_mode') === 'true';
}

// Ativar/desativar modo offline
export function setOfflineMode(enabled: boolean): void {
  localStorage.setItem('offline_mode', enabled ? 'true' : 'false');
  if (enabled) {
    initializeMockData();
  }
}
