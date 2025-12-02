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

// Função para fazer varredura completa de emails
window.varreduraCompleta = () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║          🔍 VARREDURA COMPLETA DE EMAILS                 ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  
  try {
    const emailPermitido = 'controleinterno@jardim.ce.gov.br';
    const emailsEncontrados = new Set();
    
    // 1. Verificar mock_users
    console.log('📋 1. VERIFICANDO USUÁRIOS (mock_users):');
    const usersStr = localStorage.getItem('mock_users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    console.log(`   Total de usuários: ${users.length}`);
    
    if (users.length > 0) {
      users.forEach((u, i) => {
        console.log(`   ${i + 1}. ${u.email} - ${u.nome} (${u.perfil})`);
        emailsEncontrados.add(u.email);
      });
    } else {
      console.log('   ✅ Nenhum usuário encontrado');
    }
    
    console.log('');
    
    // 2. Verificar mock_solicitacoes
    console.log('📋 2. VERIFICANDO SOLICITAÇÕES (mock_solicitacoes):');
    const solicitacoesStr = localStorage.getItem('mock_solicitacoes');
    const solicitacoes = solicitacoesStr ? JSON.parse(solicitacoesStr) : [];
    console.log(`   Total de solicitações: ${solicitacoes.length}`);
    
    if (solicitacoes.length > 0) {
      solicitacoes.forEach((s, i) => {
        console.log(`   ${i + 1}. ${s.email} - ${s.nomeCompleto} (${s.situacao})`);
        emailsEncontrados.add(s.email);
      });
    } else {
      console.log('   ✅ Nenhuma solicitação encontrada');
    }
    
    console.log('');
    
    // 3. Verificar sessão atual
    console.log('📋 3. VERIFICANDO SESSÃO ATIVA:');
    const sessionUserStr = localStorage.getItem('contratos_jardim_user');
    if (sessionUserStr) {
      const sessionUser = JSON.parse(sessionUserStr);
      console.log(`   ✅ Usuário logado: ${sessionUser.email} - ${sessionUser.nome}`);
      emailsEncontrados.add(sessionUser.email);
    } else {
      console.log('   ❌ Nenhum usuário logado');
    }
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('📊 RESUMO DA VARREDURA:');
    console.log('');
    console.log(`   📧 Total de emails únicos encontrados: ${emailsEncontrados.size}`);
    console.log('');
    
    if (emailsEncontrados.size > 0) {
      console.log('   📝 Lista completa de emails:');
      Array.from(emailsEncontrados).forEach((email, i) => {
        const isPermitido = email === emailPermitido;
        console.log(`   ${i + 1}. ${email} ${isPermitido ? '✅ (SERÁ MANTIDO)' : '❌ (SERÁ EXCLUÍDO)'}`);
      });
    }
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return {
      success: true,
      totalEmails: emailsEncontrados.size,
      emails: Array.from(emailsEncontrados),
      usuarios: users.length,
      solicitacoes: solicitacoes.length
    };
  } catch (error) {
    console.error('❌ Erro na varredura:', error.message);
    throw error;
  }
};

globalThis.varreduraCompleta = window.varreduraCompleta;

