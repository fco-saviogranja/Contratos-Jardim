import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.ts";

const app = new Hono();
app.use("/*", cors({ origin: "*", allowHeaders: ["Content-Type", "Authorization"], allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], exposeHeaders: ["Content-Length"], maxAge: 600 }));

const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
const auth = async (c) => { const t = c.req.header('Authorization')?.split(' ')[1]; if (!t) return null; const { data: { user }, error } = await supabase.auth.getUser(t); return user && !error ? user : null; };

app.get("/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

app.post("/auth/setup-admin", async (c) => {
  try {
    const e = 'controleinterno@jardim.ce.gov.br', p = '@Gustavo25';
    const { data: u } = await supabase.auth.admin.listUsers();
    const x = u?.users?.find(u => u.email === e);
    if (x) { await supabase.auth.admin.deleteUser(x.id); await kv.del(`user:${x.id}`); }
    const { data: d, error: err } = await supabase.auth.admin.createUser({ email: e, password: p, user_metadata: { nome: 'Administrador CGM', perfil: 'admin', secretaria: 'CGM - Controladoria Geral do Município' }, email_confirm: true });
    if (err) return c.json({ error: err.message }, 500);
    await kv.set(`user:${d.user.id}`, { id: d.user.id, email: e, nome: 'Administrador CGM', perfil: 'admin', secretaria: 'CGM - Controladoria Geral do Município', situacao: 'ativo', criadoEm: new Date().toISOString(), ultimoAcesso: null });
    return c.json({ success: true, message: 'Administrador configurado com sucesso!', user: { id: d.user.id, email: e, nome: 'Administrador CGM', perfil: 'admin' }, credentials: { email: e, password: p } });
  } catch (error) { return c.json({ error: `Erro no setup: ${error.message}` }, 500); }
});

app.post("/auth/signup", async (c) => {
  try {
    const { email, password, nome, perfil, secretaria } = await c.req.json();
    if (!email || !password || !nome || !perfil || !secretaria) return c.json({ error: "Todos os campos são obrigatórios" }, 400);
    const { data: u } = await supabase.auth.admin.listUsers();
    if (u?.users?.find(u => u.email === email)) return c.json({ error: "Este e-mail já está cadastrado no sistema", userAlreadyExists: true }, 400);
    const { data: d, error: e } = await supabase.auth.admin.createUser({ email, password, user_metadata: { nome, perfil, secretaria }, email_confirm: true });
    if (e) return c.json({ error: e.message }, 400);
    await kv.set(`user:${d.user.id}`, { id: d.user.id, email, nome, perfil, secretaria, situacao: 'ativo', criadoEm: new Date().toISOString(), ultimoAcesso: null });
    return c.json({ success: true, user: { id: d.user.id, email, nome, perfil, secretaria } });
  } catch (error) { return c.json({ error: "Erro ao criar usuário" }, 500); }
});

app.post("/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    if (!email || !password) return c.json({ error: "E-mail e senha são obrigatórios" }, 400);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return c.json({ error: "Credenciais inválidas" }, 401);
    const u = await kv.get(`user:${data.user.id}`);
    if (u) await kv.set(`user:${data.user.id}`, { ...u, ultimoAcesso: new Date().toISOString() });
    return c.json({ success: true, access_token: data.session.access_token, user: { id: data.user.id, email: data.user.email, ...data.user.user_metadata } });
  } catch (error) { return c.json({ error: "Erro ao fazer login" }, 500); }
});

