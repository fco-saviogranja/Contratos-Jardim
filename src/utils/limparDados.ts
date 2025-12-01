import { admin } from './api';

/**
 * FUNÇÃO DE LIMPEZA COMPLETA DE DADOS
 * 
 * Esta função deleta TODOS os contratos e alertas do sistema.
 * Use apenas para resetar o sistema durante desenvolvimento/testes.
 * 
 * ATENÇÃO: Esta ação é IRREVERSÍVEL!
 */
export async function limparTodosSistema() {
  console.log('🚨 INICIANDO LIMPEZA COMPLETA DO SISTEMA...');
  console.log('⚠️  Esta ação vai deletar TODOS os contratos e alertas!');
  
  try {
    const response = await admin.limparTodosDados();
    
    if (response.success) {
      console.log('✅ LIMPEZA CONCLUÍDA COM SUCESSO!');
      console.log(`📊 ${response.contratos} contratos removidos`);
      console.log(`🔔 ${response.alertas} alertas removidos`);
      console.log('🔄 Recarregando página...');
      
      // Recarregar a página após 1 segundo
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
      return response;
    } else {
      console.error('❌ Erro na limpeza:', response);
      throw new Error('Falha na limpeza de dados');
    }
  } catch (error: any) {
    console.error('❌ ERRO AO LIMPAR DADOS:', error.message);
    alert(`Erro ao limpar dados: ${error.message}`);
    throw error;
  }
}

// Disponibilizar globalmente no console para debug
if (typeof window !== 'undefined') {
  (window as any).limparTodosSistema = limparTodosSistema;
}