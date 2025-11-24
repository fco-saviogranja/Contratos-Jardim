import { User, Contrato, Alerta, AcaoRecente } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    nome: 'Administrador CGM',
    email: 'controleinterno@jardim.ce.gov.br',
    perfil: 'admin',
    secretaria: 'CGM - Controladoria Geral',
    situacao: 'ativo',
    ultimoAcesso: '2024-11-24 14:30'
  }
];

export const mockContratos: Contrato[] = [];

export const mockAlertas: Alerta[] = [];

export const mockAcoesRecentes: AcaoRecente[] = [];

export const secretarias = [
  'CGM - Controladoria Geral',
  'Secretaria de Saúde',
  'Secretaria de Educação',
  'Secretaria de Obras',
  'Secretaria de Transporte',
  'Secretaria de Administração',
  'Secretaria de Finanças',
  'Secretaria de Assistência Social'
];

export const situacoesContrato = [
  { value: 'vigente', label: 'Vigente' },
  { value: 'proximo_vencimento', label: 'Próximo do vencimento' },
  { value: 'vencido', label: 'Vencido' }
];