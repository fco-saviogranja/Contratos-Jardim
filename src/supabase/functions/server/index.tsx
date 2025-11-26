import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Criar cliente Supabase
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Health check endpoint
app.get("/make-server-1a8b02da/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString(), version: "1.0.0" });
});

// ========================================
// AUTENTICAÇÃO
// ========================================

// ROTA DE DIAGNÓSTICO E RESET - Setup completo do administrador
app.post("/make-server-1a8b02da/auth/setup-admin", async (c) => {
  try {
    console.log('🔧 Iniciando setup completo do administrador...');

    const adminEmail = 'controleinterno@jardim.ce.gov.br';
    const adminPassword = '@Gustavo25';
    
    // 1. Listar todos os usuários
    console.log('🔍 Listando usuários existentes...');
    const { data: allUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Erro ao listar usuários:', listError);
    } else {
      console.log(`📋 Total de usuários no sistema: ${allUsers?.users?.length || 0}`);
      allUsers?.users?.forEach(user => {
        console.log(`   - ${user.email} (ID: ${user.id})`);
      });
    }

    // 2. Verificar se o admin já existe e deletar
    const existingAdmin = allUsers?.users?.find(u => u.email === adminEmail);
    
    if (existingAdmin) {
      console.log('⚠️ Usuário administrador já existe, deletando...');
      console.log(`   ID do usuário existente: ${existingAdmin.id}`);
      
      const { error: deleteError } = await supabase.auth.admin.deleteUser(existingAdmin.id);
      
      if (deleteError) {
        console.error('❌ Erro ao deletar usuário:', deleteError);
        return c.json({ 
          error: `Erro ao deletar usuário existente: ${deleteError.message}` 
        }, 500);
      }
      
      console.log('✅ Usuário existente deletado com sucesso!');
      
      // Deletar também da KV Store
      await kv.del(`user:${existingAdmin.id}`);
      console.log('✅ Dados da KV Store deletados');
    }

    // 3. Criar novo usuário administrador
    console.log(' Criando novo usuário administrador...');
    console.log(`   Email: ${adminEmail}`);
    
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      user_metadata: { 
        nome: 'Administrador CGM',
        perfil: 'admin',
        secretaria: 'CGM - Controladoria Geral do Município'
      },
      email_confirm: true
    });

    if (authError) {
      console.error('❌ Erro ao criar usuário:', authError);
      return c.json({ 
        error: `Erro ao criar usuário: ${authError.message}` 
      }, 500);
    }

    console.log('✅ Usuário criado no Supabase Auth!');
    console.log(`   User ID: ${authData.user.id}`);
    console.log(`   Email: ${authData.user.email}`);

    // 4. Salvar dados na KV Store
    console.log('💾 Salvando dados na KV Store...');
    await kv.set(`user:${authData.user.id}`, {
      id: authData.user.id,
      email: adminEmail,
      nome: 'Administrador CGM',
      perfil: 'admin',
      secretaria: 'CGM - Controladoria Geral do Município',
      situacao: 'ativo',
      criadoEm: new Date().toISOString(),
      ultimoAcesso: null
    });

    console.log('✅ Dados salvos na KV Store!');

    // 5. Verificar se foi criado corretamente
    console.log('🔍 Verificando criação...');
    const { data: verifyUsers } = await supabase.auth.admin.listUsers();
    const createdUser = verifyUsers?.users?.find(u => u.email === adminEmail);
    
    if (createdUser) {
      console.log('✅ Verificação: Usuário encontrado no sistema!');
      console.log(`   Confirmado em: ${createdUser.email_confirmed_at}`);
    } else {
      console.log('❌ Verificação: Usuário NÃO foi encontrado!');
    }

    console.log('🎉 Setup completo! Administrador pronto para login.');

    return c.json({
      success: true,
      message: 'Administrador configurado com sucesso!',
      user: {
        id: authData.user.id,
        email: adminEmail,
        nome: 'Administrador CGM',
        perfil: 'admin',
        secretaria: 'CGM - Controladoria Geral do Município'
      },
      credentials: {
        email: adminEmail,
        password: adminPassword
      }
    });

  } catch (error) {
    console.error('❌ Erro no setup:', error);
    return c.json({ 
      error: `Erro no setup: ${error.message}` 
    }, 500);
  }
});

