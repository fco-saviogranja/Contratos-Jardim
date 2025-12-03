/**
 * UTILITÁRIO PARA LIMPAR TODOS OS USUÁRIOS DO SISTEMA
 * 
 * Execute no console do navegador:
 * - limparTodosUsuarios() - Limpa frontend E backend
 * - limparUsuariosFrontend() - Limpa apenas localStorage
 * - limparUsuariosBackend() - Limpa apenas Supabase
 */

import { projectId, publicAnonKey } from './supabase/info';

/**
 * Limpa todos os usuários do localStorage (Frontend)
 */
window.limparUsuariosFrontend = function() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🗑️ LIMPANDO USUÁRIOS DO FRONTEND (localStorage)');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  try {
    // Limpar localStorage
    const itemsRemovidos = [];
    
    // Remover usuários mock
    const mockUsers = localStorage.getItem('mock_users');
    if (mockUsers) {
      const users = JSON.parse(mockUsers);
      console.log(`📊 Usuários mock encontrados: ${users.length}`);
      localStorage.removeItem('mock_users');
      itemsRemovidos.push(`mock_users (${users.length} usuários)`);
    }
    
    // Remover usuário logado
    const loggedUser = localStorage.getItem('contratos_jardim_user');
    if (loggedUser) {
      console.log('👤 Removendo usuário logado...');
      localStorage.removeItem('contratos_jardim_user');
      itemsRemovidos.push('contratos_jardim_user');
    }
    
    // Remover token de autenticação
    const token = localStorage.getItem('contratos_jardim_token');
    if (token) {
      console.log('🔑 Removendo token de autenticação...');
      localStorage.removeItem('contratos_jardim_token');
      itemsRemovidos.push('contratos_jardim_token');
    }
    
    // Remover solicitações
    const solicitacoes = localStorage.getItem('mock_solicitacoes');
    if (solicitacoes) {
      const sols = JSON.parse(solicitacoes);
      console.log(`📋 Removendo solicitações: ${sols.length}`);
      localStorage.removeItem('mock_solicitacoes');
      itemsRemovidos.push(`mock_solicitacoes (${sols.length})`);
    }
    
    console.log('');
    console.log('✅ FRONTEND LIMPO COM SUCESSO!');
    console.log('');
    console.log('📊 ITENS REMOVIDOS:');
    itemsRemovidos.forEach(item => console.log(`   ✓ ${item}`));
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return {
      success: true,
      itemsRemovidos: itemsRemovidos.length,
      detalhes: itemsRemovidos
    };
  } catch (error) {
    console.error('❌ Erro ao limpar frontend:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Limpa todos os usuários do Supabase (Backend)
 */
window.limparUsuariosBackend = async function() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🗑️ LIMPANDO USUÁRIOS DO BACKEND (Supabase)');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  try {
    const url = `https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da/admin/limpar-usuarios`;
    
    console.log('📡 Enviando requisição para o servidor...');
    console.log(`🔗 URL: ${url}`);
    console.log('');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro na resposta do servidor:', errorText);
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    
    console.log('✅ BACKEND LIMPO COM SUCESSO!');
    console.log('');
    console.log('📊 RESUMO:');
    console.log(`   Usuários excluídos do Auth: ${result.resumo?.usuariosExcluidosAuth || 0}`);
    console.log(`   Usuários excluídos do KV: ${result.resumo?.usuariosExcluidosKV || 0}`);
    console.log(`   Erros: ${result.resumo?.erros || 0}`);
    console.log('');
    
    if (result.detalhes?.excluidos && result.detalhes.excluidos.length > 0) {
      console.log('👥 USUÁRIOS EXCLUÍDOS:');
      result.detalhes.excluidos.forEach(email => console.log(`   ✓ ${email}`));
      console.log('');
    }
    
    if (result.detalhes?.erros && result.detalhes.erros.length > 0) {
      console.log('⚠️ ERROS ENCONTRADOS:');
      result.detalhes.erros.forEach(erro => console.log(`   ✗ ${erro.email}: ${erro.erro}`));
      console.log('');
    }
    
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao limpar backend:', error);
    console.error('💡 Detalhes:', error.message);
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    return { success: false, error: error.message };
  }
};

