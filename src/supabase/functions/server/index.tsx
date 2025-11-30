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
    
    const { data: u } = await supabase.auth.admin.listUsers();
    const x = u?.users?.find(u => u.email === e);
    
    if (x) { 
      console.log('⚠️ [SETUP] Administrador já existe. Removendo usuário antigo...');
      await supabase.auth.admin.deleteUser(x.id); 
      await kv.del(`user:${x.id}`); 
    }
    
    const { data: d, error: err } = await supabase.auth.admin.createUser({ 
      email: e, 
      password: p, 
      user_metadata: { nome: 'Gustavo Barros', perfil: 'admin', secretaria: 'CGM - Controladoria Geral' }, 
      email_confirm: true 
    });
    
    if (err) {
      console.error('❌ [SETUP] Erro ao criar administrador no Supabase Auth:', err.message);
      return c.json({ error: `Erro ao criar administrador: ${err.message}` }, 500);
    }
    
    await kv.set(`user:${d.user.id}`, { 
      id: d.user.id, 
      email: e, 
      nome: 'Gustavo Barros', 
      perfil: 'admin', 
      secretaria: 'CGM - Controladoria Geral', 
      situacao: 'ativo', 
      criadoEm: new Date().toISOString(), 
      ultimoAcesso: null 
    });
    
    console.log('✅ [SETUP] Administrador configurado com sucesso!');
    return c.json({ 
      success: true, 
      message: 'Administrador configurado com sucesso!', 
      user: { id: d.user.id, email: e, nome: 'Gustavo Barros', perfil: 'admin' }, 
      credentials: { email: e, password: p } 
    });
  } catch (error) { 
    console.error('❌ [SETUP] Erro inesperado no setup do administrador:', error.message);
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
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.warn(`⚠️ [LOGIN] Credenciais inválidas para: ${email}`);
      return c.json({ error: "Credenciais inválidas" }, 401);
    }
    
    // Atualizar último acesso
    const u = await kv.get(`user:${data.user.id}`);
    if (u) {
      await kv.set(`user:${data.user.id}`, { ...u, ultimoAcesso: new Date().toISOString() });
    }
    
    console.log(`✅ [LOGIN] Login bem-sucedido: ${email}`);
    return c.json({ 
      success: true, 
      access_token: data.session.access_token, 
      user: { id: data.user.id, email: data.user.email, ...data.user.user_metadata } 
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
    if (!d || d.perfil !== 'admin') {
      console.warn(`⚠️ [SOLICITACOES] Acesso negado para usuário não-admin: ${u.email}`);
      return c.json({ error: "Acesso negado. Apenas administradores." }, 403);
    }
    
    const s = await kv.getByPrefix("solicitacao:");
    s.sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
    
    console.log(`✅ [SOLICITACOES] Lista de solicitações retornada (${s.length} itens)`);
    return c.json({ success: true, solicitacoes: s });
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
    if (!d || d.perfil !== 'admin') {
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
    if (!d || d.perfil !== 'admin') {
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

Deno.serve(app.fetch);