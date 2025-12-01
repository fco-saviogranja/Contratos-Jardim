// Utilitário para limpar todos os contratos do sistema
// Este arquivo pode ser importado dinamicamente no console

export async function limparTodosContratos() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🗑️  DELETAR TODOS OS CONTRATOS');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  const accessToken = localStorage.getItem('access_token');
  const projectId = localStorage.getItem('projectId') || 'YOUR_PROJECT_ID';
  
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
    const listResponse = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da/contratos`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    
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
    const deleteResponse = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da/contratos`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    
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
}
