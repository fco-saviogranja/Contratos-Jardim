import { contratos as contratosAPI } from './api';

/**
 * Função para deletar TODOS os contratos do sistema
 * ATENÇÃO: Esta ação é irreversível!
 * Apenas administradores podem executar esta função.
 */
export async function limparTodosContratos() {
  console.log('⚠️ ATENÇÃO: Você está prestes a deletar TODOS os contratos do sistema!');
  console.log('⚠️ Esta ação é IRREVERSÍVEL!');
  
  try {
    const response = await contratosAPI.deleteAll();
    
    if (response.success) {
      console.log(`✅ ${response.deletados} contrato(s) deletado(s) com sucesso!`);
      console.log('✅ Todos os contratos foram removidos do sistema.');
      return response;
    } else {
      console.error('❌ Erro ao deletar contratos:', response);
      throw new Error('Falha ao deletar contratos');
    }
  } catch (error: any) {
    console.error('❌ Erro ao limpar contratos:', error);
    console.error('💡 Possíveis causas:');
    console.error('   - Você não está logado como administrador');
    console.error('   - A conexão com o servidor falhou');
    console.error('   - O token de autenticação expirou');
    throw error;
  }
}

/**
 * Para usar esta função:
 * 
 * 1. Faça login como administrador no sistema
 * 2. Abra o Console do navegador (F12 > Console)
 * 3. Execute o seguinte comando:
 * 
 * ```javascript
 * // Importar a função
 * import('./utils/limparContratos.js').then(module => {
 *   module.limparTodosContratos()
 *     .then(() => console.log('✅ Limpeza concluída!'))
 *     .catch(err => console.error('❌ Erro:', err.message));
 * });
 * ```
 * 
 * 4. Confirme quando solicitado
 * 5. Recarregue a página para ver o resultado
 */