app.post("/solicitar-cadastro", async (c) => {
  try {
    const { nome, email, cargo, setor, senha, confirmarSenha, justificativa } = await c.req.json();
    if (!nome || !email || !cargo || !setor || !senha || !confirmarSenha || !justificativa) return c.json({ error: "Todos os campos são obrigatórios" }, 400);
    if (senha !== confirmarSenha) return c.json({ error: "As senhas não coincidem" }, 400);
    if (senha.length < 6) return c.json({ error: "A senha deve ter pelo menos 6 caracteres" }, 400);
    const s = await kv.getByPrefix("solicitacao:");
    if (s.find((x) => x.email === email && x.status === 'pendente')) return c.json({ error: "Já existe uma solicitação pendente para este e-mail" }, 400);
    const { data: u } = await supabase.auth.admin.listUsers();
    if (u?.users?.find(x => x.email === email)) return c.json({ error: "Este e-mail já está cadastrado no sistema" }, 400);
    const id = crypto.randomUUID();
    const n = { id, nome, email, cargo, setor, senha, justificativa, status: 'pendente', criadoEm: new Date().toISOString(), analisadoEm: null, analisadoPor: null, observacoes: null };
    await kv.set(`solicitacao:${id}`, n);
    return c.json({ success: true, message: "Solicitação enviada com sucesso", solicitacao: n }, 201);
  } catch (error) { return c.json({ error: "Erro ao enviar solicitação" }, 500); }
});

app.get("/solicitacoes", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const d = await kv.get(`user:${u.id}`);
    if (!d || d.perfil !== 'admin') return c.json({ error: "Acesso negado. Apenas administradores." }, 403);
    const s = await kv.getByPrefix("solicitacao:");
    s.sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
    return c.json({ success: true, solicitacoes: s });
  } catch (error) { return c.json({ error: "Erro ao listar solicitações" }, 500); }
});

app.post("/solicitacoes/:id/aprovar", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const d = await kv.get(`user:${u.id}`);
    if (!d || d.perfil !== 'admin') return c.json({ error: "Acesso negado. Apenas administradores." }, 403);
    const id = c.req.param('id');
    const { perfil, observacoes } = await c.req.json();
    const s = await kv.get(`solicitacao:${id}`);
    if (!s) return c.json({ error: "Solicitação não encontrada" }, 404);
    if (s.status !== 'pendente') return c.json({ error: "Esta solicitação já foi analisada" }, 400);
    if (!perfil) return c.json({ error: "Perfil é obrigatório" }, 400);
    const { data: a, error: e } = await supabase.auth.admin.createUser({ email: s.email, password: s.senha, user_metadata: { nome: s.nome, perfil, secretaria: s.setor }, email_confirm: true });
    if (e) return c.json({ error: `Erro ao criar usuário: ${e.message}` }, 400);
    await kv.set(`user:${a.user.id}`, { id: a.user.id, email: s.email, nome: s.nome, perfil, secretaria: s.setor, situacao: 'ativo', criadoEm: new Date().toISOString(), ultimoAcesso: null });
    const n = { ...s, status: 'aprovada', analisadoEm: new Date().toISOString(), analisadoPor: u.id, observacoes, usuarioCriadoId: a.user.id };
    await kv.set(`solicitacao:${id}`, n);
    return c.json({ success: true, message: "Usuário criado com sucesso", solicitacao: n, usuario: { id: a.user.id, email: s.email, nome: s.nome, perfil, senha: s.senha } });
  } catch (error) { return c.json({ error: "Erro ao aprovar solicitação" }, 500); }
});

app.post("/solicitacoes/:id/rejeitar", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const d = await kv.get(`user:${u.id}`);
    if (!d || d.perfil !== 'admin') return c.json({ error: "Acesso negado. Apenas administradores." }, 403);
    const id = c.req.param('id');
    const { observacoes } = await c.req.json();
    const s = await kv.get(`solicitacao:${id}`);
    if (!s) return c.json({ error: "Solicitação não encontrada" }, 404);
    if (s.status !== 'pendente') return c.json({ error: "Esta solicitação já foi analisada" }, 400);
    const n = { ...s, status: 'rejeitada', analisadoEm: new Date().toISOString(), analisadoPor: u.id, observacoes: observacoes || 'Solicitação rejeitada' };
    await kv.set(`solicitacao:${id}`, n);
    return c.json({ success: true, message: "Solicitação rejeitada", solicitacao: n });
  } catch (error) { return c.json({ error: "Erro ao rejeitar solicitação" }, 500); }
});

app.get("/contratos", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const d = await kv.getByPrefix("contrato:");
    return c.json({ success: true, contratos: d });
  } catch (error) { return c.json({ error: "Erro ao listar contratos" }, 500); }
});

