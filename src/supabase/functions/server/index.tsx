// ========================================
// CONTRATOSJARDIM - SERVIDOR BACKEND
// ========================================
// Sistema de Gestão de Contratos - Município de Jardim/CE
// Edge Function: make-server-1a8b02da

import { Hono } from 'npm:hono@4';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

// ========================================
// CONFIGURAÇÃO
// ========================================

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

// Cliente Supabase com service role
const supabase = createClient(
  SUPABASE_URL ?? '',
  SUPABASE_SERVICE_ROLE_KEY ?? ''
);

// Criar app Hono
const app = new Hono();

// ========================================
// MIDDLEWARES
// ========================================

// CORS - Permitir todas as origens
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Logger - Registrar todas as requisições
app.use('*', logger(console.log));

// ========================================
// CREDENCIAIS PADRÃO DO SISTEMA
// ========================================

const ADMIN_PRINCIPAL = {
  email: 'controleinterno@jardim.ce.gov.br',
  password: '@Gustavo25',
  nome: 'Controle Interno CGM',
  perfil: 'Administrador CGM',
  secretaria: 'Controladoria Geral do Município'
};

// ========================================
// HEALTH CHECK
// ========================================

app.get('/make-server-1a8b02da/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'ContratosJardim Backend',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    edge_function: 'make-server-1a8b02da',
    admin_email: ADMIN_PRINCIPAL.email
  });
});

// ========================================
// SETUP INICIAL - CRIAR ADMIN PRINCIPAL
// ========================================

app.post('/make-server-1a8b02da/auth/setup-admin', async (c) => {
  try {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🔧 SETUP INICIAL - CRIAR ADMINISTRADOR PRINCIPAL');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('📧 Email:', ADMIN_PRINCIPAL.email);
    console.log('🔑 Senha:', ADMIN_PRINCIPAL.password);
    console.log('👤 Nome:', ADMIN_PRINCIPAL.nome);
    console.log('🎭 Perfil:', ADMIN_PRINCIPAL.perfil);
    console.log('');

    // Verificar se já existe
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingAdmin = existingUsers?.users?.find(u => u.email === ADMIN_PRINCIPAL.email);

    let userId: string;

    if (existingAdmin) {
      console.log('⚠️ Administrador já existe - Atualizando senha...');
      
      const { data, error } = await supabase.auth.admin.updateUserById(
        existingAdmin.id,
        {
          password: ADMIN_PRINCIPAL.password,
          email_confirm: true,
          user_metadata: {
            nome: ADMIN_PRINCIPAL.nome,
            perfil: ADMIN_PRINCIPAL.perfil,
            secretaria: ADMIN_PRINCIPAL.secretaria
          }
        }
      );

      if (error) {
        console.error('❌ Erro ao atualizar:', error.message);
        return c.json({ error: error.message }, 500);
      }

      userId = existingAdmin.id;
      console.log('✅ Senha atualizada!');
    } else {
      console.log('📝 Criando novo administrador...');
      
      const { data, error } = await supabase.auth.admin.createUser({
        email: ADMIN_PRINCIPAL.email,
        password: ADMIN_PRINCIPAL.password,
        email_confirm: true,
        user_metadata: {
          nome: ADMIN_PRINCIPAL.nome,
          perfil: ADMIN_PRINCIPAL.perfil,
          secretaria: ADMIN_PRINCIPAL.secretaria
        }
      });

      if (error) {
        console.error('❌ Erro ao criar:', error.message);
        return c.json({ error: error.message }, 500);
      }

      userId = data.user.id;
      console.log('✅ Administrador criado!');
    }

    // Salvar no KV Store
    const userData = {
      id: userId,
      email: ADMIN_PRINCIPAL.email,
      nome: ADMIN_PRINCIPAL.nome,
      perfil: ADMIN_PRINCIPAL.perfil,
      secretaria: ADMIN_PRINCIPAL.secretaria,
      situacao: 'ativo',
      criadoEm: new Date().toISOString(),
      ultimoAcesso: new Date().toISOString()
    };

    await kv.set(`user:${userId}`, userData);
    console.log('✅ Dados salvos no KV Store!');

    // Testar login
    console.log('🔍 Testando login...');
    const testClient = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');
    const { data: loginData, error: loginError } = await testClient.auth.signInWithPassword({
      email: ADMIN_PRINCIPAL.email,
      password: ADMIN_PRINCIPAL.password
    });

    if (loginError) {
      console.error('❌ Teste de login falhou:', loginError.message);
      return c.json({
        success: false,
        error: 'Usuário criado, mas login falhou: ' + loginError.message,
        credentials: {
          email: ADMIN_PRINCIPAL.email,
          password: ADMIN_PRINCIPAL.password
        }
      }, 500);
    }

    console.log('✅ TESTE DE LOGIN PASSOU!');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('✅ SETUP CONCLUÍDO COM SUCESSO!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');

    return c.json({
      success: true,
      message: 'Administrador configurado com sucesso!',
      credentials: {
        email: ADMIN_PRINCIPAL.email,
        password: ADMIN_PRINCIPAL.password
      },
      user: {
        id: userId,
        nome: ADMIN_PRINCIPAL.nome,
        email: ADMIN_PRINCIPAL.email,
        perfil: ADMIN_PRINCIPAL.perfil,
        secretaria: ADMIN_PRINCIPAL.secretaria
      }
    });

  } catch (error: any) {
    console.error('❌ Erro inesperado:', error.message);
    return c.json({ error: error.message }, 500);
  }
});

