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

// Nome do bucket para fotos de perfil
const BUCKET_NAME = 'make-1a8b02da-fotos-perfil';

// Cliente Supabase com service role
const supabase = createClient(
  SUPABASE_URL ?? '',
  SUPABASE_SERVICE_ROLE_KEY ?? ''
);

// Criar app Hono
const app = new Hono();

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

// Normalizar ID de secretaria (evitar duplicação do prefixo)
function normalizeSecretariaId(id: string): string {
  return id.startsWith('secretaria:') ? id : `secretaria:${id}`;
}

// ========================================
// INICIALIZAÇÃO DO BUCKET
// ========================================

// Criar bucket na inicialização (se não existir)
async function initializeBucket() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      console.log(`📦 [STORAGE] Criando bucket ${BUCKET_NAME}...`);
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: false, // Bucket privado para segurança
        fileSizeLimit: 5242880 // 5MB
      });
      
      if (error) {
        console.error('❌ [STORAGE] Erro ao criar bucket:', error.message);
      } else {
        console.log('✅ [STORAGE] Bucket criado com sucesso!');
      }
    } else {
      console.log('✅ [STORAGE] Bucket já existe');
    }
  } catch (error: any) {
    console.error('❌ [STORAGE] Erro na inicialização:', error.message);
  }
}

// Inicializar bucket
initializeBucket();

// ========================================
// INICIALIZAÇÃO DAS SECRETARIAS PADRÃO
// ========================================

const SECRETARIAS_PADRAO = [
  { nome: 'CONTROLADORIA GERAL DO MUNICÍPIO', sigla: 'CGM' },
  { nome: 'GABINETE DO PREFEITO', sigla: 'GABPREF' },
  { nome: 'PROCURADORIA GERAL DO MUNICÍPIO', sigla: 'PGM' },
  { nome: 'SECRETARIA DE ADMINISTRAÇÃO', sigla: 'SEAD' },
  { nome: 'SECRETARIA DE AGRICULTURA, SERVIÇOS RURAIS E RECURSOS HÍDRICOS', sigla: 'SEAGRI' },
  { nome: 'SECRETARIA DE ARTICULAÇÃO POLÍTICA', sigla: 'SEAP' },
  { nome: 'SECRETARIA DE CULTURA, TURISMO E ESPORTE', sigla: 'SECULT' },
  { nome: 'SECRETARIA DE EDUCAÇÃO', sigla: 'SEDUC' },
  { nome: 'SECRETARIA DE FINANÇAS', sigla: 'SEFIN' },
  { nome: 'SECRETARIA DE SAÚDE', sigla: 'SESAU' },
  { nome: 'SECRETARIA DO DESENVOLVIMENTO SOCIAL E DO TRABALHO', sigla: 'SEDEST' },
  { nome: 'SECRETARIA MUNICIPAL DE INFRAESTRUTURA E SERVIÇOS PÚBLICOS', sigla: 'SEINF' },
  { nome: 'SECRETARIA MUNICIPAL DE MEIO AMBIENTE E DESENVOLVIMENTO SUSTENTÁVEL', sigla: 'SEMADS' },
  { nome: 'SECRETARIA MUNICIPAL DE PLANEJAMENTO E ORÇAMENTO', sigla: 'SEPLAN' },
  { nome: 'SERVIÇO AUTÔNOMO DE ÁGUA E ESGOTO DE JARDIM', sigla: 'SAAE' }
];