app.get("/contratos/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const d = await kv.get(`contrato:${c.req.param('id')}`);
    if (!d) return c.json({ error: "Contrato não encontrado" }, 404);
    return c.json({ success: true, contrato: d });
  } catch (error) { return c.json({ error: "Erro ao buscar contrato" }, 500); }
});

app.post("/contratos", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const d = await c.req.json();
    const id = crypto.randomUUID();
    const n = { ...d, id, criadoEm: new Date().toISOString(), criadoPor: u.id, atualizadoEm: new Date().toISOString() };
    await kv.set(`contrato:${id}`, n);
    return c.json({ success: true, contrato: n }, 201);
  } catch (error) { return c.json({ error: "Erro ao criar contrato" }, 500); }
});

app.put("/contratos/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const id = c.req.param('id');
    const e = await kv.get(`contrato:${id}`);
    if (!e) return c.json({ error: "Contrato não encontrado" }, 404);
    const up = await c.req.json();
    const n = { ...e, ...up, id, atualizadoEm: new Date().toISOString(), atualizadoPor: u.id };
    await kv.set(`contrato:${id}`, n);
    return c.json({ success: true, contrato: n });
  } catch (error) { return c.json({ error: "Erro ao atualizar contrato" }, 500); }
});

app.delete("/contratos/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const id = c.req.param('id');
    if (!await kv.get(`contrato:${id}`)) return c.json({ error: "Contrato não encontrado" }, 404);
    await kv.del(`contrato:${id}`);
    return c.json({ success: true, message: "Contrato deletado com sucesso" });
  } catch (error) { return c.json({ error: "Erro ao deletar contrato" }, 500); }
});

app.get("/usuarios/me", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const d = await kv.get(`user:${u.id}`);
    if (!d) return c.json({ success: true, usuario: { id: u.id, email: u.email, nome: u.user_metadata?.nome || 'Usuário', perfil: u.user_metadata?.perfil || 'admin', secretaria: u.user_metadata?.secretaria || 'CGM', situacao: 'ativo' } });
    return c.json({ success: true, usuario: d });
  } catch (error) { return c.json({ error: "Erro ao buscar usuário" }, 500); }
});

app.get("/usuarios", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const d = await kv.getByPrefix("user:");
    return c.json({ success: true, usuarios: d });
  } catch (error) { return c.json({ error: "Erro ao listar usuários" }, 500); }
});

app.put("/usuarios/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const id = c.req.param('id');
    const e = await kv.get(`user:${id}`);
    if (!e) return c.json({ error: "Usuário não encontrado" }, 404);
    const up = await c.req.json();
    const n = { ...e, ...up, id, atualizadoEm: new Date().toISOString() };
    await kv.set(`user:${id}`, n);
    return c.json({ success: true, usuario: n });
  } catch (error) { return c.json({ error: "Erro ao atualizar usuário" }, 500); }
});

app.get("/secretarias", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    let s = await kv.getByPrefix("secretaria:");
    if (!s || s.length === 0) {
      const p = [{ id: '1', nome: 'Secretaria Municipal de Administração e Finanças', sigla: 'SEMAF', responsavel: '', situacao: 'ativa' }, { id: '2', nome: 'Secretaria Municipal de Educação', sigla: 'SEMED', responsavel: '', situacao: 'ativa' }, { id: '3', nome: 'Secretaria Municipal de Saúde', sigla: 'SEMSAU', responsavel: '', situacao: 'ativa' }, { id: '4', nome: 'Secretaria Municipal de Obras e Serviços Públicos', sigla: 'SEMOSP', responsavel: '', situacao: 'ativa' }, { id: '5', nome: 'Secretaria Municipal de Agricultura e Meio Ambiente', sigla: 'SEMAMA', responsavel: '', situacao: 'ativa' }, { id: '6', nome: 'Secretaria Municipal de Assistência Social', sigla: 'SEMAS', responsavel: '', situacao: 'ativa' }, { id: '7', nome: 'Secretaria Municipal de Esporte e Juventude', sigla: 'SEMEJ', responsavel: '', situacao: 'ativa' }, { id: '8', nome: 'Secretaria Municipal de Cultura e Turismo', sigla: 'SEMCULT', responsavel: '', situacao: 'ativa' }, { id: '9', nome: 'Controladoria Geral do Município', sigla: 'CGM', responsavel: '', situacao: 'ativa' }, { id: '10', nome: 'Procuradoria Geral do Município', sigla: 'PGM', responsavel: '', situacao: 'ativa' }];
      for (const x of p) await kv.set(`secretaria:${x.id}`, { ...x, criadoEm: new Date().toISOString() });
      s = await kv.getByPrefix("secretaria:");
    }
    return c.json({ success: true, secretarias: s });
  } catch (error) { return c.json({ error: "Erro ao listar secretarias" }, 500); }
});

