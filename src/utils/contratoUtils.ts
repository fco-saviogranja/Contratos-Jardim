// Parâmetros de alerta (sincronizados com AlertasPrazos.tsx)
export const PARAMETROS_ALERTA = {
  diasAlertaCritico: 7,
  diasAlertaNormal: 30,
  diasAlertaMaximo: 90 // Faixa máxima para considerar "próximo ao vencimento"
};

// Função para calcular dias até o vencimento
export const calcularDiasRestantes = (dataFinal: string): number => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const vencimento = new Date(dataFinal);
  vencimento.setHours(0, 0, 0, 0);
  const diff = vencimento.getTime() - hoje.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// Função para obter a situação atual do contrato baseada na data de vencimento
export const getSituacaoAtual = (dataFinal: string): string => {
  const diasRestantes = calcularDiasRestantes(dataFinal);
  
  if (diasRestantes < 0) {
    return 'Vencido';
  }
  
  if (diasRestantes <= PARAMETROS_ALERTA.diasAlertaMaximo) {
    return 'Próximo ao vencimento';
  }
  
  return 'Vigente';
};

// Função para normalizar a situação para o formato do filtro
export const normalizarSituacao = (situacao: string): string => {
  const situacaoLower = situacao.toLowerCase().trim();
  
  if (situacaoLower === 'vencido') return 'vencido';
  if (situacaoLower === 'próximo ao vencimento' || situacaoLower === 'proximo_vencimento' || situacaoLower.includes('próximo')) return 'proximo_vencimento';
  if (situacaoLower === 'vigente' || situacaoLower === 'ativo') return 'vigente';
  
  return situacaoLower;
};

// Função para verificar se o contrato corresponde ao filtro de situação
export const correspondeAoFiltroSituacao = (dataFinal: string, filtroSituacao: string): boolean => {
  const situacaoAtual = getSituacaoAtual(dataFinal);
  const situacaoNormalizada = normalizarSituacao(situacaoAtual);
  
  return situacaoNormalizada === filtroSituacao;
};

// Função para obter a classe CSS do badge de situação
export const getSituacaoBadgeClass = (situacao: string): string => {
  const situacaoLower = situacao.toLowerCase();
  
  if (situacaoLower === 'vencido') {
    return 'bg-red-100 text-red-700';
  }
  
  if (situacaoLower === 'próximo ao vencimento' || situacaoLower.includes('próximo')) {
    return 'bg-orange-100 text-orange-700';
  }
  
  if (situacaoLower === 'vigente') {
    return 'bg-green-100 text-green-700';
  }
  
  // Fallback para situações customizadas
  return 'bg-gray-100 text-gray-700';
};

// Função para obter o nível de criticidade do contrato
export const getNivelCriticidade = (dataFinal: string): 'critico' | 'atencao' | 'normal' | 'vencido' => {
  const diasRestantes = calcularDiasRestantes(dataFinal);
  
  if (diasRestantes < 0) {
    return 'vencido';
  }
  
  if (diasRestantes <= PARAMETROS_ALERTA.diasAlertaCritico) {
    return 'critico';
  }
  
  if (diasRestantes <= PARAMETROS_ALERTA.diasAlertaNormal) {
    return 'atencao';
  }
  
  if (diasRestantes <= PARAMETROS_ALERTA.diasAlertaMaximo) {
    return 'normal';
  }
  
  return 'normal';
};

// Função para formatar a situação para exibição
export const formatarSituacao = (dataFinal: string): { texto: string; dias: number; criticidade: string } => {
  const diasRestantes = calcularDiasRestantes(dataFinal);
  const situacao = getSituacaoAtual(dataFinal);
  const criticidade = getNivelCriticidade(dataFinal);
  
  let texto = situacao;
  
  if (situacao === 'Vencido') {
    const diasVencido = Math.abs(diasRestantes);
    texto = `Vencido há ${diasVencido} dia${diasVencido !== 1 ? 's' : ''}`;
  } else if (situacao === 'Próximo ao vencimento') {
    texto = `Vence em ${diasRestantes} dia${diasRestantes !== 1 ? 's' : ''}`;
  }
  
  return {
    texto,
    dias: diasRestantes,
    criticidade
  };
};