async function initializeSecretarias() {
  try {
    console.log('🏛️ [SECRETARIAS] Verificando secretarias padrão...');
    
    const secretariasExistentes = await kv.getByPrefix('secretaria:');
    
    if (secretariasExistentes && secretariasExistentes.length > 0) {
      console.log(`✅ [SECRETARIAS] ${secretariasExistentes.length} secretarias já existem no sistema`);
      return;
    }
    
    console.log('📝 [SECRETARIAS] Criando secretarias padrão do município...');
    
    for (const sec of SECRETARIAS_PADRAO) {
      const secretariaIdBase = `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const secretariaId = `secretaria:${secretariaIdBase}`; // ID completo com prefixo
      const secretaria = {
        id: secretariaId, // Salvar ID completo no objeto
        nome: sec.nome,
        sigla: sec.sigla,
        responsavel: '',
        situacao: 'ativa',
        criadoEm: new Date().toISOString()
      };
      
      await kv.set(secretariaId, secretaria); // Chave = ID completo
      console.log(`  ✓ ${sec.sigla} - ${sec.nome}`);
    }
    
    console.log(`✅ [SECRETARIAS] ${SECRETARIAS_PADRAO.length} secretarias criadas com sucesso!`);
  } catch (error: any) {
    console.error('❌ [SECRETARIAS] Erro na inicialização:', error.message);
  }
}

// Inicializar secretarias
initializeSecretarias();

// ========================================
// MIDDLEWARES
// ========================================

// CORS - Permitir todas as origens
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
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
  perfil: 'admin', // Corrigido: usar 'admin' em vez de 'Administrador CGM' para compatibilidade com filtros
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
      
      // IMPORTANTE: Normalizar perfil do administrador principal
      // Isso garante que o perfil esteja sempre correto mesmo que tenha sido alterado
      if (email === ADMIN_PRINCIPAL.email) {
        console.log(`🔧 [LOGIN] Normalizando perfil do administrador principal...`);
        
        // Se o perfil está diferente do esperado, corrigir
        if (userData.perfil !== ADMIN_PRINCIPAL.perfil) {
          console.log(`   Perfil anterior: ${userData.perfil}`);
          console.log(`   Perfil corrigido: ${ADMIN_PRINCIPAL.perfil}`);
          userData.perfil = ADMIN_PRINCIPAL.perfil;
        }
        
        // Garantir nome e secretaria corretos
        if (userData.nome !== ADMIN_PRINCIPAL.nome) {
          userData.nome = ADMIN_PRINCIPAL.nome;
        }
        if (userData.secretaria !== ADMIN_PRINCIPAL.secretaria) {
          userData.secretaria = ADMIN_PRINCIPAL.secretaria;
        }
      }
      
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
        secretaria: userData.secretaria,
        fotoPerfil: userData.fotoPerfil || null // Incluir foto de perfil se existir
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

    console.log(`📝 [SIGNUP] Processando cadastro: ${email} (${perfil})`);

    // Verificar se o usuário já existe
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === email);
    
    let userId: string;
    
    if (existingUser) {
      console.log(`⚠️ [SIGNUP] Usuário já existe: ${email} - Atualizando dados...`);
      userId = existingUser.id;
      
      // Atualizar metadata do usuário existente
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        {
          user_metadata: { nome, perfil, secretaria }
        }
      );
      
      if (updateError) {
        console.error('❌ [SIGNUP] Erro ao atualizar usuário:', updateError.message);
        return c.json({ error: updateError.message }, 500);
      }
      
      console.log(`✅ [SIGNUP] Usuário atualizado: ${email}`);
    } else {
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
      
      userId = data.user.id;
      console.log(`✅ [SIGNUP] Usuário criado: ${email}`);
    }

    // Salvar no KV Store
    const userData = {
      id: userId,
      email,
      nome,
      perfil,
      secretaria,
      situacao: 'ativo',
      criadoEm: new Date().toISOString(),
      ultimoAcesso: new Date().toISOString()
    };

    await kv.set(`user:${userId}`, userData);

    return c.json({
      success: true,
      user: {
        id: userId,
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
    console.log('══════════════════════════════════════════════════════════');
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

// Endpoint de correção automática - Sincronizar usuário entre Auth e KV Store
app.post('/make-server-1a8b02da/debug/fix-user', async (c) => {
  try {
    const { email } = await c.req.json();
    
    if (!email) {
      return c.json({ error: 'Email é obrigatório' }, 400);
    }

    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🔧 FIX USER - SINCRONIZAR AUTH E KV STORE');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📧 Email:', email);
    console.log('');

    // Buscar no Auth
    const { data: users } = await supabase.auth.admin.listUsers();
    const authUser = users?.users?.find(u => u.email === email);

    if (!authUser) {
      console.log('❌ Usuário não existe no Supabase Auth');
      return c.json({ error: 'Usuário não encontrado no Supabase Auth' }, 404);
    }

    console.log('✅ Usuário encontrado no Auth:', authUser.id);

    // Buscar no KV
    let kvUser = await kv.get(`user:${authUser.id}`);

    // Determinar dados do usuário
    let userData: any;

    // Se for o admin principal, usar dados do ADMIN_PRINCIPAL
    if (email === ADMIN_PRINCIPAL.email) {
      console.log('🔐 É o administrador principal - usando dados padrão');
      userData = {
        id: authUser.id,
        email: ADMIN_PRINCIPAL.email,
        nome: ADMIN_PRINCIPAL.nome,
        perfil: ADMIN_PRINCIPAL.perfil,
        secretaria: ADMIN_PRINCIPAL.secretaria,
        situacao: 'ativo',
        criadoEm: kvUser?.criadoEm || new Date().toISOString(),
        ultimoAcesso: new Date().toISOString()
      };

      // Atualizar senha no Auth para garantir que está correta
      console.log('🔑 Atualizando senha para senha padrão...');
      await supabase.auth.admin.updateUserById(authUser.id, {
        password: ADMIN_PRINCIPAL.password,
        email_confirm: true,
        user_metadata: {
          nome: ADMIN_PRINCIPAL.nome,
          perfil: ADMIN_PRINCIPAL.perfil,
          secretaria: ADMIN_PRINCIPAL.secretaria
        }
      });
      console.log('✅ Senha atualizada');
    } else {
      // Para outros usuários, usar dados do Auth metadata ou do KV existente
      userData = {
        id: authUser.id,
        email: authUser.email,
        nome: authUser.user_metadata?.nome || kvUser?.nome || 'Usuário',
        perfil: authUser.user_metadata?.perfil || kvUser?.perfil || 'gestor',
        secretaria: authUser.user_metadata?.secretaria || kvUser?.secretaria || 'Não definida',
        situacao: kvUser?.situacao || 'ativo',
        criadoEm: kvUser?.criadoEm || new Date().toISOString(),
        ultimoAcesso: new Date().toISOString()
      };
    }

    // Salvar/Atualizar no KV
    await kv.set(`user:${authUser.id}`, userData);
    console.log('✅ Dados salvos no KV Store');

    // Testar login
    console.log('🔍 Testando login...');
    const testClient = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');
    
    // Se for o admin principal, testar com a senha padrão
    let loginTestResult = { success: false, error: null };
    if (email === ADMIN_PRINCIPAL.email) {
      const { error: loginError } = await testClient.auth.signInWithPassword({
        email: ADMIN_PRINCIPAL.email,
        password: ADMIN_PRINCIPAL.password
      });
      loginTestResult = { success: !loginError, error: loginError?.message || null };
    } else {
      loginTestResult = { success: true, error: 'Senha não testada (não é admin principal)' };
    }

    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('✅ FIX USER CONCLUÍDO!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');

    return c.json({
      success: true,
      message: 'Usuário sincronizado com sucesso',
      authUser: {
        id: authUser.id,
        email: authUser.email,
        email_confirmed: !!authUser.email_confirmed_at
      },
      kvUser: userData,
      loginTest: loginTestResult,
      credentials: email === ADMIN_PRINCIPAL.email ? {
        email: ADMIN_PRINCIPAL.email,
        password: ADMIN_PRINCIPAL.password
      } : null
    });

  } catch (error: any) {
    console.error('❌ Erro no fix-user:', error.message);
    return c.json({ error: error.message }, 500);
  }
});

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
// USUÁRIOS
// ========================================

// Buscar dados do usuário logado
app.get('/make-server-1a8b02da/usuarios/me', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Token não fornecido' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Token inválido' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    
    if (!userData) {
      return c.json({ error: 'Usuário não encontrado no KV' }, 404);
    }

    return c.json({
      success: true,
      usuario: userData // Corrigido: usar 'usuario' em vez de 'user' para consistência com o frontend
    });

  } catch (error: any) {
    console.error('❌ [USUARIOS/ME] Erro:', error.message);
    return c.json({ error: error.message }, 500);
  }
});

// Listar todos os usuários
app.get('/make-server-1a8b02da/usuarios', async (c) => {
  try {
    console.log('👥 [USUARIOS] Listando usuários...');
    
    const usuarios = await kv.getByPrefix('user:');
    
    return c.json({
      success: true,
      usuarios: usuarios,
      total: usuarios.length
    });

  } catch (error: any) {
    console.error('❌ [USUARIOS] Erro:', error.message);
    return c.json({ error: error.message }, 500);
  }
});

// Buscar usuário por ID
app.get('/make-server-1a8b02da/usuarios/:id', async (c) => {
  try {
    const userId = c.req.param('id');
    const usuario = await kv.get(`user:${userId}`);
    
    if (!usuario) {
      return c.json({ error: 'Usuário não encontrado' }, 404);
    }

    return c.json({
      success: true,
      usuario: usuario
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Criar novo usuário (usa signup existente)
app.post('/make-server-1a8b02da/usuarios', async (c) => {
  try {
    const { email, password, nome, perfil, secretaria } = await c.req.json();

    if (!email || !password || !nome || !perfil || !secretaria) {
      return c.json({ error: 'Todos os campos são obrigatórios' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nome, perfil, secretaria }
    });

    if (error) {
      return c.json({ error: error.message }, 500);
    }

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

    return c.json({
      success: true,
      usuario: userData
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Atualizar usuário
app.put('/make-server-1a8b02da/usuarios/:id', async (c) => {
  try {
    const userId = c.req.param('id');
    const updateData = await c.req.json();

    const usuarioExistente = await kv.get(`user:${userId}`);
    
    if (!usuarioExistente) {
      return c.json({ error: 'Usuário não encontrado' }, 404);
    }

    const usuarioAtualizado = {
      ...usuarioExistente,
      ...updateData,
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(`user:${userId}`, usuarioAtualizado);

    // Se mudou email ou metadata, atualizar no Auth também
    if (updateData.email || updateData.nome || updateData.perfil || updateData.secretaria) {
      await supabase.auth.admin.updateUserById(userId, {
        email: updateData.email,
        user_metadata: {
          nome: updateData.nome || usuarioExistente.nome,
          perfil: updateData.perfil || usuarioExistente.perfil,
          secretaria: updateData.secretaria || usuarioExistente.secretaria
        }
      });
    }

    return c.json({
      success: true,
      usuario: usuarioAtualizado
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Deletar usuário
app.delete('/make-server-1a8b02da/usuarios/:id', async (c) => {
  try {
    const userId = c.req.param('id');

    const usuarioExistente = await kv.get(`user:${userId}`);
    
    if (!usuarioExistente) {
      return c.json({ error: 'Usuário não encontrado' }, 404);
    }

    await kv.del(`user:${userId}`);
    await supabase.auth.admin.deleteUser(userId);

    return c.json({
      success: true,
      message: 'Usuário deletado com sucesso'
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Atualizar perfil do usuário logado
app.patch('/make-server-1a8b02da/usuarios/me/perfil', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Token não fornecido' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Token inválido' }, 401);
    }

    const updateData = await c.req.json();
    const usuarioExistente = await kv.get(`user:${user.id}`);

    const usuarioAtualizado = {
      ...usuarioExistente,
      ...updateData,
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(`user:${user.id}`, usuarioAtualizado);

    return c.json({
      success: true,
      usuario: usuarioAtualizado
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Upload de foto de perfil (FormData)
app.post('/make-server-1a8b02da/usuarios/me/foto', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Token não fornecido' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Token inválido' }, 401);
    }

    console.log(`📸 [UPLOAD-FOTO] Upload de foto para usuário: ${user.id}`);

    // Obter FormData
    const formData = await c.req.formData();
    const foto = formData.get('foto') as File;
    
    if (!foto) {
      return c.json({ error: 'Arquivo de foto não fornecido' }, 400);
    }

    // Validar tipo
    if (!foto.type.startsWith('image/')) {
      return c.json({ error: 'Arquivo deve ser uma imagem' }, 400);
    }

    // Validar tamanho (5MB)
    if (foto.size > 5 * 1024 * 1024) {
      return c.json({ error: 'Imagem deve ter no máximo 5MB' }, 400);
    }

    console.log(`📎 [UPLOAD-FOTO] Arquivo: ${foto.name} (${(foto.size / 1024).toFixed(2)} KB)`);

    // Converter File para ArrayBuffer e depois para Uint8Array
    const arrayBuffer = await foto.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    // Gerar nome único para o arquivo
    const fileExtension = foto.name.split('.').pop() || 'jpg';
    const uniqueFileName = `${user.id}-${Date.now()}.${fileExtension}`;
    const filePath = `perfil/${uniqueFileName}`;

    // Deletar foto anterior se existir
    const usuarioExistente = await kv.get(`user:${user.id}`);
    if (usuarioExistente?.fotoPath) {
      console.log(`🗑️ [UPLOAD-FOTO] Deletando foto anterior: ${usuarioExistente.fotoPath}`);
      await supabase.storage.from(BUCKET_NAME).remove([usuarioExistente.fotoPath]);
    }

    // Upload para o Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: foto.type,
        upsert: true
      });

    if (uploadError) {
      console.error('❌ [UPLOAD-FOTO] Erro no upload:', uploadError.message);
      return c.json({ error: `Erro no upload: ${uploadError.message}` }, 500);
    }

    // Gerar URL assinada (válida por 1 ano)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, 31536000); // 1 ano em segundos

    if (signedUrlError) {
      console.error('❌ [UPLOAD-FOTO] Erro ao gerar URL:', signedUrlError.message);
      return c.json({ error: `Erro ao gerar URL: ${signedUrlError.message}` }, 500);
    }

    // Atualizar usuário no KV Store
    const usuarioAtualizado = {
      ...usuarioExistente,
      fotoPerfil: signedUrlData.signedUrl,
      fotoPath: filePath,
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(`user:${user.id}`, usuarioAtualizado);

    console.log(`✅ [UPLOAD-FOTO] Foto salva com sucesso: ${filePath}`);

    return c.json({
      success: true,
      fotoUrl: signedUrlData.signedUrl,
      fotoPath: filePath,
      usuario: usuarioAtualizado
    });

  } catch (error: any) {
    console.error('❌ [UPLOAD-FOTO] Erro:', error.message);
    return c.json({ error: error.message }, 500);
  }
});

// ========================================
// SECRETARIAS
// ========================================

// Listar secretarias
app.get('/make-server-1a8b02da/secretarias', async (c) => {
  try {
    console.log('🏛️ [SECRETARIAS] Listando...');
    
    const secretarias = await kv.getByPrefix('secretaria:');
    
    return c.json({
      success: true,
      secretarias: secretarias,
      total: secretarias.length
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Criar secretaria
app.post('/make-server-1a8b02da/secretarias', async (c) => {
  try {
    const { nome, sigla, responsavel } = await c.req.json();

    if (!nome || !sigla) {
      return c.json({ error: 'Nome e sigla são obrigatórios' }, 400);
    }

    const secretariaId = `secretaria-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const novaSecretaria = {
      id: secretariaId,
      nome,
      sigla,
      responsavel: responsavel || '',
      situacao: 'ativa',
      criadoEm: new Date().toISOString()
    };

    await kv.set(`secretaria:${secretariaId}`, novaSecretaria);

    return c.json({
      success: true,
      secretaria: novaSecretaria
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Atualizar secretaria
app.put('/make-server-1a8b02da/secretarias/:id', async (c) => {
  try {
    const secretariaIdParam = c.req.param('id');
    const updateData = await c.req.json();

    // Normalizar ID (evitar duplicação do prefixo)
    const secretariaId = normalizeSecretariaId(secretariaIdParam);

    const secretariaExistente = await kv.get(secretariaId);
    
    if (!secretariaExistente) {
      return c.json({ error: 'Secretaria não encontrada' }, 404);
    }

    const secretariaAtualizada = {
      ...secretariaExistente,
      ...updateData,
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(secretariaId, secretariaAtualizada);

    return c.json({
      success: true,
      secretaria: secretariaAtualizada
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Deletar secretaria
app.delete('/make-server-1a8b02da/secretarias/:id', async (c) => {
  try {
    const secretariaIdParam = c.req.param('id');

    // Normalizar ID (evitar duplicação do prefixo)
    const secretariaId = normalizeSecretariaId(secretariaIdParam);
    
    console.log(`🗑️ [DELETE-SECRETARIA] ID recebido: ${secretariaIdParam}`);
    console.log(`🗑️ [DELETE-SECRETARIA] ID normalizado: ${secretariaId}`);

    const secretariaExistente = await kv.get(secretariaId);
    
    if (!secretariaExistente) {
      return c.json({ error: 'Secretaria não encontrada' }, 404);
    }

    await kv.del(secretariaId);

    return c.json({
      success: true,
      message: 'Secretaria deletada com sucesso'
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ========================================
// CONTRATOS
// ========================================

// Listar contratos
app.get('/make-server-1a8b02da/contratos', async (c) => {
  try {
    console.log('📋 [CONTRATOS] Listando...');
    
    const contratos = await kv.getByPrefix('contrato:');
    
    return c.json({
      success: true,
      contratos: contratos,
      total: contratos.length
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Buscar contrato por ID
app.get('/make-server-1a8b02da/contratos/:id', async (c) => {
  try {
    const contratoId = c.req.param('id');
    const contrato = await kv.get(`contrato:${contratoId}`);
    
    if (!contrato) {
      return c.json({ error: 'Contrato não encontrado' }, 404);
    }

    return c.json({
      success: true,
      contrato: contrato
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Criar contrato
app.post('/make-server-1a8b02da/contratos', async (c) => {
  try {
    const contratoData = await c.req.json();

    console.log('➕ [CONTRATOS] Criando contrato...');

    if (!contratoData.numero || !contratoData.objeto) {
      return c.json({ error: 'Número e objeto são obrigatórios' }, 400);
    }

    const contratoId = `contrato-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const novoContrato = {
      id: contratoId,
      ...contratoData,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(`contrato:${contratoId}`, novoContrato);

    console.log('✅ [CONTRATOS] Contrato criado:', contratoId);

    return c.json({
      success: true,
      contrato: novoContrato
    });

  } catch (error: any) {
    console.error('❌ [CONTRATOS] Erro:', error.message);
    return c.json({ error: error.message }, 500);
  }
});

// Atualizar contrato
app.put('/make-server-1a8b02da/contratos/:id', async (c) => {
  try {
    const contratoId = c.req.param('id');
    const updateData = await c.req.json();

    const contratoExistente = await kv.get(`contrato:${contratoId}`);
    
    if (!contratoExistente) {
      return c.json({ error: 'Contrato não encontrado' }, 404);
    }

    const contratoAtualizado = {
      ...contratoExistente,
      ...updateData,
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(`contrato:${contratoId}`, contratoAtualizado);

    return c.json({
      success: true,
      contrato: contratoAtualizado
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Deletar contrato
app.delete('/make-server-1a8b02da/contratos/:id', async (c) => {
  try {
    const contratoId = c.req.param('id');

    const contratoExistente = await kv.get(`contrato:${contratoId}`);
    
    if (!contratoExistente) {
      return c.json({ error: 'Contrato não encontrado' }, 404);
    }

    await kv.del(`contrato:${contratoId}`);

    return c.json({
      success: true,
      message: 'Contrato deletado com sucesso'
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Deletar TODOS os contratos
app.delete('/make-server-1a8b02da/contratos', async (c) => {
  try {
    console.log('🗑️💥 [CONTRATOS] Deletando TODOS os contratos...');
    
    const contratos = await kv.getByPrefix('contrato:');
    
    for (const contrato of contratos) {
      await kv.del(`contrato:${contrato.id}`);
    }
    
    console.log(`✅ [CONTRATOS] ${contratos.length} contratos deletados`);

    return c.json({
      success: true,
      message: `${contratos.length} contratos deletados com sucesso`,
      total: contratos.length
    });

  } catch (error: any) {
    console.error('❌ [CONTRATOS] Erro ao deletar todos:', error.message);
    return c.json({ error: error.message }, 500);
  }
});

// ========================================
// ALERTAS
// ========================================

// Listar alertas
app.get('/make-server-1a8b02da/alertas', async (c) => {
  try {
    console.log('🔔 [ALERTAS] Listando...');
    
    const alertas = await kv.getByPrefix('alerta:');
    
    return c.json({
      success: true,
      alertas: alertas,
      total: alertas.length
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Buscar alerta por ID
app.get('/make-server-1a8b02da/alertas/:id', async (c) => {
  try {
    const alertaId = c.req.param('id');
    const alerta = await kv.get(`alerta:${alertaId}`);
    
    if (!alerta) {
      return c.json({ error: 'Alerta não encontrado' }, 404);
    }

    return c.json({
      success: true,
      alerta: alerta
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Criar alerta
app.post('/make-server-1a8b02da/alertas', async (c) => {
  try {
    const alertaData = await c.req.json();

    if (!alertaData.tipo || !alertaData.titulo || !alertaData.mensagem) {
      return c.json({ error: 'Tipo, título e mensagem são obrigatórios' }, 400);
    }

    const alertaId = `alerta-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const novoAlerta = {
      id: alertaId,
      tipo: alertaData.tipo,
      prioridade: alertaData.prioridade || 'media',
      contratoId: alertaData.contratoId || null,
      titulo: alertaData.titulo,
      mensagem: alertaData.mensagem,
      status: alertaData.status || 'nao_lido',
      dataVencimento: alertaData.dataVencimento || null,
      destinatarios: alertaData.destinatarios || [],
      criadoEm: new Date().toISOString(),
      criadoPor: alertaData.criadoPor || null,
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(`alerta:${alertaId}`, novoAlerta);

    return c.json({
      success: true,
      alerta: novoAlerta
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Atualizar alerta
app.put('/make-server-1a8b02da/alertas/:id', async (c) => {
  try {
    const alertaId = c.req.param('id');
    const updateData = await c.req.json();

    const alertaExistente = await kv.get(`alerta:${alertaId}`);
    
    if (!alertaExistente) {
      return c.json({ error: 'Alerta não encontrado' }, 404);
    }

    const alertaAtualizado = {
      ...alertaExistente,
      ...updateData,
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(`alerta:${alertaId}`, alertaAtualizado);

    return c.json({
      success: true,
      alerta: alertaAtualizado
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Deletar alerta
app.delete('/make-server-1a8b02da/alertas/:id', async (c) => {
  try {
    const alertaId = c.req.param('id');

    const alertaExistente = await kv.get(`alerta:${alertaId}`);
    
    if (!alertaExistente) {
      return c.json({ error: 'Alerta não encontrado' }, 404);
    }

    await kv.del(`alerta:${alertaId}`);

    return c.json({
      success: true,
      message: 'Alerta deletado com sucesso'
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ========================================
// DASHBOARD
// ========================================

app.get('/make-server-1a8b02da/dashboard/stats', async (c) => {
  try {
    console.log('📊 [DASHBOARD] Buscando estatísticas...');

    const contratos = await kv.getByPrefix('contrato:');
    const alertas = await kv.getByPrefix('alerta:');
    const usuarios = await kv.getByPrefix('user:');

    const totalContratos = contratos.length;
    const contratosVigentes = contratos.filter((c: any) => c.status === 'vigente').length;
    const contratosVencidos = contratos.filter((c: any) => c.status === 'vencido').length;
    const contratosSuspensos = contratos.filter((c: any) => c.status === 'suspenso').length;
    const valorTotal = contratos.reduce((sum: number, c: any) => sum + (c.valor || 0), 0);

    const totalAlertas = alertas.length;
    const alertasCriticos = alertas.filter((a: any) => a.prioridade === 'critica').length;
    const alertasNaoLidos = alertas.filter((a: any) => a.status === 'nao_lido').length;

    const alertasPorTipo = alertas.reduce((acc: any, alerta: any) => {
      const tipo = alerta.tipo || 'outro';
      acc[tipo] = (acc[tipo] || 0) + 1;
      return acc;
    }, {});

    const hoje = new Date();
    const em30Dias = new Date();
    em30Dias.setDate(hoje.getDate() + 30);

    const contratosVencendo = contratos.filter((c: any) => {
      if (!c.dataFim && !c.dataTermino) return false;
      const dataFim = new Date(c.dataFim || c.dataTermino);
      return dataFim >= hoje && dataFim <= em30Dias;
    }).length;

    const stats = {
      contratos: {
        total: totalContratos,
        vigentes: contratosVigentes,
        vencidos: contratosVencidos,
        suspensos: contratosSuspensos,
        vencendo: contratosVencendo,
        valorTotal: valorTotal
      },
      alertas: {
        total: totalAlertas,
        criticos: alertasCriticos,
        naoLidos: alertasNaoLidos,
        porTipo: alertasPorTipo
      },
      usuarios: {
        total: usuarios.length,
        ativos: usuarios.filter((u: any) => u.situacao === 'ativo').length
      },
      timestamp: new Date().toISOString()
    };

    return c.json({
      success: true,
      stats: stats
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ========================================
// SOLICITAÇÕES DE ACESSO
// ========================================

app.post('/make-server-1a8b02da/solicitar-cadastro', async (c) => {
  try {
    const { nome, email, cargo, setor, senha, justificativa } = await c.req.json();

    if (!nome || !email || !senha) {
      return c.json({ error: 'Nome, email e senha são obrigatórios' }, 400);
    }

    const solicitacaoId = `solicitacao-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const novaSolicitacao = {
      id: solicitacaoId,
      nome,
      email,
      cargo: cargo || '',
      setor: setor || '',
      senha,
      justificativa: justificativa || '',
      status: 'pendente',
      criadoEm: new Date().toISOString()
    };

    await kv.set(`solicitacao:${solicitacaoId}`, novaSolicitacao);

    return c.json({
      success: true,
      message: 'Solicitação enviada com sucesso',
      solicitacao: { id: solicitacaoId, status: 'pendente' }
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get('/make-server-1a8b02da/solicitacoes', async (c) => {
  try {
    const solicitacoes = await kv.getByPrefix('solicitacao:');
    
    return c.json({
      success: true,
      solicitacoes: solicitacoes,
      total: solicitacoes.length
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.put('/make-server-1a8b02da/solicitacoes/:id', async (c) => {
  try {
    const solicitacaoId = c.req.param('id');
    const updateData = await c.req.json();

    const solicitacaoExistente = await kv.get(`solicitacao:${solicitacaoId}`);
    
    if (!solicitacaoExistente) {
      return c.json({ error: 'Solicitação não encontrada' }, 404);
    }

    const solicitacaoAtualizada = {
      ...solicitacaoExistente,
      ...updateData,
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(`solicitacao:${solicitacaoId}`, solicitacaoAtualizada);

    return c.json({
      success: true,
      solicitacao: solicitacaoAtualizada
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Aprovar solicitação
app.post('/make-server-1a8b02da/solicitacoes/:id/aprovar', async (c) => {
  try {
    const solicitacaoId = c.req.param('id');
    const { perfil, senha, observacoes } = await c.req.json();

    console.log(`✅ [SOLICITAÇÕES] Aprovando solicitação ${solicitacaoId}...`);

    const solicitacao = await kv.get(`solicitacao:${solicitacaoId}`);
    
    if (!solicitacao) {
      return c.json({ error: 'Solicitação não encontrada' }, 404);
    }

    if (solicitacao.status !== 'pendente') {
      return c.json({ error: 'Solicitação já foi processada' }, 400);
    }

    // Criar usuário no Supabase Auth
    const senhaFinal = senha || solicitacao.senha;
    const { data, error } = await supabase.auth.admin.createUser({
      email: solicitacao.email,
      password: senhaFinal,
      email_confirm: true,
      user_metadata: {
        nome: solicitacao.nome,
        perfil: perfil,
        secretaria: solicitacao.setor || 'Não definida'
      }
    });

    if (error) {
      console.error('❌ [SOLICITAÇÕES] Erro ao criar usuário:', error.message);
      return c.json({ error: error.message }, 500);
    }

    // Salvar usuário no KV Store
    const userData = {
      id: data.user.id,
      email: solicitacao.email,
      nome: solicitacao.nome,
      perfil: perfil,
      secretaria: solicitacao.setor || 'Não definida',
      situacao: 'ativo',
      criadoEm: new Date().toISOString(),
      ultimoAcesso: new Date().toISOString()
    };

    await kv.set(`user:${data.user.id}`, userData);

    // Atualizar solicitação
    const solicitacaoAtualizada = {
      ...solicitacao,
      status: 'aprovada',
      perfilAtribuido: perfil,
      observacoes: observacoes || '',
      aprovadoEm: new Date().toISOString(),
      usuarioId: data.user.id
    };

    await kv.set(`solicitacao:${solicitacaoId}`, solicitacaoAtualizada);

    console.log(`✅ [SOLICITAÇÕES] Solicitação aprovada e usuário criado: ${data.user.id}`);

    return c.json({
      success: true,
      message: 'Solicitação aprovada e usuário criado com sucesso',
      solicitacao: solicitacaoAtualizada,
      usuario: userData
    });

  } catch (error: any) {
    console.error('❌ [SOLICITAÇÕES] Erro ao aprovar:', error.message);
    return c.json({ error: error.message }, 500);
  }
});

// Rejeitar solicitação
app.post('/make-server-1a8b02da/solicitacoes/:id/rejeitar', async (c) => {
  try {
    const solicitacaoId = c.req.param('id');
    const { observacoes } = await c.req.json();

    console.log(`❌ [SOLICITAÇÕES] Rejeitando solicitação ${solicitacaoId}...`);

    const solicitacao = await kv.get(`solicitacao:${solicitacaoId}`);
    
    if (!solicitacao) {
      return c.json({ error: 'Solicitação não encontrada' }, 404);
    }

    if (solicitacao.status !== 'pendente') {
      return c.json({ error: 'Solicitação já foi processada' }, 400);
    }

    // Atualizar solicitação
    const solicitacaoAtualizada = {
      ...solicitacao,
      status: 'rejeitada',
      observacoes: observacoes || '',
      rejeitadoEm: new Date().toISOString()
    };

    await kv.set(`solicitacao:${solicitacaoId}`, solicitacaoAtualizada);

    console.log(`✅ [SOLICITAÇÕES] Solicitação rejeitada: ${solicitacaoId}`);

    return c.json({
      success: true,
      message: 'Solicitação rejeitada com sucesso',
      solicitacao: solicitacaoAtualizada
    });

  } catch (error: any) {
    console.error('❌ [SOLICITAÇÕES] Erro ao rejeitar:', error.message);
    return c.json({ error: error.message }, 500);
  }
});

// ========================================
// UTILITÁRIOS
// ========================================

// Limpar secretarias antigas e recriar
app.post('/make-server-1a8b02da/resetar-secretarias', async (c) => {
  try {
    console.log('🗑️ [RESETAR-SECRETARIAS] Deletando secretarias antigas...');

    const secretariasAntigas = await kv.getByPrefix('secretaria:');
    
    for (const secretaria of secretariasAntigas) {
      // secretaria.id já contém o prefixo completo "secretaria:xxx"
      await kv.del(secretaria.id);
    }
    
    console.log(`✅ [RESETAR-SECRETARIAS] ${secretariasAntigas.length} secretarias deletadas`);
    console.log('📝 [RESETAR-SECRETARIAS] Criando secretarias novas...');
    
    for (const sec of SECRETARIAS_PADRAO) {
      const secretariaIdBase = `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const secretariaId = `secretaria:${secretariaIdBase}`; // ID completo com prefixo
      const secretaria = {
        id: secretariaId, // Salvar ID completo no objeto
        nome: sec.nome,
        sigla: sec.sigla,
        responsavel: '',
        situacao: 'ativa',
        criadoEm: new Date().toISOString()
      };
      
      await kv.set(secretariaId, secretaria); // Chave = ID completo
      console.log(`  ✓ ${sec.sigla} - ${sec.nome}`);
    }
    
    console.log(`✅ [RESETAR-SECRETARIAS] ${SECRETARIAS_PADRAO.length} secretarias criadas!`);

    return c.json({
      success: true,
      message: 'Secretarias resetadas com sucesso',
      secretariasDeletadas: secretariasAntigas.length,
      secretariasCriadas: SECRETARIAS_PADRAO.length
    });

  } catch (error: any) {
    console.error('❌ [RESETAR-SECRETARIAS] Erro:', error.message);
    return c.json({ error: error.message }, 500);
  }
});

app.post('/make-server-1a8b02da/limpar-dados', async (c) => {
  try {
    console.log('🗑️ [LIMPAR-DADOS] Deletando contratos e alertas...');

    const contratos = await kv.getByPrefix('contrato:');
    const alertas = await kv.getByPrefix('alerta:');

    for (const contrato of contratos) {
      await kv.del(`contrato:${contrato.id}`);
    }

    for (const alerta of alertas) {
      await kv.del(`alerta:${alerta.id}`);
    }

    console.log(`✅ [LIMPAR-DADOS] ${contratos.length} contratos deletados`);
    console.log(`✅ [LIMPAR-DADOS] ${alertas.length} alertas deletados`);

    return c.json({
      success: true,
      message: 'Dados limpos com sucesso',
      contratosDeletados: contratos.length,
      alertasDeletados: alertas.length
    });

  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ========================================
// INICIAR SERVIDOR
// ========================================

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

Deno.serve(app.fetch);