// ========================================
// LOGIN
// ========================================

app.post('/make-server-1a8b02da/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email e senha são obrigatórios' }, 400);
    }

    console.log(`🔐 [LOGIN] Tentativa: ${email}`);

    // Listar usuários para encontrar por email
    const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
      console.error('❌ [LOGIN] Erro ao listar usuários:', listError.message);
      return c.json({ error: 'Erro ao validar credenciais' }, 500);
    }

    // Encontrar usuário
    const authUser = usersData?.users?.find(u => u.email === email);

    if (!authUser) {
      console.warn(`⚠️ [LOGIN] Usuário não encontrado: ${email}`);
      return c.json({ 
        error: 'Credenciais inválidas. Verifique seu e-mail e senha.',
        hint: 'Se você ainda não tem uma conta, execute o Setup Inicial.'
      }, 401);
    }

    // Testar credenciais com cliente anônimo
    const testClient = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');
    const { data, error } = await testClient.auth.signInWithPassword({ email, password });

    if (error) {
      console.warn(`⚠️ [LOGIN] Credenciais inválidas para ${email}:`, error.message);
      return c.json({ 
        error: 'Credenciais inválidas. Verifique seu e-mail e senha.',
        hint: 'Certifique-se de que está usando a senha correta.'
      }, 401);
    }

    // Buscar dados do usuário no KV
    let userData = await kv.get(`user:${authUser.id}`);

    if (!userData) {
      console.warn(`⚠️ [LOGIN] Usuário não encontrado no KV, criando...`);
      userData = {
        id: authUser.id,
        email: authUser.email,
        nome: authUser.user_metadata?.nome || 'Usuário',
        perfil: authUser.user_metadata?.perfil || 'Gestor de Contratos',
        secretaria: authUser.user_metadata?.secretaria || 'Não definida',
        situacao: 'ativo',
        criadoEm: new Date().toISOString(),
        ultimoAcesso: new Date().toISOString()
      };
      await kv.set(`user:${authUser.id}`, userData);
    } else {
      // Atualizar último acesso
      userData.ultimoAcesso = new Date().toISOString();
      await kv.set(`user:${authUser.id}`, userData);
    }

    console.log(`✅ [LOGIN] Sucesso: ${email} (${userData.perfil})`);

    return c.json({
      success: true,
      access_token: data.session.access_token,
      user: {
        id: userData.id,
        email: userData.email,
        nome: userData.nome,
        perfil: userData.perfil,
        secretaria: userData.secretaria
      }
    });

  } catch (error: any) {
    console.error('❌ [LOGIN] Erro inesperado:', error.message);
    return c.json({ error: `Erro ao fazer login: ${error.message}` }, 500);
  }
});

// ========================================
// CADASTRO DE USUÁRIOS
// ========================================

app.post('/make-server-1a8b02da/auth/signup', async (c) => {
  try {
    const { email, password, nome, perfil, secretaria } = await c.req.json();

    if (!email || !password || !nome || !perfil || !secretaria) {
      return c.json({ error: 'Todos os campos são obrigatórios' }, 400);
    }

    console.log(`📝 [SIGNUP] Criando usuário: ${email} (${perfil})`);

    // Criar usuário no Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nome, perfil, secretaria }
    });

    if (error) {
      console.error('❌ [SIGNUP] Erro:', error.message);
      return c.json({ error: error.message }, 500);
    }

    // Salvar no KV Store
    const userData = {
      id: data.user.id,
      email,
      nome,
      perfil,
      secretaria,
      situacao: 'ativo',
      criadoEm: new Date().toISOString(),
      ultimoAcesso: new Date().toISOString()
    };

    await kv.set(`user:${data.user.id}`, userData);

    console.log(`✅ [SIGNUP] Usuário criado: ${email}`);

    return c.json({
      success: true,
      user: {
        id: data.user.id,
        email,
        nome,
        perfil,
        secretaria
      }
    });

  } catch (error: any) {
    console.error('❌ [SIGNUP] Erro inesperado:', error.message);
    return c.json({ error: error.message }, 500);
  }
});

// ========================================
// LISTAR USUÁRIOS DO KV STORE
// ========================================

