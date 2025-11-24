import { projectId, publicAnonKey } from './supabase/info';
import { createClient } from './supabase/client';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da`;

// Interface para gerenciar autenticação local
interface AuthState {
  accessToken: string | null;
  user: any | null;
}

let authState: AuthState = {
  accessToken: localStorage.getItem('access_token'),
  user: JSON.parse(localStorage.getItem('user') || 'null')
};

// Helper para fazer requisições
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = authState.accessToken || publicAnonKey;
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(error.error || `Erro: ${response.status}`);
  }

  return response.json();
}

// ========================================
// AUTENTICAÇÃO
// ========================================

export const auth = {
  async setupAdmin() {
    try {
      console.log('🔧 Chamando rota de setup do administrador...');
      const result = await fetchAPI('/auth/setup-admin', {
        method: 'POST',
        body: JSON.stringify({}),
      });
      console.log('📥 Resposta do setup:', result);
      return result;
    } catch (error: any) {
      console.error('❌ Erro no setup:', error);
      throw error;
    }
  },

  async signup(data: {
    email: string;
    password: string;
    nome: string;
    perfil: 'admin' | 'gestor' | 'fiscal';
    secretaria: string;
  }) {
    try {
      console.log('📤 Enviando requisição de signup para o backend...');
      const result = await fetchAPI('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      console.log('📥 Resposta do backend (signup):', result);
      return result;
    } catch (error: any) {
      console.error('❌ Erro no signup:', error);
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      console.log('🔑 Tentando fazer login...');
      console.log('📧 E-mail:', email);
      
      // Fazer login diretamente no frontend usando o cliente Supabase
      const supabase = createClient();
      
      console.log('🔐 Chamando Supabase Auth signInWithPassword...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Erro no login (Supabase Auth):', error);
        throw new Error(error.message);
      }

      if (!data.session || !data.user) {
        console.error('❌ Sessão ou usuário não retornado');
        throw new Error('Sessão não criada');
      }

      console.log('✅ Login no Supabase Auth bem-sucedido!');
      console.log('👤 User ID:', data.user.id);
      console.log('📋 User metadata:', data.user.user_metadata);

      // Buscar dados do usuário da KV Store
      console.log('🔍 Buscando dados do usuário na KV Store...');
      const userData = await fetchAPI(`/usuarios/me`, {
        headers: {
          'Authorization': `Bearer ${data.session.access_token}`
        }
      }).catch((err) => {
        console.warn('⚠️ Usuário não encontrado na KV, usando dados do Auth:', err);
        // Se não encontrar na KV, usar dados do Auth
        return {
          success: true,
          usuario: {
            id: data.user.id,
            email: data.user.email,
            nome: data.user.user_metadata?.nome || 'Usuário',
            perfil: data.user.user_metadata?.perfil || 'admin',
            secretaria: data.user.user_metadata?.secretaria || 'CGM'
          }
        };
      });

      console.log('📥 Dados do usuário:', userData);

      // Salvar token e dados do usuário
      authState.accessToken = data.session.access_token;
      authState.user = userData.usuario || {
        id: data.user.id,
        email: data.user.email,
        ...data.user.user_metadata
      };

      localStorage.setItem('access_token', data.session.access_token);
      localStorage.setItem('user', JSON.stringify(authState.user));

      console.log('✅ Login bem-sucedido:', authState.user);

      return {
        success: true,
        access_token: data.session.access_token,
        user: authState.user
      };
    } catch (error: any) {
      console.error('❌ Erro no login:', error);
      throw error;
    }
  },

  async logout() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      authState.accessToken = null;
      authState.user = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
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
    return fetchAPI('/contratos');
  },

  async getById(id: string) {
    return fetchAPI(`/contratos/${id}`);
  },

  async create(data: any) {
    return fetchAPI('/contratos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: any) {
    return fetchAPI(`/contratos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return fetchAPI(`/contratos/${id}`, {
      method: 'DELETE',
    });
  }
};

// ========================================
// USUÁRIOS
// ========================================

export const usuarios = {
  async getAll() {
    return fetchAPI('/usuarios');
  },

  async getMe() {
    return fetchAPI('/usuarios/me');
  },

  async create(data: {
    nome: string;
    email: string;
    password: string;
    perfil: string;
    secretaria: string;
  }) {
    return fetchAPI('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: any) {
    return fetchAPI(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async getSolicitacoes() {
    return fetchAPI('/solicitacoes');
  },

  async aprovarSolicitacao(id: string, data: {
    perfil: string;
    senha: string;
    observacoes: string;
  }) {
    return fetchAPI(`/solicitacoes/${id}/aprovar`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async rejeitarSolicitacao(id: string, data: {
    observacoes: string;
  }) {
    return fetchAPI(`/solicitacoes/${id}/rejeitar`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
};

// ========================================
// ALERTAS
// ========================================

export const alertas = {
  async getAll() {
    return fetchAPI('/alertas');
  },

  async create(data: any) {
    return fetchAPI('/alertas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: any) {
    return fetchAPI(`/alertas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
};

// ========================================
// DASHBOARD
// ========================================

export const dashboard = {
  async getStats() {
    return fetchAPI('/dashboard/stats');
  }
};