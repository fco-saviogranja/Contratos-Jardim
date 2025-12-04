/**
 * VERIFICAR PERFIL DO USUÁRIO
 * 
 * Utilitário para debug do perfil do usuário logado
 */

export function verificarPerfil() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔍 VERIFICAR PERFIL DO USUÁRIO');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  // Buscar dados do usuário no localStorage
  const userStr = localStorage.getItem('user');
  
  if (!userStr) {
    console.error('❌ Nenhum usuário logado encontrado no localStorage');
    console.log('');
    console.log('💡 SOLUÇÃO:');
    console.log('   1. Faça login no sistema');
    console.log('   2. Execute verificarPerfil() novamente');
    console.log('');
    return;
  }

  const user = JSON.parse(userStr);

  console.log('👤 DADOS DO USUÁRIO:');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📧 Email:', user.email);
  console.log('👤 Nome:', user.nome);
  console.log('🏢 Secretaria:', user.secretaria);
  console.log('');
  
  console.log('🎭 PERFIL (DETALHADO):');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('Valor:', JSON.stringify(user.perfil));
  console.log('Tipo:', typeof user.perfil);
  console.log('Length:', user.perfil?.length || 0);
  console.log('Com trim:', JSON.stringify(user.perfil?.trim()));
  console.log('Lowercase:', user.perfil?.toLowerCase());
  console.log('');

  // Verificar se é admin
  const perfil = user.perfil?.trim() || '';
  const isAdmin = perfil === 'admin' || 
                  perfil === 'Administrador CGM' || 
                  perfil.toLowerCase() === 'administrador cgm' ||
                  perfil.toLowerCase() === 'admin';

  const isGestor = perfil === 'gestor' || 
                   perfil === 'Gestor de Contratos' || 
                   perfil.toLowerCase() === 'gestor de contratos' ||
                   perfil.toLowerCase() === 'gestor';

  const isFiscal = perfil === 'fiscal' || 
                   perfil === 'Fiscal de Contratos' || 
                   perfil.toLowerCase() === 'fiscal de contratos' ||
                   perfil.toLowerCase() === 'fiscal';

  console.log('🔐 PERMISSÕES DETECTADAS:');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(isAdmin ? '✅ É ADMINISTRADOR' : '❌ NÃO é administrador');
  console.log(isGestor ? '✅ É GESTOR' : '❌ NÃO é gestor');
  console.log(isFiscal ? '✅ É FISCAL' : '❌ NÃO é fiscal');
  console.log('');

  // Verificar se o perfil está correto
  if (!isAdmin && !isGestor && !isFiscal) {
    console.warn('⚠️ PROBLEMA DETECTADO!');
    console.warn('═══════════════════════════════════════════════════════════');
    console.warn('O perfil não corresponde a nenhum perfil válido!');
    console.warn('');
    console.warn('Perfil atual:', user.perfil);
    console.warn('');
    console.warn('Perfis válidos:');
    console.warn('  - admin ou Administrador CGM');
    console.warn('  - gestor ou Gestor de Contratos');
    console.warn('  - fiscal ou Fiscal de Contratos');
    console.warn('');
    console.warn('💡 SOLUÇÃO:');
    console.warn('   Execute: corrigirPerfilAdmin()');
    console.warn('');
  } else {
    console.log('✅ PERFIL VÁLIDO!');
    console.log('═══════════════════════════════════════════════════════════');
    
    if (isAdmin) {
      console.log('🎉 Você tem acesso TOTAL ao sistema!');
      console.log('');
      console.log('Você pode:');
      console.log('  ✅ Gerenciar usuários');
      console.log('  ✅ Gerenciar contratos');
      console.log('  ✅ Gerenciar secretarias');
      console.log('  ✅ Ver relatórios');
      console.log('  ✅ Acessar configurações');
      console.log('  ✅ Aprovar solicitações');
    } else if (isGestor) {
      console.log('📋 Você tem permissões de GESTOR!');
      console.log('');
      console.log('Você pode:');
      console.log('  ✅ Criar contratos');
      console.log('  ✅ Editar contratos');
      console.log('  ✅ Ver relatórios');
    } else if (isFiscal) {
      console.log('👁️ Você tem permissões de FISCAL!');
      console.log('');
      console.log('Você pode:');
      console.log('  ✅ Ver contratos');
      console.log('  ✅ Registrar ações de fiscalização');
      console.log('  ✅ Ver relatórios');
    }
    console.log('');
  }

  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
}

export function corrigirPerfilAdmin() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔧 CORRIGIR PERFIL PARA ADMINISTRADOR');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  const userStr = localStorage.getItem('user');
  
  if (!userStr) {
    console.error('❌ Nenhum usuário logado encontrado');
    return;
  }

  const user = JSON.parse(userStr);
  
  console.log('Perfil ANTES:', user.perfil);
  
  // Corrigir perfil
  user.perfil = 'Administrador CGM';
  
  // Salvar de volta
  localStorage.setItem('user', JSON.stringify(user));
  
  console.log('Perfil DEPOIS:', user.perfil);
  console.log('');
  console.log('✅ PERFIL CORRIGIDO!');
  console.log('');
  console.log('💡 IMPORTANTE:');
  console.log('   Recarregue a página (F5) para aplicar as mudanças');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
}

export function corrigirPerfilGestor() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔧 CORRIGIR PERFIL PARA GESTOR');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  const userStr = localStorage.getItem('user');
  
  if (!userStr) {
    console.error('❌ Nenhum usuário logado encontrado');
    return;
  }

  const user = JSON.parse(userStr);
  
  console.log('Perfil ANTES:', user.perfil);
  
  // Corrigir perfil
  user.perfil = 'Gestor de Contratos';
  
  // Salvar de volta
  localStorage.setItem('user', JSON.stringify(user));
  
  console.log('Perfil DEPOIS:', user.perfil);
  console.log('');
  console.log('✅ PERFIL CORRIGIDO!');
  console.log('');
  console.log('💡 IMPORTANTE:');
  console.log('   Recarregue a página (F5) para aplicar as mudanças');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
}

export function corrigirPerfilFiscal() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔧 CORRIGIR PERFIL PARA FISCAL');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  const userStr = localStorage.getItem('user');
  
  if (!userStr) {
    console.error('❌ Nenhum usuário logado encontrado');
    return;
  }

  const user = JSON.parse(userStr);
  
  console.log('Perfil ANTES:', user.perfil);
  
  // Corrigir perfil
  user.perfil = 'Fiscal de Contratos';
  
  // Salvar de volta
  localStorage.setItem('user', JSON.stringify(user));
  
  console.log('Perfil DEPOIS:', user.perfil);
  console.log('');
  console.log('✅ PERFIL CORRIGIDO!');
  console.log('');
  console.log('💡 IMPORTANTE:');
  console.log('   Recarregue a página (F5) para aplicar as mudanças');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
}

// Disponibilizar globalmente para debug
if (typeof window !== 'undefined') {
  (window as any).verificarPerfil = verificarPerfil;
  (window as any).corrigirPerfilAdmin = corrigirPerfilAdmin;
  (window as any).corrigirPerfilGestor = corrigirPerfilGestor;
  (window as any).corrigirPerfilFiscal = corrigirPerfilFiscal;
}
