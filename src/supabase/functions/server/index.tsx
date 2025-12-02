import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();
app.use("/*", cors({ origin: "*", allowHeaders: ["Content-Type", "Authorization"], allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], exposeHeaders: ["Content-Length"], maxAge: 600 }));
app.use('*', logger(console.log));

// Validação de variáveis de ambiente
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ ERRO CRÍTICO: Variáveis de ambiente SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configuradas!');
}

const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_SERVICE_ROLE_KEY ?? '');

// Função de autenticação
const auth = async (c) => { 
  const t = c.req.header('Authorization')?.split(' ')[1]; 
  if (!t) return null; 
  const { data: { user }, error } = await supabase.auth.getUser(t); 
  return user && !error ? user : null; 
};

// Função de validação de e-mail
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Health check
app.get("/make-server-1a8b02da/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

// ========================================
// AUTENTICAÇÃO
// ========================================

app.post("/make-server-1a8b02da/auth/setup-admin", async (c) => {
  try {
    console.log('🔧 [SETUP] Iniciando configuração do administrador...');
    const e = 'controleinterno@jardim.ce.gov.br', p = '@Gustavo25';
    
    console.log('📋 [SETUP] Listando usuários existentes...');
    const { data: u } = await supabase.auth.admin.listUsers();
    console.log(`📊 [SETUP] Total de usuários no sistema: ${u?.users?.length || 0}`);
    
    const x = u?.users?.find(u => u.email === e);
    
    if (x) { 
      console.log(`⚠️ [SETUP] Administrador já existe (ID: ${x.id}). Removendo usuário antigo...`);
      const { error: delError } = await supabase.auth.admin.deleteUser(x.id);
      if (delError) {
        console.error('❌ [SETUP] Erro ao deletar usuário antigo:', delError.message);
      } else {
        console.log('✅ [SETUP] Usuário antigo deletado com sucesso');
      }
      await kv.del(`user:${x.id}`); 
      console.log('✅ [SETUP] Dados do KV deletados');
    }
    
    console.log('📝 [SETUP] Criando novo usuário no Supabase Auth...');
    console.log(`   Email: ${e}`);
    console.log(`   Senha: ${p}`);
    
    const { data: d, error: err } = await supabase.auth.admin.createUser({ 
      email: e, 
      password: p, 
      user_metadata: { nome: 'Gustavo Barros', perfil: 'Administrador CGM', secretaria: 'CGM - Controladoria Geral' }, 
      email_confirm: true 
    });
    
    if (err) {
      console.error('❌ [SETUP] Erro ao criar administrador no Supabase Auth:', err.message);
      console.error('❌ [SETUP] Detalhes do erro:', JSON.stringify(err, null, 2));
      return c.json({ error: `Erro ao criar administrador: ${err.message}` }, 500);
    }
    
    console.log('✅ [SETUP] Usuário criado no Supabase Auth!');
    console.log(`   ID: ${d.user.id}`);
    console.log(`   Email: ${d.user.email}`);
    console.log(`   Email confirmado: ${d.user.email_confirmed_at ? 'Sim' : 'Não'}`);
    
    console.log('💾 [SETUP] Salvando dados no KV Store...');
    await kv.set(`user:${d.user.id}`, { 
      id: d.user.id, 
      email: e, 
      nome: 'Gustavo Barros', 
      perfil: 'Administrador CGM', 
      secretaria: 'CGM - Controladoria Geral', 
      situacao: 'ativo', 
      criadoEm: new Date().toISOString(), 
      ultimoAcesso: null 
    });
    
    console.log('✅ [SETUP] Dados salvos no KV Store!');
    console.log('🎉 [SETUP] Administrador configurado com sucesso!');
    console.log('');
    console.log('📋 CREDENCIAIS:');
    console.log(`   Email: ${e}`);
    console.log(`   Senha: ${p}`);
    console.log('');
    
    return c.json({ 
      success: true, 
      message: 'Administrador configurado com sucesso!', 
      user: { id: d.user.id, email: e, nome: 'Gustavo Barros', perfil: 'Administrador CGM' }, 
      credentials: { email: e, password: p } 
    });
  } catch (error) { 
    console.error('❌ [SETUP] Erro inesperado no setup do administrador:', error.message);
    console.error('❌ [SETUP] Stack trace:', error.stack);
    return c.json({ error: `Erro no setup: ${error.message}` }, 500); 
  }
});

app.post("/make-server-1a8b02da/auth/signup", async (c) => {
  try {
    const { email, password, nome, perfil, secretaria } = await c.req.json();
    
    // Validações
    if (!email || !password || !nome || !perfil || !secretaria) {
      console.warn('⚠️ [SIGNUP] Campos obrigatórios faltando');
      return c.json({ error: "Todos os campos são obrigatórios" }, 400);
    }
    
    if (!isValidEmail(email)) {
      console.warn(`⚠️ [SIGNUP] E-mail inválido: ${email}`);
      return c.json({ error: "E-mail inválido" }, 400);
    }
    
    if (password.length < 6) {
      console.warn('⚠️ [SIGNUP] Senha muito curta');
      return c.json({ error: "A senha deve ter pelo menos 6 caracteres" }, 400);
    }
    
    // Verificar se e-mail já existe
    const { data: u } = await supabase.auth.admin.listUsers();
    if (u?.users?.find(u => u.email === email)) {
      console.warn(`⚠️ [SIGNUP] E-mail já cadastrado: ${email}`);
      return c.json({ error: "Este e-mail já está cadastrado no sistema", userAlreadyExists: true }, 400);
    }
    
    const { data: d, error: e } = await supabase.auth.admin.createUser({ 
      email, 
      password, 
      user_metadata: { nome, perfil, secretaria }, 
      email_confirm: true 
    });
    
    if (e) {
      console.error(`❌ [SIGNUP] Erro ao criar usuário no Supabase Auth (${email}):`, e.message);
      return c.json({ error: `Erro ao criar usuário: ${e.message}` }, 400);
    }
    
    await kv.set(`user:${d.user.id}`, { 
      id: d.user.id, 
      email, 
      nome, 
      perfil, 
      secretaria, 
      situacao: 'ativo', 
      criadoEm: new Date().toISOString(), 
      ultimoAcesso: null 
    });
    
    console.log(`✅ [SIGNUP] Usuário criado com sucesso: ${email} (${perfil})`);
    return c.json({ success: true, user: { id: d.user.id, email, nome, perfil, secretaria } });
  } catch (error) { 
    console.error('❌ [SIGNUP] Erro inesperado ao criar usuário:', error.message);
    return c.json({ error: `Erro ao criar usuário: ${error.message}` }, 500); 
  }
});

app.post("/make-server-1a8b02da/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      console.warn('⚠️ [LOGIN] E-mail ou senha faltando');
      return c.json({ error: "E-mail e senha são obrigatórios" }, 400);
    }
    
    console.log(`🔐 [LOGIN] Tentativa de login: ${email}`);
    
    // IMPORTANTE: No servidor, precisamos listar todos os usuários e validar as credenciais
    // pois signInWithPassword só funciona no cliente
    const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ [LOGIN] Erro ao listar usuários:', listError.message);
      return c.json({ error: "Erro ao validar credenciais" }, 500);
    }
    
    // Encontrar o usuário pelo email
    const authUser = usersData?.users?.find(u => u.email === email);
    
    if (!authUser) {
      console.warn(`⚠️ [LOGIN] Usuário não encontrado: ${email}`);
      
      // 🔍 VERIFICAR SE EXISTE SOLICITAÇÃO PENDENTE
      const solicitacoesPendentes = await kv.getByPrefix("solicitacao:");
      const solicitacaoPendente = solicitacoesPendentes.find(s => s.email === email && s.status === 'pendente');
      
      if (solicitacaoPendente) {
        console.warn(`⏳ [LOGIN] Solicitação pendente encontrada para: ${email}`);
        return c.json({ 
          error: "Sua solicitação de cadastro ainda está pendente de aprovação pelo administrador. Aguarde a análise.",
          hint: "Você receberá um e-mail quando sua solicitação for aprovada."
        }, 401);
      }
      
      return c.json({ 
        error: "Credenciais inválidas. Verifique seu e-mail e senha.",
        hint: "Se você ainda não tem uma conta, execute o Setup Inicial ou solicite acesso."
      }, 401);
    }
    
    // Tentar fazer signIn usando o service role para validar a senha
    // Criar um cliente temporário SEM o service role key para testar as credenciais
    const testClient = createClient(
      SUPABASE_URL ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );
    
    const { data, error } = await testClient.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.warn(`⚠️ [LOGIN] Erro ao autenticar ${email}:`, error.message);
      
      // Mensagens de erro mais específicas
      if (error.message.includes('Invalid login credentials')) {
        return c.json({ 
          error: "Credenciais inválidas. Verifique seu e-mail e senha.",
          hint: "Se você ainda não tem uma conta, execute o Setup Inicial ou solicite acesso."
        }, 401);
      }
      
      if (error.message.includes('Email not confirmed')) {
        return c.json({ 
          error: "E-mail não confirmado. Entre em contato com o administrador.",
        }, 401);
      }
      
      return c.json({ 
        error: "Credenciais inválidas",
        details: error.message 
      }, 401);
    }
    
    // Buscar dados completos do usuário no KV
    let userData = await kv.get(`user:${authUser.id}`);
    
    if (!userData) {
      console.warn(`⚠️ [LOGIN] Usuário não encontrado no KV: ${authUser.id}, criando registro...`);
      // Criar registro no KV se não existir
      userData = {
        id: authUser.id,
        email: authUser.email,
        nome: authUser.user_metadata?.nome || 'Usuário',
        perfil: authUser.user_metadata?.perfil || 'gestor',
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
    
    console.log(`✅ [LOGIN] Login bem-sucedido: ${email} (Perfil: ${userData.perfil})`);
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
  } catch (error) { 
    console.error('❌ [LOGIN] Erro inesperado ao fazer login:', error.message);
    return c.json({ error: `Erro ao fazer login: ${error.message}` }, 500); 
  }
});

