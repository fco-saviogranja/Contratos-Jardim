// Utilitário para configurar o administrador do sistema via console
// Este arquivo expõe funções globais que podem ser chamadas diretamente no console do navegador

// Função auxiliar para fazer requisições ao servidor
async function apiRequest(endpoint, options = {}) {
  const projectId = 'yxxkishjqjsoxcjlqdrk';
  const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4eGtpc2hqcWpzb3hjamxxZHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNzYwMjUsImV4cCI6MjA0ODY1MjAyNX0.oHgWRF3S9BDwu8v7L9s2OdNRj_eqXwdEkgbT0kJJiDM';
  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da`;
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`,
    ...options.headers,
  };

  console.log('🌐 Requisição:', `${serverUrl}${endpoint}`);

  const response = await fetch(`${serverUrl}${endpoint}`, {
    ...options,
    headers,
  });

  console.log('📡 Status:', response.status, response.statusText);

  const data = await response.json();
  console.log('📥 Resposta:', data);

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Erro na requisição');
  }

  return data;
}

// Função global para configurar o admin
window.setupAdmin = async () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔧 SETUP DO ADMINISTRADOR - ContratosJardim');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('📝 Criando usuário administrador no Supabase Auth...');
  console.log('   Email: controleinterno@jardim.ce.gov.br');
  console.log('   Senha: @Gustavo25');
  console.log('   Nome: Gustavo Barros');
  console.log('   Perfil: Administrador CGM');
  console.log('   Secretaria: CGM - Controladoria Geral');
  console.log('');
  
  try {
    const result = await apiRequest('/auth/setup-admin', {
      method: 'POST',
    });
    
    if (result.success) {
      console.log('✅ SUCESSO! Administrador criado com sucesso!');
      console.log('');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('📋 CREDENCIAIS DE ACESSO:');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('   Email:', result.credentials.email);
      console.log('   Senha:', result.credentials.password);
      console.log('');
      console.log('🎉 Agora você pode fazer login!');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('');
      
      return result;
    } else {
      console.error('❌ ERRO ao criar administrador:', result.error || result.message);
      console.log('');
      console.log('💡 Dica: O usuário pode já existir. Tente fazer login com:');
      console.log('   Email: controleinterno@jardim.ce.gov.br');
      console.log('   Senha: @Gustavo25');
      console.log('');
      return result;
    }
  } catch (error) {
    console.error('❌ ERRO inesperado:', error.message || error);
    console.log('');
    console.log('💡 Verifique se o servidor Edge Function está rodando.');
    console.log('');
    throw error;
  }
};

// Também expor como função global sem o window
globalThis.setupAdmin = window.setupAdmin;

// Função para listar usuários do Supabase Auth (DEBUG)
window.listarUsuariosAuth = async () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('👥 LISTANDO USUÁRIOS DO SUPABASE AUTH');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  try {
    const result = await apiRequest('/debug/list-auth-users', {
      method: 'GET',
    });
    
    if (result.success && result.users) {
      console.log(`✅ Total de usuários: ${result.users.length}`);
      console.log('');
      
      result.users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.email}`);
        console.log(`   ID: ${user.id}`);
        console.log(`   Nome: ${user.user_metadata?.nome || 'N/A'}`);
        console.log(`   Perfil: ${user.user_metadata?.perfil || 'N/A'}`);
        console.log(`   Criado em: ${new Date(user.created_at).toLocaleString('pt-BR')}`);
        console.log(`   Email confirmado: ${user.email_confirmed_at ? 'Sim' : 'Não'}`);
        console.log('');
      });
      
      console.log('═══════════════════════════════════════════════════════════');
      
      return result;
    } else {
      console.error('❌ Erro ao listar usuários:', result.error);
      return result;
    }
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    throw error;
  }
};

globalThis.listarUsuariosAuth = window.listarUsuariosAuth;

// Função para resetar senha de um usuário
window.resetarSenha = async (email, novaSenha) => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔑 RESETAR SENHA DE USUÁRIO');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📧 Email: ${email}`);
  console.log(`🔐 Nova senha: ${novaSenha}`);
  console.log('');
  
  try {
    const result = await apiRequest('/debug/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, novaSenha }),
    });
    
    if (result.success) {
      console.log('✅ SUCESSO! Senha resetada com sucesso!');
      console.log('');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('📋 NOVAS CREDENCIAIS:');
      console.log('═══════════════════════════════════════════════════════════');
      console.log(`   Email: ${email}`);
      console.log(`   Senha: ${novaSenha}`);
      console.log('');
      console.log('🎉 Agora você pode fazer login!');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('');
      
      return result;
    } else {
      console.error('❌ Erro ao resetar senha:', result.error);
      return result;
    }
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    throw error;
  }
};

