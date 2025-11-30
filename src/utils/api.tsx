import { projectId, publicAnonKey } from './supabase/info';

// URLs do backend
const SUPABASE_URL = `https://${projectId}.supabase.co`;
const SERVER_URL = `${SUPABASE_URL}/functions/v1/make-server-1a8b02da`;

// Interface para gerenciar autenticação
interface AuthState {
  accessToken: string | null;
  user: any | null;
}

let authState: AuthState = {
  accessToken: localStorage.getItem('access_token'),
  user: JSON.parse(localStorage.getItem('user') || 'null')
};

// Função auxiliar para fazer requisições
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Adicionar token se estiver autenticado
  if (authState.accessToken) {
    headers['Authorization'] = `Bearer ${authState.accessToken}`;
  } else {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${SERVER_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(`❌ Erro na requisição ${endpoint}:`, data);
    throw new Error(data.error || 'Erro na requisição');
  }

  return data;
}

// ========================================
// AUTENTICAÇÃO
// ========================================

export const auth = {
  async setupAdmin() {
    console.log('🔧 Configurando usuário administrador...');
    try {
      const data = await apiRequest('/auth/setup-admin', {
        method: 'POST',
      });
      console.log('✅ Administrador configurado:', data);
      return data;
    } catch (error) {
      console.error('❌ Erro ao configurar admin:', error);
      throw error;
    }
  },

  async signup(userData: {
    email: string;
    password: string;
    nome: string;
    perfil: 'admin' | 'gestor' | 'fiscal';
    secretaria: string;
  }) {
    console.log('📝 Criando novo usuário...');
    try {
      const data = await apiRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      console.log('✅ Usuário criado com sucesso');
      return data;
    } catch (error) {
      console.error('❌ Erro ao criar usuário:', error);
      throw error;
    }
  },

  async login(email: string, password: string) {
    console.log('🔑 Fazendo login...');
    console.log('📧 E-mail:', email);
    
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      // Salvar token e usuário
      authState.accessToken = data.access_token;
      authState.user = data.user;
      
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      console.log('✅ Login bem-sucedido:', data.user);
      return data;
    } catch (error) {
      console.error('❌ Erro ao fazer login:', error);
      throw error;
    }
  },

  async logout() {
    authState.accessToken = null;
    authState.user = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    console.log('✅ Logout realizado');
  },

  getUser() {
    return authState.user;
  },

  isAuthenticated() {
    return !!authState.accessToken;
  }
};

// ========================================
// CONTRATOS
// ========================================

export const contratos = {
  async getAll() {
    console.log('📋 Buscando todos os contratos...');
    return await apiRequest('/contratos');
  },

  async getById(id: string) {
    console.log(`📄 Buscando contrato ${id}...`);
    return await apiRequest(`/contratos/${id}`);
  },

  async create(contratoData: any) {
    console.log('➕ Criando novo contrato...');
    return await apiRequest('/contratos', {
      method: 'POST',
      body: JSON.stringify(contratoData),
    });
  },

  async update(id: string, contratoData: any) {
    console.log(`✏️ Atualizando contrato ${id}...`);
    return await apiRequest(`/contratos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contratoData),
    });
  },

  async delete(id: string) {
    console.log(`🗑️ Deletando contrato ${id}...`);
    return await apiRequest(`/contratos/${id}`, {
      method: 'DELETE',
    });
  }
};

// ========================================
// USUÁRIOS
// ========================================

export const usuarios = {
  async getAll() {
    console.log('👥 Buscando todos os usuários...');
    return await apiRequest('/usuarios');
  },

  async getMe() {
    console.log('👤 Buscando dados do usuário logado...');
    return await apiRequest('/usuarios/me');
  },

  async create(userData: {
    nome: string;
    email: string;
    password: string;
    perfil: string;
    secretaria: string;
  }) {
    return auth.signup(userData as any);
  },

  async update(id: string, userData: any) {
    console.log(`✏️ Atualizando usuário ${id}...`);
    return await apiRequest(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  async getSolicitacoes() {
    console.log('📬 Buscando solicitações de cadastro...');
    return await apiRequest('/solicitacoes');
  },

  async aprovarSolicitacao(id: string, data: {
    perfil: string;
    senha?: string;
    observacoes: string;
  }) {
    console.log(`✅ Aprovando solicitação ${id}...`);
    return await apiRequest(`/solicitacoes/${id}/aprovar`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async rejeitarSolicitacao(id: string, data: {
    observacoes: string;
  }) {
    console.log(`❌ Rejeitando solicitação ${id}...`);
    return await apiRequest(`/solicitacoes/${id}/rejeitar`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getSecretarias() {
    console.log('🏛️ Buscando secretarias...');
    return await apiRequest('/secretarias');
  },

  async createSecretaria(data: {
    nome: string;
    sigla: string;
    responsavel: string;
  }) {
    console.log('➕ Criando nova secretaria...');
    return await apiRequest('/secretarias', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateSecretaria(id: string, data: {
    nome: string;
    sigla: string;
    responsavel: string;
  }) {
    console.log(`✏️ Atualizando secretaria ${id}...`);
    return await apiRequest(`/secretarias/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteSecretaria(id: string) {
    console.log(`🗑️ Deletando secretaria ${id}...`);
    return await apiRequest(`/secretarias/${id}`, {
      method: 'DELETE',
    });
  }
};

// ========================================
// ALERTAS
// ========================================

export const alertas = {
  async getAll() {
    console.log('🔔 Buscando todos os alertas...');
    return await apiRequest('/alertas');
  },

  async create(alertaData: any) {
    console.log('➕ Criando novo alerta...');
    return await apiRequest('/alertas', {
      method: 'POST',
      body: JSON.stringify(alertaData),
    });
  },

  async update(id: string, alertaData: any) {
    console.log(`✏️ Atualizando alerta ${id}...`);
    return await apiRequest(`/alertas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(alertaData),
    });
  }
};

// ========================================
// DASHBOARD
// ========================================

export const dashboard = {
  async getStats() {
    console.log('📊 Buscando estatísticas do dashboard...');
    return await apiRequest('/dashboard/stats');
  }
};

// ========================================
// SOLICITAÇÕES DE CADASTRO (públicas)
// ========================================

export const solicitacoes = {
  async criar(data: {
    nome: string;
    email: string;
    cargo: string;
    setor: string;
    senha: string;
    confirmarSenha: string;
    justificativa: string;
  }) {
    console.log('📝 Enviando solicitação de cadastro...');
    try {
      const response = await fetch(`${SERVER_URL}/solicitar-cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('❌ Erro ao enviar solicitação:', result);
        throw new Error(result.error || 'Erro ao enviar solicitação');
      }

      console.log('✅ Solicitação enviada com sucesso');
      return result;
    } catch (error) {
      console.error('❌ Erro na requisição:', error);
      throw error;
    }
  }
};
