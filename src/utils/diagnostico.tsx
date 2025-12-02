// 🏥 FERRAMENTA DE DIAGNÓSTICO AUTOMÁTICO
// Cole este código no console do navegador (F12) para diagnóstico completo

/**
 * DIAGNÓSTICO COMPLETO DO SISTEMA
 * Execute: diagnosticoCompleto()
 */
export function diagnosticoCompleto() {
  console.clear();
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🏥 DIAGNÓSTICO COMPLETO DO CONTRATOSJARDIM');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  // 1. VERIFICAR LOCALSTORAGE
  console.log('📦 1. VERIFICANDO LOCALSTORAGE...');
  console.log('─────────────────────────────────────────────');
  
  const testStorage = () => {
    try {
      localStorage.setItem('_test', 'ok');
      const result = localStorage.getItem('_test');
      localStorage.removeItem('_test');
      return result === 'ok';
    } catch (e) {
      return false;
    }
  };

  const storageOk = testStorage();
  console.log(storageOk ? '✅ localStorage funcionando' : '❌ localStorage BLOQUEADO');
  
  if (!storageOk) {
    console.log('⚠️ PROBLEMA: localStorage está bloqueado!');
    console.log('💡 Solução: Desative modo incógnito ou permita cookies/storage');
    return;
  }

  // 2. VERIFICAR DADOS
  console.log('');
  console.log('📊 2. VERIFICANDO DADOS...');
  console.log('─────────────────────────────────────────────');
  
  const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
  const contratos = JSON.parse(localStorage.getItem('mock_contratos') || '[]');
  const solicitacoes = JSON.parse(localStorage.getItem('mock_solicitacoes') || '[]');
  const alertas = JSON.parse(localStorage.getItem('mock_alertas') || '[]');
  const secretarias = JSON.parse(localStorage.getItem('mock_secretarias') || '[]');
  
  console.log(`Usuários: ${users.length}`);
  console.log(`Contratos: ${contratos.length}`);
  console.log(`Solicitações: ${solicitacoes.length}`);
  console.log(`Alertas: ${alertas.length}`);
  console.log(`Secretarias: ${secretarias.length}`);

  // 3. VERIFICAR USUÁRIO ADMIN
  console.log('');
  console.log('👑 3. VERIFICANDO USUÁRIO ADMIN...');
  console.log('─────────────────────────────────────────────');
  
  const admin = users.find(u => 
    u.email === 'controleinterno@jardim.ce.gov.br' && 
    u.perfil === 'admin'
  );
  
  if (admin) {
    console.log('✅ Admin encontrado:');
    console.log(`   Nome: ${admin.nome}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Perfil: ${admin.perfil}`);
    console.log(`   Situação: ${admin.situacao}`);
  } else {
    console.log('❌ Admin NÃO encontrado!');
    console.log('💡 Execute: criarAdminAgora()');
  }

  // 4. VERIFICAR SESSÃO ATUAL
  console.log('');
  console.log('🔐 4. VERIFICANDO SESSÃO ATUAL...');
  console.log('─────────────────────────────────────────────');
  
  const currentUser = JSON.parse(localStorage.getItem('contratos_jardim_user') || 'null');
  
  if (currentUser) {
    console.log('✅ Usuário logado:');
    console.log(`   Nome: ${currentUser.nome}`);
    console.log(`   Email: ${currentUser.email}`);
    console.log(`   Perfil: ${currentUser.perfil}`);
  } else {
    console.log('⚠️ Nenhum usuário logado');
    console.log('💡 Faça login na tela inicial');
  }

  // 5. VERIFICAR MODO DE OPERAÇÃO
  console.log('');
  console.log('🔌 5. VERIFICANDO MODO DE OPERAÇÃO...');
  console.log('─────────────────────────────────────────────');
  
  const offlineMode = localStorage.getItem('offline_mode');
  
  if (offlineMode === 'true') {
    console.log('🔌 Modo: OFFLINE');
    console.log('📦 Dados: localStorage');
  } else {
    console.log('🌐 Modo: TENTANDO BACKEND');
    console.log('📦 Dados: Supabase KV (com fallback para localStorage)');
  }

  // 6. VERIFICAR INTEGRIDADE DOS DADOS
  console.log('');
  console.log('🔍 6. VERIFICANDO INTEGRIDADE DOS DADOS...');
  console.log('─────────────────────────────────────────────');
  
  let problemas = 0;
  
  // Verificar usuários duplicados
  const emailsDuplicados = users
    .map(u => u.email)
    .filter((email, index, arr) => arr.indexOf(email) !== index);
  
  if (emailsDuplicados.length > 0) {
    console.log('⚠️ Emails duplicados encontrados:', emailsDuplicados);
    problemas++;
  }
  
  // Verificar contratos sem número
  const contratosSemNumero = contratos.filter(c => !c.numero);
  if (contratosSemNumero.length > 0) {
    console.log('⚠️ Contratos sem número:', contratosSemNumero.length);
    problemas++;
  }
  
  if (problemas === 0) {
    console.log('✅ Nenhum problema de integridade encontrado');
  }

  // 7. RESUMO E RECOMENDAÇÕES
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📋 RESUMO DO DIAGNÓSTICO');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  // Calcular score de saúde
  let score = 0;
  const checks = [];
  
  if (storageOk) { score += 20; checks.push('✅ localStorage OK'); }
  if (admin) { score += 30; checks.push('✅ Admin configurado'); }
  if (currentUser) { score += 20; checks.push('✅ Usuário logado'); }
  if (contratos.length > 0) { score += 15; checks.push('✅ Tem contratos'); }
  if (secretarias.length > 0) { score += 15; checks.push('✅ Tem secretarias'); }
  
  checks.forEach(check => console.log(check));
  
  console.log('');
  console.log(`🏥 SAÚDE DO SISTEMA: ${score}/100`);
  console.log('');
  
  // Recomendações
  if (score === 100) {
    console.log('🎉 SISTEMA PERFEITO!');
    console.log('✅ Tudo funcionando como esperado');
  } else if (score >= 70) {
    console.log('✅ SISTEMA FUNCIONANDO BEM');
    if (!admin) console.log('💡 Recomendação: Criar usuário admin');
    if (!currentUser) console.log('💡 Recomendação: Fazer login');
  } else if (score >= 50) {
    console.log('⚠️ SISTEMA COM PROBLEMAS MENORES');
    if (!admin) console.log('⚠️ AÇÃO NECESSÁRIA: Criar admin');
    if (!currentUser) console.log('💡 AÇÃO NECESSÁRIA: Fazer login');
  } else {
    console.log('❌ SISTEMA COM PROBLEMAS GRAVES');
    console.log('🆘 AÇÃO URGENTE: Execute resetarSistemaCompleto()');
  }
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  // Retornar objeto com resultados
  return {
    score,
    storageOk,
    hasAdmin: !!admin,
    isLoggedIn: !!currentUser,
    totalUsers: users.length,
    totalContratos: contratos.length,
    totalSecretarias: secretarias.length,
    offlineMode: offlineMode === 'true',
    problemas
  };
}