globalThis.resetarSenha = window.resetarSenha;

// Função para corrigir todos os usuários que não conseguem fazer login
window.corrigirTodosUsuarios = async () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔧 CORRIGIR TODOS OS USUÁRIOS');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  try {
    const result = await apiRequest('/debug/fix-all-users', {
      method: 'POST',
    });
    
    if (result.success) {
      console.log('✅ SUCESSO! Todos os usuários foram corrigidos!');
      console.log('');
      console.log('📋 USUÁRIOS CORRIGIDOS:');
      console.log('═══════════════════════════════════════════════════════════');
      
      result.users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.email}`);
        console.log(`   Nome: ${user.nome}`);
        console.log(`   Perfil: ${user.perfil}`);
        console.log(`   Senha padrão: ${user.senhaTemporaria}`);
        console.log('');
      });
      
      console.log('═══════════════════════════════════════════════════════════');
      console.log('');
      console.log('⚠️ IMPORTANTE: Todos os usuários agora têm a senha padrão: "SenhaTemp123"');
      console.log('💡 Oriente os usuários a alterarem a senha após o primeiro login!');
      console.log('');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('');
      
      return result;
    } else {
      console.error('❌ Erro ao corrigir usuários:', result.error);
      return result;
    }
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    throw error;
  }
};

globalThis.corrigirTodosUsuarios = window.corrigirTodosUsuarios;

// Função para verificar usuário específico
window.verificarUsuario = async (email) => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔍 VERIFICAR USUÁRIO');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📧 Email: ${email}`);
  console.log('');
  
  try {
    const result = await apiRequest('/debug/check-user', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    
    if (result.success) {
      console.log('✅ Usuário encontrado:');
      console.log('');
      console.log('📋 DADOS NO SUPABASE AUTH:');
      if (result.authUser) {
        console.log(`   ID: ${result.authUser.id}`);
        console.log(`   Email: ${result.authUser.email}`);
        console.log(`   Email confirmado: ${result.authUser.email_confirmed_at ? 'Sim' : 'Não'}`);
        console.log(`   Criado em: ${new Date(result.authUser.created_at).toLocaleString('pt-BR')}`);
        console.log(`   Metadata:`, result.authUser.user_metadata);
      } else {
        console.warn('   ❌ NÃO EXISTE no Supabase Auth');
      }
      console.log('');
      console.log('📋 DADOS NO KV STORE:');
      if (result.kvUser) {
        console.log(`   ID: ${result.kvUser.id}`);
        console.log(`   Nome: ${result.kvUser.nome}`);
        console.log(`   Email: ${result.kvUser.email}`);
        console.log(`   Perfil: ${result.kvUser.perfil}`);
        console.log(`   Secretaria: ${result.kvUser.secretaria}`);
        console.log(`   Situação: ${result.kvUser.situacao}`);
      } else {
        console.warn('   ❌ NÃO EXISTE no KV Store');
      }
      console.log('');
      
      if (!result.authUser && result.kvUser) {
        console.warn('⚠️ PROBLEMA DETECTADO:');
        console.warn('   Usuário existe no KV Store mas NÃO existe no Supabase Auth!');
        console.warn('   Isso significa que ele não consegue fazer login.');
        console.log('');
        console.log('💡 SOLUÇÃO:');
        console.log(`   Execute: corrigirUsuario("${email}", "SenhaNova123")`);
      } else if (result.authUser && result.kvUser) {
        console.log('✅ Usuário está OK em ambos os sistemas!');
        console.log('');
        console.log('💡 Se ainda não consegue fazer login:');
        console.log(`   Execute: resetarSenha("${email}", "SenhaNova123")`);
      }
      
      console.log('═══════════════════════════════════════════════════════════');
      console.log('');
      
      return result;
    } else {
      console.error('❌ Erro:', result.error);
      return result;
    }
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    throw error;
  }
};