// Signup - criar novo usuário
app.post("/make-server-1a8b02da/auth/signup", async (c) => {
  try {
    const { email, password, nome, perfil, secretaria } = await c.req.json();

    console.log('📝 Tentando criar usuário:', { email, nome, perfil, secretaria });

    if (!email || !password || !nome || !perfil || !secretaria) {
      return c.json({ error: "Todos os campos são obrigatórios" }, 400);
    }

    // Verificar se o usuário já existe
    console.log('🔍 Verificando se usuário já existe...');
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const userExists = existingUser?.users?.find(u => u.email === email);
    
    if (userExists) {
      console.log('⚠️ Usuário já existe:', userExists.id);
      return c.json({ 
        error: "Este e-mail já está cadastrado no sistema. Faça login ou redefina sua senha.",
        userAlreadyExists: true
      }, 400);
    }

    // Criar usuário no Supabase Auth
    console.log('🔐 Criando usuário no Supabase Auth...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { nome, perfil, secretaria },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (authError) {
      console.error("❌ Erro ao criar usuário no Auth:", authError);
      return c.json({ error: authError.message }, 400);
    }

    console.log('✅ Usuário criado no Auth:', authData.user.id);

    // Salvar dados do usuário na KV Store
    console.log('💾 Salvando dados na KV Store...');
    await kv.set(`user:${authData.user.id}`, {
      id: authData.user.id,
      email,
      nome,
      perfil,
      secretaria,
      situacao: 'ativo',
      criadoEm: new Date().toISOString(),
      ultimoAcesso: null
    });

    console.log('✅ Usuário completo criado com sucesso!');

    return c.json({
      success: true,
      user: {
        id: authData.user.id,
        email,
        nome,
        perfil,
        secretaria
      }
    });
  } catch (error) {
    console.error("❌ Erro no signup:", error);
    return c.json({ error: "Erro ao criar usuário" }, 500);
  }
});

// Login - autenticar usuário
app.post("/make-server-1a8b02da/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "E-mail e senha são obrigatórios" }, 400);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erro no login:", error);
      return c.json({ error: "Credenciais inválidas" }, 401);
    }

    // Atualizar último acesso
    const userData = await kv.get(`user:${data.user.id}`);
    if (userData) {
      await kv.set(`user:${data.user.id}`, {
        ...userData,
        ultimoAcesso: new Date().toISOString()
      });
    }

    return c.json({
      success: true,
      access_token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        ...data.user.user_metadata
      }
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return c.json({ error: "Erro ao fazer login" }, 500);
  }
});

// ========================================
// CONTRATOS
// ========================================

// Listar todos os contratos
app.get("/make-server-1a8b02da/contratos", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const contratos = await kv.getByPrefix("contrato:");
    return c.json({ success: true, contratos });
  } catch (error) {
    console.error("Erro ao listar contratos:", error);
    return c.json({ error: "Erro ao listar contratos" }, 500);
  }
});

// Buscar contrato por ID
app.get("/make-server-1a8b02da/contratos/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const id = c.req.param('id');
    const contrato = await kv.get(`contrato:${id}`);

    if (!contrato) {
      return c.json({ error: "Contrato não encontrado" }, 404);
    }

    return c.json({ success: true, contrato });
  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
    return c.json({ error: "Erro ao buscar contrato" }, 500);
  }
});

// Criar novo contrato
app.post("/make-server-1a8b02da/contratos", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const contratoData = await c.req.json();
    const id = crypto.randomUUID();

    const novoContrato = {
      ...contratoData,
      id,
      criadoEm: new Date().toISOString(),
      criadoPor: user.id,
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(`contrato:${id}`, novoContrato);

    console.log(`Contrato criado: ${id} por usuário ${user.id}`);
    return c.json({ success: true, contrato: novoContrato }, 201);
  } catch (error) {
    console.error("Erro ao criar contrato:", error);
    return c.json({ error: "Erro ao criar contrato" }, 500);
  }
});

