import { projectId, publicAnonKey } from './supabase/info';
import { initializeMockData, MOCK_USERS } from './mockData';

/**
 * FUNÇÃO DE SETUP DO ADMINISTRADOR
 * 
 * Cria o usuário administrador padrão no sistema:
 * - Email: controleinterno@jardim.ce.gov.br
 * - Senha: @Gustavo25
 * - Nome: Gustavo Barros
 * - Perfil: Administrador CGM
 * 
 * Execute esta função no console do navegador para criar o administrador.
 */
export async function criarAdministrador() {
  console.log('🔧 CRIANDO USUÁRIO ADMINISTRADOR...');
  console.log('📧 Email: controleinterno@jardim.ce.gov.br');
  console.log('🔑 Senha: @Gustavo25');
  console.log('👤 Nome: Gustavo Barros');
  
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da/auth/setup-admin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        }
      }
    );
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ ADMINISTRADOR CRIADO COM SUCESSO!');
      console.log('📋 Credenciais:');
      console.log(`   Email: ${data.credentials.email}`);
      console.log(`   Senha: ${data.credentials.password}`);
      console.log(`   Nome: Gustavo Barros`);
      console.log('');
      console.log('🔄 Agora você pode fazer login com essas credenciais!');
      
      return data;
    } else {
      console.error('❌ Erro ao criar administrador:', data.error || data);
      alert(`Erro ao criar administrador: ${data.error || 'Erro desconhecido'}`);
      throw new Error(data.error || 'Falha ao criar administrador');
    }
  } catch (error: any) {
    console.error('❌ ERRO AO CRIAR ADMINISTRADOR:', error.message);
    alert(`Erro ao criar administrador: ${error.message}`);
    throw error;
  }
}

/**
 * FUNÇÃO PARA RESETAR DADOS MOCK
 * 
 * Limpa o localStorage e recria os dados mock padrão
 * Garante que o usuário Gustavo Barros esteja cadastrado
 */
export function resetarDadosMock() {
  console.log('🔄 RESETANDO DADOS MOCK...');
  
  try {
    // Limpar dados mock antigos
    localStorage.removeItem('mock_users');
    localStorage.removeItem('mock_contratos');
    localStorage.removeItem('mock_secretarias');
    localStorage.removeItem('mock_solicitacoes');
    localStorage.removeItem('mock_alertas');
    
    // Reinicializar com dados padrão
    initializeMockData();
    
    console.log('✅ DADOS MOCK RESETADOS COM SUCESSO!');
    console.log('');
    console.log('📋 USUÁRIO ADMINISTRADOR:');
    console.log(`   👤 Nome: Gustavo Barros`);
    console.log(`   📧 Email: controleinterno@jardim.ce.gov.br`);
    console.log(`   🔑 Senha: @Gustavo25`);
    console.log('');
    console.log('🔄 Recarregue a página para aplicar as mudanças!');
    
    return { success: true, message: 'Dados mock resetados com sucesso' };
  } catch (error: any) {
    console.error('❌ ERRO AO RESETAR DADOS MOCK:', error.message);
    alert(`Erro ao resetar dados mock: ${error.message}`);
    throw error;
  }
}

/**
 * FUNÇÃO PARA LIMPAR TODOS OS DADOS DO SISTEMA
 * 
 * Deleta todos os contratos e alertas do banco de dados
 */
export async function limparTodosSistema() {
  console.log('🔄 LIMPANDO TODOS OS DADOS DO SISTEMA...');
  
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da/auth/clear-all`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        }
      }
    );
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ DADOS DO SISTEMA LIMPOS COM SUCESSO!');
      console.log('');
      console.log('🔄 Recarregue a página para aplicar as mudanças!');
      
      return data;
    } else {
      console.error('❌ Erro ao limpar dados do sistema:', data.error || data);
      alert(`Erro ao limpar dados do sistema: ${data.error || 'Erro desconhecido'}`);
      throw new Error(data.error || 'Falha ao limpar dados do sistema');
    }
  } catch (error: any) {
    console.error('❌ ERRO AO LIMPAR DADOS DO SISTEMA:', error.message);
    alert(`Erro ao limpar dados do sistema: ${error.message}`);
    throw error;
  }
}

// Disponibilizar globalmente no console para setup
if (typeof window !== 'undefined') {
  (window as any).criarAdministrador = criarAdministrador;
  (window as any).resetarDadosMock = resetarDadosMock;
  (window as any).limparTodosSistema = limparTodosSistema;
  
  // Mensagem de boas-vindas
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║          ContratosJardim - Sistema de Gestão de Contratos     ║');
  console.log('║             Controladoria Geral do Município de Jardim         ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('🔧 FUNÇÕES DISPONÍVEIS NO CONSOLE:');
  console.log('');
  console.log('   1️⃣  criarAdministrador()   - Cria o usuário administrador padrão');
  console.log('   2️⃣  resetarDadosMock()     - Reseta os dados mock (modo offline)');
  console.log('   3️⃣  limparTodosSistema()   - Deleta todos os contratos e alertas');
  console.log('');
  console.log('📋 CREDENCIAIS DO ADMINISTRADOR:');
  console.log('   👤 Nome: Gustavo Barros');
  console.log('   📧 Email: controleinterno@jardim.ce.gov.br');
  console.log('   🔑 Senha: @Gustavo25');
  console.log('');
  console.log('💡 PRIMEIRO ACESSO (MODO ONLINE):');
  console.log('   1. Execute: criarAdministrador()');
  console.log('   2. Faça login com as credenciais acima');
  console.log('');
  console.log('💡 MODO OFFLINE (DESENVOLVIMENTO):');
  console.log('   1. Execute: resetarDadosMock()');
  console.log('   2. Recarregue a página');
  console.log('   3. Faça login com as credenciais acima');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
}