globalThis.verificarUsuario = window.verificarUsuario;

// Função para corrigir um usuário específico
window.corrigirUsuario = async (email, novaSenha = 'SenhaTemp123') => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔧 CORRIGIR USUÁRIO');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📧 Email: ${email}`);
  console.log(`🔐 Nova senha: ${novaSenha}`);
  console.log('');
  
  try {
    const result = await apiRequest('/debug/fix-user', {
      method: 'POST',
      body: JSON.stringify({ email, novaSenha }),
    });
    
    if (result.success) {
      console.log('✅ SUCESSO! Usuário corrigido!');
      console.log('');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('📋 NOVAS CREDENCIAIS:');
      console.log('═══════════════════════════════════════════════════════════');
      console.log(`   Email: ${email}`);
      console.log(`   Senha: ${novaSenha}`);
      console.log('');
      console.log('🎉 Agora o usuário pode fazer login!');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('');
      
      return result;
    } else {
      console.error('❌ Erro:', result.error);
      return result;
    }
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    throw error;
  }
};

globalThis.corrigirUsuario = window.corrigirUsuario;

// Função para verificar o menu de administração
window.verificarMenuAdmin = () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔍 VERIFICAR MENU DE ADMINISTRAÇÃO');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  // Pegar usuário do localStorage
  const userStr = localStorage.getItem('contratos_jardim_user');
  
  if (!userStr) {
    console.error('❌ ERRO: Nenhum usuário logado encontrado!');
    console.log('');
    console.log('💡 SOLUÇÃO: Faça login primeiro!');
    console.log('═══════════════════════════════════════════════════════════');
    return;
  }
  
  const user = JSON.parse(userStr);
  
  console.log('📋 DADOS DO USUÁRIO LOGADO:');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`   Nome: ${user.nome}`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Perfil: "${user.perfil}"`);
  console.log(`   Tipo do perfil: ${typeof user.perfil}`);
  console.log(`   Perfil tem espaços extras? ${user.perfil !== user.perfil.trim() ? 'SIM ⚠️' : 'NÃO ✅'}`);
  console.log('');
  
  console.log('🔍 VERIFICAÇÕES DE ADMIN:');
  console.log('═══════════════════════════════════════════════════════════');
  
  const perfil = user.perfil?.trim() || '';
  const verificacoes = [
    { nome: 'perfil === "admin"', resultado: perfil === 'admin' },
    { nome: 'perfil === "Administrador CGM"', resultado: perfil === 'Administrador CGM' },
    { nome: 'perfil.toLowerCase() === "administrador cgm"', resultado: perfil.toLowerCase() === 'administrador cgm' },
    { nome: 'perfil.toLowerCase() === "admin"', resultado: perfil.toLowerCase() === 'admin' },
  ];
  
  verificacoes.forEach(v => {
    const status = v.resultado ? '✅ TRUE' : '❌ FALSE';
    console.log(`   ${status} - ${v.nome}`);
  });
  
  console.log('');
  
  const isAdmin = verificacoes.some(v => v.resultado);
  
  if (isAdmin) {
    console.log('✅ RESULTADO: Usuário É ADMINISTRADOR!');
    console.log('');
    console.log('🎯 O menu "Administração do sistema" DEVE aparecer com:');
    console.log('   • Gerenciar usuários');
    console.log('   • Parâmetros e perfis');
    console.log('   • Aparência e layout');
    console.log('   • Configurações gerais');
    console.log('');
    console.log('⚠️ Se o menu não estiver aparecendo:');
    console.log('   1. Faça logout e login novamente');
    console.log('   2. Limpe o cache (Ctrl+Shift+R)');
    console.log('   3. Verifique o console por erros React');
  } else {
    console.warn('❌ RESULTADO: Usuário NÃO É ADMINISTRADOR!');
    console.log('');
    console.log('💡 SOLUÇÃO:');
    console.log('   O perfil deve ser exatamente "Administrador CGM"');
    console.log(`   Execute para corrigir:`);
    console.log(`   await alterarPerfilUsuario("${user.email}", "Administrador CGM")`);
  }
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
};

globalThis.verificarMenuAdmin = window.verificarMenuAdmin;

// Função para alterar o perfil de um usuário
window.alterarPerfilUsuario = async (email, novoPerfil) => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔧 ALTERAR PERFIL DE USUÁRIO');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📧 Email: ${email}`);
  console.log(`👤 Novo perfil: ${novoPerfil}`);
  console.log('');
  
  try {
    const result = await apiRequest('/debug/change-profile', {
      method: 'POST',
      body: JSON.stringify({ email, novoPerfil }),
    });
    
    if (result.success) {
      console.log('✅ SUCESSO! Perfil alterado!');
      console.log('');
      console.log('📋 DADOS ATUALIZADOS:');
      console.log('═══════════════════════════════════════════════════════════');
      console.log(`   Email: ${result.user.email}`);
      console.log(`   Nome: ${result.user.nome}`);
      console.log(`   Perfil anterior: ${result.oldProfile}`);
      console.log(`   Perfil novo: ${result.user.perfil}`);
      console.log('');
      console.log('⚠️ IMPORTANTE:');
      console.log('   Se este for o usuário logado, faça logout e login novamente!');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('');
      
      return result;
    } else {
      console.error('❌ Erro:', result.error);
      return result;
    }
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    throw error;
  }
};