// ========================================
// SOLICITAÇÕES DE CADASTRO
// ========================================

app.post("/make-server-1a8b02da/solicitar-cadastro", async (c) => {
  try {
    const { nome, email, cargo, setor, senha, confirmarSenha, justificativa } = await c.req.json();
    
    // Validações
    if (!nome || !email || !cargo || !setor || !senha || !confirmarSenha || !justificativa) {
      console.warn('⚠️ [SOLICITACAO] Campos obrigatórios faltando');
      return c.json({ error: "Todos os campos são obrigatórios" }, 400);
    }
    
    if (!isValidEmail(email)) {
      console.warn(`⚠️ [SOLICITACAO] E-mail inválido: ${email}`);
      return c.json({ error: "E-mail inválido" }, 400);
    }
    
    if (senha !== confirmarSenha) {
      console.warn('⚠️ [SOLICITACAO] Senhas não coincidem');
      return c.json({ error: "As senhas não coincidem" }, 400);
    }
    
    if (senha.length < 6) {
      console.warn('⚠️ [SOLICITACAO] Senha muito curta');
      return c.json({ error: "A senha deve ter pelo menos 6 caracteres" }, 400);
    }
    
    // Verificar se já existe solicitação pendente
    const s = await kv.getByPrefix("solicitacao:");
    if (s.find((x) => x.email === email && x.status === 'pendente')) {
      console.warn(`⚠️ [SOLICITACAO] Solicitação pendente já existe para: ${email}`);
      return c.json({ error: "Já existe uma solicitação pendente para este e-mail" }, 400);
    }
    
    // Verificar se e-mail já está cadastrado
    const { data: u } = await supabase.auth.admin.listUsers();
    if (u?.users?.find(x => x.email === email)) {
      console.warn(`⚠️ [SOLICITACAO] E-mail já cadastrado: ${email}`);
      return c.json({ error: "Este e-mail já está cadastrado no sistema" }, 400);
    }
    
    const id = crypto.randomUUID();
    const n = { 
      id, 
      nome, 
      email, 
      cargo, 
      setor, 
      senha, 
      justificativa, 
      status: 'pendente', 
      criadoEm: new Date().toISOString(), 
      analisadoEm: null, 
      analisadoPor: null, 
      observacoes: null 
    };
    
    await kv.set(`solicitacao:${id}`, n);
    
    console.log(`✅ [SOLICITACAO] Solicitação criada: ${email} (${cargo})`);
    return c.json({ success: true, message: "Solicitação enviada com sucesso", solicitacao: n }, 201);
  } catch (error) { 
    console.error('❌ [SOLICITACAO] Erro inesperado ao enviar solicitação:', error.message);
    return c.json({ error: `Erro ao enviar solicitação: ${error.message}` }, 500); 
  }
});

app.get("/make-server-1a8b02da/solicitacoes", async (c) => {
  try {
    const u = await auth(c);
    if (!u) {
      console.warn('⚠️ [SOLICITACOES] Tentativa de acesso não autorizado');
      return c.json({ error: "Não autorizado" }, 401);
    }
    
    const d = await kv.get(`user:${u.id}`);
    const isAdmin = d && (d.perfil === 'admin' || d.perfil === 'Administrador CGM');
    
    if (!isAdmin) {
      console.warn(`⚠️ [SOLICITACOES] Acesso negado para usuário não-admin: ${u.email}`);
      return c.json({ error: "Acesso negado. Apenas administradores." }, 403);
    }
    
    // Buscar todas as solicitações e filtrar apenas as pendentes
    const todasSolicitacoes = await kv.getByPrefix("solicitacao:");
    const solicitacoesPendentes = todasSolicitacoes.filter(s => s.status === 'pendente');
    solicitacoesPendentes.sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
    
    console.log(`✅ [SOLICITACOES] Lista de solicitações pendentes retornada (${solicitacoesPendentes.length} itens)`);
    return c.json({ success: true, solicitacoes: solicitacoesPendentes });
  } catch (error) { 
    console.error('❌ [SOLICITACOES] Erro ao listar solicitações:', error.message);
    return c.json({ error: `Erro ao listar solicitações: ${error.message}` }, 500); 
  }
});