// Função para excluir todos os emails exceto controleinterno@jardim.ce.gov.br
window.excluirTodosEmailsExcetoGustavo = () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║      🗑️ EXCLUIR TODOS OS EMAILS EXCETO GUSTAVO          ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('⚠️ ATENÇÃO: Esta ação irá:');
  console.log('   • Excluir TODOS os usuários do localStorage');
  console.log('   • Excluir TODAS as solicitações de cadastro');
  console.log('   • Limpar a sessão atual');
  console.log('   • Manter APENAS: controleinterno@jardim.ce.gov.br');
  console.log('');
  
  try {
    const emailPermitido = 'controleinterno@jardim.ce.gov.br';
    
    // 1. Limpar usuários (manter apenas Gustavo)
    console.log('🗑️ 1. LIMPANDO USUÁRIOS...');
    const usersStr = localStorage.getItem('mock_users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    const userGustavo = users.find(u => u.email === emailPermitido);
    
    let usuariosExcluidos = 0;
    if (users.length > 0) {
      usuariosExcluidos = users.length - (userGustavo ? 1 : 0);
      console.log(`   📊 Total de usuários antes: ${users.length}`);
      console.log(`   ❌ Usuários que serão excluídos: ${usuariosExcluidos}`);
      
      users.forEach(u => {
        if (u.email !== emailPermitido) {
          console.log(`      🗑️ Excluindo: ${u.email} - ${u.nome}`);
        }
      });
    }
    
    // Criar array apenas com Gustavo
    const gustavoBarros = userGustavo || {
      id: 'admin-001',
      email: 'controleinterno@jardim.ce.gov.br',
      nome: 'Gustavo Barros',
      perfil: 'admin',
      secretaria: 'CGM - Controladoria Geral do Município',
      situacao: 'ativo',
      criadoEm: '2024-01-15T10:00:00Z',
      ultimoAcesso: new Date().toISOString()
    };
    
    localStorage.setItem('mock_users', JSON.stringify([gustavoBarros]));
    console.log(`   ✅ Usuários após limpeza: 1 (Gustavo Barros)`);
    console.log('');
    
    // 2. Limpar solicitações
    console.log('🗑️ 2. LIMPANDO SOLICITAÇÕES...');
    const solicitacoesStr = localStorage.getItem('mock_solicitacoes');
    const solicitacoes = solicitacoesStr ? JSON.parse(solicitacoesStr) : [];
    
    if (solicitacoes.length > 0) {
      console.log(`   📊 Total de solicitações antes: ${solicitacoes.length}`);
      solicitacoes.forEach(s => {
        console.log(`      🗑️ Excluindo solicitação: ${s.email} - ${s.nomeCompleto}`);
      });
    }
    
    localStorage.removeItem('mock_solicitacoes');
    console.log(`   ✅ Solicitações após limpeza: 0`);
    console.log('');
    
    // 3. Limpar sessão
    console.log('🗑️ 3. LIMPANDO SESSÃO...');
    const sessionUserStr = localStorage.getItem('contratos_jardim_user');
    if (sessionUserStr) {
      const sessionUser = JSON.parse(sessionUserStr);
      if (sessionUser.email !== emailPermitido) {
        console.log(`   🗑️ Excluindo sessão de: ${sessionUser.email}`);
        localStorage.removeItem('contratos_jardim_user');
        localStorage.removeItem('contratos_jardim_token');
        console.log('   ✅ Sessão limpa!');
      } else {
        console.log('   ✅ Sessão do Gustavo mantida!');
      }
    } else {
      console.log('   ✅ Nenhuma sessão ativa');
    }
    
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║         ✅ LIMPEZA CONCLUÍDA COM SUCESSO!                ║');
    console.log('╚═══════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('📊 RESUMO:');
    console.log('');
    console.log(`   ❌ Usuários excluídos: ${usuariosExcluidos}`);
    console.log(`   ❌ Solicitações excluídas: ${solicitacoes.length}`);
    console.log('');
    console.log('📋 ÚNICO EMAIL NO SISTEMA:');
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
    console.log('💡 DICA:');
    console.log('   Agora você pode solicitar cadastro com qualquer email!');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return {
      success: true,
      usuariosExcluidos,
      solicitacoesExcluidas: solicitacoes.length,
      emailMantido: emailPermitido
    };
  } catch (error) {
    console.error('❌ Erro ao excluir emails:', error.message);
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    throw error;
  }
};

globalThis.excluirTodosEmailsExcetoGustavo = window.excluirTodosEmailsExcetoGustavo;

// Função de limpeza INSTANTÂNEA (resolve tudo em 1 comando)
window.limparTudoAgora = () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║         🚀 LIMPEZA INSTANTÂNEA - RESOLVER AGORA!         ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  
  try {
    const emailPermitido = 'controleinterno@jardim.ce.gov.br';
    
    // Limpar TUDO
    console.log('🗑️ LIMPANDO TUDO...');
    console.log('');
    
    // 1. Criar apenas Gustavo Barros
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
    
    localStorage.setItem('mock_users', JSON.stringify([gustavoBarros]));
    console.log('✅ 1. Usuários: APENAS Gustavo Barros');
    
    // 2. Remover todas as solicitações
    localStorage.removeItem('mock_solicitacoes');
    console.log('✅ 2. Solicitações: TODAS removidas');
    
    // 3. Limpar sessão se não for Gustavo
    const sessionUserStr = localStorage.getItem('contratos_jardim_user');
    if (sessionUserStr) {
      const sessionUser = JSON.parse(sessionUserStr);
      if (sessionUser.email !== emailPermitido) {
        localStorage.removeItem('contratos_jardim_user');
        localStorage.removeItem('contratos_jardim_token');
        console.log('✅ 3. Sessão: Limpa');
      } else {
        console.log('✅ 3. Sessão: Mantida (Gustavo)');
      }
    } else {
      console.log('✅ 3. Sessão: Nenhuma ativa');
    }
    
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║              ✅ PRONTO! TUDO LIMPO!                      ║');
    console.log('╚═══════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('🎯 AGORA:');
    console.log('');
    console.log('   1. Recarregue a página (F5)');
    console.log('   2. Solicite o cadastro novamente');
    console.log('   3. Funcionará! ✅');
    console.log('');
    console.log('📧 ÚNICO EMAIL NO SISTEMA:');
    console.log('   controleinterno@jardim.ce.gov.br');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return { success: true, message: 'Tudo limpo! Recarregue a página (F5)' };
  } catch (error) {
    console.error('❌ Erro:', error.message);
    throw error;
  }
};

globalThis.limparTudoAgora = window.limparTudoAgora;

// Log de inicialização
console.log('');
console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║      🧹 UTILITÁRIO DE LIMPEZA LOCAL - CARREGADO!        ║');
console.log('╚═══════════════════════════════════════════════════════════╝');
console.log('');
console.log('🚨 ERRO "EMAIL JÁ CADASTRADO"? RESOLVA AGORA:');
console.log('');
console.log('   🚀 limparTudoAgora()   ← EXECUTE ESTE!');
console.log('');
console.log('   Depois: Recarregue (F5) e tente novamente!');
console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
console.log('💡 OUTRAS FUNÇÕES DISPONÍVEIS:');
console.log('');
console.log('   🔍 varreduraCompleta()                  - Ver TODOS os emails');
console.log('   🗑️ excluirTodosEmailsExcetoGustavo()   - Excluir tudo exceto Gustavo');
console.log('   🗑️ limparSistemaCompleto()             - Limpeza completa');
console.log('   🔄 resetarSistemaInicial()             - Reset total');
console.log('   🔍 verificarEstadoSistema()            - Estado do sistema');
console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('');