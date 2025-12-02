/**
 * 🧹 FUNÇÕES DE LIMPEZA DO BACKEND SUPABASE
 * 
 * Use estas funções no console do navegador para limpar usuários duplicados
 * do Supabase Auth que estão causando erro "email já cadastrado".
 */

const SERVER_URL = 'https://qjiwmutqpmydazhnabri.supabase.co/functions/v1/make-server-1a8b02da';

/**
 * 🔍 Listar todos os usuários do Supabase Auth
 * Use esta função para ver quais usuários estão cadastrados no backend
 */
async function listarUsuariosBackend() {
  try {
    console.log('🔍 Buscando usuários no Supabase Auth...');
    
    const response = await fetch(`${SERVER_URL}/debug/list-auth-users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Erro ao listar usuários:', result);
      throw new Error(result.error || 'Erro ao listar usuários');
    }

    console.log(`✅ Total de usuários encontrados: ${result.users.length}`);
    console.table(result.users.map(u => ({
      Email: u.email,
      'Criado em': new Date(u.created_at).toLocaleString('pt-BR'),
      'Email confirmado': u.email_confirmed_at ? 'Sim' : 'Não',
      Nome: u.user_metadata?.nome || 'N/A',
      Perfil: u.user_metadata?.perfil || 'N/A'
    })));

    console.log('\n📋 Dados completos:', result.users);
    
    return result.users;
  } catch (error) {
    console.error('❌ Erro ao listar usuários do backend:', error);
    console.error('💡 Verifique se o backend Supabase está acessível');
    throw error;
  }
}

/**
 * 🔍 Verificar um usuário específico por email
 * @param {string} email - Email do usuário a verificar
 */
async function verificarUsuarioBackend(email) {
  try {
    console.log(`🔍 Verificando usuário: ${email}`);
    
    const response = await fetch(`${SERVER_URL}/debug/check-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Erro ao verificar usuário:', result);
      throw new Error(result.error || 'Erro ao verificar usuário');
    }

    console.log('\n📊 RESULTADO DA VERIFICAÇÃO:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (result.authUser) {
      console.log('✅ Usuário EXISTE no Supabase Auth:');
      console.log('   ID:', result.authUser.id);
      console.log('   Email:', result.authUser.email);
      console.log('   Criado em:', new Date(result.authUser.created_at).toLocaleString('pt-BR'));
      console.log('   Email confirmado:', result.authUser.email_confirmed_at ? 'Sim' : 'Não');
      console.log('   Nome:', result.authUser.user_metadata?.nome || 'N/A');
      console.log('   Perfil:', result.authUser.user_metadata?.perfil || 'N/A');
    } else {
      console.log('❌ Usuário NÃO existe no Supabase Auth');
    }
    
    console.log('\n');
    
    if (result.kvUser) {
      console.log('✅ Usuário EXISTE no KV Store:');
      console.log('   ID:', result.kvUser.id);
      console.log('   Email:', result.kvUser.email);
      console.log('   Nome:', result.kvUser.nome);
      console.log('   Perfil:', result.kvUser.perfil);
      console.log('   Secretaria:', result.kvUser.secretaria);
    } else {
      console.log('❌ Usuário NÃO existe no KV Store');
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao verificar usuário:', error);
    throw error;
  }
}

/**
 * 🔧 Resetar senha de um usuário
 * @param {string} email - Email do usuário
 * @param {string} novaSenha - Nova senha
 */
async function resetarSenhaBackend(email, novaSenha) {
  try {
    console.log(`🔑 Resetando senha para: ${email}`);
    
    const response = await fetch(`${SERVER_URL}/debug/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, novaSenha })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Erro ao resetar senha:', result);
      throw new Error(result.error || 'Erro ao resetar senha');
    }

    console.log('✅ Senha resetada com sucesso!');
    console.log('📧 Email:', result.user.email);
    console.log('🔑 Nova senha:', novaSenha);
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao resetar senha:', error);
    throw error;
  }
}

/**
 * 🔧 Corrigir TODOS os usuários do KV Store no Supabase Auth
 * Esta função sincroniza todos os usuários que estão no KV Store
 * com o Supabase Auth, criando ou atualizando conforme necessário
 */
async function corrigirTodosUsuariosBackend() {
  try {
    console.log('🔧 Iniciando correção de TODOS os usuários...');
    console.log('⏳ Isso pode levar alguns segundos...');
    
    const response = await fetch(`${SERVER_URL}/debug/fix-all-users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Erro ao corrigir usuários:', result);
      throw new Error(result.error || 'Erro ao corrigir usuários');
    }

    console.log('\n✅ CORREÇÃO CONCLUÍDA COM SUCESSO!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📊 Total de usuários corrigidos: ${result.fixedUsers.length}`);
    console.log('\n🔑 ATENÇÃO: Todos os usuários tiveram a senha alterada para: SenhaTemp123');
    console.log('📋 Lista de usuários corrigidos:');
    console.table(result.fixedUsers);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n💡 PRÓXIMOS PASSOS:');
    console.log('1. Peça aos usuários para fazer login com a senha temporária: SenhaTemp123');
    console.log('2. Oriente-os a alterar a senha após o primeiro login');
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao corrigir todos os usuários:', error);
    throw error;
  }
}

/**
 * 🎯 GUIA DE USO RÁPIDO
 */
function ajuda() {
  console.log('\n📘 GUIA DE LIMPEZA DO BACKEND SUPABASE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n🔍 PASSO 1: Listar usuários existentes');
  console.log('   Digite: await listarUsuariosBackend()');
  console.log('   Mostra todos os usuários cadastrados no Supabase Auth');
  console.log('\n🔍 PASSO 2: Verificar usuário específico');
  console.log('   Digite: await verificarUsuarioBackend("email@exemplo.com")');
  console.log('   Verifica se um email específico está cadastrado');
  console.log('\n🔑 PASSO 3: Resetar senha (se necessário)');
  console.log('   Digite: await resetarSenhaBackend("email@exemplo.com", "@Gustavo25")');
  console.log('   Reseta a senha de um usuário específico');
  console.log('\n🔧 PASSO 4: Corrigir todos os usuários (caso extremo)');
  console.log('   Digite: await corrigirTodosUsuariosBackend()');
  console.log('   Sincroniza todos os usuários do KV com o Supabase Auth');
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n💡 SOLUÇÃO PARA O ERRO "Email já cadastrado":');
  console.log('1. Execute: await verificarUsuarioBackend("controleinterno@jardim.ce.gov.br")');
  console.log('2. Se o usuário existir, execute: await resetarSenhaBackend("controleinterno@jardim.ce.gov.br", "@Gustavo25")');
  console.log('3. Tente fazer login novamente');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// Mostrar o guia automaticamente quando o arquivo for carregado
console.log('✅ Funções de limpeza do backend carregadas!');
console.log('📘 Digite: ajuda() para ver o guia completo');
console.log('');
console.log('🚀 FUNÇÕES DISPONÍVEIS:');
console.log('  • listarUsuariosBackend() - Lista todos os usuários');
console.log('  • verificarUsuarioBackend(email) - Verifica um usuário específico');
console.log('  • resetarSenhaBackend(email, novaSenha) - Reseta a senha');
console.log('  • corrigirTodosUsuariosBackend() - Corrige todos os usuários');
console.log('  • ajuda() - Mostra este guia');