app.post("/make-server-1a8b02da/solicitacoes/:id/aprovar", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const d = await kv.get(`user:${u.id}`);
    const isAdmin = d && (d.perfil === 'admin' || d.perfil === 'Administrador CGM');
    
    if (!isAdmin) {
      console.warn(`⚠️ [APROVAR] Acesso negado para usuário não-admin: ${u.email}`);
      return c.json({ error: "Acesso negado. Apenas administradores." }, 403);
    }
    
    const id = c.req.param('id');
    const { perfil, observacoes } = await c.req.json();
    
    const s = await kv.get(`solicitacao:${id}`);
    if (!s) {
      console.warn(`⚠️ [APROVAR] Solicitação não encontrada: ${id}`);
      return c.json({ error: "Solicitação não encontrada" }, 404);
    }
    
    if (s.status !== 'pendente') {
      console.warn(`⚠️ [APROVAR] Solicitação já analisada: ${id}`);
      return c.json({ error: "Esta solicitação já foi analisada" }, 400);
    }
    
    if (!perfil) {
      console.warn('⚠️ [APROVAR] Perfil não fornecido');
      return c.json({ error: "Perfil é obrigatório" }, 400);
    }
    
    const { data: a, error: e } = await supabase.auth.admin.createUser({ 
      email: s.email, 
      password: s.senha, 
      user_metadata: { nome: s.nome, perfil, secretaria: s.setor }, 
      email_confirm: true 
    });
    
    if (e) {
      console.error(`❌ [APROVAR] Erro ao criar usuário (${s.email}):`, e.message);
      return c.json({ error: `Erro ao criar usuário: ${e.message}` }, 400);
    }
    
    await kv.set(`user:${a.user.id}`, { 
      id: a.user.id, 
      email: s.email, 
      nome: s.nome, 
      perfil, 
      secretaria: s.setor, 
      situacao: 'ativo', 
      criadoEm: new Date().toISOString(), 
      ultimoAcesso: null 
    });
    
    const n = { 
      ...s, 
      status: 'aprovada', 
      analisadoEm: new Date().toISOString(), 
      analisadoPor: u.id, 
      observacoes, 
      usuarioCriadoId: a.user.id 
    };
    await kv.set(`solicitacao:${id}`, n);
    
    console.log(`✅ [APROVAR] Solicitação aprovada e usuário criado: ${s.email} (${perfil})`);
    return c.json({ 
      success: true, 
      message: "Usuário criado com sucesso", 
      solicitacao: n, 
      usuario: { id: a.user.id, email: s.email, nome: s.nome, perfil, senha: s.senha } 
    });
  } catch (error) { 
    console.error('❌ [APROVAR] Erro inesperado ao aprovar solicitação:', error.message);
    return c.json({ error: `Erro ao aprovar solicitação: ${error.message}` }, 500); 
  }
});

app.post("/make-server-1a8b02da/solicitacoes/:id/rejeitar", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const d = await kv.get(`user:${u.id}`);
    const isAdmin = d && (d.perfil === 'admin' || d.perfil === 'Administrador CGM');
    
    if (!isAdmin) {
      console.warn(`⚠️ [REJEITAR] Acesso negado para usuário não-admin: ${u.email}`);
      return c.json({ error: "Acesso negado. Apenas administradores." }, 403);
    }
    
    const id = c.req.param('id');
    const { observacoes } = await c.req.json();
    
    const s = await kv.get(`solicitacao:${id}`);
    if (!s) {
      console.warn(`⚠️ [REJEITAR] Solicitação não encontrada: ${id}`);
      return c.json({ error: "Solicitação não encontrada" }, 404);
    }
    
    if (s.status !== 'pendente') {
      console.warn(`⚠️ [REJEITAR] Solicitação já analisada: ${id}`);
      return c.json({ error: "Esta solicitação já foi analisada" }, 400);
    }
    
    const n = { 
      ...s, 
      status: 'rejeitada', 
      analisadoEm: new Date().toISOString(), 
      analisadoPor: u.id, 
      observacoes: observacoes || 'Solicitação rejeitada' 
    };
    await kv.set(`solicitacao:${id}`, n);
    
    console.log(`✅ [REJEITAR] Solicitação rejeitada: ${s.email}`);
    return c.json({ success: true, message: "Solicitação rejeitada", solicitacao: n });
  } catch (error) { 
    console.error('❌ [REJEITAR] Erro inesperado ao rejeitar solicitação:', error.message);
    return c.json({ error: `Erro ao rejeitar solicitação: ${error.message}` }, 500); 
  }
});

// ========================================
// CONTRATOS
// ========================================

// ========================================
// DEBUG (Rotas de utilidade para diagnóstico)
// ========================================

app.get("/make-server-1a8b02da/debug/list-auth-users", async (c) => {
  try {
    console.log('🔍 [DEBUG] Listando usuários do Supabase Auth...');
    
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('❌ [DEBUG] Erro ao listar usuários:', error.message);
      return c.json({ error: `Erro ao listar usuários: ${error.message}` }, 500);
    }
    
    console.log(`✅ [DEBUG] Total de usuários: ${data.users.length}`);
    
    return c.json({ 
      success: true, 
      users: data.users.map(u => ({
        id: u.id,
        email: u.email,
        created_at: u.created_at,
        email_confirmed_at: u.email_confirmed_at,
        user_metadata: u.user_metadata
      }))
    });
  } catch (error) {
    console.error('❌ [DEBUG] Erro inesperado:', error.message);
    return c.json({ error: `Erro: ${error.message}` }, 500);
  }
});

app.post("/make-server-1a8b02da/debug/reset-password", async (c) => {
  try {
    const { email, novaSenha } = await c.req.json();
    
    if (!email || !novaSenha) {
      return c.json({ error: "Email e nova senha são obrigatórios" }, 400);
    }
    
    console.log(`🔑 [DEBUG] Resetando senha para: ${email}`);
    
    // Buscar o usuário pelo email
    const { data: usersData } = await supabase.auth.admin.listUsers();
    const user = usersData.users.find(u => u.email === email);
    
    if (!user) {
      console.warn(`⚠️ [DEBUG] Usuário não encontrado: ${email}`);
      return c.json({ error: "Usuário não encontrado" }, 404);
    }
    
    // Atualizar a senha do usuário
    const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
      password: novaSenha
    });
    
    if (error) {
      console.error(`❌ [DEBUG] Erro ao resetar senha: ${error.message}`);
      return c.json({ error: `Erro ao resetar senha: ${error.message}` }, 500);
    }
    
    console.log(`✅ [DEBUG] Senha resetada com sucesso para: ${email}`);
    
    return c.json({ 
      success: true, 
      message: "Senha resetada com sucesso",
      user: {
        id: data.user.id,
        email: data.user.email
      }
    });
  } catch (error) {
    console.error('❌ [DEBUG] Erro inesperado:', error.message);
    return c.json({ error: `Erro: ${error.message}` }, 500);
  }
});

app.post("/make-server-1a8b02da/debug/check-user", async (c) => {
  try {
    const { email } = await c.req.json();
    
    if (!email) {
      return c.json({ error: "Email é obrigatório" }, 400);
    }
    
    console.log(`🔍 [DEBUG] Verificando usuário: ${email}`);
    
    // Buscar no Supabase Auth
    const { data: usersData } = await supabase.auth.admin.listUsers();
    const authUser = usersData.users.find(u => u.email === email);
    
    // Buscar no KV Store
    const allUsers = await kv.getByPrefix("user:");
    const kvUser = allUsers.find(u => u.email === email);
    
    console.log(`📊 [DEBUG] Auth: ${authUser ? 'EXISTE' : 'NÃO EXISTE'} | KV: ${kvUser ? 'EXISTE' : 'NÃO EXISTE'}`);
    
    return c.json({
      success: true,
      authUser: authUser ? {
        id: authUser.id,
        email: authUser.email,
        created_at: authUser.created_at,
        email_confirmed_at: authUser.email_confirmed_at,
        user_metadata: authUser.user_metadata
      } : null,
      kvUser: kvUser || null
    });
  } catch (error) {
    console.error('❌ [DEBUG] Erro inesperado:', error.message);
    return c.json({ error: `Erro: ${error.message}` }, 500);
  }
});

