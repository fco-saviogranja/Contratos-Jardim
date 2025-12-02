import { projectId, publicAnonKey } from './supabase/info';
import { supabase } from './supabase/client';

// URLs do backend
const SUPABASE_URL = `https://${projectId}.supabase.co`;
const SERVER_URL = `${SUPABASE_URL}/functions/v1/make-server-1a8b02da`;

// Função auxiliar para fazer requisições
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem('access_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Adicionar token se estiver autenticado
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  try {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Verificar se a resposta é JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Resposta não é JSON:', text);
      throw new Error('Servidor não disponível');
    }

    const data = await response.json();

    // Verificar se é erro de autenticação (token inválido/expirado)
    const isLoginRequest = endpoint === '/auth/login' || endpoint === '/auth/setup-admin' || endpoint === '/solicitar-cadastro';
    
    if ((response.status === 401 || (data.code === 401 && data.message === 'Invalid JWT')) && !isLoginRequest) {
      // Limpar sessão se o token estiver inválido
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      throw new Error('SESSION_EXPIRED');
    }

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Erro na requisição');
    }

    return data;
  } catch (error: any) {
    // Se for erro de sessão expirada, propagar com mensagem clara
    if (error.message === 'SESSION_EXPIRED') {
      throw new Error('Sessão expirada. Por favor, faça login novamente.');
    }
    
    throw error;
  }
}

// ========================================
// AUTENTICAÇÃO
// ========================================

export const auth = {
  async setupAdmin() {
    try {
      const data = await apiRequest('/auth/setup-admin', {
        method: 'POST',
      });
      return data;
    } catch (error) {
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
    try {
      const data = await apiRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, password })
      });
      
      // Verificar se a resposta é JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Resposta não é JSON (login):', text);
        console.error('URL chamada:', `${SERVER_URL}/auth/login`);
        console.error('Status:', response.status);
        throw new Error('Servidor não disponível. Verifique se a Edge Function está deployada.');
      }
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        if (response.status === 401 && data.error?.includes('não encontrado')) {
          throw new Error('PENDING_REQUEST');
        }
        
        throw new Error(data.error || 'Credenciais inválidas');
      }
      
      if (!data.access_token || !data.user) {
        throw new Error('Erro ao fazer login');
      }
      
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return {
        success: true,
        access_token: data.access_token,
        user: data.user
      };
    } catch (error: any) {
      if (error.message === 'PENDING_REQUEST') {
        throw new Error('Sua solicitação de cadastro ainda está pendente de aprovação.');
      }
      throw error;
    }
  },

  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  }
};

// ========================================
// CONTRATOS
// ========================================

export const contratos = {
  async getAll() {
    return await apiRequest('/contratos');
  },

  async getById(id: string) {
    return await apiRequest(`/contratos/${id}`);
  },

  async create(contratoData: any) {
    return await apiRequest('/contratos', {
      method: 'POST',
      body: JSON.stringify(contratoData),
    });
  },

  async update(id: string, contratoData: any) {
    return await apiRequest(`/contratos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contratoData),
    });
  },

  async delete(id: string) {
    return await apiRequest(`/contratos/${id}`, {
      method: 'DELETE',
    });
  },

  async deleteAll() {
    return await apiRequest('/contratos', {
      method: 'DELETE',
    });
  }
};

// ========================================
// LIMPEZA DE DADOS (apenas admin)
// ========================================

export const admin = {
  async limparTodosDados() {
    return await apiRequest('/limpar-dados', {
      method: 'POST',
    });
  },
  
  async resetarSistemaCompleto() {
    try {
      const response = await fetch(`${SERVER_URL}/reset-all-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao resetar sistema');
      }
      
      // Limpar localStorage também
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      return data;
    } catch (error: any) {
      console.error('❌ Erro ao resetar sistema:', error);
      throw error;
    }
  }
};

// ========================================
// USUÁRIOS
// ========================================

export const usuarios = {
  async getAll() {
    return await apiRequest('/usuarios');
  },

  async getMe() {
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
    return await apiRequest(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  async delete(id: string) {
    return await apiRequest(`/usuarios/${id}`, {
      method: 'DELETE',
    });
  },

  async getSolicitacoes() {
    return await apiRequest('/solicitacoes');
  },

  async aprovarSolicitacao(id: string, data: {
    perfil: string;
    senha?: string;
    observacoes: string;
  }) {
    return await apiRequest(`/solicitacoes/${id}/aprovar`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async rejeitarSolicitacao(id: string, data: {
    observacoes: string;
  }) {
    return await apiRequest(`/solicitacoes/${id}/rejeitar`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getSecretarias() {
    return await apiRequest('/secretarias');
  },

  async createSecretaria(data: {
    nome: string;
    sigla: string;
    responsavel: string;
  }) {
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
    return await apiRequest(`/secretarias/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteSecretaria(id: string) {
    return await apiRequest(`/secretarias/${id}`, {
      method: 'DELETE',
    });
  },

  async updateMeuPerfil(data: {
    nome?: string;
    secretaria?: string;
    fotoPerfil?: string;
    senhaAtual?: string;
    novaSenha?: string;
  }) {
    return await apiRequest('/usuarios/me/perfil', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async uploadFotoPerfil(foto: string, fileName: string) {
    return await apiRequest('/usuarios/me/foto', {
      method: 'POST',
      body: JSON.stringify({ foto, fileName }),
    });
  }
};

// ========================================
// ALERTAS
// ========================================

export const alertas = {
  async getAll() {
    return await apiRequest('/alertas');
  },

  async create(alertaData: any) {
    return await apiRequest('/alertas', {
      method: 'POST',
      body: JSON.stringify(alertaData),
    });
  },

  async update(id: string, alertaData: any) {
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
        throw new Error(result.error || 'Erro ao enviar solicitação');
      }

      return result;
    } catch (error: any) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.');
      }
      
      throw new Error(error.message || 'Erro ao solicitar cadastro. Tente novamente.');
    }
  }
};
