import { projectId, publicAnonKey } from './supabase/info';

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

// Disponibilizar globalmente no console para setup
if (typeof window !== 'undefined') {
  (window as any).criarAdministrador = criarAdministrador;
  
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
  console.log('   2️⃣  limparTodosSistema()   - Deleta todos os contratos e alertas');
  console.log('');
  console.log('📋 CREDENCIAIS DO ADMINISTRADOR:');
  console.log('   📧 Email: controleinterno@jardim.ce.gov.br');
  console.log('   🔑 Senha: @Gustavo25');
  console.log('');
  console.log('💡 PRIMEIRO ACESSO:');
  console.log('   1. Execute: criarAdministrador()');
  console.log('   2. Faça login com as credenciais acima');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
}