globalThis.alterarPerfilUsuario = window.alterarPerfilUsuario;

// Função para diagnosticar problemas de login
window.diagnosticarLogin = async (email, senha) => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔍 DIAGNÓSTICO DE PROBLEMA DE LOGIN');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📧 Email: ${email}`);
  console.log(`🔐 Senha: ${'*'.repeat(senha?.length || 0)}`);
  console.log('');
  
  try {
    // Passo 1: Verificar se o usuário existe
    console.log('📋 PASSO 1: Verificando se o usuário existe...');
    const checkResult = await apiRequest('/debug/check-user', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    
    console.log('');
    if (checkResult.authUser) {
      console.log('✅ Usuário EXISTE no Supabase Auth');
      console.log(`   ID: ${checkResult.authUser.id}`);
      console.log(`   Email confirmado: ${checkResult.authUser.email_confirmed_at ? 'Sim' : 'Não'}`);
    } else {
      console.warn('❌ Usuário NÃO EXISTE no Supabase Auth!');
      console.log('');
      console.log('💡 SOLUÇÃO:');
      console.log(`   Execute: corrigirUsuario("${email}", "NovaSenha123")`);
      console.log('');
      console.log('═══════════════════════════════════════════════════════════');
      return;
    }
    
    if (checkResult.kvUser) {
      console.log('✅ Usuário existe no KV Store');
      console.log(`   Nome: ${checkResult.kvUser.nome}`);
      console.log(`   Perfil: ${checkResult.kvUser.perfil}`);
    } else {
      console.warn('⚠️ Usuário NÃO existe no KV Store (será criado no login)');
    }
    
    console.log('');
    console.log('📋 PASSO 2: Testando login direto no Supabase...');
    
    // Passo 2: Tentar login direto
    const testResult = await apiRequest('/debug/test-login', {
      method: 'POST',
      body: JSON.stringify({ email, password: senha }),
    });
    
    console.log('');
    if (testResult.success) {
      console.log('✅ LOGIN FUNCIONOU no Supabase!');
      console.log('');
      console.log('🎉 A senha está correta!');
      console.log('');
      console.log('⚠️ Se o login no sistema ainda não funciona:');
      console.log('   1. Limpe o cache (Ctrl+Shift+R)');
      console.log('   2. Verifique o console por outros erros');
      console.log('   3. Tente fazer logout e login novamente');
    } else {
      console.error('❌ LOGIN FALHOU no Supabase!');
      console.log('');
      console.log(`Erro: ${testResult.error}`);
      console.log('');
      console.log('💡 SOLUÇÃO: A senha está incorreta. Execute:');
      console.log(`   resetarSenha("${email}", "NovaSenha123")`);
      console.log('');
      console.log('Depois tente fazer login com:');
      console.log(`   Email: ${email}`);
      console.log(`   Senha: NovaSenha123`);
    }
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return testResult;
    
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    throw error;
  }
};

globalThis.diagnosticarLogin = window.diagnosticarLogin;