app.post("/make-server-1a8b02da/debug/fix-user", async (c) => {
  try {
    const { email, novaSenha } = await c.req.json();
    
    if (!email || !novaSenha) {
      return c.json({ error: "Email e senha são obrigatórios" }, 400);
    }
    
    console.log(`🔧 [DEBUG] Corrigindo usuário: ${email}`);
    
    // Buscar no KV Store
    const allUsers = await kv.getByPrefix("user:");
    const kvUser = allUsers.find(u => u.email === email);
    
    if (!kvUser) {
      return c.json({ error: "Usuário não encontrado no KV Store" }, 404);
    }
    
    // Verificar se existe no Auth
    const { data: usersData } = await supabase.auth.admin.listUsers();
    let authUser = usersData.users.find(u => u.email === email);
    
    if (authUser) {
      // Já existe, só atualizar a senha
      console.log(`✏️ [DEBUG] Usuário já existe no Auth, atualizando senha...`);
      const { error } = await supabase.auth.admin.updateUserById(authUser.id, {
        password: novaSenha
      });
      
      if (error) {
        throw new Error(`Erro ao atualizar senha: ${error.message}`);
      }
    } else {
      // Não existe, criar
      console.log(`➕ [DEBUG] Criando usuário no Supabase Auth...`);
      const { data, error } = await supabase.auth.admin.createUser({
        email: kvUser.email,
        password: novaSenha,
        user_metadata: {
          nome: kvUser.nome,
          perfil: kvUser.perfil,
          secretaria: kvUser.secretaria
        },
        email_confirm: true
      });
      
      if (error) {
        throw new Error(`Erro ao criar usuário: ${error.message}`);
      }
      
      authUser = data.user;
      
      // Atualizar o ID no KV se necessário
      if (kvUser.id !== authUser.id) {
        await kv.del(`user:${kvUser.id}`);
        await kv.set(`user:${authUser.id}`, {
          ...kvUser,
          id: authUser.id
        });
      }
    }
    
    console.log(`✅ [DEBUG] Usuário corrigido com sucesso!`);
    
    return c.json({
      success: true,
      message: "Usuário corrigido com sucesso",
      user: {
        id: authUser.id,
        email: authUser.email,
        nome: kvUser.nome,
        perfil: kvUser.perfil
      }
    });
  } catch (error) {
    console.error('❌ [DEBUG] Erro ao corrigir usuário:', error.message);
    return c.json({ error: `Erro: ${error.message}` }, 500);
  }
});

app.post("/make-server-1a8b02da/debug/fix-all-users", async (c) => {
  try {
    console.log('🔧 [DEBUG] Corrigindo TODOS os usuários...');
    
    const senhaTemporaria = 'SenhaTemp123';
    
    // Buscar todos os usuários do KV
    const allKvUsers = await kv.getByPrefix("user:");
    console.log(`📊 [DEBUG] Total de usuários no KV: ${allKvUsers.length}`);
    
    // Buscar todos os usuários do Auth
    const { data: usersData } = await supabase.auth.admin.listUsers();
    const authUsers = usersData.users;
    console.log(`📊 [DEBUG] Total de usuários no Auth: ${authUsers.length}`);
    
    const fixedUsers = [];
    
    for (const kvUser of allKvUsers) {
      console.log(`🔍 [DEBUG] Processando: ${kvUser.email}`);
      
      let authUser = authUsers.find(u => u.email === kvUser.email);
      
      if (authUser) {
        // Já existe, só atualizar a senha
        console.log(`   ✏️ Atualizando senha...`);
        const { error } = await supabase.auth.admin.updateUserById(authUser.id, {
          password: senhaTemporaria
        });
        
        if (error) {
          console.error(`   ❌ Erro ao atualizar: ${error.message}`);
          continue;
        }
      } else {
        // Não existe, criar
        console.log(`   ➕ Criando no Auth...`);
        const { data, error } = await supabase.auth.admin.createUser({
          email: kvUser.email,
          password: senhaTemporaria,
          user_metadata: {
            nome: kvUser.nome,
            perfil: kvUser.perfil,
            secretaria: kvUser.secretaria
          },
          email_confirm: true
        });
        
        if (error) {
          console.error(`   ❌ Erro ao criar: ${error.message}`);
          continue;
        }
        
        authUser = data.user;
        
        // Atualizar o ID no KV se necessário
        if (kvUser.id !== authUser.id) {
          await kv.del(`user:${kvUser.id}`);
          await kv.set(`user:${authUser.id}`, {
            ...kvUser,
            id: authUser.id
          });
        }
      }
      
      console.log(`   ✅ OK!`);
      
      fixedUsers.push({
        email: kvUser.email,
        nome: kvUser.nome,
        perfil: kvUser.perfil,
        senhaTemporaria
      });
    }
    
    console.log(`✅ [DEBUG] Processo concluído! ${fixedUsers.length} usuários corrigidos.`);
    
    return c.json({
      success: true,
      message: `${fixedUsers.length} usuários corrigidos com sucesso`,
      users: fixedUsers,
      senhaTemporaria
    });
  } catch (error) {
    console.error('❌ [DEBUG] Erro ao corrigir usuários:', error.message);
    return c.json({ error: `Erro: ${error.message}` }, 500);
  }
});

app.post("/make-server-1a8b02da/debug/delete-user", async (c) => {
  try {
    const { userId } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "userId é obrigatório" }, 400);
    }
    
    console.log(`🗑️ [DEBUG] Excluindo usuário: ${userId}`);
    
    // Buscar informações do usuário antes de excluir
    const { data: userData } = await supabase.auth.admin.getUserById(userId);
    const userEmail = userData?.user?.email || 'desconhecido';
    
    console.log(`   Email: ${userEmail}`);
    console.log(`   ID: ${userId}`);
    
    // Excluir do Supabase Auth
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
    
    if (deleteError) {
      console.error(`❌ [DEBUG] Erro ao excluir do Auth: ${deleteError.message}`);
      return c.json({ error: `Erro ao excluir usuário: ${deleteError.message}` }, 500);
    }
    
    console.log(`✅ [DEBUG] Usuário excluído do Supabase Auth`);
    
    // Excluir do KV Store
    try {
      await kv.del(`user:${userId}`);
      console.log(`✅ [DEBUG] Usuário excluído do KV Store`);
    } catch (kvError) {
      console.warn(`⚠️ [DEBUG] Erro ao excluir do KV: ${kvError.message}`);
    }
    
    console.log(`🎉 [DEBUG] Usuário ${userEmail} excluído com sucesso!`);
    
    return c.json({
      success: true,
      message: `Usuário ${userEmail} excluído com sucesso`,
      userId,
      email: userEmail
    });
  } catch (error) {
    console.error('❌ [DEBUG] Erro ao excluir usuário:', error.message);
    return c.json({ error: `Erro: ${error.message}` }, 500);
  }
});

app.post("/make-server-1a8b02da/debug/change-profile", async (c) => {
  try {
    const { email, novoPerfil } = await c.req.json();
    
    if (!email || !novoPerfil) {
      return c.json({ error: "Email e novo perfil são obrigatórios" }, 400);
    }
    
    console.log(`🔧 [DEBUG] Alterando perfil de: ${email} para: ${novoPerfil}`);
    
    // Buscar no KV Store
    const allUsers = await kv.getByPrefix("user:");
    const kvUser = allUsers.find(u => u.email === email);
    
    if (!kvUser) {
      return c.json({ error: "Usuário não encontrado" }, 404);
    }
    
    const oldProfile = kvUser.perfil;
    
    // Atualizar no KV
    await kv.set(`user:${kvUser.id}`, {
      ...kvUser,
      perfil: novoPerfil
    });
    
    // Atualizar no Auth também
    const { data: usersData } = await supabase.auth.admin.listUsers();
    const authUser = usersData.users.find(u => u.email === email);
    
    if (authUser) {
      await supabase.auth.admin.updateUserById(authUser.id, {
        user_metadata: {
          ...authUser.user_metadata,
          perfil: novoPerfil
        }
      });
    }
    
    console.log(`✅ [DEBUG] Perfil alterado: ${oldProfile} → ${novoPerfil}`);
    
    return c.json({
      success: true,
      message: "Perfil alterado com sucesso",
      user: {
        email,
        nome: kvUser.nome,
        perfil: novoPerfil
      },
      oldProfile
    });
  } catch (error) {
    console.error('❌ [DEBUG] Erro ao alterar perfil:', error.message);
    return c.json({ error: `Erro: ${error.message}` }, 500);
  }
});

