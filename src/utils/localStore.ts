// Local storage utilities para substituir o KV store do Supabase
// Esta é uma solução temporária até resolver o erro 403

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'gestor';
  createdAt: string;
}

interface Contract {
  id: string;
  numero: string;
  objeto: string;
  fornecedor: string;
  valor: number;
  dataInicio: string;
  dataVencimento: string;
  status: string;
  observacoes: string;
  gestorNome: string;
  gestorId: string;
  createdAt: string;
  updatedAt: string;
}

interface SystemSettings {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  systemName: string;
}

// Helper functions
export const localStore = {
  // Users
  getUser: (userId: string): UserProfile | null => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    return users[userId] || null;
  },

  setUser: (userId: string, profile: UserProfile): void => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[userId] = profile;
    localStorage.setItem('users', JSON.stringify(users));
  },

  getAllUsers: (): UserProfile[] => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    return Object.values(users);
  },

  deleteUser: (userId: string): void => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    delete users[userId];
    localStorage.setItem('users', JSON.stringify(users));
  },

  // Contracts
  getContract: (contractId: string): Contract | null => {
    const contracts = JSON.parse(localStorage.getItem('contracts') || '{}');
    return contracts[contractId] || null;
  },

  setContract: (contractId: string, contract: Contract): void => {
    const contracts = JSON.parse(localStorage.getItem('contracts') || '{}');
    contracts[contractId] = contract;
    localStorage.setItem('contracts', JSON.stringify(contracts));
  },

  getAllContracts: (): Contract[] => {
    const contracts = JSON.parse(localStorage.getItem('contracts') || '{}');
    return Object.values(contracts);
  },

  deleteContract: (contractId: string): void => {
    const contracts = JSON.parse(localStorage.getItem('contracts') || '{}');
    delete contracts[contractId];
    localStorage.setItem('contracts', JSON.stringify(contracts));
  },

  // Settings
  getSettings: (): SystemSettings => {
    const defaultSettings: SystemSettings = {
      primaryColor: '#4a7c59',
      secondaryColor: '#6c9a6f',
      logoUrl: '',
      systemName: 'ContratosJardim',
    };
    
    const settings = localStorage.getItem('systemSettings');
    return settings ? JSON.parse(settings) : defaultSettings;
  },

  setSettings: (settings: SystemSettings): void => {
    localStorage.setItem('systemSettings', JSON.stringify(settings));
  },

  // Check if system needs setup
  needsSetup: (): boolean => {
    const users = localStore.getAllUsers();
    return users.length === 0;
  },
};
