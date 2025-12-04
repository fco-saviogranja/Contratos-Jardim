import { projectId, publicAnonKey } from './supabase/info';
import { supabase } from './supabase/client';

// URLs do backend
const SUPABASE_URL = `https://${projectId}.supabase.co`;
const SERVER_URL = `${SUPABASE_URL}/functions/v1/make-server-1a8b02da`;

// Interface para gerenciar autenticação
interface AuthState {
  accessToken: string | null;
  user: any | null;
  offlineMode: boolean;
}

let authState: AuthState = {
  accessToken: localStorage.getItem('access_token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  offlineMode: localStorage.getItem('offline_mode') === 'true'
};

// Função para recarregar authState do localStorage
function refreshAuthState() {
  authState.accessToken = localStorage.getItem('access_token');
  authState.user = JSON.parse(localStorage.getItem('user') || 'null');
  authState.offlineMode = localStorage.getItem('offline_mode') === 'true';
}

// Função para ativar modo offline
function enableOfflineMode() {
  console.warn('🔌 Ativando modo offline - backend não disponível');
  authState.offlineMode = true;
  localStorage.setItem('offline_mode', 'true');
}

// Função para desativar modo offline
function disableOfflineMode() {
  console.log('🌐 Desativando modo offline - backend disponível');
  authState.offlineMode = false;
  localStorage.setItem('offline_mode', 'false');
}

// Função auxiliar para fazer requisições
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  // Sempre recarregar o estado antes de fazer uma requisição
  refreshAuthState();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Adicionar token se estiver autenticado
  if (authState.accessToken) {
    headers['Authorization'] = `Bearer ${authState.accessToken}`;
    console.log('🔑 [API REQUEST] Usando access_token para autenticação');
  } else {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
    console.log('🔓 [API REQUEST] Usando publicAnonKey para autenticação');
  }

  console.log('🌐 [API REQUEST] Requisição:', `${SERVER_URL}${endpoint}`);
  console.log('🌐 [API REQUEST] Método:', options.method || 'GET');
  if (options.body) {
    console.log('📤 [API REQUEST] Body:', options.body);
  }

  try {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      ...options,
      headers,
      signal: AbortSignal.timeout(10000), // 10 segundos timeout
    });

    console.log('📡 [API REQUEST] Status da resposta:', response.status, response.statusText);

    // Verificar se a resposta é JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Resposta não é JSON:', text);
      
      // Ativar modo offline se o servidor não responder corretamente
      enableOfflineMode();
      throw new Error('BACKEND_UNAVAILABLE');
    }

    const data = await response.json();
    console.log('📥 Dados recebidos:', data);

    // Se chegou até aqui, o backend está funcionando
    if (authState.offlineMode) {
      disableOfflineMode();
    }

    // Verificar se é erro de autenticação (token inválido/expirado)
    // IMPORTANTE: Não tratar como erro de sessão se for uma requisição de login
    const isLoginRequest = endpoint === '/auth/login' || endpoint === '/auth/setup-admin' || endpoint === '/solicitar-cadastro';
    
    if ((response.status === 401 || (data.code === 401 && data.message === 'Invalid JWT')) && !isLoginRequest) {
      console.info('ℹ️ [API] Token JWT expirado ou inválido - sessão encerrada');
      
      // Limpar sessão se o token estiver inválido
      authState.accessToken = null;
      authState.user = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      // Não forçar reload, deixar o componente tratar
      throw new Error('SESSION_EXPIRED');
    }

    if (!response.ok) {
      console.error(`❌ Erro na requisição ${endpoint}:`, data);
      throw new Error(data.error || data.message || 'Erro na requisição');
    }

    return data;
  } catch (error: any) {
    // Se for erro de sessão expirada, não logar como erro (é comportamento normal)
    if (error.message === 'SESSION_EXPIRED') {
      throw new Error('Sessão expirada. Por favor, faça login novamente.');
    }
    
    console.error('❌ Erro na requisição:', error);
    
    // Tratar erro de timeout
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      console.error('⏱️ Timeout: Servidor não respondeu em 10 segundos');
      throw new Error('BACKEND_UNAVAILABLE');
    }
    
    // Tratar erro de conexão
    if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
      console.error('🔌 Erro de rede: Não foi possível conectar ao servidor');
      throw new Error('BACKEND_UNAVAILABLE');
    }
    
    // Se for erro de backend indisponível, propagar
    if (error.message === 'BACKEND_UNAVAILABLE') {
      throw error;
    }
    
    throw error;
  }
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
    console.log('🔑 Fazendo login via servidor...');
    console.log('📧 E-mail:', email);
    
    try {
      // Fazer login através do servidor (não diretamente no Supabase)
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, password }),
        signal: AbortSignal.timeout(10000) // 10 segundos timeout
      });
      
      console.log('📡 [LOGIN] Status da resposta:', response.status, response.statusText);
      console.log('📡 [LOGIN] Content-Type:', response.headers.get('content-type'));
      
      // Verificar se a resposta é JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('❌ Resposta não é JSON:', textResponse.substring(0, 200));
        
        // Se for página HTML (404, 500, etc), o servidor não está configurado corretamente
        if (textResponse.includes('<!DOCTYPE') || textResponse.includes('<html')) {
          console.error('❌ Servidor retornou HTML em vez de JSON - Edge Function pode não estar implantada');
          throw new Error('BACKEND_UNAVAILABLE');
        }
        
        throw new Error('BACKEND_UNAVAILABLE');
      }
      
      const data = await response.json();
      console.log('📥 [LOGIN] Dados recebidos:', data);
      
      if (!response.ok || !data.success) {
        console.error('❌ Erro ao fazer login:', data.error || 'Erro desconhecido');
        console.error('💡 Dica:', data.hint || '');
        
        // Se for erro 401, pode ser solicitação pendente
        if (response.status === 401 && data.error?.includes('não encontrado')) {
          throw new Error('PENDING_REQUEST');
        }
        
        throw new Error(data.error || 'Credenciais inválidas');
      }
      
      if (!data.access_token || !data.user) {
        console.error('❌ Token ou usuário não retornados');
        throw new Error('Erro ao fazer login');
      }
      
      console.log('✅ Login bem-sucedido via servidor!');
      console.log('👤 Usuário:', data.user.email);
      console.log('🎭 Perfil:', data.user.perfil);
      
      // Salvar token e usuário
      authState.accessToken = data.access_token;
      authState.user = data.user;
      
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      console.log('✅ Dados do usuário salvos:', data.user);
      
      return {
        success: true,
        access_token: data.access_token,
        user: data.user
      };
    } catch (error: any) {
      console.error('❌ Erro ao fazer login:', error.message);
      
      // Verificar se é erro de parsing JSON
      if (error instanceof SyntaxError && error.message.includes('JSON')) {
        console.error('❌ Erro de parsing JSON - servidor retornou resposta inválida');
        throw new Error('BACKEND_UNAVAILABLE');
      }
      
      // Verificar se é erro de timeout
      if (error.name === 'TimeoutError' || error.name === 'AbortError') {
        console.error('⏱️ Timeout: Servidor não respondeu em 10 segundos');
        throw new Error('BACKEND_UNAVAILABLE');
      }
      
      // Verificar se é erro de rede (Failed to fetch)
      if (error.message === 'Failed to fetch' || error.message?.includes('NetworkError')) {
        console.error('🔌 Erro de rede: Não foi possível conectar ao servidor');
        throw new Error('BACKEND_UNAVAILABLE');
      }
      
      // Verificar se é solicitação pendente
      if (error.message === 'PENDING_REQUEST') {
        throw new Error('Sua solicitação de cadastro ainda está pendente de aprovação pelo administrador. Aguarde a análise.');
      }
      
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
    console.log('➕ [API] Criando novo contrato...');
    console.log('📝 [API] Dados do contrato:', contratoData);
    console.log('📤 [API] JSON a ser enviado:', JSON.stringify(contratoData));
    
    const result = await apiRequest('/contratos', {
      method: 'POST',
      body: JSON.stringify(contratoData),
    });
    
    console.log('📥 [API] Resultado da criação:', result);
    return result;
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
  },

  async deleteAll() {
    console.log('🗑️💥 Deletando TODOS os contratos...');
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
    console.log('🗑️ Limpando TODOS os contratos e alertas...');
    return await apiRequest('/limpar-dados', {
      method: 'POST',
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

  async delete(id: string) {
    console.log(`🗑️ Deletando usuário ${id}...`);
    return await apiRequest(`/usuarios/${id}`, {
      method: 'DELETE',
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
  },

  async updateMeuPerfil(data: {
    nome?: string;
    secretaria?: string;
    fotoPerfil?: string;
    senhaAtual?: string;
    novaSenha?: string;
  }) {
    console.log('✏️ Atualizando meu perfil...');
    return await apiRequest('/usuarios/me/perfil', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async uploadFotoPerfil(formData: FormData) {
    console.log('📸 Fazendo upload de foto de perfil (FormData)...');
    
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${SERVER_URL}/usuarios/me/foto`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // NÃO definir Content-Type - o navegador define automaticamente com boundary
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
      throw new Error(errorData.error || 'Erro ao fazer upload');
    }

    return await response.json();
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
    console.log('🌐 URL:', `${SERVER_URL}/solicitar-cadastro`);
    console.log('📦 Dados:', data);
    
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
    } catch (error: any) {
      console.error('❌ Erro na requisição de solicitação:', error);
      
      // Mensagem de erro mais detalhada
      if (error.message === 'Failed to fetch') {
        throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.');
      }
      
      throw new Error(error.message || 'Erro ao solicitar cadastro. Tente novamente.');
    }
  }
};