app.post("/make-server-1a8b02da/debug/test-login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: "Email e senha são obrigatórios" }, 400);
    }
    
    console.log(`🔐 [DEBUG] Testando login para: ${email}`);
    
    // Criar um cliente temporário SEM o service role key para testar as credenciais
    const testClient = createClient(
      SUPABASE_URL ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );
    
    const { data, error } = await testClient.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.warn(`⚠️ [DEBUG] Erro ao autenticar ${email}:`, error.message);
      return c.json({ 
        success: false,
        error: error.message,
        hint: "Senha incorreta ou usuário não existe"
      });
    }
    
    console.log(`✅ [DEBUG] Login bem-sucedido para: ${email}`);
    
    return c.json({
      success: true,
      message: "Login funcionou!",
      user: {
        id: data.user.id,
        email: data.user.email
      }
    });
  } catch (error) {
    console.error('❌ [DEBUG] Erro inesperado:', error.message);
    return c.json({ error: `Erro: ${error.message}` }, 500);
  }
});

// ========================================
// CONTRATOS
// ========================================

app.get("/make-server-1a8b02da/contratos", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const d = await kv.getByPrefix("contrato:");
    console.log(`✅ [CONTRATOS] Lista de contratos retornada (${d.length} itens)`);
    return c.json({ success: true, contratos: d });
  } catch (error) { 
    console.error('❌ [CONTRATOS] Erro ao listar contratos:', error.message);
    return c.json({ error: `Erro ao listar contratos: ${error.message}` }, 500); 
  }
});

app.get("/make-server-1a8b02da/contratos/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const id = c.req.param('id');
    const d = await kv.get(`contrato:${id}`);
    
    if (!d) {
      console.warn(`⚠️ [CONTRATOS] Contrato não encontrado: ${id}`);
      return c.json({ error: "Contrato não encontrado" }, 404);
    }
    
    console.log(`✅ [CONTRATOS] Contrato retornado: ${id}`);
    return c.json({ success: true, contrato: d });
  } catch (error) { 
    console.error('❌ [CONTRATOS] Erro ao buscar contrato:', error.message);
    return c.json({ error: `Erro ao buscar contrato: ${error.message}` }, 500); 
  }
});

app.post("/make-server-1a8b02da/contratos", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const d = await c.req.json();
    const id = crypto.randomUUID();
    const n = { 
      ...d, 
      id, 
      criadoEm: new Date().toISOString(), 
      criadoPor: u.id, 
      atualizadoEm: new Date().toISOString() 
    };
    
    await kv.set(`contrato:${id}`, n);
    
    console.log(`✅ [CONTRATOS] Contrato criado: ${id} por ${u.email}`);
    return c.json({ success: true, contrato: n }, 201);
  } catch (error) { 
    console.error('❌ [CONTRATOS] Erro ao criar contrato:', error.message);
    return c.json({ error: `Erro ao criar contrato: ${error.message}` }, 500); 
  }
});

app.put("/make-server-1a8b02da/contratos/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const id = c.req.param('id');
    const e = await kv.get(`contrato:${id}`);
    
    if (!e) {
      console.warn(`⚠️ [CONTRATOS] Contrato não encontrado para atualização: ${id}`);
      return c.json({ error: "Contrato não encontrado" }, 404);
    }
    
    const up = await c.req.json();
    const n = { 
      ...e, 
      ...up, 
      id, 
      atualizadoEm: new Date().toISOString(), 
      atualizadoPor: u.id 
    };
    
    await kv.set(`contrato:${id}`, n);
    
    console.log(`✅ [CONTRATOS] Contrato atualizado: ${id} por ${u.email}`);
    return c.json({ success: true, contrato: n });
  } catch (error) { 
    console.error('❌ [CONTRATOS] Erro ao atualizar contrato:', error.message);
    return c.json({ error: `Erro ao atualizar contrato: ${error.message}` }, 500); 
  }
});

app.delete("/make-server-1a8b02da/contratos/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const id = c.req.param('id');
    const contrato = await kv.get(`contrato:${id}`);
    
    if (!contrato) {
      console.warn(`⚠️ [CONTRATOS] Contrato não encontrado para exclusão: ${id}`);
      return c.json({ error: "Contrato não encontrado" }, 404);
    }
    
    await kv.del(`contrato:${id}`);
    
    console.log(`✅ [CONTRATOS] Contrato deletado: ${id} por ${u.email}`);
    return c.json({ success: true, message: "Contrato deletado com sucesso" });
  } catch (error) { 
    console.error('❌ [CONTRATOS] Erro ao deletar contrato:', error.message);
    return c.json({ error: `Erro ao deletar contrato: ${error.message}` }, 500); 
  }
});

// Deletar TODOS os contratos (apenas para admin)
app.delete("/make-server-1a8b02da/contratos", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const userData = await kv.get(`user:${u.id}`);
    
    // Verificar se é administrador (aceitar tanto 'admin' quanto 'Administrador CGM')
    const isAdmin = userData && (userData.perfil === 'admin' || userData.perfil === 'Administrador CGM');
    
    if (!isAdmin) {
      console.warn(`⚠️ [CONTRATOS] Tentativa de deletar todos os contratos por não-admin: ${u.email} (perfil: ${userData?.perfil})`);
      return c.json({ error: "Acesso negado. Apenas administradores podem deletar todos os contratos." }, 403);
    }
    
    console.log(`🔥 [CONTRATOS] Iniciando deleção de todos os contratos por ${u.email}...`);
    
    // Buscar todos os contratos
    const contratos = await kv.getByPrefix("contrato:");
    
    console.log(`📊 [CONTRATOS] ${contratos.length} contratos encontrados para deletar`);
    
    if (contratos.length === 0) {
      console.log('ℹ️ [CONTRATOS] Nenhum contrato encontrado para deletar');
      return c.json({ success: true, message: "Nenhum contrato encontrado", deletados: 0 });
    }
    
    // Deletar todos
    const ids = contratos.map(c => c.id);
    const keys = ids.map(id => `contrato:${id}`);
    
    console.log(`🗑️ [CONTRATOS] Deletando contratos com IDs:`, ids);
    
    await kv.mdel(keys);
    
    console.log(`✅ [CONTRATOS] ${contratos.length} contratos deletados com sucesso por ${u.email}`);
    return c.json({ 
      success: true, 
      message: `${contratos.length} contrato(s) deletado(s) com sucesso`, 
      deletados: contratos.length 
    });
  } catch (error) { 
    console.error('❌ [CONTRATOS] Erro ao deletar todos os contratos:', error.message);
    return c.json({ error: `Erro ao deletar contratos: ${error.message}` }, 500); 
  }
});

// ========================================
// USUÁRIOS
// ========================================

app.get("/make-server-1a8b02da/usuarios/me", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const d = await kv.get(`user:${u.id}`);
    
    if (!d) {
      console.log(`ℹ️ [USUARIOS] Usuário não encontrado no KV, usando dados do Auth: ${u.email}`);
      return c.json({ 
        success: true, 
        usuario: { 
          id: u.id, 
          email: u.email, 
          nome: u.user_metadata?.nome || 'Usuário', 
          perfil: u.user_metadata?.perfil || 'admin', 
          secretaria: u.user_metadata?.secretaria || 'CGM', 
          situacao: 'ativo' 
        } 
      });
    }
    
    console.log(`✅ [USUARIOS] Dados do usuário retornados: ${u.email}`);
    return c.json({ success: true, usuario: d });
  } catch (error) { 
    console.error('❌ [USUARIOS] Erro ao buscar usuário atual:', error.message);
    return c.json({ error: `Erro ao buscar usuário: ${error.message}` }, 500); 
  }
});