// Atualizar contrato
app.put("/make-server-1a8b02da/contratos/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const id = c.req.param('id');
    const contratoExistente = await kv.get(`contrato:${id}`);

    if (!contratoExistente) {
      return c.json({ error: "Contrato não encontrado" }, 404);
    }

    const updates = await c.req.json();
    const contratoAtualizado = {
      ...contratoExistente,
      ...updates,
      id, // Garantir que o ID não mude
      atualizadoEm: new Date().toISOString(),
      atualizadoPor: user.id
    };

    await kv.set(`contrato:${id}`, contratoAtualizado);

    console.log(`Contrato atualizado: ${id} por usuário ${user.id}`);
    return c.json({ success: true, contrato: contratoAtualizado });
  } catch (error) {
    console.error("Erro ao atualizar contrato:", error);
    return c.json({ error: "Erro ao atualizar contrato" }, 500);
  }
});

// Deletar contrato
app.delete("/make-server-1a8b02da/contratos/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const id = c.req.param('id');
    const contratoExistente = await kv.get(`contrato:${id}`);

    if (!contratoExistente) {
      return c.json({ error: "Contrato não encontrado" }, 404);
    }

    await kv.del(`contrato:${id}`);

    console.log(`Contrato deletado: ${id} por usuário ${user.id}`);
    return c.json({ success: true, message: "Contrato deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar contrato:", error);
    return c.json({ error: "Erro ao deletar contrato" }, 500);
  }
});

// ========================================
// USUÁRIOS
// ========================================

// Solicitar cadastro no sistema (público - sem autenticação)
app.post("/make-server-1a8b02da/solicitar-cadastro", async (c) => {
  try {
    const { nome, email, cargo, setor, senha, confirmarSenha, justificativa } = await c.req.json();

    console.log('📝 Nova solicitação de cadastro recebida:', { email, nome, cargo, setor });

    if (!nome || !email || !cargo || !setor || !senha || !confirmarSenha || !justificativa) {
      return c.json({ error: "Todos os campos são obrigatórios" }, 400);
    }

    // Validar se as senhas coincidem
    if (senha !== confirmarSenha) {
      return c.json({ error: "As senhas não coincidem" }, 400);
    }

    // Validar tamanho mínimo da senha
    if (senha.length < 6) {
      return c.json({ error: "A senha deve ter pelo menos 6 caracteres" }, 400);
    }

    // Verificar se já existe solicitação pendente para este e-mail
    const solicitacoes = await kv.getByPrefix("solicitacao:");
    const solicitacaoExistente = solicitacoes.find((s: any) => 
      s.email === email && s.status === 'pendente'
    );

    if (solicitacaoExistente) {
      return c.json({ 
        error: "Já existe uma solicitação pendente para este e-mail" 
      }, 400);
    }

    // Verificar se o usuário já está cadastrado
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const usuarioExiste = existingUsers?.users?.find(u => u.email === email);

    if (usuarioExiste) {
      return c.json({ 
        error: "Este e-mail já está cadastrado no sistema" 
      }, 400);
    }

    // Criar solicitação
    const id = crypto.randomUUID();
    const novaSolicitacao = {
      id,
      nome,
      email,
      cargo,
      setor,
      senha, // Salvar senha temporariamente
      justificativa,
      status: 'pendente', // pendente | aprovada | rejeitada
      criadoEm: new Date().toISOString(),
      analisadoEm: null,
      analisadoPor: null,
      observacoes: null
    };

    await kv.set(`solicitacao:${id}`, novaSolicitacao);

    console.log(`✅ Solicitação de cadastro criada: ${id} para ${email}`);

    return c.json({ 
      success: true, 
      message: "Solicitação enviada com sucesso",
      solicitacao: novaSolicitacao 
    }, 201);
  } catch (error) {
    console.error("❌ Erro ao criar solicitação de cadastro:", error);
    return c.json({ error: "Erro ao enviar solicitação" }, 500);
  }
});

// Listar solicitações de cadastro (apenas admin)
app.get("/make-server-1a8b02da/solicitacoes", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    // Verificar se é admin
    const userData = await kv.get(`user:${user.id}`);
    if (!userData || userData.perfil !== 'admin') {
      return c.json({ error: "Acesso negado. Apenas administradores." }, 403);
    }

    const solicitacoes = await kv.getByPrefix("solicitacao:");
    
    // Ordenar por data (mais recentes primeiro)
    solicitacoes.sort((a: any, b: any) => 
      new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
    );

    return c.json({ success: true, solicitacoes });
  } catch (error) {
    console.error("Erro ao listar solicitações:", error);
    return c.json({ error: "Erro ao listar solicitações" }, 500);
  }
});

