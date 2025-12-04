// ========================================
// VERIFICAR CONFIGURAÇÕES DO SISTEMA
// ========================================
// Use no console: verificarConfig()

import { projectId, publicAnonKey } from './supabase/info';

export async function verificarConfig() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔍 VERIFICAÇÃO DE CONFIGURAÇÕES');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  // ========================================
  // 1. FRONTEND - Variáveis Locais
  // ========================================
  console.log('📱 FRONTEND (Variáveis Locais)');
  console.log('───────────────────────────────────────────────────────────');
  console.log('');
  
  console.log('✅ Arquivo: /utils/supabase/info.tsx');
  console.log('');
  console.log('📌 Project ID:', projectId);
  console.log('   Status:', projectId ? '✅ Configurado' : '❌ Não configurado');
  console.log('');
  console.log('📌 Public Anon Key:', publicAnonKey ? publicAnonKey.substring(0, 50) + '...' : '❌ Não configurado');
  console.log('   Status:', publicAnonKey ? '✅ Configurado' : '❌ Não configurado');
  console.log('');

  // Construir URLs
  const SUPABASE_URL = `https://${projectId}.supabase.co`;
  const SERVER_URL = `${SUPABASE_URL}/functions/v1/make-server-1a8b02da`;

  console.log('🔗 URLs Construídas:');
  console.log('   Supabase URL:', SUPABASE_URL);
  console.log('   Server URL:', SERVER_URL);
  console.log('');

  // ========================================
  // 2. BACKEND - Health Check
  // ========================================
  console.log('');
  console.log('🖥️ BACKEND (Edge Function)');
  console.log('───────────────────────────────────────────────────────────');
  console.log('');

  try {
    console.log('📤 Testando Health Check...');
    console.log('🔗 URL:', `${SERVER_URL}/health`);
    console.log('');

    const response = await fetch(`${SERVER_URL}/health`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    console.log('📡 Status:', response.status, response.statusText);

    if (response.ok) {
      const data = await response.json();
      console.log('');
      console.log('✅ BACKEND FUNCIONANDO!');
      console.log('');
      console.log('📊 Informações do Servidor:');
      console.log('   Service:', data.service || 'N/A');
      console.log('   Version:', data.version || 'N/A');
      console.log('   Edge Function:', data.edge_function || 'N/A');
      console.log('   Admin Email:', data.admin_email || 'N/A');
      console.log('   Timestamp:', data.timestamp || 'N/A');
      console.log('');

      // Se chegou aqui, as variáveis do backend estão OK
      console.log('✅ VARIÁVEIS DE AMBIENTE DO BACKEND:');
      console.log('   SUPABASE_URL: ✅ Configurada');
      console.log('   SUPABASE_ANON_KEY: ✅ Configurada');
      console.log('   SUPABASE_SERVICE_ROLE_KEY: ✅ Configurada');
      console.log('');

    } else {
      const text = await response.text();
      console.log('');
      console.log('❌ BACKEND COM PROBLEMAS!');
      console.log('');
      console.log('Status:', response.status);
      console.log('Resposta:', text.substring(0, 200));
      console.log('');
      console.log('💡 Possíveis causas:');
      console.log('   • Edge Function não está implantada');
      console.log('   • Variáveis de ambiente não configuradas');
      console.log('   • Erro no código do servidor');
      console.log('');
    }

  } catch (error: any) {
    console.log('');
    console.log('❌ NÃO FOI POSSÍVEL CONECTAR AO BACKEND!');
    console.log('');
    console.log('Erro:', error.message);
    console.log('');
    console.log('💡 Possíveis causas:');
    console.log('   1. Edge Function não está implantada no Supabase');
    console.log('   2. CORS bloqueando a requisição');
    console.log('   3. URL incorreta');
    console.log('   4. Sem conexão com internet');
    console.log('');
    console.log('🔧 Como resolver:');
    console.log('   1. Verifique se a Edge Function está deployed:');
    console.log('      → Supabase Dashboard → Edge Functions');
    console.log('      → Procure: make-server-1a8b02da');
    console.log('');
    console.log('   2. Verifique as variáveis de ambiente:');
    console.log('      → Supabase Dashboard → Edge Functions → Configuration → Secrets');
    console.log('      → Deve ter: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');
    console.log('');
    console.log('   3. Redeploy se necessário:');
    console.log('      → supabase functions deploy make-server-1a8b02da');
    console.log('');
  }

  // ========================================
  // 3. ONDE PEGAR AS CHAVES
  // ========================================
  console.log('');
  console.log('🔑 ONDE ENCONTRAR AS CHAVES');
  console.log('───────────────────────────────────────────────────────────');
  console.log('');
  console.log('1. Acesse: https://supabase.com/dashboard');
  console.log('2. Selecione seu projeto: wdkgxmwnacmzdfcvrofe');
  console.log('3. Vá em: Settings → API');
  console.log('');
  console.log('📋 Você encontrará:');
  console.log('   • Project URL');
  console.log('   • anon public key');
  console.log('   • service_role secret (clique em "Reveal")');
  console.log('');

  // ========================================
  // 4. COMO CONFIGURAR
  // ========================================
  console.log('');
  console.log('⚙️ COMO CONFIGURAR NO BACKEND');
  console.log('───────────────────────────────────────────────────────────');
  console.log('');
  console.log('Opção 1 - Via Dashboard (Recomendado):');
  console.log('   1. Supabase Dashboard → Edge Functions');
  console.log('   2. Configuration → Secrets');
  console.log('   3. Add new secret (para cada variável)');
  console.log('');
  console.log('Opção 2 - Via CLI:');
  console.log('   supabase secrets set SUPABASE_URL=https://wdkgxmwnacmzdfcvrofe.supabase.co');
  console.log('   supabase secrets set SUPABASE_ANON_KEY=[SUA_ANON_KEY]');
  console.log('   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=[SUA_SERVICE_KEY]');
  console.log('');

  // ========================================
  // 5. RESUMO
  // ========================================
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📊 RESUMO DA CONFIGURAÇÃO');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  const frontendOK = projectId && publicAnonKey;
  
  console.log('Frontend:', frontendOK ? '✅ Configurado' : '❌ Incompleto');
  console.log('Backend:', 'Execute o health check acima para verificar');
  console.log('');
  
  if (frontendOK) {
    console.log('✅ Variáveis do frontend estão OK!');
    console.log('');
    console.log('📍 Próximos passos:');
    console.log('   1. Verifique se o backend respondeu ao health check');
    console.log('   2. Se sim: Execute "testarConexao()" para criar o admin');
    console.log('   3. Se não: Configure as secrets no Supabase Dashboard');
    console.log('');
  } else {
    console.log('❌ Variáveis do frontend estão incompletas!');
    console.log('');
    console.log('Verifique o arquivo: /utils/supabase/info.tsx');
    console.log('');
  }

  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('💡 Mais informações:');
  console.log('   → /CONFIGURAR_VARIAVEIS_AMBIENTE.md');
  console.log('   → /CORRECOES_SISTEMA_ONLINE.md');
  console.log('');
}

// Expor função globalmente
(window as any).verificarConfig = verificarConfig;

console.log('');
console.log('🔧 Verificador de configuração carregado!');
console.log('💡 Use no console: verificarConfig()');
console.log('');