app.get("/make-server-1a8b02da/usuarios", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const d = await kv.getByPrefix("user:");
    console.log(`✅ [USUARIOS] Lista de usuários retornada (${d.length} itens)`);
    return c.json({ success: true, usuarios: d });
  } catch (error) { 
    console.error('❌ [USUARIOS] Erro ao listar usuários:', error.message);
    return c.json({ error: `Erro ao listar usuários: ${error.message}` }, 500); 
  }
});

app.put("/make-server-1a8b02da/usuarios/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const id = c.req.param('id');
    const e = await kv.get(`user:${id}`);
    
    if (!e) {
      console.warn(`⚠️ [USUARIOS] Usuário não encontrado para atualização: ${id}`);
      return c.json({ error: "Usuário não encontrado" }, 404);
    }
    
    const up = await c.req.json();
    const n = { 
      ...e, 
      ...up, 
      id, 
      atualizadoEm: new Date().toISOString() 
    };
    
    await kv.set(`user:${id}`, n);
    
    console.log(`✅ [USUARIOS] Usuário atualizado: ${id} por ${u.email}`);
    return c.json({ success: true, usuario: n });
  } catch (error) { 
    console.error('❌ [USUARIOS] Erro ao atualizar usuário:', error.message);
    return c.json({ error: `Erro ao atualizar usuário: ${error.message}` }, 500); 
  }
});

// Deletar usuário
app.delete("/make-server-1a8b02da/usuarios/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const id = c.req.param('id');
    const e = await kv.get(`user:${id}`);
    
    if (!e) {
      console.warn(`⚠️ [USUARIOS] Usuário não encontrado para exclusão: ${id}`);
      return c.json({ error: "Usuário não encontrado" }, 404);
    }
    
    // Não permitir excluir o administrador principal
    if (e.email === 'controleinterno@jardim.ce.gov.br') {
      console.warn(`⚠️ [USUARIOS] Tentativa de excluir administrador principal`);
      return c.json({ error: "Não é permitido excluir o administrador principal" }, 403);
    }
    
    // Excluir do KV Store
    await kv.del(`user:${id}`);
    
    // Tentar excluir do Supabase Auth também
    try {
      const { error: deleteError } = await supabase.auth.admin.deleteUser(id);
      if (deleteError) {
        console.warn(`⚠️ [USUARIOS] Erro ao excluir usuário do Auth: ${deleteError.message}`);
      } else {
        console.log(`✅ [USUARIOS] Usuário excluído do Supabase Auth: ${id}`);
      }
    } catch (authError) {
      console.warn(`⚠️ [USUARIOS] Erro ao excluir do Auth (ignorado): ${authError.message}`);
    }
    
    console.log(`✅ [USUARIOS] Usuário excluído: ${e.email} (${id}) por ${u.email}`);
    return c.json({ success: true, message: "Usuário excluído com sucesso" });
  } catch (error) { 
    console.error('❌ [USUARIOS] Erro ao excluir usuário:', error.message);
    return c.json({ error: `Erro ao excluir usuário: ${error.message}` }, 500); 
  }
});

// Atualizar perfil do próprio usuário
app.put("/make-server-1a8b02da/usuarios/me/perfil", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const userData = await kv.get(`user:${u.id}`);
    if (!userData) {
      console.warn(`⚠️ [PERFIL] Usuário não encontrado: ${u.id}`);
      return c.json({ error: "Usuário não encontrado" }, 404);
    }
    
    const { nome, secretaria, fotoPerfil, senhaAtual, novaSenha } = await c.req.json();
    
    // Se estiver alterando senha, validar senha atual
    if (novaSenha) {
      if (!senhaAtual) {
        console.warn('⚠️ [PERFIL] Senha atual não fornecida');
        return c.json({ error: "Senha atual é obrigatória para alterar a senha" }, 400);
      }
      
      // Verificar senha atual
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: u.email,
        password: senhaAtual
      });
      
      if (loginError) {
        console.warn(`⚠️ [PERFIL] Senha atual incorreta para ${u.email}`);
        return c.json({ error: "Senha atual incorreta" }, 400);
      }
      
      // Atualizar senha
      const { error: updateError } = await supabase.auth.admin.updateUserById(u.id, {
        password: novaSenha
      });
      
      if (updateError) {
        console.error(`❌ [PERFIL] Erro ao atualizar senha para ${u.email}:`, updateError.message);
        return c.json({ error: `Erro ao atualizar senha: ${updateError.message}` }, 400);
      }
      
      console.log(`✅ [PERFIL] Senha atualizada para ${u.email}`);
    }
    
    // Atualizar dados no KV
    const updated = {
      ...userData,
      nome: nome || userData.nome,
      secretaria: secretaria || userData.secretaria,
      fotoPerfil: fotoPerfil !== undefined ? fotoPerfil : userData.fotoPerfil,
      atualizadoEm: new Date().toISOString()
    };
    
    await kv.set(`user:${u.id}`, updated);
    
    // Atualizar metadata no Auth
    if (nome || secretaria) {
      await supabase.auth.admin.updateUserById(u.id, {
        user_metadata: {
          nome: updated.nome,
          perfil: updated.perfil,
          secretaria: updated.secretaria
        }
      });
    }
    
    console.log(`✅ [PERFIL] Perfil atualizado para ${u.email}`);
    return c.json({ success: true, usuario: updated });
  } catch (error) {
    console.error('❌ [PERFIL] Erro ao atualizar perfil:', error.message);
    return c.json({ error: `Erro ao atualizar perfil: ${error.message}` }, 500);
  }
});

// Upload de foto de perfil
app.post("/make-server-1a8b02da/usuarios/me/foto", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const body = await c.req.json();
    const { foto, fileName } = body;
    
    if (!foto) {
      console.warn('⚠️ [FOTO] Foto não fornecida');
      return c.json({ error: "Foto não fornecida" }, 400);
    }
    
    // Criar bucket se não existir
    const bucketName = 'make-1a8b02da-avatars';
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.log(`📦 [FOTO] Criando bucket ${bucketName}...`);
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true
      });
      
      if (createError) {
        console.error('❌ [FOTO] Erro ao criar bucket:', createError.message);
        return c.json({ error: `Erro ao criar bucket: ${createError.message}` }, 500);
      }
    }
    
    // Converter base64 para buffer
    const base64Data = foto.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    // Nome do arquivo
    const fileExt = fileName?.split('.').pop() || 'jpg';
    const filePath = `${u.id}/${Date.now()}.${fileExt}`;
    
    // Upload
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        contentType: `image/${fileExt}`,
        upsert: true
      });
    
    if (uploadError) {
      console.error('❌ [FOTO] Erro ao fazer upload:', uploadError.message);
      return c.json({ error: `Erro ao fazer upload: ${uploadError.message}` }, 500);
    }
    
    // Obter URL pública
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    
    const fotoUrl = urlData.publicUrl;
    
    // Atualizar usuário com URL da foto
    const userData = await kv.get(`user:${u.id}`);
    const updated = {
      ...userData,
      fotoPerfil: fotoUrl,
      atualizadoEm: new Date().toISOString()
    };
    
    await kv.set(`user:${u.id}`, updated);
    
    console.log(`✅ [FOTO] Foto de perfil atualizada para ${u.email}`);
    return c.json({ success: true, fotoUrl });
  } catch (error) {
    console.error('❌ [FOTO] Erro ao fazer upload da foto:', error.message);
    return c.json({ error: `Erro ao fazer upload: ${error.message}` }, 500);
  }
});

// ========================================
// SECRETARIAS
// ========================================