// Aprovar solicitação de cadastro (apenas admin)
app.post("/make-server-1a8b02da/solicitacoes/:id/aprovar", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    // Verificar se é admin
    const userData = await kv.get(`user:${user.id}`);
    if (!userData || userData.perfil !== 'admin') {
      return c.json({ error: "Acesso negado. Apenas administradores." }, 403);
    }

    const id = c.req.param('id');
    const { perfil, observacoes } = await c.req.json();

    const solicitacao = await kv.get(`solicitacao:${id}`);
    if (!solicitacao) {
      return c.json({ error: "Solicitação não encontrada" }, 404);
    }

    if (solicitacao.status !== 'pendente') {
      return c.json({ error: "Esta solicitação já foi analisada" }, 400);
    }

    if (!perfil) {
      return c.json({ error: "Perfil é obrigatório" }, 400);
    }

    // Criar usuário no Supabase Auth
    console.log(`🔐 Criando usuário aprovado: ${solicitacao.email}`);
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: solicitacao.email,
      password: solicitacao.senha,
      user_metadata: { 
        nome: solicitacao.nome,
        perfil,
        secretaria: solicitacao.setor
      },
      email_confirm: true
    });

    if (authError) {
      console.error("❌ Erro ao criar usuário:", authError);
      return c.json({ error: `Erro ao criar usuário: ${authError.message}` }, 400);
    }

    console.log(`✅ Usuário criado no Auth: ${authData.user.id}`);

    // Salvar dados do usuário na KV Store
    await kv.set(`user:${authData.user.id}`, {
      id: authData.user.id,
      email: solicitacao.email,
      nome: solicitacao.nome,
      perfil,
      secretaria: solicitacao.setor,
      situacao: 'ativo',
      criadoEm: new Date().toISOString(),
      ultimoAcesso: null
    });

    // Atualizar solicitação
    const solicitacaoAtualizada = {
      ...solicitacao,
      status: 'aprovada',
      analisadoEm: new Date().toISOString(),
      analisadoPor: user.id,
      observacoes,
      usuarioCriadoId: authData.user.id
    };

    await kv.set(`solicitacao:${id}`, solicitacaoAtualizada);

    console.log(`✅ Solicitação aprovada: ${id}`);

    return c.json({ 
      success: true, 
      message: "Usuário criado com sucesso",
      solicitacao: solicitacaoAtualizada,
      usuario: {
        id: authData.user.id,
        email: solicitacao.email,
        nome: solicitacao.nome,
        perfil,
        senha: solicitacao.senha
      }
    });
  } catch (error) {
    console.error("❌ Erro ao aprovar solicitação:", error);
    return c.json({ error: "Erro ao aprovar solicitação" }, 500);
  }
});

// Rejeitar solicitação de cadastro (apenas admin)
app.post("/make-server-1a8b02da/solicitacoes/:id/rejeitar", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    // Verificar se é admin
    const userData = await kv.get(`user:${user.id}`);
    if (!userData || userData.perfil !== 'admin') {
      return c.json({ error: "Acesso negado. Apenas administradores." }, 403);
    }

    const id = c.req.param('id');
    const { observacoes } = await c.req.json();

    const solicitacao = await kv.get(`solicitacao:${id}`);
    if (!solicitacao) {
      return c.json({ error: "Solicitação não encontrada" }, 404);
    }

    if (solicitacao.status !== 'pendente') {
      return c.json({ error: "Esta solicitação já foi analisada" }, 400);
    }

    // Atualizar solicitação
    const solicitacaoAtualizada = {
      ...solicitacao,
      status: 'rejeitada',
      analisadoEm: new Date().toISOString(),
      analisadoPor: user.id,
      observacoes: observacoes || 'Solicitação rejeitada'
    };

    await kv.set(`solicitacao:${id}`, solicitacaoAtualizada);

    console.log(`❌ Solicitação rejeitada: ${id}`);

    return c.json({ 
      success: true, 
      message: "Solicitação rejeitada",
      solicitacao: solicitacaoAtualizada
    });
  } catch (error) {
    console.error("❌ Erro ao rejeitar solicitação:", error);
    return c.json({ error: "Erro ao rejeitar solicitação" }, 500);
  }
});