/**
 * Limpa TODOS os usuários do sistema (Frontend + Backend)
 */
window.limparTodosUsuarios = async function() {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║                                                           ║');
  console.log('║        🗑️  LIMPEZA COMPLETA DE TODOS OS USUÁRIOS          ║');
  console.log('║                                                           ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  
  const confirmacao = confirm(
    '⚠️ ATENÇÃO! OPERAÇÃO IRREVERSÍVEL!\n\n' +
    'Esta ação irá:\n' +
    '• Excluir TODOS os usuários do localStorage (frontend)\n' +
    '• Excluir TODOS os usuários do Supabase Auth (backend)\n' +
    '• Excluir TODOS os usuários do KV Store (backend)\n' +
    '• Fazer logout automático\n\n' +
    'Deseja realmente continuar?'
  );
  
  if (!confirmacao) {
    console.log('❌ Operação cancelada pelo usuário');
    console.log('');
    return { success: false, message: 'Cancelado pelo usuário' };
  }
  
  console.log('🚀 Iniciando limpeza completa...');
  console.log('');
  
  // Passo 1: Limpar Backend
  console.log('📍 PASSO 1: Limpando Backend (Supabase)');
  const backendResult = await window.limparUsuariosBackend();
  
  // Passo 2: Limpar Frontend
  console.log('📍 PASSO 2: Limpando Frontend (localStorage)');
  const frontendResult = window.limparUsuariosFrontend();
  
  // Resultado final
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║                                                           ║');
  console.log('║            ✅ LIMPEZA COMPLETA FINALIZADA!                 ║');
  console.log('║                                                           ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('📊 RESUMO GERAL:');
  console.log('');
  console.log('🔹 FRONTEND:');
  console.log(`   Status: ${frontendResult.success ? '✅ Limpo' : '❌ Erro'}`);
  console.log(`   Itens removidos: ${frontendResult.itemsRemovidos || 0}`);
  console.log('');
  console.log('🔹 BACKEND:');
  console.log(`   Status: ${backendResult.success ? '✅ Limpo' : '❌ Erro'}`);
  if (backendResult.success && backendResult.resumo) {
    console.log(`   Usuários Auth: ${backendResult.resumo.usuariosExcluidosAuth || 0}`);
    console.log(`   Usuários KV: ${backendResult.resumo.usuariosExcluidosKV || 0}`);
  }
  console.log('');
  console.log('🔄 Recarregue a página (F5) para aplicar as mudanças!');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  return {
    success: true,
    frontend: frontendResult,
    backend: backendResult
  };
};

// Disponibilizar globalmente
globalThis.limparTodosUsuarios = window.limparTodosUsuarios;
globalThis.limparUsuariosFrontend = window.limparUsuariosFrontend;
globalThis.limparUsuariosBackend = window.limparUsuariosBackend;

// Exibir instruções
console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('🧹 UTILITÁRIO DE LIMPEZA DE USUÁRIOS CARREGADO');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
console.log('📋 FUNÇÕES DISPONÍVEIS:');
console.log('');
console.log('   🔴 limparTodosUsuarios()      - Limpa TUDO (frontend + backend)');
console.log('   🔵 limparUsuariosFrontend()   - Limpa apenas localStorage');
console.log('   🔵 limparUsuariosBackend()    - Limpa apenas Supabase');
console.log('');
console.log('💡 EXEMPLO DE USO:');
console.log('   await limparTodosUsuarios()');
console.log('');
console.log('⚠️ ATENÇÃO: Estas operações são IRREVERSÍVEIS!');
console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