app.get("/make-server-1a8b02da/secretarias", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    let s = await kv.getByPrefix("secretaria:");
    
    // Inicializar secretarias padrão se não existirem
    if (!s || s.length === 0) {
      console.log('ℹ️ [SECRETARIAS] Inicializando secretarias padrão...');
      const p = [
        { id: '1', nome: 'Secretaria Municipal de Administração e Finanças', sigla: 'SEMAF', responsavel: '', situacao: 'ativa' }, 
        { id: '2', nome: 'Secretaria Municipal de Educação', sigla: 'SEMED', responsavel: '', situacao: 'ativa' }, 
        { id: '3', nome: 'Secretaria Municipal de Saúde', sigla: 'SEMSAU', responsavel: '', situacao: 'ativa' }, 
        { id: '4', nome: 'Secretaria Municipal de Obras e Serviços Públicos', sigla: 'SEMOSP', responsavel: '', situacao: 'ativa' }, 
        { id: '5', nome: 'Secretaria Municipal de Agricultura e Meio Ambiente', sigla: 'SEMAMA', responsavel: '', situacao: 'ativa' }, 
        { id: '6', nome: 'Secretaria Municipal de Assistência Social', sigla: 'SEMAS', responsavel: '', situacao: 'ativa' }, 
        { id: '7', nome: 'Secretaria Municipal de Esporte e Juventude', sigla: 'SEMEJ', responsavel: '', situacao: 'ativa' }, 
        { id: '8', nome: 'Secretaria Municipal de Cultura e Turismo', sigla: 'SEMCULT', responsavel: '', situacao: 'ativa' }, 
        { id: '9', nome: 'Controladoria Geral do Município', sigla: 'CGM', responsavel: '', situacao: 'ativa' }, 
        { id: '10', nome: 'Procuradoria Geral do Município', sigla: 'PGM', responsavel: '', situacao: 'ativa' }
      ];
      
      for (const x of p) {
        await kv.set(`secretaria:${x.id}`, { ...x, criadoEm: new Date().toISOString() });
      }
      
      s = await kv.getByPrefix("secretaria:");
      console.log('✅ [SECRETARIAS] Secretarias padrão inicializadas');
    }
    
    console.log(`✅ [SECRETARIAS] Lista de secretarias retornada (${s.length} itens)`);
    return c.json({ success: true, secretarias: s });
  } catch (error) { 
    console.error('❌ [SECRETARIAS] Erro ao listar secretarias:', error.message);
    return c.json({ error: `Erro ao listar secretarias: ${error.message}` }, 500); 
  }
});

app.post("/make-server-1a8b02da/secretarias", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const { nome, sigla, responsavel } = await c.req.json();
    
    if (!nome || !sigla) {
      console.warn('⚠️ [SECRETARIAS] Nome ou sigla faltando');
      return c.json({ error: "Nome e sigla são obrigatórios" }, 400);
    }
    
    const id = crypto.randomUUID();
    const n = { 
      id, 
      nome, 
      sigla, 
      responsavel: responsavel || '', 
      situacao: 'ativa', 
      criadoEm: new Date().toISOString() 
    };
    
    await kv.set(`secretaria:${id}`, n);
    
    console.log(`✅ [SECRETARIAS] Secretaria criada: ${sigla} por ${u.email}`);
    return c.json({ success: true, secretaria: n });
  } catch (error) { 
    console.error('❌ [SECRETARIAS] Erro ao criar secretaria:', error.message);
    return c.json({ error: `Erro ao criar secretaria: ${error.message}` }, 500); 
  }
});

app.put("/make-server-1a8b02da/secretarias/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const id = c.req.param('id');
    const e = await kv.get(`secretaria:${id}`);
    
    if (!e) {
      console.warn(`⚠️ [SECRETARIAS] Secretaria não encontrada para atualização: ${id}`);
      return c.json({ error: "Secretaria não encontrada" }, 404);
    }
    
    const up = await c.req.json();
    const n = { 
      ...e, 
      ...up, 
      id, 
      atualizadoEm: new Date().toISOString() 
    };
    
    await kv.set(`secretaria:${id}`, n);
    
    console.log(`✅ [SECRETARIAS] Secretaria atualizada: ${id} por ${u.email}`);
    return c.json({ success: true, secretaria: n });
  } catch (error) { 
    console.error('❌ [SECRETARIAS] Erro ao atualizar secretaria:', error.message);
    return c.json({ error: `Erro ao atualizar secretaria: ${error.message}` }, 500); 
  }
});

app.delete("/make-server-1a8b02da/secretarias/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const id = c.req.param('id');
    const secretaria = await kv.get(`secretaria:${id}`);
    
    if (!secretaria) {
      console.warn(`⚠️ [SECRETARIAS] Secretaria não encontrada para exclusão: ${id}`);
      return c.json({ error: "Secretaria não encontrada" }, 404);
    }
    
    await kv.del(`secretaria:${id}`);
    
    console.log(`✅ [SECRETARIAS] Secretaria excluída: ${id} por ${u.email}`);
    return c.json({ success: true, message: "Secretaria excluída com sucesso" });
  } catch (error) { 
    console.error('❌ [SECRETARIAS] Erro ao deletar secretaria:', error.message);
    return c.json({ error: `Erro ao deletar secretaria: ${error.message}` }, 500); 
  }
});

// ========================================
// ALERTAS
// ========================================

app.get("/make-server-1a8b02da/alertas", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const d = await kv.getByPrefix("alerta:");
    console.log(`✅ [ALERTAS] Lista de alertas retornada (${d.length} itens)`);
    return c.json({ success: true, alertas: d });
  } catch (error) { 
    console.error('❌ [ALERTAS] Erro ao listar alertas:', error.message);
    return c.json({ error: `Erro ao listar alertas: ${error.message}` }, 500); 
  }
});

app.post("/make-server-1a8b02da/alertas", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const d = await c.req.json();
    const id = crypto.randomUUID();
    const n = { 
      ...d, 
      id, 
      criadoEm: new Date().toISOString() 
    };
    
    await kv.set(`alerta:${id}`, n);
    
    console.log(`✅ [ALERTAS] Alerta criado: ${id} por ${u.email}`);
    return c.json({ success: true, alerta: n }, 201);
  } catch (error) { 
    console.error('❌ [ALERTAS] Erro ao criar alerta:', error.message);
    return c.json({ error: `Erro ao criar alerta: ${error.message}` }, 500); 
  }
});

app.put("/make-server-1a8b02da/alertas/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const id = c.req.param('id');
    const e = await kv.get(`alerta:${id}`);
    
    if (!e) {
      console.warn(`⚠️ [ALERTAS] Alerta não encontrado para atualização: ${id}`);
      return c.json({ error: "Alerta não encontrado" }, 404);
    }
    
    const up = await c.req.json();
    const n = { 
      ...e, 
      ...up, 
      id, 
      atualizadoEm: new Date().toISOString() 
    };
    
    await kv.set(`alerta:${id}`, n);
    
    console.log(`✅ [ALERTAS] Alerta atualizado: ${id} por ${u.email}`);
    return c.json({ success: true, alerta: n });
  } catch (error) { 
    console.error('❌ [ALERTAS] Erro ao atualizar alerta:', error.message);
    return c.json({ error: `Erro ao atualizar alerta: ${error.message}` }, 500); 
  }
});

// ========================================
// DASHBOARD
// ========================================