/**
 * CRIAR ADMIN AUTOMATICAMENTE
 * Execute: criarAdminAgora()
 */
export function criarAdminAgora() {
  console.log('👑 CRIANDO USUÁRIO ADMINISTRADOR...');
  console.log('');
  
  const adminUser = {
    id: 'admin-gustavo-001',
    nome: 'Gustavo Barros',
    email: 'controleinterno@jardim.ce.gov.br',
    senha: '@Gustavo25',
    perfil: 'admin',
    secretaria: 'CGM - Controladoria Geral',
    situacao: 'ativo',
    dataCadastro: new Date().toISOString()
  };
  
  const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
  
  // Verificar se já existe
  const exists = users.some(u => u.email === adminUser.email);
  
  if (exists) {
    console.log('ℹ️ Admin já existe!');
    const admin = users.find(u => u.email === adminUser.email);
    console.log('Dados:', admin);
    return admin;
  }
  
  // Criar admin
  users.push(adminUser);
  localStorage.setItem('mock_users', JSON.stringify(users));
  
  console.log('✅ Admin criado com sucesso!');
  console.log('');
  console.log('📧 Email: controleinterno@jardim.ce.gov.br');
  console.log('🔒 Senha: @Gustavo25');
  console.log('');
  console.log('💡 Agora você pode fazer login!');
  
  return adminUser;
}

/**
 * RESETAR SISTEMA COMPLETO
 * Execute: resetarSistemaCompleto()
 */
export function resetarSistemaCompleto() {
  const confirmar = confirm(
    '⚠️ ATENÇÃO!\n\n' +
    'Isso vai DELETAR TODOS OS DADOS:\n' +
    '- Usuários\n' +
    '- Contratos\n' +
    '- Solicitações\n' +
    '- Alertas\n' +
    '- Secretarias\n\n' +
    'E criar um sistema novo com apenas o admin.\n\n' +
    'Tem certeza?'
  );
  
  if (!confirmar) {
    console.log('❌ Operação cancelada');
    return;
  }
  
  console.log('🔄 RESETANDO SISTEMA...');
  console.log('');
  
  // Limpar tudo
  localStorage.clear();
  
  console.log('✅ localStorage limpo');
  
  // Criar admin
  criarAdminAgora();
  
  // Criar secretarias padrão
  const secretarias = [
    {
      id: 'sec-001',
      nome: 'Controladoria Geral do Município',
      sigla: 'CGM',
      responsavel: 'Gustavo Barros',
      dataCadastro: new Date().toISOString()
    },
    {
      id: 'sec-002',
      nome: 'Secretaria de Educação',
      sigla: 'SEDUC',
      responsavel: '',
      dataCadastro: new Date().toISOString()
    },
    {
      id: 'sec-003',
      nome: 'Secretaria de Saúde',
      sigla: 'SESAU',
      responsavel: '',
      dataCadastro: new Date().toISOString()
    }
  ];
  
  localStorage.setItem('mock_secretarias', JSON.stringify(secretarias));
  console.log('✅ Secretarias criadas');
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('✅ SISTEMA RESETADO COM SUCESSO!');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('👑 Admin criado');
  console.log('🏢 3 secretarias criadas');
  console.log('');
  console.log('💡 Recarregue a página (F5) e faça login!');
  console.log('');
  
  setTimeout(() => {
    if (confirm('Recarregar página agora?')) {
      location.reload();
    }
  }, 1000);
}