app.get('/make-server-1a8b02da/admin/listar-usuarios-kv', async (c) => {
  try {
    console.log('📋 [LISTAR-USUARIOS] Buscando usuários no KV Store...');

    const usuarios = await kv.getByPrefix('user:');

    console.log(`✅ [LISTAR-USUARIOS] ${usuarios.length} usuário(s) encontrado(s)`);

    return c.json({
      success: true,
      total: usuarios.length,
      usuarios: usuarios,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ [LISTAR-USUARIOS] Erro:', error.message);
    return c.json({
      success: false,
      error: error.message,
      total: 0,
      usuarios: []
    }, 500);
  }
});

// ========================================
// CRIAR ADMIN SIMPLES (DIAGNÓSTICO)
// ========================================

app.post('/make-server-1a8b02da/admin/criar-admin-simples', async (c) => {
  try {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🔧 CRIAR ADMIN SIMPLES');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');

    const adminData = {
      email: ADMIN_PRINCIPAL.email,
      password: ADMIN_PRINCIPAL.password,
      nome: ADMIN_PRINCIPAL.nome,
      perfil: ADMIN_PRINCIPAL.perfil,
      secretaria: ADMIN_PRINCIPAL.secretaria
    };

    console.log('📧 Email:', adminData.email);
    console.log('🔑 Senha:', adminData.password);
    console.log('');

    // Verificar se existe
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existing = existingUsers?.users?.find(u => u.email === adminData.email);

    let userId: string;

    if (existing) {
      console.log('⚠️ Atualizando senha...');
      await supabase.auth.admin.updateUserById(existing.id, {
        password: adminData.password,
        email_confirm: true,
        user_metadata: {
          nome: adminData.nome,
          perfil: adminData.perfil,
          secretaria: adminData.secretaria
        }
      });
      userId = existing.id;
    } else {
      console.log('📝 Criando usuário...');
      const { data } = await supabase.auth.admin.createUser({
        email: adminData.email,
        password: adminData.password,
        email_confirm: true,
        user_metadata: {
          nome: adminData.nome,
          perfil: adminData.perfil,
          secretaria: adminData.secretaria
        }
      });
      userId = data!.user.id;
    }

    // Salvar no KV
    await kv.set(`user:${userId}`, {
      id: userId,
      email: adminData.email,
      nome: adminData.nome,
      perfil: adminData.perfil,
      secretaria: adminData.secretaria,
      situacao: 'ativo',
      criadoEm: new Date().toISOString()
    });

    // Testar login
    const testClient = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');
    const { data: loginData, error: loginError } = await testClient.auth.signInWithPassword({
      email: adminData.email,
      password: adminData.password
    });

    console.log('✅ CONCLUÍDO!');
    console.log('');

    return c.json({
      success: true,
      message: 'Admin criado com sucesso!',
      credentials: {
        email: adminData.email,
        password: adminData.password,
        nome: adminData.nome,
        perfil: adminData.perfil
      },
      loginTested: !loginError
    });

  } catch (error: any) {
    console.error('❌ Erro:', error.message);
    return c.json({ error: error.message }, 500);
  }
});

// ========================================
// DEBUG ENDPOINTS
// ========================================

app.post('/make-server-1a8b02da/debug/check-user', async (c) => {
  try {
    const { email } = await c.req.json();

    // Buscar no Auth
    const { data: users } = await supabase.auth.admin.listUsers();
    const authUser = users?.users?.find(u => u.email === email);

    // Buscar no KV
    let kvUser = null;
    if (authUser) {
      kvUser = await kv.get(`user:${authUser.id}`);
    }

    return c.json({
      authUser: authUser ? {
        id: authUser.id,
        email: authUser.email,
        email_confirmed_at: authUser.email_confirmed_at
      } : null,
      kvUser: kvUser
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.post('/make-server-1a8b02da/debug/test-login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    const testClient = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');
    const { data, error } = await testClient.auth.signInWithPassword({ email, password });

    return c.json({
      success: !error,
      error: error?.message || null
    });

  } catch (error: any) {
    return c.json({ success: false, error: error.message });
  }
});

app.post('/make-server-1a8b02da/debug/reset-password', async (c) => {
  try {
    const { email, novaSenha } = await c.req.json();

    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users?.users?.find(u => u.email === email);

    if (!user) {
      return c.json({ error: 'Usuário não encontrado' }, 404);
    }

    await supabase.auth.admin.updateUserById(user.id, {
      password: novaSenha
    });

    return c.json({ success: true });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ========================================
// INICIAR SERVIDOR
// ========================================

export default {
  fetch: app.fetch,
};

console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('✅ SERVIDOR BACKEND INICIADO');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
console.log('🚀 Edge Function: make-server-1a8b02da');
console.log('📧 Admin Email:', ADMIN_PRINCIPAL.email);
console.log('🔑 Admin Password:', ADMIN_PRINCIPAL.password);
console.log('📡 Status: Aguardando requisições...');
console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
