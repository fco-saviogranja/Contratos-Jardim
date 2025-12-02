// Utilitário para limpar usuários localmente (sem precisar de backend)
// Este arquivo funciona 100% no navegador, sem precisar de deploy

// Função para limpar TUDO localmente
window.limparSistemaCompleto = () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║       🗑️ LIMPEZA COMPLETA DO SISTEMA (LOCAL)            ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('⚠️ ATENÇÃO: Esta ação irá:');
  console.log('   • Limpar TODOS os usuários do localStorage');
  console.log('   • Limpar TODAS as solicitações pendentes');
  console.log('   • Limpar TODOS os contratos salvos');
  console.log('   • Limpar TODOS os alertas');
  console.log('   • Manter APENAS o Gustavo Barros');
  console.log('');
  
  try {
    console.log('🗑️ 1. Limpando usuários mock...');
    
    // Dados do Gustavo Barros
    const gustavoBarros = {
      id: 'admin-001',
      email: 'controleinterno@jardim.ce.gov.br',
      nome: 'Gustavo Barros',
      perfil: 'admin',
      secretaria: 'CGM - Controladoria Geral do Município',
      situacao: 'ativo',
      criadoEm: '2024-01-15T10:00:00Z',
      ultimoAcesso: new Date().toISOString()
    };
    
    // Salvar apenas Gustavo Barros
    localStorage.setItem('mock_users', JSON.stringify([gustavoBarros]));
    console.log('   ✅ Usuários mock limpos!');
    
    console.log('');
    console.log('🗑️ 2. Limpando solicitações...');
    localStorage.removeItem('mock_solicitacoes');
    console.log('   ✅ Solicitações limpas!');
    
    console.log('');
    console.log('🗑️ 3. Limpando contratos...');
    localStorage.removeItem('mock_contratos');
    console.log('   ✅ Contratos limpos!');
    
    console.log('');
    console.log('🗑️ 4. Limpando alertas...');
    localStorage.removeItem('mock_alertas');
    console.log('   ✅ Alertas limpos!');
    
    console.log('');
    console.log('🗑️ 5. Limpando sessão atual...');
    localStorage.removeItem('contratos_jardim_user');
    localStorage.removeItem('contratos_jardim_token');
    console.log('   ✅ Sessão limpa!');
    
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║              ✅ LIMPEZA COMPLETA FINALIZADA!             ║');
    console.log('╚═══════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('📋 ÚNICO USUÁRIO NO SISTEMA:');
    console.log('');
    console.log('   👤 Nome: Gustavo Barros');
    console.log('   📧 Email: controleinterno@jardim.ce.gov.br');
    console.log('   🔑 Senha: @Gustavo25');
    console.log('   🏢 Secretaria: CGM - Controladoria Geral');
    console.log('   👔 Perfil: Administrador CGM');
    console.log('');
    console.log('🔄 PRÓXIMO PASSO:');
    console.log('   Recarregue a página (F5) para aplicar as mudanças!');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return { success: true, message: 'Sistema limpo com sucesso' };
  } catch (error) {
    console.error('❌ Erro ao limpar sistema:', error.message);
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    throw error;
  }
};

globalThis.limparSistemaCompleto = window.limparSistemaCompleto;