// Buscar usuário atual (me)
app.get("/make-server-1a8b02da/usuarios/me", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const usuario = await kv.get(`user:${user.id}`);

    if (!usuario) {
      // Se não encontrar na KV, retornar dados do Auth
      return c.json({
        success: true,
        usuario: {
          id: user.id,
          email: user.email,
          nome: user.user_metadata?.nome || 'Usuário',
          perfil: user.user_metadata?.perfil || 'admin',
          secretaria: user.user_metadata?.secretaria || 'CGM',
          situacao: 'ativo'
        }
      });
    }

    return c.json({ success: true, usuario });
  } catch (error) {
    console.error("Erro ao buscar usuário atual:", error);
    return c.json({ error: "Erro ao buscar usuário" }, 500);
  }
});

// Listar todos os usuários
app.get("/make-server-1a8b02da/usuarios", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const usuarios = await kv.getByPrefix("user:");
    return c.json({ success: true, usuarios });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return c.json({ error: "Erro ao listar usuários" }, 500);
  }
});

// Atualizar usuário
app.put("/make-server-1a8b02da/usuarios/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const id = c.req.param('id');
    const usuarioExistente = await kv.get(`user:${id}`);

    if (!usuarioExistente) {
      return c.json({ error: "Usuário não encontrado" }, 404);
    }

    const updates = await c.req.json();
    const usuarioAtualizado = {
      ...usuarioExistente,
      ...updates,
      id, // Garantir que o ID não mude
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(`user:${id}`, usuarioAtualizado);

    console.log(`Usuário atualizado: ${id}`);
    return c.json({ success: true, usuario: usuarioAtualizado });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return c.json({ error: "Erro ao atualizar usuário" }, 500);
  }
});

// ========================================
// SECRETARIAS
// ========================================

// Listar todas as secretarias
app.get("/make-server-1a8b02da/secretarias", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    let secretarias = await kv.getByPrefix("secretaria:");
    
    // Se não houver secretarias, criar as secretarias padrão de Jardim-CE
    if (!secretarias || secretarias.length === 0) {
      console.log('🏛️ Criando secretarias padrão de Jardim-CE...');
      
      const secretariasPadrao = [
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
      
      for (const sec of secretariasPadrao) {
        await kv.set(`secretaria:${sec.id}`, {
          ...sec,
          criadoEm: new Date().toISOString()
        });
      }
      
      secretarias = await kv.getByPrefix("secretaria:");
      console.log(`✅ ${secretarias.length} secretarias criadas com sucesso!`);
    }
    
    return c.json({ success: true, secretarias });
  } catch (error) {
    console.error("Erro ao listar secretarias:", error);
    return c.json({ error: "Erro ao listar secretarias" }, 500);
  }
});

// Criar nova secretaria
app.post("/make-server-1a8b02da/secretarias", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const body = await c.req.json();
    const { nome, sigla, responsavel } = body;

    if (!nome || !sigla) {
      return c.json({ error: "Nome e sigla são obrigatórios" }, 400);
    }

    const secretariaId = crypto.randomUUID();
    const novaSecretaria = {
      id: secretariaId,
      nome,
      sigla,
      responsavel: responsavel || '',
      situacao: 'ativa',
      criadoEm: new Date().toISOString()
    };

    await kv.set(`secretaria:${secretariaId}`, novaSecretaria);

    console.log(`Secretaria criada: ${nome} (${sigla})`);
    return c.json({ success: true, secretaria: novaSecretaria });
  } catch (error) {
    console.error("Erro ao criar secretaria:", error);
    return c.json({ error: "Erro ao criar secretaria" }, 500);
  }
});