app.post("/secretarias", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const { nome, sigla, responsavel } = await c.req.json();
    if (!nome || !sigla) return c.json({ error: "Nome e sigla são obrigatórios" }, 400);
    const id = crypto.randomUUID();
    const n = { id, nome, sigla, responsavel: responsavel || '', situacao: 'ativa', criadoEm: new Date().toISOString() };
    await kv.set(`secretaria:${id}`, n);
    return c.json({ success: true, secretaria: n });
  } catch (error) { return c.json({ error: "Erro ao criar secretaria" }, 500); }
});

app.put("/secretarias/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const id = c.req.param('id');
    const e = await kv.get(`secretaria:${id}`);
    if (!e) return c.json({ error: "Secretaria não encontrada" }, 404);
    const up = await c.req.json();
    const n = { ...e, ...up, id, atualizadoEm: new Date().toISOString() };
    await kv.set(`secretaria:${id}`, n);
    return c.json({ success: true, secretaria: n });
  } catch (error) { return c.json({ error: "Erro ao atualizar secretaria" }, 500); }
});

app.delete("/secretarias/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const id = c.req.param('id');
    if (!await kv.get(`secretaria:${id}`)) return c.json({ error: "Secretaria não encontrada" }, 404);
    await kv.del(`secretaria:${id}`);
    return c.json({ success: true, message: "Secretaria excluída com sucesso" });
  } catch (error) { return c.json({ error: "Erro ao deletar secretaria" }, 500); }
});

app.get("/alertas", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const d = await kv.getByPrefix("alerta:");
    return c.json({ success: true, alertas: d });
  } catch (error) { return c.json({ error: "Erro ao listar alertas" }, 500); }
});

app.post("/alertas", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const d = await c.req.json();
    const id = crypto.randomUUID();
    const n = { ...d, id, criadoEm: new Date().toISOString() };
    await kv.set(`alerta:${id}`, n);
    return c.json({ success: true, alerta: n }, 201);
  } catch (error) { return c.json({ error: "Erro ao criar alerta" }, 500); }
});

app.put("/alertas/:id", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const id = c.req.param('id');
    const e = await kv.get(`alerta:${id}`);
    if (!e) return c.json({ error: "Alerta não encontrado" }, 404);
    const up = await c.req.json();
    const n = { ...e, ...up, id, atualizadoEm: new Date().toISOString() };
    await kv.set(`alerta:${id}`, n);
    return c.json({ success: true, alerta: n });
  } catch (error) { return c.json({ error: "Erro ao atualizar alerta" }, 500); }
});

app.get("/dashboard/stats", async (c) => {
  try {
    const u = await auth(c);
    if (!u) return c.json({ error: "Não autorizado" }, 401);
    const ct = await kv.getByPrefix("contrato:");
    const al = await kv.getByPrefix("alerta:");
    const us = await kv.getByPrefix("user:");
    const st = { totalContratos: ct.length, contratosAtivos: ct.filter((c) => c.status === 'vigente').length, contratosPendentes: ct.filter((c) => c.status === 'pendente').length, contratosVencidos: ct.filter((c) => c.status === 'vencido').length, totalAlertas: al.length, alertasCriticos: al.filter((a) => a.prioridade === 'critica').length, alertasNaoLidos: al.filter((a) => a.status === 'nao_lido').length, totalUsuarios: us.length, usuariosAtivos: us.filter((u) => u.situacao === 'ativo').length };
    return c.json({ success: true, stats: st });
  } catch (error) { return c.json({ error: "Erro ao buscar estatísticas" }, 500); }
});

Deno.serve(app.fetch);