/**
 * FORÇAR MODO OFFLINE
 * Execute: forcarModoOffline()
 */
export function forcarModoOffline() {
  localStorage.setItem('offline_mode', 'true');
  console.log('✅ Modo offline forçado!');
  console.log('🔌 Sistema vai operar 100% em localStorage');
  console.log('');
  console.log('💡 Recarregue a página (F5) para aplicar');
  
  setTimeout(() => {
    if (confirm('Recarregar página agora?')) {
      location.reload();
    }
  }, 1000);
}

/**
 * TENTAR MODO ONLINE
 * Execute: tentarModoOnline()
 */
export function tentarModoOnline() {
  localStorage.removeItem('offline_mode');
  console.log('✅ Modo online ativado!');
  console.log('🌐 Sistema vai tentar conectar ao backend');
  console.log('');
  console.log('💡 Recarregue a página (F5) para aplicar');
  
  setTimeout(() => {
    if (confirm('Recarregar página agora?')) {
      location.reload();
    }
  }, 1000);
}

/**
 * LISTAR TODOS OS USUÁRIOS
 * Execute: listarUsuarios()
 */
export function listarUsuarios() {
  const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`👥 USUÁRIOS NO SISTEMA (${users.length})`);
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  if (users.length === 0) {
    console.log('⚠️ Nenhum usuário encontrado');
    console.log('💡 Execute: criarAdminAgora()');
    return;
  }
  
  users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.nome}`);
    console.log(`   📧 Email: ${user.email}`);
    console.log(`   👤 Perfil: ${user.perfil}`);
    console.log(`   🏢 Secretaria: ${user.secretaria}`);
    console.log(`   📊 Situação: ${user.situacao}`);
    console.log('');
  });
  
  return users;
}

/**
 * LISTAR TODOS OS CONTRATOS
 * Execute: listarContratos()
 */
export function listarContratos() {
  const contratos = JSON.parse(localStorage.getItem('mock_contratos') || '[]');
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`📋 CONTRATOS NO SISTEMA (${contratos.length})`);
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  if (contratos.length === 0) {
    console.log('⚠️ Nenhum contrato encontrado');
    console.log('💡 Crie um contrato de teste no sistema');
    return;
  }
  
  contratos.forEach((contrato, index) => {
    console.log(`${index + 1}. ${contrato.numero}`);
    console.log(`   🏢 Empresa: ${contrato.empresa}`);
    console.log(`   💰 Valor: R$ ${contrato.valor?.toLocaleString('pt-BR')}`);
    console.log(`   📊 Situação: ${contrato.situacao}`);
    console.log(`   📅 Vigência: ${contrato.dataInicio} até ${contrato.dataFim}`);
    console.log('');
  });
  
  return contratos;
}

// Expor funções globalmente para uso no console
if (typeof window !== 'undefined') {
  (window as any).diagnosticoCompleto = diagnosticoCompleto;
  (window as any).criarAdminAgora = criarAdminAgora;
  (window as any).resetarSistemaCompleto = resetarSistemaCompleto;
  (window as any).forcarModoOffline = forcarModoOffline;
  (window as any).tentarModoOnline = tentarModoOnline;
  (window as any).listarUsuarios = listarUsuarios;
  (window as any).listarContratos = listarContratos;
}

console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('🛠️ FERRAMENTAS DE DIAGNÓSTICO CARREGADAS');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
console.log('Execute no console:');
console.log('');
console.log('📊 diagnosticoCompleto()     - Diagnóstico completo');
console.log('👑 criarAdminAgora()          - Criar usuário admin');
console.log('🔄 resetarSistemaCompleto()   - Resetar tudo');
console.log('🔌 forcarModoOffline()        - Forçar modo offline');
console.log('🌐 tentarModoOnline()         - Tentar modo online');
console.log('👥 listarUsuarios()           - Listar todos os usuários');
console.log('📋 listarContratos()          - Listar todos os contratos');
console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