// Função para resetar para estado inicial
window.resetarSistemaInicial = () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║         🔄 RESETAR SISTEMA PARA ESTADO INICIAL           ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  
  try {
    // Limpar tudo primeiro
    console.log('🗑️ Limpando dados antigos...');
    localStorage.clear();
    console.log('   ✅ localStorage limpo!');
    
    console.log('');
    console.log('📝 Criando dados iniciais...');
    
    // Usuário Gustavo Barros
    const usuarios = [{
      id: 'admin-001',
      email: 'controleinterno@jardim.ce.gov.br',
      nome: 'Gustavo Barros',
      perfil: 'admin',
      secretaria: 'CGM - Controladoria Geral do Município',
      situacao: 'ativo',
      criadoEm: '2024-01-15T10:00:00Z',
      ultimoAcesso: new Date().toISOString()
    }];
    
    // Secretarias padrão
    const secretarias = [
      { id: '1', nome: 'Secretaria Municipal de Administração e Finanças', sigla: 'SEMAF', responsavel: 'Carlos Mendes', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
      { id: '2', nome: 'Secretaria Municipal de Educação', sigla: 'SEMED', responsavel: 'Ana Paula Costa', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
      { id: '3', nome: 'Secretaria Municipal de Saúde', sigla: 'SEMSAU', responsavel: 'Dr. Roberto Lima', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
      { id: '4', nome: 'Secretaria Municipal de Obras e Serviços Públicos', sigla: 'SEMOSP', responsavel: 'Eng. Pedro Oliveira', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
      { id: '5', nome: 'Secretaria Municipal de Agricultura e Meio Ambiente', sigla: 'SEMAMA', responsavel: 'Fernanda Rocha', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
      { id: '6', nome: 'Secretaria Municipal de Assistência Social', sigla: 'SEMAS', responsavel: 'Juliana Martins', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
      { id: '7', nome: 'Secretaria Municipal de Esporte e Juventude', sigla: 'SEMEJ', responsavel: 'Rafael Santos', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
      { id: '8', nome: 'Secretaria Municipal de Cultura e Turismo', sigla: 'SEMCULT', responsavel: 'Beatriz Alves', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
      { id: '9', nome: 'Controladoria Geral do Município', sigla: 'CGM', responsavel: 'Gustavo Barros', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' },
      { id: '10', nome: 'Procuradoria Geral do Município', sigla: 'PGM', responsavel: 'Dr. Marcos Ferreira', situacao: 'ativa', criadoEm: '2024-01-01T00:00:00Z' }
    ];
    
    localStorage.setItem('mock_users', JSON.stringify(usuarios));
    localStorage.setItem('mock_secretarias', JSON.stringify(secretarias));
    localStorage.setItem('mock_contratos', JSON.stringify([]));
    localStorage.setItem('mock_alertas', JSON.stringify([]));
    localStorage.setItem('mock_solicitacoes', JSON.stringify([]));
    
    console.log('   ✅ Dados iniciais criados!');
    
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║           ✅ SISTEMA RESETADO COM SUCESSO!               ║');
    console.log('╚═══════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('📋 DADOS CRIADOS:');
    console.log('');
    console.log('   👥 Usuários: 1 (Gustavo Barros)');
    console.log('   🏢 Secretarias: 10');
    console.log('   📄 Contratos: 0');
    console.log('   🔔 Alertas: 0');
    console.log('   📨 Solicitações: 0');
    console.log('');
    console.log('👤 CREDENCIAIS DE LOGIN:');
    console.log('');
    console.log('   📧 Email: controleinterno@jardim.ce.gov.br');
    console.log('   🔑 Senha: @Gustavo25');
    console.log('');
    console.log('🔄 Recarregue a página (F5) para começar a usar!');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return { success: true, message: 'Sistema resetado com sucesso' };
  } catch (error) {
    console.error('❌ Erro ao resetar sistema:', error.message);
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    throw error;
  }
};

globalThis.resetarSistemaInicial = window.resetarSistemaInicial;

// Função para verificar estado do sistema
window.verificarEstadoSistema = () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║           🔍 VERIFICAR ESTADO DO SISTEMA                 ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  
  try {
    // Verificar usuários
    const usersStr = localStorage.getItem('mock_users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    console.log('👥 USUÁRIOS:');
    console.log(`   Total: ${users.length}`);
    if (users.length > 0) {
      users.forEach((u, i) => {
        console.log(`   ${i + 1}. ${u.nome} (${u.email}) - ${u.perfil}`);
      });
    } else {
      console.log('   Nenhum usuário cadastrado');
    }
    
    console.log('');
    
    // Verificar contratos
    const contratosStr = localStorage.getItem('mock_contratos');
    const contratos = contratosStr ? JSON.parse(contratosStr) : [];
    console.log('📄 CONTRATOS:');
    console.log(`   Total: ${contratos.length}`);
    
    console.log('');
    
    // Verificar solicitações
    const solicitacoesStr = localStorage.getItem('mock_solicitacoes');
    const solicitacoes = solicitacoesStr ? JSON.parse(solicitacoesStr) : [];
    console.log('📨 SOLICITAÇÕES PENDENTES:');
    console.log(`   Total: ${solicitacoes.length}`);
    
    console.log('');
    
    // Verificar alertas
    const alertasStr = localStorage.getItem('mock_alertas');
    const alertas = alertasStr ? JSON.parse(alertasStr) : [];
    console.log('🔔 ALERTAS:');
    console.log(`   Total: ${alertas.length}`);
    
    console.log('');
    
    // Verificar sessão
    const sessionUser = localStorage.getItem('contratos_jardim_user');
    console.log('🔐 SESSÃO ATIVA:');
    if (sessionUser) {
      const user = JSON.parse(sessionUser);
      console.log(`   ✅ Usuário logado: ${user.nome} (${user.email})`);
    } else {
      console.log('   ❌ Nenhum usuário logado');
    }
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return {
      success: true,
      usuarios: users.length,
      contratos: contratos.length,
      solicitacoes: solicitacoes.length,
      alertas: alertas.length,
      sessaoAtiva: !!sessionUser
    };
  } catch (error) {
    console.error('❌ Erro ao verificar sistema:', error.message);
    throw error;
  }
};

globalThis.verificarEstadoSistema = window.verificarEstadoSistema;

// Log de inicialização
console.log('');
console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║      🧹 UTILITÁRIO DE LIMPEZA LOCAL - CARREGADO!        ║');
console.log('╚═══════════════════════════════════════════════════════════╝');
console.log('');
console.log('💡 FUNÇÕES DISPONÍVEIS (100% LOCAL, SEM BACKEND):');
console.log('');
console.log('   🗑️ limparSistemaCompleto()    - Limpar tudo, manter só Gustavo');
console.log('   🔄 resetarSistemaInicial()    - Resetar para estado inicial');
console.log('   🔍 verificarEstadoSistema()   - Ver estado atual do sistema');
console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
