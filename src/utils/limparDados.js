// Utilitário para limpar dados do sistema
// Disponível no console do navegador

// Função para deletar todos os contratos (requer login como admin)
window.limparTodosContratos = async () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🗑️  DELETAR TODOS OS CONTRATOS');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  const accessToken = localStorage.getItem('access_token');
  
  if (!accessToken) {
    console.error('❌ ERRO: Você precisa estar logado como administrador!');
    console.log('');
    console.log('Faça login primeiro e tente novamente.');
    console.log('');
    return { error: 'Não autenticado' };
  }
  
  try {
    console.log('📊 Verificando contratos existentes...');
    
    // Primeiro, verificar quantos contratos existem
    const listResponse = await fetch('/api/contratos', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const listData = await listResponse.json();
    
    if (!listData.success || !listData.contratos) {
      console.error('❌ Erro ao listar contratos:', listData.error);
      return listData;
    }
    
    const total = listData.contratos.length;
    console.log(`📝 Encontrados ${total} contrato(s)`);
    console.log('');
    
    if (total === 0) {
      console.log('ℹ️  Nenhum contrato para deletar.');
      console.log('');
      return { success: true, message: 'Nenhum contrato encontrado' };
    }
    
    console.log('🔥 Deletando todos os contratos...');
    
    // Deletar todos
    const deleteResponse = await fetch('/api/contratos', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const deleteData = await deleteResponse.json();
    
    if (deleteData.success) {
      console.log('');
      console.log('✅ SUCESSO!');
      console.log(`   ${deleteData.deletados} contrato(s) deletado(s)`);
      console.log('');
      console.log('🔄 Recarregando a página...');
      console.log('');
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
      return deleteData;
    } else {
      console.error('❌ Erro ao deletar contratos:', deleteData.error);
      return deleteData;
    }
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    return { error: error.message };
  }
};

// Função para verificar quantos contratos existem
window.contarContratos = async () => {
  const accessToken = localStorage.getItem('access_token');
  
  if (!accessToken) {
    console.error('❌ Você precisa estar logado!');
    return { error: 'Não autenticado' };
  }
  
  try {
    const response = await fetch('/api/contratos', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const data = await response.json();
    
    if (data.success && data.contratos) {
      console.log(`📊 Total de contratos: ${data.contratos.length}`);
      return { total: data.contratos.length, contratos: data.contratos };
    } else {
      console.error('❌ Erro:', data.error);
      return data;
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
    return { error: error.message };
  }
};

// Também expor como funções globais sem o window
globalThis.limparTodosContratos = window.limparTodosContratos;
globalThis.contarContratos = window.contarContratos;

console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('🛠️  UTILITÁRIOS DE LIMPEZA - ContratosJardim');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
console.log('Comandos disponíveis no console:');
console.log('');
console.log('  limparTodosContratos()  - Deletar todos os contratos');
console.log('  contarContratos()       - Contar contratos existentes');
console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