// Atualização automática: criar função depois que o componente carrega
setTimeout(() => {
  window.verificarMenuAdmin = () => {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🔍 VERIFICAR MENU DE ADMINISTRAÇÃO');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    // Pegar usuário do localStorage
    const userStr = localStorage.getItem('contratos_jardim_user');
    
    if (!userStr) {
      console.error('❌ ERRO: Nenhum usuário logado encontrado!');
      console.log('');
      console.log('💡 SOLUÇÃO: Faça login primeiro!');
      console.log('═══════════════════════════════════════════════════════════');
      return;
    }
    
    const user = JSON.parse(userStr);
    
    console.log('📋 DADOS DO USUÁRIO LOGADO:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`   Nome: ${user.nome}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Perfil: "${user.perfil}"`);
    console.log(`   Tipo do perfil: ${typeof user.perfil}`);
    console.log(`   Perfil tem espaços extras? ${user.perfil !== user.perfil.trim() ? 'SIM ⚠️' : 'NÃO ✅'}`);
    console.log('');
    
    console.log('🔍 VERIFICAÇÕES DE ADMIN:');
    console.log('═══════════════════════════════════════════════════════════');
    
    const perfil = user.perfil?.trim() || '';
    const verificacoes = [
      { nome: 'perfil === "admin"', resultado: perfil === 'admin' },
      { nome: 'perfil === "Administrador CGM"', resultado: perfil === 'Administrador CGM' },
      { nome: 'perfil.toLowerCase() === "administrador cgm"', resultado: perfil.toLowerCase() === 'administrador cgm' },
      { nome: 'perfil.toLowerCase() === "admin"', resultado: perfil.toLowerCase() === 'admin' },
    ];
    
    verificacoes.forEach(v => {
      const status = v.resultado ? '✅ TRUE' : '❌ FALSE';
      console.log(`   ${status} - ${v.nome}`);
    });
    
    console.log('');
    
    const isAdmin = verificacoes.some(v => v.resultado);
    
    if (isAdmin) {
      console.log('✅ RESULTADO: Usuário É ADMINISTRADOR!');
      console.log('');
      console.log('🎯 O menu "Administração do sistema" DEVE aparecer com:');
      console.log('   • Gerenciar usuários');
      console.log('   • Parâmetros e perfis');
      console.log('   • Aparência e layout');
      console.log('   • Configurações gerais');
      console.log('');
      console.log('⚠️ Se o menu não estiver aparecendo:');
      console.log('   1. Faça logout e login novamente');
      console.log('   2. Limpe o cache (Ctrl+Shift+R)');
      console.log('   3. Verifique o console por erros React');
    } else {
      console.warn('❌ RESULTADO: Usuário NÃO É ADMINISTRADOR!');
      console.log('');
      console.log('💡 SOLUÇÃO:');
      console.log('   O perfil deve ser exatamente "Administrador CGM"');
      console.log(`   Execute para corrigir:`);
      console.log(`   await alterarPerfilUsuario("${user.email}", "Administrador CGM")`);
    }
    
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
  };
  
  globalThis.verificarMenuAdmin = window.verificarMenuAdmin;
}, 500);

// Função para corrigir login rapidamente
window.corrigirLoginRapido = async (email, novaSenha = 'SenhaTemp123') => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('⚡ CORREÇÃO RÁPIDA DE LOGIN');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📧 Email: ${email}`);
  console.log(`🔐 Nova senha: ${novaSenha}`);
  console.log('');
  
  try {
    console.log('🔧 Corrigindo usuário...');
    const result = await corrigirUsuario(email, novaSenha);
    
    if (result.success) {
      console.log('');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('✅ PRONTO! Agora você pode fazer login com:');
      console.log('═══════════════════════════════════════════════════════════');
      console.log(`   Email: ${email}`);
      console.log(`   Senha: ${novaSenha}`);
      console.log('═══════════════════════════════════════════════════════════');
      console.log('');
    }
    
    return result;
  } catch (error) {
    console.error('❌ Erro:', error.message);
    throw error;
  }
};

globalThis.corrigirLoginRapido = window.corrigirLoginRapido;

// Função para resetar dados mock no localStorage
window.resetarDadosMock = () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔄 RESETAR DADOS MOCK (MODO OFFLINE)');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  try {
    // Limpar dados mock antigos
    console.log('🗑️ Limpando dados antigos do localStorage...');
    localStorage.removeItem('mock_users');
    localStorage.removeItem('mock_contratos');
    localStorage.removeItem('mock_secretarias');
    localStorage.removeItem('mock_solicitacoes');
    localStorage.removeItem('mock_alertas');
    
    console.log('✅ Dados antigos removidos!');
    console.log('');
    console.log('📋 USUÁRIO ADMINISTRADOR (MODO OFFLINE):');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('   👤 Nome: Gustavo Barros');
    console.log('   📧 Email: controleinterno@jardim.ce.gov.br');
    console.log('   🔑 Senha: @Gustavo25');
    console.log('   🏢 Secretaria: CGM - Controladoria Geral');
    console.log('   👔 Perfil: Administrador CGM');
    console.log('');
    console.log('✅ SUCESSO! Dados mock resetados!');
    console.log('');
    console.log('🔄 PRÓXIMO PASSO:');
    console.log('   Recarregue a página (F5) para aplicar as mudanças!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return { success: true, message: 'Dados mock resetados com sucesso' };
  } catch (error) {
    console.error('❌ Erro ao resetar dados mock:', error.message);
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    throw error;
  }
};

globalThis.resetarDadosMock = window.resetarDadosMock;

// Função para excluir todos os usuários exceto Gustavo Barros (Supabase Auth)
window.limparUsuariosSupabase = async () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🗑️ LIMPAR TODOS OS USUÁRIOS (SUPABASE AUTH)');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('⚠️ ATENÇÃO: Esta ação irá excluir TODOS os usuários,');
  console.log('   exceto o administrador Gustavo Barros!');
  console.log('');
  
  try {
    // Listar todos os usuários primeiro
    console.log('📋 Listando usuários atuais...');
    const listResult = await apiRequest('/debug/list-auth-users', {
      method: 'GET',
    });
    
    if (!listResult.success || !listResult.users) {
      console.error('❌ Erro ao listar usuários');
      return;
    }
    
    console.log(`📊 Total de usuários encontrados: ${listResult.users.length}`);
    console.log('');
    
    const gustavoEmail = 'controleinterno@jardim.ce.gov.br';
    const usersToDelete = listResult.users.filter(u => u.email !== gustavoEmail);
    
    console.log(`🗑️ Usuários que serão excluídos: ${usersToDelete.length}`);
    console.log(`✅ Usuários que serão mantidos: 1 (${gustavoEmail})`);
    console.log('');
    
    if (usersToDelete.length === 0) {
      console.log('✅ Nenhum usuário para excluir!');
      console.log('   Apenas o Gustavo Barros existe no sistema.');
      console.log('');
      console.log('═══════════════════════════════════════════════════════════');
      return { success: true, message: 'Sistema já está limpo' };
    }
    
    // Excluir usuários
    console.log('🗑️ Iniciando exclusão de usuários...');
    console.log('');
    
    for (const user of usersToDelete) {
      console.log(`   🗑️ Excluindo: ${user.email}...`);
      
      try {
        const deleteResult = await apiRequest('/debug/delete-user', {
          method: 'POST',
          body: JSON.stringify({ userId: user.id }),
        });
        
        if (deleteResult.success) {
          console.log(`   ✅ Excluído: ${user.email}`);
        } else {
          console.warn(`   ⚠️ Erro ao excluir ${user.email}: ${deleteResult.error}`);
        }
      } catch (error) {
        console.error(`   ❌ Erro ao excluir ${user.email}:`, error.message);
      }
    }
    
    console.log('');
    console.log('✅ LIMPEZA CONCLUÍDA!');
    console.log('');
    console.log('📋 USUÁRIO MANTIDO:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('   👤 Nome: Gustavo Barros');
    console.log('   📧 Email: controleinterno@jardim.ce.gov.br');
    console.log('   🔑 Senha: @Gustavo25');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return { success: true, message: 'Usuários excluídos com sucesso' };
  } catch (error) {
    console.error('❌ Erro ao limpar usuários:', error.message);
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    throw error;
  }
};

globalThis.limparUsuariosSupabase = window.limparUsuariosSupabase;

// Função para limpar dados mock (localStorage) mantendo apenas Gustavo Barros
window.limparUsuariosMock = () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🗑️ LIMPAR USUÁRIOS MOCK (LOCALSTORAGE)');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  try {
    // Dados do Gustavo Barros
    const gustavoBarros = {
      id: 'admin-001',
      email: 'controleinterno@jardim.ce.gov.br',
      nome: 'Gustavo Barros',
      perfil: 'admin',
      secretaria: 'CGM - Controladoria Geral do Município',
      situacao: 'ativo',
      criadoEm: '2024-01-15T10:00:00Z',
      ultimoAcesso: new Date().toISOString()
    };
    
    // Salvar apenas Gustavo Barros
    localStorage.setItem('mock_users', JSON.stringify([gustavoBarros]));
    
    // Limpar outros dados
    localStorage.removeItem('mock_solicitacoes');
    
    console.log('✅ LIMPEZA CONCLUÍDA!');
    console.log('');
    console.log('📋 USUÁRIO MANTIDO (MODO OFFLINE):');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('   👤 Nome: Gustavo Barros');
    console.log('   📧 Email: controleinterno@jardim.ce.gov.br');
    console.log('   🔑 Senha: @Gustavo25');
    console.log('   🏢 Secretaria: CGM - Controladoria Geral');
    console.log('');
    console.log('🔄 Recarregue a página (F5) para aplicar as mudanças!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return { success: true, message: 'Usuários mock limpos com sucesso' };
  } catch (error) {
    console.error('❌ Erro ao limpar usuários mock:', error.message);
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    throw error;
  }
};

globalThis.limparUsuariosMock = window.limparUsuariosMock;

// Função para limpar TUDO (Supabase + Mock) mantendo apenas Gustavo Barros
window.limparTodosUsuarios = async () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║     🗑️ LIMPEZA COMPLETA - TODOS OS USUÁRIOS             ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('⚠️ ATENÇÃO: Esta ação irá:');
  console.log('   • Excluir todos os usuários do Supabase Auth');
  console.log('   • Limpar todos os usuários mock do localStorage');
  console.log('   • Manter APENAS o Gustavo Barros');
  console.log('');
  
  try {
    // Limpar Supabase
    console.log('1️⃣ Limpando usuários do Supabase Auth...');
    console.log('');
    await limparUsuariosSupabase();
    
    console.log('');
    console.log('2️⃣ Limpando usuários mock do localStorage...');
    console.log('');
    limparUsuariosMock();
    
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║              ✅ LIMPEZA COMPLETA FINALIZADA!             ║');
    console.log('╚═══════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('📋 ÚNICO USUÁRIO NO SISTEMA:');
    console.log('');
    console.log('   👤 Nome: Gustavo Barros');
    console.log('   📧 Email: controleinterno@jardim.ce.gov.br');
    console.log('   🔑 Senha: @Gustavo25');
    console.log('   🏢 Secretaria: CGM - Controladoria Geral');
    console.log('   👔 Perfil: Administrador CGM');
    console.log('');
    console.log('🔄 Recarregue a página (F5) para aplicar todas as mudanças!');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return { success: true, message: 'Todos os usuários foram limpos com sucesso' };
  } catch (error) {
    console.error('❌ Erro durante limpeza completa:', error.message);
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    throw error;
  }
};

globalThis.limparTodosUsuarios = window.limparTodosUsuarios;

// Log de inicialização
console.log('');
console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║     🛠️  UTILITÁRIO DE SETUP - ContratosJardim           ║');
console.log('╚═══════════════════════════════════════════════════════════╝');
console.log('');
console.log('📋 FUNÇÕES PRINCIPAIS:');
console.log('');
console.log('   🔧 setupAdmin()                - Criar administrador no Supabase');
console.log('   🔄 resetarDadosMock()          - Resetar dados mock (offline)');
console.log('   🗑️ limparTodosUsuarios()       - Excluir todos exceto Gustavo');
console.log('');
console.log('📋 FUNÇÕES DE DIAGNÓSTICO:');
console.log('');
console.log('   🔍 listarUsuariosAuth()        - Listar todos os usuários');
console.log('   🔍 verificarUsuario(email)     - Verificar usuário específico');
console.log('   🔧 corrigirUsuario(email, senha) - Corrigir problemas de login');
console.log('   🔑 resetarSenha(email, senha)  - Resetar senha de usuário');
console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('');