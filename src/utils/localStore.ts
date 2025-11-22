// Local storage utilities para substituir o KV store do Supabase
// Esta é uma solução temporária até resolver o erro 403

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'gestor';
  createdAt: string;
  password?: string; // Adicionado para autenticação local
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
  // Authentication (offline)
  authenticate: (username: string, password: string): UserProfile | null => {
    console.log('🔐 Tentando autenticar:', username);
    const users = localStore.getAllUsers();
    console.log('👥 Usuários encontrados:', users.length);
    console.log('📋 Lista de usuários:', users.map(u => ({ email: u.email, hasPassword: !!u.password })));
    
    const user = users.find(u => {
      const emailUsername = u.email.split('@')[0];
      const usernameMatch = emailUsername === username || u.email === username;
      const passwordMatch = u.password === password;
      
      console.log(`Verificando usuário ${u.email}:`, {
        emailUsername,
        usernameMatch,
        passwordMatch,
        storedPassword: u.password,
        providedPassword: password
      });
      
      return usernameMatch && passwordMatch;
    });
    
    if (user) {
      console.log('✅ Usuário autenticado:', user.email);
      // Store session
      localStorage.setItem('currentSession', JSON.stringify({
        userId: user.id,
        timestamp: new Date().toISOString()
      }));
      return user;
    }
    
    console.log('❌ Autenticação falhou');
    return null;
  },

  createUser: (username: string, password: string, name: string, role: 'admin' | 'gestor' = 'admin'): UserProfile => {
    console.log('🆕 Criando usuário:', { username, name, role });
    const userId = crypto.randomUUID();
    const email = `${username}@jardim.ce.gov.br`;
    
    const newUser: UserProfile = {
      id: userId,
      email,
      name,
      role,
      password,
      createdAt: new Date().toISOString(),
    };
    
    localStore.setUser(userId, newUser);
    console.log('✅ Usuário criado:', newUser);
    console.log('📝 Verificando salvamento:', localStore.getUser(userId));
    return newUser;
  },

  getCurrentSession: (): { userId: string; timestamp: string } | null => {
    const session = localStorage.getItem('currentSession');
    return session ? JSON.parse(session) : null;
  },

  clearSession: (): void => {
    localStorage.removeItem('currentSession');
  },

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

  // Initialize default admin user
  initializeDefaultUser: (): void => {
    if (localStore.needsSetup()) {
      console.log('🆕 Criando usuário padrão...');
      const userId = 'default-admin-gustavo-barros';
      const defaultUser: UserProfile = {
        id: userId,
        email: 'gustavobarros@jardim.ce.gov.br',
        name: 'Gustavo Barros',
        role: 'admin',
        password: '123456',
        createdAt: new Date().toISOString(),
      };
      
      localStore.setUser(userId, defaultUser);
      console.log('✅ Usuário padrão criado:', defaultUser);
    }
  },
};