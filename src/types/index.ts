export type UserRole = 'admin' | 'gestor' | 'fiscal';

export interface User {
  id: string;
  nome: string;
  email: string;
  perfil: UserRole;
  secretaria: string;
  situacao: 'ativo' | 'inativo';
  ultimoAcesso?: string;
  fotoPerfil?: string; // URL da foto de perfil no Supabase Storage
}

export type SituacaoContrato = 'vigente' | 'proximo_vencimento' | 'vencido';

export interface Contrato {
  id: string;
  numero: string;
  secretaria: string;
  contratado: string;
  objeto: string;
  valor: number;
  dataInicio: string;
  dataFinal: string;
  situacao: SituacaoContrato;
  gestor: string;
  fiscal?: string;
  documentosPendentes?: boolean;
}

export type TipoAlerta = 
  | 'vencimento_prazo' 
  | 'pendencia_documental' 
  | 'sem_fiscal' 
  | 'valor_ultrapassado';

export interface Alerta {
  id: string;
  tipo: TipoAlerta;
  contratoId: string;
  contrato: string;
  secretaria: string;
  diasRestantes?: number;
  mensagem: string;
  situacao: 'pendente' | 'em_tratativa' | 'concluido';
  dataCriacao: string;
}

export interface AcaoRecente {
  id: string;
  tipo: string;
  contratoId: string;
  descricao: string;
  data: string;
}