app.get("/make-server-1a8b02da/dashboard/stats", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    
    const ct = await kv.getByPrefix("contrato:");
    const al = await kv.getByPrefix("alerta:");
    const us = await kv.getByPrefix("user:");
    
    const st = { 
      totalContratos: ct.length, 
      contratosAtivos: ct.filter((c) => c.status === 'vigente').length, 
      contratosPendentes: ct.filter((c) => c.status === 'pendente').length, 
      contratosVencidos: ct.filter((c) => c.status === 'vencido').length, 
      totalAlertas: al.length, 
      alertasCriticos: al.filter((a) => a.prioridade === 'critica').length, 
      alertasNaoLidos: al.filter((a) => a.status === 'nao_lido').length, 
      totalUsuarios: us.length, 
      usuariosAtivos: us.filter((u) => u.situacao === 'ativo').length 
    };
    
    console.log(`✅ [DASHBOARD] Estatísticas retornadas: ${ct.length} contratos, ${us.length} usuários, ${al.length} alertas`);
    return c.json({ success: true, stats: st });
  } catch (error) { 
    console.error('❌ [DASHBOARD] Erro ao buscar estatísticas:', error.message);
    return c.json({ error: `Erro ao buscar estatísticas: ${error.message}` }, 500); 
  }
});

// ========================================
// LIMPEZA E REORGANIZAÇÃO DO SISTEMA
// ========================================

app.post("/make-server-1a8b02da/admin/limpar-usuarios", async (c) => {
  try {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🗑️ LIMPEZA DE USUÁRIOS - INICIANDO');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    const adminEmail = 'controleinterno@jardim.ce.gov.br';
    
    // Passo 1: Listar todos os usuários do Supabase Auth
    console.log('📋 [PASSO 1] Listando usuários do Supabase Auth...');
    const { data: authData, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Erro ao listar usuários:', listError.message);
      return c.json({ error: `Erro ao listar usuários: ${listError.message}` }, 500);
    }
    
    const todosUsuarios = authData?.users || [];
    console.log(`   Total de usuários encontrados: ${todosUsuarios.length}`);
    
    // Passo 2: Excluir todos exceto o admin
    const usuariosExcluidos = [];
    const errosExclusao = [];
    
    console.log('');
    console.log('🗑️ [PASSO 2] Excluindo usuários do Supabase Auth...');
    
    for (const usuario of todosUsuarios) {
      if (usuario.email !== adminEmail) {
        console.log(`   Excluindo: ${usuario.email} (ID: ${usuario.id})`);
        
        const { error: deleteError } = await supabase.auth.admin.deleteUser(usuario.id);
        
        if (deleteError) {
          console.error(`   ❌ Erro ao excluir ${usuario.email}:`, deleteError.message);
          errosExclusao.push({ email: usuario.email, erro: deleteError.message });
        } else {
          console.log(`   ✅ Excluído: ${usuario.email}`);
          usuariosExcluidos.push(usuario.email);
        }
      } else {
        console.log(`   ⏭️  Mantendo admin: ${usuario.email}`);
      }
    }
    
    // Passo 3: Limpar KV Store de usuários
    console.log('');
    console.log('🗑️ [PASSO 3] Limpando KV Store de usuários...');
    
    const kvUsuarios = await kv.getByPrefix('user:');
    console.log(`   Usuários no KV Store: ${kvUsuarios.length}`);
    
    const kvExcluidos = [];
    
    for (const kvUser of kvUsuarios) {
      if (kvUser.email !== adminEmail) {
        await kv.del(`user:${kvUser.id}`);
        console.log(`   ✅ Removido do KV: ${kvUser.email}`);
        kvExcluidos.push(kvUser.email);
      } else {
        console.log(`   ⏭️  Mantendo no KV: ${kvUser.email}`);
      }
    }
    
    // Passo 4: Garantir que o admin está correto
    console.log('');
    console.log('✅ [PASSO 4] Verificando usuário administrador...');
    
    const adminUser = todosUsuarios.find(u => u.email === adminEmail);
    
    if (!adminUser) {
      console.warn('⚠️ Admin não encontrado! Recriando...');
      
      const { data: newAdmin, error: createError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: '@Gustavo25',
        email_confirm: true,
        user_metadata: {
          nome: 'Gustavo Barros',
          perfil: 'Administrador CGM',
          secretaria: 'CGM - Controladoria Geral'
        }
      });
      
      if (createError) {
        console.error('❌ Erro ao criar admin:', createError.message);
        return c.json({ error: `Erro ao criar admin: ${createError.message}` }, 500);
      }
      
      // Criar no KV Store
      const adminData = {
        id: newAdmin.user.id,
        email: adminEmail,
        nome: 'Gustavo Barros',
        perfil: 'Administrador CGM',
        secretaria: 'CGM - Controladoria Geral',
        criadoEm: new Date().toISOString()
      };
      
      await kv.set(`user:${newAdmin.user.id}`, adminData);
      
      console.log('✅ Admin recriado com sucesso!');
    } else {
      console.log('✅ Admin encontrado:', adminUser.email);
      
      // Verificar e atualizar KV Store
      const kvAdmin = await kv.get(`user:${adminUser.id}`);
      
      if (!kvAdmin) {
        console.log('⚠️ Admin não está no KV Store. Adicionando...');
        
        const adminData = {
          id: adminUser.id,
          email: adminEmail,
          nome: 'Gustavo Barros',
          perfil: 'Administrador CGM',
          secretaria: 'CGM - Controladoria Geral',
          criadoEm: new Date().toISOString()
        };
        
        await kv.set(`user:${adminUser.id}`, adminData);
        console.log('✅ Admin adicionado ao KV Store');
      } else {
        // Atualizar perfil se necessário
        if (kvAdmin.perfil !== 'Administrador CGM') {
          console.log('⚠️ Perfil do admin incorreto. Corrigindo...');
          kvAdmin.perfil = 'Administrador CGM';
          await kv.set(`user:${adminUser.id}`, kvAdmin);
          console.log('✅ Perfil do admin corrigido');
        }
      }
      
      // Atualizar metadados no Supabase Auth
      await supabase.auth.admin.updateUserById(adminUser.id, {
        user_metadata: {
          nome: 'Gustavo Barros',
          perfil: 'Administrador CGM',
          secretaria: 'CGM - Controladoria Geral'
        }
      });
      
      console.log('✅ Metadados do admin atualizados');
    }
    
    // Resumo final
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('✅ LIMPEZA CONCLUÍDA COM SUCESSO!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('📊 RESUMO:');
    console.log(`   Usuários excluídos do Auth: ${usuariosExcluidos.length}`);
    console.log(`   Usuários excluídos do KV: ${kvExcluidos.length}`);
    console.log(`   Erros de exclusão: ${errosExclusao.length}`);
    console.log('');
    console.log('👤 USUÁRIO RESTANTE:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Nome: Gustavo Barros`);
    console.log(`   Perfil: Administrador CGM`);
    console.log(`   Senha: @Gustavo25`);
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return c.json({ 
      success: true, 
      message: 'Limpeza concluída com sucesso!',
      resumo: {
        usuariosExcluidosAuth: usuariosExcluidos.length,
        usuariosExcluidosKV: kvExcluidos.length,
        erros: errosExclusao.length,
        admin: {
          email: adminEmail,
          nome: 'Gustavo Barros',
          perfil: 'Administrador CGM',
          senha: '@Gustavo25'
        }
      },
      detalhes: {
        excluidos: usuariosExcluidos,
        erros: errosExclusao
      }
    });
    
  } catch (error) {
    console.error('❌ [LIMPAR-USUARIOS] Erro inesperado:', error.message);
    console.error('❌ Stack trace:', error.stack);
    return c.json({ error: `Erro na limpeza: ${error.message}` }, 500);
  }
});

// ========================================
// INICIAR SERVIDOR
// ========================================
// Tentando habilitar o servidor com configurações compatíveis com Figma Make
export default {
  fetch: app.fetch,
}

console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('✅ SERVIDOR BACKEND HABILITADO');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
console.log('🚀 Edge Function: make-server-1a8b02da');
console.log('🔌 Endpoint: /make-server-1a8b02da/*');
console.log('📡 Status: Aguardando requisições...');
console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('');