// Atualizar secretaria
app.put("/make-server-1a8b02da/secretarias/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const id = c.req.param('id');
    const secretariaExistente = await kv.get(`secretaria:${id}`);

    if (!secretariaExistente) {
      return c.json({ error: "Secretaria não encontrada" }, 404);
    }

    const updates = await c.req.json();
    const secretariaAtualizada = {
      ...secretariaExistente,
      ...updates,
      id, // Garantir que o ID não mude
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(`secretaria:${id}`, secretariaAtualizada);

    console.log(`Secretaria atualizada: ${id}`);
    return c.json({ success: true, secretaria: secretariaAtualizada });
  } catch (error) {
    console.error("Erro ao atualizar secretaria:", error);
    return c.json({ error: "Erro ao atualizar secretaria" }, 500);
  }
});

// Deletar secretaria
app.delete("/make-server-1a8b02da/secretarias/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const id = c.req.param('id');
    const secretaria = await kv.get(`secretaria:${id}`);

    if (!secretaria) {
      return c.json({ error: "Secretaria não encontrada" }, 404);
    }

    await kv.del(`secretaria:${id}`);

    console.log(`Secretaria deletada: ${id}`);
    return c.json({ success: true, message: "Secretaria excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar secretaria:", error);
    return c.json({ error: "Erro ao deletar secretaria" }, 500);
  }
});

// ========================================
// ALERTAS
// ========================================

// Listar todos os alertas
app.get("/make-server-1a8b02da/alertas", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const alertas = await kv.getByPrefix("alerta:");
    return c.json({ success: true, alertas });
  } catch (error) {
    console.error("Erro ao listar alertas:", error);
    return c.json({ error: "Erro ao listar alertas" }, 500);
  }
});

// Criar novo alerta
app.post("/make-server-1a8b02da/alertas", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const alertaData = await c.req.json();
    const id = crypto.randomUUID();

    const novoAlerta = {
      ...alertaData,
      id,
      criadoEm: new Date().toISOString()
    };

    await kv.set(`alerta:${id}`, novoAlerta);

    console.log(`Alerta criado: ${id}`);
    return c.json({ success: true, alerta: novoAlerta }, 201);
  } catch (error) {
    console.error("Erro ao criar alerta:", error);
    return c.json({ error: "Erro ao criar alerta" }, 500);
  }
});

// Atualizar status do alerta
app.put("/make-server-1a8b02da/alertas/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const id = c.req.param('id');
    const alertaExistente = await kv.get(`alerta:${id}`);

    if (!alertaExistente) {
      return c.json({ error: "Alerta não encontrado" }, 404);
    }

    const updates = await c.req.json();
    const alertaAtualizado = {
      ...alertaExistente,
      ...updates,
      id,
      atualizadoEm: new Date().toISOString()
    };

    await kv.set(`alerta:${id}`, alertaAtualizado);

    console.log(`Alerta atualizado: ${id}`);
    return c.json({ success: true, alerta: alertaAtualizado });
  } catch (error) {
    console.error("Erro ao atualizar alerta:", error);
    return c.json({ error: "Erro ao atualizar alerta" }, 500);
  }
});

// ========================================
// ESTATÍSTICAS / DASHBOARD
// ========================================

app.get("/make-server-1a8b02da/dashboard/stats", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Não autorizado" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: "Token inválido" }, 401);
    }

    const contratos = await kv.getByPrefix("contrato:");
    const alertas = await kv.getByPrefix("alerta:");
    const usuarios = await kv.getByPrefix("user:");

    // Calcular estatísticas
    const stats = {
      totalContratos: contratos.length,
      contratosAtivos: contratos.filter((c: any) => c.status === 'vigente').length,
      contratosPendentes: contratos.filter((c: any) => c.status === 'pendente').length,
      contratosVencidos: contratos.filter((c: any) => c.status === 'vencido').length,
      totalAlertas: alertas.length,
      alertasCriticos: alertas.filter((a: any) => a.prioridade === 'critica').length,
      alertasNaoLidos: alertas.filter((a: any) => a.status === 'nao_lido').length,
      totalUsuarios: usuarios.length,
      usuariosAtivos: usuarios.filter((u: any) => u.situacao === 'ativo').length
    };

    return c.json({ success: true, stats });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return c.json({ error: "Erro ao buscar estatísticas" }, 500);
  }
});

Deno.serve(app.fetch);